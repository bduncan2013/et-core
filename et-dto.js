exports.sysdto = sysdto = function sysdto(params, callback) {

    // create systemdto
    executetest("addwidmaster", {
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
    }, "", "");

    // create relationships
    executetest("addwidmaster", {
        "wid": "relationshipdto1",
        "metadata.method": "relationshipdto",
        "primarywid": "systemdto",
        "secondarywid": "securitydto"
    }, "", "");
    executetest("addwidmaster", {
        "wid": "relationshipdto2",
        "metadata.method": "relationshipdto",
        "primarywid": "systemdto",
        "secondarywid": "syncdto"
    }, "", "");
    executetest("addwidmaster", {
        "wid": "relationshipdto3",
        "metadata.method": "relationshipdto",
        "primarywid": "systemdto",
        "secondarywid": "statusdto"
    }, "", "");
    executetest("addwidmaster", {
        "wid": "relationshipdto4",
        "metadata.method": "relationshipdto",
        "primarywid": "systemdto",
        "secondarywid": "balancedto"
    }, "", "");

}

exports.initdto = initdto = function initdto(params, callback) {

    // create groupdto
    executetest("addwidmaster", {
        "metadata.method": "groupdto",
        "wid": "groupdto",
        "category": "categorytype",
        "subcategory": "subcategorytype",
        "group": "grouptype"
    }, "", "");

    // create securitydto
    executetest("addwidmaster", {
        "metadata.method": "securitydto",
        "wid": "securitydto",
        "securitytype": "actiontype",
        "group": "grouptype",
        "expiration": "datetime"
    }, "", "");

    // create syncdto
    executetest("addwidmaster", {
        "metadata.method": "syncdto",
        "wid": "syncdto",
        "expiration": "datetime",
        "offlinerule": "offlineruletype",
        "onlinerule": "onlineruletype",
        "slowrule": "slowruletype"
    }, "", "");

    // create statusdto
    executetest("addwidmaster", {
        "metadata.method": "statusdto",
        "wid": "statusdto",
        "accesstoken": "string",
        "userstatus": "integer",
        "devicestatus": "integer"
    }, "", "");

    // create balancedto
    executetest("addwidmaster", {
        "metadata.method": "balancedto",
        "wid": "balancedto",
        "widname": "wid",
        "balance": "integer"
    }, "", "");
}

exports.testdto = testdto = function testdto(params, callback) {

    //add systemdto data
    executetest("addwidmaster", {
        "wid": "roger",
        "metadata.method": "systemdto",
        "wid": "testxxx",
        "creator": "internal",
        "created": "01022014",
        "expiration": "01032014",
        "category": "testing",
        "subcategory": "testingxxx",
    }, "", "");


}