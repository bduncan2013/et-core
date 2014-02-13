(function (window) {


    exports.sectest1 = sectest1 = function sectest1(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test


        // clearLocalStorage();

        async.series([
                function (cb1) {
                    createuser("rogeruser", "rogerac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("codyuser", "codyac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, cb1);
                },
                function (cb1) {
                    addgrouptowid("driemployeegroup", "codyuser", cb1);
                },
                function (cb1) {
                    addgrouptowid("driemployeegroup", "rogeruser", cb1);
                },
                function (cb1) {
                    addpermission("rogeruser", "driemployeegroup", "executethis", "createcoupon", "data", 50, cb1);
                },
                function (cb1) {
                    addgrouptowid("createcoupon", "rogeruser", cb1);
                },
                function (cb1) {
                    testsecurity("rogerac", "executethis", "createcoupon", "data", true, cb1);
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, cb1);
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, cb1);
                }
            ],
            function (err, res) {
                console.debug('created testdata for sectest1 --  ' + JSON.stringify(res));
                proxyprinttodiv('Function sectest1 --  >>>>>> response from user added sectest1 >>>>>   -- ', res, 99);

                var queryList = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.accesstoken": "rogerac"
                    },
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];
                execute(queryList, function (err, res) {
                    proxyprinttodiv(' Function sectest1  >>>  NOT simple mongorawquery with relationship to get 3rd level object >>> mongorawquery >>> ', JSON.stringify(res), 99);
                    console.debug(' Function sectest1  >>>  NOT simple mongorawquery  with relationship to get 3rd level object >>> mongorawquery >>> ' + JSON.stringify(res));

                    callback(err, res);
                });
            });
    }




    exports.sec1 = sec1 = function sec1(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        securitycheck("rogerac", "executethis", "createcoupon", "data", function (err, res) {
            // securitycheck("codyac", "executethis", "createcoupon", "data", function (err, res) {
            // proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response for roger -- ', res, 99);
            callback(err, res);
            // });
        });
    }

    // createuser(userwid, ac, securitylevel )
    // createwid(wid, owneruserwid, securitylevel)
    // addgrouptowid(wid, groupwid)
    // addpermission(userwid, usergroup, actiongroup, targertgroup, databasegroup, level)
    // testsecurity(ac, action, target, database, expectation)

    exports.test1000 = test1000 = function test1000(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test
        var status = false;
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        async.series([
                function (cb1) {
                    createuser("rogeruser0", "rogerac0", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("codyuser0", "codyac0", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser0", "codyuser0", "executethis", "createcoupon0", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser0", "driemployeegroup0", function (err, res) {
                        cb1(null);

                    });
                },
                function (cb1) {
                    addpermission("rogeruser0", "driemployeegroup0", "executethis", "createcoupon0", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("anything0", "createcoupon0", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac0", "executethis", "createcoupon0", "data", true, function (err, res) {
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1000 --  ' + JSON.stringify(status));

                callback(err, status);

            });

    }

    // createuser("codyuser", "codyac", 99);
    // addgrouptowid("anything", "createcoupon");
    // addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
    // testsecurity("codyac", "executethis", "createcoupon", "data", true);

    // roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 99 so this should work.
    exports.test1001 = test1001 = function test1001(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    datasum1("", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    datasum2("", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("codyuser1", "codyac1", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser1", "rogerac1", 99, function (err, res) {
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
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    createuser("codyuser2", "codyac2", 0, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser2", "rogerac2", 99, function (err, res) {
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
                        proxyprinttodiv('after testsecurity -- ', res, 34);
                        status = res;
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                proxyprinttodiv('created testdata for test1002 -- ', JSON.stringify(res), 34);
                console.log('created testdata for test1002 --  ' + JSON.stringify(res));
                callback(err, status);
            });
    }

    // cody is made a member of the dri employees group. roger gives dri employees permission to create data wids.
    // cody should be able to create a datawid.
    exports.test1003 = test1003 = function test1003(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    createuser("codyuser3", "codyac3", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser3", "rogerac3", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser3", "driemployeesgroup3", function (err, res) {
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
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    createuser("codyuser4", "codyac4", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser4", "rogerac4", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("billuser4", "billac4", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser4", "driemployeesgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("billuser4", "drimanagersgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("rogeruser4", "drimanagersgroup4", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("drimanagersgroup4", "driemployeesgroup4", function (err, res) {
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
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    createuser("codyuser5", "codyac5", 0, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser5", "rogerac5", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser5", "driemployeesgroup5", function (err, res) {
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
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    createuser("codyuser6", "codyac6", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser6", "rogerac6", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("billuser6", "billac6", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser6", "driemployeesgroup6", function (err, res) {
                        cb1(null);
                    });
                },
                // function (cb1) {
                //     addgrouptowid("billuser6", "drimanagersgroup6", function (err, res) {
                //         cb1(null);
                //     });
                // },
                // function (cb1) {
                //     addgrouptowid("rogeruser6", "drimanagersgroup6", function (err, res) {
                //         cb1(null);
                //     });
                // },
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
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;

        async.series([
                function (cb1) {
                    createuser("codyuser7", "codyac7", 99, function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createuser("rogeruser7", "rogerac7", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser7", "driemployees7", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    addgrouptowid("driemployees7", "driusers7", function (err, res) {
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
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        var status = false;
        async.series([
                function (cb1) {
                    createuser("codyuser8", "codyac8", 99, function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {

                    createuser("rogeruser8", "rogerac8", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser8", "driemployees8", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    addgrouptowid("driemployees8", "driusers8", function (err, res) {
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


    exports.tss1 = tss1 = function tss1(params, callback) {
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
                    proxyprinttodiv('Function tss1 added  ttdto -- ', res, 99);
                    cb1(null);
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


})(typeof window == "undefined" ? global : window);