// addwidmaster, getwidmaster, updatewid, getwid
(function (window) {
    // var configuration = config.configuration;



    exports.getwid = getwid = function getwid(inputWidgetObject, callback) {

        authcall(inputWidgetObject, function (err, ret) {
            if (err || !ret) {
                callback(err, {
                    "etstatus": "unauthroized"
                });
            } else {

                delete inputWidgetObject['executethis']; // ** added by Saurabh 10/9

                proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);
                // var outobjectarr = [];


                getfrommongo(inputWidgetObject, function (err, resultobject) {
                    // convert the object from dri standard before returnning it
                    callback({}, convertfromdriformat(resultobject));
                });
                
                // getfrommongo(inputWidgetObject, function (err, results) {
                //     var outobject = {};
                //     if (results && (Object.keys(results).length > 0)) {
                //         if (results["data"]) {
                //             outobject = results["data"];
                //         }

                //         if (results['wid']) {
                //             outobject['wid'] = results['wid'];
                //         } else {
                //             outobject['wid'] = "";
                //         }

                //         if (results['metadata']) { // note date will not come back
                //             outobject['metadata.method'] = results['metadata']['method'];
                //         } else {
                //             outobject['metadata.method'] = "";
                //         }
                //     }

                //     callback(err, outobject);
                // });
            }
        });
    }




    exports.aggressivedto = aggressivedto = function aggressivedto(widInput, preamble, level, callback) { // returns a made up dto base on maximum number of relationships, etc
        // local vars
        var moreDTOParameters;
        var targetwid = "";
        var nexttargetwid = "";
        var nextpreamble = "";
        var executeobject = {};
        var parameterObject;
        var err;
        var res;
        var dtoGlobalParameters = {};

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "widInput":widInput,
                    "preamble":preamble,
                    "level":level,
                    "parameterObject": parameterObject,
                    "moreDTOParameters": moreDTOParameters,
                    "targetwid": targetwid,
                    "eachresult": '',
                    "key": '',
                    "rightparameters": {},
                    "executeobject": executeobject,
                    "dtoGlobalParameters": dtoGlobalParameters,
                    "err": err
                }
            };
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

        async.series([

                function step1(cb) {
                    if (!level) {
                        level = 10
                    } else {
                        level = level - 1;
                    } //how many levels to try
                    if (preamble === undefined) {
                        preamble = "";
                    }
                    if (preamble != "") {
                        preamble = preamble + ".";
                    }

                    targetwid = widInput;
                    executeobject["wid"] = widInput;
                    executeobject['executethis'] = 'getwid';
                    execute(executeobject, function (err, res) { // getwid
                        res=res[0];
                        if (Object.keys(res).length != 0) {
                            parameterObject = res;
                            moreDTOParameters=parameterObject;
                            debugfn("aggressivedto getwid", "aggressivedto", "get", "begin", debugcolor, debugindent, debugvars([1]));
                            if ((parameterObject["metadata.method"]) && (parameterObject["metadata.method"]!=targetwid)) {
                                targetwid = parameterObject['metadata.method'];
                                executeobject = {};
                                executeobject["wid"] = targetwid;
                                executeobject["executethis"] = 'getwid';
                                execute(executeobject, function (err, res) { // now get method
                                    res=res[0];
                                    proxyprinttodiv('Function aggressivedto resultlist', res,10);
                                    debugfn("aggressivedto get method", "aggressivedto", "get", "begin", debugcolor, debugindent, debugvars([1]));
                                    if (Object.keys(res).length != 0) {
                                        moreDTOParameters=res;
                                        }
                                    cb(null)
                                    })
                                }
                            else {
                                cb(null)
                                }
                            }
                        else { // if no object
                            targetwid=""; // if no object to follow then targetwid="";
                            cb(null);
                            }                       
                    });
                },
                // parameterObject = wid, moreDTOparameters = methdd, targetwid = chain to follow

                function step2(cb) {
                    proxyprinttodiv('Function aggressivedto targetwid', targetwid,10);
                    if (targetwid!="") {
                    //if ((parameterObject !== undefined) && (parameterObject['metadata.method'] != "") && (parameterObject['metadata.method'] != targetwid)) {
                        async.series([ // asynch step1n2

                                // function step2n1(cb1) {
                                //     targetwid = parameterObject['metadata.method'];
                                //     executeobject = {};
                                //     executeobject["wid"] = targetwid;
                                //     executeobject["executethis"] = 'getwid';


                                //     execute(executeobject, function (err, res) {
                                //         moreDTOParameters = res[0];
                                //         if (Object.keys(moreDTOParameters).length != 0) {
                                //             parameterObject = jsonConcat(parameterObject, moreDTOParameters)
                                //         }
                                //         debugfn("aggressivedto step2n1", "aggressivedto", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                //         cb1(null, 'step2n1');
                                //     });

                                // },
                                function step2n2(cb1) {
                                    executeobject = {};
                                    executeobject["mongowid"] = targetwid;
                                    executeobject["mongorelationshiptype"] = "attributes";
                                    executeobject["mongorelationshipmethod"] = "all";
                                    executeobject["mongorelationshipdirection"] = "forward";
                                    executeobject["mongowidmethod"] = "";
                                    executeobject["convertmethod"] = "";
                                    executeobject["dtotype"] = "";
                                    executeobject["executethis"] = 'querywid';
                                    execute(executeobject, function (err, res) {
                                        proxyprinttodiv('Function aggressivedto executeobject', executeobject,10);
                                        proxyprinttodiv('Function aggressivedto res', res,10);
                                        moreDTOParameters = res;
                                        debugfn("aggressivedto step2n2", "aggressivedto", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                        cb1(null, 'step2n1');
                                    });
                                }
                            ],
                            function (err, res) {
                                if (err) {
                                    throw err;
                                }
                                debugfn("aggressivedto if", "aggressivedto", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                cb(null, 'two');
                            });
                    } else {
                        debugfn("aggressivedto if ii", "aggressivedto", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'two');
                    }
                },
                function step3(cb) {
                    if (moreDTOParameters && moreDTOParameters.length>0) {
                        var listToDo = [];
                        var eachresult;
                        proxyprinttodiv('Function aggressivedto moreDTOParameters', moreDTOParameters,10);
                        for (eachresult in moreDTOParameters) { // list, for each item in list
                            listToDo.push(eachresult);
                        }

                        async.mapSeries(listToDo, function (eachresult, cbMap) {
                                var rightparameters = {};
                                var params;
                                var key;
                                proxyprinttodiv('Function aggressivedto moreDTOParameters[eachresult]', moreDTOParameters[eachresult],10);
                                for (key in moreDTOParameters[eachresult]) { 
                                    rightparameters = moreDTOParameters[eachresult][key];
                                }
                                // list is {wid : {}}
                                // key = wid

                                // from dto create outgoing object
                                // if (moreDTOParameters[key]) {
                                //     parameterObject[key] = moreDTOParameters[key]
                                // }
                                if (level > 0) {
                                    async.series([

                                            function step3n1(cbn1) {
                                                proxyprinttodiv('Function aggressivedto recurse', key,10);
                                                aggressivedto(key, key, level, function (err, data) { //TODO consider -- DONE
                                                    params = data;
                                                    debugfn("aggressivedto step3n1", "aggressivedto", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                                    cbn1(null);
                                                });
                                            },
                                            function step3n2(cbn2) {
                                                parameterObject = jsonConcat(parameterObject, params);
                                                debugfn("aggressivedto step3n2", "aggressivedto", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                                cbn2(null);
                                            }
                                        ],
                                        function (err, results) {

                                        });
                                }
                                cbMap(null);
                            },
                            function (err, res) {
                                if (err) {
                                    throw err;
                                }
                            });

                        cb(null, 'three')
                        } // length > 0 
                    else {
                        cb(null, 'three')
                        }
                    },
                function step4(cb) {

                    for (var eachresult in parameterObject) {
                        dtoGlobalParameters[preamble + eachresult] = parameterObject[eachresult];
                    }
                    debugfn("aggressivedto step4", "aggressivedto", "get", "end", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'four');
                }
            ],
            function (err, results) {
                callback(err, dtoGlobalParameters);
            });


    };

    function getcleanparameters(resultObj, dtotype, accesstoken, cleanmethod, convertmethod, callback) {
        var outputparameters = {};
        var dtoloc = 0;
        var proposedLeft = "";
        var proposedRight = "";
        var dtoobject = {};
        var inputParametersObject = {};
        var childdto = dtotype;
        var moreParameters = {};
        var executeobject = {};
        var otherdtoobject = {};
        var resultlist = [];
        var ret = undefined;
        var err;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "outputparameters": outputparameters,
                    "dtoloc": dtoloc,
                    "proposedLeft": proposedLeft,
                    "proposedRight": proposedRight,
                    "dtoobject": dtoobject,
                    "inputParametersObject": inputParametersObject,
                    "childdto": childdto,
                    "preAmble": '',
                    "item": '',
                    "moreParameters": moreParameters,
                    "executeobject": executeobject,
                    "eafield": '',
                    "otherdtoobject": otherdtoobject,
                    "resultlist": resultlist,
                    "ret": ret,
                    "err": err
                },
                2: {
                    "outputparameters": outputparameters,
                    "dtoloc": dtoloc,
                    "proposedLeft": proposedLeft,
                    "proposedRight": proposedRight
                }
            };
            var resultObj = {};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {
                    varlist.push(eachgroup)
                };
            }

            for (var eachgroup in varlist) {
                vargroup = varlist[eachgroup]
                resultObj = jsonConcat(resultObj, allvars[vargroup]);
            }
            return resultObj;
        }


        // goal of this section is to get inherited parameters
        async.series([

                function step1(cb) {
                    for (var item in resultObj) { // now step through each record that could be changed
                        if (item.indexOf("addthis.") !== -1) { // if you found "addthis." then remove from resultObj
                            resultObj[item.replace("addthis.", "")]=resultObj[item]; // then and readd without addthis
                            delete resultObj[item]; // delete the old one
                            }
                    }

                    proxyprinttodiv("getcleanparameters removed addthis: ", resultObj, 17);

                    if (((resultObj['wid'] !== undefined)) &&
                        ((resultObj['wid'] !== resultObj['metadata.method']) || (dtotype = "defaultdto"))) {

                        aggressivedto(resultObj['wid'], "", 10, function (err, res) {
                            dtoobject = res;



                            var listtodo = [];
                            for (var item in dtoobject) {
                                listtodo.push(item);
                            }


                            async.mapSeries(listtodo, function (item, cbMap) {
                                    async.series([ // asych inside map
                                        function step1n1(cb2) {

                                            // TODO :: add steps here -- DONE
                                            preamble = "";
                                            proposedLeft = item;
                                            proposedRight = dtoobject[item];

                                            if (proposedRight == 'inherit') {
                                                dtoloc = proposedLeft.lastIndexOf(".");

                                                if (dtoloc != -1) {
                                                    preamble = proposedLeft.substring(0, dtoloc);
                                                    proposedLeft = proposedLeft.substring(dtoloc + 1, proposedLeft.length);
                                                }
                                                executeobject = {};
                                                executeobject["command.convertmethod"] = "nowid";
                                                executeobject["wid"] = proposedLeft;
                                                executeobject["executethis"] = 'getwidmaster';

                                                execute(executeobject, function (err, res) {
                                                    moreParameters = res[0];

                                                    for (var eafield in moreParameters) {
                                                        if (preamble == "") {
                                                            resultObj[eafield] = moreParameters[eafield];
                                                        } else {
                                                            resultObj[preamble + '.' + eafield] = moreParameters[eafield];
                                                        }
                                                    }
                                                    debugfn("getcleanparameters", "step1n1", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                                    cb2(null, 'one');
                                                });
                                                // moreParameters = executethis(executeobject, getwidmaster); // TODO -- DONE
                                            } else {
                                                debugfn("getcleanparameters", "step1n1", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                                cb2(null, 'one');
                                            }
                                        }
                                    ], function (err, res) {
                                        cbMap(null);
                                    });
                                }, // map series

                                function (err, res) {
                                    if (err) {
                                        throw err;
                                    }
                                    cb(null, 'one');
                                }); // end of map series
                        });

                    }
                }, // end step1

                function step2(cb) {
                    // read dto -- and delete what should not surive
                    if (dtotype == "") {
                        dtotype = resultObj["metadata.method"];
                    }

                    if (resultObj["metadata.method"] != dtotype) {

                        for (var item in resultObj) { // now step through each record that could be changed
                            proposedLeft = item;
                            proposedRight = resultObj[item];
                            proposedLeft = ""; // work on left first...check if add or remvove
                            dtoloc = item.indexOf(dtotype + ".");

                            if (dtoloc != -1) {
                                proposedLeft = item.substring(dtoloc + dtotype.length + 3, item.length);

                                if (convertmethod == "dtonum") {
                                    proposedLeft = item.substring(dtoloc, item.length);
                                }

                                if (convertmethod == "num") {
                                    proposedLeft = item.substring(dtoloc + dtotype.length + 1, item.length);
                                }
                            }
                            dtoloc = item.indexOf("addthis.");
                            proposedLeft = proposedLeft.replace("addthis.", "");

                            if (proposedLeft != "") {
                                outputparameters[proposedLeft] = proposedRight
                            }
                        }
                    } else { // if resultObj["metadata.method"] = dtotype)
                        outputparameters = resultObj;
                    }

                    debugfn("getcleanparameters", "step2", "get", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'two');
                }, // end step2

                function step3(cb) {
                    ret = {
                        parms: outputparameters,
                        dto: dtoobject
                    };
                    debugfn("getcleanparameters", "step3", "get", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'three');
                }
            ],

            function (err, results) {
                callback(err, ret);

            });
    }

    exports.getwidmaster = getwidmaster = function getwidmaster(parameters, callback) {
        var ret = undefined;
        var resultObj = {};
        var inherit;
        var checkflag;
        var convertMethod;
        var dtotype;
        var wid;
        var accesstoken;
        var err;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "parameters": parameters,
                    "resultObj": resultObj,
                    "inherit": inherit,
                    "checkflag": checkflag,
                    "convertMethod": convertMethod,
                    "dtotype": dtotype,
                    "wid": wid,
                    "accesstoken": accesstoken,
                    "err": err,
                    "ret": ret
                }
            };
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

        async.series([

                function step1(cb) {
                    parameters = tolowerparameters(parameters, {
                        'wid': 'add',
                        'metadata.method': 'add',
                        'command.dtotype': 'add',
                        'command.convertmethod': 'add',
                        'command.checkflag': 'add',
                        'command.inherit': 'add',
                        'command.accesstoken': 'add'
                    });
                    delete parameters['executethis']; //** added 10/2
                    wid = parameters.wid;
                    dtotype = parameters["command.dtotype"];
                    inherit = parameters["command.inherit"];
                    accesstoken = parameters["command.accesstoken"];
                    checkflag = parameters["command.checkflag"];
                    convertMethod = parameters["command.convertmethod"];

                    getWidMongo(wid, convertMethod, accesstoken, dtotype, "", 10, function (err, data) { //TODO consider -- DONE -- Remove 4th postion ""
                        if(!data){
                            resultObj = {};
                        }else{
                            resultObj = ConvertToDOTdri(data);
                        } 
                        debugfn("getwidmaster step1 b", "getwidmaster", "get", "step1", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'one');
                    });
                },
                function step2(cb) {
                    // could be moved inside clean parm?
                    if (inherit) { // inherit points to wid with more datan- Grab the params from mongo(local storage)
                        var executeobject = {};
                        executeobject["executethis"] = getwid;
                        executeobject["wid"] = inherit;

                        execute(executeobject, function (err, res) {
                            var moreParameters = res[0];
                            if (moreParameters) {
                                resultObj = jsonConcat(resultObj, moreParameters);
                            }
                            debugfn("getwidmaster step2 a", "getwidmaster", "get", "step2", debugcolor, debugindent, debugvars([1]));
                            cb(null, 'two');
                        });
                        // getwid(OutParameters, function (res) {
                        //         moreParameters = res;
                        //         if (moreParameters) {
                        //             resultObj = jsonConcat(resultObj, moreParameters);
                        //         }
                        //         cb(null, 'two');
                        //     });

                    } else {
                        debugfn("getwidmaster step2 b", "getwidmaster", "get", "step2", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'two');
                    }
                },
                function step3(cb) {
                    if (checkflag != "") { // see if right side of output needs to be made mongo compatible
                        var dtoList = objectToList(dtoGlobalParameters);
                        var resultList = objectToList(resultObj);
                        resultList = CleanBasedOnCheckflagList(checkflag, resultList, dtoList);
                        resultObj = listToObject(resultList);
                    }

                    olddebug = Debug;

                    if (resultObj && (Object.keys(resultObj).length !== 0) && (resultObj['wid'] != resultObj['metadata.method'])) {

                        getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod, function (err, res) {
                            resultObj = res;
                            resultObj = resultObj.parms;
                        }); //TODO -- DONE

                    }

                    if ((convertMethod == "nowid") || (convertMethod == "dto")) { //(convertMethod=="nowid") { -- added 10/12 **
                        delete resultObj["wid"];
                        delete resultObj["metadata.method"];
                    }

                    if (convertMethod == "toobject") {
                        resultObj = ConvertFromDOTdri(resultObj);
                    }

                    ret = resultObj;

                    debugfn("getwidmaster step3", "getwidmaster", "get", "step3", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'three');
                }
            ],
            function (err, results) {

                callback(err, ret);

            });

    };

    // function getWidMongo(widInput, convertMethod, accessToken, dtoin, callback) {

    //     var olddebug=Debug;
    //     //Debug=olddebug;
    //     proxyprinttodiv('Function getWidMongo() in widInput: ', widInput);
    //     proxyprinttodiv('Function getWidMongo() convertmethod', convertMethod);

    //     if (!widInput) {
    //         if (callback instanceof Function) { 
    //             callback(ret); 
    //         }
    //         return;
    //     }
    //     var dtoGlobalParameters = {};
    //     var attr = "";
    //     var nextLevelParameters = {};
    //     var outgoingParameters = {};
    //     var moreDTOParameters = {};
    //     var moreParameters = {};
    //     var currentLevelObjectList = [];
    //     var dtoGlobalParametersList = [];
    //     var addedobject = {};
    //     var eachresult = "";
    //     var createdto ='false';
    //     var createrelationships = 'false';
    //     var savedto = 'false';
    //     var createid = widInput;
    //     var dtotype = "";

    //     var executeobject={};

    //     //executeobject["executethis"]=getwid;
    //     executeobject["wid"]=widInput;
    //     //Debug='true';
    //     proxyprinttodiv('Function getWidMongo()  executeobject' , executeobject);
    //     //var x = window['execute'];
    //     //var currentLevelObject=executethis(executeobject,execute);
    //     var currentLevelObject=executethis(executeobject,getwid);

    //     //var currentLevelObject = getfrommongo({'wid': widInput});
    //     // ++++ calling getwid is good calling it through execute not
    //     proxyprinttodiv('Function getWidMongo() currentLevelObject ++++++ top level object ', currentLevelObject,10);
    //     //Debug='false';
    //     // if dtotype not sent in, then figure it out -- dto type will be blank at all 1+ levels
    //     // first choide for dto is its method
    //     if ((currentLevelObject["metadata.method"]!==undefined) &&
    //         (currentLevelObject["metadata.method"]!=="")) {
    //         dtotype=currentLevelObject["metadata.method"];
    //         // Get the wid from mongo(local storage)
    //         executeobject={};
    //         //executeobject["executethis"]=getwid;
    //         executeobject["wid"]=dtotype;
    //         //dtoGlobalParameters=executethis(executeobject,execute);
    //         dtoGlobalParameters=executethis(executeobject,getwid);
    //         console.log(dtoGlobalParameters);
    //         proxyprinttodiv('Function getWidMongo() dtoGlobalParameters -- 101', dtoGlobalParameters,10);

    //         //dtoGlobalParameters = getFromMongo({'wid':dtotype});
    //     }
    //     proxyprinttodiv('Function getWidMongo() dtoGlobalParameters isEmpty', (isEmpty(dtoGlobalParameters)));
    //     //  if (Object.keys(dtoGlobalParameters).length === 0) {
    //     //  if (isEmpty(dtoGlobalParameters)) {
    //     //if (dtotype!="") {createid=dtotype}
    //     //dtotype='defaultdto'
    //     // executeobject={};
    //     // executeobject["mongowid"]=widInput;
    //     // executeobject["mongorelationshiptype"]="attributes";
    //     // executeobject["mongorelationshipmethod"]="all";
    //     // executeobject["mongorelationshipdirection"]="forward";
    //     // executeobject["mongowidmethod"]="";
    //     // executeobject["convertmethod"]="";
    //     // executeobject["dtotype"]="";
    //     // executeobject["executethis"]=querywid;
    //     // proxyprinttodiv('Function getWidMongo()  executeobject III' , executeobject);
    //     // //moreDTOParameters=querywidlocal(executeobject);    // ** mongoquery
    //     // proxyprinttodiv('Function getWidMongo()  executeobject III-result' , moreDTOParameters);
    //     // moreDTOParameters=executethis(executeobject,execute);
    //     // //*****10-31
    //     // //moreDTOParameters = simpleQuery(widInput, "attributes", "all", "forward", "", "", "");
    //     // for (eachresult in moreDTOParameters) {
    //     //  for (key in moreDTOParameters[eachresult]) {
    //     //      proxyprinttodiv('Function getWidMongo()eachresult[0] ',key);
    //     //      //dtoGlobalParameters[key] = 'onetomany'
    //     //      moreParameters[key] = 'onetomany'
    //     //      }
    //     //  }
    //     // for (eachresult in currentLevelObject) {
    //     //  //dtoGlobalParameters[eachresult] = 'string'
    //     //  moreParameters[eachresult] = 'string'
    //     //  }

    //     proxyprinttodiv('Function getWidMongo() widInput ', widInput,10);
    //     aggressivedto(widInput,"",1,function (err,res){
    //         moreParameters=res;
    //         proxyprinttodiv('Function getWidMongo() moreParameters ', moreParameters,10);
    //         //if ((isEmpty(dtoGlobalParameters)) || (dtoin=="defaultdto")) {
    //         if ((dtoGlobalParameters['metadata.method']=="") || (dtoin=="defaultdto")) {
    //             dtoGlobalParameters=moreParameters
    //         }

    //         //}

    //         proxyprinttodiv('Function getWidMongo() dtoGlobalParameters IV ', dtoGlobalParameters);

    //         currentLevelObjectList = objectToList(currentLevelObject);
    //         dtoGlobalParametersList = objectToList(dtoGlobalParameters);


    //         proxyprinttodiv('Function getWidMongo() dtoGlobalParameters near start', dtoGlobalParameters);
    //         proxyprinttodiv('Function getWidMongo() currentLevelObject II ', currentLevelObject,10);

    //         currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
    //         currentLevelObjectList = currentLevelObjectList.match;
    //         currentLevelObject = listToObject(currentLevelObjectList);

    //         proxyprinttodiv('Function getWidMongo() currentLevelObject ----about to start relationships----', currentLevelObject,10);


    //         outgoingParameters=currentLevelObject;

    //         dtoGlobalParameters=moreParameters; // line added 10-9 -- step through an agressive dto

    //         for (var item in dtoGlobalParameters) {
    //             proxyprinttodiv('Function getWidMongo() step through dto ', (item + ' ' + dtoGlobalParameters[item]),10);
    //             nextLevelParameters = {};
    //             attr = dtoGlobalParameters[item];
    //             if ((attr == "onetoone")  || (attr == "onetomany")) { // 10-24 || (attr == "inherit"))  {
    //                 if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property
    //                     nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin); // removed inherit dtoGlobalParameters
    //                 } // 10-5 took away dtotype --
    //                 if (attr == "onetomany") { // if dto states 'onetomany' then search for related records that match property
    //                     nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin); //removed dtoGlobalParameters
    //                 } // 10-9 readded inherit from cleanparms here:
    //                 // if ((attr == "inherit") && (convertMethod != 'dto')) {
    //                 //              executeobject={};
    //                 //              executeobject["executethis"]="getwidmaster"; // changed from getwidmaster
    //                 //              executeobject["wid"]=item;
    //                 //              executeobject["command.convertmethod"]="nowid";
    //                 //              var x = window['execute'];
    //                 //              nextLevelParameters=executethis(executeobject,x);
    //                 //              proxyprinttodiv('Function getWidMongo nextLevelParameters - inherit', nextLevelParameters,1);
    //                 //              }
    //                 //  nextLevelParameters = getwidmaster({'wid':item, 'command.convertmethod':'nowid'});
    //                 //  };
    //                 // 10-15 line below commented
    //                 //if (nextLevelParameters=="") {AddMongoRelationship(widInput,item,"attributes");} // if DTO existed, but no relationship at place hoder
    //                 proxyprinttodiv('Function getWidMongo() came back from getAndFormatNextLevel, nextLevelParameters= ', nextLevelParameters);
    //                 proxyprinttodiv('Function getWidMongo() step through dto ', (item+' '+dtoGlobalParameters[item]));
    //                 outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
    //                 proxyprinttodiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
    //             } // if
    //             //proxyprinttodiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
    //         } // for
    //         proxyprinttodiv('Function getWidMongo() end of relationsips---------------- : ', outgoingParameters);
    //         Debug=olddebug;

    //     });
    //     var ret = undefined;

    //     ret = outgoingParameters;

    //     while(ret === undefined){}

    //     if (callback instanceof Function) { 
    //         callback(undefined,ret); 
    //     }

    //     return ret;
    // }

    // function getWidMongo(widInput, convertMethod, accessToken, dtoin, preamble, callback) {
    //     var originalarguments=arguments;
    //     var executionid = new Date();
    //     var dtoGlobalParameters = {};
    //     var attr = "";
    //     var nextLevelParameters = {};
    //     var outgoingParameters = {};
    //     var moreDTOParameters = {};
    //     var moreParameters = {};
    //     var currentLevelObjectList = [];
    //     var dtoGlobalParametersList = [];
    //     var addedobject = {};
    //     var eachresult = "";
    //     var createdto = 'false';
    //     var createrelationships = 'false';
    //     var savedto = 'false';
    //     var createid = widInput;
    //     var dtotype = "";
    //     var currentLevelObject;
    //     var executeobject = {};
    //     var olddebug = Debug;
    //     var err;
    //     var ret = undefined;

    //     function debugvars(varlist) {
    //         var allvars = {
    //             1: {
    //                 "dtoGlobalParameters": dtoGlobalParameters,
    //                 "attr": attr,
    //                 "nextLevelParameters": nextLevelParameters,
    //                 "outgoingParameters": outgoingParameters,
    //                 "moreDTOParameters": moreDTOParameters,
    //                 "moreParameters": moreParameters,
    //                 "currentLevelObjectList": currentLevelObjectList,
    //                 "dtoGlobalParametersList": dtoGlobalParametersList,
    //                 "addedobject": addedobject,
    //                 "eachresult": eachresult,
    //                 "createdto": createdto,
    //                 "createrelationships": createrelationships,
    //                 "savedto": savedto,
    //                 "createid": createid,
    //                 "dtotype": dtotype,
    //                 "currentLevelObject": currentLevelObject,
    //                 "item": '',
    //                 "executeobject": executeobject,
    //                 "olddebug": olddebug,
    //                 "err": err,
    //                 "ret": ret
    //             },
    //             2: {
    //                 "nextLevelParameters": nextLevelParameters,
    //                 "outgoingParameters": outgoingParameters,
    //                 "moreDTOParameters": moreDTOParameters
    //             },
    //             3:  {
    //                 "widInput":widInput, 
    //                 "convertMethod":convertMethod, 
    //                 "accessToken":accessToken, 
    //                 "dtoin":dtoin
    //             }
    //         };
    //         var resultObj = {};
    //         var vargroup;
    //         if (!varlist) {
    //             for (var eachgroup in allvars) {
    //                 varlist.push(eachgroup);
    //             }
    //         }

    //         for (var eachgroup in varlist) {
    //             vargroup = varlist[eachgroup];
    //             resultObj = jsonConcat(resultObj, allvars[vargroup]);
    //         }
    //         return resultObj;
    //     }

    //     if (!widInput) {
    //         ret = "";
    //         if (callback instanceof Function) {
    //             callback(err, ret);
    //         }
    //         if (exports.environment === "local") {
    //             while (ret === undefined) {}
    //             return ret;
    //         }

    //     } else {
    //         async.series([

    //                 function part1(cb) {
    //                     debugfn("getWidMongo part1", "getwidmongo", "get", "start", debugcolor, debugindent, debugvars([3]));

    //                     executeobject["wid"] = widInput;
    //                     executeobject["executethis"] = 'getwid';
    //                     // currentLevelObject = executethis(executeobject, getwid); //TODO -- DONE
    //                     // cb(null);
    //                     execute(executeobject, function (err, res) {
    //                         currentLevelObject = res[0];
    //                         debugfn("getWidMongo part1", "getwidmongo", "get", "part", debugcolor, debugindent, debugvars([1]));
    //                         cb(null);
    //                     });
    //                 },
    //                 function step2(cb) {
    //                     if ((currentLevelObject["metadata.method"] !== undefined) &&
    //                         (currentLevelObject["metadata.method"] !== "")) {
    //                         // if(true){
    //                         dtotype = currentLevelObject["metadata.method"];
    //                         executeobject = {};
    //                         executeobject["wid"] = dtotype;
    //                         executeobject['executethis'] = 'getwid';

    //                         execute(executeobject, function (err, res) {
    //                             dtoGlobalParameters = res[0]; //TODO -- DONE
    //                             console.log(dtoGlobalParameters);
    //                             debugfn("getWidMongo step2a", "getwidmongo", "get", "step2a", debugcolor, debugindent, debugvars([1]));
    //                             cb(null);
    //                         }); //TODO -- DONE

    //                     } else {
    //                         debugfn("getWidMongo step2b", "getwidmongo", "get", "step2b", debugcolor, debugindent, debugvars([1]));
    //                         cb(null);
    //                     }

    //                 },
    //                 // function step3(cb) {

    //                 //     aggressivedto(widInput, "", 1, function (err, res) {
    //                 //         moreParameters = res;
    //                 //         debugfn("getWidMongo step3b", "getwidmongo", "get", "step3b", debugcolor, debugindent, debugvars([1]));
    //                 //         cb(null, 'three');
    //                 //     });

    //                 // },
    //                 function step4(cb) {
    //                     if (Object.keys(dtoGlobalParameters).length==0) {
    //                     // if ((dtoGlobalParameters['metadata.method'] === undefined) ||
    //                     //     (dtoGlobalParameters['metadata.method'] == "") || (dtoin == "defaultdto")) {
    //                     //     dtoGlobalParameters = moreParameters
    //                         dtoGlobalParameters = currentLevelObject
    //                     }
    //                     //proxyprinttodiv('Function getWidMongo() dtoGlobalParameters ', dtoGlobalParameters,10);

    //                     currentLevelObjectList = objectToList(currentLevelObject);
    //                     dtoGlobalParametersList = objectToList(dtoGlobalParameters);
    //                     //proxyprinttodiv('Function getWidMongo() dtoGlobalParametersList ', dtoGlobalParametersList,10);
    //                     currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
    //                     //proxyprinttodiv('Function getWidMongo() currentLevelObjectList I ', currentLevelObjectList,10);
    //                     currentLevelObjectList = currentLevelObjectList.match;
    //                     //proxyprinttodiv('Function getWidMongo() currentLevelObjectList II ', currentLevelObjectList,10);
    //                     currentLevelObject = listToObject(currentLevelObjectList);
    //                     //proxyprinttodiv('Function getWidMongo() currentLevelObjectList III ', currentLevelObjectList,10);
    //                     outgoingParameters = currentLevelObject;
    //                     //proxyprinttodiv('Function getWidMongo() outgoingParameters ', outgoingParameters,10);
    //                     dtoGlobalParameters = moreParameters; // line added 10-9 -- step through an agressive dto
    //                     debugfn("getWidMongo step4", "getwidmongo", "get", "step4", debugcolor, debugindent, debugvars([1]));
    //                     cb(null);
    //                 },
    //                 function step5(cb) {
    //                     getAndFormatNextLevel(currentLevelObject, convertMethod, accessToken, dtoin, preamble, function (err, res) {
    //                         if((res) && (Object.keys(res).length !== 0)) {
    //                             nextLevelParameters = res;
    //                             proxyprinttodiv('Function getwidmongo nextLevelParameters --', nextLevelParameters, 17);
    //                             outgoingParameters = extend(true, outgoingParameters, nextLevelParameters);
    //                             proxyprinttodiv('Function getwidmongo outgoingParameters --', outgoingParameters,10);
    //                             cb(null);
    //                         }
    //                         else {
    //                             cb(null);
    //                         }
    //                     });
    //                 },

    // /*                    var listToDo = [];
    //                     for (var item in dtoGlobalParameters) {
    //                         listToDo.push(item);
    //                     }
    //                     async.mapSeries(listToDo, function (item, cbMap) {
    //                             nextLevelParameters = {};
    //                             attr = dtoGlobalParameters[item];
    //                             if ((attr == "onetoone") || (attr == "onetomany")) { // 10-24 || (attr == "inherit"))  {
    //                                 if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property

    //                                     getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin, function (err, res) {
    //                                         nextLevelParameters = res;
    //                                     });

    //                                 }
    //                                 //TODO -- DONE
    //                                 // 10-5 took away dtotype --
    //                                 if (attr == "onetomany") { // if dto states 'onetomany' then search for related records that match property

    //                                     getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin, function (err, res) {
    //                                         nextLevelParameters = res;
    //                                     });

    //                                 } // 10-9 readded inherit from cleanparms here:
    //                                 //TODO -- DONE
    //                                 outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
    //                             } // if
    //                             debugfn("getWidMongo step5", "getwidmongo", "get", "step5", debugcolor, debugindent, debugvars([1]));
    //                             cbMap(null);
    //                         },
    //                         function (err, res) {
    //                             if (err) {
    //                                 throw err;
    //                             }
    //                             cb(null, 'five');
    //                         });
    //                 },*/
    //                 function step6(cb) {
    //                     Debug = olddebug;
    //                     //ret = JSON.parse(JSON.stringify(outgoingParameters));
    //                     ret = outgoingParameters;
    //                     debugfn("getWidMongo step6", "getwidmongo", "get", "step6", debugcolor, debugindent, debugvars([1]));
    //                     proxyprinttodiv('Function getwidmongo ret A', ret, 17);
    //                     cb(null, ret);
    //                 }
    //             ],
    //             function (err, results) {
    //                 debugfn("getwidmongo code generator", "getwidmongo", "get", "code", 2, 1, {
    //                                     0: originalarguments,
    //                                     1: ret,
    //                                     2: executionid
    //                                 }, 4);
    //                 callback(err, results[4]);
    //                 proxyprinttodiv('Function getwidmongo ret B', results, 17);
    //             });


    //     } // end else
    // }


    // Starting of getAndFormatNextLevel function

//     function getAndFormatNextLevel(inobject, convertmethod, accesstoken, dtoin, preamble, callback) {
//         var executeobject = {};
//         var drillDownParameters = {};
//         var rowresult = "";
//         var nextLevelParameters = [];
//         var nextLevelParametersObject = {};
//         var proposedLeft = "";
//         var proposedRight = "";
//         var iteration = 0;
//         var relatedParameters =[];
//         var listToDo;
//         var ret = undefined;
//         var err;
//         var widInput = inobject['wid'];
//         var mongorelationshiptype="attributes"
//         var mongorelationshipmethod="all"
//         var mongorelationshipdirection="forward";
//         var mongowidmethod="";

//         function debugvars(varlist) {
//             var allvars = {
//                 1: {
//                     "executeobject": executeobject,
//                     "drillDownParameters": drillDownParameters,
//                     "rowresult": rowresult,
//                     "nextLevelParameters": nextLevelParameters,
//                     "nextLevelParametersObject": nextLevelParametersObject,
//                     "proposedLeft": proposedLeft,
//                     "proposedRight": proposedRight,
//                     "item": '',
//                     "iteration": iteration,
//                     "relatedParameters": relatedParameters,
//                     "listToDo": listToDo,
//                     "ret": ret,
//                     "err": err
//                 },
//                 2: {
//                     "executeobject": executeobject,
//                     "drillDownParameters": drillDownParameters,
//                     "rowresult": rowresult
//                 }
//             };
//             var resultObj = {};
//             var vargroup;
//             if (!varlist) {
//                 for (var eachgroup in allvars) {
//                     varlist.push(eachgroup);
//                 }
//             }

//             for (var eachgroup in varlist) {
//                 vargroup = varlist[eachgroup];
//                 resultObj = jsonConcat(resultObj, allvars[vargroup]);
//             }
//             return resultObj;
//         }

//         async.series([


//                 function part1(cb) {
//                     executeobject["mongowid"] = widInput;
//                     executeobject["mongorelationshiptype"] = mongorelationshiptype;
//                     executeobject["mongorelationshipmethod"] = mongorelationshipmethod;
//                     executeobject["mongorelationshipdirection"] = mongorelationshipdirection;
//                     executeobject["mongowidmethod"] = mongowidmethod;
//                     executeobject["convertmethod"] = convertmethod;
//                     executeobject["dtotype"] = "";
//                     executeobject["executethis"] = "querywid";


//                     execute(executeobject, function (err, res) {
//                         if((res) && (res.length !== 0)) {
//                             proxyprinttodiv('Function format executeobject', executeobject,10);
//                             proxyprinttodiv('Function results from format res', res, 17);
//                             relatedParameters = res; 
//                             debugfn("getAndFormatNextLevel I", "getformat", "get", "start", debugcolor, debugindent, debugvars([1]));
//                             cb(null);
//                         }
//                         else {
//                             cb(null);
//                             //callback(err, res); ***** culprit line
//                         }
//                     });

//                 },
//                 function part2(cb) {
//                     //if (Object.keys(relatedParameters).length == 0) {   changed 1/23
//                     if (relatedParameters.length === 0) {
//                         nextLevelParameters = [];
//                         cb(""); // changed 1/28 should go to step 3
//                         //ret = nextLevelParametersObject;
//                         //callback(err, ret);

//                     } else {
//                         listToDo = [];

//                             //(iteration < countKeys(relatedParameters)); iteration++) {
//                         for (iteration=0; iteration < relatedParameters.length; iteration++) {
//                             listToDo.push(iteration);
//                             }

// // aggressive dto had cleaner logic than getwidmongo-- we should try to emulate it if possible
// // aggressive dto accepts wid, preamble, level
// // first thing we do level = level - 1; if (preamble === undefined) preamble = ""; if (preamble != "") preamble = preamble + ".";
// // it then gets wid or its method
// // it gets related parameters, then it goes through the list of related parameters 
// // then if level < then for each related paramter it recurses to itelf, concatenates results
// // then at the very end does out[preamble + eachresult] = Object[eachresult];

// // we have getwidmongo / getAndFormatNextLevel where aggressivedto is one
// // added preamble to getwidmongo, we then get wid or it method, then we continue in getAndFormatNextLevel
// // we get all the related wids to one wid:
// //
// // [{wid1: {metadata.method: booksdto, a:b}},
// // {wid2: {metadata.method: booksdto, a:c}},
// // {wid3: {metadata.method: adddto, d:e}},
// // {wid4: {metadata.method: booksdto, a:f}},
// // {wid5: {metadata.method: booksdto, a:g}},
// // {wid6: {metadata.method: adddto, d:j}},
// // {wid7: {metadata.method: othersdto, k:m}}]
// //
// // we need an iteration counter for each type of metadata.method or we need to sort them and do them in order
// // 
// // future: since we have inobject we can check to see if inboject [current method] exists, if onetoone then

//                         proxyprinttodiv('Function getAndFormatNextLevel -- listToDo --', listToDo, 17);
//                         //async.mapSeries(listToDo, function (iteration, cbMap) {
//                         for (var iteration in listToDo) {
//                             rowresult = relatedParameters[iteration];
//                             proxyprinttodiv('Function getAndFormatNextLevel -- iteration --', iteration, 17);
//                             proxyprinttodiv('Function getAndFormatNextLevel rowresult', rowresult, 17);
//                             for (var key in rowresult) {
//                                 proposedLeft = key;
//                                 proposedRight = rowresult[key];
//                             }
//                             proxyprinttodiv('Function getAndFormatNextLevel proposedLeft', proposedLeft, 17);
//                             proxyprinttodiv('Function getAndFormatNextLevel proposedRight', proposedRight, 17);
                            
//                             // mongowidmethod = proposedRight["metadata.method"]
//                             // something is now sent in
//                             if (proposedRight["metadata.method"]) {
//                                 preamble = preamble + "." + proposedRight["metadata.method"]
//                                 }
                            
//                             if (convertmethod === "wid") {
//                                 nextLevelParameters.push({
//                                     "key": mongowidmethod,
//                                     "value": proposedLeft
//                                 });
//                             }

//                             if (convertmethod === "json") {
//                                 nextLevelParameters.push({
//                                     "key": mongowidmethod,
//                                     "value": JSON.stringify(proposedRight)
//                                 });
//                             }

//                             if ((convertmethod === "") || (convertmethod === "dto") || (convertmethod === "toobject") ||
//                                 (convertmethod === "num") || (convertmethod === "dtonum")) 
//                                 {

//                                 debugfn("getAndFormatNextLevel II", "getformat", "get", "mid", debugcolor, debugindent, debugvars([1]));
//                                 debugcolor++;
//                                 debugindent++;
                                
//                                 proxyprinttodiv('Function getAndFormatNextLevel() before getWidMongo -- proposedLeft', proposedLeft, 17);
//                                 proxyprinttodiv('Function getAndFormatNextLevel() before getWidMongo -- convertmethod', convertmethod, 17);
//                                 proxyprinttodiv('Function getAndFormatNextLevel() before getWidMongo -- accesstoken', accesstoken, 17);
//                                 proxyprinttodiv('Function getAndFormatNextLevel() before getWidMongo -- dtoin', dtoin, 17);
//                                 if (proposedLeft === '13') {
//                                     debugfn("wid 13 a", "special", "get", "mid", debugcolor, debugindent, debugvars([1,2]));
//                                 }
//                                 // added preamble below
//                                 getWidMongo(proposedLeft, convertmethod, accesstoken, dtoin, preamble, function (err, res) {
//                                     if (proposedLeft === '13') {
//                                     debugfn("wid 13 b", "special", "get", "mid", debugcolor, debugindent, debugvars([1,2]));
//                                 }

//                                     proxyprinttodiv('Function !!! getWidMongo() rowresult !!!', rowresult, 17);
//                                     proxyprinttodiv('Function !!! getWidMongo() res !!!', res, 17);
//                                     proxyprinttodiv('Function !!! getWidMongo() proposedLeft !!!', proposedLeft, 17);
    

//                                     if((res) && (Object.keys(res).length !== 0)) {
//                                         debugcolor--;
//                                         debugindent--;
//                                         drillDownParameters = res;
//                                         // }); --- moved down 1/26
//                                         proxyprinttodiv('Function getAndFormatNextLevel() loop drillDownParameters', drillDownParameters, 17);
//                                         proxyprinttodiv('Function getAndFormatNextLevel() loop convertmethod', convertmethod, 10);

//                                         for (var item in drillDownParameters) {
//                                             proxyprinttodiv('Function getAndFormatNextLevel() loop item', item, 10);
//                                             // changed mongowidmethod <> preamble below
//                                             proposedLeft = preamble + "." + String(iteration) + "." + item; 
//                                             if (convertmethod === "dto") {
//                                                 proposedLeft = preamble + "." + item;
//                                                 }
//                                             proposedRight = drillDownParameters[item];
//                                             proxyprinttodiv('Function getAndFormatNextLevel() loop proposedLeft', proposedLeft, 10);
//                                             proxyprinttodiv('Function getAndFormatNextLevel() loop proposedRight', proposedRight, 10);

//                                             if (((item === "wid") || (item === "metadata.method")) && (convertmethod === "dto")) {
//                                                 // left empty by design
//                                                 }
//                                             else {
//                                                 nextLevelParameters.push({
//                                                     "key": proposedLeft,
//                                                     "value": proposedRight
//                                                     });
//                                             }
//                                         } // for
//                                         proxyprinttodiv('Function getAndFormatNextLevel() nextLevelParameters', nextLevelParameters, 17);
//                                         //cbMap(null);
//                                     }
//                                     else {
//                                         // proxyprinttodiv('Function getAndFormatNextLevel() **** this should never happen', rowresult, 17);
//                                         //cbMap(null);
//                                     }
//                                 }); // getwidmongo
//                             } // if ||
//                             else {
//                                 //cbMap(null);
//                             }
//                         // },
//                         // function (err, res) {
//                         //     if (err) {
//                         //         throw err;
//                         //     }
                            
//                         // }); // mapseries
//                         }
                    
//                     } // else
//                 debugfn("getAndFormatNextLevel III", "getformat", "get", "mid", debugcolor, debugindent, debugvars([1]));
//                 cb(null, 'two');
//                 },

//                 function part3(cb) {
//                     proxyprinttodiv('Function getAndFormatNextLevel() nextLevelParameters end', nextLevelParameters, 17);

//                     nextLevelParametersObject = listToObject(nextLevelParameters);
//                     ret = nextLevelParametersObject;
//                     proxyprinttodiv('Function getAndFormatNextLevel ret ----> finished', ret,10);
//                     debugfn("getAndFormatNextLevel V", "getformat", "get", "end", debugcolor, debugindent, debugvars([1]));
//                     cb(null, 'three');
//                 }
//             ],
//             function (err, results) {
//                 callback(err, ret);
//             });

//     }



exports.getWidMongo = getWidMongo = function getWidMongo(widInput, convertmethod, accesstoken, dtotype, preamble, level, callback) { // returns a made up dto base on maximum number of relationships, etc
    //proxyprinttodiv('Function getwidmongo hit I', null, 10);
    // local vars
    var moreDTOParameters;
    var targetwid = "";
    var nexttargetwid = "";
    var nextpreamble = "";
    var executeobject = {};
    var parameterObject;
    var err;
    var res;
    var dtoGlobalParameters = {};
    var params,eachdto,dtogroup,iteration, proposedLeft;
    var dtolist = {};

    function debugvars(varlist) {
        var allvars = {
            1: {
                "widInput":widInput,
                "preamble":preamble,
                "level":level,
                "parameterObject": parameterObject,
                "moreDTOParameters": moreDTOParameters,
                "targetwid": targetwid,
                "eachresult": '',
                "key": '',
                "rightparameters": {},
                "executeobject": executeobject,
                "dtoGlobalParameters": dtoGlobalParameters,
                "err": err,
                "dtolist":dtolist,
                "params":params
            }
        };
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

    async.series([

        function step1(cb) {
            proxyprinttodiv('Function getwidmongo step 1 hit with widInput:', widInput, 10);
            if (!level) {
                level = 10
            } 
            else {
                level = level - 1;
            } //how many levels to try
            if (preamble === undefined) {
                preamble = "";
            }
            if (preamble != "") {
                preamble = preamble + ".";
            }

            targetwid = widInput;
            executeobject["wid"] = widInput;
            executeobject["command.convertmethod"]="toobject";
            executeobject['executethis'] = 'getwid';
            
            execute(executeobject, function (err, res) { // getwid
                proxyprinttodiv('Function getwidmongo getwid res', res, 10);
                res=res[0];
                
                if (Object.keys(res).length != 0) {
                    parameterObject = res;
                    proxyprinttodiv('Function getwidmongo getwid res', res,10);
                    moreDTOParameters=parameterObject;
                    // debugfn("aggressivedto getwid", "aggressivedto", "get", "begin", debugcolor, debugindent, debugvars([1]));
                    // if ((parameterObject["metadata.method"]) && (parameterObject["metadata.method"]!=targetwid)) {
                    //     targetwid = parameterObject['metadata.method'];
                    //     executeobject = {};
                    //     executeobject["wid"] = targetwid;
                    //     executeobject["executethis"] = 'getwid';
                    //     execute(executeobject, function (err, res) { // now get method
                    //         res=res[0];
                    //         proxyprinttodiv('Function aggressivedto resultlist', res,10);
                    //         debugfn("aggressivedto get method", "aggressivedto", "get", "begin", debugcolor, debugindent, debugvars([1]));
                    //         if (Object.keys(res).length != 0) {
                    //             moreDTOParameters=res;
                    //             }
                    //         cb(null)
                    //         })
                    //     }
                    // else {
                    //     cb(null)
                    // }
                    cb(null); // add
                }
                else { // if no object
                    targetwid = ""; // if no object to follow then targetwid="";
                    cb(null);
                }
            }); // end execute                      
        },
        // parameterObject = wid, moreDTOparameters = methdd, targetwid = chain to follow

        function step2(cb) {
            //proxyprinttodiv('Function getwidmongo step 2 hit', null, 10);
            if (targetwid != "") {
                async.series([ // asynch step1n2
                        function step2n1(cb1) {
                            //proxyprinttodiv('Function getwidmongo step 2n1 hit', null, 10);
                            executeobject = {};
                            executeobject["mongowid"] = targetwid;
                            executeobject["mongorelationshiptype"] = "attributes";
                            executeobject["mongorelationshipmethod"] = "all";
                            executeobject["mongorelationshipdirection"] = "forward";
                            executeobject["mongowidmethod"] = "";
                            executeobject["command.convertmethod"] = "toobject";
                            executeobject["dtotype"] = "";
                            executeobject["executethis"] = 'querywid';
                            execute(executeobject, function (err, res) {
                                // we get data that looks like this:
                                // [{wid1: {metadata.method: booksdto, a:b}},
                                // {wid2: {metadata.method: booksdto, a:c}},
                                // {wid3: {metadata.method: adddto, d:e}},
                                // {wid4: {metadata.method: booksdto, a:f}},
                                // {wid5: {metadata.method: booksdto, a:g}},
                                // {wid6: {metadata.method: adddto, d:j}},
                                // {wid7: {metadata.method: othersdto, k:m}}]
                                proxyprinttodiv('Function getwidmongo executeobject', executeobject,10);
                                proxyprinttodiv('Function getwidmongo query res', res,10);
                                moreDTOParameters = res;
                                //debugfn("getwidmongo step2n2", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                cb1(null, 'step2n1');
                            });
                        }
                    ],
                    function (err, res) {
                        if (err) {
                            throw err;
                        }
                        //debugfn("getwidmongo if", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'two');
                    });
            } else {
                //debugfn("getwidmongo if ii", "getwidmongo", "get", "sub", debugcolor, debugindent, debugvars([1]));
                cb(null, 'two');
            }
        },
        function step3(cb) {
            if (moreDTOParameters && moreDTOParameters.length>0) {
                var listToDo = [];
                var eachresult;
                var rightparameters = {};  
                var left; 
                var key;
                proxyprinttodiv('Function getwidmongo moreDTOParameters', moreDTOParameters,10);
                for (eachresult in moreDTOParameters) { // list, for each item in list
                    for (key in moreDTOParameters[eachresult]) { // list is {wid : {}} --key = wid
                        rightparameters = moreDTOParameters[eachresult][key];
                        }
                    left = rightparameters['metadata']['method']
                    dtolist[left]=rightparameters['metadata']['method'];
                    // create dto
                    listToDo.push(eachresult);
                }
                proxyprinttodiv('Function getwidmongo dtolist', dtolist,10);

                async.mapSeries(listToDo, function (eachresult, cbMap) {
                        var rightparameters = {};
                        var params;
                        var key;
                        var metadataMethod;

                        proxyprinttodiv('Function getwidmongo moreDTOParameters[eachresult]', moreDTOParameters[eachresult],10);
                        for (key in moreDTOParameters[eachresult]) { // list is {wid : {}} --key = wid
                            rightparameters = moreDTOParameters[eachresult][key];
                        }
                        
                        if (level > 0) {
                            //async.series([

                                    //function step3n1(cbn1) {
                            proxyprinttodiv('Function getwidmongo recurse', key, 10);
                            // wid, convertMethod, accesstoken, dtotype, "", function (err, data)
                            debugfn("getwidmongo before recusr", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));

                            debugcolor++
                            debugindent++
                            getWidMongo(key, convertmethod, accesstoken, dtotype, rightparameters["metadata"]["method"], level, function (err, params) { 
                                proxyprinttodiv('Function getwidmongo params', params, 10);
                                debugcolor--
                                debugindent--
                                if (Object.keys(params).length!==0) {
                                    //parameterObject = extend(true, parameterObject, params);
                                    proxyprinttodiv('Function getwidmongo rightparameters before ', rightparameters, 10);
                                    if (rightparameters["data"]["linktype"] === "onetomany") {
                                      
                                        if (Object.prototype.toString.call(parameterObject[rightparameters["metadata"]["method"]]) !== '[object Array]') { 
                                            parameterObject[rightparameters["metadata"]["method"]]=[]; 
                                        }
                                            
                                        parameterObject[rightparameters["metadata"]["method"]].push(params); 
                                
                                        }
                                        else { // if onetoone
                                            parameterObject[rightparameters["metadata"]["method"]]=params;
                                        }
                                    //parameterObject = jsonConcat(parameterObject, params); // &&&
                                    proxyprinttodiv('Function getwidmongo parameterObject after', parameterObject, 10);
                                    debugfn("getwidmongo aferrecurse", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));
                                    //cbn1(null);
                                   }
                                else { // if nothing returned

                                    }
                            });
                                    //}
                                // ],
                                // function (err, results) {

                                // });
                        }
                        cbMap(null);
                    },
                    function (err, res) {
                        if (err) {
                            throw err;
                        }
                    });

                cb(null, 'three')
                } // length > 0 
            else {
                cb(null, 'three')
                }
            },
        function step4(cb) {
//
// we need to sort and group by method

            // for (eachdto in dtolist) {
            //     proxyprinttodiv('Function getwidmongo dtolist[eachdto]', dtolist[eachdto], 10);
            //     dtogroup = parameterObject[eachdto]
            //     proxyprinttodiv('Function getwidmongo dtogroup', dtogroup, 10);
            //     if (dtogroup && Object.keys(dtogroup).length>0) {
            //         for (iteration=0; iteration < Object.keys(dtogroup).length; iteration++) {
            //             eachresult=dtogroup[iteration];
            //             proxyprinttodiv('Function getwidmongo eachresult', eachresult, 10);
            //             proposedLeft=preamble + iteration + "." + eachresult;
            //             proxyprinttodiv('Function getwidmongo proposedLeft', proposedLeft, 10);
            //             parameterObject[proposedLeft] = parameterObject[eachresult];
            //             delete parameterObject[eachresult];
            //             }
            //         }
            //     }

            //dtoGlobalParameters[preamble] = parameterObject
            // for (var eachresult in parameterObject) {
            //     //proposedLeft=eachresult;
            //     proposedLeft=preamble + eachresult;
            //     dtoGlobalParameters[proposedLeft] = parameterObject[eachresult];
            // }
            
            dtoGlobalParameters = parameterObject

            debugfn("getwidmongo end step4", "getwidmongo", "get", "end", debugcolor, debugindent, debugvars([1]));
            cb(null, 'four');
        }
    ],
    function (err, results) {
        proxyprinttodiv('Function getwidmongo dtoGlobalParameters', dtoGlobalParameters, 10);
        callback(err, dtoGlobalParameters);
    });


}

exports.r11 = r11 = function r11(params, callback) {
    clearLocalStorage();
    proxyprinttodiv('Function arrived in r11', "hello", 10);
    var DRI = [{"wid":"initialwid","initialwid":"hello from bootprocess"},{"wid":"authordto","metadata":{"method":"authordto","date":"2014-01-29T18:38:08.745Z"},"data":{"name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultauthordtoactions":"inherit"}},{"wid":"booksdto","metadata":{"method":"booksdto","date":"2014-01-29T18:38:08.747Z"},"data":{"title":"string","pages":"string"}},{"wid":"adddto","metadata":{"method":"adddto","date":"2014-01-29T18:38:08.750Z"},"data":{"addfield":"onetomany","gojsobject":"onetoone","linkrules":"onetomany","actiondto":"onetomany","defaultadddtoactions":"inherit"}},{"wid":"addfield","metadata":{"method":"addfield","date":"2014-01-29T18:38:08.752Z"},"data":{"fieldname":"string","editable":"string","display":"string","oneditactions":"string","defaultfieldvalue":"inherit"}},{"wid":"gojsobject","metadata":{"method":"gojsobject","date":"2014-01-29T18:38:08.754Z"},"data":{"class":"string","linkFromPortIdProperty":"string","linkToPortIdProperty":"string","nodeDataArray":"onetomany","linkDataArray":"onetomany"}},{"wid":"nodedataarray","metadata":{"method":"nodedataarray","date":"2014-01-29T18:38:08.756Z"},"data":{"key":"string","loc":"string","leftArray":"onetomany","topArray":"onetomany","bottomArray":"onetomany","rightArray":"onetomany"}},{"wid":"leftarray","metadata":{"method":"leftarray","date":"2014-01-29T18:38:08.759Z"},"data":{"class":"string","portColor":"string","portId":"string"}},{"wid":"toparray","metadata":{"method":"toparray","date":"2014-01-29T18:38:08.760Z"},"data":{"class":"string","portColor":"string","portId":"string"}},{"wid":"bottomarray","metadata":{"method":"bottomarray","date":"2014-01-29T18:38:08.762Z"},"data":{"portColor":"string","portId":"string"}},{"wid":"rightarray","metadata":{"method":"rightarray","date":"2014-01-29T18:38:08.764Z"},"data":{"portColor":"string","portId":"string"}},{"wid":"linkdataarray","metadata":{"method":"linkdataarray","date":"2014-01-29T18:38:08.767Z"},"data":{"from":"string","to":"string","fromPort":"string","toPort":"string"}},{"wid":"linkrules","metadata":{"method":"linkrules","date":"2014-01-29T18:38:08.769Z"},"data":{"linkclass":"string","min":"string","max":"string"}},{"wid":"actiondto","metadata":{"method":"actiondto","date":"2014-01-29T18:38:08.772Z"},"data":{"displayname":"string","actiondescription":"string","category":"string","subcategory":"string","addthis.preexecute":"string","addthis.executethis":"string","addthis.postexecute":"string","defaultmasteractions":"inherit"}},{"wid":"relbooktoauthor","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.777Z"},"data":{"primarywid":"authordto","secondarywid":"booksdto","relationshiptype":"attributes"}},{"wid":"reladddtotoauthor","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.779Z"},"data":{"primarywid":"authordto","secondarywid":"adddto","relationshiptype":"attributes"}},{"wid":"gojsrel1","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.781Z"},"data":{"primarywid":"gojsobject","secondarywid":"nodedataarray","relationshiptype":"attributes"}},{"wid":"gojsrel2","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.783Z"},"data":{"primarywid":"gojsobject","secondarywid":"linkdataarray","relationshiptype":"attributes"}},{"wid":"gojsrel3","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.785Z"},"data":{"primarywid":"nodedataarray","secondarywid":"leftarray","relationshiptype":"attributes"}},{"wid":"gojsrel4","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.787Z"},"data":{"primarywid":"nodedataarray","secondarywid":"toparray","relationshiptype":"attributes"}},{"wid":"gojsrel5","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.789Z"},"data":{"primarywid":"nodedataarray","secondarywid":"bottomarray","relationshiptype":"attributes"}},{"wid":"gojsrel6","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.793Z"},"data":{"primarywid":"nodedataarray","secondarywid":"rightarray","relationshiptype":"attributes"}},{"wid":"rel_actiondto_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.796Z"},"data":{"primarywid":"adddto","secondarywid":"actiondto","relationshiptype":"attributes"}},{"wid":"rel_addfield_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.710Z"},"data":{"primarywid":"adddto","secondarywid":"addfield","relationshiptype":"attributes"}},{"wid":"rel_gojsobject_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.801Z"},"data":{"primarywid":"adddto","secondarywid":"gojsobject","relationshiptype":"attributes"}},{"wid":"rel_linkrules_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.803Z"},"data":{"primarywid":"adddto","secondarywid":"linkrules","relationshiptype":"attributes"}},{"wid":"joe_jamison","metadata":{"method":"authordto","date":"2014-01-29T18:38:09.107Z"},"data":{"name":"Joe Jamison","age":"32"}},{"wid":"1","metadata":{"method":"booksdto","date":"2014-01-29T18:38:09.114Z"},"data":{"title":"Hello World!","pages":"40"}},{"wid":"2","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:09.121Z"},"data":{"primarywid":"joe_jamison","secondarywid":"1","relationshiptype":"attributes"}},{"wid":"sarah_jones","metadata":{"method":"authordto","date":"2014-01-29T18:38:09.783Z"},"data":{"name":"Sarah Jones","age":"40"}},{"wid":"3","metadata":{"method":"booksdto","date":"2014-01-29T18:38:09.786Z"},"data":{"title":"The Sands of Time","pages":"378"}},{"wid":"4","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:09.818Z"},"data":{"primarywid":"sarah_jones","secondarywid":"3","relationshiptype":"attributes"}},{"wid":"mike_williams","metadata":{"method":"authordto","date":"2014-01-29T18:38:10.874Z"},"data":{"name":"Mike Williams","age":"36"}},{"wid":"5","metadata":{"method":"booksdto","date":"2014-01-29T18:38:10.877Z"},"data":{"title":"Attack on the Mainframe","pages":"600"}},{"wid":"6","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:10.884Z"},"data":{"primarywid":"mike_williams","secondarywid":"5","relationshiptype":"attributes"}},{"wid":"jerry_stone","metadata":{"method":"authordto","date":"2014-01-29T18:38:12.306Z"},"data":{"name":"Jerry Stone","age":"41"}},{"wid":"7","metadata":{"method":"booksdto","date":"2014-01-29T18:38:12.310Z"},"data":{"title":"Carpentry 101","pages":"120"}},{"wid":"8","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:12.316Z"},"data":{"primarywid":"jerry_stone","secondarywid":"7","relationshiptype":"attributes"}},{"wid":"elizabeth_heart","metadata":{"method":"authordto","date":"2014-01-29T18:38:14.101Z"},"data":{"name":"Elizabeth Heart","age":"50"}},{"wid":"9","metadata":{"method":"booksdto","date":"2014-01-29T18:38:14.104Z"},"data":{"title":"The X Factor","pages":"300"}},{"wid":"10","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:14.110Z"},"data":{"primarywid":"elizabeth_heart","secondarywid":"9","relationshiptype":"attributes"}},{"wid":"startwid","metadata":{"method":"authordto","date":"2014-01-29T18:38:18.801Z"},"data":{"name":"start wid","age":"00"}},{"wid":"11","metadata":{"method":"booksdto","date":"2014-01-29T18:38:18.805Z"},"data":{"title":"none","pages":"00"}},{"wid":"12","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:18.812Z"},"data":{"primarywid":"startwid","secondarywid":"11","relationshiptype":"attributes"}},{"wid":"13","metadata":{"method":"adddto","date":"2014-01-29T18:38:18.822Z"},"data":{}},{"wid":"14","metadata":{"method":"actiondto","date":"2014-01-29T18:38:18.833Z"},"data":{"widname":"startwid","displayname":"Process Blur","actiondescription":"string","category":"blur","subcategory":"name","addthis.prexecute":"","addthis.executethis":"fieldrequired","addthis.postexecute":"getwidmaster"}},{"wid":"15","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:18.841Z"},"data":{"primarywid":"13","secondarywid":"14","relationshiptype":"attributes"}},{"wid":"16","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:18.850Z"},"data":{"primarywid":"startwid","secondarywid":"13","relationshiptype":"attributes"}}];
    var DRIKEY = {"1":{"wid":"1","metadata":{"method":"booksdto","date":"2014-01-29T18:38:09.114Z"},"data":{"title":"Hello World!","pages":"40"}},"2":{"wid":"2","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:09.121Z"},"data":{"primarywid":"joe_jamison","secondarywid":"1","relationshiptype":"attributes"}},"3":{"wid":"3","metadata":{"method":"booksdto","date":"2014-01-29T18:38:09.786Z"},"data":{"title":"The Sands of Time","pages":"378"}},"4":{"wid":"4","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:09.818Z"},"data":{"primarywid":"sarah_jones","secondarywid":"3","relationshiptype":"attributes"}},"5":{"wid":"5","metadata":{"method":"booksdto","date":"2014-01-29T18:38:10.877Z"},"data":{"title":"Attack on the Mainframe","pages":"600"}},"6":{"wid":"6","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:10.884Z"},"data":{"primarywid":"mike_williams","secondarywid":"5","relationshiptype":"attributes"}},"7":{"wid":"7","metadata":{"method":"booksdto","date":"2014-01-29T18:38:12.310Z"},"data":{"title":"Carpentry 101","pages":"120"}},"8":{"wid":"8","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:12.316Z"},"data":{"primarywid":"jerry_stone","secondarywid":"7","relationshiptype":"attributes"}},"9":{"wid":"9","metadata":{"method":"booksdto","date":"2014-01-29T18:38:14.104Z"},"data":{"title":"The X Factor","pages":"300"}},"10":{"wid":"10","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:14.110Z"},"data":{"primarywid":"elizabeth_heart","secondarywid":"9","relationshiptype":"attributes"}},"11":{"wid":"11","metadata":{"method":"booksdto","date":"2014-01-29T18:38:18.805Z"},"data":{"title":"none","pages":"00"}},"12":{"wid":"12","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:18.812Z"},"data":{"primarywid":"startwid","secondarywid":"11","relationshiptype":"attributes"}},"13":{"wid":"13","metadata":{"method":"adddto","date":"2014-01-29T18:38:18.822Z"},"data":{}},"14":{"wid":"14","metadata":{"method":"actiondto","date":"2014-01-29T18:38:18.833Z"},"data":{"widname":"startwid","displayname":"Process Blur","actiondescription":"string","category":"blur","subcategory":"name","addthis.prexecute":"","addthis.executethis":"fieldrequired","addthis.postexecute":"getwidmaster"}},"15":{"wid":"15","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:18.841Z"},"data":{"primarywid":"13","secondarywid":"14","relationshiptype":"attributes"}},"16":{"wid":"16","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:18.850Z"},"data":{"primarywid":"startwid","secondarywid":"13","relationshiptype":"attributes"}},"initialwid":{"wid":"initialwid","initialwid":"for key hello from bootprocess"},"authordto":{"wid":"authordto","metadata":{"method":"authordto","date":"2014-01-29T18:38:08.745Z"},"data":{"name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultauthordtoactions":"inherit"}},"booksdto":{"wid":"booksdto","metadata":{"method":"booksdto","date":"2014-01-29T18:38:08.747Z"},"data":{"title":"string","pages":"string"}},"adddto":{"wid":"adddto","metadata":{"method":"adddto","date":"2014-01-29T18:38:08.750Z"},"data":{"addfield":"onetomany","gojsobject":"onetoone","linkrules":"onetomany","actiondto":"onetomany","defaultadddtoactions":"inherit"}},"addfield":{"wid":"addfield","metadata":{"method":"addfield","date":"2014-01-29T18:38:08.752Z"},"data":{"fieldname":"string","editable":"string","display":"string","oneditactions":"string","defaultfieldvalue":"inherit"}},"gojsobject":{"wid":"gojsobject","metadata":{"method":"gojsobject","date":"2014-01-29T18:38:08.754Z"},"data":{"class":"string","linkFromPortIdProperty":"string","linkToPortIdProperty":"string","nodeDataArray":"onetomany","linkDataArray":"onetomany"}},"nodedataarray":{"wid":"nodedataarray","metadata":{"method":"nodedataarray","date":"2014-01-29T18:38:08.756Z"},"data":{"key":"string","loc":"string","leftArray":"onetomany","topArray":"onetomany","bottomArray":"onetomany","rightArray":"onetomany"}},"leftarray":{"wid":"leftarray","metadata":{"method":"leftarray","date":"2014-01-29T18:38:08.759Z"},"data":{"class":"string","portColor":"string","portId":"string"}},"toparray":{"wid":"toparray","metadata":{"method":"toparray","date":"2014-01-29T18:38:08.760Z"},"data":{"class":"string","portColor":"string","portId":"string"}},"bottomarray":{"wid":"bottomarray","metadata":{"method":"bottomarray","date":"2014-01-29T18:38:08.762Z"},"data":{"portColor":"string","portId":"string"}},"rightarray":{"wid":"rightarray","metadata":{"method":"rightarray","date":"2014-01-29T18:38:08.764Z"},"data":{"portColor":"string","portId":"string"}},"linkdataarray":{"wid":"linkdataarray","metadata":{"method":"linkdataarray","date":"2014-01-29T18:38:08.767Z"},"data":{"from":"string","to":"string","fromPort":"string","toPort":"string"}},"linkrules":{"wid":"linkrules","metadata":{"method":"linkrules","date":"2014-01-29T18:38:08.769Z"},"data":{"linkclass":"string","min":"string","max":"string"}},"actiondto":{"wid":"actiondto","metadata":{"method":"actiondto","date":"2014-01-29T18:38:08.772Z"},"data":{"displayname":"string","actiondescription":"string","category":"string","subcategory":"string","addthis.preexecute":"string","addthis.executethis":"string","addthis.postexecute":"string","defaultmasteractions":"inherit"}},"relbooktoauthor":{"wid":"relbooktoauthor","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.777Z"},"data":{"primarywid":"authordto","secondarywid":"booksdto","relationshiptype":"attributes"}},"reladddtotoauthor":{"wid":"reladddtotoauthor","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.779Z"},"data":{"primarywid":"authordto","secondarywid":"adddto","relationshiptype":"attributes"}},"gojsrel1":{"wid":"gojsrel1","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.781Z"},"data":{"primarywid":"gojsobject","secondarywid":"nodedataarray","relationshiptype":"attributes"}},"gojsrel2":{"wid":"gojsrel2","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.783Z"},"data":{"primarywid":"gojsobject","secondarywid":"linkdataarray","relationshiptype":"attributes"}},"gojsrel3":{"wid":"gojsrel3","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.785Z"},"data":{"primarywid":"nodedataarray","secondarywid":"leftarray","relationshiptype":"attributes"}},"gojsrel4":{"wid":"gojsrel4","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.787Z"},"data":{"primarywid":"nodedataarray","secondarywid":"toparray","relationshiptype":"attributes"}},"gojsrel5":{"wid":"gojsrel5","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.789Z"},"data":{"primarywid":"nodedataarray","secondarywid":"bottomarray","relationshiptype":"attributes"}},"gojsrel6":{"wid":"gojsrel6","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.793Z"},"data":{"primarywid":"nodedataarray","secondarywid":"rightarray","relationshiptype":"attributes"}},"rel_actiondto_adddto":{"wid":"rel_actiondto_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.796Z"},"data":{"primarywid":"adddto","secondarywid":"actiondto","relationshiptype":"attributes"}},"rel_addfield_adddto":{"wid":"rel_addfield_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.710Z"},"data":{"primarywid":"adddto","secondarywid":"addfield","relationshiptype":"attributes"}},"rel_gojsobject_adddto":{"wid":"rel_gojsobject_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.801Z"},"data":{"primarywid":"adddto","secondarywid":"gojsobject","relationshiptype":"attributes"}},"rel_linkrules_adddto":{"wid":"rel_linkrules_adddto","metadata":{"method":"relationshipdto","date":"2014-01-29T18:38:08.803Z"},"data":{"primarywid":"adddto","secondarywid":"linkrules","relationshiptype":"attributes"}},"joe_jamison":{"wid":"joe_jamison","metadata":{"method":"authordto","date":"2014-01-29T18:38:09.107Z"},"data":{"name":"Joe Jamison","age":"32"}},"sarah_jones":{"wid":"sarah_jones","metadata":{"method":"authordto","date":"2014-01-29T18:38:09.783Z"},"data":{"name":"Sarah Jones","age":"40"}},"mike_williams":{"wid":"mike_williams","metadata":{"method":"authordto","date":"2014-01-29T18:38:10.874Z"},"data":{"name":"Mike Williams","age":"36"}},"jerry_stone":{"wid":"jerry_stone","metadata":{"method":"authordto","date":"2014-01-29T18:38:12.306Z"},"data":{"name":"Jerry Stone","age":"41"}},"elizabeth_heart":{"wid":"elizabeth_heart","metadata":{"method":"authordto","date":"2014-01-29T18:38:14.101Z"},"data":{"name":"Elizabeth Heart","age":"50"}},"startwid":{"wid":"startwid","metadata":{"method":"authordto","date":"2014-01-29T18:38:18.801Z"},"data":{"name":"start wid","age":"00"}}};

    addToLocalStorage("DRI", DRI);
    addToLocalStorage("DRIKEY", DRIKEY);

    proxyprinttodiv('Function getwidmongo hit', null, 10);
    debuglevel=10;
    debugname="getwidmongo"
    getWidMongo("startwid", "", "", "", "", 10, function (err, res) {
        alert(JSON.stringify(res));
        callback({}, res)
    });
    
}


                            // for (var item in drillDownParameters) {
                            //     proxyprinttodiv('Function getAndFormatNextLevel() loop item', item, 10);
                            //     if ((convertmethod == "dto") && ((item == "wid") || (item == "metadata.method"))) 
                            //         {
                            //         } // left empty by design
                            //     else {
                            //         proposedLeft = mongowidmethod + "." + String(iteration) + "." + item; // removed +1
                            //         // added 10-18
                            //         proxyprinttodiv('Function getAndFormatNextLevel() mongorelationshipmethod', mongorelationshipmethod, 10);
                            //         if (((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) ||
                            //             (mongorelationshipmethod == "last")) {
                            //             //if ((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) {
                            //             proposedLeft = mongowidmethod + "." + item;
                            //         }

                            //         proposedRight = drillDownParameters[item];
                            //         }
                            //     nextLevelParameters.push({
                            //         "key": proposedLeft,
                            //         "value": proposedRight
                            //         });
                            //     }
                            // moved from above getwidmongo

})(typeof window === "undefined" ? global : window);