(function (window) {

// current code calls addmasterproxy whcih continues to current code addmaster...we need to try addmaster2

function AddMasterProxy(dtoList, parameterList, widName, dtotype, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    AddMaster(dtoList, parameterList, widName, dtotype, callback) 
    //AddMaster2(dtoList, parameterList, widName, dtotype, callback) 
}

 // this new AddMaster is temporary it is a converter to new method to avoid huge changes in code
function AddMaster2(dtoList, parameterList, widName, dtotype, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

     var parentwid=""
     var relationshiptype=""
     var inputdto=converttodriformat(listToObject(dtoList));
     var inputObject= converttodriformat(listToObject(parameterList));
     addwidobject(inputObject, inputdto, command, function (err, addobject) {

                debugfn("AddMaster2 code generator", "AddMaster2", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: convertfromdriformat(addobject)
                }, 6);

                 callback(null, convertfromdriformat(addobject));
                 });
 }


function addwidobject(inputObject, inputdto, command, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var executeList = [];

    var parObject = {};
    console.log(" Input  "+JSON.stringify(inputObject));

    //var convObj = converttodriformat(inputObject);
    //extend(true, parObject, convObj);
    extend(true, parObject, inputObject);
    var onetomanyList = [];
    var onetooneList = [];
    if(parObject.hasOwnProperty("metadata")){
            var metaVal = parObject["metadata"];
            if(typeof metaVal === "object")
            {
                Object.keys(metaVal).forEach(function (metaKey) {
                    var val = parObject["metadata"][metaKey];
                    if (metaKey === "method") {

                    } else if (metaKey === "data") {
                        delete parObject["metadata"]["data"];
                    } else {
                        var tObj = parObject["metadata"][metaKey];
                        if (tObj["type"] && (tObj["type"] === "onetomany" || tObj["type"] === "onetoone")) {
                            if (tObj["type"] === "onetomany") {
                                onetomanyList.push(metaKey);
                            } else if (tObj["type"] === "onetoone") {
                                onetooneList.push(metaKey);
                            } else{

                            }
                            delete parObject["metadata"][metaKey];
                            if (parObject["data"] && parObject["data"][metaKey]) {
                                delete parObject["data"][metaKey];
                            };
                        }
                    };        
                });                 
            }
    }
    console.log("   parentObject needs to be added -->  "+JSON.stringify(parObject));
    var execObj = {};
    //Formatting parObject for execute
    Object.keys(parObject).forEach(function (parKey) {
        var parVal = parObject[parKey];
        if (parKey === "wid") {
            execObj["executethis"] = "updatewidobject";
            execObj["wid"] = parVal;
        } else if (parKey === "metadata") {
            if (parObject["metadata"]["method"]) {
                execObj["metadata.method"] = parObject["metadata"]["method"];
            }
        } else if (parKey === "data") {
            if (typeof parVal === "object") {
                execObj = merge_options(execObj,parVal);
            } else{
                //
            };
        } else{
            //
        };
    });                
    executeList.push(execObj);
    //Looping through ChildObjects
    for (var i = 0; i < onetomanyList.length; i++) {
        var childWidKey = onetomanyList[i];
        var childWidObj = {};
        if (inputObject["data"] && inputObject["data"][childWidKey]) {
            childWidObj[childWidKey] = inputObject["data"][childWidKey];
            executeList.push(childWidObj);            
            console.log("Child Object needs to be added ---> "+JSON.stringify(childWidObj));
        };
    };

    debugfn("addwidobject code generator", "addwidobject", "add", "code", 2, 1, {
        0: inbound_parameters,
        1: executeList
    }, 6);

    return executeList;
}

exports.merge_options = merge_options = function merge_options(obj1,obj2){
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

     var obj3 = {};
     for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
     for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }

    debugfn("merge_options code generator", "merge_options", "add", "code", 2, 1, {
        0: inbound_parameters,
        1: obj3
    }, 6);

     return obj3;
 }

function addwidmaster_new(object, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var command = parameters.command;
    delete object.command;
    cleanadd (object, dtoobject, command, function (err, res) {
        addwidobject(object, dtoobject, command, callback)
        })
}

function cleanadd(object, objectdto, command, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    getdtoobject(object, command, function (err, res) {
        var dtoToGet = resultObj.metadata.method;
        execute({"executethis":"getwidmaster", 
            "wid": dtoToGet, 
            "command.execute":"ConvertFromDOTdri",
            "command.convertmethod":"dto",
            }, function (err, res) {
            bigdto = res[0]; 

        if (command.dtotype) {
            dtoname=command.dtotype
            } 
        else {
            if (objectdto.wid) {dtoname=objectdto.wid} else {dtoname=object.wid}
            }
        index = getindex(bigdto, dtoname); 
        setbyindex(object, index, object);
        resultObj = deepfilter(object, objectdto, command);

        debugfn("cleanadd code generator", "cleanadd", "add", "code", 2, 1, {
            0: inbound_parameters,
            1: cleanadd
        }, 6);

        })
    })
}


// addrecord is a temporary call convert to old format
// it also check if relationship should be added
exports.addrecord = addrecord = function addrecord (object, dtoobject, parentwid, relationship, command, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var executeobject={};
    var widid = inputrecord("wid");
    var widdto = inputrecord["metadata"]["method"];
    var InList = objectToList(ConvertToDOTdri(inputrecord));
    var Indto = objectToList(ConvertToDOTdri(inputdto));
    //addwid(object, dtoobject, command, callback) 
    MongoAddEditPrepare(Indto, InList, widid, widdto,  function (err, addobject) {
        if (relationshiptype) {
            var ChildWid = addobject["wid"]; 
            //addwid(object, dtoobject, command, callback)
            AddMongoRelationship(ParentWid, ChildWid, relationshiptype, function (err, adddedrelationship) {
        
                debugfn("addrecord code generator", "addrecord", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: addobject
                }, 6);

                callback(null, addobject)
                });
            }
        else {
                debugfn("addrecord code generator", "addrecord", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: addobject
                }, 6);

            callback(null, addobject)
            }

        })
}

function addwid(object, dtoobject, command, callback) {
// addwid (object, dtoobject, callback)
// step through dtoobject
//     inheritobject = [getwidmaster, convertmethod=nowid]
//     remove items from object based on inherit 
// if wid then
//     getwid (wid), remove wid, mm
//     add to object missing parameters 
// updatewid
}



    exports.addwidmaster = addwidmaster = function addwidmaster(inputObject, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var OutParameters = ConvertToDOTdri(inputObject);
        var Wid;
        var ret = undefined;
        var err;
        var AddedObject = {};


        proxyprinttodiv('Function addwidmaster()  inputObject ', inputObject);
        // proxyprinttodiv('Function addwidmaster()  OutParameters : I ', OutParameters);
        // proxyprinttodiv('Function addwidmaster() Wid : I ', Wid);

        // proxyprinttodiv('Function addwidmaster()  dtotype : dtotype ', dtotype);
        // proxyprinttodiv('Function addwidmaster ** before ', inputParametersObject, 15);
        // proxyprinttodiv('Function addwidmaster() convertmethod ', convertmethod, 15);
        // proxyprinttodiv('Function addwidmaster()  dtotype : dtotype ', dtotype, 15);

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "OutParameters": OutParameters,
                    "Wid": Wid,
                    "ret": ret,
                    "err": err
                },
                2: {
                    "OutParameters": OutParameters,
                    "Wid": Wid,
                    "ret": ret,
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

        proxyprinttodiv('Function addwidmaster() inputObject : I ', inputObject, 15);

            AddWidParameters(OutParameters, function (err, ret) {
                AddedObject = ret;

                    proxyprinttodiv('Function addwidmaster() AddedObject >>>  : I ', AddedObject, 15);
                    debugfn("addwidmaster", "is NOT Synchronous", "add", "sub", debugcolor, debugindent, debugvars([1]));
                
                    debugfn("addwidmaster code generator", "addwidmaster", "add", "code", 2, 1, {
                        0: inbound_parameters,
                        1: ret
                    }, 6);

                    callback(err, ret);
            });

    };


    function addcleanparameters(resultObj, dtotype, accesstoken, cleanmethod, convertmethod, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        proxyprinttodiv('Function addcleanparameteres() resultObj I ', resultObj, 80);
        proxyprinttodiv('Function addcleanparameteres()  dtotype I', dtotype, 80);
        proxyprinttodiv('Function addcleanparameteres()  accesstoken I', accesstoken);
        proxyprinttodiv('Function addcleanparameteres()  convertmethod I', convertmethod, 80);
        var outputparameters = {};
        var dtoloc = 0;
        var proposedLeft = "";
        var proposedRight = "";
        var dtoobject = {};
        var inputParametersObject = {};
        var childdto = dtotype;
        var preAmble = "";
        var moreParameters = {};
        var executeobject = {};
        var eafield = "";
        var otherdtoobject = {};
        var resultlist = [];
        var ret = undefined;

        // first try to get dtoobject from method
        inputParametersObject = resultObj;

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
                    "preAmble": preAmble,
                    // "item":item,
                    "moreParameters": moreParameters,
                    "executeobject": executeobject,
                    "eafield": eafield,
                    "otherdtoobject": otherdtoobject,
                    "resultlist": resultlist
                },
                2: {
                    "eafield": eafield,
                    "otherdtoobject": otherdtoobject,
                    "resultlist": resultlist
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
                if ((inputParametersObject['metadata.method'])) {
                    childdto = inputParametersObject['metadata.method'];
                    executeobject = {};
                    executeobject["wid"] = childdto;
                    executeobject["command.convertmethod"] = "dto";
                    executeobject["command.dtotype"] = childdto;
                    executeobject['executethis'] = 'getwidmaster';
                    execute(executeobject, function (err, res) {
                        dtoobject = res[0];
                        proxyprinttodiv('Function addcleanparameteres()  result dtoobject ', dtoobject, 80);
                        debugfn("addcleanparameters", "step1", "add", "sub", debugcolor, debugindent, debugvars([1]));
                        cb("", 'one');
                    });
                } else {
                    debugfn("addcleanparameters", "step1a", "add", "sub", debugcolor, debugindent, debugvars([1]));
                    cb("", 'one');
                }

            },

            function step2(cb) {
                // next get dtoobject from dtotype -- aggressive
                childdto = dtotype;
                if (dtotype !== "") {
                    proxyprinttodiv('Function addcleanparameteres()  dtotype check ', dtotype);

                        aggressivedto(dtotype, "", 10, function (err, res) {
                            otherdtoobject = res;
                            proxyprinttodiv('Function addcleanparameteres()  otherdtoobject ', otherdtoobject);
                            proxyprinttodiv('Function addcleanparameteres()  countKeys(otherdtoobject) ', countKeys(otherdtoobject));
                            proxyprinttodiv('Function addcleanparameteres()  countKeys(dtoobject) ', countKeys(dtoobject));
                            if (countKeys(otherdtoobject) > countKeys(dtoobject)) {
                                dtoobject = otherdtoobject;
                                childdto = inputParametersObject['metadata.method'];
                            }
                            debugfn("addcleanparameters", "step2", "add", "sub", debugcolor, debugindent, debugvars([1]));
                            cb("", 'two');
                        });
                    
                } else {
                    debugfn("addcleanparameters", "step2", "add", "sub", debugcolor, debugindent, debugvars([1]));
                    cb("", 'two')
                }
            },

            function step3(cb) {

                proxyprinttodiv('Function addcleanparameteres()  childdto ', childdto, 80);
                proxyprinttodiv('Function addcleanparameteres()  dtotype : II ', dtotype, 80);

                // if dtotype was blank then just adopt it from method
                if (dtotype == "") {
                    dtotype = resultObj["metadata.method"];
                }

                // if dtotype <> method then we need to add to parameters
                if (resultObj["metadata.method"] != dtotype) {
                    proxyprinttodiv('Function addcleanparameteres()  resultObj', resultObj, 80);
                    proxyprinttodiv('Function addcleanparameteres()  dtoobject inside ', dtoobject, 80);

                    for (var item in dtoobject) {
                        if (
                            ((dtoobject[item] == 'onetomany') ||
                                (dtoobject[item] == 'onetoone'))) {
                            preAmble = item;
                        }
                    }
                    proxyprinttodiv('Function addcleanparameteres()  preAmble ', preAmble, 80);


                    for (var item in resultObj) { // now step through each record that could be changed
                        proposedLeft = item;
                        proposedRight = resultObj[item];
                        proxyprinttodiv('Function addcleanparameteres()  item', item, 81);
                        proposedLeft = ""; // work on left first...check if add or remvove
                        if ((cleanmethod == "add") && (preAmble != "")) {
                            if (((item != 'wid') && (item != 'metadata.method')) || (childdto != dtotype)) {
                                proposedLeft = preAmble + "." + item
                            } else {
                                proposedLeft = item;
                            }
                        }


                        proxyprinttodiv('Function addcleanparameteres()  proposedLeft', proposedLeft, 81);
                        proxyprinttodiv('Function addcleanparameteres()  proposedRight', proposedRight, 81);
                        if (proposedLeft != "") {
                            outputparameters[proposedLeft] = proposedRight;
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
                ret = {
                    parms: outputparameters,
                    dto: dtoobject
                };
                debugfn("addcleanparameters", "step3", "add", "sub", debugcolor, debugindent, debugvars([1]));
                cb("", 'three')
            }

        ], function (err, res) {

                debugfn("addcleanparameters code generator", "addcleanparameters", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: ret
                }, 6);

                callback(err, ret);
        });

      
    }

    function AddMongoRelationship(ParentWid, ChildWid, attr, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var AddedObject;
        var widset;
        var relationshipdto;
        var executeobject = {};
        var InList = [];
        var ret = undefined;
        var err;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "AddedObject": AddedObject,
                    "widset": widset,
                    "relationshipdto": relationshipdto,
                    "executeobject": executeobject,
                    "InList": InList,
                    "ret": ret,
                    "err": err
                },
                2: {
                    "widset": widset,
                    "ret": ret,
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
                        "value": "attributes"
                    });
                    InList.push({
                        "key": "metadata.method",
                        "value": "relationshipdto"
                    });
                    InList.push({
                        "key": "linktype",
                        "value": attr.toLowerCase()
                    });
                    debugfn("AddMongoRelationship", "step1", "add", "sub", debugcolor, debugindent, debugvars([1]));
                    cb("");
                },

                function step2(cb) {
                    proxyprinttodiv('Function AddMongoRelationship - executeobject', executeobject, 75);
                    executeobject["mongorawquery"] = {
                        "$and": [{
                            "data.primarywid": ParentWid,
                            "data.secondarywid": ChildWid
                        }]
                    };
                    executeobject["executethis"] = querywid;
                    execute(executeobject, function (err, res) {
                        proxyprinttodiv('Function relationshiptype executeobject', executeobject,75);
                        proxyprinttodiv('Function relationshiptype res', res,75);
                        widset = res;
                        debugfn("AddMongoRelationship", "step2", "add", "sub", debugcolor, debugindent, debugvars([1]));
                        cb("");
                    });
                },

                function step3(cb) {
                    proxyprinttodiv('Function AddMongoRelationship, ******************* 1 : ', widset, 90);
                    var widobject = {};
                    if (widset.length > 0) {
                        widobject = widset[0]
                    } else {
                        widobject = {};
                    }
                    InList.push(widobject);

                    widset = InList;
                    proxyprinttodiv('Function AddMongoRelationship, ******************* 2 : ', widset, 90);
                    debugfn("AddMongoRelationship", "step3", "add", "sub", debugcolor, debugindent, debugvars([1]));
                    cb("");
                },

                function step4(cb) {
                       MongoAddEditPrepare([], widset, "", attr, function (err, res) {
                            AddedObject = res;
                            debugfn("AddMongoRelationship", "step4", "add", "sub", debugcolor, debugindent, debugvars([1]));
                            cb("");
                        });
                }
            ],

            function (err, results) {
                console.log(JSON.stringify('done all in AddMongoRelationship, Result is  ' + JSON.stringify(results)));
                ret = AddedObject;

                debugfn("AddMongoRelationship code generator", "AddMongoRelationship", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: ret
                }, 6);

                // if (!isSynchronous) {
                    callback(err, ret);
                // }
            });

    }



    function AddWidParameters(parameterObject, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

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

        var dtoobject = {};
        var metadata = "";
        var moreParameters;
        var Wid;
        var dtoList;
        var inputList;
        var ret = undefined;
        var err;

        function debugvars(varlist) {
            var allvars = {
                1: {
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
                    "dtoList": dtoList,
                    "ret": ret,
                    "err": err,
                    "convertmethod": convertmethod
                },
                2: {
                    "inherit": inherit,
                    "dtotype": dtotype,
                    "convertmethod": convertmethod
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

        var checkflag = commandobject["command.checkflag"];
        var accesstoken = commandobject["command.accesstoken"];
        var inherit = commandobject["command.inherit"];
        var dtotype = commandobject["command.dtotype"];
        var convertmethod = commandobject["command.convertmethod"];

        async.series([
                function step1(cb) {

                    proxyprinttodiv('Function AddWidParameters()  checkflag ', checkflag);
                    proxyprinttodiv('Function AddWidParameters()  accesstoken : I ', accesstoken);
                    proxyprinttodiv('Function AddWidParameters() inherit : I ', inherit);

                    proxyprinttodiv('Function AddWidParameters()  dtotype : dtotype ', dtotype);
                    proxyprinttodiv('Function addWidParameters ** before ', inputParametersObject, 15);
                    proxyprinttodiv('Function AddWidParameters() convertmethod ', convertmethod, 15);
                    proxyprinttodiv('Function AddWidParameters()  dtotype : dtotype ', dtotype, 15);


                    
                        addcleanparameters(inputParametersObject, dtotype, accesstoken, "add", convertmethod, function (err, res) {
                            parameterObject = res;
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
                            debugfn("AddWidParameters", "step1", "add", "sub", debugcolor, debugindent, debugvars([1]));
                            cb("");
                        });
                },

                function step2(cb) {
                    var executeobject = {};
                    executeobject["executethis"] = 'getwid';
                    executeobject["wid"] = 'inherit';

                    execute(executeobject, function (err, res) {
                        moreParameters = res[0];
                        debugfn("AddWidParameters", "step2", "add", "sub", debugcolor, debugindent, debugvars([1]));
                        cb("");
                    });
                },

                function step3(cb) {
                    if (moreParameters) {
                        inputParametersObject = jsonConcat(inputParametersObject, moreParameters); // if duplicates then currentLevelObject{} wins
                    }

                    inputList = objectToList(inputParametersObject);
                    dtoList = objectToList(dtoobject);

                    //proxyprinttodiv('Function AddWidParameters()  inputList : ',  inputList);
                    //proxyprinttodiv('Function AddWidParameters()  metadata : ',  metadata);
                    olddebug = Debug;
                    proxyprinttodiv('Function AddWidParameters()  all parms to addmaster : ', {
                        "dtolist": dtoList,
                        "inputlist": inputList,
                        "metadata": metadata
                    });

                    if (inputParametersObject["wid"] === undefined) {
                        inputParametersObject["wid"] = "";
                    }

                        AddMasterProxy(dtoList, inputList, inputParametersObject["wid"], metadata, function (err, res) {
                            Wid = res;
                            debugfn("AddWidParameters", "step3", "add", "sub", debugcolor, debugindent, debugvars([1]));
                            cb("");
                        });
                }
            ],
            function (err, results) {
                console.log(JSON.stringify('done all in AddWidParameters, Result is  ' + JSON.stringify(Wid)));
                ret = {
                    "Wid": Wid
                };

                proxyprinttodiv('Function AddWidParameters() Wid : I ', Wid, 15);
                debugfn("AddWidParameters", " final response after steps ", "add", "sub", debugcolor, debugindent, debugvars([1]));
                
                debugfn("AddWidParameters code generator", "AddWidParameters", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: ret
                }, 6);

                    callback(err, ret);
            });

    }

    function AddMaster(dtoList, parameterList, widName, dtotype, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var originalarguments=arguments;
        var executionid = new Date();
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
        var splitkey = '';
        var currentNumber = 0;
        var sortable = [];
        var RelatedListParameters;
        var RelatedListdto;
        var executeobject;
        var currentparameter;
        var err;
        var res;
        var ret = undefined;
        var childrentype;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "ChildrenListobj": ChildrenListobj,
                    "dtoobject": dtoobject,
                    "ParentdtoList": ParentdtoList,
                    "ParentList": ParentList,
                    "ParentObject": ParentObject,
                    "ParentWid": ParentWid,
                    "attrtype": attrtype,
                    "editflag": editflag,
                    "attr": attr,
                    "ParametersToAdd": ParametersToAdd,
                    "SplitParameters": SplitParameters,
                    "ChildrendtoList": ChildrendtoList,
                    "ChildWid": ChildWid,
                    "widtoadd": widtoadd,
                    "widlist": widlist,
                    "parameterindexobj": parameterindexobj,
                    // "currentparameter":currentparameter,
                    "splitkey": splitkey,
                    "currentNumber": currentNumber,
                    "sortable": sortable,
                    // "currentitem":currentitem,
                    // "childrentype":childrentype,
                    "RelatedListParameters": RelatedListParameters,
                    "RelatedListdto": RelatedListdto,
                    "executeobject": executeobject,
                    "err": err,
                    "res": res
                },
                2: {
                    "widlist": widlist,
                    "err": err,
                    "res": res
                },
                3: {
                    // unit test debug vars to include
                    "dtoList": dtoList, 
                    "parameterList": parameterList, 
                    "widName": widName, 
                    "dtotype": dtotype
                },
                4: {
                    "ParentObject": ParentObject
                },
                5: {
                    "widtoadd": widtoadd,
                    "ParametersToAdd": ParametersToAdd,
                    "ChildrendtoList": ChildrendtoList,
                    "childrentype": childrentype,
                    "ParentWid": ParentWid,
                    "ChildWid": ChildWid
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
                    proxyprinttodiv('Function AddMaster : inbound parms all ', {
                        "dtolist": dtoList,
                        "parameterList": parameterList,
                        "widName": widName,
                        "dtotype": dtotype
                    },97);
                    // go through list of incoming parameters to generate a list of childrent dtos
                    dtoobject = listToObject(dtoList); // generate a copy of dtolist that is an object
                    dtoobject = ConvertFromDOTdri(dtoobject);
                    for (var key in dtoobject["metadata"]) { // go through each parameter
                        if ((dtoobject["metadata"][key]["type"] == 'onetomany') || (dtoobject["metadata"][key]["type"] == 'onetoone')) {
                            // see if dto list tells us is a child
                            ChildrenListobj[key] = dtoobject["metadata"][key]["type"]; // add it to children object list
                        }
                    }

                    // extend(true, ParentdtoList, dtoList);
                    ParentdtoList = JSON.parse(JSON.stringify(dtoList)); // now go through childrent list and delete from copy of incoming parameters
                    // extend(true, ParentList, parameterList);
                    ParentList = JSON.parse(JSON.stringify(parameterList)); // anything related to these children

                    for (var currentparameter in ChildrenListobj) {
                        ParentList = MatchDelete(ParentList, currentparameter);
                        ParentdtoList = MatchDelete(ParentdtoList, currentparameter);
                    }

                    ParentObject = {}; // add survivors -- that is the parent
                    ParentWid = '';

                    debugfn("AddMaster", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([3]));

                    cb(null, 'one');
                },
                function step2(cb) {
                        MongoAddEditPrepare(ParentdtoList, ParentList, widName, dtotype, function (err, res) {
                            ParentObject = res;
                            ParentWid = ParentObject["wid"];
                            debugfn("AddMaster", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([4]));
                            cb(null);
                        });
                },
                function step3(cb) {
                    RelatedListParameters = SplitObjectList(parameterList, ParentList); // figure out what the left over parameters are
                    RelatedListParameters = RelatedListParameters.nomatch;

                    RelatedListdto = SplitObjectList(dtoList, ParentdtoList);

                    RelatedListdto = RelatedListdto.nomatch;
                    proxyprinttodiv('Function AddMaster : RelatedListdto', RelatedListdto, 97);
                    proxyprinttodiv('Function AddMaster : RelatedListParameters', RelatedListParameters, 97);
                    debugfn("AddMaster", "step3", "add", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null, 'three');
                },
                function step4(cb) { // create work
                    var listtodo = [];
                    proxyprinttodiv('Function AddMaster : ChildrenListobj ', ChildrenListobj, 97);
                    for (var eachchild in ChildrenListobj) {
                        listtodo.push(eachchild);
                    }

                    async.mapSeries(listtodo, function (eachchild, cbMap) {
                        async.series([

                                    function step4n1(cb) {
                                        childrentype=eachchild;
                                        proxyprinttodiv('Function AddMaster : childrentype', childrentype, 97);
                                        editflag = 'false';
                                        attr = ChildrenListobj[childrentype]; // onetoone or onetomany?  -left side of ChildrenListobj is the dto name
                                        parameterindexobj = []; // create a list of (children) parameters that start with number

                                        for (var currentcount in RelatedListParameters) {
                                            //proxyprinttodiv('Function AddMaster : currentcount', currentcount);
                                            var currentparameter = RelatedListParameters[currentcount].key;
                                            proxyprinttodiv('Function AddMaster : currentparameter', currentparameter, 97);
                                            splitkey = currentparameter.split(".");
                                            proxyprinttodiv('Function AddMaster : splitkey', splitkey, 97);
                                            if (splitkey[0] == childrentype) {
                                                currentNumber = 0;
                                                if (splitkey[1] !== undefined) {
                                                    currentNumber = Number(splitkey[1]);
                                                }
                                                //proxyprinttodiv('Function AddMaster : currentNumber', currentNumber);
                                                if (currentNumber >= 0) {
                                                    proxyprinttodiv('Function AddMaster : currentNumber II ', currentNumber, 97);
                                                    parameterindexobj.push(currentNumber);
                                                    //parameterindexobj[splitkey[1]] = splitkey[0];
                                                    // 1 booksdto
                                                    // 3 booksdto
                                                    // 5 booksdto
                                                }
                                            }
                                            //proxyprinttodiv('Function AddMaster : parameterindexobj, sorted, which children have dots ', parameterindexobj);
                                            //proxyprinttodiv('Function AddMaster : parameterindexobj I  ', parameterindexobj);
                                        }

                                        // code below added 10/2 sort parameterindexobj

                                        function sortNumber(a,b) {
                                            return a - b;
                                            }

                                        proxyprinttodiv('Function AddMaster : parameterindexobj, before sort', parameterindexobj, 97);

                                        if (parameterindexobj.length!=0) { // since array 
                                            parameterindexobj=parameterindexobj.sort(sortNumber);
                                            editflag = 'true'; 
                                        }

                                        //if (Object.keys(parameterindexobj).length !== 0) {
                                            // sortable = sortable.sort(function (aObj, bObj) {
                                            //     var a = getAttributeByIndex(aObj, 0);
                                            //     var b = getAttributeByIndex(bObj, 0);
                                            //     if (a < b) return -1;
                                            //     if (a > b) return 1;
                                            //     return 0;
                                        //     });
                                        // }

                                        // parameterindexobj = sortable;

                                        proxyprinttodiv('Function AddMaster : parameterindexobj, sorted, which children have dots ', parameterindexobj, 97);

                                        proxyprinttodiv('Function AddMaster : editflag ', editflag, 75);
                                        // ** note there will be issues with sort

                                        // if (parameterindexobj!==[]) { // since array 
                                        // //if (Object.keys(parameterindexobj).length !== 0) { // for this children, any parameters with number?
                                        //     editflag = 'true'; // if we had parameterindex, then edit must be true
                                        // }

                                        //proxyprinttodiv('Function AddMaster : editflag', editflag);
                                        if (attr == 'onetoone') {
                                            editflag = 'true'; // onetoone is alway edit true
                                            attrtype = 'last'; // onetoone -- read last record
                                        }
                                        if (attr == 'onetomany') {
                                            attrtype = 'all'; // onetomany --- read all records
                                        }
                                        widlist = [];
                                        debugfn("AddMaster step4", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                        cb(null);
                                    },
                                    function step4n2(cb) {
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
                                            executeobject["executethis"] = 'querywid';
                                            //var widlist=querywidlocal(executeobject);  // **
                                            // widlist = executethis(executeobject, querywid);
                                            execute(executeobject, function (err, res) {
                                                proxyprinttodiv('Function AddMaster executeobject', executeobject,75);
                                                proxyprinttodiv('Function AddMaster res', res,75);

                                                widlist = res;
                                                // **** 10-31
                                                //var widlist = simpleQuery(ParentWid, "attributes", attrtype, "forward", childrentype, "", "");
                                                proxyprinttodiv('Function AddMaster : widlist, these are the wids related to parent and current child', widlist);
                                                debugfn("AddMaster step4n2a", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                cb(null);
                                            })
                                        } else {
                                            debugfn("AddMaster addmaster", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                            cb(null);
                                        }
                                    },

                                    function step4n3(cb) {
                                        // do children with numbers first
                                        SplitParameters = MatchPrefixDelete(RelatedListdto, childrentype);
                                        ChildrendtoList = SplitParameters.match;
                                        RelatedListdto = SplitParameters.nomatch;
                                        // save copy for next iteration
                                        proxyprinttodiv('Function AddMaster : ChildrendtoList - 111, parameters for current child', ChildrendtoList, 75);
                                        proxyprinttodiv('Function AddMaster : RelatedListdto - 111, dto for current child, now determine if number or not A/B', RelatedListdto, 75);
                                        debugfn("AddMaster step4n3", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                        cb(null);
                                    },
                                    
                                    function step4n4(cb) {
                                        proxyprinttodiv('Function AddMaster : parameterindexobj', parameterindexobj, 97);
                                        
                                        if (parameterindexobj.length !== 0) { // since array 
                                            var listtodo = [];
                                            proxyprinttodiv('Function AddMaster : parameterindexobj about to iterate', parameterindexobj, 97);
                                            
                                            async.mapSeries(parameterindexobj, function (currentchild, cbMap) { //cbMap needed at end 
                                                
                                                async.series([ // asynch series 4n4n1n-
                                                    
                                                    function step4n4n1n1(cb) {
                                                        ParametersToAdd = {};
                                                        proxyprinttodiv('Function AddMaster : childrenttype.currentchild - 222, process this number first, look up in widlist', childrentype + '.' + currentchild, 97);
                                                        
                                                        SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype + '.' + currentchild); // separate parameters to those that start with curr number
                                                        ParametersToAdd = SplitParameters.match;
                                                        proxyprinttodiv('Function AddMaster : Parameters to add after match', ParametersToAdd, 97);
                                                        RelatedListParameters = SplitParameters.nomatch; // each iteration relatedlistparameter will become smaller
                                                        proxyprinttodiv('Function AddMaster : RelatedListParameters to add after', RelatedListParameters, 97);
                                                        if (Object.keys(ParametersToAdd).length !== 0) {
                                                            widtoadd = '';
                                                            
                                                            if ((editflag = 'true') && (widlist != "")) {
                                                                
                                                                if (widlist[currentchild] !== undefined) { // removed -1
                                                                    
                                                                    for (var widName in widlist[currentchild]) { // removed -1
                                                                        widtoadd = widName;
                                                                    }
                                                                }
                                                            }
                                                        } // count keys parm add
                                                        debugfn("AddMaster", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                        cb(null); // step step4n4n1n1
                                                    }, // end step4n4n1n1
                                                    
                                                    function step4n4n1n2(cb) {
                                                        debugfn("addmaster before add add I", "addrecord", "add", "add", 2, 1, debugvars([5]));
                                                        AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype, function (err, res) {
                                                            ChildWid = res;
                                                            debugfn("addmaster code generator", "addrecord", "add", "code", 2, 1, {
                                                                0: originalarguments,
                                                                1: res,
                                                                2: executionid
                                                            }, 4);
                                                            debugfn("AddMaster step4n1n2b", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                            cb("");
                                                        });
                                                    }, // end step4n4n1n2

                                                    function step4n4n1n3(cb) {
                                                        debugfn("addmaster before add rel II", "addrecord", "add", "add", 2, 1, debugvars([5]));
                                                        AddMongoRelationship(ParentWid, ChildWid, attr, function (err, res) {
                                                            debugfn("addmaster code generator", "addrecord", "add", "code", 2, 1, {
                                                                0: originalarguments,
                                                                1: res,
                                                                2: executionid
                                                                }, 4);
                                                            debugfn("AddMaster step4n4n1n3b", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                            cb("");
                                                        });
                                                    } // end step4n41n3
                                                ], // asynch series end array
                                                
                                                function (err, results) { // asynch series callback
                                                    // cb(""); // taken out by roger yupe calling back with nothin
                                                    cbMap(null); // moved up from two lines down by roger
                                                }); // end async series
                                                //cbMap(null); // moved up by roger--async map callback -- needed for async library to work
                                            }, // async map end object

                                            function (err, results) { // async map callback
                                                cb(""); // change by roger cbMap(null);

                                            }); // end async map
                                        } // end if

                                        else {



                                            cb(null); // added by roger
                                            //callback(null); take away by roger// step4n4 callback
                                        }
                                    }, // end function step4n4 

                                    function step4n5(cb) {
                                        SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype); // split parameters based on childtype
                                        ParametersToAdd = SplitParameters.match; // do right now
                                        RelatedListParameters = SplitParameters.nomatch; // do next iteration
                                        proxyprinttodiv('Function AddMaster : 222-222 ParametersToAdd', ParametersToAdd, 75);
                                        proxyprinttodiv('Function AddMaster : 222-222 RelatedListParameters', RelatedListParameters, 75);

                                        debugfn("AddMaster step4n5", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                        cb(null);
                                    },
                                    function step4n6(cb) {
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
                                                        }
                                                        debugfn("AddMaster step4n6", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                        cb(null);
                                                    },
                                                    function step4n6n2(cb) {
                                                            debugfn("addmaster before add II", "addrecord", "add", "add", 2, 1, debugvars([5]));
                                                            AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype, function (err, res) {
                                                                ChildWid = res;
                                                                debugfn("addmaster code generator", "addrecord", "add", "code", 2, 1, {
                                                                        0: originalarguments,
                                                                        1: res,
                                                                        2: executionid
                                                                    }, 4);
                                                                debugfn("AddMaster step4n62b", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                                cb("");
                                                            });
                                                    },
                                                    function step4n6n3(cb) {
                                                        debugfn("addmaster before add rel II", "addrecord", "add", "add", 2, 1, debugvars([5]));
                                                        AddMongoRelationship(ParentWid, ChildWid, attr, function (err, res) {
                                                                debugfn("addmaster code gen AddMongoRelationship", "addrecord", "add", "code", 2, 1, {
                                                                        0: originalarguments,
                                                                        1: res,
                                                                        2: executionid
                                                                    }, 4);
                                                                debugfn("AddMaster add rel step4n6n3", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                                                cb("");
                                                            });
                                                    }
                                                ],
                                                function (err, results) {

                                                }); // end async series
                                        } //end if
                                        debugfn("AddMaster near end", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                                        cb(null);
                                    } // of step4n6
                                ],
                                function (err, results) {

                                }); // end step 4 async series
                            cbMap(null); // step 4 map callback

                        },
                        function (err, results) {

                        }); // end map at step 4
                    debugfn("AddMaster end step 4", "addmaster", "add", "sub", debugcolor, debugindent, debugvars([1]));
                    cb(null); // step 4 function callback
                }
            ], 
            //end step 4 function
            // For making unit_tests of addmaster...changed 'sub' to 'unit'
            // debugfn("AddMaster", "end map at step 4", "add", "unit", debugcolor, debugindent, debugvars([3]));

            function (err, results) {
                ret = ParentWid;

                if (err) {
                    throw err;
                }

                debugfn("AddMaster code generator", "AddMaster", "add", "code", 2, 1, {
                    0: inbound_parameters,
                    1: ret
                }, 6);

                callback(err, ret);
            });


    } // end addMaster



    exports.updatewid = updatewid = function updatewid(inputObject, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        authcall(inputObject, function (err, ret) {
            if (err || !ret) {
                callback(err, {
                    "etstatus": "unauthroized"
                });
            } else {

                var inputWidgetObject = JSON.parse(JSON.stringify(inputObject));

                offlineaddtomongo(converttodriformat(inputWidgetObject), function (err, results) {

                    debugfn("updatewid code generator", "updatewid", "add", "code", 2, 1, {
                        0: inbound_parameters,
                        1: results
                    }, 6);

                    callback({}, results);
                });
            }
        });
    }

    exports.MongoAddEditPrepare = MongoAddEditPrepare = function MongoAddEditPrepare(Indto, InList, widid, widdto, callback) {
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var InListObj = {};
        var rawobject = {};
        var rawlist = [];
        var ret = undefined;
        var executeobject;
        var addresult;
        var listtodo;
        var potentialwid;
        var err;

        async.series([

                function step1(cb) {
                    InListObj = listToObject(InList);
                    proxyprinttodiv('Function MongoAddEditPrepare, Indto : ', Indto, 90);
                    proxyprinttodiv('Function MongoAddEditPrepare, InList : ', InList, 90);
                    proxyprinttodiv('Function MongoAddEditPrepare, widid : ', widid, 90);
                    proxyprinttodiv('Function MongoAddEditPrepare, widdto : ', widdto, 90);

                    if ((InListObj["wid"] === undefined) || (InListObj["wid"] == "")) {
                        if ((widid !== undefined) || (widid != "")) {
                            InListObj["wid"] = widid;
                        }
                    }
                    if ((InListObj["wid"] === undefined) || (InListObj["wid"] == "") || (InListObj["wid"] == "add")) {
                        InListObj["wid"] = getnewwid();
                        proxyprinttodiv('Function MongoAddEditPrepare inlistwid : ', InListObj["wid"], 15);
                        cb("");
                    } else {
                        async.series([ // ELSE
                                function step1n1(cb1) {
                                    executeobject = {};
                                    executeobject["executethis"] = "getwid";
                                    executeobject["wid"] = InListObj["wid"];
                                    execute(executeobject, function (err, res) {
                                        rawobject = res[0];
                                        cb1("");
                                    });
                                },
                                function step1n2(cb1) {
                                    if (((rawobject["metadata.method"] !== undefined) || (rawobject["metadata.method"] != "")) &&
                                        ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == ""))) {
                                        InListObj["metadata.method"] = rawobject["metadata.method"];
                                    }
                                    InListObj = jsonConcat(InListObj, rawobject); // this will be the new contents concat with old stuff in wid

                                    rawobject = {}; // if the dto had inherit then we only want to save what in herit does not have

                                    async.series([ // asynch step1n2

                                            function step1n2n1(cb3) {
                                                listtodo = [];
                                                for (var item in Indto) {
                                                    listtodo.push(item);
                                                }
                                                cb3("");
                                            },

                                            function step1n2n2(cb3) {
                                                var newObject;

                                                async.mapSeries(listtodo, function (item, cbMap) {
                                                        async.series([ // asych inside map
                                                                function step1n2n2n1(cb2) {
                                                                    if (item.value == 'inherit') {
                                                                        executeobject = {};
                                                                        executeobject["executethis"] = "getwid"; // probably should be getwidmaster -- changed from only getwid
                                                                        executeobject["wid"] = item.key;
                                                                        execute(executeobject, function (err, res) {
                                                                            // rawobject = res;
                                                                            newObject = res[0];
                                                                            cb2("");
                                                                        });
                                                                    } else {
                                                                        cb2("");
                                                                    }
                                                                },
                                                                function step1n2n2n2(cb2) {
                                                                    rawobject = jsonConcat(rawobject, newObject);
                                                                    cb2("");
                                                                }
                                                            ], // asych inside map

                                                            function (err, res) {
                                                                if (err) {
                                                                    throw err;
                                                                }
                                                            }); // asych inside map
                                                        cbMap(null);
                                                    }, // map series

                                                    function (err, res) {
                                                        if (err) {
                                                            throw err;
                                                        }
                                                    }

                                                ); // end of map series
                                                cb3(null, "step1n2n2");
                                            }
                                        ], // asynch step1n2

                                        function (err, res) {
                                            if (err) {
                                                throw err;
                                            }
                                            cb1("");
                                        }); // end of asynch step1n2
                                    // cb1("");
                                },
                                function step1n3(cb1) {
                                    for (var item in rawobject) { // for all data in inherit, delete it from being added
                                        if (InListObj[item] == rawobject[item]) {
                                            delete InListObj[item];
                                        }
                                    }
                                    cb1(null);
                                }
                            ], // else block series end call

                            function (err, res) {
                                if (err) {
                                    throw err;
                                }
                                cb("");
                            }
                        );
                    }
                    // end of asynch ELSE  
                }, // step1

                function step2(cb) {
                    if ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == "")) {
                        if ((widdto !== undefined) || (widdto != "")) {
                            InListObj["metadata.method"] = widdto;
                        }
                    }
                    if ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == "")) {
                        InListObj["metadata.method"] = 'defaultdto';
                    }

                    InListObj["wid"] = InListObj["wid"].toLowerCase();

                    proxyprinttodiv('Function MongoAddEditPrepare, to update InListObj : ', InListObj, 90);

                    InListObj.executethis = 'updatewid';

                    execute(InListObj, function (err, ret) {
                        addresult = ret[0];
                        proxyprinttodiv('Function MongoAddEditPrepare, addresult new : ', addresult, 90);
                        cb(null);
                    });
                } // step2

            ], // end step1, step2

            function (err, results) {
                ret = InListObj;

                    debugfn("MongoAddEditPrepare code generator", "MongoAddEditPrepare", "add", "code", 2, 1, {
                        0: inbound_parameters,
                        1: ret
                    }, 6);
                    
                    callback(err, ret);
            });

    }


})(typeof window === "undefined" ? global : window);
