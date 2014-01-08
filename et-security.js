// continue with security / permissions

// remember security needs to be asynch…prob by doing an todolist or inline function

(function (window) {
    exports.securitycheck = securitycheck = function securitycheck(accesstoken, account, action, db, callback) {
        proxyprinttodiv('Function securityCheck() in : ', 'before');



        // check if systemdto has status as logged in for the given access code, if yes proceed, else respond with unauthorized error
        var securityCheckOutput = false;

        var results1;
        var results2;

        async.series([

            function part1(cb) {
                var query1 = {
                    "mongorawquery": {
                        "accesstoken": accesstoken
                    },
                    "mongorelationshiptype": 'attributes',
                    "mongorelationshipmethod": 'last',
                    "mongowidmethod": 'dtotype',
                    "mongorelationshipdirection": "backward",
                    "convertmethod": "convertmethod",
                    "mongowidmethod": "systemdto"
                };

                querywid(query1, function (err, res) {
                    results1 = res;
                    cb(null);
                });
            },

            function part2(cb) {
                var query2 = {
                    "mongorawquery": {
                        "wid": results1
                    },
                    "mongorelationshiptype": 'attributes',
                    "mongorelationshipmethod": 'last',
                    "mongowidmethod": 'dtotype',
                    "mongorelationshipdirection": "backward",
                    "convertmethod": "convertmethod",
                    "mongowidmethod": "systemdto"
                }

                querywid(query2, function (err, res) {
                    userDto = res;
                    cb(null);
                });
            },

            function part3(cb) {
                proxyprinttodiv('Function querywid() out with  userDto : ', JSON.stringify(userDto));
                if (!userDto.logged_id) {
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
                    var myAccountGroupdtoArr = getGroupRecursive(userDto);

                    // get account groups
                    var accountGroupdtoArr = getGroupRecursive(account);

                    // get action groups
                    var actionGroupdtoArr = getGroupRecursive(action);

                    // get db groups
                    var dbGroupdtoArr = getGroupRecursive(db);

                    // find all permissions where my groups are given permission
                    var myPermissionsdtoArr = getPermissionsList(myAccountGroupdtoArr, accountGroupdtoArr, actionGroupdtoArr, dbGroupdtoArr);

                    // see if there is a permission record for that combination
                    if (myPermissionsdtoArr.length > 0) {
                        securityCheckOutput = true;
                    }
                }
                ret = securityCheckOutput;
                cb(null);
            }
        ], function (err, res) {
            console.log(' done securitycheck in sync manner.');
            if (callback instanceof Function) {
                callback(err, ret);
            }
        });
        if (exports.environment === "local") {
            while (ret === undefined) {}
            return ret;
        }
    }

    // get all the groupdto wids for a given wid

    function getGroupRecursive(wid) {

        var groupsForThisWid = [];


        async.series([
            function part1(cb) {
                getwidmaster({
                    "wid": wid,
                    "command.dtotype": "groupdto"
                }, function (err, res) {
                    if (!res || res.length === 0) {
                        groupsForThisWid = []
                    };

                    for (var i = 0; i < res.length; i++) {
                        groupsForThisWid = groupsForThisWid.concat(getGroupRecursive(res[i].wid));
                    }

                    cb(null);
                })
            }
        ], function (err, resp) {
            console.log(' done groups retrieving in sync manner.');
        });

        while (!groupsForThisWid) {};
        return groupsForThisWid;
    }


    // get the group wids array for grantee, account, action and db, and get the matching permissions array

    function getPermissionsList(myAccountGroupdtoArr, accountGroupdtoArr, actionGroupdtoArr, dbGroupdtoArr) {

        var permissionsArr;

        var queryJson = {
            "granteegroup.wid": {
                "$in": myAccountGroupdtoArr
            },
            "actiongroup.wid": {
                "$in": actionGroupdtoArr
            },
            "dbgroup.wid": {
                "$in": dbGroupdtoArr
            },
            "accountgroup.wid": {
                "$in": accountGroupdtoArr
            }
        };

        async.series([
            function part1(cb) {
                getwidmaster(queryJson, function (err, res) {
                    if (!res) {
                        res = [];
                    }
                    permissionsArr = res;
                    cb(null);
                });
            }
        ], function (err, resp) {
            console.log(' done permissions retrieving in sync manner.');
        });

        while (!permissionsArr) {};
        return permissionsArr;
    }


})(typeof window == "undefined" ? global : window);