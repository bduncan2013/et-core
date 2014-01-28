//this file is for dto's only. No tests or data should be entered here.
//http://dripoint.com/AlternateCurrency/dtodiagram.pdf for current diagram

exports.initdto = initdto = function initdto(params, callback) {

    execute([

            {
                //create userdto
                "executethis": "updatewid",
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
                //create systemdto
                "executethis": "updatewid",
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
                "executethis": "updatewid",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "groupname": "grouptype",

                "systemdto": "onetoone"
            }, {
                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "updatewid",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                "status": "integer",

                "systemdto": "onetoone"
            }, {
                // create permissiondto
                "executethis": "updatewid",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype",
                "levelgroup": "leveltype",

                "systemdto": "onetoone"
            }, {
                //create categorydto
                "executethis": "updatewid",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "categorytype",

                "systemdto": "onetoone"
            }, {

                // create balancedto
                "executethis": "updatewid",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "widname": "wid",
                "balance": "integer",

                "systemdto": "onetoone"
            }, {
                // create relationships permissiondto
                "executethis": "updatewid",
                "wid": "relsystemdto_userdto",
                "metadata.method": "relationshipdto",
                "primarywid": "userdto",
                "secondarywid": "systemdto"
            }, {
                // create relationships permissiondto
                "executethis": "updatewid",
                "wid": "rel_systemdto_groupdto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "groupdto"
            }, {
                "executethis": "updatewid",
                "wid": "rel_systemdto_categorydto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "categorydto"
            }, {
                // create relationships securitydto
                "executethis": "updatewid",
                "wid": "relsystemdto_securitydto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "securitydto"
            }, {
                // create relationships permissiondto
                "executethis": "updatewid",
                "wid": "relsystemdto_permissiondto",
                "metadata.method": "relationshipdto",
                "primarywid": "systemdto",
                "secondarywid": "permissiondto"

            }, {
                // create relationships statusdto
                "executethis": "updatewid",
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