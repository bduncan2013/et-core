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
                        "data.accesstoken": accesstoken
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
        // if (exports.environment === "local") {
        //     while (ret === undefined) {}
        //     return ret;
        // }
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
        // console.log(">>>>> env >>> "+ JSON.stringify(inboundparams['etenvironment']));
        if (!inboundparams['etenvironment']) {
            environment = {};
            environment['ac'] = '111111111';
            environment['account'] = '222222222'; //set account to account of ac if no account
            environment['db'] = 'data';
            environment['action'] = 'getwid';
        } else {
            environment = extend(true, environment, inboundparams['etenvironment']);
        }

        delete inboundparams['etenvironment'];

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



    exports.sec1 = sec1 = function sec1() {
        securitycheck("abcd1234abcd1234abcd1234abcd1234", "staff", "getwidmaster", "db", function(err,res){
            alert(res);
        });
    }
})(typeof window == "undefined" ? global : window);