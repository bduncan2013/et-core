(function (window) {
    // Creating groupdto, securitydto, statusdto and balanceddto
    // securitydto holds accesstoken, status
    // groupdto holds group, each wid auto lists itself and its creator
    // permissions holds grantorwid, granteegroup, actiongroup, targetgroup
    // 
    // this test shall result in an unauthorized access error
    // we create testdata stuff1 and provide access to it to only staff group memners
    // however we try to access it (using getwidmaster) using admin group user
    exports.datasum1 = datasum1 = function datasum1(params, callback) {
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
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "expiration": "datetime",
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
                "groupname": "grouptype"
            }, {
                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                "status": "integer"
            }, {
                // create permissiondto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "grouptype",
                "actiongroup": "grouptype",
                "targetgroup": "grouptype",
                "dbgroup": "dbtype",
                "levelgroup": "leveltype"
            }, {
                //create categorydto
                "executethis": "addwidmaster",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "categorytype"
            }, {
                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "widname": "wid",
                "balance": "integer"
            }, {
                // add groupnamedto as per given wid 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "metadata.method": "groupnamedto",
                "groupname": "string",
                "metadata.systemdto.type": "onetoone"
            }
        ];


        execute(executeList, function (err, res) {
            proxyprinttodiv('Function datasum relationships -- added all this -- ', res, 99);
            callback(err, res);

        });
    }

    exports.datasum2 = datasum2 = function datasum2(params, callback) {

        // create dtos  
        var executeList = [

            {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_userdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "userdto",
                "linktype": "onetoone",
                "secondarywid": "systemdto"
            }, {
                // create relationships testdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_testdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "testdto",
                "linktype": "onetoone",
                "secondarywid": "systemdto"

            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_systemdto_groupdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetoone",
                "secondarywid": "groupdto"
            }, {
                // create relationships categorydto
                "executethis": "addwidmaster",
                "wid": "rel_systemdto_categorydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetoone",
                "secondarywid": "categorydto"
            }, {
                // create relationships securitydto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_securitydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetoone",
                "secondarywid": "securitydto"
            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_permissiondto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetoone",
                "secondarywid": "permissiondto"

            }, {
                // create relationships statusdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_balancedto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetoone",
                "secondarywid": "balancedto"
            }
        ];

        execute(executeList, function (err, res) {
            proxyprinttodiv('Function datasum2 relationships -- added all this -- ', res, 99);
            callback(err, res);
        });
    }


    exports.createuser = createuser = function createuser(userwid, ac, loginlevel, cb2) {
        execute([{
                // add user 
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "metadata.owner": "system",
                "wid": userwid,
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
                "status": "integer"
            }],
            function (err, res) {
                proxyprinttodiv('Function createuser done --  >>>>>> added user >>>>>  for  -- ' + userwid, res, 99);
                addsecurity(userwid, true, ac, loginlevel, function (err, res1) {
                    proxyprinttodiv('Function addsecurity done --  >>>>>> added security >>>>>  for  -- ' + userwid, res1, 99);
                    addcategory(userwid, true, "categoryname", function (err, res2) {
                        proxyprinttodiv('Function addcategory --  >>>>>> added category >>>>> for   -- ' + userwid, res2, 99);

                        execute({
                            "executethis": "getwidmaster",
                            "wid": userwid
                        }, function (err, res3) {
                            proxyprinttodiv('Function createuser --  >>>>>> FINAL USER >>>>>    -- ' + userwid, res3, 99);
                            cb2(err, res3);
                        })
                    });
                });
            });
    }




    // createuser("codyuser", "codyac", 99);
    // addgrouptowid("anything", "createcoupon");
    // addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
    // testsecurity("codyac", "executethis", "createcoupon", "data", true);

    exports.addgrouptowid = addgrouptowid = function addgrouptowid(wid, groupname, callback) {

        proxyprinttodiv('Function addgrouptowid done --starting ' + groupname + ' for wid ' + wid + " >>>> ", wid, 34);

        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "groupname": groupname
            }, {
                // add group as per given wid 
                //     "executethis": "addwidmaster",
                //     "metadata.method": "groupdto",
                //     "systemdto.groupnamedto.groupname": groupname
                // }, {
                // add group as per given wid 
                "executethis": "addwidmaster",
                "metadata.method": "userdto", // **** note we shoudl get this from type of wid being added
                "wid": wid,
                "systemdto.groupdto.groupname": groupname,
                //"systemdto.groupdto.grouptype": wid
            }],
            function (err, res) {
                proxyprinttodiv('Function addgrouptowid done --added group ' + groupname + ' for wid ' + wid + " >>>> ", wid, 34);

                console.debug('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));

                callback(err, res)
            });
    }
    // addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, cb1);
    exports.addpermission = addpermission = function addpermission(userwid, granteegroup, targetgroup, actiongroup, dbgroup, levelgroup, callback) {
        execute([{
                // add permissions as per given information 
                "executethis": "addwidmaster",
                "wid": userwid,
                // permissions data 
                "metadata.method": "userdto",
                "systemdto.permissiondto.granteegroup": granteegroup,
                "systemdto.permissiondto.actiongroup": actiongroup,
                "systemdto.permissiondto.targetgroup": targetgroup,
                "systemdto.permissiondto.dbgroup": dbgroup,
                "systemdto.permissiondto.levelgroup": levelgroup
            }],
            function (err, res) {
                proxyprinttodiv('Function createuser done --  >>>>>> added permission >>>>>  for  -- ' + userwid, res, 99);
                // console.debug('added permission data ' + granteegroup + ' for user ' + userwid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }

    exports.addcategory = addcategory = function addcategory(wid, categorytype, categoryname, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": "userdto",
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


    exports.addsecurity = addsecurity = function addsecurity(wid, logged_id, accesstoken, loginlevel, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                // security data
                "metadata.method": "userdto",
                "systemdto.securitydto.logged_id": logged_id,
                "systemdto.securitydto.accesstoken": accesstoken,
                "systemdto.securitydto.level": loginlevel,
            }],
            function (err, res) {
                // proxyprinttodiv('Function createuser done --  >>>>>> added security  >>>>>  for  -- ' + wid, res, 99);
                // console.debug('added security for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }

})(typeof window == "undefined" ? global : window);