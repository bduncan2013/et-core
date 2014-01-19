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
                "executethis": "addwidmaster",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "categorytype"
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
                "dbgroup": "dbtype",
                "levelgroup":"leveltype"
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
                "secondarywid": "permissionsdto"
            
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
            callback (err, res)
        });
}

exports.inittestdata = inittestdata = function inittestdata(params, callback) {

    execute([
            {
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
            }
            ],
        function (err, res) {
            callback (err, res)
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
            callback (err, res)
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

        //     addAuthorizedData(function (err, res) {
        //         // we want a secueirycheckfn(ac, account, action, db) call
        //         // ac from securitydto.accesstoken
        //         // account from accesstoken

        //         var userData = res;
        //         var ac = "111";
        //         var account;
        //         extend(true, account, userData); // clone user data into account
        //         var action = "getwidmaster"; /// TODO :: change this .. hard coding this to getwidmaster right now
        //         var db = "data"; /// TODO :: change this .. hard coding this to data right now

        //         securitycheck(ac, account, action, db, function (err, res) {
        //                 callback(err, res);
        //             }
        //         });
        //     });
        // });


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
// exports.testmultiple = testmultiple = function testmultiple(params, callback) {
//     var ret;
//     testclearstorage();
//     config = setconfig1();
//     var ac = "111";
//     var account = "roger";
//     var action = "getwid";
//     var db = "data";
//     securitycheck(ac, account, action, db, function (err, res) {