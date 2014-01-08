// Creating groupdto, securitydto, statusdto and balanceddto
// securitydto holds accesstoken, status
// groupdto holds group, each wid auto lists itself and its creator
// permissions holds grantorwid, granteegroup, actiongroup, targetgroup
// 
exports.initdto = initdto = function initdto(params, callback) {

    var res;
    testclearstorage();
    config = setconfig1();

    executearray([

            {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                //"subcategory": "subcategorytype",
                "group": "grouptype"
            }, {

                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                //"securitytype": "actiontype",
                //"granteegroup": "grouptype",
                //"expiration": "datetime",
                "accesstoken": "XXX",
                "status": "integer"

            }, {

                // create permissionsdto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "permissionsdto",
                "wid": "permissionsdto",
                //"grantorwid": "actiontype",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype"
                //"expiration": "datetime",
            }, {

                // create statusdto
                //     "executethis": "addwidmaster",
                //     "metadata.method": "statusdto",
                //     "wid": "statusdto",
                //     "accesstoken": "string",
                //     "userstatus": "integer",
                //     "devicestatus": "integer"
                // }, {

                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "widname": "wid",
                "balance": "integer"
            }, {
                // get groupdto
                "executethis": "getwidmaster",
                "wid": "groupdto"
            }, {
                // get securitydto
                "executethis": "getwidmaster",
                "wid": "securitydto"
            }, {
                // get statusdto
                "executethis": "getwidmaster",
                "wid": "statusdto"
            }, {
                // get balancedto
                "executethis": "getwidmaster",
                "wid": "balancedto"
            }
        ],
        function (err, res) {

            console.log(' initdto from test ' + JSON.stringify(res));

            res = logverify("et-dto", "groupdto_result", "", res[4], "", {
                "group": "grouptype",
                "subcategory": "subcategorytype",
                "category": "categorytype",
                "wid": "groupdto",
                "metadata.method": "groupdto"
            });

            if (res === "PASS") {
                res = logverify("et-dto", "securitydto_result", "", res[5], "", {
                    "expiration": "datetime",
                    "group": "grouptype",
                    "securitytype": "actiontype",
                    "wid": "securitydto",
                    "metadata.method": "securitydto"
                });

                if (res === "PASS") {
                    res = logverify("et-dto", "statusdto_result", "", res[6], "", {
                        "devicestatus": "integer",
                        "userstatus": "integer",
                        "accesstoken": "string",
                        "wid": "statusdto",
                        "metadata.method": "statusdto"
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
    executearray([{
            "executethis": "addwidmaster",
            "metadata.method": "systemdto",
            "wid": "systemdto",
            "creator": "accounttype",
            //"created": "datetime",     // mongo for free
            "expiration": "datetime",
            "offlinerule": "string",
            "onlinerule": "string",
            //"slowrule": "string",     // later
            "securitydto": "onetomany",
            "syncdto": "onetomany",
            "statusdto": "onetomany",
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
            // create relationships balanceddto
            "executethis": "getwidmaster",
            "wid": "systemdto"
        }],
        function (err, res) {
            res = logverify("et-dto", "systemdto_result", "", res[4], "", {
                "balancedto": "onetomany",
                "statusdto": "onetomany",
                "syncdto": "onetomany",
                "securitydto": "onetomany",
                "slowrule": "string",
                "onlinerule": "string",
                "offlinerule": "string",
                "expiration": "datetime",
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
    executearray([{
            "executethis": "addwidmaster",
            "metadata.method": "userdto",
            "wid": "userdto",
            "userid": "user",
            "creator": "internal",
            "created": "01032014",
            "expiration": "01032014",
            "category": "testing",
            "subcategory": "testingxxx",
            "systemdto.securitydto.security.logged_id": false,
            "systemdto": "onetomany"
        }, {
            "executethis": "getwidmaster",
            "wid": "userdto"
        }],
        function (err, res) {
            res = logverify("et-dto", "userdto_result", "", res[1], "", {
                "systemdto": "onetomany",
                "systemdto.securitydto.security.logged_id": false,
                "subcategory": "testingxxx",
                "category": "testing",
                "expiration": "01032014",
                "created": "01032014",
                "creator": "internal",
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

// creating testdto/targetdto
exports.testdto = testdto = function testdto(params, callback) {
    var res;
    // testclearstorage();
    config = setconfig1();

    //add testdto data
    executearray([{
            "executethis": "addwidmaster",
            "metadata.method": "testdto",
            "wid": "testdto",
            "creator": "internal",
            "created": "01032014",
            "expiration": "01042014",
            "offlinerule": "none",
            "onlinerule": "none",
            "slowrule": "default",
            "systemdto": "onetomany"
        }, {
            "executethis": "getwidmaster",
            "wid": "testdto"
        }],
        function (err, res) {
            res = logverify("et-dto", "testdto_result", "", res[1], "", {
                "systemdto": "onetomany",
                "slowrule": "default",
                "onlinerule": "none",
                "offlinerule": "none",
                "expiration": "01042014",
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

    executearray([{
            "executethis": "getwidmaster",
            "wid": "userdto"
        }],
        function (err, res) {
            console.log(' userdto from test ' + JSON.stringify(res));
            res = logverify("et-dto", "userdto_result", "", res[0], "", {
                "systemdto": "onetomany",
                "systemdto.securitydto.security.logged_id": false,
                "subcategory": "testingxxx",
                "category": "testing",
                "expiration": "01032014",
                "created": "01032014",
                "creator": "internal",
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

    executearray([

            {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                //"subcategory": "subcategorytype",
                "group": "grouptype"
            }, {

                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                //"securitytype": "actiontype",
                //"granteegroup": "grouptype",
                //"expiration": "datetime",
                "accesstoken": "XXX",
                "status": "integer"

            }, {

                // create permissionsdto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "permissionsdto",
                "wid": "permissionsdto",
                //"grantorwid": "actiontype",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype"
                //"expiration": "datetime",
            }, {

                // create statusdto
                //     "executethis": "addwidmaster",
                //     "metadata.method": "statusdto",
                //     "wid": "statusdto",
                //     "accesstoken": "string",
                //     "userstatus": "integer",
                //     "devicestatus": "integer"
                // }, {

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
                //"created": "datetime",     // mongo for free
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                //"slowrule": "string",     // later
                "securitydto": "onetomany",
                "syncdto": "onetomany",
                "statusdto": "onetomany",
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
            }
        ],
        function (err, res) {
            console.log(' from test ' + JSON.stringify(res));

            addUnauthorizedData(function (err, res) {
                // we want a secueirycheckfn(ac, account, action, db) call
                // ac from securitydto.accesstoken
                // account from accesstoken

                var userData = res;
                var ac = "000";
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
        "userid": "authorizeduser",
        "creator": "internal",
        "created": "01032014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx",
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
        "userid": "unauthorizeduser",
        "creator": "internal",
        "created": "01032014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx",
        "systemdto.securitydto.logged_id": false,
        "systemdto.securitydto.accesstoken": "000",
        "systemdto": "onetomany"
    }, callback);
}