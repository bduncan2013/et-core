
// exports.sysdto = sysdto = function sysdto(params, callback) {

//     // create systemdto
//     executetest("addwidmaster", {
//         "metadata.method": "systemdto",
//         "wid": "systemdto",
//         "creator": "accounttype",
//         "created": "datetime",
//         "expiration": "datetime",
//         "category": "string",
//         "subcategory": "string",
//         "securitydto": "onetomany",
//         "syncdto": "onetomany",
//         "statusdto": "onetomany",
//         "balancedto": "onetomany"
//     }, "", "");

//     // create relationships
//     executetest("addwidmaster", {
//         "wid": "relationshipdto1",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "securitydto"
//     }, "", "");
//     executetest("addwidmaster", {
//         "wid": "relationshipdto2",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "syncdto"
//     }, "", "");
//     executetest("addwidmaster", {
//         "wid": "relationshipdto3",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "statusdto"
//     }, "", "");
//     executetest("addwidmaster", {
//         "wid": "relationshipdto4",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "balancedto"
//     }, "", "");

// }

// exports.initdto = initdto = function initdto(params, callback) {

//     // create groupdto
//     executetest("addwidmaster", {
//         "metadata.method": "groupdto",
//         "wid": "groupdto",
//         "category": "categorytype",
//         "subcategory": "subcategorytype",
//         "group": "grouptype"
//     }, "", "");

//     // create securitydto
//     executetest("addwidmaster", {
//         "metadata.method": "securitydto",
//         "wid": "securitydto",
//         "securitytype": "actiontype",
//         "group": "grouptype",
//         "expiration": "datetime"
//     }, "", "");

//     // create syncdto
//     executetest("addwidmaster", {
//         "metadata.method": "syncdto",
//         "wid": "syncdto",
//         "expiration": "datetime",
//         "offlinerule": "offlineruletype",
//         "onlinerule": "onlineruletype",
//         "slowrule": "slowruletype"
//     }, "", "");

//     // create statusdto
//     executetest("addwidmaster", {
//         "metadata.method": "statusdto",
//         "wid": "statusdto",
//         "accesstoken": "string",
//         "userstatus": "integer",
//         "devicestatus": "integer"
//     }, "", "");

//     // create balancedto
//     executetest("addwidmaster", {
//         "metadata.method": "balancedto",
//         "wid": "balancedto",
//         "widname": "wid",
//         "balance": "integer"
//     }, "", "");
// }

// exports.testdto = testdto = function testdto(params, callback) {

//     //add systemdto data
//     executetest("addwidmaster", {
//         "wid": "roger",
//         "metadata.method": "systemdto",
//         "wid": "testxxx",
//         "creator": "internal",
//         "created": "01022014",
//         "expiration": "01032014",
//         "category": "testing",
//         "subcategory": "testingxxx",
//     }, "", "");


// }
// exports.systemdto = systemdto = function systemdto(params, callback) {

//     // create systemdto
//     executearray([{
//         "executetis": "addwidmaster",
//         "metadata.method": "systemdto",
//         "wid": "systemdto",
//         "creator": "accounttype",
//         "created": "datetime",
//         "expiration": "datetime",
//         "category": "string",
//         "subcategory": "string",
//         "securitydto": "onetomany",
//         "syncdto": "onetomany",
//         "statusdto": "onetomany",
//         "balancedto": "onetomany"
//     }, {
//         // create relationships
//         "executethis": "addwidmaster",
//         "wid": "relationshipdto1",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "securitydto"
//     }, {
//         "executethis": "addwidmaster",
//         "wid": "relationshipdto2",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "syncdto"
//     }, {
//         "executethis": "addwidmaster",
//         "wid": "relationshipdto3",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "statusdto"
//     }, {
//         "executethis": "addwidmaster",
//         "wid": "relationshipdto4",
//         "metadata.method": "relationshipdto",
//         "primarywid": "systemdto",
//         "secondarywid": "balancedto"
//     }], function (err, res) {
//         console.log('>>>> from sysdto ' + JSON.stringify(res));
//     });

// }

// exports.initdto = initdto = function initdto(params, callback) {

//     // create groupdto
//     executearray([{
//             "executethis": "addwidmaster",
//             "metadata.method": "groupdto",
//             "wid": "groupdto",
//             "category": "categorytype",
//             "subcategory": "subcategorytype",
//             "group": "grouptype"
//         }

//         // create securitydto
//         , {
//             "executethis": "addwidmaster",
//             "metadata.method": "securitydto",
//             "wid": "securitydto",
//             "securitytype": "actiontype",
//             "group": "grouptype",
//             "expiration": "datetime"
//         }

//         // create syncdto
//         , {
//             "executethis": "addwidmaster",
//             "metadata.method": "syncdto",
//             "wid": "syncdto",
//             "expiration": "datetime",
//             "offlinerule": "offlineruletype",
//             "onlinerule": "onlineruletype",
//             "slowrule": "slowruletype"
//         }

//         // create statusdto
//         , {
//             "executethis": "addwidmaster",
//             "metadata.method": "statusdto",
//             "wid": "statusdto",
//             "accesstoken": "string",
//             "userstatus": "integer",
//             "devicestatus": "integer"
//         }

//         // create balancedto
//         , {
//             "executethis": "addwidmaster",
//             "metadata.method": "balancedto",
//             "wid": "balancedto",
//             "widname": "wid",
//             "balance": "integer"
//         }
//     ], function (err, res) {
//         console.log('>>>> from initdto ' + JSON.stringify(res));
//         if (callback instanceof Function) {
//             callback(err, res);
//         }
//     });

//     if (!(callback instanceof Function)) {
//         return res;
//     }
// }

// exports.testdto = testdto = function testdto(params, callback) {

//     //add systemdto data
//     executearray([{
//             "executethis": "addwidmaster",
//             "metadata.method": "systemdto",
//             "wid": "testxxx",
//             "creator": "internal",
//             "created": "01022014",
//             "expiration": "01032014",
//             "category": "testing",
//             "subcategory": "testingxxx"
//         }],
//         function (err, res) {
//             console.log('>>>> from testdto ' + JSON.stringify(res));
//             res = logverify("unit_tests", "testxxx_result", "", res[0], "", {
//                 "creator": "internal",
//                 "created": "01022014",
//                 "expiration": "01032014",
//                 "category": "testing",
//                 "subcategory": "testingxxx"
//             });

//             if (callback instanceof Function) {
//                 callback(err, res);
//             }
//         });

//     if (!(callback instanceof Function)) {
//         return res;
//     }
// }

// create userdto, testdto, permissiondto, securitydto, groupdto

exports.userdto = userdto = function userdto(params, callback) {
    testclearstorage();
    config = setconfig1(); === === =
        exports.sysdto = sysdto = function sysdto(params, callback) {

            // create systemdto
            executearray([{
                "executetis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "created": "datetime",
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "slowrule": "string",
                "securitydto": "onetomany",
                "syncdto": "onetomany",
                "statusdto": "onetomany",
                "balancedto": "onetomany"
            }, {

                // create relationships
                "executethis": "addwidmaster",
                "wid": "relationshipdto1",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "securitydto"
            }, {
                "executethis": "addwidmaster",
                "wid": "relationshipdto2",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "statusdto"
            }, {
                "executethis": "addwidmaster",
                "wid": "relationshipdto3",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "balancedto"
            }]);

    }

    exports.initdto = initdto = function initdto(params, callback) {

        // create groupdto
        executearray([{
            "executetis": "addwidmaster",
            "metadata.method": "groupdto",
            "wid": "groupdto",
            "category": "categorytype",
            "subcategory": "subcategorytype",
            "group": "grouptype"
        }, {

            // create securitydto
            "executethis": "addwidmaster",
            "metadata.method": "securitydto",
            "wid": "securitydto",
            "securitytype": "actiontype",
            "group": "grouptype",
            "expiration": "datetime"
        }, {

            // create statusdto
            "executethis": "addwidmaster",
            "metadata.method": "statusdto",
            "wid": "statusdto",
            "accesstoken": "string",
            "userstatus": "integer",
            "devicestatus": "integer"
        }, {

            // create balancedto
            "executethis": "addwidmaster",
            "metadata.method": "balancedto",
            "wid": "balancedto",
            "widname": "wid",
            "balance": "integer"
        }]);
    }

    exports.testdto = testdto = function testdto(params, callback) {
        testclearstorage();
        config = setconfig3(); >>> >>> > ae5e69675adec6c1e12e82c01e540de053d105a9

        //add systemdto data
        executearray([{
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "wid": "userwid",
                "userid": "userwid",
                "creator": "internal",
                "created": "01032014",
                "expiration": "01032014",
                "category": "testing",
                "subcategory": "testingxxx",
                "systemdto.securitydto.security.logged_id": false,
                "systemdto": "onetomany"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "testdto",
                "creator": "internal",
                "created": "01022014",
                "expiration": "01032014",
                "category": "testing",
                "subcategory": "testingxxx",
                "systemdto": "onetomany"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "accountwid": "userwid",
                "category": "testing",
                "subcategory": "testingxxx",
                "systemdto": "onetomany"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "category": "testing",
                "subcategory": "testingxxx",
                "systemdto": "onetomany"
            }, {
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "category": "testing",
                "subcategory": "testingxxx",
                "systemdto": "onetomany"
            }, {
                "executethis": "getwidmaster",
                "wid": "testxxx"
            }],
            function (err, res) {
                res = logverify("et-dto", "userdto_result", "", res[0], "", {
                    "creator": "internal",
                    "created": "01022014",
                    "expiration": "01032014",
                    "category": "testing",
                    "subcategory": "testingxxx"
                    "created": "01032014",
                    "expiration": "01042014",
                    "offlinerule": "none",
                    "onlinerule": "none",
                    "slowrule": "default",
                });
                if (callback instanceof Function) {
                    callback(err, res);
                }
            }

            if (!(callback instanceof Function)) {
                return res;
            };
        }