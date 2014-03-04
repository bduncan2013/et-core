(function (window) {
    // require('../utils/addget.js');
    // require('../config.js');

    // external functions are testquery, querywid, relationShipQuery, aggregationQuery, addonQuery(
    // FYI we now call proxyprinttodiv which is in config that calls printtodiv


    exports.testquery = testquery = function testquery(parameters) {
        parameters["IAMALIVE"] = "hello";
        proxyprinttodiv('testquery parameters', parameters, true);
        return parameters;
    };

    //Starting of querywid function...formerly MongoDataQuery
    //exports.querywid = querywid = function (parameters,target,callback) {
    exports.querywid = querywid = function querywid(parameters, callback) { // can change to call back
        var inbound_parameters = {};
        inbound_parameters = JSON.parse(JSON.stringify(arguments));

        delete parameters['executethis']; //** added 11/2

        // var x = window['mongoquery'];
        // if (exports.environment === "local") {
        //         offlinemongoquery(parameters, callback);
        //     } else { 
        //          return offlinemongoquery(err, parameters);
        //     } // TODO :: check if this is fine
        // } else {

        // if (parameters['mongorawquery']) {
        //      return mongoquery(parameters);
        //  } else {
        //      return querywidlocal(parameters);
        //  };

        var output = [];
        var mQueryString = "";

        // Fish out params
        proxyprinttodiv('querywid parameters I', parameters, 28);
        var p = fishOut(parameters);
        console.log('object that came back from fishOut => ' + JSON.stringify(p));
        proxyprinttodiv('querywid parameters', parameters, 28);
        proxyprinttodiv('querywid p ', p, 28);
        var queParams = p[0];
        var relParams = p[1];
        var aggParams = p[2];
        var addParams = p[3];
        var xtrParams = p[4];
        var relafterParams = p[5];
        var commandParams = p[6];
        var ListOfLists = [];
        var queryresults = {};
        var wid;
        var environmentdb;
        var convertmethod = commandParams['command.convertmethod'];
        var extraparameters = {};
        //proxyprinttodiv('querywid convertmethod', convertmethod, 99);
        //proxyprinttodiv('querywid commandParams', commandParams, 99);
        if (commandParams["db"]) {
            environmentdb = commandParams["db"];
        } else {
            environmentdb = "data";
        }


        function debugvars(varlist) {
            var allvars = {
                1: {
                    "queParams": queParams,
                    "relParams": relParams,
                    "aggParams": aggParams,
                    "addParams": addParams,
                    "xtrParams": xtrParams,
                    "relafterParams": relafterParams,
                    "ListOfLists": ListOfLists,
                    "queryresults": queryresults,
                    "wid": wid
                },
                2: {
                    "queParams": queParams,
                    "relParams": relParams,
                    "aggParams": aggParams
                },
                3: {
                    "parameters": parameters
                },
                4: {
                    "res": output
                },
                5: {
                    "mQueryString": mQueryString
                },
                6: {
                    "output": output
                }
            };
            var resultObj = {};
            var vargroup;
            if (!varlist) {
                for (var eachvar in allvars) {
                    varlist.push(eachvar);
                }
            }

            for (var eachgroup in varlist) {
                vargroup = varlist[eachgroup];
                resultObj = jsonConcat(resultObj, allvars[vargroup]);
            }

            return resultObj;
        }



        //else  
        //  return output;

        // nothing below should run

        //    // Use single to set up a query with the params of 1 wid
        //    if (queParams['singlemongoquery'] != undefined && xtrParams.length == undefined) {
        //        output = "";
        //        wid = queParams['singlemongoquery'];
        //        targetfunction = getfrommongo;
        //        var widObject = executethis(wid, getfrommongo);
        //        // var widObject = getFromMongo({'wid':wid});
        //        delete widObject['wid'];
        //        delete widObject['metadata.method'];
        //        output = BuildSingleQuery(widObject);
        //        mQueryString = output.substring(0, output.length -1);
        //        targetfunction = mongoquery;
        //        output = executethis(mQueryString, mongoquery);
        //        //output = mongoquery(mQueryString);
        //        //output = mQueryString;
        //    }
        //
        //    // Use multiple if you want to use a list of wids as $OR groups
        //    // of a query to mongo
        //    if (queParams['multiplemongoquery']) {
        //        output = "";
        //        var paramList = {};
        //        wid = queParams['multiplemongoquery'];
        //        var listOfWids = getFromMongo({'wid':wid});
        //        delete listOfWids["wid"];
        //        delete listOfWids["metadata.method"];
        //        proxyprinttodiv('Function MongoDataQuery listOfWids : ', listOfWids);
        //
        //        var i = 0;
        //        ListOfLists = [];
        //        for (w in listOfWids) {
        //        targetfunction = getfrommongo;
        //            var tempwid = executethis(w, getfrommongo);
        //            delete tempwid["wid"];
        //            delete tempwid["metadata.method"];
        //            for (t in tempwid) {
        //                paramList[t] = tempwid[t];
        //            }
        //            ListOfLists.push(paramList);
        //            paramList = {};
        //        }
        //        if (xtrParams) {
        //            ListOfLists.push(xtrParams);
        //        }
        //        mQueryString = BuildMultipleQuery(ListOfLists);
        //        targetfunction = mongoquery;
        //        output = executethis(mQueryString, mongoquery);
        //        //output = mongoquery(mQueryString);
        //        //output = mQueryString;
        //    }
        //
        //    // If there is no single or multiple, make a $OR group out of the extra params
        //    if (!queParams['singlemongoquery'] && !queParams['multiplemongoquery'] && getObjectSize(relParams) == 0 ){
        //        ListOfLists.push(xtrParams);
        //        mQueryString = BuildMultipleQuery(ListOfLists);
        //        targetfunction = mongoquery;
        //        output = executethis(mQueryString, mongoquery);
        //        //output = mongoquery(mQueryString);
        //    }
        //
        // if no rawmongoquery and no monogowid and no single and no multiple then stop
        // we have a initial query part of qiuerywid
        // then relationships
        // then after relationships

        if (!((queParams['mongosinglequery'] !== undefined && queParams['mongosinglequery'] !== "") ||
            (queParams['mongowid'] !== undefined && queParams['mongowid'] !== "") ||
            (queParams['mongorawquery'] !== undefined && queParams['mongorawquery'] !== "") ||
            (queParams['mongomultiplequery'] !== undefined && queParams['mongomultiplequery'] !== ""))) {
            callback(undefined, []);
        } else {
            async.series([


                    function step01(cb) {
                        debugfn("querywid start", "querywid", "query", "begin", debugcolor, debugindent, debugvars([3]));
                        // Use single to set up a query with the params of 1 wid
                        if (Object.keys(queParams).length > 0 && queParams['mongosinglequery'] != undefined && Object.keys(xtrParams).length === 0) {
                            console.log('singlemongoquery => ' + queParams['mongosinglequery']);
                            var wid = queParams['mongosinglequery'];
                            execute({
                                'executethis': 'getwid',
                                'wid': wid
                            }, function (err, res) {
                                var widObject = res;
                                delete widObject['wid'];
                                delete widObject['metadata.method'];
                                mQueryString = BuildSingleQuery(widObject, "or", environmentdb);
                                proxyprinttodiv('Function MongoDataQuery singlemongoquery : ', mQueryString, 28);
                                //mQueryString = output.substring(0, output.length - 1);
                                // if (validParams(mQueryString)) {
                                mongoquery(mQueryString, function (err, res) {
                                    output = res;
                                    //output = formatlist(res, "wid", "wid");  &&& takenout by roger
                                    cb(null, "step01");
                                });
                                // } else {
                                //     if(!output)
                                //         output = {};
                                //     cb(null, "step01");
                                // }
                            })
                        } else if (queParams && queParams['mongomultiplequery']) {
                            output = "";
                            var paramList = {};
                            wid = queParams['mongomultiplequery'];

                            execute({
                                'executethis': 'getwid',
                                'wid': wid
                            }, function (err, res) {
                                var listOfWids = res;
                                delete listOfWids["wid"];
                                delete listOfWids["metadata.method"];
                                proxyprinttodiv('Function MongoDataQuery listOfWids : ', listOfWids, 31);

                                var i = 0;
                                ListOfLists = [];
                                var todolist = [];
                                for (var w in listOfWids) {
                                    todolist.push(w);
                                }

                                async.mapSeries(todolist, function (w, cbMap) {
                                    async.nextTick(function () {
                                        getwid({
                                            'wid': w
                                        }, function (err, res) {
                                            var tempwid = res;
                                            delete tempwid["wid"];
                                            delete tempwid["metadata.method"];
                                            // for (var t in tempwid) {
                                            //     paramList[t] = tempwid[t];
                                            // }
                                            ListOfLists.push(tempwid);
                                            paramList = {};

                                            cbMap(null, "map");
                                        });
                                    });
                                    // }, function (err, res) {
                                    //     var listOfWids = res;
                                    //     delete listOfWids["wid"];
                                    //     delete listOfWids["metadata.method"];
                                    //     proxyprinttodiv('Function MongoDataQuery listOfWids : ', listOfWids, 31);

                                    //     var i = 0;
                                    //     ListOfLists = [];
                                    //     var todolist = [];
                                    //     for (var w in listOfWids) {
                                    //         todolist.push(w);
                                    //     }

                                    //     async.mapSeries(todolist, function (w, cbMap) {
                                    //         getwid({
                                    //             'wid': w
                                    //         }, function (err, res) {
                                    //             var tempwid = res;
                                    //             delete tempwid["wid"];
                                    //             delete tempwid["metadata.method"];
                                    //             // for (var t in tempwid) {
                                    //             //     paramList[t] = tempwid[t];
                                    //             // }
                                    //             ListOfLists.push(tempwid);
                                    //             paramList = {};

                                    //             cbMap(null, "map");
                                    //         });
                                }, function (err, res) {

                                    if (xtrParams) {
                                        ListOfLists.push(xtrParams);
                                    }
                                    mQueryString = BuildMultipleQuery(ListOfLists, "and", "or", environmentdb);
                                    proxyprinttodiv('querywid mQueryString init', mQueryString, 28);

                                    // if (validParams(mQueryString)) {
                                    mongoquery(mQueryString, function (err, res) {
                                        output = res;
                                        //output = formatlist(res, "wid", "wid");  &&& takenout by roger
                                        cb(null, 'step01');
                                    });
                                    // } else {
                                    //     if(!output)
                                    //         output = {};
                                    //     cb(null, "step01");
                                    // }

                                });
                            });
                        } else if (queParams && queParams['mongorawquery'] !== undefined) {
                            console.log('mongorawquery => ' + JSON.stringify(queParams['mongorawquery']));
                            mQueryString = queParams['mongorawquery'];
                            console.log('mQueryString at step01 => ' + JSON.stringify(mQueryString));
                            debugfn("querywid before mQueryString1", "querywid", "query", "mid", debugcolor, debugindent, debugvars([5]));
                            proxyprinttodiv('querywid mQueryString second', mQueryString, 28);

                            // if (validParams(mQueryString)) {
                            mongoquery(mQueryString, function (err, res) {
                                output = res;
                                //output = formatlist(res, "wid", "wid");  &&& takenout by roger
                                console.log(' *** get primary wids *** ' + JSON.stringify(output));
                                debugfn("move queParams to output", "querywid", "query", "mid", debugcolor, debugindent, debugvars([4]));
                                cb(null, "step01");
                            });

                            // } else {
                            //     if(!output)
                            //     output = {};
                            //     cb(null, "step01");
                            // }
                        } else {
                            if (!output)
                                output = {};
                            cb(null, "step01");
                        }
                    },

                    function step02(cb) {
                        // Primary Wid Section **********
                        if (Object.keys(queParams).length > 0 && queParams && queParams['mongowid'] !== undefined) {
                            console.log('mongowid = > ' + JSON.stringify(queParams['mongowid']));
                            //proxyprinttodiv('querywid output before format list mongowid', queParams, 28);
                            output = formatlist(output, "wid", "wid", environmentdb);
                            proxyprinttodiv('querywid output before mongowid', output, 28);
                            if (output === JSON.stringify([{}])) {
                                output = [];
                            }

                            output.push({
                                'wid': queParams['mongowid']
                            });

                            proxyprinttodiv('querywid output after mongowid', output, 28);

                            cb(null, "step02");
                        } else {
                            if (!output)
                                output = {};
                            cb(null, "step02");
                        }
                    },

                    function step03(cb) {
                        // Relationship Section **********
                        // Skip if there are no relParams

                        if (Object.keys(relParams).length > 0 && Object.keys(output).length > 0) {
                            if (queParams['mongowid'] === undefined) { // convert it because it had not been converted yet
                                output = formatlist(output, "wid", "wid", environmentdb);
                            }
                            debugfn("querywid step03", "querywid", "query", "mid", debugcolor, debugindent, debugvars([5]));

                            proxyprinttodiv('querywid output before rel', output, 28);

                            mQueryString = relationShipQuery(relParams, output, "data");
                            // console.log('mQueryString at step03 => ' + mQueryString);

                            if (Object.keys(JSON.parse(mQueryString)).length > 0) {
                                mongoquery(mQueryString, function (err, res) {
                                    // console.log(" result from step03 " + JSON.stringify(res));
                                    output = res;
                                    debugfn("relationship", "rawmongoquery", "query", "middle", debugcolor, debugindent, debugvars([4]));
                                    cb(null, "step03");
                                });

                            } else {
                                cb(null, "step03");
                            }
                        } else {
                            if (!output)
                                output = {};
                            cb(null, "step03");
                        }

                    },

                    function step04(cb) {
                        // Relationship Section **********
                        // Skip if there are no relParams

                        if ((relParams) && (Object.keys(relParams).length !== 0)) { // added 1/22
                            if (relParams["mongorelationshipdirection"] === 'forward') {
                                // get a copy of relationship records
                                extraparameters = copylist(output, null, "secondarywid", environmentdb);
                                output = formatlist(output, "secondarywid", "wid", environmentdb);
                            }
                            if (relParams["mongorelationshipdirection"] === 'backward') {
                                // get a copy of relationship records
                                extraparameters = copylist(output, null, "primarywid", environmentdb);
                                output = formatlist(output, "primarywid", "wid", environmentdb);
                            }
                        }
                        proxyprinttodiv('querywid before after rel output', output, 28);
                        proxyprinttodiv('relafterParams before after rel output', relafterParams, 28);

                        // console.log('[[[[[[[[[[[[[[[[[[[[[[\n' + JSON.stringify(relafterParams, '-', 4));
                        var flg = false;
                        for (var r in relafterParams) {
                            if (relafterParams[r].length > 0) flg = true;
                        }

                        if (flg && (output) && (output.length > 0)) {
                            // console.log('>>> ' + JSON.stringify(output))

                            mQueryString = queryafterrelationship(relafterParams, output);
                            proxyprinttodiv('querywid after queryafterrelationship mQueryString', mQueryString, 28);
                            // console.log('mQueryString at step04 => ' + mQueryString);
                            //mongoquery(JSON.parse(mQueryString), function (res) {
                            debugfn("step04", "querywid", "query", "mid", debugcolor, debugindent, debugvars([5]));

                            if (Object.keys(JSON.parse(mQueryString)).length > 0) {
                                mongoquery(mQueryString, function (err, res) {
                                    output = res;
                                    debugfn("post relationship query", "rawmongoquery", "query", "end", debugcolor, debugindent, debugvars([4]));
                                    cb(null, "step04");
                                });
                            } else {
                                cb(null, "step04");
                            }
                        } else {
                            //output = {};
                            cb(null, "step04");
                        }

                    }

                ],

                function (err, res) {
                    console.log('completed tasks asynchronously in querywid ');
                    console.log('output is ' + JSON.stringify(output));
                    debugfn("final", "querywid", "query", "end", debugcolor, debugindent, debugvars([6]));

                    proxyprinttodiv('querywid before output', output, 28);

                    formatListFinal(output, environmentdb, convertmethod, extraparameters, aggParams, function (err, output) {
                        proxyprinttodiv('querywid after output', output, 28);

                        // ToDot -- should remove "data"
                        // -- V1 --

                        debugfn("querywid code generator", "querywid", "get", "code", 2, 1, {
                            0: inbound_parameters,
                            1: output
                        }, 6);

                        callback(err, output);
                    });
                });
        }
    };

    //
    //    // Aggregation Section **********
    //    // Skip if there are no aggParams
    //    if (getObjectSize(aggParams) != 0) {
    //        if (mQueryString != "") {
    //            aggParams['mongoaggquery '] = mQueryString;
    //        }
    //        output = aggregationQuery(aggParams);
    //    }
    //
    //    // Hard coding addons Section **********
    //    // Skip if there are no aggParams
    //    if (getObjectSize(addParams) != 0) {
    //        if (mQueryString != ""){
    //            // Since addonQuery will execute a query, it needs the mQueryString to work with
    //            addParams['query '] = mQueryString;
    //            var data_From_Mongo = addonQuery(addParams);
    //            output = data_From_Mongo;
    //        }
    //    }
    //    proxyprinttodiv('
    // Function MongoDataQuery output: ', output);
    //    targetfunction = mongoquery;
    //    queryresults = executethis(output, mongoquery);
    //    //queryresults=mongoquery(output,target,callback);
    //    return queryresults; // whatever happens, return the output

    // End of MongoDataQuery

    // Use the mQueryString to call on mongo with it


    // function queryafterrelationship(parameters, output) {
    //     mQueryString = '{"$and": [';

    //     if (isParameterLower(parameters, "mongowidmethod")) {
    //         var dtotype = parameters["mongowidmethod"];
    //         remove(parameters, "mongowidmethod");

    //         // This section addes the dtoType to the string
    //         if (dtotype) {
    //             var q3 = "{metadata.method:" + dtotype + "},";
    //             if (q3) {
    //                 mQueryString += q3;
    //             }
    //         }
    //     }

    //     return mQueryString;
    // }
    // function queryafterrelationship(parameters, output) {
    //     console.log('output is--'+output);
    //     console.log('1--'+BuildMultipleQuery(output));
    //     console.log('2--'+BuildMultipleQuery(BuildSingleQuery(output)));
    //     var query = BuildMultipleQuery(BuildSingleQuery(output));
    //     return query;
    // }

    // will go through list, look for a specific parameter, create a new list based on that parameter



    // formatlist (inlist, parmnamein, parmnameout, environment) 
    //     inlist must be a list in standard mongo output: [{}, {}, {}]
    //     this funcitin converts this list to [x:{}, x:{}, x:{}] or [{x:{}}, {x:{}}, {x:{}}]
    //     it looks for parmnamein/out in {} ... based on what it finds produces a result
    //     execpetions...if parmaneout="wid" then x will be "wid"
    //     if parmnamein = "" then entire envrionendb (entire record will be sent)

    function copylist(inlist, parmnamein, parmnameout, environmentdb) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var widvalue;
        var item;
        var obj = {};
        var wid = {};

        if (inlist === undefined || inlist.length === 0) {
            return [];
        } else {
            proxyprinttodiv('querywid copylist inlist ', inlist, 28);


            proxyprinttodiv('querywid copylist parmnameout ', parmnameout, 28);
            proxyprinttodiv('querywid copylist parmnamein ', parmnamein, 28);
            for (var i in inlist) { // changed by roger &&&
                item = inlist[i];

                item = ConvertFromDOTdri(item);
                proxyprinttodiv('querywid copylist item ', item, 28);

                widvalue = item[environmentdb][parmnameout];

                proxyprinttodiv('querywid copylist widvalue ', widvalue, 28);

                if (parmnamein) {
                    obj[widvalue] = item[environmentdb][parmnamein];
                } else {
                    obj[widvalue] = item[environmentdb];
                }

                proxyprinttodiv('querywid copylist obj ', obj, 28);


                //[x:{}, x:{}, x:{}] 

            }
            proxyprinttodiv('querywid copylist obj ', obj, 28);

            debugfn("copylist code generator", "copylist", "get", "code", 2, 1, {
                0: inbound_parameters,
                1: obj
            }, 6);

            return obj;
        }
    }

    function formatlist(inlist, parmnamein, parmnameout, environmentdb) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var output = [];
        var widvalue;
        var item;
        var obj = {};
        var wid = {};

        if (inlist === undefined || inlist.length === 0) {
            return [];
        } else {
            proxyprinttodiv('querywid formatlist inlist ', inlist, 28);


            for (var i in inlist) { // changed by roger &&&
                item = inlist[i];

                item = ConvertFromDOTdri(item);


                proxyprinttodiv('querywid formatlist item ', item, 28);

                if (parmnameout !== "wid") {
                    widvalue = item[environmentdb][parmnameout];
                } else {
                    widvalue = "wid"
                }

                proxyprinttodiv('querywid formatlist widvalue ', widvalue, 28);
                obj = {};
                if (parmnamein === "wid") {
                    obj[widvalue] = item[parmnamein];
                } else {
                    if (parmnamein) {
                        obj[widvalue] = item[environmentdb][parmnamein];
                    } else {
                        obj[widvalue] = item[environmentdb];
                    }
                }

                proxyprinttodiv('querywid formatlist obj[widvalue] ', obj[widvalue], 28);

                if (parmnameout === "wid") {
                    output.push(obj); // [{x:{}}, {x:{}}, {x:{}}]
                } else {
                    output[widvalue] = obj[widvalue];
                    //[x:{}, x:{}, x:{}] 
                }

            }
            proxyprinttodiv('querywid formatlist output ', output, 28);

            debugfn("formatlist code generator", "formatlist", "get", "code", 2, 1, {
                0: inbound_parameters,
                1: output
            }, 6);

            return output
        }
    }

    // takes inlist, looks for wid, then goes to main database to get a get clean complete converted copy of that wid
    // also looks in extra paramters, append information found about that wid to results also

    function formatListFinal(inlist, environmentdb, convertmethod, extraparameters, aggParams, callback) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var output = [];
        var keycollection = "DRIKEY";
        var keydatabase = {};
        var database = {};
        var record;
        var widrecord;
        var extrarecord = {};
        var todolist = [];
        var excludeset = {};
        if (aggParams["mongosetfieldsexclude"] && Object.keys(aggParams["mongosetfieldsexclude"]).length === 0) {
            excludeset=aggParams["mongosetfieldsexclude"]
            }

        if (inlist === undefined || inlist.length === 0) {
            callback({}, []);
        } else {

            //keydatabase = getFromLocalStorage(keycollection);

            proxyprinttodiv('querywid finalformatlist inlist ', inlist, 28);
            proxyprinttodiv('querywid finalformatlist extraparameters ', extraparameters, 28);
            for (var eachresult in inlist) {
                todolist.push(inlist[eachresult]["wid"])
            }

            async.mapSeries(todolist, function (wid, cbMap) {
                async.nextTick(function () {
                    record = {};
                    proxyprinttodiv('querywid finalformatlist wid ', wid, 28);
                    execute({
                        'executethis': 'getwid',
                        'wid': wid
                    }, function (err, widrecord) {
                        //widrecord = keydatabase[wid];


                        // ***** fix widrecord here
                        proxyprinttodiv('querywid finalformatlist widrecord ', widrecord, 28);
                        var widrecordFixed = {};
                        widrecordFixed['data'] = widrecord[0];
                        widrecordFixed['metadata'] = widrecord[0]['metadata'];
                        widrecordFixed['wid'] = widrecord[0]['wid'];
                        extrarecord[environmentdb] = extraparameters[wid];
                        delete widrecord[0]['wid'];
                        delete widrecord[0]['metadata'];
                        widrecord = widrecordFixed;


                        proxyprinttodiv('querywid finalformatlist widrecord', convertfromdriformat(widrecord), 28);
                        proxyprinttodiv('querywid finalformatlist extraparameters[wid]', extrarecord, 28);
                        widrecord = extend(true, widrecord, extrarecord);
                        proxyprinttodiv('querywid finalformatlist widrecord after ', widrecord, 28);

                        if (convertmethod === "toobject") {
                            record[wid] = widrecord;
                        } else {
                            record[wid] = convertfromdriformat(widrecord);
                        }

                        if (!excludeset[wid]) {
                            output.push(record);    
                            }

                        cbMap(null)
                    })
                }); // next tick
            }, function (err, res) {
                proxyprinttodiv('querywid finalformatlist output', output, 28);
                callback({}, output)
            }); // mapseries
        } // if
    }

    //in: key, value, preamble 
    //out STRING: {preamble.key: value}

    function BuildSimpleQuery(key, value, preamble) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var result;
        //buildsimplequery, text in and out
        preamble = preamble + ".";

        result = "{\"" + key + "\":\"" + value + "\"}";

        debugfn("formatListFinal code generator", "formatListFinal", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: result
        }, 6);

        return result;
    }




    // in parameters, preamble, outerquerytype
    // will create a string query based on outerquerytype

    function BuildSingleQuery(parameters, outerquerytype, preamble) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        if (!(parameters instanceof Array)) {
            var arr = [];
            arr.push(parameters);
            parameters = arr;
        }
        proxyprinttodiv('querywid BuildSingleQuery parameters', parameters, 28);
        var parmarray = [];
        // buildsinglequery, (parameters, outerquerytype, preamble) 
        // parameters can be list [{}]
        // or object {}
        // inside needs to be simple parameters a: b, c: d
        var returnString;
        if (!outerquerytype) {
            outerquerytype = "or";
        } // default if not sent in
        // parameters can be [{a:b, c:d, e:f}] or {a:b, c:d, e:f}
        // if [] then remove []

        // jan 22        
        // if (parameters instanceof Array) {
        //     parameters = parameters[0]
        // } 

        if (!parameters) {
            return
        }

        var parametersCount = parameters.length;
        // if (parameters instanceof Array) {
        //     parametersCount = parameters.length
        // } else {
        //     parametersCount = Object.keys(parameters).length
        // }

        if (parametersCount > 1) {
            //returnString = ' {"$or": [';
            returnString = ' {"$' + outerquerytype + '": [';
        } else {
            returnString = "";
        }

        // returnString = ' {"$' + outerquerytype + '": [';

        // readded
        if (parameters instanceof Array) {
            for (var i = 0; i < parameters.length; i++) {
                for (var key in parameters[i]) {
                    returnString += BuildSimpleQuery(key, parameters[i][key], preamble);
                    if (returnString.lastIndexOf(',') !== (returnString.length - 1)) {
                        returnString += ",";
                    }
                }
            }
        } else {
            for (var p in parameters) {
                returnString += BuildSimpleQuery(p, parameters[p], preamble);
                if (returnString.lastIndexOf(',') !== (returnString.length - 1)) {
                    returnString += ",";
                }
            }
        }

        returnString = returnString.substring(0, returnString.length - 1);
        // Close the string based on the number of listofparameters
        if (parametersCount > 1) {
            returnString += "]}"; // added ]
        } else {
            returnString += "";
        }
        proxyprinttodiv('querywid buildsinglequery end', returnString, 28);

        debugfn("BuildSingleQuery code generator", "BuildSingleQuery", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: returnString
        }, 6);

        return returnString;
    }

    // in list of parameters, outerquerytype, innerquerytype, preamble
    // will create a string query based on outerquerytype

    function BuildMultipleQuery(listofparameters, outerquerytype, innerquerytype, preamble) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        //buildmultiplequery (listofparameters, outerquerytype, innerquerytype, preamble)
        //list of parameters must be list: [{}, [], [], {}]
        proxyprinttodiv('querywid buildmultiplequery listofparameters', listofparameters, 28);
        var returnString = "";
        var parameters;
        if (!outerquerytype) {
            outerquerytype = "and";
        } // default if not sent in
        if (!innerquerytype) {
            innerquerytype = "or";
        } // default if not sent in

        var listofparametersCount = listofparameters.length;
        if (listofparametersCount == 0) return;
        // If it turns out you only have 1 set of params, dont start out the string with $and
        if (listofparametersCount == 1) {
            //returnString += "{";
            returnString += "";
        } else {
            // returnString += '{"$and":[';
            returnString += '{"$' + outerquerytype + '":[';
        }
        // Iterate through the params from each wid to get the $or groups built
        //for (var i = 0; i < listofparametersCount; i++) {
        //    if (listofparameters[i].length != 0) {
        for (var i in listofparameters) {
            // jan 22
            parameters = listofparameters[i];
            //            if (parameters instanceof Array) {
            //                parameters = parameters[0]
            //            };

            returnString += BuildSingleQuery(parameters, innerquerytype, preamble);
            if (returnString.lastIndexOf(',') !== (returnString.length - 1)) {
                returnString += ",";
            }
        }
        //}

        // Chop off the last comma
        // strip off the last comma and add the closing of OR
        returnString = returnString.substring(0, returnString.length - 1);
        // Close the string based on the number of listofparameters
        // var parametersCount = Object.keys(parameters).length;  
        if (Object.keys(listofparameters).length === 1) {
            returnString += "";
        } else {
            returnString += "]}";
        }
        proxyprinttodiv('querywid buildmultiplequery end', returnString, 28);

        debugfn("BuildMultipleQuery code generator", "BuildMultipleQuery", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: returnString
        }, 6);

        return returnString;
    }

    // Similar to BuildSingleQuery, but different...let it be please.
    // function RelationshipBuildSingleQuery(parameters) {
    //     var result;

    //     // seed result with the beginning of a mongo or query
    //     var parametersCount = countKeys(parameters);
    //     if (parametersCount > 1) {
    //         result = '{"$or":[';
    //     } else {
    //         result = "";
    //     }
    //     // build a {key,"value"} for each parameter
    //     //foreach (var p in parameters)
    //     for (var key in parameters) {
    //         var miniobject = parameters[key];
    //         for (var item in miniobject) {
    //             result += '{"' + item + '":"' + miniobject[item] + '"}';
    //         }



    //         //result +=  parameters[key];
    //         //result +=  '{"' + parameters[key].key + '":' + parameters[key].value + "}";
    //         result += ",";
    //     }

    //     // strip off the last comma and add the closing of OR
    //     result = result.substring(0, result.length - 1);
    //     if (parametersCount > 1) {
    //         result += "]},";
    //     } else {
    //         result += ",";
    //     }
    //     return result;
    // }

    function queryafterrelationship(parameters, set2) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var set1 = [];
        var set3 = [];
        var mongowidmethod = parameters['mongowidmethod'];
        set1.push({
            "metadata.method": mongowidmethod
        });
        // set2 = formatlist(set2, "wid", "wid");
        set3.push(set1);
        set3.push(set2);
        proxyprinttodiv('querywid queryafterrelationship set3', set3, 28);

        var result = BuildMultipleQuery(set3, 'and', 'or', null);

        debugfn("queryafterrelationship code generator", "queryafterrelationship", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: result
        }, 6);

        return result;
    }
    // Starting of relationShipQuery function

    function relationShipQuery(inputParameters, input, environmentdb) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        proxyprinttodiv('Function relationShipQuery() Constant input : ', parameters);
        var output = {};
        // TODO: added this quick to clone, needs to use extend
        var parameters = JSON.parse(JSON.stringify(inputParameters));
        if (!environmentdb) {
            environmentdb = "data";
        }
        environmentdb = environmentdb + '.';

        // Simply checking to make sure all the data is here
        if (!(parameters.hasOwnProperty("mongorelationshipdirection") && parameters.hasOwnProperty("mongorelationshiptype"))) {
            //var txt = "";
            //txt += "Error Description: " + "Invalid Parameters in relationShipQuery" + "\n\n";
            //txt += "Click OK to continue. \n\n";
            return "";
        }
        // Pull out the correct vars
        if (isParameterLower(parameters, "mongorelationshipdirection")) {
            var direction = parameters["mongorelationshipdirection"];
            remove(parameters, "mongorelationshipdirection");
        }
        if (isParameterLower(parameters, "mongorelationshiptype")) {
            var type = parameters["mongorelationshiptype"];
            remove(parameters, "mongorelationshiptype");
        }
        // LM: TODO, take this out...belongs (and is, i think in add-ons)
        if (isParameterLower(parameters, "mongorelationshipmethod")) {
            var method = parameters["mongorelationshipmethod"];
            remove(parameters, "mongorelationshipmethod");
        }
        if (isParameterLower(parameters, "mongorelationshiplink")) {
            var link = parameters["mongorelationshiplink"];
            remove(parameters, "mongorelationshiplink");
        }

        if (isParameterLower(parameters, "mongowidmethod")) {
            var dtotype = parameters["mongowidmethod"];
            remove(parameters, "mongowidmethod");
        }
        if (isParameterLower(parameters, "query")) {
            var query = parameters["query"];
            remove(parameters, "query");
        }

        var queryset = [];
        //for(var i = 0;i < input.length; i++){
        for (var i in input) { // &&& change by roger
            if (input.hasOwnProperty(i)) {
                var q1 = {};
                var val = input[i]['wid'];
                if (direction === 'forward') {
                    q1[environmentdb + "primarywid"] = val;
                } else {
                    q1[environmentdb + "secondarywid"] = val;
                    // q1= {environmentdb+"secondarywid": input[i]['wid']}
                }
                queryset.push(q1);
            }
        }

        if (dtotype) {
            queryset.push({
                "metadata.method": dtotype
            });
        }
        if (type) {
            var q2 = {};
            q2[environmentdb + "relationshiptype"] = type;
            queryset.push(q2);
        }
        if (link) {
            var q2 = {};
            q2[environmentdb + "linktype"] = type;
            queryset.push(q2);
        }
        querystring = BuildMultipleQuery(queryset, "and", "or", null);

        debugfn("relationShipQuery code generator", "relationShipQuery", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: querystring
        }, 6);

        return querystring;
    }

    //     var parametersCount = countKeys(input);
    //     // Maybe there was no match...
    //     if (parametersCount == 0) {
    //         return 'No records to find relationships of.'
    //     }
    //     // There are always multiple sections to a relationship query
    //     // So the string must start with $and 
    //     mQueryString = '';
    //     console.log('>>>' + input);
    //     if (input) {
    //         mQueryString = '{"$and":[';
    //     }

    //     var returnvalues = input;
    //     var queryParameters = [];

    //     for (var i = 0; i < returnvalues.length; i++) {
    //         var obj = {};

    //         if (returnvalues[i]['wid']) {
    //             if (direction === 'forward') {
    //                 obj = {
    //                     'primarywid': returnvalues[i]['wid']
    //                     // 'data.primarywid': returnvalues[i]['wid']
    //                 };
    //             } else {
    //                 obj = {
    //                     'secondarywid': returnvalues[i]['wid']
    //                 };
    //             }
    //             queryParameters.push(obj);

    //         }
    //     }


    //     // Section 1 is using the widnames as the first $or group
    //     var q1 = BuildSingleQuery(queryParameters, "or", "data") { 
    //     //var q1 = RelationshipBuildSingleQuery(queryParameters);
    //     if (q1) {
    //         q1 = q1.substring(0, q1.length - 1);
    //         mQueryString += q1 + ",";
    //     }



    //     /*
    //         var q2 = querywid(parameters);
    //         if(q2){
    //             mQueryString+= "[" + q2 + "],";
    //         }
    //     */


    //     // This section addes the dtoType to the string
    //     if (dtotype) {
    //         var q3 = '{"data.metadata.method":"' + dtotype + '"},';
    //         if (q3) {
    //             mQueryString += q3;
    //         }
    //     }

    //     // This section is typically 'attribute', but could really be anything.
    //     if (type) {
    //         // var q4 = '{"data.relationshiptype":"' + type + '"},';
    //         var q4 = '{"relationshiptype":"' + type + '"},';
    //         if (q4) {
    //             mQueryString += q4;
    //         }
    //     }

    //     mQueryString = mQueryString.substring(0, mQueryString.length - 1) + "]}";
    //     // The string is now built and ready to return.
    //     proxyprinttodiv('Relationship mQueryString : ', mQueryString);
    //     console.log(">>> mQueryString" + mQueryString);
    //     return mQueryString;
    // } //End of relationShipQuery function




    function aggregationQuery(parameters) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var mongoAggregation = ""; // String
        var query;

        // Fish out the parameters
        if (isParameterLower(parameters, "mongoaggregation")) {
            mongoAggregation = parameters["mongoaggregation"];
            remove(parameters, "mongoaggregation");
        }
        if (isParameterLower(parameters, "mongoaggquery")) {
            mongoaggquery = parameters["mongoaggquery"];
            remove(parameters, "mongoaggquery");
        }
        proxyprinttodiv('THE QUERY AGGREGATION WOULD RUN IS : ', mongoaggquery);

        // Here is where you would execute the mongoaggquery
        // Instead, the dummy call to mongo will return a few wids to work with
        parameters = mongo('set1');

        // Pull out widnames anb build aggregate string
        var originalQuery = "{\"$match\":{\"wid\":{\"$in\":[";
        // Build the array to match records in.
        for (var p in parameters) {
            originalQuery += " 'wid':'" + p + "',";
        }
        // Strip off the last comma and close the string
        originalQuery = originalQuery.substring(0, originalQuery.length - 1);
        originalQuery += "]}}";

        // An array is the variable that gets set to the aggregation call.
        var pipelineQuery = [originalQuery, mongoAggregation];
        proxyprinttodiv('pipelineQuery : ', pipelineQuery);

        debugfn("aggregationQuery code generator", "aggregationQuery", "get", "code", 2, 1, {
            0: inbound_parameters,
            1: pipelineQuery
        }, 6);

        return pipelineQuery;
    }

    // Addon Section **********
    // The main use of this seciton is to find the first or last of a result set.
    // There are many other functions possible, but this is probably the most used.
    // NOTE: The mongorelationshipmethod is actually an addParam, not a relationship param.
    // It gets called a relationship param, but is in actuality and addParam. Really this
    // is a result of implenting DRI type functions in stages to apply to mongo.

    function addonQuery(parameters) {
        var inbound_parameters = JSON.parse(JSON.stringify(arguments));

        var returnValues = {};

        // #region Query Addon defaults
        var mongoSetLimit = ""; // String
        var mongoSetSkip = ""; // String
        var mongoSetSortBy = ""; // String
        var mongoSetSortOrder = ""; // String
        var mongoSetMax = ""; // String
        var mongoSetHint = ""; // String
        var mongoReturnCount = ""; // String
        var mongoExplain = ""; // String
        var mongoSize = ""; // String
        var mongoRelationshipMethod = "all";

        if (isParameterLower(parameters, "mongosetlimit")) {
            mongoSetLimit = parameters["mongosetlimit"];
        }
        if (isParameterLower(parameters, "mongosetskip")) {
            mongoSetSkip = parameters["mongosetskip"];
        }
        if (isParameterLower(parameters, "mongosetsortby")) {
            mongoSetSortBy = parameters["mongosetsortby"];
        }
        if (isParameterLower(parameters, "mongosetsortorder")) {
            mongoSetSortOrder = parameters["mongosetsortorder"];
        }
        if (isParameterLower(parameters, "mongosetmax")) {
            mongoSetMax = parameters["mongosetmax"];
        }
        if (isParameterLower(parameters, "mongosethint")) {
            mongoSetHint = parameters["mongosethint"];
        }
        if (isParameterLower(parameters, "mongoreturncount")) {
            mongoReturnCount = parameters["mongoreturncount"];
        }
        if (isParameterLower(parameters, "mongoexplain")) {
            mongoExplain = parameters["mongoexplain"];
        }
        if (isParameterLower(parameters, "mongosize")) {
            mongoSize = parameters["mongosize"];
        }
        if (isParameterLower(parameters, "mongorelationshipmethod")) {
            mongoRelationshipMethod = parameters["mongorelationshipmethod"];
        }

        // Set up default values to set with query....change if data for them is present.
        var defaultLimit = (mongoSetLimit == "") ? 282828289 : parseInt(mongoSetLimit);
        var defaultSkip = (mongoSetSkip == "") ? 0 : parseInt(mongoSetSkip);
        var defaultSortBy = (mongoSetSortBy == "") ? "_id" : mongoSetSortBy;
        var defaultSortOrder = (mongoSetSortOrder == "") ? "ascending" : mongoSetSortOrder;
        var defaultSetMax = (mongoSetMax == "") ? 282828289 : parseInt(mongoSetMax);
        var defaultHint = (mongoSetHint == "") ? "_id" : mongoSetHint;
        var defaultCount = (mongoReturnCount != "");
        var defaultExplain = (mongoExplain != "");
        var defaultSize = (mongoSize != "");

        var defaultFieldsInclude = "";
        if (isParameterLower(parameters, "mongosetfieldsinclude")) {
            defaultFieldsInclude = parameters["mongosetfieldsinclude"];
            // LM: This does not make sense
            // defaultFieldsInclude = getFromMongo({'wid':mongoSetFieldsInclude});
        }
        var defaultFieldsExclude = "";
        if (isParameterLower(parameters, "mongosetfieldsexclude")) {
            defaultFieldsExclude = parameters["mongosetfieldsexclude"];
            // LM: This does not make sense
            // defaultFieldsExclude = getFromMongo({'wid':mongoSetFieldsExclude});
        }

        // LM: This is a mistake...TODO: Figure out what it was supposed to be
        // the method is taken care of following so??..I think it was left by accident 
        //
        // var mongoRelationshipMethod="";
        // if (isParameterLower(parameters, "mongorelationshipmethod")) {
        //  var mongoSetFieldsExclude = parameters["mongorelationshipmethod"];
        // }
        // Dealing with method is setting the defaults accordingly

        // Applies the logic from the method
        if (mongoRelationshipMethod == "first") {
            defaultLimit = 1;
        }
        if (mongoRelationshipMethod == "last") {
            defaultLimit = 1;
            defaultSortOrder = "descending";
        }

        // #region Executing Addons -- This is simply organizing
        // parameters at this point. All of the addOns still
        // need to be implemented.

        // Need different functions for ascending and descending
        // Ascending Section
        var mycursor = "";
        if (defaultSortOrder != "descending") {
            var key, value;
            // Count ignores the limit or skip, so it will return all the matching records.count regardless of limit or skip.
            if (defaultCount) {
                // LM: ?
                //returnValues.length = 0;
                key = "Number of documents found is";
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                returnValues[key] = value;
            }
            // mongoExplain returns the statistics of the query, not the query itself.
            if (defaultExplain) {
                // LM: ?
                //returnValues.length = 0;
                key = "The query statistics are as follows";
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                returnValues[key] = value;
            }
            // mongoSize will return an int of the number of records, but unlike count, it takes into account the limit and skip
            if (defaultSize) {
                // LM: ?
                //returnValues.length = 0;
                key = "Number of documents found is";
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                value += "defaultSize: '" + defaultSize + "' , ";
                returnValues[key] = value;
            }

            if (!defaultCount && !defaultExplain && !defaultSize) {
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                mycursor = value;
            }
        } else {
            // Count ignores the limit or skip, so it will return all the matching records.count regardless of limit or skip.
            if (defaultCount) {
                // LM: ?
                //returnValues.length = 0;
                key = "Number of documents found is";
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                returnValues[key] = value;
            }
            // mongoExplain returns the statistics of the query, not the query itself.
            if (defaultExplain) {
                // LM: ?
                //returnValues.length = 0;
                key = "The query statistics are as follows";
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                returnValues[key] = value;
            }
            // mongoSize will return an int of the number of records, but unlike count, it takes into account the limit and skip
            if (defaultSize) {
                // LM: ?
                //returnValues.length = 0;
                key = "Number of documents found is";
                value = "";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                value += "defaultSize: '" + defaultSize + "' , ";
                returnValues[key] = value;
            }
            // The count, explain, and size are all calls that don't return records...
            // So don't use mycursor to get the records if you don't want them
            if (!defaultCount && !defaultExplain && !defaultSize) {
                value = parameters["query"] + ",";
                value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , ";
                value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , ";
                value += "defaultHint: '" + defaultHint + "' , ";
                value += "defaultLimit: '" + defaultLimit + "' , ";
                value += "defaultSkip: '" + defaultSkip + "' , ";
                value += "defaultSortBy: '" + defaultSortBy + "' , ";
                mycursor = value;
            }
        }

        if (!defaultCount && !defaultExplain && !defaultSize) {
            returnValues = mycursor;
        }
        proxyprinttodiv('Function Add On Query() output : ', returnValues);
        return returnValues;
    } //End of addOnQuery function

    function fishOut(parameters) {
        var p = [];
        var filter_data = {};
        var left_overs = {};


        filter_data = tolowerparameters(parameters, {}, { // queParams
            "mongowid": "",
            "mongorawquery": "",
            "mongoquerywid": "",
            "mongosinglequery": "",
            "mongomultiplequery": "",
        }, false);
        p[0] = filter_data.filteredobject;

        filter_data = tolowerparameters(parameters, {}, { // relParams
            "mongorelationshipdirection": "",
            "mongorelationshiptype": "",
            "mongorelationshipmethod": "",
            "mongorelationshiprawquery": "",
            "mongorelationshiplink":"",
            "mongorelationshipquery": "",
            "mongodtotype": "",
            "mongorelquery": ""
        }, false);
        p[1] = filter_data.filteredobject;

        filter_data = tolowerparameters(parameters, {}, { // aggParams
            "mongoaggregation": "",
            "mongoaggquery": ""
        }, false);
        p[2] = filter_data.filteredobject;

        filter_data = tolowerparameters(parameters, {}, { // addParams
            "mongosetfieldsinclude": "",
            "mongosetfieldsexclude": "",
            "mongosetlimit": "",
            "mongosetskip": "",
            "mongosethint": "",
            "mongosetmax": "",
            "mongosetsortby": "",
            "mongoreturncount": "",
            "mongoexplain": "",
            "mongosize": "",
            "mongosetsortorder": ""
        }, false);
        p[3] = filter_data.filteredobject;

        filter_data = tolowerparameters(parameters, {}, { // xtrParams
            "mongowid": "",
            "mongorawquery": "",
            "mongoquerywid": "",
            "mongosinglequery": "",
            "mongomultiplequery": "",
            "mongorelationshipdirection": "",
            "mongorelationshiptype": "",
            "mongorelationshipmethod": "",
            "mongorelationshiprawquery": "",
            "mongorelationshipquery": "",
            "mongorelationshiplink":"",
            "mongodtotype": "",
            "mongorelquery": "",
            "mongoaggregation": "",
            "mongoaggquery": "",
            "mongosetfieldsinclude": "",
            "mongosetfieldsexclude": "",
            "mongosetlimit": "",
            "mongosetskip": "",
            "mongosethint": "",
            "mongosetmax": "",
            "mongosetsortby": "",
            "mongoreturncount": "",
            "mongoexplain": "",
            "mongosize": "",
            "mongosetsortorder": "",
            "mongowidmethod": "",
            "command.db": "",
            "command.convertmethod": ""
        }, true);
        p[4] = filter_data.output;

        filter_data = tolowerparameters(parameters, {}, { // relafterParams;
            "mongowidmethod": ""
        }, false);
        p[5] = filter_data.filteredobject;

        filter_data = tolowerparameters(parameters, {}, { // commandParams
            "command.db": "",
            "command.convertmethod": ""
        }, false);
        p[6] = filter_data.filteredobject;

        return p;
    }
})(typeof window == "undefined" ? global : window);