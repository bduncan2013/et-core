(function(window) {
    

    exports.updatewid = updatewid = function updatewid(inputWidgetObject, callback) {
        delete inputWidgetObject['executethis'];
        proxyprinttodiv('Function updatewid in : inputWidgetObject', inputWidgetObject, 10);
        // for conversion:
        var saveobject = {};

        if (inputWidgetObject['wid']) {
            saveobject['wid'] = inputWidgetObject['wid'];
        } else {
            saveobject['wid'] = "";
        }

        delete inputWidgetObject['wid'];

        if (inputWidgetObject['metadata.method']) {
            saveobject['metadata.method'] = inputWidgetObject['metadata.method'];
        } else {
            saveobject['metadata.method'] = "";
        }

        delete inputWidgetObject['metadata.method'];

        if (inputWidgetObject) {
            saveobject['data'] = inputWidgetObject;
        } else {
            saveobject['data'] = "";
        }

        addtomongo(saveobject, function(results) {
            proxyprinttodiv('Function updatewid in : x', results, 10);
            callback(results);
        });
    };

    // // Prepares an object to be recorded in local storage and puts it there
    // // Prepares an object to be recorded in local storage and puts it there
    function MongoAddEditPrepare(Indto, InList, widid, widdto, callback) {

        var InListObj = {};
        var rawobject = {};
        var rawlist = [];
        var item;
        var InList;
        var ret = undefined;
        var executeobject;
        var addresult;
        var listtodo;
        var potentialwid;



        function step1(cb) {
            proxyprinttodiv('Function MongoAddEditPrepare, Indto : ', Indto, 90);
            proxyprinttodiv('Function MongoAddEditPrepare, InList : ', InList, 90);
            proxyprinttodiv('Function MongoAddEditPrepare, widid : ', widid, 90);
            proxyprinttodiv('Function MongoAddEditPrepare, widdto : ', widdto, 90);

            InListObj = listToObject(InList);
            if ((InListObj["wid"] === undefined) || (InListObj["wid"] == "")) {
                if ((widid !== undefined) || (widid != "")) {
                    InListObj["wid"] = widid
                };
            }
            cb("");
        }

        function step2n1(cb1) {
            //Debug='true';
            executeobject = {};
            executeobject["executethis"] = "getwid";
            executeobject["wid"] = InListObj["wid"];
            etexecute(executeobject, function (err, res) {
                rawobject = res;
                cb1("");
            });
        }

        function step2n2(cb1) {
            if (((rawobject["metadata.method"] !== undefined) || (rawobject["metadata.method"] != "")) && // 70-76 new step needed
                ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == ""))) {
                InListObj["metadata.method"] = rawobject["metadata.method"];
            }
            InListObj = jsonConcat(InListObj, rawobject); // this will be the new contents concat with old stuff in wid

            rawobject = {}; // if the dto had inherit then we only want to save what in herit does not have
            cb1("");
        }


        function step2n3(cb2) {
            listtodo = [];
            for (item in Indto) { // load all data related to inherit
                if (item.value == 'inherit') {
                    listtodo.push(item.key);
                }
            }

            async.mapSeries(listtodo, function (todo, cb3) {

                rawobject = {};
                executeobject = {};
                executeobject["executethis"] = "getwid"; // probably should be getwidmaster -- changed from only getwid
                executeobject["wid"] = todo;
                etexecute(executeobject, function (err, res) {
                    rawobject = jsonConcat(rawobject, res);
                    cb3("");
                });
            }, function(err, res) {
                if (err) {
                    throw err;
                }
                cb2("");
            });
        }


        function step2n4(cb2) {
            for (item in rawobject) { // for all data in inherit, delete it from being added //102-106, new step needed
                if (InListObj[item] == rawobject[item]) {
                    delete InListObj[item];
                }
            }
            cb2("");
        }


        function step3(cb) {
            if ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == "")) {
                if ((widdto !== undefined) || (widdto != "")) {
                    InListObj["metadata.method"] = widdto;
                }
            }
            if ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == "")) {
                InListObj["metadata.method"] = 'defaultdto';
            }

            InListObj["wid"] = InListObj["wid"].toLowerCase();

            updatewid(InListObj, function (res) {
                addresult = res;
                proxyprinttodiv('Function MongoAddEditPrepare, ******************* InListObj : ', InListObj, 90);
                cb("");
            });
        }

        async.series({
                one: step1,
                check1: function (cbcheck) {
                    //debugfn("MongoAddEditPrepare after step1", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("");
                },

                two: function (cb) {
                    if ((InListObj["wid"] === undefined) || (InListObj["wid"] == "")) {
                        potentialwid = potentialwid + 1;
                        InListObj["wid"] = potentialwid.toString();
                        cb("");
                    } else {
                        async.series({
                                one: step2n1,
                                check1: function(cbcheck) {
                                    //debugfn("MongoAddEditPrepare after step2n1", "desc", true, "from parent1", 99, debugvars());
                                    cbcheck("")
                                }, //LM
                                two: step2n2,
                                check2: function(cbcheck) {
                                    //debugfn("MongoAddEditPrepare after step2n2", "desc", true, "from parent1", 99, debugvars());
                                    cbcheck("")
                                }, //LM        
                                three: step2n3,
                                check3: function(cbcheck) {
                                    //debugfn("MongoAddEditPrepare after step2n1", "desc", true, "from parent1", 99, debugvars());
                                    cbcheck("")
                                }, //LM
                                four: step2n4,
                                check4: function(cbcheck) {
                                    //debugfn("MongoAddEditPrepare after step2n2", "desc", true, "from parent1", 99, debugvars());
                                    cbcheck("")
                                } //LM        
                            },
                            function(err, results) {
                                console.log(JSON.stringify('done all in MongoAddEditPrepare step2, Result is  ' + JSON.stringify(results)));
                                cb("");
                            });
                    }
                },
                three: step3,
                check3: function (cbcheck) {
                    //debugfn("MongoAddEditPrepare after step3", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                }
            },
            function (err, results) {
                ret = InListObj;


                if (callback instanceof Function) {
                    callback(ret);
                }
                //callback(err, InListObj);
            });

        while (ret === undefined) {}

        return ret;
    }
    function AddMongoRelationship(ParentWid, ChildWid, attr, callback) {
        var AddedObject;
        var widset;
        var relationshipdto;
        var executeobject = {};
        var InList = [];
        var widset;
        var ret = undefined;

        function debugvars() {
            var debugvars = {
                "AddedObject": AddedObject,
                "widset": widset,
                "relationshipdto": relationshipdto,
                "executeobject": executeobject,
                "InList": InList,
                "widset": widset
            }
            return debugvars;
        }

        function step1(cb) {
            relationshipdto = {
                'primarywid': 'string',
                'secondarywid': 'string',
                'relationshiptype': 'string',
                'metadata.method': 'string'
            };
            // note above should be list but does not matter
            InList.push({
                "key": "primarywid",
                "value": ParentWid.toLowerCase()
            });
            InList.push({
                "key": "secondarywid",
                "value": ChildWid.toLowerCase()
            });
            InList.push({
                "key": "relationshiptype",
                "value": attr.toLowerCase()
            });
            InList.push({
                "key": "metadata.method",
                "value": "relationshipdto"
            });
            cb("");
        }

        function step2(cb) {
            proxyprinttodiv('Function AddMongoRelationship - executeobject', executeobject, 75);
            executeobject["mongorawquery"] = {
                "$and": {
                    "data.primarywid": ParentWid,
                    "data.secondarywid": ChildWid
                }
            };
            executeobject["executethis"] = querywid;
            etexecute(executeobject, function(err, res) {
                widset = res;
                cb("");
            });
        }

        function step3(cb) {
            proxyprinttodiv('Function AddMongoRelationship, ******************* 1 : ', widset, 90);
            var widobject = {};
            if (widset.length > 0) {
                widobject = widset[0]
            } else {
                widobject = {}
            };
            InList.push(widobject);

            widset = InList;
            proxyprinttodiv('Function AddMongoRelationship, ******************* 2 : ', widset, 90);
            cb("");
        }

        function step4(cb) {
            // AddedObject = MongoAddEditPrepare([], widset, "", attr);
            // cb("");
            MongoAddEditPrepare([], widset, "", attr, function(err, res) {
                AddedObject = res;
                cb("");
            });
        }

        async.series({
                one: step1,
                check1: function(cbcheck) {
                    debugfn("AddMongoRelationship after step1", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                },
                two: step2,
                check2: function(cbcheck) {
                    debugfn("AddMongoRelationship after step2", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                },
                three: step3,
                check3: function(cbcheck) {
                    debugfn("AddMongoRelationship after step3", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                },
                four: step4,
                check4: function(cbcheck) {
                    debugfn("AddMongoRelationship after step4", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                }

            },
            function(err, results) {
                console.log(JSON.stringify('done all in AddMongoRelationship, Result is  ' + JSON.stringify(results)));
                ret = AddedObject;

                if (callback instanceof Function) {
                    callback(ret);
                }
                //callback(err, InListObj);
            });

        while (ret === undefined) {}
        // if (callback instanceof Function) {
        //     callback(result);
        // } else {
        //     return result;
        // }

        return ret;

    }

    function addcleanparameters(resultObj, dtotype, accesstoken, cleanmethod, convertmethod, callback) {
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

        function debugvars() {
            var debugvars = {
                "outputparameters": outputparameters,
                "dtoloc": dtoloc,
                "inputParametersObject": inputParametersObject,
                "childdto": childdto,
                "preAmble": preAmble,
                "item": item,
                "moreParameters": moreParameters,
                "executeobject": executeobject,
                "eafield": eafield,
                "otherdtoobject": otherdtoobject,
                "resultlist": resultlist,
                "dtoobject": dtoobject,
                "cleanmethod": cleanmethod,
                "proposedLeft": proposedLeft,
                "proposedRight": proposedRight
            }
            return debugvars;
        }

        function step1(cb) {

            proxyprinttodiv('Function addcleanparameteres() resultObj I ', resultObj, 80);
            proxyprinttodiv('Function addcleanparameteres()  dtotype I', dtotype, 80);
            proxyprinttodiv('Function addcleanparameteres()  accesstoken I', accesstoken);
            proxyprinttodiv('Function addcleanparameteres()  convertmethod I', convertmethod, 80);

            // first try to get dtoobject from method
            inputParametersObject = resultObj;

            if ((inputParametersObject['metadata.method'])) { // && (dtotype=="")) {

                function step1n1(cb1) {
                    childdto = inputParametersObject['metadata.method'];
                    // dtoobject=getwidmaster({'wid':metadata,
                    //                      'command.convertmethod':'dto',
                    //                      'command.dtotype':metadata});
                    executeobject = {};
                    //executeobject["executethis"]=getwidmaster;
                    executeobject["wid"] = childdto;
                    executeobject["command.convertmethod"] = "dto";
                    executeobject["command.dtotype"] = childdto;
                    //dtoobject=executethis(executeobject,execute);
                    getwidmaster = window["getwidmaster"];
                    cb1("");
                }

                function step1n2(cb1) {
                    executeobject['executethis'] = 'getwidmaster';
                    etexecute(executeobject, function(err, res) {
                        dtoobject = res;
                        proxyprinttodiv('Function addcleanparameteres()  result dtoobject ', dtoobject, 80);
                        //dtoobject=executethis({'executethis':'getwidmaster', 'wid':metadata,
                        //                      'command.convertmethod':'dto',
                        //                      'command.dtotype':metadata}); // not sure if this ever worked
                        cb1("");
                    });
                }

                async.series({
                        one: step1n1,
                        check1: function(cbcheck) {
                            debugfn("addcleanparameters after step1n1", "desc", true, "from parent1", 99, debugvars());
                            cbcheck("")
                        }, //LM
                        two: step1n2,
                        check2: function(cbcheck) {
                            debugfn("addcleanparameters after step1n2", "desc", true, "from parent1", 99, debugvars());
                            cbcheck("")
                        }, //LM

                    },
                    function(err, results) {
                        console.log(JSON.stringify('done all in getcleanparameters step1, Result is  ' + JSON.stringify(results)));
                        // cb1("");
                        cb("");
                        // return; 
                    });
            }

            // next get dtoobject from dtotype -- aggressive
            childdto = dtotype;
            if (dtotype !== "") {
                function step1n3(cb1) {
                    proxyprinttodiv('Function addcleanparameteres()  dtotype check ', dtotype);
                    aggressivedto = window['aggressivedto'];
                    otherdtoobject = aggressivedto(dtotype, "", 10);
                    proxyprinttodiv('Function addcleanparameteres()  otherdtoobject ', otherdtoobject);
                    proxyprinttodiv('Function addcleanparameteres()  countKeys(otherdtoobject) ', countKeys(otherdtoobject));
                    proxyprinttodiv('Function addcleanparameteres()  countKeys(dtoobject) ', countKeys(dtoobject));
                    cb1("");
                }

                function step1n4(cb1) {
                    // if dtotype object is bigger than method dtoobject then swtich who is childdto
                    if (countKeys(otherdtoobject) > countKeys(dtoobject)) {
                        dtoobject = otherdtoobject;
                        childdto = inputParametersObject['metadata.method'];
                    }
                    cb1("");
                }

                function step1n5(cb1) {
                    // if dtotype object is bigger than method dtoobject then swtich who is childdto
                    if (countKeys(otherdtoobject) > countKeys(dtoobject)) {
                        dtoobject = otherdtoobject;
                        childdto = inputParametersObject['metadata.method'];
                    }
                    cb1("");
                }

                async.series({
                        one: step1n3,
                        check1: function(cbcheck) {
                            debugfn("addcleanparameters after step1n3", "desc", true, "from parent1", 99, debugvars());
                            cbcheck("")
                        }, //LM
                        two: step1n4,
                        check2: function(cbcheck) {
                            debugfn("addcleanparameters after step1n4", "desc", true, "from parent1", 99, debugvars());
                            cbcheck("")
                        }, //LM
                        three: step1n5,
                        check3: function(cbcheck) {
                            debugfn("addcleanparameters after step1", "step1n5", true, "from parent1", 99, debugvars());
                            cbcheck("")
                        } //LM
                    },

                    function(err, results) {
                        console.log(JSON.stringify('done all in getcleanparameters step1, Result is  ' + JSON.stringify(results)));
                        // cb1("");
                        cb("");
                        // return; 
                    });
            }

            proxyprinttodiv('Function addcleanparameteres()  childdto ', childdto, 80);
            proxyprinttodiv('Function addcleanparameteres()  dtotype : II ', dtotype, 80);

            // if dtotype was blank then just adopt it from method
            if (dtotype == "") {
                dtotype = resultObj["metadata.method"]
            };

            // if dtotype <> method then we need to add to parameters
            if (resultObj["metadata.method"] != dtotype) {
                proxyprinttodiv('Function addcleanparameteres()  resultObj', resultObj, 80);
                proxyprinttodiv('Function addcleanparameteres()  dtoobject inside ', dtoobject, 80);

                preamble = "";

                for (item in dtoobject) {

                    dtoloc = item.lastIndexOf(".");
                    if (dtoloc != -1) {
                        preamble = item.substring(0, dtoloc);
                        proposedLeft = item.substring(dtoloc + 1, item.length);
                    } else {
                        proposedLeft = item;
                    }

                    if ((proposedLeft == dtotype) && // +++++
                        ((dtoobject[item] == 'onetomany') ||
                            (dtoobject[item] == 'onetoone'))) {
                        preAmble = item;
                        break;
                    }
                }
                proxyprinttodiv('Function addcleanparameteres()  preAmble ', preAmble, 80);

                for (item in resultObj) { // now step through each record that could be changed
                    proposedLeft = item;
                    proposedRight = resultObj[item];
                    // taken out 11-5
                    //if ((item!='wid') && (item!='metadata.method')) {
                    proxyprinttodiv('Function addcleanparameteres()  item', item, 81);
                    proposedLeft = ""; // work on left first...check if add or remvove
                    if ((cleanmethod == "add") && (preAmble != "")) {
                        if (((item != 'wid') && (item != 'metadata.method')) || (childdto != dtotype)) {
                            proposedLeft = preAmble + "." + item
                        } else {
                            proposedLeft = item
                        }
                    }


                    proxyprinttodiv('Function addcleanparameteres()  proposedLeft', proposedLeft, 81);
                    proxyprinttodiv('Function addcleanparameteres()  proposedRight', proposedRight, 81);
                    if (proposedLeft != "") {
                        outputparameters[proposedLeft] = proposedRight
                    }
                    proxyprinttodiv('Function addcleanparameteres()  outputparameters', outputparameters, 81);
                }
                // 11-5 **
                //
                if ((preAmble != "") && (childdto != dtotype)) {
                    outputparameters["metadata.method"] = dtotype;
                    outputparameters["wid"] = "";
                }
            } else {
                outputparameters = resultObj;
            }

            proxyprinttodiv('Function addcleanparameteres() resultObj end end end', resultObj, 80);
            proxyprinttodiv('Function addcleanparameteres()  dtotype end end end', dtotype, 80);
            proxyprinttodiv('Function addcleanparameteres()  convertmethod end end end', convertmethod, 80);
            proxyprinttodiv('Function addcleanparameteres()  outputparameters end end end ', outputparameters, 80);
            proxyprinttodiv('Function addcleanparameteres()  dtoobject end end end ', dtoobject, 80);

            cb("");
        }

        async.series({
                one: step1,
                // check1: function (cbcheck){debugfn("getcleanparameters after step1", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                check1: function(cbcheck) {
                    debugfn("addcleanparameters after step1", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                } //LM

            },
            function(err, results) {
                console.log(JSON.stringify('done all in getcleanparameters, Result is  ' + JSON.stringify(results)));
                ret = {
                    parms: outputparameters,
                    dto: dtoobject
                };


                if (callback instanceof Function) {
                    callback(ret);
                }
                //callback(err, InListObj);
            });

        while (ret === undefined) {}
        // if (callback instanceof Function) {
        //     callback(result);
        // } else {
        //     return result;
        // }

        return ret;
    }

    exports.addwidmaster = addwidmaster = function addwidmaster(inputObject, callback) {
        var OutParameters = ConvertToDOTdri(inputObject);
        var Wid;
        var ret = undefined;
        //OutParameters = tolowerparameters(OutParameters, OutParameters['command.convertmethod']);
        AddWidParameters(OutParameters, function(err, res) {
            Wid = res;
        });

        function debugvars() {
            var debugvars = {
                "Wid": Wid,
                "OutParameters": OutParameters
            }
            return debugvars;
        }

        debugfn("addwidmaster ", "desc", true, "from parent1", 99, debugvars());
        callback({
            Wid: Wid
        });

    };



    // Sets up call to addwidmaster (to add a parameter to the DTO ?)
    function AddWidParameters(parameterObject, callback) {

        // obj sets up the match and nomatch arrays
        var obj = MatchPrefix(parameterObject, "command");
        // inputParametersList is the part of the DOT that does not match the DTO
        var inputParametersList = obj.nomatch;
        // commandList is the part of the DOT that matches the DTO
        var commandList = obj.match;
        // commandobject makes an object out of the commandlist
        var commandobject = listToObject(commandList);
        var inputParametersObject = listToObject(inputParametersList);

        proxyprinttodiv('Function AddWidParameters()  inputParametersObject : ', inputParametersObject);

        var parameterObject = {};
        var dtoobject = {};
        var metadata = "";
        var moreParameters;
        var Wid;
        var ret = undefined;
        var dtoList;
        var inputList;
        var moreParameters;

        function debugvars() {
            var debugvars = {
                "obj": obj,
                "inputParametersList": inputParametersList,
                "commandList": commandList,
                "commandobject": commandobject,
                "inputParametersObject": inputParametersObject,
                "parameterObject": parameterObject,
                "dtoobject": dtoobject,
                "metadata": metadata,
                "moreParameters": moreParameters,
                "Wid": Wid,
                "checkflag": checkflag,
                "accesstoken": accesstoken,
                "inherit": inherit,
                "dtotype": dtotype,
                "convertmethod": convertmethod
            }
            return debugvars;
        }

        commandobject = tolowerparameters(commandobject, {
            'command.dtotype': 'add',
            'command.convertmethod': 'add',
            'command.checkflag': 'add',
            'command.inherit': 'add',
            'command.accesstoken': 'add'
        });
        inputParametersObject = tolowerparameters(inputParametersObject, {
            'metadata.method': 'add',
            'metadata.style': 'true',
            'wid': 'add',
            'primarywid': 'true',
            'secondarywid': 'true',
            'relationshiptype': 'true'
        });
        delete inputParametersObject['executethis']; //** added 11/2
        if (inputParametersObject["wid"] === undefined) {
            inputParametersObject["wid"] = "";
        }

        olddebug = Debug;
        //      Debug=olddebug;

        var checkflag = commandobject["command.checkflag"];
        var accesstoken = commandobject["command.accesstoken"];
        var inherit = commandobject["command.inherit"];
        var dtotype = commandobject["command.dtotype"];
        var convertmethod = commandobject["command.convertmethod"];

        function step1(cb) {

            proxyprinttodiv('Function AddWidParameters()  checkflag ', checkflag);
            proxyprinttodiv('Function AddWidParameters()  accesstoken : I ', accesstoken);
            proxyprinttodiv('Function AddWidParameters() inherit : I ', inherit);

            proxyprinttodiv('Function AddWidParameters()  dtotype : dtotype ', dtotype);
            proxyprinttodiv('Function addWidParameters ** before ', inputParametersObject, 15);
            proxyprinttodiv('Function AddWidParameters() convertmethod ', convertmethod, 15);
            proxyprinttodiv('Function AddWidParameters()  dtotype : dtotype ', dtotype, 15);

            parameterObject = addcleanparameters(inputParametersObject, dtotype, accesstoken, "add", convertmethod);
            inputParametersObject = parameterObject.parms; // ************ prob dont need this
            dtoobject = parameterObject.dto; // ************
            proxyprinttodiv('Function AddWidParameters()  inputParametersObject ', inputParametersObject, 15);
            proxyprinttodiv('Function AddWidParameters()  dtoobject ', dtoobject, 15);

            // not sure if this is important
            if ((inputParametersObject['metadata.method'] !== "") && (dtotype == "")) {
                metadata = inputParametersObject['metadata.method'];
            }
            proxyprinttodiv('Function addWidParameters ** after ', inputParametersObject);

            proxyprinttodiv('Function AddWidParameters() dtoobject return: ', dtoobject);
            //proxyprinttodiv('Function AddWidParameters() metadata : ',  metadata);


            cb("");
        }

        function step2(cb) {
            executeobject = {};
            executeobject["executethis"] = 'getwid';
            executeobject["wid"] = 'inherit';

            etexecute(executeobject, function(err, res) {
                moreParameters = res;
                cb("");
            });
        }

        function step3(cb) {
            //var moreParameters = getfrommongo({'wid':inherit});
            if (moreParameters) {
                inputParametersObject = jsonConcat(inputParametersObject, moreParameters); // if duplicates then currentLevelObject{} wins
            }


            inputList = objectToList(inputParametersObject);
            dtoList = objectToList(dtoobject);

            //proxyprinttodiv('Function AddWidParameters()  inputList : ',  inputList);
            //proxyprinttodiv('Function AddWidParameters()  metadata : ',  metadata);
            olddebug = Debug;
            //      Debug=olddebug;
            proxyprinttodiv('Function AddWidParameters()  all parms to addmaster : ', {
                "dtolist": dtoList,
                "inputlist": inputList,
                "metadata": metadata
            });
            //  Debug=olddebug;
            if (inputParametersObject["wid"] === undefined) {
                inputParametersObject["wid"] = "";
            }

            Wid = AddMaster(dtoList, inputList, inputParametersObject["wid"], metadata);;
            cb("");
        }


        async.series({
                one: step1,
                check1: function(cbcheck) {
                    debugfn("AddWidParameters after step1", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                },
                two: step2,
                check2: function(cbcheck) {
                    debugfn("AddWidParameters after step2", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                },
                three: step3,
                check3: function(cbcheck) {
                    debugfn("AddWidParameters after step3", "desc", true, "from parent1", 99, debugvars());
                    cbcheck("")
                }
            },
            function(err, results) {
                console.log(JSON.stringify('done all in AddWidParameters, Result is  ' + JSON.stringify(Wid)));
                ret = Wid;


                if (callback instanceof Function) {
                    callback(ret);
                }
                //callback(err, InListObj);
            });

        while (ret === undefined) {}
        // if (callback instanceof Function) {
        //     callback(result);
        // } else {
        //     return result;
        // }

        return ret;
    }



    function AddMaster(dtoList, parameterList, widName, dtotype, callback) {
        var ChildrenListobj = {};
        var dtoobject;
        var ParentdtoList;
        var ParentList;
        var ParentObject; // add survivors -- that is the parent
        var ParentWid;
        var attrtype = ""; // onetoone we will search for only one realted (last), onetomany (all)
        var editflag = ""; // do we need to read (find out widnames) before add
        var attr = "";
        var ParametersToAdd = [];
        var SplitParameters = [];
        var ChildrendtoList = [];
        var ChildWid = '';
        var widtoadd = '';
        var widlist = [];
        var parameterindexobj = {};
        var currentparameter = '';
        var splitkey = ''
        var currentNumber = 0;
        var sortable = [];
        var currentitem = '';
        var childrentype = '';
        var RelatedListParameters;
        var RelatedListdto;
        var executeobject;
        var widlist;

        async.series([
        function step1(cb) {
            proxyprinttodiv('Function AddMaster : inbound parms all ', {
                "dtolist": dtoList,
                "parameterList": parameterList,
                "widName": widName,
                "dtotype": dtotype
            });
             // go through list of incoming parameters to generate a list of childrent dtos
            dtoobject = listToObject(dtoList); // generate a copy of dtolist that is an object
            for (key in dtoobject) { // go through each parameter
                if ((dtoobject[key] == 'onetomany') || (dtoobject[key] == 'onetoone')) {
                    // see if dto list tells us is a child
                    ChildrenListobj[key] = dtoobject[key]; // add it to children object list
                }
            }

            ParentdtoList = dtoList; // now go through childrent list and delete from copy of incoming parameters
            ParentList = parameterList; // anything related to these children

            for (currentparameter in ChildrenListobj) {
                ParentList = MatchDelete(ParentList, currentparameter);
                ParentdtoList = MatchDelete(ParentdtoList, currentparameter);
            }

            ParentObject = {}; // add survivors -- that is the parent
            ParentWid = '';

            cb(null, 'one');
        },
        function step2(cb){
            // ParentObject = MongoAddEditPrepare(ParentdtoList, ParentList, widName, dtotype);
            MongoAddEditPrepare(ParentdtoList, ParentList, widName, dtotype, function (err, res) {
                ParentObject = res;
                ParentWid = ParentObject["wid"];
                cb('two');
            });
        },
        function step3(cb){
            RelatedListParameters = SplitObjectList(parameterList, ParentList); // figure out what the left over parameters are
            RelatedListParameters = RelatedListParameters.nomatch;
            RelatedListdto = SplitObjectList(dtoList, ParentdtoList);
            RelatedListdto = RelatedListdto.nomatch;
            cb(null, 'three');
        },
        function step4(cb){ // create work
            var listtodo = [];
            for (childrentype in ChildrenListobj){
                listtodo.push(childrentype);
            }
            async.mapSeries(listtodo, function (childrentype, cbMap) {
                async.series([
                    function step4n1(cb){
                        editflag = 'false';
                        attr = ChildrenListobj[childrentype]; // onetoone or onetomany?  -left side of ChildrenListobj is the dto name
                        parameterindexobj = {}; // create a list of (children) parameters that start with number
                        
                        for (currentcount in RelatedListParameters) {
                            //proxyprinttodiv('Function AddMaster : currentcount', currentcount);
                            currentparameter = RelatedListParameters[currentcount].key;
                            //proxyprinttodiv('Function AddMaster : currentparameter', currentparameter);
                            splitkey = currentparameter.split(".");
                            //proxyprinttodiv('Function AddMaster : splitkey', splitkey);
                            if (splitkey[0] == childrentype) {
                                currentNumber = 0;
                                if (splitkey[1] !== undefined) {
                                    currentNumber = Number(splitkey[1])
                                };
                                //proxyprinttodiv('Function AddMaster : currentNumber', currentNumber);
                                if (currentNumber >= 0) {
                                    //proxyprinttodiv('Function AddMaster : currentNumber II ', currentNumber);
                                    parameterindexobj[splitkey[1]] = splitkey[0];
                                }
                            }
                            //proxyprinttodiv('Function AddMaster : parameterindexobj, sorted, which children have dots ', parameterindexobj);
                            //proxyprinttodiv('Function AddMaster : parameterindexobj I  ', parameterindexobj);
                        }

                        sortable = [];
                        for (currentitem in parameterindexobj) {
                            sortable.push([currentitem, parameterindexobj[currentitem]]);
                        }
                        proxyprinttodiv('Function AddMaster : parameterindexobj II  ', sortable);
                        // code below added 10/2 sort parameterindexobj

                        if (Object.keys(parameterindexobj).length !== 0) {
                            sortable = sortable.sort(function(aObj, bObj) {
                                var a = getAttributeByIndex(aObj, 0);
                                var b = getAttributeByIndex(bObj, 0);
                                if (a < b) return -1;
                                if (a > b) return 1;
                                return 0;
                            });
                        }

                        parameterindexobj = sortable;

                        proxyprinttodiv('Function AddMaster : parameterindexobj, sorted, which children have dots ', parameterindexobj);

                        // ** note there will be issues with sort


                        if (Object.keys(parameterindexobj).length !== 0) { // for this children, any parameters with number?
                            editflag = 'true' // if we had parameterindex, then edit must be true
                        }

                        //proxyprinttodiv('Function AddMaster : editflag', editflag);
                        if (attr == 'onetoone') {
                            editflag = 'true'; // onetoone is alway edit true
                            attrtype = 'last'; // onetoone -- read last record
                        }
                        if (attr == 'onetomany') {
                            attrtype = 'all' // onetomany --- read all records
                        }
                        widlist = [];

                        cb(null);
                    },
                    function step4n2(cb){
                        if (editflag == 'true') { // edit means read wids before write -- to get wid names
                           // get list of related wids
                            executeobject = {};
                            executeobject["mongowid"] = ParentWid;
                            executeobject["mongorelationshiptype"] = "attributes";
                            executeobject["mongorelationshipmethod"] = attrtype;
                            executeobject["mongorelationshipdirection"] = "forward";
                            executeobject["mongowidmethod"] = childrentype;
                            executeobject["convertmethod"] = "";
                            executeobject["dtotype"] = "";
                            proxyprinttodiv('Function AddMaster()  executeobject III', executeobject);
                            executeobject["executethis"] = querywid;
                            //var widlist=querywidlocal(executeobject);  // **
                            widlist = executethis(executeobject, querywid);
                            // **** 10-31
                            //var widlist = simpleQuery(ParentWid, "attributes", attrtype, "forward", childrentype, "", "");
                            proxyprinttodiv('Function AddMaster : widlist, these are the wids related to parent and current child', widlist);
                        }
                        cb(null);
                    },
                    function step4n3(cb){
                        // do children with numbers first

                        SplitParameters = MatchPrefixDelete(RelatedListdto, childrentype);
                        ChildrendtoList = SplitParameters.match;
                        RelatedListdto = SplitParameters.nomatch;

                        // save copy for next iteration
                        proxyprinttodiv('Function AddMaster : ChildrendtoList - 111, parameters for current child', ChildrendtoList);
                        proxyprinttodiv('Function AddMaster : RelatedListdto - 111, dto for current child, now determine if number or not A/B', RelatedListdto);
                        
                        cb(null);
                    },
                    function step4n4(cb){
                        if (Object.keys(parameterindexobj).length !== 0) {
                            async.series([
                                function step4n4n1(cb){
                                    var listtodo = [];
                                    for (var currentchild in parameterindexobj) {
                                        listtodo.push(currentchild);
                                    }       
                                    async.mapSeries(listtodo, function (currentchild, cbMap) {
                                        async.series([
                                            function step4n4n1n1(cb){                          
                                                proxyprinttodiv('Function AddMaster : childrenttype.currentchild - 222, process this number first, look up in widlist', childrentype + '.' + currentchild);
                                                SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype + '.' + currentchild); // separate parameters to those that start with curr number
                                                ParametersToAdd = SplitParameters.match;
                                                RelatedListParameters = SplitParameters.nomatch; // each iteration relatedlistparameter will become smaller
                                                //proxyprinttodiv('Function AddMaster : editflag', editflag);
                                                //if (ParametersToAdd.length!==0) {     ****
                                                if (countKeys(ParametersToAdd) !== 0) {
                                                    widtoadd = '';
                                                    if ((editflag = 'true') && (widlist != "")) {
                                                        if (widlist[currentchild] !== undefined) { // removed -1
                                                            for (var widName in widlist[currentchild]) { // removed -1
                                                                widtoadd = widName;
                                                            }
                                                        }
                                                    }
                                                }
                                                cb(null);
                                            },
                                            function step4n4n1n2(cb){
                                                ChildWid = AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype);
                                                cb(null);
                                            },
                                            function step4n4n1n3(cb){
                                                AddMongoRelationship(ParentWid, ChildWid, "attributes");
                                                cb(null);
                                            }],
                                            function (err, results) {


                                        }); // end async series
                                        
                                        cbMap(null);
                                        
                                        },
                                        function (err, results) {

                                    }); // end async map
                                
                                cb(null); 

                                }],
                                function (err, results) {

                            }); // end async series
                        cb(null); // step4n4 callback
                        } // end if
                    }, // end function step4n4
                    function step4n5(cb) {
                        SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype); // split parameters based on childtype
                        ParametersToAdd = SplitParameters.match; // do right now
                        RelatedListParameters = SplitParameters.nomatch; // do next iteration
                        cb(null);
                    },
                    function step4n6(cb){       
                        if (countKeys(ParametersToAdd) !== 0) {
                            async.series([
                                function step4n6n1(cb) {
                                    widtoadd = ''; // this is to catch onetoone case
                                    if ((attr == 'onetoone') && (widlist != "")) {
                                        if (widlist[0] !== undefined) {
                                            for (var widName in widlist[0]) {
                                                widtoadd = widName;
                                            }
                                        }
                                    };
                                    cb(null);
                                },
                                function step4n6n2(cb) {
                                    ChildWid = AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype);
                                    cb(null);
                                },
                                function step4n6n3(cb) {
                                    AddMongoRelationship(ParentWid, ChildWid, "attributes");
                                    cb(null);
                                }],
                                function (err, results) {

                            }); // end async series
                        } //end if
                        cb(null);
                    }],
                    function (err, results) {

                }); // end step 4 async series
                
                cbMap(null); // step 4 map callback
                
                },
                function (err, results) {

            }); // end map at step 4
            cb(null); // step 4 function callback
        }], //end step 4 function
        function (err, results) {
            ret = ParentWid;

            if (err) {
                throw err;
            }
            if (callback instanceof Function) {
                callback(ret);
            }
    }); // end first async series
                
    while (ret === undefined) {}

    return ret;
} // end addMaster
    // Adds a wid to the database and returns the parent wid (to demonstrate success?)  
    // The DTOList and the inputList consist of an input list, index list, and original input list.


})(typeof window === "undefined" ? global : window);