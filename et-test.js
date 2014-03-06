    // enter lots of data in series, ths inserts data via different executes results in Max Range error
    // this one inserts same amount of data but does not fail

    exports.test_recurseModObj = test_recurseModObj = function test_recurseModObj(params, callback) {
    etappinstall();
     // config = setconfig1();
    var recModObj = recurseModObj({
                                    "metadata":{"method":"wid2"},
                                    "a":"b",
                                    "c":"30",
                                    "e":"f",
                                    "d":"6/23/1912",
                                    "q":{"w":{"e":"t"}},
                                    "g":"true"
                                },
                                {
                                    "metadata":{"method":"wid2"},
                                    "a":"string",
                                    "c":"number",
                                    "d":"date",
                                    "q":{"w":{"e":"string"}},
                                    "g":"boolean"
                                });
    proxyprinttodiv('recurseModObj inputObject', {
                                    "metadata":{"method":"wid2"},
                                    "a":"b",
                                    "c":"30",
                                    "e":"f",
                                    "d":"6/23/1912",
                                    "q":{"w":{"e":"t"}},
                                    "g":"true"
                                }, 99);    
    proxyprinttodiv('recurseModObj inputDTO', {
                                    "metadata":{"method":"wid2"},
                                    "a":"string",
                                    "c":"number",
                                    "d":"date",
                                    "q":{"w":{"e":"string"}},
                                    "g":"boolean"
                                }, 99);    
    proxyprinttodiv('recurseModObj ModifiedObject', recModObj, 99);    
 }




    exports.tss1 = tss1 = function tss1(params, callback) {
        // debuglevel = 34;
        // debugname = "";
        // debugcat = "";
        // debugsubcat = "code";
        var status = false;


        async.series([
            function (cb1) {
                // create dtos  
                var executeList = [{
                    // create simple ttdto
                    "executethis": "addwidmaster",
                    "wid": "ttdto",
                    "metadata.method": "ttdto",
                    "type": "string"
                }];
                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                },{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss1 added  ttdto --4 ', res, 99);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                },{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss1 added  ttdto --5 ', res, 99);
                    cb1(null);
                });
            },
            // function (cb1) {
            //     // create data for ttdto
            //     var executeList = [{
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }];

            //     execute(executeList, function (err, res) {
            //         proxyprinttodiv('Function tss1 added  ttdto -- 6', res, 99);
            //         cb1(null);
            //     });
            // }/*,
            // function (cb1) {
            //     // create data for ttdto
            //     var executeList = [{
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }];

            //     execute(executeList, function (err, res) {
            //         proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
            //         cb1(null);
            //     });
            // },
            // function (cb1) {
            //     // create data for ttdto
            //     var executeList = [{
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }];

            //     execute(executeList, function (err, res) {
            //         proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
            //         cb1(null);
            //     });
            // },
            // function (cb1) {
            //     // create data for ttdto
            //     var executeList = [{
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }];

            //     execute(executeList, function (err, res) {
            //         proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
            //         cb1(null);
            //     });
            // },
            // function (cb1) {
            //     // create data for ttdto
            //     var executeList = [{
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "metadata.method": "ttdto",
            //         "type": "a"
            //     }];

            //     execute(executeList, function (err, res) {
            //         proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
            //         cb1(null);
            //     });
            // }*/
        ], function (err, res) {
            proxyprinttodiv('Function tss1 done a series of tasks using ttdto -- ', res, 99);
            if (!res) {
                res = [];
            }
            callback(err, res);
        });
    }


	/*
		addwidmater xdto
		now add many with addwidmaster with x dto
	*/
    exports.t1 = t1 = function t1(params, callback) {
        debuglvel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;

        async.series([
            function (callback1) {	//addwidmaster dto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "wid": "ttdto",
                    "metadata.method": "ttdto",
                    "type": "string"
                }];
                execute(executeList, function (err, res) {
                    proxyprinttodiv("Function t1 addwidmaster ttdto  result -- ", res, 99);
					callback1(null);
                });
            },
			function (callback2) {	//addwidmaster wid1
				//n-times loop
				async.times(100, function(n, next){
					var executeList = [{
						"executethis": "addwidmaster",
						"wid": "ttdto_wid"+n,
						"metadata.method": "ttdto",
						"type": "a"
					}];
					execute(executeList, function (err, res) {
						proxyprinttodiv("Function t1 addwidmaster ttdto wid result -- ", res, 99);
					});
				}, function(err, result) {
					callback2(null);
				});
            },
			function (callback3) {	//getwidmaster
				//n-times loop
				async.times(5, function(n, next){
					var executeList = [{
						"executethis": "getwidmaster",
						"wid": "ttdto_wid"+n,
					}];
					execute(executeList, function (err, res) {
						proxyprinttodiv("Function t1 getwidmaster  result -- ", res, 99);
					});
				}, function(err, result) {
					callback3(null);
				});
            }
        ], function (err, res) {
            proxyprinttodiv('Function tss1 done a series of tasks using ttdto -- ', res, 99);
            if (!res) {
                res = [];
            }
            callback(err, res);
        });
    }

	/*
	do NOT save addwidmater xdto
	now add many with addwidmaster with x dto
	*/
    exports.t2 = t2 = function t2(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;

        async.series([
            /*function (callback1) {	//addwidmaster dto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "wid": "ttdto",
                    "metadata.method": "ttdto",
                    "type": "string"
                }];
                execute(executeList, function (err, res) {
                    proxyprinttodiv("Function t1 addwidmaster ttdto  result -- ", res, 99);
					callback1(null);
                });
            },*/
			function (callback2) {	//addwidmaster wid1
				//n-times loop
				async.times(500, function(n, next){
					var executeList = [{
						"executethis": "addwidmaster",
						"wid": "ttdto_wid"+n,
						"metadata.method": "ttdto",
						"type": "a"
					}];
					execute(executeList, function (err, res) {
						proxyprinttodiv("Function t1 addwidmaster ttdto wid result -- ", res, 99);
					});
				}, function(err, result) {
					callback2(null);
				});
            }/*,
			function (callback3) {	//getwidmaster
				//n-times loop
				async.times(5, function(n, next){
					var executeList = [{
						"executethis": "getwidmaster",
						"wid": "ttdto_wid"+n,
					}];
					execute(executeList, function (err, res) {
						proxyprinttodiv("Function t1 getwidmaster  result -- ", res, 99);
					});
				}, function(err, result) {
					callback3(null);
				});
            }*/
        ], function (err, res) {
            proxyprinttodiv('Function tss1 done a series of tasks using ttdto -- ', res, 99);
            if (!res) {
                res = [];
            }
            callback(err, res);
        });
    }
	
	/*
	do NOT save addwidmater xdto
	now add many with addwidmaster with x dto
	*/
    exports.t3 = t3 = function t2(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;

        async.series([
            function (callback1) {	//addwidmaster dto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "wid": "ttdto",
                    "metadata.method": "ttdto",
                    "type": "string"
                }];
                execute(executeList, function (err, res) {
                    proxyprinttodiv("Function t1 addwidmaster ttdto  result -- ", res, 99);
					callback1(null);
                });
            },
			function (callback2) {	//addwidmaster wid1
				//n-times loop
				async.times(1, function(n, next){
					var executeList = [{
						"executethis": "addwidmaster",
						"wid": "ttdto_wid"+n,
						"metadata.method": "ttdto",
						"type": "a"
					}];
					execute(executeList, function (err, res) {
						proxyprinttodiv("Function t1 addwidmaster ttdto wid result -- ", res, 99);
					});
				}, function(err, result) {
					callback2(null);
				});
            }/*,
			function (callback3) {	//getwidmaster
				//n-times loop
				async.times(5, function(n, next){
					var executeList = [{
						"executethis": "getwidmaster",
						"wid": "ttdto_wid"+n,
					}];
					execute(executeList, function (err, res) {
						proxyprinttodiv("Function t1 getwidmaster  result -- ", res, 99);
					});
				}, function(err, result) {
					callback3(null);
				});
            }*/
        ], function (err, res) {
            proxyprinttodiv('Function tss1 done a series of tasks using ttdto -- ', res, 99);
            if (!res) {
                res = [];
            }
            callback(err, res);
        });
    }
	
    // enter lots of data in series, the same data when inserted via different executes results in Max Range error
    // this one inserts same amount of data but does not fail
    exports.tss2 = tss2 = function tss2(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;


        async.series([
                function (cb1) {
                    // create data for ttdto
                    var executeList = [{
                        // create simple ttdto
                        "executethis": "addwidmaster",
                        "wid": "ttdto",
                        "metadata.method": "ttdto",
                        "type": "string"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }, {
                        "executethis": "addwidmaster",
                        "metadata.method": "ttdto",
                        "type": "a"
                    }];

                    execute(executeList, function (err, res) {
                        proxyprinttodiv('Function tss2 added  ttdto -- ', res, 99);
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                proxyprinttodiv('Function tss2 done a series of tasks using ttdto -- ', res, 99);
                if (!res) {
                    res = [];
                }
                callback(err, res);
            });
    }


    // test to enter lots of data at once :: created to raise the Maximum range reached error in Chrome
    exports.tss3 = tss3 = function tss3(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;


        async.series([
            function (cb1) {
                // create dtos  
                var executeList = [{
                    // create simple ttdto
                    "executethis": "addwidmaster",
                    "wid": "ttdto",
                    "metadata.method": "ttdto",
                    "type": "string"
                }];
                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop # 1  -- ', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop # 2 -- ', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop # 3 -- ', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  4-- ', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  5-- ', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  -- 6', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  -- 7', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  -- 8', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  -- 9', res, 34);
                    cb1(null);
                });
            },
            function (cb1) {
                // create data for ttdto
                var executeList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "ttdto",
                    "type": "a"
                }];

                execute(executeList, function (err, res) {
                    proxyprinttodiv('Function tss3 loop #  -- 10', res, 34);
                    cb1(null);
                });
            }
        ], function (err, res) {
            proxyprinttodiv('Function tss3 done a series of tasks using ttdto -- process.addListener(type, listener);', res, 34);
            if (!res) {
                res = [];
            }
            callback(err, res);
        });
    }

    // simple test to setup data and then test against that
    exports.sectest1 = sectest1 = function sectest1(parm, callback) {

        async.series([
                function (cb1) {
                    createtestuser("rogeruser", "rogerac", "99", cb1);
                },
                function (cb1) {
                    createtestuser("codyuser", "codyac", "99", cb1)
                },
                function (cb1) { // add codyuser to the driemployeesgroup
                    addgrouptowid("codyuser", "userdto", "driemployeegroup", cb1);
                },
                function (cb1) { // rogeruser allows anyone in driemployees to executethis to cretecoupon
                    addpermission("rogeruser", "driemployeegroup", "createcoupon", "data", "50", cb1);
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, cb1);
                },



                function (cb1) {
                    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, cb1);
                },
                function (cb1) {
                    addgrouptowid("createcoupon", "xxxxxxx", "rogeruser", cb1);
                },
                function (cb1) {
                    testsecurity("rogerac", "executethis", "createcoupon", "data", true, cb1);
                },
                function (cb1) {
                    addgrouptowid("codyuser", "userdto", "driemployeegroup", cb1);
                },

                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, cb1);
                }
            ],
            function (err, res) {

                callback(err, res);

            });
    }

    // simple test which sets up all data and then runs sectest1 test after that 
    exports.tsa1 = tsa1 = function tsa1(params, callback) {
        // debuglevel = 34;
        // debugname = "";
        // debugcat = "";
        // debugsubcat = "code";
        // var status = false;

        async.series([
            function (cb1) {
                createsystemdtos(null, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                sectest1(null, function (err, res) {
                    cb1(null);
                });
            }
        ], function (err, res) {
            proxyprinttodiv('Function tss3 done a series of tasks using ttdto -- process.addListener(type, listener);', res, 34);
            callback(err, res);
        });
    }


    /// test getting permissions list :: dependent on sectest1
    exports.ttsa3 = ttsa3 = function (params, callback) {
        getPermissionsList(["driemployeegroup0", "rogeruser0", "groupdto0", "19", "25"], ["createcoupon0"], ["executethis"], ["data"], 99, function (err, res) {
            proxyprinttodiv('Function ttsa3() in : res', res, 34);
            callback(err, res);

        });
    };

    /// test getting groups recursively :: dependent on sectest1
    exports.ttsa4 = ttsa4 = function (params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        getGroupRecursive("rogeruser", 99, function (err, res) {
            proxyprinttodiv('Function ttsa4() in : res', res, 34);
            callback(err, res);

        });
    };

    /// test add group to wid :: dependent on sectest1
    exports.ttsa6 = ttsa6 = function (params, callback) {
        addgrouptowid("anything", "groupnamedto", "createcoupon", callback);
    };



    // Address dto
    // {"executethis":"updatewid","metadata.method":"addressdto","wid":"addressdto", "companyname":"string", "street":"string", "city":"string","state":"string","zip":"string", "metadata.inherit":"defaultaddressproperties"},
    // {"executethis":"updatewid","metadata.method":"addressdto","wid":"defaultaddressproperties", "companyname":"No Name Company"},
    // {"executethis":"updatewid","metadata.method":"relationshipdto","wid":"rel222","primarywid":"elizabeth_heart","secondarywid":"elizabeth_heart_address", "relationshiptype":"attributes" },
    // {"executethis":"updatewid","metadata.method":"addressdto","wid":"elizabeth_heart_address", "street":"1234 First street", "city":"Something City","state":"ZZ","zip":"12345"},
    // {"executethis":"getwidmaster","wid":"elizabeth_heart_address"}
    exports.add01 = add01 = function add01(parameters, callback) {

        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "authordto",
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "metdata.bookdto.type": "onetomany"
        }, {
            "executethis": "updatewid",
            "metadata.method": "bookdto",
            "wid": "bookdto",
            "title": "string",
            "pages": "string",
            "c": "string",
            "d": "string"
        }, {
            "executethis": "updatewid",
            "metadata.method": "relationshipdto",
            "wid": "relbooktoauthor",
            "primarywid": "authordto",
            "secondarywid": "bookdto",
            "relationshiptype": "attributes"
        }, {
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "elizabeth_heart",
            "name": "Elizabeth Heart",
            "age": "50"
        }]

        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res, 99);

            var object = {
                "metadata": {
                    "method": "bookdto"
                },
                "wid": "222",
                "title": "The X Factor",
                "pages": "300"
            };
            var dtoobject = {
                "metadata": {
                    "method": "bookdto"
                },
                "wid": "bookdto",
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string"
            };
            var parentwid = "elizabeth_heart";
            var relationshiptype = "onetomany";
            var command = {};

            addwidobject(object, dtoobject, command, function (err, res) {
                alert(JSON.stringify(res));
            });
        });

    }

    exports.add0 = add0 = function add0(parameters, callback) {

        var executeList = [{
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "metdata.bookdto.type": "onetomany"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string"
            }, {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "relbooktoauthor",
                "primarywid": "authordto",
                "secondarywid": "bookdto",
                "relationshiptype": "attributes"
            }, {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "elizabeth_heart",
                "name": "Elizabeth Heart",
                "age": "50"
            }
            //{"executethis":"updatewid","metadata.method":"bookdto","wid":"222","title":"The X Factor","pages":"300"},
            //{"executethis":"updatewid","metadata.method":"relationshipdto","wid":"rel111","primarywid":"elizabeth_heart","secondarywid":"222", "relationshiptype":"attributes"},
        ]

        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res, 99);

            var object = {
                "metadata": {
                    "method": "bookdto"
                },
                "wid": "222",
                "title": "The X Factor",
                "pages": "300"
            };
            var dtoobject = {
                "metadata": {
                    "method": "bookdto"
                },
                "wid": "bookdto",
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string"
            };
            var parentwid = "elizabeth_heart";
            var relationshiptype = "onetomany";
            var command = {};

            // addrecord(object, dtoobject, parentwid, relationshiptype, command, function (err, res) {
            //     alert("add0 addrecord! -- got res -->" + JSON.stringify(res));
            // });

            cleanadd(object, dtoobject, command, function (err, res) {
                alert("add0 cleanadd! -- got res -->" + JSON.stringify(res));
            });
        });

    }

    exports.add1 = add1 = function add1(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "string",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "string",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        }

        var command = {};

        addwidobject(inputObject, inputdto, command, function (err, res) {
            proxyprinttodiv("add1 fired! -- got res --> ", res, 99);
        });
    }

    exports.add11 = add11 = function add11(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };

        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "string",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "string",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        }

        var command = {};

        addwidobject(inputObject, inputdto, command, function (err, res) {
            proxyprinttodiv("add1 fired! -- got res --> ", res, 99);
        });
    }

    /*
    this should insert {a:b} at the bookdto level
*/
    exports.get4 = get4 = function get4(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "authordto",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "bookdto",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        };
        var insertobj = {
            "a": "b"
        };
        var command = {
            "dtotype": "bookdto"
        };
        insertbydtotype(inputObject, inputdto, insertobj, command);
    }

    exports.get4 = get4 = function get22(parameters, callback) { //add clean test
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "authordto",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "bookdto",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        };
        var insertobj = {
            "a": "b"
        };
        var command = {
            "dtotype": "bookdto"
        };
        insertbydtotype(inputObject, inputdto, insertobj, command);
    }

    /*
    do not specify command.dto...should put it at root/author level
*/
    exports.get5 = get5 = function get5(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "authordto",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "bookdto",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        };
        var insertobj = {
            "a": "b"
        };
        var command = {};
        insertbydtotype(inputObject, inputdto, insertobj, command);
    }

    /*
    specify command.dtotype = x should wrap result in {x: {.....}}
*/
    exports.get6 = get6 = function get6(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "authordto",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "bookdto",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        };
        var insertobj = {
            "a": "b"
        };
        var command = {
            "dtotype": "x"
        };
        insertbydtotype(inputObject, inputdto, insertobj, command);
    }

    /*
    specify command.dtotype.x.y.z should wrap result in {x:{y:z{......}}}
*/
    exports.get7 = get7 = function get7(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "authordto",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "bookdto",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        };
        var insertobj = {
            "a": "b"
        };
        var command = {
            "dtotype": {
                "x": {
                    "y": "z"
                }
            }
        };
        insertbydtotype(inputObject, inputdto, insertobj, command);
    }

    /*
    get8 - to get the dtoname
*/
    exports.get8 = get8 = function get8(parameters, callback) {
        etappinstall();
        var inputObject = {
            "name": "Elizabeth Heart",
            "age": "50",
            "wid": "elizabeth_heart",
            "metadata": {
                "method": "authordto"
            },
            "bookdto": {
                "title": "The X Factor",
                "pages": "300",
                "wid": "222",
                "metadata": {
                    "method": "bookdto"
                }
            }
        };
        var inputdto = {
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "wid": "authordto",
            "bookdto": {
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "wid": "bookdto",
                "metadata": {
                    "method": "bookdto",
                    "inherit": "defaultbookdtoactions"
                },
                "command": {
                    "inherit": {
                        "defaultbookdtoactions": "defaultbookdtoactions"
                    },
                    "deepdtolist": {},
                    "dtolist": {}
                }
            },
            "metadata": {
                "method": "authordto",
                "bookdto": {
                    "type": "onetomany"
                },
                "inherit": "defaultauthordtoactions"
            },
            "command": {
                "inherit": {
                    "defaultauthordtoactions": "defaultauthordtoactions",
                    "defaultbookdtoactions": "defaultbookdtoactions"
                },
                "deepdtolist": {
                    "bookdto": "onetomany"
                },
                "dtolist": {
                    "bookdto": "bookdto"
                }
            }
        };
        var insertobj = {
            "metadata.method": "bookdto"
        };
        var command = {
            "dtotype": "bookdto"
        };
        insertbydtotype(inputObject, inputdto, insertobj, command);
    }


    /*
    addwid with out inherit ... should add inputobject
*/
    exports.addwidtest = addwidtest = function addwidtest(parameters, callback) {
        etappinstall();
        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "defaultauthor",
            "name": "roger"
        }];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                "name": "Elizabeth Heart",
                "age": "50",
                "wid": "elizabeth_heart",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    },
                    "inherit": "defaultauthor"
                },
                "command": {
                    "inherit": {
                        "defaultauthor": "defaultauthor"
                    },
                    "deepdtolist": {
                        "bookdto": "onetomany"
                    },
                    "dtolist": {
                        "bookdto": "bookdto"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }

    /*
    addwid without inherit .. should add the input record
*/
    exports.addwidtest2 = addwidtest2 = function addwidtest2(parameters, callback) {
        etappinstall();
        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "defaultauthor",
            "name": "roger"
        }];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                "name": "Elizabeth Heart",
                "age": "50",
                "wid": "elizabeth_heart",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }

    /*
    addwid - with record alreayd exists ... should update name, leave all else the same
*/
    exports.addwidtest3 = addwidtest3 = function addwidtest3(parameters, callback) {
        etappinstall();
        var executeList = [
            //{"executethis":"updatewid","metadata.method":"authordto","wid":"defaultauthor","name":"roger"}
            {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "elizabeth_heart",
                "name": "roger"
            }
        ];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                "name": "Elizabeth Heart",
                "age": "50",
                "wid": "elizabeth_heart",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }

    /*
    addwid with inherit that DOES matter ... should return name of roger
*/
    exports.addwidtest4 = addwidtest4 = function addwidtest4(parameters, callback) {
        etappinstall();
        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "defaultauthor",
            "name": "roger"
        }];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                //"name": "Elizabeth Heart",
                "age": "50",
                "wid": "elizabeth_heart",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    },
                    "inherit": "defaultauthor"
                },
                "command": {
                    "inherit": {
                        "defaultauthor": "defaultauthor"
                    },
                    "deepdtolist": {
                        "bookdto": "onetomany"
                    },
                    "dtolist": {
                        "bookdto": "bookdto"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }

    /*
    addwid - with record .. but dto fliters age
*/
    exports.addwidtest5 = addwidtest5 = function addwidtest5(parameters, callback) {
        etappinstall();
        var executeList = [
            //{"executethis":"updatewid","metadata.method":"authordto","wid":"defaultauthor","name":"roger"}
            {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "elizabeth_heart",
                "name": "rogershoulddisappera",
                "a": "shouldsurvie"
            }
        ];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                "name": "Elizabeth Heart",
                "age": "50",
                "wid": "elizabeth_heart",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "a": "string",
                "b": "string",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }


    /*
    addwid with inherit that DOES matter ... deep should return name of roger + more
*/
    exports.addwidtest6 = addwidtest6 = function addwidtest6(parameters, callback) {
        etappinstall();
        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "defaultauthor",
            "name": {
                "test": "roger"
            }
        }];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                "name": {
                    "test": "roger"
                },
                "age": "50",
                "wid": "elizabeth_heart",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    },
                    "inherit": "defaultauthor"
                },
                "command": {
                    "inherit": {
                        "defaultauthor": "defaultauthor"
                    },
                    "deepdtolist": {
                        "bookdto": "onetomany"
                    },
                    "dtolist": {
                        "bookdto": "bookdto"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }


    /*
    addwid without inherit  ... should add inputobject -- test of deep filter string, number, boolean, date -- did it convert it?
*/
    exports.addwidtest7 = addwidtest7 = function addwidtest7(parameters, callback) {
        etappinstall();
        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "defaultauthor",
            "name": "roger"
        }];
        execute(executeList, function (err, res) {
            proxyprinttodiv("addwidtest updatewid authordto result ", res, 99);

            var inputobject = {
                "name": {
                    "test": "roger"
                },
                "age": "50",
                "wid": "elizabeth_heart",
                "a": "1/15/2014",
                "b": "false",
                "metadata": {
                    "method": "authordto"
                }
            };
            var inputdto = {
                "name": "string",
                "age": "number",
                "a": "date",
                "b": "boolean",
                "wid": "string",
                "metadata": {
                    "method": "string",
                    "bookdto": {
                        "type": "onetomany"
                    },
                    "inherit": "defaultauthor"
                },
                "command": {
                    "inherit": {
                        "defaultauthor": "defaultauthor"
                    },
                    "deepdtolist": {
                        "bookdto": "onetomany"
                    },
                    "dtolist": {
                        "bookdto": "bookdto"
                    }
                }
            };
            var command = {};

            addwid(inputobject, inputdto, command, function (err, res) {
                proxyprinttodiv("addwidtest addwid res :- ", res, 99);
            });
            callback(err, res);
        });
    }

    exports.add2 = add2 = function add2(parameters, callback) {
        debuglevel = 10;
        var executeList = [{
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "metdata.bookdto.type": "onetomany"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "pages": "string"
            }, {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "relbooktoauthor",
                "primarywid": "authordto",
                "secondarywid": "bookdto",
                "relationshiptype": "attributes"
            },
            // {"executethis":"updatewid","metadata.method":"authordto","wid":"elizabeth_heart","name":"Elizabeth Heart","age":"50"},
            // {"executethis":"updatewid","metadata.method":"bookdto","wid":"222","title":"The X Factor","pages":"300"},
            // {"executethis":"updatewid","metadata.method":"relationshipdto","wid":"rel111","primarywid":"elizabeth_heart","secondarywid":"222", "relationshiptype":"attributes"},
            {
                "executethis": "addwidmaster",
                "bookdto.title": "string",
                "bookdto.pages": "string",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "metadata.bookdto.type": "onetomany"
            }, {
                "executethis": "getwidmaster",
                "wid": "elizabeth_heart"
            }
        ]

        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res[7], 99);
            callback(err, res);
        });
    }





    exports.get1 = get1 = function get1(parameters, callback) {
        etappinstall();
        // debuglevel=10;
        var executeList = [{
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "metdata.bookdto.type": "onetomany",
                "metadata.inherit": "defaultauthordtoactions"
            }, {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "defaultauthordtoactions",
                "a": "adefault",
                "b": "BDEFAULT"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "defaultbookdtoactions",
                "c": "cdefault",
                "d": "dDEFAULT"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "metadata.inherit": "defaultbookdtoactions"
            }, {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "relbooktoauthor",
                "primarywid": "authordto",
                "secondarywid": "bookdto",
                "relationshiptype": "attributes"
            }, {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "elizabeth_heart",
                "name": "Elizabeth Heart",
                "age": "50"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "222",
                "title": "The X Factor",
                "pages": "300"
            }, {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "rel111",
                "primarywid": "elizabeth_heart",
                "secondarywid": "222",
                "relationshiptype": "attributes"
            }
            //{"executethis":"getwidmaster","wid":"elizabeth_heart"}
        ]

        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res[8], 99);
            callback(err, res);
        });

        var widInput = "elizabeth_heart";
        var command = {
            "convertmethod": "dto"
        };
        var preamble = "";
        var level = "";

        getWidMongo(widInput, command, preamble, level, function (err, res) {
            proxyprinttodiv('__--__', res, 99);
            callback(err, res);
        });

        widInput = "authordto";
        getWidMongo(widInput, command, preamble, level, function (err, res) {
            proxyprinttodiv('__--__', res, 99);
            callback(err, res);
        });

        widInput = "bookdto";
        getWidMongo(widInput, command, preamble, level, function (err, res) {
            proxyprinttodiv('__--__', res, 99);
            callback(err, res);
        });
    }

    exports.get3 = get3 = function get3(parameters, callback) {
        etappinstall();
        debuglevel = 38;
        var executeList = [{
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "authordto",
            "name": "string",
            "age": "string",
            "a": "string",
            "b": "string",
            "metadata.bookdto.type": "onetomany",
            "metadata.inherit": "defaultauthordtoactions"
        }, {
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "defaultauthordtoactions",
            "a": "adefault",
            "b": "BDEFAULT"
        }, {
            "executethis": "updatewid",
            "metadata.method": "bookdto",
            "wid": "defaultbookdtoactions",
            "c": "cdefault",
            "d": "dDEFAULT"
        }, {
            "executethis": "updatewid",
            "metadata.method": "bookdto",
            "wid": "bookdto",
            "title": "string",
            "pages": "string",
            "c": "string",
            "d": "string",
            "metadata.inherit": "defaultbookdtoactions"
        }, {
            "executethis": "updatewid",
            "metadata.method": "relationshipdto",
            "wid": "relbooktoauthor",
            "primarywid": "authordto",
            "secondarywid": "bookdto",
            "relationshiptype": "attributes"
        }, {
            "executethis": "updatewid",
            "metadata.method": "authordto",
            "wid": "elizabeth_heart",
            "name": "Elizabeth Heart",
            "age": "50"
        }, {
            "executethis": "updatewid",
            "metadata.method": "bookdto",
            "wid": "222",
            "title": "The X Factor",
            "pages": "300"
        }, {
            "executethis": "updatewid",
            "metadata.method": "relationshipdto",
            "wid": "rel111",
            "primarywid": "elizabeth_heart",
            "secondarywid": "222",
            "relationshiptype": "attributes"
        }, {
            "executethis": "getwidmaster",
            "wid": "authordto",
            "command.convertmethod": "dto",
            "command.execute": "ConvertFromDOTdri"
        }]

        // result is :
        //{"name":"string","age":"string","a":"string","b":"string","wid":"authordto",
        //"metadata":{"method":"authordto","bookdto":{"type":"onetomany"},"inherit":"defaultauthordtoactions"},
        //"command":{"inherit":{"defaultbookdtoactions":"defaultbookdtoactions","defaultauthordtoactions":"defaultauthordtoactions"},
        //          "deepdtolist":{"bookdto":"onetomany","authordto":"authordto"},
        //          "dtolist":{"bookdto":"bookdto"}},
        //"bookdto":{"title":"string","pages":"string","c":"string","d":"string","wid":"bookdto",
        //          "metadata":{"method":"bookdto","inherit":"defaultbookdtoactions"},
        //          "command":{"inherit":{"defaultbookdtoactions":"defaultbookdtoactions"},
        //                  "deepdtolist":{"bookdto":"bookdto"},
        //                   "dtolist":{}}}}

        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res[8], 99);
            callback(err, res);
        });
    }

    exports.get2 = get2 = function get2(parameters, callback) {
        // Setup test
        etappinstall();
        // debuglevel = 10;

        var executeList = [
            // Trying to do three levels here Authors --> Books --> Pages
            // author dto
            {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "metdata.bookdto.type": "onetomany",
                "metadata.inherit": "x"
            }, {
                "executethis": "updatewid",
                "metadata.method": "",
                "wid": "x",
                "a": "adefault",
                "b": "BDEFAULT",
                "bookdto.orphan_data": "Hey this works"
            },
            //{"executethis":"updatewid","metadata.method":"","wid":"defaultauthordtoactions","a":"adefault","b":"BDEFAULT", "bookdto.orphan_data":"Hey this works"},

            // book dto
            {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "titleb": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "orphan_data": "string",
                "metdata.pagedto.type": "onetomany",
                "metadata.inherit": "defaultbookdtoactions"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "defaultbookdtoactions",
                "c": "cdefault",
                "d": "dDEFAULT"
            },

            // page dto
            {
                "executethis": "updatewid",
                "metadata.method": "pagedto",
                "wid": "pagedto",
                "content": "string",
                "number": "string",
                "metadata.inherit": "defaultpagecontent"
            }, {
                "executethis": "updatewid",
                "metadata.method": "pagedto",
                "wid": "defaultpagecontent",
                "content": "This page is blank",
                "number": "0"
            },

            // relationships
            {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "relbooktoauthor",
                "primarywid": "authordto",
                "secondarywid": "bookdto",
                "relationshiptype": "attributes"
            }, {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "relpagetobook",
                "primarywid": "bookdto",
                "secondarywid": "pagedto",
                "relationshiptype": "attributes"
            }, {
                "executethis": "updatewid",
                "metadata.method": "relationshipdto",
                "wid": "rel111",
                "primarywid": "elizabeth_heart",
                "secondarywid": "XFactorBook",
                "relationshiptype": "attributes"
            },

            // records
            {
                "executethis": "updatewid",
                "metadata.method": "authordto",
                "wid": "elizabeth_heart",
                "name": "Elizabeth Heart",
                "age": "50"
            }, {
                "executethis": "updatewid",
                "metadata.method": "bookdto",
                "wid": "XFactorBook",
                "title": "The X Factor",
                "pages": "300"
            },

            // get
            {
                "executethis": "getwidmaster",
                "wid": "elizabeth_heart"
            }
        ];

        // alert(JSON.stringify(executeList));    
        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res[11], 99);
            callback(err, res);
        });
    }

    exports.get11 = get11 = function get11(parameters, callback) {
        // Setup test
        etappinstall();
        // debuglevel = 10;

        var executeList = [
            // Trying to do three levels here Authors --> Books --> Pages
            // author dto
            {
                "executethis": "addwidmaster",
                "metadata.method": "authordto",
                "wid": "authordto",
                "name": "string",
                "age": "string",
                "a": "string",
                "b": "string",
                "metdata.bookdto.type": "onetomany",
                "metadata.inherit": "x"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "",
                "wid": "x",
                "a": "adefault",
                "b": "BDEFAULT",
                "bookdto.orphan_data": "Hey this works"
            },
            //{"executethis":"addwidmaster","metadata.method":"","wid":"defaultauthordtoactions","a":"adefault","b":"BDEFAULT", "bookdto.orphan_data":"Hey this works"},

            // book dto
            {
                "executethis": "addwidmaster",
                "metadata.method": "bookdto",
                "wid": "bookdto",
                "title": "string",
                "titleb": "string",
                "pages": "string",
                "c": "string",
                "d": "string",
                "orphan_data": "string",
                "metdata.pagedto.type": "onetomany",
                "metadata.inherit": "defaultbookdtoactions"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "bookdto",
                "wid": "defaultbookdtoactions",
                "c": "cdefault",
                "d": "dDEFAULT"
            },

            // page dto
            {
                "executethis": "addwidmaster",
                "metadata.method": "pagedto",
                "wid": "pagedto",
                "content": "string",
                "number": "string",
                "metadata.inherit": "defaultpagecontent"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "pagedto",
                "wid": "defaultpagecontent",
                "content": "This page is blank",
                "number": "0"
            },

            // relationships
            {
                "executethis": "addwidmaster",
                "metadata.method": "relationshipdto",
                "wid": "relbooktoauthor",
                "primarywid": "authordto",
                "secondarywid": "bookdto",
                "relationshiptype": "attributes"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "relationshipdto",
                "wid": "relpagetobook",
                "primarywid": "bookdto",
                "secondarywid": "pagedto",
                "relationshiptype": "attributes"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "relationshipdto",
                "wid": "rel111",
                "primarywid": "elizabeth_heart",
                "secondarywid": "XFactorBook",
                "relationshiptype": "attributes"
            },

            // records
            {
                "executethis": "addwidmaster",
                "metadata.method": "authordto",
                "wid": "elizabeth_heart",
                "name": "Elizabeth Heart",
                "age": "50"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "bookdto",
                "wid": "XFactorBook",
                "title": "The X Factor",
                "pages": "300"
            },

            // get
            {
                "executethis": "getwidmaster",
                "wid": "elizabeth_heart"
            }
        ];


        execute(executeList, function (err, res) {
            proxyprinttodiv('__--__', res[11], 99);
            callback(err, res);
        });
        //         {"executethis":"addwidmaster","metadata.method":"pagedto","wid":"defaultpagecontent","content":"This page is blank","number":"0"},

        //         // relationships
        //         {"executethis":"addwidmaster","metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"bookdto", "relationshiptype":"attributes"},
        //         {"executethis":"addwidmaster","metadata.method":"relationshipdto","wid":"relpagetobook","primarywid":"bookdto","secondarywid":"pagedto", "relationshiptype":"attributes"},
        //         {"executethis":"addwidmaster","metadata.method":"relationshipdto","wid":"rel111","primarywid":"elizabeth_heart","secondarywid":"XFactorBook", "relationshiptype":"attributes"},

        //         // records
        //         {"executethis":"addwidmaster","metadata.method":"authordto","wid":"elizabeth_heart","name":"Elizabeth Heart","age":"50"},
        //         {"executethis":"addwidmaster","metadata.method":"bookdto","wid":"XFactorBook","title":"The X Factor","pages":"300"},

        //         // get
        //         {"executethis":"getwidmaster","wid":"elizabeth_heart"}
        //     ];

        //     // alert(JSON.stringify(executeList));    
        //     execute(executeList, function (err, res) {
        //         proxyprinttodiv('__--__', res[11], 99);
        //         callback(err, res);
        //     });
    }

    /* Adding data for the survey */
    exports.surveydata = surveydata = function surveydata(params, callback) {

        debugname = "addmaster"
        debuglevel = 97;
        debugcolor = 1;
        debugindent = 1;
        debugcolor = 5

        execute([

                // Create the user dto  
                {
                    "executethis": "updatewid",
                    "wid": "userdto",
                    "metadata.method": "userdto",
                    "userid": "number",
                    "first": "string",
                    "last": "string",
                    "metadata.surveydto.type": "onetomany"
                },
                // Create the survey dto
                {
                    "executethis": "updatewid",
                    "wid": "surveydto",
                    "metadata.method": "surveydto",
                    "title": "string",
                    "description": "string"
                }, //, "metadata.questiondto.type": "onetomany"
                // Relate the survey dto to the question dto (surveys can have multiple questions)
                {
                    "executethis": "updatewid",
                    "linktype": "onetomany",
                    "wid": "relationshipdto1",
                    "metadata.method": "relationshipdto",
                    "primarywid": "userdto",
                    "secondarywid": "surveydto",
                    "relationshiptype": "attributes"
                },
                // Adding user data 
                {
                    "executethis": "updatewid",
                    "wid": "bill",
                    "metadata.method": "userdto",
                    "userid": "2",
                    "first": "Bill",
                    "last": "Duncan"
                },
                //{"executethis": "updatewid", "wid": "mysurvey", "metadata.method": "userdto", "userdto": [{ "metadata.method": "userdto", "userid": "2", "first": "Bill", "last": "Duncan"}] },
                // Create the survey
                {
                    "executethis": "updatewid",
                    "wid": "happy",
                    "metadata.method": "surveydto",
                    "title": "Happy Meter",
                    "description": "Daily rating of how you 'feel' things are going."
                }, {
                    "executethis": "updatewid",
                    "linktype": "onetomany",
                    "wid": "relationshipdto2",
                    "metadata.method": "relationshipdto",
                    "primarywid": "bill",
                    "secondarywid": "happy",
                    "relationshiptype": "attributes"
                },

                {
                    "executethis": "getwidmaster",
                    "wid": "bill"
                }, {
                    "executethis": "getwidmaster",
                    "wid": "happy"
                },

                {
                    "executethis": "addwidmaster",
                    "wid": "bill2",
                    "metadata.method": "userdto",
                    "userid": "2",
                    "first": "Bill",
                    "last": "Duncan",
                    "surveydto.title": "Happy Meter",
                    "surveydto.description": "Daily rating of how you 'feel' things are going."
                }, {
                    "executethis": "getwidmaster",
                    "wid": "bill2"
                }
            ],
            function (err, res) {
                proxyprinttodiv('Function update userdto', res[0], 99);
                proxyprinttodiv('Function update surveydto', res[1], 99);
                proxyprinttodiv('Function update relationshipdto1', res[2], 99);
                proxyprinttodiv('Function update bill', res[3], 99);
                proxyprinttodiv('Function update happy', res[4], 99);
                proxyprinttodiv('Function update relationshipdto1', res[5], 99);
                proxyprinttodiv('Function get bill', res[6], 99);
                proxyprinttodiv('Function get happy', res[7], 99);
                proxyprinttodiv('Function update bill2', res[8], 99);
                proxyprinttodiv('Function get bill2', res[9], 99);
                callback(err, res)
            });
    }

    /* Adding data for the survey with addwidmaster */
    exports.surveydata2 = surveydata2 = function surveydata2(params, callback) {

        execute([

                // Create the user dto  
                {
                    "executethis": "updatewid",
                    "wid": "userdto",
                    "metadata.method": "userdto",
                    "userid": "number",
                    "first": "string",
                    "last": "string",
                    "surveydto": "onetomany"
                },
                // Create the survey dto
                {
                    "executethis": "updatewid",
                    "wid": "surveydto",
                    "metadata.method": "surveydto",
                    "title": "string",
                    "description": "string",
                    "questiondto": "onetomany"
                },

                // Adding user data 

                {
                    "executethis": "addwidmaster",
                    "wid": "happy",
                    "metadata": {
                        "method": "surveydto",
                        "userdto": {
                            "type": "onetomany"
                        }
                    },
                    "userdto": {
                        "metadata": {
                            "method": "userdto"
                        },
                        "userid": "2",
                        "first": "Bill",
                        "last": "Duncan"
                    },
                    "surveydto": {
                        "metadata": {
                            "method": "surveydto"
                        },
                        "title": "Happy Meter",
                        "description": "Daily rating of how you feel"
                    }
                },

                {
                    "executethis": "getwidmaster",
                    "wid": "Bill"
                }, {
                    "executethis": "getwidmaster",
                    "wid": "happy"
                }
            ],
            function (err, res) {
                proxyprinttodiv('Function getwidmongo parameterObject after', res[0], 99);
                proxyprinttodiv('Function getwidmongo parameterObject after', res[1], 99);
                proxyprinttodiv('Function getwidmongo parameterObject after', res[2], 99);
                proxyprinttodiv('Function getwidmongo parameterObject after', res[3], 99);
                proxyprinttodiv('Function getwidmongo parameterObject after', res[4], 99);
                callback(err, res)
            });
    }

    /* Adding data for a flat survey */
    exports.surveydtoflat = surveydtoflat = function surveydtoflat(params, callback) {

        execute([
                // Create the flatsurveydto dto 
                {
                    "executethis": "updatewid",
                    "wid": "flatsurveydto",
                    "metadata.method": "flatsurveydto",
                    "userdto": "userdto",
                    "surveydto": {
                        "questiondto": [{
                            "answerdto": [
                                "answerdto"
                            ]
                        }, {
                            "responsedto": [
                                "responsedto"
                            ]
                        }]
                    }
                },

                // Create the flatsurvey data
                {
                    "executethis": "updatewid",
                    "wid": "flatsurvey",
                    "metadata.method": "flatsurveydto",
                    "userdto": {
                        "metadata.method": "userdto",
                        "userid": "2",
                        "first": "Bill",
                        "last": "Duncan"
                    },
                    "surveydto": {
                        "metadata.method": "surveydto",
                        "title": "Happy Meter",
                        "description": "Daily rating of how you feel",
                        "questiondto": [{
                            "metadata.method": "questiondto",
                            "question": "How do you feel today?",
                            "answerdto": {
                                "metadata.method": "answerdto",
                                "answers": [
                                    "Outstanding",
                                    "Great",
                                    "Okay",
                                    "Tired",
                                    "Sick"
                                ]
                            },
                            "responsedto": [{
                                "response": "Outstanding",
                                "userid": "2"
                            }, {
                                "response": "Sick",
                                "userid": "3"
                            }, {
                                "response": "Tired",
                                "userid": "4"
                            }]
                        }, {
                            "metadata.method": "questiondto",
                            "question": "How do you think you will feel tomorrow?",
                            "answerdto": {
                                "metadata.method": "answerdto",
                                "answers": [
                                    "Fantastic",
                                    "Can't stop me now",
                                    "Okay",
                                    "I'll be better tomorrow",
                                    "Terrible"
                                ]
                            },
                            "responsedto": [{
                                "response": "Outstanding",
                                "userid": "2"
                            }, {
                                "response": "Okay",
                                "userid": "3"
                            }, {
                                "response": "Sick",
                                "userid": "4"
                            }]
                        }]
                    },
                }, {
                    "executethis": "getwidmaster",
                    "wid": "flatsurvey"
                }
            ],
            function (err, res) {
                callback(err, res)
            });
    }
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

    exports.mttest4 = mttest4 = function mttest4(params, callback) {
        console.log("<< mttest4 >>");

        var codedebug = false;
        if (codedebug) {
            debugcolor = 0;
            debugon = true;
            debugname = "";
            debugsubcat = "";
            debugcat = "mongoquerycode";
            debugfilter = "";
            debugdestination = 1;
            debuglevel = 30;
        }
        //debuglevel=17;
        /* adding wids */
        etappinstall();
        debugname = "updatewid";
        debugsubcat = "code";
        debugcat = "add";
        var addList = [{
            "executethis": "updatewid",
            "metadata.method": "colordto",
            "wid": "colordto",
            "hue": "string",
            "sat": "string"
        }, {
            "executethis": "updatewid",
            "metadata.method": "colordto",
            "wid": "color1",
            "hue": "red",
            "sat": "red-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color2",
            "metadata.method": "colordto",
            "hue": "green",
            "sat": "green-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color3",
            "metadata.method": "colordto",
            "hue": "blue",
            "sat": "blue-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color4",
            "metadata.method": "colordto",
            "hue": "cyan",
            "sat": "cyan-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color5",
            "metadata.method": "colordto",
            "hue": "magenta",
            "sat": "magenta-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color60",
            "metadata.method": "colordto",
            "relationshiptype": "attributes",
            "primarywid": "color8",
            "secondarywid": "color1"
        }, {
            "executethis": "updatewid",
            "wid": "color61",
            "metadata.method": "colordto",
            "relationshiptype": "attributes",
            "primarywid": "color8",
            "secondarywid": "color2"
        }, {
            "executethis": "updatewid",
            "wid": "color62",
            "metadata.method": "colordto",
            "relationshiptype": "attributes",
            "primarywid": "color8",
            "secondarywid": "color3"
        }, {
            "executethis": "updatewid",
            "wid": "color63",
            "metadata.method": "colordto",
            "relationshiptype": "attributes",
            "primarywid": "color8",
            "secondarywid": "color4"
        }, {
            "executethis": "updatewid",
            "wid": "color7",
            "metadata.method": "colordto",
            "hue": "black",
            "sat": "black-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color8",
            "metadata.method": "colordto",
            "hue": "black",
            "sat": "red-sat"
        }, {
            "executethis": "updatewid",
            "wid": "color9",
            "metadata.method": "colordto",
            "hue": "cyan",
            "sat": "red-sat"
        }, {
            "executethis": "updatewid",
            "wid": "colordto2",
            "metadata.method": "colordto2",
            "light": "string",
            "chroma": "string"
        }, {
            "executethis": "updatewid",
            "wid": "color10",
            "metadata.method": "colordto",
            "hue": "pink",
            "sat": "pink-sat",
            "colordto2.0.light": "pink-light",
            "colordto2.0.chroma": "pink-chroma",
            "colordto2.1.light": "pink-light1",
            "colordto2.1.chroma": "pink-chroma2",
            "colordto2.0.colordto3.intensity": "pink-intensity"
        }, {
            "executethis": "updatewid",
            "wid": "colordto3",
            "metadata.method": "colordto3",
            "intensity": "string"
        }];
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
        if (mongorawquerytests) {
            var queryList = [{
                "executethis": "querywid",
                "mongorawquery": '{"$or": [{ "wid": "color1" }]}'




            }];
            execute(queryList, function (err, res) {
                console.log(' >>> final response after queryList >>> ' + JSON.stringify(res));
            });
        }

        /* mongo single queries */
        if (mongosinglequerytests) {
            var queryList = [{
                "executethis": "querywid",
                "mongosinglequery": "color7",
                //"relationshipdirection": "forward",
                //"relationshiptype": "attributes",
                //"relationshipmethod": "first"
            }];
            execute(queryList, function (err, res) {
                console.log(' >>> final response after queryList >>> ' + JSON.stringify(res));
            });
        }

        if (relationshiptests) {
            var queryList = [{
                "executethis": "querywid",
                "mongowid": "color8",
                "mongorelationshipdirection": "forward",
                "mongorelationshiptype": "attributes",
                "mongorelationshipmethod": "first"
            }];
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


    exports.mttest1 = mttest1 = function mttest1(params, callback) {
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
        if (codedebug) {
            debugcolor = 0;
            debugon = true;
            debugname = "";
            debugsubcat = "";
            debugcat = "mongoquery";
            debugfilter = "";
            debugdestination = 1;
            debuglevel = 30;
        }

        /* adding wids */
        etappinstall();
        var executeList = [];
        executeList = addmttestdata(callback);
        execute(executeList, function (err, res) {
            console.log(' >>> final response after executerray >>> ' + JSON.stringify(res));
        });

        /* $or queries */
        if (ortests) {
            var mongorawquery = '{"$or":[{"data.a":"string"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [testdto]", result, 99);
            });

            var mongorawquery = '{"$or":[{"data.a":"1"},{"data.b":"1"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1]", result, 99);
            });
            //test fails
            var mongorawquery = '{"$or":[{"data.a":"1"},{"data.b":"16"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1, wid4]", result, 99);
            });

        }

        /* $and queries */
        if (andtests) {
            var mongorawquery = '{"$and":[{"data.a":"string"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [testdto]", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"1"},{"data.b":"1"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1]", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"1"},{"data.b":"16"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- []", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"1"},{"data.b":"1"},{"data.b":"1"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1]", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"1"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1]", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"5"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid5]", result, 99);
            });
        }

        /* $or-$or tests */
        if (orortests) {
            var mongorawquery = '{"$or":[{"data.a":"1"},{"$or":[{"data.b":"25"},{"data.a":"5"},{"data.a":"5"},{"data.a":"1"}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1,wid5]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"5"},{"$or":[{"data.b":"25"},{"$or":[{"data.a":"5"},{"$or":[{"data.b":"25"}]}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid5]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"5"},{"$or":[{"data.b":"16"}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid4,wid5]", result, 99);
            });
        }

        /* $and-$and queries */
        if (andandtests) {
            var mongorawquery = '{"$and":[{"data.a":"1"},{"$and":[{"data.b":"1"}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1]", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"5"},{"$and":[{"data.b":"25"}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid5]", result, 99);
            });
            //test fails
            var mongorawquery = '{"$and":[{"data.a":"5"},{"$and":[{"data.b":"25"},{"$and":[{"data.b":"1"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- []", result, 99);
            });
        }

        /* $or-$and queries */
        if (orandtests) {
            var mongorawquery = '{"$or":[{"data.a":"1"},{"$and":[{"data.b":"1"}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"5"},{"$and":[{"data.a":"4"},{"$and":[{"data.b":"1"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid5]", result, 99);
            });
        }

        /* fail test cases */
        if (failedtests) {
            var mongorawquery = '{"$and":[{"data.a":"4"},{"$or":[{"data.a":"2"},{"$or":[{"data.b":"16"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid4]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"1"},{"data.b":"16"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid1, wid4]", result, 99);
            });
        }

        /* 20 more test cases */
        if (orandtests20) {
            var mongorawquery = '{"$or":[{"data.a":"25"},{"$and":[{"data.a":"44"},{"data.a":"64"},{"$or":[{"data.b":"400"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid25]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"25"},{"$and":[{"data.a":"44"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid25]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"25"},{"$or":[{"data.a":"2"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"},{"$or":[{"data.a":"2"}]}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid2,wid20,wid25]", result, 99);
            });
            var mongorawquery = '{"$or":[{"data.a":"2"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"},{"$or":[{"data.a":"2"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid2,wid20,wid25]", result, 99);
            });
            //test fails
            var mongorawquery = '{"$and":[{"data.a":"25"},{"$or":[{"data.a":"2"},{"data.a":"64"},{"$or":[{"data.b":"400"},{"data.b":"625"},{"$or":[{"data.a":"2"}]}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid25]", result, 99);
            });
            var mongorawquery = '{"$and":[{"data.a":"4"},{"$and":[{"data.a":"2"},{"$or":[{"data.b":"16"}]}]}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [wid25]", result, 99);
            });
        }

        /* varify test cases */
        if (verifytests) {
            console.log("<< inside verifytests >>");

            var executeObj = {};
            executeObj["executethis"] = "querywid";
            executeObj["mongorawquery"] = '{"$or":[{"data.a":"string"}]}';
            executeList.push(executeObj);

            execute(executeList, function (err, res) {
                console.log(' >>> final response after executerray >>> ' + JSON.stringify(res));

                var expectedResultArray = [];
                expectedResultArray.push({
                    "wid": "testdto",
                    "metadata.method": "testdto",
                    "data.b": "string",
                    "data.a": "string"
                });
                params = logverify("mongoquery", "resultwid1", res[1], "", "", expectedResultArray);

                proxyprinttodiv("end of verify tests", "end of verify tests", 99);
            });
        }

        /* Sift Test cases */
        if (sifttests) {
            //sift syntax :-  var result =  sif({$operator:[cond],  [array]});
            var widArray = [{
                "wid": "testdto",
                "metadata": {
                    "method": "testdto"
                },
                "data": {
                    "b": "string",
                    "a": "string"
                }
            }, {
                "wid": "wid1",
                "metadata": {
                    "method": "testdto"
                },
                "data": {
                    "b": "1",
                    "a": "1"
                }
            }, {
                "wid": "wid2",
                "metadata": {
                    "method": "testdto"
                },
                "data": {
                    "b": "4",
                    "a": "2"
                }
            }, {
                "wid": "wid3",
                "metadata": {
                    "method": "testdto"
                },
                "data": {
                    "b": "9",
                    "a": "3"
                }
            }, {
                "wid": "wid4",
                "metadata": {
                    "method": "testdto"
                },
                "data": {
                    "b": "16",
                    "a": "4"
                }
            }, {
                "wid": "wid5",
                "metadata": {
                    "method": "testdto"
                },
                "data": {
                    "b": "25",
                    "a": "5"
                }
            }];
            var mongorawquery = {
                "$or": [{
                    "data.a": "string"
                }]
            };
            var result = sift(mongorawquery, widArray);
            proxyprinttodiv("widArray", widArray, 99);
            proxyprinttodiv("mongorawquery", mongorawquery, 99);
            proxyprinttodiv("result", result, 99);

            var mongorawquery = '{"$or":[{"data.a":"string"}]}';
            mongoquery(mongorawquery, function (err, result) {
                proxyprinttodiv("result from mongoquery with query " + mongorawquery + " -- expected result :- [testdto]", result, 99);
            });
        }

        params = {
            'test': 'PASS'
        };
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
        etappinstall();
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

        etappinstall();

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

        etappinstall();

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
        etappinstall();

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


        etappinstall();

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
	
	exports.ar100 = ar100 = function ar100(params, callback) {
		var object = {
			"metadata": {
				"method": "bookdto"
			},
			"wid": "222",
			"title": "The X Factor",
			"pages": "300"
		};
		var dtoobject = {
			"metadata": {
				"method": "bookdto"
			},
			"wid": "bookdto",
			"title": "string",
			"pages": "string",
			"c": "string",
			"d": "string"
		};
		var parentwid = "elizabeth_heart";
		var parentmethod = "bookdto";
		var relationshiptype = "onetomany";
		var command = {};
		/*
		for(i=0; i<500; i++){
			addrecord(object, dtoobject, parentwid, parentmethod, relationshiptype, command, function (err, res) {
				console.log( i + "addrecord! -- got res -->" + JSON.stringify(res));
			});	
		}
		*/
		
		// n times loop
		async.times(500, function(n, next){
			addrecord(object, dtoobject, parentwid, parentmethod, relationshiptype, command, function (err, res) {
				console.log( n + "addrecord! -- got res -->" + JSON.stringify(res));
			});
		}, function(err, result) {
			//after loop
		});
		
		params = {
			'test': 'PASS'
		};
		var err;
		callback(err, params);
	}
	
	/*
		deep filter test
	*/
	exports.d1 = d1 = function d1(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            }
        ], function (err, res) {	//after updatewid
			var dtoObjOpt = {"metadata":{"method":"string"},"a":"wid2","x":"wid2", "z":"wid2",
                            "c":"number","d":"date","q":{"w":{"e":"string"}},"g":"boolean", "b":[{"c":"string"}, {"d":"string"}], 
							"x1": [{"y":"string","d":"date", "b":[{"c":"string","c1":"number"}]}]};
			var inputObj = {"metadata":{"method":"defaultdto"},"a":"aaa", "x":"test", "z":"ggg",
                            "c":"30","d":"6/23/1912","q":{"w":{"e":"t"}},"g":"true", "b":[{"c":"one"}, {"d":"two"}],
							"x1":[{"y":"hello","d":"2/27/2014","b":[{"c":"one","c1":"50"}, {"c":"two","c1":"30"},{"c":"three","d":"30"}, {"cx":"two","c1x":"30"}]}]};
			var command = {"formatresult": "false", "command.deepfilter.convert":true};
			  
			deepfilter(inputObj, dtoObjOpt, command, function (err, res){
				proxyprinttodiv("after d1 deepfilter res", res, 99);
			});
			
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		number, string, boolean, date, nested string
	*/
	exports.d2 = d2 = function d2(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            }
        ], function (err, res) {	//after updatewid
			/*
				var dtoObjOpt = {"metadata":{"method":"string"},"a":"wid2","x":"wid2", "z":"wid2",
                            "c":"number","d":"date","q":{"w":{"e":"string"}},"g":"boolean"} ;
				var inputObj = {"metadata":{"method":"defaultdto"},"a":"aaa", "x":"test", "z":"ggg",
                            "c":"30","e":"f","d":"6/23/1912","q":{"w":{"e":"t"}},"g":"true"};
			*/

			var dtoObjOpt = {"c":"number", "h":"string", "g":"boolean","d":"date", "q":{"w":{"e":"string"}}, "x":{"y":{"z":"string"}}};
			var inputObj = {"c":"30", "h":"hval", "g":"true","d":"6/25/1912", "q":{"w":{"e":"t"}}, "x":{"y":{"z":"string"}}};
			var command = {"formatresult": "false"};
			  
			deepfilter(inputObj, dtoObjOpt, command, function(err, res){
				proxyprinttodiv("after d2 deepfilter res", res, 99);
			});
			
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		wid
	*/
	exports.d3 = d3 = function d3(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            }
        ], function (err, res) {	//after updatewid
			var dtoObjOpt = {"a":"wid2","x":"wid2"} ;
			var inputObj = {"a":"aaa", "x":"test"};
			var command = {"formatresult": "false"};
			  
			deepfilter(inputObj, dtoObjOpt, command, function (err, res){
				proxyprinttodiv("after d3 deepfilter res", res, 99);
			});
			
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		updatewid and getwidmaster
	*/
	exports.dupdateget4 = dupdateget4 = function dupdateget4(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid3",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('updatewid wid3 -- ', res, 99);
                    cb1(null);
                });
            },
			function (cb2) {
				var executeList = [{
					"executethis": "getwid",
					"wid": "wid3",
				}];
				execute(executeList, function (err, res) {
					//proxyprinttodiv("getwidmaster  wid3 -- ", res, 99);
                    cb2(null);
				});
			}
        ], function (err, res) {	//after updatewid
		
			params = {	
				'test': 'PASS'
			};
			callback(err,params);	
        });
	}
	
	/*	
		added test in wid
	*/
	exports.d5 = d5 = function d5(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": "",
					"test": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            },
			function (cb2){
				var dtoObjOpt = {"metadata":{"method":"string"},"a":"wid2","x":"wid2", "z":"wid2",
                            "c":"number","d":"date","q":{"w":{"e":"string"}},"g":"boolean"} ;
				var inputObj = {"metadata":{"method":"defaultdto"},"a":"aaa", "x":"test", "z":"ggg",
								"c":"30","d":"6/23/1912","q":{"w":{"e":"t"}},"g":"true"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("after d5 deepfilter res", res, 99);
					cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*	
		selected wid does not exist
	*/
	exports.d6 = d6 = function d6(params, callback) {
		async.series([
			function (cb2){
				var dtoObjOpt = {"metadata":{"method":"string"},"a":"wid6","x":"wid6", "z":"wid6",
                            "c":"number","d":"date","q":{"w":{"e":"string"}},"g":"boolean"} ;
				var inputObj = {"metadata":{"method":"defaultdto"},"a":"aaa", "x":"test", "z":"ggg",
								"c":"30","d":"6/23/1912","q":{"w":{"e":"t"}},"g":"true"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("after d6 deepfilter res", res, 99);
					cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*	
		dto = null,, then return same object
	*/
	exports.d7 = d7 = function d7(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            },
			function (cb2){
				/*var dtoObjOpt = {"metadata":{"method":"string"},"a":"wid2","x":"wid2", "z":"wid2",
                            "c":"number","d":"date","q":{"w":{"e":"string"}},"g":"boolean"} ;
				*/
				var	dtoObjOpt = null;			 
				var inputObj = {"metadata":{"method":"defaultdto"},"a":"aaa", "x":"test", "z":"ggg",
								"c":"30","d":"6/23/1912","q":{"w":{"e":"t"}},"g":"true"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("after d7 deepfilter res", res, 99);
					cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*	
		date
	*/
	exports.d8 = d8 = function d8(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            },
			function (cb2){
				var dtoObjOpt = {"d":"date"} ;		 
				var inputObj = {"d":"6/23/1912"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("after d8 deepfilter res", res, 99);
					cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		object dataType test
	*/
	exports.d10 = d10 = function d10(params, callback) {
		async.series([
            function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid5",
                    "metadata.method": "defaultdto",
					"aaa": "",
					"ggg": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            }
        ], function (err, res) {	//after updatewid
			var dtoObjOpt = {"obj":"", "c":"string", "d":{"executethis": "getwidmaster", "wid": "wid5"}};
			var inputObj = {"obj":"", "c":"cval", "d":{"executethis": "getwidmaster", "wid": "wid5"}};
			var command = {"formatresult": "false"};
			  
			deepfilter(inputObj, dtoObjOpt, command, function (err, res){
				proxyprinttodiv("after d10 deepfilter res", res, 99);
			});
			
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	

exports.d10b = d10b = function d10b(params, callback) {

    debuglevel=41;
    var obj = {"wid":"songdto","metadata":{"method":"songdto","sounddto":{"type":"jsononetomany"}},
                "title":"string","sounddto":{"wid":"string","metadata":{"method":"string"},"note":"string"}}

    var dto = {"wid":"string","metadata":{"method":"string","sounddto":{"type":"string"}},
                "title":"string","sounddto":[{"wid":"string","metadata":{"method":"string"},"note":"string"}],
                "command":{"dtolist":{"sounddto":"jsononetomany"}}}
    var command;
        if (!command) {command = {};}
        if (!command.deepfilter) {command.deepfilter = {};}
        command.deepfilter.convert = true;
//exepected
//{"wid":"songdto","metadata":{"method":"songdto","sounddto":{"type":"jsononetomany"}},
//"title":"string","sounddto":[{"wid":"string","metadata":{"method":"string"},"note":"string"}]}

    deepfilter(obj, dto,command, function (err, res) {
        proxyprinttodiv('Function d10b deepfilter result ', res, 99); 
       callback(err, res);  
        })
}

	
	/*
		test to confirm deepfilter with wid that returns query results works
	*/
	exports.d11 = d11 = function d11(params, callback) {
		async.series([
            function (cb1) {	//5 (a)
                var executeList = [
					{ "executethis": "updatewid", "wid": "wid1", "metadata.method": "defaultdto", "x": "y", "a": "r"}, 
					{ "executethis": "updatewid", "wid": "wid2", "metadata.method": "defaultdto", "w": "z", "a": "y"}, 
					{ "executethis": "updatewid", "wid": "wid3", "metadata.method": "defaultdto", "a": "b", "g": "f"}, 
					{ "executethis": "updatewid", "wid": "wid4", "metadata.method": "defaultdto", "h": "j", "k": "y", "a": "p"}
				];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1,2,3,4 -- ', res, 34);
                    cb1(null);
                });
            },
			function step2(cb2){	//5 (b)
				var executeList = [
					{ "executethis": "querywid", "mongorawquery": '{"$or": [{ "data.a": "b" }]}'}
				];
				execute(executeList, function (err, res) {
					//proxyprinttodiv("mongo query result ", res, 99);
					cb2(null);
				});
			},
			function step3(cb3){	//5 (c)
				var executeList = [
					{ "executethis": "updatewid", "wid": "wid5", "metadata.method": "defaultdto", "addthis.executethis":"querywid", "mongorawquery":"{data.a:b}"}
				];
				execute(executeList, function (err, res) {
					//proxyprinttodiv("after updatewid wid5 -- ", res, 99);
					cb3(null);
				});
			},
			function step4(cb4){	//5 (d)
				getwidmaster({"wid":"wid5", "command":{"getwidmaster":{"execute":"false"}}},function (err, res) {
					//proxyprinttodiv("5 (d) getwidmaster  wid5 -- ", res, 99);
                    cb4(null);
				});
			},
			function step5(cb5){	//5 (e)
				getwidmaster({"wid":"wid5"},function (err, res) {
					//proxyprinttodiv("5 (e) getwidmaster  wid5 -- ", res, 99);
                    cb5(null);
				});
			},
			function step6(cb6){	//5 (f)
				execute({"executethis":"wid5"},function (err, res) {
					//proxyprinttodiv("5 (f) getwidmaster  wid5 -- ", res, 99);
                    cb6(null);
				});
			},
			function step7(cb7){	//5 (g)
				execute("wid5",function (err, res) {
					//proxyprinttodiv("5 (g) getwidmaster  wid5 -- ", res, 99);
                    cb7(null);
				});
			},
			function step8(cb8){	//step 8 deep filter d = wid5
				var dtoObjOpt = {"obj":"", "c":"string", "d":"wid5"};
				var inputObj = {"c":"hello", "d":"wid3"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					//proxyprinttodiv("step 8 res--", res, 99);
					cb8(null);
				});
			},
			function step9(cb9){	//step 9 deep filter
				var dtoObjOpt = {"obj":"", "c":"string", "d":"wid5"};
				var inputObj = {"c":"hello", "d":"wid5"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					//proxyprinttodiv("step 9 res--", res, 99);
					cb9(null);
				});
			},
			function step10(cb10){	//step 10 deep filter
				var dtoObjOpt = {"obj":"", "c":"string", "d":{"executethis": "getwidmaster", "wid": "wid5"}};
				var inputObj = {"obj":"", "c":"cval", "d":{"executethis": "getwidmaster", "wid": "wid5"}};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("d11 - step 10 res--", res, 99);
					cb10(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		command.deepfilter.convert = true/false
	*/
	exports.d12 = d12 = function d12(params, callback) {
		async.series([
			function step1(cb1){	//without command
				var dtoObjOpt = {"b1":"boolean", "b2":"boolean"};
				var inputObj = {"b1":"true", "b2":false};
				var command = {};
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					//proxyprinttodiv("without command-- res ", res, 99);
					cb1(null);
				});
			},
			function step2(cb2){	//“command.deepfilter.convert”=“true”
				var dtoObjOpt = {"b1":"boolean", "b2":"boolean"};
				var inputObj = {"b1":"true", "b2":false};
				var command = {"command.deepfilter.convert":"true"};
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					//proxyprinttodiv("command.deepfilter.convert = true-- res ", res, 99);
					cb2(null);
				});
			},
			function step3(cb3){	//“command.deepfilter.convert”=“false”
				var dtoObjOpt = {"b1":"boolean", "b2":"boolean"};
				var inputObj = {"b1":"true", "b2":false};
				var command = {"command.deepfilter.convert":"false"};
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("d12 - command.deepfilter.convert = false-- res ", res, 99);
					cb3(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		make with query that returns more than one item…test like below
		it produces one result wid3
		make it produce two results wid7,8,9
		test deepfilter and make sure it does not break
	*/
	exports.d13 = d13 = function d13(params, callback) {
		async.series([
			function (cb1) {
                var executeList = [{
                    "executethis": "updatewid",
					"wid": "wid2",
                    "metadata.method": "defaultdto",
					"aaa": ""
                },
				{
                    "executethis": "updatewid",
					"wid": "wid3",
                    "metadata.method": "defaultdto",
					"bbb": ""
                }];
				execute(executeList, function (err, res) {
                    //proxyprinttodiv('after updatewid wid1 -- ', res, 34);
                    cb1(null);
                });
            },
			function (cb2){
				var dtoObjOpt = {"a":"wid2", "b":"wid2", "c":"wid3", "d":"wid3"} ;
				var inputObj = {"a":"aaa", "b":"test", "c":"bbb", "d":"dummy"};
				var command = {"formatresult": "false"};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
					proxyprinttodiv("after d13 deepfilter res", res, 99);
					cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });		
	}
	
	/*
		deep filter should process arrays
		i.e.
		dto=xdto
		a: string
		b: [c: string, d: string]

		inobj=
		a:test
		b:[{c:one, d:two}, {c:three, d:four}, {c:five, d:six}]
	*/
	exports.d14 = d14 = function d14(params, callback) {
		async.series([
			function (cb1){
				var dtoObjOpt = {"a":"string",
                                "y":"string",
                                "x": [{ "y":"string", 
                                        "b":[{"c":"string","c1":"number"}
                                            ]
                                    }
                                    ]
                                };
				var inputObj = {"a":"aval",
								"y":"yes",
                                "x":[{"y":"hello", 
                                      "b":[{"c":"one","c1":"50"}, 
                                           {"c":"two","c1":"30"},
                                           {"c":"three","d":"30"}, 
                                           {"cx":"two","c1x":"30"}
                                          ]
                                        }
                                    ], 
                                "q":"no"};
				var command = {"formatresult": "false", "command.deepfilter.convert":true};
				  
				deepfilter(inputObj, dtoObjOpt, command, function (err, res){
                    proxyprinttodiv("after d14 deepfilter in", inputObj, 99);
                    proxyprinttodiv("after d14 deepfilter out", dtoObjOpt, 99);
					proxyprinttodiv("after d14 deepfilter res", res, 99);
					cb1(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });
	}
	
	/*
		4) 
		We want to get our current getnewwid to come from a database:
		in et-utils change getnewwid
		execute(execute=getwid, wid=“currentwid”)
		if blank then wid = 1
		else wid=wid+1
		execute(execute=updatewid, wid=currentwid)
		return new wid
	*/
	exports.getnewwid1 = getnewwid1 = function getnewwid1(params, callback) {
		async.series([
			function (cb1) {
				getnewwid(function (err, res){
					proxyprinttodiv("after getnewwid", res, 99);
					cb1(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });		
	}

// DTO 1, dot > object 3, dot
exports.ettest1dot3dot = ettest1dot3dot = function ettest1dot3dot(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "metadata.sounddto.type": "onetomany",
            "sounddto.wid": "sounddto",
            "sounddto.metadata.method": "sounddto",
            "sounddto.note": "string"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "A flat"
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "B sharp"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
        }],
        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result ', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
                "title": "Highway to Hell",
                "wid": "song1",
                "metadata.method": "songdto",
                "sounddto.0.note": "A flat",
                "sounddto.0.wid": "2",
                "sounddto.0.metadata.method": "sounddto",
                "sounddto.1.note": "B sharp",
                "sounddto.1.wid": "4",
                "sounddto.1.metadata.method": "sounddto",
                "sounddto.2.note": "C flat",
                "sounddto.2.wid": "6",
                "sounddto.2.metadata.method": "sounddto",
                "metadata.sounddto.type": "onetomany"
            }]);

            //execute({"executethis": "getwidmaster","wid": "songdto",
            //      "command":{"getwidmaster":{"convertmethod":"dto",
            //                              "execute":"ConvertFromDOTdri",
            //                              "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}


// DTO 3, dot > object 3, dot
exports.ettest3dot3dot = ettest3dot3dot = function ettest3dot3dot(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "songdto",
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "sounddto",
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "onetomany",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "A flat"
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "B sharp"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[6], 17);

            res = logverify("ettestagag3_result", res[6], [{
        "title": "Highway to Hell",
        "sounddto.0.wid": "1",
        "sounddto.0.note": "A flat",
        "sounddto.0.metadata.method": "sounddto",
        "sounddto.1.wid": "3",
        "sounddto.1.note": "B sharp",
        "sounddto.1.metadata.method": "sounddto",
        "sounddto.2.wid": "5",
        "sounddto.2.note": "C flat",
        "sounddto.2.metadata.method": "sounddto",
        "wid": "song1",
        "metadata.method": "songdto",
        "metadata.sounddto.type": "onetomany"


            }]);
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot
exports.ettest3dot1dot = ettest3dot1dot = function ettest3dot1dot(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "songdto",
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "sounddto",
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "onetomany",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
        "title": "Highway to Hell",
        "sounddto.0.wid": "1",
        "sounddto.0.note": "A flat",
        "sounddto.0.metadata.method": "sounddto",
        "sounddto.1.wid": "3",
        "sounddto.1.note": "B sharp",
        "sounddto.1.metadata.method": "sounddto",
        "sounddto.2.wid": "5",
        "sounddto.2.note": "C flat",
        "sounddto.2.metadata.method": "sounddto",
        "wid": "song1",
        "metadata.method": "songdto",
        "metadata.sounddto.type": "onetomany"


            }]);
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot
exports.ettest1dot1dot = ettest1dot1dot = function ettest1dot1dot(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "metadata.sounddto.type": "onetomany",
            "sounddto.wid": "sounddto",
            "sounddto.metadata.method": "sounddto",
            "sounddto.note": "string"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],

        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[2], 17);

            res = logverify("ettestagag3_result", res[2], [{
        "title": "Highway to Hell",
        //"sounddto.0.wid": "2",
        //"sounddto.0.note": "A flat",
        //"sounddto.0.metadata.method": "sounddto",
        //"sounddto.1.wid": "4",
        //"sounddto.1.note": "B sharp",
        //"sounddto.1.metadata.method": "sounddto",
        "sounddto.2.wid": "6",
        "sounddto.2.note": "C flat",
        "sounddto.2.metadata.method": "sounddto",
        "wid": "song1",
        "metadata.method": "songdto",
        "metadata.sounddto.type": "onetomany"

            }]);

            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

/* jsononetomany tests */
// DTO 1, dot > object , dot,, jsononetomany
exports.ettest1dot3dotjsonmany = ettest1dot3dotjsonmany = function ettest1dot3dotjsonmany(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "metadata.sounddto.type": "jsononetomany",
            //"sounddto.wid": "sounddto",
            //"sounddto.metadata.method": "sounddto",
            "sounddto.wid": "string",
            "sounddto.metadata.method": "string",
            "sounddto.note": "string"

        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "A flat"
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "B sharp"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],

        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result ', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{"sounddto.0.note":"A flat","sounddto.1.note":"B sharp",
                "sounddto.2.note":"C flat","title":"Highway to Hell","wid":"song1","metadata.method":"songdto"}]
                );

            //[{"sounddto.0.note":"A flat","sounddto.1.note":"B sharp","sounddto.2.note":"C flat",
            //"title":"Highway to Hell","wid":"song1","metadata.method":"songdto"}]
            
            debuglevel=38;
            //execute({"executethis": "getwidmaster","wid": "songdto",
            //      "command":{"getwidmaster":{"convertmethod":"dto",
            //                              "execute":"ConvertFromDOTdri",
            //                              "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, jsononetomany
exports.ettest3dot3dotjsonmany = ettest3dot3dotjsonmany = function ettest3dot3dotjsonmany(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "songdto",
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "sounddto",
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "jsononetomany",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "A flat"
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "B sharp"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[6], 17);

            res = logverify("ettestagag3_result", res[6], [{
				"sounddto.0.note":"A flat","sounddto.1.note":"B sharp","sounddto.2.note":"C flat","title":"Highway to Hell","wid":"song1","metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, jsononetomany
exports.ettest3dot1dotjsonmany = ettest3dot1dotjsonmany = function ettest3dot1dotjsonmany(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "songdto",
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "sounddto",
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "jsononetomany",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
				"sounddto.0.note":"A flat","sounddto.1.note":"B sharp","sounddto.2.note":"C flat","title":"Highway to Hell","wid":"song1","metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, jsononetomany
exports.ettest1dot1dotjsonmany = ettest1dot1dotjsonmany = function ettest1dot1dotjsonmany(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "metadata.sounddto.type": "jsononetomany",
            "sounddto.wid": "sounddto",
            "sounddto.metadata.method": "sounddto",
            "sounddto.note": "string"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],

        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[2], 17);

            res = logverify("ettestagag3_result", res[2], [{"sounddto.0.note":"A flat","sounddto.1.note":"B sharp",
                "sounddto.2.note":"C flat","title":"Highway to Hell","wid":"song1","metadata.method":"songdto"}]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

/* jsononetoone tests */
// DTO 1, dot > object , dot,, jsononetoone
exports.ettest1dot3dotjsonone = ettest1dot3dotjsonone = function ettest1dot3dotjsonone(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "metadata.sounddto.type": "jsononetoone",
            //"sounddto.wid": "sounddto",
            //"sounddto.metadata.method": "sounddto",
            "sounddto.wid": "string",
            "sounddto.metadata.method": "string",
            "sounddto.note": "string"

        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "A flat"
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "B sharp"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],

        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result ', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
				"title":"Highway to Hell",
				"sounddto.note":"C flat",
				"wid":"song1",
				"metadata.method":"songdto"
            }]);

            debuglevel=38;
            //execute({"executethis": "getwidmaster","wid": "songdto",
            //      "command":{"getwidmaster":{"convertmethod":"dto",
            //                              "execute":"ConvertFromDOTdri",
            //                              "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, jsononetoone
exports.ettest3dot3dotjsonone = ettest3dot3dotjsonone = function ettest3dot3dotjsonone(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "songdto",
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "sounddto",
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "jsononetoone",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "A flat"
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "B sharp"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[6], 17);

            res = logverify("ettestagag3_result", res[6], [{
				"title":"Highway to Hell","sounddto.note":"C flat","wid":"song1","metadata.method":"songdto"
			}]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, jsononetoone
exports.ettest3dot1dotjsonone = ettest3dot1dotjsonone = function ettest3dot1dotjsonone(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "songdto",
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "sounddto",
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "jsononetoone",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
				"title":"Highway to Hell",
				//"sounddto.0.note":"A flat",
				//"sounddto.1.note":"B sharp",
				"sounddto.note":"C flat",
				"wid":"song1",
				"metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, jsononetoone
exports.ettest1dot1dotjsonone = ettest1dot1dotjsonone = function ettest1dot1dotjsonone(params, callback) {
    etappinstall();

    debuglevel = 17;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "metadata.sounddto.type": "jsononetoone",
            "sounddto.wid": "sounddto",
            "sounddto.metadata.method": "sounddto",
            "sounddto.note": "string"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
        }],
        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[2], 17);

            res = logverify("ettestagag3_result", res[2], [{
				"title":"Highway to Hell",
				//"sounddto.0.note":"A flat",
				//"sounddto.1.note":"B sharp",
				"sounddto.note":"C flat",
				"wid":"song1",
				"metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

/* object tests */
// DTO 1, dot > object , dot,, object
exports.ettest1dot3dotobject = ettest1dot3dotobject = function ettest1dot3dotobject(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata":{"method":"songdto"},
            "title": "string",
            "metadata.sounddto.type": "jsononetoone",
            //"sounddto.wid": "sounddto",
            //"sounddto.metadata.method": "sounddto",
            "sounddto":{"wid":"string"},
            "sounddto":{"metadata":{"method": "string"}},
            "sounddto":{"note":"string"}

        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto":{"note": "A flat"}
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto":{"note": "B sharp"}
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto":{"note": "C flat"}
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],

        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result ', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
                "title":"Highway to Hell","sounddto.note":"C flat","wid":"song1","metadata.method":"songdto"
            }]);

            debuglevel=38;
            //execute({"executethis": "getwidmaster","wid": "songdto",
            //      "command":{"getwidmaster":{"convertmethod":"dto",
            //                              "execute":"ConvertFromDOTdri",
            //                              "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, object
exports.ettest3dot3dotobject = ettest3dot3dotobject = function ettest3dot3dotobject(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata":{"method":"songdto"},
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata":{"method":"sounddto"},
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata":{"method": "relationshipdto"},
            "relationshiptype": "attributes",
            "linktype": "jsononetoone",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto":{"note": "A flat"}
        }, {            
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto":{"note": "B sharp"}
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto":{"note": "C flat"}
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],


        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[6], 17);

            res = logverify("ettestagag3_result", res[6], [{
				"title":"Highway to Hell",
                "sounddto.note":"C flat",
                "wid":"song1",
                "metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, object
exports.ettest3dot1dotobject = ettest3dot1dotobject = function ettest3dot1dotobject(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "metadata":{"method":"songdto"},
            "wid": "songdto",
            "title": "string",
        }, {
            "executethis": "addwidmaster",
            "metadata":{"method": "sounddto"},
            "wid": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_song_sound",
            "metadata":{"method": "relationshipdto"},
            "relationshiptype": "attributes",
            "linktype": "jsononetoone",
            "primarywid": "songdto",
            "primarymethod": "songdto",
            "secondarywid": "sounddto",
            "secondarymethod": "sounddto"
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
        }],
        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[4], 17);

            res = logverify("ettestagag3_result", res[4], [{
				"title":"Highway to Hell",
                // "sounddto.0.note":"A flat",
                // "sounddto.1.note":"B sharp",
                "sounddto.note":"C flat",
                "wid":"song1",
                "metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
                 
            })
        });
}

// DTO 3, dot > object 3, dot,, object
exports.ettest1dot1dotobject = ettest1dot1dotobject = function ettest1dot1dotobject(params, callback) {
    etappinstall();

    debuglevel = 0;

    execute([{
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata":{"method":"songdto"},
            "title": "string",
            "metadata":{"sounddto":{"type": "jsononetoone"}},
            "sounddto":{"wid": "sounddto"},
            "sounddto":{"metadata":{"method": "sounddto"}},
            "sounddto":{"note":"string"}
        }, {                       
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata":{"method":"songdto"},
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
         }
        ],

        function (err, res) {

            proxyprinttodiv('Function ag3 result Full res', res, 17);
            proxyprinttodiv('Function ag3 result 3 x 3', res[2], 17);

            res = logverify("ettestagag3_result", res[2], [{
				"title":"Highway to Hell",
                // "sounddto.0.note":"A flat",
                // "sounddto.1.note":"B sharp",
                "sounddto.note":"C flat",
                "wid":"song1",
                "metadata.method":"songdto"
            }]);
            debuglevel=38;
            // execute({"executethis": "getwidmaster","wid": "songdto",
            //       "command":{"getwidmaster":{"convertmethod":"dto",
            //                               "execute":"ConvertFromDOTdri",
            //                               "inheritflag":"true","dtotype":""}}}, function (err, res1) {
            execute({"executethis": "getwidmaster","wid": "song1"}, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 17); 
                callback(err, res); 
            })
        });
}

/*
ettest1dot3dotjsonmany
ettest3dot3dotjsonmany
ettest3dot1dotjsonmany
ettest1dot1dotjsonmany

ettest1dot3dotjsonone
ettest3dot3dotjsonone
ettest3dot1dotjsonone
ettest1dot1dotjsonone

ettest1dot3dotobject
ettest3dot3dotobject
ettest3dot1dotobject
ettest1dot1dotobject
*/

exports.ettestdot = ettestdot = function ettestdot(params, callback) {
    var result = [];
    var err;

    ettest1dot3dotjsonmany(result, function (err, r1) {
        result.push(r1);
        ettest3dot3dotjsonmany(result, function (err, r2) {
            result.push(r2);
            ettest3dot1dotjsonmany(result, function (err, r3) {
                result.push(r3);
                    ettest1dot3dotjsonone(result, function (err, r4) {
                        result.push(r4);
                            ettest1dot3dotjsonone(result, function (err, r5) {
                                result.push(r5);
                                ettest3dot3dotjsonone(result, function (err, r6) {
									result.push(r6);
									ettest3dot1dotjsonone(result, function (err, r7) {
										result.push(r7);
										ettest1dot1dotjsonone(result, function (err, r8) {
											result.push(r8);
											ettest1dot3dotobject(result, function (err, r9) {
												result.push(r9);
												ettest3dot3dotobject(result, function (err, r10) {
													result.push(r10);
													ettest3dot1dotobject(result, function (err, r11) {
														result.push(r11);
														ettest1dot1dotobject(result, function (err, r12) {
															result.push(r12);
															callback(err, result);
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

exports.alldeepfiltertests = alldeepfiltertests = function alldeepfiltertests(params, callback) {
    var result = [];
    var err;

    d1(result, function (err, r1) {
        result.push(r1);
        d2(result, function (err, r2) {
            result.push(r2);
            d3(result, function (err, r3) {
                result.push(r3);
					d5(result, function (err, r5) {
						result.push(r5);
						d6(result, function (err, r6) {
							result.push(r6);
							d7(result, function (err, r7) {
								result.push(r7);
								d8(result, function (err, r8) {
									result.push(r8);
										d10(result, function (err, r10) {
											result.push(r10);
											d10b(result, function (err, r10b) {
												result.push(r10b);
												d11(result, function (err, r11) {
													result.push(r11);
													d12(result, function (err, r12) {
														result.push(r12);
														d13(result, function (err, r13) {
															result.push(r13);
															d14(result, function (err, r14) {
																result.push(r14);
																callback(err, result);
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
	
	
	/*
		5)
		test inherit…metadata.dtoname.inherit=wid5 … look at examples in test.js
		first create a wid "defaultauthordtoactions"
		then create a dto , mention the inherit as you show
		"metadata": {
			"inherit": "defaultauthordtoactions"
		}
		then add some data using the dto
		then get it
		system will also get defaultauthroactions and include it as part of the results as  long as it passes deepfilter
	*/
	exports.ettestinherittest1 = ettestinherittest1 = function ettestinherittest1(params, callback) {
		etappinstall();
		debuglevel = 17;
		
		execute([{
                    "executethis": "addwidmaster",
					"wid": "bookdtoextra",
					"metadata.method": "bookdtoextra",
					"title": "string",
					"pages": "string"
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
					"metadata.inherit": "bookdefaultdto",
					"title": "string",
					"pages": "string"
                },{
                    "executethis": "addwidmaster",
					"wid": "bookdtowid111",
                    "metadata.method":"bookdto",
					"title": "Book Title1"
                    // notice no pages
                },{
                    "executethis": "getwidmaster",
                    "wid": "bookdtowid111",
                }
			], function (err, res) {
				proxyprinttodiv('Function bookdtowid111 result Full res', res, 17);
				
				proxyprinttodiv('Function bookdtowid111 res[4] ', res[4], 17);
				
				var expectedResult = [{"title":"Book Title1","wid":"bookdtowid111","metadata.method":"bookdto","pages":"300"}];
				proxyprinttodiv('Function bookdtowid111 expectedResult ', expectedResult, 17);
				
				res = logverify("bookdtowid111_result", res[4], expectedResult);
				debuglevel=38;
				execute({"executethis": "getwidmaster","wid": "bookdtowid111"}, function (err, res1) {
					proxyprinttodiv('Function bookdtowid111 result LAST ', res1, 17); 
					callback(err, res); 
				})
        });
	}
		
	/*
		5) 	check to see if declaring "type" in the dto is needed if we add a relationshipationship
			enter a dto using metadata.<>.type:onetoany
	*/
	exports.dtotypetest1 = dtotypetest1 = function dtotypetest1(params, callback) {
		async.series([
			function (cb1) {
				var executeList = [{
					"executethis": "addwidmaster",
					"wid": "songdto",
					"metadata.method": "songdto",
					"title": "string",
					"metadata.sounddto.type": "onetomany",
					"sounddto.wid": "sounddto",
					"sounddto.metadata.method": "sounddto",
					"sounddto.note": "string"

				}, {                       
					"executethis": "addwidmaster",
					"wid": "song1",
					"metadata.method": "songdto",
					"title": "Highway to Hell",
					"sounddto.note": "A flat"
				}, {
					"executethis": "getwidmaster",
					"wid": "song1"
				}];
                /*
                 another test where we enter authordto, then bookdto, then relationship record
                                 "executethis": "addwidmaster",
                 "wid": "rel_user_to_system",
                 "metadata.method": "relationshipdto",
                 "relationshiptype": "attributes",
                 "linktype": "onetoone",
                 "primarywid": "userdto",
                 "primarymethod": "userdto",
                 "secondarywid": "systemdto",
                 "secondarymethod": "systemdto"
                 and we do NOT have "metadata.bookdto.type": "onetomany",

                 the response for this should be "title": "Book Title1" and "pages": "300" (inherit pages from default)
				*/
				execute(executeList, function (err, res) {
					proxyprinttodiv('addwidmaster dtotypetest1 -- ', res, 99);
					cb1(null);
				});
			},
			function (cb2) {
				var executeList = [{
					"executethis": "getwid",
					"wid": "authordtowid111",
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("getwidmaster  authordtowid111 -- ", res, 99);
                    cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				'test': 'PASS'
			};
			callback(params);	
        });				
	}
	
	/*
		manytoone test
		author ----onetomany -->  book(s)   ---- manytoone --> publishing houses ---- onetomany --> addresses
	*/
	exports.manytoonetest = manytoonetest = function manytoonetest(params, callback) {
		async.series([
			function (cb1) {
				var executeList = [
				{		//authordto
					"executethis": "addwidmaster",
					"metadata.method": "authordto",
					"wid": "authordto",
					"name": "string"
				}, {	//bookdto
					"executethis": "addwidmaster",
					"metadata.method": "bookdto",
					"wid": "bookdto",
					"title": "string"
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
				}, {	//pubhousedto
					"executethis": "addwidmaster",
					"metadata.method": "pubhousedto",
					"wid": "pubhousedto",
					"coname": "string"
				}, {	//bookdto - pubhousedto
					"executethis": "addwidmaster",
					"wid": "rel_book_pubhouse",
					"metadata.method": "relationshipdto",
					"relationshiptype": "attributes",
					"linktype": "manytoone",
					"primarywid": "pubhousedto",
					"primarymethod": "pubhousedto",
					"secondarywid": "bookdto",
					"secondarymethod": "bookdto"
				},{		//addressdto
					"executethis": "addwidmaster",
					"metadata.method": "addressdto",
					"wid": "addressdto",
					"city": "string"
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
				}, {	//wid
					"executethis": "addwidmaster",
					"metadata.method": "authordto",
					"wid": "author1",
					"name": "devang",
                    "bookdto.title": "programming101",
                   // "bookdto.pubhousedto.coname": "bigco",
                    //"bookdto.pubhousedto.addressdto.city": "somecity"
				}, {
					"executethis": "getwidmaster",
					"wid": "author1"
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("manytoonetest getwidmaster -- ", res, 99);
					cb1(null);
				});
			},
			function (cb2) {
				var executeList = [{
					"executethis": "getwid",
					"wid": "author1",
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("manytoonetest  getwid -- ", res, 99);
                    cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				"test": "PASS"
			};
			callback({}, params);	
        });				
	}
	
	/*
		attest
		to add and get
	*/
	exports.attest = attest = function attest(params, callback) {
		async.series([
			function (cb1) {
				var executeList = [
				{		//authordto
					"executethis": "updatewid",
					"metadata.method": "authordto",
					"wid": "authordto",
					"name": "string"
				}, {	//wid
					"executethis": "updatewid",
					"metadata.method": "authordto",
					"wid": "author1",
					"name": "devang"
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("attest updatewid authordto, wid -- ", res, 99);
					cb1(null);
				});
			},
			function (cb2) {
				var executeList = [{
					"executethis": "getwid",
					"wid": "author1",
				}];
				execute(executeList, function (err, res) {
					proxyprinttodiv("attest  getwid author1-- ", res, 99);
                    cb2(null);
				});
			}
        ], function (err, res) {
			params = {	
				"test": "PASS"
			};
			callback(params, params);	
        });				
	}
	
	/*
		attest
		to add and get
	*/
	exports.hellopass = hellopass = function hellopass(params, callback) {
		params = {	
			"hello": "PASS"
		};
		callback({"test_errer": "test_error_data"}, params);				
	}

exports.wd1 = wd1 = function wd1(params, callback) {
    execute([{
            "executethis": "updatewid",
            "wid": "testing_update",
            "param_1": "cashews"
        }, {
            "executethis": "getwidmaster",
            "wid": "testing_update"
        }],
        function (err, res) {
            res = logverify("ettestwd1_result", res[1], [{
                "wid": "testing_update",
                "metadata.method": "defaultdto",
                "param_1": "cashews"
            }]);
            callback({"test_errer": "test_error_data"}, res);
        });
          
}

exports.wd2 = wd2 = function wd2(params, callback) {
    execute([{
            "executethis": "addwidmaster",
            "wid": "testing_update",
            "param_1": "cashews"
        }, {
            "executethis": "getwidmaster",
            "wid": "testing_update"
        }],
        function (err, res) {
            res = logverify("ettestwd2_result", res[1], [{
                "wid": "testing_update",
                "metadata.method": "defaultdto",
                "param_1": "cashews"
            }]);
            callback({"test_errer": "test_error_data"}, res);
        });
          
}
            // proxyprinttodiv('Function wd1 result ', res, 99);