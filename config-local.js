if (!exports) {
    var exports = {};
}
if (!config) {
    var config = {};
}
if (!environment) {
    var environment='local';
}
if (!widMasterKey) {
    var widMasterKey = 'widmaster_';
}
if (!potentialwid) {
    var potentialwid = 0;
}

if (!Debug) {
    var Debug = 'false';
}
if (!debuglevel) {
    var debuglevel = 0;
}
if (!debugon) {
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
if (!debugfilter) {
    var debugfilter = '';
} 
if (!debugdestination) {
    var debugdestination = 1;
}
if (!debuglinenum) {
    var debuglinenum = 1;
}
if (!debuglog) {
    var debuglog ={};
}

if (!test_results) {
    var test_results = {};
}

exports.bootprocess = bootprocess = function bootprocess() {
    if (confg={}) {setdefaultparm()}; 
    proxyprinttodiv('Function bootprocess config', config, 99);
    execute({
        "executethis": "getwid",
        "wid": "etenvironment"
    }, function (err, result) {
        //proxyprinttodiv('Function bootprocess result', result, 99);
        // read etenvironment, if not there then must be ok to clear out initial stuff
        if (Object.keys(result).length == 0) {
            // then 'dirty' et environement
            execute({
                "executethis": "updatewid",
                "wid": "etenvironment",
                "something": "something"
            }, etappinstall()); //,
            // function (err, result) {

            // })

            if (true) {
                etappstarted();
            }
            if (true) {
                etappnewpage();
            }
            //testAddWids();
            //displayAllWids();
        }
    });
    proxyprinttodiv('Function END bootprocess config', config, 99);


    function etappinstall() { // exeucte only the first time app is installed -- once per lifetime
        setappinstallparm();
        testclearstorage();
        if (exports.environment === 'local') {
            clearLocalStorage();
        }
    }

    function etappstarted() {} // execute only once per day when app is started

    function etappnewpage() {} // execute each time we go to new page
};


//bootprocess();
//exports.config = config = config123(); //moved by Bill per Roger

function setappinstallparm() {}

function setdefaultparm() {
//    testclearstorage();  // commented by Jason, please don't clear local storage everytime.
//    clearLocalStorage();  // as it severely hinders testing
    exports.config = config = config123();
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
    debuglinenum = 1;
    exports.environment = environment;
    test_results = {}; // can take out
    debuglog = {};
    exports.debuglog = debuglog = debuglog;

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
    exports.debuglinenum = debuglinenum;
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

//exports.config = config = config123();



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
//(function (window) {


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


//})(typeof window == "undefined" ? global : window);



exports.offlinegetwid = window.offlinegetwid = offlinegetwid = function offlinegetwid(inputWidgetObject, callback) {
    delete inputWidgetObject['executethis']; // ** added by Saurabh 11/9

    proxyprinttodiv('Function getwid in : inputWidgetObject', inputWidgetObject, 17);
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

        // for (var item in outobject) { // now step through each record that could be changed
        //     if (item.indexOf("addthis.") !== -1) { // if you found "addthis." then remove from outobject
        //         outobject[item.replace("addthis.", "")] = outobject[item]; // then and readd without addthis
        //         delete outobject[item]; // delete the old one
        //     }
        // }

        proxyprinttodiv('Function getwid out : outobject', outobject, 99);

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
    saveobject['metadata']['date'] = new Date();
    proxyprinttodiv('Function updatewid wid', saveobject['wid'], 10);
    proxyprinttodiv('Function updatewid added date', saveobject['metadata'], 10);



    // saveobject['metadata'] = inputWidgetObject['metadata'] ; 
    delete inputWidgetObject['metadata.method'];
    if (inputWidgetObject) {
        saveobject['data'] = inputWidgetObject;
    } else {
        saveobject['data'] = "";
    }

    offlineaddtomongo(saveobject, function (err, results) {
        proxyprinttodiv('Function updatewid in : x', results, 10);
        debugfn("updatewid code generator", "updatewid", "add", "code", 2, 1, {
            0: inputObject,
            1: results
        }, 4);
        callback(err, results);
    });
};


function resetMasterKey() {
    widMasterKey = "widmaster_";
}




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
    proxyprinttodiv('Function inboundobj', inboundobj, 30);

    var inlist = [];
    var query=inboundobj;
    var outlist = [];

    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    for (var eachwid in localStorage) {
        if (eachwid.indexOf(widMasterKey) == 0) {
            var widObj = JSON.parse(localStorage[eachwid]);
            inlist.push(widObj);
        }
    }
    proxyprinttodiv('Function inlist', inlist, 30);
    proxyprinttodiv('before IsJsonString', inboundobj, 30);
        if (IsJsonString(inboundobj)) {
            query = JSON.parse(inboundobj);
        }

    proxyprinttodiv('Function query', query, 30);
    //proxyprinttodiv('Function query',  stringify(query), 99);

    outlist = sift(query, inlist);

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


    proxyprinttodiv('Function outlist', outlist, 30);
    callback(null, outlist);
}

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
    return set;
}