// finish execute multiple

// make sure your security data is being entered correctly — prove it by getwidmaster on both dto and data.

// —
// take a look at addhoc.js
// why cannot I not call “startwidviewer” (executethis: createdto) — causes error, but I can call createdto directly?

// please add the functions as shown in et-dto — so security can be checked

// —

// Can you write the function etmultipleunittest() in line 622 then move to et-utils.


// Creating groupdto, securitydto, statusdto and balanceddto
// securitydto holds accesstoken, status
// groupdto holds group, each wid auto lists itself and its creator
// permissions holds grantorwid, granteegroup, actiongroup, targetgroup
// 
exports.initdto = initdto = function initdto(params, callback) {

    execute([

            {
                //create userdto
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "wid": "userdto",
                "widname": "wid",
                "fname": "string",
                "lname": "string",
                "email": "string",
                "email2": "string",
                "address": "string",
                "address2": "string",
                "city": "string",
                "state": "string",
                "zip": "string",
                "systemdto": "onetoone"
            }, {
                //create testdto
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "systemdto": "onetomany"
            }, {
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "securitydto": "onetomany",
                "balancedto": "onetomany",
                "categorydto": "onetomany",
                "groupdto": "onetomany",
                "permissiondto": "onetomany",
            }, {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "groupname": "grouptype"
            }, {
                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                "status": "integer"
            }, {
                // create permissiondto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype",
                "levelgroup": "leveltype"
            }, {
                //create categorydto
                "executethis": "addwidmaster",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "categorytype"
            }, {

                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "widname": "wid",
                "balance": "integer"

            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_userdto",
                "metadata.method": "relationshipdto",
                "primarywid": "userdto",
                "secondarywid": "systemdto"
            }, {
                // create relationships testdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_testdto",
                "metadata.method": "relationshipdto",
                "primarywid": "testdto",
                "secondarywid": "systemdto"

            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_systemdto_groupdto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "groupdto"
            }, {
                "executethis": "addwidmaster",
                "wid": "rel_systemdto_categorydto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "categorydto"
            }, {
                // create relationships securitydto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_securitydto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "securitydto"
            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_permissiondto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "permissiondto"

            }, {
                // create relationships statusdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_balancedto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "balancedto"
            }
        ],
        function (err, res) {
            callback(err, res)
        });
}

exports.initdto1 = initdto1 = function initdto1(params, callback) {


    testclearstorage();
    if (exports.environment === "local") {
        clearLocalStorage();
    }
    execute([


            {
                //create userdto
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "wid": "userdto",
                "widname": "wid",
                "fname": "string",
                "lname": "string",
                "email": "string",
                "email2": "string",
                "address": "string",
                "address2": "string",
                "city": "string",
                "state": "string",
                "zip": "string",
                "systemdto": "onetomany"
            }, {
                //create testdto
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "systemdto": "onetomany"
            }, {
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "securitydto": "onetomany",
                "balancedto": "onetomany",
                "categorydto": "onetomany",
                "groupdto": "onetomany",
                "permissiondto": "onetomany",
            }, {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "groupname": "grouptype"
            }, {
                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                "status": "integer"
            }, {
                // create permissiondto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype",
                "levelgroup": "leveltype"
            }, {
                //create categorydto
                "executethis": "addwidmaster",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "categorytype"
            }, {
                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "widname": "wid",
                "balance": "integer"

            }, {
                // create relationshipdto
                "executethis": "addwidmaster",
                "metadata.method": "relationshipdto",
                "wid": "relationshipdto",
                "primarywid": "string",
                "secondarywid": "string",
                "relationshiptype": "string"
            }
        ],
        function (err, res) {



            callback(err, res)
        });
}


exports.initdto2 = initdto2 = function initdto2(params, callback) {

    execute([{
            // create relationships permissiondto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_userdto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "userdto",
            "secondarywid": "systemdto"
        }, {
            // create relationships testdto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_testdto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "testdto",
            "secondarywid": "systemdto"

        }, {
            // create relationships permissiondto
            "executethis": "addwidmaster",
            "wid": "rel_systemdto_groupdto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "systemdto",
            "secondarywid": "groupdto"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_systemdto_categorydto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "systemdto",
            "secondarywid": "categorydto"
        }, {
            // create relationships securitydto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_securitydto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "systemdto",
            "secondarywid": "securitydto"
        }, {
            // create relationships permissiondto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_permissiondto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "systemdto",
            "secondarywid": "permissiondto"

        }, {
            // create relationships statusdto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_balancedto",
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "primarywid": "systemdto",
            "secondarywid": "balancedto"
        }],
        function (err, res) {
            proxyprinttodiv('Function initdto2 --- userdto ', JSON.stringify(userdto), 99);
            


            callback(err, res)
        });
}

// create dtos (users-authuser1,authuser2,authuser3)
// create groups, permissions and associate the user wids with same
// create stuff wid ('stuff1') .. set an owner, add groups and permissions to that.

// do a getwidmaster ‘action type’ on stuff1 using different users


// this test shall result in an unauthorized access error
// we create testdata stuff1 and provide access to it to only staff group memners
// however we try to access it (using getwidmaster) using admin group user
exports.etauthtest1 = etauthtest1 = function etauthtest1(params, callback) {


    // initdto1({}, function (err, res) {


    //     initdto2({}, function (err, res) {
    proxyprinttodiv('Function etauthtest1 params', params, 99);

    async.series([
            function (cb) {
                createuserold("authuser1", "abcd1234abcd1234abcd1234abcd1234", "1", "staff", "staff", "getwidmaster", "data", "1", function (err, res) {
                    cb(null, "");
                });
            },
            // function (cb) {
            //     creategroup("userdto", "admins", "staff", function (err, res) {
            //         cb(null, "");
            //     });
            // },
            // function (cb) {
            //     createpermission("userdto", "staff", "staff", "getwidmaster", "db", "1", function (err, res) {
            //         cb(null, "");
            //     });
            // },
            function (cb) {
                createtestaction("stuff1", "authuser1", function (err, res) {
                    execute({
                        "wid": "testdto",
                        "executethis": "getwidmaster"
                    }, function (err, testdto) {
                        proxyprinttodiv('Function getwidmaster on stuff1 ', JSON.stringify(testdto), 99);
                        console.log(" >>>> testdto >>> " + JSON.stringify(testdto));
                        cb(null, "");
                    });
                }); //widname,owner,grantee,action,cb
            },
            // function (cb) {
            //     createpermission("stuff1", "staff", "staff", "getwidmaster", "db", "1", function (err, res) {
            //         cb(null, "");
            //     });
            // },
            // function (cb) {
            //     creategroup("userdto", "staff", "staff", function (err, res) {
            //         cb(null, "");
            //     });
            // },
            function (cb) {
                execute({
                    "executethis": "getwidmaster",
                    "wid": "authuser1"
                }, function (err, res) {
                    proxyprinttodiv('Function getwidmaster on authuser1 ', JSON.stringify(res), 99);
                    console.log(' >>> final response >>> ' + JSON.stringify(res))
                    cb(null);
                });
            }
        ],
        function (err, res) {
            console.log('created 3 users for user, assigned groups ');
            var etenvironment = {
                "ac": "abcd1234abcd1234abcd1234abcd1234",
                "action": "getwidmaster",
                // "account": "admin",
                "account": "staff",
                "db": "data"
            };

            var commandobject = {
                "executemethod": 'execute',
                "excutefilter": '',
                'executeorder': 'series',
                'executelimit': '15'
            };

            var request1 = {
                "etenvironment": etenvironment,
                "command": commandobject,
                "executethis": "getwidmaster",
                "wid": "stuff1"
            };

            // perform request with unuthorized user 
            // (user in a seperate group not having permissions to do a getwidmaster on stuff1)
            execute(request1, function (err, resp) {
                console.log(" >>>>>> response from access to stuff 1 >>>>>  " + JSON.stringify(resp));
                proxyprinttodiv(">>>>>> response from access to stuff 1 >>>>>  ", JSON.stringify(resp), 99);
            });
        });
    //     });
    // });
}

// this test shall result in an unauthorized access error
// we create testdata stuff1 and provide access to it to only staff group memners
// however we try to access it (using getwidmaster) using admin group user
exports.auth1 = auth1 = function auth1(params, callback) {
    clearLocalStorage();
    execute({
        "executethis": "initdto1"
    }, function (err, res) {
        execute({
            "executethis": "initdto2"
        }, function (err, res) {
            execute([{
                "executethis": "etauthtest1"
            }], function (err, res) {
                console.log('created user, test data, assigned groups ');
                callback(err, res);
            });
        });
    });
}

// series
exports.multi1 = multi1 = function multi1(params, callback) {

    clearLocalStorage();

    var commandobject = {
        "executemethod": 'execute',
        "excutefilter": '',
        'executeorder': 'series',
        'executelimit': '15'
    }

    execute([{
            "executethis": "addwidmaster",
            "wid": "test1addded",
            "data1": {
                "te1": "da1",
                "te2": "da2"
            }
        }, {
            "executethis": "getwidmaster",
            "wid": "test1addded"
        }, {
            "executethis": "addwidmaster",
            "wid": "test2addded",
            "data1": {
                "te21": "da21",
                "te22": "da22"
            }
        }, {
            "executethis": "getwidmaster",
            "wid": "test2addded"
        }], commandobject,
        function (err, res) {
            console.log('multi1 processed');
            callback(err, res);
        });
}

// parallel
exports.multi2 = multi2 = function multi2(params, callback) {

    clearLocalStorage();

    var commandobject = {
        "executemethod": 'execute',
        "excutefilter": '',
        'executeorder': 'parallel',
        'executelimit': '15'
    }

    execute([{
            "executethis": "addwidmaster",
            "wid": "test1addded",
            "data1": {
                "te1": "da1",
                "te2": "da2"
            }
        }, {
            "executethis": "getwidmaster",
            "wid": "test1addded"
        }, {
            "executethis": "addwidmaster",
            "wid": "test2addded",
            "data1": {
                "te21": "da21",
                "te22": "da22"
            }
        }, {
            "executethis": "getwidmaster",
            "wid": "test2addded"
        }], commandobject,
        function (err, res) {
            console.log('multi2 processed');
            callback(err, res);
        });
}

// waterfall
exports.multi3 = multi3 = function multi3(params, callback) {

    clearLocalStorage();

    var commandobject = {
        "executemethod": 'execute',
        "excutefilter": '',
        'executeorder': 'waterfall',
        'executelimit': '15'
    }

    execute([{
            "executethis": "addwidmaster",
            "wid": "test1addded",
            "data1": {
                "te1": "da1",
                "te2": "da2"
            }
        }, {
            "executethis": "getwidmaster",
            "wid": "test1addded"
        }, {
            "executethis": "addwidmaster",
            "wid": "test2addded",
            "data1": {
                "te21": "da21",
                "te22": "da22"
            }
        }, {
            "executethis": "getwidmaster",
            "wid": "test2addded"
        }], commandobject,
        function (err, res) {
            console.log('multi3 processed');
            callback(err, res);
        });
}

// finish execute multiple

// make sure your security data is being entered correctly — prove it by getwidmaster on both dto and data.

// —
// take a look at addhoc.js
// why cannot I not call “startwidviewer” (executethis: createdto) — causes error, but I can call createdto directly?

// please add the functions as shown in et-dto — so security can be checked

// —


// Can you write the function etmultipleunittest() in line 622 then move to et-utils.

exports.createuserold = createuserold = function createuserold(userwid, ac, loginlevel, granteegroup, actiongroup, targetgroup, dbgroup, levelgroup, cb1) {
    execute([{
            // add user 
            "executethis": "addwidmaster",
            "metadata.method": "userdto",
            "metadata.owner": "system",
            "wid": userwid,
            "fname": "john",
            "lname": "doe",
            "email": "jj@gmail.com",
            "email2": "",
            "address": "123 pleasant lane",
            "address2": "apt 101",
            "city": "Pleasantville",
            "state": "Florida",
            "zip": "26534",
            "userid": "authorized",
            "status": "integer",
            // "systemdto": "onetomany",
            // security data 
            "systemdto.securitydto.logged_id": "true",
            "systemdto.securitydto.accesstoken": ac,
            "systemdto.securitydto.level": loginlevel,
            // permissions data 
            "systemdto.permissiondto.granteegroup": "staff",
            "systemdto.permissiondto.actiongroup": "getwidmaster",
            "systemdto.permissiondto.targetgroup": "staff",
            "systemdto.permissiondto.dbgroup": "data",
            "systemdto.permissiondto.levelgroup": "1",
            // group data 
            "systemdto.groupdto.groupname": "staff",
            "systemdto.groupdto.grouptype": "staff",
            // category data
            "systemdto.categorydto.categorytype": "string",
            "systemdto.categorydto.categoryname": "testcatname"
        }],
        function (err, res) {
            proxyprinttodiv('Function createuserold res ', res, 99);
            console.log('created userdto for user ' + JSON.stringify(res));
            cb1(err, res)
        });
}

exports.creategroup = creategroup = function creategroup(userwid, groupname, grouptype, callback) {
    execute({
            // update user 
            "executethis": "addwidmaster",
            "metadata.method": "groupdto",
            "metadataos.networkInterfaces();ner": "system",
            "groupname": groupname,
            "grouptype": grouptype,
            "wid": "admingroup",
            "systemdto": "onetomany",

        },
        function (err, res) {
            console.log('created groupname for user ' + groupname);
            callback(err, res)
        });
}

// exports.createpermission = createpermission = function createpermission(userwid, granteegroup, actiongroup, targetgroup, dbgroup, levelgroup, callback) {
//     execute({
//             // update user 
//             "executethis": "addwidmaster",

//             "wid": userwid
//             // group data 
//         },
//         function (err, res) {
//             // console.log('created groupname for user ' + groupname);
//             callback(err, res)
//         });
// }

exports.createtestaction = createtestaction = function createtestaction(widname, owner, callback) {
    execute([{
            // add test data -- stuff
            "executethis": "addwidmaster",
            "metadata.method": "testdto",
            "metadata.owner": owner,
            "wid": widname,
            // permissions data 
            "systemdto.permissiondto.granteegroup": "staff",
            "systemdto.permissiondto.actiongroup": "getwidmaster",
            "systemdto.permissiondto.targetgroup": "staff",
            "systemdto.permissiondto.dbgroup": "data",
            "systemdto.permissiondto.levelgroup": "1"
        }],
        function (err, res) {
            console.log('created testdata for data --  ' + JSON.stringify(res));
            callback(err, res)
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


    clearLocalStorage();


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
                addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                addgrouptowid("codyuser", "driemployeegroup", function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                addpermission("rogeruser", "driemployeegroup", "executethis", "createcoupon", "data", 50, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                addgrouptowid("anything", "createcoupon", function (err, res) {
                    cb1(null);
                });
            },
            function (cb1) {
                testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
                    cb1(null);
                });
            }
        ],
        function (err, res) {
            console.log('created testdata for test1000 --  ' + JSON.stringify(res));
            callback(err, res);
        });

}

// createuser("codyuser", "codyac", 99);
// addgrouptowid("anything", "createcoupon");
// addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
// testsecurity("codyac", "executethis", "createcoupon", "data", true);

// roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 99 so this should work.
exports.test1001 = test1001 = function test1001(params, callback) {

    createuser("codyuser", "codyac", 99);
    createuser("rogeruser", "rogerac", 99);
    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
    testsecurity("codyac", "executethis", "createcoupon", "data", true);

}

// roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 0 so this should fail.
exports.test1002 = test1002 = function test1002(params, callback) {

    createuser("codyuser", "codyac", 0);
    createuser("rogeruser", "rogerac", 99);
    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
    testsecurity("codyac", "executethis", "createcoupon", "data", false);

}

// cody is made a member of the dri employees group. roger gives dri employees permission to create data wids. cody should be able to create a datawid.
exports.test1003 = test1003 = function test1003(params, callback) {

    createuser("codyuser", "codyac", 99);
    ss
    createuser("rogeruser", "rogerac", 99);
    addgrouptowid("codyuser", "driemployeesgroup");

    addpermission("rogeruser", "driemployeesgroup", "executethis", "createdatawid", "data", 50);
    testsecurity("codyac", "executethis", "createdatawid", "data", true);

}

// cody is made a member of the dri employees group. roger gives dri employees permission to create data wids. cody should not be able to create a datawid as his security level is too low.
exports.test1003 = test1003 = function test1003(params, callback) {

    createuser("codyuser", "codyac ", 0);
    createuser("rogeruser", "rogerac ", 99);
    addgrouptowid("codyuser", "driemployeesgroup ");

    addpermission("rogeruser", "driemployeesgroup", "executethis", "createdatawid", "data", 50);
    testsecurity("codyac", "executethis", "createdatawid", "data", false);

}

// drimanagers is made a member of driemployees group. Cody gives dri managers permission to edit coupons. Bill should be able to edit Cody's coupons.
exports.test1003 = test1003 = function test1003(params, callback) {

    createuser("codyuser", "codyac", 99);
    createuser("rogeruser", "rogerac", 99);
    createuser("billuser", "billac", 99);
    addgrouptowid("codyuser", "driemployeesgroup", 99);
    addgrouptowid("billuser", "drimanagersgroup", 99);
    addgrouptowid("rogeruser", "drimanagersgroup", 99);
    addgrouptowid("drimanagersgroup", "driemployeesgroup", 99);

    addpermission("codyuser", "drimanagersgroup", "executethis", "editcoupon", "data", 50);
    testsecurity("billac", "executethis", "createdatawid", "data", true);

}

// drimanagers is made a member of driemployees group. Cody gives dri managers permission to edit coupons. Bill should be able to edit Cody's coupons.
// exports.test1003 = test1003 = function test1003(params, callback) {

//     createuser("codyuser", "codyac", 99);
//     createuser("
//         rogeruser ", "
//         rogerac ", 99);
//     createuser("
//         billuser ", "
//         billac ", 99);
//     addgrouptowid("
//         codyuser ", "
//         driemployeesgroup ");
//     addgrouptowid("
//         billuser ", "
//         drimanagersgroup ");
//     addgrouptowid("
//         rogeruser ", "
//         drimanagersgroup ");

//     addpermission("
//         codyuser ", "
//         drimanagersgroup ", "
//         executethis ", "
//         editcoupon ", "
//         data ", 50);
//     testsecurity("
//         billac ", "
//         executethis ", "
//         createdatawid ", "
//         data ", true);

// }

// driemployees is made a member of usersofdri. roger gives driusers read permission on coupons. cody is made a member of driemployees. cody should be able to read coupons. 
/*
 exports.test1007 = test1007 = function test1007(params, callback) {

     createuser("codyuser", "codyac", 99);
     createuser("rogeruser", "rogerac", 99);
     addgrouptowid("codyuser", "driemployees");
     addgrouptowid("driemployees", "driusers");

     addpermission("rogeruser", "driusers", "executethis", "readcoupon", "data", 50);
     testsecurity("codyac", "executethis", "createdatawid", "data", true);

 }*/

// 
/*
 exports.test1008 = test1008 = function test1008(params, callback) {

     createuser("codyuser", "codyac", 99);
     createuser("rogeruser", "rogerac", 99);
     addgrouptowid("codyuser", "driemployees");
     addgrouptowid("driemployees", "driusers");

     addpermission("rogeruser", "driusers", "executethis", "readcoupon", "data", 50);
     testsecurity("codyac", "executethis", "createdatawid", "data", true);

 }*/




exports.createuser = createuser = function createuser(userwid, ac, loginlevel, cb1) {
    execute([{
            // add user 
            "executethis": "addwidmaster",
            "metadata.method": "userdto",
            "metadata.owner": "system",
            "wid": userwid,
            "fname": "john",
            "lname": "doe",
            "email": "jj@gmail.com",
            "email2": "",
            "address": "123 pleasant lane",
            "address2": "apt 101",
            "city": "Pleasantville",
            "state": "Florida",
            "zip": "26534",
            "userid": "authorized",
            "status": "integer",
            // "systemdto": "onetomany",
            // security data 
            "systemdto.securitydto.logged_id": "true",
            "systemdto.securitydto.accesstoken": ac,
            "systemdto.securitydto.level": loginlevel,
            // permissions data 
            "systemdto.permissiondto.granteegroup": userwid,
            "systemdto.permissiondto.actiongroup": "getwidmaster",
            "systemdto.permissiondto.targetgroup": userwid,
            "systemdto.permissiondto.dbgroup": "data",
            "systemdto.permissiondto.levelgroup": "1",
            // group data 
            "systemdto.groupdto.groupname": userwid,
            "systemdto.groupdto.grouptype": userwid,
            // category data
            "systemdto.categorydto.categorytype": "string",
            "systemdto.categorydto.categoryname": "testcatname"
        }],
        function (err, res) {
            console.log('created userdto for user ' + userwid + " >>>> " + JSON.stringify(res));
            cb1(err, res)
        });
}


// createuser("codyuser", "codyac", 99);
// addgrouptowid("anything", "createcoupon");
// addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
// testsecurity("codyac", "executethis", "createcoupon", "data", true);

exports.addgrouptowid = addgrouptowid = function addgrouptowid(groupname, wid, callback) {
    execute([{
            // add group as per given wid 
            "executethis": "updatewid",
            "wid": wid,
            // group data 
            "systemdto.groupdto.groupname": groupname,
            "systemdto.groupdto.grouptype": wid
        }],
        function (err, res) {
            console.log('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));
            callback(err, res)
        });
}

exports.addpermission = addpermission = function addpermission(userwid, granteegroup, targetgroup, actiongroup, dbgroup, levelgroup, callback) {
    execute([{
            // add permissions as per given information 
            "executethis": "updatewid",
            "wid": userwid,
            // permissions data 
            "systemdto.permissiondto.granteegroup": granteegroup,
            "systemdto.permissiondto.actiongroup": actiongroup,
            "systemdto.permissiondto.targetgroup": targetgroup,
            "systemdto.permissiondto.dbgroup": dbgroup,
            "systemdto.permissiondto.levelgroup": levelgroup
        }],
        function (err, res) {
            console.log('added permission data ' + granteegroup + ' for user ' + userwid + " >>>> " + JSON.stringify(res));
            callback(err, res)
        });
}


exports.testsecurity = testsecurity = function testsecurity(ac, targetgroup, actiongroup, dbgroup, assertion, callback) {
    securitycheck(ac, targetgroup, actiongroup, dbgroup, function (err, res) {
        callback(err, res)
    });
}

// testsecurity("codyac", "executethis", "createcoupon", "data", true);