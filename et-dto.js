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
    config = setconfig3();

    //add systemdto data
    executearray([{
        "executethis":"addwidmaster",
        "metadata.method": "systemdto",
        "wid": "testxxx",
        "creator": "internal",
        "created": "01032014",
        "expiration": "01042014",
        "offlinerule": "none",
        "onlinerule": "none",
        "slowrule": "default",
    }, {
		"executethis": "getwidmaster",
		"wid": "testxxx"
	}], 
    function (err, res) {
        res = logverify("et-dto", "testdto_result", "", res[1], "", {
        "metadata.method": "systemdto",
        "wid": "testxxx",
        "creator": "internal",
        "created": "01032014",
        "expiration": "01042014",
        "offlinerule": "none",
        "onlinerule": "none",
        "slowrule": "default",
     });

    if (callback instanceof Function) {
        callback(err, res);
        } else {
            return res;
        }
    });
}
