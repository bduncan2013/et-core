exports.mongoqueryII = mongoqueryII = function mongoqueryII(mongorawquery, callback) {

    function processquery(searchobjectlist, querylist) {
        //        [{ "wid": "wid3",
        //           "metadata.method": "testdto",
        //           "data.b": "9",
        //           "data.a": "3"
        //       },
        //       {
        //           "wid": "wid1",
        //           "metadata.method": "testdto",
        //           "data.b": "1",
        //           "data.a": "1"
        //		 }]
        //
        // querylist in 'mongo' form + brakets: [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]
        //
        var potentialquery;
        var potentialoperator;
        var subqueryobject;
        var searchobjectresult;
        var listresult = [];
        var outlist = [];
        var eachresult;
        var item;
        var querylistindex;
        var left;
        var right;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    //"searchobjectlist": searchobjectlist,
                    "left": left,
                    "right": right,
                    "potentialquery": potentialquery,
                },
                2: {
                    "querylist": querylist,
                    "potentialquery": potentialquery,
                    "potentialoperator": potentialoperator,
                    "outlist": outlist,
                    "eachresult": eachresult,
                    "item": item
                },
                3: {
                    "querylist": querylist
                    //"searchobjectlist":searchobjectlist
                },
                4: {
                    "outlist": outlist,
                    "listresult": listresult
                },
                5: {
                    "searchobjectlist": searchobjectlist
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

        debugfn("begin processquery", "processquery", "query", "begin", debugcolor, debugindent, debugvars([3]));

        //searchobjectresult = extend(true, searchobjectlist);

        for (querylistindex in querylist) { // querylist will always be a list
            potentialquery = querylist[querylistindex]; // we will step by objects
            for (left in potentialquery) { // this will just split left right
                right = potentialquery[left];
            }
            // if operator then recurse
            debugfn("before processquery", "processquery", "query", "begin", debugcolor, debugindent, debugvars([1]));

            // if we do need the above statemnt then we need to make a for each deep copy (see expand in utils)
            if ((left == "$or") || (left == "$and")) {
                //if ((potentialquery == "$or") || (potentialquery == "$and")) {
                debugcolor++;
                debugindent++;
                listresult = processquery(searchobjectlist, right);
                proxyprinttodiv('Function listresult I', listresult, 99);
                //listresult = formatlist(listresult,"wid","wid");
                //proxyprinttodiv('Function listresult II', listresult,99);
                listresult = processoperator(searchobjectlist, listresult, left);
                proxyprinttodiv('Function listresult III', listresult, 99);
                //listresult = processoperator(searchobjectlist, right, left);
                debugcolor--;
                debugindent--;
                //debugfn("during processquery after", "processquery", "query", "middle", debugcolor, debugindent, debugvars([1]));
            } else {
                //searchobjectresult = processoperator(searchobjectresult, querylist, operator);
                listresult.push(potentialquery);
                //if (potentialquery) {outlist.push(potentialquery)};
                //outlistobj=extend(true, outlistobj, potentialquery);
                //objectresult = searchobjectresult;
            }
            debugfn("after processquery", "processquery", "query", "end", debugcolor, debugindent, debugvars([4]));
            outlist = arrayUnique(outlist.concat(listresult));
            //outlist=extend(true, outlist, listresult);
            // for (item in searchobjectresult) { // combine results
            // 	if(searchobjectresult[item]["wid"]){
            // 		outlistobj[searchobjectresult[item]["wid"]] = searchobjectresult[item];					
            // 	}
            // }
            debugfn("end processquery", "processquery", "query", "end", debugcolor, debugindent, debugvars([4]));

            //outlistobj=extend(true, outlistobj, objectresult);
        }
        //return outlistobj;
        return outlist;
    }

    function arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    };

    function processoperator(inobjectlist, targetparameters, operator) {
        //        [{ "wid": "wid3",
        //           "metadata.method": "testdto",
        //           "data.b": "9",
        //           "data.a": "3"
        //       },
        //       {
        //           "wid": "wid1",
        //           "metadata.method": "testdto",
        //           "data.b": "1",
        //           "data.a": "1"
        //		 }]
        //
        // targetparameters
        //    [{ "data.b": "25"}
        //    ,{"data.a": "5" }]
        // 
        // operator $or $and

        var eachwid;
        var eachparm;
        var equalobject = {};
        var notequalobject = {};
        var resultlist = [];
        var widrecord;
        var outobject = {};
        var targetobject = {};
        var wid;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "targetparameters": targetparameters,
                    "inobjectlist": inobjectlist,
                    "operator": operator
                },
                2: {
                    "eachwid": eachwid,
                },
                3: {
                    "eachparm": eachparm,
                    "widrecord": widrecord,
                    "targetobject": targetobject,
                },
                4: {
                    "equalobject": equalobject,
                    "notequalobject": notequalobject
                },
                5: {
                    "widrecord": widrecord,
                    "eachparm": eachparm,
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

        debugfn("processoperator begin", "processoperator", "query", "begin", debugcolor, debugindent, debugvars([1]));
        // added below
        //targetparameters=processquery(inobjectlist, targetparameters);

        for (eachwid in inobjectlist) { // got through whole list
            //widrecord = ConvertToDOTdri(getFromLocalStorage(widMasterKey + inobjectlist[eachwid]["wid"])); // load widrecord the whole raw records of this wid
            widrecord = inobj[inobjectlist[eachwid]["wid"]];
            proxyprinttodiv('widrecord', widrecord, 99);
            equalobject = {};
            notequalobject = {};

            //debugfn("processoperator middle II", "processoperator", "query", "middle", debugcolor, debugindent, debugvars([3]));
            //for (eachparm in targetobject) { 
            for (eachtarget in targetparameters) { // paramters is a list [{a:b},{c:d}]
                targetobject = targetparameters[eachtarget] // targetobject = {a:b}
                for (eachparm in targetobject) {} // eaparm = a, targetobject = {a:b}
                if (widrecord[eachparm] == targetobject[eachparm]) {
                    equalobject[eachparm] = widrecord; // previosly targetparameters
                } else {
                    notequalobject[eachparm] = widrecord; // previosly targetparameters
                }
            }
            wid = {};
            //debugfn("processoperator middle III", "processoperator", "query", "middle", debugcolor, debugindent, debugvars([4]));
            if (operator == "$or") { // if any matched (or) then add to resultobject
                if (Object.keys(equalobject).length !== 0) {
                    wid["wid"] = widrecord["wid"];
                    resultlist.push(wid);
                }
            }
            if (operator == "$and") { // if all matched (and) (notequalobject is empty) then add to resultobject
                if (Object.keys(notequalobject).length == 0) {
                    wid["wid"] = widrecord["wid"];
                    resultlist.push(wid);
                }
            }

            debugfn("processoperator end", "processoperator", "query", "end", debugcolor, debugindent, debugvars([4, 5]));
        } // allwids
        if (resultlist.length == 0) {
            resultlist = [{
                "": ""
            }]
        };
        return resultlist; // returns list: [{}, {}, {}]
    } // end processoperator

    // Start of mongoquery
    //
    // mongorawqury in 'mongo' form: {"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]}
    //

    var outlist = [];
    var inlist = [];
    var inobj = {};
    var mongorawquerylist = [];
    var eachwid;
    var wid;
    var widdata;
    var result;

    mongorawquerylist.push(JSON.parse(mongorawquery)); // convert mongorawquery to list form
    // from {"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]} 
    // to [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]}

    for (eachwid in localStorage) {
        if (eachwid.indexOf(widMasterKey) == 0) {
            var widObj = JSON.parse(localStorage[eachwid]);
            if (widObj["wid"]) {
                //inlistobj[widObj["wid"]]=ConvertToDOTdri(widObj);
                widdata = ConvertToDOTdri(widObj)
                inlist.push(widdata);
                inobj[widdata["wid"]] = widdata;
            }
        }
    }

    // inlist is [{},{},{}]

    var processqueryresult = processquery(inlist, mongorawquerylist);

    // convert to:
    //		[	
    //       "wid3": {
    //           "wid": "wid3",
    //           "metadata.method": "testdto",
    //           "data.b": "9",
    //           "data.a": "3"
    //       },
    //       "wid1": {
    //           "wid": "wid1",
    //           "metadata.method": "testdto",
    //           "data.b": "1",
    //           "data.a": "1"
    //		}]

    for (eachwid in processqueryresult) {
        widdata = processqueryresult[eachwid]; // get each line of data
        //proxyprinttodiv('Function mongoquery I', widdata,99);
        // wid = widdata['wid']; // extract wid property
        // // use wid to get rest



        // delete widdata['wid']; // delete wid property
        // result={};
        // proxyprinttodiv('Function mongoquery II', widdata,99);
        // result[wid]=ConvertFromDOTdri(widdata);
        // //result=result[wid];
        // proxyprinttodiv('Function mongoquery result', result,99);
        //outlist.push(result);
        if (widdata['wid']) {
            outlist.push(inobj[widdata['wid']])
        }
        //else {
        //	outlist.push({})
        //}
    }

    callback(outlist);
    //callback(formatlist(inlist, processqueryresult, null));
}

function formatlist(inlist, parmnamein, parmnameout) {
    var output = [];
    var widvalue;
    for (i in inlist) {
        var item = inlist[i];
        if (!parmnameout) {
            widvalue = item['wid']
        } else {
            widvalue = parmnameout
        }
        var obj = {};
        obj[widvalue] = item[parmnamein];
        output.push(obj);
    }
    return output;
}


exports.mongoquery = mongoquery = function mongoquery(queryString, callback) {
    delete queryString['executethis']; // **** needed?
    //function mongoquery(queryString, target, callback) {
    if (queryString["mongowid"]) {
        //return querywidlocal(queryString, callback); 
        // taken out 11-13 ********
        querywidlocal(queryString, callback);
    }
    //
    else {

        proxyprinttodiv('Function mongoquery', queryString, 75);
        var enhancedreturn = getwidcopy();
        proxyprinttodiv('Function enhancedreturn', enhancedreturn, 75);
        if (queryString['mongorawquery']) {
            var mongorawquery = queryString['mongorawquery'];
            var ResultList = [];
            proxyprinttodiv('Function mongorawquery', mongorawquery);
            for (var item in mongorawquery) {
                // {"$and": {"data.primarywid":ParentWid, "data.secondarywid":ChildWid }};
                if (item == '$and') {
                    var andquery = mongorawquery[item];
                    var ParentWid = andquery['data.primarywid'];
                    var ChildWid = andquery['data.secondarywid'];
                    proxyprinttodiv('Function andquery', andquery);
                    proxyprinttodiv('Function ParentWid', ParentWid, 75);
                    proxyprinttodiv('Function ChildWid', ChildWid, 75);
                    for (var myvalue in enhancedreturn) {
                        proxyprinttodiv('Function myvalue', myvalue);
                        //if ((myvalue['primarywid']==ParentWid) && (myvalue['secondarywid']==ChildWid)) {
                        if ((enhancedreturn[myvalue]['primarywid'] == ParentWid) && (enhancedreturn[myvalue]['secondarywid'] == ChildWid)) {
                            proxyprinttodiv('Function match found ', ({
                                "key": "wid",
                                "value": myvalue
                            }), 75);
                            ResultList.push({
                                "key": "wid",
                                "value": myvalue
                            });
                        }
                    }
                }
            }
        }
        proxyprinttodiv('Function simpleQuery in : ResultList', ResultList);
        //return ResultList
        callback(ResultList);

    }
};

function querywidlocal(sq, callback) {

    var widInput = sq["mongowid"];
    var mongorelationshiptype = sq["mongorelationshiptype"];
    var mongorelationshipmethod = sq["mongorelationshipmethod"];
    var mongorelationshipdirection = sq["mongorelationshipdirection"];
    var mongowidmethod = sq["mongowidmethod"];
    var convertmethod = sq["convertmethod"];
    var dtotype = sq["dtotype"];

    var returnfromSimpleQuery = [];
    var enhancedreturn;
    var outobject = [];

    proxyprinttodiv('Function simpleQuery in : widInput', widInput, 30);
    proxyprinttodiv('Function simpleQuery in : mongorelationshiptype', mongorelationshiptype, 30);
    proxyprinttodiv('Function simpleQuery in : mongorelationshipmethod', mongorelationshipmethod, 30);
    proxyprinttodiv('Function simpleQuery in : mongorelationshipdirection', mongorelationshipdirection, 30);
    proxyprinttodiv('Function simpleQuery in : mongowidmethod', mongowidmethod, 30);
    proxyprinttodiv('Function simpleQuery in : convertmethod', convertmethod, 30);
    proxyprinttodiv('Function simpleQuery in : dtotype', dtotype, 30);
    if (mongorelationshipdirection == "forward") {
        // step through local storage looking for
        var widset = getwidcopy(); // get a copy of all local storage ***
        //	enhancedreturn=widset; // remove
        //}
        proxyprinttodiv('Function simpleQuery in : widset', widset, 30);
        //for (var key in localStorage){ //***
        for (var widkey in widset) {
            //var myvalue = JSON.parse(localStorage.getItem(key)); //**
            proxyprinttodiv('Function simpleQuery in : widkey', widkey, 30);
            //var myvalue = getfrommongo({wid:widkey});

            var executeobject = {};
            executeobject["wid"] = widkey;
            //var x = window['getfrommongo'];
            var x = window['getwid'];
            //var myvalue = executethis({wid:widkey}, getfrommongo);
            //var myvalue = executethis(executeobject, getfrommongo);
            var myvalue = executethis(executeobject, x);
            //proxyprinttodiv('Function simpleQuery in : myvalue',  myvalue);
            proxyprinttodiv('Function simpleQuery in : myvalue', myvalue);
            if (myvalue["primarywid"] == widInput) {
                var widName = myvalue["primarywid"];
                var key = myvalue["secondarywid"];
                proxyprinttodiv('Function simpleQuery in : widName', widName, 30);
                proxyprinttodiv('Function simpleQuery in : key', key, 30);
                //var value = getfrommongo({wid:key}); // , dtotype:mongowidmethod
                executeobject = {};
                executeobject["wid"] = key;
                //var value = executethis({wid:key}, getfrommongo);
                proxyprinttodiv('Function simpleQuery in : executeobject', executeobject, 30);
                proxyprinttodiv('Function simpleQuery in : x fn', x.name, 30);
                var value = executethis(executeobject, x);
                //var value = executethis(executeobject, getfrommongo);
                proxyprinttodiv('Function simpleQuery in : value', value, 30);
                delete value.wid;
                var resultObj = {};
                resultObj[key] = value;

                var widdto;
                //proxyprinttodiv('Function simpleQuery in : resultObj I',  resultObj);		  
                if ((value["metadata.method"] === undefined) || (value["metadata.method"] == "")) {
                    widdto = "";
                } else {
                    widdto = value["metadata.method"]
                }

                // changed 10/30 if ((mongowidmethod !== undefined) && (mongowidmethod == widdto)) {
                if (((mongowidmethod !== undefined) && (mongowidmethod === widdto)) || (mongowidmethod === "")) {
                    //proxyprinttodiv('Function simpleQuery in : resultObj',  resultObj);
                    returnfromSimpleQuery.push(resultObj);
                }
            }
            // }
        }
    }
    proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery before', returnfromSimpleQuery, 30);
    //proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
    if (returnfromSimpleQuery.length > 0) {
        returnfromSimpleQuery = returnfromSimpleQuery.sort(function (aObj, bObj) {
            var a = getAttributeByIndex(aObj, 0);
            var b = getAttributeByIndex(bObj, 0);
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
    }
    proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery aftersort', returnfromSimpleQuery, 30);
    proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery length', returnfromSimpleQuery.length, 30);
    if (returnfromSimpleQuery.length > 0) {
        if (mongorelationshipmethod == 'first') {
            outobject.push(returnfromSimpleQuery[0]);
        }
        if (mongorelationshipmethod == 'last') {
            outobject.push(returnfromSimpleQuery[returnfromSimpleQuery.length - 1]);
        }
        if (mongorelationshipmethod == 'all') {
            outobject = returnfromSimpleQuery;
        }
    }
    proxyprinttodiv('Function simpleQuery in : enhancedreturn before', outobject, 30);
    if ((!outobject) || (outobject == []) ||
        (outobject === null) || (returnfromSimpleQuery.length == 0)) {
        outobject.push({
            "": ""
        });
    }
    if (Object.keys(outobject).length == 0) {
        outobject.push({
            "": ""
        });
    }
    proxyprinttodiv('Function simpleQuery in : enhancedreturn after', outobject, 30);
    //return enhancedreturn;
    //enhancedreturn.push({'a':'b'});
    proxyprinttodiv('Function simpleQuery in : callback', String(callback), 30);
    callback(outobject);
}

// function addtomongo(widName, widobject) {
// 	addToLocalStorage(widMasterKey+widName, widobject);
// }

//function addtomongo(inputWidgetObject) {
exports.addtomongo = addtomongo = addtomongo = function addtomongo(inputWidgetObject, callback) {
    //function addtomongo(inputWidgetObject, target, callback) {
    delete inputWidgetObject['executethis'];
    proxyprinttodiv('Function addtomongo inputWidgetObject', inputWidgetObject);
    var widobject = {};
    widobject = inputWidgetObject;
    var widName = widobject['wid'];
    //delete widobject['wid'];
    //	proxyprinttodiv('Function addtomongo widobject',  widobject,1);
    addToLocalStorage(widMasterKey + widName, widobject);
    widobject['wid'] = widName;
    //return widobject;
    callback(widobject);
};

//function getfrommongo(inputWidgetObject) {
exports.getfrommongo = getfrommongo = function getfrommongo(inputWidgetObject, callback) {
    //function getfrommongo(inputWidgetObject, target, callback) {
    delete inputWidgetObject['executethis'];
    var output = {};
    if (inputWidgetObject["wid"]) {
        var widKey = inputWidgetObject["wid"].toLowerCase();

        output = getFromLocalStorage(widMasterKey + widKey);
        //            proxyprinttodiv('Function getfrommongo results', output, 1);
        if ((output == null) || (output === undefined)) {
            output = {};
        }

    }
    //output['a']='b';
    callback(output);
    // callback(output);/// *** Commented by Saurabh 10/11
}; //End of getfrommongo function

function getwidcopy() {
    // step through local storage looking for
    var set = {}; // get a copy of all local storage ***
    var resultobject = {};
    var wid = "";
    for (var key in localStorage) {
        if (key.indexOf(widMasterKey) == 0) {
            key = key.substring(10);
            resultobject = getFromLocalStorage(widMasterKey + key);
            wid = resultobject['wid'];
            set[wid] = resultobject;
            // $$$$$
        }
    }
    return set
}

//function getwidcopy() {
//// step through local storage looking for
//	var set={}; // get a copy of all local storage ***
//	for (var key in localStorage){
//		if (key.indexOf(widMasterKey) == 0) {
//			key = key.substring(10);
//			// set[key]=getfrommongo({wid:key});
//
//				var executeobject={};
//    			executeobject["wid"]=key;
//    			var x = window['getwid'];
//    			//var x = window['getfrommongo'];
//    			//set[key] = executethis(executeobject, x);
//    			set[key] = getFromLocalStorage(widMasterKey + key);
//    			//set[key]=executethis(executeobject,getfrommongo);
//
//			//set[key]=executethis({wid:key},getfrommongo);
//			}
//		}
//	//set['a']='b';
//	//set.push({'a':'b'});
//	return set
//}


function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function addToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function clearLocalStorage() {
    widMasterKey = "widmaster_";
    localStorage.clear();
    potentialwid = 0;
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

function resetMasterKey() {
    widMasterKey = "widmaster_";
}