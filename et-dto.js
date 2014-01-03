exports.sysdto = sysdto = function sysdto(params, callback) {

    // create systemdto
    executearray([{
        "executetis": "addwidmaster",
        "metadata.method": "systemdto",
        "wid": "systemdto",
        "creator": "accounttype",
        "created": "datetime",
        "expiration": "datetime",
        "category": "string",
        "subcategory": "string",
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
        "secondarywid": "syncdto"
    }, {
        "executethis": "addwidmaster",
        "wid": "relationshipdto3",
        "metadata.method": "relationshipdto",
        "primarywid": "systemdto",
        "secondarywid": "statusdto"
    }, {
        "executethis": "addwidmaster",
        "wid": "relationshipdto4",
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

        // create syncdto
        "executethis": "addwidmaster",
        "metadata.method": "syncdto",
        "wid": "syncdto",
        "expiration": "datetime",
        "offlinerule": "offlineruletype",
        "onlinerule": "onlineruletype",
        "slowrule": "slowruletype"
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

    //add systemdto data
    executearray([{
        "executethis":"addwidmaster",
        "metadata.method": "systemdto",
        "wid": "testxxx",
        "creator": "internal",
        "created": "01022014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx"
    }],
    function (err, res) {
      res = logverify("unit_tests", "testdto_result", "", res[0], "",{
        "creator": "internal",
        "created": "01022014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx"
     });

    if (callback instanceof Function) {
        callback(err, res);
        } else {
            return res;
        }
    });
}

