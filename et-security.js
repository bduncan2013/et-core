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







    // securitycheck(ac, mygroup(opt),_myphone(opt), accountgroup, actiongroup, actiontypegroup, dbgroup, _loginlevel, callback)
    // (AC or my account, action, action type, db)
    exports.securitycheck = securitycheck = function securitycheck(_accesstoken, _mygroup, _myphone, _actiongroup, _dbgroup, _collection, _server, _datastore, callback) {
        proxyprinttodiv('Function securitytest accesstoken-- ', _accesstoken, 39);
        proxyprinttodiv('Function securitytest mygroup-- ', _mygroup, 39);
        proxyprinttodiv('Function securitytest actiongroup-- ', _actiongroup, 39);
        proxyprinttodiv('Function securitytest _myphone-- ', _myphone, 39);
        proxyprinttodiv('Function securitytest server-- ', _server, 39);
        proxyprinttodiv('Function securitytest dbgroup-- ', _dbgroup, 39);
        proxyprinttodiv('Function securitytest _datastore-- ', _datastore, 39);

        var securityCheckOutput = false;
        var actor;
        var actorGroup;
        var action = _actiongroup;
        var actorGroupsArr = [];
        var actionGroupsArr = [];
        var actionCreator;
        var actionCreatorPermissions = [];
        var actorPermissions = [];
        var actionCreatorPermissions = [];

        var actorCreator = "";
        var actionCreator = "";

        async.series([

                function (cb1) {
                    // if mygroup not sent in then convert AC to my userwid (mygroup)
                    if (!_mygroup) {
                        getuserbyac(_accesstoken, function (err, userDto) {
                            actor = userDto;
                            actorGroup = userDto.wid; // consider user is usergroup
                            cb1(null);
                        });
                    } else {
                        actorGroup = _mygroup;
                        cb1(null);
                    }
                },
                function (cb1) {
                    // 'actor' wants to do an 'action'
                    // 'actorGroup' shall be in the list of 'userGroups' having permissions to 'actionGroup'

                    getmygroups(actorGroup, "usergroupdto", "usergroupname", actorGroupsArr, function (err, res) {
                        // get all userGroups for the actor
                        // add calculated + default userGroup for the actor('actorGroup')
                        cb1(null, "get usergroups for user");
                    })
                },
                function (cb1) {
                    // get all actionGroups for the action
                    // add calculated + default userGroup for the actor('actorGroup')
                    getmygroups(action, "actiongroupdto", "actiongroupname", actionGroupsArr, function (err, res) {
                        cb1(null, "get actiongroups for action");
                    })
                },
                function (cb1) {
                    // get the owner of the original action(metadata.systemdto.creator)
                    var query = {
                        "executethis": "mongoquery",
                        "data.usergroupname": "driemployees"
                    };
                    execute(query, function (err, res) {
                        actionCreator = res[1]['metadata']['system']['creator'];
                        proxyprinttodiv('Function securitycheck Action creator is -- ', actionCreator, 39);
                        // actionCreator = "rogeruser";
                        cb1(null, "identified action owner");
                    });
                },
                function (cb1) {
                    // getwidmaster for permissions for the 'owner' :: REVIEW THIS APPROACH
                    var rawquery1 = {
                        "executethis": "querywid",
                        "mongorawquery": {
                            "metadata.system.creator": actionCreator
                        }
                    };


                    execute(rawquery1, function (err, res) {
                        var arr = res;
                        var obj, jsonKey, dto;
                        if (arr) {
                            // iterate over the results and prepare the list
                            async.mapSeries(arr, function (objOuter, cbMapOuter) {
                                jsonKey = Object.keys(objOuter)[0];
                                dto = objOuter[jsonKey];

                                var rawquery2 = {
                                    "executethis": "getwidmaster",
                                    "wid": dto.wid
                                };
                                execute(rawquery2, function (err, res) {
                                    var arr = res;
                                    var obj, jsonKey, dto;
                                    if (arr) {
                                        // iterate over the results and prepare the list
                                        async.mapSeries(arr, function (obj, cbMap) {
                                            var permissionsjson = converttodriformat(obj);
                                            actionCreatorPermissions.push(permissionsjson);
                                            cbMap(null, "map iteration");
                                        }, function (err, res) {
                                            proxyprinttodiv('Function securitycheck permissions list -- ', actionCreatorPermissions, 39);
                                            cbMapOuter(null, "getwidmaster to get owner's permissions");
                                        })
                                    } else {
                                        cbMapOuter(null, "getwidmaster to get owner's permissions");
                                    }
                                });
                            }, function (err, res) {
                                cb1(null, "finish getting permissions list");
                            });
                        }
                    });
                },


                function (cb1) {
                    // make a query for permissions on from a query on
                    // action = received action} 
                    // &&
                    // {db = received db} 

                    // iterate over the above created permissions list
                    // from the permissions list, filter out permission records based on 
                    // received action,collection,db
                    // actiongroupname
                    // usergroupname
                    // if any matches are found -- user has permissions


                    // **** check permission wid(s) based on the collection,db, and creator
                    var actiongroupnameslist = [];
                    var usergroupnameslist = [];
                    var isMatch = false;
                    // iterate each permission record
                    for (var idx1 in actionCreatorPermissions) {
                        isMatch = false;
                        var permissionrecord = actionCreatorPermissions[idx1];
                        var actiongroupsarr = permissionrecord['data']['actiongroupdto'];
                        var usergroupsarr = permissionrecord['data']['usergroupdto'];

                        // check db and collection
                        var db = permissionrecord['metadata']['db'];
                        var collection = permissionrecord['metadata']['collection'];

                        isMatch = ((_dbgroup === db) && (_collection === collection))

                        // if matching proceed with other checks --actiongroupname and usergroupname
                        if (isMatch) {

                            // check actiongroups -- check if sent in action mataches the actiongroups permitted to
                            for (var idx2 in actiongroupsarr) {
                                var actiongrouprecord = actiongroupsarr[idx2];
                                isMatch = (action === actiongrouprecord['actiongroupname']);
                                if (isMatch) {
                                    break;
                                }
                            }

                            if (isMatch) {
                                break;
                            } else {
                                // check usergroups -- check if sent in usergroup mataches the usergroups permitted to
                                for (var idx3 in usergroupsarr) {
                                    var usergrouprecord = usergroupsarr[idx3];
                                    isMatch = (action === usergrouprecord['usergroupname']);
                                    if (isMatch) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            isMatch = false;
                        }

                        if (isMatch) {
                            break;
                        }
                    }

                    proxyprinttodiv('Function securitycheck auth status -- ', isMatch, 39);
                    securityCheckOutput = isMatch;
                    cb1(null, "matching permissions list");
                }
            ],

            function (err, res) {
                // final callback
                proxyprinttodiv('Function Final callback returns -- ', securityCheckOutput, 39);
                callback(err, securityCheckOutput);
            });

    };


    // getusergroups
    // that calls getusergroupsdefault, getusergroupsrecurse and adds them together
    exports.getmygroups = getmygroups = function getmygroups(userobj, grouptype, groupkey, groupset, callback) {
        debuglevel = 39;



        execute([{
                "executethis": "querywid",
                "mongowid": userobj,
                "mongorelationshiptype": "attributes",
                "mongorelationshipmethod": grouptype,
                "mongorelationshipdirection": "forward",
                "mongowidmethod": grouptype
            }],
            function (err, res) {
                var arr = res[0];
                var obj, jsonKey, dto;

                if (arr) {
                    // iterate over the results and prepare the list
                    // for (var i = 0; i < arr.length; i++) {
                    async.mapSeries(arr, function (obj, cbMap) {
                        jsonKey = Object.keys(obj)[0];
                        dto = obj[jsonKey];

                        groupset.push(dto[groupkey]);
                        if (dto[groupkey]) {
                            getmygroups(dto[groupkey], grouptype, groupkey, groupset, function (err, res) {
                                // recursing -- nothing to do
                                cbMap(null, "  added a dto in iteration  ");
                            });
                        }
                    }, function (err, res) {

                        groupset.push(userobj)
                        // proxyprinttodiv('Function getmygroups >>>>>  for  -- creator', creator, 39);
                        callback(err, groupset);
                    });
                }
            });
    }

    // logic to get my owner as string
    exports.getmycreator = getmycreator = function getmycreator(widname, callback) {
        widname = "getwidmaster";
        var reqJson = {
            "executethis": "getwidmaster",
            "wid": widname
        };
        execute(reqJson, function (err, res) {
            var creator = res["metadata.system.creator"];
            proxyprinttodiv('Function getmycreator -- ', creator, 39);
            callback(err, creator);
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
                    proxyprinttodiv('Function getuserbyac query1 -- res', res[0][0], 39);
                    var jsonKey = Object.keys(res[0][0])[0];
                    var jsonVal = res[0][0][jsonKey];
                    userWid = jsonVal;
                    cb(null);
                });
            }
        ], function (err, res) {
            //console.debug' done securitycheck in sync manner.');
            // proxyprinttodiv('securitycheck userDto ', userDto, 39);
            proxyprinttodiv('Function getuserbyac --  >>>>>>  >>>>> userWid -- ', userWid, 39);
            callback(err, userWid);
        });

    }


    // get cumulative list of all the permission records associated given group and key

    function getPermissionsForGroup(group, groupname, key, type, rawquery, callback) {
        getgroupsrecursive(groupname, type, [], function (err, res) {
            var matchingGroups = res;
            var permissionsList = [];

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

                proxyprinttodiv('Function getPermissionsForGroup --  permissionsList ', permissionsList, 39);
                callback(err, permissionsList);
            });
        });
    }

})(typeof window == "undefined" ? global : window);