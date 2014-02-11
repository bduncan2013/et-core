(function (window) {

    exports.datasum = datasum = function datasum(params, callback) {
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
                    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, cb1);
                },
                function (cb1) {
                    addgrouptowid("driemployeegroup", "codyuser", cb1);
                },
                function (cb1) {
                    addgrouptowid("driemployeegroup", "rogeruser", cb1);
                },
                function (cb1) {
                    addpermission("rogeruser", "driemployeegroup", "executethis", "createcoupon", "data", 50, cb1);
                },
                function (cb1) {
                    addgrouptowid("createcoupon", "rogeruser", cb1);
                },
                function (cb1) {
                    testsecurity("rogerac", "executethis", "createcoupon", "data", true, cb1);
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, cb1);
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, cb1);
                }
            ],
            function (err, res) {
                console.debug('created testdata for sectest1 --  ' + JSON.stringify(res));
                proxyprinttodiv('Function sectest1 --  >>>>>> response from user added sectest1 >>>>>   -- ', res, 99);

                var queryList = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.accesstoken": "rogerac"
                    },
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];
                execute(queryList, function (err, res) {
                    proxyprinttodiv(' Function sectest1  >>>  NOT simple mongorawquery with relationship to get 3rd level object >>> mongorawquery >>> ', JSON.stringify(res), 99);
                    console.debug(' Function sectest1  >>>  NOT simple mongorawquery  with relationship to get 3rd level object >>> mongorawquery >>> ' + JSON.stringify(res));

                    callback(err, res);
                });
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
                // console.debug('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));
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



    exports.testsecurity = testsecurity = function testsecurity(ac, targetgroup, actiongroup, dbgroup, assertion, callback) {
        securitycheck(ac, targetgroup, actiongroup, dbgroup, function (err, res) {
            proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response -- ', res, 99);
            callback(err, res)
        });
    }


    exports.testwip2 = testwip2 = function (params, callback) {
        var q2 = {
            "executethis": "querywid",
            // "mongowid":"rogeruser",
            // "data":{"primarywid":"systemdto"},
            "mongorawquery": {
                "data.accesstoken": "rogerac"
            },
            "mongowidmethod": 'userdto',
            "mongorelationshipdirection": "backward",
            "mongorelationshipmethod": "all",
            "mongorelationshiptype": "attributes"
        };
        execute(q2, function (err, res) {
            proxyprinttodiv('Function testwip2 done --  >>>>>>  >>>>>  for  res-- ', res, 99);
            callback(err, res);
        });
    }

    exports.testwip21 = testwip21 = function (params, callback) {
        var q2 = {
            "executethis": "querywid",
            // "mongowid":"rogeruser",
            // "data":{"primarywid":"systemdto"},
            "mongorawquery": {
                "data.securitydto.accesstoken": "rogerac"
            },
            "mongorelationshipdirection": "backward",
            // "mongorelationshipmethod": "all",
            "mongorelationshiptype": "attributes"
        };
        execute(q2, function (err, res) {
            proxyprinttodiv('Function testwip21 done --  >>>>>>  >>>>>  for  res-- ', res, 99);
            callback(err, res);
        });
    }

    exports.testwip211 = testwip211 = function (params, callback) {
        var q2 = {
            "executethis": "querywid",
            // "mongowid":"rogeruser",
            // "data":{"primarywid":"systemdto"},
            "mongorawquery": {
                "data.securitydto.accesstoken": "rogerac"
            },
            "mongorelationshipdirection": "backward",
            "mongorelationshipmethod": "all",
            "mongorelationshiptype": "attributes"
        };
        execute(q2, function (err, res) {
            proxyprinttodiv('Function testwip21 done --  >>>>>>  >>>>>  for  res-- ', res, 99);
            callback(err, res);
        });
    }

    exports.tsys1 = tsys1 = function tsys1(params, callback) {
        //clearLocalStorage();
        // debuglevel = 28;
        datasum(params, function (err, results) {
            sectest1(params, function (err, results) {

                callback(err, results);

            });
        });
    }

    exports.sec1 = sec1 = function sec1(params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        securitycheck("rogerac", "executethis", "createcoupon", "data", function (err, res) {
            proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response for -- ', res, 34);
            // securitycheck("codyac", "executethis", "createcoupon", "data", function (err, res) {
            // proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response for roger -- ', res, 99);
            callback(err, res);
            // });
        });
    }


    exports.mttest5 = mttest5 = function mttest5(params, callback) {
        // debuglevel = 21;
        console.debug("<< mttest5 >>");
        proxyprinttodiv('Function mttest5 starting --  >>>>>>  >>>>>  for  params-- ', params, 99);
        async.series([
            function (cb1) {
                var addList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "parentdto",
                    "wid": "parentdto",
                    "hue": "string",
                    "sat": "string",
                    "metadata.childdto.type": "onetoone"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "childdto",
                    "wid": "childdto",
                    "childhue": "string",
                    "childsat": "string"
                }, {
                    // create relationships relationshipdto
                    "executethis": "addwidmaster",
                    "wid": "relparentdto_childdto",
                    "metadata.method": "relationshipdto",
                    "relationshiptype": "attributes",
                    "primarywid": "parentdto",
                    "linktype": "onetoone",
                    "secondarywid": "childdto"
                }, {
                    // add data now -- parent
                    "executethis": "addwidmaster",
                    "metadata.method": "parentdto",
                    "wid": "parent1",
                    "hue": "hue1",
                    "sat": "sat1",
                }, {
                    // add data now -- child
                    "executethis": "addwidmaster",
                    "metadata.method": "parentdto",
                    "wid": "parent1",
                    "childdto.childhue": "childhue1",
                    "childdto.childsat": "childsat1"
                }];
                execute(addList, function (err, res) {
                    proxyprinttodiv('Function mttest5 final response after addList >>> ', JSON.stringify(res), 99);
                    console.debug(' >>> final response after addList >>> ' + JSON.stringify(res));
                    cb1(null, res);
                });
            },
            // function (cb1) {
            //     var queryList = [{
            //         // query parent1
            //         "executethis": "querywid",
            //         "mongorawquery": '{"$or": [{ "wid": "parent1" }]}'
            //     }];
            //     execute(queryList, function (err, res) {
            //         proxyprinttodiv(' Function mttest5  >>>  simple mongorawquery to get 1st level object >>> mongorawquery >>> ', JSON.stringify(res), 99);
            //         console.debug(' Function mttest5  >>>  simple mongorawquery to get 1st level object >>> mongorawquery >>> ' + JSON.stringify(res));
            //         cb1(null, res);
            //     });
            // },
            function (cb1) {
                // debuglevel = 28;
                var queryList = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.childhue": "childhue1"
                    },
                    // "mongorelationshipdirection": "backward",
                    // "mongorelationshipmethod": "all",
                    // "mongorelationshiptype": "attributes"
                }];
                execute(queryList, function (err, res) {
                    proxyprinttodiv(' Function mttest5  >>>  NOT simple mongorawquery WIP to get 3rd level object >>> mongorawquery >>> ', JSON.stringify(res), 99);
                    console.debug(' Function mttest5  >>>  NOT simple mongorawquery  WIP to get 3rd level object >>> mongorawquery >>> ' + JSON.stringify(res));
                    cb1(null, res);
                });
            },
            function (cb1) {
                var queryList = [{
                    "executethis": "querywid",
                    "mongowid": "1",
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];
                execute(queryList, function (err, res) {
                    proxyprinttodiv(' Function mttest5  >>>  NOT simple mongowid query to get 3rd level object >>> mongowid >>> ', JSON.stringify(res), 99);
                    console.debug(' Function mttest5  >>>  NOT simple mongowid query to get 3rd level object >>> mongowid >>> ' + JSON.stringify(res));
                    cb1(null, res);
                });
            },
            function (cb1) {
                var queryList = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.childhue": "childhue1"
                    },
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];
                execute(queryList, function (err, res) {
                    proxyprinttodiv(' Function mttest5  >>>  NOT simple mongorawquery with relationship to get 3rd level object >>> mongorawquery >>> ', JSON.stringify(res), 99);
                    console.debug(' Function mttest5  >>>  NOT simple mongorawquery  with relationship to get 3rd level object >>> mongorawquery >>> ' + JSON.stringify(res));
                    cb1(null, res);
                });
            }
        ], function (err, res) {
            proxyprinttodiv('Function mttest5  >>>  >>> final response after mttest5  >>> res >>> ', JSON.stringify(res), 99);
            console.debug(' >>> final response after mttest5  >>> res >>> ' + JSON.stringify(res));
            callback(err, res);
        });
    }



    exports.prob1 = prob1 = function prob1(params, callback) {
        // debuglevel = 21;
        console.debug("<< prob1 >>");
        proxyprinttodiv('Function prob1 starting --  >>>>>>  >>>>>  for  params-- ', params, 99);
        async.series([
            function (cb1) {
                var addList = [{
                    "executethis": "addwidmaster",
                    "metadata.method": "parentdto",
                    "wid": "parentdto",
                    "hue": "string",
                    "sat": "string",
                    "metadata.childdto.type": "onetoone"
                }, {
                    "executethis": "addwidmaster",
                    "metadata.method": "childdto",
                    "wid": "childdto",
                    "childhue": "string",
                    "childsat": "string"
                }, {
                    // create relationships relationshipdto
                    "executethis": "addwidmaster",
                    "wid": "relparentdto_childdto",
                    "metadata.method": "relationshipdto",
                    "relationshiptype": "attributes",
                    "primarywid": "parentdto",
                    "linktype": "onetoone",
                    "secondarywid": "childdto"
                }, {
                    // add data now -- parent
                    "executethis": "addwidmaster",
                    "metadata.method": "parentdto",
                    "wid": "parent1",
                    "hue": "hue1",
                    "sat": "sat1",
                }, {
                    // add data now -- child
                    "executethis": "addwidmaster",
                    "metadata.method": "parentdto",
                    "wid": "parent1",
                    "childdto.childhue": "childhue1",
                    "childdto.childsat": "childsat1"
                }];
                execute(addList, function (err, res) {
                    proxyprinttodiv('Function prob1 final response after addList >>> ', JSON.stringify(res), 99);
                    console.debug(' >>> final response after addList >>> ' + JSON.stringify(res));
                    cb1(null);
                });
            },
            function (cb1) {
                // debuglevel = 28;
                var queryList = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.childhue": "childhue1"
                    },
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];
                execute(queryList, function (err, res) {
                    proxyprinttodiv(' Function prob1  >>>  NOT simple mongorawquery with relationship to get 3rd level object >>> mongorawquery >>> ', JSON.stringify(res), 99);
                    console.debug(' Function prob1  >>>  NOT simple mongorawquery  with relationship to get 3rd level object >>> mongorawquery >>> ' + JSON.stringify(res));
                    cb1(null);
                });
            }
        ], function (err, res) {
            proxyprinttodiv('Function prob1  >>>  >>> final response after prob1  >>> res >>> ', JSON.stringify(res), 99);
            console.debug(' >>> final response after prob1  >>> res >>> ' + JSON.stringify(res));
            callback(err, res);
        });
    }



    // createuser(userwid, ac, securitylevel )
    // createwid(wid, owneruserwid, securitylevel)
    // addgrouptowid(wid, groupwid)
    // addpermission(userwid, usergroup, actiongroup, targertgroup, databasegroup, level)
    // testsecurity(ac, action, target, database, expectation)

    exports.test1000 = test1000 = function test1000(parm, callback) {

        // create users
        // creates wids
        // we put users and put wids into groups
        // we create actiongroups, targetroups, 
        // we put groups insdie of groups
        // we add permissions
        // we test
        async.series([
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
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
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
                    testsecurity("codyac", "executethis", "createcoupon", "data", true, function (err, res) {
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
                }
            ],
            function (err, res) {
                console.log('created testdata for test1000 --  ' + JSON.stringify(res));
                callback(err, res);
            });

    }

    // createuser("codyuser", "codyac", 99);
    // addgrouptowid("anything", "createcoupon");
    // addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50);
    // testsecurity("codyac", "executethis", "createcoupon", "data", true);

    // roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 99 so this should work.
    exports.test1001 = test1001 = function test1001(params, callback) {


        async.series([
                function (cb1) {
                    createuser("codyuser", "codyac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser", "rogerac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, function (err, res) {
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
                console.log('created testdata for test1001 --  ' + JSON.stringify(res));
                callback(err, res);
            });
    }

    // roger gives cody permission to create a coupon, minimum security level = 50. cody has a security level of 0 so this should fail.
    exports.test1002 = test1002 = function test1002(params, callback) {


        async.series([
                function (cb1) {
                    createuser("codyuser", "codyac", 0, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser", "rogerac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser", "codyuser", "executethis", "createcoupon", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createcoupon", "data", false, function (err, res) {
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1002 --  ' + JSON.stringify(res));
                callback(err, res);
            });
    }

    // cody is made a member of the dri employees group. roger gives dri employees permission to create data wids. cody should be able to create a datawid.
    exports.test1003 = test1003 = function test1003(params, callback) {

        async.series([
                function (cb1) {
                    createuser("codyuser", "codyac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createuser("rogeruser", "rogerac", 99, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addgrouptowid("codyuser", "driemployeesgroup", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    addpermission("rogeruser", "driemployeesgroup", "executethis", "createdatawid", "data", 50, function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    testsecurity("codyac", "executethis", "createdatawid", "data", true, function (err, res) {
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                console.log('created testdata for test1003 --  ' + JSON.stringify(res));
                callback(err, res);
            });

    }

    // drimanagers is made a member of driemployees group. Cody gives dri managers permission to edit coupons. Bill should be able to edit Cody's coupons.
    exports.test1004 = test1004 = function test1004(params, callback) {
        createuser("codyuser", "codyac", 99, function (err, res) {
            createuser("rogeruser", "rogerac", 99, function (err, res) {
                createuser("billuser", "billac", 99, function (err, res) {
                    addgrouptowid("codyuser", "driemployeesgroup", 99, function (err, res) {
                        addgrouptowid("billuser", "drimanagersgroup", 99, function (err, res) {
                            addgrouptowid("rogeruser", "drimanagersgroup", 99, function (err, res) {
                                addgrouptowid("drimanagersgroup", "driemployeesgroup", 99, function (err, res) {
                                    addpermission("codyuser", "drimanagersgroup", "executethis", "editcoupon", "data", 50, function (err, res) {
                                        testsecurity("billac", "executethis", "createdatawid", "data", true, function (err, res) {
                                            callback(err, res);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    // cody is made a member of the dri employees group. roger gives dri employees permission to create data wids. cody should not be able to create a datawid as his security level is too low.
    exports.test1005 = test1005 = function test1005(params, callback) {

        createuser("codyuser", "codyac ", 0, function (err, res) {
            createuser("rogeruser", "rogerac ", function (err, res) {
                addgrouptowid("codyuser", "driemployeesgroup ", function (err, res) {
                    addpermission("rogeruser", "driemployeesgroup", "executethis", "createdatawid", "data", 50, function (err, res) {
                        testsecurity("codyac", "executethis", "createdatawid", "data", false, function (err, res) {
                            callback(err, res);
                        });
                    });
                });
            });
        });
    }

    // drimanagers is made a member of driemployees group. Cody gives dri managers permission to edit coupons. Bill should be able to edit Cody's coupons.
    exports.test1006 = test1006 = function test1006(params, callback) {

        createuser("codyuser", "codyac", 99, function (err, res) {
            createuser("rogeruser", "rogerac", 99, function (err, res) {
                createuser("billuser", "billac", 99, function (err, res) {
                    addgrouptowid("codyuser", "driemployeesgroup", function (err, res) {
                        addgrouptowid("billuser", "drimanagersgroup", function (err, res) {
                            addgrouptowid("rogeruser", "drimanagersgroup", function (err, res) {
                                addpermission("codyuser", "drimanagersgroup ", "executethis", "editcoupon", "data", 50, function (err, res) {
                                    testsecurity("billac", "executethis", "createdatawid", "data", true, function (err, res) {
                                        callback(err, res);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    // driemployees is made a member of usersofdri. roger gives driusers read permission on coupons. cody is made a member of driemployees. cody should be able to read coupons. 
    /*
 exports.test1007 = test1007 = function test1007(params, callback) {

     createuser("codyuser", "codyac", 99);
     createuser("rogeruser", "rogerac", 99);
     addgrouptowid("codyuser", "driemployees");
     addgrouptowid("driemployees", "driusers");

     addpermission("rogeruser", "driusers", "executethis", "readcoupon", "data", 50);
     testsecurity("codyac", "executethis", "createdatawid", "data", true);

 }*/

    // 
    /*
 exports.test1008 = test1008 = function test1008(params, callback) {

     createuser("codyuser", "codyac", 99);
     createuser("rogeruser", "rogerac", 99);
     addgrouptowid("codyuser", "driemployees");
     addgrouptowid("driemployees", "driusers");

     addpermission("rogeruser", "driusers", "executethis", "readcoupon", "data", 50);
     testsecurity("codyac", "executethis", "createdatawid", "data", true);

 }*/



})(typeof window == "undefined" ? global : window);