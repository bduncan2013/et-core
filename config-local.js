if (!exports) {
    var exports = {};
}


(function (window) {
    exports.environment = 'local';

    exports.Debug = Debug = 'false';
    exports.debuglevel = debuglevel = 0;
    exports.widMasterKey = widMasterKey = "widmaster_";
    exports.test_results = test_results = {};
    exports.potentialwid = potentialwid = 0;

    //do not change these constants
    //exports.debugon = debugon = true;
    exports.debugname = debugname = "";
    exports.debugsubcat = debugsubcat = "";
    exports.debugcat = debugcat = "";
    exports.debugfilter = debugfilter = "";
    exports.debugdestination = debugdestination = 1;
    exports.debugcolor = debugcolor = 0;
    exports.debugindent = debugindent = 0;


    // exports.offlinemongoquery = window.offlinemongoquery = offlinemongoquery = function offlinemongoquery(params, callback) {
    //     offlinemongoquery(params, callback);
    // }

    exports.getFromLocalStorage = window.getFromLocalStorage = getFromLocalStorage = function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    exports.addToLocalStorage = window.addToLocalStorage = addToLocalStorage = function addToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    exports.clearLocalStorage = window.clearLocalStorage = clearLocalStorage = function clearLocalStorage() {
        widMasterKey = "widmaster_";
        localStorage.clear();
        potentialwid = 0;
    }

    exports.removeFromLocalStorage = window.removeFromLocalStorage = removeFromLocalStorage = function removeFromLocalStorage(key) {
        localStorage.removeItem(key);
    }


})(typeof window == "undefined" ? global : window);

var config123 = function () {
    var configuration = {};

    configuration.environment = 'local';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'executeFn';
    configuration.preExecute[0].params = {};
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeParam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executeDefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'executeFn';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeParam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executeDefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'executeFn';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeParam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executeDefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].executeorder = 0;
    configuration.getwid[0].tryorder = 0;
    configuration.getwid[0].dothis = 'offlinegetwid';
    configuration.getwid[0].params = {};

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].executeorder = 0;
    configuration.updatewid[0].tryorder = 0;
    configuration.updatewid[0].dothis = 'offlineupdatewid';
    configuration.updatewid[0].params = {};

    // configuration.MongoAddEditPrepare = {};
    //  configuration.MongoAddEditPrepare.synchronous = false;

    //  configuration.AddMongoRelationship = {};
    //  configuration.AddMongoRelationship.synchronous = false;

    //  configuration.addwidmaster = {};
    //  configuration.addwidmaster.synchronous = false;

    //  configuration.AddWidParameters = {};
    //  configuration.AddWidParameters.synchronous = false;

    //  configuration.AddMaster = {};
    //  configuration.AddMaster.synchronous = false;

    //  configuration.aggressivedto = {};
    //  configuration.aggressivedto.synchronous = false;

    //  configuration.getcleanparameters = {};
    //  configuration.getcleanparameters.synchronous = false;

    //  configuration.getwidmaster = {};
    //  configuration.getwidmaster.synchronous = false;


    //  configuration.getWidMongo = {};
    //  configuration.getWidMongo.synchronous = false;

    //  configuration.getAndFormatNextLevel = {};
    //  configuration.getAndFormatNextLevel.synchronous = true;  

    //  configuration.addcleanparameters = {};
    //  configuration.addcleanparameters.synchronous = true;

    configuration.MongoAddEditPrepare = {};
    configuration.MongoAddEditPrepare.synchronous = false;

    configuration.AddMongoRelationship = {};
    configuration.AddMongoRelationship.synchronous = false;

    configuration.addcleanparameters = {};
    configuration.addcleanparameters.synchronous = false;

    configuration.addwidmaster = {};
    configuration.addwidmaster.synchronous = false;

    configuration.AddWidParameters = {};
    configuration.AddWidParameters.synchronous = false;

    configuration.AddMaster = {};
    configuration.AddMaster.synchronous = false;

    configuration.aggressivedto = {};
    configuration.aggressivedto.synchronous = false;

    configuration.getcleanparameters = {};
    configuration.getcleanparameters.synchronous = false;

    configuration.getwidmaster = {};
    configuration.getwidmaster.synchronous = false;

    configuration.getWidMongo = {};
    configuration.getWidMongo.synchronous = false;

    configuration.getAndFormatNextLevel = {};
    configuration.getAndFormatNextLevel.synchronous = false;

    configuration.querywid = {};
    configuration.querywid.synchronous = false;

    return {
        "configuration": configuration
    }
};


exports.config = config = config123();


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

// Primary execute function called after doThis

function test2(params, callback) {
    callback({
        "test": "test2 on local called"
    });
}

exports.server = window.server = server = function server(params, callback) {
    console.log('execute server called with ' + JSON.stringify(params));
    // delete params['configuration'];
    var params = toLowerKeys(params);
    // if (params['midexecute']) {
    //     params['executethis'] = params['midexecute'];
    //     delete params['midexecute'];
    // }
    // alert(JSON.stringify(params));
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


function config555() {
    var configuration = {};


    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].order = 0;
    configuration.getwid[0].dothis = 'getwid';

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].order = 0;
    configuration.updatewid[0].dothis = 'updatewid';

    configuration.querywid = [];
    configuration.querywid[0] = {};
    configuration.querywid[0].order = 0;
    configuration.querywid[0].dothis = 'querywid';

    configuration.preexecute = [];
    configuration.preexecute[0] = {};
    configuration.preexecute[0].order = 0;
    configuration.preexecute[0].dothis = 'executeFn';

    configuration.midexecute = [];
    configuration.midexecute[0] = {};
    configuration.midexecute[0].order = 0;
    configuration.midexecute[0].dothis = 'executeFn';


    configuration.postexecute = [];
    configuration.postexecute[0] = {};
    configuration.postexecute[0].order = 0;
    configuration.postexecute[0].dothis = 'executeFn';

    return {
        "configuration": configuration
    }
}

//if (exports.environment === "local") {localStorage.clear();}

//exports.mongoquery = mongoquery = function (queryString) {
exports.offlinemongoquery = offlinemongoquery = function offlinemongoquery(queryString, callback) {
    var err;

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
        callback(err, ResultList);

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


exports.offlinegetwid = window.offlinegetwid = offlinegetwid = function offlinegetwid(params, callback) {

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
}

exports.offlineupdatewid = window.offlineupdatewid = offlineupdatewid = function offlineupdatewid(params, callback) {
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
}


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
    exports.Debug = Debug
    exports.debuglevel = debuglevel
    exports.widMasterKey = widMasterKey
    exports.test_results = test_results
    exports.potentialwid = potentialwid

    exports.debugon = debugon
    exports.debugname = debugname
    exports.debugsubcat = debugsubcat
    exports.debugcat = debugcat =
        exports.debugfilter = debugfilter
    exports.debugdestination = debugdestination
    exports.debugcolor = debugcolor
    exports.debugindent = debugindent
}
exports.bootprocess = bootprocess = function bootprocess() {
    setdefaultparm();
    testclearstorage();
    if (exports.environment === 'local') {
        clearLocalStorage();
    }
    test_results = {};
    //testAddWids();
    //displayAllWids();
}