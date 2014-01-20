// Creating groupdto, securitydto, statusdto and balanceddto
// securitydto holds accesstoken, status
// groupdto holds group, each wid auto lists itself and its creator
// permissions holds grantorwid, granteegroup, actiongroup, targetgroup
// 
exports.initdto = initdto = function initdto(params, callback) {

    execute([

            {
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
                // create permissionsdto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype",
                "levelgroup": "leveltype"
            }, {
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
                "zip": "string"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "securitydto": "onetomany",
                "balancedto": "onetomany",
                "permissiondto": "onetomany",
                "userdto": "onetomany"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "systemdto": "onetomany"
            }, {
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
                // create relationships permissionsdto
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

            }, {
                // create relationships permissionsdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_userdto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "userdto"
            }, {
                // create relationships permissionsdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_testdto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "testdto"
            }
        ],
        function (err, res) {
            callback(err, res)
        });
}

exports.inittestdata = inittestdata = function inittestdata(params, callback) {

    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "userdto",
            "wid": "roger1",
            "fname": "string",
            "lname": "string",
            "systemdto.categorydto.categorytype": "string",
            "systemdto.categorydto.categoryname": ""

        }, {
            "executethis": "addwidmaster",
            "metadata.method": "categorydto",
            "wid": "cat1",
            "categorytype": "testtype",
            "categoryname": "testcatname"
        }],
        function (err, res) {
            callback(err, res)
        });
}

exports.testme = testme = function testme(params, callback) {

    execute({
            "systemdto.securitydto.security.logged_id": false,
            "fname": "john",
            "lname": "doe",
            "email": "jj@gmail.com",
            "email2": "",
            "address": "123 pleasant lane",
            "address2": "apt 101",
            "city": "Pleasantville",
            "state": "Florida",
            "zip": "26534",
            "userid": "user",
            "wid": "userdto",
            "metadata.method": "userdto"
        },
        function (err, res) {
            callback(err, res)
        });
}



function addAuthorizedData(callback) {
    // add a authorizeduser userdto
    addwidmaster({
        "executethis": "addwidmaster",
        "metadata.method": "userdto",
        "wid": "authorizeduser",
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
        "systemdto.securitydto.logged_id": true,
        "systemdto.securitydto.accesstoken": "111",
        "status": "integer",
        "systemdto": "onetomany"
    }, callback);
}

function addUnauthorizedData(callback) {
    // add a  unauthorizeduser userdto
    addwidmaster({
        "executethis": "addwidmaster",
        "metadata.method": "userdto",
        "wid": "unauthorizeduser",
        "fname": "john",
        "lname": "doe",
        "email": "jj@gmail.com",
        "email2": "",
        "address": "123 pleasant lane",
        "address2": "apt 101",
        "city": "Pleasantville",
        "state": "Florida",
        "zip": "26534",
        "userid": "unauthorized",
        "systemdto.securitydto.logged_id": false,
        "systemdto.securitydto.accesstoken": "000",
        "systemdto": "onetomany"
    }, callback);
}

exports.initdto1 = initdto1 = function initdto1(params, callback) {

    testclearstorage();
    execute([

            {
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
                // create permissionsdto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype",
                "levelgroup": "leveltype"
            }, {
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
        ],
        function (err, res) {
            callback(err, res)
        });
}


exports.initdto2 = initdto2 = function initdto2(params, callback) {

    execute([{

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
            "zip": "string"
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "systemdto",
            "wid": "systemdto",
            "creator": "accounttype",
            "expiration": "datetime",
            "offlinerule": "string",
            "onlinerule": "string",
            "securitydto": "onetomany",
            "balancedto": "onetomany",
            "permissiondto": "onetomany",
            "userdto": "onetomany"
        }, {
            "executethis": "addwidmaster",
            "metadata.method": "testdto",
            "wid": "testdto",
            "a": "string",
            "b": "string",
            "systemdto": "onetomany"
        }, {
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
            // create relationships permissionsdto
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

        }, {
            // create relationships permissionsdto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_userdto",
            "metadata.method": "relationshipdto",
            "primarywid": "systemdto",
            "secondarywid": "userdto"
        }, {
            // create relationships permissionsdto
            "executethis": "addwidmaster",
            "wid": "relsystemdto_testdto",
            "metadata.method": "relationshipdto",
            "primarywid": "systemdto",
            "secondarywid": "testdto"
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

            async.series([
                    function (cb) {
                        createuser("authuser1", "abcd1234abcd1234abcd1234abcd1234", "1", cb);
                    },
                    function (cb) {
                        creategroup("authuser1", "admins", "admin", cb);
                    },
                    function (cb) {
                        createpermission("authuser1", "admin", "admin", "getwidmaster", "db", "1", cb);
                    },
                    function (cb) {
                        createtestaction("stuff1", "", cb); //widname,owner,grantee,action,cb
                    },
                    function (cb) {
                        createpermission("stuff1", "staff", "staff", "getwidmaster", "db", "1", cb);
                    },
                    function (cb) {
                        creategroup("authuser1", "staff", "staff", cb);
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
                        "excutefilter": 'addwid',
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
                    execute(request1, callback);
                });
    //     });
    // });
}

// this test shall result in an unauthorized access error
// we create testdata stuff1 and provide access to it to only staff group memners
// however we try to access it (using getwidmaster) using admin group user
exports.etauth1 = etauth1 = function etauth1(params, callback) {

    testclearstorage();

    async.series([
            function (cb) {
                createuser("authuser1", "abcd1234abcd1234abcd1234abcd1234", "1", cb);
            },
            function (cb) {
                creategroup("authuser1", "admins", "admin", cb);
            },
            function (cb) {
                createpermission("authuser1", "admin", "admin", "admin", "db", "1", cb);
            },
            function (cb) {
                createtestaction("stuff1", "", cb); //widname,owner,grantee,action,cb
            },
            function (cb) {
                createpermission("stuff1", "staff", "staff", "getwidmaster", "db", "1", cb);
            },
            function (cb) {
                creategroup("authuser3", "staff", "staff", cb);
            }
        ],
        function (err, res) {
            console.log('created user, test data, assigned groups ');

            var etenvironment = {
                "ac": "abcd1234abcd1234abcd1234abcd1234",
                "action": "getwidmaster",
                // "account": "admin",
                "account": "staff",
                "db": "db"
            };

            // add environment
            executetest("addwidmaster", {
                "wid": "environment",
                "environment": etenvironment
            }, "", "");

            // get stuff1 using getwidmaster
            // perform request with unuthorized user 
            // (user in a seperate group not having permissions to do a getwidmaster on stuff1)
            executetest("getwidmaster", {
                "wid": "stuff1"
            }, "", "");

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
            "systemdto": "onetomany",
            // security data 
            "systemdto.securitydto.logged_id": true,
            "systemdto.securitydto.accesstoken": ac,
            "systemdto.securitydto.level": loginlevel,
            // permissions data 
            // "systemdto.permissionsdto.granteegroup": "admin",
            // "systemdto.permissionsdto.actiongroup": "getwidmaster",
            // "systemdto.permissionsdto.targetgroup": "admin",
            // "systemdto.permissionsdto.dbgroup": "test",
            // "systemdto.permissionsdto.levelgroup": "",
            // group data 
            "systemdto.groupdto.groupname": "admins",
            "systemdto.groupdto.grouptype": "admin",
            // category data
            "systemdto.categorydto.categorytype": "string",
            "systemdto.categorydto.categoryname": "testcatname"
        }],
        function (err, res) {
            console.log('created userdto for user ' + userwid);
            cb1(err, res)
        });
}

exports.creategroup = creategroup = function creategroup(userwid, groupname, grouptype, callback) {
    execute({
            // update user 
            "executethis": "addwidmaster",
            "metadata.method": "groupdto",
            "metadata.owner": "system",
            "groupname": groupname,
            "grouptype": grouptype,
            "wid": "admingroup",
            "systemdto": "onetomany",
            // group data 
            "systemdto.userdto.wid": userwid
        },
        function (err, res) {
            console.log('created groupname for user ' + groupname);
            callback(err, res)
        });
}

exports.createpermission = createpermission = function createpermission(userwid, granteegroup, actiongroup, targetgroup, dbgroup, levelgroup, callback) {
    execute({
            // update user 
            "executethis": "addwidmaster",
            "metadata.method": "permissiondto",
            "metadata.owner": "system",
            "wid": "getwidmasterpermission",
            "granteegroup": granteegroup,
            "levelgroup": levelgroup,
            "dbgroup": dbgroup,
            "targetgroup": targetgroup,
            "systemdto": "onetomany",
            "systemdto.userdto.wid": userwid
            // group data 
        },
        function (err, res) {
            console.log('created groupname for user ' + groupname);
            callback(err, res)
        });
}

exports.createtestaction = createtestaction = function createtestaction(widname, owner, callback) {
    execute([{
            // add test data -- stuff
            "executethis": "addwidmaster",
            "metadata.method": widname,
            "metadata.owner": owner,
            "wid": widname
        }],
        function (err, res) {
            console.log('created testdata for data --  ' + widname);
            callback(err, res)
        });
}