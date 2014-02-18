 (function (window) {

// *** GetWid ***
// Purpose: Converts data to and from dri standards
exports.getwid = getwid = function getwid(inputWidgetObject, callback) {
    var inbound_parameters = {};

    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    authcall(inputWidgetObject, function (err, ret) {
        if (err || !ret) {
            callback(err, {
                "etstatus": "unauthroized"
            });
        } 
        else {
            delete inputWidgetObject['executethis']; // ** added by Saurabh 38/9

            proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);

            getfrommongo(inputWidgetObject, function (err, resultobject) {
                // convert the object from dri standard before returnning it
                callback({}, convertfromdriformat(resultobject));
            });
        }
    });
}

// *** GetWidMaster ***
// Purpose: splits wid and command parameters
exports.getwidmaster = getwidmaster = function getwidmaster(parameters, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    parameters = ConvertFromDOTdri(parameters); // convert to object

    // lower case check
    if (!parameters.command) {parameters.command={}}
    if (!parameters.command.inheritflag) {parameters.command.inheritflag="true"}

    proxyprinttodiv('In __getwidmaster__ with parameters: ', parameters, 38);
    getWidMongo(parameters.wid, parameters.command, "", 20, function (err, res) { // recurse up to 20 levels
        proxyprinttodiv('In __getwidmaster__ with res: ', res, 38);
        if ((res) && (res.command) && (Object.keys(res.command).length === 0)) {delete res.command}      
        if ((res) && (Object.keys(res).length !== 0) && (res['metadata']) && 
            (res['wid'] !== res['metadata']['method']) && (parameters.convertmethod!=="dto") && 
            (parameters.command.inheritflag !== "false")) {
            proxyprinttodiv('<<< calling getclean >>>', res, 38);
            getclean(res, parameters.command, function (err, res) {
                if (parameters && parameters.command && parameters.command.execute === "ConvertFromDOTdri") {
                    //res = ConvertFromDOTdri(res);
                    
                    debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                        0: inbound_parameters,
                        1: res
                    }, 6);

                    callback(err, res);
                }
                else { // the detault is to return dot notation...so old code does not break
                    res = ConvertToDOTdri(res);
                                        
                    debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                        0: inbound_parameters,
                        1: res
                    }, 6);

                    callback(err, res);  
                }
            });
        } else {
            if (parameters && parameters.command && parameters.command.execute === "ConvertFromDOTdri") {
                    //res = ConvertFromDOTdri(res);
                                        
                debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                    0: inbound_parameters,
                    1: res
                }, 6);
                
                callback(err, res);
            }
            else { // the detault is to return dot notation...so old code does not break
                res = ConvertToDOTdri(res);
                                    
                debugfn("getwidmaster code generator", "getwidmaster", "get", "code", 2, 1, {
                    0: inbound_parameters,
                    1: res
                }, 6);
                
                callback(err, res);  
            }  
        }
    }); // end get wid mongo
}

// *** GetDTOObject ***
// Purpose: Pulls the schema for objects
exports.getdtoobject = getdtoobject = function getdtoobject(obj, command, callback) {
    proxyprinttodiv("getdtoobject input obj: ", obj, 17);
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var dtotype;
    var dtoobject = {};

    // extend(true, dtoobject, obj);

    //dtoobject["metadata"]["method"] = "string";
    if (!obj["metadata"]) {obj["metadata"]={}}
    if (!obj["metadata"]["method"]) {obj["metadata"]["method"]="defaultdto"}


    function recurseobj(params) {
        var dtolist={}
        var dtoobj={};
        var metadata={};
        var tempobj={};
        var inobj={};
        extend(true, inobj, params)

        for (eachparm in inobj) {
            //proxyprinttodiv("getdtoobject dtolist I", dtolist, 99);
            //proxyprinttodiv("getdtoobject eachparm", eachparm, 99);
            //proxyprinttodiv("getdtoobject inobj", inobj[eachparm], 99);

            if (eachparm==="metadata") {
                metadata = inobj['metadata']
                for (eachitem in metadata) {
                    //proxyprinttodiv("getdtoobjecteachitem", eachitem, 99);
                    //proxyprinttodiv("getdtoobject dtolist II", dtolist, 99);
                    if ((eachitem!=="method") && (eachitem!=="inherit")) {
                        tempobj={}
                        tempobj[eachitem]=metadata[eachitem]['type']
                        extend(true, dtolist, tempobj)
                        //proxyprinttodiv("getdtoobject dtolist", dtolist, 99);
                        }
                    } // for metadata
                } // if metadata


            if (isObject(inobj[eachparm])) {
                dtoobj[eachparm]=recurseobj(inobj[eachparm])
                }
            else { // if not object
                dtoobj[eachparm]="string"
                }
            } // for eachparm
     

        if (Object.keys(dtolist).length !== 0) {
            if (!inobj.command) {dtoobj.command={}}
            dtoobj.command.dtolist = dtolist
            } 

            // inobj.command.deepdtolist = dto;
            // inobj.command.inherit = dto;
        return dtoobj
        } // end fn recurse

    dtoobject = recurseobj(obj);

    //dtoobject = recurseobj(obj);
    proxyprinttodiv("getdtoobject input dtoobject: ", dtoobject, 17);
    // dtoobject["metadata.method"] = "string";
    // if (!obj["metadata.method"]) {obj["metadata.method"] = "defaultdto"}
    
    if (command && command.dtotype) {
        dtotype = command.dtotype;
    } else {
        //dtotype = obj.metadata.method;
        dtotype = obj['metadata']['method'];
    }
    if ((dtotype!=="defaultdto") && (dtotype !== obj.wid)) {
        execute({"executethis":"getwidmaster", "wid":dtotype, "command.convertmethod":"dto","command.execute":"ConvertFromDOTdri"}, function (err, res) {
            proxyprinttodiv("getdtoobject input res[0] ", res, 17);
            if (res && (Object.keys(res[0]).length !== 0)) {dtoobject=res[0]}

            proxyprinttodiv("getdtoobject input dtoobject +++++++ ", dtoobject, 17);
            debugfn("getdtoobject code generator", "getdtoobject", "get", "code", 2, 1, {
                0: inbound_parameters,
                1: dtoobject
            }, 6);

            callback({}, dtoobject);
        }); // end execute
    }   
    else { // if there is no dtoType or obj.wid then call back with a blank dtoObject
        debugfn("getdtoobject code generator", "getdtoobject", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: dtoobject
        }, 6);

        callback({}, dtoobject);
    } // end else
}

// *** GetWidMongo ***
// Purpose: Builds a base object built up from relationships
// Notes: returns a made up dto base on maximum number of relationships, etc
exports.getWidMongo = getWidMongo = function getWidMongo(widInput, command, preamble, level, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    // local vars
    var moreDTOParameters=[];
    var targetwid = "";
    var nexttargetwid = "";
    var nextpreamble = "";
    var executeobject = {};
    var parameterobject;
    var err;
    var res;
    var params,eachdto,dtogroup,iteration, proposedLeft;
    var dtolist = {};
    var eachmetadata;
    var eachinherit;

    function debugvars(varlist) {
        var allvars = {
            1: {
                "widInput":widInput,
                "preamble":preamble,
                "level":level,
                "parameterobject": parameterobject,
                "moreDTOParameters": moreDTOParameters,
                "targetwid": targetwid,
                "eachresult": '',
                "key": '',
                "rightparameters": {},
                "executeobject": executeobject,
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
        function step1(step1_callback) {
            proxyprinttodiv('Function getwidmongo step 1 hit with widInput:', widInput, 38);
            proxyprinttodiv('Function getwidmongo step 1 hit with command:', command, 38);
            
            if (!level) {
                level = 38;
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
            //executeobject["command.convertmethod"]="toobject";
            executeobject['executethis'] = 'getwid';
            
            execute(executeobject, function (err, res) { // getwid
                proxyprinttodiv('Function getwidmongo getwid res', res, 38);
                res=res[0];
                
                if (Object.keys(res).length != 0) {
                    parameterobject = res;
                    proxyprinttodiv('Function getwidmongo getwid res', res,38);
                    //moreDTOParameters=parameterobject;  &&& taken out roger 2/7
                    step1_callback(null, "step1"); // add
                }
                else { // if no object
                    parameterobject = {};
                    targetwid = ""; // if no object to follow then targetwid="";
                    step1_callback(null, "step1");
                }
            }); // end execute                      
        }, // end step1

        function step2(step2_callback) {
            // If we get a target wid go and get the additional data
            if (targetwid !== "") {
                async.series([ // asynch step1n2
                        function step2_substep1(step2_substep1_callback) {
                            //proxyprinttodiv('Function getwidmongo step 2n1 hit', null, 38);
                            var executeobject = {};
                            executeobject["mongowid"] = targetwid;
                            executeobject["mongorelationshiptype"] = "attributes";
                            executeobject["mongorelationshipmethod"] = "all";
                            executeobject["mongorelationshipdirection"] = "forward";
                            executeobject["mongowidmethod"] = "";
                            executeobject["command.execute"] = "ConvertFromDOTdri",
                            // executeobject["command.convertmethod"] = "toobject";
                            executeobject["dtotype"] = "";
                            executeobject["executethis"] = 'querywid';
                            
                            execute(executeobject, function (err, res) {
                                proxyprinttodiv('Function getwidmongo query', res, 38);
                                
                                if (Object.keys(res).length != 0) {
                                    // TODO: fix the scope here
                                    moreDTOParameters = res;
                                }
                                step2_substep1_callback(null, 'substep1');
                            });
                        } // end step1n2
                    ],
                    function (err, res) {
                        if(res.indexOf('substep1') > -1) {
                            step2_callback(null, 'step2');
                        } else {
                            callback("GetWidMongo step2 substep1 broke", {});
                        }
                    });
            } // end if
            else {
                step2_callback(null, 'step2');
            }
        }, // end step2
        function step3(step3_callback) {
            if (!parameterobject.command) {parameterobject.command = {}};  
            if ((parameterobject["metadata"]) && (command) && (command.convertmethod === "dto")) {
                if (!parameterobject.command.inherit) {parameterobject.command.inherit = {}};
                //if (!parameterobject.command.inherit) {parameterobject.command.inherit = [];
                if (!parameterobject.command.deepdtolist) {parameterobject.command.deepdtolist = {}};
                if (!parameterobject.command.dtolist) {parameterobject.command.dtolist = {}};
                }
            proxyprinttodiv('Function getwidmongo parameterobject reset', parameterobject,38);

            if (moreDTOParameters && moreDTOParameters.length>0) {
                var listToDo = [];
                var eachresult;
                var rightparameters = {};  
                var left; 
                var key;

                proxyprinttodiv('Function getwidmongo moreDTOParameters', moreDTOParameters,38);

                for (eachresult in moreDTOParameters) { // list, for each item in list
                    for (key in moreDTOParameters[eachresult]) { // list is {wid : {}} --key = wid
                        rightparameters = moreDTOParameters[eachresult][key];
                    }

                    //left = rightparameters['metadata']['method'];
                    //dtolist[left] = rightparameters['metadata']['method'];
                    // create dto
                    listToDo.push(eachresult);
                }
                proxyprinttodiv('Function getwidmongo dtolist', dtolist,38);

                async.mapSeries(listToDo, function (eachresult, mapSeries_callback) {
                        var rightparameters = {};
                        var params;
                        var key;
                        var metadataMethod;

                        proxyprinttodiv('Function getwidmongo moreDTOParameters[eachresult]', moreDTOParameters[eachresult],38);
                        for (key in moreDTOParameters[eachresult]) { // list is {wid : {}} --key = wid
                            rightparameters = moreDTOParameters[eachresult][key];
                        }

                        // added
                        // if metadata: {inherit: wid1} then create command: {inherit: { wid1: wid}}

                        
                        if (level > 0) {

                            proxyprinttodiv('Function getwidmongo recurse', key, 38);
                           
                            debugfn("getwidmongo before recusr", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));

                            debugcolor++
                            debugindent++
                            //getWidMongo(key, convertmethod, accesstoken, dtotype, rightparameters["metadata"]["method"], level, function (err, params) { 
                            getWidMongo(key, command, rightparameters["metadata"]["method"], level, function (err, params) { 
                                proxyprinttodiv('Function getwidmongo params', params, 38);
                                debugcolor--
                                debugindent--
                                // TODO: check/clean this cluster of IF
                                if (Object.keys(params).length!==0) {
                                    // added by roger
                                    if (command && command.convertmethod === "nowid") {
                                        delete params.wid;
                                        delete params.metadata.method;
                                    }

                                    // added
                                    if (params.command && params.command.inherit) {
                                        extend(true, parameterobject.command.inherit, params.command.inherit)
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
                                        extend(true, parameterobject.command.deepdtolist, params.command.deepdtolist)
                                        }
                                        // proxyprinttodiv("--- What i'm looking at parameterobject step1", parameterobject, 38);
                                        // extend(true, parameterobject.command.inherit, params.command.inherit);
                                        // proxyprinttodiv("--- What i'm looking at parameterobject step2", parameterobject, 38);
                                        // //delete params.command
                                    

                                    proxyprinttodiv('Function getwidmongo rightparameters before ', rightparameters, 38);
                                    //if ((rightparameters["data"]) && (rightparameters["data"]["linktype"]) && 
                                    //    (rightparameters["data"]["linktype"] === "onetomany") && (command.convertmethod !== "dto"))  {
                                    if ((rightparameters) && (rightparameters["linktype"]) && (rightparameters["linktype"] === "onetomany") && (command.convertmethod !== "dto"))  {

                                    if (Object.prototype.toString.call(parameterobject[rightparameters["metadata"]["method"]]) !== '[object Array]') { 
                                        parameterobject[rightparameters["metadata"]["method"]] = []; 
                                    }
                                        parameterobject[rightparameters["metadata"]["method"]].push(params); 
                                    } else { // if onetoone
                                        parameterobject[rightparameters["metadata"]["method"]]=params;
                                    }
                                        
                                    proxyprinttodiv('Function getwidmongo parameterobject after', parameterobject, 38);
                                    debugfn("getwidmongo aferrecurse", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));

                                } else { // if nothing returned
                                    // TODO: what do we do if there is no return
                                }
                            });

                        }
                        mapSeries_callback(null, 'mapSeries');
                    },
                    function (err, res) {
                        if (res.indexOf('mapSeries') > -1) {
                            step3_callback(null, 'step3');
                        } else {
                            callback("GetWidMongo part3 mapSeries broke", {});
                        }
                    });
                // moved step3_callback(null, 'step3'); into the callback for async.map -- Joe
            } else { // if length > 0 
                step3_callback(null, 'step3');
            }
        }, // end function step3
        function step4(step4_callback) {

            //if (!parameterobject.command.dtolist) { // create dtolist

            // TODO: check/clean this cluster of IF
            if ((parameterobject["metadata"]) && (command) && (command.convertmethod === "dto")) {

                // if ((!parameterobject.command.dtolist) && (Object.keys(dtolist).length > 0)){ // create dtolist
                //     parameterobject.command.dtolist = dtolist;
                //     };

                for (eachmetadata in parameterobject["metadata"]) {
                    proxyprinttodiv('Function getwidmongo eachmetadata', eachmetadata,38);
                    if (eachmetadata==="inherit") {
                        extend(true, parameterobject.command.inherit, parameterobject["metadata"]["inherit"])
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
                        if (eachmetadata==="method") {
                            //parameterobject.command.deepdtolist[parameterobject.metadata.method]=parameterobject.metadata.method;
                            //parameterobject.command.dtolist[parameterobject.metadata.method]=parameterobject.metadata.method;
                        } else {
                            if 
                                (
                                    (parameterobject['metadata'][eachmetadata]) && 
                                    (parameterobject['metadata'][eachmetadata]['type']) &&
                                    (
                                        (parameterobject['metadata'][eachmetadata]['type']==="onetomany") || 
                                        (parameterobject['metadata'][eachmetadata]['type']==="onetoone")
                                    )
                                )
                                {
                                    parameterobject.command.deepdtolist[eachmetadata] = parameterobject.metadata[eachmetadata]['type'];
                                    parameterobject.command.dtolist[eachmetadata] = parameterobject.metadata[eachmetadata]['type'];
                                // creates a list that looks like this:
                                // command.inherit: {adto:onetomany bdto:onetomany cdto>: onetoone}
                                }
                            }
                        }  
                    } // for

                    // Default DTO area
                    parameterobject["wid"]="string";
                    parameterobject["metadata"]["method"]="string";

                    // system defaults
                    if (isObject(parameterobject["metadata"]["inherit"])) {
                        extend(true, parameterobject.command.inherit, parameterobject["metadata"]["inherit"])
                    } else {
                        executeobject={};
                        executeobject[parameterobject.metadata.inherit]=parameterobject.metadata.inherit;
                        extend(true, parameterobject.command.inherit, executeobject)
                        }
                    extend(true, parameterobject.command.inherit, {'defaultsystemactions':'defaultsystemactions'})
                    //parameterobject.command.inherit.push('defaultsystemactions')
                    //parameterobject.command.inherit=arrayUnique(parameterobject.command.inherit)

                    parameterobject.command.dtolist['systemdto']='onetoone';
                    parameterobject.command.addthis.executethisdtolist['systemdto']='onetoone';

                    
                } // if dto

            proxyprinttodiv("--- What i'm looking at parameterobject step3", parameterobject, 38);

            debugfn("getwidmongo end step4", "getwidmongo", "get", "end", debugcolor, debugindent, debugvars([1]));
            step4_callback(null, 'step4');
        }
    ],
    function (err, results) {

        debugfn("getWidMongo code generator", "getWidMongo", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: parameterobject
        }, 6);
        alert(JSON.stringify(results));

        if((results.indexOf('step1') > -1) && (results.indexOf('step2') > -1) && (results.indexOf('step3') > -1) && (results.indexOf('step4') > -1)) {
            callback(err, parameterobject);
        } else {
            callback("GetWidMongo broke", {});
        }
    });
}

exports.getclean = getclean = function getclean(resultObj, command, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var bigdto = {};
    var dtoobject = {};
    var outobj = {};
    var err = {};
    var dtoname;
    var index;

    async.series([
        function step1(cb) { // getdto
            getdtoobject(resultObj, command, function (err, res) {
                proxyprinttodiv('In __getclean__ step1 with res: ', res, 38);
                dtoobject = res;
                proxyprinttodiv('In __getclean__ step1 with dtoobject: ', dtoobject, 38);
                cb(null);
            });
        },
        function step2(cb) { // getaggressivedto
            proxyprinttodiv('In __getclean__ step2 with before if stament getWidMongo: ', resultObj, 38);
            if (resultObj.wid !== resultObj.metadata.method) {
                proxyprinttodiv('In __getclean__ step2 with before getWidMongo: ', resultObj, 38);
            
                // add logic to look for dtotype
                var dtoToGet = resultObj.metadata.method;
                execute({"executethis":"getwidmaster", 
                    "wid": dtoToGet, 
                    "command.execute":"ConvertFromDOTdri",
                    "command.convertmethod":"dto"
                    //"command.inheritflag":"false"
                    }, function (err, res) {
                        bigdto = res[0]; 
                        cb(null);
                });
            } else {
                cb(null);
            }
        },
        function step3(cb) { // process inherit
            proxyprinttodiv('<<< Get_Clean step3 resultObj >>', resultObj, 38);
            var listToDo=[];
            var inheritobject;

            if (bigdto && bigdto.command && bigdto.command.inherit) {

                for (eachkey in bigdto.command.inherit) {
                    listToDo.push(eachkey)
                }

                proxyprinttodiv('<<< Get_Clean listToDo', listToDo, 38);
                delete dtoobject.command;

                proxyprinttodiv('<<< Get_CLean before call to execute command >>>', command, 38);
                proxyprinttodiv('<<< Get_CLean before call to execute listToDo >>>', listToDo, 38);

                if (listToDo.length > 0 && command && command.inheritflag === "true") {
                    async.mapSeries(listToDo, function (eachresult, cbMap) {
                        proxyprinttodiv('<<< Get_Clean execute firing !!!! >>>', eachresult, 38);
                        execute({"executethis":"getwidmaster", 
                                    "wid":key, 
                                    "command.execute":"ConvertFromDOTdri",
                                    //"command.convertmethod":"nowid",
                                    "command.inheritflag":"false"
                                    }, function (err, res) {
                            if ((res.length > 0) && (Object.keys(res[0]).length > 0)) {
                                inheritobject = res[0];
                                delete inheritobject['wid'];

                                insertbydtotype(resultObj, bigdto, inheritobject, command)

                                cbMap(null);
                            } // end if
                            else { // if no result
                                cbMap(null);
                            }
                            }); // end execute
                        }, function(err, res) {
                            cb(null); 
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
            proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter resultObj >>>', resultObj,38);
            proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter dtoobject >>>', dtoobject, 38);
            proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter command >>>', dtoobject, 38);
            
            resultObj = deepfilter(resultObj, dtoobject, command);
            
            proxyprinttodiv('<<< Get_Clean before call back afterdeepfilter resultObj >>>', resultObj, 38);
            // proxyprinttodiv('<<< Get_Clean before call back command >>>', command, 38);
            // proxyprinttodiv('<<< Get_Clean before call back dtoobject >>>', dtoobject, 38);
             
            debugfn("getclean code generator", "getclean", "get", "code", 2, 1, {
                0: inbound_parameters,
                1: resultObj
            }, 6);

            // added by joe, if we have a key of addthis remove it and place it at root level
            if ( resultObj.hasOwnProperty("addthis")) {
                var addthis;

                _add_this = resultObj['addthis'];
                delete resultObj['addthis'];
                for (var i in _add_this) {
                    resultObj[i] = _add_this[i];
                }
            }
            
            callback(err, resultObj);
        }
    ); // end series
}




})(typeof window === "undefined" ? global : window);//

