(function(window) {

    exports.getwid = getwid = function getwid(inputWidgetObject, callback) {
        delete inputWidgetObject['executethis']; // ** added by Saurabh 11/9

        proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);
        var outobject = {};

<<<<<<< HEAD
        getfrommongo(inputWidgetObject, function(results) {
=======

        // getfrommongo(inputWidgetObject, function(results) {
        //     if (results) {
        //         if (results["data"]) { outobject = results["data"]; }

        //         if (results['wid']) { outobject['wid'] = results['wid']; }
        //         else { outobject['wid']=""; }
>>>>>>> 57dd7a409299853809e8afafc518b68591736044

            //var results = executethis(inputWidgetObject,getfrommongo);
            if (results && results["etstatus"] != "empty") {
                if (results["data"]) {
                    outobject = results["data"];
                }

<<<<<<< HEAD
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

=======
        //         callback(outobject);
        //     }
        // });

        getfrommongo(inputWidgetObject, function (results) {

            //var results = executethis(inputWidgetObject,getfrommongo);
            if (results && results["etstatus"]!="empty") {
                if (results["data"]) { outobject = results["data"]; }

                if (results['wid']) { outobject['wid'] = results['wid']; }
                else { outobject['wid']=""; }

                if (results['metadata.method']) { outobject['metadata.method'] = results['metadata.method']; }
                else { outobject['metadata.method']=""; }

            }
            callback(outobject);

>>>>>>> 57dd7a409299853809e8afafc518b68591736044
        });
    };


<<<<<<< HEAD
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
=======
// Starting of securityCheck function
// LM: I think this section is turned off and not used since it was breaking the code, but it 
// should be saved and implemented later
    function securitycheck(widParameter, accessToken){ // accountwid and transactionType for future use
        proxyprinttodiv('Function securityCheck() in : ', 'before' );
        return true;
        var widInput= { mongowid:widParameter, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
        var accessTokenInput= { wid:accessToken, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
        var widOutput=querywid(widInput);
        proxyprinttodiv('Function querywid() out with  output : ', widOutput );
        var accessTokenOutput=querywid(accessTokenInput);
        proxyprinttodiv('Function querywid() out with  output : ', accessTokenOutput );
        var securityCheckOutput = widOutput['security']>accessTokenOutput['security'];
        proxyprinttodiv('Function securityCheck() out with  output : ', securityCheckOutput );
        return securityCheckOutput;
    }// End of querywid function



exports.aggressivedto = window.aggressivedto = aggressivedto = function aggressivedto(widInput, preamble, level) { // returns a made up dto base on maximum number of relationships, etc
        //Debug='true';
        var moreDTOParameters={};
        var targetwid="";
        var nexttargetwid="";
        var nextpreamble="";
        var eachresult="";
        var key="";
        var rightparameters={};
        dtoGlobalParameters={};

        proxyprinttodiv('Function aggressivedto()  level' , level, 20);
        proxyprinttodiv('Function aggressivedto()  widInput' , widInput,20);
        proxyprinttodiv('Function aggressivedto()  preamble' , preamble,20);
        if (!level) {level=99} else {level = level - 1}; //how many levels to try

        if (preamble === undefined) {preamble = "";}
        if (preamble !="") {preamble = preamble + ".";}
        proxyprinttodiv('Function aggressivedto()  processed preamble' , preamble);

        var executeobject={};
        targetwid=widInput;
        //executeobject["executethis"]="getwid";
        executeobject["wid"]=widInput;
        proxyprinttodiv('Function aggressivedto()  executeobject I' , executeobject, 20);
        var parameterObject=executethis(executeobject,getwid);
        // ** 11-1
        //var parameterObject=getfrommongo({"wid":widInput});

        proxyprinttodiv('Function aggressivedto()  parameterObject I' , parameterObject,20);

        if ((parameterObject!==undefined) && (parameterObject['metadata.method'] != "") && (parameterObject['metadata.method'] != targetwid))  {
            targetwid=parameterObject['metadata.method'];
            executeobject={};
            //executeobject["executethis"]=getwid;
            executeobject["wid"]=targetwid;
            proxyprinttodiv('Function aggressivedto()  executeobject II' , executeobject);
            moreDTOParameters=executethis(executeobject,getwid);
            if (Object.keys(moreDTOParameters).length !=0) {parameterObject=jsonConcat(parameterObject, moreDTOParameters)}
            // ** 11-1
            //parameterObject=getfrommongo({"wid":targetwid});
            proxyprinttodiv('Function aggressivedto()  parameterObject II' , parameterObject,20);
        }

        //for (eachresult in parameterObject) {
        //  parameterObject[eachresult] = 'string';
        //  }
        proxyprinttodiv('Function aggressivedto()  parameterObject III' , parameterObject);
        proxyprinttodiv('Function aggressivedto()  targetwid' , targetwid);

        executeobject = {};
        executeobject["mongowid"] = targetwid;
        executeobject["mongorelationshiptype"] = "attributes";
        executeobject["mongorelationshipmethod"] = "all";
        executeobject["mongorelationshipdirection"] = "forward";
        executeobject["mongowidmethod"] = "";
        executeobject["convertmethod"] = "";
        executeobject["dtotype"] = "";
        executeobject["executethis"] = querywid;
        // executeobject["executethis"] = mongoquery; /// *** Change by Saurabh 12/11 for checking #402 error
        proxyprinttodiv('Function aggressivedto()  executeobject III' , executeobject,20);
        // it does NOT seem to like this:
        //moreDTOParameters = executethis(executeobject,execute);

        //it does NOT seem to like:
        //var x = window['execute'];
        //moreDTOParameters = executethis(executeobject,x);

        // did NOT like this:
        //executeobject["executethis"] = "querywid";
        //moreDTOParameters = executethis(executeobject,execute);

        // did NOT like:
        //var x = window['execute'];
        //executeobject["executethis"] = "querywid";
        //moreDTOParameters = executethis(executeobject,x);

        //it seems to like the two below--then it did not
        var x = window['querywid'];
        moreDTOParameters = executethis(executeobject,x);

        //it seems to like the two below:
        //var x = window['querywidlocal'];
        //moreDTOParameters = executethis(executeobject,x);

        //it seems to like the two below:-- not any more
        //var x = window['mongoquery'];
        //moreDTOParameters = executethis(executeobject,x);

        proxyprinttodiv('Function aggressivedto()  moreDTOParameters' , moreDTOParameters, 20);
        //moreDTOParameters = querywidlocal(executeobject);
        //****** 100-31 also querywidlocal<>mongoquery

        //moreDTOParameters = simpleQuery(targetwid, "attributes", "all", "forward", "", "", "");

        for (eachresult in moreDTOParameters) {
            rightparameters={};
            for (key in moreDTOParameters[eachresult]) {
                rightparameters=moreDTOParameters[eachresult][key];
            }
            proxyprinttodiv('Function getWidMongo() left- ', key, 20);
            proxyprinttodiv('Function getWidMongo() right ', rightparameters, 20);
>>>>>>> 57dd7a409299853809e8afafc518b68591736044

                    for (eachresult in moreDTOParameters) {
                        listToDo.push(eachresult);
                    }

<<<<<<< HEAD
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
=======
            proxyprinttodiv('Function aggressivedto()  parameterObject V' , parameterObject, 20);
            proxyprinttodiv('Function aggressivedto()  key key' , key, 20);
            if (level > 0) {parameterObject = jsonConcat(parameterObject, aggressivedto(key, key, level))};
        }
>>>>>>> 57dd7a409299853809e8afafc518b68591736044

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
<<<<<<< HEAD
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
                                                }else{
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
=======
        if (
            ((resultObj['wid']!==undefined)) &&
                ((resultObj['wid']!==resultObj['metadata.method']) || (dtotype="defaultdto"))
            )
        {
            dtoobject=aggressivedto(resultObj['wid'],"",10);
            proxyprinttodiv('Function getcleanparameteres()  aggressivedto ' , dtoobject, 83);
            proxyprinttodiv('Function getcleanparameteres()  resultObj ' , resultObj,83);

            for (item in dtoobject) {
                preamble="";
                proposedLeft=item;
                proposedRight=dtoobject[item];

                if (proposedRight == 'inherit') {

                    dtoloc=proposedLeft.lastIndexOf(".");
                    if (dtoloc!=-1) {
                        preamble=proposedLeft.substring(0 ,dtoloc);
                        proposedLeft=proposedLeft.substring(dtoloc+1, proposedLeft.length);
                    }
                    executeobject={};
                    //executeobject["executethis"]=getwidmaster;
                    executeobject["command.convertmethod"]="nowid";
                    //executeobject["executethis"]=getwid;
                    executeobject["wid"]=proposedLeft;
                    //moreParameters=executethis(executeobject,execute);
                    moreParameters=executethis(executeobject,getwidmaster);
                    proxyprinttodiv('Function getcleanparameteres()  moreParameters----' , moreParameters,83);
                    for (eafield in moreParameters) {
                        if (preamble=="") {
                            resultObj[eafield]=moreParameters[eafield];
>>>>>>> 57dd7a409299853809e8afafc518b68591736044
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


<<<<<<< HEAD
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
=======
        var wid = parameters.wid;
//  var resultObj = {};
        proxyprinttodiv('Function getwidmasterLevel() incoming parameters, to getWidMongo' , parameters,10);
>>>>>>> 57dd7a409299853809e8afafc518b68591736044

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

<<<<<<< HEAD
                    ret = resultObj;
=======
        olddebug=Debug;
//  Debug=olddebug;
        proxyprinttodiv('Function getwidmasterLevel() ** before ' , resultObj,10);
        //if (Object.keys(resultObj).length !== 0) {
        if ((Object.keys(resultObj).length !== 0) && (resultObj['wid']!=resultObj['metadata.method'])) {
            resultObj=getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod);
            resultObj=resultObj.parms
        }
        //resultObj=resultObj.parms || {};   // ************
>>>>>>> 57dd7a409299853809e8afafc518b68591736044

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

<<<<<<< HEAD
        var isSynchronous = configuration.getwidmaster.synchronous;
=======
        if (convertMethod == "toobject") { resultObj = ConvertFromDOTdri(resultObj); }

//  Debug=olddebug;
>>>>>>> 57dd7a409299853809e8afafc518b68591736044

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

<<<<<<< HEAD
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
                                            getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin, function(err,res) {
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
=======
        var executeobject={};

        //executeobject["executethis"]=getwid;
        executeobject["wid"]=widInput;
        //Debug='true';
        proxyprinttodiv('Function getWidMongo()  executeobject' , executeobject);
        //var x = window['execute'];
        //var currentLevelObject=executethis(executeobject,execute);
        var currentLevelObject=executethis(executeobject,getwid);

        //var currentLevelObject = getfrommongo({'wid': widInput});
        // ++++ calling getwid is good calling it through execute not
        proxyprinttodiv('Function getWidMongo() currentLevelObject ++++++ top level object ', currentLevelObject,10);
        //Debug='false';
        // if dtotype not sent in, then figure it out -- dto type will be blank at all 1+ levels
        // first choide for dto is its method
        if ((currentLevelObject["metadata.method"]!==undefined) &&
            (currentLevelObject["metadata.method"]!=="")) {
            dtotype=currentLevelObject["metadata.method"];
            // Get the wid from mongo(local storage)
            executeobject={};
            //executeobject["executethis"]=getwid;
            executeobject["wid"]=dtotype;
            //dtoGlobalParameters=executethis(executeobject,execute);
            dtoGlobalParameters=executethis(executeobject,getwid);
            console.log(dtoGlobalParameters);
            proxyprinttodiv('Function getWidMongo() dtoGlobalParameters -- 111', dtoGlobalParameters,10);

            //dtoGlobalParameters = getFromMongo({'wid':dtotype});
        }
        proxyprinttodiv('Function getWidMongo() dtoGlobalParameters isEmpty', (isEmpty(dtoGlobalParameters)));
//  if (Object.keys(dtoGlobalParameters).length === 0) {
//  if (isEmpty(dtoGlobalParameters)) {
        //if (dtotype!="") {createid=dtotype}
        //dtotype='defaultdto'
        // executeobject={};
        // executeobject["mongowid"]=widInput;
        // executeobject["mongorelationshiptype"]="attributes";
        // executeobject["mongorelationshipmethod"]="all";
        // executeobject["mongorelationshipdirection"]="forward";
        // executeobject["mongowidmethod"]="";
        // executeobject["convertmethod"]="";
        // executeobject["dtotype"]="";
        // executeobject["executethis"]=querywid;
        // proxyprinttodiv('Function getWidMongo()  executeobject III' , executeobject);
        // //moreDTOParameters=querywidlocal(executeobject);    // ** mongoquery
        // proxyprinttodiv('Function getWidMongo()  executeobject III-result' , moreDTOParameters);
        // moreDTOParameters=executethis(executeobject,execute);
        // //*****10-31
        // //moreDTOParameters = simpleQuery(widInput, "attributes", "all", "forward", "", "", "");
        // for (eachresult in moreDTOParameters) {
        //  for (key in moreDTOParameters[eachresult]) {
        //      proxyprinttodiv('Function getWidMongo()eachresult[0] ',key);
        //      //dtoGlobalParameters[key] = 'onetomany'
        //      moreParameters[key] = 'onetomany'
        //      }
        //  }
        // for (eachresult in currentLevelObject) {
        //  //dtoGlobalParameters[eachresult] = 'string'
        //  moreParameters[eachresult] = 'string'
        //  }

        proxyprinttodiv('Function getWidMongo() widInput ', widInput,10);
        moreParameters=aggressivedto(widInput,"",1);
        proxyprinttodiv('Function getWidMongo() moreParameters ', moreParameters,10);
        //if ((isEmpty(dtoGlobalParameters)) || (dtoin=="defaultdto")) {
        if ((dtoGlobalParameters['metadata.method']=="") || (dtoin=="defaultdto")) {
            dtoGlobalParameters=moreParameters
        }

        //}

        proxyprinttodiv('Function getWidMongo() dtoGlobalParameters IV ', dtoGlobalParameters);

        currentLevelObjectList = objectToList(currentLevelObject);
        dtoGlobalParametersList = objectToList(dtoGlobalParameters);


        proxyprinttodiv('Function getWidMongo() dtoGlobalParameters near start', dtoGlobalParameters);
        proxyprinttodiv('Function getWidMongo() currentLevelObject II ', currentLevelObject,10);

        currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
        currentLevelObjectList = currentLevelObjectList.match;
        currentLevelObject = listToObject(currentLevelObjectList);

        proxyprinttodiv('Function getWidMongo() currentLevelObject ----about to start relationships----', currentLevelObject,10);


        outgoingParameters=currentLevelObject;

        dtoGlobalParameters=moreParameters; // line added 11-9 -- step through an agressive dto

        for (var item in dtoGlobalParameters) {
            proxyprinttodiv('Function getWidMongo() step through dto ', (item + ' ' + dtoGlobalParameters[item]),10);
            nextLevelParameters = {};
            attr = dtoGlobalParameters[item];
            if ((attr == "onetoone")  || (attr == "onetomany")) { // 10-24 || (attr == "inherit"))  {
                if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property
                    nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin); // removed inherit dtoGlobalParameters
                } // 10-5 took away dtotype --
                if (attr == "onetomany") { // if dto states 'onetomany' then search for related records that match property
                    nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin); //removed dtoGlobalParameters
                } // 11-9 readded inherit from cleanparms here:
                // if ((attr == "inherit") && (convertMethod != 'dto')) {
                //              executeobject={};
                //              executeobject["executethis"]="getwidmaster"; // changed from getwidmaster
                //              executeobject["wid"]=item;
                //              executeobject["command.convertmethod"]="nowid";
                //              var x = window['execute'];
                //              nextLevelParameters=executethis(executeobject,x);
                //              proxyprinttodiv('Function getWidMongo nextLevelParameters - inherit', nextLevelParameters,1);
                //              }
                //  nextLevelParameters = getwidmaster({'wid':item, 'command.convertmethod':'nowid'});
                //  };
                // 11-15 line below commented
                //if (nextLevelParameters=="") {AddMongoRelationship(widInput,item,"attributes");} // if DTO existed, but no relationship at place hoder
                proxyprinttodiv('Function getWidMongo() came back from getAndFormatNextLevel, nextLevelParameters= ', nextLevelParameters);
                proxyprinttodiv('Function getWidMongo() step through dto ', (item+' '+dtoGlobalParameters[item]));
                outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
                proxyprinttodiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
            } // if
            //proxyprinttodiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
        } // for
        proxyprinttodiv('Function getWidMongo() end of relationsips---------------- : ', outgoingParameters);
        Debug=olddebug;
        return outgoingParameters
>>>>>>> 57dd7a409299853809e8afafc518b68591736044
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
<<<<<<< HEAD
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
=======
        var iteration = 0

        proxyprinttodiv('Function getAndFormatNextLevel() in : relatedParameters  after simpleQuery++++ starting related ++++', relatedParameters,11);
        // proxyprinttodiv('-------Function getAndFormatNextLevel() in : relatedParameters.length', relatedParameters.length);

        if (Object.keys(relatedParameters).length == 0) {return nextLevelParametersObject};
        //if (relatedParameters == "") {
        //  return;
        //}

        //for (var rowresult in relatedParameters) { // for this iteration: wid1: {a:b, c:d}
//  for(iteration = 0 ; (iteration< relatedParameters.length ) ; iteration++ ) {
        for(iteration = 0 ; (iteration< countKeys(relatedParameters)) ; iteration++ ) {
            rowresult=relatedParameters[iteration];

            proxyprinttodiv('Function getAndFormatNextLevel() in : iteration in going through results from simpleQuery', iteration,11);
            //proxyprinttodiv('Function getAndFormatNextLevel() in : current row', rowresult);

            //var rowObject = relatedParameters[rowresult];
            //for (item in rowObject) {
            //  var proposedLeft = item;
            //  var proposedRight = rowObject[item];
            //}
            for (key in rowresult) {
                proposedLeft = key;
                proposedRight = rowresult[key];
            }

            //iteration++; // proposedRight = {a:b, c:d}



            // LM: Found commented. Should delete?
            // ************
            //if (dtotype == 'onetomany') {
            //  proposedLeft == proposedLeft + "<" + iteration + ">"; // if dtotype=x then proposedLeft x<1>
            //}

            //if (convertmethod = "" && relatedParameters.length == 1) {
            //  proposedLeft = dtotype; // proposedLeft=x if only one related and convertmethod="" -- change it to just widdto
            //}
            // ************
            //var proposedObject ={};

            if (convertmethod == "wid") {

                //proxyprinttodiv('Function getAndFormatNextLevel() convertmethod', convertmethod);
                //proposedRight = item; // proposedRight = wid1
                //proxyprinttodiv('Function getAndFormatNextLevel() item', proposedRight);
                //proposedObject[mongowidmethod] = proposedLeft;
                //nextLevelParameters.push({"key":proposedLeft,"value":proposedRight}); // NextLevelParameters =  x<1>: wid1

                nextLevelParameters.push({"key":mongowidmethod,"value":proposedLeft});

                //      proxyprinttodiv('----------Function getAndFormatNextLevel() proposed wid object', proposedObject);

            }
            //alert(convertmethod);
            if (convertmethod == "json") {

                //proposedObject[proposedLeft] = proposedRight;
                //nextLevelParameters.push({"key":proposedLeft,"value":proposedRight}); // NextLevelParameters =  x<1>: {a:b, c:d}

                nextLevelParameters.push({"key":mongowidmethod,"value":JSON.stringify(proposedRight)});

                //      proxyprinttodiv('----------Function getAndFormatNextLevel() proposed json object', proposedObject);

            }

            if ((convertmethod == "") || (convertmethod == "dto") || (convertmethod == "toobject") ||
                (convertmethod == "num") || (convertmethod == "dtonum")) {
                proxyprinttodiv('Function getAndFormatNextLevel() in convertmethod=blank, about to get drilldown: ', proposedLeft, 11);
                drillDownParameters = getWidMongo(proposedLeft, convertmethod, accesstoken, dtoin); //dtoGlobalParameters, mongowidmethod);
                proxyprinttodiv('Function getAndFormatNextLevel() after drillDown object: ', drillDownParameters, 11);
                //proxyprinttodiv('----------Function getAndFormatNextLevel() mongowidmethod: ', mongowidmethod);
                proxyprinttodiv('Function getAndFormatNextLevel() arriving widInput II', widInput, 11);
                proxyprinttodiv('-------Function getAndFormatNextLevel() in : mongowidmethod II', mongowidmethod, 11);
                proxyprinttodiv('-------Function getAndFormatNextLevel() in : convertmethod II', convertmethod, 11);
                proxyprinttodiv('-------Function getAndFormatNextLevel() in : dtoin II', dtoin, 11);
                proxyprinttodiv('-------Function getAndFormatNextLevel() in : mongorelationshipmethod II', mongorelationshipmethod, 11);
                proxyprinttodiv('Function getAndFormatNextLevel() in : proposedLeft II', proposedLeft, 11);
                proxyprinttodiv('Function getAndFormatNextLevel() in : proposedRight II', proposedRight, 11);

                for(item in drillDownParameters) {
                    // LM: original line
                    if ((convertmethod == "dto") && ((item=="wid") || (item=="metadata.method"))) {
                    } // left empty by design
                    // ** do we need to replicate at top level?
                    else {

                        proposedLeft = mongowidmethod + "." + String(iteration) + "." + item;  // removed +1
//                  if ((convertmethod == "dto") && (relatedParameters.length == 1)) { 

                        // added 11-18
                        proxyprinttodiv('Function getAndFormatNextLevel() mongorelationshipmethod', mongorelationshipmethod,11);
                        if (((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) ||
                            (mongorelationshipmethod=="last")) {
                            //if ((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) {
                            proposedLeft = mongowidmethod+"."+item;
>>>>>>> 57dd7a409299853809e8afafc518b68591736044
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
