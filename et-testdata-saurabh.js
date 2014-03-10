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

                callback(err, res === "true");
            });
    }



    /// dtodefault
    // metadata.system.creator driwid
    // metadata.system.creationdate    3/9/2014
    // metadata.system.expirationtimer 10000
    // metadata.system.expiratondate   12/31/2999
    // metadata.system.db  data
    // metadata.system.collection  dri
    // metadata.system.type   

    // dtooverride
    // metadata
    // metadata.manytoone  [interfacedto, executeaction, getaction, editaction, deleteaction, addaction, groupdto]
    // metadata.inherit.default    [defaultactionset, ]

    function initialize(cb) {
        var elementaryDtosSetup = [
         {
            //viewdto
            "executethis": "addwidmaster",
            "metadata.method": "viewdto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "html": ""
        }, {
            //basedto
            "executethis": "addwidmaster",
            "metadata.method": "basedto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "html": ""
        }, {
            //backdto
            "executethis": "addwidmaster",
            "metadata.method": "backdto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "html": ""
        },{
            //interfacedto
            "executethis": "addwidmaster",
            "metadata.method": "interfacedto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "manytoone": "viewdto",
            "manytoone": "basedto",
            "manytoone": "backdto"
        },
        {
            //dtodefault
            "executethis": "addwidmaster",
            "metadata.method": "dtodefault",
            "metadata.system.creator": "driwid",
            "metadata.system.creationdate": "3/9/2014",
            "metadata.system.expirationtimer": "10000",
            "metadata.system.expiratondate": "12/31/2999",
            "metadata.system.db": "data",
            "metadata.system.collection": "dri",
            "metadata.system.type": ""
        }, {
            //dtooverride
            "executethis": "addwidmaster",
            "metadata.method": "dtooverride",
            "metadata.manytoone": "interfacedto",
            "metadata.manytoone": "executeaction",
            "metadata.manytoone": "getaction",
            "metadata.manytoone": "editaction",
            "metadata.manytoone": "deleteaction",
            "metadata.manytoone": "addaction",
            "metadata.manytoone": "groupdto",
            "metadata.inherit.default": "defaultactionset",
            "metadata.system.creator": "driwid",
            "metadata.system.creationdate": "3/9/2014",
            "metadata.system.expirationtimer": "10000",
            "metadata.system.expiratondate": "12/31/2999",
            "metadata.system.db": "data",
            "metadata.system.collection": "dri",
            "metadata.system.type": ""
        }, {
            //executeaction
            "executethis": "addwidmaster",
            "metadata.method": "executeaction"
        }];
    }

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


    // data 
    // metadata.system.creator driwid
    // metadata.system.creationdate    3/9/2014
    // metadata.system.expirationtimer 10000
    // metadata.system.expiratondate   12/31/2999
    // metadata.system.db  data
    // metadata.system.collection  dri
    // metadata.system.type    


    // executeaction/getaction/editaction/addaction/deleteaction
    // metadata    
    // method  executeaction
    // onetoone    actiondto
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault


    // actiondto   
    // metadata    
    // method  actiondto
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  [serveraction, localaction]]

    // serveraction    
    // metadata    
    // method  serveraction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  serveraction


    // localaction 
    // metadata    
    // method  serveraction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  [offlineactions, onlineaction]


    // onlineaction    
    // metadata    
    // method  onlineaction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  executedto


    // offlineaction   
    // metadata    
    // method  offlineaction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  executedto


    // userdto 
    // metadata    
    // method  userdto
    // onetoone    [securitydto, envrionmentdto]
    // onetomany   [permissiondto]
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]

    // fields  
    // first   string
    // last    string
    // ...MORE 


})(typeof window == "undefined" ? global : window);