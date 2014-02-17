(function (window) {

exports.addwidmaster = addwidmaster = function addwidmaster(object, callback) {
    var inbound_parameters = {};
    inbound_parameters = JSON.parse(JSON.stringify(arguments));

    var _object = ConvertFromDOTdri(object);

    var _dto_object;

    var command = object.command;
    delete object.command;

    proxyprinttodiv("addwidmaster before clean", _object, 17);

    cleanadd (_object, _dto_object, command, function (err, res) {
        _object = res.obj;
        _dto_object = res.dtoobj;
       
        proxyprinttodiv("addwidmaster after clean object", _object, 17);
        proxyprinttodiv("addwidmaster after clean", _dto_object, 17);

        addwidobject(_object, _dto_object, command, function (err, res) {
            callback(err, res);
        });
    });
}

exports.cleanadd = cleanadd = function cleanadd(object, dtoobject, command, callback) {
    getdtoobject(object, command, function (err, res) {
        dtoobject = res;
        proxyprinttodiv("cleanadd getdtoobject res-------", dtoobject, 17);
        
        var dto_to_get;
        var big_dto = {};
        var result_obj = {};
        var output={};

        dto_to_get = res['metadata']['method'];

        proxyprinttodiv("cleanadd dto_to_get", dto_to_get, 17);
        execute({"executethis":"getwidmaster", 
            "wid": dto_to_get, 
            "command.execute":"ConvertFromDOTdri",
            "command.convertmethod":"dto"
            }, function (err, res) {
                proxyprinttodiv("cleanadd after execute", res, 17);

                big_dto = res[0]; 
                result_obj = insertbydtotype(object, big_dto, {}, command); // this fn in et-get
                proxyprinttodiv("cleanadd after insertbydtotype", result_obj, 17);
                result_obj = deepfilter(result_obj, dtoobject, command);
                proxyprinttodiv("cleanadd after insertbydtotype after", result_obj, 17);
                output.obj=result_obj;
                output.dtoobj = dtoobject
                proxyprinttodiv("cleanadd after executethis getwidmaster result_obj", output, 17);
                callback(err, output);
        });
    });
}

exports.addwidobject = addwidobject = function addwidobject(input, inputdto, command, callback) {
	proxyprinttodiv("addwidobject input input :- ", input, 17);
	proxyprinttodiv("addwidobject input inputdto :- ", inputdto, 17);
	proxyprinttodiv("addwidobject input command :- ", command, 17);
	
    var _parent_object = {};
    var _parent_dto = {};
    var _children_object_collection = {};
    var _children_dto_collection = {};
    var _child_object = {};
    var _child_dto = {};
    var _dto;
    var _children_dto_list = [];
    var _parent_wid;
    var _parent_method;

    // clone input and inputdto to parent object and child object
    extend(true, _parent_object, input);
    extend(true, _parent_dto, inputdto);

    delete _parent_object.command;
    delete _parent_dto.command;
    
    //_parent_object.command = {};
    //_parent_dto.command = {};

    // create parent by deleting all children in parent, create children adding
    if(inputdto.command && inputdto.command.dtolist) {
        for (var each_property in inputdto.command.dtolist) { // go through list of children
    		proxyprinttodiv("each_property :- ", each_property, 17);
            
            //delete _parent_object[inputdto.command.dtolist[each_property]];
            //delete _parent_dto[inputdto.command.dtolist[each_property]];
            delete _parent_object[each_property];
            delete _parent_dto[each_property];            
    	
            if (input[each_property]) {
                _children_object_collection[each_property] = {};
        		extend(true, _children_object_collection[each_property], input[each_property]);
                }

            if (inputdto[each_property]) {
    		    _children_dto_collection[each_property] = {};
    		    extend(true, _children_dto_collection[each_property], inputdto[each_property]);
                }
    		
            _dto = {};
            _dto["dtoname"] = each_property;
            _dto["dtotype"] = inputdto.command.dtolist[each_property];
            //_dto["dtotype"] = inputdto.command.deepdtolist[each_property];
            _children_dto_list.push(_dto); // produces list [{booksdto: onetomany},{}]
        }
    }

    // send the parent object and dto to addrecord
	addrecord(_parent_object, _parent_dto, null, null, null, command, function (err, res) {
		proxyprinttodiv("addrecord parentobj result :- ", res, 17);
		
        _parent_object = res;
	    _parent_wid = res['wid'];
        if (res['metadata'])
            _parent_method = res['metadata']['method'];
		
        // iterate over the list of dto's, loading up each child and sending them to addrecord
        async.mapSeries(_children_dto_list, function (eachchild, cbMap) {
			proxyprinttodiv("_children_object_collection :- ", _children_object_collection, 17);
			proxyprinttodiv("_child_dto :- ", _child_dto, 17);
			proxyprinttodiv("_children_dto_list eachchild :- ", eachchild, 17);
			
            // look up child object and dto
            _child_object = _children_object_collection[eachchild.dtoname];
			_child_dto = _children_dto_collection[eachchild.dtoname];
            delete _children_object_collection[eachchild.dtoname];
            delete _children_dto_collection[eachchild.dtoname];

            if (_child_object && Object.keys(_child_object).length!==0) {

                if (!_child_object["metadata"]) {_child_object["metadata"]={}}
                if (!_child_object["metadata"]["method"]) {_child_object["metadata"]["method"]=eachchild.dtoname}
    			
                // delete the child and dto object from the collection
		
                addrecord(_child_object, _child_dto,  _parent_wid, _parent_method, eachchild.dtotype, command, function (err, res) {
    				cbMap(null);
    			});
                }
            else { // if no data in _child_object
                cbMap(null);
                }

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
}


exports.addrecord = addrecord = function addrecord(inputrecord, dtoobject, parentwid, parentmethod, relationshiptype, command, callback) {
    proxyprinttodiv("addrecord input inputrecord :- ", inputrecord, 17 );
    proxyprinttodiv("addrecord input dtoobject :- ", dtoobject, 17);
    proxyprinttodiv("addrecord input parentwid :- ", parentwid, 17 );
    proxyprinttodiv("addrecord input parentwid :- ", parentmethod, 17 );
    proxyprinttodiv("addrecord input relationshiptype :- ", relationshiptype, 17);

    var relobj={};
    var reldto={};
    var executeobject = {};

    
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
                    if ((widset.length > 0) && (relationshiptype === "onetoone")) {
                        relobj['wid'] = widset[0][0] ;
                        inputrecord['wid'] = widset[0][1]["secondarywid"] ;
                    }
                    step1_callback(null);
                });
            }
            else {
                step1_callback(null);
            }

        },
        function step2(step2_callback) {
            addwid(inputrecord, dtoobject, command, function (err, addobject) {
                addobject = addobject[0];
                proxyprinttodiv("addrecord input addobject :- ", addobject, 17);

                if (relationshiptype) {

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
                        relobj["secondarymethod"] = addobject["metadata"]["method"]

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
    }

exports.addwid = addwid = function addwid(object, dtoobject, command, callback) {

    
    function addwid3 () {
        proxyprinttodiv("addwid input dtoobject before", dtoobject,17);
        proxyprinttodiv("addwidbefore deepfilter,, object-- ", object, 17);
        object = deepfilter(object, dtoobject, command);
        object["executethis"]="updatewid";
        proxyprinttodiv("addwid after deepfilter,, object-- ", object, 17);
        execute(object, function (err, res) {
            proxyprinttodiv("this was added", res, 17);
            callback(err, res)
        });
    }

    function addwid2 () { // if not wid then assign new wid
        proxyprinttodiv("addwid addwid2 object[wid]I", object, 17);
        if (!object["wid"]) {
            object["wid"] = getnewwid();
            proxyprinttodiv("addwid addwid2 object[wid] after if", object["wid"], 17);
            addwid3();
        } else { // if wid then read wid, and extend

            object["wid"] = object["wid"].toLowerCase();
            proxyprinttodiv("addwid addwid2 object[wid] after else", object, 17);

            execute({"executethis":"getwid","wid":object["wid"]}, function (err, res) {
                if (Object.keys(res[0]).length !== 0) {
                    proxyprinttodiv("before before extend,, res-- ", res[0], 17);
                    proxyprinttodiv("before before extend,, object-- ", object, 17);
                    object = extend(true, res[0], object)
                    proxyprinttodiv(" after extend,, object-- ", object, 17);
                    addwid3();
                } else {
                    addwid3();
                }
            });
        }

    }

    // start of addwid -- step 1
    proxyprinttodiv("addwid input object", object, 17);
    proxyprinttodiv("addwid input dtoobject", dtoobject, 17);
    proxyprinttodiv("addwid input command", command, 17);
    var inheritwid;
    var eachprop;
    if (dtoobject.metadata && dtoobject.metadata.inherit) {
        inheritwid = dtoobject.metadata.inherit;
    }
    
    if (inheritwid) { // do not save if in inherit
        execute({"executethis":"getwidmaster","wid":inheritwid, 
            "command.execute":"ConvertFromDOTdri","command.inheritflag":"false", 
            "command.convertmethod":"nowid"}, function (err, res) {
            proxyprinttodiv("getwidmaster wid : " + inheritwid  + " -- res -- " ,  res, 17);
            if (Object.keys(res).length !== 0) {
                for (eachprop in res) {
                    if (object[eachprop]===res[eachprop]) {delete object[eachprop]}
                    }
            } else { // if no inherit then nothing to do
            }
            proxyprinttodiv("object after deleting the properties--" ,  object, 17);
            addwid2();
        });
    } else { // if no inheritwid
        addwid2();
    }
} // end of addwid
    


})(typeof window === "undefined" ? global : window);//
