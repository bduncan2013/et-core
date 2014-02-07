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
            delete inputWidgetObject['executethis']; // ** added by Saurabh 10/9

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

    proxyprinttodiv('In __getwidmaster__ with parameters: ', parameters, 17);
    getWidMongo(parameters.wid, parameters.command, "", 10, function (err, res) {
        proxyprinttodiv('In __getwidmaster__ with res: ', res, 17);
        
        if ((res) && (Object.keys(res).length !== 0) && (res['wid'] !== res['metadata']['method']) && (parameters.convertmethod!=="dto") && (parameters.command.inheritflag !== "false")) {
            proxyprinttodiv('<<< calling getclean >>>', res, 17);
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
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var dtotype;
    var dtoobject = {};

    if (command && command.dtotype) {
        dtotype = command.dtotype;
    } else {
        dtotype = obj.metadata.method;
    }
    if (dtotype && dtotype !== obj.wid) {
        execute({"executethis":"getwidmaster", "wid":dtotype, "command.convertmethod":"dto","command.execute":"ConvertFromDOTdri"}, function (err, res) {

            if (!res) {dtoobject=obj} else {dtoobject=res[0]}

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
    var dtoGlobalParameters = {};
    var params,eachdto,dtogroup,iteration, proposedLeft;
    var dtolist = {};

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
            proxyprinttodiv('Function getwidmongo step 1 hit with command:', command, 10);
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
                    parameterobject = res;
                    proxyprinttodiv('Function getwidmongo getwid res', res,10);
                    //moreDTOParameters=parameterobject;  &&& taken out roger 2/7
                    cb(null); // add
                }
                else { // if no object
                    parameterobject={};
                    targetwid = ""; // if no object to follow then targetwid="";
                    cb(null);
                }
            }); // end execute                      
        }, // end step1

        function step2(cb) {
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
                            //executeobject["command.execute"] = "ConvertFromDOTdri",
                            executeobject["command.convertmethod"] = "toobject";
                            executeobject["dtotype"] = "";
                            executeobject["executethis"] = 'querywid';
                            execute(executeobject, function (err, res) {

                                if (Object.keys(res).length != 0) {moreDTOParameters=res}
                                cb1(null, 'step2n1');
                                // TODO: figure out the return here
                            });
                        } // end step1n2
                    ],
                    function (err, res) {
                        if (err) {
                            throw err;
                        }
                        cb(null, 'two');
                    });
            } // end if
            else {
                cb(null, 'two');
            }
        }, // end step2
        function step3(cb) {
            if ((parameterobject["metadata"]) && (parameterobject["metadata"]["method"]) && (command) && (command.convertmethod === "dto")) {
                
                if (!parameterobject.command) {
                    parameterobject.command = {};
                }

                if (!parameterobject.command.inherit) {
                    parameterobject.command.inherit = {};
                }

                parameterobject.command.inherit[parameterobject["metadata"]["inherit"]] = parameterobject["metadata"]["inherit"];
            }

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

                    left = rightparameters['metadata']['method'];
                    dtolist[left] = rightparameters['metadata']['method'];
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

                        // added
                        // if metadata: {inherit: wid1} then create command: {inherit: { wid1: wid}}

                        
                        if (level > 0) {

                            proxyprinttodiv('Function getwidmongo recurse', key, 10);
                           
                            debugfn("getwidmongo before recusr", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));

                            debugcolor++
                            debugindent++
                            //getWidMongo(key, convertmethod, accesstoken, dtotype, rightparameters["metadata"]["method"], level, function (err, params) { 
                            getWidMongo(key, command, rightparameters["metadata"]["method"], level, function (err, params) { 
                                proxyprinttodiv('Function getwidmongo params', params, 10);
                                debugcolor--
                                debugindent--
                                if (Object.keys(params).length!==0) {
                                    // added by roger
                                    if (command && command.convertmethod === "nowid") {
                                        delete params.wid;
                                        delete params.metadata.method;
                                    }

                                    // added
                                    if (params.command) {
                                        proxyprinttodiv("--- What i'm looking at parameterobject step1", parameterobject, 99);
                                        extend(true, parameterobject.command, params.command);
                                        proxyprinttodiv("--- What i'm looking at parameterobject step2", parameterobject, 99);
                                        delete params.command
                                    }

                                    proxyprinttodiv('Function getwidmongo rightparameters before ', rightparameters, 10);
                                    if ((rightparameters["data"]["linktype"] === "onetomany") && (command.convertmethod !== "dto"))  {
                                      
                                        if (Object.prototype.toString.call(parameterobject[rightparameters["metadata"]["method"]]) !== '[object Array]') { 
                                            parameterobject[rightparameters["metadata"]["method"]]=[]; 
                                        }
                                            
                                        parameterobject[rightparameters["metadata"]["method"]].push(params); 
                                
                                        }
                                        else { // if onetoone
                                            parameterobject[rightparameters["metadata"]["method"]]=params;
                                        }
                                    
                                    proxyprinttodiv('Function getwidmongo parameterobject after', parameterobject, 10);
                                    debugfn("getwidmongo aferrecurse", "getwidmongo", "get", "mid", debugcolor, debugindent, debugvars([1]));

                                   }
                                else { // if nothing returned

                                }
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
            // legacy var
            dtoGlobalParameters = parameterobject;
            proxyprinttodiv("--- What i'm looking at parameterobject step3", parameterobject, 99);

            debugfn("getwidmongo end step4", "getwidmongo", "get", "end", debugcolor, debugindent, debugvars([1]));
            cb(null, 'four');
        }
    ],
    function (err, results) {
        proxyprinttodiv('Function getwidmongo dtoGlobalParameters', dtoGlobalParameters, 10);

        debugfn("getWidMongo code generator", "getWidMongo", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: dtoGlobalParameters
        }, 6);

        callback(err, dtoGlobalParameters);
    });
}

exports.getclean = getclean = function getclean(resultObj, command, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));
    var bigdto={};
    var dtoobject={};
    var outobj={};
    var err = {};

    async.series([
        function step1(cb) { // getdto
            getdtoobject(resultObj, command, function (err, res) {
                proxyprinttodiv('In __getclean__ step1 with res: ', res, 17);
                dtoobject = res;
                proxyprinttodiv('In __getclean__ step1 with dtoobject: ', dtoobject, 17);
                cb(null);
            });
        },
        function step2(cb) { // getaggressivedto
            proxyprinttodiv('In __getclean__ step2 with before if stament getWidMongo: ', resultObj, 17);
            if (resultObj.wid !== resultObj.metadata.method) {
                proxyprinttodiv('In __getclean__ step2 with before getWidMongo: ', resultObj, 17);
                
                // getWidMongo(resultObj.metadata.method, command, "", 10, function (err, res) {
                //     proxyprinttodiv('In __getclean__ step2 with res: ', res, 17);
                //     // bigdto = res[0]; res is a object not an array
                //     bigdto = res;
                //     cb(null)
                // });

                // Joe - atempting to add call to getwidmaster

                var dtoToGet = resultObj.metadata.method;
                execute({"executethis":"getwidmaster", 
                    "wid": dtoToGet, 
                    "command.execute":"ConvertFromDOTdri",
                    "command.convertmethod":"dto"
                    //"command.inheritflag":"false"
                    }, function (err, res) {
                        bigdto = res[0]; 
                        // bigdto = res;
                        cb(null);
                });
            } else {
                cb(null);
            }
        },
        function step3(cb) { // process inherit
            proxyprinttodiv('<<< Get_Clean step3 resultObj >>', resultObj, 99);
            var listToDo=[];
            var inheritobject;

            if (bigdto && bigdto.command && bigdto.command.inherit) {
            //if (dtoobject && dtoobject.command && dtoobject.command.inherit) {

                for (eachkey in bigdto.command.inherit) {
                // for (eachkey in dtoobject.command.inherit) {
                    listToDo.push(eachkey)
                }

                proxyprinttodiv('<<< Get_Clean listToDo', listToDo, 17);
                delete dtoobject.command;

                proxyprinttodiv('<<< Get_CLean before call to execute command >>>', command, 17);
                proxyprinttodiv('<<< Get_CLean before call to execute listToDo >>>', listToDo, 17);

                if (listToDo.length > 0 && command && command.inheritflag === "true") {
                    async.mapSeries(listToDo, function (eachresult, cbMap) {
                        proxyprinttodiv('<<< Get_Clean execute firing !!!! >>>', eachresult, 17);
                        execute({"executethis":"getwidmaster", 
                                    "wid":eachresult, 
                                    "command.execute":"ConvertFromDOTdri",
                                    "command.convertmethod":"nowid",
                                    "command.inheritflag":"false"
                                    }, function (err, res) {
                            if ((res.length > 0) && (Object.keys(res[0]).length > 0)) {
                                inheritobject = res[0];
                                proxyprinttodiv('<<< Get_Clean step3 inheritobject >>>', inheritobject, 99);
                                dtoname = inheritobject['metadata']['method'];
                                
                                proxyprinttodiv('<<< Get_Clean after call to execute bigdto[metadata][method] >>>', bigdto['metadata']['method'], 17);
                                
                                if (dtoname === bigdto['metadata']['method']) {
                                    proxyprinttodiv('<<< Get_Clean step3 extend resultObj before >>>', resultObj, 99);
                                    extend(true, resultObj, inheritobject);
                                    proxyprinttodiv('<<< Get_Clean step3 extend resultObj after >>>', resultObj, 99);
                                } else {
                                    // index = getindex(bigdto, dtoname); // changed by joe, the sturcture on bigdto is too diffrent to resolve a relevant path to insert data
                                    index = getindex(resultObj, dtoname); 
                                    if(!index) {
                                        extend(true, resultObj, inheritobject);
                                    } 
                                    else {
                                        proxyprinttodiv('<<< Get_Clean step3 index >>', index, 99);
                                        setbyindex(resultObj, index, inheritobject);
                                    }
                                    // TODO: move this somewhere usefull
                                    // ======= deep filter test ======
                                    // var firstObj = {"name":"Elizabeth Heart","age":"50","wid":"elizabeth_heart","metadata":{"method":"authordto"},"booksdto":{"title":"The X Factor","pages":"300","wid":"222","metadata":{"method":"booksdto"}},"a":"adefault","b":"BDEFAULT"}
                                    // var secondObj = {"name":"string","age":"string","a":"string","b":"string","metdata":{"booksdto":{"type":"onetomany"}},"wid":"authordto","metadata":{"method":"authordto","inherit":"defaultauthordtoactions"},"booksdto":{"title":"string","pages":"string","c":"string","d":"string","wid":"booksdto","metadata":{"method":"booksdto","inherit":"defaultbooksdtoactions"}}}
                                    // var resultObj = recurseModObj(firstObj, secondObj);
                                    // ======= resultObj ======
                                    // {"name":"Elizabeth Heart","age":"50","metadata":{"method":"authordto"},"booksdto":{"title":"The X Factor","pages":"300","metadata":{"method":"booksdto"}},"a":"adefault","b":"BDEFAULT"}
                        
                                }
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
            proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter resultObj >>>', resultObj,99);
            proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter dtoobject >>>', dtoobject, 17);
            proxyprinttodiv('<<< Get_Clean before call back beforedeepfilter command >>>', dtoobject, 17);
            resultObj = deepfilter(resultObj, dtoobject, command);
            proxyprinttodiv('<<< Get_Clean before call back afterdeepfilter resultObj >>>', resultObj, 17);
            // proxyprinttodiv('<<< Get_Clean before call back command >>>', command, 17);
            // proxyprinttodiv('<<< Get_Clean before call back dtoobject >>>', dtoobject, 17);
             
            debugfn("getclean code generator", "getclean", "get", "code", 2, 1, {
                0: inbound_parameters,
                1: resultObj
            }, 6); 
            
            callback(err, resultObj);
        }
    ); // end series
}


function getindex(parameterobject, dtoname, indexstring) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var match;
    var potentialmap;
    for (eachelement in parameterobject) {
        proxyprinttodiv('Function getindex eachelement', eachelement,23);  
        if (eachelement===dtoname) {
            if (indexstring) {indexstring=indexstring+'.'+eachelement} else {indexstring=eachelement}
              proxyprinttodiv('Function indexstring FOUND', indexstring, 23);  
            break;         
        }

        if (parameterobject[eachelement] instanceof Object) {
            if (indexstring) {potentialmap=indexstring+'.'+eachelement} else {potentialmap=eachelement}
            match = getindex(parameterobject[eachelement], dtoname, potentialmap)
            if (potentialmap!==match) {
                indexstring=match;
                proxyprinttodiv('Function match inside', match, 23);  
                break;
                }
            }
        }
    proxyprinttodiv('Function indexstring ', indexstring, 23);  

    debugfn("getindex code generator", "getindex", "get", "code", 2, 1, {
        0: inbound_parameters,
        1: indexstring
    }, 6); 
    
    return indexstring;

} 

/****************************************
getindex(parmobject:object, dtoname:string) returns index string
i.e. {a:{b:{c:d},e:f}, g:h}
****************************************
****************************************
dtoname: a returns a
dtoname: b returns a.b
dtoname: c returns a.b.c
dtoname: e returns a.e
dtoname: g returns g
*/
exports.getindextest = getindextest = function getindextest(params, callback) {
    console.log("<< getindextest >>");
    var parameterobject = {"a":{"b":{"c":"d"},"e":"f"},"g":"h"};
    console.log("Function getindextest parameterobject -- " + JSON.stringify(parameterobject));
    
    var indexstring = "";

    var dtoname = "b";
    console.log("Function getindextest dtoname -- " + dtoname);
    var result = getindex(parameterobject, dtoname, indexstring);
    console.log("Function getindextest result  -- " + result);
}


function setbyindex(obj, str, val, operation) {
    var keys, key;
    //make sure str is a string with length
    if (!str || !str.length || Object.prototype.toString.call(str) !== "[object String]") {
        return false;
    }
    if (obj !== Object(obj)) {
        //if it's not an object, make it one
        obj = {};
    }
    keys = str.split(".");
    while (keys.length > 1) {
        key = keys.shift();
        if (obj !== Object(obj)) {
            //if it's not an object, make it one
            obj = {};
        }
        if (!(key in obj)) {
            //if obj doesn't contain the key, add it and set it to an empty object
            obj[key] = {};
        }
        obj = obj[key];
    }
    // return obj[keys[0]] = val;
    return extend(true, obj[keys[0]], val); // we want to add data not overwrite data
};


/****************************************
check type of what you are updating, if array then push else extend
****************************************
****************************************
object= {a:{b:{c:d},e:f}, g:h}
index=  a.b.c
objecttobeadded= {t:y, p:u}
operation=  add/update
will make object be {a:{b:{c:{t:y, p:u}},e:f}, g:h}
*/
exports.setbyindextest = setbyindextest = function setbyindextest(params, callback) {
    var obj = {"a":{"b":{"c":"d"},"e":"f"},"g":"h"};
    setbyindex(obj, "a.b.c", "hello");
    proxyprinttodiv('Function obj ', obj, 17);  
}


exports.deepfilter = deepfilter = function deepfilter(inputObj, dtoObjOpt, command) {
    var modifiedObj = {};
    extend(true, modifiedObj, inputObj);    
    if (dtoObjOpt) {
        return recurseModObj(modifiedObj, dtoObjOpt);
    } else {
        dtoObjOpt = execute({"executethis":"getwidmaster", "wid": inputObj["metadata"]["method"]});
        return recurseModObj(modifiedObj, dtoObjOpt);
    };   

}

function recurseModObj(inputObject,dtoObject){
    var modifiedObj = {};
    Object.keys(inputObject).forEach(function (inpKey) {

        // added by Roger
        if (inpKey.indexOf("addthis.") !== -1) {// if you found "addthis." then remove from inputObject
                inputObject[inpKey.replace("addthis.", "")]=inputObject[inpKey]; // then and readd without addthis
                delete inputObject[inpKey]; // delete the old one
                }

        var inpVal = inputObject[inpKey];
        if (dtoObject.hasOwnProperty(inpKey)) {
            var dataType = dtoObject[inpKey];
            if(typeof inpVal === "string" && typeof dataType === "string")
            {
                switch(dataType)
                {
                    case "boolean":
                                var convB = null;
                                if (inpVal == "true") {
                                    convB = true;
                                } else if (inpVal == "false") {
                                    convB = false;
                                };
                                modifiedObj[inpKey] = convB;
                        break;
                    case "string":
                                modifiedObj[inpKey] = String(inpVal);
                        break;
                    case "number":
                                modifiedObj[inpKey] = parseInt(inpVal);                            
                        break;
                    case "date":
                                var arrD = inpVal.split("/");
                                var m = arrD[0];
                                m = (m<10 ? '0'+m : m);
                                var d = arrD[1];
                                d = (d<10 ? '0'+d : d);
                                var y = arrD[2];
                                modifiedObj[inpKey] = new Date(y,m-1,d);                                                        
                        break;
                    default:
                        //Nothing to be done
                       break;
                }
            }else if(typeof inpVal === "object" && typeof dataType === "object")
            {
                //Ignoring metadata property in input.
                if (inpKey != "metadata") {
                    var modObj = recurseModObj(inpVal,dataType);
                    modifiedObj[inpKey] = modObj;
                }else{
                    modifiedObj[inpKey] = inpVal;                    
                }
            }else
            {
                //Doesn't match with dto -- Nullifying the param
                modifiedObj[inpKey] = null;
            }
        } else{
            delete modifiedObj[inpKey];
        };
    });
    return modifiedObj;        
}

// exports.test_recurseModObj = test_recurseModObj = function test_recurseModObj(params, callback) {
//     testclearstorage();
//      // config = setconfig1();
//     var recModObj = recurseModObj({
//                                     "metadata":{"method":"wid2"},
//                                     "a":"b",
//                                     "c":"30",
//                                     "e":"f",
//                                     "d":"6/23/1912",
//                                     "q":{"w":{"e":"t"}},
//                                     "g":"true"
//                                 },
//                                 {
//                                     "metadata":{"method":"wid2"},
//                                     "a":"string",
//                                     "c":"number",
//                                     "d":"date",
//                                     "q":{"w":{"e":"string"}},
//                                     "g":"boolean"
                                
//                                 // proxyprinttodiv('<<< Get_Clean after call to execute resultObj >>>', resultObj, 17);

//                                 // ======= deep filter test ======
//                                 // var firstObj = {"name":"Elizabeth Heart","age":"50","wid":"elizabeth_heart","metadata":{"method":"authordto"},"booksdto":{"title":"The X Factor","pages":"300","wid":"222","metadata":{"method":"booksdto"}},"a":"adefault","b":"BDEFAULT"}
//                                 // var secondObj = {"name":"string","age":"string","a":"string","b":"string","metdata":{"booksdto":{"type":"onetomany"}},"wid":"authordto","metadata":{"method":"authordto","inherit":"defaultauthordtoactions"},"booksdto":{"title":"string","pages":"string","c":"string","d":"string","wid":"booksdto","metadata":{"method":"booksdto","inherit":"defaultbooksdtoactions"}}}
//                                 // var resultObj = recurseModObj(firstObj, secondObj);
//                                 // ======= resultObj ======
//                                 // {"name":"Elizabeth Heart","age":"50","metadata":{"method":"authordto"},"booksdto":{"title":"The X Factor","pages":"300","metadata":{"method":"booksdto"}},"a":"adefault","b":"BDEFAULT"}
                    
//                             }
//                             cbMap(null);
//                         }
//                         else { // if no result
//                             cbMap(null);
//                             }
//                         }); // end execute
//                     }, function(err, res) {
//                         cb(null); 
//                 }); //end mapseries
//             }
//             cb(null);
//         } // step 3
//         ], // series list
//         function (err, res) {
//             resultObj = deepfilter(resultObj, command, dtoobject);
//             // proxyprinttodiv('<<< Get_Clean before call back resultObj >>>', resultObj, 17);
//             // proxyprinttodiv('<<< Get_Clean before call back command >>>', command, 17);
//             // proxyprinttodiv('<<< Get_Clean before call back dtoobject >>>', dtoobject, 17);
//             callback(err, resultObj);
//         }
//     ); // end series
// }


// function getindex(parameterobject, dtoname, indexstring) {
//     var match;
//     var potentialmap;
//     for (eachelement in parameterobject) {
//         proxyprinttodiv('Function getindex eachelement', eachelement,23);  
//         if (eachelement===dtoname) {
//             if (indexstring) {indexstring=indexstring+'.'+eachelement} else {indexstring=eachelement}
//               proxyprinttodiv('Function indexstring FOUND', indexstring, 23);  
//             break;         
//         }

//         if (parameterobject[eachelement] instanceof Object) {
//             if (indexstring) {potentialmap=indexstring+'.'+eachelement} else {potentialmap=eachelement}
//             match = getindex(parameterobject[eachelement], dtoname, potentialmap)
//             if (potentialmap!==match) {
//                 indexstring=match;
//                 proxyprinttodiv('Function match inside', match, 23);  
//                 break;
//                 }
//             }
//         }
//     proxyprinttodiv('Function indexstring ', indexstring, 23);  
//     return indexstring;

// } 

// /****************************************
// getindex(parmobject:object, dtoname:string) returns index string
// i.e. {a:{b:{c:d},e:f}, g:h}
// ****************************************
// ****************************************
// dtoname: a returns a
// dtoname: b returns a.b
// dtoname: c returns a.b.c
// dtoname: e returns a.e
// dtoname: g returns g
// */
// exports.getindextest = getindextest = function getindextest(params, callback) {
//     console.log("<< getindextest >>");
//     var parameterobject = {"a":{"b":{"c":"d"},"e":"f"},"g":"h"};
//     console.log("Function getindextest parameterobject -- " + JSON.stringify(parameterobject));
    
//     var indexstring = "";

//     var dtoname = "b";
//     console.log("Function getindextest dtoname -- " + dtoname);
//     var result = getindex(parameterobject, dtoname, indexstring);
//     console.log("Function getindextest result  -- " + result);
// }


// function setbyindex(obj, str, val, operation) {
//     var keys, key;
//     //make sure str is a string with length
//     if (!str || !str.length || Object.prototype.toString.call(str) !== "[object String]") {
//         return false;
//     }
//     if (obj !== Object(obj)) {
//         //if it's not an object, make it one
//         obj = {};
//     }
//     keys = str.split(".");
//     while (keys.length > 1) {
//         key = keys.shift();
//         if (obj !== Object(obj)) {
//             //if it's not an object, make it one
//             obj = {};
//         }
//         if (!(key in obj)) {
//             //if obj doesn't contain the key, add it and set it to an empty object
//             obj[key] = {};
//         }
//         obj = obj[key];
//     }
//     return obj[keys[0]] = val;
// };


// /****************************************
// check type of what you are updating, if array then push else extend
// ****************************************
// ****************************************
// object= {a:{b:{c:d},e:f}, g:h}
// index=  a.b.c
// objecttobeadded= {t:y, p:u}
// operation=  add/update
// will make object be {a:{b:{c:{t:y, p:u}},e:f}, g:h}
// */
// exports.setbyindextest = setbyindextest = function setbyindextest(params, callback) {
//     var obj = {"a":{"b":{"c":"d"},"e":"f"},"g":"h"};
//     setbyindex(obj, "a.b.c", "hello");
//     proxyprinttodiv('Function obj ', obj, 17);  
// }


// // exports.deepfilter = deepfilter = function deepfilter(inputObj, cmdObj, dtoObjOpt) {
// //     proxyprinttodiv('<<< deepfilter hit >>>', "", 17);
// //     var modifiedObj = {};

// //     extend(true, modifiedObj, inputObj);

// //     if (dtoObjOpt) {
// //         proxyprinttodiv('<<< deepfilter hit >>>', modifiedObj, 17);
// //         proxyprinttodiv('<<< deepfilter hit >>>', dtoObjOpt, 17);
// //         return recurseModObj(modifiedObj, dtoObjOpt);
// //     } else {
// //         dtoObjOpt = execute({"executethis":"getwidmaster", "wid": inputObj["metadata"]["method"]});
// //         return recurseModObj(modifiedObj, dtoObjOpt);
// //     };   
// // }

// exports.deepfilter = deepfilter = function deepfilter(inputObj, dtoObj) {
//     proxyprinttodiv('<<< deepfilter hit >>>', "", 17);
//     var modifiedObj = {};

//     extend(true, modifiedObj, inputObj);

//     if (dtoObj) {
//         proxyprinttodiv('<<< deepfilter hit >>>', modifiedObj, 17);
//         proxyprinttodiv('<<< deepfilter hit >>>', dtoObj, 17);
//         return recurseModObj(modifiedObj, dtoObj);
//     } else {
//         dtoObjOpt = execute({"executethis":"getwidmaster", "wid": inputObj["metadata"]["method"]});
//         return recurseModObj(modifiedObj, dtoObj);
//     };   
// }

// function recurseModObj(inputObject,dtoObject){
//     var modifiedObj = {};
//     Object.keys(inputObject).forEach(function (inpKey) {

//         // added by Roger
//         if (inpKey.indexOf("addthis.") !== -1) {// if you found "addthis." then remove from inputObject
//                 inputObject[inpKey.replace("addthis.", "")]=inputObject[inpKey]; // then and readd without addthis
//                 delete inputObject[inpKey]; // delete the old one
//                 }

//         var inpVal = inputObject[inpKey];
//         if (dtoObject.hasOwnProperty(inpKey)) {
//             var dataType = dtoObject[inpKey];
//             if(typeof inpVal === "string" && typeof dataType === "string")
//             {
//                 switch(dataType)
//                 {
//                     case "boolean":
//                                 var convB = null;
//                                 if (inpVal == "true") {
//                                     convB = true;
//                                 } else if (inpVal == "false") {
//                                     convB = false;
//                                 };
//                                 modifiedObj[inpKey] = convB;
//                         break;
//                     case "string":
//                                 modifiedObj[inpKey] = String(inpVal);
//                         break;
//                     case "number":
//                                 modifiedObj[inpKey] = parseInt(inpVal);                            
//                         break;
//                     case "date":
//                                 var arrD = inpVal.split("/");
//                                 var m = arrD[0];
//                                 m = (m<10 ? '0'+m : m);
//                                 var d = arrD[1];
//                                 d = (d<10 ? '0'+d : d);
//                                 var y = arrD[2];
//                                 modifiedObj[inpKey] = new Date(y,m-1,d);                                                        
//                         break;
//                     default:
//                         //Nothing to be done
//                        break;
//                 }
//             }else if(typeof inpVal === "object" && typeof dataType === "object")
//             {
//                 //Ignoring metadata property in input.
//                 if (inpKey != "metadata") {
//                     var modObj = recurseModObj(inpVal,dataType);
//                     modifiedObj[inpKey] = modObj;
//                 }else{
//                     modifiedObj[inpKey] = inpVal;                    
//                 }
//             }else
//             {
//                 //Doesn't match with dto -- Nullifying the param
//                 modifiedObj[inpKey] = null;
//             }
//         } else{
//             delete modifiedObj[inpKey];
//         };
//     });
//     return modifiedObj;        
// }

// exports.test_recurseModObj = test_recurseModObj = function test_recurseModObj(params, callback) {
//     testclearstorage();
//      // config = setconfig1();
//     var recModObj = recurseModObj({
//                                     "metadata":{"method":"wid2"},
//                                     "a":"b",
//                                     "c":"30",
//                                     "e":"f",
//                                     "d":"6/23/1912",
//                                     "q":{"w":{"e":"t"}},
//                                     "g":"true"
//                                 },
//                                 {
//                                     "metadata":{"method":"wid2"},
//                                     "a":"string",
//                                     "c":"number",
//                                     "d":"date",
//                                     "q":{"w":{"e":"string"}},
//                                     "g":"boolean"
//                                 });
//     proxyprinttodiv('recurseModObj inputObject', {
//                                     "metadata":{"method":"wid2"},
//                                     "a":"b",
//                                     "c":"30",
//                                     "e":"f",
//                                     "d":"6/23/1912",
//                                     "q":{"w":{"e":"t"}},
//                                     "g":"true"
//                                 }, 17);    
//     proxyprinttodiv('recurseModObj inputDTO', {
//                                     "metadata":{"method":"wid2"},
//                                     "a":"string",
//                                     "c":"number",
//                                     "d":"date",
//                                     "q":{"w":{"e":"string"}},
//                                     "g":"boolean"
//                                 }, 17);    
//     proxyprinttodiv('recurseModObj ModifiedObject', recModObj, 17);    
//  }



/*

    exports.aggressivedto = aggressivedto = function aggressivedto(widInput, preamble, level, callback) { // returns a made up dto base on maximum number of relationships, etc
        // local vars
        var moreDTOParameters;
        var targetwid = "";
        var nexttargetwid = "";
        var nextpreamble = "";
        var executeobject = {};
        var parameterobject;
        var err;
        var res;
        var dtoGlobalParameters = {};

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
                            parameterobject = res;
                            moreDTOParameters=parameterobject;
                            debugfn("aggressivedto getwid", "aggressivedto", "get", "begin", debugcolor, debugindent, debugvars([1]));
                            if ((parameterobject["metadata.method"]) && (parameterobject["metadata.method"]!=targetwid)) {
                                targetwid = parameterobject['metadata.method'];
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
                // parameterobject = wid, moreDTOparameters = methdd, targetwid = chain to follow

                function step2(cb) {
                    proxyprinttodiv('Function aggressivedto targetwid', targetwid,10);
                    if (targetwid!="") {
                    //if ((parameterobject !== undefined) && (parameterobject['metadata.method'] != "") && (parameterobject['metadata.method'] != targetwid)) {
                        async.series([ // asynch step1n2

                                // function step2n1(cb1) {
                                //     targetwid = parameterobject['metadata.method'];
                                //     executeobject = {};
                                //     executeobject["wid"] = targetwid;
                                //     executeobject["executethis"] = 'getwid';


                                //     execute(executeobject, function (err, res) {
                                //         moreDTOParameters = res[0];
                                //         if (Object.keys(moreDTOParameters).length != 0) {
                                //             parameterobject = jsonConcat(parameterobject, moreDTOParameters)
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
                                //     parameterobject[key] = moreDTOParameters[key]
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
                                                parameterobject = jsonConcat(parameterobject, params);
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

                    for (var eachresult in parameterobject) {
                        dtoGlobalParameters[preamble + eachresult] = parameterobject[eachresult];
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

                // first remove "addthis" from what is being returned
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
*/


})(typeof window === "undefined" ? global : window);