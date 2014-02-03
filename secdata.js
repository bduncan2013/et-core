exports.createdtos = createdtos = function createdtos(params, callback) {
    // create dtos  
    //debuglevel=75;
    //debugsubcat="add"
    //debugname="getwidmaster"
    var executeList = [{
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
        "metadata.booksdto.type": "onetomany",
        "metadata.adddto.type": "onetoone",
        "defaultauthordtoactions": "inherit"
    }, {
        "executethis": "updatewid",
        "metadata.method": "booksdto",
        "wid": "booksdto",
        "title": "string",
        "pages": "string"
    }, {
        "executethis": "updatewid",
        "metadata.method": "adddto",
        "wid": "adddto",
        "metadata.addfield.type": "onetomany",
        "metadata.gojsobject.type": "onetoone",
        "metadata.linkrules.type": "onetomany",
        "metadata.actiondto.type": "onetomany",
        "defaultadddtoactions": "inherit"
    }, {
        "executethis": "updatewid",
        "metadata.method": "linkrules",
        "wid": "linkrules",
        "linkclass": "string",
        "min": "string",
        "max": "string"
    }, {
        "executethis": "updatewid",
        "metadata.method": "actiondto",
        "wid": "actiondto",
        "displayname": "string",
        "actiondescription": "string",
        "category": "string",
        "subcategory": "string",
        "addthis.preexecute": "string",
        "addthis.executethis": "string",
        "addthis.postexecute": "string",
        "defaultmasteractions": "inherit"
    }];

    execute(executeList, function (err, res) {
        console.log(' >>> final response after create dtos executeList >>> ' + JSON.stringify(res));

    });
}


exports.secdata1 = secdata1 = function secdata1(params, callback) {
    // create dtos  
    var executeList = [

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

        }
    ];

    execute(executeList, function (err, res) {
        proxyprinttodiv('Function secdata1 -- added all this -- ', res, 99);
        callback(err, res);
    });
}

exports.secdata2 = secdata2 = function secdata2(params, callback) {
    // create dtos  
    var executeList = [

        {
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
        }
    ];

    execute(executeList, function (err, res) {
        execute({
            "executethis": "getwidmaster",
            "wid": "userdto"
        }, function (err, res1) {
            proxyprinttodiv('Function secdata2 -- checking userdto -- ', res1, 99);
            callback(err, res);
        });
    });
}


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
            "systemdto.permissiondto.dbgroup": "db",
            "systemdto.permissiondto.levelgroup": "1"
        }],
        function (err, res) {

            execute({
                "executethis": "getwidmaster",
                "wid": widname
            }, function (err, res1) {
                proxyprinttodiv('Function createtestaction -- checking ' + widname + ' -- ', res1, 99);
                console.log('created testdata for data --  ' + JSON.stringify(res1));
                callback(err, res);
            });
        });
}



// this test shall result in an unauthorized access error
// we create testdata stuff1 and provide access to it to only staff group memners
// however we try to access it (using getwidmaster) using admin group user
exports.etauthtest1 = etauthtest1 = function etauthtest1(params, callback) {


    // secdata(params, function (err, resp) {

    proxyprinttodiv('Function etauthtest1 params', params, 99);

    async.series([
            function (cb) {
                createuserold("authuser1", "abcd1234abcd1234abcd1234abcd1234", "1", "staff", "staff", "getwidmaster", "db", "1", function (err, res) {
                    cb(null, "");
                });
            },
            function (cb) {
                createtestaction("stuff1", "authuser1", function (err, res) {
                    cb(null, "");
                }); //widname,owner,grantee,action,cb
            },
            function (cb) {
                execute({
                    "executethis": "getwidmaster",
                    "wid": "authuser1"
                }, function (err, res) {
                    // console.log(' >>> final response >>> ' + JSON.stringify(res));
                    proxyprinttodiv('Function etauthtest1 --  >>>>>> response from user added authuser1 >>>>>   -- ', res, 99);
                    cb(null);
                });
            }
        ],
        function (err, res) {
            var etenvironment = {
                "ac": "abcd1234abcd1234abcd1234abcd1234",
                "action": "getwidmongo",
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
                // "command": commandobject,
                "executethis": "getwidmongo",
                "wid": "stuff1",
                "metadata.method": "testdto"
            };

            // perform request with unuthorized user 
            // (user in a seperate group not having permissions to do a getwidmaster on stuff1)
            execute(request1, function (err, resp) {
                console.log(" >>>>>> response from access to stuff 1 >>>>>  ");
                proxyprinttodiv('Function etauthtest1 --  >>>>>> response from access to stuff 1 >>>>>   -- ', resp, 99);
                // callback(err, resp);
                callback(err, resp);
            });

            // callback(err, res);
        });
    //     });
    // });
    // });
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

            execute({
                "executethis": "getwidmaster",
                "wid": "rogeruser"
            }, function (err, res1) {
                proxyprinttodiv('Function test1000 --  >>>>>> created user rogeruser >>>>>   -- ', res1, 99);
                // callback(err, res);

                execute({
                    "executethis": "getwidmaster",
                    "wid": "codyuser"
                }, function (err, res2) {
                    proxyprinttodiv('Function test1000 --  >>>>>> created user codyuser >>>>>   -- ', res2, 99);
                    callback(err, res);
                });
            });
        });

}




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
            "systemdto.permissiondto.dbgroup": "db",
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
            cb1(err, res);
        });
}

exports.testsecurity = testsecurity = function testsecurity(ac, targetgroup, actiongroup, dbgroup, assertion, callback) {
    securitycheck(ac, targetgroup, actiongroup, dbgroup, function (err, res) {
        callback(err, res)
    });
}