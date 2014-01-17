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


exports.validParams = validParams = function validParams(obj){
    var keyLength = getObjectSize(obj);
    var status = false;
    if(keyLength !== 0){
        for(var k in obj){
            if(obj[k]){
                status = true;
                break;
            }
        }
    }
    return status;
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
    proxyprinttodiv('getfromlocal', inputWidgetObject, 99);
    if (inputWidgetObject["wid"]) {
        inputWidgetObject = toLowerKeys(inputWidgetObject);
        var widKey = inputWidgetObject["wid"].toLowerCase();
        output = localStore.get(widMasterKey + widKey);
        if (output == null) {
            output = {};
        }
    }
    proxyprinttodiv('getfromlocal output', output, 99);
    //var x = localStore.get(inputWidgetObject);
    //if (!x) {x={}};
    return output
};

// logic to clear things from Local storage
exports.testclearstorage = testclearstorage = function testclearstorage() {
    widMasterKey = "widmaster_";
    potentialwid = 0;
    localStore.clear();
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

    // Utility function to cleanup mentioned attr:val pairs from JSON passed in
    exports.cleanupParameters = cleanupParameters = function cleanupParameters(inboundParameters, paramsToClean) {
        var clonedObject = {};
        extend(true, outBoundParameters, inboundParameters); // clone received params

        for (var i = 0; i < paramsToClean.length; i++) {
            if (outBoundParameters[paramsToClean[i]]) {
                delete outBoundParameters[paramsToClean[i]];
            }
        }
        return outBoundParameters;
    };

    // utility function to merge two JSON objects
    exports.mergeParameters = mergeParameters = function mergeParameters(c1, c2) {
        var clonedObject = {};
        extend(true, mergedMap, c1); // clone received params

        for (var attr in c2) {
            mergedMap[attr] = c2[attr];
        }


        return mergedMap;
    };

    exports.getParamArray = getParamArray = function getParamArray(data) {
        var returnArray = new Array();

        for (var attr in data) {
            returnArray.push({
                "ParameterName": attr,
                "ParameterValue": data[attr]
            });
        }

        return returnArray;
    };

    exports.MatchDelete = MatchDelete = function MatchDelete(TargetList, TargetParameter) { // delete all parameters starting with targetparameter
        var output = [];
        //proxyprinttodiv('Function MatchDelete : TargetList ', TargetList);
        //proxyprinttodiv('Function MatchDelete : TargetParameter ', TargetParameter);
        for (var item in TargetList) {
            //proxyprinttodiv('Function MatchDelete item', TargetList[item].key);
            if ((TargetParameter + '.') !== (TargetList[item].key.substring(0, TargetParameter.length + 1))) {
                output.push(TargetList[item]);
            }
        }
        // only items that are not equal to the '.' survive
        proxyprinttodiv('Function MatchDelete : output ', output);
        return output;
    };

    exports.MatchPrefixDelete = MatchPrefixDelete = function MatchPrefixDelete(TargetList, TargetParameter) {
        var targetobject = listToObject(TargetList);
        var split = MatchPrefix(targetobject, TargetParameter);
        var out1 = DeletePrefix(split.match, TargetParameter)
        var out2 = split.nomatch;
        return {
            match: out1,
            nomatch: out2
        };
    };

    exports.DeletePrefix = DeletePrefix = function DeletePrefix(arr, kw) {
        if (kw == "") {
            return arr
        } else {

            var result = [];

            //proxyprinttodiv('Function DeletePrefix arr : ',  arr);
            //proxyprinttodiv('Function DeletePrefix kw : ',  kw);

            if (arr.length > 0 && (kw.length > 0)) {
                for (i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    var objvalue = obj["value"];
                    var objkey = obj["key"];

                    //proxyprinttodiv('Function DeletePrefix objvalue : ',  objvalue);
                    //proxyprinttodiv('Function DeletePrefix objkey : ',  objkey);

                    if (objkey != kw) {

                        //proxyprinttodiv('Function DeletePrefix length.objkey : ',  objkey.length);
                        //proxyprinttodiv('Function DeletePrefix length.kw : ',  kw.length);
                        // seems to have big if kw = e and a.x=y then x=y

                        if (objkey.length > kw.length) {
                            partial = objkey.substring(0, kw.length + 1);

                            //proxyprinttodiv('Function DeletePrefix partial : ',  partial);

                            kwdot = kw + '.';

                            //proxyprinttodiv('Function DeletePrefix kwdot : ',  kwdot);

                            if (kwdot == partial) {
                                afterdot = kw.length + 1;

                                //proxyprinttodiv('Function DeletePrefix afterdot : ',  afterdot);

                                beforekey = objkey;
                                objkey = beforekey.substring(afterdot);

                                //proxyprinttodiv('Function DeletePrefix objkey after substring : ',  objkey);
                            }
                        }
                        //proxyprinttodiv('Function DeletePrefix obkey before push : ',  objkey);

                        if (objkey.length > 0) {

                            //proxyprinttodiv('Function DeletePrefix objkey push : ',  objkey);

                            result.push({
                                "key": objkey,
                                "value": objvalue
                            });

                            //proxyprinttodiv('Function DeletePrefix objkey push : ',  objkey);
                        }
                    }
                }
            }
            //proxyprinttodiv('Function DeletePrefix result : ',  result);
            return result;
        }
    };

    // Add all the parameters of b to a. This is the exact same function as
    // jsonConcat around line 550-650. Since extend is not used yet, it would be 
    // a good idea to just use jsonConcat as it is already in use elsewhere.
    //    exports.extend = extend = function extend(a, b){
    //        for(var key in b){
    //            if(b.hasOwnProperty(key)){
    //                a[key] = b[key];
    //            }
    //        }
    //        return a;
    //    };

    // Splits a list of parameters. If the value of a parameter
    // is not attr, it will be put into the ParentdtoList. As soon
    // as the first parameter of 'onetomany' is found, the rest of 
    // the list will be put into the childDTOlist.
    exports.SplitKeywordSet = SplitKeywordSet = function SplitKeywordSet(list, attr) {
        if (typeof (attr) == undefined) {
            attr = 'onetomany';
        }

        var ParentdtoList = [];
        var ChildrendtoList = [];
        var attrFoundFlag = 0;

        for (var i = 0; i < list.length; i++) {
            item = list[i];
            if ((attrFoundFlag == 0) && (item["value"] != attr)) {
                ParentdtoList.push(item);
            } else {
                ChildrendtoList.push(item);
                attrFoundFlag = 1;
            }
        }

        var objChildParentdtoList = {
            "parentlist": ParentdtoList,
            "childrenlist": ChildrendtoList
        };
        return objChildParentdtoList;
    };

    // Sorts a list of arrays based on the length of the array
    // The sort will be ascending (a,b as opposed to b,a) unless
    // the function returns a value other than 1. To see more
    // goto: http://www.javascriptkit.com/javatutors/arraysort2.shtml#.UkF_G4b2qSo
    exports.Sortonetomanys = Sortonetomanys = function Sortonetomanys(list, attr) {
        proxyprinttodiv('Function Sortonetomanys()  list : ', list);
        proxyprinttodiv('Function Sortonetomanys()  attr : ', attr);
        if (typeof (attr) == undefined) {
            attr = 'onetomany'
        }
        output = list.sort(function (a, b) {
            if (a.key.split('.').length < b.key.split('.').length) {
                return -1;
            } else if (a.key.split('.').length > b.key.split('.').length) {
                return 1;
            } else if (a.value == attr) {
                return 1;
            } else if (b.value == attr) {
                return -1;
            } else {
                return 0;
            }
        });
        proxyprinttodiv('Function Sortonetomanys()  output : ', output);
        return output;
    };

    // Looks for the key word in the input and returns those fields that match the DTO in
    // the match hash, and those that don't in the nomatch hash. This is used to filter out
    // the parameters that the DTO is filtering for.
    exports.MatchPrefix = MatchPrefix = function MatchPrefix(input, kw) {
        var match = [];
        var nomatch = [];

        if (kw == "") {
            match = objectToList(input);
            return {
                match: match,
                nomatch: nomatch
            }
        } else {

            //proxyprinttodiv('Function MatchPrefix, kw: ',  kw);
            //proxyprinttodiv('Function MatchPrefix, input: ',  input);

            for (key in input) {
                partial = key.substring(0, kw.length + 1);

                kwdot = kw + '.';
                if ((kwdot == partial) || (kw == key))

                // var arr = key.split('.');
                //var arr = key.substring(0,key.lastIndexOf('.'));
                //proxyprinttodiv('Function MatchPrefix arr: ',  arr);
                // if ((arr === kw) || (key === kw))

                {
                    match.push({
                        "key": key,
                        "value": input[key]
                    });
                } else {
                    nomatch.push({
                        "key": key,
                        "value": input[key]
                    });
                }
            }
            return {
                match: match,
                nomatch: nomatch
            };
        }
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

    exports.converttojson = converttojson = function converttojson(data) {
        var output = {};

        // Take data as an object with dot notation key
        if (isObject(data) && !isArray(data)) {
            for (var item in data) {
                if (data.hasOwnProperty(item)) {
                    var iArray = item.split(".");
                    var value = data[item];
                    // Copy all of the properties in the source objects over to the destination object, and return the destination object. 
                    // It's in-order, so the last source will override properties of the same name in previous arguments.
                    extend(true, output, recurFunc(iArray, value));
                }
            }
        }
        return output;
    }

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

    exports.ConvertFromDOTdriadd = ConvertFromDOTdriadd = function ConvertFromDOTdriadd(input) { //Expands to Real javascript object
        var keys = Object.keys(input);
        var result = {};
        var temparray = [];

        for (var i = 0, l = keys.length; i < l; i++) {
            temparray = keys[i].split('.');
            for (var j = 0, la = temparray.length; j < la; j++) {
                if ((temparray[j] == "") || (temparray[j] == "add")) {
                    temparray[j] = getnewwid()
                }
            }
            createObjects(result, temparray, input[keys[i]]);
        }
        return result;
    };


    // Creates an object with a hash parent:value. If the chain array is more that 1, 
    // recurse until there is only 1 chain so you get chain:value returned. This is called only 
    // from ConvertFrom DOT, so you can see it part of the process of deconstructing the dot.notaion string.
    exports.createObjects = createObjects = function createObjects(parent, chainArray, value) {
        //proxyprinttodiv('createobject parent',  parent,99);
        //proxyprinttodiv('createobject chainArray',  chainArray,99);
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

    exports.getnewwid = getnewwid = function getnewwid() {
        potentialwid++;
        return String(potentialwid);
    }

    // Strips the numbers from hash keys. It returns 3 arrays: input list, index list, and original input list.
    // Used by addWidParameters.
    exports.RemoveIndex = RemoveIndex = function RemoveIndex(input) {
        var result = [];

        //input = { 'a<1>': 'x', 'b<3>': 'y', 'c': 'z', 'd.e': 't', 'f<4>': 'y' };

        var list1 = [];
        var list2 = [];
        var list3 = [];

        for (key in input) {
            //case1
            var s1 = key;
            var re = /<(\d+)>/;
            s1 = s1.replace(re, '');

            //console.log(s1);

            var o1 = {};
            o1["key"] = s1;
            o1["value"] = input[key];
            list1.push(o1);

            //case2
            var s2 = key;
            s2 = s2.match(re);
            var o2 = {};
            if (s2) {
                o2["key"] = s1;
                o2["value"] = s2[1];
            } else {
                o2["key"] = s1;
                o2["value"] = '';
            }
            list2.push(o2);

            //case3
            var o3 = {};
            o3["key"] = key;
            o3["value"] = input[key];
            list3.push(o3);
        }


        result.push(list1);
        result.push(list2);
        result.push(list3);

        return result;
    };

    // Looks to move each item in the input into an object that
    // has a match and nomatch hash to see what the DTO has 
    // filtered out of the list as relevent fields.
    exports.SplitObjectList = SplitObjectList = function SplitObjectList(input, dto) {
        var match = [];
        var nomatch = [];
        for (i = 0; i < input.length; i++) {
            var item = input[i];
            var key = item["key"];
            var found = false;
            for (j = 0; j < dto.length; j++) {
                var subitem = dto[j];
                var subkey = subitem["key"];
                if (key === subkey) {
                    found = true;
                }
            }
            if (found) {
                match.push(item);
            } else {
                nomatch.push(item);
            }
        }
        return {
            match: match,
            nomatch: nomatch
        };
    };

    exports.SplitObject = SplitObject = function SplitObject(input, dto) { // added 10-5 not used for anything yet
        var match = {};
        var nomatch = {};
        var item = "";
        for (item in input) {
            if (dto[item] == input[item]) {
                match[item] = input[item];
            } else {
                nomatch[item] = input[item];
            }
        }
        return {
            match: match,
            nomatch: nomatch
        };
    };

    // Returns an object made from an array
    exports.listToObject = listToObject = function listToObject(arrayOfObjects) {
        var finalObject = {};
        if (arrayOfObjects) {
            for (var i = 0; i < arrayOfObjects.length; i++) {
                var object = arrayOfObjects[i];
                finalObject[object["key"]] = object["value"];
            }
        }
        return finalObject;
    };

    // Returns an array made from an object
    exports.objectToList = objectToList = function objectToList(object) {
        var finalArray = [];
        for (key in object) {
            finalArray.push({
                "key": key,
                "value": object[key]
            });
        }
        return finalArray;
    };

    // Counts the number of hashes in an object
    exports.getObjectSize = getObjectSize = function getObjectSize(parameters) {
        //function getObjectSize(parameters){
        var size = 0,
            key;
        for (key in parameters) {
            if (parameters.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // Returns true if the parameter is lower case
    exports.isParameterLower = isParameterLower = function isParameterLower(parameters, str) {
        //function isParameterLower(parameters, str) {
        getObjectSize(parameters);
        var length;
        if (parameters.length === undefined) {
            length = getObjectSize(parameters);
        } else {
            length = parameters.length
        }
        for (key in parameters) { //rewritten
            if (key.toLowerCase() == str) {
                return true;
            }
        }
    };

    // Finds the first key in parameters that matches the string, or nothing if none is found   
    exports.firstOrDefault = firstOrDefault = function firstOrDefault(parameters, str) {
        var length;
        if (parameters.length === undefined) {
            length = getObjectSize(parameters);
        } else {
            length = parameters.length
        }
        for (key in parameters) { //rewritten
            if (key.toLowerCase() == str) {
                return key;
            }
        }
    };

    // Deletes a hash from an object    
    exports.remove = remove = function remove(parameters, str) {
        //function remove(parameters, str){
        var length;
        if (parameters.length === undefined) {
            length = getObjectSize(parameters);
            for (key in parameters) { //rewritten
                if (key.toLowerCase() == str) {
                    delete parameters[key];
                }
            }
        } else {
            length = parameters.length
        }
    };

    // Creates output based on whether the flas is DTO or JSON. It formates
    // the DTO strings with quotes around the values. For JSON, it checks to make sure that
    // numbers are actual numbers, and strings have quotes around them.
    exports.CleanBasedOnCheckflagList = CleanBasedOnCheckflagList = function CleanBasedOnCheckflagList(flag, input, dto) {
        output = input;

        if (flag === "dto") {
            for (i = 0; i < output.length; i++) {
                var item = output[i];
                var key = item["key"];
                for (j = 0; j < dto.length; j++) {
                    var subitem = dto[j];
                    var subkey = subitem["key"];
                    if (key === subkey) {
                        if (subitem["value"].toLowerCase() == 'string') {
                            output[i]["value"] = '"' + output[i]["value"] + '"';
                        }
                    }
                }
            }
        }

        if (flag == "json") {
            for (i = 0; i < output.length; i++) {
                var item = output[i];
                var key = item["key"];
                for (j = 0; j < dto.length; j++) {
                    var subitem = dto[j];
                    var subkey = subitem["key"];
                    if (key === subkey) {
                        if ((typeof (item["value"]) == 'object') && (item["value"]['number'] !== undefined)) {
                            output[i]["value"] = item["value"]['number'];
                        } else {
                            if (subitem["value"].toLowerCase() == 'string') {
                                output[i]["value"] = '"' + output[i]["value"] + '"';
                            }
                        }
                    }
                }
            }
        }
        //console.log(output);
        return output;
    };

    exports.tolowerparameters = tolowerparameters = function tolowerparameters(parameters, rightparameters) {
        //proxyprinttodiv('Function tolowerparameters : input parameters',  parameters);
        //proxyprinttodiv('Function tolowerparameters : input rightparameters',  rightparameters);
        var outputparameters = {};
        for (eachparameter in rightparameters) {
            if ((rightparameters[eachparameter].length > 0) && (rightparameters[eachparameter] == 'add')) {
                outputparameters[eachparameter.toLowerCase()] = "";
            }
        }

        for (eachparameter in parameters) {
            if ((rightparameters[eachparameter.toLowerCase()] == 'true') || (rightparameters[eachparameter.toLowerCase()] == 'add')) {
                // New version, simply checks to make sure that parameters[eachparameter] has a value that can be sent to .toLowerCase()
                if (parameters[eachparameter] != undefined && parameters[eachparameter] != "") {
                    outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter].toLowerCase();
                }
            } else {
                outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter];
            }
        }
        //proxyprinttodiv('Function tolowerparameters : output outputparameters',  outputparameters);
        return outputparameters;
    };

    //rightparameters && rightparameters[eachparameter] && 


    exports.getAttributeByIndex = getAttributeByIndex = function getAttributeByIndex(obj, index) {
        //function getAttributeByIndex(obj, index){
        var i = 0;
        for (var attr in obj) {
            if (index === i) {
                return attr;
            }
            i++;
        }
        return null;
    };

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

    // Returns the number of hashes in an object
    exports.countKeys = countKeys = function countKeys(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    exports.isEmpty = isEmpty = function isEmpty(obj) {
        if (isSet(obj)) {
            if (obj.length && obj.length > 0) {
                return false;
            }

            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    return false;
                }
            }
        }
        return true;
    };

    exports.isSet = isSet = function isSet(val) {
        if ((val != undefined) && (val != null)) {
            return true;
        }
        return false;
    };


    exports.isUndefined = isUndefined = function isUndefined(obj) {
        return obj === void 0;
    }

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


    exports.toObject = toObject = function toObject(arr) {
        //function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            if (arr[i] !== undefined) rv[i] = arr[i];
        return rv;
    };

    exports.printToDiv = printToDiv = function printToDiv(text, obj, debugone) {
        if (!debugone) {
            debugone = -1;
        }
        if ((Debug == 'true') || (debuglevel == debugone) || (debugone == 99)) {
            printText = '<pre>' + text + '<br/>' + JSON.stringify(obj) + '</pre>';
            console.log(text);
            console.log(obj);
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

    exports.arrayUnique = window.arrayUnique = arrayUnique = function arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    };

    exports.logverify = logverify = function logverify(test_name, data_object, assertion_object) {
        if (test_name === undefined) test_name = "defaulttest";

        var result = deepDiffMapper.map(data_object, assertion_object);
        // Assume UNKNOWN...
        var test_results = "UNKNOWN";
        var temp_string = JSON.stringify(result);
        // If there is a value of 'unchanged', there IS data that has passed,
        // so for now, set the 'test_results' to PASS.
        if ( temp_string.indexOf("unchanged") !== -1 ) test_results = "PASS";
        // If there are any of 'created', 'updated', 'deleted', the tests now fails, even if
        // it passed before...if none of the 4 strings are found, the test_results will 
        // remain 'UNKNOWN'
        if ( temp_string.indexOf("created") !== -1 || temp_string.indexOf("deleted") !== -1 || temp_string.indexOf("updated") !== -1 ) test_results = "FAIL";
        
        var data = {};
        data[test_name] = test_results;
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
            "aqua"
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
        var displaycolor = indebugcolor;
        var tempdebugname = (debugname != "") ? debugname : indebugname;
        var tempdebugcat = (debugcat != "") ? debugcat : indebugcat;
        var tempdebugsubcat = (debugsubcat != "") ? debugsubcat : indebugsubcat;

        // proxyprinttodiv('arrived debugfn', arguments, 99);
        // proxyprinttodiv('arrived debugname', debugname, 99);
        // proxyprinttodiv('arrived debugcat', debugcat, 99);
        // proxyprinttodiv('arrived debugsubcat', debugsubcat, 99);
        // proxyprinttodiv('arrived indebugname', indebugname, 99);
        // proxyprinttodiv('arrived indebugcat', indebugcat, 99);
        // proxyprinttodiv('arrived indebugsubcat', indebugsubcat, 99);
        // proxyprinttodiv('arrived tempdebugname', tempdebugname, 99);
        // proxyprinttodiv('arrived tempdebugcat', tempdebugcat, 99);
        // proxyprinttodiv('arrived tempdebugsubcat', tempdebugsubcat, 99);

        if (indebugname == tempdebugname && indebugcat == tempdebugcat && indebugsubcat == tempdebugsubcat) {
            processdebug = true
        } else {
            processdebug = false
        };
        if (debugname + debugcat + debugsubcat == "") {
            processdebug = false
        }
        if (!processdebug) return;

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

        case 3:
            // level
            break;

        case 4:
            // level
            break;

        case 5:
            // level
            break;

        case 6:
            // level
            break;

        case 7:
            // level
            break;

        case 8:
            // level
            break;

        case 9:
            // level
            break;

        case 10:
            // level
            break;
        }
        // widfilter: outobject={debugobjectlist["wid"], debugobjectlist["dtotype"], debugobjectlist["method"]}

        // go to html file be able to enter
        // exports.debugname = debugname = "";
        // exports.debugsubcat = debugsubcat = "";
        // exports.debugcat = debugcat = "";
        // exports.debugfilter= debugfilter = "all";
        // exports.debugdestination= debugdestination = "print";


        //      make color based on indebugindent
        //          1: temp_HTML=temp_HTML+" "
        //          2: 
        //          3: 
        //          
        //          
        //          
        switch (debugdestination) // 1 for print, 2 for googlespreadsheets, 3 for both
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
        }
        function dbug_print(indent, displaycolor) {

            if (displaycolor == "") {
                displaycolor = "pink"
            };
            var jsonPretty = JSON.stringify(outobject, "-", 4);

            if (indent > 0) {
                var temp_HTML = indebugdesc + "<br>" + "<div style='color:" + displaycolor + "; padding-left:" + (8 * indent) + "em'>" + syntaxHighlight(jsonPretty) + displaycolor + "</div>";
            } else {
                var temp_HTML = indebugdesc + "<br>" + "<div style='color:" + displaycolor + "'>" + syntaxHighlight(jsonPretty) + displaycolor + "</div>";
            }
            console.log(jsonPretty);
            if (exports.environment === "local") {
                $('#divprint').append(temp_HTML);
            }
            //proxyprinttodiv('logverify - temp_HTML', temp_HTML, 99);
        }

        // print:   proxyprinttodiv('logverify - parmwid1', parmwid1, 99);

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

    function syntaxHighlight(json) {
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

    var deepDiffMapper = function() {
        return {
            VALUE_CREATED: 'created',
            VALUE_UPDATED: 'updated',
            VALUE_DELETED: 'deleted',
            VALUE_UNCHANGED: 'unchanged',
            map: function(obj1, obj2) {
                if (this.isFunction(obj1) || this.isFunction(obj2)) {
                    throw 'Invalid argument. Function given, object expected.';
                }
                if (this.isValue(obj1) || this.isValue(obj2)) {
                    return {type: this.compareValues(obj1, obj2), data: obj1 || obj2};
                }               
                var diff = {};
                for (var key in obj1) {
                    if (this.isFunction(obj1[key])) {
                        continue;
                    }      
                    var value2 = undefined;
                    if ('undefined' != typeof(obj2[key])) {
                        value2 = obj2[key];
                    }                   
                    diff[key] = this.map(obj1[key], value2);
                }
                for (var key in obj2) {
                    if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
                        continue;
                    }                    
                    diff[key] = this.map(undefined, obj2[key]);
                }                
                return diff;               
            },
            compareValues: function(value1, value2) {
                if (value1 === value2) {
                    return this.VALUE_UNCHANGED;
                }
                if ('undefined' == typeof(value1)) {
                    return this.VALUE_CREATED;
                }
                if ('undefined' == typeof(value2)) {
                    return this.VALUE_DELETED;
                }              
                return this.VALUE_UPDATED;
            },
            isFunction: function(obj) {
                return toString.apply(obj) === '[object Function]';
            },
            isArray: function(obj) {
                return toString.apply(obj) === '[object Array]';
            },
            isObject: function(obj) {
                return toString.apply(obj) === '[object Object]';
            },
            isValue: function(obj) {
                return !this.isObject(obj) && !this.isArray(obj);
            }
        }
    }();

})(typeof window === "undefined" ? global : window);
