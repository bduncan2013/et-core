	// out of date
    // exports.ettestinheritoverride = ettestinheritoverride = function ettestinheritoverride(params, callback) {
    //     eventappinstall();
    //     debuglevel = 0;
        
    //     execute([{
    //                 "executethis": "addwidmaster",
    //                 "wid": "bookdtoextra",
    //                 "metadata.method": "bookdtoextra",
    //                 "title": "string", // changed by joe
    //                 "pages": "string"
    //             },{
    //                 "executethis": "addwidmaster",
    //                 "wid": "bookdefaultdto",
    //                 "metadata.method": "bookdtoextra",
    //                 "title":"X title", // changed by joe
    //                 "pages":"300"
    //             },{
    //                 "executethis": "addwidmaster",
    //                 "wid": "bookdto",
    //                 "metadata.method": "bookdto",
    //                 "metadata.inherit.override.0": "bookdefaultdto",
    //                 "metadata.inherit.override.1": "bookdefaultdto2",
    //                 "title": "string",
    //                 "pages": "string"
    //             },{
    //                 "executethis": "addwidmaster",
    //                 "wid": "bookdtowid111",
    //                 "metadata.method":"bookdto",
    //                 "title": "Book Title1"
    //                 // notice no pages
    //             },{
    //                 "executethis": "getwidmaster",
    //                 "wid": "bookdtowid111",
    //             }
    //         ], function (err, res) {
    //             proxyprinttodiv('Function bookdtowid111 result Full res', res, 17);
                
    //             proxyprinttodiv('Function bookdtowid111 res[4] ', res[4], 99);
                
    //             var expectedResult = [{"title":"X title","wid":"bookdtowid111","metadata.method":"bookdtoextra","pages":"300"}];
    //             proxyprinttodiv('Function bookdtowid111 expectedResult ', expectedResult, 17);
                
    //             res = logverify("bookdtowid111_result", res[4], expectedResult);
    //             debuglevel=0;
    //             execute({"executethis": "getwidmaster","wid": "bookdtowid111"}, function (err, res1) {
    //                 proxyprinttodiv('Function bookdtowid111 result LAST ', res1, 17); 
    //                 callback(err, res); 
    //             })
    //     });
    // }

    exports.ettestinheritoverride2 = ettestinheritoverride2 = function ettestinheritoverride2(params, callback) {
        eventappinstall();
        debuglevel = 0;
        
        execute([{
                    "executethis": "addwidmaster",
                    "wid": "bookoverride",
                    "metadata.method": "bookdto",
                    "title":"X title", 
                    "pages":"300"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdto",
                    "metadata.method": "bookdto",
                    "title": "string",
                    "pages": "string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdtowid111",
                    "metadata.method":"bookdto",
                    "metadata.inherit.override.0": "bookoverride",
                    "title": "Book Title1",
                    "pages":"10"
                },{
                    "executethis": "getwidmaster",
                    "wid": "bookdtowid111",
                }
            ], function (err, res) {
                proxyprinttodiv('Function bookdtowid111 result Full res', res, 17);
                
                proxyprinttodiv('Function bookdtowid111 res[4] ', res[3], 99);
                
                var expectedResult = [{"title":"X title","wid":"bookdtowid111","metadata.method":"bookdto","pages":"300"}];
                proxyprinttodiv('Function bookdtowid111 expectedResult ', expectedResult, 17);
                
                res = logverify("bookdtowid111_result", res[3], expectedResult);
                debuglevel = 0;
                execute({"executethis": "getwidmaster","wid": "bookdtowid111"}, function (err, res1) {
                    proxyprinttodiv('Function bookdtowid111 result LAST ', res1, 17); 
                    callback(err, res); 
                })
        });
    }

    exports.ettestinheritdefault2 = ettestinheritdefault2 = function ettestinheritdefault2(params, callback) {
        eventappinstall();
        debuglevel = 0;
        
        execute([{
                    "executethis": "addwidmaster",
                    "wid": "bookdefault",
                    "metadata.method": "bookdto",
                    "title":"X title",
                    "pages":"300",
                    "chapters":"10",
                    "publisher":"Blank publishing"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdto",
                    "metadata.method": "bookdto",
                    "title": "string",
                    "pages": "string",
                    "chapters":"string",
                    "publisher":"string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookwid1",
                    "metadata.method":"bookdto",
                    "metadata.inherit.default.0": "bookdefault",
                    "title": "Book Title1",
                    "pages":"10"
                },{
                    "executethis": "getwidmaster",
                    "wid": "bookwid1",
                }
            ], function (err, res) {
                proxyprinttodiv('Function bookwid1 result Full res', res, 17);
                
                proxyprinttodiv('Function bookwid1 res[4] ', res[3], 99);
                
                var expectedResult = [{"title":"Book Title1","wid":"bookwid1", "chapters":"10",
                    "publisher":"Blank publishing", "pages":"10", "metadata.method":"bookdto"}];
                proxyprinttodiv('Function bookwid1 expectedResult ', expectedResult, 17);
                
                res = logverify("bookwid1_result", res[3], expectedResult);
                debuglevel = 0;
                execute({"executethis": "getwidmaster","wid": "bookwid1"}, function (err, res1) {
                    proxyprinttodiv('Function bookwid1 result LAST ', res1, 17); 
                    callback(err, res); 
                })
        });
    }

     exports.ettestinheritdefault3 = ettestinheritdefault3 = function ettestinheritdefault3(params, callback) {
        eventappinstall();
        debuglevel = 0;
        
        execute([{
                    "executethis": "addwidmaster",
                    "wid": "bookdefault",
                    "metadata.method": "bookdto",
                    "title":"X title",
                    "pages":"300",
                    "chapters":"10",
                    "publisher":"Blank publishing"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdto",
                    "metadata.method": "bookdto",
                    "title": "string",
                    "pages": "string",
                    "chapters":"string",
                    "publisher":"string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookwid1",
                    "metadata.method":"bookdto",
                    "metadata.inherit.default.0": "bookdefault",
                    "title": "Book Title1",
                    "pages":"10"
                },{
                    "executethis": "getwidmaster",
                    "wid": "bookwid1",
                }
            ], function (err, res) {
                proxyprinttodiv('Function bookwid1 result Full res', res, 17);
                
                proxyprinttodiv('Function bookwid1 res[4] ', res[3], 99);
                
                var expectedResult = [{"title":"Book Title1","wid":"bookwid1", "chapters":"10",
                    "publisher":"Blank publishing", "pages":"10", "metadata.method":"bookdto"}];
                proxyprinttodiv('Function bookwid1 expectedResult ', expectedResult, 17);
                
                res = logverify("bookwid1_result", res[3], expectedResult);
                debuglevel = 0;
                execute({"executethis": "getwidmaster","wid": "bookwid1"}, function (err, res1) {
                    proxyprinttodiv('Function bookwid1 result LAST ', res1, 17); 
                    callback(err, res); 
                })
        });
    }

    exports.ettestinheritoverride3 = ettestinheritoverride3 = function ettestinheritoverride3(params, callback) {
        eventappinstall();
        debuglevel = 0;
        
        execute([{
                    "executethis": "addwidmaster",
                    "wid": "bookoverride",
                    "metadata.method": "bookdto",
                    "title":"X title", 
                    "pages":"300"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdto",
                    "metadata.method": "bookdto",
                    "title": "string",
                    "pages": "string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdtowid111",
                    "metadata.method":"bookdto",
                    "metadata.inherit.override.0": "bookoverride",
                    "title": "Book Title1",
                    "pages":"10"
                },{
                    "executethis": "getwidmaster",
                    "wid": "bookdtowid111",
                }
            ], function (err, res) {
                proxyprinttodiv('Function bookdtowid111 result Full res', res, 17);
                
                proxyprinttodiv('Function bookdtowid111 res[4] ', res[4], 99);
                
                var expectedResult = [{"title":"X title","wid":"bookdtowid111","metadata.method":"bookdtoextra","pages":"300"}];
                proxyprinttodiv('Function bookdtowid111 expectedResult ', expectedResult, 17);
                
                res = logverify("bookdtowid111_result", res[4], expectedResult);
                debuglevel=0;
                execute({"executethis": "getwidmaster","wid": "bookdtowid111"}, function (err, res1) {
                    proxyprinttodiv('Function bookdtowid111 result LAST ', res1, 17); 
                    callback(err, res); 
                })
        });
    }

    exports.ettestinheritdefault = ettestinheritdefault = function ettestinheritdefault(params, callback) {
        eventappinstall();
        debuglevel = 0;
        
        execute([{
                    "executethis": "addwidmaster",
                    "wid": "bookdtoextra",
                    "metadata.method": "bookdtoextra",
                    "title": "string", 
                    "pages": "string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdefault",
                    "metadata.method": "bookdefaultdto",
                    "chapters": "12", 
                    "publisher": "Blank publisher"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdefaultdto",
                    "metadata.method": "bookdefaultdto",
                    "chapters": "string", 
                    "publisher": "string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdefaultdto",
                    "metadata.method": "bookdtoextra",
                    "title":"X title", 
                    "pages":"300"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdto",
                    "metadata.method": "bookdto",
                    "metadata.inherit.default.0": "bookdefaultdto",
                    "metadata.inherit.default.1": "bookdefaultdto2",
                    "title": "string",
                    "pages": "string"
                },{
                    "executethis": "addwidmaster",
                    "wid": "bookdtowid111",
                    "metadata.method":"bookdto",
                    "metadata.inherit.default.0": "bookdefault",
                    "title": "Book Title1"
                    // notice no pages -- should get it from wid inherit
                    // notice no chapters -- should get it from dto inherit
                    // notice no publisher -- should get it from dto inherit
                },{
                    "executethis": "getwidmaster",
                    "wid": "bookdtowid111",
                }
            ], function (err, res) {
                proxyprinttodiv('Function bookdtowid111 result Full res', res, 17);
                
                proxyprinttodiv('Function bookdtowid111 res[4] ', res[4], 99);
                
                var expectedResult = [{"title":"Book Title1","wid":"bookdtowid111","metadata.method":"bookdto","pages":"300",
                                        "chapters": "12", "publisher": "Blank publisher"}];
                proxyprinttodiv('Function bookdtowid111 expectedResult ', expectedResult, 17);
                
                res = logverify("bookdtowid111_result", res[4], expectedResult);
                debuglevel=0;
                execute({"executethis": "getwidmaster","wid": "bookdtowid111"}, function (err, res1) {
                    proxyprinttodiv('Function bookdtowid111 result LAST ', res1, 17); 
                    callback(err, res); 
                })
        });
    }
		
	/*
		To add dtos, relationships for manytoonetest
	*/
	function manytoonesetupdto(callback){
		async.series([
			function (cb1) {
				var executeList = [
				{		//authordto
					"executethis": "addwidmaster",
					"metadata.method": "authordto",
					"wid": "authordto",
					"name": "string",
					"age": "string",
					"metadata.spousedto.type":"jsononetoone",
					"metadata.housedto.type":"onetoone",
					"metadata.bookdto.type":"onetomany"
				}, {	//spousedto
					"executethis": "addwidmaster",
					"metadata.method": "spousedto",
					"wid": "spousedto",
					"datemarried": "date"
				}, {	//housedto
					"executethis": "addwidmaster",
					"metadata.method": "housedto",
					"wid": "housedto",
					"color": "string"
				},{		//bookdto
					"executethis": "addwidmaster",
					"metadata.method": "bookdto",
					"wid": "bookdto",
					"title": "string",
					"pages": "string",
					"metadata.pubhousedto.type":"manytooone"
				}, {	//pubhousedto
					"executethis": "addwidmaster",
					"metadata.method": "pubhousedto",
					"wid": "pubhousedto",
					"coname": "string",
					"establishdate": "date",
					"metadata.addressdto.type":"onetomany",
					"metadata.statedto.type":"manytooone",
					"metadata.ownerdto.type":"onetoone"
				}, {	//addressdto
					"executethis": "addwidmaster",
					"metadata.method": "addressdto",
					"wid": "addressdto",
					"city": "string",
					"add1": "string",
					"add2": "string"
				}, {	//statedto
					"executethis": "addwidmaster",
					"metadata.method": "statedto",
					"wid": "statedto",
					"statename": "string",
					"zipcode": "string"
				}, {	//ownerdto
					"executethis": "addwidmaster",
					"metadata.method": "ownerdto",
					"wid": "ownerdto",
					"name": "string"
				}, {	//authordto - spousedto
					"executethis": "addwidmaster",
					"wid": "rel_author_spouse",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "jsononetoone",
					"primarywid": "authordto",
					"primarymethod": "authordto",
					"secondarywid": "spousedto",
					"secondarymethod": "spousedto"
				}, {	//authordto - housedto
					"executethis": "addwidmaster",
					"wid": "rel_author_house",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					//"linktype": "onetomany",
                    "linktype": "onetoone",
					"primarywid": "authordto",
					"primarymethod": "authordto",
					"secondarywid": "housedto",
					"secondarymethod": "housedto"
				}, {	//authordto - bookdto
					"executethis": "addwidmaster",
					"wid": "rel_author_book",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "onetomany",
					"primarywid": "authordto",
					"primarymethod": "authordto",
					"secondarywid": "bookdto",
					"secondarymethod": "bookdto"
				}, {	//bookdto - pubhousedto
					"executethis": "addwidmaster",
					"wid": "rel_book_pubhouse",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "manytoone",	
					"primarywid": "bookdto",
					"primarymethod": "bookdto",
					"secondarywid": "pubhousedto",
					"secondarymethod": "pubhousedto"
				}, {	//pubhousedto - addressdto
					"executethis": "addwidmaster",
					"wid": "rel_pubhouse_address",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "onetomany",
					"primarywid": "pubhousedto",
					"primarymethod": "pubhousedto",
					"secondarywid": "addressdto",
					"secondarymethod": "addressdto"
				}, {	//pubhousedto - statedto
					"executethis": "addwidmaster",
					"wid": "rel_pubhouse_state",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "manytoone",
					"primarywid": "pubhousedto",
					"primarymethod": "pubhousedto",
					"secondarywid": "statedto",
					"secondarymethod": "statedto"
				}, {	//pubhousedto - ownerdto
					"executethis": "addwidmaster",
					"wid": "rel_pubhouse_owner",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "onetoone",
					"primarywid": "pubhousedto",
					"primarymethod": "pubhousedto",
					"secondarywid": "ownerdto",
					"secondarymethod": "ownerdto"
				}		
				];
				execute(executeList, function (err, res) {
					proxyprinttodiv("manytoonesetupdto addwidmaster dto res -- ", res, 99, true);
					cb1(err, res);
				});
			},
			function (cb2){
				var executeList = [{
					"executethis": "getwidmaster",
					"wid": "authordto",
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("manytoonesetupdto getwidmaster authordto", res, 99);
                    cb2(err, res);
				});
			}
		], function (err, res) {
			callback(err, res);
        });				
	}
	// authordto, bookdto, spousedto, housedto, pubhousedto, addressdto, statedto, ownerdto

	function manytoonedata(params, d, callback){
		async.series([
			function (cb2) {
				var executeobj = //[]
					{
						"executethis":"addwidmaster",
						"metadata.method": "authordto",
						"wid": "wid1",
						"name": "somedata222" + d,
						"age": "somedata"  + d,
						
						"spousedto.datemarried": "03/10/2014",
						
						"housedto.color": "purple"  + d,	
						
						"bookdto.title": "Book 1"  + d,
						"bookdto.pages": "300"  + d,

						"bookdto.pubhousedto.coname": "Company Name"  + d,
						"bookdto.pubhousedto.establishdate": "03/10/2014",

						"bookdto.pubhousedto.addressdto.0.city": "City Name" + d,
						"bookdto.pubhousedto.addressdto.0.add1": "Address1" + d,
						"bookdto.pubhousedto.addressdto.0.add2": "Address2" + d,

						"bookdto.pubhousedto.statedto.0.statename": "State Name + d",
						"bookdto.pubhousedto.statedto.0.zipcode": "Z 123456" + d,

						"bookdto.pubhousedto.ownerdto.0.name": "Owner Name" + d
					}
				//];
                if (params) {
                     executeobj=extend(true, executeobj, params)
                }
                var executeList=[];
                executeList.push(executeobj)

				execute(executeList, function (err, res) {
					proxyprinttodiv("manytoonetest addwidmaster data res -- ", res, 99);
					cb2(err, res);
				});
			}
		], function (err, res) {
			callback(err, res);
        });				
	}

	/*
		To create data for command.dtotype with add
	*/
	function createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, callback){
		proxyprinttodiv("createdataforcommanddtotypadd preambleflag--", preambleflag, 99);
		proxyprinttodiv("createdataforcommanddtotypadd preamble--", preamble, 99);
		proxyprinttodiv("createdataforcommanddtotypadd dtotypeflag--", dtotypeflag, 99);
		proxyprinttodiv("createdataforcommanddtotypadd dtotype--", dtotype, 99);
		
		if (params) {
			executeobj=extend(true, executeobj, params)
		}				
		if(preamble && preambleflag>=0 && preamble[preambleflag]){
			for(key in executeobj){
				if(key!=="executethis" && key!="metadata.method" && key!="wid"){
					var preamblekey = preamble[preambleflag]+"."+key;				
					executeobj[preamblekey]=executeobj[key];
					delete executeobj[key];
				}
			}
		}
		proxyprinttodiv("createdataauthor executeobj after preambleflag-- ", executeobj, 99);
		if(dtotype && dtotypeflag>=0 && dtotype[dtotypeflag]){
			executeobj["command.dtotype"]=dtotype[dtotypeflag];
		}
		execute(executeobj, function (err, res) {
			proxyprinttodiv("createdataforcommanddtotypadd addwidmaster data res -- ", res, 99);
			callback(err, res);
		});
	}
	
	/*
		Global Variable 
	*/
	var preamble=["spousedto", "housedto", "bookdto", "bookdto.pubhousedto", "bookdto.pubhousedto.addressdto.0", "bookdto.pubhousedto.statedto.0", "bookdto.pubhousedto.ownerdto.0"];
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdataauthor(params, preambleflag, dtotypeflag, d, callback){
		var executeobj ={
			"executethis":"addwidmaster",
			"metadata.method": "authordto",
			"wid": "wid1",
			"name": "somedata222" + d,
			"age": "somedata"  + d
		};
        //var preamble=null;
        var dtotype=["authordto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
            callback(err, res);
		});			
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdataspouse(params, preambleflag, dtotypeflag, d, callback){
		var executeobj = 
				{
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",
				
					"datemarried": "03/10/2014"
				};
        //var preamble=["spousedto"];
        var dtotype=["spousedto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function(err, res){
			callback(err, res);
		});				
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdatahouse(params, preambleflag, dtotypeflag, d, callback){
			var executeobj = 
				{
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",
				
					"color": "purple"  + d
				};
        //var preamble=["housedto"];
        var dtotype=["housedto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
			callback(err, res);
		});				
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdatabook(params, preambleflag, dtotypeflag, d, callback){
			var executeobj = 
				{
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",

					"title": "Book 1"  + d,
					"pages": "300"  + d,
				};
        //var preamble=["bookdto"];
        var dtotype=["bookdto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
			callback(err, res);
		});				
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdatapubhouse(params, preambleflag, dtotypeflag, d, callback){
		var executeobj = 
				{
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",

					"coname": "Company Name"  + d,
					"establishdate": "03/10/2014",
				};
        //var preamble=["bookdto.pubhousedto"];
        var dtotype =["pubhousedto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
			callback(err, res);
		});			
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdataaddress(params, preambleflag, dtotypeflag, d, callback){
		var executeobj =
				 {
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",

					"city": "City Name" + d,
					"add1": "Address1" + d,
					"add2": "Address2" + d,
				};
        //var preamble=["bookdto.pubhousedto.addressdto.0"];
        var dtotype =["addressdto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
			callback(err, res);
		});			
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdatastate(params, preambleflag, dtotypeflag, d, callback){
		var executeobj =
				{
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",

					"statename": "State Name + d",
					"zipcode": "Z 123456" + d,
				};
        //var preamble=["bookdto.pubhousedto.statedto.0"];
        var dtotype =["statedto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
			callback(err, res);
		});			
	 }
	
	 /*
	 	To add data for commanddtotypeaddtest
	 */
	 function createdataowner(params, preambleflag, dtotypeflag, d, callback){
	   var executeobj =
				{
					"executethis":"addwidmaster",
					"metadata.method": "authordto",
					"wid": "wid1",

					"name": "Owner Name" + d
				};
        //var preamble=["bookdto.pubhousedto.ownerdto.0"];
        var dtotype =["ownerdto"];
		createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
			callback(err, res);
		});				
	 }
	
	 /*
	 	test command.dtotype= should get the results at different levels …try a get with dtotype=bookdto, with dtotype=test
	 */
	 exports.commanddtotypeaddtest1 = commanddtotypeaddtest1 = function commanddtotypeaddtest1(p, callback) {
         params={};
		 var preamble = [];
		 manytoonesetupdto(function (err, res){
			createdataauthor(params, null, 0, p.a, function (err, res){
				createdataspouse(params, 0, 0, p.b, function (err, res){
					createdatahouse(params, 1, 0, p.c, function (err, res){
						createdatabook(params, 2, 0, p.d, function (err, res){
							createdatapubhouse(params, 3, 0, p.e, function (err, res){
								createdataaddress(params, 4, 0, p.f, function (err, res){
									createdatastate(params, 5, 0, p.g, function (err, res){
										createdataowner(params, 6, 0, p.h, function (err, res){
                                            var executeobj = {
												"executethis": "getwidmaster",
												"wid": "wid1"
                                            };
                                             execute(executeobj, function (err, res) {
                                                 proxyprinttodiv("Function getwidmaster wid1 ", res, 99, true);
                                                 callback(err, res);
                                            });
										});
									});	
								});
							});
						});	
					});
				});
			});
         });     
     }


	 
	 /*
	 	test command.dtotype= should get the results at different levels …try a get with dtotype=bookdto, with dtotype=test
	 */
	 exports.add1big = add1big = function add1big(params, callback) {
		commanddtotypeaddtest1({"a":"1", "b":"2", "c":"3", "d":"4", "e":"5", "f":"6", "g":"7", "h":"8"},function (err, res){
            var executeobj = {
				"executethis": "getwidmaster",
				"wid": "wid1"
            };
            execute(executeobj, function (err, res) {
                 proxyprinttodiv("Function getwidmaster wid1 ", res, 99, true);
                 callback(err, res);
             });
		});
     }

    exports.add3big = add3big = function add3big(params, callback) {
		commanddtotypeaddtest1({"a":"1", "b":"2", "c":"3", "d":"4", "e":"5", "f":"6", "g":"7", "h":"8"},function (err, res){
			commanddtotypeaddtest1({"a":"a1", "b":"a2", "c":"a3", "d":"a4", "e":"a5", "f":"a6", "g":"a7", "h":"a8"},function (err, res){
                commanddtotypeaddtest1({"a":"b1", "b":"b2", "c":"b3", "d":"b4", "e":"b5", "f":"b6", "g":"b7", "h":"b8"},function (err, res){
                    async.series([
						/*function (cb1) {
							var executeobj = {
								"executethis": "getwidmaster",
								"wid": "wid1",
								"command.dtotype":"authordto"
							};
							execute(executeobj, function (err, res) {
								 proxyprinttodiv("Function add3big wid1 with command.dtotype=authordto", res, 99, true);
								 cb1(err, res);
							});
						},*/
						function (cb2) {
							var executeobj = {
								"executethis": "getwidmaster",
								"wid": "wid1",
								"command.dtotype":"spousedto"
							};
							execute(executeobj, function (err, res) {
								 proxyprinttodiv("Function add3big wid1 with command.dtotype=spousedto", res, 99, true);
								 cb2(err, res);
							});
						}
					], function (err, res) {
						 proxyprinttodiv('Function commanddtotypegettest result Full res', res, 99);
						 callback(err, res); 
					 }); 		
                });
            }); 
        });
     }