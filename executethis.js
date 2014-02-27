// execute is the asynchronous version  has an etbypass option
// executelist executes list (howToDoList and whatToDoList).  It accepts a structure as in config
// 
// dothis creates a howToDoList, whatToDoList based on a target function, stored and sent in configuration.  Then calls executelist
// 
// getexecuteobject returns the status of a howToDo whatToDo combination
//
// config params
// config dofn
// 

(function (window) {
    // 'use strict';

    var execute, executethis, etexecute;

    exports.execute = window.execute = execute = function execute(incomingparams, callback) {


    var result, preError, midError, overallError, commandmultiple;
        // check for execute multiple commands, if passed store and delete from request

    
    if (isString(incomingparams)) {
            var temp={};
            temp['executethis'] = incomingparams;
            proxyprinttodiv("execute - array params received I", temp, 99);
            incomingparams=temp;
            proxyprinttodiv("execute - array params received I", incomingparams, 99);
        }
    

        if ((incomingparams && incomingparams.command && incomingparams.command.multiple && incomingparams.command.multiple.parameters)) {
            proxyprinttodiv("execute - command.multiple ", incomingparams.command.multiple, 37);
            commandmultiple = incomingparams.command.multiple.parameters;
            incomingparams = incomingparams["executethis"];
            delete incomingparams.command;
        }

        if ((incomingparams instanceof Array)) {
            proxyprinttodiv("execute - array params received ", incomingparams, 11);
            executethismultiple(incomingparams, {}, callback);
            //executethismultiple(incomingparams, commandmultiple, callback);
        } else {
            // if command.execute.parameters exist the insert those parameters into execution stream.  
            // Remove command.execute.parameters
            if (incomingparams.command && incomingparams.command.parameters) {
                for (var key in incomingparams.command.parameters) {
                    incomingparams[key] = incomingparams.command.parameters[key];
                }
                delete incomingparams.command.parameters;
            }

            proxyprinttodiv("execute - inboundparms", incomingparams, 11);
            proxyprinttodiv("execute - callback fn ", String(callback), 11);
            console.log(' *** test2  ' + JSON.stringify(incomingparams));

            // fix incoming param
			// if(incomingparams){
			// 	if ((!incomingparams['executethis']) && (Object.keys(incomingparams).length === 1)) {
			// 		incomingparams['executethis'] = incomingparams;
			// 	}
			// }

            incomingparams['midexecute'] = incomingparams['executethis'];
            delete incomingparams['executethis'];
            console.log('starting preexecute ' + nonCircularStringify(incomingparams));
            dothisprocessor(incomingparams, 'preexecute', function (err, preResults) {
                preError = err;

                if (!preResults)
                    preResults = {};

                if (Object.prototype.toString.call(preResults) === '[object Array]') {
                    if (preResults.length > 0) {
                        preResults = preResults[0];
                    } else {
                        preResults = {};
                    }
                }

                dothisprocessor(preResults, 'midexecute', function (err, midResults) {

                    midError = err;
                    console.log(' after midexecute >> ' + nonCircularStringify(midResults));

                    if (!midResults)
                        midResults = {};

                    if (Object.prototype.toString.call(midResults) === '[object Array]') {
                        if (midResults.length > 0) {
                            midResults = midResults[0];
                        } else {
                            midResults = {};
                        }
                    }

                    dothisprocessor(midResults, 'postexecute', function (err, postResults) {

                        if (!postResults)
                            postResults = {};
                        // if command.execute then call execute with command.execute.parameters
                        if ((postResults.command) && (postResults.command.execute)) {
                            var executeobject;
                            if (postResults.command.execute.parameters) {
                                executeobject = postResults.command.execute.parameters
                            }
                            delete postResults.command.execute.parameters;
                            if (isObject(postResults.command.execute)) {
                                extend(true, executeobject, postResults.command.execute)
                            } else {
                                executeobject['executethis'] = postResults.command.execute;
                            }
                            delete postResults.command.execute;
                            extend(true, executeobject, postResults);
                            execute(executeobject, callback);

                        } else {

                            if ((postResults.command) && (postResults.command.result)) { // if command.result then wrap results
                                var resultWrapperObj = {};
                                resultWrapperObj[postResults.command.result] = postResults;
                                postResults = resultWrapperObj;
                                delete postResults.command.result;
                            }



                            if (Object.prototype.toString.call(postResults) !== '[object Array]') {

                                var tempArray = [];
                                tempArray.push(postResults);
                                postResults = tempArray;
                            }

                            overallError = extend(true, preError, midError, err);

                            callback(overallError, postResults);
                        }

                    });
                });
            });
        }
    
    };



    // > 
    // > executeone
    // > if (!parm[‘fn’]) {parm[‘fn’]=“execute”}
    // > …
    // > window[fn].apply(window, fnparams);
    exports.executeone = executeone = function executeone(params, callback) {
        // execute one processes siglelevel arrays because they have to be either  
        // [{fn:fn},[a:b]] or like this [{execuethis:a, b:c}]
        // proxyprinttodiv("executeone - params >> params ", params, 11);
        var fn;
        var fnparams = [];
        var output = [];

        var fncallbck = function (err, resp) {
            output.push(resp);

            callback(err, output); //callback(err, output[0]);
        };
        proxyprinttodiv("executeone - params >> fn ", params, 11);

        if (params[0] && params[0].fn) {

            fn = params[0]['fn'];
            fnparams = params[1];
        } else {
            fn = 'execute';
            fnparams.push(params[0]);
        }
        fnparams.push(fncallbck);
        proxyprinttodiv("executeone - fncallbck ", fncallbck, 11);
        proxyprinttodiv("executeone - window ", fnparams, 11);

        window[fn].apply(window, fnparams);
    };


    exports.executethismultiple = window.executethismultiple = executethismultiple = function executethismultiple(inparams, inCmd, callback) {

        // > execute()
        // > if array then multiple()
        // > else normal
        // > 
        // > multiple
        // > split into series, parallel, waterfall
        // > if eachtodo = array 
        // >   {for (eachsplit in eachtodo) {
        // >       executemultiple(eachtodo[eachsplit])
        // >       }
        // > else (if not array) {executeone()}

        var output = [];
        var commandobject = {};
        var defaultCommandObject = {};
        defaultCommandObject['executefilter'] = '';
        defaultCommandObject['executelimit'] = 15;
        defaultCommandObject['executemethod'] = 'execute';
        defaultCommandObject['executeorder'] = 'series';


        if (inCmd) {
            commandobject = defaultCommandObject;
            for (var key in defaultCommandObject) {
                if (defaultCommandObject.hasOwnProperty(key)) {
                    if (inCmd[key]) {
                        commandobject[key] = inCmd[key];
                    }
                }
            }
        } else {
            commandobject = defaultCommandObject;
        }
        proxyprinttodiv("executethismultiple - outside iteration - inparams ", inparams, 11);
        proxyprinttodiv("executethismultiple - outside iteration - commandobject ", commandobject, 11);
        // function filterParams(item, callback) {
        //     callback(item == item);
        // }

        function filterParams(item, callback) {
            proxyprinttodiv("executethismultiple - item ", item, 11);
            var result = true;
            if (commandobject && commandobject.executefilter) {
                result = false;
                // {"query":{"$eq":{"type":"minute"}}}
                // {"query":{"$in":{"type":["minute","second"]}}}
                if (item && commandobject && commandobject.executefilter && commandobject.executefilter.query) {

                    if (commandobject.executefilter.query['$eq']) {
                        var key = Object.keys(commandobject.executefilter.query.$eq);
                        proxyprinttodiv("executethismultiple - key ", commandobject.executefilter.query.$eq[key], 11);
                        result = (item && item[key] === commandobject.executefilter.query.$eq[key]);
                    }
                    // TODO :: add more conditions and more operators handling
                }
                callback(result);
            } else {
                callback(result);
            }
        }
        // async.filter(inparams, filterParams, function (filteredParams) {
        //     proxyprinttodiv("executethismultiple - filteredParams ", filteredParams, 11);



        //     //filter 1st n request only

        //     if (filteredParams && (filteredParams.length > commandobject.executelimit)) {
        //         filteredParams = filteredParams.splice(15);
        //     }


        var filteredParams = JSON.parse(JSON.stringify(inparams));

        async.series([
                function step1(clb) {
                    // series
                    if (commandobject.executeorder === "series") {
                        proxyprinttodiv("executethismultiple - filteredParams ", filteredParams, 11);
                        async.mapSeries(filteredParams, function (eachtodo, cbMap) {
                            async.nextTick( function () {
                                proxyprinttodiv("executethismultiple - eachtodo ", eachtodo, 11);

                                if (eachtodo instanceof Array ) {
                                    proxyprinttodiv("series - eachtodo 1st condition ****** should not trigger un2 level deep", eachtodo, 11);
                                    executethismultiple(eachtodo, {}, function (err, res) {
                                        // proxyprinttodiv("executethismultiple - iteration - eachtodo  ", eachtodo, 11);
                                        output.push(res);
                                        cbMap(null);
                                    });
                                } else {
                                    proxyprinttodiv("series - eachtodo", eachtodo, 11);
                                    execute(eachtodo, function (err, res) {
                                        // execute(eachtodo, function (err, res) {
                                        output.push(res);
                                        cbMap(null);
                                    });
                                }
                            });
                            //cbMap(null); // Moved by joe -- Fixes mem out error
                        }, function (err, re) {
                            clb(null);
                        });
                    } else {
                        clb(null);
                    }
                }
                // ,

                // function step2(clb) {
                //     // waterfall
                //     if (commandobject.executeorder === "waterfall") {
                //         function createFnArray(filteredParams, output) {


                //             var fnArray = [];
                //             var output = [];
                //             for (var i = 0; i < filteredParams.length; i++) {
                //                 var params = filteredParams[i];
                //                 proxyprinttodiv("executethismultiple - waterfall -- iteration - params ", params, 11);
                //                 var func = getFunction(params);
                //                 fnArray.push(func);
                //             }

                //             function getFunction(params) {
                //                 return function (cb1) {
                //                     executeone(params, function (err, res) {
                //                         // proxyprinttodiv("executethismultiple - iteration - eachtodo  ", eachtodo, 11);
                //                         output.push(res);
                //                         cb1(null);
                //                     });
                //                 };
                //             }
                //             return fnArray;
                //         };
                //         async.waterfall(createFnArray(filteredParams), function (err, resp) {
                //             clb(null);
                //         });

                //     } else {
                //         clb(null);
                //     }
                // },

                // function step3 (clb) {
                //     // parallel
                //     if (commandobject.executeorder === "parallel") {
                //         async.map(filteredParams, function (eachtodo, cbMap) {
                //             proxyprinttodiv("executethismultiple - iteration - parallel - eachtodo ", eachtodo, 11);
                //             executeone(eachtodo, function (err, res) {
                //                 output.push(res);
                //                 cbMap(null);
                //             });
                //         }, function (err, resp) {
                //             // if any of the saves produced an error, err would equal that error
                //             proxyprinttodiv("executethismultiple - parallel -- output ", output, 11);
                //             clb(null);
                //         });

                //     } else {
                //         clb(null);
                //     }
                // }

            ],
            function (err, resp) {
                // if any of the saves produced an error, err would equal that error
                proxyprinttodiv("executethismultiple - resp ", resp, 11);
                callback(err, output);
            });
        //});

    };



    // function executethismultiple(paramsArr, incmd, callback) {
    //     var eachelement;
    //     var resultlist=[];
    //             if (paramsArr instanceof Array) {
    //                 for (eachelement in paramsArr) {
    //                 executethismultiple(paramsArr[eachelement], {}, function (err, retResults) {
    //                     resultlist.push(retResults);
    //                     callback(null, resultlist);
    //                 });
    //                 }
    //             } else {
    //                 execute(paramsArr, function (err, retResults) {
    //                     console.log('>>>> retResults >>>> ' + JSON.stringify(retResults));
    //                     proxyprinttodiv('Function retResults', retResults, 17);
    //                     resultlist.push(retResults);
    //                     proxyprinttodiv('Function resultlist', resultlist, 17);
    //                     callback(null, resultlist);
    //                 });
    //             }
    //         }


    // function executethismultiple(paramsArr, incmd, callback) {
    //     var eachelement;
    //     var resultlist = [ ];

    //     if (paramsArr instanceof Array) {
    //         // async.map(paramsArr)
    //         for (eachelement in paramsArr) {
    //             executethismultiple(paramsArr[eachelement], {}, function (err, retResults) {
    //                 resultlist.push(retResults);
    //             });
    //         }
    //     } else {
    //         execute(paramsArr, function (err, retResults) {
    //             console.log('>>>> retResults >>>> ' + JSON.stringify(retResults));
    //             proxyprinttodiv('Function retResults', retResults, 17);
    //             resultlist.push(retResults[0]); // [0] controls the level of array nesting no [0] = [[]]
    //             proxyprinttodiv('Function resultlist', resultlist, 17);
    //         });
    //     }

    //     callback(null, resultlist);
    // }

    // function executethismultiple(paramsArr, incmd, callback) {
    //     var eachelement;
    //     var resultlist = [];

    //     async.series([
    //         function step1(step1_callback) {
    //             if (paramsArr instanceof Array) {
    //                 //async.mapSeries(paramsArr, function (param, map_callback) {
    //                 for (eachelement in paramsArr) {
    //                     executethismultiple(paramsArr[eachelement], {}, function (err, retResults) {
    //                         resultlist.push(retResults);
    //                         //map_callback(null);
    //                        // step1_callback(null);
    //                     });
    //                 }
    //                 //}); // end async broke it
    //             } else {
    //                 execute(paramsArr, function (err, retResults) {
    //                     console.log('>>>> retResults >>>> ' + JSON.stringify(retResults));
    //                     proxyprinttodiv('Function retResults', retResults, 17);
    //                     resultlist.push(retResults[0]); // [0] controls the level of array nesting no [0] = [[]] on the end return
    //                     proxyprinttodiv('Function resultlist', resultlist, 17);
    //                     //step1_callback(null);
    //                 });
    //             }
    //             step1_callback(null);
    //         }
    //     ], function (err, res) {
    //             callback(null, resultlist);
    //     });
    // }


    function dothisprocessor(params, target, callback) {

        // if command.status=fail, check between dothis, do not execute
        if (params && ((!params.command) || (params.command && params.command.status !== 'fail'))) {


            var whatToDoList,
                howToDoList,
                targetname,
                targetfunction;

            var err = {};

            proxyprinttodiv("dothis - inboundparms", params, 11);
            proxyprinttodiv("dothis - target ", target, 11);
            proxyprinttodiv("dothis - callback ", String(callback), 11);

            if (params["midexecute"] === "test4") { // for debug purposes
                callback({
                    'test4': 'Reached test4 code.. dothisprocessor function '
                });
            } else {
                // Before we try to load our config we need to see if there is something to do
                // so we check to see if there is something on the right hand side for the target (pre, mid, post)
                if (params[target] !== undefined) {

                    // it is possible the function sent in is a string or an actual function...we need to convert to string for config lookup
                    if (params[target] instanceof Function) {
                        targetname = params[target].name; // get the targetname
                        targetfunction = params[target]; // get targetfunction (whole function)
                    } // function was passed in
                    else {
                        targetname = params[target]; // get the targetname 
                        targetfunction = window[params[target]]; // get targetfunction (whole function)
                    } // function name was passed in as string

                    delete params[target]; // ** moved by Roger
                    delete params[targetfunction]; // ** added by Roger

                    howToDoList = CreateDoList(params, target, targetfunction); // generate list based on pre, mid, post
                    // howToDoList = extend(howToDoList, tempHowToDoList);

                    proxyprinttodiv("dothis - howToDoList ", howToDoList, 11);

                    whatToDoList = CreateDoList(params, targetname, targetfunction); // generate list based on fn name
                    // whatToDoList = extend(whatToDoList, tempWhatToDoList);

                    proxyprinttodiv("dothis - whatToDoList ", whatToDoList, 11);
                    executelist(howToDoList, whatToDoList, callback); // execute list

                } // params[target] undefined
                else { // execute the nextstage (mid or post), may need to remove target out of params
                    if (params.hasOwnProperty('preexecute') && params.preexecute === undefined) { delete params['preexecute']; }
                    if (params.hasOwnProperty('midexecute') && params.midexecute === undefined) { delete params['midexecute']; }
                    if (params.hasOwnProperty('postexecute') && params.postexecute === undefined) { delete params['postexecute']; }

                    callback(err, params);
                }
            } // else not test4
        } else {
            callback(err, params);
        }
    } // fn

    // based on a target fn and params this fn will create a sorted list of what to do -- params will be in list

    function CreateDoList(params, configtarget, configfn) {

        if ((params === undefined) || (params === "")) {
            params = {};
        }
        if ((configtarget === undefined) || (configtarget === "")) {
            configtarget = "executeerror";
        }
        if ((configfn === undefined) || (configfn === "")) {
            configfn = "";
        }

        // get saved configuration
        // cloning config
        var config0 = {};
        extend(true, config0, config.configuration); // config0 is working copy of current configuration
        config0 = toLowerKeys(config0);


        // If there is no config object for current target make one
        if (typeof config0[configtarget] !== 'object') {
            config0[configtarget] = [];
        }

        // fish out incoming configuraton
        if ((params['configuration'] !== undefined) && (params['configuration'][configtarget] !== undefined)) {
            var incomingConfig = [];
            var object = params['configuration'][configtarget][0]; // needs [0]
            object = toLowerKeys(object);
            incomingConfig.push(object); // get send in config
            // delete parms config
            delete params['configuration'][configtarget];
            // *** delete params['configuration'][configtarget][0];????????????? or above take out?
            proxyprinttodiv("CreateDoList - incomingConfig ", incomingConfig, 11);
        }

        if (incomingConfig) {
            config0[configtarget] = incomingConfig; // ** Joe - only load incoming config if there is an incoming config
        } // added by roger *******

        // // If there is no config object for current target make one
        // *** Joe - moved above
        // if (typeof config0[configtarget] !== 'object') {
        //     config0[configtarget] = {};   
        // }   

        // no idea what this was for - Joe
        // incomingConfig[target];  // load override 

        //combine parameters from incoming parameters & inconfig and savedconfig
        // *** section below unnessesary, maybe keep: delete params[configtarget];
        // *** Joe - commented out the following
        // var paramsobject={};
        // paramsobject = incomingConfig['params'];  // get extra parameters from incoming params config
        // params = jsonConcat(params,paramsobject); // join them with existing parameters
        // paramsobject = config0[configtarget]['params']; // get extra parameters from config
        // params = jsonConcat(params,paramsobject); // join them with existing parameters
        // delete from parameters configtarget

        //} **** taken out by roger



        if (config0[configtarget] !== undefined) {
            //delete params[configtarget];  *** moved by Roger
            // pre, mid, post configs are going to have multiple params so we need to iterate
            for (var i = 0; i < config0[configtarget].length; i++) {
                //try a concat
                if ((params !== undefined) && (config0[configtarget][i].params !== undefined)) {
                    config0[configtarget][i].params = jsonConcat(params, config0[configtarget][i].params); // concatenate with other pararms
                }
                //config0[configtarget][i].params= params; ** took out and put above, we should not change 'params'
            }
            // save distiled parameters back to list
            // in example deletes midexecute : <something>
        }

        proxyprinttodiv("CreateDoList - config0 ", config0, 11);

        var list = config0[configtarget];
        if (list != undefined && list.length > 1) {
            list = list.sort(function (a, b) {
                if (a.executeorder > b.executeorder)
                    return 1;
                else if (a.executeorder < b.executeorder)
                    return -1;
                else if (a.tryorder > b.tryorder)
                    return 1;
                else if (a.tryorder < b.tryorder)
                    return -1;
                else
                    return 0;
            });
        }

        // *** commented out by joe
        // replaced with code below
        // if ((list === undefined) || (list === "")) { // would be always true --> || (list != "")) { // if list empty then make up a default record
        //     // if ((configtarget=="preexecute") || (configtarget=="midexecute") || (configtarget=="postexecute")) {
        //     //     configtarget="executefn"; // default if howToDo config missing
        //     //     }
        //     // *** commneted by Rogr
        //     list = [];   // if no list so far then make a list so there is something to execute
        //     list[0] = {};
        //     list[0].executeorder = 0;
        //     list[0].tryorder = 0;
        //     list[0].params = params;
        //     list[0].dothis = configtarget;
        //     list[0].dofn = configfn;
        //     }

        // The folowing code attempts to fix the list if it is missing a property
        // I only build a single list entry object on postion [0] of the array
        if ((list === undefined) || (list === "")) {
            list = [];
        }
        if (list[0] === undefined) {
            list[0] = {};
        }
        if (list[0].executeorder === undefined) {
            list[0].executeorder = 1;
        }
        if (list[0].tryorder === undefined) {
            list[0].tryorder = 1;
        }
        if (list[0].params === undefined) {
            list[0].params = params;
        }
        if (list[0].dothis === undefined) {
            list[0].dothis = configtarget;
        }
        // *** Joe I do a function look up here as theres a good chance of configfn being set to undefined or "" do to a remap
        // ie.. configtarget is redir_b but by looking up a config it remaped dothis = func_b so we need to set configtarget to dothis
        // this works but the problem is we are stuck on [0] for arrays so I think only one will remap and find the local function to stick in dofn
        // notes: typically the configfn comes in from dothisprocessor which is fine on non remaps.. 
        // on remaps the true function name to lookup is found while in createdolist
        // which is why i'm doing this here, let me know what you think roger
        if (list[0].dofn === undefined) {
            list[0].dofn = configfn;
            if ((list[0].dofn == "") && (window[list[0].dothis])) {
                list[0].dofn = window[list[0].dothis];
            }
        }

        // *** took out, made getexecuteobject smarter
        // // On a remap we may not have loaded a doFn try it now
        // if((configtarget !== "preexecute") && (configtarget !=="midexecute") && (configtarget !=="postexecute")) {
        //     if(list[0].dofn === undefined) {
        //         configtarget = list[0].dothis;
        //         configfn = window[configtarget];
        //         list[0].dofn = configfn;
        //         // load the params in 
        //         if((params !== undefined) && (list[0].params !== undefined)) {
        //             list[0].params = params;
        //         }
        //     }
        // }

        proxyprinttodiv("CreateDoList - list ", list, 11);
        return list;
    }

    function executelist(howToDoList, whatToDoList, callback) {
        proxyprinttodiv("executelist - howToDoList ", howToDoList, 11);
        proxyprinttodiv("executelist - whatToDoList ", whatToDoList, 11);



        function debugvars(varlist) {
            var allvars = {
                1: {
                    "howToDoList": howToDoList,
                    "whatToDoList": whatToDoList,
                    "howallowexecute": howallowexecute,
                    "whatallowexecute": whatallowexecute
                },
                2: {
                    "outputResultsArr": outputResultsArr,
                    "howToDoParams": howToDoParams,
                    "howToDo": howToDo,
                    "h": h,
                    "whatToDoParams": whatToDoParams,
                    "whatToDo": whatToDo,
                    "w": w,
                    "whatToDoFn": whatToDoFn
                },
                3: {
                    "howexecuteorder": howexecuteorder,
                    "whatexecuteorder": whatexecuteorder,
                    "howtryorder": howtryorder,
                    "whattryorder": whattryorder
                }
            };

            var resultObj = {};
            var vargroup;
            if (!varlist) {
                for (var eachvar in allvars) {
                    if (allvars.hasOwnProperty(eachvar)) {
                        varlist.push(eachvar);
                    }
                }
            }

            for (var eachgroup in varlist) {
                if (varlist.hasOwnProperty(eachgroup)) {
                    vargroup = varlist[eachgroup];
                    resultObj = jsonConcat(resultObj, allvars[vargroup]);
                }
            }
            return resultObj;
        }

        var outputResultsArr = [];

        var howToDoParams;
        var howToDo;
        var h;
        var whatToDoParams;
        var whatToDo;
        var w;
        var whatToDoFn;
        var howallowexecute = true;
        var whatallowexecute = true;
        var howexecuteorder;
        var whatexecuteorder;
        var howtryorder;
        var whattryorder;

        howallowexecute = true;
        howexecuteorder = 1;
        resultsArr = [];

        // debugname = "executelist";
        debugcolor++;


        async.mapSeries(howToDoList, function (h, cbMapH) {
            async.nextTick(function() {
                proxyprinttodiv("executelist begin how howallowexecute ", howallowexecute, 11);
                proxyprinttodiv("dothis - h ", h, 18);
                howToDo = h['dothis']; // get specific howToDo from list
                howToDoParams = h['params']; // get params that were stored
                if ((howToDoParams === undefined) || (howToDoParams === "")) {
                    howToDoParams = {};
                }

                proxyprinttodiv("executelist howToDo ", howToDo, 11);
                if (howexecuteorder !== h.executeorder) {
                    // if orders are different, then we are in new iteration of do, reset flat to allow how execute
                    howallowexecute = true;
                }
                howexecuteorder = h.executeorder;

                whatallowexecute = howallowexecute;
                whatexecuteorder = 1;

                async.mapSeries(whatToDoList, function (w, cbMapW) {
                    async.nextTick(function() {
                        proxyprinttodiv("execute - I howallowexecute", howallowexecute, 11);
                        proxyprinttodiv("execute - I whatexecuteorder", whatallowexecute, 11);
                        proxyprinttodiv("execute - w", w, 18);
                        if (w[howToDo]) {
                            whatToDo = w[howToDo]; // try to get specific config for whatToDo
                        } else {
                            whatToDo = w['dothis']; // default
                        }
                        whatToDoFn = w['dofn'];
                        whatToDoParams = w['params'];

                        if ((whatToDoParams === undefined) || (whatToDoParams === "")) {
                            whatToDoParams = {};
                        }
                        proxyprinttodiv("execute - whatToDo", whatToDo, 11);

                        if (whatexecuteorder !== w.executeorder) {
                            // executeorder changed, reset whatallowexecute, other allow it to remain
                            whatallowexecute = true;
                        }
                        whatexecuteorder = w.executeorder;

                        proxyprinttodiv("executelist end what howallowexecute ", howallowexecute, 11);
                        proxyprinttodiv("executelist end what whatallowexecute ", whatallowexecute, 11);
                        //debugfn("executelist", "executelist", "execute", "mid", debugcolor, debugindent, debugvars([1, 2, 3]));

                        if ((howallowexecute) && (whatallowexecute)) { //if both allowed to execute
                            getexecuteobject(jsonConcat(howToDoParams, whatToDoParams), howToDo, whatToDo, whatToDoFn,
                                function (err, executeobject) {
                                    // always will get something back, even if errorfn...so always execute and store resutls
                                    proxyprinttodiv("executelist executeobject: ", executeobject, 11);
                                    proxyprinttodiv("executelist executeobject.params: ", executeobject.params, 11);
                                    proxyprinttodiv("executelist executeobject.targetfn: ", String(executeobject.targetfn), 11);
                                    if (typeof executeobject.targetfn === 'function') { // there was a chance of a none function getting in here -- Joe
                                        authcall(executeobject.params, function (err, securitycheck) {
                                            if (securitycheck) {
                                                executeobject.targetfn(executeobject.params, function (err, res) {
                                                    proxyprinttodiv("executelist result from execution ", res, 11);

                                                    // This section helps control the iteration -- Joe
                                                    // ***********************************************
                                                    whatallowexecute = false;
                                                    howallowexecute = false;

                                                    if ((res === undefined) || (res === {})) { // may be issues with empty object
                                                        whatallowexecute = true;
                                                        howallowexecute = true;
                                                        executeobject.executeflag = false;
                                                    }
                                                    // ************************************************

                                                    if (executeobject.executeflag === true) {
                                                        execute(res, function (err, res) {
                                                            // if executegetwid then execute with the results
                                                            outputResultsArr.push(res);
                                                            cbMapW(null, "What Iteration");
                                                        });
                                                    } else {
                                                        // executeflag=false
                                                        outputResultsArr.push(res);
                                                        cbMapW(null, "What Iteration");
                                                    }
                                                });
                                            } else {
                                                // security check failed
                                                callback(err, {
                                                    'etstatus': 'unauthorized call.'
                                                });
                                            }
                                        });


                                        // create a google spreadsheet with intended data
                                        // https://docs.google.com/spreadsheet/ccc?key=0AqSqNB4MEkB0dDZzZFE1bm1QRk8tYTBVNjZjWlpfSnc#gid=0

                                        // executethis.js
                                        // Add the security check 
                                        // line 752 if (executeobject.executeflag === false)
                                        // line 757 if (executeobject.executeflag === true) 

                                        // remember that in the future the permissions list will also return a function name to be called for checking security

                                        // we will use level

                                        // All wids include their wid as group.  They should also return their dto (metadata.method) as a group    
                                    } // if executeobject.targetfn
                                    else {
                                        cbMapW(null, "What Iteration");
                                    }

                                    // else ((howallowexecute) && (whatallowexecute))  ... do something else
                                }); //executeobject callback
                        } else {
                            cbMapW(null, "What Iteration");
                        }
                    });
                },
                function (err, res) {
                    proxyprinttodiv("executelist end of what outputResultsArr ", outputResultsArr, 11);

                    cbMapH(null, "How Iteration");
                    //console.log(' completed whatToDoList iteration in sync fashion.');
                });

                // map w,
            });
        },

        function (err, res) {
            // console.log('>>> very outside >>> ' + JSON.stringify(outputResultsArr));
            proxyprinttodiv("execute - resultsArr", outputResultsArr, 11);
            // executearray(resultsArr, function (err, res) {
            //     outputResultsArr = arrayUnique(outputResultsArr.concat(res));
            //     callback(err, outputResultsArr);
            //     console.log(' completed  howToDoList iteration in sync fashion.');
            // });
            callback(err, outputResultsArr);
        });
        debugcolor--;
    }


    function getexecuteobject(params, howToDo, whatToDo, whatToDoFn, callback) {
        // code tries to get appropriate executeobject...will always return something even if error fn
        var targetfn = undefined;
        var executeflag = false;

        proxyprinttodiv("getexecuteobject howToDo", howToDo, 11);
        proxyprinttodiv("getexecuteobject whatToDo", whatToDo, 11);
        //proxyprinttodiv("getexecuteobject fn whatToDo", String(window[whatToDo]), 11);
        if ((!howToDo) || (!whatToDo)) {
            params["etstatus"] = "invalidconfig";
            targetfn = executeerror
        }

        // switch (howToDo) {
        switch (howToDo) {

            case "dothis": // previously executefn ... go look for fn to execute
                if (whatToDoFn !== window[whatToDo]) {
                    targetfn = window[whatToDo];
                } else {
                    targetfn = whatToDoFn;
                }

                break;

            case "executeparam":
                if (params[whatToDo] === undefined) {
                    targetfn = undefined;
                    break;
                }
                // targetfn = params[whatToDo];
                targetfn = 'execute';
                params['executethis'] = params[whatToDo];



                // if (!targetfn instanceof Function) {
                //     targetfn = window[targetfn];
                // } else if (typeof targetfn === 'string') {
                //     targetfn = window[targetfn];
                // }

                break;

            case "executegetwid":
                targetfn = execute;
                executeflag = true; // so caller gets wid and then executes with the results
                //params = {};
                params["executethis"] = "getwid";
                params["wid"] = whatToDo;

                // execute({"executethis":"getwid", "wid":whatToDo}, function (err, res) {
                // tempobject=""
                // if (tempobject !== undefined && tempobject['js']) {
                //     targetfn = tempobject['js'];
                //     fncheck = true;
                // } else {
                //     tempobject.skipExecuteObjCheck = true;
                //     tempobject.params={};
                //     callback({}, tempobject);
                // }
                // });
                break;


            case "server":
                targetfn = window["server"];
                params['executethis'] = whatToDo;
                break;
        }

        //proxyprinttodiv("getexecuteobject targetfn I", String(targetfn), 11);
        // if ((targetfn === undefined) || (targetfn === "")) {
        //     params["etstatus"] = "nofn";
        //     targetfn = executeerror; // we want to return undefined here so we try the next case
        // } else {
        //     if (!targetfn instanceof Function) { // check to see if it is a string fucntion
        //         if (targetfn.indexOf('function') != -1) {
        //             if (window[targetfn]) {
        //                 targetfn = window[targetfn]
        //             } else {
        //                 params["etstatus"] = "invalidfn"
        //                 targetfn = executeerror;
        //             }
        //         }
        //     }
        // }

        //proxyprinttodiv("getexecuteobject result targetfunction ", String(targetfn), 11);
        callback({}, {
            targetfn: targetfn,
            params: params,
            executeflag: executeflag
        });
    } // fn



    exports.executeerror = window.executeerror = executeerror = function executeerror(params, callback) {
        var err;
        var output;
        if (!output) {
            output = {};
        }
        if (params !== undefined) {
            output["etstatus"] = params["etstatus"]
        } else {
            output["etstatus"] = "error";
        }
        callback(output, output);
    };

    function nonCircularStringify(obj) {
        var cache = [];

        return JSON.stringify(obj, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    //found circular reference, discard key
                    return;
                }
                cache.push(value);
            }
            return value;
        });
    }

    // call bootprocess() for the first time after all dependencies have been loaded
    bootprocess();



})(typeof window == "undefined" ? global : window);
