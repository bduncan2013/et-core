// if(typeof localStorage === "undefined"){
if (!exports) {
    var exports = {};
}


exports.localStore = localStore = function () {

    var json = {};

    function clear() {
        this.json = {};
    }


    function push(key, val) {
        this.json[key] = val;
    }

    function get(key) {
        return this.json[key];
    }

    function remove(key) {
        delete this.json[key];
    }

    return {
        "clear": clear,
        "json": json,
        "push": push,
        "remove": remove,
        "get": get
    }

}();
localStore.clear();


exports.insertbydtotype = insertbydtotype = function insertbydtotype(inputobj, bigdto, insertobj, command) {
    proxyprinttodiv("insertbydtotype input inputobj :- ", inputobj, 38);
    proxyprinttodiv("insertbydtotype input bigdto :- ", bigdto, 38);
    proxyprinttodiv("insertbydtotype input insertobj :- ", insertobj, 38);
    proxyprinttodiv("insertbydtotype input command :- ", command, 38);
    
    var dtoname;
    var dtonameobj;
    var dtoindex;
    if (bigdto.metadata && bigdto["metadata"]["method"]) {
        dtoname = bigdto["metadata"]["method"];
        }
    if (insertobj.metadata && insertobj["metadata"]["method"]) {
        dtoname = insertobj["metadata"]["method"];
        }
    if (command && command.dtotype) {
        dtoname = command.dtotype;
       }
    proxyprinttodiv("insertbydtotype dtoname :- ", dtoname, 38);
    if (dtoname) {
        dtoindex = getindex(bigdto, dtoname, null); 
        proxyprinttodiv("insertbydtotype dtoindex:- ", dtoindex, 38);
        if(!insertobj.metadata){ insertobj.metadata={};}
        delete insertobj.wid;
        insertobj["metadata"]["method"]=dtoname;
        proxyprinttodiv("insertbydtotype setbyindex  insertobj:- ", insertobj, 38);
        proxyprinttodiv("insertbydtotype setbyindex  null inputobj:- I", inputobj, 38);
        if (dtoindex===null) { // create outside wrapper
            dtoname=inputobj["metadata"]["method"];
            insertobj[dtoname]={};
            extend(true, insertobj[dtoname], inputobj)
            inputobj=insertobj;
            proxyprinttodiv("insertbydtotype setbyindex  null inputobj:- II", inputobj, 38);
            inputobj=ConvertFromDOTdri(inputobj);
            proxyprinttodiv("insertbydtotype setbyindex  null inputobj:- HI", "HI", 38);
            proxyprinttodiv("insertbydtotype setbyindex  null inputobj:- III", inputobj, 38);
            }
        else {
            setbyindex(inputobj, dtoindex, insertobj);
            proxyprinttodiv("insertbydtotype setbyindex  inputobj:- ", inputobj, 38);
            inputobj=ConvertFromDOTdri(inputobj);
            }
       }
    proxyprinttodiv("insertbydtotype result :- ", inputobj, 38);
    return inputobj;
}


function getindex(parameterobject, dtoname, indexstring) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var match;
    var potentialmap;
    if (parameterobject["metadata"] && parameterobject["metadata"]["method"] && parameterobject["metadata"]["method"]===dtoname) {return ""}

    else
    {
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
    }
    proxyprinttodiv('Function indexstring ', indexstring, 23);  

    debugfn("getindex code generator", "getindex", "get", "code", 2, 1, {
        0: inbound_parameters,
        1: indexstring
    }, 6); 
    
    return indexstring;

} 

function setbyindex(obj, str, val) {
    var keys, key;
    //make sure str is a string with length
    if (str==="") {extend(true, obj, val)}

    else
    {
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
    }
};



exports.deepfilter = deepfilter = function deepfilter(inputObj, dtoObjOpt, command, callback) {
    console.log("<< in deepfilter >>");
    var modifiedObj = {};
    extend(true, modifiedObj, inputObj);   
    proxyprinttodiv("deepfilter inputObj", inputObj, 41);
    proxyprinttodiv("deepfilter dtoObjOpt", dtoObjOpt, 41); 
    if (dtoObjOpt) {
        recurseModObj(modifiedObj, dtoObjOpt, command, function (err, res) {
            proxyprinttodiv("deepfilter result with dtoObjOpt", res, 41);
            callback(null, res);
        });
    } else {
        proxyprinttodiv("deepfilter result without dtoObjOpt", inputObj, 41);
        callback(null, inputObj);
    }
}

function recurseModObj(inputObject,dtoObject, command, callback){

    if(command && !command["command.deepfilter.convert"]){ //command undefined
        command["command.deepfilter.convert"]=false;    //default value
    }
    
    var modifiedObj = {};
    
    var todolist = [];
    Object.keys(inputObject).forEach(function (inpKey) {
        //for (eachkey in inputObject) {
        todolist.push(inpKey);
        //}
    });
    proxyprinttodiv("recurseModObj - todolist ", todolist, 41);
    
    //async.series([
        //function step1(cb1) { //step1 start
            async.mapSeries(todolist, function (inpKey, cbMap) {
                async.nextTick(function () { 
                    var inpVal = inputObject[inpKey];
                        proxyprinttodiv("recurseModObj - inpKey ", inpKey, 41);
                        proxyprinttodiv("recurseModObj - inpVal ", inpVal, 41);
                        
                    if (dtoObject.hasOwnProperty(inpKey)) {
                        var dataType = dtoObject[inpKey];
                        proxyprinttodiv("recurseModObj - dataType ", dataType, 41);
                
                        
                        if(typeof inpVal === "string" && (dataType === "boolean" || dataType === "string" ||  dataType === "number" ||  dataType === "date")) {
                            if(command["command.deepfilter.convert"]==false){
                                modifiedObj[inpKey] = inpVal;
                            }else{
                                switch(dataType) {
                                    case "boolean":
                                                var convB = null;
                                                if (inpVal == true) {
                                                    convB = true;
                                                } else if (inpVal == false) {
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
                                                m = (m<38 ? '0'+m : m);
                                                var d = arrD[1];
                                                d = (d<38 ? '0'+d : d);
                                                var y = arrD[2];
                                                var date = new Date(y,m-1,d); 
                                                // add a day
                                                date.setDate(date.getDate() + 1);
                                                modifiedObj[inpKey] = date;                                                       
                                        break;
                                }
                            }
                            proxyprinttodiv("recurseModObj - modifiedObj[inpKey] I ", modifiedObj[inpKey], 41);
                            cbMap(null);
                        //} else if(typeof inpVal === "object" &&  dataType === "object") {
                        //} else if((typeof inpVal === "object") &&  (typeof dataType === "object")) {                            //Ignoring metadata property in input.
                        } else if((typeof inpVal === "object")) {
                            //proxyprinttodiv("typeof inpVal (object) - ", inpVal, 41);
                            
                            if (inpKey !== "metadata") {
                                proxyprinttodiv("recurseModObj - modifiedObj[inpKey] II ", modifiedObj[inpKey], 41);
                                recurseModObj(inpVal,dataType,command, function (err, result) {
                                    //var modObj = recurseModObj(inpVal,dataType,command);
                                    modifiedObj[inpKey] = result;
                                    proxyprinttodiv("recurseModObj - modifiedObj[inpKey] III ", modifiedObj[inpKey], 41);
                                    cbMap(null);
                                });

                            }else{
                                modifiedObj[inpKey] = inpVal;  
                                proxyprinttodiv("recurseModObj - modifiedObj[inpKey] IV", modifiedObj[inpKey], 41);
                                cbMap(null);                  
                            }
                        } else {
                            // to read wid obj via getwidmaster
                            execute({"executethis":dataType}, function (err, result) {
                                //proxyprinttodiv("getwidmaster result for wid  " + dataType, result, 41);
                                var widObj = result[0][0];
                                if(widObj){
                                    if(widObj.hasOwnProperty(inpVal)){
                                        modifiedObj[inpKey] = inpVal;
                                    }
                                }
                                proxyprinttodiv("recurseModObj - modifiedObj[inpKey] V ", modifiedObj[inpKey], 41);                             
                                cbMap(null);
                            });
                        } /*else {
                            //Doesn't match with dto -- Nullifying the param
                            modifiedObj[inpKey] = null;
                            cbMap(null);
                        }*/ 
                    } else {
                        delete modifiedObj[inpKey];
                        proxyprinttodiv("recurseModObj - modifiedObj[inpKey] VI ", modifiedObj[inpKey], 41);
                        cbMap(null);
                    }
                });
            }, function (err, res) {
                callback(err, modifiedObj);
            });     
        //}// step1 end 
    //], function (err, res) {
       // proxyprinttodiv("recurseModObj - resp ", resp, 11);
        //callback(err, output);
    //});      
}


// logic to add things to Local storage
exports.addtolocal = addtolocal = function addtolocal(widName, widobject) {
    if (!widobject) {
        widobject = {}
    }
    if (widName) {
        localStore.push(widMasterKey + widName, widobject);
    }
};

// logic to get things from Local storage
exports.getfromlocal = getfromlocal = function getfromlocal(inputWidgetObject) {
    var output = {};
    if (inputWidgetObject["wid"]) {
        inputWidgetObject = toLowerKeys(inputWidgetObject);
        var widKey = inputWidgetObject["wid"].toLowerCase();
        output = localStore.get(widMasterKey + widKey);
        if (output == null) {
            output = {};
        }
    }
    proxyprinttodiv('getfromlocal output', output, 38);
    //var x = localStore.get(inputWidgetObject);
    //if (!x) {x={}};
    return output
};

// logic to clear things from Local storage
exports.testclearstorage = testclearstorage = function testclearstorage() {
    widMasterKey = "widmaster_";
    potentialwid = 0;
    localStore.clear();
    // localStorage.clear();
};
(function (window) {

    // Utility function to return json with all keys in lowercase
    exports.toLowerKeys = toLowerKeys = function toLowerKeys(obj) {
        if (obj && obj instanceof Object) {
            var key, keys = Object.keys(obj);
            var n = keys.length;
            var newobj = {}
            while (n--) {
                key = keys[n];
                newobj[key.toLowerCase()] = obj[key];
            }
            return newobj;
        } else {
            return obj;
        }
    };

    // Utility function to return json attr count
    exports.jsonLength = jsonLength = function jsonLength(obj) {
        return Object.keys(obj).length;
    };


    /* lib.js functions */

    var recurFunc = function (arr, val) {

        // stop condition
        if (arr.length <= 0) {
            return val;
        }
        // check if array
        // pop the first item of the array;
        var first = arr[0];
        var rest = arr.slice(1);

        var result = {};
        //if (_.isUndefined(result[first]) ) {
        if (isUndefined(result[first])) {
            result[first] = {};
        }

        var temp = recurFunc(rest, val);
        result[first] = temp;
        return result;
    }

    // exports.converttojson = converttojson = function converttojson(data) {
    //     var output = {};

    //     // Take data as an object with dot notation key
    //     if (isObject(data) && !isArray(data)) {
    //         for (var item in data) {
    //             if (data.hasOwnProperty(item)) {
    //                 var iArray = item.split(".");
    //                 var value = data[item];
    //                 // Copy all of the properties in the source objects over to the destination object, and return the destination object. 
    //                 // It's in-order, so the last source will override properties of the same name in previous arguments.
    //                 extend(true, output, recurFunc(iArray, value));
    //             }
    //         }
    //     }
    //     return output;
    // }


    // https://github.com/justmoon/node-extend
    var hasOwn = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;

    function isPlainObject(obj) {
        if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
            return false;

        var has_own_constructor = hasOwn.call(obj, 'constructor');
        var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
        // Not own constructor property must be Object
        if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
            return false;

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    };

    exports.extend = extend = function extend() { // similar to jquery exetend()
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && typeof target !== "function") {
            target = {};
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];

                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };


    // Deconstructs the dot.notation string into an object that has properties.
    exports.ConvertFromDOTdri = ConvertFromDOTdri = function ConvertFromDOTdri(input) { //Expands to Real javascript object
        var keys = Object.keys(input);
        var result = {};

        for (var i = 0, l = keys.length; i < l; i++) {
            createObjects(result, keys[i].split('.'), input[keys[i]]);
        }
        return result;
    };


    // Creates an object with a hash parent:value. If the chain array is more that 1, 
    // recurse until there is only 1 chain so you get chain:value returned. This is called only 
    // from ConvertFrom DOT, so you can see it part of the process of deconstructing the dot.notaion string.
    exports.createObjects = createObjects = function createObjects(parent, chainArray, value) {
        //proxyprinttodiv('createobject parent',  parent,38);
        //proxyprinttodiv('createobject chainArray',  chainArray,38);
        if (chainArray.length == 1) {
            parent[chainArray[0]] = value;
            return parent;
        } else {
            parent[chainArray[0]] = parent[chainArray[0]] || {};
            return createObjects(parent[chainArray[0]], chainArray.slice(1, chainArray.length), value);
        }
    };

    //http://scott.donnel.ly/javascript-function-to-convert-a-string-in-dot-andor-array-notation-into-a-reference/
    exports.ConvertToDOTdri = ConvertToDOTdri = function ConvertToDOTdri(obj) { //dotize
        var res = {};
        (function recurse(obj, current) {
            for (var key in obj) {
                var value = obj[key];
                var newKey = (current ? current + "." + key : key); // joined key with dot
                if (value && typeof value === "object") {
                    recurse(value, newKey); // it's a nested object, so do it again
                } else {
                    res[newKey] = value; // it's not an object, so set the property
                }
            }
        }(obj));
        return res;
    };


    exports.getnewwid = getnewwid = function getnewwid(parameters, callback) {
        //potentialwid++;
        //return String(potentialwid);
        var executeobject = {"executethis": "getwid", "wid": "currentwid"};
        var widvalue = 1;
        if (parameters && parameters['widvalue']) {widvalue=parseInt(parameters['widvalue'])}

        execute(executeobject, function (err, result) {
            executeobject=result[0];
            if(Object.keys(executeobject).length !== 0) {
                widvalue=parseInt(executeobject['widvalue'])
                widvalue++;
                }
            proxyprinttodiv("deepfilter getnewwid", widvalue, 17);
            executeobject['widvalue']=String(widvalue)
            executeobject['wid']="currentwid"
            executeobject['executethis']='updatewid';
            proxyprinttodiv("deepfilter getnewwid", executeobject, 17);
            execute(executeobject, function (err, result) {
                    callback(null, executeobject['widvalue']);
            });
        })
    };      

    // Strips the numbers from hash keys. It returns 3 arrays: input list, index list, and original input list.
    // Used by addWidParameters.
    // exports.RemoveIndex = RemoveIndex = function RemoveIndex(input) {
    //     var result = [];

    //     //input = { 'a<1>': 'x', 'b<3>': 'y', 'c': 'z', 'd.e': 't', 'f<4>': 'y' };

    //     var list1 = [];
    //     var list2 = [];
    //     var list3 = [];

    //     for (key in input) {
    //         //case1
    //         var s1 = key;
    //         var re = /<(\d+)>/;
    //         s1 = s1.replace(re, '');

    //         //console.log(s1);

    //         var o1 = {};
    //         o1["key"] = s1;
    //         o1["value"] = input[key];
    //         list1.push(o1);

    //         //case2
    //         var s2 = key;
    //         s2 = s2.match(re);
    //         var o2 = {};
    //         if (s2) {
    //             o2["key"] = s1;
    //             o2["value"] = s2[1];
    //         } else {
    //             o2["key"] = s1;
    //             o2["value"] = '';
    //         }
    //         list2.push(o2);

    //         //case3
    //         var o3 = {};
    //         o3["key"] = key;
    //         o3["value"] = input[key];
    //         list3.push(o3);
    //     }


    //     result.push(list1);
    //     result.push(list2);
    //     result.push(list3);

    //     return result;
    // };


    // Returns true if the parameter is lower case
    exports.isParameterLower = isParameterLower = function isParameterLower(parameters, str) {
        //function isParameterLower(parameters, str) {
        // getObjectSize(parameters);
        var length;
        if (parameters.length === undefined) {
            length = Object.keys(parameters).length;
        } else {
            length = parameters.length
        }
        for (key in parameters) { //rewritten
            if (key.toLowerCase() == str) {
                return true;
            }
        }
    };

    // Deletes a hash from an object    
    exports.remove = remove = function remove(parameters, str) {
        //function remove(parameters, str){
        var length;
        if (parameters.length === undefined) {
            length = Object.keys(parameters).length;
            for (key in parameters) { //rewritten
                if (key.toLowerCase() == str) {
                    delete parameters[key];
                }
            }
        } else {
            length = parameters.length
        }
    };

        // This will lower parameters, and filter based on data in right parameters, and apply defaults to output if
    // the key is missing in the data, but found in the rightparameters
    exports.tolowerparameters = tolowerparameters = function tolowerparameters(parameters, defaults_object, filter_object, deleteflag) {
        proxyprinttodiv("tolowerparameters parameters", parameters, 88);
        proxyprinttodiv("tolowerparameters defaults_object", defaults_object, 88);
        proxyprinttodiv("tolowerparameters filter_object", filter_object, 88);
        proxyprinttodiv("tolowerparameters deleteflag", deleteflag, 88);
        var val;
        var filteredobject = {};
        var output={};
        var eachparm;
        if (!filter_object) {filter_object = default_object}

        for (eachparm in parameters) {
            output[eachparm.toLowerCase()] = parameters[eachparm]; // first lower case each parameter
            }

        if (Object.keys(defaults_object).length>0) {
            for (eachparam in defaults_object) { // adopt from rightparam -- for each param check against rightparm
                val = defaults_object[eachparam];
                if (isObject(val)) {
                    extend(true, output[eachparam], val)
                    }
                else {
                    if (val.length!==0 && !output[eachparam]) { // if val exists and parm does not, then adopt
                        output[eachparam]=val;
                        }
                    }
                }
            }

        if (Object.keys(filter_object).length>0) {
            for (eachparam in filter_object) { // create filtered results
                if (output[eachparam]) {
                    filteredobject[eachparam]=output[eachparam]
                    } // create left over object each iteration
                if (deleteflag) {delete output[eachparam]} // delete filter parms from result
                }
            }
        proxyprinttodiv("tolowerparameters output", output, 88); 
        proxyprinttodiv("tolowerparameters filteredobject", filteredobject, 88);         
        return {
                    output : output,
                    filteredobject : filteredobject
                }
    }



    // // This will lower parameters, and filter based on data in right parameters, and apply defaults to output if
    // // the key is missing in the data, but found in the rightparameters
    // exports.tolowerparameters = tolowerparameters = function tolowerparameters(parameters, rightparameters, should_I_filter, filter_object) {
    //     if (!filter_object) {
    //         filter_object = rightparameters;
    //     }

    //     // Use only the params that apply to the filter and assign to output
    //     var output = (should_I_filter) ? filter_params(parameters, filter_object) : just_lower_parameters(parameters);
    //     // Iterate throught the right parameters...if we find a value to assign, do so, but only
    //     // if it does not exist yet
    //     for (tmp_key in rightparameters) {
    //         // Grab the key of the hash
    //         var key = tmp_key.toLowerCase();
    //         // Grab the value of the hash
    //         var val = rightparameters[tmp_key];
    //         // Grab the value of the key in the data
    //         var target = output[key.toLowerCase()];
    //         // Polish the target...it may need it
    //         // Do not lowercase anything that is not a string
    //         if (typeof target === "string") {
    //             target = ( target === undefined ) ? "" : target.toLowerCase();
    //         }
    //         // Simply make sure our target is defined
    //         if (target === undefined) target = "";
    //         // If there is no value in the filter, skip and move on
    //         if (val === undefined) continue;
    //         // if ( val.length > 0 && target.length === 0) {
    //         // If there is no value in the target data, put in the default that you 
    //         // find in the right params...it is assigned to 'val'
    //         if (target.length === 0) {
    //             // Polish val... it may need it
    //             val = (val === 'add') ? "" : val;
    //             // Apply it to the output
    //             output[key] = val;
    //         }
    //     }
    //     var left_over_object = {};
    //     for (var p in parameters) {
    //         // console.log("LLLLLLLLLLLeftovers\n" + JSON.stringify(parameters, '-', 4));

    //         if (!output.hasOwnProperty(p.toLowerCase())) {
    //             // left_over_object[p.toLowerCase()] = parameters[p].toLowerCase();
    //             left_over_object[p.toLowerCase()] = parameters[p];
    //         }
    //     }

    //     var return_data = {};

    //     return_data["output"] = output;
    //     return_data["left_over_object"] = left_over_object;

    //     // return_data = output;
    //     return return_data;
    // }

    exports.filter_params = filter_params = function filter_params (parameters, filter_object) {
        var output = {};
        var target_value = "";
        // Get just the keys from the filter_object
        var filter_by_keys = [];
        for (f in filter_object) {
            filter_by_keys.push(f.toLowerCase());
        }
        // Walk throught the data, 1 key at a time
        for (var p in parameters) {
            // Look at the filter and apply it to the data
            for (var v in filter_by_keys) {
                // If a parameterkey equals the filterkey we are looking at, 
                // put the parameterkey in the output with the lowercase value of the parameter
                if (p.toLowerCase() === filter_by_keys[v]) {
                    // Assign the data, but only lowercase strings, not other data types
                    if (typeof parameters[p] === 'string') {
                        // output[p.toLowerCase()] = parameters[p].toLowerCase();
                        output[p.toLowerCase()] = parameters[p];
                    } 
                    else {
                        output[p] = parameters[p];
                    }
                }
            }
        }

        return output;
    }

    // This is to lower keys of objects only.
    exports.just_lower_parameters = just_lower_parameters = function just_lower_parameters(data) {
        var data_out = {};
        for (d in data) {
            data_out[d.toLowerCase()] = data[d];
        }
        return data_out;
    }

    exports.pack_up_params = pack_up_params = function pack_up_params(parameters, command, com_user) {
        var command_object={};
        if (command) {
            extend(true, command_object, command);
            proxyprinttodiv('pack_up_params parameters', parameters, 97); 
            proxyprinttodiv('pack_up_params command_object', command_object, 97);  
            proxyprinttodiv('pack_up_params com_user', com_user, 97); 
            if (command_object && command_object[com_user]) delete command_object[com_user];
            proxyprinttodiv('pack_up_params command_object II', command_object, 97); 
            if (!parameters.command) {parameters.command={}}
            extend(true, parameters.command, command_object)
            if (Object.keys(parameters.command).length ===0) {delete parameters.command}
            }
            proxyprinttodiv('pack_up_params parameters END', parameters, 97); 
            return parameters;
    }



    // exports.tolowerparameters2 = tolowerparameters2 = function tolowerparameters2(parameters, rightparameters, filter) {
    //     var outputparameters = {};
    //     for (var p in param)
    //     console.log('Params:\n' + JSON.stringify(parameters, "-", 4));
    //     console.log('rightparameters:\n' + JSON.stringify(rightparameters, "-", 4));
    //     // Iterate throught the filter params, putting in the defaults of the filter params    
    //     for (temp in rightparameters) {
    //         var eachparameter = temp.toLowerCase();
    //         // if the 'value' of a filter param is exists...do the following. btw the first arg has
    //         // to be true if the second is true...i.e. you don't need to check for arg2 
    //         // if ((rightparameters[eachparameter].length > 0) || (rightparameters[eachparameter] == 'add')) {
    //         if (rightparameters[eachparameter].length > 0 || rightparameters[eachparameter] === "") {
    //             // Store the value of the 'value' of the filter param in 'x'
    //             var x = rightparameters[eachparameter].toLowerCase();
    //             // Grab the value of the matching key in the 'data'
    //             var y = parameters[eachparameter];
    //             // Fix an undefined value of y or lowercase the defined value
    //             if (y === undefined) {
    //                 y = "";
    //             }
    //             else {
    //                 y = y.toLowerCase();
    //             }
    //             // If x is 'add', remove it
    //             if (x.toLowerCase() == 'add') { 
    //                 // If the data has a key that matches the filter params AND the value is not ""
    //                 if (y.length > 0) {
    //                     // Assign x the value of the data that matches the filter key
    //                     x = y; 
    //                 } 
    //                 else {
    //                     // Otherwise you need to reset x to ""...we dont want 'add' in the data do we?
    //                     x = "";
    //                 }
    //             };
    //             // Check and see if the data should override the default
    //             if (y.length > 0) {
    //                 // Assign the original data
    //                 outputparameters[eachparameter.toLowerCase()] = y.toLowerCase(); 
    //             }
    //             else {
    //                 // Put x in the key of the output params so that { eachparameter: x } is added to the output
    //                 outputparameters[eachparameter.toLowerCase()] = x.toLowerCase(); 
    //             }
    //         }
    //     }
    //     console.log('Before filter check output:\n' + JSON.stringify(outputparameters, "-", 4));
    //     // Now that the defaults are in place, decide if you should use defaults or actual data
    //     if (!filter) {
    //         // Iterate through the actual data
    //         for (eachparameter in parameters) {
    //             // If you do not find a parameter key in the output data...do the following ---is this wrong? I think so
    //             if ( !outputparameters[eachparameter.toLowerCase()] ) {    
    //                     // Give the output a key from the data, and the value it contains
    //                     outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter].toLowerCase();
    //             }
    //         }
    //     }
    //     return outputparameters;
    // };

    //rightparameters && rightparameters[eachparameter] && 

    // Adds the key of object2 to object 1
    exports.jsonConcat = jsonConcat = function jsonConcat(o1, o2) {
        var clonedObject = {};
        extend(true, clonedObject, o1); // clone received params

        for (var key in o2) {
            if ((clonedObject[key] === undefined) || (clonedObject[key] == "")) {
                clonedObject[key] = o2[key];
            }
        }
        return clonedObject;
    };

    // Returns if o is a string or not
    exports.isString = isString = function isString(o) {
        return typeof o == "string" || (typeof o == "object" && o.constructor === String);
    };

    // Returns true if the val is an int, or false
    exports.isInteger = isInteger = function isInteger(val) {
        return val.match(/^[0-9]$/);
    };

    exports.isSet = isSet = function isSet(val) {
        if ((val != undefined) && (val != null)) {
            return true;
        }
        return false;
    };


    // exports.isUndefined = isUndefined = function isUndefined(obj) {
    //     return obj === void 0;
    // }

    exports.isArray = isArray = function isArray(obj) { //nativeIsArray
        return toString.call(obj) == '[object Array]';
    };

    exports.isObject = isObject = function isObject(obj) {
        return obj === Object(obj);
    };

    exports.isFunction = isFunction = function isFunction(obj) {
        return typeof obj === 'function';
    };

    exports.isJson = isJson = function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    exports.printToDiv = printToDiv = function printToDiv(text, obj, debugone) {
        if (!debugone) {
            debugone = -1;
        }
        if ((Debug == 'true') || (debuglevel == debugone) || (debugone == 99)) {
            printText = '<pre>' + text + '<br/>' + JSON.stringify(obj) + '</pre>';
            // console.log(text);
            // console.log(obj);
            if (document.getElementById('divprint')) {
                document.getElementById('divprint').innerHTML = document.getElementById('divprint').innerHTML + printText; //append(printText);
            }
        }
    };

    exports.proxyprinttodiv = window.proxyprinttodiv = proxyprinttodiv = function proxyprinttodiv(text, obj, debugone) { // **** making code node compatible
        if (exports.environment === "local") {
            printToDiv(text, obj, debugone);
        }
    }

    // exports.arrayUnique = window.arrayUnique = arrayUnique = function arrayUnique(array) {
    //     var a = array.concat();
    //     for (var i = 0; i < a.length; ++i) {
    //         for (var j = i + 1; j < a.length; ++j) {
    //             if (a[i] === a[j])
    //                 a.splice(j--, 1);
    //         }
    //     }
    //     return a;
    // };

    exports.logverify = logverify = function logverify(test_name, data_object, assertion_object) {
        if (test_name === undefined) test_name = "defaulttest";

        var result = deepDiffMapper.map(data_object, assertion_object);
        // Assume UNKNOWN...
        var test_results = "UNKNOWN";
        var temp_string = JSON.stringify(result);
        // If there is a value of 'unchanged', there IS data that has passed,
        // so for now, set the 'test_results' to PASS.
        if (temp_string.indexOf("unchanged") !== -1) test_results = "PASS";
        // If there are any of 'created', 'updated', 'deleted', the tests now fails, even if
        // it passed before...if none of the 4 strings are found, the test_results will 
        // remain 'UNKNOWN'
        if (temp_string.indexOf("created") !== -1 || temp_string.indexOf("deleted") !== -1 || temp_string.indexOf("updated") !== -1) test_results = "FAIL";

        var data = {};
        data[test_name] = test_results;
        data["test_name"] = test_name;
        data[test_name + '_diff'] = result;
        return data;
    }

    exports.debugfn = debugfn = function debugfn() {
        var processdebug = false;
        var color_list = [
            "black",
            "red",
            "green",
            "maroon",
            "olive",
            "teal",
            "blue",
            "fuchsia",
            "purple",
            "lime",
            "green",
            "MediumBlue"
        ]

        var indebugdesc = String(arguments[0]) || ""; // 
        var indebugname = String(arguments[1]) || ""; // main fn
        var indebugcat = String(arguments[2]) || ""; // add/get
        var indebugsubcat = String(arguments[3]) || ""; // sub fn
        var indebugcolor = color_list[arguments[4]] || ""; // level
        var indebugindent = arguments[5] || ""; // level
        var debugobjectlist = (arguments[6]) ? arguments[6] : {
            "data": "none"
        };
        //var debugobjectlist = JSON.parse(JSON.stringify(tempdebugobjectlist));
        var indebugdest = arguments[7] || ""; // level
        var displaycolor = indebugcolor;
        var tempdebugname = (debugname != "") ? debugname : indebugname;
        var tempdebugcat = (debugcat != "") ? debugcat : indebugcat;
        var tempdebugsubcat = (debugsubcat != "") ? debugsubcat : indebugsubcat;

        proxyprinttodiv('arrived debugfn', arguments, 44);
        proxyprinttodiv('arrived debugname', debugname, 44);
        proxyprinttodiv('arrived debugcat', debugcat, 44);
        proxyprinttodiv('arrived debugsubcat', debugsubcat, 44);
        proxyprinttodiv('arrived indebugname', indebugname, 44);
        proxyprinttodiv('arrived indebugcat', indebugcat, 44);
        proxyprinttodiv('arrived indebugsubcat', indebugsubcat, 44);
        proxyprinttodiv('arrived indebugdest', indebugdest, 44);
        proxyprinttodiv('arrived tempdebugname', tempdebugname, 44);
        proxyprinttodiv('arrived tempdebugcat', tempdebugcat, 44);
        proxyprinttodiv('arrived tempdebugsubcat', tempdebugsubcat, 44);

        if (indebugname == tempdebugname && indebugcat == tempdebugcat && indebugsubcat == tempdebugsubcat) {
            processdebug = true
        } else {
            processdebug = false
        };
        if (debugname + debugcat + debugsubcat == "") {
            processdebug = false
        }
        if (!processdebug) return;
        if (!indebugdest) {
            indebugdest = debugdestination
        }
        proxyprinttodiv('arrived debugname', debugname, 44);

        // If the color goes over 10, turn it back to black
        if (displaycolor > 10) displaycolor = 0;

        //length = arguments.length;

        // If there is no data from debugvars, say so
        // if (debugobjectlist.length < 1) debugobjectlist = {"data":"none"};
        // var outobject={"hello":"world"};
        var outobject = {};

        //  if blank debugcolor, blank debugindent

        //  1) determine if we should play...missing "and"
        //  if global debugname = incoming debugname the process this object (or subcat or cat)
        // if (indebugcat==debugcat) {processdebug=true};
        // if (indebugsubcat==debugsubcat) {processdebug=true};

        // if processdebug {
        debugfilter = 0;
        switch (debugfilter) {
        case 0:
            outobject = debugobjectlist;
            break;

        case 1:
            // only the first var
            break;

        case 2:
            // only the 1,2 var
            break;


        }

        switch (indebugdest) // 1 for print, 2 for googlespreadsheets, 3 for both
        {
        case 1:
            dbug_print(indebugindent, displaycolor);
            break;

        case 2:
            store_to_google(indebugname, outobject);
            break;

        case 3:
            dbug_print(indebugindent, displaycolor);
            store_to_google(indebugname, outobject);
            break;
        case 4:
            etlogresults(indebugname, outobject)
            break;
        case 5:
            etcreatecode(indebugindent, displaycolor, indebugname);
            break;
        case 6:
        if (exports.environment === 'local') {
            outobject[3] = getFromLocalStorage("DRIKEY");
            // outobject[4]=getFromLocalStorage("DRIKEY");
            etlogresults(indebugname, outobject)
        }
            break;
        case 7:
            etcreatecode(indebugindent, displaycolor, indebugname);
            break;
        case 9:
            create_string(indebugindent, displaycolor, indebugname);
            break;
        }

        function etlogresults(indebugname, outobject) {
            // alert('logging' + JSON.stringify(outobject, "-", 4));
            proxyprinttodiv('arrived debuglog', debuglog, 44);

            if (!outobject) {
                outobject = {}
            }
            if (outobject[0] === undefined) {
                outobject[0] = {}
            }
            if (outobject[1] === undefined) {
                outobject[1] = {}
            }
            if (outobject[2] === undefined) {
                outobject[2] = new Date();
            }
            if (outobject[3] === undefined) {
                outobject[3] = {};
            }
            if (outobject[4] === undefined) {
                outobject[4] = {};
            }
            proxyprinttodiv('debugfn indebugname', indebugname, 44);
            proxyprinttodiv('debugfn etlogresults', outobject, 44);
            outobject[2] = indebugname + outobject[2].getTime();

            var temparray = [];
            var tempvar = {};

            tempvar["command"] = {};
            tempvar["command"]["executemethod"] = indebugname;
            temparray.push(tempvar);
            temparray.push(outobject[0]);
            temparray.push(outobject[1]);
            temparray.push(outobject[3]);
            temparray.push(outobject[4]);
            if (!debuglog[outobject[2]]) {
                debuglog[outobject[2]] = []
            }
            //proxyprinttodiv('arrived debuglog[outobject[2]]', debuglog[outobject[2]], 38);
            //proxyprinttodiv('arrived temparray', temparray, 38);
            debuglog[outobject[2]].push(temparray);
            // debuglog.push(temparray);
            proxyprinttodiv('arrived debuglog end', debuglog, 44);
        }

        function create_string() {
            // $('#divprint').append('####################  debug log     #########################\n');
            // $('#divprint').append('############' + JSON.stringify(debuglog, "-", 4) + '\n');
            $('#divprint').append('####################  debug output  #########################\n');

            for (eachtest in debuglog) {
                testresults = debuglog[eachtest];
                var test_to_print = "";
    var name = testresults[0][0]['command']['executemethod'];
                
                // var parameters  = JSON.stringify(testresults['0'][1]['0'], "-", 4);
                // console.log('testresults[0][1]: ' + JSON.stringify(testresults[0][1]));
                // console.log('parameters: ' + parameters);
                
                // Pull out the parameters
                var raw_parameters  = testresults[0][1];
                var parameters = [];

                // Look in parameters to see if it is an 'array' inside
                // the object...if you don't see a zero, just add the data to
                // the array...if you do see a zero, iterate throught the object and
                // just add the values of the hash to the array...the array does not
                // need to know about the nubmers 0,1,2, etc...just the data
                if (!raw_parameters.hasOwnProperty("0")) {
                    console.log('object');
                    parameters.push(raw_parameters);
                    parameters = JSON.stringify(parameters, "-", 4);
                } else {
                    console.log('array');
                    for (var j in raw_parameters) {
                        parameters.push(raw_parameters[j]);
                    }
                    parameters = JSON.stringify(parameters, "-", 4);
                }

                // var raw_parameters = [];
                // for (var i in testresults[0][1]) {
                //     raw_parameters.push(testresults[0][i]);
                // }
                // var parameters = JSON.stringify(raw_parameters, "-", 4);



                var assert      = JSON.stringify(testresults[0][2], "-", 4);
                var database    = JSON.stringify(testresults[0][3]);
                var command     = '{"command": "null"}';

                test_to_print = '[\n    [\n'   +
                                '        {"fn": "test_and_verify"},\n        [\n' +         
                                '           "' + name          + '",\n'   +
                                '           "' + name          + '",\n'   +
                                '            ' + parameters    + ',\n'    +
                                '            ' + assert        + ',\n'    +
                                '            ' + database      + ',\n'    +
                                '            ' + command       + '\n        ]\n'  +
                                '    ]\n],\n';

                $('#divprint').append(test_to_print);
            }
            $('#divprint').append('####################  debug output end ######################');
        }

        function etcreatecode(indebugindent, displaycolor, indebugname) {
            proxyprinttodiv('debugfn end debuglog', debuglog, 38);
            var resultlog = [];
            var eachtest;
            var eachsubtest;
            var testresults;
            var subtest;

            for (eachtest in debuglog) {
                testresults = debuglog[eachtest];
                //proxyprinttodiv('debugfn testresults', testresults, 38);
                for (eachsubtest in testresults) {
                    subtest = testresults[eachsubtest];
                    resultlog.push(subtest);
                    // proxyprinttodiv('debugfn subtest', subtest, 38);
                    // proxyprinttodiv('   debugfn subtest[0]', subtest[0], 38);
                    // proxyprinttodiv('   debugfn subtest[1]', subtest[1], 38);
                    // proxyprinttodiv('   debugfn subtest[2]', subtest[2], 38);
                }
                if (testresults[3]) {}
                if (testresults[4]) {}
                // }
            }

            var jsonPretty = JSON.stringify(resultlog, "-", 4);
            var temp_HTML = "<br>" + "<div style='color:" + displaycolor + "; padding-left:" + (8 * indebugindent) + "em'>" +
                "<br> Include at function to be tested, begining of function: <br>        var originalarguments=arguments;" +
                "<br> End of function:<br> " +
                "        debugfn('-desc-', '-functioname-', '-cat-', '-subcat-', -color-, -indent-, { <br>" +
                "               0: originalarguments,  // <br>" +
                "               1: ret                 // <br>" +
                "               }, 4); <br> <br>" +
                "To trigger: debugname= and/or debucat= and/or debugsubcat=<br>" +
                "Data list produced is as follows:<br>" +
                "[<br>[{function},{inputParameters},{AssertionParmeters}],<br>[{function},{inputParameters},{AssertionParmeters}],<br>" +
                "[{function},{inputParameters},{AssertionParmeters}]<br>]<br><br>" +
                "var execute_list = " + jsonPretty + "</div>";
            if (exports.environment === "local") {
                $('#divprint').append(temp_HTML);
            }
        }

        function dbug_print(indent, displaycolor) {

            if (displaycolor == "") {
                displaycolor = "brown"
            };
            var jsonPretty = JSON.stringify(outobject, "-", 4);
            debuglinenum++;
            if (indent > 0) {
                var temp_HTML = debuglinenum + " " + indebugdesc + "<br>" + "<div style='color:" + displaycolor + "; padding-left:" + (8 * indent) + "em'>" + syntaxHighlight(jsonPretty) + displaycolor + "</div>";
            } else {
                var temp_HTML = debuglinenum + " " + indebugdesc + "<br>" + "<div style='color:" + displaycolor + "'>" + syntaxHighlight(jsonPretty) + displaycolor + "</div>";
            }
            console.log("jsonpretty: " + jsonPretty);
            if (exports.environment === "local") {
                $('#divprint').append(temp_HTML);
            }
            //proxyprinttodiv('logverify - temp_HTML', temp_HTML, 38);
        }

        // print:   proxyprinttodiv('logverify - parmwid1', parmwid1, 38);

        // google: storetogoogle
        // file: outobject["testtest":"testtest"]
        //      addtolocalostore
    } // End of debugfn

    function store_to_google(indebugname, google_object) {
        if (exports.environment === "local") {
            $('#name').val(indebugname);
            $('#comment').val(JSON.stringify(google_object));
            document.getElementById('theForm').submit();
        }
    }

    function readtestresutlsandstorwegoogle() {
        // read local store
        // clear local store
        // look for testtest
        // storetogoogle
    }



    var deepDiffMapper = function () {
        return {
            VALUE_CREATED: 'created',
            VALUE_UPDATED: 'updated',
            VALUE_DELETED: 'deleted',
            VALUE_UNCHANGED: 'unchanged',
            map: function (obj1, obj2) {
                if (this.isFunction(obj1) || this.isFunction(obj2)) {
                    throw 'Invalid argument. Function given, object expected.';
                }
                if (this.isValue(obj1) || this.isValue(obj2)) {
                    return {
                        type: this.compareValues(obj1, obj2),
                        data: obj1 || obj2
                    };
                }
                var diff = {};
                for (var key in obj1) {
                    if (this.isFunction(obj1[key])) {
                        continue;
                    }
                    var value2 = undefined;
                    if ('undefined' != typeof (obj2[key])) {
                        value2 = obj2[key];
                    }
                    diff[key] = this.map(obj1[key], value2);
                }
                for (var key in obj2) {
                    if (this.isFunction(obj2[key]) || ('undefined' != typeof (diff[key]))) {
                        continue;
                    }
                    diff[key] = this.map(undefined, obj2[key]);
                }
                return diff;
            },
            compareValues: function (value1, value2) {
                if (value1 === value2) {
                    return this.VALUE_UNCHANGED;
                }
                if ('undefined' == typeof (value1)) {
                    return this.VALUE_CREATED;
                }
                if ('undefined' == typeof (value2)) {
                    return this.VALUE_DELETED;
                }
                return this.VALUE_UPDATED;
            },
            isFunction: function (obj) {
                return toString.apply(obj) === '[object Function]';
            },
            isArray: function (obj) {
                return toString.apply(obj) === '[object Array]';
            },
            isObject: function (obj) {
                return toString.apply(obj) === '[object Object]';
            },
            isValue: function (obj) {
                return !this.isObject(obj) && !this.isArray(obj);
            }
        }
    }();

    exports.syntaxHighlight = syntaxHighlight = function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

})(typeof window === "undefined" ? global : window);

(function () {
    /*
     * Sift
     *
     * Copryright 2011, Craig Condon
     * Licensed under MIT
     *
     * Inspired by mongodb's query language
     */

    /**
     */

    var _convertDotToSubObject = function (keyParts, value) {

        var subObject = {},
            currentValue = subObject;

        for (var i = 0, n = keyParts.length - 1; i < n; i++) {
            currentValue = currentValue[keyParts[i]] = {};
        }

        currentValue[keyParts[i]] = value;

        return subObject;
    }

    /**
     */

    var _queryParser = new(function () {

        /**
         * tests against data
         */

        var priority = this.priority = function (statement, data) {

            var exprs = statement.exprs,
                priority = 0;

            //generally, expressions are ordered from least efficient, to most efficient.
            for (var i = 0, n = exprs.length; i < n; i++) {

                var expr = exprs[i],
                    p;

                if (!~(p = expr.e(expr.v, _comparable(data), data))) return -1;

                priority += p;

            }


            return priority;
        }


        /**
         * parses a statement into something evaluable
         */

        var parse = this.parse = function (statement, key) {

            //fixes sift(null, []) issue
            if (!statement) statement = {
                $eq: statement
            };

            var testers = [];

            //if the statement is an object, then we're looking at something like: { key: match }
            if (statement.constructor == Object) {

                for (var k in statement) {

                    //find the apropriate operator. If one doesn't exist, then it's a property, which means
                    //we create a new statement (traversing) 
                    var operator = !! _testers[k] ? k : '$trav',

                        //value of given statement (the match)
                        value = statement[k],

                        //default = match
                        exprValue = value;

                    //if we're working with a traversable operator, then set the expr value
                    if (TRAV_OP[operator]) {


                        //using dot notation? convert into a sub-object
                        if (~k.indexOf(".")) {
                            var keyParts = k.split(".");
                            k = keyParts.shift(); //we're using the first key, so remove it

                            exprValue = value = _convertDotToSubObject(keyParts, value);
                        }

                        //*if* the value is an array, then we're dealing with something like: $or, $and
                        if (value instanceof Array) {

                            exprValue = [];

                            for (var i = value.length; i--;) {
                                exprValue.push(parse(value[i]));
                            }

                            //otherwise we're dealing with $trav
                        } else {
                            exprValue = parse(value, k);
                        }
                    }

                    testers.push(_getExpr(operator, k, exprValue));

                }


                //otherwise we're comparing a particular value, so set to eq
            } else {
                testers.push(_getExpr('$eq', k, statement));
            }

            var stmt = {
                exprs: testers,
                k: key,
                test: function (value) {
                    return !!~stmt.priority(value);
                },
                priority: function (value) {
                    return priority(stmt, value);
                }
            };

            return stmt;

        }


        //traversable statements
        var TRAV_OP = this.traversable = {
            $and: true,
            $or: true,
            $nor: true,
            $trav: true,
            $not: true
        };


        function _comparable(value) {
            if (value instanceof Date) {
                return value.getTime();
            } else {
                return value;
            }
        }

        function btop(value) {
            return value ? 0 : -1;
        }

        var _testers = this.testers = {

            /**
             */

            $eq: function (a, b) {
                return btop(a.test(b));
            },

            /**
             */

            $ne: function (a, b) {
                return btop(!a.test(b));
            },

            /**
             */

            $lt: function (a, b) {
                return btop(a > b);
            },

            /**
             */

            $gt: function (a, b) {
                return btop(a < b);
            },

            /**
             */

            $lte: function (a, b) {
                return btop(a >= b);
            },

            /**
             */

            $gte: function (a, b) {
                return btop(a <= b);
            },


            /**
             */

            $exists: function (a, b) {
                return btop(a === (b != null))
            },

            /**
             */

            $in: function (a, b) {

                //intersecting an array
                if (b instanceof Array) {

                    for (var i = b.length; i--;) {
                        if (~a.indexOf(b[i])) return i;
                    }

                } else {
                    return btop(~a.indexOf(b));
                }


                return -1;
            },

            /**
             */

            $not: function (a, b) {
                if (!a.test) throw new Error("$not test should include an expression, not a value. Use $ne instead.");
                return btop(!a.test(b));
            },

            /**
             */

            $type: function (a, b, org) {

                //instanceof doesn't work for strings / boolean. instanceof works with inheritance
                return org ? btop(org instanceof a || org.constructor == a) : -1;
            },

            /**
             */


            $nin: function (a, b) {
                return~ _testers.$in(a, b) ? -1 : 0;
            },

            /**
             */

            $mod: function (a, b) {
                return b % a[0] == a[1] ? 0 : -1;
            },

            /**
             */

            $all: function (a, b) {

                for (var i = a.length; i--;) {
                    if (b.indexOf(a[i]) == -1) return -1;
                }

                return 0;
            },

            /**
             */

            $size: function (a, b) {
                return b ? btop(a == b.length) : -1;
            },

            /**
             */

            $or: function (a, b) {

                var i = a.length,
                    p, n = i;

                for (; i--;) {
                    if (~priority(a[i], b)) {
                        return i;
                    }
                }

                return btop(n == 0);
            },

            /**
             */

            $nor: function (a, b) {

                var i = a.length,
                    n = i;

                for (; i--;) {
                    if (~priority(a[i], b)) {
                        return -1;
                    }
                }

                return 0;
            },

            /**
             */

            $and: function (a, b) {

                for (var i = a.length; i--;) {
                    if (!~priority(a[i], b)) {
                        return -1;
                    }
                }

                return 0;
            },

            /**
             */

            $trav: function (a, b) {



                if (b instanceof Array) {

                    for (var i = b.length; i--;) {
                        var subb = b[i];
                        if (subb[a.k] && ~priority(a, subb[a.k])) return i;
                    }

                    return -1;
                }

                //continue to traverse even if there isn't a value - this is needed for 
                //something like name:{$exists:false}
                return priority(a, b ? b[a.k] : undefined);
            }
        }

        var _prepare = {

            /**
             */

            $eq: function (a) {

                var fn;

                if (a instanceof RegExp) {
                    return a;
                } else if (a instanceof Function) {
                    fn = a;
                } else {

                    fn = function (b) {
                        if (b instanceof Array) {
                            return~ b.indexOf(a);
                        } else {
                            return a == b;
                        }
                    }
                }

                return {
                    test: fn
                }

            },

            /**
             */

            $ne: function (a) {
                return _prepare.$eq(a);
            }
        };



        var _getExpr = function (type, key, value) {

            var v = _comparable(value);

            return {

                //k key
                k: key,

                //v value
                v: _prepare[type] ? _prepare[type](v) : v,

                //e eval
                e: _testers[type]
            };

        }

    })();


    var getSelector = function (selector) {

        if (!selector) {

            return function (value) {
                return value;
            };

        } else
        if (typeof selector == 'function') {
            return selector;
        }

        throw new Error("Unknown sift selector " + selector);
    }

    var sifter = function (query, selector) {

        //build the filter for the sifter
        var filter = _queryParser.parse(query);

        //the function used to sift through the given array
        var self = function (target) {

            var sifted = [],
                results = [],
                value, priority;

            //I'll typically start from the end, but in this case we need to keep the order
            //of the array the same.
            for (var i = 0, n = target.length; i < n; i++) {

                value = selector(target[i]);

                //priority = -1? it's not something we can use.
                if (!~(priority = filter.priority(value))) continue;

                //push all the sifted values to be sorted later. This is important particularly for statements
                //such as $or
                sifted.push({
                    value: value,
                    priority: priority
                });
            }

            //sort the values
            sifted.sort(function (a, b) {
                return a.priority > b.priority ? -1 : 1;
            });

            var values = Array(sifted.length);

            //finally, fetch the values & return them.
            for (var i = sifted.length; i--;) {
                values[i] = sifted[i].value;
            }

            return values;
        }

        //set the test function incase the sifter isn't needed
        self.test = filter.test;
        self.score = filter.priority;
        self.query = query;

        return self;
    }


    /**
     * sifts the given function
     * @param query the mongodb query
     * @param target the target array
     * @param rawSelector the selector for plucking data from the given target
     */

    var sift = function (query, target, rawSelector) {

        //must be an array
        if (typeof target != "object") {
            rawSelector = target;
            target = undefined;
        }


        var sft = sifter(query, getSelector(rawSelector));

        //target given? sift through it and return the filtered result
        if (target) return sft(target);

        //otherwise return the sifter func
        return sft;

    }


    sift.use = function (options) {
        if (options.operators) sift.useOperators(options.operators);
    }

    sift.useOperators = function (operators) {
        for (var key in operators) {
            sift.useOperator(key, operators[key]);
        }
    }

    sift.useOperator = function (operator, optionsOrFn) {

        var options = {};

        if (typeof optionsOrFn == "object") {
            options = optionsOrFn;
        } else {
            options = {
                test: optionsOrFn
            };
        }


        var key = "$" + operator;
        _queryParser.testers[key] = options.test;

        if (options.traversable || options.traverse) {
            _queryParser.traversable[key] = true;
        }
    }


    //node.js?
    if ((typeof module != 'undefined') && (typeof module.exports != 'undefined')) {

        module.exports = sift;

    } else

    //browser?
    if (typeof window != 'undefined') {

        window.sift = sift;
    }

	exports.master_test_and_verify = master_test_and_verify = function master_test_and_verify (testname, parameters, assert, database, command, callback) {
		var err;
		var results=[];
		var temp_config = {};
		var c_assert = {};
		var c_parameters = {};

		// Take a snapshot of the default config
		extend(true, temp_config, config);
		// Make copies of the original parameters and assert
		extend(true, c_parameters, parameters);
		extend(true, c_assert, assert);

		// Call test_and_verify with the config parameters in the parameters
		test_and_verify(testname, "execute", c_parameters, c_assert, database, command, function (err, res) {
			// Add res to return data
			results.push(res);
			
			// Add the config parameters to the default config
			extend(true, config.configuration, parameters["configuration"]);

			// Reload c_parameters and delete the config
			c_parameters = extend(true, {}, parameters);
			delete c_parameters["configuration"];

			// Reload the assertion and delete the config
			c_assert = extend(true, {}, assert);
			delete c_assert[0]["configuration"];

			// Call test_and_verify with c_ verion -- actual config changed
			test_and_verify("cc_" + testname, "execute", c_parameters, c_assert, database, command, function (err, res_2) {
				// Add res to return data
				results.push(res_2);
				// Set the config back to normal
				config = extend(true, {}, temp_config);
				callback (err, results);
			});
		});
	}

    exports.test_and_verify = test_and_verify = function test_and_verify(testname, fnname, parameters, assert, database, command, callback) {
        testclearstorage();
        if (database && JSON.stringify(database) !== "{}") {
            addToLocalStorage("DRIKEY", database);
            var this_string = "[";
            for (var d in database) {
                this_string += JSON.stringify(database[d]) + ',';
            }
            this_string = this_string.substring(0, this_string.length - 1) + ']';
            addToLocalStorage("DRI", JSON.parse(this_string));
        }
        if(parameters instanceof Array){
            parameters.push(function (err, res) {
                    res = logverify(testname, res, assert);
                    callback(err, res);
                });
            window[fnname].apply(window, parameters);
        } else {
            window[fnname](
                parameters,
                function (err, res) {
                    res = logverify(testname, res, assert);
                    callback(err, res);
                });
        }
    };

    exports.converttodriformat = converttodriformat = function converttodriformat(inputObject, command) {
        var inputWidgetObject = JSON.parse(JSON.stringify(inputObject));
        delete inputWidgetObject['executethis'];
        proxyprinttodiv('Function updatewid in : inputWidgetObject', inputWidgetObject, 1);
        var saveobject = {};
        var db = "data";
        var wid;
        var metadata;
        var date;
        if (command && command.db) {db = command.db}

        inputWidgetObject['metadata.date'] = new Date();

        inputWidgetObject = ConvertFromDOTdri(inputWidgetObject);
        if (inputWidgetObject['wid']) {
            wid = inputWidgetObject['wid'];
            delete inputWidgetObject['wid'];
        }
        if (inputWidgetObject['metadata']) {
            metadata = inputWidgetObject['metadata'];
            delete inputWidgetObject['metadata'];
        }


        // for (eachwid in inputWidgetObject) {
        //     if ((inputWidgetObject[eachwid] == "onetomany") (inputWidgetObject[eachwid]=="onetoone")) {
        //         inputWidgetObject['metadata'][eachwid]['type']=inputWidgetObject[eachwid]
        //         delete inputWidgetObject[eachwid];
        //         }
        //     }
        saveobject[db] = inputWidgetObject;
        saveobject['wid'] = wid;
        saveobject['metadata'] = metadata;
        //saveobject = ConvertFromDOTdri(saveobject); // in case command.db = x.y.z nested was sent in

        // saveobject['wid']=wid;
        // saveobject['metadata.method']=method;
        // if (inputWidgetObject) {
        //     saveobject['data'] = inputWidgetObject;
        //     }
        // saveobject = ConvertFromDOTdri(inputWidgetObject);


        // if (inputWidgetObject['wid']) {
        //     saveobject['wid'] = inputWidgetObject['wid'].toLowerCase();
        // } else {
        //     saveobject['wid'] = "";
        // }
        // proxyprinttodiv('Function updatewid in : saveobject 0', saveobject, 1);
        // delete inputWidgetObject['wid'];

        // saveobject['metadata'] = {};
        // if (inputWidgetObject['metadata.method']) {
        //     saveobject['metadata']['method'] = inputWidgetObject['metadata.method'];
        // } else {
        //     saveobject['metadata']['method'] = "";
        // }
        // saveobject['metadata']['date'] = new Date();
        // proxyprinttodiv('Function updatewid wid', saveobject['wid'], 10);
        // proxyprinttodiv('Function updatewid added date', saveobject['metadata'], 10);

        // proxyprinttodiv('Function updatewid in : saveobject I', saveobject, 1);

        // // saveobject['metadata'] = inputWidgetObject['metadata'] ;
        // delete inputWidgetObject['metadata.method'];
        // if (inputWidgetObject) {
        //     saveobject['data'] = inputWidgetObject;
        // } else {
        //     saveobject['data'] = "";
        // }

        proxyprinttodiv('Function updatewid in : saveobject II', saveobject, 1);
        return saveobject;
    };

    exports.convertfromdriformat = convertfromdriformat =  function convertfromdriformat(widobject, command) {
        var outobject = {};
        var db="data";
        if (command && command.db) {db = command.db}

        //widobject = ConvertToDOTdri(widobject); // in case db=a.b.c nested object sent in

        if ((widobject) && (Object.keys(widobject).length > 0)) {
            if (widobject[db]) {
                outobject = widobject[db];
            }

            if (widobject['wid']) {
                outobject['wid'] = widobject['wid'];
            } else {
                outobject['wid'] = "";
            }

            if (widobject['metadata']) {
                // deleting date from metadata, this is a fix for ag3
                if (widobject['metadata']['date']) {
                    delete widobject['metadata']['date'];
                }
                outobject['metadata'] = widobject['metadata'];

            } else {
                outobject['metadata'] = "";
            }
            //commented by Roger
            //outobject = ConvertToDOTdri(outobject);
        }

        // if ((widobject) && (Object.keys(widobject).length > 0)) {
        //     if (widobject["data"]) {
        //         outobject = widobject["data"];
        //     }

        //     if (widobject['wid']) {
        //         outobject['wid'] = widobject['wid'];
        //     } else {
        //         outobject['wid'] = "";
        //     }

        //     if (widobject['metadata']) {
        //         outobject['metadata.method'] = widobject['metadata']['method'];
        //         //&& added

        //     } else {
        //         outobject['metadata.method'] = "";
        //     }
        // }
        return outobject;
    };
})();
