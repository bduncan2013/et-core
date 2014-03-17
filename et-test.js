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
		
    //         /*
    //     To create data for command.dtotype with add
    // */
    // function createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, callback){
    //     proxyprinttodiv("createdataforcommanddtotypadd preambleflag--", preambleflag, 99);
    //     proxyprinttodiv("createdataforcommanddtotypadd preamble--", preamble, 99);
    //     proxyprinttodiv("createdataforcommanddtotypadd dtotypeflag--", dtotypeflag, 99);
    //     proxyprinttodiv("createdataforcommanddtotypadd dtotype--", dtotype, 99);
        
    //     if (params) {
    //         executeobj=extend(true, executeobj, params)
    //     }               
    //     if(preamble && preambleflag>=0 && preamble[preambleflag]){
    //         for(key in executeobj){
    //             if(key!=="executethis" && key!="metadata.method" && key!="wid"){
    //                 var preamblekey = preamble[preambleflag]+"."+key;               
    //                 executeobj[preamblekey]=executeobj[key];
    //                 delete executeobj[key];
    //             }
    //         }
    //     }
    //     proxyprinttodiv("createdataauthor executeobj after preambleflag-- ", executeobj, 99);
    //     if(dtotype && dtotypeflag>=0 && dtotype[dtotypeflag]){
    //         executeobj["command.dtotype"]=dtotype[dtotypeflag];
    //     }
    //     execute(executeobj, function (err, res) {
    //         proxyprinttodiv("createdataforcommanddtotypadd addwidmaster data res -- ", res, 99);
    //         callback(err, res);
    //     });
    // }
    
    // /*
    //     Global Variable 
    // */
    // var preamble=["spousedto", "housedto", "bookdto", "bookdto.pubhousedto", "bookdto.pubhousedto.addressdto.0", "bookdto.pubhousedto.statedto.0", "bookdto.pubhousedto.ownerdto.0"];
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdataauthor(params, preambleflag, dtotypeflag, d, callback){
    //     var executeobj ={
    //         "executethis":"addwidmaster",
    //         "metadata.method": "authordto",
    //         "wid": "wid1",
    //         "name": "somedata222" + d,
    //         "age": "somedata"  + d
    //     };
    //     //var preamble=null;
    //     var dtotype=["authordto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });         
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdataspouse(params, preambleflag, dtotypeflag, d, callback){
    //     var executeobj = 
    //             {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",
                
    //                 "datemarried": "03/10/2014"
    //             };
    //     //var preamble=["spousedto"];
    //     var dtotype=["spousedto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function(err, res){
    //         callback(err, res);
    //     });             
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdatahouse(params, preambleflag, dtotypeflag, d, callback){
    //         var executeobj = 
    //             {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",
                
    //                 "color": "purple"  + d
    //             };
    //     //var preamble=["housedto"];
    //     var dtotype=["housedto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });             
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdatabook(params, preambleflag, dtotypeflag, d, callback){
    //         var executeobj = 
    //             {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",

    //                 "title": "Book 1"  + d,
    //                 "pages": "300"  + d,
    //             };
    //     //var preamble=["bookdto"];
    //     var dtotype=["bookdto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });             
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdatapubhouse(params, preambleflag, dtotypeflag, d, callback){
    //     var executeobj = 
    //             {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",

    //                 "coname": "Company Name"  + d,
    //                 "establishdate": "03/10/2014",
    //             };
    //     //var preamble=["bookdto.pubhousedto"];
    //     var dtotype =["pubhousedto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });         
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdataaddress(params, preambleflag, dtotypeflag, d, callback){
    //     var executeobj =
    //              {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",

    //                 "city": "City Name" + d,
    //                 "add1": "Address1" + d,
    //                 "add2": "Address2" + d,
    //             };
    //     //var preamble=["bookdto.pubhousedto.addressdto.0"];
    //     var dtotype =["addressdto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });         
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdatastate(params, preambleflag, dtotypeflag, d, callback){
    //     var executeobj =
    //             {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",

    //                 "statename": "State Name + d",
    //                 "zipcode": "Z 123456" + d,
    //             };
    //     //var preamble=["bookdto.pubhousedto.statedto.0"];
    //     var dtotype =["statedto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });         
    //  }
    
    //  /*
    //     To add data for commanddtotypeaddtest
    //  */
    //  function createdataowner(params, preambleflag, dtotypeflag, d, callback){
    //    var executeobj =
    //             {
    //                 "executethis":"addwidmaster",
    //                 "metadata.method": "authordto",
    //                 "wid": "wid1",

    //                 "name": "Owner Name" + d
    //             };
    //     //var preamble=["bookdto.pubhousedto.ownerdto.0"];
    //     var dtotype =["ownerdto"];
    //     createdataforcommanddtotypadd(params, preambleflag, preamble, dtotypeflag, dtotype, executeobj, function (err, res){
    //         callback(err, res);
    //     });             
    //  }

    // function manytoonedata(params, d, callback){
    //     async.series([
    //         function (cb2) {
    //             var executeobj = //[]
    //                 {
    //                     "executethis":"addwidmaster",
    //                     "metadata.method": "authordto",
    //                     "wid": "wid1",
    //                     "name": "somedata222" + d,
    //                     "age": "somedata"  + d,
                        
    //                     "spousedto.datemarried": "03/10/2014",
                        
    //                     "housedto.color": "purple"  + d,    
                        
    //                     "bookdto.title": "Book 1"  + d,
    //                     "bookdto.pages": "300"  + d,

    //                     "bookdto.pubhousedto.coname": "Company Name"  + d,
    //                     "bookdto.pubhousedto.establishdate": "03/10/2014",

    //                     "bookdto.pubhousedto.addressdto.0.city": "City Name" + d,
    //                     "bookdto.pubhousedto.addressdto.0.add1": "Address1" + d,
    //                     "bookdto.pubhousedto.addressdto.0.add2": "Address2" + d,

    //                     "bookdto.pubhousedto.statedto.0.statename": "State Name + d",
    //                     "bookdto.pubhousedto.statedto.0.zipcode": "Z 123456" + d,

    //                     "bookdto.pubhousedto.ownerdto.0.name": "Owner Name" + d
    //                 }
    //             //];
    //             if (params) {
    //                  executeobj=extend(true, executeobj, params)
    //             }
    //             var executeList=[];
    //             executeList.push(executeobj)

    //             execute(executeList, function (err, res) {
    //                 proxyprinttodiv("manytoonetest addwidmaster data res -- ", res, 99);
    //                 cb2(err, res);
    //             });
    //         }
    //     ], function (err, res) {
    //         callback(err, res);
    //     });             
    // }

 
    //  /*
    //     test command.dtotype= should get the results at different levels …try a get with dtotype=bookdto, with dtotype=test
    //  */
    //  exports.commanddtotypeaddtest1 = commanddtotypeaddtest1 = function commanddtotypeaddtest1(p, callback) {
    //      params={};
    //      var preamble = [];
    //      manytoonesetupdto(params, function (err, res){
    //         createdataauthor(params, null, 0, p.a, function (err, res){
    //             createdataspouse(params, 0, 0, p.b, function (err, res){
    //                 createdatahouse(params, 1, 0, p.c, function (err, res){
    //                     createdatabook(params, 2, 0, p.d, function (err, res){
    //                         createdatapubhouse(params, 3, 0, p.e, function (err, res){
    //                             createdataaddress(params, 4, 0, p.f, function (err, res){
    //                                 createdatastate(params, 5, 0, p.g, function (err, res){
    //                                     createdataowner(params, 6, 0, p.h, function (err, res){
    //                                         var executeobj = {
    //                                             "executethis": "getwidmaster",
    //                                             "wid": "wid1"
    //                                         };
    //                                          execute(executeobj, function (err, res) {
    //                                              proxyprinttodiv("Function getwidmaster wid1 ", res, 99, true);
    //                                              callback(err, res);
    //                                         });
    //                                     });
    //                                 }); 
    //                             });
    //                         });
    //                     }); 
    //                 });
    //             });
    //         });
    //      });     
    //  }


     
    //  /*
    //     test command.dtotype= should get the results at different levels …try a get with dtotype=bookdto, with dtotype=test
    //  */
    //  exports.add1big = add1big = function add1big(params, callback) {
    //     commanddtotypeaddtest1({"a":"1", "b":"2", "c":"3", "d":"4", "e":"5", "f":"6", "g":"7", "h":"8"},function (err, res){
    //         var executeobj = {
    //             "executethis": "getwidmaster",
    //             "wid": "wid1"
    //         };
    //         execute(executeobj, function (err, res) {
    //              proxyprinttodiv("Function getwidmaster wid1 ", res, 99, true);
    //              callback(err, res);
    //          });
    //     });
    //  }

    // exports.add3big = add3big = function add3big(params, callback) {
    //     commanddtotypeaddtest1({"a":"1", "b":"2", "c":"3", "d":"4", "e":"5", "f":"6", "g":"7", "h":"8"},function (err, res){
    //         commanddtotypeaddtest1({"a":"a1", "b":"a2", "c":"a3", "d":"a4", "e":"a5", "f":"a6", "g":"a7", "h":"a8"},function (err, res){
    //             commanddtotypeaddtest1({"a":"b1", "b":"b2", "c":"b3", "d":"b4", "e":"b5", "f":"b6", "g":"b7", "h":"b8"},function (err, res){
    //                 async.series([
    //                     /*function (cb1) {
    //                         var executeobj = {
    //                             "executethis": "getwidmaster",
    //                             "wid": "wid1",
    //                             "command.dtotype":"authordto"
    //                         };
    //                         execute(executeobj, function (err, res) {
    //                              proxyprinttodiv("Function add3big wid1 with command.dtotype=authordto", res, 99, true);
    //                              cb1(err, res);
    //                         });
    //                     },*/
    //                     function (cb2) {
    //                         var executeobj = {
    //                             "executethis": "getwidmaster",
    //                             "wid": "wid1",
    //                             "command.dtotype":"spousedto"
    //                         };
    //                         execute(executeobj, function (err, res) {
    //                              proxyprinttodiv("Function add3big wid1 with command.dtotype=spousedto", res, 99, true);
    //                              cb2(err, res);
    //                         });
    //                     }
    //                 ], function (err, res) {
    //                      proxyprinttodiv('Function commanddtotypegettest result Full res', res, 99);
    //                      callback(err, res); 
    //                  });        
    //             });
    //         }); 
    //     });
    //  }

	/*
		To add dtos, relationships for manytoonetest
	*/
	function manytoonesetupdto(inherit, dtotype, callback){
        if (Object.keys(inherit).length === 0) {
            inherit =
               {"authordtodefault":[],
                "spousedto":[],
                "housedto":[],
                "bookdto":[], 
                "pubhousedto":[],
                "addressdto":[],
                "statedto":[],
                "ownerdto":[],
                "authordtooverride":[],
                "spousedtooverride":[],
                "housedtooverride":[],
                "bookdtooverride":[],
                "pubhousedtooverride":[],
                "addressdtooverride":[],
                "statedtooverride":[],
                "ownerdtooverride":[]
                }
            }

        var executeList = 
                [
            {       //authordto
                "executethis": "addwidmaster",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "metadata.spousedto.type":"jsononetoone",
                "metadata.housedto.type":"onetoone",
                "metadata.bookdto.type":"onetomany",
                "metadata.inherit.default":inherit.authordtodefault,
                "metadata.inherit.override":inherit.authordtooverride
            }, {    //spousedto
                "executethis": "addwidmaster",
                "metadata.method": "spousedto",
                "wid": "spousedto",
                "datemarried": "date",
                "metadata.inherit.default":inherit.spousedtodefault,
                "metadata.inherit.override":inherit.spousedtooverride
            }, {    //housedto
                "executethis": "addwidmaster",
                "metadata.method": "housedto",
                "wid": "housedto",
                "color": "string",
                "metadata.inherit.default":inherit.housedtodefault,
                "metadata.inherit.override":inherit.housedtooverride
            },{     //bookdto
                "executethis": "addwidmaster",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "pages": "string",
                "metadata.pubhousedto.type":"manytooone",
                "metadata.inherit.default":inherit.bookdtodefault,
                "metadata.inherit.override":inherit.bookdtooverride
            }, {    //pubhousedto
                "executethis": "addwidmaster",
                "metadata.method": "pubhousedto",
                "wid": "pubhousedto",
                "coname": "string",
                "establishdate": "date",
                "metadata.addressdto.type":"onetomany",
                "metadata.statedto.type":"manytooone",
                "metadata.ownerdto.type":"onetoone",
                "metadata.inherit.default":inherit.pubhousedtodefault,
                "metadata.inherit.override":inherit.pubhousedtooverride
            }, {    //addressdto
                "executethis": "addwidmaster",
                "metadata.method": "addressdto",
                "wid": "addressdto",
                "city": "string",
                "add1": "string",
                "add2": "string",
                "metadata.inherit.default":inherit.addressdtodefault,
                "metadata.inherit.override":inherit.addressdtooverride
            }, {    //statedto
                "executethis": "addwidmaster",
                "metadata.method": "statedto",
                "wid": "statedto",
                "statename": "string",
                "zipcode": "string",
                "metadata.inherit.default":inherit.statedtodefault,
                "metadata.inherit.override":inherit.statedtooverride
            }, {    //ownerdto
                "executethis": "addwidmaster",
                "metadata.method": "ownerdto",
                "wid": "ownerdto",
                "name": "string",
                "metadata.inherit.default":inherit.owenerdtodtodefault,
                "metadata.inherit.override":inherit.owenerdtooverride
            }, {    //authordto - spousedto
                "executethis": "addwidmaster",
                "wid": "rel_author_spouse",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "jsononetoone",
                "primarywid": "authordto",
                "primarymethod": "authordto",
                "secondarywid": "spousedto",
                "secondarymethod": "spousedto"
            }, {    //authordto - housedto
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
            }, {    //authordto - bookdto
                "executethis": "addwidmaster",
                "wid": "rel_author_book",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetomany",
                "primarywid": "authordto",
                "primarymethod": "authordto",
                "secondarywid": "bookdto",
                "secondarymethod": "bookdto"
            }, {    //bookdto - pubhousedto
                "executethis": "addwidmaster",
                "wid": "rel_book_pubhouse",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "manytoone",    
                "primarywid": "bookdto",
                "primarymethod": "bookdto",
                "secondarywid": "pubhousedto",
                "secondarymethod": "pubhousedto"
            }, {    //pubhousedto - addressdto
                "executethis": "addwidmaster",
                "wid": "rel_pubhouse_address",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetomany",
                "primarywid": "pubhousedto",
                "primarymethod": "pubhousedto",
                "secondarywid": "addressdto",
                "secondarymethod": "addressdto"
            }, {    //pubhousedto - statedto
                "executethis": "addwidmaster",
                "wid": "rel_pubhouse_state",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "manytoone",
                "primarywid": "pubhousedto",
                "primarymethod": "pubhousedto",
                "secondarywid": "statedto",
                "secondarymethod": "statedto"
            }, {    //pubhousedto - ownerdto
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

        if (dtotype && dtotype==1) {
        executeList = 
        [
            {       //authordto
                "executethis": "addwidmaster",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "metadata.spousedto.type":"jsononetoone",
                "metadata.housedto.type":"onetoone",
                "metadata.bookdto.type":"onetomany",
                "metadata.inherit.default":inherit.authordtodefault,
                "metadata.inherit.override":inherit.authordtooverride
            }, {    //spousedto
                "executethis": "addwidmaster",
                "metadata.method": "spousedto",
                "wid": "spousedto",
                "datemarried": "date",
                "metadata.inherit.default":inherit.spousedtodefault,
                "metadata.inherit.override":inherit.spousedtooverride
            }, {    //housedto
                "executethis": "addwidmaster",
                "metadata.method": "housedto",
                "wid": "housedto",
                "color": "string",
                "metadata.inherit.default":inherit.housedtodefault,
                "metadata.inherit.override":inherit.housedtooverride
            },{     //bookdto
                "executethis": "addwidmaster",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "pages": "string",
                "metadata.pubhousedto.type":"manytooone",
                "metadata.inherit.default":inherit.bookdtodefault,
                "metadata.inherit.override":inherit.bookdtooverride
            }, {    //pubhousedto
                "executethis": "addwidmaster",
                "metadata.method": "pubhousedto",
                "wid": "pubhousedto",
                "coname": "string",
                "establishdate": "date",
                "metadata.addressdto.type":"onetomany",
                "metadata.statedto.type":"manytooone",
                "metadata.ownerdto.type":"onetoone",
                "metadata.inherit.default":inherit.pubhousedtodefault,
                "metadata.inherit.override":inherit.pubhousedtooverride
            }, {    //addressdto
                "executethis": "addwidmaster",
                "metadata.method": "addressdto",
                "wid": "addressdto",
                "city": "string",
                "add1": "string",
                "add2": "string",
                "metadata.inherit.default":inherit.addressdtodefault,
                "metadata.inherit.override":inherit.addressdtooverride
            }, {    //statedto
                "executethis": "addwidmaster",
                "metadata.method": "statedto",
                "wid": "statedto",
                "statename": "string",
                "zipcode": "string",
                "metadata.inherit.default":inherit.statedtodefault,
                "metadata.inherit.override":inherit.statedtooverride
            }, {    //ownerdto
                "executethis": "addwidmaster",
                "metadata.method": "ownerdto",
                "wid": "ownerdto",
                "name": "string",
                "metadata.inherit.default":inherit.owenerdtodtodefault,
                "metadata.inherit.override":inherit.owenerdtooverride
            }, {    //authordto - spousedto
                "executethis": "addwidmaster",
                "wid": "rel_author_spouse",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "jsononetoone",
                "primarywid": "authordto",
                "primarymethod": "authordto",
                "secondarywid": "spousedto",
                "secondarymethod": "spousedto"
            }, {    //authordto - housedto
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
            }, {    //authordto - bookdto
                "executethis": "addwidmaster",
                "wid": "rel_author_book",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetomany",
                "primarywid": "authordto",
                "primarymethod": "authordto",
                "secondarywid": "bookdto",
                "secondarymethod": "bookdto"
            }, {    //bookdto - pubhousedto
                "executethis": "addwidmaster",
                "wid": "rel_book_pubhouse",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "manytoone",    
                "primarywid": "bookdto",
                "primarymethod": "bookdto",
                "secondarywid": "pubhousedto",
                "secondarymethod": "pubhousedto"
            }, {    //pubhousedto - addressdto
                "executethis": "addwidmaster",
                "wid": "rel_pubhouse_address",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetomany",
                "primarywid": "pubhousedto",
                "primarymethod": "pubhousedto",
                "secondarywid": "addressdto",
                "secondarymethod": "addressdto"
            }, {    //pubhousedto - statedto
                "executethis": "addwidmaster",
                "wid": "rel_pubhouse_state",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "manytoone",
                "primarywid": "pubhousedto",
                "primarymethod": "pubhousedto",
                "secondarywid": "statedto",
                "secondarymethod": "statedto"
            }, {    //pubhousedto - ownerdto
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
        }

		async.series([
			function (cb1) {

				execute(executeList, function (err, res) {
					proxyprinttodiv("manytoonesetupdto addwidmaster dto res -- ", res, 1, true);
					cb1(err, res);
				});
			},
			function (cb2){
				var executeList = [{
					"executethis": "getwidmaster",
					"wid": "authordto",
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("getwidmaster authordto", res, 99);
                    cb2(err, res);
				});
			}
		], function (err, res) {
			callback(err, res);
        });				
	}
	// authordto, bookdto, spousedto, housedto, pubhousedto, addressdto, statedto, ownerdto

   

    //   function printlistmany(printlist, callback) {
    //     var executeobj = {};
    //     async.mapSeries(printlist, function (eachprint, cbMap) {
    //         executeobj={};
    //         executeobj["executethis"] = "getwidmaster";
    //         executeobj["wid"] = eachprint["wid"];
    //         executeobj["command.dtotype"]=eachprint["command.dtotype"];
    //         execute(executeobj, function (err, res) {
    //             proxyprinttodiv( eachprint["wid"] + " with command.dtotype="+eachprint["command.dtotype"], res, 99, true);
    //             cbMap(null);
    //         }); 
    //     },                 
    //     function (err, res) {
    //         callback(null, {})
    //         };
    //     );
    // }

    function printlistmany(printlist, callback){
        var executeobj = {};
        async.mapSeries(printlist, function (eachprint, cbMap) {
            executeobj={};
            executeobj["executethis"]= "getwidmaster";
            executeobj["wid"]=eachprint["wid"];
            executeobj["command.dtotype"]=eachprint["command.dtotype"];
            execute(executeobj, function (err, res) {
                proxyprinttodiv( eachprint["wid"] + " with command.dtotype="+eachprint["command.dtotype"], res, 99, true);
                cbMap(null);
                //callback(err, res);
            }); 
        } 
        , function (err, res) {callback(null,null)}
        );
    }


    // ADD: How many to add
    // ADD: parentparmkey, c, 
    // ADD: childparmkey, d: (let system select child wid names, we select child wid names)
    // ADD: relativepreamble (childs do not have preamble / childs do have preamble)
    // ADD: relativedtotype (don’t use command.dtotype / use command.dtotype)
    // GET: relgetlist 
    //     get each get each child with one parent w/o dto, 
    //     get each child with one parent with dto, 
    //     get each child by childname w/o dto
    //     get each child by childname with dto, 
    function addauthorrecord(parentparmkey, c, childparmkey, d, relativepreamble, relativedtotype, relgetlist, callback){
        var parent=[{"metadata.method": "authordto","wid": "wid1"+c},
                    {"metadata.method": "authordto","wid": "wid2"+c},
                    {"metadata.method": "authordto","wid": "wid3"+c}];
        var child=[
                {"name":"somedata222"+d, "age":"somedata"+d},
                {"datemarried": "03/10/2014"+d},
                {"color": "blue"+d},
                {"title": "Book 1"+d,"pages":"300"+d},
                {"coname": "Company Name"+d, "establishdate":"03/10/2014"+d},
                {"city":"City Name"+d,"add1":"Address1"+d, "add2":"Address2"+d},
                {"statename":"State Name"+d, "zipcode": "Z 123456"+d},
                {"name":"Owner Name"+d},
                {"name":"somedata222"+d, "age":"somedata"+d, "wid":"wid1A"+d},
                {"datemarried": "03/10/2014"+d, "wid":"wid1S"+d},
                {"color": "blue"+d, "wid":"wid1H"+d},
                {"title": "Book 1"+d,"pages":"300"+d, "wid":"wid1B"+d},
                {"coname": "Company Name"+d, "establishdate":"03/10/2014", "wid":"wid1P"+d},
                {"city":"City Name"+d,"add1":"Address1"+d, "add2":"Address2", "wid":"wid1Add"+d},
                {"statename":"State Name"+d, "zipcode": "Z 123456"+d, "wid":"wid1S"+d},
                {"name":"Owner Name"+d, "wid":"wid1O"+d}
            ];
        
        var preamble=["spousedto", "housedto", "bookdto", "bookdto.pubhousedto", "bookdto.pubhousedto.addressdto.0", "bookdto.pubhousedto.statedto.0", "bookdto.pubhousedto.ownerdto.0"];
        
        var dtotype=["authordto","spousedto", "housedto", "bookdto",  "pubhousedto","addressdto", "statedto", "ownerdto"];
        
        var printlist=[
            [
                {"wid":"wid1"+c, "command.dtotype":""},
                
                {"wid":"wid1"+c, "command.dtotype":"authordto"},
                {"wid":"wid1"+c, "command.dtotype":"spousedto"},
                {"wid":"wid1"+c, "command.dtotype":"housedto"},
                {"wid":"wid1"+c, "command.dtotype":"bookdto"},
                {"wid":"wid1"+c, "command.dtotype":"pubhousedto"},
                {"wid":"wid1"+c, "command.dtotype":"addressdto"},
                {"wid":"wid1"+c, "command.dtotype":"statedto"},
                {"wid":"wid1"+c, "command.dtotype":"ownerdto"},

                {"wid":"wid1A"+d, "command.dtotype":""},
                {"wid":"wid1S"+d, "command.dtotype":""},
                {"wid":"wid1H"+d, "command.dtotype":""},
                {"wid":"wid1B"+d, "command.dtotype":""},
                {"wid":"wid1P"+d, "command.dtotype":""},
                {"wid":"wid1Add"+d, "command.dtotype":""},
                {"wid":"wid1S"+d, "command.dtotype":""},
                {"wid":"wid1O"+d, "command.dtotype":""},

                {"wid":"wid1A"+d, "command.dtotype":"authordto"},
                {"wid":"wid1S"+d, "command.dtotype":"spousedto"},
                {"wid":"wid1H"+d, "command.dtotype":"housedto"},
                {"wid":"wid1B"+d, "command.dtotype":"bookdto"},
                {"wid":"wid1P"+d, "command.dtotype":"pubhousedto"},
                {"wid":"wid1Add"+d, "command.dtotype":"addressdto"},
                {"wid":"wid1S"+d, "command.dtotype":"statedto"},
                {"wid":"wid1O"+d, "command.dtotype":"ownerdto"}
            ],
                [
                {"wid":"wid1"+c, "command.dtotype":""},
                
                {"wid":"wid1"+c, "command.dtotype":"authordto"},
                {"wid":"wid1"+c, "command.dtotype":"spousedto"},
                {"wid":"wid1"+c, "command.dtotype":"housedto"},
                {"wid":"wid1"+c, "command.dtotype":"bookdto"},
                {"wid":"wid1"+c, "command.dtotype":"pubhousedto"},
                {"wid":"wid1"+c, "command.dtotype":"addressdto"},
                {"wid":"wid1"+c, "command.dtotype":"statedto"},
                {"wid":"wid1"+c, "command.dtotype":"ownerdto"},
            ],
            [
                {"wid":"wid1"+c, "command.dtotype":""}
            ],
            [
                {"wid":"wid2"+c, "command.dtotype":""}
            ],
            [
                {"wid":"wid3"+c, "command.dtotype":""}
            ]
        ];
        
        var executeobj=child[childparmkey];
        //proxyprinttodiv("Function addauthorrecord executeobj after child ", executeobj, 99, true);
        if(relativepreamble>=0 && preamble[relativepreamble]){
            for(key in executeobj){
                var preamblekey = preamble[relativepreamble]+"."+key;   
                //proxyprinttodiv("Function addauthorrecord executeobj preamblekey ", preamblekey, 99, true);
                executeobj[preamblekey]=executeobj[key];
                delete executeobj[key];
            }
        }
       // proxyprinttodiv("Function addauthorrecord executeobj after preamble ", executeobj, 99, true);
                
        if (parentparmkey>=0) {
            executeobj=extend(true, executeobj, parent[parentparmkey])
        }
        //proxyprinttodiv("Function addauthorrecord executeobj after parent ", executeobj, 99, true);
        
        if (relativedtotype>=0){
            executeobj["command.dtotype"]=dtotype[relativedtotype];
        }
        //proxyprinttodiv("Function addauthorrecord executeobj after dtotype ", executeobj, 99, true);
                
        executeobj["executethis"]="addwidmaster";
        proxyprinttodiv("data add before execute = ", executeobj, 99, true);	
        execute(executeobj, function (err, res) {
            proxyprinttodiv("data add after execute =", res, 99, true);
            printlistmany(printlist[relgetlist], function (err, res) {
                callback(err, res);
            });
        });
    }
	
	//This just tests setting up a dto with a many-to-many relationship with another dto. Creates the dtos
	//and a bi-directional relationship between them.
	exports.manytomany1 = manytomany1 = function manytomany1(params, callback){
	
			execute([{// Create the studentdto
                    "executethis": "addwidmaster",
                    "wid": "studentdto",
                    "metadata.method": "studentdto",
                    "name":"string",
					"major":"string",
					"metadata.teacherdto.type":"manytomany"
					},{// Create the teacherdto
                    "executethis": "addwidmaster",
                    "wid": "teacherdto",
                    "metadata.method": "teacherdto",
                    "name":"string",
					"department":"string",
					"metadata.studentdto.type":"manytomany"
					},{ // relate student to teacher
                    "executethis": "addwidmaster",
					"wid": "rel_student_to_teacher",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "manytomany",
					"primarywid": "studentdto",
					"primarymethod": "studentdto",
					"secondarywid": "teacherdto",
					"secondarymethod": "teacherdto"
					},{ // relate teacher to student
                    "executethis": "addwidmaster",
					"wid": "rel_teacher_to_student",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "manytomany",
					"primarywid": "teacherdto",
					"primarymethod": "teacherdto",
					"secondarywid": "studentdto",
					"secondarymethod": "studentdto"
					}]);
    }
	
	
	// This uses the dtos and relationships setup in manytomany1() to test a many-to-many relationship
	// between a student and teacher.
	exports.manytomanystest1 = manytomanytest1 = function manytomanytest1(params, callback){
	
			manytomany1();
			
			execute([{// Create the studentdto
                    "executethis": "addwidmaster",
                    "wid": "student1",
                    "metadata.method": "studentdto",
                    "name":"Jason",
					"major":"Math",
					},{// Create the teacherdto
                    "executethis": "addwidmaster",
                    "wid": "teacher1",
                    "metadata.method": "teacherdto",
                    "name":"Katie",
					"department":"Math & Science",
					"metadata.studentdto.0":"student1"
					}]);
    }
	
	// This is a simple inheritance default test using the student dto setup in manytomany1()
	exports.inheritdefault1 = inheritdefault1 = function inheritdefault1(params, callback){
	
			manytomany1();
			
			execute([{// Create the default wid
                    "executethis": "addwidmaster",
                    "wid": "studefault",
                    "metadata.method": "studentdto",
                    "name":"Brett",
					"major":"Math",
					},{// Create a student and inherit from studefault
                    "executethis": "addwidmaster",
                    "wid": "cory",
                    "metadata.method": "studentdto",
                    "name":"Cory",
					"metadata.inherit.default.0":"studefault"
					}]);
					
			// this should result in a wid returned with as such {"wid":"cory","metadata.method":"studentdto","name":"Cory","major":"Math"}
    }
	
	// This is a simple inheritance override test using the student dto setup in manytomany1()
	exports.inheritoverride1 = inheritoverride1 = function inheritoverride1(params, callback){
	
			manytomany1();
			
			execute([{// Create the default wid
                    "executethis": "addwidmaster",
                    "wid": "studefault2",
                    "metadata.method": "studentdto",
                    "name":"Sarah",
					"major":"Nursing",
					},{// Create a student and inherit from studefault
                    "executethis": "addwidmaster",
                    "wid": "sarah",
                    "metadata.method": "studentdto",
                    "name":"Brittany",
					"metadata.inherit.override.0":"studefault2"
					}]);
					
			// this should result in a wid returned with as such {"wid":"sarah","metadata.method":"studentdto","name":"Sarah","major":"Nursing"}
    }
	
	// This just tests setting up a dto to point to itself. Creates a dto and a many-to-many relationship with
	// itself.
	exports.manytomanyself1 = manytomanyself1 = function manytomanyself1(params, callback){
	
			execute([{// Create the groupdto
                    "executethis": "addwidmaster",
                    "wid": "groupdto1",
                    "metadata.method": "groupdto1",
                    "name":"string",
					"metadata.groupdto1.type":"manytomany"
                },{ // Create the groupdto relationship to itself
                    "executethis": "addwidmaster",
					"wid": "rel_groupdto1_to_groupdto1",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "manytomany",
					"primarywid": "groupdto1",
					"primarymethod": "groupdto1",
					"secondarywid": "groupdto1",
					"secondarymethod": "groupdto1"
                }]);
    }
	
	// This uses the dto & relationship to itself setup in manytomanysetup1() to see if adding wids of the same
	// method to each other in a many-to-many works. One level deep.
	exports.manytomanytest1 = manytomanytest1 = function manytomanytest1(params, callback){
	
			manytomanyself1();
			
			execute([{// Create the employees group
                    "executethis": "addwidmaster",
                    "wid": "employee_grp",
                    "metadata.method": "groupdto1",
                    "name":"Employees"
                },{ // Create the managers group and add it to the employees group
                    "executethis": "addwidmaster",
					"wid": "managers_grp",
					"metadata.method": "groupdto1",
					"name": "Managers",
					"metadata.groupdto1.0": "employee_grp"
                }]);
    }
	
	// This uses the dto & relationship to itself setup in manytomanysetup1() to see if adding wids of the same
	// method to each other in a many-to-many works. Two levels deep.
	exports.manytomanystest2 = manytomanytest2 = function manytomanytest2(params, callback){
	
			manytomanyself1();
			
			execute([{// Create the Espressobay group
                    "executethis": "addwidmaster",
                    "wid": "espresso_grp",
                    "metadata.method": "groupdto1",
                    "name":"EspressoBay"
                },{// Create the employees group and add it to the espressobay group
                    "executethis": "addwidmaster",
                    "wid": "employee_grp",
                    "metadata.method": "groupdto1",
                    "name":"Employees",
					"metadata.groupdto1.0":"espresso_grp"
                },{ // Create the managers group and add it to the employees group
                    "executethis": "addwidmaster",
					"wid": "managers_grp",
					"metadata.method": "groupdto1",
					"name": "Managers",
					"metadata.groupdto1.0": "employee_grp"
                }]);
    }
			
	// works
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
	// fails : bookdefault fields chapters & publishers not displaying for bookwid1
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
	// fails, same as previous test : bookdefault fields chapters & publisher not being grabbed
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
	// works
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
	// fails
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
	
    exports.add999 = add999 = function add999(params, callback) {
        var d="";
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

                "bookdto.pubhousedto.statedto.0.statename": "State Name"+d,
                "bookdto.pubhousedto.statedto.0.zipcode": "Z 123456" + d,

                "bookdto.pubhousedto.ownerdto.0.name": "Owner Name" + d
            }

        if (params) {
             executeobj=extend(true, executeobj, params)
        }

        manytoonesetupdto(params, function (cb2) {
            //debuglevel=17;
            execute(executeobj, function (err, res) {
                proxyprinttodiv("result from data add ", res, 99, true);
                    printlistmany([{"wid":"wid1", "command.dtotype":""}], function (err, res) { 
                        callback(err, res);
                    })
                });
            });
    }
	
    
    /*
        etaddautoselectwid
        let system select child wid names
        childs DO have preamble
        do NOT use command.dtotype
        get each get each child with one parent w/o dto, 
        get each child with one parent with dto, 
        get each child by childname w/o dto
        get each child by childname with dto, 
        results of this test:
	*/
    exports.etaddautoselectwid = etaddautoselectwid = function etaddautoselectwid(params, callback) {
        var c="c";
        var d="d";
        manytoonesetupdto(params, 0, function (err, res) {

						//parent,   c,  child, d, preamble, dto, getlist
			addauthorrecord(0,      c,      0, d,   -1,     -1,     2, function (err, res){
			addauthorrecord(0,      c,      1, d,   0,      -1,     2, function (err, res){
			addauthorrecord(0,      c,      2, d,   1,      -1,     2, function (err, res){
			addauthorrecord(0,      c,      3, d,   2,      -1,     2, function (err, res){
			addauthorrecord(0,      c,      4, d,   3,      -1,     2, function (err, res){
			addauthorrecord(0,      c,      5, d,   4,      -1,     2, function (err, res){
			addauthorrecord(0,      c,      6, d,   5,      -1,     2, function (err, res){
			addauthorrecord(0,      c,      7, d,   6,      -1,     1, function (err, res){
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
    }

    /*
        etaddmanualselectwid
        we select child wid names
        childs do  have preamble
        do not use command.dtotype
        get each get each child with one parent w/o dto, 
        get each child with one parent with dto, 
        get each child by childname w/o dto
        get each child by childname with dto,
        results of this test:
    */

    exports.etaddmanualselectwid = etaddmanualselectwid = function etaddmanualselectwid(params, callback) {
        var c="c";
        var d="d";
        manytoonesetupdto(params, 0, function (err, res) {   

                    //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(0,      c,      8,  d,   -1,     -1,     2, function (err, res){
        addauthorrecord(0,      c,      9,  d,   0,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      10, d,   1,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      11, d,   2,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      12, d,   3,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      13, d,   4,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      14, d,   5,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      15, d,   6,      -1,     0, function (err, res){
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
    }

        /*
        etaddwithdtotype
        we select child wid names
        childs do NOT have preamble
        use command.dtotype
        get each get each child with one parent w/o dto, 
        get each child with one parent with dto, 
        get each child by childname w/o dto
        get each child by childname with dto, 
        results of this test:
    */

    exports.etaddwithdtotype = etaddwithdtotype = function etaddwithdtotype(params, callback) {
        var c="c";
        var d="d";
        manytoonesetupdto(params, 0, function (err, res) {   

                    //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(0,      c,      8,  d,   -1,       0,     2, function (err, res){
        addauthorrecord(0,      c,      9,  d,   -1,       1,     2, function (err, res){
        addauthorrecord(0,      c,      10, d,   -1,       2,     2, function (err, res){
        addauthorrecord(0,      c,      11, d,   -1,       3,     2, function (err, res){
        addauthorrecord(0,      c,      12, d,   -1,       4,     2, function (err, res){
        addauthorrecord(0,      c,      13, d,   -1,       5,     2, function (err, res){
        addauthorrecord(0,      c,      14, d,   -1,       6,     2, function (err, res){
        addauthorrecord(0,      c,      15, d,   -1,       7,     0, function (err, res){
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
    }
	
    /*    
        etadddtoandpreamble
        we select child wid names
        childs do have preamble
        use command.dtotype
        get each get each child with one parent w/o dto, 
        get each child with one parent with dto, 
        get each child by childname w/o dto
        get each child by childname with dto, 
        results of this test:
    */

    exports.etadddtoandpreamble = etadddtoandpreamble = function etadddtoandpreamble(params, callback) {
        var c="c";
        var d="d";
        manytoonesetupdto(params, 0, function (err, res) {   

                    //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(0,      c,      8,  d,   -1,     0,     2, function (err, res){
        addauthorrecord(0,      c,      9,  d,   0,      1,     2, function (err, res){
        addauthorrecord(0,      c,      10, d,   1,      2,     2, function (err, res){
        addauthorrecord(0,      c,      11, d,   2,      3,     2, function (err, res){
        addauthorrecord(0,      c,      12, d,   3,      4,     2, function (err, res){
        addauthorrecord(0,      c,      13, d,   4,      5,     2, function (err, res){
        addauthorrecord(0,      c,      14, d,   5,      6,     2, function (err, res){
        addauthorrecord(0,      c,      15, d,   6,      7,     0, function (err, res){
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
    }



    /*
        etadd3big
        call 3 x etaddautoselectwid
        let system select child wid names
        childs DO have preamble
        do NOT use command.dtotype
        get each get each child with one parent w/o dto, 
        get each child with one parent with dto, 
        get each child by childname w/o dto
        get each child by childname with dto, 
        result of this test:
    */
    exports.etadd3big = etadd3big = function etadd3big(params, callback) {
        var c="c";
        var d="d";
        manytoonesetupdto(params, 0, function (err, res) {

                    //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(0,      c,      0, d,   -1,     -1,     2, function (err, res){
        addauthorrecord(0,      c,      1, d,   0,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      2, d,   1,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      3, d,   2,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      4, d,   3,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      5, d,   4,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      6, d,   5,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      7, d,   6,      -1,     0, function (err, res){

        //c="x";
        d="y";

                            //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(0,      c,      0, d,   -1,     -1,     2, function (err, res){
        addauthorrecord(0,      c,      1, d,   0,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      2, d,   1,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      3, d,   2,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      4, d,   3,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      5, d,   4,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      6, d,   5,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      7, d,   6,      -1,     0, function (err, res){

        //c="w";
        d="z";

                            //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(0,      c,      0, d,   -1,     -1,     2, function (err, res){
        addauthorrecord(0,      c,      1, d,   0,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      2, d,   1,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      3, d,   2,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      4, d,   3,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      5, d,   4,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      6, d,   5,      -1,     2, function (err, res){
        addauthorrecord(0,      c,      7, d,   6,      -1,     0, function (err, res){
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
                        }); 
                    });
                });
            });
        });
    }


    // we will create dtos with wid2 as default - the name of the top wid will be wid2default
    // then we get wid1 to see if defaults there
    exports.etcreatedefaultdto1 = etcreatedefaultdto1 = function etcreatedefaultdto1(params, callback) {
        var c="default";
        var d="d";

        var inheritparms = 
               {"authordtodefault":[{"wid2default":""}],
                "spousedto":[],
                "housedto":[],
                "bookdto":[], 
                "pubhousedto":[],
                "addressdto":[],
                "statedto":[],
                "ownerdto":[],
                "authordtooverride":[],
                "spousedtooverride":[],
                "housedtooverride":[],
                "bookdtooverride":[],
                "pubhousedtooverride":[],
                "addressdtooverride":[],
                "statedtooverride":[],
                "ownerdtooverride":[]
                }
                        
        manytoonesetupdto(inheritparams, 0, function (err, res) {

                    //parent,   c,   child, d, preamble, dto, getlist
        addauthorrecord(1,      c,      8,  d,   -1,     -1,     3, function (err, res){
        //addauthorrecord(0,      c,      9,  d,   0,      -1,     0, function (err, res){
        addauthorrecord(1,      c,      10, d,   1,      -1,     3, function (err, res){
        //addauthorrecord(0,      c,      11, d,   2,      -1,     0, function (err, res){
        addauthorrecord(1,      c,      12, d,   3,      -1,     3, function (err, res){
        //addauthorrecord(0,      c,      13, d,   4,      -1,     0, function (err, res){
        addauthorrecord(1,      c,      14, d,   5,      -1,     3, function (err, res){
        //addauthorrecord(0,      c,      15, d,   6,      -1,     0, function (err, res){
        printlist([{"wid":"wid1"+c, "command.dtotype":""}], function (err, res){
        callback(err, res);
        });
                                           
        //                                });
        //                            }); 
        //                        });
        //                    });
                        }); 
                    });
                });
            });
        });
    }
    
	
	
    // we will create dtos with wid2 as default - the name of the top wid will be wid2override
    // then we get wid1 to see if defaults there
    exports.etcreateinheritdefault1 = etcreateinheritdefault1 = function etcreateinheritdefault1(params, callback) {
        var c="override";
        var d="d";

        var inheritparms = 
               {"authordtodefault":[],
                "spousedto":[{"wid2override":""}],
                "housedto":[],
                "bookdto":[], 
                "pubhousedto":[],
                "addressdto":[],
                "statedto":[],
                "ownerdto":[],
                "authordtooverride":[],
                "spousedtooverride":[],
                "housedtooverride":[],
                "bookdtooverride":[],
                "pubhousedtooverride":[],
                "addressdtooverride":[],
                "statedtooverride":[],
                "ownerdtooverride":[]
                }
                        
        manytoonesetupdto(inheritparams, 0, function (err, res) {

					//parent,   c,   child, d, preamble, dto, getlist
		addauthorrecord(2,      c,      8,  d,   -1,     -1,     4, function (err, res){
		//addauthorrecord(0,      c,      9,  d,   0,      -1,     0, function (err, res){
		addauthorrecord(2,      c,      10, d,   1,      -1,     4, function (err, res){
		//addauthorrecord(0,      c,      11, d,   2,      -1,     0, function (err, res){
		addauthorrecord(2,      c,      12, d,   3,      -1,     4, function (err, res){
		//addauthorrecord(0,      c,      13, d,   4,      -1,     0, function (err, res){
		addauthorrecord(2,      c,      14, d,   5,      -1,     4, function (err, res){
		//addauthorrecord(0,      c,      15, d,   6,      -1,     0, function (err, res){
        printlist([{"wid":"wid1"+c, "command.dtotype":""}], function (err, res){
        callback(err, res);
        });
		//});
		}); 
		//});
		});
		//}); 
		});
		//});
		});
        });
    }

    // test manytomany = manytomanytest() line 97
    // test default = inheritdefault1() line 118
    // test override = inheritoverride1() line 140
    // test author-author = manytomanytest1() line 186
    // create new dtotype in manytoonesetupdto to test manytomany, json
    // more default / inherit tests
	exports.t123 = t123 = function t123(params, callback) {
		callback({},{})
	}
