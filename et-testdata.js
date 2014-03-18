// copyright (c) 2014 DRI
// create users
// creates wids
// we put users and put wids into groups
// we create actiongroups, targetroups, 
// we put groups insdie of groups
// we add permissions
// we test
//
// 
//
//


(function (window) {
    // {"executefilter" : {"query":{"$eq":{"type":"minute"}}}}
    exports.filter1 = filter1 = function filter1(params, callback) {
        debuglevel = 37;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;

        // create dtos  
        var executeList = [{
            // create simple ttdto
            "executethis": "addwidmaster",
            "wid": "ttdto1",
            "metadata.method": "ttdto1",
            "type": "string"
        }, {
            // create simple ttdto
            "executethis": "addwidmaster",
            "wid": "ttdto2",
            "metadata.method": "ttdto2",
            "type": "string"
        }];
        execute({
            "executethis": executeList,
            "executefilter": {
                "query": {
                    "$eq": {
                        "type": "minute"
                    }
                }
            }
        }, function (err, res) {
            proxyprinttodiv('Function filter1 added  ttdto -- ', res, 37);
            callback(null);
        });
    }
	
exports.authortest1 = authortest1 = function authortest1(){
	execute([{"executethis":"addwidmaster",
			"wid":"bookdto",
			"metadata.method":"bookdto",
			"title":"string"},
			
			{"executethis":"addwidmaster",
			"wid":"authordto",
			"metadata.method":"authordto",
			"name":"string",
			"metadata.bookdto.type":"onetomany"},
			
			{"executethis":"addwidmaster",
			"wid":"daniel",
			"metadata.method":"authordto",
			"name":"Daniel",
			"bookdto.title":"House of Horrors"}]);
}
	
    exports.createactiondto = createactiondto = function createactiondto() {
        execute([{
            "executethis": "addwidmaster",
            "wid": "actiondto",
            "metadata.method": "actiondto",
            "actionname": "string",
            "beforewid": "string",
            "afterwid": "string",
            "errorobject": "string",
            "metadata.queuedto.type": "onetomany",
            "metadata.systemdto.type": "onetoone"
        }, {
            // create relationships systemdto
            "executethis": "addwidmaster",
            "wid": "rel_actiondto_to_systemdto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "onetoone",
            "primarywid": "actiondto",
            "primarymethod": "actiondto",
            "secondarywid": "systemdto",
            "secondarymethod": "systemdto"
        }]);
    }

    exports.createtestaction = createtestaction = function createtestaction(wid, actionname, beforewid, afterwid, errorobject) {
        execute([{
            "executethis": "addwidmaster",
            "wid": wid,
            "metadata.method": "actiondto",
            "actionname": actionname,
            "beforewid": beforewid,
            "afterwid": afterwid,
            "errorobject": errorobject
        }]);
    }

    // Create an actiondto tree
    exports.createaction1 = createaction1 = function createaction1() {

        createtestaction("useraction1", "userdto", "read_stuff", "log_stuff", "err_obj");
        addgrouptowid("useraction1", "actiondto", "bottom_action", function (err, res) {
            cb1(null);
        });

        createtestaction("useraction2", "userdto", "read_stuff", "log_stuff", "err_obj");
        addgrouptowid("useraction2", "actiondto", "middle_action", function (err, res) {
            cb1(null);
        });

        createtestaction("useraction3", "userdto", "read_stuff", "log_stuff", "err_obj");
        addgrouptowid("useraction3", "actiondto", "top_action", function (err, res) {
            cb1(null);
        });

        //alert('next');
        addgrouptowid("bottom_action", "groupdto", "middle_action", function (err, res) {
            cb1(null);
        });
        //alert('next');        
        addgrouptowid("middle_action", "groupdto", "top_action", function (err, res) {
            cb1(null);
        });
    }

    exports.createactiontypedto = createactiontypedto = function createactiontypedto() {
        execute([{
            "executethis": "addwidmaster",
            "wid": "actiontypedto",
            "metadata.method": "actiontypedto",
            "actiontype": "string",
            "metadata.systemdto.type": "onetoone"
        }, {
            // create relationships systemdto
            "executethis": "addwidmaster",
            "wid": "rel_actiontypedto_to_systemdto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "onetoone",
            "primarywid": "actiontypedto",
            "primarymethod": "actiontypedto",
            "secondarywid": "systemdto",
            "secondarymethod": "systemdto"
        }]);
    }

    exports.createtestactiontype = createtestactiontype = function createtestactiontype(wid, actiontype) {
        execute([{
            "executethis": "addwidmaster",
            "wid": wid,
            "metadata.method": "actiondto",
            "actiontype": actiontype
        }]);
    }

    // Create an actiondto tree
    exports.createactiontype1 = createactiontype1 = function createactiontype1() {

        createtestactiontype("read_type", "read");
        addgrouptowid("read_type", "actiontypedto", "read_write", function (err, res) {
            cb1(null);
        });

        createtestactiontype("write_type", "write");
        addgrouptowid("write_type", "actiontypedto", "read_write", function (err, res) {
            cb1(null);
        });

        createtestactiontype("create_type", "create");
        addgrouptowid("create_type", "actiontypedto", "create_delete", function (err, res) {
            cb1(null);
        });

        createtestactiontype("delete_type", "delete");
        addgrouptowid("delete_type", "actiontypedto", "create_delete", function (err, res) {
            cb1(null);
        });

        addgrouptowid("read_write", "groupdto", "all_action_types", function (err, res) {
            cb1(null);
        });

        addgrouptowid("create_delete", "actiontypedto", "all_action_types", function (err, res) {
            cb1(null);
        });
    }

    exports.createdbdto = createdbdto = function createdbdto() {
        execute([{
            "executethis": "addwidmaster",
            "wid": "dbdto",
            "metadata.method": "dbdto",
            "data": "string",
            "metadata.systemdto.type": "onetoone"
        }, {
            // create relationships systemdto
            "executethis": "addwidmaster",
            "wid": "rel_dbdto_to_systemdto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": "onetoone",
            "primarywid": "dbdto",
            "primarymethod": "dbdto",
            "secondarywid": "systemdto",
            "secondarymethod": "systemdto"
        }]);
    }

    exports.createtestdata = createtestdata = function createtestdata(wid, data) {
        execute([{
            "executethis": "addwidmaster",
            "wid": wid,
            "metadata.method": "actiondto",
            "data": data
        }]);
    }

    exports.createdata1 = createdata1 = function createdata1() {

        createtestdata("data1", "stuff0");
        addgrouptowid("data1", "dbdto", "bottom_db", function (err, res) {
            cb1(null);
        });

        createtestactiontype("data1", "stuff1");
        addgrouptowid("data1", "dbdto", "middle_db", function (err, res) {
            cb1(null);
        });

        createtestactiontype("data1", "stuff2");
        addgrouptowid("data1", "dbdto", "top_db", function (err, res) {
            cb1(null);
        });

        addgrouptowid("bottom_db", "groupdto", "middle_db", function (err, res) {
            cb1(null);
        });

        addgrouptowid("middle_db", "groupdto", "top_db", function (err, res) {
            cb1(null);
        });
    }

    exports.test999 = test999 = function test999() {
        debuglevel = 38;

        execute([{
                "executethis": "addwidmaster",
                "wid": "authordto",
                "name": "string",
                "metadata.method": "authordto",
                "metadata.bookdto.type": "onetomany",
                "bookdto.wid": "bookdto",
                "bookdto.title": "string",
                "bookdto.metadata.method": "bookdto"
            }, {
                "executethis": "addwidmaster",
                "wid": "marysue",
                "metadata.method": "authordto",
                "name": "Mary Sue",
                "bookdto.title": "Haunted Mansions"
            }, {
                "executethis": "getwidmaster",
                "wid": "marysue"
            }],
            function (err, res) {
                proxyprinttodiv('getwidmaster of marysue ', res, 35);
            }
        );
    }
    // "executethis": "addwidmaster",
    // "wid": "songdto",
    // "metadata.method": "songdto",
    // "title": "string",
    // "metadata.sounddto.type": "onetomany",
    // "sounddto.wid": "sounddto",
    // "sounddto.metadata.method": "sounddto",
    // "sounddto.note": "string"
    exports.test998 = test998 = function test998(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test
        // var status = false;
        debuglevel = 39;
        // debugname = "";
        // saveglobal("debugcat", "");
        // saveglobal("debugsubcat", "code");
        async.series([
            function (cb1) {
                createsystemdtos({}, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                createtestuser("user1", "user1ac", 99, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                createtestuser("user2", "user2ac", 99, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                //userwid, granteegroup, actiongroup, dbgroup, levelgroup,
                addpermission("user1", "user2", "createcoupon0", "data", 50, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                addgrouptowid("user2", "userdto", "group1", function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                //ac, actiongroup, targetaction, dbgroup
                testsecurity("user2ac", "user1", "createcoupon0", "data", true, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                addgrouptowid("anything0", "userdto", "createcoupon0", function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                    status = res;
                    cb1(null);
                });
            }

        ], function (err, res) {
            execute({
                "executethis": "getwidmaster",
                "wid": "user1"
            }, function (err, res) {
                proxyprinttodiv('test998 --- getwidmaster on user1 >>>>>> ', res, 35);
                execute({
                    "executethis": "getwidmaster",
                    "wid": "user2"
                }, function (err, res) {
                    proxyprinttodiv('test998 --- getwidmaster on user2 >>>>>> ', res, 35);
                    callback(err, status);
                });
            });

        });
    }

    exports.test999 = test999 = function test999(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test
        // var status = false;
        debuglevel = 35;
        // debugname = "";
        // saveglobal("debugcat", "");
        // saveglobal("debugsubcat", "code");
        async.series([
            function (cb1) {
                createsystemdtos({}, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                createtestuser("user1", "user1ac", 99, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                createtestuser("user2", "user2ac", 99, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {

                addpermission("user1", "user2", "createcoupon0", "data", 50, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                addgrouptowid("user2", "userdto", "group1", function (err, res) {
                    cb1(null);
                });
                // },
                // function (cb1) {
                //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     addgrouptowid("anything0", "userdto", "createcoupon0", function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                //         status = res;
                //         cb1(null);
                //     });
            }

        ], function (err, res) {
            execute({
                "executethis": "getwidmaster",
                "wid": "user1"
            }, function (err, res) {
                proxyprinttodiv('test999 --- getwidmaster on user1 >>>>>> ', res, 35);
                execute({
                    "executethis": "getwidmaster",
                    "wid": "user2"
                }, function (err, res) {
                    proxyprinttodiv('test999 --- getwidmaster on user2 >>>>>> ', res, 35);
                    callback(err, status);
                });
            });

        });
    }

    exports.test1000 = test1000 = function test1000(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test
        // var status = false;
        debuglevel = 35;
        // debugname = "";
        // saveglobal("debugcat", "");
        // saveglobal("debugsubcat", "code");
        async.series([
                function (cb1) {
                    // setup schema data
                    createsystemdtos({}, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    // create testuser rogeruser0
                    createtestuser("rogeruser0", "rogerac0", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    // add permission for rogeruser0 
                    addpermission("codyuser1", "rogeruser0", "createcoupon0", "data", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("codyuser0", "codyac0", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser0", "codyuser0", "createcoupon0", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    // call security check without mygroup (for cody)
                    // _accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel
                    testsecurity("codyac0", undefined, "createcoupon0", "execute", "data", 99, function (err, res) {

                        cb1(null);
                    });
                },

                function (cb1) {
                    addgrouptowid("codyuser0", "userdto", "driemployeegroup0", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser0", "codyuser0", "createcoupon0", "data", 50, function (err, res) {
                        cb1(null);
                    });
                    // },
                    // function (cb1) {
                    //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                    //         cb1(null);
                    //     });
                    // },
                    // function (cb1) {
                    //     addgrouptowid("anything0", "userdto", "createcoupon0", function (err, res) {
                    //         cb1(null);
                    //     });
                    // },
                    // function (cb1) {
                    //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                    //         status = res;
                    //         cb1(null);
                    //     });
                }

            ],

            function (err, res) {
                callback(err, status);

            });
    }


    // roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 99 so this should work.
    exports.test1001 = test1001 = function test1001(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser1", "codyac1", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("rogeruser1", "rogerac1", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser1", "codyuser1", "executethis", "createcoupon1", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac1", "executethis", "createcoupon1", "data", true, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1001 --  ' + JSON.stringify(res));
                callback(err, status);
            });
    }

    // roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 0 so this should fail.
    exports.test1002 = test1002 = function test1002(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser2", "codyac2", 0, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("rogeruser2", "rogerac2", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser2", "codyuser2", "executethis", "createcoupon2", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac2", "executethis2", "createcoupon2", "data", false, function (err, res) {
                        proxyprinttodiv('after testsecurity -- ', res, 35);
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                proxyprinttodiv('created testdata for test1002 -- ', JSON.stringify(res), 35);
                console.log('created testdata for test1002 --  ' + JSON.stringify(res));
                callback(err, status);
            });
    }

    // cody is made a member of the dri employees group. roger gives dri employees permission to create data wids.
    // cody should be able to create a datawid.
    exports.test1003 = test1003 = function test1003(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser3", "codyac3", 99, function (err, res) {
                        cb1(err);
                    });
                },
                function (cb1) {
                    createtestuser("rogeruser3", "rogerac3", 99, function (err, res) {
                        cb1(err);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser3", "userdto", "driemployeesgroup3", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser3", "driemployeesgroup3", "executethis", "createdatawid3", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac3", "executethis", "createdatawid3", "data", true, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1003 --  ' + JSON.stringify(res));
                callback(err, status);
            });

    }

    // drimanagers is made a member of driemployees group. Cody gives dri managers permission to edit coupons. Bill should be able to edit Cody's coupons.
    exports.test1004 = test1004 = function test1004(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser4", "codyac4", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("rogeruser4", "rogerac4", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("billuser4", "billac4", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser4", "driemployeesgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("billuser4", "userdto", "drimanagersgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("rogeruser4", "userdto", "drimanagersgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("drimanagersgroup4", "groupnamedto", "driemployeesgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("codyuser4", "drimanagersgroup4", "executethis", "editcoupon4", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("billac4", "executethis", "createdatawid4", "data", true, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1004 --  ' + JSON.stringify(res));
                callback(err, status);
            });

    }

    // cody is made a member of the dri employees group. roger gives dri employees permission to create data wids. cody should not be able to create a datawid as his security level is too low.
    exports.test1005 = test1005 = function test1005(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser5", "codyac5", 0, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("rogeruser5", "rogerac5", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser5", "userdto", "driemployeesgroup5", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser5", "driemployeesgroup5", "executethis", "createdatawid5", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac5", "executethis", "createdatawid5", "data", false, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1005 --  ' + JSON.stringify(res));
                callback(err, status);
            });
    }

    // drimanagers is made a member of driemployees group. 
    // Cody gives dri managers permission to edit coupons. Bill should be able to edit Cody's coupons.
    exports.test1006 = test1006 = function test1006(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser6", "codyac6", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("rogeruser6", "rogerac6", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createtestuser("billuser6", "billac6", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser6", "userdto", "driemployeesgroup6", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("billuser6", "userdto", "drimanagersgroup6", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("rogeruser6", "userdto", "drimanagersgroup6", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("codyuser6", "drimanagersgroup6", "executethis", "editcoupon6", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("billac6", "executethis", "editcoupon6", "data", true, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1006 --  ' + JSON.stringify(res));
                callback(err, status);
            });
    }


    // driemployees is made a member of usersofdri. roger gives driusers read permission on coupons. cody is made a member of driemployees. cody should be able to read coupons. 
    exports.test1007 = test1007 = function test1007(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;

        async.series([
                function (cb1) {
                    createtestuser("codyuser7", "codyac7", 99, function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createtestuser("rogeruser7", "rogerac7", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser7", "userdto", "driemployees7", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    addgrouptowid("driemployees7", "groupnamedto", "driusers7", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    addpermission("rogeruser7", "driusers7", "executethis", "readcoupon7", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    testsecurity("codyac7", "executethis", "readcoupon7", "data", true, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('created testdata for test1007 --  ' + JSON.stringify(res));
                callback(err, status);
            });

    }

    //
    exports.test1008 = test1008 = function test1008(params, callback) {
        debuglevel = 39;
        debugname = "";
        saveglobal("debugcat", "");
        saveglobal("debugsubcat", "code");
        var status = false;
        async.series([
                function (cb1) {
                    createtestuser("codyuser8", "codyac8", 99, function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {

                    createtestuser("rogeruser8", "rogerac8", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser8", "userdto", "driemployees8", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    addgrouptowid("driemployees8", "groupnamedto", "driusers8", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    addpermission("rogeruser8", "driusers8", "executethis", "readcoupon8", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    testsecurity("codyac8", "executethis", "readcoupon8", "data", true, function (err, res) {
                        var status = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('created testdata for test1008 --  ' + JSON.stringify(res));
                callback(err, status);
            });


    }




    // Simple create user, add user to group with permission to create a coupon, and then try to execute createcoupon. This should succeed.
    exports.ctest1 = ctest1 = function ctest1(parm, callback) {
        var executeList = [
            function (cb1) {
                createtestuser("rogerboss", "bossac", "99", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) {
                createtestuser("codyuser", "codyac", "99", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) { // add codyuser to the driemployeesgroup
                addgrouptowid("codyuser", "userdto", "driemployeegrp", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) { // rogerboss allows anyone in driemployees to executethis to cretecoupon
                addpermission("rogerboss", "driemployeegrp", "createdricoupon", "test", "50", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) {
                testsecurity("codyac", "executethis", "createdricoupon", "test", true, function (err, res) {
                    cb1(null);
                });
            }
        ];


        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest1 --  >>>>>> FINAL >>>>>    -- ', res3, 35);
            callback(err, res3);
        });
    }

    // rogerboss gives the driusergrp permission to execute createcoupon. cody is added to the driusergrp. driusergrp is added to the driemployeegrp. This should succeed.
    exports.ctest2 = ctest2 = function ctest2(parm, callback) {


        var executeList = [
            function (cb1) {
                createtestuser("rogerboss", "bossac", "99", cb1);
            },

            function (cb1) {
                createtestuser("codyuser", "codyac", "99", cb1)
            },
            function (cb1) {
                creategroup(driusergrp, cb1);
            },

            function (cb1) { // add codyuser to the driusergrp
                addgrouptowid("codyuser", "groupnamedto", "driusergrp", cb1);
            },

            function (cb1) { // add driusers to the driemployeesgrp
                addgrouptowid("driusergrp", "groupnamedto", "driemployeegrp", cb1);
            },

            function (cb1) { // rogerboss allows anyone in driusergrp to executethis to cretecoupon
                addpermission("rogerboss", "driusergrp", "createdricoupon", "test", "50", cb1);
            },

            function (cb1) {
                testsecurity("codyac", "executethis", "createdricoupon", "test", true, cb1);
            }

        ];


        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest2 --  >>>>>> FINAL >>>>>    -- ', res3, 35);
            cb2(err, res3);
        });
    }

    // rogerboss gives the driemployeegrp permission to execute createcoupon. cody is added to the driusergrp. driusergrp is added to the driemployeegrp. This should succeed.
    exports.ctest3 = ctest3 = function ctest3(parm, callback) {

        var executeList = [
            function (cb1) {
                createtestuser("rogerboss", "bossac", "99", cb1);
            },

            function (cb1) {
                createtestuser("codyuser", "codyac", "99", cb1)
            },
            function (cb1) {
                creategroup(driusergrp, cb1)
            },

            function (cb1) { // add codyuser to the driusergrp
                addgrouptowid("codyuser", "groupnamedto", "driusergrp", cb1);
            },

            function (cb1) { // add driusers to the driemployeesgrp
                addgrouptowid("driusergrp", "groupnamedto", "driemployeegrp", cb1);
            },

            function (cb1) { // rogerboss allows anyone in driemployees to executethis to cretecoupon
                addpermission("rogerboss", "driemployeegrp", "createdricoupon", "test", "50", cb1);
            },

            function (cb1) {
                testsecurity("codyac", "executethis", "createdricoupon", "test", true, cb1);
            }

        ];

        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest3 --  >>>>>> FINAL >>>>>    -- ', res3, 35);
            callback(err, res3);
        });
    }

    //EspressoBay gives ebemployeesgrp permission to executethis to createcoupon. Cody is not part of the ebemployeesgrp so he should not be able to execute createcoupon.
    exports.ctest4 = ctest4 = function ctest4(parm, callback) {
        var executeList = [
            function (cb1) {
                createtestuser("espressobay", "espressoac", "99", cb1);
            },

            function (cb1) {
                createtestuser("codyuser", "codyac", "99", cb1)
            },
            function (cb1) {
                creategroup(ebemployeesgrp, cb1);
            },

            function (cb1) { // espressobay allows anyone in ebemployeesgroup to executethis to cretecoupon
                addpermission("espressobay", "ebemployeesgrp", "create_espressobay_coupon", "test", "50", cb1);
            },

            function (cb1) {
                testsecurity("codyac", "executethis", "create_espressobay_coupon", "test", false, cb1);
            }

        ];
        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest4 --  >>>>>> FINAL >>>>>    -- ', res3, 35);
            callback(err, res3);
        });
    }

    // Cody is added to driusers1 and Bill is added to driusers2. driusers1 & driusers2 are added to driemployeesgrp. roger gives driemployeesgrp permission to execute createcoupon.
    exports.ctest5 = ctest5 = function ctest5(parm, callback) {


        var executeList = [
            function (cb1) {
                createtestuser("rogerboss", "bossac", "99", cb1);
            },

            function (cb1) {
                createtestuser("codyuser", "codyac", "99", cb1)
            },

            function (cb1) {
                createtestuser("billuser", "billac", "99", cb1)
            },

            function (cb1) {
                creategroup(driemployeegrp, cb1);
            },

            function (cb1) { // add codyuser to the driusergrp
                addgrouptowid("codyuser", "groupnamedto", "driusergrp1", cb1);
            },

            function (cb1) { // add billuser to the driusergrp
                addgrouptowid("billuser", "groupnamedto", "driusergrp2", cb1);
            },

            function (cb1) { // add driusers1 to the driemployeesgrp
                addgrouptowid("driusergrp1", "groupnamedto", "driemployeegrp", cb1);
            },

            function (cb1) { // add driusers2 to the driemployeesgrp
                addgrouptowid("driusergrp2", "groupnamedto", "driemployeegrp", cb1);
            },

            function (cb1) { // rogerboss allows anyone in driemployeegrp to executethis to cretecoupon
                addpermission("rogerboss", "driemployeegrp", "createdricoupon", "test", "50", cb1);
            },

            function (cb1) {
                testsecurity("codyac", "executethis", "createdricoupon", "test", true, cb1);
            },

            function (cb1) {
                testsecurity("billac", "executethis", "createdricoupon", "test", true, cb1);
            }

        ];

        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest5 --  >>>>>> FINAL >>>>>    -- ', res3, 35);
            callback(err, res3);
        });
    }

    // Cody is added to driusergrp1. Roger gives driusergrp1 permission to execute createcoupon. Cody's loginlevel is only 49, which is less than 50. Cody can't proceed.
    exports.ctest6 = ctest6 = function ctest6(parm, callback) {
        debuglevel = 39;

        var executeList = [
            function (cb1) {
                createtestuser("rogerboss", "rogerac", "99", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) {
                createtestuser("codyuser", "codyac", "49", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) { // add codyuser to the driusergrp
                addgrouptowid("codyuser", "userdto", "driusergrp1", function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                creategroup("driusergrp1", function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) { // rogerboss allows anyone in driemployees to executethis to cretecoupon
                addpermission("rogerboss", "driusergrp1", "createcoupon", "data", "99", function (err, res) {
                    cb1(null);
                });
            },

            function (cb1) {
                securitycheck("codyac", "executethis", "createcoupon", "test", false, function (err, res) {
                    cb1(null);
                });
            }
        ];

        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest6 --  >>>>>> FINAL >>>>>    -- ', res3, 35);
            callback(err, res3);
        });

    }

    exports.ctest7 = ctest7 = function ctest7(parm, callback) {
        var executeList = [
            function (cb1) {
                createsystemdtos({}, cb1);
            },
            function (cb1) {
                createtestuser("rogerboss", "bossac", "99", cb1);
            },
            function (cb1) {
                execute({
                    "executethis": "getwidmaster",
                    "wid": "rogerboss"
                }, cb1);
            }
        ];
        async.series(executeList, function (err, res3) {
            proxyprinttodiv('Function ctest7 --  >>>>>> FINAL >>>>>    -- ', res3, 99);
            callback(err, res3);
        });
    }



    // creates test data for different tests to be run :: generates data and adds a new user 
    exports.createtestuser = createtestuser = function createtestuser(userwid, ac, loginlevel, cb2) {

        execute([{
                // add user 
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                // "metadata.owner": "system",
                "wid": userwid,
                "fname": "john",
                "lname": "doe",
                "email": "jj@gmail.com",
                "email2": "",
                "address": "123 pleasant lane",
                "address2": "apt 101",
                "city": "Pleasantville",
                "state": "Florida",
                "zip": "26539",
                // security data
                "systemdto.securitydto.logged_id": "true",
                "systemdto.securitydto.accesstoken": ac,
                "systemdto.securitydto.level": loginlevel,
                // category data
                "systemdto.categorydto.categorytype": "categorytype",
                "systemdto.categorydto.categoryname": "categoryname",

            }],
            function (err, res) {
                proxyprinttodiv('Function createtestuser done --  >>>>>> added user >>>>>  for  -- ' + userwid, res, 35);
                // addsecurity(userwid, true, ac, loginlevel, function (err, res1) {
                //     proxyprinttodiv('Function addsecurity done --  >>>>>> added security >>>>>  for  -- ' + userwid, res1, 35);
                //     addcategory(userwid, true, "categoryname", function (err, res2) {
                //         proxyprinttodiv('Function addcategory --  >>>>>> added category >>>>> for   -- ' + userwid, res2, 35);

                execute({
                    "executethis": "getwidmaster",
                    "wid": userwid
                }, function (err, res3) {
                    proxyprinttodiv('Function createtestuser --  >>>>>> FINAL USER >>>>>    -- ' + userwid, res3, 35);
                    cb2(err, res3);
                })
                //     });
                // });
            });
    }

    // takes in needed details and does a security check on the basis of data received against the DB data received
    // user is identified by the access token
    // db says which DB to be used
    // actiongroup says the type of wid the action is being tried upon
    // targetaction is the action being executed on the wid
    exports.testsecurity = testsecurity = function testsecurity(_accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, callback) {
        securitycheck(_accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, function (err, res) {
            proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response -- ', res, 35);
            callback(err, res)
        });
    }

    exports.zx1 = zx1 = function zx1(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test
        // var status = false;
        debuglevel = 39;
        // debugname = "";
        // saveglobal("debugcat", "");
        // saveglobal("debugsubcat", "code");
        async.series([
                function (cb1) {
                    createtestuser("rogeruser0", "rogerac0", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    //alert('Entering execution phase...');
                    execute({
                        "executethis": "addwidmaster",
                        "wid": "rogeruser0",
                        "metadata.method": "userdto",
                        "systemdto.permissiondto.granteegroup": "coduser1",
                        "systemdto.permissiondto.actiongroup": "createcoupon0",
                        "systemdto.permissiondto.dbgroup": "data",
                        "systemdto.permissiondto.levelgroup": "99"
                    }, function (err, res) {
                        proxyprinttodiv('added permissions to rogeruser0 >>>>>> ', res, 99);
                        cb1(null);
                    });
                },
                function (cb1) {
                    execute({
                        "executethis": "getwidmaster",
                        "wid": "systemdto",
                        "metadata.method": "systemdto"
                    }, function (err, res) {
                        proxyprinttodiv('getwidmaster on systemdto ', res, 99);
                        cb1(null);
                    });
                },

                function (cb1) {
                    createtestuser("codyuser0", "codyac0", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser0", "codyuser0", "createcoupon0", "data", 50, function (err, res) {
                        cb1(null);
                    });
                }
                // function (cb1) {
                //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     addgrouptowid("codyuser0", "userdto", "driemployeegroup0", function (err, res) {
                //         cb1(null);

                //     });
                // },
                // function (cb1) {
                //     addpermission("rogeruser0", "codyuser0", "createcoupon0", "data", 50, function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     addgrouptowid("anything0", "userdto", "createcoupon0", function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                //         status = res;
                //         cb1(null);
                //     });
                // }

            ],
            function (err, res) {
                console.log('created testdata for zx1 --  ' + JSON.stringify(res));
                callback(err, status);

            });
    }


    exports.freshgroups1 = freshgroups1 = function freshgroups1(parm, callback) {
        debuglevel = 39;

        getactionlist("", "getwidmaster", "", "", "", function (err, res) {
            proxyprinttodiv('Function freshgroups -- res', res, 39);
            callback(err, res);
        });
    };

    exports.freshgroups2 = freshgroups2 = function freshgroups2(parm, callback) {
        debuglevel = 39;

        getaccountlist("cody", "", "", "", "", function (err, res) {
            proxyprinttodiv('Function freshgroups2 -- res', res, 39);
            callback(err, res);
        });
    };

    exports.freshgroups3 = freshgroups3 = function freshgroups3(parm, callback) {
        debuglevel = 39;

        getdblist("", "", "", "data", "", function (err, res) {
            proxyprinttodiv('Function freshgroups3 -- res', res, 39);
            callback(err, res);
        });
    };

    exports.freshgroups4 = freshgroups4 = function freshgroups4(parm, callback) {
        debuglevel = 39;
        var arr = [];
        async.series([
                function (cb1) {
                    // creste schema data
                    getgroupsrecursive("cody", "group", [], function (err, res) {
                        proxyprinttodiv('Function freshgroups4 -- res', res, 39);
                        arr = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('Function fresh 3 -- add data and test --  ' + JSON.stringify(arr));
                callback(err, arr);
            });
    };


    exports.freshgroups5 = freshgroups5 = function freshgroups5(parm, callback) {
        debuglevel = 39;
        var arr = [];
        async.series([
                function (cb1) {
                    // creste schema data
                    getgroupsrecursive("cody", "granteegroup", [], function (err, res) {
                        proxyprinttodiv('Function freshgroups4 -- res', res, 39);
                        arr = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('Function fresh 3 -- add data and test --  ' + JSON.stringify(arr));
                callback(err, arr);
            });
    };

    function createuserdata(cb) {
        async.series([
            function (cb1) {
                // create users -- create user roger
                createtestuser("roger", "rogerac", 99, function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- roger', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create users -- create user cody
                createtestuser("cody", "codyac", 99, function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 createtestuser -- cody', res, 39);
                    cb1(null);
                });
            }
        ], function (err, res) {
            cb(err, res);
        });
    }

    function creategroupdata(cb) {
        async.series([
            function (cb1) {
                // create groups driemployee
                creategroup("driemployee", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- driemployee', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create groups drimanager
                creategroup("drimanager", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- group -- drimanager', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create groups  "execute"
                creategroup("execute", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- actiontype -- execute', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create groups  "clean"
                creategroup("clean", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- actiontype -- clean', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create groups action --  default_dto_read
                creategroup("addwidmaster", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- addwidmaster', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create groups action --  getwidmaster
                creategroup("getwidmaster", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- getwidmaster', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // create groups db --  data
                creategroup("data", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 creategroup -- data', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // add group to wid -- addwidmaster to addwidmaster wid
                // wid, widmethod, groupname,grouptype, 
                addgrouptowid("addwidmaster", "groupdto", "addwidmaster", "action", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addgrouptowid added  group to wid -- addwidmaster to addwidmaster', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // add group to wid -- getwidmaster to getwidmaster wid
                addgrouptowid("getwidmaster", "groupdto", "getwidmaster", "action", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addgrouptowid added  group to wid -- getwidmaster to getwidmaster', res, 39);
                    cb1(null);
                });
            },

            function (cb1) {
                // add group to wid -- drimanager to roger wid
                addgrouptowid("roger", "userdto", "drimanager", "group", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addgrouptowid added  group to wid -- drimanager to roger', res, 39);
                    cb1(null);
                });
            },

            function (cb1) {
                // add group to wid -- driemployee to roger wid
                addgrouptowid("roger", "userdto", "driemployee", "group", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addgrouptowid added  group to wid --  driemployee  to roger', res, 39);
                    cb1(null);
                });
            },

            function (cb1) {
                // add group to wid -- driemployee to cody wid
                addgrouptowid("cody", "userdto", "driemployee", "group", function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addgrouptowid added  group to wid --  driemployee  to  cody', res, 39);
                    cb1(null);
                });
            }
        ], function (err, res) {
            cb(err, res);
        })
    }

    function createpermissiondata(cb) {
        async.series([
            function (cb1) {
                // addpermission -- add permission --- 
                // "execute" actiontype  ,for group "driemployee", for action "getwidmaster", for "data"
                addpermission("cody", "driemployee", "getwidmaster", "execute", "data", 99, function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addpermission --  "execute" actiontype  ,for group "driemployee", for action "getwidmaster", for "db" ', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // addpermission -- add permission --- 
                // "execute" actiontype  ,for group "drimanager", for action "addwidmaster", for "data"
                //userwid, granteegroup, actiongroup, actiontypegroup, dbgroup, levelgroup, 
                addpermission("cody", "drimanager", "addwidmaster", "execute", "data", 99, function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addpermission --  "execute" actiontype  ,for group "drimanager", for action "addwidmaster", for "db"', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // addpermission -- add permission --- 
                // "execute" actiontype  ,for group "drimanager", for action "addwidmaster", for "data"
                addpermission("roger", "drimanager", "addwidmaster", "execute", "data", 99, function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addpermission --  "execute" actiontype  ,for group "drimanager", for action "addwidmaster", for "data" ', res, 39);
                    cb1(null);
                });
            },
            function (cb1) {
                // addpermission -- add permission --- 
                // "execute" actiontype  ,for group "driemployee", for action "getwidmaster", for "data"
                addpermission("cody", "cody", "getwidmaster", "execute", "data", 99, function (err, res) {
                    proxyprinttodiv('Function st2 fresh1 addpermission --  "execute" actiontype  ,for group "driemployee", for action "getwidmaster", for "db" ', res, 39);
                    cb1(null);
                });
            }
        ], function (err, res) {
            cb(err, res);
        });
    }

    exports.st2 = st2 = function st2(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups

        // we create actiongroups, targetgroups,

        // we put groups insdie of groups
        // we add permissions
        // we test
        // var status = false;
        debuglevel = 39;

        async.series([
                function (cb1) {
                    // creste schema data
                    createsystemdtos({}, function (err, res) {
                        proxyprinttodiv('Function  st2  added schema dtos ', res, 39);
                        cb1(null);
                    });
                },
                function (cb1) {
                    // setup user data
                    createuserdata(function (err, res) {
                        proxyprinttodiv('Function  st2  added user data ', res, 39);
                        cb1(null);
                    });
                // },
                // function (cb1) {
                //     // setup groups data
                //     creategroupdata(function (err, res) {
                //         proxyprinttodiv('Function  st2  added groups ', res, 39);
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     // setup permission data
                //     createpermissiondata(function (err, res) {
                //         proxyprinttodiv('Function  st2  added permissions ', res, 39);
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     // _accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel,
                //     testsecurity("codyac", undefined, "getwidmaster", "execute", "data", 99, function (err, res) {
                //         proxyprinttodiv('Function  st2 fresh1 testsecurity --  "codyac" execute actiontype  , for action "getwidmaster", for "db"', res, 39);
                //         status = res;
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     // _accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel,
                //     testsecurity("rogerac", undefined, "addwidmaster", "execute", "data", 99, function (err, res) {
                //         proxyprinttodiv('Function  st2 fresh1 testsecurity --  "rogerac" execute actiontype  , for action "addwidmaster", for "db"', res, 39);
                //         status = res;
                //         cb1(null);
                //     });
                }
            ],

            function (err, res) {
                console.log('Function st2 fresh 1 -- add data and test --  ' + JSON.stringify(res));

                callback(err, res==="true");
            });
    }


})(typeof window == "undefined" ? global : window);