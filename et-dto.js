// copyright (c) 2014 DRI
(function (window) {
    // Creating groupdto, securitydto, statusdto and balanceddto
    // securitydto holds accesstoken, status
    // groupdto holds group, each wid auto lists itself and its creator
    // permissions holds grantorwid, granteegroup, actiongroup, targetgroup
    // 
    // this test shall result in an unauthorized access error
    // we create testdata stuff1 and provide access to it to only staff group memners
    // however we try to access it (using getwidmaster) using admin group user


    // This function creates the "critical dtos"
    exports.createalldtos = createalldtos = function createalldtos(params, callback) {

        async.series([
                function (cb1) {
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
                        // securitydatadto
                        "executethis": "addwidmaster",
                        "wid": "securitydatadto",
                        "metadata.method": "securitydatadto",
                        "ac": "string",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the offlineactiondto
                        "executethis": "addwidmaster",
                        "wid": "offlineactiondto",
                        "metadata.method": "offlineactiondto",
                        "metadata.executedto.type": "manytoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the onlineactiondto
                        "executethis": "addwidmaster",
                        "wid": "onlineactiondto",
                        "metadata.method": "onlineactiondto",
                        "metadata.executedto.type": "manytoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the localactiondto
                        "executethis": "addwidmaster",
                        "wid": "localactiondto",
                        "metadata.method": "localactiondto",
                        "metadata.onlineaction.type": "manytoone",
                        "metadata.offlineaction.type": "manytoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the serveractiondto
                        "executethis": "addwidmaster",
                        "wid": "serveractiondto",
                        "metadata.method": "serveractiondto",
                        "metadata.serveractiondto.type": "manytoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
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
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the executeactiondto
                        "executethis": "addwidmaster",
                        "wid": "executeactiondto",
                        "metadata.method": "executeactiondto",
                        "metadata.actiondto.type": "onetoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the getactiondto
                        "executethis": "addwidmaster",
                        "wid": "getactiondto",
                        "metadata.method": "getactiondto",
                        "metadata.actiondto.type": "onetoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the editactiondto
                        "executethis": "addwidmaster",
                        "wid": "editactiondto",
                        "metadata.method": "editactiondto",
                        "metadata.actiondto.type": "onetoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the addactiondto
                        "executethis": "addwidmaster",
                        "wid": "addactiondto",
                        "metadata.method": "addactiondto",
                        "metadata.actiondto.type": "onetoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the deleteactiondto
                        "executethis": "addwidmaster",
                        "wid": "deleteactiondto",
                        "metadata.method": "deleteactiondto",
                        "metadata.actiondto.type": "onetoone",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the permissiondto     
                        "executethis": "addwidmaster",
                        "wid": "permissiondto",
                        "metadata.method": "permissiondto",
                        "level": "string",
                        "metadata.actiongroup.type": "manytomany", // **** NEED TO CHECK :: ADDED BY SAURABH
                        "metadata.usergroup.type": "manytomany", // **** NEED TO CHECK :: ADDED BY SAURABH
                        // "metadata.actiongroup":"string", // **** NEED TO CHECK :: ADDED BY SAURABH
                        // "metadata.usergroup":"string",// **** NEED TO CHECK :: ADDED BY SAURABH
                        "metadata.db": "string", // **** NEED TO CHECK :: ADDED BY SAURABH
                        "metadata.collection": "string", // **** NEED TO CHECK :: ADDED BY SAURABH
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
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
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the securitydto
                        "executethis": "addwidmaster",
                        "metadata.method": "securitydto",
                        "wid": "securitydto",
                        "accesstoken": "string",
                        //"status": "integer"
                        "status": "string",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the groupdto      
                        "executethis": "addwidmaster",
                        "wid": "groupdto",
                        "metadata.method": "groupdto",
                        "groupname": "string",
                        "metadata.groupdto.type": "onetomany",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
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
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the usergroupdto      
                        "executethis": "addwidmaster",
                        "wid": "usergroupdto",
                        "metadata.method": "usergroupdto",
                        "groupname": "string",
                        "metadata.userdto.type": "manytomany",
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
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
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }], function (err, res) {
                        proxyprinttodiv('Function createalldtos -- added all schemas  -- ', res, 13);
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("onlineactiondto", "executedto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("offlineactiondto", "executedto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("localactiondto", "onlineactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("localactiondto", "offlineactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("serveractiondto", "serveractiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiondto", "localactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiondto", "serveractiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("executeactiondto", "actiondto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("getactiondto", "actiondto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("editactiondto", "actiondto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("addactiondto", "actiondto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("deleteactiondto", "actiondto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("groupddto", "groupdto", "onetomany", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("userdto", "securitydto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("userdto", "environmentdto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("userdto", "permissiondto", "onetomany", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("userdto", "usergroupdto", "onetomany", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("usergroupdto", "userdto", "manytomany", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiongroupdto", "executeactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiongroupdto", "getactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiongroupdto", "editactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiongroupdto", "deleteactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiongroupdto", "addactiondto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                }
                // ,
                // function (cb1) {
                // //createrelationship("permissiondto","actiontypedto","manytomany", function (err, res) {
                //         cb1(null);
                //     });
                // },

                // function (cb1) {
                // //createrelationship("permissiondto","granteegroupdto","manytomany", function (err, res) {
                //         cb1(null);
                //     });
                // },

                // function (cb1) {
                // //createrelationship("permissiondto","dbdto","manytomany", function (err, res) {
                //         cb1(null);
                //     });
                // },

                // function (cb1) {
                // //createrelationship("permissiondto","collectiondto","manytomany", function (err, res) {
                //         cb1(null);
                //     });
            ],

            function (err, res) {
                proxyprinttodiv('Function createalldtos -- added all relationships  -- ', res, 13);
                callback(err, res);
            });
    }

    // This function creates non-critical dtos, e.g. interfacedto. However, some of
    // the critical dtos have relationships with non-critical dtos.
    exports.noncriticaldtos = noncriticaldtos = function noncriticaldtos(callback) {


        async.series([
                function (cb1) {
                    execute([{ // viewdto
                        "executethis": "addwidmaster",
                        "wid": "viewdto",
                        "metadata.method": "viewdto",
                        "html": "string",
                        "metadata.inherit.override": "dtooverride",
                        "metadata.inherit.default": "dtodefault"
                    }, {
                        // basedto
                        "executethis": "addwidmaster",
                        "wid": "basedto",
                        "metadata.method": "basedto",
                        "html": "string",
                        "metadata.inherit.override": "dtooverride",
                        "metadata.inherit.default": "dtodefault"
                    }, {
                        // backdto
                        "executethis": "addwidmaster",
                        "wid": "backdto",
                        "metadata.method": "backdto",
                        "html": "string",
                        "metadata.inherit.override": "dtooverride",
                        "metadata.inherit.default": "dtodefault"
                    }, {
                        // interfacedto
                        "executethis": "addwidmaster",
                        "wid": "interfacedto",
                        "metadata.method": "interfacedto",
                        "metadata.viewdto.type": "manytoone",
                        "metadata.backdto.type": "manytoone",
                        "metadata.basedto.type": "manytoone",
                        "metadata.inherit.override": "dtooverride",
                        "metadata.inherit.default": "dtodefault"
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
                        "metadata.inherit.override": "dtooverride",
                        "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the passdto
                        "executethis": "addwidmaster",
                        "wid": "passdto",
                        "metadata.method": "passdto",
                        "log": "boolean",
                        "metadata.inherit.override": "dtooverride",
                        "metadata.inherit.default": "dtodefault"
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
                        // Create a default actionset
                        "executethis": "addwidmaster",
                        "wid": "defaultactionset",
                        "metadata.method": "actionsetdto",
                        "executetype": "ex",
                        "gettype": "get",
                        "addtype": "add",
                        "edittype": "ed",
                        "deletetype": "del"
                    }], function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("interfacedto", "viewdto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("interfacedto", "backdto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("interfacedto", "basedto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("passdto", "logobjectdto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("faildto", "logobjectdto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "passdto", "onetomany", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "faildto", "onetomany", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "beforedto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "afterdto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "validatedto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "resultdto", "onetoone", function (err, res) {
                        cb1(null);
                    });
                },
                function (cb1) {
                    createrelationship("executedto", "errorobjectdto", "manytoone", function (err, res) {
                        cb1(null);
                    });
                }
            ],
            function (err, res) {
                proxyprinttodiv('Function noncriticaldtos -- added all relationships  -- ', res, 13);
                callback(err, res);
            });
    }


    // create the defaultgroups 
    exports.createdefaultgroups = createdefaultgroups = function createdefaultgroups() {

        execute([{
                "executethis": "addwidmaster",
                "wid": "employees_grp",
                "metadata.method": "groupdto",
                "groupname": "employees"
            },
            //Create the 
            {
                "executethis": "addwidmaster",
                "wid": "managers_grp",
                "metadata.method": "groupdto",
                "groupname": "managers"
            }
        ], function (err, res) {
            proxyprinttodiv('Function createdefaultgroups -- added 2 groups  -- ', res, 13);
            callback(err, res);
        });
    }

    // ** GENERIC FUNCTION TO CREATE COMMON(default and override) DATA **
    // create defaultdto and overridedto wids -- NOT USED CURRENTLY
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
            "system.creator": creatorwid,
            "system.creationdate": creationdate,
            "system.expirationtimer": expirationtimer,
            "system.expiratondate": expirationdate,
            "system.db": db,
            "system.collection": collectionname


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

    // ** GENERIC FUNCTION TO CREATE A USER WID ON THE BASIS OF RECEIVED DATA **
    // create createuserdata wid data and associated relationships
    exports.createuserdata = createuserdata = function createuserdata(userobj, securityobj, overrideobj, defaultobj, callback) {

        async.series([
            function (cb1) {
                // create userdto data
                execute({
                    "executethis": "addwidmaster",
                    "metadata.method": "userdto",
                    "wid": userobj.wid,
                    "fname": userobj.fname,
                    "lname": userobj.lname,
                    "phone": userobj.phone,
                    "email": userobj.email,
                    "address": userobj.address,
                    "address2": userobj.address2,
                    "city": userobj.city,
                    "state": userobj.state,
                    "zip": userobj.zip,
                    "country": userobj.country
                }, function (err, res) {
                    cb1(null, "userdto");
                });
            },
            // function (cb1) {
            //     // create environmentdto data
            //     addenvironment(userobj, environmentobj, function (err, res) {
            //         cb1(null, "environmentobj");
            //     });
            // },
            // ,
            // function (cb1) {
            //     // add defaultobj and overrideobj associations
            //     execute({
            //         "executethis": "addwidmaster",
            //         "metadata.method": userobj.wid,
            //         "metadata.inherit.override": overrideobj.wid,
            //         "metadata.inherit.default": defaultobj.wid
            //     }, function (err, res) {
            //         cb1(null, "defaultobj && overrideobj");
            //     });
            // }
        ], function (err, res) {
            // create securitydto data
            proxyprinttodiv('Function createuserdata -- added getwidmaster on user  -- ' + userobj.wid, res, 13);
            callback(err, res);
        });
    }

    // ** GENERIC FUNCTION TO ADD ENVIRONMENT DATA TO A USER WID ON THE BASIS OF RECEIVED DATA **
    // logic to assign environment to a user -- taking the groupname 
    exports.addenvironment = addenvironment = function addenvironment(userobj, environmentobj, callback) {

        execute({
            "executethis": "addwidmaster",
            "metadata.method": userobj.wid,
            "environmentdto.ac": environmentobj.ac,
            "environmentdto.gps": environmentobj.gps,
            "environmentdto.account": environmentobj.account,
            "environmentdto.db": environmentobj.db,
            "environmentdto.collection": environmentobj.collection
        }, function (err, res) {
            proxyprinttodiv('Function addenvironment -- added environment to user  -- ' + userobj.wid, res, 13);
            callback(null, "environmentdto");
        });
    }

    // ** GENERIC FUNCTION TO CREATE A GROUP ON THE BASIS OF RECEIVED DATA **
    // logic to create a group -- taking the groupname 
    exports.creategroup = creategroup = function creategroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "groupdto",
            "usergroupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function creategroup -- added group  -- ', groupname, 13);

            callback(err, res);
        });
    }


    // ** GENERIC FUNCTION TO CREATE A USER GROUP ON THE BASIS OF RECEIVED DATA **
    // logic to create a group -- taking the groupname 
    exports.createusergroup = createusergroup = function createusergroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "usergroupdto",
            "usergroupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function createusergroup -- added user group  -- ', groupname, 13);

            callback(err, res);
        });
    }



    // ** GENERIC FUNCTION TO CREATE AN ACTION GROUP ON THE BASIS OF RECEIVED DATA **
    // logic to create a group -- taking the groupname 
    exports.createactiongroup = createactiongroup = function createactiongroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": "actiongroupdto",
            "actiongroupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function createactiongroup -- added actiongroup  -- ', groupname, 13);

            callback(err, res);
        });
    }

    // ** GENERIC FUNCTION TO ADD A RELATIONSHIP BETWEEN TWO WID TYPES ON THE BASIS OF RECEIVED DATA **
    // create relationship function
    exports.createrelationship = createrelationship = function createrelationship(primarywid, secondarywid, linktype, callback) {

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
        }], function (err, res) {
            proxyprinttodiv('Function createrelationship -- added relationship for  -- ' + primarywid + ' >> ' + secondarywid, linktype, 13);
            callback(err, res);
        });

        // alert('done creating relationship');
    }


    // ** GENERIC FUNCTION TO ADD A RELATIONSHIP BETWEEN TWO WID TYPES ON THE BASIS OF RECEIVED DATA **
    // add permission
    exports.addpermission = addpermission = function addpermission(userobj, permissionobjArr, callback) {
        async.mapSeries(permissionobjArr, function (permissionobj, cbMap) {
            // add each permission to the user
            execute([{
                    // add permissions as per given information 
                    "executethis": "addwidmaster",
                    "wid": userobj.wid,
                    // permissions data 
                    "metadata.method": "userdto",
                    "permissiondto.usergroup.usergroupname": permissionobj.usergroup,
                    "permissiondto.actiongroup.actiongroupname": permissionobj.actiongroup,
                    "permissiondto.dbgroup": permissionobj.dbgroup,
                    "permissiondto.levelgroup": permissionobj.levelgroup

                }],
                function (err, res) {
                    cbMap(null);
                });
        }, function (err, res) {
            proxyprinttodiv('Function createuser done --  >>>>>> added permission >>>>>  for  -- ' + userobj.wid, res, 13);
            callback(err, res);
        });
    }

    // ** GENERIC FUNCTION TO ADD A SECURITY DATA FOR A USER WID ON THE BASIS OF RECEIVED DATA **
    // add security data
    exports.addsecurity = addsecurity = function addsecurity(userobj, securityobj, callback) {
        execute([{
                // add group as per given wid 
                "executethis": "addwidmaster",
                "wid": userobj.wid,
                // security data
                "metadata.method": "userdto",
                "securitydto.accesstoken": securityobj.ac
            }],
            function (err, res) {
                proxyprinttodiv('Function addsecurity --  >>>>>> added security  >>>>>  for  -- ' + userobj.wid, res, 13);
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


    // 1st test for new security stuff
    exports.asap = asap = function asap(parm, callback) {

        debuglevel = 39;

        // roger user data
        var userobj = {};
        userobj['wid'] = "rogeruser";
        userobj['fname'] = "Roger";
        userobj['lname'] = "Colburn";
        userobj['phone'] = "987-383-8958";
        userobj['email'] = "roger@d.com";
        userobj['address'] = "112";
        userobj['address2'] = "Donald Lynch Blvd";
        userobj['city'] = "Marlborough";
        userobj['state'] = "Massachusetts";
        userobj['zip'] = "17502";
        userobj['country'] = "US";

        // environment data
        var environmentobj = {};
        environmentobj['ac'] = 'ac';
        environmentobj['gps'] = 'gpsval';
        environmentobj['account'] = 'default';
        environmentobj['db'] = 'data';
        environmentobj['collection'] = 'maincollection';

        // rogeruser permissions data
        var permissionsobjarr1 = [{
            "usergroup": "drimanagers",
            "actiongroup": "addwidmaster",
            "levelgroup": 99,
            "dbgroup": "data"
        }, {
            "usergroup": "driusers",
            "actiongroup": "getwidmaster",
            "levelgroup": 99,
            "dbgroup": "data"
        }];

        // default data -- override
        var overrideobj = {};
        overrideobj['wid'] = 'overridedataobjwid';

        // default data -- default
        var defaultobj = {};
        defaultobj['wid'] = 'defaultobjwid';

        var securityobj = {};
        securityobj['ac'] = "rogerac";

        async.series([
                function (cb) {
                    createalldtos(null, function (err, res) {
                        cb(null, "system dtos created")
                    });
                },

                function (cb) {
                    noncriticaldtos(function (err, res) {
                        cb(null, "non critical dtos created")
                    });
                },

                function (cb) {
                    createuserdata(userobj, securityobj, overrideobj, defaultobj, function (err, res) {
                        proxyprinttodiv('Function asap >>>>>  res', res, 39);
                        cb(null, "userdata");
                    });
                },
                //add security data
                function (cb1) {
                    // create securitydto data
                    addsecurity(userobj, securityobj, function (err, res) {
                        cb1(null, "securitydto");
                    });
                }
                // ,
                // function (cb) {
                //     addenvironment(userobj, environmentobj, function (err, res) {
                //         proxyprinttodiv('Function asap >>>>> added environment >>> res', res, 39);
                //         cb(null, "userdata");
                //     });
                // },
                // // adding usergroups
                // function (cb) {
                //     var usergroup1 = {
                //         "usergroupname": "driusers"
                //     };

                //     createusergroup(usergroup1, function (err, res) {
                //         proxyprinttodiv('Function asap >>>>> added group for >>> ' + usergroup1, res, 39);
                //         cb(null, "usergroup1");
                //     });
                // },
                // function (cb) {
                //     var usergroup2 = {
                //         "usergroupname": "drimanagers"
                //     };

                //     createusergroup(usergroup2, function (err, res) {
                //         proxyprinttodiv('Function asap >>>>> added group for >>> ' + usergroup2, res, 39);
                //         cb(null, "usergroup2");
                //     });
                // },

                // // // adding actiongroups
                // function (cb) {
                //     var actiongroup1 = {
                //         "actiongroupname": "getwidmaster"
                //     };

                //     createactiongroup(actiongroup1, function (err, res) {
                //         proxyprinttodiv('Function asap >>>>> added group for >>> ' + actiongroup1, res, 39);
                //         cb(null, "actiongroup1");
                //     });
                // },

                // function (cb) {
                //     var actiongroup2 = {
                //         "actiongroupname": "addwidmaster"
                //     };

                //     createactiongroup(actiongroup2, function (err, res) {
                //         proxyprinttodiv('Function asap >>>>> added group for >>> ' + actiongroup2, res, 39);
                //         cb(null, "actiongroup2");
                //     });
                // },

                // // add permissions

                // function (cb) {
                //     var userjson1 = {
                //         "wid": "rogeruser"
                //     };
                //     addpermission(userjson1, permissionsobjarr1, function (err, res) {
                //         proxyprinttodiv('Function asap >>>>> added permissions for >>> ' + userjson1.wid, res, 39);
                //         cb(null, "userdata");
                //     });
                // }
            ],

            function (err, res) {
                proxyprinttodiv('Function asap >>>>> finally done >>> res', res, 39);
                execute({
                    "executethis": "getwidmaster",
                    "wid": userobj.wid
                }, function (err, resp) {
                    proxyprinttodiv('Function createuserdata -- added getwidmaster on user  -- ' + userobj.wid, resp, 13);
                    callback(err, res);
                });
            })


    }


    exports.csd = csd = function csd(params, callback) {
        var executeList = [

            {
                // parentdto
                "executethis": "addwidmaster",
                "metadata.method": "parentdto",
                "wid": "parentdto",
                "phone": "string",
                //"metadata.childdto.type": "onetoone",
                //"metadata.childdto.grandchilddto.type": "onetoone"
            }, {
                //create childdto
                "executethis": "addwidmaster",
                "metadata.method": "childdto",
                "wid": "childdto",
                "phonechild": "string",
            }, {
                //create grandchilddto
                "executethis": "addwidmaster",
                "metadata.method": "grandchilddto",
                "wid": "grandchilddto",
                "phonegrandchild": "string"
            }, 
        ];

        execute(executeList, function (err, res) {
            createrelationship("parentdto", "childdto", "onetomany", function (err, res) {
                   createrelationship("childdto", "grandchilddto", "onetomany", function (err, res) {
                        execute({
                // create data 
                "executethis": "addwidmaster",
                "metadata.method": "parentdto",
                "phone": "9812121212",
                "childdto.phonechild": "999988887777",
                "childdto.grandchilddto.phonegrandchild": "11112222233333"
            }, function (err, res) {
            // proxyprinttodiv('Function csd -- added all this -- ', res, 99);
            callback(err, res);
                    });
                });
           });
        });
    }


})(typeof window == "undefined" ? global : window);