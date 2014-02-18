(function (window) {
    // Creating groupdto, securitydto, statusdto and balanceddto
    // securitydto holds accesstoken, status
    // groupdto holds group, each wid auto lists itself and its creator
    // permissions holds grantorwid, granteegroup, actiongroup, targetgroup
    // 
    // this test shall result in an unauthorized access error
    // we create testdata stuff1 and provide access to it to only staff group memners
    // however we try to access it (using getwidmaster) using admin group user

    exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {
        debuglevel = 17
        createsystemdtos1(params, function (err, res) {
            createsystemdtos2(params, function (err, res) {

                sectest1(params, function (err, res) {

                    //createtestuser("rogeruser", "rogerac", 99, function (err, res) {

                    execute([{
                            "executethis": "getwidmaster",
                            "wid": "userdto",
                        }, {
                            "executethis": "getwidmaster",
                            "wid": "testdto",
                        }, {
                            "executethis": "getwidmaster",
                            "wid": "systemdto",
                        }, {
                            "executethis": "getwidmaster",
                            "wid": "securitydto",
                        }, {
                            "executethis": "getwidmaster",
                            "wid": "permissiondto",
                        }, {
                            "executethis": "getwidmaster",
                            "wid": "categorydto",
                        }, {
                            "executethis": "getwidmaster",
                            "wid": "rogeruser",
                        }],
                        function (err, res) {
                            proxyprinttodiv('Function records added', res, 99);
                            callback(err, res);
                        })
                })
            })
        })
    }

    exports.createsystemdtos1 = createsystemdtos1 = function createsystemdtos1(params, callback) {
        // create dtos  
        var executeList = [

            {
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
                "zip": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                //create testdto
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                // add groupnamedto as per given wid 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "metadata.method": "groupnamedto",
                "groupname": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "string",
                "expiration": "string",
                // "creator": "accounttype",
                // "expiration": "datetime",
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
                //"groupname": "grouptype",
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
                "widname": "string",
                "balance": "string"
                //"widname": "wid",
                //"balance": "integer"
                // }, {
            }
        ];


        execute(executeList, function (err, res) {
            proxyprinttodiv('Function datasum relationships -- added all this -- ', res, 99);
            callback(err, res);

        });
    }



    exports.createsystemdtos2 = createsystemdtos2 = function createsystemdtos2(params, callback) {

        // create dtos  
        var executeList = [

            {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_user",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "userdto",
                "primarymethod": "userdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships testdto
                "primarymethod": "userdto",
                "executethis": "addwidmaster",
                "wid": "rel_system_to_test",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "testdto",
                "primarymethod": "testdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"

            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_group",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "groupdto",
                "secondarymethod": "groupdto"
            }, {
                // create relationships categorydto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_category",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "categorydto",
                "secondarymethod": "categorydto"
            }, {
                // create relationships securitydto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_security",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarymethod": "securitydto",
                "secondarywid": "securitydto"


            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_permission",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "permissiondto",
                "secondarymethod": "permissiondto"

            }, {
                // create relationships statusdto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_balance",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "balancedto",
                "secondarymethod": "balancedto"
            }
        ];

        execute(executeList, function (err, res) {
            proxyprinttodiv('Function datasum2 relationships -- added all this -- ', res, 99);
            callback(err, res);
        });
    }



    exports.createsystemdtos3 = createsystemdtos3 = function createsystemdtos3(params, callback) {
        // create dtos  
        var executeList = [

            {
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
                "zip": "string",
                "metadata.method": "testdto",
                "metadata.systemdto.type": "onetoone",
                "wid": "testdto",
                "testdto.a": "string",
                "testdto.b": "string",
                
                // add systemdto structure
                "metadata.method": "systemdto",
                "metadata.systemdto.type": "onetoone",
                "systemdto.wid": "systemdto",
                "systemdto.creator": "accounttype",
                "systemdto.expiration": "datetime",
                "systemdto.offlinerule": "string",
                "systemdto.onlinerule": "string",
                
                // add securitydto structure
                "systemdto.metadata.method": "securitydto",
                "systemdto.metadata.securitydto.type": "onetoone",
                "accesstoken": "string",
                "status": "integer",
                
                // add balancedto structure
                "systemdto.metadata.method": "balancedto",
                "systemdto.metadata.balancedto.type": "onetoone",
                "systemdto.metadata.balancedto.widname": "wid",
                "systemdto.metadata.balancedto.balance": "integer",
                
                // add categorydto structure
                "systemdto.metadata.method": "categorydto",
                "systemdto.metadata.categorydto.type": "onetoone",
                "systemdto.metadata.categorydto.categorytype": "string",
                "systemdto.metadata.categorydto.categoryname": "categorytype",

                // add groupdto structure
                "systemdto.metadata.method": "groupdto",
                "systemdto.metadata.groupdto.type": "onetoone",
                "systemdto.metadata.groupdto.grouptype": "string",
                "systemdto.metadata.groupdto.groupname": "grouptype",

                // add permissiondto structure
                "systemdto.metadata.method": "permissiondto",
                "systemdto.metadata.permissiondto.type": "onetoone",
                "systemdto.metadata.permissiondto.granteegroup": "grouptype",
                "systemdto.metadata.permissiondto.actiongroup": "grouptype",
                "systemdto.metadata.permissiondto.targetgroup": "grouptype",
                "systemdto.metadata.permissiondto.dbgroup": "dbtype",
                "systemdto.metadata.permissiondto.levelgroup": "leveltype"
            }, {
                // add groupnamedto as per given wid 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "groupname": "string",
                "metadata.method": "groupnamedto",
                "metadata.systemdto.type": "onetoone"
            }

        ];


        execute(executeList, function (err, res) {
            proxyprinttodiv('Function systemdto schema creation -- added all this -- ', res, 99);
            callback(err, res);

        });

    }


    exports.creategroup = creategroup = function creategroup(groupname) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "groupnamedto",
            "groupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function datasum2 relationships -- added all this -- ', res, 99);
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
            }],
            function (err, res) {
                proxyprinttodiv('Function createuser done --  >>>>>> added permission >>>>>  for  -- ' + userwid, res, 99);
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
                proxyprinttodiv('Function createuser done --  >>>>>> added category >>>>>  for  -- ' + wid, res, 99);
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
                proxyprinttodiv('Function addsecurity --  >>>>>> added security  >>>>>  for  -- ' + wid, res, 99);
                // console.debug('added security for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }


})(typeof window == "undefined" ? global : window);