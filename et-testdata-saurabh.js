// create users
// creates wids
// we put users and put wids into groups
// we create actiongroups, targetroups, 
// we put groups insdie of groups
// we add permissions
// we test
//
// 
//
//


(function (window) {
    // takes in needed details and does a security check on the basis of data received against the DB data received
    // user is identified by the access token
    // db says which DB to be used
    // actiongroup says the type of wid the action is being tried upon
    // targetaction is the action being executed on the wid
    exports.testsecurity = testsecurity = function testsecurity(_accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, callback) {
        securitycheck(_accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel, function (err, res) {
            proxyprinttodiv('Function testsecurity done --  >>>>>>  >>>>>  for  securitycheck response -- ', res, 35);
            callback(err, res)
        });
    }

    // receive an array of arrays -- each inner array contains permission data
    // create permissions for each
    // array passed in will be of format 
    // [
    //     ["cody", "driemployee", "getwidmaster", "execute", "data", 99],
    //     ["cody", "drimanager", "addwidmaster", "execute", "data", 99],
    //     ["roger", "drimanager", "addwidmaster", "execute", "data", 99],
    //     ["cody", "cody", "getwidmaster", "execute", "data", 99]
    // ]

    function createpermissiondata(arr, cb) {
        async.mapSeries(arr, function (item, cbMap) {
            async.nextTick(function () {
                // addpermission -- add permission --- 
                // "execute" actiontype  ,for group "driemployee", for action "getwidmaster", for "data"
                addpermission(item[0], item[1], item[2], item[3], item[4], item[5], function (err, res) {
                    proxyprinttodiv('Function createpermissiondata addpermission --  ' + item[0] + ' user  ,' + item[3] + ' actiontype  ,for group ' + item[1] + ', for action ' + item[2] + ', for ' + item[4] + ' db  ,' + item[5] + ' loginlevel  ,', res, 39);
                    cbMap(null);
                });
            });
        }, function (err, res) {
            // If error, bounce out
            if (err && Object.keys(err).length > 0) {
                cb(err, res);
            } else {
                cb(null, res);
            }
        });
    }



    // receive an array of arrays -- each inner array contains user data
    // create userdto for each
    // array passed in will be of format 
    // [
    // ["roger", "rogerac", 99],
    // ["cody", "codyac", 99]
    // ]

    function createuserdata(arr, cb) {
        async.mapSeries(arr, function (item, cbMap) {
            async.nextTick(function () {

                // create users -- create user 
                createtestuser(item[0], item[1], item[2], function (err, res) {
                    proxyprinttodiv('Function createuserdata creategroup -- ' + item[0], res, 39);
                    cbMap(null);
                });
            });
        }, function (err, res) {
            // If error, bounce out
            if (err && Object.keys(err).length > 0) {
                cb(err, res);
            } else {
                cb(null, res);
            }
        });
    }

    // receive an array of arrays -- each inner array contains group data
    // create groups for each, and create associations for each item received
    // arrays passed in will be of following format 
    // grouparr
    // var arrGroups = [
    //     ["driemployee"], //group
    //     ["drimanager"], //group
    //     ["execute"], //actiontype
    //     ["clean"], //actiontype
    //     ["getwidmaster"], // action
    //     ["addwidmaster"] // action
    // ];
    // // associationarr
    // var arrAssociations = [
    //     ["addwidmaster", "addwidmaster", "action"],
    //     ["getwidmaster", "getwidmaster", "action"],
    //     ["roger", "drimanager", "group"],
    //     ["roger", "driemployee", "group"],
    //     ["cody", "driemployee", "group"]
    // ];

    function creategroupdata(arrGroups, arrAssociations, cb) {
        async.mapSeries(arrGroups, function (item, cbMap) {
            async.nextTick(function () {
                // create groups 
                creategroup(item[0], function (err, res) {
                    proxyprinttodiv('Function creategroupdata -- ' + item[0], res, 39);
                    cbMap(null);
                });
            });
        }, function (err, res) {
            // If error, bounce out
            if (err && Object.keys(err).length > 0) {
                cb(err, res);
            } else {
                // create group asociations
                async.mapSeries(arrAssociations, function (item, cbMap1) {
                    async.nextTick(function () {
                        // add group to wid -- groupname to widname wid
                        // wid,  groupname,grouptype, 
                        addgrouptowid(item[0], item[1], item[2], function (err, res) {
                            proxyprinttodiv('Function creategroupdata --  addgrouptowid added  group to wid -- ' + item[0] + ' to ' + item[1], res, 39);
                            cbMap1(null);
                        });
                    });
                }, function (err, res) {
                    // If error, bounce out
                    if (err && Object.keys(err).length > 0) {
                        cb(err, res);
                    } else {
                        cb(null, res);
                    }
                });
            }
        });
    }







    exports.freshgroups1 = freshgroups1 = function freshgroups1(parm, callback) {
        debuglevel = 39;

        getactionlist("", "getwidmaster", "", "", "", function (err, res) {
            proxyprinttodiv('Function freshgroups -- res', res, 39);
            callback(err, res);
        });
    };

    exports.freshgroups2 = freshgroups2 = function freshgroups2(parm, callback) {
        debuglevel = 39;

        getaccountlist("cody", "", "", "", "", function (err, res) {
            proxyprinttodiv('Function freshgroups2 -- res', res, 39);
            callback(err, res);
        });
    };

    exports.freshgroups3 = freshgroups3 = function freshgroups3(parm, callback) {
        debuglevel = 39;

        getdblist("", "", "", "data", "", function (err, res) {
            proxyprinttodiv('Function freshgroups3 -- res', res, 39);
            callback(err, res);
        });
    };

    exports.freshgroups4 = freshgroups4 = function freshgroups4(parm, callback) {
        debuglevel = 39;
        var arr = [];
        async.series([
                function (cb1) {
                    // creste schema data
                    getgroupsrecursive("cody", "group", [], function (err, res) {
                        proxyprinttodiv('Function freshgroups4 -- res', res, 39);
                        arr = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('Function fresh 3 -- add data and test --  ' + JSON.stringify(arr));
                callback(err, arr);
            });
    };


    exports.freshgroups5 = freshgroups5 = function freshgroups5(parm, callback) {
        debuglevel = 39;
        var arr = [];
        async.series([
                function (cb1) {
                    // creste schema data
                    getgroupsrecursive("cody", "granteegroup", [], function (err, res) {
                        proxyprinttodiv('Function freshgroups4 -- res', res, 39);
                        arr = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('Function fresh 3 -- add data and test --  ' + JSON.stringify(arr));
                callback(err, arr);
            });
    };




    // create systemdtos
    // create users
    // creates wids
    // we put users and put wids into groups

    // we create actiongroups, targetgroups,

    // we put groups insdie of groups
    // we add permissions
    // we test
    // var status = false;
    exports.ettestsec1 = ettestsec1 = function ettestsec1(parm, callback) {

        debuglevel = 39;
        // users data
        var arrUsers = [
            ["roger", "rogerac", 99],
            ["cody", "codyac", 99]
        ];
        // groups data
        var arrGroups = [
            ["driemployee"], //group
            ["drimanager"], //group
            ["execute"], //actiontype
            ["clean"], //actiontype
            ["getwidmaster"], // action
            ["addwidmaster"] // action
        ];
        // group associations data
        var arrAssociations = [
            ["addwidmaster", "addwidmaster", "action"],
            ["getwidmaster", "getwidmaster", "action"],
            ["roger", "drimanager", "group"],
            ["roger", "driemployee", "group"],
            ["cody", "driemployee", "group"]
        ];
        // permissions data
        var arrPermissions = [
            ["cody", "driemployee", "getwidmaster", "execute", "data", 99],
            ["cody", "drimanager", "addwidmaster", "execute", "data", 99],
            ["roger", "drimanager", "addwidmaster", "execute", "data", 99],
            ["cody", "cody", "getwidmaster", "execute", "data", 99]
        ];

        /// CHANGE VALUES ABOVE FOR TESTING SECURITY. DO NOT EDIT THE BELOW PARTS OF THIS FUNCTIONS


        // user details
        userObj = {};
        userObj['userAc'] = "codyac";
        userObj['userGroup'] = undefined;
        userObj['actiongroup'] = "addwidmaster";
        userObj['actiontypegroup'] = "execute";
        userObj['dbgroup'] = "data";
        userObj['loginlevel'] = 99;

        /// CHANGE VALUES ABOVE FOR TESTING SECURITY. DO NOT EDIT THE BELOW PARTS OF THIS FUNCTIONS

        checkSecurityForUser(arrUsers, arrAssociations, arrGroups, arrPermissions, userObj, callback);
    }



     exports.ettestsec2 = ettestsec2 = function ettestsec2(parm, callback) {

        debuglevel = 39;
        // users data
        var arrUsers = [
            ["saurabh", "saurabhac", 50],
            ["cody", "codyac", 99]
        ];
        // groups data
        var arrGroups = [
            ["driemployee"], //group
            ["lessergroup"], //group
            ["execute"], //actiontype
            ["clean"], //actiontype
            ["getwidmaster"], // action
            ["addwidmaster"] // action
        ];
        // group associations data
        var arrAssociations = [
            ["addwidmaster", "addwidmaster", "action"],
            ["getwidmaster", "getwidmaster", "action"],
            ["saurabh", "lessergroup", "group"],
            // ["saurabh", "driemployee", "group"],
            ["cody", "driemployee", "group"]
        ];
        // permissions data
        var arrPermissions = [
            ["cody", "driemployee", "getwidmaster", "execute", "data", 99],
            ["cody", "lessergroup", "addwidmaster", "execute", "data", 99],
            ["saurabh", "lessergroup", "addwidmaster", "execute", "data", 50],
            ["cody", "cody", "getwidmaster", "execute", "data", 99]
        ];

        /// CHANGE VALUES ABOVE FOR TESTING SECURITY. DO NOT EDIT THE BELOW PARTS OF THIS FUNCTIONS


        // user details
        userObj = {};
        userObj['userAc'] = "saurabhac";
        userObj['userGroup'] = undefined;
        userObj['actiongroup'] = "addwidmaster";
        userObj['actiontypegroup'] = "execute";
        userObj['dbgroup'] = "data";
        userObj['loginlevel'] = 50;

        /// CHANGE VALUES ABOVE FOR TESTING SECURITY. DO NOT EDIT THE BELOW PARTS OF THIS FUNCTIONS

        checkSecurityForUser(arrUsers, arrAssociations, arrGroups, arrPermissions, userObj, callback);
    }







    function checkSecurityForUser(arrUsers, arrAssociations, arrGroups, arrPermissions, userObj, callback) {


        async.series([
                function (cb1) {
                    // creste schema data
                    // createsystemdtos({}, function (err, res) {
                    //     proxyprinttodiv('Function  ettestsec1  added schema dtos ', res, 39);
                    //     cb1(null);
                    // });
                    createalldtos({}, function (err, res) {
                        proxyprinttodiv('Function  ettestsec1  added schema dtos ', res, 39);
                        cb1(null);
                    });
                },
                function (cb1) {
                    // setup user data

                    createuserdata(arrUsers, function (err, res) {
                        proxyprinttodiv('Function  ettestsec1  added user data ', res, 39);
                        cb1(null);
                    });
                },
                function (cb1) {
                    // setup groups data
                    creategroupdata(arrGroups, arrAssociations, function (err, res) {
                        proxyprinttodiv('Function  ettestsec1  added groups ', res, 39);
                        cb1(null);
                    });
                },
                function (cb1) {
                    // setup permission data
                    createpermissiondata(arrPermissions, function (err, res) {
                        proxyprinttodiv('Function  ettestsec1  added permissions ', res, 39);
                        cb1(null);
                    });
                },
                function (cb1) {
                    // _accesstoken, _mygroup, _actiongroup, _actiontypegroup, _dbgroup, _loginlevel,
                    testsecurity(userObj['userAc'], userObj['userGroup'], userObj['actiongroup'], userObj['actiontypegroup'], userObj['dbgroup'], userObj['loginlevel'], function (err, res) {
                        proxyprinttodiv('Function  ettestsec1 testsecurity --  '+userObj['userAc']+' execute '+userObj['actiontypegroup']+'   , for action '+userObj['actiongroup']+' , for '+userObj['dbgroup']+' ', res, 39);
                        status = res;
                        cb1(null);
                    });
                }
            ],

            function (err, res) {
                console.log('Function ettestsec1 -- add data and test --  ' + JSON.stringify(res));
                callback(err, status === "true");
            });


    }









    /// dtodefault
    // metadata.system.creator driwid
    // metadata.system.creationdate    3/9/2014
    // metadata.system.expirationtimer 10000
    // metadata.system.expiratondate   12/31/2999
    // metadata.system.db  data
    // metadata.system.collection  dri
    // metadata.system.type   

    // dtooverride
    // metadata
    // metadata.manytoone  [interfacedto, executeaction, getaction, editaction, deleteaction, addaction, groupdto]
    // metadata.inherit.default    [defaultactionset, ]

    function initialize(cb) {
        var elementaryDtosSetup = [{
            //viewdto
            "executethis": "addwidmaster",
            "metadata.method": "viewdto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "html": ""
        }, {
            //basedto
            "executethis": "addwidmaster",
            "metadata.method": "basedto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "html": ""
        }, {
            //backdto
            "executethis": "addwidmaster",
            "metadata.method": "backdto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "html": ""
        }, {
            //interfacedto
            "executethis": "addwidmaster",
            "metadata.method": "interfacedto",
            "inherit.override": "dtooverride",
            "inherit.default": "dtodefault",
            "manytoone": "viewdto",
            "manytoone": "basedto",
            "manytoone": "backdto"
        }, {
            //dtodefault
            "executethis": "addwidmaster",
            "metadata.method": "dtodefault",
            "metadata.system.creator": "driwid",
            "metadata.system.creationdate": "3/9/2014",
            "metadata.system.expirationtimer": "10000",
            "metadata.system.expiratondate": "12/31/2999",
            "metadata.system.db": "data",
            "metadata.system.collection": "dri",
            "metadata.system.type": ""
        }, {
            //dtooverride
            "executethis": "addwidmaster",
            "metadata.method": "dtooverride",
            "metadata.manytoone": "interfacedto",
            "metadata.manytoone": "executeaction",
            "metadata.manytoone": "getaction",
            "metadata.manytoone": "editaction",
            "metadata.manytoone": "deleteaction",
            "metadata.manytoone": "addaction",
            "metadata.manytoone": "groupdto",
            "metadata.inherit.default": "defaultactionset",
            "metadata.system.creator": "driwid",
            "metadata.system.creationdate": "3/9/2014",
            "metadata.system.expirationtimer": "10000",
            "metadata.system.expiratondate": "12/31/2999",
            "metadata.system.db": "data",
            "metadata.system.collection": "dri",
            "metadata.system.type": ""
        }, {
            //executeaction
            "executethis": "addwidmaster",
            "metadata.method": "executeaction"
        }];
    }

    // creates test data for different tests to be run :: generates data and adds a new user 
    exports.createtestuser = createtestuser = function createtestuser(userwid, ac, loginlevel, cb2) {

        execute([{
                // add user 
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                // "metadata.owner": "system",
                "wid": userwid,
                "fname": "john",
                "lname": "doe",
                "email": "jj@gmail.com",
                "email2": "",
                "address": "123 pleasant lane",
                "address2": "apt 101",
                "city": "Pleasantville",
                "state": "Florida",
                "zip": "26539",
                // security data
                "systemdto.securitydto.logged_id": "true",
                "systemdto.securitydto.accesstoken": ac,
                "systemdto.securitydto.level": loginlevel,
                // category data
                "systemdto.categorydto.categorytype": "categorytype",
                "systemdto.categorydto.categoryname": "categoryname",

            }],
            function (err, res) {
                proxyprinttodiv('Function createtestuser done --  >>>>>> added user >>>>>  for  -- ' + userwid, res, 35);
                // addsecurity(userwid, true, ac, loginlevel, function (err, res1) {
                //     proxyprinttodiv('Function addsecurity done --  >>>>>> added security >>>>>  for  -- ' + userwid, res1, 35);
                //     addcategory(userwid, true, "categoryname", function (err, res2) {
                //         proxyprinttodiv('Function addcategory --  >>>>>> added category >>>>> for   -- ' + userwid, res2, 35);

                execute({
                    "executethis": "getwidmaster",
                    "wid": userwid
                }, function (err, res3) {
                    proxyprinttodiv('Function createtestuser --  >>>>>> FINAL USER >>>>>    -- ' + userwid, res3, 35);
                    cb2(err, res3);
                })
                //     });
                // });
            });
    }


    // data 
    // metadata.system.creator driwid
    // metadata.system.creationdate    3/9/2014
    // metadata.system.expirationtimer 10000
    // metadata.system.expiratondate   12/31/2999
    // metadata.system.db  data
    // metadata.system.collection  dri
    // metadata.system.type    


    // executeaction/getaction/editaction/addaction/deleteaction
    // metadata    
    // method  executeaction
    // onetoone    actiondto
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault


    // actiondto   
    // metadata    
    // method  actiondto
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  [serveraction, localaction]]

    // serveraction    
    // metadata    
    // method  serveraction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  serveraction


    // localaction 
    // metadata    
    // method  serveraction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  [offlineactions, onlineaction]


    // onlineaction    
    // metadata    
    // method  onlineaction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  executedto


    // offlineaction   
    // metadata    
    // method  offlineaction
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]
    // metadata.manytoone  executedto


    // userdto 
    // metadata    
    // method  userdto
    // onetoone    [securitydto, envrionmentdto]
    // onetomany   [permissiondto]
    // inherit.override    [dtooverride]
    // inherit.default [dtodefault]

    // fields  
    // first   string
    // last    string
    // ...MORE 


})(typeof window == "undefined" ? global : window);