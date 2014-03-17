// copyright (c) 2014 DRI 
if (!exports) {
    var exports = {};
}
if (!config) { // used in executethis
    var config = {};
}
// if (!environment) { // try to only use the one in configuration
//     var environment = 'local';
// }
// if (!widMasterKey) { // used here and untils maybe
//     var widMasterKey = 'widmaster_';
// }

if (!potentialwid) { // should not be neeeded
    var potentialwid = 0;
}

if (!Debug) { // printdiv
    var Debug = 'false';
}
if (!debuglevel) { // printdiv
    var debuglevel = 0;
}
if (!debugon) { // debugfn
    var debugon = false;
}

if (!debugindent) {
    var debugindent = 0;
}
if (!debugcolor) {
    var debugcolor = 0;
}
if (!debugname) {
    var debugname = '';
}
if (!debugcat) {
    var debugcat = '';
}
if (!debugsubcat) {
    var debugsubcat = '';
}
// if (!debugfilter) {
//     var debugfilter = '';
// }
// if (!debugdestination) {
//     var debugdestination = 1;
// }
// if (!debuglinenum) {
//     var debuglinenum = 1;
// }
// if (!debuglog) {
//     var debuglog = {};
// }
// if (!test_results) { // should not be neededd any more
//     var test_results = {};
// }



// *********** EVENTS **************************************************
exports.eventappinstall = eventappinstall = function eventappinstall() {
    if (exports.environment === 'local') {clearLocalStorage();}
};
exports.everyMinuteInterval = 0;
exports.everyTenMinuteInterval = 0;
exports.eventdeviceready  = eventdeviceready  = function eventdeviceready () {
    setdefaultparm();
    if (!getFromLocalStorage('DRIKEY')) {
        eventappinstall();
    }

    // start eventonemin, eventtenmin and save the interval value so 
    // you can use "clearInterval" in the future if desired to stop things
    var minutes = 60 * 1000;
    exports.everyMinuteInterval = setInterval(exports.eventonemin, 1*minutes);
    exports.everyTenMinuteInterval = setInterval(exports.eventtenmin, 10*minutes);

};

exports.eventnewpage  = eventnewpage  = function eventnewpage () {};
exports.eventonline  = eventonline  = function eventonline () {};
exports.eventoffline  = eventoffline  = function eventoffline () {};
exports.eventonemin  = eventonemin  = function eventonemin () {};
exports.eventtenmin  = eventtenmin  = function eventtenmin () {};
exports.eventdaily  = eventdaily = function eventdaily () {};
exports.eventmonthly  = eventmonthly  = function eventmonthly () {};
exports.eventlogineventsucess = eventlogineventsucess = function eventlogineventsucess() {};
exports.eventlogineventfail  = eventlogineventfail  = function eventlogineventfail () {};
exports.eventoutboundevent  = eventoutboundevent  = function eventoutboundevent () {};
exports.eventdeletewidevent  = eventdeletewidevent  = function eventdeletewidevent () {};
exports.eventgetwidevent  = eventgetwidevent  = function eventgetwidevent () {};
exports.eventupdatewidevent  = eventupdatewidevent  = function eventupdatewidevent () {};
exports.eventaddwidevent  = eventaddwidevent  = function eventaddwidevent () {};
exports.eventexecuteevent  = eventexecuteevent  = function eventexecuteevent () {};
exports.eventexecuteeachend  = eventexecuteeachend= function eventexecuteeachend () {};
exports.eventexecuteend  = eventexecuteend  = function eventexecuteend () {};

// exports.bootprocess = bootprocess = function bootprocess() {
//     if (Object.keys(config).length === 0) {
//         setdefaultparm();
// //        clearLocalStorage();
//     }
//     proxyprinttodiv('Function bootprocess config', config, 38);
//     if (!getFromLocalStorage('DRIKEY')) {
//         etappinstall();
//     }
// };

//    execute({
//        "executethis": "getwid",
//        "wid": "etenvironment"
//        }, function (err, result) {
//        //proxyprinttodiv('Function bootprocess result', result, 1);
//        // read etenvironment, if not there then must be ok to clear out initial stuff
//
//        // ***** temporary
////        result={};
//        //****
//        if (result instanceof Array) {result=result[0]}
//        if (Object.keys(result).length === 0) {
//            // then 'dirty' et environement
//            execute({
//                "executethis": "updatewid",
//                "wid": "etenvironment",
//                "something": "something"
//            }, etappinstall); //,
//            // function (err, result) {
//
//            // })
//
//            if (true) {
//                etappstarted();
//            }
//            if (true) {
//                etappnewpage();
//            }
//            //testAddWids();
//            //displayAllWids();
//        }
//    });
// proxyprinttodiv('Function END bootprocess config', config, 1);

// *********** EVENTS ************
function setdefaultparm() {

    exports.config = config = config123();
    // widMasterKey = "widmaster_";
    test_results = {};
    potentialwid = 0;
    
    // debuglevel = 0;
    // debugon = false;
    // debugname = "";
    // debugsubcat = "";
    // debugcat = "";
    // debugfilter = "";
    // debugdestination = 1;
    // debugcolor = 0;
    // debugindent = 0;
    // debuglinenum = 1;

    saveglobal("debuglevel", 0);
    saveglobal("Debug", 'false');
    saveglobal("debugon", false);
    saveglobal("debugname", "");
    saveglobal("debugsubcat", "");
    saveglobal("debugcat", "");
    saveglobal("debugfilter", "");
    saveglobal("debugdestination", 1);
    saveglobal("debugcolor", 0);
    saveglobal("debugindent", 0);
    saveglobal("debuglinenum", 1);


    // environment = "local";
    // exports.environment = environment;
    exports.environment = "local";
    // test_results = {}; // can take out
    // debuglog = {};
    // exports.debuglog = debuglog;

    exports.Debug = Debug;
    exports.debuglevel = debuglevel;
    exports.widMasterKey = "widmaster_";
    exports.test_results = test_results;
    exports.potentialwid = potentialwid;

    exports.debugon = debugon;
    exports.debugname = debugname;
    exports.debugsubcat = debugsubcat;
    exports.debugcat = debugcat;
    exports.debugfilter = getglobal("debugfilter");
    exports.debugdestination = getglobal("debugdestination");
    exports.debugcolor = debugcolor;
    exports.debugindent = debugindent;
    exports.debuglinenum = getglobal("debuglinenum");
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
}

exports.getFromLocalStorage = window.getFromLocalStorage = getFromLocalStorage = function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};

exports.addToLocalStorage = window.addToLocalStorage = addToLocalStorage = function addToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

exports.clearLocalStorage = window.clearLocalStorage = clearLocalStorage = function clearLocalStorage() {
    proxyprinttodiv('clear clearLocalStorage', 'hi', 38);
    //widMasterKey = "widmaster_";
    localStorage.clear();
    //potentialwid = 0;
            addToLocalStorage("DRI", [{
            "wid": "initialwid",
            "initialwid": "hello from bootprocess"
        }]);
        addToLocalStorage("DRIKEY", {
            "initialwid": {
                "wid": "initialwid",
                "initialwid": "for key hello from bootprocess"
            }
        });
};

exports.removeFromLocalStorage = window.removeFromLocalStorage = removeFromLocalStorage = function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
};

exports.offlineaddtomongo = offlineaddtomongo = offlineaddtomongo = function offlineaddtomongo(inputWidgetObject, command, callback) {
    try {
    var originalarguments = {};
    extend(true, originalarguments, inputWidgetObject);

    var collection = "DRI";
    var keycollection = "DRIKEY";
    var err = null;
    var widobject = {};
    var database = {};
    var keydatabase = {};
    var widName = inputWidgetObject['wid'];
    var found = false;
    if (widName) {
        proxyprinttodiv('Function addtomongo inputWidgetObject', inputWidgetObject, 1);
        proxyprinttodiv('Function addtomongo widName', widName, 1);
        database = getFromLocalStorage(collection);
        proxyprinttodiv('Function addtomongo database', database, 1);

        for (var record in database) {
            proxyprinttodiv('Function addtomongo database[record]', database[record], 1);
            if (database[record]["wid"] == widName) {
                database[record] = inputWidgetObject;
                proxyprinttodiv('Function addtomongo found', database[record], 1);
                found = true;
                break;
            }
        }

        if (!found) {
            database.push(inputWidgetObject);
        }

        keydatabase = getFromLocalStorage(keycollection);
        keydatabase[widName] = inputWidgetObject;

        addToLocalStorage(collection, database);
        addToLocalStorage(keycollection, keydatabase);
        //******
        widobject = inputWidgetObject;
        addToLocalStorage("widmaster_" + widName, widobject);
        //******
        //widobject['wid'] = widName;
        //return widobject;
        callback(err, widobject);
    } else { // if no widName
        callback(null, {}); // should have better error here
    }
    } // end try
    catch (err) {
        var finalobject = 
            createfinalobject({"result": "offlineaddtomongo"}, {}, "offlineaddtomongo", err, originalarguments);
        callback (finalobject.err, finalobject.res);
    }
};

//function getfrommongo(inputWidgetObject) {
exports.offlinegetfrommongo = offlinegetfrommongo = function offlinegetfrommongo(inputWidgetObject, command, callback) {
    try {
    var originalarguments = {};
    extend(true, originalarguments, inputWidgetObject);

    var collection = "DRI";
    var keycollection = "DRIKEY";
    var err = null;
    var output = {};
    var keydatabase = {};
    var record;
    var widName = inputWidgetObject['wid'];
    if (widName) {
        keydatabase = getFromLocalStorage(keycollection);
        output = keydatabase[widName];
        //output = getFromLocalStorage("widmaster_" + widKey);
        //database = getFromLocalStorage(collection);
        // for (record in database) {
        //     if (database[record]["wid"]==widName) {
        //         output=database[record];
        //         break;
        //         }
        //     }
    } else { // if no widname
        err = {};
    }
    callback(err, output);
    } // end try
    catch (err) {
        var finalobject = 
            createfinalobject({"result": "offlineaddtomongo"}, {}, "offlineaddtomongo", err, originalarguments);
        callback (finalobject.err, finalobject.res);
    }
}; //End of getfrommongo function


exports.offlinegetwid = window.offlinegetwid = offlinegetwid = function offlinegetwid(inputWidgetObject, callback) {
    try {
    var inbound_parameters = {};
    extend(true, inbound_parameters, inputWidgetObject);

    // get envrionment
    //
    var command = {};
    
    var convertedobject = {};
    proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 11);
    offlinegetfrommongo(inputWidgetObject, command, function (err, resultobject) {
        var originalarguments = {};
        extend(true, originalarguments, inputWidgetObject);
        // If error, bounce out
        if (err && Object.keys(err).length > 0) {
            callback(err, resultobject);
        } else {
            try {
                // convert the object from dri standard before returnning it
                proxyprinttodiv('Function getwid in : inputWidgetObject II', inputWidgetObject, 11);

                var convertedobject = convertfromdriformat(resultobject)
                proxyprinttodiv('Function getwid in : convertedobject', convertedobject, 11);
                proxyprinttodiv('Function getwid in : resultobject', resultobject, 11);

                if (inputWidgetObject['command.convertmethod'] === 'toobject') {
                    debugfn("offlinegetwid code generator", "offlinegetwid", "", "code", 2, 1, {
                        0: inbound_parameters,
                        1: ConvertFromDOTdri(convertedobject)
                    }, 6);
                    callback(null, ConvertFromDOTdri(convertedobject))
                } else {
                    debugfn("offlinegetwid code generator", "offlinegetwid", "", "code", 2, 1, {
                        0: inbound_parameters,
                        1: convertedobject
                    }, 6);
                    callback(null, convertedobject);
                }
            } // end try
            catch (err) {
                var finalobject = 
                    createfinalobject({"result": "offlinegetfrommongo"}, {}, "offlinegetfrommongo", err, originalarguments);
                callback (finalobject.err, finalobject.res);
            }
        }
    });
    } // end try
    catch (err) {
        var finalobject = 
            createfinalobject({"result": "offlinegetwid"}, {}, "offlinegetwid", err, inbound_parameters);
        callback (finalobject.err, finalobject.res);
    }
};

exports.offlineupdatewid = window.offlineupdatewid = offlineupdatewid = function offlineupdatewid(inputObject, callback) {
    try {
    var originalarguments = {};
    extend(true, originalarguments, inputObject);

    // getwidmaster environment
    // get collection and db
    // call add with those
    var command = {};

    // convert to dri format before saving
    offlineaddtomongo(converttodriformat(inputObject), command, function (err, results) {
        // If error, bounce out
        if (err && Object.keys(err).length > 0) {
            callback(err, results);
        } else {
            try {
                proxyprinttodiv('Function updatewid in : x', results, 10);
                debugfn("updatewid code generator", "offlineupdatewid", "", "code", 2, 1, {
                    0: originalarguments,
                    1: results
                    // 2: executionid
                }, 6);
                callback(null, results);
            } // end try
            catch (err) {
                var finalobject = 
                    createfinalobject({"result": "offlineaddtomongo"}, {}, "offlineaddtomongo", err, inbound_parameters);
                callback (finalobject.err, finalobject.res);
            }
        } // end else
    });
    } // end try
    catch (err) {
        var finalobject = 
            createfinalobject({"result": "offlineupdatewid"}, {}, "offlineupdatewid", err, inbound_parameters);
        callback (finalobject.err, finalobject.res);
    }
};


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
    callback(null,{
        "test": "test2 on local called"
    });
}

exports.server = window.server = server = function server(params, callback) {
    try { 
    var inbound_parameters = {};
    extend(true, inbound_parameters, params);

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
        var err;
        callback(null, data);
    });
    } // end try
    catch (err) {
        var finalobject = 
            createfinalobject({"result": "server"}, {}, "server", err, inbound_parameters);
        callback (finalobject.err, finalobject.res);
    }
};

exports.getDriApiData = getDriApiData = function getDriApiData(params, callback) {
    // set up object in syntax that driApi is expecting
    // also get getdata/<action> action from params object
    var driExecuteObj = {
        actionQueryString:params.dri_action,
        parameterDTOs:[]
    };

    // convert passed in object to parameterdto list
    for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
            driExecuteObj.parameterDTOs.push({ParameterName:prop,ParameterValue:params[prop]});
        }
    }

    $.ajax({
        url: '/getdata',
        type: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        cache: false,
        async: false,
        dataType: 'json',
        data: JSON.stringify(driExecuteObj),
        success: function (results) {
            // convert returned list of DataModelDTOs to an object
            var resultsObj = {};
            for (var i = 0; i < results.length; i++) {
                resultsObj[results[i].Key] = results[i].Value;
            }

            callback(null, resultsObj);
        },
        error: function (err) {
            callback(err.responseText, null);
        }
    });
};


exports.mongoquery = mongoquery = function mongoquery(inboundobj, callback) {
    try {
    var inbound_parameters = {};
    extend(true, inbound_parameters, inboundobj);

    proxyprinttodiv('Function inboundobj', inboundobj, 30);

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // for (var eachwid in localStorage) {
    //     if (eachwid.indexOf("widmaster_") == 0) {
    //         var widObj = JSON.parse(localStorage[eachwid]);
    //         inlist.push(widObj);
    //     }
    // }
    var query = inboundobj;
    var outlist = [];
    var convertedlist = [];
    var resultlist = [];
    var collection = "DRI";
    var keycollection = "DRIKEY";
    var database = {};
    var keydatabase = {};
    var eachwid;

    database = getFromLocalStorage(collection);

    proxyprinttodiv('Function inlist', database, 30);
    proxyprinttodiv('before IsJsonString', inboundobj, 30);
    if (IsJsonString(inboundobj)) {
        query = JSON.parse(inboundobj);
    }
    proxyprinttodiv('Function query', query, 30);
    //proxyprinttodiv('Function query',  stringify(query), 1);

    outlist = sift(query, database);

    // if date exists , return in date descending order
    outlist = outlist.sort(function (aObj, bObj) {
        // var a = aObj["metadata"]["date"];
        // var b = bObj["metadata"]["date"];
        // if (a < b) return -1;
        // if (a > b) return 1;
        // return 0;

        // descending order
        // return bObj["metadata"]["date"] - aObj["metadata"]["date"];
        // return (bObj["metadata"]["date"] > aObj["metadata"]["date"]) ? 1 : (bObj["metadata"]["date"] < aObj["metadata"]["date"]) ? -1 : 0;
        // return Date.parse(bObj["metadata"]["date"]) - Date.parse(aObj["metadata"]["date"]);
        return Date.parse(aObj["metadata"]["date"]) - Date.parse(bObj["metadata"]["date"]);
    });

    keydatabase = getFromLocalStorage(keycollection);
    for (var eachrecord in outlist) {
        eachwid = keydatabase[outlist[eachrecord]["wid"]];
        resultlist.push(eachwid);
    }

    proxyprinttodiv('Function outlist', outlist, 30);
    callback(null, resultlist);
    } // end try
    catch (err) {
        var finalobject = 
            createfinalobject({"result": "mongoquery"}, {}, "mongoquery", err, inbound_parameters);
        callback (finalobject.err, finalobject.res);
    }
};

// function getwidcopy() {
//     // step through local storage looking for
//     var set = {}; // get a copy of all local storage ***
//     var resultobject = {};
//     var wid = "";
//     for (var key in localStorage) {
//         if (key.indexOf("widmaster_") == 0) {
//             key = key.substring(10);
//             resultobject = getFromLocalStorage("widmaster_" + key);
//             wid = resultobject['wid'];
//             set[wid] = resultobject;
//             // $$$$$
//         }
//     }
//     return set;
