// Creating groupdto, securitydto, statusdto and balanceddto
// securitydto holds accesstoken, status
// groupdto holds group, each wid auto lists itself and its creator
// permissions holds grantorwid, granteegroup, actiongroup, targetgroup
// 
exports.initdto = initdto = function initdto(params, callback) {

    var res;
    testclearstorage();
    config = setconfig1();

    execute([

            {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "group": "grouptype"
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
                "metadata.method": "permissionsdto",
                "wid": "permissionsdto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype"
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
                // get groupdto
                "executethis": "getwidmaster",
                "wid": "groupdto"
            }, {
                // get securitydto
                "executethis": "getwidmaster",
                "wid": "securitydto"
            }, {
                // get balancedto
                "executethis": "getwidmaster",
                "wid": "balancedto"
            }, {
                //get userdto
                "executethis": "getwidmaster",
                "wid": "userdto"
            }
        ],
        function (err, res) {

            console.log(' initdto from test ' + JSON.stringify(res));

            res = logverify("et-dto", "groupdto_result", "", res[4], "", {
                "group": "grouptype",
                "grouptype": "categorytype",
                "wid": "groupdto",
                "metadata.method": "groupdto"
            });

            if (res === "PASS") {
                res = logverify("et-dto", "securitydto_result", "", res[5], "", {
                    "accesstoken": "string",
                    "status": "integer",
                    "wid": "securitydto",
                    "metadata.method": "securitydto"
                });

                if (res === "PASS") {
                    res = logverify("et-dto", "userdto_result", "", res[6], "", {
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
                    });

                    if (res === "PASS") {
                        res = logverify("et-dto", "balancedto_result", "", res[7], "", {
                            "balance": "integer",
                            "widname": "wid",
                            "wid": "balancedto",
                            "metadata.method": "balancedto"
                        });
                    }
                }
            }

            if (callback instanceof Function) {
                callback(err, res);
            }
        });

    if (!(callback instanceof Function)) {
        return res;
    };
}


// creating systemdto
exports.systemdto = systemdto = function systemdto(params, callback) {

    var res;
    // testclearstorage();
    config = setconfig3();

    // create et_create_systemdto
    execute([{
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
            // create relationships securitydto
            "executethis": "addwidmaster",
            "wid": "relationshipdto1",
            "metadata.method": "relationshipdto",
            "primarywid": "systemdto",
            "secondarywid": "securitydto"
        }, {
            // create relationships statusdto
            "executethis": "addwidmaster",
            "wid": "relationshipdto2",
            "metadata.method": "relationshipdto",
            "primarywid": "systemdto",
            "secondarywid": "balancedto"
        }, {
            // create relationships permissionsdto
            "executethis": "addwidmaster",
            "wid": "relationshipdto3",
            "metadata.method": "relationshipdto",
            "primarywid": "systemdto",
            "secondarywid": "permissionsdto"
        }, {
            // create relationships permissionsdto
            "executethis": "addwidmaster",
            "wid": "relationshipdto4",
            "metadata.method": "relationshipdto",
            "primarywid": "systemdto",
            "secondarywid": "userdto"
        }, {
            // get relationships systemdto
            "executethis": "getwidmaster",
            "wid": "systemdto"
        }],
        function (err, res) {
            res = logverify("et-dto", "systemdto_result", "", res[4], "", {
                "userdto": "onetomany",
                "balancedto": "onetomany",
                "permissionsdto": "onetomany",
                "securitydto": "onetomany",
                "onlinerule": "string",
                "offlinerule": "string",
                "created": "datetime",
                "creator": "accounttype",
                "wid": "systemdto",
                "metadata.method": "systemdto"
            });

            if (callback instanceof Function) {
                callback(err, res);
            }
        });

    if (!(callback instanceof Function)) {
        return res;
    };
};

// creating userdto
exports.userdto = userdto = function userdto(params, callback) {
    var res;
    // testclearstorage();
    config = setconfig3();


    //add systemdto data
    execute([{
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
            "systemdto.securitydto.security.logged_id": false,
            "systemdto": "onetomany"
        }, {
            "executethis": "getwidmaster",
            "wid": "userdto"
        }],
        function (err, res) {
            res = logverify("et-dto", "userdto_result", "", res[1], "", {
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
                "systemdto.securitydto.security.logged_id": false,
                "systemdto": "onetomany"
            });

            if (callback instanceof Function) {
                callback(err, res);
            }
        });

    if (!(callback instanceof Function)) {
        return res;
    };
}

// creating testdto/targetdto
exports.testdto = testdto = function testdto(params, callback) {
    var res;
    // testclearstorage();
    config = setconfig1();

    //add testdto data
    execute([{
            "executethis": "addwidmaster",
            "metadata.method": "testdto",
            "wid": "testdto",
            "creator": "internal",
            "created": "01032014",
            "expiration": "01042014",
            "offlinerule": "none",
            "onlinerule": "none",
            "systemdto": "onetomany"
        }, {
            "executethis": "getwidmaster",
            "wid": "testdto"
        }],
        function (err, res) {
            res = logverify("et-dto", "testdto_result", "", res[1], "", {
                "systemdto": "onetomany",
                "onlinerule": "none",
                "offlinerule": "none",
                "created": "01032014",
                "creator": "internal",
                "wid": "testdto",
                "metadata.method": "testdto"
            });

            console.log(' testdto from test ' + JSON.stringify(res));


            if (callback instanceof Function) {
                callback(err, res);
            }
        });

    if (!(callback instanceof Function)) {
        return res;
    };
}


exports.testme = testme = function testme(params, callback) {

    var res;
    testclearstorage();
    config = setconfig3();

    initdto();
    systemdto();
    userdto();

    execute([{
            "executethis": "getwidmaster",
            "wid": "userdto"
        }],
        function (err, res) {
            console.log(' userdto from test ' + JSON.stringify(res));
            res = logverify("et-dto", "userdto_result", "", res[0], "", {
                "systemdto": "onetomany",
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
            });



            if (callback instanceof Function) {
                callback(err, res);
            }
        });

    if (!(callback instanceof Function)) {
        return res;
    };
}

exports.createdtos = createdtos = function createdtos(params, callback) {
    var res;
    testclearstorage();
    config = setconfig1();

    execute([

            {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "group": "grouptype"
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
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "permissionsdto",
                "wid": "permissionsdto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype"
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

                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "widname": "wid",
                "balance": "integer"
            }, {
                // create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "securitydto": "onetomany",
                "syncdto": "onetomany",
                "statusdto": "onetomany",
                "userdto": "onetomany",
                "balancedto": "onetomany"
            }, {
                // create relationships securitydto
                "executethis": "addwidmaster",
                "wid": "relationshipdto1",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "securitydto"
            }, {
                // create relationships statusdto
                "executethis": "addwidmaster",
                "wid": "relationshipdto2",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "statusdto"
            }, {
                // create relationships balanceddto
                "executethis": "addwidmaster",
                "wid": "relationshipdto3",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "balancedto"
            }, {
                // create relationships permissionsdto
                "executethis": "addwidmaster",
                "wid": "relationshipdto4",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "userdto"
            }
        ],
        function (err, res) {
            console.log(' from test ' + JSON.stringify(res));

            addAuthorizedData(function (err, res) {
                // we want a secueirycheckfn(ac, account, action, db) call
                // ac from securitydto.accesstoken
                // account from accesstoken

                var userData = res;
                var ac = "111";
                var account;
                extend(true, account, userData); // clone user data into account
                var action = "getwidmaster"; /// TODO :: change this .. hard coding this to getwidmaster right now
                var db = "data"; /// TODO :: change this .. hard coding this to data right now

                securitycheck(ac, account, action, db, function (err, res) {
                    if (callback instanceof Function) {
                        callback(err, res);
                    }
                });
            });
        });

    if (!(callback instanceof Function)) {
        return res;
    };
};


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

// test user to pass after data has been setup in sample wids
exports.authpass1 = authpass1 = function authpass1(params, callback) {
    var ret;
    testclearstorage();
    config = setconfig1();
    var ac = "111";
    var account = "roger";
    var action = "getwid";
    var db = "data";
    securitycheck(ac, account, action, db, function (err, res) {
        ret = res;
        if (callback instanceof Function) {
            callback(err, ret);
        }
    });

    if (!(callback instanceof Function)) {
        return ret;
    };
}

// test user to pass after data has been setup in sample wids
exports.authfail1 = authfail1 = function authfail1(params, callback) {
    var ret;
    testclearstorage();
    config = setconfig1();
    var ac = "000";
    var account = "roger";
    var action = "getwid";
    var db = "data";
    securitycheck(ac, account, action, db, function (err, res) {
        ret = res;
        if (callback instanceof Function) {
            callback(err, ret);
        }
    });

    if (!(callback instanceof Function)) {
        return ret;
    };
}


// test user to pass after data has been setup in sample wids
exports.testmultiple = testmultiple = function testmultiple(params, callback) {
    var ret;
    testclearstorage();
    config = setconfig1();
    var ac = "111";
    var account = "roger";
    var action = "getwid";
    var db = "data";
    securitycheck(ac, account, action, db, function (err, res) {
        ret = res;
        if (callback instanceof Function) {
            callback(err, ret);
        }
    });

    if (!(callback instanceof Function)) {
        return ret;
    };
}