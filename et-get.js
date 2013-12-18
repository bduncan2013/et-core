(function(window) {

    // if (typeof configuration === "undefined") {
    //     configuration = config.configuration;
    // }

    exports.getwid = getwid = function getwid(inputWidgetObject, callback) {
        delete inputWidgetObject['executethis']; // ** added by Saurabh 11/9

        proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);
        var outobject = {};

        getfrommongo(inputWidgetObject, function(results) {

            //var results = executethis(inputWidgetObject,getfrommongo);
            if (results && results["etstatus"] != "empty") {
                if (results["data"]) {
                    outobject = results["data"];
                }

                if (results['wid']) {
                    outobject['wid'] = results['wid'];
                } else {
                    outobject['wid'] = "";
                }

                if (results['metadata.method']) {
                    outobject['metadata.method'] = results['metadata.method'];
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
        var eachresult = "";
        var key = "";
        var rightparameters = {};
        var executeobject = {};
        var parameterObject;
        var x;
        var ret = undefined;
        var err;

        // global vars
        // does this need to be global ?
        dtoGlobalParameters = {};

        async.series([

                function step1(cb) {
                    if (!level) {
                        level = 99
                    } else {
                        level = level - 1
                    }; //how many levels to try
                    if (preamble === undefined) {
                        preamble = "";
                    }
                    if (preamble != "") {
                        preamble = preamble + ".";
                    }

                    targetwid = widInput;
                    executeobject["wid"] = widInput;
                    executeobject['executethis'] = 'getwid';
                    etexecute(executeobject, function(err, res) {
                        parameterObject = res;
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


                    //     etexecute(executeobject, function(err, res) {
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

                    // // x = window['querywid'];
                    // etexecute(executeobject, function(err, res) {
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


                                    etexecute(executeobject, function(err, res) {
                                        moreDTOParameters = res;
                                        if (Object.keys(moreDTOParameters).length != 0) {
                                            parameterObject = jsonConcat(parameterObject, moreDTOParameters)
                                        }
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
                                    etexecute(executeobject, function(err, res) {
                                        moreParameters = res;
                                        cb1(null, 'step2n1');
                                    });
                                }

                            ],
                            function(err, res) {
                                if (err) {
                                    throw err;
                                }
                                cb(null, 'two');
                            });
                    } else {
                        cb(null, 'two');
                    }
                },
                // needs some fancy list async rewrite
                function step3(cb) {
                    var listToDo = [];

                    for (eachresult in moreDTOParameters) {
                        listToDo.push(eachresult);
                    }

                    async.mapSeries(listToDo, function(eachresult, cbMap) {
                            rightparameters = {};
                            for (key in moreDTOParameters[eachresult]) {
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
                                                cbn1(null);
                                            } else {
                                                aggressivedto(key, key, level, function(err, data) { //TODO consider -- DONE
                                                    params = data;
                                                    cbn1(null);
                                                });
                                            }
                                        },
                                        function step3n2(cbn2) {
                                            parameterObject = jsonConcat(parameterObject, params);
                                            cbn2(null);
                                        }
                                    ],
                                    function(err, results) {

                                    });
                            }
                            cbMap(null);
                        },
                        function(err, res) {
                            if (err) {
                                throw err;
                            }
                        });

                    cb(null, 'three')
                },
                function step4(cb) {

                    var dtoGlobalParameters = {};
                    for (eachresult in parameterObject) {
                        dtoGlobalParameters[preamble + eachresult] = parameterObject[eachresult];
                    }
                    ret = dtoGlobalParameters;

                    cb(null, 'four');
                }
            ],
            function(err, results) {
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
    }

    function getcleanparameters(resultObj, dtotype, accesstoken, cleanmethod, convertmethod, callback) {
        var outputparameters = {};
        var dtoloc = 0;
        var proposedLeft = "";
        var proposedRight = "";
        var dtoobject = {};
        var inputParametersObject = {};
        var childdto = dtotype;
        var preAmble = "";
        var item = "";
        var moreParameters = {};
        var executeobject = {};
        var eafield = "";
        var otherdtoobject = {};
        var resultlist = [];
        var ret = undefined;
        var err;
        var isSynchronous;

        // goal of this section is to get inherited parameters
        async.series([

                function step1(cb) {
                    if (
                        ((resultObj['wid'] !== undefined)) &&
                        ((resultObj['wid'] !== resultObj['metadata.method']) || (dtotype = "defaultdto"))
                    ) {

                        var isSynchronous = configuration.aggressivedto.synchronous;

                        if (isSynchronous) {
                            dtoobject = aggressivedto(resultObj['wid'], "", 10); //todo -- done

                            for (item in dtoobject) {
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

                                    etexecute(executeobject, function(err, res) {
                                        moreParameters = res;

                                        for (eafield in moreParameters) {
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

                            cb(null, 'one');
                        } else {
                            aggressivedto(resultObj['wid'], "", 10, function(err, res) {
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

                                //         etexecute(executeobject, function(err, res) {
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


                                listtodo = [];
                                for (item in dtoobject) {
                                    listtodo.push(item);
                                }


                                async.mapSeries(listtodo, function(item, cbMap) {
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

                                                    etexecute(executeobject, function(err, res) {
                                                        moreParameters = res;

                                                        for (eafield in moreParameters) {
                                                            if (preamble == "") {
                                                                resultObj[eafield] = moreParameters[eafield];
                                                            } else {
                                                                resultObj[preamble + '.' + eafield] = moreParameters[eafield];
                                                            }
                                                        }
                                                        cb2(null, 'one');
                                                    });
                                                    // moreParameters = executethis(executeobject, getwidmaster); // TODO -- DONE
                                                } else {
                                                    cb2(null, 'one');
                                                }
                                            }
                                        ], function(err, res) {
                                            cbMap(null);
                                        });
                                    }, // map series
                                    function(err, res) {
                                        if (err) {
                                            throw err;
                                        }
                                        cb(null, 'one');
                                    }) // end of map series
                            });
                        }
                    }
                }, // end step1
                function step2(cb) {
                    // read dto -- and delete what should not surive
                    if (dtotype == "") {
                        dtotype = resultObj["metadata.method"]
                    };

                    if (resultObj["metadata.method"] != dtotype) {

                        for (item in resultObj) { // now step through each record that could be changed
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
                    cb(null, 'two');
                }, // end step2
                function step3(cb) {
                    ret = {
                        parms: outputparameters,
                        dto: dtoobject
                    };
                    cb(null, 'three');
                }
            ],
            function(err, results) {
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
        var ret;
        var err;

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
                        cb(null, 'one');
                    } else {
                        getWidMongo(wid, convertMethod, accesstoken, dtotype, function(err, data) { //TODO consider -- DONE
                            resultObj = data;
                            cb(null, 'one');
                        });
                    }


                },
                function step2(cb) {
                    // could be moved inside clean parm?
                    if (inherit) { // inherit points to wid with more datan- Grab the params from mongo(local storage)
                        executeobject = {};
                        executeobject["executethis"] = getwid;
                        executeobject["wid"] = inherit;

                        etexecute(executeobject, function(err, res) {
                            moreParameters = res;
                            if (moreParameters) {
                                resultObj = jsonConcat(resultObj, moreParameters);
                            }
                            cb(null, 'two');
                        });
                        // getwid(OutParameters, function(res) {
                        //         moreParameters = res;
                        //         if (moreParameters) {
                        //             resultObj = jsonConcat(resultObj, moreParameters);
                        //         }
                        //         cb(null, 'two');
                        //     });

                    } else {
                        cb(null, 'two');
                    }
                },
                function step3(cb) {
                    if (checkflag != "") { // see if right side of output needs to be made mongo compatible
                        dtoList = objectToList(dtoGlobalParameters);
                        resultList = objectToList(resultObj);
                        resultList = CleanBasedOnCheckflagList(checkflag, resultList, dtoList);
                        resultObj = listToObject(resultList);
                    }

                    olddebug = Debug;

                    if ((Object.keys(resultObj).length !== 0) && (resultObj['wid'] != resultObj['metadata.method'])) {
                        var isSynchronous = configuration.getcleanparameters.synchronous;

                        if (isSynchronous) {
                            resultObj = getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod); //TODO -- DONE
                            resultObj = resultObj.parms
                        } else {
                            getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod, function(err, res) {
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

                    cb(null, 'three');
                }
            ],
            function(err, results) {
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
    }


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
        var item;
        var executeobject = {};
        var olddebug = Debug;
        var err;
        var ret;

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
                        etexecute(executeobject, function(err, res) {
                            currentLevelObject = res;
                            cb(null, 'part1');
                        });
                    },
                    function step2(cb) {
                        if ((currentLevelObject["metadata.method"] !== undefined) &&
                            (currentLevelObject["metadata.method"] !== "")) {
                            dtotype = currentLevelObject["metadata.method"];
                            executeobject = {};
                            executeobject["wid"] = dtotype;
                            executeobject['executethis'] = 'getwid';

                            etexecute(executeobject, function(err, res) {
                                dtoGlobalParameters = res; //TODO -- DONE
                                console.log(dtoGlobalParameters);
                                cb(null, 'two');
                            }); //TODO -- DONE

                        } else {
                            cb(null, 'two');
                        }

                    },
                    function step3(cb) {
                        var isSynchronous = configuration.aggressivedto.synchronous;

                        if (isSynchronous) {
                            moreParameters = aggressivedto(widInput, "", 1); //TODO -- done
                            cb(null, 'three');
                        } else {
                            aggressivedto(widInput, "", 1, function(err, res) {
                                moreParameters = res;
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
                        cb(null, 'four');
                    },
                    function step5(cb) {
                        var listToDo = [];
                        for (item in dtoGlobalParameters) {
                            listToDo.push(item);
                        }
                        async.mapSeries(listToDo, function(item, cbMap) {
                                nextLevelParameters = {};
                                attr = dtoGlobalParameters[item];
                                if ((attr == "onetoone") || (attr == "onetomany")) { // 10-24 || (attr == "inherit"))  {
                                    var isSynchronous = configuration.getAndFormatNextLevel.synchronous;
                                    if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property

                                        if (isSynchronous) {
                                            nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin); // removed inherit dtoGlobalParameters
                                        } else {
                                            getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin, function(err, res) {
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
                                            getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin, function(err, res) {
                                                nextLevelParameters = res;
                                            });
                                        }
                                    } // 11-9 readded inherit from cleanparms here:
                                    //TODO -- DONE
                                    outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
                                } // if
                                cbMap(null);
                            },
                            function(err, res) {
                                if (err) {
                                    throw err;
                                }
                                cb(null, 'five');
                            });
                    },
                    function step6(cb) {
                        Debug = olddebug;
                        ret = outgoingParameters;
                        cb(null, 'six');
                    }
                ],
                function(err, results) {
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
        var rowresult = ""
        var nextLevelParameters = [];
        var nextLevelParametersObject = {};
        var proposedLeft = "";
        var proposedRight = "";
        var item = "";
        var iteration = 0;
        var relatedParameters;
        var listToDo;
        var ret = undefined;
        var err;

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


                    etexecute(executeobject, function(err, res) {
                        relatedParameters = res; //TODO -- DONE
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
                        async.mapSeries(listToDo, function(iteration, cbMap) {
                                rowresult = relatedParameters[iteration];

                                for (key in rowresult) {
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
                                        for (item in drillDownParameters) {
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
                                        getWidMongo(proposedLeft, convertmethod, accesstoken, dtoin, function(err, res) {
                                            ret = drillDownParameters = res;
                                        });
                                        for (item in drillDownParameters) {
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
                            function(err, res) {
                                if (err) {
                                    throw err;
                                }
                            });
                    }
                    cb(null, 'two');
                },
                function part3(cb) {
                    nextLevelParametersObject = listToObject(nextLevelParameters);
                    ret = nextLevelParametersObject;
                    cb(null, 'three');
                }
            ],
            function(err, results) {
                var isSynchronous = configuration.getAndFormatNextLevel.synchronous;

                if (!isSynchronous) {
                    callback(err, ret);
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