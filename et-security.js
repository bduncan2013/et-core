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
        // proxyprinttodiv('Function securitytest accesstoken-- ', _accesstoken, 39);
        // proxyprinttodiv('Function securitytest mygroup-- ', _mygroup, 39);
        // proxyprinttodiv('Function securitytest actiongroup-- ', _actiongroup, 39);
        // proxyprinttodiv('Function securitytest actiontypegroup-- ', _actiontypegroup, 39);
        // proxyprinttodiv('Function securitytest dbgroup-- ', _dbgroup, 39);
        // proxyprinttodiv('Function securitytest _loginlevel-- ', _loginlevel, 39);

        var requestpermissionlist = [];
        var calculatedaccountpermissionlist = [];
        var securityCheckOutput = false;
        var userGroupWid = "";
        var userDto = {};


        async.series([

                function (cb1) {
                    // security(AC or my account, action, action type, db)
                    //  if no myAccount then get AC, get my loginlevel
                    // if mygroup not sent in then convert AC to my userwid (mygroup)
                    if (!_mygroup) {
                        getuserbyac(_accesstoken, function (err, userDto) {
                            userDto = userDto;
                            userGroupWid = userDto["systemdto.groupdto.groupname"];
                            cb1(null);
                        });
                    } else {
                        userGroupWid = _mygroup;
                        cb1(null);
                    }
                },
                function (cb1) {
                    //  X = getlist (my account, action, action type, db, loginlevel, {empty}) // getrequestlist
                    getrequestlist(userGroupWid, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, function (err, res) {
                        requestpermissionlist = res;
                        // for (var permissiondto in requestpermissionlist) {
                        //     // if (permissiondto.granteegroup === )
                        //     // TODO :: check for the assigner's permissions
                        // }
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
                    getpermissionlist(userGroupWid, function (err, res) {
                        var permissionsForThisAccount = res;

                        for (var i = 0; i < permissionsForThisAccount.length; i++) {
                            // proxyprinttodiv('Function securitytest permissionsForThisAccount[i]-- ', permissionsForThisAccount[i], 39);

                            if (permissionsForThisAccount[i]) {
                                // TODO :: fix below permissionsForThisAccount[i] has {"13":{ required attributes as JSON}}
                                var arr = Object.keys(permissionsForThisAccount[i]);
                                recursepermissionlist(permissionsForThisAccount[i][arr[0]]['actiongroup'], permissionsForThisAccount[i][arr[0]]['actiontypegroup'], permissionsForThisAccount[i][ arr[0]]['dbgroup'], permissionsForThisAccount[i][ arr[0]]['levelgroup'], function (err, res) {
                                    calculatedaccountpermissionlist.push(res);
                                    // proxyprinttodiv('Function security account each ', res, 39);
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
                    proxyprinttodiv('Function security requestpermissionlist ', requestpermissionlist, 39);
                    proxyprinttodiv('Function security calculatedaccountpermissionlist ', calculatedaccountpermissionlist, 39);
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
                    proxyprinttodiv('Function --- getrequestlist  ---  sentinactiongroup ', sentinactiongroup, 39);
                    proxyprinttodiv('Function getrequestlist actionlist ', actionlist, 39);
                    cb2(null);
                });
            },
            function (cb2) {
                getaccountlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    accountlist = res;
                    proxyprinttodiv('Function --- getrequestlist  ---  sentingroup ', sentingroup, 39);
                    proxyprinttodiv('Function getrequestlist actionlist ', actionlist, 39);
                    cb2(null);
                });
            },
            function (cb2) {
                getdblist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    dblist = res;
                    proxyprinttodiv('Function --- getrequestlist  ---  sentindbgroup ', sentindbgroup, 39);
                    proxyprinttodiv('Function getrequestlist actionlist ', actionlist, 39);
                    cb2(null);
                });
            }
        ], function (err, res) {
            //  filter what is not in sentinlist
            // return A+B+C
            callback(err, accountlist.concat(dblist, accountlist));
            proxyprinttodiv('Function getrequestlist accountlist.concat(dblist, accountlist) ', accountlist.concat(dblist, accountlist), 39);


        });

    };


    exports.getactionlist = getactionlist = function getactionlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        //  A=getactionlist based on action/type (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)

        // getactionlist
        //  recurse on actions
        //  look for matches
        //  Level must > level
        var matchingGroups = [];

        getgroupsrecursive(sentinactiongroup, "actiongroup", function (err, res) {
            proxyprinttodiv('Function getactionlist -- sentinactiongroup ', sentinactiongroup, 39);
            proxyprinttodiv('Function getactionlist -- actiongroup ', "actiongroup", 39);
            proxyprinttodiv('Function getactionlist -- permissions ', res[1].permissions, 39);


            var dtoPermissionsList = res[0].wids;
            // recursepermissionlist(action, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
            for (var idx = 0; idx < dtoPermissionsList.length; idx++) {
                if (((!dtoPermissionsList[idx].levelgroup) || (sentinloginlevel >= dtoPermissionsList[idx].levelgroup))) {
                    matchingGroups.push(dtoPermissionsList[idx].actiongroup);
                }
            }
            // });

            proxyprinttodiv('Function getactionlist --  matchingGroups ', matchingGroups, 39);
            callback(err, matchingGroups);
        });
    };

    exports.getaccountlist = getaccountlist = function getaccountlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        //  B=getaccountlist based on action/type (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        // getaccountlist
        //  recurse on accountlist
        //  look for matches
        //  Level must > level
        var matchingGroups = [];


        getgroupsrecursive(sentingroup, "granteegroup", function (err, res) {
            proxyprinttodiv('Function getaccountlist -- sentingroup ', sentingroup, 39);
            proxyprinttodiv('Function getaccountlist -- granteegroup ', "granteegroup", 39);
            proxyprinttodiv('Function getaccountlist --  permissions ', res[1].permissions, 39);

            var dtoPermissionsList = res[0].wids;
            // recursepermissionlist(action, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
            async.mapSeries(dtoPermissionsList, function (eachchild, cbMap) {
                if (((!eachchild.levelgroup) || (sentinloginlevel >= eachchild.levelgroup))) {
                    matchingGroups.push(eachchild.granteegroup);
                }

                getaccountlist(eachchild.granteegroup, "granteegroup", sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    matchingGroups = matchingGroups.caoncat(res);
                    cbMap(null);
                });
            }, function (err, res) {
                proxyprinttodiv('Function getaccountlist --  matchingGroups ', matchingGroups, 39);
                callback(err, matchingGroups);
            });
            // });

        });
    };

    exports.getdblist = getdblist = function getdblist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        //  C=getdglist based on sentindb (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        //  B=getaccountlist based on action/type (sentinaccount, sentinaction, sentintype, sentindb, sentinlevel)
        // getdblist
        //  recurse on dblist
        //  look for matches
        //  Level must > level
        var matchingGroups = [];


        getgroupsrecursive(sentindbgroup, "dbgroup", function (err, res) {
            proxyprinttodiv('Function getdblist -- sentinactiontypegroup ', sentinactiontypegroup, 39);
            proxyprinttodiv('Function getdblist -- dbgroup ', "dbgroup", 39);

            var dtoPermissionsList = res[0].wids;
            // recursepermissionlist(action, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
            for (var idx = 0; idx < dtoPermissionsList.length; idx++) {
                if (((!dtoPermissionsList[idx].levelgroup) || (sentinloginlevel >= dtoPermissionsList[idx].levelgroup))) {
                    matchingGroups.push(dtoPermissionsList[idx].dbgroup);
                }
            }
            // });

            proxyprinttodiv('Function getdblist --  matchingGroups ', matchingGroups, 39);
            callback(err, matchingGroups);
        });
    };


    // get all the groupdto wids for a given group wid
    // getgroupsrecursive(group, type) that returns the tree for the group sent in
    // we need a getgroupsrecursive(group, type, callback) that returns the tree for the group sent in
    exports.getgroupsrecursive = getgroupsrecursive = function getgroupsrecursive(group, type, callback) {
        // proxyprinttodiv('Function -- getGroupRecursive  group: ', group, 39);
        // proxyprinttodiv('Function -- getGroupRecursive  type: ', type, 39);



        var widGroupDtosWid = [];
        var groupsForThisWid = [];

        var arrGroups = [];
        if (group instanceof Array) {
            arrGroups = group['permissions'];
        } else {
            arrGroups.push(group);
        }


        async.series([
                function part1(cb) {
                    // proxyprinttodiv('Function getgroupsrecursive -- look up for arrGroups : ', arrGroups, 39);
                    var query = {};
                    query["data." + type] = {
                        "$in": arrGroups
                    };
                    execute([{
                            "executethis": "querywid",
                            "mongorawquery": query,
                            "mongowidmethod": "permissiondto"
                        }],
                        function (err, res) {
                            if (res[0] && res[0].length > 0) {
                                var arr = res[0];
                                for (var id in arr) {
                                    var jsonKey = Object.keys(arr[id])[0];
                                    var jsonVal = arr[id][jsonKey];
                                    var thisGroup = jsonVal;

                                    // TODO :: use type in getting groups
                                    if (thisGroup && thisGroup[type]) {
                                        // proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  thisGroup-- ', thisGroup, 39);
                                        groupsForThisWid.push(thisGroup);
                                        widGroupDtosWid.push(thisGroup[type]);
                                    }
                                }
                                cb(null);
                            } else {
                                cb(null);
                            }
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
                    'permissions': widGroupDtosWid
                });

                // TODO : *** Make the recursion work
                // getgroupsrecursive(arr, type, function (err, res) {
                //     proxyprinttodiv("Function -- res: ", res, 39);
                //     proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  groupsForThisWid-- ', groupsForThisWid, 39);
                //     proxyprinttodiv('Function getGroupRecursive  --  >>>>>>  >>>>>  widGroupDtosWid- ', widGroupDtosWid, 39);
                //     callback(null, widGroupDtosWid);
                // });
                // proxyprinttodiv("Function getgroupsrecursive "+ group +" -- "+ type +" permissions : ", arr[1].permissions, 39);
                callback(err, arr);
            });

        // return groupsForThisWid;
    }


    // recursepermissionlist(accountgroup, actiongroup, dbgroup, login) repeatedly calls getgrouprecursive
    // TODO :: CORRECT THE LOGIC BELOW
    exports.recursepermissionlist = recursepermissionlist = function recursepermissionlist(accountgroup, actiongroup, dbgroup, login, callback) {

        var permissionsArr = [];
        // proxyprinttodiv('Function -- recursepermissionlist  login: ', login, 39);
        // proxyprinttodiv('Function -- recursepermissionlist  accountgroup: ', accountgroup, 39);
        // proxyprinttodiv('Function -- recursepermissionlist  actiongroup: ', actiongroup, 39);
        // proxyprinttodiv('Function -- recursepermissionlist  dbgroup: ', dbgroup, 39);


        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                "data.granteegroup": "drimanager",
                "data.dbgroup": dbgroup
                // ,
                // "data.levelgroup": {
                //     "$lte": login
                // }
            }
        };

        // proxyprinttodiv('Function -- recursepermissionlist  queryJson: ', queryJson, 39);

        // "data.granteegroup":"driemployeegroup","data.actiongroup":"createcoupon","data.targetgroup":"executethis","data.dbgroup":"data"
        execute(queryJson, function (err, res) {
            if (!res) {
                res = [];
            }

            for(var i=0;i<res.length;i++){
                var jsonObj = res[i];
                var jsonKey = Object.keys(jsonObj);
                var jsonVal = jsonObj[jsonKey];
                
                permissionsArr.push(jsonVal);
            }

            proxyprinttodiv('Function recursepermissionlist  --  >>>>>>  >>>>>  permissionsArr-- ', permissionsArr, 39);
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
                    proxyprinttodiv('Function getuserbyac query1 -- res', res, 39);
                    var jsonKey = Object.keys(res[0][0])[0];
                    var jsonVal = res[0][0][Object.keys(res[0][0])[0]];
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
                            "wid": systemWid.wid
                        },
                        "mongorelationshipdirection": "backward",
                        "mongorelationshiptype": 'attributes'
                    }]

                    execute(query2, function (err, res) {
                        var jsonKey = Object.keys(res[0][0])[0];
                        var jsonVal = res[0][0][Object.keys(res[0][0])[0]];

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
                        "wid": userWid.wid
                    }]

                    execute(query21, function (err, res) {
                        userDto = res[0][0];
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
            proxyprinttodiv('Function getuserbyac --  >>>>>>  >>>>> userDto -- ', userDto, 39);
            callback(err, userDto);
        });

    }

})(typeof window == "undefined" ? global : window);