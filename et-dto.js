(function (window) {
    // Creating groupdto, securitydto, statusdto and balanceddto
    // securitydto holds accesstoken, status
    // groupdto holds group, each wid auto lists itself and its creator
    // permissions holds grantorwid, granteegroup, actiongroup, targetgroup
    // 
    // this test shall result in an unauthorized access error
    // we create testdata stuff1 and provide access to it to only staff group memners
    // however we try to access it (using getwidmaster) using admin group user
    exports.csd = csd = function csd(params, callback) {
        var executeList = [

            {
                // parentdto
                "executethis": "addwidmaster",
                "metadata.method": "parentdto",
                "wid": "parentdto",
                "phone": "string",
                "metadata.childdto.type": "onetoone",
                "metadata.childdto.grandchilddto.type": "onetoone"
            }, {
                //create childdto
                "executethis": "addwidmaster",
                "metadata.method": "childdto",
                "wid": "childdto",
                "phonechild": "string",
            }, {
                //create grandchilddto
                "executethis": "addwidmaster",
                "metadata.method": "grandchilddto",
                "wid": "grandchilddto",
                "phonegrandchild": "string"
            }, {
                // create data 
                "executethis": "addwidmaster",
                "metadata.method": "parentdto",
                "phone": "9812121212",
                "childdto.phonechild": "999988887777",
                "grandchilddto.phoneegrandhild": "11112222233333"
            }
        ];

        execute(executeList, function (err, res) {
            // proxyprinttodiv('Function csd -- added all this -- ', res, 99);
            callback(err, res);

        });
    }

    exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {
        debuglevel = 17;
        // create dtos  
        var executeList = [
            // "executethis": "addwidmaster",
            // "wid": "sonddto",
            // "metadata.method": "sonddto",
            // "title": "string",
            // "metadata.sounddto.type": "onetomany",
            // "sounddto.wid": "sounddto",
            // "sounddto.metadata.method": "sounddto",
            // "sounddto.note": "string"

            {
                // note we do not actually store anything here
                "executethis": "addwidmaster",
                "metadata.method": "logindto",
                "wid": "logindto",
                "phone": "string",
                "pin": "string"

            }, {
                //create userdto
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "wid": "userdto",
                "widname": "wid",
                "fname": "string",
                "lname": "string",
                "phone": "string",
                "email": "string",
                "address": "string",
                "address2": "string",
                "city": "string",
                "state": "string",
                "zip": "string",
                "country": "string",
                // "metadata.useradddto.type": "onetoone",
                "metadata.systemdto.type": "onetoone"
            }, {
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "string", //"accounttype",
                "expiration": "string", //"datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "metadata.securitydto.type": "onetoone",
                "metadata.balancedto.type": "onetoone",
                "metadata.categorydto.type": "onetoone",
                "metadata.groupdto.type": "onetoone",
                "metadata.permissiondto.type": "onetoone"
            }, {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "groupwid": "string",
                "groupname": "string"
            }, {
                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                //"status": "integer"
                "status": "string"
            }, {
                // create permissiondto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                // "granteegroup": "grouptype",
                // "actiongroup": "grouptype",
                // "targetgroup": "grouptype",
                // "dbgroup": "dbtype",
                // "levelgroup": "leveltype"
                "granteegroup": "string",
                "actiongroup": "string",
                //"targetgroup": "string",
                "dbgroup": "string",
                "levelgroup": "string"
            }, {
                //create categorydto
                "executethis": "addwidmaster",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "string"
                //"categoryname": "categorytype"
            }, {
                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "currencywid": "string", // wid 
                "balance": "string" // integer
            }, {
                // create system user data
                "executethis": "addwidmaster",
                "metadata.method": "systemuserdto",
                "wid": "systemuserdto",
                "startwid": "string"

            }, {
                // create useradddto
                "executethis": "addwidmaster",
                "metadata.method": "useradddto",
                "wid": "useradddto"
            }, {
                //testdto
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "metadata.systemdto.type": "onetoone"
            },

            {
                // add categorynamedto 
                "executethis": "addwidmaster",
                "wid": "categorynamedto",
                "metadata.method": "categorynamedto",
                "categoryname": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                // add groupnamedto 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "metadata.method": "groupnamedto",
                "groupname": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                // link from user to other dto to show how done
                // it would have own sych rules
                "executethis": "addwidmaster",
                "metadata.method": "environmentdto",
                "wid": "environmentdto",
                "ac": "string",
                "gps": "string",
                "account": "string",
                "db": "string",
                "collection": "collection",
                "metadata.systemdto.type": "onetoone"
            }, {
                // create relationships user >> useradddto
                "executethis": "addwidmaster",
                "wid": "rel_user_to_useradddto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "userdto",
                "primarymethod": "userdto",
                "secondarywid": "useradddto",
                "secondarymethod": "useradddto"
            }, {
                // create relationships environmentdto >> systemdto
                "executethis": "addwidmaster",
                "wid": "rel_environmentdto_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "environmentdto",
                "primarymethod": "environmentdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships test >>  systemdto
                "executethis": "addwidmaster",
                "wid": "rel_test_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "testdto",
                "primarymethod": "testdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships systemdto >> groupdto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_groupdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "groupdto",
                "secondarymethod": "groupdto"
            }, {
                // create relationships systemdto >> permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_permissiondto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "permissiondto",
                "secondarymethod": "permissiondto"
            }, {
                // create relationships systemdto >> balancedto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_balancedto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "balancedto",
                "secondarymethod": "balancedto"
            }, {
                // create relationships user >> systemdto
                "executethis": "addwidmaster",
                "wid": "rel_user_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "userdto",
                "primarymethod": "userdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships systemdto >> securitydto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_securitydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "securitydto",
                "secondarymethod": "securitydto"
            }, {
                // create relationships systemdto >> categorydto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_categorydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "categorydto",
                "secondarymethod": "categorydto"
            }, {
                // create relationships systemdto
                "executethis": "addwidmaster",
                "wid": "rel_categorynamedto_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "categorynamedto",
                "primarymethod": "categorynamedto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships systemdto
                "executethis": "addwidmaster",
                "wid": "rel_groupnamedto_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "groupnamedto",
                "primarymethod": "groupnamedto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"

                // },
                // {
                // create test data
                // "executethis": "addwidmaster",
                // "metadata.method": "userdto",
                // "wid":"someuser", // 
                // "widname": "wid1",
                // "fname": "string1",
                // "lname": "string1",
                // "phone": "phone1",
                // "email": "string1",
                // "address": "string1",
                // "address2": "string1",
                // "city": "string1",
                // "state": "string1",
                // "zip": "string1",
                // "country": "string1",
                // "systemdto.creator": "string", //"accounttype",
                // "systemdto.expiration": "string", //"datetime",
                // "systemdto.offlinerule": "string",
                // "systemdto.onlinerule": "string",
                // "systemdto.securitydto.accesstoken": "ac1",
                // "systemdto.securitydto.status": "status1"
            }, {
                "executethis": "getwidmaster",
                "wid": "userdto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "testdto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "systemdto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "securitydto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "permissiondto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "categorydto"
                // }, {
                // "executethis": "getwidmaster",
                // "wid": "someuser"
            }
        ];


        execute(executeList, function (err, res) {
            proxyprinttodiv('Function createsystemdtos4 -- added all this -- ', res, 99);
            callback(err, res);

        });
    }

    // exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {

    //     createsystemdtos1(params, function (err, res) {
    //         createsystemdtos2(params, function (err, res) {

    //             //sectest1(params, function (err, res) {
    //             //debuglevel = 17
    //             //createtestuser("rogeruser", "rogerac", "99", function (err, res) {
    //             //test1000(params, function (err, res) {

    //             execute([{
    //                     "executethis": "getwidmaster",
    //                     "wid": "userdto",
    //                 }, {
    //                     "executethis": "getwidmaster",
    //                     "wid": "testdto",
    //                 }, {
    //                     "executethis": "getwidmaster",
    //                     "wid": "systemdto",
    //                 }, {
    //                     "executethis": "getwidmaster",
    //                     "wid": "securitydto",
    //                 }, {
    //                     "executethis": "getwidmaster",
    //                     "wid": "permissiondto",
    //                 }, {
    //                     "executethis": "getwidmaster",
    //                     "wid": "categorydto",
    //                 }],
    //                 function (err, res) {
    //                     execute({
    //                         "executethis": "getwidmaster",
    //                         "wid": "userdto",
    //                     }, function (err, res) {
    //                         proxyprinttodiv('Function createsystemdtos userdto', res, 99);
    //                         callback(err, res);
    //                     });
    //                 })
    //             //})
    //         })
    //     })
    // }

    // exports.createsystemdtos1 = createsystemdtos1 = function createsystemdtos1(params, callback) {
    //     // create dtos  
    //     var executeList = [

    //         {
    //             // note we do not actually store anything here
    //             "executethis": "addwidmaster",
    //             "metadata.method": "logindto",
    //             "wid": "logindto",
    //             "phone": "string",
    //             "pin": "string"

    //         }, {
    //             //create userdto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "userdto",
    //             "wid": "userdto",
    //             "widname": "wid",
    //             "fname": "string",
    //             "lname": "string",
    //             "phone": "phone",
    //             "email": "string",
    //             "address": "string",
    //             "address2": "string",
    //             "city": "string",
    //             "state": "string",
    //             "zip": "string",
    //             "country": "string",
    //             "metadata.systemdto.type": "onetoone",
    //             "metadata.useradddto.type": "onetoone"
    //         }, {
    //             // link from user to other dto to show how done
    //             // it would have own sych rules
    //             "executethis": "addwidmaster",
    //             "metadata.method": "environmentdto",
    //             "wid": "environmentdto",
    //             "ac": "string",
    //             "gps": "string",
    //             "account": "string",
    //             "db": "string",
    //             "collection": "collection",
    //             "metadata.systemdto.type": "onetoone"
    //         }, {
    //             // add groupnamedto 
    //             "executethis": "addwidmaster",
    //             "wid": "groupnamedto",
    //             "metadata.method": "groupnamedto",
    //             "groupname": "string",
    //             "metadata.systemdto.type": "onetoone"
    //         }, {
    //             // add categorynamedto 
    //             "executethis": "addwidmaster",
    //             "wid": "categorynamedto",
    //             "metadata.method": "categorynamedto",
    //             "categoryname": "string",
    //             "metadata.systemdto.type": "onetoone"
    //         }, {
    //             //testdto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "testdto",
    //             "wid": "testdto",
    //             "a": "string",
    //             "b": "string",
    //             "metadata.systemdto.type": "onetoone"
    //         }, {
    //             //create systemdto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "systemdto",
    //             "wid": "systemdto",
    //             "creator": "string", //"accounttype",
    //             "expiration": "string", //"datetime",
    //             "offlinerule": "string",
    //             "onlinerule": "string",
    //             "metadata.securitydto.type": "onetoone",
    //             "metadata.balancedto.type": "onetoone",
    //             "metadata.categorydto.type": "onetoone",
    //             "metadata.groupdto.type": "onetoone",
    //             "metadata.permissiondto.type": "onetoone"
    //         }, {
    //             // create groupdto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "groupdto",
    //             "wid": "groupdto",
    //             "grouptype": "string",
    //             "groupwid": "string",
    //             "groupname": "string"
    //         }, {
    //             // create securitydto
    //             // securitydto holds accesstoken, status
    //             "executethis": "addwidmaster",
    //             "metadata.method": "securitydto",
    //             "wid": "securitydto",
    //             "accesstoken": "string",
    //             //"status": "integer"
    //             "status": "string"
    //         }, {
    //             // create permissiondto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "permissiondto",
    //             "wid": "permissiondto",
    //             // "granteegroup": "grouptype",
    //             // "actiongroup": "grouptype",
    //             // "targetgroup": "grouptype",
    //             // "dbgroup": "dbtype",
    //             // "levelgroup": "leveltype"
    //             "granteegroup": "string",
    //             "actiongroup": "string",
    //             //"targetgroup": "string",
    //             "dbgroup": "string",
    //             "levelgroup": "string"
    //         }, {
    //             //create categorydto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "categorydto",
    //             "wid": "categorydto",
    //             "categorytype": "string",
    //             "categoryname": "string"
    //             //"categoryname": "categorytype"
    //         }, {
    //             // create balancedto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "balancedto",
    //             "wid": "balancedto",
    //             "currencywid": "string", // wid 
    //             "balance": "string" // integer
    //         }, {
    //             // create system user data
    //             "executethis": "addwidmaster",
    //             "metadata.method": "systemuserdto",
    //             "wid": "systemuserdto",
    //             "startwid": "string"
    //         }
    //     ];


    //     execute(executeList, function (err, res) {
    //         proxyprinttodiv('Function datasum relationships -- added all this -- ', res, 99);
    //         callback(err, res);

    //     });
    // }



    // exports.createsystemdtos2 = createsystemdtos2 = function createsystemdtos2(params, callback) {

    //     // create dtos  
    //     var executeList = [

    //         {
    //             // create relationships permissiondto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_system",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "userdto",
    //             "primarymethod": "userdto",
    //             "secondarywid": "systemdto",
    //             "secondarymethod": "systemdto"
    //         }, {
    //             // create relationships statusdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_balance",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "userdto",
    //             "primarymethod": "userdto",
    //             "secondarywid": "balancedto",
    //             "secondarymethod": "balancedto"
    //         }, {
    //             // create relationships useradddto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_useradddto",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "userdto",
    //             "primarymethod": "userdto",
    //             "secondarywid": "useradddto",
    //             "secondarymethod": "useradddto"
    //         }, {
    //             // create relationships systemuserdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_sytemuserdto",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "userdto",
    //             "primarymethod": "userdto",
    //             "secondarywid": "systemuserdto",
    //             "secondarymethod": "systemuserdto"
    //         }, {
    //             // create relationships statusdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_useradd_to_system",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "environmentdto",
    //             "primarymethod": "environmentdto",
    //             "secondarywid": "systemdto",
    //             "secondarymethod": "systemdto"
    //         }, {
    //             // create relationships testdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_test_to_system",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "testdto",
    //             "primarymethod": "testdto",
    //             "secondarywid": "systemdto",
    //             "secondarymethod": "systemdto"
    //             // create relationships permissiondto
    //         }, {
    //             "executethis": "addwidmaster",
    //             "wid": "rel_cat_to_system",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "systemdto",
    //             "primarymethod": "systemdto",
    //             "secondarywid": "categorydto",
    //             "secondarymethod": "categorydto"
    //         }, {
    //             "executethis": "addwidmaster",
    //             "wid": "rel_grouo_to_system",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "systemdto",
    //             "primarymethod": "systemdto",
    //             "secondarywid": "groupnamedto",
    //             "secondarymethod": "groupnamedto"
    //         }, {
    //             // create relationships permissiondto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_system_to_groupname",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "systemdto",
    //             "primarymethod": "systemdto",
    //             "secondarywid": "groupdto",
    //             "secondarymethod": "groupdto"
    //         }, {

    //             // create relationships categorydto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_system_to_category",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "systemdto",
    //             "primarymethod": "systemdto",
    //             "secondarywid": "categorydto",
    //             "secondarymethod": "categorydto"
    //         }, {
    //             // create relationships securitydto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_system_to_security",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "systemdto",
    //             "primarymethod": "systemdto",
    //             "secondarymethod": "securitydto",
    //             "secondarywid": "securitydto"


    //         }, {
    //             // create relationships permissiondto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_system_to_permission",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "systemdto",
    //             "primarymethod": "systemdto",
    //             "secondarywid": "permissiondto",
    //             "secondarymethod": "permissiondto"
    //         }, {
    //             // create relationships statusdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_balance",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "userdto",
    //             "primarymethod": "userdto",
    //             "secondarywid": "balancedto",
    //             "secondarymethod": "balancedto"
    //         }, {
    //             // create relationships systemuserdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_sytemuserdto",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "userdto",
    //             "primarymethod": "userdto",
    //             "secondarywid": "systemuserdto",
    //             "secondarymethod": "systemuserdto"

    //         }, {
    //             // create relationships systemuserdto
    //             "executethis": "addwidmaster",
    //             "wid": "rel_user_to_categorynamedto",
    //             "metadata.method": "relationshipdto",
    //             "relationshiptype": "attributes",
    //             "linktype": "onetoone",
    //             "primarywid": "categorynamedto",
    //             "primarymethod": "categorynamedto",
    //             "secondarywid": "systemuserdto",
    //             "secondarymethod": "systemuserdto"

    //         }

    //     ];

    //     execute(executeList, function (err, res) {
    //         proxyprinttodiv('Function datasum2 relationships -- added all this -- ', res, 99);
    //         callback(err, res);
    //     });
    // }

    // exports.createsystemdtos3 = createsystemdtos3 = function createsystemdtos3(params, callback) {
    //     // create dtos  
    //     var executeList = [

    //         {
    //             //create userdto
    //             "executethis": "addwidmaster",
    //             "metadata.method": "userdto",
    //             "wid": "userdto",
    //             "widname": "wid",
    //             "fname": "string",
    //             "lname": "string",
    //             "email": "string",
    //             "email2": "string",
    //             "address": "string",
    //             "address2": "string",
    //             "city": "string",
    //             "state": "string",
    //             "zip": "string",
    //             "metadata.method": "testdto",
    //             "metadata.systemdto.type": "onetoone",
    //             "wid": "testdto",
    //             "testdto.a": "string",
    //             "testdto.b": "string",
    //             // add systemdto structure
    //             "metadata.method": "systemdto",
    //             "metadata.systemdto.type": "onetoone",
    //             "systemdto.wid": "systemdto",
    //             "systemdto.creator": "accounttype",
    //             "systemdto.expiration": "datetime",
    //             "systemdto.offlinerule": "string",
    //             "systemdto.onlinerule": "string",
    //             // add securitydto structure
    //             "systemdto.metadata.method": "securitydto",
    //             "systemdto.metadata.securitydto.type": "onetoone",
    //             "accesstoken": "string",
    //             "status": "integer",
    //             // add balancedto structure
    //             "systemdto.metadata.method": "balancedto",
    //             "systemdto.metadata.balancedto.type": "onetoone",
    //             "systemdto.metadata.balancedto.widname": "wid",
    //             "systemdto.metadata.balancedto.balance": "integer",
    //             // add categorydto structure
    //             "systemdto.metadata.method": "categorydto",
    //             "systemdto.metadata.categorydto.type": "onetoone",
    //             "systemdto.metadata.categorydto.categorytype": "string",
    //             "systemdto.metadata.categorydto.categoryname": "categorytype",

    //             // add groupdto structure
    //             "systemdto.metadata.method": "groupdto",
    //             "systemdto.metadata.groupdto.type": "onetoone",
    //             "systemdto.metadata.groupdto.grouptype": "string",
    //             "systemdto.metadata.groupdto.groupname": "grouptype",

    //             // add permissiondto structure
    //             "systemdto.metadata.method": "permissiondto",
    //             "systemdto.metadata.permissiondto.type": "onetoone",
    //             "systemdto.metadata.permissiondto.granteegroup": "grouptype",
    //             "systemdto.metadata.permissiondto.actiongroup": "grouptype",
    //             "systemdto.metadata.permissiondto.targetgroup": "grouptype",
    //             "systemdto.metadata.permissiondto.dbgroup": "dbtype",
    //             "systemdto.metadata.permissiondto.levelgroup": "leveltype"
    //         }, {
    //             // add groupnamedto as per given wid 
    //             "executethis": "addwidmaster",
    //             "wid": "groupnamedto",
    //             "groupname": "string",
    //             "metadata.method": "groupnamedto",
    //             "metadata.systemdto.type": "onetoone"
    //         }

    //     ];


    //     execute(executeList, function (err, res) {
    //         proxyprinttodiv('Function systemdto schema creation -- added all this -- ', res, 99);
    //         callback(err, res);

    //     });

    // }

    // exports.createsystemdefaults = createsystemdefaults = function createsystemdefaults(params, callback) {}

    // exports.createsystemdata = createsystemdata = function createsystemdata(params, callback) {}




    exports.creategroup = creategroup = function creategroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "groupnamedto",
            "groupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function creategroup relationships -- added all this -- ', res, 99);
            callback(err, res);
        });
    }


    exports.addgrouptowid = addgrouptowid = function addgrouptowid(wid, widmethod, groupname, callback) {

        proxyprinttodiv('Function addgrouptowid done --starting ' + groupname + ' for wid ' + wid + " >>>> ", wid, 34);

        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "groupname": groupname
            }, {
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": widmethod,
                "systemdto.groupdto.groupname": groupname,
            }],
            function (err, res) {
                proxyprinttodiv('Function addgrouptowid done --added group ' + groupname + ' for wid ' + wid + " >>>> ", wid, 34);

                console.debug('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));

                callback(err, res)
            });
    }
    // addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, cb1);
    exports.addpermission = addpermission = function addpermission(userwid, granteegroup, actiongroup, dbgroup, levelgroup, callback) {
        execute([{
                // add permissions as per given information 
                "executethis": "addwidmaster",
                "wid": userwid,
                // permissions data 
                "metadata.method": "userdto",
                "systemdto.permissiondto.granteegroup": granteegroup,
                "systemdto.permissiondto.actiongroup": actiongroup,
                "systemdto.permissiondto.dbgroup": dbgroup,
                "systemdto.permissiondto.levelgroup": levelgroup
            }, {
                "executethis": "getwidmaster",
                "wid": userwid
            }],
            function (err, res) {
                proxyprinttodiv('Function createuser done --  >>>>>> added permission >>>>>  for  -- ' + userwid, res, 34);
                proxyprinttodiv('from getwidmaster  -- ' + userwid, res[1], 34);
                // console.debug('added permission data ' + granteegroup + ' for user ' + userwid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }

    exports.addcategory = addcategory = function addcategory(wid, widmethod, categorytype, categoryname, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": widmethod,
                // category data
                "systemdto.categorydto.categorytype": categorytype,
                "systemdto.categorydto.categoryname": categoryname
            }],
            function (err, res) {
                proxyprinttodiv('Function createuser done --  >>>>>> added category >>>>>  for  -- ' + wid, res, 34);
                // console.debug('added categoryname ' + categoryname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }


    exports.addsecurity = addsecurity = function addsecurity(wid, accesstoken, loginlevel, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                // security data
                "metadata.method": "userdto",
                "systemdto.securitydto.accesstoken": accesstoken,
                "systemdto.securitydto.level": loginlevel,
            }],
            function (err, res) {
                proxyprinttodiv('Function addsecurity --  >>>>>> added security  >>>>>  for  -- ' + wid, res, 34);
                // console.debug('added security for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }


})(typeof window == "undefined" ? global : window);