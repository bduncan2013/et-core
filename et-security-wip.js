(function (window) {
    //***************************************************************************************
    // et-testdata
    //***************************************************************************************





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
    exports.test1 = test1 = function test1(parm, callback) {

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
                        proxyprinttodiv('Function  ettestsec1 testsecurity --  ' + userObj['userAc'] + ' execute ' + userObj['actiontypegroup'] + '   , for action ' + userObj['actiongroup'] + ' , for ' + userObj['dbgroup'] + ' ', res, 39);
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




    // creates test data for different tests to be run :: generates data and adds a new user 
    exports.createtestuser = createtestuser = function createtestuser(userwid, ac, loginlevel, cb2) {

        execute([{
                // add user 
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "metadata.owner": "system",
                "wid": userwid,
                "fname": "John",
                "lname": "Doe",
                "phone": "098-987-8765",
                "email": "jj@gmail.com",
                "address": "123 pleasant lane",
                "address2": "apt 101",
                "city": "Pleasantville",
                "state": "Florida",
                "zip": "26539",
                "country": "US",
                // security data
                "metadata.securitydto.logged_id": "true",
                "metadata.securitydto.accesstoken": ac,
                "metadata.metadata.securitydto.level": loginlevel,
                // category data
                "metadata.categorydto.categorytype": "categorytype",
                "metadata.categorydto.categoryname": "categoryname",

                // environment data
                "metadata.environmentdto.ac": "ac1",
                "metadata.environmentdto.gps": "gps1",
                "metadata.environmentdto.account": "account1",
                "metadata.environmentdto.db": "db1",
                "metadata.environmentdto.collection": "collection1",
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
                });
            });
    }




    //***************************************************************************************
    // et-dto
    //***************************************************************************************

    exports.createalldtos = createalldtos = function createalldtos(params, callback) {


        // Create DTOs
execute([{"executethis":"addwidmaster",
			"wid":"dtodefault",
			"metadata.method":"dtodefault",
			"metadata.system.creator":"driwid",
			"metadata.system.creationdate":"3/9/2014",
			"metadata.system.expirationtimer":"10000",
			"metadata.system.expirationdate":"12/31/2999",
			"metadata.system.db":"data",
			"metadata.system.collection":"dri",
			"metadata.system.type":""
			},{
// Create the dtooverride
			"executethis":"addwidmaster",
			"wid":"dtooverride",
			"metadata.method":"dtodefault",
			"metadata.system.creator":"driwid",
			"metadata.system.creationdate":"3/9/2014",
			"metadata.system.expirationtimer":"10000",
			"metadata.system.expirationdate":"12/31/2999",
			"metadata.system.db":"data",
			"metadata.system.collection":"dri",
			"metadata.system.type":"",
			"metadata.interfacedto.type":"manytoone",
			"metadata.executeactiondto.type":"manytoone",
			"metadata.getactiondto.type":"manytoone",
			"metadata.editactiondto.type":"manytoone",
			"metadata.deleteactiondto.type":"manytoone",
			"metadata.addactiondto.type":"manytoone",
			"metadata.groupdto.type":"manytoone",
			},{
// Create a default actionset
			"executethis":"addwidmaster",
			"wid":"defaultactionset",
			"metadata.method":"actionsetdto",
			"executetype":"ex",
			"gettype":"get",
			"addtype":"add",
			"edittype":"ed",
			"deletetype":"del"
			},{
// securitydatadto
			"executethis":"addwidmaster",
			"wid":"securitydatadto",
			"metadata.method":"securitydatadto",
			"ac":"string",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// viewdto
			"executethis":"addwidmaster",
			"wid":"viewdto",
			"metadata.method":"viewdto",
			"html":"string",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// basedto
			"executethis":"addwidmaster",
			"wid":"basedto",
			"metadata.method":"basedto",
			"html":"string",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// backdto
			"executethis":"addwidmaster",
			"wid":"backdto",
			"metadata.method":"backdto",
			"html":"string",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// interfacedto
			"executethis":"addwidmaster",
			"wid":"interfacedto",
			"metadata.method":"interfacedto",
			"metadata.viewdto.type":"manytoone",
			"metadata.backdto.type":"manytoone",
			"metadata.basedto.type":"manytoone",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// Create the errorobjectdto
			"executethis":"addwidmaster",
			"wid":"errorobjectdto",
			"metadata.method":"errorobjectdto",
			"evalerror":"string",
			"rangeerror":"string",
			"referenceerror":"string",
			"syntaxerror":"string",
			"typeerror":"string",
			"urlerror":"string",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// create the passdto
			"executethis":"addwidmaster",
			"wid":"passdto",
			"metadata.method":"passdto",
			"log":"boolean",
			"metadata.inherit.override":"[dtooverride]",
			"metadata.inherit.default":"[dtodefault]"
			},{
// create the faildto
			"executethis":"addwidmaster",
			"wid":"faildto",
			"metadata.method":"faildto",
			"log":"boolean",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the validatedto
			"executethis":"addwidmaster",
			"wid":"validatedto",
			"metadata.method":"validatedto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the resultdto
			"executethis":"addwidmaster",
			"wid":"resultdto",
			"metadata.method":"resultdto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the errordto
			"executethis":"addwidmaster",
			"wid":"errordto",
			"metadata.method":"errordto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the beforedto
			"executethis":"addwidmaster",
			"wid":"beforedto",
			"metadata.method":"beforedto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the afterdto
			"executethis":"addwidmaster",
			"wid":"afterdto",
			"metadata.method":"afterdto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the executedto
			"executethis":"addwidmaster",
			"wid":"executedto",
			"metadata.method":"executedto",
			"executeid":"string",
			"oncreate":"string",
			"executeorder":"string",
			"tryorder":"string",
			"dothis":"string",
			"parameters":"string",
			"metadata.passdto.type":"onetomany",
			"metadata.faildto.type":"onetomany",
			"metadata.validatedto.type":"onetoone",
			"metadata.resultdto.type":"onetoone",
			"metadata.errordto.type":"onetoone",
			"metadata.beforedto.type":"manytoone",
			"metadata.afterdto.type":"manytoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the logobject
			"executethis":"addwidmaster",
			"wid":"logobject",
			"metadata.method":"executedto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the gettypedto
			"executethis":"addwidmaster", // <-- this wid might not be needed
			"wid":"gettypedto",
			"metadata.method":"gettypedto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the addtypedto
			"executethis":"addwidmaster",
			"wid":"addtypedto",
			"metadata.method":"addtypedto",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the offlineactiondto
			"executethis":"addwidmaster",
			"wid":"offlineactiondto",
			"metadata.method":"offlineactiondto",
			"metadata.executedto.type":"manytoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the onlineactiondto
			"executethis":"addwidmaster",
			"wid":"onlineactiondto",
			"metadata.method":"onlineactiondto",
			"metadata.executedto.type":"manytoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the localactiondto
			"executethis":"addwidmaster",
			"wid":"localactiondto",
			"metadata.method":"localactiondto",
			"metadata.onlineaction.type":"manytoone",
			"metadata.offlineaction.type":"manytoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the serveractiondto
			"executethis":"addwidmaster",
			"wid":"serveractiondto",
			"metadata.method":"serveractiondto",
			"metadata.serveractiondto.type":"manytoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// create the actiondto
			"executethis":"addwidmaster",
			"wid":"actiondto",
			"metadata.method":"actiondto",
			"metadata.serveractiondto.type":"manytoone",
			"metadata.localactiondto.type":"manytoone",
			//"actionname":"string",
			//"actiontype":"string",
			//"dothis":"string",
			//"parameters":"string",
			//"offlineonline":"string",
			//"localserver":"string",
			//"oncreate":"string",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the executeactiondto
			"executethis":"addwidmaster",
			"wid":"executeactiondto",
			"metadata.method":"executeactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the getactiondto
			"executethis":"addwidmaster",
			"wid":"getactiondto",
			"metadata.method":"getactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the editactiondto
			"executethis":"addwidmaster",
			"wid":"editactiondto",
			"metadata.method":"editactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the addactiondto
			"executethis":"addwidmaster",
			"wid":"addactiondto",
			"metadata.method":"addactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the deleteactiondto
			"executethis":"addwidmaster",
			"wid":"deleteactiondto",
			"metadata.method":"deleteactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the permissiondto		
			"executethis":"addwidmaster",
			"wid":"permissiondto",
			"metadata.method":"permissiondto",
			"level":"string",
			//"metadata.actiontype.type":"manytomany", // <-- no more?
			//"metadata.granteegroup.type":"manytomany", // <-- no more?
			//"metadata.dbdto.type":"manytomany",
			//"metadata.collectiondto.type":"manytomany",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault",
			},{
// Create the environmentdto
			"executethis": "addwidmaster",
			"metadata.method": "environmentdto",
			"wid": "environmentdto",
			"ac": "string",
			"gps": "string",
			"account": "string",
			"db": "string",
			"collection": "collection",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{	
// Create the securitydto
			"executethis": "addwidmaster",
			"metadata.method": "securitydto",
			"wid": "securitydto",
			"accesstoken": "string",
			//"status": "integer"
			"status": "string",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the groupdto		
			"executethis":"addwidmaster",
			"wid":"groupdto",
			"metadata.method":"groupdto",
			"groupname":"string",
			"metadata.groupdto.type":"onetomany",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the actiongroupdto		
			"executethis":"addwidmaster",
			"wid":"actiongroupdto",
			"metadata.method":"actiongroupdto",
			"actiongroupname":"string",
			"metadata.executeactiondto.type":"manytoone",
			"metadata.getactiondto.type":"manytoone",
			"metadata.editactiondto.type":"manytoone",
			"metadata.deleteactiondto.type":"manytoone",
			"metadata.addactiondto.type":"manytoone",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the usergroupdto		
			"executethis":"addwidmaster",
			"wid":"usergroupdto",
			"metadata.method":"usergroupdto",
			"groupname":"string",
			"metadata.userdto.type":"manytomany",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"
			},{
// Create the userdto
			"executethis": "addwidmaster",
			"metadata.method": "userdto",
			"wid": "userdto",
			"widname": "wid",
			"fname": "string",
			"lname": "string",
			"phone": "string",
			"email": "string",
			"address": "string",
			"address2": "string",
			"city": "string",
			"state": "string",
			"zip": "string",
			"country": "string",
			"metadata.securitydto.type":"onetoone",			
			"metadata.environmentdto.type":"onetoone",
			"metadata.permissiondto.type":"onetomany",
			"metadata.inherit.override":"dtooverride",
			"metadata.inherit.default":"dtodefault"}]);

		createrelationship("interfacedto","viewdto","manytoone");
		createrelationship("interfacedto","backdto","manytoone");
		createrelationship("interfacedto","basedto","manytoone");
		createrelationship("passdto","logobjectdto","onetoone");
		createrelationship("faildto","logobjectdto","onetoone");
		createrelationship("executedto","passdto","onetomany");
		createrelationship("executedto","faildto","onetomany");
		createrelationship("executedto","beforedto","manytoone");
		createrelationship("executedto","afterdto","manytoone");
		createrelationship("executedto","validatedto","onetoone");
		createrelationship("executedto","resultdto","onetoone");
		createrelationship("executedto","errorobjectdto","manytoone");
		createrelationship("onlineactiondto","executedto","manytoone");
		createrelationship("offlineactiondto","executedto","manytoone");
		createrelationship("localactiondto","onlineactiondto","manytoone");
		createrelationship("localactiondto","offlineactiondto","manytoone");
		createrelationship("serveractiondto","serveractiondto","manytoone");
		createrelationship("actiondto","localactiondto","manytoone");
		createrelationship("actiondto","serveractiondto","manytoone");
		createrelationship("executeactiondto","actiondto","onetoone");
		createrelationship("getactiondto","actiondto","onetoone");
		createrelationship("editactiondto","actiondto","onetoone");
		createrelationship("addactiondto","actiondto","onetoone");
		createrelationship("deleteactiondto","actiondto","onetoone");
		createrelationship("groupddto","groupdto","onetomany");
		createrelationship("userdto","securitydto","onetoone");
		createrelationship("userdto","environmentdto","onetoone");
		createrelationship("userdto","permissiondto","onetomany");
		createrelationship("userdto","usergroupdto","onetomany");
		createrelationship("usergroupdto","userdto","manytomany");
		createrelationship("actiongroupdto","executeactiondto","manytoone");
		createrelationship("actiongroupdto","getactiondto","manytoone");
		createrelationship("actiongroupdto","editactiondto","manytoone");
		createrelationship("actiongroupdto","deleteactiondto","manytoone");
		createrelationship("actiongroupdto","addactiondto","manytoone");
		//createrelationship("permissiondto","actiontypedto","manytomany");
		//createrelationship("permissiondto","granteegroupdto","manytomany");
		//createrelationship("permissiondto","dbdto","manytomany");
		//createrelationship("permissiondto","collectiondto","manytomany");
    }

    // create a group record with provided data 
    exports.creategroup = creategroup = function creategroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "groupdto",
            "groupname": groupname


        }], function (err, res) {
            // proxyprinttodiv('Function creategroup relationships -- added all this -- ', res, 99);
            callback(err, res);
        });
    }

    // create relationship as per provided data and relationship type
    exports.createrelationship = createrelationship = function createrelationship(primarywid, secondarywid, linktype) {

        execute([{
            "executethis": "addwidmaster",
            "wid": "rel" + secondarywid + "_to_" + primarywid,
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": linktype,
            "primarywid": primarywid,
            "primarymethod": primarywid,
            "secondarywid": secondarywid,
            "secondarymethod": secondarywid
        }]);

        alert('done creating relationship');
    }

    // create relationship as per provided data and relationship type
    exports.addgrouptowid = addgrouptowid = function addgrouptowid(wid, widmethod, groupname, callback) {

        proxyprinttodiv('Function addgrouptowid done --starting ' + groupname + ' for wid ' + wid + " >>>> ", wid, 39);

        execute([{
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": widmethod,
                "systemdto.groupdto.groupname": groupname
            }],
            function (err, res) {
                // proxyprinttodiv('Function addgrouptowid done --added group ' + groupname + ' for wid ' + wid + " >>>> ", wid, 39);

                // console.debug('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));

                callback(err, res)
            });
    }

    exports.addpermission = addpermission = function addpermission(userwid, granteegroup, actiongroup, actiontypegroup, dbgroup, levelgroup, callback) {
        execute([{
                // add permissions as per given information for given user wid
                "executethis": "addwidmaster",
                "wid": userwid,


                "manytomany": actiongroup,
                "manytomany": actiontypegroup,
                "manytomany": granteegroup,
                "manytomany": dbgroup,
                "manytomany": "collection"

                // "execute" actiontype  ,for group "driemployee", for action "getwidmaster", for "data"

                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": userwid
            }],
            function (err, res) {
                // proxyprinttodiv('Function createuser done --  >>>>>> added permission >>>>>  for  -- ' + userwid, res, 39);
                // proxyprinttodiv('from getwidmaster  -- ' + userwid, res[1], 39);
                // console.debug('added permission data ' + granteegroup + ' for user ' + userwid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }

    exports.createcateogry = createcateogry = function createcateogry(wid, widmethod, categorytype, categoryname, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": widmethod,
                // category data
                "systemdto.categorydto.categorytype": categorytype,
                "systemdto.categorydto.categoryname": categoryname
            }],
            function (err, res) {
                proxyprinttodiv('Function createcateogry done --  >>>>>> added category >>>>>  for  -- ' + wid, res, 39);
                // console.debug('added categoryname ' + categoryname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }


    exports.addsecurity = addsecurity = function addsecurity(wid, accesstoken, loginlevel, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": wid,
                // security data
                "metadata.method": "userdto",
                "systemdto.securitydto.accesstoken": accesstoken,
                "systemdto.securitydto.level": loginlevel,
            }],
            function (err, res) {
                proxyprinttodiv('Function addsecurity --  >>>>>> added security  >>>>>  for  -- ' + wid, res, 39);
                // console.debug('added security for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }



    //     getusergroups
    // that calls getusergroupsdefault, getusergroupsrecurse and adds them together
    exports.getusergroups = getusergroups = function getusergroups(userwid, callback) {
        execute([{
                // getwidmaster on passed user
                "executethis": "getwidmaster",
                "wid": userwid,
                // permissions data 
                "metadata.method": "permissiondto"
            }],
            function (err, res) {
                proxyprinttodiv('Function getusergroups >>>>>  for  -- ' + userwid, res, 39);
                callback(err, res)
            });
    }




    //***************************************************************************************
    // et-security
    //***************************************************************************************






    exports.securitycheck = securitycheck = function securitycheck(_accesstoken, _mygroup, _actiongroup, _dbgroup, _loginlevel, callback) {
        proxyprinttodiv('Function securitytest accesstoken-- ', _accesstoken, 39);
        proxyprinttodiv('Function securitytest mygroup-- ', _mygroup, 39);
        proxyprinttodiv('Function securitytest actiongroup-- ', _actiongroup, 39);
        proxyprinttodiv('Function securitytest dbgroup-- ', _dbgroup, 39);
        proxyprinttodiv('Function securitytest _loginlevel-- ', _loginlevel, 39);

        var userGroupWid;
        var userDto;

        async.series([
            function (cb1) {
                //  if no myAccount then get AC, get my loginlevel
                // if mygroup not sent in then convert AC to my userwid (mygroup)
                if (!_mygroup) {
                    getuserbyac(_accesstoken, function (err, userDto) {
                        userDto = userDto;
                        proxyprinttodiv('>>> Function securitytest userDto-- ', userDto, 39);
                        userGroupWid = userDto["systemdto.groupdto.groupname"];
                        cb1(null);
                    });
                } else {
                    userGroupWid = _mygroup;
                    cb1(null);
                }
            },
            function (cb1) {
                // find where user111 is mentioned ... recurse on that result
                // get default usergroups for user 111 
                // add calculated + default groups for user 111
                getusergroups(userGroupWid.wid, function (err, res) {
                    proxyprinttodiv('>>> Function securitytest res-- ', res, 39);

                    cb1(null);
                });
            }

        ], function (err, res) {
            callback(err, res); // TODO :: FIX this
        });
    }

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