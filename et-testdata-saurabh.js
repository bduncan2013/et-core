
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
                },
                function (cb1) {
                    // setup groups data
                    creategroupdata(function (err, res) {
                        proxyprinttodiv('Function  st2  added groups ', res, 39);
                        cb1(null);
                    });
                },
                function (cb1) {
                    // setup permission data
                    createpermissiondata(function (err, res) {
                        proxyprinttodiv('Function  st2  added permissions ', res, 39);
                        cb1(null);
                    });
                },
                // function (cb1) {
                //     // _accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel,
                //     testsecurity("codyac", undefined, "getwidmaster", "execute", "data", 99, function (err, res) {
                //         proxyprinttodiv('Function  st2 fresh1 testsecurity --  "codyac" execute actiontype  , for action "getwidmaster", for "db"', res, 39);
                //         status = res;
                //         cb1(null);
                //     });
                // },
                function (cb1) {
                    // _accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel,
                    testsecurity("rogerac", undefined, "addwidmaster", "execute", "data", 99, function (err, res) {
                        proxyprinttodiv('Function  st2 fresh1 testsecurity --  "rogerac" execute actiontype  , for action "addwidmaster", for "db"', res, 39);
                        status = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('Function st2 fresh 1 -- add data and test --  ' + JSON.stringify(res));

                callback(err, res==="true");
            });
    }


})(typeof window == "undefined" ? global : window);