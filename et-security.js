// continue with security / permissions

// remember security needs to be asynch…prob by doing an todolist or inline function

(function (window) {



    exports.securitycheck = securitycheck = function securitycheck(accesstoken, account, action, db, callback) {

        proxyprinttodiv('Function securityCheck() in : ', 'before', 34);

        proxyprinttodiv('Function security accesstoken-- ', accesstoken, 34);
        proxyprinttodiv('Function security account-- ', account, 34);
        proxyprinttodiv('Function security action-- ', action, 34);
        proxyprinttodiv('Function security db-- ', db, 34);




        // check if systemdto has status as logged in for the given access code, if yes proceed, else respond with unauthorized error
        var securityCheckOutput = false;

        var results1;
        var results2;
        var userWid;
        var userDto;
        var ret = false;

        async.series([

            function part1(cb) {
                var query1 = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.accesstoken": accesstoken
                    },
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];

                execute(query1, function (err, res) {
                    results1 = res[0][0][0];
                    cb(null);
                });
            },

            function part2(cb) {
                if (validParams(results1) && validParams[0]) {
                    var query2 = [{
                        "executethis": "querywid",
                        "mongorawquery": {
                            // "wid": results1['wid']
                            "wid": Object.keys(results1)[0]
                        },
                        "mongorelationshiptype": 'attributes',
                        "mongorelationshipdirection": "backward"
                    }]

                    execute(query2, function (err, res) {
                        userWid = res[0][0][0];
                        userWid = Object.keys(userWid)[0];
                        cb(null);
                    });
                } else {
                    userWid = undefined;
                    cb(null);
                }
            },



            function part21(cb) {
                if (userWid) {
                    var query21 = [{
                        "executethis": "getwidmaster",
                        "wid": userWid
                        // "wid": "rogeruser"
                    }]

                    execute(query21, function (err, res) {
                        userDto = res[0][0][0];
                        cb(null);
                    });
                } else {
                    userDto = undefined;
                    cb(null);
                }
            },

            function part3(cb) {
                if (!userWid) {
                    securityCheckOutput = false;
                    cb(null);
                } else {


                    proxyprinttodiv('Function querywid() out with  userDto : ', JSON.stringify(userDto), 34);
                    // if (!true) {

                    proxyprinttodiv('Function security userDto[systemdto.securitydto.logged_id]-- ', userDto['systemdto.securitydto.logged_id'], 34);
                    if (!userDto['systemdto.securitydto.logged_id']) {
                        // if not logged in,
                        securityCheckOutput = false;
                    } else {
                        // if logged in check the permissions and group required for the 'action', compare with the group and
                        // permissions and group of the user

                        // 7) create getGroupRecursive(wid) call 
                        // 8) create getPermissionsList()
                        // 9) create checksecurity() fn
                        // 10) add command. to addwidmaster, getwidmaster, executethis, querywid to executethis. 
                        // Should accept command.accesstoken, command.account, command.action, command.db


                        // using getgroupRecurside
                        // get account groups
                        // get actions groups
                        // get db groups

                        // so AC to my account 
                        // my groups = getgroupsrecurisve (my account)

                        // find all permissions where my groups are given permission

                        // account groups =  getgroupsrecurisve (account)
                        // action groups =  getgroupsrecurisve (action)
                        // db groups =  getgroupsrecurisve (db)
                        // see if there is a permission record for that combination

                        // so AC to my account 
                        // my groups = getgroupsrecurisve (my accountwid)

                        var loginlevel = userDto['systemdto.securitydto.level'];
                        getGroupRecursive(userWid, loginlevel, function (err, res) {
                            var myAccountGroupdtoArr = res[1].groups;
                            console.log("getGroupRecursive 1 --- " + JSON.stringify(res));
                            proxyprinttodiv('Function security getGroupRecursive 1 --  >>>>>>  >>>>>  for  securitycheck response for res-- ', res, 34);

                            // get account groups
                            // proxyprinttodiv('Function security getGroupRecursive 2 --  >>>>>>  >>>>>  account-- ', account, 34);
                            // proxyprinttodiv('Function security getGroupRecursive 2 --  >>>>>>  >>>>>  db-- ', db, 34);
                            // proxyprinttodiv('Function security getGroupRecursive 2 --  >>>>>>  >>>>>  action-- ', action, 34);
                            getGroupRecursive(account, loginlevel, function (err, res) {
                                var accountGroupdtoArr = res[1].groups;
                                console.log("getGroupRecursive 2--- " + JSON.stringify(res));
                                proxyprinttodiv('Function security getGroupRecursive 2 --  >>>>>>  >>>>>  for  securitycheck response for res-- ', res, 34);

                                // get action groups
                                getGroupRecursive(action, loginlevel, function (err, res) {
                                    var actionGroupdtoArr = res[1].groups;
                                    console.log("getGroupRecursive 3--- " + JSON.stringify(res));
                                    proxyprinttodiv('Function security getGroupRecursive 3 --  >>>>>>  >>>>>  for  securitycheck response for res-- ', res, 34);


                                    // get db groups
                                    getGroupRecursive(db, loginlevel, function (err, res) {
                                        var dbGroupdtoArr = res[1].groups;
                                        console.log("getGroupRecursive 4--- " + JSON.stringify(res));
                                        proxyprinttodiv('Function security getGroupRecursive 4 --  >>>>>>  >>>>>  for  securitycheck response for res-- ', res, 34);

                                        // myAccountGroupdtoArr.push("driemployeegroup")
                                        // find all permissions where my groups are given permission
                                        getPermissionsList(myAccountGroupdtoArr, actionGroupdtoArr, accountGroupdtoArr, dbGroupdtoArr, loginlevel, function (err, res) {
                                            var myPermissionsdtoArr = res;
                                            console.log("getPermissionsList 1 --- " + JSON.stringify(res));
                                            proxyprinttodiv('Function security  --  >>>>>>  >>>>>  for  securitycheck response for res-- ', res, 34);
                                            proxyprinttodiv('Function security  --  >>>>>>  >>>>>  for  securitycheck response for ret-- ', ret, 34);

                                            // see if there is a permission record for that combination
                                            if (myPermissionsdtoArr.length > 0) {
                                                ret = true;
                                            }

                                            console.log("message --- " + ret);
                                            cb(null);
                                        });
                                    });

                                });

                            });

                        });
                    }
                }

            }
        ], function (err, res) {
            //console.debug' done securitycheck in sync manner.');
            console.log(">>>>>>> --- " + ret);
            proxyprinttodiv('Function securitycheck --  >>>>>>  >>>>>  for  securitycheck response for ret-- ', ret, 34);
            proxyprinttodiv('after securitycheck --  res', ret, 34);
            callback(err, ret);
        });
        // if (exports.environment === "local") {
        //     while (ret === undefined) {}
        //     return ret;
        // }
    }

    // get all the groupdto wids for a given wid

    function getGroupRecursive(wid, loginlevel, callback) {
        proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  loginlevel-- ', loginlevel, 34);
        if (wid instanceof Array) {
            wid = wid[0].groupsForThisWid;
        }

        proxyprinttodiv('Function -- getGroupRecursive  wid: ', wid, 34);

        var widGroupDtosWid = [];
        var groupsForThisWid = [];


        async.series([
                function part1(cb) {


                    proxyprinttodiv('Function -- look up for wid : ', wid, 34);
                    execute([{
                        "executethis": "querywid",
                        "mongorawquery": {
                            "data.primarywid": wid
                        },
                        "mongowidmethod": "groupdto"
                    }], function (err, res) {
                        if (!res || res[0] || res[0].length === 0) {
                            groupsForThisWid = []
                        };

                        if (res[0]) {
                            widGroupDtosWid.push(wid); // push self to the group permitted
                            for (var i = 0; i < res[0][0].length; i++) {
                                proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  res[0][0][i]-- ', res[0][0][i], 34);
                                var key = Object.keys(res[0][0][i])[0];
                                groupsForThisWid.push(key);
                                widGroupDtosWid.push(res[0][0][i][key]['groupname']);
                                getGroupRecursive(key, loginlevel, function (err, res) {
                                    proxyprinttodiv("Function -- res: ", res, 34);
                                    // groupsForThisWid = groupsForThisWid.push(res);
                                    proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  groupsForThisWid-- ', groupsForThisWid, 34);
                                });
                            }
                        }

                        cb(null);
                    });
                }
            ],

            function (err, resp) {
                //console.debug' done groups retrieving in sync manner.');
                var arr = [];
                arr.push({
                    'wids': groupsForThisWid
                });
                arr.push({
                    'groups': widGroupDtosWid
                });
                callback(null, arr);
                proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  widGroupDtosWid- ', widGroupDtosWid, 34);


            });

        // return groupsForThisWid;
    }


    // get the group wids array for grantee, account, action and db, and get the matching permissions array

    function getPermissionsList(myAccountGroupdtoArr, accountGroupdtoArr, actionGroupdtoArr, dbGroupdtoArr, loginlevel, callback) {

        var permissionsArr;
        proxyprinttodiv('Function -- getPermissionsList  loginlevel: ', loginlevel, 34);

        proxyprinttodiv('Function -- getPermissionsList  myAccountGroupdtoArr: ', myAccountGroupdtoArr, 34);

        proxyprinttodiv('Function -- getPermissionsList  accountGroupdtoArr: ', accountGroupdtoArr, 34);

        proxyprinttodiv('Function -- getPermissionsList  actionGroupdtoArr: ', actionGroupdtoArr, 34);

        proxyprinttodiv('Function -- getPermissionsList  dbGroupdtoArr: ', dbGroupdtoArr, 34);


        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                "data.granteegroup": {
                    "$in": myAccountGroupdtoArr
                },
                "data.targetgroup": {
                    "$in": actionGroupdtoArr
                },
                "data.dbgroup": {
                    "$in": dbGroupdtoArr
                },
                "data.actiongroup": {
                    "$in": accountGroupdtoArr
                },
                "data.levelgroup": {
                    "$lte": loginlevel
                }
            }
        };

        proxyprinttodiv('Function -- getPermissionsList  queryJson: ', queryJson, 34);


        // "data.granteegroup":"driemployeegroup","data.actiongroup":"createcoupon","data.targetgroup":"executethis","data.dbgroup":"data"

        async.series([
            function part1(cb) {
                execute(queryJson, function (err, res) {
                    if (!res) {
                        res = [];
                    }
                    permissionsArr = res;
                    proxyprinttodiv('Function getPermissionsList  --  >>>>>>  >>>>>  permissionsArr-- ', permissionsArr, 34);
                    cb(null);
                });
            }
        ], function (err, resp) {
            //console.debug' done permissions retrieving in sync manner.');
            callback(err, permissionsArr);
        });

    }



    // etenvironment
    // [1/9/14, 3:44:40 PM] Roger Colburn: specifically in getwid, updatwid (maybe querywid) we will need to get etenvionemnt,
    // remove it form parm stream
    // [1/9/14, 3:45:00 PM] Roger Colburn: take ac, account, etc, call security for pass/fail
    // [1/9/14, 3:45:01 PM] Roger Colburn: ok?
    // [1/9/14, 3:45:44 PM] saurabh sharma: On 1/9/14, at 3:44 PM, Roger Colburn wrote:
    // > get etenvionemnt, remove it form parm stream
    // > take ac, account, etc, call security for pass/fail

    //     [1/9/14, 3:50:46 PM] Roger Colburn: fishout etenvrionement, 
    // if no etenvrionement then etenvionrmet =
    // if no ac, then ac = 111111111
    // if not acct, then acct is acct of ac
    //  if no db, then 'data'
    //  if no type, 'getwid' 'updated'

    // ac to account call > if 111111111 then acct = 222222222

    // security if 222222222 then pass for now
    // [1/9/14, 3:51:29 PM] Roger Colburn: this way you can publish without breaking things

    // so just fishout the environment, make a security call, if it passes, proceed with whatever is done ?
    exports.authcall = authcall = function authcall(inboundparams, callback) {
        proxyprinttodiv('Function fishoutAuthParams() in : ', 'before');
        var environment;
        var status = false;
        // //console.debug">>>>> env >>> "+ JSON.stringify(inboundparams['etenvironment']));
        if (!(inboundparams['command'] && inboundparams['command']['environment'])) {
            environment = {};
            environment['ac'] = '111111111';
            environment['account'] = '222222222'; //set account to account of ac if no account
            environment['db'] = 'data';
            environment['action'] = 'getwid';
        } else {
            environment = extend(true, environment, inboundparams['command']['environment']);
        }

        if (inboundparams['command'] && inboundparams['command']['environment'])
            delete inboundparams['command']['environment'];

        var accesstoken = environment['ac'];
        var account = environment['account']; //set account to account of ac if no account
        var db = environment['db'];
        var action = environment['action'];

        if (accesstoken && accesstoken !== '111111111') {
            // actual security check
            securitycheck(accesstoken, account, action, db, callback);
        } else {
            // fake security check
            callback(null, true);
        }
    }

    exports.ttsa1 = ttsa1 = function (params, callback) {
        datasum1(params, function (err, res) {

            datasum2(params, function (err, res) {

                callback(err, res);
            });
        });
    };

    exports.ttsa2 = ttsa2 = function (params, callback) {
        sectest1(params, function (err, res) {


            getGroupRecursive("rogeruser", 99, function (err, res) {
                proxyprinttodiv('Function testGroups() in : res', res, 34);
                callback(err, res);


            });
        });
    };

    exports.ttsa3 = ttsa3 = function (params, callback) {



        getPermissionsList(["driemployeegroup0", "rogeruser0", "groupdto0", "19", "25"], ["createcoupon0"], ["executethis"], ["data"], 99, function (err, res) {
            proxyprinttodiv('Function ttsa3() in : res', res, 34);
            callback(err, res);

        });
    };


    exports.ttsa4 = ttsa4 = function (params, callback) {
        debuglevel = 34;
        debugname = "";
        debugcat = "";
        debugsubcat = "code";
        getGroupRecursive("rogeruser", 99, function (err, res) {
            proxyprinttodiv('Function ttsa4() in : res', res, 34);
            callback(err, res);

        });
    };


    exports.ttsa6 = ttsa6 = function (params, callback) {
        addgrouptowid("anything", "createcoupon", callback);
    };





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