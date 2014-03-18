// copyright (c) 2014 DRI
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
                        // proxyprinttodiv('Function security requestpermissionlist ', requestpermissionlist, 39);
                        cb1(null);
                    });
                },

                function (cb1) {
                    // check if userWid can access these records himself(check ownership)
                    // for the return records… we get a list of owners of those record

                    var arrGranteeNames = [];
                    for (var ix in requestpermissionlist) {
                        if (userGroupWid === (requestpermissionlist[ix].granteegroup)) {
                            cb1(null);
                            break;
                        } else {
                            arrGranteeNames.push(requestpermissionlist[ix].granteegroup);
                        }
                    }

                    // TODO :: check if I am owner of any of the records then stop
                    if (false) {

                    } else {
                        cb1(null);
                        // we get all of the groups for all
                        var key;
                        var type = "group";
                        var groupname;

                        // var rawquery = {
                        //     "$in": {
                        //         "data.granteegroup": arrGranteeNames
                        //     }
                        // }
                        var rawquery = {
                            "data.granteegroup": "drimanager"
                        }

                        // get all permissions for this user / usergroup
                        getPermissionsForGroup(groupname, userGroupWid, key, type, rawquery, function (err, res) {
                            if (res instanceof Array) {
                                calculatedaccountpermissionlist = calculatedaccountpermissionlist.concat(res);
                            } else {
                                calculatedaccountpermissionlist.push(res);
                            }
                            // proxyprinttodiv('Function security account calculatedaccountpermissionlist', calculatedaccountpermissionlist, 39);
                            cb1(null);
                        });
                    }


                }
            ],

            function (err, res) {
                // test security based on two permission lists
                checkpermission(requestpermissionlist, calculatedaccountpermissionlist, function (err, res) {
                    // final callback
                    // proxyprinttodiv('Function security calculatedaccountpermissionlist ', calculatedaccountpermissionlist, 39);
                    securityCheckOutput = res;
                    callback(err, securityCheckOutput);
                });
            });

    };

    // get cumulative list of all the groups associated with ationgroup/actiontypegroup/dbgroup
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
                    // proxyprinttodiv('Function --- getrequestlist  ---  sentinactiongroup ', sentinactiongroup, 39);
                    // proxyprinttodiv('Function getrequestlist actionlist ', actionlist, 39);
                    cb2(null);
                });
            },
            function (cb2) {
                getaccountlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    accountlist = res;
                    // proxyprinttodiv('Function --- getrequestlist  ---  sentingroup ', sentingroup, 39);
                    // proxyprinttodiv('Function getrequestlist actionlist ', actionlist, 39);
                    cb2(null);
                });
            },
            function (cb2) {
                getdblist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
                    dblist = res;
                    // proxyprinttodiv('Function --- getrequestlist  ---  sentindbgroup ', sentindbgroup, 39);
                    // proxyprinttodiv('Function getrequestlist actionlist ', actionlist, 39);
                    cb2(null);
                });
            }
        ], function (err, res) {
            //  filter what is not in sentinlist
            // return A+B+C
            callback(err, accountlist.concat(dblist, actionlist));
            // proxyprinttodiv('Function getrequestlist accountlist.concat(dblist, accountlist) ', accountlist.concat(dblist, actionlist), 39);
        });
    };

    // get cumulative list of all the permission records associated given group and key

    function getPermissionsForGroup(group, groupname, key, type, rawquery, callback) {
        getgroupsrecursive(groupname, type, [], function (err, res) {
            var matchingGroups = res;
            var permissionsList = [];

            // recursepermissionlist(action, sentinactiontypegroup, sentindbgroup, sentinloginlevel, function (err, res) {
            var query = {};
            if (rawquery) {
                query = rawquery;
            } else {
                query["data." + key] = group;
            }

            var command = {
                "executethis": "querywid",
                "mongorawquery": query
            };

            execute(command, function (err, res) {
                var arr = res;
                var obj, jsonKey, dtoPermissions;

                for (var i = 0; i < arr.length; i++) {
                    obj = arr[i];
                    jsonKey = Object.keys(obj)[0];
                    dtoPermissions = obj[jsonKey];

                    // check for all the permissions in the matchinggroups with acceptable level
                    if (((!dtoPermissions.levelgroup) || (sentinloginlevel >= dtoPermissions.levelgroup))) {
                        permissionsList.push(dtoPermissions);
                    }
                }

                // proxyprinttodiv('Function getPermissionsForGroup --  permissionsList ', permissionsList, 39);
                callback(err, permissionsList);
            });
        });
    }

    // get cumulative list of all the groups associated with actiongroup
    exports.getactionlist = getactionlist = function getactionlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        var key = "actiongroup";
        var type = "action";
        var groupname = sentinactiongroup;

        getPermissionsForGroup(sentinactiongroup, groupname, key, type, undefined, callback);
    }

    // get cumulative list of all the groups associated with accountgroups
    exports.getaccountlist = getaccountlist = function getaccountlist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        var key = "granteegroup";
        var type = "group";
        var groupname = sentingroup;

        getPermissionsForGroup(sentingroup, groupname, key, type, undefined, callback);
    };

    // get cumulative list of all the groups associated with dbgroup
    exports.getdblist = getdblist = function getdblist(sentingroup, sentinactiongroup, sentinactiontypegroup, sentindbgroup, sentinloginlevel, callback) {
        var key = "dbgroup";
        var type = "db";
        var groupname = sentindbgroup;

        getPermissionsForGroup(sentindbgroup, groupname, key, type, undefined, callback);
    };


    // get all the groupdto wids for a given group wid
    // getgroupsrecursive(group, type) that returns the tree for the group sent in
    // we need a getgroupsrecursive(group, type, callback) that returns the tree for the group sent in
    // logic to get cumulative list of all the groups associated with passed group and the grouptype
    exports.getgroupsrecursive = getgroupsrecursive = function getgroupsrecursive(group, type, arrGroups, callback) {
        // proxyprinttodiv('Function -- getGroupRecursive  group: ', group, 39);
        // proxyprinttodiv('Function -- getGroupRecursive  type: ', type, 39);

        var widGroupDtosWid = [];
        var groupsForThisWid = [];

        if (!arrGroups) {
            arrGroups = [];
        }

        async.series([
                function (cb) {
                    // getwidmaster for the group passed, this will be tree's start
                    execute([{
                        "executethis": "getwidmaster",
                        "wid": group
                    }], function (err, res) {
                        arrGroups.push(group);
                        var groupName = res[0][0]["systemdto.groupdto.groupname"];
                        if (groupName && res[0][0]["systemdto.groupdto.grouptype"] === type) {
                            getgroupsrecursive(groupName, type, arrGroups, function (err, res) {
                                cb(null);
                            })
                        } else {
                            cb(null);
                        }
                    });
                }
            ],
            function (err, resp) {
                proxyprinttodiv('Function getgroupsrecursive -- groups matched : for ' + group, arrGroups, 39);
                callback(err, arrGroups);
            });
    }

    // getuserbyac() gets user id by ac
    // logic to get user wid by the user accesstoken passed in
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
                    // proxyprinttodiv('Function getuserbyac query1 -- res', res, 39);
                    var jsonKey = Object.keys(res[0][0])[0];
                    var jsonVal = res[0][0][Object.keys(res[0][0])[0]];
                    systemWid = jsonVal;
                    cb(null);
                });
            },

            function part2(cb) {
                if (systemWid) {
                    // proxyprinttodiv('Function systemWid  --  >>>>>>  >>>>>  systemWid-- ', systemWid, 39);

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


    // checkpermisstion(requestpermissionlist, calculatedaccountpermissionlist)

    function checkpermission(requestpermissionlist, calculatedaccountpermissionlist, callback) {
        var result = false;
        proxyprinttodiv('Function -- checkpermission  requestpermissionlist ', requestpermissionlist, 39);
        proxyprinttodiv('Function -- checkpermission  calculatedaccountpermissionlist ', calculatedaccountpermissionlist, 39);

        // for (var ix = 0; ix < calculatedaccountpermissionlist.length; ix++) {
        //     var json1 = calculatedaccountpermissionlist[ix];

        //     for (var ixd = 0; ixd < requestpermissionlist.length; ixd++) {
        //         var json2 = requestpermissionlist[ixd];
        //         if ((json1.granteegroup === json2.granteegroup) && (json1.actiongroup === json2.actiongroup) && (json1.actiontypegroup === json2.actiontypegroup) && (json1.dbgroup === json2.dbgroup) && (json1.wid === json2.wid)) {
        //             result = true;
        //             break;
        //         }
        //     }
        // }


        var queryJson = {
            "executethis": "querywid",
            "mongorawquery": {
                "$and": [{
                    "$in": {
                        "data.granteegroup": requestpermissionlist
                    }
                }, {
                    "$in": {
                        "data.granteegroup": calculatedaccountpermissionlist
                    }
                }, {
                    "$in": {
                        "data.actiongroup": requestpermissionlist
                    }
                }, {
                    "$in": {
                        "data.actiongroup": calculatedaccountpermissionlist
                    }
                }, {
                    "$in": {
                        "data.actiontypegroup": requestpermissionlist
                    }
                }, {
                    "$in": {
                        "data.actiontypegroup": calculatedaccountpermissionlist
                    }
                }, {
                    "$in": {
                        "data.dbgroup": requestpermissionlist
                    }
                }, {
                    "$in": {
                        "data.dbgroup": calculatedaccountpermissionlist
                    }
                }]
            }
        };

        execute(queryJson, function (err, res) {
            if (res) {
                result = true;
            }

            callback(undefined, result);
        });
    }




    

})(typeof window == "undefined" ? global : window);