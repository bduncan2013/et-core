// Wids :--
// {"wid": "colordto", "metadata.method": "colordto", "hue": "string", "sat": "string"}
// {"wid": "color1", "metadata.method": "colordto", "hue": "red", "sat": "red-sat"},
// {"wid": "color2", "metadata.method": "colordto", "hue": "green",  "sat": "green-sat"}
// {"wid": "color3", "metadata.method": "colordto", "hue": "blue", "sat": "blue-sat"}, 
// {"wid": "color4", "metadata.method": "colordto", "hue": "cyan", "sat": "cyan-sat"},
// {"wid": "color5", "metadata.method": "colordto", "hue": "magenta", "sat": "magenta-sat"},
// {"wid": "color6", "metadata.method": "colordto", "primarywid": "color8", "secondarywid": "color9"}, 
// {"wid": "color7", "metadata.method": "colordto", "hue": "black", "sat": "black-sat"}
// {"wid": "color8", "metadata.method": "colordto", "hue": "black", "sat": "red-sat"}
// {"wid": "color9", "metadata.method": "colordto", "hue": "cyan", "sat": "red-sat"}

// {"wid": "colordto2", "metadata.method": "colordto2", "light": "string", "chroma": "string"}
// {"wid": "color10", "metadata.method": "colordto", "hue": "pink", "sat": "pink-sat", "colordto2.0.light": "pink-light", "colordto2.0.chroma": "pink-chroma", "colordto2.1.light": "pink-light1", "colordto2.1.chroma": "pink-chroma2", "colordto2.0.colordto3.intensity": "pink-intensity"}
// {"wid": "colordto3", "metadata.method": "colordto3", "intensity": "string"}


// 4. mongowid ----------------------------------------------------------------------------------------------------------
// QueryWid(mongowid=color10, relationshipdirection=forward, relationshiptype=attributes, relationshipmethod=ALL, mongowidmethod=colordto2) :--
// [it will create 4 wids {color10, colordto2.0[color201], colordto2.1[color202] , colordto2.0.colordto3[color301]} ]
// {"wid": "color201", "metadata.method": "colordto2", "light": "pink-light", "chroma": "pink-chroma"}
// {"wid": "color202", "metadata.method": "colordto2", "light": "pink-light2", "chroma": "pink-chroma2"}


// QueryWid(mongowid=color10, relationshipdirection=forward, relationshiptype=attributes, relationshipmethod=last, mongowidmethod=colordto2) :--
// {"wid": "color202", "metadata.method": "colordto2", "light": "pink-light2", "chroma": "pink-chroma2"}



// 1. mongorawquery ----------------------------------------------------------------------------------------------------------
// QueryWid(mongorawquery="{$or:[{"hue":"black"}]}") :--
// {"wid": "color7", "metadata.method": "colordto", "hue": "black", "sat": "black-sat"}

// 2. mongosinglequery ----------------------------------------------------------------------------------------------------------
// QueryWid(mongosinglequery=color7, relationshipdirection=forward, relationshiptype=attributes, relationshipmethod=first) :-- 
// [it will create $or["hue": "black", "sat": "black-sat"]]
// {"wid": "color8", "metadata.method": "colordto", "hue": "black", "sat": "red-sat"}

// QueryWid(mongosinglequery=color8, relationshipdirection=reverse, relationshiptype=attributes, relationshipmethod=last) :-- 
// [it will create $or["hue": "black", "sat": "red-sat"]]
// {"wid": "color1", "metadata.method": "colordto", "hue": "red", "sat": "red-sat"}

// 3. mongomultiplequery ----------------------------------------------------------------------------------------------------------
// QueryWid(mongomultiplequery=color6) :-- 
// [ it will make query from child wids also ,,, == QueryWid($and[$or["hue": "black", "sat": "red-sat"], $or["hue": "cyan", "sat": "red-sat"]]) ]
// [ $and[$or[color1,color7,color8,color9], $or[color1,color4,color8,color9,]]  ]
// {"wid": "color1", "metadata.method": "colordto", "hue": "red", "sat": "red-sat"}
// {"wid": "color8", "metadata.method": "colordto", "hue": "black", "sat": "red-sat"}
// {"wid": "color9", "metadata.method": "colordto", "hue": "cyan", "sat": "red-sat"}

exports.mttest4 = mttest4 = function mttest4(params, callback){
    console.log("<< mttest4 >>");
    
    var codedebug = false;
    if(codedebug){
        debugcolor = 0;
        debugon = true;
        debugname = "";
        debugsubcat = "";
        debugcat = "mongoquerycode";
        debugfilter = "";
        debugdestination = 1;
        debuglevel=30;
    }
    //debuglevel=17;
    /* adding wids */
    testclearstorage();
        debugname = "updatewid";
        debugsubcat = "code";
        debugcat = "add";
    var addList = [
        {"executethis":"updatewid", "metadata.method": "colordto", "wid": "colordto", "hue": "string", "sat": "string"},
        {"executethis":"updatewid", "metadata.method": "colordto", "wid": "color1", "hue": "red", "sat": "red-sat"},
        {"executethis":"updatewid", "wid": "color2", "metadata.method": "colordto", "hue": "green",  "sat": "green-sat"},
        {"executethis":"updatewid", "wid": "color3", "metadata.method": "colordto", "hue": "blue", "sat": "blue-sat"}, 
        {"executethis":"updatewid", "wid": "color4", "metadata.method": "colordto", "hue": "cyan", "sat": "cyan-sat"},
        {"executethis":"updatewid", "wid": "color5", "metadata.method": "colordto", "hue": "magenta", "sat": "magenta-sat"},
        {"executethis":"updatewid", "wid": "color60", "metadata.method": "colordto", "relationshiptype":"attributes", "primarywid": "color8", "secondarywid": "color1"},
        {"executethis":"updatewid", "wid": "color61", "metadata.method": "colordto", "relationshiptype":"attributes", "primarywid": "color8", "secondarywid": "color2"}, 
        {"executethis":"updatewid", "wid": "color62", "metadata.method": "colordto", "relationshiptype":"attributes", "primarywid": "color8", "secondarywid": "color3"}, 
        {"executethis":"updatewid", "wid": "color63", "metadata.method": "colordto", "relationshiptype":"attributes", "primarywid": "color8", "secondarywid": "color4"},  
        {"executethis":"updatewid", "wid": "color7", "metadata.method": "colordto", "hue": "black", "sat": "black-sat"},
        {"executethis":"updatewid", "wid": "color8", "metadata.method": "colordto", "hue": "black", "sat": "red-sat"},
        {"executethis":"updatewid", "wid": "color9", "metadata.method": "colordto", "hue": "cyan", "sat": "red-sat"},
        {"executethis":"updatewid", "wid": "colordto2", "metadata.method": "colordto2", "light": "string", "chroma": "string"},
        {"executethis":"updatewid", "wid": "color10", "metadata.method": "colordto", "hue": "pink", "sat": "pink-sat", "colordto2.0.light": "pink-light", "colordto2.0.chroma": "pink-chroma", "colordto2.1.light": "pink-light1", "colordto2.1.chroma": "pink-chroma2", "colordto2.0.colordto3.intensity": "pink-intensity"},
        {"executethis":"updatewid", "wid": "colordto3", "metadata.method": "colordto3", "intensity": "string"}
    ];  
    execute(addList, function (err, res) {
        console.log(' >>> final response after addList >>> ' + JSON.stringify(res));
    });
   
   var mongorawquerytests = true;
   var mongosinglequerytests = false;
   var mongomultiplequerytests = false;
   var relationshiptests = false;

    debugfn("update code generator END", "updatewid", "add", "code", debugcolor, debugindent, {}, 5);
        debugname = "";
        debugsubcat = "";
        debugcat = "";

   
   
    /* mongo raw queries */
    if(mongorawquerytests){
        var queryList = [
            {
                "executethis": "querywid",
                "mongorawquery": '{"$or": [{ "wid": "color1" }]}'
             
                        
                   
               
            }
        ];
        execute(queryList, function (err, res) {
            console.log(' >>> final response after queryList >>> ' + JSON.stringify(res));
        });
    }
    
    /* mongo single queries */
    if(mongosinglequerytests){
        var queryList = [
            {
                "executethis": "querywid",
                "mongosinglequery": "color7",
                //"relationshipdirection": "forward",
                //"relationshiptype": "attributes",
                //"relationshipmethod": "first"
            }
        ];  
        execute(queryList, function (err, res) {
            console.log(' >>> final response after queryList >>> ' + JSON.stringify(res));
        });
    }

    if(relationshiptests) {
        var queryList = [
            {
                "executethis": "querywid",
                "mongowid" : "color8",
                "mongorelationshipdirection": "forward",
                "mongorelationshiptype": "attributes",
                "mongorelationshipmethod": "first"
            }
        ];  
        execute(queryList, function (err, res) {
            console.log(' >>> final response after queryList >>> ' + JSON.stringify(res));
        });

    }
} 
exports.testcallback = testcallback = function testcallback(params, callback) {
    console.log("<< testcallback >>");
    params["test_result"] = "PASSnew";
    callback(null, params);
}

exports.executegetwidtest = executegetwidtest = function executegetwidtest(params, callback) {

    executeList = [{
        "executethis": "offlineaddtomongo",
        "wid": "getexecutetest",
        "metadata": {
            "method": "testdto"
        },
        "data": {
            "executethis": "testcallback",
            "a": "Hello",
            "b": "goodbye"
        }
    }, {
        "executethis": "getexecutetest"
    }]

    execute(executeList, function (err, res) {
        res = logverify("unit_tests", "getexecutetest", "", res, "", {});
        callback(err, res)

    });

}


exports.qw1 = qw1 = function (params, callback) {
    var q = '[{"dtotype":"","convertmethod":"","mongowidmethod":"","mongorelationshipdirection":"forward","mongorelationshipmethod":"all","mongorelationshiptype":"attributes"}]';
    var qJson = JSON.parse(q);

    querywid(qJson, function (err, res) {

        console.log(' >>> final response after querywid >>> ' + JSON.stringify(res));

        res = logverify("unit_tests", "testqw1_result", "", res[0], "", {});

        callback(err, res)
    });
}

exports.qw2 = qw2 = function (params, callback) {
    var q = '{"mongorawquery":{"wid":"wid1","mongorelationshiptype":"x"}}';
    var qJson = JSON.parse(q);

    var executeList = [{
        "executethis": "updatewid",
        "wid": "wid1"
    }];
    execute(executeList, function (err, res) {
        querywid(qJson, function (err, res) {
            console.log(' >>> final response after querywid >>> ' + JSON.stringify(res[0][0]));
            res = logverify("unit_tests", "testqw2_result", "", res[0], "", {});
            callback(err, res)
        });
    });
}


exports.mongoquery1 = mongoquery1 = function (params, callback) {
    var q = '{"mongorawquery":{"wid":"wid1","mongorelationshiptype":"x"}}';
    var qJson = JSON.parse(q);

    // add data
    var executeList = [{
        "executethis": "updatewid",
        "wid": "wid1"
    }];

    // query data added
    execute(executeList, function (err, res) {
        mongoquery(qJson, function (err, res) {
            console.log(' >>> final response after mongoquery >>> ' + JSON.stringify(res));
            res = logverify("unit_tests", "testmongoquery1_result", "", res, "", {});
            callback(err, res)
        });
    });
}




exports.mts1 = mts1 = function mts1(params, callback) {
    // basic test for debuging query issues
    console.log("Simple update wid test");

    // local vars
    var dtoObj;
    var executeList = [];
    var mongorawquery;
    var executeObj;

    // Util functions

    function colorTrace(msg, color) {
        console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
    }

    executeList = [{
        "executethis": "offlineaddtomongo",
        "wid": "1",
        "metadata": {
            "method": "relationshipdto"
        },
        "data": {
            "relationshiptype": "attributes",
            "secondarywid": "undefined",
            "primarywid": "song1"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "songdto",
        "metadata": {
            "method": "songdto"
        },
        "data": {
            "title": "string",
            "sounddto": "onetomany"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "4",
        "metadata": {
            "method": "sounddto"
        },
        "data": {
            "note": "C flat"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "2",
        "metadata": {
            "method": "sounddto"
        },
        "data": {
            "note": "B sharp"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "3",
        "metadata": {
            "method": "relationshipdto"
        },
        "data": {
            "relationshiptype": "attributes",
            "secondarywid": "2",
            "primarywid": "song1"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "rel_sound_to_song",
        "metadata": {
            "method": "defaultdto"
        },
        "data": {
            "primarywid": "songdto",
            "secondarywid": "sounddto",
            "relationshiptype": "attributes"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "song1",
        "metadata": {
            "method": "songdto"
        },
        "data": {
            "title": "Highway to Hell"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "sounddto",
        "metadata": {
            "method": "sounddto"
        },
        "data": {
            "note": "string"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "undefined",
        "metadata": {
            "method": "sounddto"
        },
        "data": {
            "note": "A flat"
        }
    }, {
        "executethis": "offlineaddtomongo",
        "wid": "5",
        "metadata": {
            "method": "relationshipdto"
        },
        "data": {
            "relationshiptype": "attributes",
            "secondarywid": "4",
            "primarywid": "song1"
        }
    }]
    // // Build execute array for adding a wid
    // executeList = [{
    //  "executethis": "addwidmaster", 
    //  "wid": "sounddto",
    //  "metadata.method": "sounddto",
    //  "note": "string"
    // },
    // {    
    //  "executethis": "addwidmaster", 
    //  "wid": "songdto",
    //  "metadata.method": "songdto",
    //  "title": "string",
    //  "sounddto": "onetomany"
    // },
    // {    
    //  "executethis": "addwidmaster", 
    //  "wid": "rel_sound_to_song",
    //  "primarywid": "songdto",
    //  "secondarywid": "sounddto",
    //  "relationshiptype": "attributes"
    // },
    // {    
    //  "executethis": "addwidmaster", 
    //  "wid": "song1",
    //  "metadata.method": "songdto",
    //  "title": "Highway to Hell",
    //  "sounddto.0.note": "A flat",
    //  "sounddto.1.note": "B sharp",
    //  "sounddto.2.note": "C flat"
    // }];

    // pass our add test wid array to execute this, this should add a wid to local storage
    execute(executeList, function (err, res) {
        colorTrace('res after executerray: ' + JSON.stringify(res), "blue");

        // build query
        debugcat = "mongoquery";
        debugcolor = 1;
        debuglevel = 30;
        //mongorawquery = '{"$and":{"data.primarywid":"song1","data.secondarywid":"2"}}';

        // execute mongoquery
        //mongoquery(mongorawquery, function (err, res) {
        proxyprinttodiv('Function mttest ', res, 99);

        // build execute array for testing query wid
        executeObj = {};
        executeObj["executethis"] = "querywid";
        executeObj["mongorawquery"] = '{"$and":[{"data.primarywid":"song1","data.secondarywid":"4"}]}';
        executeList = [];
        executeList.push(executeObj);

        // Execute our query wid test
        execute(executeList, function (err, res) {
            proxyprinttodiv('Function mttest II', res, 99);
        });
        //});
    });
}

exports.mts2 = mts2 = function mts2(params, callback) {
    // basic test for debuging query issues
    console.log("Simple update wid test");

    // local vars
    var dtoObj;
    var executeList = [];
    var mongorawquery;
    var executeObj;

    // Util functions

    function colorTrace(msg, color) {
        console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
    }

    // Build execute array for adding a wid
    dtoObj = {
        "executethis": "updatewid",
        "metadata.method": "testdto",
        "wid": "testdto",
        "a": "string",
        "b": "string"
    };
    executeList.push(dtoObj);

    // pass our add test wid array to execute this, this should add a wid to local storage
    execute(executeList, function (err, res) {
        colorTrace('res after executerray: ' + JSON.stringify(res), "blue");

        // build query
        mongorawquery = '{"$or":[{"data.a":"string"}]}';

        // execute mongoquery
        mongoquery(mongorawquery, function (err, res) {
            colorTrace("mongorawquery returned: " + JSON.stringify(res), "blue");

            // build execute array for testing query wid
            executeObj = {};
            executeObj["executethis"] = "querywid";
            executeObj["mongorawquery"] = '{"$or":[{"data.a":"string"}]}';
            executeList = [];
            executeList.push(executeObj);

            // Execute our query wid test
            execute(executeList, function (err, res) {
                alert(JSON.stringify(res));
                colorTrace('res after executerray querywid: ' + JSON.stringify(res), "blue");
            });
        });
    });
}


exports.mttest1 = mttest1 = function mttest1(params, callback){
    console.log("<< mongoquery_two_test >>");
    
    var ortests = true;
    var andtests = true;
    var orortests = true;
    var andandtests = true;
    var orandtests = true;
    var failedtests = true;
    
    var orandtests20 = false;
    var verifytests = false;
    var sifttests = false;
    
    var codedebug = false;
    if(codedebug){
        debugcolor = 0;
        debugon = true;
        debugname = "";
        debugsubcat = "";
        debugcat = "mongoquery";
        debugfilter = "";
        debugdestination = 1;
        debuglevel=30;
    }
    
    /* adding wids */
    testclearstorage();
    var executeList = [];
    executeList = addmttestdata(callback);    
    execute(executeList, function (err, res) {
        console.log(' >>> final response after executerray >>> ' + JSON.stringify(res));
    });

    /* $or queries */   
    if(ortests){
        var mongorawquery = '{"$or":[{"data.a":"string"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [testdto]", result, 99);
        });

        var mongorawquery = '{"$or":[{"data.a":"1"},{"data.b":"1"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1]", result, 99);
        });
        //test fails
        var mongorawquery = '{"$or":[{"data.a":"1"},{"data.b":"16"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1, wid4]", result, 99);
        });     
        
    }
    
    /* $and queries */
    if(andtests){
        var mongorawquery = '{"$and":[{"data.a":"string"}]}';
        mongoquery(mongorawquery, function (err, result){
           proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [testdto]", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"1"},{"data.b":"1"}]}';
        mongoquery(mongorawquery, function (err, result){
           proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1]", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"1"},{"data.b":"16"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- []", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"1"},{"data.b":"1"},{"data.b":"1"}]}';
        mongoquery(mongorawquery, function (err, result){
           proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1]", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"1"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1]", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"5"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid5]", result, 99);
        });     
    }
    
    /* $or-$or tests */
    if(orortests){
        var mongorawquery = '{"$or":[{"data.a":"1"},{"$or":[{"data.b":"25"},{"data.a":"5"},{"data.a":"5"},{"data.a":"1"}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1,wid5]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"5"},{"$or":[{"data.b":"25"},{"$or":[{"data.a":"5"},{"$or":[{"data.b":"25"}]}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid5]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"5"},{"$or":[{"data.b":"16"}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid4,wid5]", result, 99);
        });
    }
    
    /* $and-$and queries */
    if(andandtests){
        var mongorawquery = '{"$and":[{"data.a":"1"},{"$and":[{"data.b":"1"}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1]", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"5"},{"$and":[{"data.b":"25"}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid5]", result, 99);
        });
        //test fails
        var mongorawquery = '{"$and":[{"data.a":"5"},{"$and":[{"data.b":"25"},{"$and":[{"data.b":"1"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- []", result, 99);
        });
    }
    
    /* $or-$and queries */
    if(orandtests){
        var mongorawquery = '{"$or":[{"data.a":"1"},{"$and":[{"data.b":"1"}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"5"},{"$and":[{"data.a":"4"},{"$and":[{"data.b":"1"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid5]", result, 99);
        });
    }

    /* fail test cases */
    if(failedtests){
        var mongorawquery = '{"$and":[{"data.a":"4"},{"$or":[{"data.a":"2"},{"$or":[{"data.b":"16"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid4]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"1"},{"data.b":"16"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid1, wid4]", result, 99);
        }); 
    }
    
    /* 20 more test cases */
    if(orandtests20){
        var mongorawquery = '{"$or":[{"data.a":"25"},{"$and":[{"data.a":"44"},{"data.a":"64"},{"$or":[{"data.b":"400"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid25]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"25"},{"$and":[{"data.a":"44"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid25]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"25"},{"$or":[{"data.a":"2"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"},{"$or":[{"data.a":"2"}]}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid2,wid20,wid25]", result, 99);
        });
        var mongorawquery = '{"$or":[{"data.a":"2"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"},{"$or":[{"data.a":"2"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid2,wid20,wid25]", result, 99);
        });
        //test fails
        var mongorawquery = '{"$and":[{"data.a":"25"},{"$or":[{"data.a":"2"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"},{"$or":[{"data.a":"2"}]}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid25]", result, 99);
        });
        var mongorawquery = '{"$and":[{"data.a":"4"},{"$and":[{"data.a":"2"},{"$or":[{"data.b":"16"}]}]}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [wid25]", result, 99);
        });
    }

    /* varify test cases */
    if(verifytests){
        console.log("<< inside verifytests >>");
        
        var executeObj = {};
        executeObj["executethis"]="querywid";
        executeObj["mongorawquery"]= '{"$or":[{"data.a":"string"}]}';
        executeList.push(executeObj);
        
        execute(executeList, function (err, res) {
            console.log(' >>> final response after executerray >>> ' + JSON.stringify(res));
            
            var expectedResultArray = [];
            expectedResultArray.push({"wid":"testdto","metadata.method":"testdto","data.b":"string","data.a":"string"});
            params = logverify("mongoquery","resultwid1" ,res[1],"","",expectedResultArray);

            proxyprinttodiv("end of verify tests", "end of verify tests", 99);
        });
    }
        
    /* Sift Test cases */
    if(sifttests){
        //sift syntax :-  var result =  sif({$operator:[cond],  [array]});
        var widArray = [{"wid":"testdto","metadata":{"method":"testdto"},"data":{"b":"string","a":"string"}},{"wid":"wid1","metadata":{"method":"testdto"},"data":{"b":"1","a":"1"}}, {"wid":"wid2","metadata":{"method":"testdto"},"data":{"b":"4","a":"2"}}, {"wid":"wid3","metadata":{"method":"testdto"},"data":{"b":"9","a":"3"}},  {"wid":"wid4","metadata":{"method":"testdto"},"data":{"b":"16","a":"4"}}, {"wid":"wid5","metadata":{"method":"testdto"},"data":{"b":"25","a":"5"}}];
        var mongorawquery = {"$or":[{"data.a":"string"}]};
        var result = sift(mongorawquery, widArray);
        proxyprinttodiv("widArray", widArray, 99);
        proxyprinttodiv("mongorawquery", mongorawquery, 99);
        proxyprinttodiv("result", result, 99);
        
        var mongorawquery = '{"$or":[{"data.a":"string"}]}';
        mongoquery(mongorawquery, function (err, result){
            proxyprinttodiv("result from mongoquery with query " +mongorawquery+ " -- expected result :- [testdto]", result, 99);
        });
    }

    params={'test':'PASS'};
    callback(params);
}

function addmttestdata(callback) {
    console.log("<< addmttestdata >>");

    proxyprinttodiv("staring data add", "data add", 99);
    var widArray = [];

    var dtoObj = {
        "executethis": "updatewid",
        "metadata.method": "testdto",
        "wid": "testdto",
        "a": "string",
        "b": "string"
    };
    widArray.push(dtoObj);

    var totalWids = 5; //during debugging
    //var totalWids = 50;       //during real time testing
    for (var i = 1; i <= totalWids; i++) {
        var widObj = {};
        widObj["executethis"] = "updatewid";
        widObj["metadata.method"] = "testdto";
        widObj["wid"] = "wid" + i;
        widObj["a"] = "" + (i);
        widObj["b"] = "" + (i * i);
        widArray.push(widObj);
    }

    /*
    execute(widArray, function (err, res) {
        console.log(' >>> final response after executerray >>> ' + JSON.stringify(res));
    });
    proxyprinttodiv("end of data add", "end data add", 99);
    */
    return widArray;
}





exports.t1example = t1example = function t1example(params, callback) {
    testclearstorage();
    config = setconfig1();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2"
        }],
        function (err, res) {
            res = logverify("unit_tests", "t1_result", "", res[0], "", {
                "d": "1",
                "c": "0",
                "g": "4"
            });
            if (callback instanceof Function) {
                callback(err, res)
            } else {
                return res
            }
        });
}


exports.mttest2 = mttest2 = function mttest2(params, callback) {
    console.log("<< mongoquery_two_test >>");

    testclearstorage();

    //To add wid data
    var executeList = [];
    var dtoObj = {
        "executethis": "updatewid",
        "metadata.method": "testdto",
        "wid": "testdto",
        "a": "string",
        "b": "string"
    };
    executeList.push(dtoObj);
    for (var i = 1; i <= 5; i++) {
        var executeobj = {};
        executeobj["executethis"] = "updatewid";
        executeobj["metadata.method"] = "testdto";
        executeobj["wid"] = "wid" + i;
        executeobj["a"] = "" + (i);
        executeobj["b"] = "" + (i * i);
        executeList.push(executeobj);
    }

    //To query data
    var queryobj = {};

    queryobj["executethis"] = "querywid";
    queryobj["rawmongoquery"] = {
        "$or": [{
            "data.a": "string"
        }]
    };
    executeList.push(queryobj);

    queryobj["rawmongoquery"] = {
        "$or": [{
            "data.a": "1"
        }, {
            "data.b": "1"
        }]
    };
    executeList.push(queryobj);

    queryobj["rawmongoquery"] = {
        "$or": [{
            "data.a": "1"
        }, {
            "data.b": "16"
        }]
    };
    executeList.push(queryobj);

    proxyprinttodiv("execute list ", executeList, 99);

    execute(executeList, function (err, res) {
        proxyprinttodiv('Function verifytestresults', res, 99);
        console.log(' >>> final response after executerray >>> ' + JSON.stringify(res));
        var expectedResultList = [{
            "wid": "wid4",
            "metadata.method": "testdto",
            "data.a": "4",
            "data.b": "16"
        }, {
            "wid": "wid5",
            "metadata.method": "testdto",
            "data.a": "5",
            "data.b": "25"
        }];
        proxyprinttodiv('Function verifytestresults', res, 99);
        params = logverify("mongoquery", "resultwid", "", res[6][0], "", expectedResultList);
        x = verifysummary("test_results");
        proxyprinttodiv('x', x, 99);
        callback(null, x);
        //verifytestresults(res);
    });
}


exports.testcallback = testcallback = function testcallback(params, callback) {
    console.log("<< testcallback >>");
    params["test_result"] = "PASS";
    callback(null, params);
}


exports.mttest3 = mttest3 = function mttest3(params, callback) {
    console.log("<< mttest3 >>");

    testclearstorage();

    //To add wid data
    var executeList = [{
        "executethis": "addwidmaster",
        "wid": "colordto",
        "metadata.method": "colordto",
        "hue": "string"
    }, {
        "executethis": "addwidmaster",
        "wid": "color1",
        "metadata.method": "colordto",
        "hue": "red"
    }, {
        "executethis": "addwidmaster",
        "wid": "color2",
        "metadata.method": "colordto",
        "hue": "green"
    }, {
        "executethis": "getwidmaster",
        "wid": "color1"
    }, {
        "executethis": "getwidmaster",
        "wid": "color2"
    }, {
        "executethis": "addwidmaster",
        "wid": "color3",
        "hue": "blue"
    }, {
        "executethis": "addwidmaster",
        "wid": "color4",
        "metadata.method": "colordto",
        "hue": "cyan"
    }, {
        "executethis": "addwidmaster",
        "wid": "color5",
        "metadata.method": "colordto",
        "hue": "magenta"
    }, {
        "executethis": "addwidmaster",
        "wid": "color6",
        "metadata.method": "colordto",
        "hue": "yellow"
    }, {
        "executethis": "addwidmaster",
        "wid": "color7",
        "metadata.method": "colordto",
        "hue": "black"
    }, {
        "executethis": "getwidmaster",
        "wid": "color6"
    }, {
        "executethis": "getwidmaster",
        "wid": "color7"
    }];
    proxyprinttodiv("execute list", executeList, 99);
    execute(executeList, function (err, res) {

    });

    //Query Data
    executeList = [];
    var executeList = [{
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "red"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "green"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "blue"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "cyan"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "magenta"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "yellow"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "black"
            }]
        }
    }];
    proxyprinttodiv("execute list for query", executeList, 99);
    execute(executeList, function (err, res) {

    });

    //Query Expected Result List
    expectedResultList = [
        [{
            "wid": "color1",
            "metadata.method": "colordto",
            "hue": "red"
        }],
        [{
            "wid": "color2",
            "metadata.method": "colordto",
            "hue": "green"
        }],
        [{
            "wid": "color3",
            "metadata.method": "colordto",
            "hue": "blue"
        }],
        [{
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "cyan"
        }],
        [{
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta"
        }],
        [{
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "yellow"
        }],
        [{
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "black"
        }]
    ];
}

exports.mttest333 = mttest333 = function mttest333(params, callback) {
    console.log("<< mttest3 >>");
    testclearstorage();

    // Add List
    var addlist = [{
        "executethis": "addwidmaster",
        "wid": "colordto",
        "metadata.method": "colordto",
        "hue": "string",
        "sat": "string"
    }, {
        "executethis": "addwidmaster",
        "wid": "color1",
        "metadata.method": "colordto",
        "hue": "red",
        "sat": "red-sat"
    }, {
        "executethis": "addwidmaster",
        "wid": "color2",
        "metadata.method": "colordto",
        "hue": "green",
        "sat": "green-sat"
    }, {
        "executethis": "addwidmaster",
        "wid": "color3",
        "metadata.method": "colordto",
        "hue": "blue",
        "sat": "blue-sat"
    }, {
        "executethis": "addwidmaster",
        "wid": "color4",
        "metadata.method": "colordto",
        "hue": "cyan",
        "sat": "cyan-sat"
    }, {
        "executethis": "addwidmaster",
        "wid": "color5",
        "metadata.method": "colordto",
        "hue": "magenta",
        "sat": "magenta-sat"
    }, {
        "executethis": "addwidmaster",
        "wid": "color6",
        "metadata.method": "colordto",
        "hue": "yellow",
        "sat": "yellow-sat"
    }, {
        "executethis": "addwidmaster",
        "wid": "color7",
        "metadata.method": "colordto",
        "hue": "black",
        "sat": "black-sat"
    }];

    //Query List
    var querylist = [{
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "string"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "green"
            }, {
                "sat": "blue-sat"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "blue"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "yellow"
            }, {
                "sat": "red-sat"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "sat": "cyan-sat"
            }, {
                "hue": "cyan"
            }, {
                "sat": "cyan-sat"
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "red"
            }, {
                "$or": [{
                    "sat": "magenta-sat"
                }, {
                    "hue": "magenta"
                }, {
                    "hue": "magenta"
                }, {
                    "hue": "red"
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "magenta"
            }, {
                "$or": [{
                    "sat": "magenta-sat"
                }, {
                    "$or": [{
                        "hue": "magenta"
                    }, {
                        "$or": [{
                            "sat": "magenta-sat"
                        }]
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "magenta"
            }, {
                "$or": [{
                    "sat": "cyan-sat"
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "magenta"
            }, {
                "$and": [{
                    "sat": "magenta-sat"
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "magenta"
            }, {
                "$and": [{
                    "sat": "magenta-sat"
                }, {
                    "$and": [{
                        "sat": "red-sat"
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "red"
            }, {
                "$and": [{
                    "sat": "red-sat"
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "magenta"
            }, {
                "$and": [{
                    "hue": "cyan"
                }, {
                    "$and": [{
                        "sat": "red"
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "blue"
            }, {
                "$and": [{
                    "hue": "yellow"
                }, {
                    "hue": "red"
                }, {
                    "$or": [{
                        "sat": "cyan-sat"
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "yellow"
            }, {
                "$and": [{
                    "hue": "black"
                }, {
                    "$or": [{
                        "sat": "black-sat"
                    }, {
                        "sat": "blue-sat"
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$or": [{
                "hue": "green"
            }, {
                "$or": [{
                    "hue": "green568"
                }, {
                    "hue": "red"
                }, {
                    "$or": [{
                        "sat": "yellow-sat"
                    }, {
                        "sat": "blue-sat"
                    }, {
                        "$or": [{
                            "hue": "cyan"
                        }]
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "magenta"
            }, {
                "$or": [{
                    "hue": "green"
                }, {
                    "hue": "cyan"
                }, {
                    "$or": [{
                        "sat": "yellow-sat"
                    }, {
                        "sat": "red-sat"
                    }, {
                        "$or": [{
                            "hue": "blue"
                        }]
                    }]
                }]
            }]
        }
    }, {
        "executethis": "querywid",
        "rawmongoquery": {
            "$and": [{
                "hue": "cyan"
            }, {
                "$or": [{
                    "hue": "green"
                }, {
                    "$or": [{
                        "sat": "cyan-sat"
                    }]
                }]
            }]
        }
    }, ];

    //Verify List
    var verifylist = [
        [{
            "wid": "colordto",
            "metadata.method": "colordto",
            "hue": "string",
            "sat": "string"
        }],
        [{
            "wid": "color2",
            "metadata.method": "colordto",
            "hue": "green",
            "sat": "green-sat"
        }, {
            "wid": "color3",
            "metadata.method": "colordto",
            "hue": "blue",
            "sat": "blue-sat"
        }],
        [{
            "wid": "color3",
            "metadata.method": "colordto",
            "hue": "blue",
            "sat": "blue-sat"
        }],
        [],
        [{
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "cyan",
            "sat": "cyan-sat"
        }],
        [{
            "wid": "color1",
            "metadata.method": "colordto",
            "hue": "red",
            "sat": "red-sat"
        }, {
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta",
            "sat": "magenta-sat"
        }],
        [{
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta",
            "sat": "magenta-sat"
        }],
        [{
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "cyan",
            "sat": "cyan-sat"
        }, {
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta",
            "sat": "magenta-sat"
        }],
        [{
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta",
            "sat": "magenta-sat"
        }],
        [],
        [{
            "wid": "color1",
            "metadata.method": "colordto",
            "hue": "red",
            "sat": "red-sat"
        }],
        [{
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta",
            "sat": "magenta-sat"
        }],
        [{
            "wid": "color3",
            "metadata.method": "colordto",
            "hue": "blue",
            "sat": "blue-sat"
        }],
        [{
            "wid": "color6",
            "metadata.method": "colordto",
            "hue": "yellow",
            "sat": "yellow-sat"
        }, {
            "wid": "color7",
            "metadata.method": "colordto",
            "hue": "black",
            "sat": "black-sat"
        }],
        [{
            "wid": "color1",
            "metadata.method": "colordto",
            "hue": "red",
            "sat": "red-sat"
        }, {
            "wid": "color2",
            "metadata.method": "colordto",
            "hue": "green",
            "sat": "green-sat"
        }, {
            "wid": "color3",
            "metadata.method": "colordto",
            "hue": "blue",
            "sat": "blue-sat"
        }, {
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "cyan",
            "sat": "cyan-sat"
        }, {
            "wid": "color6",
            "metadata.method": "colordto",
            "hue": "yellow",
            "sat": "yellow-sat"
        }],
        [],
        [{
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "cyan",
            "sat": "cyan-sat"
        }]
    ];


    proxyprinttodiv("addlist", addlist, 99);
    proxyprinttodiv("querylist", querylist, 99);
    proxyprinttodiv("verifylist", verifylist, 99);

    execute([addlist, querylist], function (err, res) {
        verifyarray[res[1], verifylist]
    });

    params["test_result"] = "PASS";
    callback(null, params);
}

exports.mt3 = mt3 = function mt3(params, callback) {
    var x = [];
    var y;
    var mongorawquery;
    var destination = {
        "midexecute": {
            "dothis": "server",
            "tryorder": 0,
            "executeorder": 0,
            "params": {}
        }
    }


    testclearstorage();

    // debugcolor = 0;
    // debugon = true;
    // debugname = "processquery";
    // debugsubcat = "";
    // debugcat = "";
    // debugfilter = "";
    // debugdestination = 1;
    // //debuglevel=15;

    proxyprinttodiv("staring data add", "data add", 99);
    x[0] = {
        "executethis": "updatewid",
        "metadata.method": "mongoquerytwodto",
        "wid": "mongoquerytwodto",
        "a": "string",
        "b": "string"
    };
    x[1] = {
        "executethis": "updatewid",
        "metadata.method": "mongoquerytwodto",
        "wid": "wid1",
        "a": "c",
        "b": "d"
    };
    x[2] = {
        "executethis": "updatewid",
        "metadata.method": "mongoquerytwodto",
        "wid": "wid2",
        "a": "e",
        "b": "f"
    };
    x[3] = {
        "executethis": "updatewid",
        "wid": "songdto",
        "metadata.method": "songdto",
        "title": "string"
    };
    x[4] = {
        "executethis": "updatewid",
        "wid": "notedto",
        "metadata.method": "notedto",
        "note": "string"
    };
    x[5] = {
        "executethis": "updatewid",
        "wid": "measuredto",
        "metadata.method": "measuredto",
        "length": "string"
    };
    x[6] = {
        "executethis": "updatewid",
        "wid": "rel_song_to_note",
        "primarywid": "songdto",
        "secondarywid": "notedto",
        "relationshiptype": "attributes"
    };
    x[7] = {
        "executethis": "updatewid",
        "wid": "rel_note_to_measure",
        "primarywid": "notedto",
        "secondarywid": "measuredto",
        "relationshiptype": "attributes"
    };
    x[8] = {
        "executethis": "updatewid",
        "wid": "songdtodata",
        "metadata.method": "songdto",
        "title": "stringdata"
    };
    x[9] = {
        "executethis": "updatewid",
        "wid": "notedtodata",
        "metadata.method": "notedto",
        "note": "stringdata"
    };
    x[10] = {
        "executethis": "updatewid",
        "wid": "rel_song_to_note_data",
        "primarywid": "songdtodata",
        "secondarywid": "notedtodata",
        "relationshiptype": "attributes"
    };

    mongorawquery = {
        '$or': [{
            'data.a': 'b'
        }]
    };
    if (destination) {
        mongorawquery["configuration"] = destination
    };
    mongorawquery = String(mongorawquery);
    x[11] = {
        "executethis": "querywid",
        "mongorawquery": mongorawquery
    }

    x[12] = {
        "executethis": "querywid",
        "mongowid": "songdtodata",
        "mongorelationshiptype": "attributes",
        "mongorelationshipmethod": "songdto",
        "mongorelationshipdirection": "forward",
        "mongowidmethod": "notedto"
    }
    if (destination) {
        x[12]["configuration"] = destination;
    }
    // this shoud return all the related wids to sonddtodata where the dto of the results is notedto

    for (var eachx in x) {
        if (destination) {
            x[eachx]['configuration'] = destination
        }; // add destination parameter if needed
        y = executetest(x[eachx]); // enter the data
    }
    proxyprinttodiv("end of data add", "end data add", 99);

    // executeobject["mongorawquery"] = 
    //           "{$and: [" +
    //               "{data.primarywid: songdto}," +
    //               "{data.secondarywid: notedto}" + 
    //           "}]}";

    // executeobject["mongowid"] = "songdto";
    // executeobject["mongorelationshiptype"] = "attributes";
    // executeobject["mongorelationshipmethod"] = "songdto";
    // executeobject["mongorelationshipdirection"] = "forward";
    // executeobject["mongowidmethod"] = "notedto";
    // executeobject["convertmethod"] = "";
    // executeobject["dtotype"] = "";
    // executeobject["executethis"] = 'querywid';

    params = {
        'test': 'PASS'
    };
    var err;
    callback(err, params);
}


