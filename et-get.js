(function (window) {
    var configuration = config.configuration;

    exports.getwid = getwid = function getwid(inputWidgetObject, callback) {
        delete inputWidgetObject['executethis']; // ** added by Saurabh 11/9

        proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);
        // var outobjectarr = [];

        getfrommongo(inputWidgetObject, function (results) {
            var outobject = {};
            if (results && countKeys(results) > 0) {
                if (results["data"]) {
                    outobject = results["data"];
                }

                if (results['wid']) {
                    outobject['wid'] = results['wid'];
                } else {
                    outobject['wid'] = "";
                }
                
                if (results['metadata']) {
                    outobject['metadata.method'] = results['metadata']['method'];
                } else {
                    outobject['metadata.method'] = "";
                }
            }

            callback(outobject);
        });
    };


    exports.aggressivedto = aggressivedto = function aggressivedto(widInput, preamble, level, callback) { // returns a made up dto base on maximum number of relationships, etc
        // local vars
        var moreDTOParameters = {};
        var targetwid = "";
        var nexttargetwid = "";
        var nextpreamble = "";
        var executeobject = {};
        var parameterObject;
        var x;
        var ret = undefined;
        var err;

        // global vars
        // does this need to be global ?
        dtoGlobalParameters = {};

        function debugvars(varlist) {
            var allvars = 
            {
                1:
                    {
                        "moreDTOParameters":moreDTOParameters,
                        "targetwid":targetwid,
                        "nexttargetwid":nexttargetwid,
                        "nextpreamble":nextpreamble,
                        "eachresult":'',
                        "key":'',
                        "rightparameters":{},
                        "executeobject":executeobject,
                        "parameterObject":parameterObject,
                        "x":x,
                        "ret":ret,
                        "err":err
                    },
                2:
                    {
                        "moreDTOParameters":moreDTOParameters,
                        "targetwid":targetwid,
                        "nexttargetwid":nexttargetwid
                    }
            };
            var resultObj={};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {varlist.push(eachgroup);}
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
                        level = 99
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
                    etexecute(executeobject, function (err, res) {
                        parameterObject = res;
                        debugfn("aggressivedto", "step1", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null);
                    });
                },

                function step2(cb) {
                    // TODO :: add steps here -- DONE


                    // if ((parameterObject !== undefined) && (parameterObject['metadata.method'] != "") && (parameterObject['metadata.method'] != targetwid)) {
                    //     targetwid = parameterObject['metadata.method'];
                    //     executeobject = {};
                    //     executeobject["wid"] = targetwid;
                    //     executeobject["executethis"] = 'getwid';


                    //     etexecute(executeobject, function (err, res) {
                    //         moreDTOParameters = res;
                    //         if (Object.keys(moreDTOParameters).length != 0) {
                    //             parameterObject = jsonConcat(parameterObject, moreDTOParameters)
                    //         }
                    //     });
                    //     // moreDTOParameters = executethis(executeobject, getwid); // TODO -- DONE
                    //     // if (Object.keys(moreDTOParameters).length != 0) {
                    //     //     parameterObject = jsonConcat(parameterObject, moreDTOParameters)
                    //     // }
                    // }

                    // executeobject = {};
                    // executeobject["mongowid"] = targetwid;
                    // executeobject["mongorelationshiptype"] = "attributes";
                    // executeobject["mongorelationshipmethod"] = "all";
                    // executeobject["mongorelationshipdirection"] = "forward";
                    // executeobject["mongowidmethod"] = "";
                    // executeobject["convertmethod"] = "";
                    // executeobject["dtotype"] = "";
                    // executeobject["executethis"] = querywid;

                    // // var x = window['querywid'];
                    // etexecute(executeobject, function (err, res) {
                    //     moreParameters = res;
                    //     cb(null, 'two');
                    // });
                    // // moreParameters = executethis(executeobject, getwidmaster); // TODO -- DONE
                    // // moreDTOParameters = executethis(executeobject, x); // TODO -- DONE


                    if ((parameterObject !== undefined) && (parameterObject['metadata.method'] != "") && (parameterObject['metadata.method'] != targetwid)) {
                        async.series([ // asynch step1n2

                                function step2n1(cb1) {
                                    targetwid = parameterObject['metadata.method'];
                                    executeobject = {};
                                    executeobject["wid"] = targetwid;
                                    executeobject["executethis"] = 'getwid';


                                    etexecute(executeobject, function (err, res) {
                                        moreDTOParameters = res;
                                        if (Object.keys(moreDTOParameters).length != 0) {
                                            parameterObject = jsonConcat(parameterObject, moreDTOParameters)
                                        }
                                        debugfn("aggressivedto", "step2", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                        cb1(null, 'step2n1');
                                    });

                                },
                                function step2n2(cb1) {
                                    executeobject = {};
                                    executeobject["mongowid"] = targetwid;
                                    executeobject["mongorelationshiptype"] = "attributes";
                                    executeobject["mongorelationshipmethod"] = "all";
                                    executeobject["mongorelationshipdirection"] = "forward";
                                    executeobject["mongowidmethod"] = "";
                                    executeobject["convertmethod"] = "";
                                    executeobject["dtotype"] = "";
                                    executeobject["executethis"] = querywid;

                                    // x = window['querywid'];
                                    etexecute(executeobject, function (err, res) {
                                        var moreParameters = res;
                                        debugfn("aggressivedto", "step2", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                        cb1(null, 'step2n1');
                                    });
                                }

                            ],
                            function (err, res) {
                                if (err) {
                                    throw err;
                                }
                                    debugfn("aggressivedto", "if ((parameterObject !== undefined)  A", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                cb(null, 'two');
                            });
                    } else {
                        debugfn("aggressivedto", "if ((parameterObject !== undefined)  B", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'two');
                    }
                },
                // needs some fancy list async rewrite
                function step3(cb) {
                    var listToDo = [];

                    for (var eachresult in moreDTOParameters) {
                        listToDo.push(eachresult);
                    }

                    async.mapSeries(listToDo, function (eachresult, cbMap) {
                            var rightparameters = {};
                            for (var key in moreDTOParameters[eachresult]) {
                                rightparameters = moreDTOParameters[eachresult][key];
                            }

                            // from dto create outgoing object
                            if (moreDTOParameters[key]) {
                                parameterObject[key] = moreDTOParameters[key]
                            }
                            if (level > 0) {
                                async.series([

                                        function step3n1(cbn1) {
                                            var params;

                                            var isSynchronous = configuration.aggressivedto.synchronous;
                                            if (isSynchronous) {
                                                params = aggressivedto(key, key, level);
                                                debugfn("aggressivedto", "step3a", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                                cbn1(null);
                                            } else {
                                                aggressivedto(key, key, level, function (err, data) { //TODO consider -- DONE
                                                    params = data;
                                                    debugfn("aggressivedto", "step3b", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                                    cbn1(null);
                                                });
                                            }
                                        },
                                        function step3n2(cbn2) {
                                            parameterObject = jsonConcat(parameterObject, params);
                                            debugfn("aggressivedto", "step3n2", "get", "sub", debugcolor, debugindent, debugvars([1]));
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
                },
                function step4(cb) {
                    var dtoGlobalParameters = {};
                    for (var eachresult in parameterObject) {
                        dtoGlobalParameters[preamble + eachresult] = parameterObject[eachresult];
                    }
                    ret = dtoGlobalParameters;
                    debugfn("aggressivedto", "step4", "get", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'four');
                }
            ],
            function (err, results) {
                var isSynchronous = configuration.aggressivedto.synchronous;
                if (!isSynchronous) {
                    callback(err, ret);
                }
            });

        var isSynchronous = configuration.aggressivedto.synchronous;
        if (isSynchronous) {
            if (exports.environment === "local") {
                while (ret === undefined) {}
                return ret;
            }
        }
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
            var allvars = 
            {
                1:
                    {
                        "outputparameters":outputparameters,
                        "dtoloc":dtoloc,
                        "proposedLeft":proposedLeft,
                        "proposedRight":proposedRight,
                        "dtoobject":dtoobject,
                        "inputParametersObject":inputParametersObject,
                        "childdto":childdto,
                        "preAmble":'',
                        "item":'',
                        "moreParameters":moreParameters,
                        "executeobject":executeobject,
                        "eafield":'',
                        "otherdtoobject":otherdtoobject,
                        "resultlist":resultlist,
                        "ret":ret,
                        "err":err,
                        "isSynchronous":isSynchronous
                    },
                2:
                    {
                        "outputparameters":outputparameters,
                        "dtoloc":dtoloc,
                        "proposedLeft":proposedLeft,
                        "proposedRight":proposedRight
                    }
            };
            var resultObj={};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {varlist.push(eachgroup)};
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
                    if (((resultObj['wid'] !== undefined)) &&
                        ((resultObj['wid'] !== resultObj['metadata.method']) || (dtotype = "defaultdto"))) {

                        var isSynchronous = configuration.aggressivedto.synchronous;

                        if (isSynchronous) {
                            dtoobject = aggressivedto(resultObj['wid'], "", 10); //todo -- done

                            for (var item in dtoobject) {
                                var preamble = "";
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

                                    etexecute(executeobject, function (err, res) {
                                        moreParameters = res;

                                        for (var eafield in moreParameters) {
                                            if (preamble == "") {
                                                resultObj[eafield] = moreParameters[eafield];
                                            } else {
                                                resultObj[preamble + '.' + eafield] = moreParameters[eafield];
                                            }
                                        }
                                    });
                                    // moreParameters = executethis(executeobject, getwidmaster); // TODO -- DONE
                                }
                            }
                            debugfn("getcleanparameters", "step1a", "get", "sub", debugcolor, debugindent, debugvars([1]));
                            cb(null, 'one');
                        } else {
                            aggressivedto(resultObj['wid'], "", 10, function (err, res) {
                                dtoobject = res;

                                // for (item in dtoobject) {
                                //     // TODO :: add steps here
                                //     preamble = "";
                                //     proposedLeft = item;
                                //     proposedRight = dtoobject[item];

                                //     if (proposedRight == 'inherit') {
                                //         dtoloc = proposedLeft.lastIndexOf(".");

                                //         if (dtoloc != -1) {
                                //             preamble = proposedLeft.substring(0, dtoloc);
                                //             proposedLeft = proposedLeft.substring(dtoloc + 1, proposedLeft.length);
                                //         }
                                //         executeobject = {};
                                //         executeobject["command.convertmethod"] = "nowid";
                                //         executeobject["wid"] = proposedLeft;
                                //         executeobject["executethis"] = 'getwidmaster';

                                //         etexecute(executeobject, function (err, res) {
                                //             moreParameters = res;

                                //             for (eafield in moreParameters) {
                                //                 if (preamble == "") {
                                //                     resultObj[eafield] = moreParameters[eafield];
                                //                 } else {
                                //                     resultObj[preamble + '.' + eafield] = moreParameters[eafield];
                                //                 }
                                //             }

                                //         });
                                //         // moreParameters = executethis(executeobject, getwidmaster); // TODO -- DONE
                                //     }
                                //     cb(null, 'one');
                                // }


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

                                                    etexecute(executeobject, function (err, res) {
                                                        moreParameters = res;

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
                                                }else{
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
                var isSynchronous = configuration.getcleanparameters.synchronous;

                if (!isSynchronous) {
                    callback(err, ret);
                }
            });

        var isSynchronous = configuration.getcleanparameters.synchronous;

        if (isSynchronous) {
            if (exports.environment === "local") {
                while (ret === undefined) {}
                return ret;
            }
        }
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
            var allvars = 
            {
                1:
                    {
                        "ret":ret,
                        "resultObj":resultObj,
                        "inherit":inherit,
                        "checkflag":checkflag,
                        "convertMethod":convertMethod,
                        "dtotype":dtotype,
                        "wid":wid,
                        "accesstoken":accesstoken,
                        "err":err
                    },
                2:
                    {
                        "ret":ret,
                        "resultObj":{},
                        "inherit":inherit
                    }
            };
            var resultObj={};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {varlist.push(eachgroup);}
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
                    delete parameters['executethis']; //** added 11/2
                    wid = parameters.wid;
                    dtotype = parameters["command.dtotype"];
                    inherit = parameters["command.inherit"];
                    accesstoken = parameters["command.accesstoken"];
                    checkflag = parameters["command.checkflag"];
                    convertMethod = parameters["command.convertmethod"];

                    var isSynchronous = configuration.getWidMongo.synchronous;

                    if (isSynchronous) {
                        resultObj = getWidMongo(wid, convertMethod, accesstoken, dtotype); //TODO consider -- DONE
                        debugfn("getwidmaster", "step1a", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'one');
                    } else {
                        getWidMongo(wid, convertMethod, accesstoken, dtotype, function (err, data) { //TODO consider -- DONE
                            resultObj = data;
                            debugfn("getwidmaster", "step1b", "get", "sub", debugcolor, debugindent, debugvars([1]));
                            cb(null, 'one');
                        });
                    }


                },
                function step2(cb) {
                    // could be moved inside clean parm?
                    if (inherit) { // inherit points to wid with more datan- Grab the params from mongo(local storage)
                        var executeobject = {};
                        executeobject["executethis"] = getwid;
                        executeobject["wid"] = inherit;

                        etexecute(executeobject, function (err, res) {
                            var moreParameters = res;
                            if (moreParameters) {
                                resultObj = jsonConcat(resultObj, moreParameters);
                            }
                            debugfn("getwidmaster", "step2a", "get", "sub", debugcolor, debugindent, debugvars([1]));
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
                        debugfn("getwidmaster", "step2b", "get", "sub", debugcolor, debugindent, debugvars([1]));
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
                        var isSynchronous = configuration.getcleanparameters.synchronous; 

                        if (isSynchronous) {
                            resultObj = getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod); //TODO -- DONE
                            resultObj = resultObj.parms
                        } else {
                            getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod, function (err, res) {
                                resultObj = res;
                                resultObj = resultObj.parms;
                            }); //TODO -- DONE

                        }
                    }

                    if ((convertMethod == "nowid") || (convertMethod == "dto")) { //(convertMethod=="nowid") { -- added 11/12 **
                        delete resultObj["wid"];
                        delete resultObj["metadata.method"];
                    }

                    if (convertMethod == "toobject") {
                        resultObj = ConvertFromDOTdri(resultObj);
                    }

                    ret = resultObj;

                    debugfn("getwidmaster", "step2b", "get", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'three');
                }
            ],
            function (err, results) {
                var isSynchronous = configuration.getwidmaster.synchronous; /// TODO :: CHECKI THIS ERROR, WHEN removed, causes fail
                if (!isSynchronous) {
                // if (callback instanceof Function) {
                    callback(ret);
                // }
                }
            });

        var isSynchronous = configuration.getwidmaster.synchronous;

        if (isSynchronous) {
            if (exports.environment === "local") {
                while (ret === undefined) {}
                return ret;
            }
        }
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
    //         proxyprinttodiv('Function getWidMongo() dtoGlobalParameters -- 111', dtoGlobalParameters,10);

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
    //     aggressivedto(widInput,"",1,function(err,res){
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

    //         dtoGlobalParameters=moreParameters; // line added 11-9 -- step through an agressive dto

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
    //                 } // 11-9 readded inherit from cleanparms here:
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
    //                 // 11-15 line below commented
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

    function getWidMongo(widInput, convertMethod, accessToken, dtoin, callback) {
        var dtoGlobalParameters = {};
        var attr = "";
        var nextLevelParameters = {};
        var outgoingParameters = {};
        var moreDTOParameters = {};
        var moreParameters = {};
        var currentLevelObjectList = [];
        var dtoGlobalParametersList = [];
        var addedobject = {};
        var eachresult = "";
        var createdto = 'false';
        var createrelationships = 'false';
        var savedto = 'false';
        var createid = widInput;
        var dtotype = "";
        var currentLevelObject;
        var executeobject = {};
        var olddebug = Debug ;
        var err;
        var ret = undefined;

        function debugvars(varlist) {
            var allvars = 
            {
                1:
                    {
                        "dtoGlobalParameters":dtoGlobalParameters,
                        "attr":attr,
                        "nextLevelParameters":nextLevelParameters,
                        "outgoingParameters":outgoingParameters,
                        "moreDTOParameters":moreDTOParameters,
                        "moreParameters":moreParameters,
                        "currentLevelObjectList":currentLevelObjectList,
                        "dtoGlobalParametersList":dtoGlobalParametersList,
                        "addedobject":addedobject,
                        "eachresult":eachresult,
                        "createdto":createdto,
                        "createrelationships":createrelationships,
                        "savedto":savedto,
                        "createid":createid,
                        "dtotype":dtotype,
                        "currentLevelObject":currentLevelObject,
                        "item":'',
                        "executeobject":executeobject,
                        "olddebug":olddebug,
                        "err":err,
                        "ret":ret
                    },
                2:
                    {
                        "nextLevelParameters":nextLevelParameters,
                        "outgoingParameters":outgoingParameters,
                        "moreDTOParameters":moreDTOParameters
                    }
            };
            var resultObj={};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {varlist.push(eachgroup);}
                }
            
            for (var eachgroup in varlist) {
                vargroup = varlist[eachgroup];
                resultObj = jsonConcat(resultObj, allvars[vargroup]);
                }
            return resultObj;
        }

        if (!widInput) {
            ret = "";
            if (callback instanceof Function) {
                callback(err, ret);
            }
            if (exports.environment === "local") {
                while (ret === undefined) {}
                return ret;
            }

        } else {
            async.series([

                    function part1(cb) {
                        executeobject["wid"] = widInput;
                        executeobject["executethis"] = 'getwid';
                        // currentLevelObject = executethis(executeobject, getwid); //TODO -- DONE
                        // cb(null);
                        etexecute(executeobject, function (err, res) {
                            currentLevelObject = res;
                            debugfn("getWidMongo", "part1", "get", "sub", debugcolor, debugindent, debugvars([1]));
                            cb(null, 'part1');
                        });
                    },
                    function step2(cb) {
                        if ((currentLevelObject["metadata.method"] !== undefined) &&
                            (currentLevelObject["metadata.method"] !== "")) {
                        // if(true){
                            dtotype = currentLevelObject["metadata.method"];
                            executeobject = {};
                            executeobject["wid"] = dtotype;
                            executeobject['executethis'] = 'getwid';

                            etexecute(executeobject, function (err, res) {
                                dtoGlobalParameters = res; //TODO -- DONE
                                console.log(dtoGlobalParameters);
                                debugfn("getWidMongo", "step2a", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                cb(null, 'two');
                            }); //TODO -- DONE

                        } else {
                            debugfn("getWidMongo", "step2b", "get", "sub", debugcolor, debugindent, debugvars([1]));
                            cb(null, 'two');
                        }

                    },
                    function step3(cb) {
                        var isSynchronous = configuration.aggressivedto.synchronous;

                        if (isSynchronous) {
                            moreParameters = aggressivedto(widInput, "", 1); //TODO -- done
                            debugfn("getWidMongo", "step3a", "get", "sub", debugcolor, debugindent, debugvars([1]));
                            cb(null, 'three');
                        } else {
                            aggressivedto(widInput, "", 1, function (err, res) {
                                moreParameters = res;
                                debugfn("getWidMongo", "step3b", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                cb(null, 'three');
                            });
                        }
                    },
                    function step4(cb) {
                        if ((dtoGlobalParameters['metadata.method'] == "") || (dtoin == "defaultdto")) {
                            dtoGlobalParameters = moreParameters
                        }
                        currentLevelObjectList = objectToList(currentLevelObject);
                        dtoGlobalParametersList = objectToList(dtoGlobalParameters);
                        currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
                        currentLevelObjectList = currentLevelObjectList.match;
                        currentLevelObject = listToObject(currentLevelObjectList);
                        outgoingParameters = currentLevelObject;
                        dtoGlobalParameters = moreParameters; // line added 11-9 -- step through an agressive dto
                        debugfn("getWidMongo", "step4", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'four');
                    },
                    function step5(cb) {
                        var listToDo = [];
                        for (var item in dtoGlobalParameters) {
                            listToDo.push(item);
                        }
                        async.mapSeries(listToDo, function (item, cbMap) {
                                nextLevelParameters = {};
                                attr = dtoGlobalParameters[item];
                                if ((attr == "onetoone") || (attr == "onetomany")) { // 10-24 || (attr == "inherit"))  {
                                    var isSynchronous = configuration.getAndFormatNextLevel.synchronous;
                                    if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property

                                        if (isSynchronous) {
                                            nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin); // removed inherit dtoGlobalParameters
                                        } else {
                                            getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin, function (err, res) {
                                                nextLevelParameters = res;
                                            });
                                        }
                                    }
                                    //TODO -- DONE
                                    // 10-5 took away dtotype --
                                    if (attr == "onetomany") { // if dto states 'onetomany' then search for related records that match property
                                        if (isSynchronous) {
                                            nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin); //removed dtoGlobalParameters

                                        } else {
                                            getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin, function (err,res) {
                                                nextLevelParameters = res;
                                            });
                                        }
                                    } // 11-9 readded inherit from cleanparms here:
                                    //TODO -- DONE
                                    outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
                                } // if
                                debugfn("getWidMongo", "step5", "get", "sub", debugcolor, debugindent, debugvars([1]));
                                cbMap(null);
                            },
                            function (err, res) {
                                if (err) {
                                    throw err;
                                }
                                cb(null, 'five');
                            });
                    },
                    function step6(cb) {
                        Debug = olddebug;
                        ret = outgoingParameters;
                        debugfn("getWidMongo", "step6", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'six');
                    }
                ],
                function (err, results) {
                    var isSynchronous = configuration.getWidMongo.synchronous; 
                    if (!isSynchronous) {
                        callback(err, ret);
                    }
                });

            var isSynchronous = configuration.getWidMongo.synchronous;

            if (isSynchronous) {
                if (exports.environment === "local") {
                    while (ret === undefined) {}
                    return ret;
                }
            }

        } // end else
    }


    // Starting of getAndFormatNextLevel function
    function getAndFormatNextLevel(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, accesstoken, dtoin, callback) {
        var executeobject = {};
        var drillDownParameters = {};
        var rowresult = "";
        var nextLevelParameters = [];
        var nextLevelParametersObject = {};
        var proposedLeft = "";
        var proposedRight = "";
        var iteration = 0;
        var relatedParameters;
        var listToDo;
        var ret = undefined;
        var err;

        function debugvars(varlist) {
            var allvars = 
            {
                1:
                    {
                        "executeobject":executeobject,
                        "drillDownParameters":drillDownParameters,
                        "rowresult":rowresult,
                        "nextLevelParameters":nextLevelParameters,
                        "nextLevelParametersObject":nextLevelParametersObject,
                        "proposedLeft":proposedLeft,
                        "proposedRight":proposedRight,
                        "item":'',
                        "iteration":iteration,
                        "relatedParameters":relatedParameters,
                        "listToDo":listToDo,
                        "ret":ret,
                        "err":err
                    },
                2:
                    {
                        "executeobject":executeobject,
                        "drillDownParameters":drillDownParameters,
                        "rowresult":rowresult
                    }
            };
            var resultObj={};
            var vargroup;
            if (!varlist) {
                for (var eachgroup in allvars) {varlist.push(eachgroup);}
            }
            
            for (var eachgroup in varlist) {
                vargroup = varlist[eachgroup];
                resultObj = jsonConcat(resultObj, allvars[vargroup]);
            }
            return resultObj;
        }

        async.series([

                function part1(cb) {
                    executeobject["mongowid"] = widInput;
                    executeobject["mongorelationshiptype"] = mongorelationshiptype;
                    executeobject["mongorelationshipmethod"] = mongorelationshipmethod;
                    executeobject["mongorelationshipdirection"] = mongorelationshipdirection;
                    executeobject["mongowidmethod"] = mongowidmethod;
                    executeobject["convertmethod"] = convertmethod;
                    executeobject["dtotype"] = "";
                    executeobject["executethis"] = querywid;


                    etexecute(executeobject, function (err, res) {
                        relatedParameters = res; //TODO -- DONE
                            debugfn("getAndFormatNextLevel", "part1", "get", "sub", debugcolor, debugindent, debugvars([1]));
                        cb(null)
                    })

                },
                function part2(cb) {
                    if (Object.keys(relatedParameters).length == 0) {

                        ret = nextLevelParametersObject;

                        if (callback instanceof Function) {
                            callback(err, ret);
                        }

                        if (exports.environment === "local") {
                            while (ret === undefined) {}
                            return ret;
                        }

                    } else {
                        listToDo = [];
                        for (iteration = 0;
                            (iteration < countKeys(relatedParameters)); iteration++) {
                            listToDo.push(iteration);
                        }
                        async.mapSeries(listToDo, function (iteration, cbMap) {
                                rowresult = relatedParameters[iteration];

                                for (var key in rowresult) {
                                    proposedLeft = key;
                                    proposedRight = rowresult[key];
                                }

                                if (convertmethod == "wid") {
                                    nextLevelParameters.push({
                                        "key": mongowidmethod,
                                        "value": proposedLeft
                                    });
                                }

                                if (convertmethod == "json") {
                                    nextLevelParameters.push({
                                        "key": mongowidmethod,
                                        "value": JSON.stringify(proposedRight)
                                    });
                                }

                                if ((convertmethod == "") || (convertmethod == "dto") || (convertmethod == "toobject") ||
                                    (convertmethod == "num") || (convertmethod == "dtonum")) {


                                    var isSynchronous = configuration.getWidMongo.synchronous;
                                    if (isSynchronous) {
                                        ret = drillDownParameters = getWidMongo(proposedLeft, convertmethod, accesstoken, dtoin);
                                        for (var item in drillDownParameters) {
                                            if ((convertmethod == "dto") && ((item == "wid") || (item == "metadata.method"))) {} // left empty by design
                                            else {
                                                proposedLeft = mongowidmethod + "." + String(iteration) + "." + item; // removed +1
                                                // added 11-18
                                                proxyprinttodiv('Function getAndFormatNextLevel() mongorelationshipmethod', mongorelationshipmethod, 11);
                                                if (((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) ||
                                                    (mongorelationshipmethod == "last")) {
                                                    //if ((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) {
                                                    proposedLeft = mongowidmethod + "." + item;
                                                }

                                                proposedRight = drillDownParameters[item];
                                            }
                                            nextLevelParameters.push({
                                                "key": proposedLeft,
                                                "value": proposedRight
                                            });
                                        }
                                    } else {
                                        getWidMongo(proposedLeft, convertmethod, accesstoken, dtoin, function (err, res) {
                                            ret = drillDownParameters = res;
                                        });
                                        for (var item in drillDownParameters) {
                                            if ((convertmethod == "dto") && ((item == "wid") || (item == "metadata.method"))) {} // left empty by design
                                            else {
                                                proposedLeft = mongowidmethod + "." + String(iteration) + "." + item; // removed +1
                                                // added 11-18
                                                proxyprinttodiv('Function getAndFormatNextLevel() mongorelationshipmethod', mongorelationshipmethod, 11);
                                                if (((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) ||
                                                    (mongorelationshipmethod == "last")) {
                                                    //if ((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) {
                                                    proposedLeft = mongowidmethod + "." + item;
                                                }

                                                proposedRight = drillDownParameters[item];
                                            }
                                            nextLevelParameters.push({
                                                "key": proposedLeft,
                                                "value": proposedRight
                                            });
                                        }
                                    }
                                }
                                cbMap(null);
                            },
                            function (err, res) {
                                if (err) {
                                    throw err;
                                }
                            });
                    }
                    debugfn("getAndFormatNextLevel", "part2", "get", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'two');
                },
                function part3(cb) {
                    nextLevelParametersObject = listToObject(nextLevelParameters);
                    ret = nextLevelParametersObject;
                        debugfn("getAndFormatNextLevel", "part3", "get", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'three');
                }
            ],
            function (err, results) {
                var isSynchronous = configuration.getAndFormatNextLevel.synchronous;

                if (!isSynchronous) {
                    callback(err,ret);
                }
            });

        var isSynchronous = configuration.getAndFormatNextLevel.synchronous;

        if (isSynchronous) {
            if (exports.environment === "local") {
                while (ret === undefined) {}
                return ret;
            }
        }
    }


})(typeof window === "undefined" ? global : window);