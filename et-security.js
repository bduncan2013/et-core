(function (window) {

    // authcall looks at incoming paramters and creates call to security check
    exports.authcall = authcall = function authcall(inboundparams, callback) {
        // proxyprinttodiv('authcall inboundparams ', inboundparams, 39);
        var environment;
        var status = false;
        // //console.debug">>>>> env >>> "+ JSON.stringify(inboundparams['etenvironment']));
        if (!(inboundparams['command'] && inboundparams['command']['environment'])) {
            environment = {};
            environment['ac'] = '111111111';
            environment['account'] = ''; //set account to account of ac if no account
            environment['db'] = 'data';
            environment['action'] = 'getwid';
            environment['actiontype'] = 'execute';
            environment['level'] = 99;

        } else {
            environment = extend(true, environment, inboundparams['command']['environment']);
        }

        if (inboundparams['command'] && inboundparams['command']['environment'])
            delete inboundparams['command']['environment'];

        var accesstoken = environment['ac'];
        var myaccount = environment['account']; //set account to account of ac if no account
        var db = environment['db'];
        var action = environment['action'];
        var actiontype = environment['actiontype'];
        var level = environment['level'];

        if (accesstoken && accesstoken !== '111111111') {
            // actual security check
            // securitycheck(ac, mygroup(opt), accountgroup, actiongroup, actiontypegroup, dbgroup, level, callback)
            securitycheck(accesstoken, myaccount, action, actiontype, db, level, callback);
        } else {
            // fake security check
            callback(null, true);
        }
    }

    // Function securitytest accesstoken-- 
    // "user2ac"
    // Function securitytest account-- 
    // "createcoupon0"
    // Function securitytest action-- 
    // "executethis"
    // Function securitytest db-- 
    // "data"

    // securitycheck(ac, mygroup(opt), accountgroup, actiongroup, actiontypegroup, dbgroup, level)

    // enter different account groups (type = account) (everyone, managers, …)
    // enter different actions groups (type = execute, add, edit, delete)
    // enter different db groups (type=db) (data, test)

    // enter tree for accounts
    // enter tree for actions
    // enter tree for data

    // securitycheck(ac, mygroup(opt), accountgroup, actiongroup, actiontypegroup, dbgroup, _loginlevel, callback)
    // (AC or my account, action, action type, db)
    exports.securitycheck = securitycheck = function securitycheck(_accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, callback) {
        proxyprinttodiv('Function securitytest accesstoken-- ', _accesstoken, 39);
        proxyprinttodiv('Function securitytest mygroup-- ', _mygroup, 39);
        proxyprinttodiv('Function securitytest actiongroup-- ', _actiongroup, 39);
        proxyprinttodiv('Function securitytest actiontypegroup-- ', _actiontypegroup, 39);
        proxyprinttodiv('Function securitytest dbgroup-- ', _dbgroup, 39);
        proxyprinttodiv('Function securitytest _loginlevel-- ', _loginlevel, 39);

        var requestpermissionlist = [];
        var calculatedaccountpermissionlist = [];
        var securityCheckOutput = false;
        var userGroup = "";
        var userDto = {};


        async.series([

                function (cb1) {
                    // security(AC or my account, action, action type, db)
                    //  if no myAccount then get AC, get my loginlevel
                    // if mygroup not sent in then convert AC to my userwid (mygroup)
                    if (!_mygroup) {
                        getuserbyac(_accesstoken, function (err, userDto) {
                            userDto = userDto;
                            if (!userDto || (userDto && !userDto.wid)) {

                                userGroup = userDto.wid;
                                cb1(null);
                            } else {
                                cb1(null);
                            }
                        });
                    } else {
                        userGroup = _mygroup;
                        cb1(null);
                    }
                },
                function (cb1) {
                    //  X = getlist (my account, action, action type, db, loginlevel, {empty}) // getrequestlist
                    getrequestlist(userGroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, function (err, res) {
                        requestpermissionlist = res;
                        for (var permissiondto in requestpermissionlist) {
                            // if (permissiondto.granteegroup === )
                            // TODO :: check for the assigner's permissions
                        }
                        cb1(null);
                    });
                },

                function (cb1) {
                    //  Y =  security(account, action, action type, db, mylevel, X)
                    //  return Y
                    // put in the account sent in into the request list 
                    //     get permission matches based on action/type (we can go get defaults)
                    //     get permission matches based on accountgroup
                    //     get permission matches based on data
                    //     note for now these can actually be data queries
                    // go see if matches
                    // recurse(permissionlsit)
                    // check security ... see if match in table...confirm my level > level in table
                    // cb1(null);
                    getpermissionlist(userGroup, function (err, res) {
                        var permissionsForThisAccount = res;

                        for (var i = 0; i < permissionsForThisAccount.length; i++) {
                            proxyprinttodiv('Function securitytest permissionsForThisAccount[i]-- ', permissionsForThisAccount[i], 39);

                            if (permissionsForThisAccount[i]) {
                                // TODO :: fix below permissionsForThisAccount[i] has {"13":{ required attributes as JSON}}
                                recursepermissionlist(permissionsForThisAccount[i]['actiongroup'], permissionsForThisAccount[i]['actiontypegroup'], permissionsForThisAccount[i]['dbgroup'], permissionsForThisAccount[i]['levelgroup'], function (err, res) {
                                    calculatedaccountpermissionlist.push(res);
                                    proxyprinttodiv('Function security account each ', res, 39);
                                });
                            }
                        }
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                // test security based on two permission lists
                checkpermission(requestpermissionlist, calculatedaccountpermissionlist, function (err, res) {
                    // final callback
                    callback(err, securityCheckOutput);
                });
            });

    };

    exports.getrequestlist = getrequestlist = function getrequestlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        // getlist(sentinaccount, sentinaction, sentintype, sentindb, sentinlevel, sendinlist)
        //  A=getactionlist based on action/type (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        //  B=getaccountlist based on sentinaccount (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        //  C=getdglist based on sentindb (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        var actionlist, accountlist, dblist = [];
        async.series([
            function (cb2) {
                getactionlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    actionlist = res;
                    cb2(null);
                });
            },
            function (cb2) {
                getaccountlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    accountlist = res;
                    cb2(null);
                });
            },
            function (cb2) {
                getdblist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    dblist = res;
                    cb2(null);
                });
            }
        ], function (err, res) {
            //  filter what is not in sentinlist
            // return A+B+C
            callback(err, accountlist.concat(dblist, accountlist));
        });

    };


    exports.getactionlist = getactionlist = function getactionlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        //  A=getactionlist based on action/type (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)

        // getactionlist
        //  recurse on actions
        //  look for matches
        //  Level must > level
        var matchingGroups = [];
        // getgroupsrecursive(actiongroup, actiontypegroup)
        getgroupsrecursive(sentingroup, sentinactiontypegroup, function (err, res) {
            for (var action in res[1].groups) {
                recursepermissionlist(sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinlogin, function (err, res) {
                    for (var permissiondto in res) {
                        if ((permissiondto.actiongroup === actiongroup) && (sentinloginlevel >= permissiondto.levelgroup)) {
                            matchingGroups.push(permissiondto);
                        }
                    }
                    callback(err, matchingGroups);
                });
            }
        });
    };

    exports.getaccountlist = getaccountlist = function getaccountlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, getgroupsrecursive) {
        //  B=getaccountlist based on action/type (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        var matchingGroups = [];
        // getgroupsrecursive(actiongroup, actiontypegroup)
        getgroupsrecursive(accoutgroup, "action", function (err, res) {
            for (var account in res[1].groups) {
                recursepermissionlist(sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinlogin, function (err, res) {
                    for (var permissiondto in res) {
                        if ((permissiondto.granteegroup === account) && (sentinloginlevel >= permissiondto.levelgroup)) {
                            matchingGroups.push(permissiondto);
                        }
                    }
                    callback(err, matchingGroups);
                });
            }
        });
    };

    exports.getdblist = getdblist = function getdblist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        //  C=getdglist based on sentindb (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        var matchingGroups = [];
        getgroupsrecursive(dbgroup, "db", function (err, res) {
            for (var db in res[1].groups) {
                recursepermissionlist(sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinlogin, function (err, res) {
                    for (var permissiondto in res) {
                        if ((permissiondto.dbgroup === db) && (sentinloginlevel >= permissiondto.levelgroup)) {
                            matchingGroups.push(permissiondto);
                        }
                    }
                    callback(err, matchingGroups);
                });
            }
        });
    };


    // get all the groupdto wids for a given group wid
    // getgroupsrecursive(group, type) that returns the tree for the group sent in
    // we need a getgroupsrecursive(group, type, callback) that returns the tree for the group sent in
    exports.getgroupsrecursive = getgroupsrecursive = function getgroupsrecursive(group, type, callback) {
        // this makes no sense:
        if (group instanceof Array) {
            group = group[0].groupsForThisWid;
        }

        proxyprinttodiv('Function -- getGroupRecursive  group: ', group.wid, 39);

        var widGroupDtosWid = [];
        var groupsForThisWid = [];


        async.series([
                function part1(cb) {
                    proxyprinttodiv('Function -- look up for group : ', group.wid, 39);
                    execute([{
                        "executethis": "querywid",
                        "mongorawquery": {
                            "data.primarywid": group.wid
                        },
                        "mongowidmethod": "groupdto"
                    }], function (err, res) {
                        if (!res || res[0] || res[0].length === 0) {
                            groupsForThisWid = []
                        };

                        // TODO :: use type in getting groups
                        if (res[0]) {
                            widGroupDtosWid.push(group.wid); // push self to the group permitted
                            for (var i = 0; i < res[0][0].length; i++) {
                                proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  res[0][0][i]-- ', res[0][0][i], 39);
                                var key = Object.keys(res[0][0][i])[0];
                                groupsForThisWid.push(key);
                                widGroupDtosWid.push(res[0][0][i][key]['groupname']);
                                getgrouprecursive(key, type, function (err, res) {
                                    proxyprinttodiv("Function -- res: ", res, 39);
                                    // groupsForThisWid = groupsForThisWid.push(res);
                                    proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  groupsForThisWid-- ', groupsForThisWid, 39);
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
                proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  widGroupDtosWid- ', widGroupDtosWid, 39);


            });

        // return groupsForThisWid;
    }


    // recursepermissionlist(accountgroup, actiongroup, dbgroup, login) repeatedly calls getgrouprecursive

    exports.recursepermissionlist = recursepermissionlist = function recursepermissionlist(accountgroup, actiongroup, dbgroup, login, callback) {

        var permissionsArr = [];
        proxyprinttodiv('Function -- recursepermissionlist  login: ', login, 39);
        proxyprinttodiv('Function -- recursepermissionlist  accountgroup: ', accountgroup, 39);
        proxyprinttodiv('Function -- recursepermissionlist  actiongroup: ', actiongroup, 39);
        proxyprinttodiv('Function -- recursepermissionlist  dbgroup: ', dbgroup, 39);


        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                "data.granteegroup": accountgroup,
                "data.targetgroup": actiongroup,
                "data.dbgroup": dbgroup,
                "data.levelgroup": {
                    "$lte": login
                }
            }
        };

        proxyprinttodiv('Function -- recursepermissionlist  queryJson: ', queryJson, 39);

        // "data.granteegroup":"driemployeegroup","data.actiongroup":"createcoupon","data.targetgroup":"executethis","data.dbgroup":"data"
        execute(queryJson, function (err, res) {
            if (!res) {
                res = [];
            }
            permissionsArr = res;
            proxyprinttodiv('Function recursepermissionlist  --  >>>>>>  >>>>>  permissionsArr-- ', permissionsArr, 39);
            //console.debug' done permissions retrieving in sync manner.');
            callback(err, permissionsArr);
        });


    }

    // getpermissionlist(account) gets permissionlist can calls recursepermissionlist repeated
    exports.getpermissionlist = getpermissionlist = function getpermissionlist(account, callback) {

        var permissionsArr = [];
        proxyprinttodiv('Function -- getpermissionlist  account: ', account, 39);

        // this does not look right ... should getwidmaster account...then look at permissionlist in there

        var userWid = {};
        async.series([
            function part1(cb) {
                var queryJson = {
                    "executethis": "getwidmaster",
                    "wid": account
                };
                execute(queryJson, function (err, res) {
                    userWid = res;
                    proxyprinttodiv('Function getpermissionlist  --  >>>>>>  >>>>>  account -- ', res, 39);
                    cb(null);
                });
            },
            function part2(cb) {
                var queryJson = {
                    "executethis": "querywid",
                    "mongorawquery": {
                        "data.primarywid": "1" // TODO :: remove hardcoding find systemdto
                    },
                    "mongowidmethod": "permissiondto"
                };
                execute(queryJson, function (err, res) {
                    if (!res) {
                        res = [];
                    }
                    proxyprinttodiv('Function -- getpermissionlist  queryJson: ', queryJson, 39);
                    var arr = Object.keys(res[0]);

                    permissionsArr = res;
                    proxyprinttodiv('Function getpermissionlist  --  >>>>>>  >>>>>  permissionsArr-- ', permissionsArr, 39);
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
        proxyprinttodiv('Function -- checkpermission  requestpermissionlist ', requestpermissionlist, 39);

        proxyprinttodiv('Function -- checkpermission  calculatedaccountpermissionlist ', calculatedaccountpermissionlist, 39);

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
                    var jsonKey = Object.keys(res[0])[0];
                    var jsonVal = res[Object.keys(res[0])[0]];
                    systemWid = jsonVal;
                    cb(null);
                });
            },

            function part2(cb) {
                if (systemWid) {
                    proxyprinttodiv('Function systemWid  --  >>>>>>  >>>>>  systemWid-- ', systemWid, 39);

                    var query2 = [{
                        "executethis": "querywid",
                        "mongorawquery": {
                            "wid": Object.keys(systemWid)[0]
                        },
                        "mongorelationshipdirection": "backward",
                        "mongorelationshiptype": 'attributes'
                    }]

                    execute(query2, function (err, res) {
                        var jsonKey = Object.keys(res[0])[0];
                        var jsonVal = res[Object.keys(res[0])[0]];

                        userWid = jsonVal;
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
                        var jsonKey = Object.keys(res[0])[0];
                        var jsonVal = res[Object.keys(res[0])[0]];

                        userDto = jsonVal;
                        cb(null);
                    });
                } else {
                    userDto = undefined;
                    cb(null);
                }
            }
        ], function (err, res) {
            //console.debug' done securitycheck in sync manner.');
            // proxyprinttodiv('securitycheck userDto ', userDto, 39);
            proxyprinttodiv('Function getuserbyac --  >>>>>>  >>>>>  -- ', userDto, 39);
            callback(err, userDto);
        });

    }

})(typeof window == "undefined" ? global : window);