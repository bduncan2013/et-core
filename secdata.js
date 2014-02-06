(function (window) {

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
                "metadata.systemdto.type": "onetomany"
            }, {
                //create testdto
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "metadata.systemdto.type": "onetomany"
            }, {
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "accounttype",
                "expiration": "datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "metadata.securitydto.type": "onetomany",
                "metadata.balancedto.type": "onetomany",
                "metadata.categorydto.type": "onetomany",
                "metadata.groupdto.type": "onetomany",
                "metadata.permissiondto.type": "onetomany"
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
            }
        ];


        execute(executeList, function (err, res) {
            proxyprinttodiv('Function datasum relationships -- added all this -- ', res, 99);
            execute({
                "executethis": "getwidmaster",
                "wid": "userdto"
            }, function (err, res1) {
                proxyprinttodiv('Function datasum  -- userdto -- ', res1, 99);
                callback(err, res);
            });
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
                "linktype": "onetomany",
                "secondarywid": "systemdto"
            }, {
                // create relationships testdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_testdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "testdto",
                "linktype": "onetomany",
                "secondarywid": "systemdto"

            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_systemdto_groupdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetomany",
                "secondarywid": "groupdto"
            }, {
                // create relationships categorydto
                "executethis": "addwidmaster",
                "wid": "rel_systemdto_categorydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetomany",
                "secondarywid": "categorydto"
            }, {
                // create relationships securitydto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_securitydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetomany",
                "secondarywid": "securitydto"
            }, {
                // create relationships permissiondto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_permissiondto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetomany",
                "secondarywid": "permissiondto"

            }, {
                // create relationships statusdto
                "executethis": "addwidmaster",
                "wid": "relsystemdto_balancedto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "primarywid": "systemdto",
                "linktype": "onetomany",
                "secondarywid": "balancedto"
            }
        ];

        execute(executeList, function (err, res) {
            proxyprinttodiv('Function datasum2 relationships -- added all this -- ', res, 99);
            execute({
                "executethis": "getwidmaster",
                "wid": "rogeruser"
            }, function (err, res1) {
                proxyprinttodiv('Function datasum2  -- rogeruser -- ', res1, 99);
                callback(err, res);
            });
        });
    }




    exports.sectest1 = sectest1 = function sectest1(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test


        // clearLocalStorage();


        async.series([
                // function (cb1) {
                //     datasum({},function (err, res) {
                //         cb1(null);
                //     });
                // },
                function (cb1) {
                    createuser("rogeruser", "rogerac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("codyuser", "codyac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser", "driemployeegroup", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser", "driemployeegroup", "executethis", "createcoupon", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("anything", "createcoupon", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                proxyprinttodiv('Function sectest1 --  >>>>>> response from user added sectest1 >>>>>   -- ', res, 99);
                console.log('created testdata for sectest1 --  ' + JSON.stringify(res));
                callback(err, res);
            });

    }




    exports.createuser = createuser = function createuser(userwid, ac, loginlevel, cb1) {
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
                addsecurity(userwid, "true", ac, loginlevel, function (err, res) {
                    proxyprinttodiv('Function addsecurity done --  >>>>>> added security >>>>>  for  -- ' + userwid, res, 99);
                    addcategory(userwid, "categorytype", "categoryname", function (err, res) {
                        proxyprinttodiv('Function createuser --  >>>>>> response from user added createuser >>>>> res   -- ', res, 99);

                        execute({
                            "executethis": "getwidmaster",
                            "wid": userwid
                        }, function (err, res) {
                            proxyprinttodiv('Function createuser --  >>>>>> FINAL USER >>>>>    -- ' + userwid, res, 99);
                            cb1(err, res);
                        })
                    });
                });
            });
    }




    // createuser("codyuser", "codyac", 99);
    // addgrouptowid("anything", "createcoupon");
    // addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
    // testsecurity("codyac", "executethis", "createcoupon", "data", true);

    exports.addgrouptowid = addgrouptowid = function addgrouptowid(groupname, wid, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": "userdto",
                // group data 
                "systemdto.groupdto.groupname": groupname,
                "systemdto.groupdto.grouptype": wid
            }],
            function (err, res) {
                // console.log('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }

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
                // console.log('added permission data ' + granteegroup + ' for user ' + userwid + " >>>> " + JSON.stringify(res));
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
                // console.log('added categoryname ' + categoryname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));
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
                proxyprinttodiv('Function createuser done --  >>>>>> added security  >>>>>  for  -- ' + wid, res, 99);
                // console.log('added security for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }



    exports.testsecurity = testsecurity = function testsecurity(ac, targetgroup, actiongroup, dbgroup, assertion, callback) {
        securitycheck(ac, targetgroup, actiongroup, dbgroup, function (err, res) {
            proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response -- ', res, 99);
            callback(err, res)
        });
    }

    exports.testwip = testwip = function (params, callback) {
        var q2 = {
            "executethis": "querywid",
            "mongorawquery": {
                "wid": "rogeruser"
            }

        };
        execute(q2, function (err, res) {
            proxyprinttodiv('Function testwip done --  >>>>>>  >>>>>  for  res-- ', res, 99);

        });
    }

    exports.testwip2 = testwip2 = function (params, callback) {
        var q2 = {
            "executethis": "querywid",
            "mongorawquery": '{"$or": [{"data.securitydto.accesstoken": "rogerac"}]}',
            "mongorelationshipdirection":"backward",
            "mongorelationshipmethod":"all"
        };
        execute(q2, function (err, res) {
            proxyprinttodiv('Function testwip2 done --  >>>>>>  >>>>>  for  res-- ', res, 99);

        });
    }

    exports.testwip3 = testwip3 = function (params, callback) {

        var q2 = {
            "executethis": "querywid",
            "mongorawquery": '{"data.accesstoken": "rogerac"}'
        };
        execute(q2, function (err, res) {
            proxyprinttodiv('Function testwip3 done --  >>>>>>  >>>>>  for  res-- ', res, 99);

        });

    }

    exports.testwip1 = testwip1 = function testwip1(params, callback) {
        // testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
        // securitycheck("rogerac", "executethis", "createcoupon", "data", function (err, res) {
        //     callback(err, res)
        // });

        testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
            proxyprinttodiv('Function testwip1 done --  >>>>>>  >>>>>  for  res-- ', res, 99);
            callback(err, res);
        });
    }


    exports.tsys1 = tsys1 = function tsys1(params, callback) {
        //clearLocalStorage();
        datasum1(params, function (err, results) {
            datasum2(params, function (err, results) {
                sectest1(params, function (err, results) {
                    testwip(params, function (err, results) {
                        testwip2(params, function (err, results) {
                            callback(err, results);
                        });
                    });
                });
            });
        });
    }


    exports.tsys2 = tsys2 = function tsys2(params, callback) {
        //clearLocalStorage();
        datasum1(params, function (err, results) {
            datasum2(params, function (err, results) {

                callback(err, results);
            });
        });
    }



})(typeof window == "undefined" ? global : window);