(function (window) {

exports.updatewid = window.updatewid = updatewid = function updatewid(inputObject, callback) {
    // var originalarguments=arguments;
    // var executionid = new Date();
    var originalarguments = {};
    extend(true, originalarguments, inputObject);

    // convert to dri format before saving
    addtomongo(converttodriformat(inputObject), function (err, results) {
        proxyprinttodiv('Function updatewid in : x', results, 10);

        debugfn("updatewid code generator", "updatewid", "", "code", 2, 1, {
                0: originalarguments,
                1: results
                // 2: executionid
            }, 6);
        callback({}, results);

    });
};


exports.addwidmaster = addwidmaster = function addwidmaster(object, callback) {     
    object = ConvertFromDOTdri(object);
    var filter_data = tolowerparameters(object, {}, {"command":""}, true);
    proxyprinttodiv("addwidmaster filter_data", filter_data, 17);
    var _object = filter_data.output;
    var command = filter_data.output.filteredobject;
    var _dto_object;

    proxyprinttodiv("addwidmaster _object", _object, 17);
    cleanadd (_object, _dto_object, command, function (err, res) {
        _object = res.obj;
        _dto_object = res.dtoobj;
        proxyprinttodiv("addwidmaster after clean obj", _object, 17);
        proxyprinttodiv("addwidmaster after clean dto", _dto_object, 17);
        addwidobject(_object, _dto_object, null, null, null, command, function (err, res) {
            res = pack_up_params(res, command, "addwidmaster");
            callback(err, res);
        });
    });
};

// exports.addwidmaster = addwidmaster = function addwidmaster(object, callback) {
//     var inbound_parameters = {};
//     inbound_parameters = JSON.parse(JSON.stringify(arguments));


//     var _command = {};

//     // Test for lowering parameters
//     tolowerparameters(object, {
//                                 "command":"",

//                                 }, false, _object, _command);


//     console.log('&&& _object\n' + JSON.stringify(_object, "-", 4));
//     console.log('&&& _command\n' + JSON.stringify(_command, "-", 4));
    
//     var _object = ConvertFromDOTdri(object);

//     var _dto_object;

//     var command = object.command;
//     delete object.command;

//     proxyprinttodiv("addwidmaster before clean", _object, 17);

//     cleanadd (_object, _dto_object, command, function (err, res) {
//         _object = res.obj;
//         _dto_object = res.dtoobj;
       
//         proxyprinttodiv("addwidmaster after clean object", _object, 17);
//         proxyprinttodiv("addwidmaster after clean", _dto_object, 17);

//         addwidobject(_object, _dto_object, command, function (err, res) {
//             callback(err, res);
//         });
//     });
// }


exports.cleanadd = cleanadd = function cleanadd(object, dtoobject, command, callback) {

    getdtoobject(object, command, function (err, res) {
        dtoobject = res;
        proxyprinttodiv("cleanadd getdtoobject res-------", dtoobject, 17);
        
        var dto_to_get;
        var big_dto = {};
        var result_obj = {};
        var output={};

        output.obj=object;
        output.dtoobj = dtoobject;
        dto_to_get = res['metadata']['method'];
        if (dto_to_get!=="string") {
            proxyprinttodiv("cleanadd dto_to_get", dto_to_get, 17);
            execute({"executethis":"getwidmaster", 
                "wid": dto_to_get, 
                "command.getwidmaster.execute":"ConvertFromDOTdri",
                "command.getwidmaster.convertmethod":"dto"
                }, function (err, res) {
                    proxyprinttodiv("cleanadd after execute", res, 17);

                    big_dto = res[0]; 
                    result_obj = insertbydtotype(object, big_dto, {}, command); // this fn in et-get
                    proxyprinttodiv("cleanadd after insertbydtotype", result_obj, 17);
                    //command.deepfilter.convert="fromstring"; not needed since done in addwid anyway
                    if (!command) {command={};}
                    if (!command.deepfilter) {command.deepfilter={};}
                    if (!command.deepfilter.convert) {command.deepfilter.convert=false;}
                    deepfilter(result_obj, dtoobject, command, function (err, result_obj) {
                        proxyprinttodiv("cleanadd after insertbydtotype after", result_obj, 17);
                        output.obj=result_obj;
                        output.dtoobj = dtoobject;
                        proxyprinttodiv("cleanadd after executethis getwidmaster result_obj", output, 17);
                        callback(err, output);
                    });
                });
            }
        else { // if ==string
            callback(err, output);
            }
    });
};

exports.addwidobject = addwidobject = function addwidobject(input, inputdto, parentwid, parentmethod, relationshiptype, command, callback ) {

    proxyprinttodiv("addwidobject input input :- ", input, 17);
    proxyprinttodiv("addwidobject input inputdto :- ", inputdto, 17);
    proxyprinttodiv("addwidobject input command :- ", command, 17);


    var _parent_object = {};
    var _parent_dto = {};
    var _children_object_collection = {};
    var _children_dto_collection = {};
    var _child_object;
    var _child_dto;
    var _dto;
    var _children_dto_list = [];
    var _parent_wid;
    var _parent_method;
    var _child_object_map=[];

    // clone input and inputdto to parent object and child object

    _parent_object= JSON.parse(JSON.stringify(input))
    _parent_dto= JSON.parse(JSON.stringify(inputdto))
    //extend(true, _parent_object, input);
    //extend(true, _parent_dto, inputdto);

    // should not be necessary because addwidmaster does it
    //delete _parent_object.command;
    //delete _parent_dto.command;
    
    //_parent_object.command = {};
    //_parent_dto.command = {};

    // create parent by deleting all children in parent, create children adding
    if(inputdto.command && inputdto.command.dtolist) {
        for (var each_property in inputdto.command.dtolist) { // go through list of children
            if (inputdto.command.dtolist.hasOwnProperty(each_property)) {
                proxyprinttodiv("each_property :- ", each_property, 17);
                
                _dto = {};
                _dto["dtoname"] = each_property;
                _dto["dtotype"] = inputdto.command.dtolist[each_property];
                //_dto["dtotype"] = inputdto.command.deepdtolist[each_property];

                if ((_dto.dtotype!=="jsononetomany") && (_dto.dtotype!=="jsononetoone")) { // if internal do nothing
                    _children_dto_list.push(_dto); // produces list [{booksdto: onetomany},{}]

                    //delete _parent_object[inputdto.command.dtolist[each_property]];
                    //delete _parent_dto[inputdto.command.dtolist[each_property]];
                    delete _parent_object[each_property];
                    delete _parent_dto[each_property];            
                
                    if (input[each_property]) {
                        //_children_object_collection[each_property] = {};
                        //extend(true, _children_object_collection[each_property], input[each_property]);
                        _children_object_collection[each_property] = JSON.parse(JSON.stringify(input[each_property]));
                    }

                    if (inputdto[each_property]) {
                        //_children_dto_collection[each_property] = {};
                        //extend(true, _children_dto_collection[each_property], inputdto[each_property]);
                        _children_dto_collection[each_property] = JSON.parse(JSON.stringify(inputdto[each_property]));
                    }
                }
            }
        }
    }

    proxyprinttodiv("_children_object_collection :- after ", _children_object_collection, 17);
    proxyprinttodiv("_child_dto_list after",_children_dto_list, 17);

    // send the parent object and dto to addrecord
    addrecord(_parent_object, _parent_dto, parentwid, parentmethod, relationshiptype, command, function (err, res) {

        proxyprinttodiv("addrecord parentobj result :- ", res, 17);
        
        _parent_object = res;
        _parent_wid = res['wid'];
        if (res['metadata']) {
            _parent_method = res['metadata']['method'];
        }
        
        // iterate over the list of dto's, loading up each child and sending them to addrecord
        async.mapSeries(_children_dto_list, function (eachchild, cbMap) {
            async.nextTick(function() {
                proxyprinttodiv("_children_object_collection :- ", _children_object_collection, 17);
                proxyprinttodiv("_children_dto_list eachchild :- ", eachchild, 17);

                // look up child object and dto
                // if ((eachchild.dtotype==="onetomany" || (eachchild.dtotype==="jsononetomany")) {
                //     _child_dto.push(_child_dto)
                //     }

                _child_object = _children_object_collection[eachchild.dtoname];
                _child_dto = _children_dto_collection[eachchild.dtoname];

                delete _children_object_collection[eachchild.dtoname];
                delete _children_dto_collection[eachchild.dtoname];
                proxyprinttodiv("_child_dto :- ", _child_dto, 17);
                proxyprinttodiv("_child_object :- ", _child_object, 17);

                if (!isArray(_child_object)) {
                    _child_object_map.push(_child_object);
                    }
                else {
                    _child_object_map=_child_object;
                    }
                if (isArray(_child_dto)) {_child_dto=_child_dto[0]}
                proxyprinttodiv("_child_object map :- ", _child_object_map, 17);
                async.mapSeries(_child_object_map, function (_child_object, cbMap2) {
                    async.nextTick(function() {
                        proxyprinttodiv("_child_object loop :- ", _child_object, 17);
                        //if (isArray(_child_dto)) && 
                        //    ((eachchild.dtotype==="jsononetomany") || (eachchild.dtotype==="onetomany")) {
                            if (_child_object && Object.keys(_child_object).length!==0 &&
                                _child_dto && Object.keys(_child_dto).length!==0) {

                                if (!_child_object["metadata"]) {_child_object["metadata"]={}}
                                if (!_child_object["metadata"]["method"]) {_child_object["metadata"]["method"]=eachchild.dtoname}

                                addwidobject(_child_object, _child_dto,  _parent_wid, _parent_method, eachchild.dtotype, command, function (err, res) {
                                    cbMap2(null);
                                });
                            }
                            else { 
                                cbMap2(null);
                            }
                        //    }
                        })
                    }, function (err, res) {
                    cbMap(null);
                    })


                // if (_child_object && Object.keys(_child_object).length!==0) {

                //     if (!_child_object["metadata"]) {_child_object["metadata"]={}}
                //     if (!_child_object["metadata"]["method"]) {_child_object["metadata"]["method"]=eachchild.dtoname}

                //     // delete the child and dto object from the collection

                //     addwidobject(_child_object, _child_dto,  _parent_wid, _parent_method, eachchild.dtotype, command, function (err, res) {
                //         cbMap(null);
                //     });
                // }
                // else { // if no data in _child_object
                //     cbMap(null);
                // }

            });
        }, function (err, res) {
            // I'm guessing here but if we have left over children in the children collection then we recurse
            if (Object.keys(_children_object_collection).length!==0) {
                addwidobject(_children_object_collection, _children_dto_collection, command, function (err, res) {
                    _parent_object = res;
                    callback(err, _parent_object);
                });
            } 
            else {
                callback(err, _parent_object);
            }
        }); // End async map series
    });
};


exports.addrecord = addrecord = function addrecord(inputrecord, dtoobject, parentwid, parentmethod, relationshiptype, command, callback) {
    proxyprinttodiv("addrecord input inputrecord :- ", inputrecord, 17 );
    proxyprinttodiv("addrecord input dtoobject :- ", dtoobject, 17);
    proxyprinttodiv("addrecord input parentwid :- ", parentwid, 17 );
    proxyprinttodiv("addrecord input parentwid :- ", parentmethod, 17 );
    proxyprinttodiv("addrecord input relationshiptype :- ", relationshiptype, 17);

    var relobj={};
    var reldto={};
    var executeobject = {};
    var parentrelationshiptype;

    
        // if the incoming relationship is one to one 
    async.series([
        function step1(step1_callback) {
            if (relationshiptype === "onetoone") {
                proxyprinttodiv("addrecord async.series fired with relationshiptype -- ", relationshiptype, 17);

                executeobject["executethis"] = "querywid";
                executeobject["mongorawquery"] = {
                    "$and": [{
                        "data.primarywid": parentwid,
                        "data.secondarymethod": inputrecord["metadata"]["method"]
                    }]};
                    
                execute(executeobject, function (err, widset) {
                    var widrecord;
                    if ((widset.length > 0) && (relationshiptype === "onetoone")) {
                        for (var wid in widset[0]) {
                            widrecord = widset[0][wid];
                        }
                        relobj['wid'] = wid ;
                        inputrecord['wid'] = widrecord["secondarywid"] ;
                    }
                    step1_callback(null);
                });
            }
            else {
                step1_callback(null);
            }

        },
        function step2(step2_callback) {
            // added by joe, seems roundabout but I wanted to keep sending in "" for most of the cases
            // if(relationshiptype !== "jsononetomany") {
            //     parentrelationshiptype = "";
            // } else {
            //     parentrelationshiptype = relationshiptype;
            // }

            //proxyprinttodiv("parentrelationshiptype: ", parentrelationshiptype, 17);

            addwid(inputrecord, dtoobject, command, function (err, addobject) {
                addobject = addobject[0];
                proxyprinttodiv("addrecord input addobject :- ", addobject, 17);

                if (relationshiptype==="onetoone" || relationshiptype==="onetomany") {

                    reldto = {"wid":"string", 
                            "primarywid":"string",
                            "secondarywid":"string",
                            "relationshiptype":"string",
                            "linktype":"string",
                            "primarymethod":"string",
                            "secondarymethod":"string",
                            "metadata":{"method":"string"}};
            
                    relobj["primarywid"] = parentwid;
                    relobj["secondarywid"] = addobject['wid'];

                    proxyprinttodiv("addrecord input addobject :-II ", addobject, 17);
                    proxyprinttodiv("addrecord input addobject['wid'] :- ", addobject['wid'], 17);

                    relobj["relationshiptype"] = "attributes";
                    relobj["metadata"]= {};
                    relobj["metadata"]["method"] = "relationshipdto";
                    relobj["linktype"] = relationshiptype;

                    if (parentmethod) 
                        relobj["primarymethod"] = parentmethod;

                    if (addobject["metadata"])
                        relobj["secondarymethod"] = addobject["metadata"]["method"];

                    proxyprinttodiv("addrecord input relobj ", relobj, 17);

        			addwid(relobj, reldto, command, function (err, added_relation) {
                        proxyprinttodiv("addrecord input added_relation :- ", added_relation, 17);
                        step2_callback(null, addobject);
                     });
                }
                else {
                    step2_callback(null, addobject);
                }
            });
        }
        ], 
        function (err, res) {
            // res[1] is addobject from step2
            callback({}, res[1]);
        });
    };

exports.addwid = addwid = function addwid(object, dtoobject, command, callback) {
    function addwid5() { 
        object["executethis"] = "updatewid";
        proxyprinttodiv("addwid before updatewid ", object, 17);
        execute(object, function (err, res) {
            proxyprinttodiv("this was added", res, 17);
            callback(err, res);
        });
    }

    function addwid4() { 
        var dtolist={};
        if (dtoobject.command && dtoobject.command.dtolist) {dtolist=dtoobject.command.dtolist}
        proxyprinttodiv("addwid step4 dtolist", dtolist, 17);           
        for (dtoname in dtolist) {  // 
            dtotype = dtolist[dtoname];
            if (dtotype==="jsononetomany") {
                var subobject = [];
                if (object[dtoname]) {
                    subobject=JSON.parse(JSON.stringify(object[dtoname]))
                    proxyprinttodiv("addwid subobject", subobject, 17); 
                    delete object[dtoname]
                    if (!currentobject[dtoname]) {currentobject[dtoname]=[]}
                    for (eachobject in subobject) {
                        currentobject[dtoname].push(subobject[eachobject])
                    }                            
                    proxyprinttodiv("after currentobject", currentobject, 17); 
                }
            } else if (dtotype === "jsononetoone") {
                var lastObject;
                if (object[dtoname] instanceof Array) {
                    lastObject = object[dtoname][object[dtoname].length -1];
                    // rewrite array to only contain the last item
                    object[dtoname] = lastObject;
                }
            }

        }
        
        object = extend(true, currentobject, object);
        proxyprinttodiv("after extend,, object-- ", object, 17); 
        addwid5();
    }

    function addwid3() { // if not wid then assign new wid
        proxyprinttodiv("addwid step3 check for wid id object ", object, 17);
        if  (!object["wid"]) {
            getnewwid({}, function (err, res) {
                proxyprinttodiv("addwid getnewwid", res, 17);
                object["wid"]=res;
                addwid4();
            });

        } else { // if wid then read wid, and extend
            object["wid"] = object["wid"].toLowerCase();
            proxyprinttodiv("addwid wid id existed", object, 17);
            execute({"executethis":"getwid","wid":object["wid"]}, function (err, res) {
                if (Object.keys(res[0]).length !== 0) {
                    currentobject=res[0];
                    }
                proxyprinttodiv("before currentobject ", currentobject, 17);
                addwid4();
            })
        }
    }

    function addwid2() {

        if (!command) {command = {};}
        if (!command.deepfilter) {command.deepfilter = {};}
        command.deepfilter.convert = true;

        proxyprinttodiv("addwid step2 before to deepfilter object ", object, 17);  
        proxyprinttodiv("addwid to deepfilter dto", dtoobject,17);     
        deepfilter(object, dtoobject, command, function (err, resultobject) {
            object=resultobject;
            proxyprinttodiv("addwid result deepfilter object", object,17); 
            addwid3();
            });
    }

    // start of addwid -- step 1
    var db='data';
    if (command && command.db) {db=command.db}
    proxyprinttodiv("addwid step 1input object", object, 17);
    proxyprinttodiv("addwid input dtoobject", dtoobject, 17);
    proxyprinttodiv("addwid input command", command, 17);
    var inheritwidlist=[];
    if (dtoobject.command && dtoobject.command.inherit) {
        inheritwidlist.push(dtoobject.command.inherit)
        }
    var objectarray=[];
    var eachobject;
    var currentobject={};
    
    proxyprinttodiv("addwid inheritwidlist", inheritwidlist, 17);
    if (inheritwidlist) { // do not save if in inherit
        async.mapSeries(inheritwidlist, function (inheritwid, cbMap) {
            async.nextTick(function() {
                for (eachobject in inheritwid) {} // to get left side
                execute({"executethis":"getwidmaster","wid":eachobject, 
                    "command.getwidmaster.execute":"ConvertFromDOTdri","command.getwidmaster.inheritflag":"false", 
                    "command.getwidmaster.convertmethod":"nowid"}, function (err, res) {
                    proxyprinttodiv("getwidmaster wid : " + inheritwid  + " -- res -- " ,  res, 17);
                    // if (Object.keys(res).length !== 0) {
                    //     for (var eachprop in res) {
                    //         if (object[eachprop]===res[eachprop]) {delete object[eachprop]}
                    //         }
                    // } else { // if no inherit then nothing to do
                    // }
                    if (Object.keys(res).length !== 0) {
                            for (var eachprop in res) {
                                if (res.hasOwnProperty(eachprop)) {
                                    if (object[eachprop]===res[eachprop]) { delete object[eachprop]; }
                                }
                            }
                        } else {
                            // if no inherit then nothing to do
                        }
                    proxyprinttodiv("object after deleting the properties--" ,  object, 17);
                    cbMap(null);
                }); // execute
            }); // next tick
        }, addwid2); // mapseries
    } else { // if no inheritwid
        addwid2();
    }
}; // end of addwid

})(typeof window === "undefined" ? global : window);//
