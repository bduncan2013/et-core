(function (window) {

    // authcall looks at incoming paramters and creates call to security check
    //
    // security check accepts 
    //          accesstoken representing you 
    //          account(group) you want to pretend to be
    //          action(group) of what you want to do 
    //          db(group) of what database you want to do this in
    //
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
    // permission list row: account (who am I, action, db, login)
    //
    // now we have two lists permission list and request list
    // we check for exactly mathing rows

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
    //
    // getuserbyac() gets user id by ac
    // getgrouprecursive(wid) recurses finding group for wid
    // recursepermissionlist(accountgroup, actiongroup, dbgroup, login) repeatedly calls getgrouprecursive
    // getpermissionlist(account) gets permissionlist can calls recursepermissionlist repeated
    // checkpermisstion(requestpermissionlist, calculatedaccountpermissionlist)



    // authcall looks at incoming paramters and creates call to security check
    exports.authcall = authcall = function authcall(inboundparams, callback) {
        // proxyprinttodiv('authcall inboundparams ', inboundparams, 34);
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
        proxyprinttodiv('Function securitytest accesstoken-- ', accesstoken, 91);
        proxyprinttodiv('Function securitytest account-- ', account, 91);
        proxyprinttodiv('Function securitytest action-- ', action, 91);
        proxyprinttodiv('Function securitytest db-- ', db, 91);

        var requestpermissionlist = [];
        var calculatedaccountpermissionlist = [];
        var securityCheckOutput = false;


        getpermissionlist(account, function (err, res) {
            var permissionsForThisAccount = res;


            for (var i = 0; i < permissionsForThisAccount.length; i++) {
                recursepermissionlist(permissionsForThisAccount[i]['myaccountgroup'], permissionsForThisAccount[i]['action'], permissionsForThisAccount[i]['db'], permissionsForThisAccount[i]['login'], function (err, res) {
                    calculatedaccountpermissionlist.push(res);
                    proxyprinttodiv('Function security account each ', res, 91);
                });
            }
            proxyprinttodiv('Function security account permissionlist ', calculatedaccountpermissionlist, 91);

            getuserbyac(accesstoken, function (err, userDto) {
                if (!userDto || (userDto && !userDto.wid)) {
                    securityCheckOutput = false;
                } else {

                    proxyprinttodiv('Function securitytest) out with  userDto : ', userDto, 34);

                    proxyprinttodiv('Function securitytest userDto[systemdto.securitydto.logged_id]-- ', userDto['systemdto.securitydto.logged_id'], 91);
                    if (!userDto['systemdto.securitydto.logged_id']) {
                        // if not logged in,
                        securityCheckOutput = false;
                    } else {
                        var loginlevel = userDto['systemdto.securitydto.level'];
                        getGroupRecursive(userDto.wid, function (err, res) {
                            var myAccountGroupdtoArr = res[1].groups;
                            console.log("getGroupRecursive 1 --- " + JSON.stringify(res));
                            proxyprinttodiv('Function security recursive user wid ', res, 34);
                            // [2/26/14, 5:42:32 PM] Roger Colburn: so when we check the first time we are checking if I appear in the grantee list
                            // [2/26/14, 5:42:57 PM] Roger Colburn: then we must check if the grantor of the record appears in the grantee list
                            // [2/26/14, 5:43:00 PM] Roger Colburn: ok?

                            // get action groups
                            getGroupRecursive(action, function (err, res) {
                                var actionGroupdtoArr = res[1].groups;
                                console.log("getGroupRecursive 3--- " + JSON.stringify(res));
                                proxyprinttodiv('Function security recursive action', res, 91);

                                // get db groups
                                getGroupRecursive(db, function (err, res) {
                                    var dbGroupdtoArr = res[1].groups;
                                    console.log("getGroupRecursive 4--- " + JSON.stringify(res));
                                    proxyprinttodiv('Function security recursive db', res, 91);

                                    // find all permissions where my groups are given permission
                                    recursepermissionlist(myAccountGroupdtoArr, actionGroupdtoArr, dbGroupdtoArr, loginlevel, function (err, res) {
                                        var myPermissionsdtoArr = res;
                                        requestpermissionlist.push(myPermissionsdtoArr);
                                        proxyprinttodiv('Function security my requestpermissionlist ', requestpermissionlist, 91);

                                        // test security based on two permission lists
                                        securityCheckOutput = checkpermission(requestpermissionlist, calculatedaccountpermissionlist, callback);
                                    });
                                });
                                //});
                            });
                        });
                    }
                };
                callback(null, securityCheckOutput);
            });

        });

    };



    // get all the groupdto wids for a given wid
    // getgrouprecursive(wid) recurses finding group for wid

    exports.getGroupRecursive = getGroupRecursive = function getGroupRecursive(wid, callback) {

        // this makes no sense:
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
                                getGroupRecursive(key, function (err, res) {
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


    // recursepermissionlist(accountgroup, actiongroup, dbgroup, login) repeatedly calls getgrouprecursive

    exports.recursepermissionlist = recursepermissionlist = function recursepermissionlist(accountgroup, actiongroup, dbgroup, login, callback) {

        var permissionsArr = [];
        proxyprinttodiv('Function -- recursepermissionlist  login: ', login, 34);
        proxyprinttodiv('Function -- recursepermissionlist  accountgroup: ', accountgroup, 34);
        proxyprinttodiv('Function -- recursepermissionlist  actiongroup: ', actiongroup, 34);
        proxyprinttodiv('Function -- recursepermissionlist  dbgroup: ', dbgroup, 34);


        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                "data.granteegroup": {
                    "$eq": accountgroup
                },
                "data.targetgroup": {
                    "$eq": actiongroup
                },
                "data.dbgroup": {
                    "$eq": dbgroup
                },
                "data.levelgroup": {
                    "$lte": login
                }
            }
        };

        proxyprinttodiv('Function -- recursepermissionlist  queryJson: ', queryJson, 34);

        // "data.granteegroup":"driemployeegroup","data.actiongroup":"createcoupon","data.targetgroup":"executethis","data.dbgroup":"data"
        execute(queryJson, function (err, res) {
            if (!res) {
                res = [];
            }
            permissionsArr = res;
            proxyprinttodiv('Function recursepermissionlist  --  >>>>>>  >>>>>  permissionsArr-- ', permissionsArr, 34);
            //console.debug' done permissions retrieving in sync manner.');
            callback(err, permissionsArr);
        });


    }

    // getpermissionlist(account) gets permissionlist can calls recursepermissionlist repeated
    exports.getpermissionlist = getpermissionlist = function getpermissionlist(account, callback) {

        var permissionsArr = [];
        proxyprinttodiv('Function -- getpermissionlist  account: ', account, 34);

        // this does not look right ... should getwidmaster account...then look at permissionlist in there
        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                "data.granteegroup": {
                    "$eq": account
                }
            }
        };

        proxyprinttodiv('Function -- getpermissionlist  queryJson: ', queryJson, 34);

        async.series([
            function part1(cb) {
                execute(queryJson, function (err, res) {
                    if (!res) {
                        res = [];
                    }
                    permissionsArr = res;
                    proxyprinttodiv('Function getpermissionlist  --  >>>>>>  >>>>>  permissionsArr-- ', permissionsArr, 34);
                    cb(null);
                });
            }
        ], function (err, resp) {
            //console.debug' done permissions retrieving in sync manner.');
            callback(err, permissionsArr);
        });

    }

    // checkpermisstion(requestpermissionlist, calculatedaccountpermissionlist)

    function checkpermission(requestpermissionlist, calculatedaccountpermissionlist, callback) {
        var result = false;
        proxyprinttodiv('Function -- checkpermission  requestpermissionlist ', requestpermissionlist, 34);

        proxyprinttodiv('Function -- checkpermission  calculatedaccountpermissionlist ', calculatedaccountpermissionlist, 34);

        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                // TODO :: correct the conditions
                "data.granteegroup": {
                    "$in": requestpermissionlist
                },
                "data.granteegroup": {
                    "$in": calculatedaccountpermissionlist
                }
            }
        };

        execute(queryJson, function (err, res) {
            if (res) {
                result = true;
            }

            callback(err, result);
        });
    }


    // getuserbyac() gets user id by ac
    exports.getuserbyac = getuserbyac = function getuserbyac(userac, callback) {
        var userDto, results1, userWid, systemWid;

        async.series([

            function part1(cb) {
                var query1 = [{
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.accesstoken": userac
                    },
                    "mongorelationshipdirection": "backward",
                    "mongorelationshipmethod": "all",
                    "mongorelationshiptype": "attributes"
                }];

                execute(query1, function (err, res) {
                    systemWid = res[0][0][0];
                    cb(null);
                });
            },

            function part2(cb) {
                if (validParams(systemWid)) {
                    proxyprinttodiv('Function systemWid  --  >>>>>>  >>>>>  systemWid-- ', systemWid, 34);

                    var query2 = [{
                        "executethis": "querywid",
                        "mongorawquery": {
                            "wid": Object.keys(systemWid)[0]
                        },
                        "mongorelationshipdirection": "backward",
                        "mongorelationshiptype": 'attributes'
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

            function part3(cb) {
                if (userWid) {
                    var query21 = [{
                        "executethis": "getwidmaster",
                        "wid": userWid
                    }]

                    execute(query21, function (err, res) {
                        userDto = res[0][0][0];
                        cb(null);
                    });
                } else {
                    userDto = undefined;
                    cb(null);
                }
            }
        ], function (err, res) {
            //console.debug' done securitycheck in sync manner.');
            // proxyprinttodiv('securitycheck userDto ', userDto, 34);
            proxyprinttodiv('Function getuserbyac --  >>>>>>  >>>>>  -- ', res, 34);
            proxyprinttodiv('after getuserbyac --  res', res, 34);
            callback(err, userDto);
        });

    }

})(typeof window == "undefined" ? global : window);