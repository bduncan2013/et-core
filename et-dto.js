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
                    cb(null, "");
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
                "db": "db"
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
                console.log(" >>>>>> response from access to stuff 1 >>>>>  ");
            });
        });
    //     });
    // });
}

// this test shall result in an unauthorized access error
// we create testdata stuff1 and provide access to it to only staff group memners
// however we try to access it (using getwidmaster) using admin group user
exports.etauth1 = etauth1 = function etauth1(params, callback) {

    clearLocalStorage();


    execute([{
            "executethis": "initdto1"
        }, {
            "executethis": "initdto2"
        }, {
            "executethis": "etauthtest1"
        }],
        function (err, res) {
            console.log('created user, test data, assigned groups ');


        });
}

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
            "systemdto.permissiondto.dbgroup": "db",
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
            // "metadata.method": "testdto",
            "metadata.owner": owner,
            "wid": widname,
            // permissions data 
            "systemdto.permissiondto.granteegroup": "staff",
            "systemdto.permissiondto.actiongroup": "getwidmaster",
            "systemdto.permissiondto.targetgroup": "staff",
            "systemdto.permissiondto.dbgroup": "db",
            "systemdto.permissiondto.levelgroup": "1"
        }],
        function (err, res) {
            console.log('created testdata for data --  ' + JSON.stringify(res));
            callback(err, res)
        });
}


// testsecurity("codyac", "executethis", "createcoupon", "data", true);