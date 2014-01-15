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

    exports.etexecute = window.etexecute = etexecute = function etexecute(received_params, callback) {

        var params = {};
        extend(true, params, received_params); // clone received params

        params = toLowerKeys(params);
        execute(params, function (err, results) {
            callback(err, results);
        });
    };

    exports.execute = window.execute = execute = function execute(received_params, callback) {

        var incomingparams = {}, result, preError, midError, overallError;
        extend(true, incomingparams, received_params); // clone received params

        incomingparams = toLowerKeys(incomingparams);

        proxyprinttodiv("execute - inboundparms", incomingparams, 11);
        proxyprinttodiv("execute - callback fn ", String(callback), 11);
        console.log(' *** test2  ' + JSON.stringify(incomingparams));

        if ((incomingparams !== undefined) && (incomingparams["executethis"] === "test2")) {
            callback(undefined, {
                'test2': 'Reached test2 code.. execute function'
            });
        } else {
            if ((incomingparams !== undefined) && (incomingparams['etbypass'])) {
                proxyprinttodiv("execute - etbypass incomingparams", incomingparams, 11);

                var x = undefined;

                if (incomingparams["executethis"]) {
                    if (incomingparams["executethis"] instanceof Function) {
                        x = incomingparams["executethis"];
                    } else {
                        x = window[incomingparams["executethis"]];
                    }
                    result = executethis(incomingparams, x);
                } else {
                    result = incomingparams;
                }
                callback(err, result);
            } else {
                incomingparams['midexecute'] = incomingparams['executethis'];
                delete incomingparams['executethis'];
                console.log('starting preexecute ' + nonCircularStringify(incomingparams));
                dothisprocessor(incomingparams, 'preexecute', function (err, preResults) {
                    preError = err;
                     //if (preResults instanceof Array) {preResults=preResults[0]};
                    console.log(' after preexecute >> ' + nonCircularStringify(preResults));
                    console.log('starting midexecute ' + nonCircularStringify(incomingparams));
                   
                        if (preResults !== false && (!preResults))
                            preResults = {};
                    doThis(preResults, 'midexecute', function (err, midResults) {


                    dothisprocessor(preResults, 'midexecute', function (err, midResults) {

                        midError = err;
                        //if (midResults instanceof Array) {midResults=midResults[0]};
                        console.log(' after midexecute >> ' + nonCircularStringify(midResults));

                        if (!midResults) {
                            midResults = {};
                        }

                        dothisprocessor(midResults, 'postexecute', function (err, postResults) {
                            console.log(' after postexecute >> ' + nonCircularStringify(postResults));
                            //if (preResults instanceof Array) {postResults=postResults[0]};
                            if (postResults !== false && (!postResults)) {

                            overallError = extend(true, preError, midError, err);

                            callback(overallError, postResults);
                        });
                    });
                });
            }
        }
    };

    exports.execute2 = window.execute2 = execute2 = function execute2(received_params, callback) {

        if (received_params instanceof Array) {
            received_params['command.executemethod'] = 'execute';
            received_params['command.excutefilter'] = 'addwid';
            received_params['command.executeorder'] = 'series';
            received_params['command.executelimit'] = 15;
            executethismultiple(received_params, callback);
        }

        var incomingparams = {}, result;
        extend(true, incomingparams, received_params); // clone received params

        incomingparams = toLowerKeys(incomingparams);
        // proxyprinttodiv("execute - inboundparms", incomingparams, 11);
        // proxyprinttodiv("execute - callback fn ", String(callback), 11);
        console.log(' *** execute2 starting  ' + JSON.stringify(incomingparams));


        if ((incomingparams !== undefined) && (incomingparams['etbypass'])) {
            // proxyprinttodiv("execute - etbypass incomingparams", incomingparams, 11);

            // var x = undefined;

            // if (incomingparams["executethis"]) {
            //     if (incomingparams["executethis"] instanceof Function) {
            //         x = incomingparams["executethis"];
            //     } else {
            //         x = window[incomingparams["executethis"]];
            //     }
            //     result = executethis(incomingparams, x);
            // } else {
            //     result = incomingparams;
            // }
            callback(err, result);
        } else {
            incomingparams['midexecute'] = ['executethis'];
            delete incomingparams['executethis'];
            // before execuetthis
            // pre
            // before execute
            // mid
            // after execute
            // post
            // after executethis
            async.waterfall([

                function eventexecutethis(cb) {
                    cb(null);
                },
                function eventpre(cb) {
                    console.log('starting preexecute ' + nonCircularStringify(incomingparams));
                    dothisprocessor(incomingparams, 'preexecute', function (err, preResults) {
                        console.log(' after preexecute >> ' + nonCircularStringify(preResults));
                        cb(null, preResults);
                    });
                },
                function eventbeforeexecute(preResults, cb) {
                    cb(null, preResults);
                },
                function mid(preResults, cb) {
                    console.log('starting midexecute ' + nonCircularStringify(incomingparams));
                    if (!preResults) {
                        if (preResults !== false && (!preResults))
                            preResults = {};
                    } // 
                    dothisprocessor(preResults, 'midexecute', function (err, midResults) {
                        console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                        cb(null, midResults);
                    });
                },
                function eventafterexecute(midResults, cb) {
                    cb(null, midResults);
                },
                function eventpost(midResults, cb) {
                    if (midResults !== false && (!midResults)) {
                        midResults = {};
                    }
                    dothisprocessor(midResults, 'postexecute', function (err, postResults) {
                        console.log(' after postexecute >> ' + nonCircularStringify(postResults));
                        cb(null, postResults);
                    });
                },
                function eventafterexecutethis(postResults, cb) {
                    cb(null, postResults);
                },
            ], function (err, result) {
                console.log(' after doing execute2 >> ' + nonCircularStringify(result));
                callback(err, result);
            });

        }
    }

    //}


    /// executethis is a function router that will return result synchronously
    /// 1st argument -- input parameters, 2nd parameter -- callback function
    /// second parameter must be a function, if not sent in will be defaulted to 'execute'
    /// if the function to be called has only one input object then this fn will wait for results (act asynch)
    exports.executethis = window.executethis = executethis = function executethis(inboundparms, targetfunction) {

        proxyprinttodiv('ERROR ExecuteThis was called ***********************************', inboundparms, 17);
        if ((inboundparms !== undefined) && (inboundparms["executethis"] === "test1")) {
            return {
                'test1': 'Reached test1 code.. executethis function'
            };
        } else {
            //console.log(' >>>> executethis function from executethis before calling execute with parameters >>> ' + nonCircularStringify(inboundparms));
            if (!targetfunction || !targetfunction instanceof Function || typeof (targetfunction) === 'string') {
                targetfunction = execute;
            }

            // var params = {};
            var params = toLowerKeys(inboundparms);
            var argCount = 0;

            // cloning inbound params
            // extend(true, params, tempParams);

            proxyprinttodiv('Function executethis params', params, 11);
            proxyprinttodiv('Function executethis fn', targetfunction.name, 11);
            proxyprinttodiv('Function executethis length', targetfunction.length, 11);
            console.log('targetfunction length => ' + targetfunction.length);
            if (targetfunction.length !== undefined) {
                argCount = targetfunction.length;
            }

            if (argCount == 1) {
                return targetfunction(params); // if targetfn has only one parameter then fn is synchronous
            } else if (argCount > 1) {
                var retResult = undefined,
                    funcDone = false,
                    funcCalled = false,
                    count = 0;

                var cbfunction = function (results, results2) {
                    funcDone = true;
                    if (results2) {
                        retResult = results2;
                    } else {
                        retResult = results;
                    }
                };

                while (!funcDone) {
                    if (!funcCalled) {
                        funcCalled = true;
                        targetfunction(params, cbfunction);
                    }
                    count++;
                    if (count > 100) {
                        funcDone = true;
                    }
                }

                if (retResult === undefined) {
                    retResult = {};
                }
                // if (retResult["etstatus"]=="empty") {retResult={}}
                return retResult;
            }
        }
    };

    function dothisprocessor(params, target, callback) {
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

                // it is possible the function sent in a string or an actual function...we need to convert to string for config lookup
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
                callback(err, params);
            }
        } // else not test4
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

        proxyprinttodiv("CreateDoList - list ", list, 17);
        return list;
    }

    // function executelist(howToDoList, whatToDoList, callback) {
    //     var h,
    //         w,
    //         cb,
    //         whatToDo,
    //         whatToDoFn,
    //         howToDo,
    //         executeobject,
    //         targetfn,
    //         foundfn,
    //         synchflag,
    //         howToDoParams,
    //         whatToDoParams,
    //         params;

    //     var err = undefined;
    //     var outputResultsArr = [];

    //     // iterate over our how to do list
    //     proxyprinttodiv("executelist - howToDoList ", howToDoList, 11);
    //     proxyprinttodiv("executelist - whatToDoList ", whatToDoList, 11);

    //     for (h in howToDoList) { // go through each item in how list
    //         proxyprinttodiv("dothis - h ", h, 11);
    //         howToDo = howToDoList[h]['dothis']; // get specific howToDo from list
    //         howToDoParams = howToDoList[h]['params']; // get params that were stored
    //         if ((howToDoParams === undefined) || (howToDoParams === "")) {
    //             howToDoParams = {};
    //         }
    //         proxyprinttodiv("executelist Hparams ", howToDoParams, 11);
    //         proxyprinttodiv("executelist howToDo ", howToDo, 11);

    //         for (w in whatToDoList) { // step through whatlist
    //             whatToDo = whatToDoList[w]['dothis']; // get specific whattodo
    //             whatToDoFn = whatToDoList[w]['dofn'];
    //             whatToDoParams = whatToDoList[w]['params'];
    //             if ((whatToDoParams === undefined) || (whatToDoParams === "")) {
    //                 whatToDoParams = {};
    //             }
    //             // if((params !== undefined) && (whatToDoList !== undefined)) {
    //             //     params = jsonConcat(params, whatToDoList[w]['params']); // concatenate with other pararms
    //             // } 
    //             // else if(whatToDoList[w]['params'] !== undefined) { // if we cannot concat the params see if there are some params in the what to do list to load
    //             //     params = whatToDoList[w]['params'];
    //             // } 
    //             proxyprinttodiv("executelist Wparams ", whatToDoParams, 11);
    //             proxyprinttodiv("executelist whatToDo ", whatToDoFn, 11);
    //             proxyprinttodiv("executelist whatToDoFn ", whatToDoFn, 11);
    //             executeobject = getexecuteobject(jsonConcat(howToDoParams, whatToDoParams), howToDo, whatToDo, whatToDoFn); // get status of that fn
    //             proxyprinttodiv("executelist executeobject ", executeobject, 11);
    //             if (executeobject) {
    //                 break;
    //             } // if fnparams sent back (fn found) then end
    //         } // for w
    //         if (executeobject) {
    //             break;
    //         }
    //     } // for h

    //     if (!executeobject.skipExecuteObjCheck && (typeof executeobject === 'object' && Object.keys(executeobject).length != 0)) { // need to check to see if execute is an object first (running object.keys on non object will blow it up)
    //         proxyprinttodiv("executelist executeobject ", executeobject, 11);
    //         targetfn = executeobject.targetfn;
    //         whatToDo = executeobject.whatToDo;
    //         params = executeobject.params;
    //         synchflag = executeobject.synchflag;

    //         // if (synchflag) { // if callback then call synch
    //         //     callback(err, executethis(params, targetfn));
    //         // } else { // else call asynch
    //         //     targetfn(params, callback)
    //         // }

    //         targetfn(params, function (err, res) {
    //             outputResultsArr.push(res);
    //             console.log("The outputResultsArr contains:" + JSON.stringify(outputResultsArr));
    //             callback(err, outputResultsArr);
    //         });


    //     } else if (executeobject.skipExecuteObjCheck) { // if case "executegetwid" returned data directly to executeobject
    //         delete executeobject['skipExecuteObjCheck'];
    //         callback(err, executeobject);
    //     } else { // if no execute
    //         callback(err, {
    //             "error": "no executethis provided"
    //         }); // if nothing to execute return parameters
    //     }
    // } //fn   
    // executelist code:
    // step through howtodolist/whattodolist (inline) recursively 
    // set flags for what level is being done (how or what)
    // once something execute the allow execute flag for that level turns off until change of executeorder detected
    // getexecuteobject always returns something…so something can always be executed
    // we sometimes execute executeerror fn to get errors
    // for executegetwid, set up the data, we execute it normal (we may need to add some code)

    function executelist(howToDoList, whatToDoList, callback) {
        proxyprinttodiv("executelist - howToDoList ", howToDoList, 17);
        proxyprinttodiv("executelist - whatToDoList ", whatToDoList, 17);



        function debugvars(varlist) {
            var allvars = {
                1: {
                    "howToDoList": howToDoList,
                    "whatToDoList": whatToDoList,
                    "howallowexecute": howallowexecute,
                    "whatallowexecute": whatallowexecute,
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
            }

            var resultObj = {};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {
                    varlist.push(eachgroup);
                }
            }

            for (var eachgroup in varlist) {
                vargroup = varlist[eachgroup];
                resultObj = jsonConcat(resultObj, allvars[vargroup]);
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
                proxyprinttodiv("executelist begin how howallowexecute ", howallowexecute, 18);
                proxyprinttodiv("dothis - h ", h, 18);
                howToDo = h['dothis']; // get specific howToDo from list
                howToDoParams = h['params']; // get params that were stored
                if ((howToDoParams === undefined) || (howToDoParams === "")) {
                    howToDoParams = {};
                }

                proxyprinttodiv("executelist howToDo ", howToDo, 18);
                if (howexecuteorder !== h.executeorder) {
                    // if orders are different, then we are in new iteration of do, reset flat to allow how execute
                    howallowexecute = true;
                }
                howexecuteorder = h.executeorder;

                whatallowexecute = howallowexecute;
                whatexecuteorder = 1;

                async.mapSeries(whatToDoList, function (w, cbMapW) {
                        proxyprinttodiv("execute - I howallowexecute", howallowexecute, 18);
                        proxyprinttodiv("execute - I whatexecuteorder", whatallowexecute, 18);
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
                        proxyprinttodiv("execute - whatToDo", whatToDo, 18);

                        if (whatexecuteorder !== w.executeorder) {
                            // executeorder changed, reset whatallowexecute, other allow it to remain
                            whatallowexecute = true;
                        }
                        whatexecuteorder = w.executeorder;

                        proxyprinttodiv("executelist end what howallowexecute ", howallowexecute, 18);
                        proxyprinttodiv("executelist end what whatallowexecute ", whatallowexecute, 18);
                        //debugfn("executelist", "executelist", "execute", "mid", debugcolor, debugindent, debugvars([1, 2, 3]));

                        if ((howallowexecute) && (whatallowexecute)) { //if both allowed to execute
                            getexecuteobject(jsonConcat(howToDoParams, whatToDoParams), howToDo, whatToDo, whatToDoFn,
                                function (err, executeobject) {
                                    // always will get something back, even if errorfn...so always execute and store resutls
                                    proxyprinttodiv("executelist executeobject ", executeobject, 17);
                                    proxyprinttodiv("executelist executeobject ", executeobject.params, 17);
                                    proxyprinttodiv("executelist executeobject ", String(executeobject.targetfn), 17);
                                    if (executeobject.targetfn) {
                                        executeobject.targetfn(executeobject.params, function (err, res) {
                                            proxyprinttodiv("executelist result from execution ", res, 17);
                                            whatallowexecute = false;
                                            if (executeobject.executeflag === true) { // if executegetwid then execute with the results
                                                execute(res, function (err, res) {
                                                    outputResultsArr.push(res);
                                                    cbMapW(null, "What Iteration");
                                                })
                                            } else { // executeflag=false
                                                outputResultsArr.push(res);
                                                cbMapW(null, "What Iteration");
                                            }
                                        });
                                        } // if executeobject.targetfn
                                    else {
                                         cbMapW(null, "What Iteration");
                                        }

                                    // else ((howallowexecute) && (whatallowexecute))  ... do something else
                                }); //executeobject callback
                        } else {
                            cbMapW(null, "What Iteration");
                        }
                    },
                    function (err, res) {
                        proxyprinttodiv("executelist end of what outputResultsArr ", outputResultsArr, 17);
                        howallowexecute = false;
                        cbMapH(null, "How Iteration");
                        console.log(' completed whatToDoList iteration in sync fashion.');


                    });

                // map w,

            },
            function (err, res) {
                console.log('>>> very outside >>> ' + JSON.stringify(outputResultsArr));
                proxyprinttodiv("execute - resultsArr", outputResultsArr, 17);
                // executearray(resultsArr, function (err, res) {
                //     outputResultsArr = arrayUnique(outputResultsArr.concat(res));
                //     callback(err, outputResultsArr);
                //     console.log(' completed  howToDoList iteration in sync fashion.');
                // });
                callback(err, outputResultsArr);
            });
        debugcolor--;
    }   


    // function getexecuteobject(params, howToDo, whatToDo, whatToDoFn) {
    //     var targetfn = undefined;
    //     var tempobject;
    //     var synchflag;
    //     var fncheck = false;

    //     proxyprinttodiv("getexecuteobject", whatToDo, 11);
    //     if ((howToDo) && (whatToDo)) {

    //         switch (howToDo) {

    //         case "dothis":
    //             if (whatToDoFn !== window[whatToDo]) {
    //                 targetfn = window[whatToDo];
    //             } else {
    //                 targetfn = whatToDoFn;
    //             }

    //             if ((targetfn === undefined) || (targetfn === "")) {
    //                 // we want to return undefined here so we try the next case
    //                 targetfn = undefined;
    //                 break;
    //             }
    //             break;

    //         case "executeparam":
    //             if (params === undefined) {
    //                 targetfn = undefined;
    //                 break;
    //             }

    //             targetfn = params[whatToDo];

    //             if (!targetfn instanceof Function) {
    //                 targetfn = window[targetfn];
    //             } else if (typeof targetfn === 'string') {
    //                 targetfn = window[targetfn];
    //             }

    //             break;

    //         case "executegetwid":
    //             execute({executethis:'getwid',wid: whatToDo}, function (err, result) {
    //                 tempobject = result;
    //                 if (tempobject !== undefined && tempobject['js']) {
    //                     targetfn = tempobject['js'];
    //                 } else {
    //                     tempobject.skipExecuteObjCheck = true;
    //                     return tempobject;
    //                 }
    //             });
    //             break;

    //         case "server":
    //             targetfn = window["server"];
    //             params['executethis'] = whatToDo;
    //             fncheck = true;
    //             break;

    //         case "executeerror":
    //             targetfn = window["executeerror"];
    //             break;
    //         }

    //         if (targetfn !== undefined) {
    //             synchflag = (targetfn.length == 1);
    //         }


    //         if (fncheck) {
    //             // check to see if it is a string fucntion
    //             // check to see if it is a 
    //             if (!targetfn instanceof Function) {
    //                 if (targetfn.indexOf('function') != -1) {
    //                     if (window[targetfn]) {
    //                         targetfn = window[targetfn]
    //                     } else {
    //                         targetfn = executeerror;
    //                     }
    //                 }
    //             }
    //         }
    //         if (targetfn) {
    //             proxyprinttodiv("executelist targetfunction ", String(targetfn), 11);
    //             return {
    //                 targetfn: targetfn,
    //                 whatToDo: whatToDo,
    //                 params: params,
    //                 synchflag: synchflag
    //             }
    //         } else {
    //             return undefined
    //         }
    //     } else { // if no exeucte this
    //         return undefined
    //     }
    // } // fn


    function getexecuteobject(params, howToDo, whatToDo, whatToDoFn, callback) {
        // code tries to get appropriate executeobject...will always return something even if error fn
        var targetfn = undefined;
        var executeflag = false;

        proxyprinttodiv("getexecuteobject howToDo", howToDo, 17);
        proxyprinttodiv("getexecuteobject whatToDo", whatToDo, 17);
        //proxyprinttodiv("getexecuteobject fn whatToDo", String(window[whatToDo]), 17);
        if ((!howToDo) || (!whatToDo)) {
            params["etstatus"] = "invalidconfig"
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
            if (params === undefined) {
                targetfn = undefined;
                break;
            }

            targetfn = params[whatToDo];

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
    }



    function getexecuteobject(params, howToDo, whatToDo, whatToDoFn, callback) {
        // code tries to get appropriate executeobject...will always return something even if error fn
        var targetfn = undefined;
        var executeflag = false;

        proxyprinttodiv("getexecuteobject howToDo", howToDo, 17);
        proxyprinttodiv("getexecuteobject whatToDo", whatToDo, 17);
        //proxyprinttodiv("getexecuteobject fn whatToDo", String(window[whatToDo]), 17);
        if ((!howToDo) || (!whatToDo)) {
            params["etstatus"] = "invalidconfig"
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
            if (params === undefined) {
                targetfn = undefined;
                break;
            }

            targetfn = params[whatToDo];

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

        //proxyprinttodiv("getexecuteobject targetfn I", String(targetfn), 17);
        if ((targetfn === undefined) || (targetfn === "")) {
            params["etstatus"] = "nofn";
            targetfn = executeerror; // we want to return undefined here so we try the next case
        } else {
            if (!targetfn instanceof Function) { // check to see if it is a string fucntion
                if (targetfn.indexOf('function') != -1) {
                    if (window[targetfn]) {
                        targetfn = window[targetfn]
                    } else {
                        params["etstatus"] = "invalidfn"
                        targetfn = executeerror;
                    }
                }
            }
        }

        //proxyprinttodiv("getexecuteobject result targetfunction ", String(targetfn), 17);
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
            output = {}
        };
        if (params !== undefined) {
            output["etstatus"] = params["etstatus"]
        } else {
            output["etstatus"] = "error"
        };
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
    // takes in an array of inbound parameters(for different requests)
    // 
    // exports.executearray = window.executearray = executearray = function executearray(paramsArr, callback) {
    //     console.log('>>>> paramsArr beginning >>>> ' + JSON.stringify(paramsArr));
    //     var resultlist = [];
    //     async.mapSeries(paramsArr, function (inboundparms, cbMap) {
    //         // each iteration 
    //         // var inboundparms = {};
    //         // extend(true, inboundparms, received_params); // clone received params
    //         if ((inboundparms !== undefined) && (inboundparms["executethis"] === "test1")) {
    //             cbMap(null, {
    //                 'test1': 'Reached test1 code.. executearray function'
    //             });
    //         } else {
    //             execute(inboundparms, function (err, retResults) {
    //                 resultlist.push(retResults);
    //                 // console.log('>>>> inboundparms >>>> ' + JSON.stringify(inboundparms));
    //                 // console.log('>>>> retResults interim  >>>> ' + JSON.stringify(retResults));
    //                 cbMap(null);
    //             });
    //         }
    //     }, function (err, res) {
    //         // end of all the execution that was meant to be
    //         console.log('>>>> retResults final  >>>> ' + JSON.stringify(resultlist));
    //         callback(err, resultlist);
    //     });
    // };
    exports.executearray = window.executearray = executearray = function executearray(paramsArr, callback) {
        // console.log('>>>> paramsArr beginning >>>> ' + JSON.stringify(paramsArr));
        proxyprinttodiv('Function executearray paramsArr', paramsArr, 17);
        var resultlist = [];
        async.mapSeries(paramsArr, function (inboundparms, cbMap) {
            // each iteration if only one item in list then convert to object—do this at end of execute
            if ((inboundparms !== undefined) && (inboundparms["executethis"] === "test1")) {
                cbMap(null, {
                    'test1': 'Reached test1 code.. executearray function'
                });
            } else {
                proxyprinttodiv('Function array array inboundparms', inboundparms, 99);
                if (inboundparms instanceof Array) {
                    executearray(inboundparms, function (err, retResults) {
                        // resultlist.push(retResults);
                        cbMap(null, resultlist);
                    });
                } else {
                    proxyprinttodiv('Function executearray inboundparms', inboundparms, 17);
                    execute(inboundparms, function (err, retResults) {
                        console.log('>>>> retResults >>>> ' + JSON.stringify(retResults));
                        proxyprinttodiv('Function retResults', retResults, 17);
                        resultlist.push(retResults);
                        proxyprinttodiv('Function resultlist', resultlist, 17);
                        cbMap(null, resultlist);
                    });
                }
            } // else
        }, function (err, res) {
            // end of all the execution that was meant to be
            console.log('>>>> retResults final  >>>> ' + JSON.stringify(res));
            console.log('asynchronously finished executing executearray.');
            proxyprinttodiv('Function executearray resultlist', resultlist, 99);
            callback(null, resultlist);
        });
    }
    // create executethismultiple
    // based on executeArray create excutethismultiple(array, execute, executeFilter, executeOrder, executeLimit, callback)

    // execute: execute or angularexeucte
    // executeFilter, only execute in the array if execuetthis=
    // executeOrder: series parallel waterfall
    // executeLimit: default 10

    // Case of executeOrder
    // async.parallelLimit([
    // async.seriesLimit([
    // async.waterfall([
    exports.executethismultiple = window.executethismultiple = executethismultiple = function executethismultiple(paramsArr, executeparameter, executeFilter, executeOrder, executeLimit, callback) {

        var resultlist = [];
        var fnProcess = window[executeparameter];

        // filter the inboundparms as per the executeFilter condition

        function executeFilterPass(executeObject) {
            return (executeFilter && executeObject.executethis === executeFilter);
        }

        async.filter(paramsArr, executeFilterPass, function (filteredParamsArr) {
                // results now equals to a subset with qualifying filter condition met

                // process as per executeOrder value
                switch (executeOrder) {

                case "series":
                    async.mapSeriesLimit(filteredParamsArr, executeLimit, fnProcess, function (err, result) {
                        resultlist.push(result);
                        //callback(err, result);
                        console.debug('processed passed array in a series manner.');
                    });
                    break;


                case "parallel":
                    async.mapLimit(filteredParamsArr, executeLimit, fnProcess, function (err, result) {
                        resultlist.push(result);
                        //callback(err, result);
                        console.debug('processed passed array in a parallel manner.');
                    });
                    break;


                case "waterfall":
                    var fnarray = []

                    // build a passable functions array for waterfall to process
                    for (var i = 0;
                        (i < filteredParamsArr.length && i < executeLimit); i++) {
                        var fn = function (cb) {
                            fnProcess(filteredParamsArr[i], function (err, res) {
                                cb(err, res);
                            });
                        };
                        fnarray.push(fn);
                    }

                    async.waterfall(fnarray, function (err, result) {
                        resultlist.push(result);
                        //callback(err, result);
                        console.debug('processed passed array in a waterfall manner.');
                    });
                    break;

                default:
                    console.debug('not processed anything .. no executeOrder received.');
                    break;
                }

            }


            //        callback(err, resultlist);


        );
    }


    // create fn executemultiple that calls executethismultiple
    // fish out parameters the call executethismultiple
    // takes in an array of inbound parameters(for different requests)
    // 
    exports.executemultiple = window.executemultiple = executemultiple = function executemultiple(parameters, callback) {
        var paramsarray = [];
        parameters = tolowerparameters(parameters, {
            'command.executemethod': 'execute',
            'command.excutefilter': 'addwid',
            'command.executeorder': 'series',
            'command.executelimit': 15,
        });

        if (!parameters instanceof Array) {
            paramsarray = parameters["parameters"];
        } else { // if array
            paramsarray = parameters;
        }

        executethismultiple(paramsarray, parameters.command.executemethod, parameters.command.executefilter,
            parameters.command.executeorder, parameters.command.executelimit, callback);
    }
})(typeof window == "undefined" ? global : window);



//          for (h in howToDoList) { // go through each item in how list
//            proxyprinttodiv("dothis - h ", h, 11);
//            howToDo = howToDoList[h]['dothis']; // get specific howToDo from list
//            howToDoParams = howToDoList[h]['params']; // get params that were stored
//            if ((howToDoParams === undefined) || (howToDoParams === "")) {
//                howToDoParams = {};
//            }
//            proxyprinttodiv("executelist Hparams ", howToDoParams, 11);
//            proxyprinttodiv("executelist howToDo ", howToDo, 11);

//            async.mapSeries(whatToDoList, function (cbMap) {
//                // for (w in whatToDoList) { // step through whatlist
//                if (executeobject) {
//                    cbMap(null);
//                } else {
//                    async.series([
//                        function part1(cb) {
//                            // whatToDo = whatToDoList[w]['dothis'];
//                            whatToDo = whatToDoList[w][howToDo]; // get specific whattodo
//                            whatToDoFn = whatToDoList[w]['dofn'];
//                            whatToDoParams = whatToDoList[w]['params'];
//                            if ((whatToDoParams === undefined) || (whatToDoParams === "")) {
//                                whatToDoParams = {};
//                            }
//                            // if((params !== undefined) && (whatToDoList !== undefined)) {
//                            //     params = jsonConcat(params, whatToDoList[w]['params']); // concatenate with other pararms
//                            // } 
//                            // else if(whatToDoList[w]['params'] !== undefined) { // if we cannot concat the params see if there are some params in the what to do list to load
//                            //     params = whatToDoList[w]['params'];
//                            // } 
//                            proxyprinttodiv("executelist Wparams ", whatToDoParams, 11);
//                            proxyprinttodiv("executelist whatToDo ", whatToDoFn, 11);
//                            proxyprinttodiv("executelist whatToDoFn ", whatToDoFn, 11);
//                            cb(null, "part1");
//                        },
//                        function part2(cb) {
//                            // TODO :: SAURABH :: create a list here in executeobject for multiple .. ??
//                            executeobject = getexecuteobject(jsonConcat(howToDoParams, whatToDoParams), howToDo, whatToDo, whatToDoFn); // get status of that fn
//                            cb(null, "part2");
//                        },
//                        function part3(cb) {
//                            proxyprinttodiv("executelist executeobject ", executeobject, 11);
//                            // if (executeobject) {
//                            //     break;
//                            // } // if fnparams sent back (fn found) then end
//                            cb(null, "part3");
//                        }
//                    ], function (err, resp) {
//                        cbMap(null);
//                    });
//                }
//                // } // for w
//            }, function (err, res) {
//                console.log(' completed whatToDoList iteration in sync fashion.');
//            });
//            if (executeobject) {
//                break;
//            }
//        } // for h

//     var outputResultsArr = [];

//     var howToDoParams;
//     var howToDo;
//     var h;
//     var whatToDoParams;
//     var whatToDo;
//     var w;
//     var whatToDoFn;
//     var howexecuteorder;
//     var whatexecuteorder;
//     var howtryorder;
//     var whattryorder;
//     howexecuteorder = 179; // to force howallowexecute to true in check below
//     // step through howtodolist and whattodolist, check each combination to see if it should be done, do it, go to next

//     (function recursivestep(processhowtodolevel, currentwhat, currenthow, whatallowexecute, howallowexecute) {
//         debugfn("executelist", "recursivestep", "execute", "rec1", debugcolor, debugindent, debugvars([1, 2, 3]));

//         if (processhowtodolevel) { // flag to if "How" level should be done
//             proxyprinttodiv("executelist processhowtodolevel ", processhowtodolevel, 17);
//             proxyprinttodiv("executelist currenthow ", currenthow, 17);
//             proxyprinttodiv("executelist currentwhat ", currentwhat, 17);
//             proxyprinttodiv("executelist howallowexecute ", howallowexecute, 17);
//             proxyprinttodiv("executelist whatallowexecute ", whatallowexecute, 17);
//             h = howToDoList[currenthow]; // h is copy if this iterations howtodolist
//             if (howexecuteorder !== h.executeorder) {
//                 // if orders are different, then we are in new iteration of do, reset flat to allow how execute
//                 howallowexecute = true;
//             }
//             proxyprinttodiv("executelist h ", h, 17);
//             howexecuteorder = h.executeorder; // load up current how order/try
//             howtryorder = h.tryorder;
//             proxyprinttodiv("executelist howtryorder ", howtryorder, 17);
//             howToDo = h['dothis']; // get specific howToDo from list
//             proxyprinttodiv("executelist howToDo ", howToDo, 17);
//             howToDoParams = h['params']; // get params that were stored
//             if ((howToDoParams === undefined) || (howToDoParams === "")) { // if not parms in config make sure obejct ok
//                 howToDoParams = {};
//             }
//             whatexecuteorder = 179; // reset what's before start -- force whatallowexecute to true below
//             currentwhat = 0;
//             whatallowexecute = howallowexecute; // adopt allow execute from parent how 
//         }
//         // "What" level  

//         proxyprinttodiv("executelist whatexecuteorder ", whatexecuteorder, 17);
//         proxyprinttodiv("executelist whattryorder ", whattryorder, 17);
//         w = whatToDoList[currentwhat];
//         if (whatexecuteorder !== w.executeorder) {
//             // executeorder changed, reset whatallowexecute, other allow it to remain
//             whatallowexecute = true;
//         }
//         whatexecuteorder = w.executeorder;
//         whattryorder = w.tryorder;
//         proxyprinttodiv("execute - w", w, 17);
//         if (w[howToDo]) {
//             whatToDo = w[howToDo]; // try to get specific config for whatToDo ie getwid.server
//         } else {
//             whatToDo = w['dothis']; // default
//         }
//         whatToDoFn = w['dofn'];
//         whatToDoParams = w['params'];
//         proxyprinttodiv("executelist w ", w, 17);

//         if ((whatToDoParams === undefined) || (whatToDoParams === "")) {
//             whatToDoParams = {};
//         }
//         proxyprinttodiv("execute - h", h, 17);
//         proxyprinttodiv("execute - whatToDo", whatToDo, 17);

//         if ((howallowexecute) && (whatallowexecute)) { //if both allowed to execute
//             getexecuteobject(jsonConcat(howToDoParams, whatToDoParams), howToDo, whatToDo, whatToDoFn, function (err, executeobject) {
//                 // always will get something back, even if errorfn...so always execute and store resutls
//                 proxyprinttodiv("executelist executeobject ", executeobject, 11);
//                 executeobject.targetfn(executeobject.params, function (err, res) {
//                     outputResultsArr.push(res);
//                     // if res = then maybe do another execute???? getexecute case
//                     proxyprinttodiv("execute - I currenthow", currenthow, 17);
//                     proxyprinttodiv("execute - I currentwhat", currentwhat, 17);
//                     proxyprinttodiv("execute - I howallowexecute", howallowexecute, 17);
//                     proxyprinttodiv("execute - I whatexecuteorder", whatallowexecute, 17);
//                     // if we executed something, set allows to false, a new executeorder will reset it back to true
//                     currentwhat++;
//                     if (whatToDoList[currentwhat]) { // if still whattodolist then not done, 
//                         recursivestep(false, currentwhat, currenthow, false, howallowexecute);
//                     } else {
//                         currenthow++;
//                         if (howToDoList[currenthow]) {
//                             recursivestep(true, currentwhat, currenthow, false, false);
//                         } else {
//                             // done
//                         }
//                     } // else whattodolist        
//                 }); //targetfn
//             }); // get executeobject
//         } // if allowexecute
//         else { // if allow flags did to allows us to execute then keep allow flags to original val
//             proxyprinttodiv("execute - III currenthow", currenthow, 17);
//             proxyprinttodiv("execute - III currentwhat", currentwhat, 17);
//             proxyprinttodiv("execute - III howallowexecute", howallowexecute, 17);
//             proxyprinttodiv("execute - III whatexecuteorder", whatallowexecute, 17);
//             currentwhat++;
//             if (whatToDoList[currentwhat]) {
//                 recursivestep(false, currentwhat, currenthow, whatallowexecute, howallowexecute); // could be true/false
//             } else {
//                 currenthow++;
//                 if (howToDoList[currenthow]) {
//                     recursivestep(true, currentwhat, currenthow, whatallowexecute, howallowexecute); // could be true/false
//                 } else {
//                     // done
//                 }
//             } // else whattodolist        
//         } // else if not allowexecute

//     })(true, 0, 0, true, true); //recurse end

// }

//
