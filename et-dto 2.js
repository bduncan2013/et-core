(function (window) {
    // Creating groupdto, securitydto, statusdto and balanceddto
    // securitydto holds accesstoken, status
    // groupdto holds group, each wid auto lists itself and its creator
    // permissions holds grantorwid, granteegroup, actiongroup, targetgroup
    // 
    // this test shall result in an unauthorized access error
    // we create testdata stuff1 and provide access to it to only staff group memners
    // however we try to access it (using getwidmaster) using admin group user


    exports.createtest101 = createtest101 = function createtest101() {
        // create the serveractiondto
        execute([{
            "executethis": "addwidmaster",
            "wid": "serveractiondto",
            "metadata.method": "serveractiondto",
            "metadata.serveractiondto.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the actiondto
            "executethis": "addwidmaster",
            "wid": "actiondto",
            "metadata.method": "actiondto",
            "metadata.serveractiondto.type": "manytoone",
            "metadata.localactiondto.type": "manytoone",
            //"actionname":"string",
            //"actiontype":"string",
            //"dothis":"string",
            //"parameters":"string",
            //"offlineonline":"string",
            //"localserver":"string",
            //"oncreate":"string",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }]);
    }


    exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {
        // Create DTOs
        execute([{
            "executethis": "addwidmaster",
            "wid": "dtodefault",
            "metadata.method": "dtodefault",
            "metadata.system.creator": "driwid",
            "metadata.system.creationdate": "3/9/2014",
            "metadata.system.expirationtimer": "10000",
            "metadata.system.expirationdate": "12/31/2999",
            "metadata.system.db": "data",
            "metadata.system.collection": "dri",
            "metadata.system.type": ""
        }, {
            // Create the dtooverride
            "executethis": "addwidmaster",
            "wid": "dtooverride",
            "metadata.method": "dtodefault",
            "metadata.system.creator": "driwid",
            "metadata.system.creationdate": "3/9/2014",
            "metadata.system.expirationtimer": "10000",
            "metadata.system.expirationdate": "12/31/2999",
            "metadata.system.db": "data",
            "metadata.system.collection": "dri",
            "metadata.system.type": "",
            "metadata.interfacedto.type": "manytoone",
            "metadata.executeactiondto.type": "manytoone",
            "metadata.getactiondto.type": "manytoone",
            "metadata.editactiondto.type": "manytoone",
            "metadata.deleteactiondto.type": "manytoone",
            "metadata.addactiondto.type": "manytoone",
            "metadata.groupdto.type": "manytoone",
        }, {
            // Create a default actionset
            "executethis": "addwidmaster",
            "wid": "defaultactionset",
            "metadata.method": "actionsetdto",
            "executetype": "ex",
            "gettype": "get",
            "addtype": "add",
            "edittype": "ed",
            "deletetype": "del"
        }, {
            // securitydatadto
            "executethis": "addwidmaster",
            "wid": "securitydatadto",
            "metadata.method": "securitydatadto",
            "ac": "string",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // viewdto
            "executethis": "addwidmaster",
            "wid": "viewdto",
            "metadata.method": "viewdto",
            "html": "string",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // basedto
            "executethis": "addwidmaster",
            "wid": "basedto",
            "metadata.method": "basedto",
            "html": "string",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // backdto
            "executethis": "addwidmaster",
            "wid": "backdto",
            "metadata.method": "backdto",
            "html": "string",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // interfacedto
            "executethis": "addwidmaster",
            "wid": "interfacedto",
            "metadata.method": "interfacedto",
            "metadata.viewdto.type": "manytoone",
            "metadata.backdto.type": "manytoone",
            "metadata.basedto.type": "manytoone",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // Create the errorobjectdto
            "executethis": "addwidmaster",
            "wid": "errorobjectdto",
            "metadata.method": "errorobjectdto",
            "evalerror": "string",
            "rangeerror": "string",
            "referenceerror": "string",
            "syntaxerror": "string",
            "typeerror": "string",
            "urlerror": "string",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // create the passdto
            "executethis": "addwidmaster",
            "wid": "passdto",
            "metadata.method": "passdto",
            "log": "boolean",
            "metadata.inherit.override": "[dtooverride]",
            "metadata.inherit.default": "[dtodefault]"
        }, {
            // create the faildto
            "executethis": "addwidmaster",
            "wid": "faildto",
            "metadata.method": "faildto",
            "log": "boolean",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the validatedto
            "executethis": "addwidmaster",
            "wid": "validatedto",
            "metadata.method": "validatedto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the resultdto
            "executethis": "addwidmaster",
            "wid": "resultdto",
            "metadata.method": "resultdto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the errordto
            "executethis": "addwidmaster",
            "wid": "errordto",
            "metadata.method": "errordto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the beforedto
            "executethis": "addwidmaster",
            "wid": "beforedto",
            "metadata.method": "beforedto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the afterdto
            "executethis": "addwidmaster",
            "wid": "afterdto",
            "metadata.method": "afterdto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the executedto
            "executethis": "addwidmaster",
            "wid": "executedto",
            "metadata.method": "executedto",
            "executeid": "string",
            "oncreate": "string",
            "executeorder": "string",
            "tryorder": "string",
            "dothis": "string",
            "parameters": "string",
            "metadata.passdto.type": "onetomany",
            "metadata.faildto.type": "onetomany",
            "metadata.validatedto.type": "onetoone",
            "metadata.resultdto.type": "onetoone",
            "metadata.errordto.type": "onetoone",
            "metadata.beforedto.type": "manytoone",
            "metadata.afterdto.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the logobject
            "executethis": "addwidmaster",
            "wid": "logobject",
            "metadata.method": "executedto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the gettypedto
            "executethis": "addwidmaster", // <-- this wid might not be needed
            "wid": "gettypedto",
            "metadata.method": "gettypedto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the addtypedto
            "executethis": "addwidmaster",
            "wid": "addtypedto",
            "metadata.method": "addtypedto",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the offlineactiondto
            "executethis": "addwidmaster",
            "wid": "offlineactiondto",
            "metadata.method": "offlineactiondto",
            "metadata.executedto.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the onlineactiondto
            "executethis": "addwidmaster",
            "wid": "onlineactiondto",
            "metadata.method": "onlineactiondto",
            "metadata.executedto.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the localactiondto
            "executethis": "addwidmaster",
            "wid": "localactiondto",
            "metadata.method": "localactiondto",
            "metadata.onlineaction.type": "manytoone",
            "metadata.offlineaction.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the serveractiondto
            "executethis": "addwidmaster",
            "wid": "serveractiondto",
            "metadata.method": "serveractiondto",
            "metadata.serveractiondto.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // create the actiondto
            "executethis": "addwidmaster",
            "wid": "actiondto",
            "metadata.method": "actiondto",
            "metadata.serveractiondto.type": "manytoone",
            "metadata.localactiondto.type": "manytoone",
            //"actionname":"string",
            //"actiontype":"string",
            //"dothis":"string",
            //"parameters":"string",
            //"offlineonline":"string",
            //"localserver":"string",
            //"oncreate":"string",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the executeactiondto
            "executethis": "addwidmaster",
            "wid": "executeactiondto",
            "metadata.method": "executeactiondto",
            "metadata.actiondto.type": "onetoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the getactiondto
            "executethis": "addwidmaster",
            "wid": "getactiondto",
            "metadata.method": "getactiondto",
            "metadata.actiondto.type": "onetoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the editactiondto
            "executethis": "addwidmaster",
            "wid": "editactiondto",
            "metadata.method": "editactiondto",
            "metadata.actiondto.type": "onetoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the addactiondto
            "executethis": "addwidmaster",
            "wid": "addactiondto",
            "metadata.method": "addactiondto",
            "metadata.actiondto.type": "onetoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the deleteactiondto
            "executethis": "addwidmaster",
            "wid": "deleteactiondto",
            "metadata.method": "deleteactiondto",
            "metadata.actiondto.type": "onetoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the permissiondto		
            "executethis": "addwidmaster",
            "wid": "permissiondto",
            "metadata.method": "permissiondto",
            "level": "string",
            "metadata.actiontype.type":"manytomany", // <-- no more? // **** Change by saurabh
            "metadata.usergroup.type":"manytomany", // <-- no more?// **** Change by saurabh
            "db":"string",// **** Change by saurabh
            "collection":"string",// **** Change by saurabh
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault",
        }, {
            // Create the environmentdto
            "executethis": "addwidmaster",
            "metadata.method": "environmentdto",
            "wid": "environmentdto",
            "ac": "string",
            "gps": "string",
            "account": "string",
            "db": "string",
            "collection": "collection",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the securitydto
            "executethis": "addwidmaster",
            "metadata.method": "securitydto",
            "wid": "securitydto",
            "accesstoken": "string",
            //"status": "integer"
            "status": "string",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the groupdto		
            "executethis": "addwidmaster",
            "wid": "groupdto",
            "metadata.method": "groupdto",
            "groupname": "string",
            "metadata.groupdto.type": "onetomany",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the actiongroupdto		
            "executethis": "addwidmaster",
            "wid": "actiongroupdto",
            "metadata.method": "actiongroupdto",
            "actiongroupname": "string",
            "metadata.executeactiondto.type": "manytoone",
            "metadata.getactiondto.type": "manytoone",
            "metadata.editactiondto.type": "manytoone",
            "metadata.deleteactiondto.type": "manytoone",
            "metadata.addactiondto.type": "manytoone",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
            // Create the usergroupdto		
            "executethis": "addwidmaster",
            "wid": "usergroupdto",
            "metadata.method": "usergroupdto",
            "groupname": "string",
            "metadata.userdto.type": "manytomany",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }, {
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
            "metadata.securitydto.type": "onetoone",
            "metadata.environmentdto.type": "onetoone",
            "metadata.permissiondto.type": "onetomany",
            "metadata.inherit.override": "dtooverride",
            "metadata.inherit.default": "dtodefault"
        }]);

        createrelationship("interfacedto", "viewdto", "manytoone");
        createrelationship("interfacedto", "backdto", "manytoone");
        createrelationship("interfacedto", "basedto", "manytoone");
        createrelationship("passdto", "logobjectdto", "onetoone");
        createrelationship("faildto", "logobjectdto", "onetoone");
        createrelationship("executedto", "passdto", "onetomany");
        createrelationship("executedto", "faildto", "onetomany");
        createrelationship("executedto", "beforedto", "manytoone");
        createrelationship("executedto", "afterdto", "manytoone");
        createrelationship("executedto", "validatedto", "onetoone");
        createrelationship("executedto", "resultdto", "onetoone");
        createrelationship("executedto", "errorobjectdto", "manytoone");
        createrelationship("onlineactiondto", "executedto", "manytoone");
        createrelationship("offlineactiondto", "executedto", "manytoone");
        createrelationship("localactiondto", "onlineactiondto", "manytoone");
        createrelationship("localactiondto", "offlineactiondto", "manytoone");
        createrelationship("serveractiondto", "serveractiondto", "manytoone");
        createrelationship("actiondto", "localactiondto", "manytoone");
        createrelationship("actiondto", "serveractiondto", "manytoone");
        createrelationship("executeactiondto", "actiondto", "onetoone");
        createrelationship("getactiondto", "actiondto", "onetoone");
        createrelationship("editactiondto", "actiondto", "onetoone");
        createrelationship("addactiondto", "actiondto", "onetoone");
        createrelationship("deleteactiondto", "actiondto", "onetoone");
        createrelationship("groupddto", "groupdto", "onetomany");
        createrelationship("userdto", "securitydto", "onetoone");
        createrelationship("userdto", "environmentdto", "onetoone");
        createrelationship("userdto", "permissiondto", "onetomany");
        createrelationship("userdto", "usergroupdto", "onetomany");
        createrelationship("usergroupdto", "userdto", "manytomany");
        createrelationship("actiongroupdto", "executeactiondto", "manytoone");
        createrelationship("actiongroupdto", "getactiondto", "manytoone");
        createrelationship("actiongroupdto", "editactiondto", "manytoone");
        createrelationship("actiongroupdto", "deleteactiondto", "manytoone");
        createrelationship("actiongroupdto", "addactiondto", "manytoone");
    }

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
    }


    // create defaultdto and overridedto wids
    exports.createcommondata = createcommondata = function createcommondata(callback) {

        var creatorwid = "driwid";
        var expirationtimer = "10000";
        var creationdate = "3/9/2014";
        var expirationdate = "12/31/2999";
        var expirationdate = "12/31/2999";
        var db = "data";
        var collectionname = "dri";


        execute([{
            // create defaultdto data
            "executethis": "addwidmaster",
            "metadata.method": "defaultdto",
            "metadata.system.creator": creatorwid,
            "metadata.system.creationdate": creationdate,
            "metadata.system.expirationtimer": expirationtimer,
            "metadata.system.expiratondate": expirationdate,
            "metadata.system.db": db,
            "metadata.system.collection": collectionname


            // TODO :: ADD systemdto/overridedto data add logic below
            // },{
            //  // create overridedto data
            //     "executethis": "addwidmaster",
            //     "metadata.method": "defaultdto",
            //     "metadata.system.creator": creatorwid,
            //     "metadata.system.creationdate": creationdate,
            //     "metadata.system.expirationtimer": expirationtimer,
            //     "metadata.system.expiratondate": expirationdate,
            //     "metadata.system.db": db,
            //     "metadata.system.collection": collectionname
        }], callback);
    }


    // create createuserdata wid data
    exports.createuserdata = createuserdata = function createuserdata(userobj, securityobj, environmentobj, permissionobj, overrideobj, defaultobj, callback) {

        var creatorwid = "driwid";
        var expirationtimer = "10000";
        var creationdate = "3/9/2014";
        var expirationdate = "12/31/2999";
        var expirationdate = "12/31/2999";
        var db = "data";
        var collectionname = "dri";


        async.series([
            function (cb1) {
                // create userdto data
                execute({
                    "executethis": "addwidmaster",
                    "metadata.method": "userdto",
                    "wid": userobj.wid,
                    "fname": userobj.fname,
                    "lname": userobj.fname,
                    "phone": userobj.fname,
                    "email": userobj.fname,
                    "address": userobj.fname,
                    "address2": userobj.fname,
                    "city": userobj.fname,
                    "state": userobj.fname,
                    "zip": userobj.fname,
                    "country": userobj.fname
                }, function (err, res) {
                    cb1(null, "userdto");
                });
            },
            function (cb1) {
                // create environmentdto data
                execute({
                    "executethis": "addwidmaster",
                    "metadata.method": userobj.wid,
                    "metadata.environmentdto.ac": environmentobj.ac,
                    "metadata.environmentdto.gps": environmentobj.gps,
                    "metadata.environmentdto.account": environmentobj.account,
                    "metadata.environmentdto.db": environmentobj.db,
                    "metadata.environmentdto.collection": environmentobj.collection,
                    "metadata.environmentdto.ac": environmentobj.ac
                }, function (err, res) {
                    cb1(null, "environmentdto");
                });
            },
            function (cb1) {
                // create securitydto data
                addsecurity(userobj.wid, securityobj, function (err, res) {
                    cb1(null, "securitydto");
                });
            },
            function (cb1) {
                // create dtooverride data
                addsecurity(userobj.wid, securityobj, function (err, res) {
                    cb1(null, "dtooverride");
                });
            },
            function (cb1) {
                // add defaultobj and overrideobj associations
                execute({
                    "executethis": "addwidmaster",
                    "metadata.method": userobj.wid,
                    "metadata.inherit.override": overrideobj.wid,
                    "metadata.inherit.default": defaultobj.wid
                }, function (err, res) {
                    cb1(null, "defaultobj && overrideobj");
                });
            }
        ], function (err, res) {
            callback(err, res);
        });
    }


    exports.createdefaultgroups = createdefaultgroups = function createdefaultgroups() {

        execute([{
                "executethis": "addwidmaster",
                "wid": "employees_grp",
                "metadata.method": "groupdto",
                "groupname": "employees"
            };
            //Create the 
            {
                "executethis": "addwidmaster",
                "wid": "managers_grp",
                "metadata.method": "groupdto",
                "groupname": "managers")
        ]);
    }

    exports.creategroup = creategroup = function creategroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "groupnamedto",
            "groupname": groupname
        }], function (err, res) {
            // proxyprinttodiv('Function creategroup relationships -- added all this -- ', res, 99);
            callback(err, res);
        });
    }


    exports.addgrouptowid = addgrouptowid = function addgrouptowid(wid, widmethod, groupname, callback) {

        proxyprinttodiv('Function addgrouptowid done --starting ' + groupname + ' for wid ' + wid + " >>>> ", wid, 39);

        execute([{
                "executethis": "addwidmaster",
                "wid": wid,
                "metadata.method": widmethod,
                "systemdto.groupdto.groupname": groupname,
            }],
            function (err, res) {
                // proxyprinttodiv('Function addgrouptowid done --added group ' + groupname + ' for wid ' + wid + " >>>> ", wid, 39);

                // console.debug('added group ' + groupname + ' for wid ' + wid + " >>>> " + JSON.stringify(res));

                callback(err, res)
            });
    }

    exports.addpermission = addpermission = function addpermission(userwid, granteegroup, actiongroup, actiontypegroup, dbgroup, levelgroup, callback) {
        execute([{
                // add permissions as per given information 
                "executethis": "addwidmaster",
                "wid": userwid,
                // permissions data 
                "metadata.method": "userdto",
                "systemdto.permissiondto.granteegroup": granteegroup,
                "systemdto.permissiondto.actiongroup": actiongroup,
                "systemdto.permissiondto.actiontypegroup": actiontypegroup,
                "systemdto.permissiondto.dbgroup": dbgroup,
                "systemdto.permissiondto.levelgroup": levelgroup
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






})(typeof window == "undefined" ? global : window); * //