if (!exports) {
    var exports = {};
}


(function (window) {
    // exports.environment = 'local';

    // exports.Debug = Debug = 'false';
    // exports.debuglevel = debuglevel = 0;
    // exports.widMasterKey = widMasterKey = "widmaster_";
    // exports.test_results = test_results = {};
    // exports.potentialwid = potentialwid = 0;

    // //do not change these constants
    // //exports.debugon = debugon = true;
    // exports.debugname = debugname = "";
    // exports.debugsubcat = debugsubcat = "";
    // exports.debugcat = debugcat = "";
    // exports.debugfilter = debugfilter = "";
    // exports.debugdestination = debugdestination = 1;
    // exports.debugcolor = debugcolor = 0;
    // exports.debugindent = debugindent = 0;


    // exports.offlinemongoquery = window.offlinemongoquery = offlinemongoquery = function offlinemongoquery(params, callback) {
    //     offlinemongoquery(params, callback);
    // }

    exports.getFromLocalStorage = window.getFromLocalStorage = getFromLocalStorage = function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    };

    exports.addToLocalStorage = window.addToLocalStorage = addToLocalStorage = function addToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    exports.clearLocalStorage = window.clearLocalStorage = clearLocalStorage = function clearLocalStorage() {
        widMasterKey = "widmaster_";
        localStorage.clear();
        potentialwid = 0;
    };

    exports.removeFromLocalStorage = window.removeFromLocalStorage = removeFromLocalStorage = function removeFromLocalStorage(key) {
        localStorage.removeItem(key);
    };


})(typeof window == "undefined" ? global : window);



exports.offlinegetwid = window.offlinegetwid = offlinegetwid = function offlinegetwid(inputWidgetObject, callback) {
    delete inputWidgetObject['executethis']; // ** added by Saurabh 11/9

    proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 1);
    // var outobjectarr = [];

    offlinegetfrommongo(inputWidgetObject, function (err, results) {
        var outobject = {};
        if (results && countKeys(results) > 0) {
            if (results["data"]) {
                outobject = results["data"];
            }

            if (results['wid']) {
                outobject['wid'] = results['wid'];
            } else {
                outobject['wid'] = "";
            }

            if (results['metadata']) {
                outobject['metadata.method'] = results['metadata']['method'];
            } else {
                outobject['metadata.method'] = "";
            }
        }

        callback(err, outobject);
    });
};

exports.offlineupdatewid = window.offlineupdatewid = offlineupdatewid = function offlineupdatewid(inputObject, callback) {
    var inputWidgetObject = JSON.parse(JSON.stringify(inputObject));

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

    saveobject['metadata'] = {};
    if (inputWidgetObject['metadata.method']) {
        saveobject['metadata']['method'] = inputWidgetObject['metadata.method'];
    } else {
        saveobject['metadata']['method'] = "";
    }



    // saveobject['metadata'] = inputWidgetObject['metadata'] ; 
    delete inputWidgetObject['metadata.method'];
    if (inputWidgetObject) {
        saveobject['data'] = inputWidgetObject;
    } else {
        saveobject['data'] = "";
    }

    offlineaddtomongo(saveobject, function (err, results) {
        proxyprinttodiv('Function updatewid in : x', results, 10);
        callback(err, results);
    });
};


function resetMasterKey() {
    widMasterKey = "widmaster_";
}

function setdefaultparm() {
    localStore.clear();
    Debug = 'false'; // **** Saurabh ::  changed to make node compatible ****
    debuglevel = 0;
    widMasterKey = "widmaster_";
    test_results = {};
    potentialwid = 0;
    debugon = false;
    debugname = "";
    debugsubcat = "";
    debugcat = "";
    debugfilter = "";
    debugdestination = 1;
    debugcolor = 0;
    debugindent = 0;

    exports.config = config = config123();
    exports.environment = 'local';

    exports.Debug = Debug;
    exports.debuglevel = debuglevel;
    exports.widMasterKey = widMasterKey;
    exports.test_results = test_results;
    exports.potentialwid = potentialwid;

    exports.debugon = debugon;
    exports.debugname = debugname;
    exports.debugsubcat = debugsubcat;
    exports.debugcat = debugcat;
    exports.debugfilter = debugfilter;
    exports.debugdestination = debugdestination;
    exports.debugcolor = debugcolor;
    exports.debugindent = debugindent;
}


function config123() {
    var configuration = {};

    configuration.environment = 'local';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 1;
    configuration.preExecute[0].tryorder = 1;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {};
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 1;
    configuration.preExecute[1].tryorder = 2;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 1;
    configuration.preExecute[2].tryorder = 3;
    configuration.preExecute[2].dothis = 'executegetwid';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 1;
    configuration.preExecute[3].tryorder = 4;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 1;
    configuration.midExecute[0].tryorder = 1;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 1;
    configuration.midExecute[1].tryorder = 2;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 1;
    configuration.midExecute[2].tryorder = 3;
    configuration.midExecute[2].dothis = 'executegetwid';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 1;
    configuration.midExecute[3].tryorder = 4;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 1;
    configuration.postExecute[0].tryorder = 1;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 1;
    configuration.postExecute[1].tryorder = 2;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 1;
    configuration.postExecute[2].tryorder = 3;
    configuration.postExecute[2].dothis = 'executegetwid';
    configuration.postExecute[2].params = {};
    configuration.postExecute[3] = {};
    configuration.postExecute[3].executeorder = 1;
    configuration.postExecute[3].tryorder = 4;
    configuration.postExecute[3].dothis = 'server';
    configuration.postExecute[3].params = {};

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].executeorder = 1;
    configuration.getwid[0].tryorder = 1;
    configuration.getwid[0].dothis = 'offlinegetwid';
    configuration.getwid[0].server = 'getwid';
    configuration.getwid[0].dofn = offlinegetwid;
    configuration.getwid[0].params = {};

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].executeorder = 1;
    configuration.updatewid[0].tryorder = 1;
    configuration.updatewid[0].dothis = 'offlineupdatewid';
    configuration.updatewid[0].server = 'updatewid';
    configuration.updatewid[0].dofn = offlineupdatewid;
    configuration.updatewid[0].params = {};

    return {
        "configuration": configuration
    }
};


exports.bootprocess = bootprocess = function bootprocess() {
    //exports.config = config = config123();
    setdefaultparm();

    proxyprinttodiv('Function bootprocess config', config, 30);
    testclearstorage();
    if (exports.environment === 'local') {
        clearLocalStorage();
    }
    test_results = {};
    //testAddWids();
    //displayAllWids();
};

bootprocess();


function executeAjax(allConfig, executeItem, callback, returnCallback) {
    var result;
    var success = false;
    result = "";

    //executeItem = "[" + JSON.stringify(executeItem) + "]";
    executeItem = JSON.stringify(executeItem);
    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: '/executethis',
        headers: {
            'content-type': 'Application/json'
        },
        global: 'false',
        cache: 'false',
        async: 'false',
        data: executeItem,
        success: function (data) {
            // alert(JSON.stringify(data));
            if (data.error) {
                result = "<pre> APPLICATION ERROR: </pre>" + JSON.stringify(data);
            } else {
                if (Object.keys(data).length > 0) {
                    result = "<pre> SUCCESS: </pre>" + JSON.stringify(data);
                } else {
                    result = "<pre> <<< No Data Returned >>> </pre>";
                }
            }
            callback(data, allConfig, 'html', returnCallback);
        },
        error: function (data) {
            alert(JSON.stringify(data));
            result = "FAILED TO CALL EXECUTETHIS " + JSON.stringify(data);
            callback(data, allConfig, 'html', returnCallback);
        }
    });
}

// Primary execute function called after dothis

function test2(params, callback) {
    callback({
        "test": "test2 on local called"
    });
}

exports.server = window.server = server = function server(params, callback) {
    console.log('execute server called with ' + JSON.stringify(params));
    // delete params['configuration'];
    params = toLowerKeys(params);
    // if (params['midexecute']) {
    //     params['executethis'] = params['midexecute'];
    //     delete params['midexecute'];
    // }
    // alert(JSON.stringify(params));

    // add accesstoken if user exists in localStorage
    var currentUser = window.localStorage ? JSON.parse(window.localStorage.getItem('driUser')) : undefined;
    if (currentUser) {
        if (!params.etenvironment) {
            params.etenvironment = {};
        }
        params.etenvironment.accesstoken = currentUser.at;
    }

    executeAjax("", params, function (data) {
        console.log("Return from server: " + JSON.stringify(data));
        callback(data);
    });
};

exports.getDriApiData = getDriApiData = function getDriApiData(action, params, callback) {
    params.actionQueryString = action;
    $.ajax({
        url: '/getdata',
        type: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        cache: false,
        async: false,
        dataType: 'json',
        data: JSON.stringify(params),
        success: function (results) {
            callback(null, results);
        },
        error: function (err) {
            callback(err.responseText, null);
        }
    });
};




exports.mongoquery = mongoquery = function mongoquery(inboundobj, callback) {

    function processquery(searchobjectlist, querylist) {
        //
        // querylist in 'mongo' form + brakets: [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]
        //
        var potentialquery;
        var potentialoperator;
        var subqueryobject;
        var searchobjectresult;
        var listresult = [];
        var templist = [];
        var outlist = [];
        var eachresult;
        var item;
        var querylistindex;
        var left;
        var right;

        function debugvars(varlist) {
            var allvars = {
                1: {
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

        debugfn("begin processquery", "processquery", "mongoquery", "begin", debugcolor, debugindent, debugvars([3, 5]));

        proxyprinttodiv('Function processquery querylist', querylist, 99);
        for (querylistindex in querylist) { // querylist will always be a list
            proxyprinttodiv('Function processquery querylistindex', querylistindex, 99);
            potentialquery = querylist[querylistindex]; // we will step by objects
            proxyprinttodiv('Function processquery potentialquery', potentialquery, 99);
            for (left in potentialquery) { // this will just split left right
                proxyprinttodiv('Function processquery left', left, 99);
                right = potentialquery[left];
            }
            // if operator then recurse
            debugfn("before processquery", "processquery", "mongoquery", "begin", debugcolor, debugindent, debugvars([1]));

            // if we do need the above statemnt then we need to make a for each deep copy (see expand in utils)
            if ((left == "$or") || (left == "$and")) {
                debugcolor++;
                debugindent++;
                //listresult = processquery(searchobjectlist, right);
                proxyprinttodiv('Function processquery before templist left', left, 99);
                templist = processquery(searchobjectlist, right);
                proxyprinttodiv('Function processquery after templist left', left, 99);
                proxyprinttodiv('Function listresult I', listresult, 30);
                // added below %% add the array inside of another array
                listresult.push(templist);
                listresult = processoperator(searchobjectlist, listresult, left);
                proxyprinttodiv('Function listresult III', listresult, 30);
                debugcolor--;
                debugindent--;
            } else {
                //listresult.push(potentialquery); 
                listresult.push(querylist);
            }
            debugfn("after processquery", "processquery", "mongoquery", "end", debugcolor, debugindent, debugvars([4]));
            outlist = arrayUnique(outlist.concat(listresult));
            debugfn("end processquery", "processquery", "mongoquery", "end", debugcolor, debugindent, debugvars([4]));
        }
        return outlist;
    }

    // function arrayUnique(array) {
    // var a = array.concat();
    // for(var i=0; i<a.length; ++i) {
    //     for(var j=i+1; j<a.length; ++j) {
    //         if(a[i] === a[j])
    //             a.splice(j--, 1);
    //     }
    // }
    // return a;
    // };

    function processoperator(inobjectlist, targetparameters, operator) {
        var eachwid;
        var eachparm;
        var equalobject = {};
        var notequalobject = {};
        var resultlist = [];
        var widrecord;
        var outobject = {};
        var targetobject = {};
        var wid;
        var targetarray = [];
        var match;

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

        debugfn("processoperator begin", "processoperator", "mongoquery", "begin", debugcolor, debugindent, debugvars([1]));

        for (eachwid in inobjectlist) { // got through whole list
            widrecord = inobj[inobjectlist[eachwid]["wid"]];
            proxyprinttodiv('widrecord', widrecord, 30);
            equalobject = {};
            notequalobject = {};
            proxyprinttodiv('Function widrecord', widrecord, 30);


            for (eachtarget in targetparameters) { //go through each array inside array     
                // paramters is a list [{a:b},{c:d}] or 
                // paramters is a list [[{a:b},{c:d}]
                targetobject = targetparameters[eachtarget] // targetobject = {a:b}
                proxyprinttodiv('Function targetobject', targetobject, 30);
                // %% added below
                // if not array then make it into array
                if (targetobject instanceof Array) {
                    targetarray = targetobject;
                } else {
                    targetarray.push(targetobject)
                }
                proxyprinttodiv('Function targetarray', targetarray, 30);
                match = false;
                for (eacharray in targetarray) {
                    if (targetarray instanceof Array) {
                        targetobject = targetarray[eacharray];
                    } else {
                        targetobject = eacharray;
                    }
                    proxyprinttodiv('Function targetobject II', targetobject, 30);
                    //match=false;
                    for (eachparm in targetobject) {
                        proxyprinttodiv('Function widrecord[eachparm]', widrecord[eachparm], 30);
                        proxyprinttodiv('Function targetobject[eachparm]', targetobject[eachparm], 30);
                        if (widrecord[eachparm] == targetobject[eachparm]) {
                            match = true;
                            //break;
                        } else {
                            match = false; // done at first non match
                            //break;
                        };
                        proxyprinttodiv('Function match', match, 30);
                        // if (match) { // if match then ok to go with previous type search
                        //  equalobject[eachparm] = widrecord; // previosly targetparameters
                        // } else {
                        //  notequalobject[eachparm] = widrecord; // previosly targetparameters
                        // }
                        if (match) {
                            break
                        };
                    }

                    if (match) { // if match then ok to go with previous type search
                        equalobject[eachparm] = widrecord; // previosly targetparameters
                    } else {
                        notequalobject[eachparm] = widrecord; // previosly targetparameters
                    }
                    proxyprinttodiv('Function equalobject', equalobject[eachparm], 30);
                    proxyprinttodiv('Function notequalobject', notequalobject[eachparm], 30);
                }
            }
            wid = {};
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

            debugfn("processoperator end", "processoperator", "mongoquery", "end", debugcolor, debugindent, debugvars([4, 5]));
        } // allwids

        proxyprinttodiv('Function resultlist', resultlist, 30);
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




    //var rawmongoquery=inboundobj["rawmongoquery"];
    proxyprinttodiv('Function inobj', inboundobj, 99);
    //proxyprinttodiv('Function mongorawquery', rawmongoquery,30);

    //mongorawquerylist.push(rawmongoquery);
    //mongorawquerylist.push(JSON.parse(rawmongoquery)); // convert mongorawquery to list form

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    if (IsJsonString(inboundobj)) {
        mongorawquerylist.push(JSON.parse(inboundobj));
        // from {"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]} 
        // to [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]}

        for (eachwid in localStorage) {
            if (eachwid.indexOf(widMasterKey) == 0) {
                var widObj = JSON.parse(localStorage[eachwid]);
                if (widObj["wid"]) {
                    widdata = ConvertToDOTdri(widObj)
                    inlist.push(widdata);
                    inobj[widdata["wid"]] = widdata;
                }
            }
        }
        var processqueryresult = processquery(inlist, mongorawquerylist);
        proxyprinttodiv('Function processqueryresult', processqueryresult, 30);
        for (eachwid in processqueryresult) {
            widdata = processqueryresult[eachwid]; // get each line of data
            proxyprinttodiv('Function widdata', widdata, 30);
            if (widdata !== undefined) {
                outlist.push(inobj[widdata['wid']])
            }
        }

        if (Object.keys(outlist).length == 0) {
            outlist.push({
                "": ""
            });
        }
    }

    proxyprinttodiv('Function outlist', outlist, 99);
    callback(null, outlist);
}




exports.offlinemongoquery = offlinemongoquery = function offlinemongoquery(queryString, callback) {
    var err;
    var resultlist = [];
    delete queryString['executethis'];
    if (queryString["mongowid"]) {
        querywidlocal(queryString, callback);
    }
    //
    else {

        proxyprinttodiv('Function mongoquery', queryString, 30);
        var enhancedreturn = getwidcopy();
        proxyprinttodiv('Function enhancedreturn', enhancedreturn, 30);
        if (queryString['mongorawquery']) {
            var mongorawquery = queryString['mongorawquery'];
            //var resultlist = [];
            proxyprinttodiv('Function mongorawquery', mongorawquery);
            for (var item in mongorawquery) {
                // {"$and": {"data.primarywid":ParentWid, "data.secondarywid":ChildWid }};
                if (item == '$and') {
                    var andquery = mongorawquery[item];
                    var ParentWid = andquery['data.primarywid'];
                    var ChildWid = andquery['data.secondarywid'];
                    proxyprinttodiv('Function andquery', andquery);
                    proxyprinttodiv('Function ParentWid', ParentWid, 30);
                    proxyprinttodiv('Function ChildWid', ChildWid, 30);
                    for (var myvalue in enhancedreturn) {
                        proxyprinttodiv('Function myvalue', myvalue);
                        //if ((myvalue['primarywid']==ParentWid) && (myvalue['secondarywid']==ChildWid)) {
                        if ((enhancedreturn[myvalue]['data']['primarywid'] == ParentWid) && (enhancedreturn[myvalue]['data']['secondarywid'] == ChildWid)) {
                            proxyprinttodiv('Function match found ', ({
                                "key": "wid",
                                "value": myvalue
                            }), 30);
                            resultlist.push({
                                "key": "wid",
                                "value": myvalue
                            });
                        }
                    }
                }
            }
        }

        if (resultlist.length == 0) {
            resultlist.push({
                "": ""
            });
        }
        proxyprinttodiv('Function mongoquery', queryString, 30);
        proxyprinttodiv('Function enhanced simpleQuery in : resultlist', resultlist, 30);
        //return resultlist
        callback(err, resultlist);

    }
}

function querywidlocal(sq, callback) {
    var err;

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
        //  enhancedreturn=widset; // remove
        //}
        proxyprinttodiv('Function simpleQuery in : widset', widset, 30);
        //for (var key in localStorage){ //***
        for (var widkey in widset) {
            //var myvalue = JSON.parse(localStorage.getItem(key)); //**
            proxyprinttodiv('Function simpleQuery in : widkey', widkey, 30);
            //var myvalue = getfrommongo({wid:widkey});

            var executeobject = {};
            executeobject["wid"] = widkey;
            executeobject["executethis"] = "getwid";
            //var x = window['getfrommongo'];
            ////var x = window['getwid'];
            //var myvalue = executethis({wid:widkey}, getfrommongo);
            //var myvalue = executethis(executeobject, getfrommongo);
            ////var myvalue = executethis(executeobject, x);
            var myvalue = executethis(executeobject);
            myvalue = myvalue[0];
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
                executeobject["executethis"] = "getwid";
                //var value = executethis({wid:key}, getfrommongo);
                proxyprinttodiv('Function simpleQuery in : executeobject', executeobject, 30);
                // proxyprinttodiv('Function simpleQuery in : x fn', x.name, 30);
                var value = executethis(executeobject);
                value = value[0];
                //var value = executethis(executeobject, getfrommongo);
                proxyprinttodiv('Function simpleQuery in : value', value, 30);
                delete value.wid;
                var resultObj = {};
                resultObj[key] = value;

                //proxyprinttodiv('Function simpleQuery in : resultObj I',  resultObj);       
                if ((value["metadata.method"] === undefined) || (value["metadata.method"] == "")) {
                    widdto = "";
                } else {
                    widdto = value["metadata.method"]
                }

                // changed 10/30 if ((mongowidmethod !== undefined) && (mongowidmethod == widdto)) {
                if (((mongowidmethod !== undefined) && (mongowidmethod == widdto)) || (mongowidmethod == "")) {
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
    callback(err, outobject);
}

// function addtomongo(widName, widobject) {
//  addToLocalStorage(widMasterKey+widName, widobject);
// }

//function addtomongo(inputWidgetObject) {
exports.offlineaddtomongo = offlineaddtomongo = offlineaddtomongo = function offlineaddtomongo(inputWidgetObject, callback) {
    var err;
    delete inputWidgetObject['executethis'];
    proxyprinttodiv('Function addtomongo inputWidgetObject', inputWidgetObject);
    var widobject = {};
    widobject = inputWidgetObject;
    var widName = widobject['wid'];
    addToLocalStorage(widMasterKey + widName, widobject);
    widobject['wid'] = widName;
    //return widobject;
    callback(err, widobject);
};

//function getfrommongo(inputWidgetObject) {
exports.offlinegetfrommongo = offlinegetfrommongo = function offlinegetfrommongo(inputWidgetObject, callback) {
    //function getfrommongo(inputWidgetObject, target, callback) {
    delete inputWidgetObject['executethis'];
    var err;

    var output = {};
    if (inputWidgetObject["wid"]) {
        var widKey = inputWidgetObject["wid"].toLowerCase();

        output = getFromLocalStorage(widMasterKey + widKey);
        if ((output == null) || (output === undefined)) {
            output = {};
        }

    }
    callback(err, output);
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

exports.mongoquery2 = mongoquery2 = function mongoquery2(mongorawquery, callback) {

    function processquery(searchobjectlist, querylist) {
        //
        // querylist in 'mongo' form + brakets: [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]
        //
        var potentialquery;
        var potentialoperator;
        var subqueryobject;
        var searchobjectresult;
        var listresult = [];
        var templist = [];
        var outlist = [];
        var eachresult;
        var item;
        var querylistindex;
        var left;
        var right;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "left": left,
                    "right": right,
                    "potentialquery": potentialquery
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

        debugfn("begin processquery", "processquery", "mongoquery", "begin", debugcolor, debugindent, debugvars([3]));

        for (querylistindex in querylist) { // querylist will always be a list
            potentialquery = querylist[querylistindex]; // we will step by objects
            for (left in potentialquery) { // this will just split left right
                right = potentialquery[left];
            }
            // if operator then recurse
            debugfn("before processquery", "processquery", "mongoquery", "begin", debugcolor, debugindent, debugvars([1]));

            // if we do need the above statemnt then we need to make a for each deep copy (see expand in utils)
            if ((left == "$or") || (left == "$and")) {
                debugcolor++;
                debugindent++;
                //listresult = processquery(searchobjectlist, right);
                templist = processquery(searchobjectlist, right);
                proxyprinttodiv('Function listresult I', listresult, 30);
                // added below %% add the array inside of another array
                listresult.push(templist);
                listresult = processoperator(searchobjectlist, listresult, left);
                proxyprinttodiv('Function listresult III', listresult, 30);
                debugcolor--;
                debugindent--;
            } else {
                listresult.push(potentialquery);
            }
            debugfn("after processquery", "processquery", "mongoquery", "end", debugcolor, debugindent, debugvars([4]));
            outlist = arrayUnique(outlist.concat(listresult));
            debugfn("end processquery", "processquery", "mongoquery", "end", debugcolor, debugindent, debugvars([4]));
        }
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
    }

    function processoperator(inobjectlist, targetparameters, operator) {
        var eachwid;
        var eachparm;
        var equalobject = {};
        var notequalobject = {};
        var resultlist = [];
        var widrecord;
        var outobject = {};
        var targetobject = {};
        var wid;
        var targetarray = [];
        var match;

        function debugvars(varlist) {
            var allvars = {
                1: {
                    "targetparameters": targetparameters,
                    "inobjectlist": inobjectlist,
                    "operator": operator
                },
                2: {
                    "eachwid": eachwid
                },
                3: {
                    "eachparm": eachparm,
                    "widrecord": widrecord,
                    "targetobject": targetobject
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

        debugfn("processoperator begin", "processoperator", "mongoquery", "begin", debugcolor, debugindent, debugvars([1]));

        for (eachwid in inobjectlist) { // got through whole list
            widrecord = inobj[inobjectlist[eachwid]["wid"]];
            proxyprinttodiv('widrecord', widrecord, 30);
            equalobject = {};
            notequalobject = {};
            proxyprinttodiv('Function widrecord', widrecord, 30);


            for (eachtarget in targetparameters) { //go through each array inside array     
                // paramters is a list [{a:b},{c:d}] or 
                // paramters is a list [[{a:b},{c:d}]
                targetobject = targetparameters[eachtarget] // targetobject = {a:b}
                proxyprinttodiv('Function targetobject', targetobject, 30);
                // %% added below
                // if not array then make it into array
                if (targetobject instanceof Array) {
                    targetarray = targetobject;
                } else {
                    targetarray.push(targetobject)
                }
                proxyprinttodiv('Function targetarray', targetarray, 30);
                match = false;
                for (eacharray in targetarray) {
                    if (targetarray instanceof Array) {
                        targetobject = targetarray[eacharray];
                    } else {
                        targetobject = eacharray;
                    }
                    proxyprinttodiv('Function targetobject II', targetobject, 30);
                    //match=false;
                    for (eachparm in targetobject) {
                        proxyprinttodiv('Function widrecord[eachparm]', widrecord[eachparm], 30);
                        proxyprinttodiv('Function targetobject[eachparm]', targetobject[eachparm], 30);
                        if (widrecord[eachparm] == targetobject[eachparm]) {
                            match = true;
                            //break;
                        } else {
                            match = false; // done at first non match
                            //break;
                        };
                        proxyprinttodiv('Function match', match, 30);
                        // if (match) { // if match then ok to go with previous type search
                        //  equalobject[eachparm] = widrecord; // previosly targetparameters
                        // } else {
                        //  notequalobject[eachparm] = widrecord; // previosly targetparameters
                        // }
                        if (match) {
                            break
                        };
                    }

                    if (match) { // if match then ok to go with previous type search
                        equalobject[eachparm] = widrecord; // previosly targetparameters
                    } else {
                        notequalobject[eachparm] = widrecord; // previosly targetparameters
                    }
                    proxyprinttodiv('Function equalobject', equalobject[eachparm], 30);
                    proxyprinttodiv('Function notequalobject', notequalobject[eachparm], 30);
                }
            }
            wid = {};
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

            debugfn("processoperator end", "processoperator", "mongoquery", "end", debugcolor, debugindent, debugvars([4, 5]));
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
    proxyprinttodiv('Function mongorawquery', mongorawquery, 30);
    mongorawquerylist.push(JSON.parse(mongorawquery)); // convert mongorawquery to list form
    // from {"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]} 
    // to [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]}

    for (eachwid in localStorage) {
        if (eachwid.indexOf(widMasterKey) == 0) {
            var widObj = JSON.parse(localStorage[eachwid]);
            if (widObj["wid"]) {
                widdata = ConvertToDOTdri(widObj)
                inlist.push(widdata);
                inobj[widdata["wid"]] = widdata;
            }
        }
    }
    var processqueryresult = processquery(inlist, mongorawquerylist);

    for (eachwid in processqueryresult) {
        widdata = processqueryresult[eachwid]; // get each line of data
        if (widdata['wid']) {
            outlist.push(inobj[widdata['wid']])
        }
    }

    callback(outlist);
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