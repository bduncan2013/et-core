(function (window) {

    // *** GetWid ***
    // Purpose: Converts data to and from dri standards
    exports.getwid = getwid = function getwid(inputWidgetObject, callback) {
        try {
            var inbound_parameters = JSON.parse(JSON.stringify(arguments));

            authcall(inputWidgetObject, function (err, ret) {
                if (err || !ret) {
                    callback(err, {
                        "etstatus": "unauthorized"
                    });
                } else {
                    try {
                            delete inputWidgetObject['executethis']; // ** added by Saurabh 38/9

                            proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);

                            getfrommongo(inputWidgetObject, function (err, resultobject) {
                                // convert the object from dri standard before returnning it
                                callback({}, convertfromdriformat(resultobject));
                            });
                    } // end try
                    catch (err) {
                        var finalobject = createfinalobject({"result": "getwid_authcall"}, {}, "getwid_authcall", err, inbound_parameters);
                        callback(finalobject.err, finalobject.res);
                    }
                }
            });
        } // end try
        catch (err) {
            var finalobject = createfinalobject({"result": "getwid"}, {}, "getwid", err, inbound_parameters);
            callback(finalobject.err, finalobject.res);
        }
    };

    // *** GetWidMaster ***
    // Purpose: splits wid and command parameters
    exports.getwidmaster = getwidmaster = function getwidmaster(parameters, callback) {
        try {
            var inbound_parameters = arguments;
            var command;
            proxyprinttodiv('getwidmaster start parameters', parameters, 38);
            parameters = ConvertFromDOTdri(parameters);

            // this sends in a default command object 
            var filter_data = tolowerparameters(parameters, {
                    "command": {
                        "getwidmaster": {
                            "inheritflag": "true",
                            "dtotype": "",
                            "execute": "ConvertToDOTdri"
                        }
                    }
                },
                //"dtotype":"", "execute":"ConvertFromDOTdri"}}}, 
                {
                    "command": ""
                }, true);

            proxyprinttodiv('getwidmaster filter_data', filter_data, 38);

            parameters = filter_data.output;
            command = filter_data.filteredobject.command;

            proxyprinttodiv('getwidmaster command I', command, 38);

            proxyprinttodiv('GetWidMaster parameters.wid right before getwidmongo', parameters.wid, 38);
            proxyprinttodiv('GetWidMaster parameters right before getwidmongo', parameters, 38);
            proxyprinttodiv('getwidmaster command right before getwidmongo', command, 38);

            getWidMongo(parameters.wid, command, "", 20, {}, function (err, res) { // recurse up to 20 levels, excludeset empty
                // If error, bounce out
                if (err && Object.keys(err).length > 0) {
                    callback(err, res);
                } else {
                    try {
                        proxyprinttodiv('getwidmaster command II', command, 38);
                        // if ((res) && (res.command) && (Object.keys(res.command).length !== 0)) {
                        //     delete res.command;
                        //  } 
                        proxyprinttodiv('getwidmaster after get wid mongo command', command, 38);
                        proxyprinttodiv('getwidmaster res from getWidMongo', res, 38);
                        // if ((res) && (Object.keys(res).length !== 0) && (res['metadata']) && 
                        //     (res['wid'] !== res['metadata']['method']) && (command) && (command.getwidmaster) && 
                        //     (command.getwidmaster.convertmethod!=="dto") && (command.getwidmaster.inheritflag !== "false")) {
                        if ((res) && (Object.keys(res).length !== 0)) { //&& (res['metadata']) && (res['wid'] !== res['metadata']['method'])) {
                            if (((command) && (command.getwidmaster)) && ((command.getwidmaster.convertmethod !== "dto") || (command.getwidmaster.inheritflag === "true"))) {

                                // getclean(res, parameters.command, function (err, res) {
                                proxyprinttodiv('getwidmaster command II-3', command, 38);
                                proxyprinttodiv('GetWidMaster res from getWidMongo right before getClean', res, 38);

                                getclean(res, command, function (err, res) {
                                    // If error, bounce out
                                    if (err && Object.keys(err).length > 0) {
                                        callback(err, res);
                                    } else {
                                        try {
                                            proxyprinttodiv("GetWidMaster after getclean before packed", res, 38);
                                            res = pack_up_params(res, command, "getwidmaster");
                                            proxyprinttodiv("GetWidMaster after getclean after packed", res, 38);

                                            proxyprinttodiv('getwidmaster command II-4', command, 38);
                                            proxyprinttodiv('getwidmaster after getclean ', res, 38);
                                            // if (parameters && parameters.command && parameters.command.execute === "ConvertFromDOTdri") {
                                            if (command && command.getwidmaster && command.getwidmaster.execute === "ConvertFromDOTdri") {
                                                //res = ConvertFromDOTdri(res);

                                                console.log("??? command callback 1 \n" + JSON.stringify(command, '-', 4));
                                                proxyprinttodiv("??? getwidmaster command callback 1 ", command, 38);
                                                debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                                                    0: inbound_parameters,
                                                    1: res
                                                }, 6);

                                                callback(err, res);
                                            } else { // the detault is to return dot notation...so old code does not break
                                                res = ConvertToDOTdri(res);
                                                proxyprinttodiv('getwidmaster packed parameters after convert', res, 38);
                                                console.log("??? command callback 2 \n" + JSON.stringify(command, '-', 4));
                                                proxyprinttodiv("??? getwidmaster command callback 2 ", command, 38);
                                                debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                                                    0: inbound_parameters,
                                                    1: res
                                                }, 6);

                                                callback(err, res);
                                            }
                                        } // end try 
                                        catch (err) {
                                            //callback ({"status":"there was an error"}, {"function":"getwidmaster"}); 
                                            var finalobject = createfinalobject({"result": "getwidmaster_getclean"}, {}, "getwidmaster_getclean", err, res);
                                            callback(finalobject.err, finalobject.res);
                                        } 
                                    }
                                });
                            } else {
                                proxyprinttodiv('getwidmaster command III-5', command, 38);
                                res = pack_up_params(res, command, "getwidmaster");
                                proxyprinttodiv('getwidmaster packed parameters', res, 38);
                                proxyprinttodiv('getwidmaster command III', command, 38);
                                // if (parameters && parameters.command && parameters.command.execute === "ConvertFromDOTdri") {
                                if (command && command.getwidmaster && command.getwidmaster.execute === "ConvertFromDOTdri") {
                                    //res = ConvertFromDOTdri(res);

                                    console.log("??? command callback 3 \n" + JSON.stringify(command, '-', 4));
                                    proxyprinttodiv("??? getwidmaster command callback 3 ", command, 38);
                                    debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                                        0: inbound_parameters,
                                        1: res
                                    }, 6);

                                    callback(err, res);
                                } else { // the detault is to return dot notation...so old code does not break
                                    res = ConvertToDOTdri(res);

                                    console.log("??? command callback 4 \n" + JSON.stringify(command, '-', 4));
                                    proxyprinttodiv("??? getwidmaster command callback 4 ", command, 38);
                                    debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                                        0: inbound_parameters,
                                        1: res
                                    }, 6);

                                    callback(err, res);
                                }
                            }
                        } else {
                            proxyprinttodiv('getwidmaster command III-5', command, 38);
                            res = pack_up_params(res, command, "getwidmaster");
                            proxyprinttodiv('getwidmaster packed parameters', res, 38);
                            proxyprinttodiv('getwidmaster command III', command, 38);
                            // if (parameters && parameters.command && parameters.command.execute === "ConvertFromDOTdri") {
                            if (command && command.getwidmaster && command.getwidmaster.execute === "ConvertFromDOTdri") {
                                //res = ConvertFromDOTdri(res);

                                console.log("??? command callback 3 \n" + JSON.stringify(command, '-', 4));
                                proxyprinttodiv("??? getwidmaster command callback 3 ", command, 38);
                                debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                                    0: inbound_parameters,
                                    1: res
                                }, 6);

                                callback(err, res);
                            } else { // the detault is to return dot notation...so old code does not break
                                res = ConvertToDOTdri(res);

                                console.log("??? command callback 4 \n" + JSON.stringify(command, '-', 4));
                                proxyprinttodiv("??? getwidmaster command callback 4 ", command, 38);
                                debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                                    0: inbound_parameters,
                                    1: res
                                }, 6);

                                callback(err, res);
                            }
                        }
                    } // end try 
                    catch (err) {
                        //callback ({"status":"there was an error"}, {"function":"getwidmaster"}); 
                        var finalobject = createfinalobject({"result": "getwidmaster_getwidmongo"}, {}, "getwidmaster_getwidmongo", err, res);
                        callback(finalobject.err, finalobject.res);
                    } 
                }
            }); // end get wid mongo
        } // end try 
        catch (err) {
            //callback ({"status":"there was an error"}, {"function":"getwidmaster"}); 
            var finalobject = createfinalobject({"result": "getwidmaster"}, {}, "getwidmaster", err, inbound_parameters);
            callback(finalobject.err, finalobject.res);
        }
    };


    // *** GetDTOObject ***
    // Purpose: Pulls the schema for objects
    exports.getdtoobject = getdtoobject = function getdtoobject(obj, command, callback) {
        try {
            proxyprinttodiv("getdtoobject input obj: ", obj, 38);
            var inbound_parameters = JSON.parse(JSON.stringify(arguments));

            var dtotype;
            var dtoobject = {};

            // extend(true, dtoobject, obj);

            //dtoobject["metadata"]["method"] = "string";
            if (!obj["metadata"]) {
                obj["metadata"] = {}
            }
            if (!obj["metadata"]["method"]) {
                obj["metadata"]["method"] = "defaultdto"
            }

            function recurseobj(params) {
                var dtolist = {};
                var dtoobj = {};
                var metadata = {};
                var tempobj = {};

                var inobj = JSON.parse(JSON.stringify(params));

                //if we get an array in (usally happens on the recurse)
                if (inobj instanceof Array) {
                    proxyprinttodiv("inobj instanceof array", inobj, 38);
                    var mergedObj = {};
                    var tempArray = [];


                    for (var i in inobj) {
                        // if our array is just a list of strings
                        if (typeof inobj[i] === 'string') {
                            tempArray.push("string");
                            //tempArray.push(inobj[i]);
                        } else {
                            extend(true, mergedObj, recurseobj(inobj[i]));
                        }
                    }

                    // there has to be something in the merge object to push it onto the return
                    if (Object.keys(mergedObj).length > 0) {
                        tempArray.push(mergedObj);
                    }

                    proxyprinttodiv("tempArray", tempArray, 38);
                    return tempArray;
                }


                for (var eachparm in inobj) {
                    if (inobj.hasOwnProperty(eachparm)) {
                        //proxyprinttodiv("getdtoobject dtolist I", dtolist, 38);
                        //proxyprinttodiv("getdtoobject eachparm", eachparm, 38);
                        //proxyprinttodiv("getdtoobject inobj", inobj[eachparm], 38);

                        if (eachparm === "metadata") {
                            metadata = inobj['metadata'];
                            for (var eachitem in metadata) {
                                if (metadata.hasOwnProperty(eachitem)) {
                                    //proxyprinttodiv("getdtoobjecteachitem", eachitem, 38);
                                    //proxyprinttodiv("getdtoobject dtolist II", dtolist, 38);
                                    if ((eachitem !== "method") && (eachitem !== "inherit")) {
                                        tempobj = {};
                                        tempobj[eachitem] = metadata[eachitem]['type'];
                                        extend(true, dtolist, tempobj);
                                        // eachitem would be a child
                                        if ((metadata[eachitem]['type'] === "onetomany" ||
                                                metadata[eachitem]['type'] === "jsononetomany") &&
                                            (!isArray(inobj[eachitem]))) {
                                            tempArray = [];
                                            tempArray.push(inobj[eachitem]);
                                            delete inobj[eachitem];
                                            inobj[eachitem] = tempArray;
                                        }

                                        proxyprinttodiv("getdtoobject dtolist", dtolist, 38);
                                    }
                                }
                            } // for metadata
                        } // if metadata

                        if (isObject(inobj[eachparm])) {
                            dtoobj[eachparm] = recurseobj(inobj[eachparm])
                        } else if (eachparm instanceof Array) {
                            dtoObject[eachparm].push(recurseobj[eachparam]);
                        } else { // if not object
                            dtoobj[eachparm] = "string";
                        }
                    }
                } // for eachparm


                if (Object.keys(dtolist).length !== 0) {
                    if (!inobj.command) {
                        dtoobj.command = {};
                    }
                    dtoobj.command.dtolist = dtolist;
                }

                // if (!dtoobj.command || Object.keys(dtoobj.command).length === 0) {
                //     delete dtoobj.command;
                // }

                // inobj.command.deepdtolist = dto;
                // inobj.command.inherit = dto;
                proxyprinttodiv("In GetDTOObject before return -- we created dto -- :", dtoobj, 38);
                return dtoobj;
            } // end fn recurse

            // function recurseobj(params) {
            //     var dtolist={}
            //     var dtoobj={};
            //     var metadata={};
            //     var tempobj={};
            //     var inobj={};
            //     var eachparm;
            //     var eachitem;
            //     extend(true, inobj, params)

            //     for (eachparm in inobj) {
            //         //proxyprinttodiv("getdtoobject dtolist I", dtolist, 17);
            //         //proxyprinttodiv("getdtoobject eachparm", eachparm, 17);
            //         //proxyprinttodiv("getdtoobject inobj", inobj[eachparm], 17);

            //         if (eachparm==="metadata") {
            //             metadata = inobj['metadata']
            //             for (eachitem in metadata) {
            //                 //proxyprinttodiv("getdtoobjecteachitem", eachitem, 17);
            //                 //proxyprinttodiv("getdtoobject dtolist II", dtolist, 17);
            //                 if ((eachitem!=="method") && (eachitem!=="inherit")) {
            //                     tempobj={}
            //                     tempobj[eachitem]=metadata[eachitem]['type']
            //                     extend(true, dtolist, tempobj)
            //                     //proxyprinttodiv("getdtoobject dtolist", dtolist, 17);
            //                     }
            //                 } // for metadata
            //             } // if metadata

            //         if (isObject(inobj[eachparm])) {
            //             dtoobj[eachparm]=recurseobj(inobj[eachparm])
            //         }
            //         else { // if not object
            //             dtoobj[eachparm]="string"
            //             }
            //         } // for eachparm


            //     if (Object.keys(dtolist).length !== 0) {
            //         if (!inobj.command) {dtoobj.command={};}
            //         dtoobj.command.dtolist = dtolist
            //         } 

            //         // inobj.command.deepdtolist = dto;
            //         // inobj.command.inherit = dto;
            //     proxyprinttodiv("In GetDTOObject before return -- we created dto -- :", dtoobj, 17);
            //     return dtoobj
            //     } // end fn recurse

            dtoobject = recurseobj(obj);

            //dtoobject = recurseobj(obj);
            proxyprinttodiv("getdtoobject after created dtoobject: ", dtoobject, 38);
            // dtoobject["metadata.method"] = "string";
            // if (!obj["metadata.method"]) {obj["metadata.method"] = "defaultdto"}

            //if (command && command.getwidmaster && command.getwidmaster.dtotype) {
            if (command && command.dtotype) {
                dtotype = command.dtotype;
            } else {
                //dtotype = obj.metadata.method;
                dtotype = obj['metadata']['method'];
            }
            if ((dtotype !== "defaultdto") && (dtotype !== obj.wid)) {
                proxyprinttodiv("getdtoobject about to getwidmaster dtotype ", dtotype, 38);
                execute({
                    "executethis": "getwidmaster",
                    "wid": dtotype,
                    "command.getwidmaster.convertmethod": "dto",
                    "command.getwidmaster.execute": "ConvertFromDOTdri"
                }, function (err, res) {
                    // If error, bounce out
                    if (err && Object.keys(err).length > 0) {
                        callback(err, res);
                    } else {
                        try {                        
                            proxyprinttodiv("getdtoobject input res[0] ", res, 38);
                            if (res && (Object.keys(res[0]).length !== 0)) {
                                dtoobject = res[0]
                            }

                            proxyprinttodiv("getdtoobject input dtoobject +++++++ ", dtoobject, 38);
                            debugfn("getdtoobject code generator", "getdtoobject", "get", "code", 2, 1, {
                                0: inbound_parameters,
                                1: dtoobject
                            }, 6);

                            callback(null, dtoobject);
                        } // end try
                        catch (err) {
                            //callback ({"status":"there was an error"}, {"function":"getdtoobject"}); 
                            var finalobject = createfinalobject({"result": "getdtoobject"}, {}, "getdtoobject", err, res);
                            callback(finalobject.err, finalobject.res);
                        }
                    }
                }); // end execute
            } else { // if there is no dtoType or obj.wid then call back with a blank dtoObject
                debugfn("getdtoobject code generator", "getdtoobject", "get", "code", 2, 1, {
                    0: inbound_parameters,
                    1: dtoobject
                }, 6);

                callback(null, dtoobject);
            } // end else
        } // end try
        catch (err) {
            //callback ({"status":"there was an error"}, {"function":"getdtoobject"}); 
            var finalobject = createfinalobject({"result": "getdtoobject"}, {}, "getdtoobject", err, inbound_parameters);
            callback(finalobject.err, finalobject.res);
        }
    };

    // *** GetWidMongo ***
    // Purpose: Builds a base object built up from relationships
    // Notes: returns a made up dto base on maximum number of relationships, etc
    exports.getWidMongo = getWidMongo = function getWidMongo(widInput, command, preamble, level, excludeset, callback) {
        try {
            var inbound_parameters = {};
            inbound_parameters = JSON.parse(JSON.stringify(arguments));

            // local vars
            var moreDTOParameters = [];
            var targetwid = "";
            var executeobject = {};
            var parameterobject;
            var err;
            var res;
            var params;
            var dtolist = {};

            function debugvars(varlist) {
                var allvars = {
                    1: {
                        "widInput": widInput,
                        "preamble": preamble,
                        "level": level,
                        "parameterobject": parameterobject,
                        "moreDTOParameters": moreDTOParameters,
                        "targetwid": targetwid,
                        "eachresult": '',
                        "key": '',
                        "rightparameters": {},
                        "executeobject": executeobject,
                        "err": err,
                        "dtolist": dtolist,
                        "params": params
                    }
                };
                var resultObj = {};
                var vargroup;

                if (!varlist) {
                    for (var eachvar in allvars) {
                        varlist.push(eachvar);
                    }
                }

                for (var eachgroup in varlist) {
                    vargroup = varlist[eachgroup];
                    resultObj = jsonConcat(resultObj, allvars[vargroup]);
                }
                return resultObj;
            }

            excludeset[widInput] = widInput; // keep track of what we have done so we do not do it again

            async.series([
                    // getwid
                    function step1(cb) {
                        try {                        
                            // Sample error  
                            // throw({'Rocks': 'are hard'});
                            proxyprinttodiv('Function getwidmongo step 1 hit with widInput:', widInput, 38);
                            proxyprinttodiv('Function getwidmongo step 1 hit with command:', command, 38);
                            if (!level) {
                                level = 20
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
                            //executeobject["command.convertmethod"]="toobject";
                            executeobject['executethis'] = 'getwid';

                            execute(executeobject, function (err, res) { // getwid
                                // If error, bounce out
                                if (err && Object.keys(err).length > 0) {
                                    // callback(err, results);
                                    callback(err, res);
                                } else {
                                    try {
                                        proxyprinttodiv('Function getwidmongo getwid res', res, 38);
                                        res = res[0];

                                        if (Object.keys(res).length != 0) {
                                            parameterobject = res;
                                            proxyprinttodiv('Function getwidmongo getwid res', res, 38);
                                            //moreDTOParameters=parameterobject;  &&& taken out roger 2/7
                                            cb(null); // add
                                        } else { // if no object
                                            parameterobject = {};
                                            targetwid = ""; // if no object to follow then targetwid="";
                                            cb(null);
                                        }
                                    } // end try
                                    catch (err) {
                                        var finalobject = createfinalobject({"result": "getWidMongo_execute(executeobject"}, {}, "getWidMongo_execute(executeobject", err, res);
                                        cb(finalobject.err, finalobject.res);
                                    }
                                }
                            }); // end execute   

                        } // end try
                        catch (err) {
                            var finalobject = createfinalobject({"result": "getWidMongo_async_step1"}, {}, "getWidMongo_async_step1", err, res);
                            cb(finalobject.err, finalobject.res);
                        }
                    }, // end step1
                    // *** Override ***
                    // Date: 10 MAR 14
                    // Purpose: Looks at the current object and determines if we need to grab new data and override values on properties
                    function processOverride(cb){

                        // Sample error  
                        // throw({'Emeralds': 'make cities'});

                        if(command.getwidmaster.convertmethod !== "donotoverride" && Object.keys(parameterobject).length != 0 &&
                            parameterobject.metadata && parameterobject.metadata.inherit && parameterobject.metadata.inherit.override) {
                                
                            proxyprinttodiv("GetWidMongo start processOverride", parameterobject, 38);
                            // list of overrides to get
                            var overrides = parameterobject.metadata.inherit.override;
                            delete parameterobject.metadata.inherit;
                            var overrideData = [];
                            
                            // make a seperate getwidmaster call for each override to collect all the override data                        
                            async.mapSeries(overrides, function (overrideToGet, cbMap) {
                                // next tick?
                                execute({
                                    "executethis": "getwidmaster",
                                    "wid": overrideToGet,
                                    "command.getwidmaster.convertmethod":"nowid",
                                    "command.getwidmaster.dtotype":""
                                }, function (err, res) {
                                    // If error, bounce out
                                    if (err && Object.keys(err).length > 0) {
                                        // callback(err, results);
                                        callback(err, res);
                                    } else {
                                        try {
                                            proxyprinttodiv('In process override got additional override data', res, 38);
                                            // need 0 check on res
                                            overrideData.push(res[0]);
                                            // extend?
                                            cbMap(null);
                                        } // end try
                                        catch (err) {
                                            var finalobject = createfinalobject({"result": "getWidMongo_execute_getwidmaster"}, {}, "getWidMongo_execute_getwidmaster", err, res);
                                            cbMap(finalobject.err, finalobject.res);
                                        }
                                    } // end else
                                });
                            }, function (err, res) {
                                // If error, bounce out
                                if (err && Object.keys(err).length > 0) {
                                    // callback(err, results);
                                    callback(err, res);
                                } else {
                                    try {
                                        // iterate over the override data and override the parameterobject with it
                                        overrideData.forEach(function (element, index, array) {
                                            proxyprinttodiv("GetWidMongo -- override! --", element, 99);
                                            // TODO remove these
                                            delete element.metadata;
                                            delete element.wid;
                                            extend(true, parameterobject, element);
                                        });
                                        proxyprinttodiv("GetWidMongo override processing done", parameterobject, 99);
                                        cb(null);
                                    }
                                    catch (err) {
                                        var finalobject = createfinalobject({"result": "getWidMongo_processoverride_execute_II"}, {}, "getWidMongo_processoverride_execute_II", err, res);
                                        cb(finalobject.err, finalobject.res);
                                    }
                                }
                            }); // end async
                        } else {
                            proxyprinttodiv("GetWidMongo no override to process", parameterobject, 38);
                            cb(null);
                        }
                    },
                    function step2(cb) {
                        if (targetwid != "") {
                            async.series([ // asynch step1n2
                                    function step2n1(cb1) {
                                        //proxyprinttodiv('Function getwidmongo step 2n1 hit', null, 38);
                                        executeobject = {};
                                        executeobject["mongosetfieldsexclude"] = excludeset;
                                        executeobject["mongowid"] = targetwid;
                                        executeobject["mongorelationshiptype"] = "attributes";
                                        executeobject["mongorelationshipmethod"] = "all";
                                        executeobject["mongorelationshipdirection"] = "forward";
                                        executeobject["mongowidmethod"] = "";
                                        // executeobject["command.execute"] = "ConvertFromDOTdri",
                                        // executeobject["command.convertmethod"] = "toobject";
                                        executeobject["dtotype"] = "";
                                        executeobject["executethis"] = 'querywid';
                                        execute(executeobject, function (err, res) {
                                            // If error, bounce out
                                            if (err && Object.keys(err).length > 0) {
                                                cb1(err, 'step2n1');
                                            } else {
                                                try {   
                                                    proxyprinttodiv('Function getwidmongo query res', res, 38);
                                                    if (Object.keys(res).length !== 0) {
                                                        moreDTOParameters = res;
                                                    }
                                                    cb1(null, 'step2n1');                                                
                                                }
                                                catch (err) {
                                                    var finalobject = createfinalobject({"result": "getWidMongo_processoverride_execute_II"}, {}, "getWidMongo_processoverride_execute_II", err, 'step2n1');
                                                    cb1(finalobject.err, finalobject.res);
                                                }
                                            }
                                        });
                                    } // end step1n2
                                ],
                                function (err, res) {
                                    // If error, bounce out
                                    if (err && Object.keys(err).length > 0) {
                                        cb(err, res);
                                    }else{
                                        proxyprinttodiv('Function getwidmongo query part 2', res, 38);
                                        cb(null, 'two');
                                    }
                                });
                        } // end if
                        else {
                            cb(null, 'two');
                        }
                    }, // end step2

                    // function step2B(cb) { // to handle looing up to parent (manytoone)
                    //     if (targetwid != "") {
                    //         async.series([ // asynch step1n2
                    //                 function step2n1(cb1) {
                    //                     //proxyprinttodiv('Function getwidmongo step 2n1 hit', null, 38);
                    //                     executeobject = {};
                    //                     executeobject["mongowid"] = targetwid;
                    //                     executeobject["mongorelationshiptype"] = "attributes";
                    //                     executeobject["mongorelationshipmethod"] = "all";
                    //                     executeobject["mongorelationshipdirection"] = "backward";
                    //                     executeobject["mongowidmethod"] = "";
                    //                     executeobject["mongorelationshiplink"] = "manytoone";
                    //                     // executeobject["command.execute"] = "ConvertFromDOTdri",
                    //                     // executeobject["command.convertmethod"] = "toobject";
                    //                     executeobject["dtotype"] = "";
                    //                     executeobject["executethis"] = 'querywid';
                    //                     executeobject["mongosetfieldsexclude"]=excludeset;
                    //                     execute(executeobject, function (err, res) {
                    //                         proxyprinttodiv('Function getwidmongo query manytoone', res, 38);
                    //                         if (Object.keys(res).length !== 0) {
                    //                             for (var eachresult in res) {
                    //                                 moreDTOParameters.push(res[eachresult])
                    //                                 // res is list [{wid:{}},{wid:{}},{wid:{}}] ... if wid not in widset then push
                    //                                 // if (!excludeset[Object.keys(res[eachresult])[0]]) {
                    //                                 //      moreDTOParameters.push(res[eachresult])
                    //                                 //     }                                       
                    //                                 }
                    //                             }
                    //                         cb1(null, 'step2n1');
                    //                         // TODO: figure out the return here
                    //                     });
                    //                 } // end step1n2
                    //             ],
                    //             function (err, res) {
                    //                 if (err) {
                    //                     throw err;
                    //                 }
                    //                 cb(null, 'two');
                    //             });
                    //     } // end if
                    //     else {
                    //         cb(null, 'two');
                    //     }
                    // }, // end step2B

                    function step3(cb) {
                        
                        // Sample error
                        // throw ({'Frisbees': 'are errors'});


                        if (!parameterobject.command) {
                            parameterobject.command = {};
                        }
                        if ((parameterobject["metadata"]) && (command) && (command.getwidmaster) &&
                            (command.getwidmaster.convertmethod === "dto")) {
                            if (!parameterobject.command.inherit) {
                                parameterobject.command.inherit = {};
                            }
                            //if (!parameterobject.command.inherit) {parameterobject.command.inherit = [];
                            if (!parameterobject.command.deepdtolist) {
                                parameterobject.command.deepdtolist = {};
                            }
                            if (!parameterobject.command.dtolist) {
                                parameterobject.command.dtolist = {};
                            }
                        }
                        proxyprinttodiv('Function getwidmongo parameterobject reset', parameterobject, 38);

                        if (moreDTOParameters && moreDTOParameters.length > 0) {
                            var listToDo = [];
                            var rightparameters = {};
                            var left;

                            //proxyprinttodiv('Function getwidmongo moreDTOParameters', moreDTOParameters,38);

                            // note moreDTOParameters is a LIST [{wid1: {}}, wid2: {}}, wid3: {}}]
                            for (var eachresult in moreDTOParameters) { // list, for each item in list
                                for (var key in moreDTOParameters[eachresult]) { // list is {wid : {}} --key = wid
                                    if (moreDTOParameters[eachresult].hasOwnProperty(key)) {
                                        rightparameters = moreDTOParameters[eachresult][key];
                                    }
                                    //rightparameters = moreDTOParameters[eachresult][key];
                                }

                                //left = rightparameters['metadata']['method'];
                                //dtolist[left] = rightparameters['metadata']['method'];
                                // create dto
                                listToDo.push(eachresult);
                            }
                            proxyprinttodiv('Function getwidmongo listToDo', listToDo, 38);

                            async.mapSeries(listToDo, function (eachresult, cbMap) {


                                    async.nextTick(function () {
                                        try {               
                                            // Sample error
                                            // throw ({'Diamonds': 'are forever errors'});

                                            var rightparameters = {};
                                            var params;
                                            var metadataMethod;
                                            proxyprinttodiv('Function getwidmongo inside', eachresult, 38);
                                            proxyprinttodiv('Function getwidmongo moreDTOParameters[eachresult]', moreDTOParameters[eachresult], 38);
                                            for (var key in moreDTOParameters[eachresult]) { // list is {wid : {}} --key = wid
                                                if (moreDTOParameters[eachresult].hasOwnProperty(key)) {
                                                    rightparameters = moreDTOParameters[eachresult][key];
                                                }
                                                //rightparameters = moreDTOParameters[eachresult][key];
                                            }
                                            proxyprinttodiv('Function getwidmongo rightparameters inside ', rightparameters, 38);
                                            // added
                                            // if metadata: {inherit: wid1} then create command: {inherit: { wid1: wid}}


                                            if (level > 0) {

                                                proxyprinttodiv('Function getwidmongo recurse', key, 38);

                                                debugfn("getwidmongo before recusr", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));

                                                debugcolor++;
                                                debugindent++;
                                                //getWidMongo(key, convertmethod, accesstoken, dtotype, rightparameters["metadata"]["method"], level, function (err, params) { 
                                                getWidMongo(key, command, rightparameters["metadata"]["method"], level, excludeset, function (err, params) {
                                                    // If error, bounce out
                                                    if (err && Object.keys(err).length > 0) {
                                                        cbMap(err, params);
                                                    } else {
                                                        try {
                                                            proxyprinttodiv('Function getwidmongo params', params, 38);
                                                            //proxyprinttodiv('Function getwidmongo rightparameters inside II ', rightparameters, 38);
                                                            debugcolor--;
                                                            debugindent--;
                                                            if (Object.keys(params).length !== 0) {
                                                                // added by roger
                                                                if (command && command.getwidmaster && command.getwidmaster.convertmethod === "nowid") {
                                                                    delete params.wid;
                                                                    delete params.metadata.method;
                                                                }

                                                                // added
                                                                if (params.command && params.command.inherit) {
                                                                    extend(true, parameterobject.command.inherit, params.command.inherit);
                                                                    // if (params.command.inherit instanceof Array) {
                                                                    //     for (eachinherit in params.command.inherit) {
                                                                    //         parameterobject.command.inherit.push(params.command.inherit[eachinherit])
                                                                    //         }
                                                                    //     }
                                                                    // else { // this one shoiuld be impossible
                                                                    //     parameterobject.command.inherit.push(params.command.inherit)
                                                                    //     }
                                                                }
                                                                if (params.command && params.command.deepdtolist) {
                                                                    extend(true, parameterobject.command.deepdtolist, params.command.deepdtolist);
                                                                }
                                                                // proxyprinttodiv("--- What i'm looking at parameterobject step1", parameterobject, 38);
                                                                // extend(true, parameterobject.command.inherit, params.command.inherit);
                                                                // proxyprinttodiv("--- What i'm looking at parameterobject step2", parameterobject, 38);
                                                                // //delete params.command


                                                                proxyprinttodiv('Function getwidmongo rightparameters before ', rightparameters, 38);
                                                                //if ((rightparameters["data"]) && (rightparameters["data"]["linktype"]) && 
                                                                //    (rightparameters["data"]["linktype"] === "onetomany") && (command.convertmethod !== "dto"))  {

                                                                //                                    if ((command) && (command.getwidmaster) && (command.getwidmaster.convertmethod === "dto")) {
                                                                //                                        parameterobject[rightparameters["metadata"]["method"]]=params;
                                                                //                                    }
                                                                //                                    else { // if not dto, i.e most of time
                                                                if ((rightparameters) && (rightparameters["linktype"])) {
                                                                    if ((rightparameters["linktype"] === "onetomany") ||
                                                                        (rightparameters["linktype"] === "jsononetomany")) {
                                                                        //if (Object.prototype.toString.call(parameterobject[rightparameters["metadata"]["method"]]) !== '[object Array]') { 
                                                                        if (!isArray(parameterobject[rightparameters["metadata"]["method"]])) {
                                                                            parameterobject[rightparameters["metadata"]["method"]] = [];
                                                                        }
                                                                        parameterobject[rightparameters["metadata"]["method"]].push(params);
                                                                    } else {
                                                                        if ((rightparameters["linktype"] === "onetoone") ||
                                                                            (rightparameters["linktype"] === "manytoone") ||
                                                                            (rightparameters["linktype"] === "jsononetoone")) {
                                                                            parameterobject[rightparameters["metadata"]["method"]] = params;
                                                                        } else {
                                                                            if ((rightparameters["linktype"] === "jsononetoone") ||
                                                                                (rightparameters["linktype"] === "jsononetomany")) {
                                                                                // add code here
                                                                            }
                                                                        }
                                                                    } // end of 2nd else

                                                                    proxyprinttodiv('Function getwidmongo parameterobject II-before', parameterobject, 38);
                                                                    parameterobject['metadata'][rightparameters.metadata.method] = {};
                                                                    parameterobject['metadata'][rightparameters.metadata.method]['type'] =
                                                                        rightparameters["linktype"];

                                                                }
                                                                proxyprinttodiv('Function getwidmongo parameterobject II', parameterobject, 38);
                                                                //                                        } // if not dto else
                                                                //cbMap(null);
                                                            } // if object length                                         
                                                            //else { // if nothing returned
                                                            cbMap(null);
                                                            //}
                                                        } // end try
                                                        catch (err) {
                                                            var finalobject = createfinalobject({"result": "getWidMongo_getWidMongo"}, {}, "getWidMongo_getWidMongo", err, params);
                                                            cbMap(finalobject.err, finalobject.res);
                                                        }
                                                    } // end else
                                                }); // getwidmongo
                                            } // >0level
                                            else {
                                                cbMap(null);
                                            }
                                        } // end try
                                        catch (err) {
                                            var finalobject = createfinalobject({"result": "getWidMongo_async_nexttick"}, {}, "getWidMongo_async_nexttick", err, eachresult);
                                            cbMap(finalobject.err, finalobject.res);
                                        }
                                    }); // added for nexttick
                                },
                                function (err, res) {
                                    // If error, bounce out
                                    proxyprinttodiv('Function getwidmongo end of paramerterobject mapSeries res', res, 38);
                                    if (err && Object.keys(err).length > 0) {
                                        cb(err, res);
                                        // cb(null, 'three');
                                    } else {
                                        cb(null, 'three');
                                    }
                                }); // mapseries
                            // cb(null, 'three') moved up 2/24 by roger
                        } // moreparameters length > 0 
                        else {
                            cb(null, 'three')
                        }
                    },
                    function step4(cb) {

                        // Sample error
                        // throw ({'Hazelnut': 'are peanut errors'});

                        proxyprinttodiv('Function getwidmongo step4', parameterobject, 38);
                        //if (!parameterobject.command.dtolist) { // create dtolist

                        if ((parameterobject["metadata"]) && (command) && (command.getwidmaster) &&
                            (command.getwidmaster.convertmethod === "dto")) {

                            // if ((!parameterobject.command.dtolist) && (Object.keys(dtolist).length > 0)){ // create dtolist
                            //     parameterobject.command.dtolist = dtolist;
                            //     };

                            for (var eachmetadata in parameterobject["metadata"]) {
                                proxyprinttodiv('Function getwidmongo eachmetadata', eachmetadata, 38);
                                proxyprinttodiv('Function getwidmongo parameterobject', parameterobject, 38);
                                if (eachmetadata === "inherit") {

                                    proxyprinttodiv('*** parameterobject["metadata"]["inherit"] ***', parameterobject["metadata"]["inherit"], 38);
                                    proxyprinttodiv('*** parameterobject.command.inherit ***', parameterobject.command.inherit, 38);

                                    // we do not want to extend a string into an object or we will get something like
                                    // inherit":{"0":"b","1":"o","2":"o","3":"k","4":"d","5":"e","6":"f","7":"a","8":"u","9":"l","10":"t","11":"d","12":"t","13":"o"}
                                    // This sections looks for a string then builds an object of {"inheritString":"inheritString"} which extend will not explode
                                    // if(typeof parameterobject["metadata"]["inherit"] === 'string') {
                                    //     var tempObj = {};
                                    //     var inheritString = parameterobject["metadata"]["inherit"];
                                    //     tempObj[inheritString] = inheritString;
                                    //     parameterobject["metadata"]["inherit"] = tempObj;
                                    //     proxyprinttodiv('*** parameterobject["metadata"]["inherit"] *** FIXED ***', parameterobject["metadata"]["inherit"], 38);
                                    // }

                                    extend(true, parameterobject.command.inherit, parameterobject["metadata"]["inherit"]);

                                    proxyprinttodiv('*** parameterobject.command.inherit ***', parameterobject.command.inherit, 38);

                                    //parameterobject.command.inherit[parameterobject["metadata"]["inherit"]] = parameterobject["metadata"]["inherit"];  
                                    // get inherit value from metadata.inherit and move it to command.inherit -- handle mult inherits
                                    // if (parameterobject["metadata"]["inherit"] instanceof Array) {
                                    //     for (eachinherit in parameterobject["metadata"]["inherit"]) {
                                    //         parameterobject.command.inherit.push(
                                    //             parameterobject["metadata"]["inherit"][eachinherit])
                                    //         }
                                    //     }
                                    // else { // if not array then just copy over
                                    //     parameterobject.command.inherit.push(
                                    //         parameterobject["metadata"]["inherit"])
                                    //     }
                                }
                                // creates a list that looks like this:
                                // command.inherit: {a:a, b:b c:c}
                                else { // create deepdtolist, including current metadata
                                    if (eachmetadata === "method") {
                                        //parameterobject.command.deepdtolist[parameterobject.metadata.method]=parameterobject.metadata.method;
                                        //parameterobject.command.dtolist[parameterobject.metadata.method]=parameterobject.metadata.method;
                                    } else {
                                        proxyprinttodiv('Function getwidmongo parameterobject II', parameterobject, 38);
                                        if (
                                            (parameterobject['metadata'][eachmetadata]) &&
                                            (parameterobject['metadata'][eachmetadata]['type']) &&
                                            (
                                                (parameterobject['metadata'][eachmetadata]['type'] === "onetomany") ||
                                                (parameterobject['metadata'][eachmetadata]['type'] === "onetoone") ||
                                                (parameterobject['metadata'][eachmetadata]['type'] === "jsononetomany") ||
                                                (parameterobject['metadata'][eachmetadata]['type'] === "jsononetoone") ||
                                                (parameterobject['metadata'][eachmetadata]['type'] === "manytoone")
                                            )
                                        ) {
                                            proxyprinttodiv('Function getwidmongo parameterobject III', parameterobject, 38);
                                            parameterobject.command.deepdtolist[eachmetadata] = parameterobject.metadata[eachmetadata]['type'];
                                            parameterobject.command.dtolist[eachmetadata] = parameterobject.metadata[eachmetadata]['type'];
                                            // creates a list that looks like this:
                                            // command.inherit: {adto:onetomany bdto:onetomany cdto>: onetoone}
                                        }
                                    }
                                }
                            } // for

                            parameterobject["wid"] = "string";
                            parameterobject["metadata"]["method"] = "string";

                            // system defaults
                            if (isObject(parameterobject["metadata"]["inherit"])) {
                                extend(true, parameterobject.command.inherit, parameterobject["metadata"]["inherit"])
                            } else {
                                executeobject = {};
                                executeobject[parameterobject.metadata.inherit] = parameterobject.metadata.inherit;
                                extend(true, parameterobject.command.inherit, executeobject)
                            }
                            //extend(true, parameterobject.command.inherit, {'defaultsystemactions':'defaultsystemactions'});
                            parameterobject.command.inherit['defaultsystemactions'] = 'defaultsystemactions';
                            //parameterobject.command.inherit.push('defaultsystemactions')
                            //parameterobject.command.inherit=arrayUnique(parameterobject.command.inherit)
                        
                        // throw ({'Hazelnut': 'Nutella errors'});

                            parameterobject.command.dtolist['systemdto'] = 'onetoone';
                            parameterobject.command.deepdtolist['systemdto'] = 'onetoone';


                        } // if dto

                        proxyprinttodiv("--- What i'm looking at parameterobject step3 ---", parameterobject, 38);

                        debugfn("getwidmongo end step4", "getwidmongo", "get", "end", debugcolor, debugindent, debugvars([1]));
                        cb(null, 'four');
                    }
                ],
                function (err, results) {
                    // If error, bounce out
                    if (err && Object.keys(err).length > 0) {
                        callback(err, results);
                    } else {
                        try {        
                            if (Object.keys(parameterobject.command).length === 0) {
                                delete parameterobject.command
                            }
                            debugfn("getWidMongo code generator", "getWidMongo", "get", "code", 2, 1, {
                                0: inbound_parameters,
                                1: parameterobject
                            }, 6);

                            callback(null, parameterobject);
                        } // end try
                        catch (err) {
                            var finalobject = createfinalobject({"result": "getWidMongo_end_async"}, {}, "getWidMongo_end_async", err, results);
                            callback(finalobject.err, finalobject.res);
                        }
                    }
                });
        } // end try
        catch (err) {
            var finalobject = createfinalobject({"result": "getWidMongo"}, {}, "getWidMongo", err, inbound_parameters);
            callback(finalobject.err, finalobject.res);
        }
    };

    exports.getclean = getclean = function getclean(resultObj, command, callback) {
        try {
            var inbound_parameters = {};
            inbound_parameters = JSON.parse(JSON.stringify(arguments));

            var bigdto = {};
            var dtoobject = {};
            var outobj = {};
            var err = {};
            var dtoname;
            var index;

            proxyprinttodiv('In __getclean__ start: ', command, 38);

            async.series([
                    function step1(cb) { // getdto
                        proxyprinttodiv('In __getclean__ resultObj: ', resultObj, 38);
                        getdtoobject(resultObj, command, function (err, res) {
                            // If error, bounce out
                            if (err && Object.keys(err).length > 0) {
                                cb(err, res);
                            } else {
                                proxyprinttodiv('In __getclean__ step1 with res: ', res, 38);
                                proxyprinttodiv('In __getclean__ step1 command: ', command, 38);
                                dtoobject = res;
                                proxyprinttodiv('In __getclean__ step1 with dtoobject: ', dtoobject, 38);
                                cb(null);
                            }
                        });
                    },
                    function step2(cb) { // getaggressivedto

                        throw ({'Saphires': 'blue errors'});

                        proxyprinttodiv('In __getclean__ step2 with before if stament getWidMongo: ', resultObj, 38);
                        // if we have the root dto do not go off and get it again
                        if (resultObj.wid !== resultObj.metadata.method) {
                            proxyprinttodiv('In __getclean__ step2 with before getWidMongo: ', resultObj, 38);

                            // add logic to look for dtotype
                            var dtoToGet = resultObj.metadata.method;
                            execute({
                                "executethis": "getwidmaster",
                                "wid": dtoToGet,
                                "command.getwidmaster.execute": "ConvertFromDOTdri",
                                "command.getwidmaster.convertmethod": "dto"
                                //"command.inheritflag":"false"
                            }, function (err, res) {
                                // If error, bounce out
                                if (err && Object.keys(err).length > 0) {
                                    cb(err, res);
                                } else {
                                    bigdto = res[0];
                                    proxyprinttodiv('In __getclean__ bigdto ', bigdto, 38);
                                    cb(null);
                                }
                            });
                        } else {
                            proxyprinttodiv('In __getclean__ step2 else bigdto: ', bigdto, 38);
                            // in the case of having a root dto
                            bigdto = dtoobject;
                            cb(null);
                        }
                    },
                    function step3(cb) { // process inherit, override, default
                        proxyprinttodiv('<<< Get_Clean step3 resultObj >>', resultObj, 38);
                        var listToDo = [];
                        var inheritobject;

                        // if inherit
                        proxyprinttodiv('<<< Get_Clean step3 bigdto >>', bigdto, 38);
                        if (bigdto && bigdto.command && bigdto.command.inherit) {

                            // added by joe, built for dealing with diffrent cases of inherit
                            // handel override
                            proxyprinttodiv('<<< bigdto.command.inherit.override >>', bigdto.command.inherit.override, 38);

                            // we have overrides go ahead and load them up
                            // if (bigdto.command.inherit.override) {
                            //     for (var eachkey in bigdto.command.inherit.override) {
                            //         listToDo.push({
                            //             "override": bigdto.command.inherit.override[eachkey]
                            //         });
                            //     }
                            // }
                            if (bigdto.command.inherit.default) {
                                for (var eachkey in bigdto.command.inherit.default) {
                                    listToDo.push({
                                        "default": bigdto.command.inherit.default [eachkey]
                                    });
                                }
                            }
                            // else if (bigdto.command.inherit) {
                            //     for (var eachkey in bigdto.command.inherit) {
                            //         listToDo.push(eachkey);
                            //     }
                            // }

                            // for (var eachkey in bigdto.command.inherit) {
                            //         listToDo.push(eachkey);
                            // }

                            proxyprinttodiv('<<< Get_Clean listToDo', listToDo, 38);

                            proxyprinttodiv('<<< Get_Clean bigdto.command', bigdto.command, 38);
                            proxyprinttodiv('<<< Get_Clean dtoobject.command', dtoobject.command, 38);
                            proxyprinttodiv('<<< Get_CLean before call to execute command >>>', command, 38);


                            delete dtoobject.command;
                            delete bigdto.command; // added by joe to delete the command obj so we do not get a blank command object after deep filter

                            //if (listToDo.length > 0 && command && command.inheritflag === "true") { // changed by joe
                            if (listToDo.length > 0 && command && command.getwidmaster.inheritflag === "true") {
                                async.mapSeries(listToDo, function (eachresult, cbMap) {
                                    async.nextTick(function () {
                                        try {
                                            // throw ({'Sample error': 'step_3_async errors'});
                                            
                                            proxyprinttodiv('<<< Get_Clean execute firing !!!! >>>', eachresult[Object.keys(eachresult)[0]], 38);
                                            execute({
                                                "executethis": "getwidmaster",
                                                "wid": eachresult[Object.keys(eachresult)[0]],
                                                "command.getwidmaster.execute": "ConvertFromDOTdri",
                                                //"command.convertmethod":"nowid",
                                                "command.getwidmaster.inheritflag": "false"
                                            }, function (err, res) {
                                                if (err && Object.keys(err).length > 0) {
                                                    cbMap(err, res);
                                                } else {   
                                                    try {
                                                        if ((res.length > 0) && (Object.keys(res[0]).length > 0)) {

                                                            inheritobject = res[0];
                                                            delete inheritobject['wid'];
                                                            proxyprinttodiv('inheritobject before insertbydtotype in inherit: ', inheritobject, 38);
                                                            proxyprinttodiv('bigdto before insertbydtotype in inherit: ', bigdto, 38);
                                                            proxyprinttodiv('resultObj before insertbydtotype in inherit: ', resultObj, 38);
                                                            proxyprinttodiv('command before insertbydtotype in inherit: ', command, 38);
                                                            // insertbydtotype(resultObj, bigdto, inheritobject, command); // changed by joe
                                                            // sets the inherit command to override or default -- this is deleted in insertbydtotype
                                                            command.inherit = Object.keys(eachresult)[0];
                                                            resultObj = insertbydtotype(resultObj, bigdto, inheritobject, command);
                                                            proxyprinttodiv('resultObj after insertbydtotype in inherit: ', resultObj, 38);
                                                            cbMap(null);
                                                        } // end if
                                                        else { // if no result
                                                            cbMap(null); 
                                                        }
                                                    } // end try
                                                    catch (err) {
                                                        //callback ({"status":"there was an error"}, {"function":"getclean"});
                                                        var finalobject = createfinalobject({"result": "getclean_execute_getwidmaster"}, {}, "getclean_execute_getwidmaster", err, res);
                                                        cbMap(finalobject.err, finalobject.res);
                                                    }
                                                }
                                            }); // end execute
                                        } // end try
                                        catch (err) {
                                            var finalobject = createfinalobject({"result": "getclean_async_nexttick"}, {}, "getclean_async_nexttick", err, res);
                                            cbMap(finalobject.err, finalobject.res);
                                        }
                                    }); // end next tick
                                }, function (err, res) {
                                    if (err && Object.keys(err).length > 0) {
                                        cb(err, res);
                                    }else{   
                                        cb(null);
                                    }
                                }); //end mapseries
                            } // if listdto length
                            else {
                                cb(null);
                            }
                        } // end if bigdto
                        else { // if no bigdto
                            cb(null);
                        }
                    } // end step 3
                ], // series list

                function (err, res) {
                    //joe - temp fix for addThis
                    // if(resultObj.hasOwnProperty("addthis")) {
                    //     var addthis;

                    //     _add_this = resultObj['addthis'];
                    //     delete resultObj['addthis'];
                    //     for (var i in _add_this) {
                    //         resultObj[i] = _add_this[i];
                    //     }
                    // }

                    // this function removes
                    // function find_and_replace_addthis(obj) {
                    //     var _in_obj = {};

                    //     extend(true, _in_obj, obj);

                    //     if(_in_obj.hasOwnProperty("addthis")) {
                    //         var _add_this = _in_obj["addthis"];
                    //         delete _in_obj["addthis"];
                    //         for (var i in _add_this) {
                    //             _in_obj[i] = _add_this[i];
                    //         }
                    //     }

                    //     for (var each_param in _in_obj) {
                    //         if (isObject(_in_obj[each_param])) {
                    //             _in_obj[each_param] = find_and_replace_addthis(_in_obj[each_param]);
                    //         } 
                    //     } // for each_param

                    //     return _in_obj;
                    // } // end fn recurse

                    function find_and_replace_addthis(obj) {
                        // throw ({'Sample error': 'find_replace errors'});

                        proxyprinttodiv('<<< Get_Clean find_and_replace_addthis obj >>>', obj, 38);
                        var _in_obj;

                        if (obj instanceof Array) {
                            _in_obj = [];
                            extend(true, _in_obj, obj);
                        } else {
                            _in_obj = {};
                            extend(true, _in_obj, obj);
                        }

                        proxyprinttodiv('<<< Get_Clean find_and_replace_addthis _in_obj >>>', _in_obj, 38);

                        if (_in_obj.hasOwnProperty("addthis")) {
                            var _add_this = _in_obj["addthis"];
                            delete _in_obj["addthis"];
                            for (var i in _add_this) {
                                if (_add_this.hasOwnProperty(i)) {
                                    _in_obj[i] = _add_this[i];
                                }
                            }
                        }

                        for (var each_param in _in_obj) {
                            if (_in_obj.hasOwnProperty(each_param)) {
                                if (isObject(_in_obj[each_param])) {
                                    _in_obj[each_param] = find_and_replace_addthis(_in_obj[each_param]);
                                }
                            }
                        } // for each_param

                        return _in_obj;
                    } // end fn recurse

                    proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter resultObj >>>', resultObj, 38);
                    proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter bigdto >>>', bigdto, 38);
                    proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter dtoobject >>>', dtoobject, 38);
                    proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter command >>>', command, 38);

                    if (!command) {
                        command = {}
                    }
                    if (!command.deepfilter) {
                        command.deepfilter = {}
                    }
                    if (!command.deepfilter.convert) {
                        command.deepfilter.convert = true
                    }

                    deepfilter(resultObj, dtoobject, command, function (err, resultObj) { // changed by joe
                        // If error, bounce out
                        if (err && Object.keys(err).length > 0) {
                            callback(err, resultObj);
                        } else {    
                            try {
                                //deepfilter(resultObj, bigdto, command, function (err, resultObj){
                                delete command.deepfilter;
                                proxyprinttodiv('<<< Get_Clean before call back afterdeepfilter resultObj >>>', resultObj, 38);
                                debugfn("getclean code generator", "getclean", "get", "code", 2, 1, {
                                    0: inbound_parameters,
                                    1: resultObj
                                }, 6);
                                if (command && command.getwidmaster &&
                                    (command.getwidmaster.execute === false || command.getwidmaster.execute === "false")) {
                                    // empty by design
                                } else { // if = true or !=false -- remove addthis.
                                    proxyprinttodiv('<<< Get_Clean before find and replace resultObj >>>', resultObj, 38);
                                    resultObj = find_and_replace_addthis(resultObj);
                                    proxyprinttodiv('<<< Get_Clean after find and replace resultObj >>>', resultObj, 38);
                                }
                                proxyprinttodiv('<<< Get_Clean after find and replace resultObj >>>II', resultObj, 38);
                                callback(null, resultObj);

                            } // end try
                            catch (err) {
                                //callback ({"status":"there was an error"}, {"function":"getclean"});
                                var finalobject = createfinalobject({"result": "getclean_deepfilter"}, {}, "getclean_deepfilter", err, resultObj);
                                callback(finalobject.err, finalobject.res);
                            }
                        }
                    });
                }
            ); // end series
        } // end try
        catch (err) {
            //callback ({"status":"there was an error"}, {"function":"getclean"});
            var finalobject = createfinalobject({"result": "getclean"}, {}, "getclean", err, inbound_parameters);
            callback(finalobject.err, finalobject.res);
        }
    }

})(typeof window === "undefined" ? global : window); //