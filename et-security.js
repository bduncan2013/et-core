(function (window) {

    // authcall looks at incoming paramters and creates call to security check
    //
    // getuserbyac() gets user id by ac
    // getgrouprecursive(wid) recurses finding group for wid
    // recursepermissionlist(accountgroup, actiongroup, dbgroup, login) repeatedly calls getgrouprecursive
    // getpermissionlist(account) gets permissionlist can calls recursepermissionlist repeated
    // checkpermisstion(calculatepermissionlist, calculatedaccountpermissionlist)
    //
    // security check accepts 
    //          accesstoken representing you 
    //          account(group) you want to pretend to be
    //          action(group) of what you want to do 
    //          db(group) of what database you want to do this in
    //
    // 1) Convert AC to user wid (if no user then fail)
    //    Calculate / create "complete permission request list"
    //          get my group, now get my related groups, 
    //          for action get all related actions, (eg executethis)
    //          for db get all realted dbs
    //          my current security level should be part of each row above
    // 2) For sent account get permission list, 
    //    Calculate "complete permission list"
    //          for grantee get all realted groups
    //          for action get all related actions, 
    //          target get all related targets, 
    //          db get all realted dbthis
    //          get level
    //  3) check for matching rows

    // so basically security check:
    // we get permission list for account (sent in)
    // we step though each item on that list
    // we call recursepermissionlist
    // permission list row: account (grantee), action, db, login
    // now we have a large list of all the permissions that account has given
    //
    // we take what was sent in 
    // we convert ac to accout (our account)
    // we call recursepermissionlist() with only the values sent in
    // permission list row: account (who am I, action, db, login
    //
    // now we have two lists permission list and request list
    // we check for exactly mathing rows

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

})(typeof window == "undefined" ? global : window);