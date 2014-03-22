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



    // ***************************************************************************
    // *************** DATA DEFINATION CREATION FUNCTIONS ******************************
    //****************************************************************************


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
                        "metadata.groupdto.type": "manytoone"
                        //,
                    }, {
                        // securitydatadto
                        "executethis": "addwidmaster",
                        "wid": "securitydatadto",
                        "metadata.method": "securitydatadto",
                        "ac": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the offlineactiondto
                        "executethis": "addwidmaster",
                        "wid": "offlineactiondto",
                        "metadata.method": "offlineactiondto",
                        "metadata.executedto.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the onlineactiondto
                        "executethis": "addwidmaster",
                        "wid": "onlineactiondto",
                        "metadata.method": "onlineactiondto",
                        "metadata.executedto.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the localactiondto
                        "executethis": "addwidmaster",
                        "wid": "localactiondto",
                        "metadata.method": "localactiondto",
                        "metadata.onlineaction.type": "manytoone",
                        "metadata.offlineaction.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the serveractiondto
                        "executethis": "addwidmaster",
                        "wid": "serveractiondto",
                        "metadata.method": "serveractiondto",
                        "metadata.serveractiondto.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // create the actiondto
                        "executethis": "addwidmaster",
                        "wid": "actiondto",
                        "metadata.method": "actiondto",
                        "metadata.serveractiondto.type": "manytoone",
                        "metadata.localactiondto.type": "manytoone"
                        //,
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
                        "metadata.actiondto.type": "onetoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the getactiondto
                        "executethis": "addwidmaster",
                        "wid": "getactiondto",
                        "metadata.method": "getactiondto",
                        "metadata.actiondto.type": "onetoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the editactiondto
                        "executethis": "addwidmaster",
                        "wid": "editactiondto",
                        "metadata.method": "editactiondto",
                        "metadata.actiondto.type": "onetoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the addactiondto
                        "executethis": "addwidmaster",
                        "wid": "addactiondto",
                        "metadata.method": "addactiondto",
                        "metadata.actiondto.type": "onetoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the deleteactiondto
                        "executethis": "addwidmaster",
                        "wid": "deleteactiondto",
                        "metadata.method": "deleteactiondto",
                        "metadata.actiondto.type": "onetoone"
                        //,
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
                        "collection": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the securitydto
                        "executethis": "addwidmaster",
                        "metadata.method": "securitydto",
                        "wid": "securitydto",
                        "accesstoken": "string",
                        //"status": "integer"
                        "status": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the groupdto      
                        "executethis": "addwidmaster",
                        "wid": "groupdto",
                        "metadata.method": "groupdto",
                        "groupname": "string",
                        "metadata.groupdto.type": "onetomany"
                        // ,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the actiongroupdto        
                        "executethis": "addwidmaster",
                        "wid": "actiongroupdto",
                        "metadata.method": "actiongroupdto",
                        "actiongroupname": "string",
                        "creator": "string",
                        "metadata.actiongroupdto.type": "manytomany",
                        "metadata.executeactiondto.type": "manytoone",
                        "metadata.getactiondto.type": "manytoone",
                        "metadata.editactiondto.type": "manytoone",
                        "metadata.deleteactiondto.type": "manytoone",
                        "metadata.addactiondto.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the usergroupdto      
                        "executethis": "addwidmaster",
                        "wid": "usergroupdto",
                        "metadata.method": "usergroupdto",
                        // "metadata.userdto.type": "manytomany",
                        "usergroupname": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the permissiondto     
                        "executethis": "addwidmaster",
                        "wid": "permissiondto",
                        "metadata.method": "permissiondto",
                        "metadata.system.creator": "string",
                        "level": "string",
                        "metadata.actiongroupdto.type": "manytomany",
                        "metadata.usergroupdto.type": "manytomany",
                        "metadata.db": "string",
                        "metadata.collection": "string"
                        //,
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
                        "metadata.permissiondto.type": "onetomany"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }], function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("actiongroupdto", "actiongroupdto", "manytomany", function (err, res) {
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
                },
                function (cb1) {
                    createrelationship("permissiondto", "actiongroupdto", "manytomany", function (err, res) {
                        cb1(null);
                    });
                },

                function (cb1) {
                    createrelationship("permissiondto", "usergroupdto", "manytomany", function (err, res) {
                        cb1(null);
                    });
                }

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
                proxyprinttodiv('Function createalldtos -- added all relationships  -- ', res, 39);
                callback(err, res);
            });
    }

    // // This function creates the "critical dtos"
    // exports.createalldtos = createalldtos = function createalldtos(params, callback) {

    //     async.series([
    //             function (cb1) {
    //                 // Create DTOs
    //                 execute([{
    //                     "executethis": "addwidmaster",
    //                     "wid": "dtodefault",
    //                     "metadata.method": "dtodefault",
    //                     "metadata.system.creator": "driwid",
    //                     "metadata.system.creationdate": "3/9/2014",
    //                     "metadata.system.expirationtimer": "10000",
    //                     "metadata.system.expirationdate": "12/31/2999",
    //                     "metadata.system.db": "data",
    //                     "metadata.system.collection": "dri",
    //                     "metadata.system.type": ""
    //                 }, {
    //                     // Create the dtooverride
    //                     "executethis": "addwidmaster",
    //                     "wid": "dtooverride",
    //                     "metadata.method": "dtodefault",
    //                     "metadata.system.creator": "driwid",
    //                     "metadata.system.creationdate": "3/9/2014",
    //                     "metadata.system.expirationtimer": "10000",
    //                     "metadata.system.expirationdate": "12/31/2999",
    //                     "metadata.system.db": "data",
    //                     "metadata.system.collection": "dri",
    //                     "metadata.system.type": "",
    //                     "metadata.interfacedto.type": "manytoone",
    //                     "metadata.executeactiondto.type": "manytoone",
    //                     "metadata.getactiondto.type": "manytoone",
    //                     "metadata.editactiondto.type": "manytoone",
    //                     "metadata.deleteactiondto.type": "manytoone",
    //                     "metadata.addactiondto.type": "manytoone",
    //                     "metadata.groupdto.type": "manytoone",
    //                 }, {
    //                     // securitydatadto
    //                     "executethis": "addwidmaster",
    //                     "wid": "securitydatadto",
    //                     "metadata.method": "securitydatadto",
    //                     "ac": "string",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // create the offlineactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "offlineactiondto",
    //                     "metadata.method": "offlineactiondto",
    //                     "metadata.executedto.type": "manytoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // create the onlineactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "onlineactiondto",
    //                     "metadata.method": "onlineactiondto",
    //                     "metadata.executedto.type": "manytoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // create the localactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "localactiondto",
    //                     "metadata.method": "localactiondto",
    //                     "metadata.onlineaction.type": "manytoone",
    //                     "metadata.offlineaction.type": "manytoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // create the serveractiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "serveractiondto",
    //                     "metadata.method": "serveractiondto",
    //                     "metadata.serveractiondto.type": "manytoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // create the actiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "actiondto",
    //                     "metadata.method": "actiondto",
    //                     "metadata.serveractiondto.type": "manytoone",
    //                     "metadata.localactiondto.type": "manytoone",
    //                     //"actionname":"string",
    //                     //"actiontype":"string",
    //                     //"dothis":"string",
    //                     //"parameters":"string",
    //                     //"offlineonline":"string",
    //                     //"localserver":"string",
    //                     //"oncreate":"string",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the executeactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "executeactiondto",
    //                     "metadata.method": "executeactiondto",
    //                     "metadata.actiondto.type": "onetoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the getactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "getactiondto",
    //                     "metadata.method": "getactiondto",
    //                     "metadata.actiondto.type": "onetoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the editactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "editactiondto",
    //                     "metadata.method": "editactiondto",
    //                     "metadata.actiondto.type": "onetoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the addactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "addactiondto",
    //                     "metadata.method": "addactiondto",
    //                     "metadata.actiondto.type": "onetoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the deleteactiondto
    //                     "executethis": "addwidmaster",
    //                     "wid": "deleteactiondto",
    //                     "metadata.method": "deleteactiondto",
    //                     "metadata.actiondto.type": "onetoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the permissiondto     
    //                     "executethis": "addwidmaster",
    //                     "wid": "permissiondto",
    //                     "metadata.method": "permissiondto",
    //                     "level": "string",
    //                     "metadata.actiongroup.type": "manytomany", // **** NEED TO CHECK :: ADDED BY SAURABH
    //                     "metadata.usergroup.type": "manytomany", // **** NEED TO CHECK :: ADDED BY SAURABH
    //                     "metadata.db": "string", // **** NEED TO CHECK :: ADDED BY SAURABH
    //                     "metadata.collection": "string", // **** NEED TO CHECK :: ADDED BY SAURABH
    //                     // "metadata.actiongroup":"string", // **** NEED TO CHECK :: ADDED BY SAURABH
    //                     // "metadata.usergroup":"string",// **** NEED TO CHECK :: ADDED BY SAURABH
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the environmentdto
    //                     "executethis": "addwidmaster",
    //                     "metadata.method": "environmentdto",
    //                     "wid": "environmentdto",
    //                     "ac": "string",
    //                     "gps": "string",
    //                     "account": "string",
    //                     "db": "string",
    //                     "collection": "collection",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the securitydto
    //                     "executethis": "addwidmaster",
    //                     "metadata.method": "securitydto",
    //                     "wid": "securitydto",
    //                     "accesstoken": "string",
    //                     //"status": "integer"
    //                     "status": "string",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the groupdto      
    //                     "executethis": "addwidmaster",
    //                     "wid": "groupdto",
    //                     "metadata.method": "groupdto",
    //                     "groupname": "string",
    //                     "metadata.groupdto.type": "onetomany",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the actiongroupdto        
    //                     "executethis": "addwidmaster",
    //                     "wid": "actiongroupdto",
    //                     "metadata.method": "actiongroupdto",
    //                     "actiongroupname": "string",
    //                     "metadata.executeactiondto.type": "manytoone",
    //                     "metadata.getactiondto.type": "manytoone",
    //                     "metadata.editactiondto.type": "manytoone",
    //                     "metadata.deleteactiondto.type": "manytoone",
    //                     "metadata.addactiondto.type": "manytoone",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the usergroupdto      
    //                     "executethis": "addwidmaster",
    //                     "wid": "usergroupdto",
    //                     "metadata.method": "usergroupdto",
    //                     "groupname": "string",
    //                     "metadata.userdto.type": "manytomany",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }, {
    //                     // Create the userdto
    //                     "executethis": "addwidmaster",
    //                     "metadata.method": "userdto",
    //                     "wid": "userdto",
    //                     "widname": "wid",
    //                     "fname": "string",
    //                     "lname": "string",
    //                     "phone": "string",
    //                     "email": "string",
    //                     "address": "string",
    //                     "address2": "string",
    //                     "city": "string",
    //                     "state": "string",
    //                     "zip": "string",
    //                     "country": "string",
    //                     "metadata.securitydto.type": "onetoone",
    //                     "metadata.environmentdto.type": "onetoone",
    //                     "metadata.permissiondto.type": "onetomany",
    //                     "metadata.inherit.override": "dtooverride",
    //                     "metadata.inherit.default": "dtodefault"
    //                 }], function (err, res) {
    //                     proxyprinttodiv('Function createalldtos -- added all schemas  -- ', res, 39);
    //                     cb1(null);
    //                 });
    //             },
    //             function (cb1) {
    //                 createrelationship("onlineactiondto", "executedto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("offlineactiondto", "executedto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("localactiondto", "onlineactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("localactiondto", "offlineactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("serveractiondto", "serveractiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiondto", "localactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiondto", "serveractiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("executeactiondto", "actiondto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("getactiondto", "actiondto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("editactiondto", "actiondto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("addactiondto", "actiondto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("deleteactiondto", "actiondto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("groupddto", "groupdto", "onetomany", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("userdto", "securitydto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("userdto", "environmentdto", "onetoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("userdto", "permissiondto", "onetomany", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("userdto", "usergroupdto", "onetomany", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("usergroupdto", "userdto", "manytomany", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiongroupdto", "executeactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiongroupdto", "getactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiongroupdto", "editactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiongroupdto", "deleteactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             },

    //             function (cb1) {
    //                 createrelationship("actiongroupdto", "addactiondto", "manytoone", function (err, res) {
    //                     cb1(null);
    //                 });
    //             }
    //             // ,
    //             // function (cb1) {
    //             // //createrelationship("permissiondto","actiontypedto","manytomany", function (err, res) {
    //             //         cb1(null);
    //             //     });
    //             // },

    //             // function (cb1) {
    //             // //createrelationship("permissiondto","granteegroupdto","manytomany", function (err, res) {
    //             //         cb1(null);
    //             //     });
    //             // },

    //             // function (cb1) {
    //             // //createrelationship("permissiondto","dbdto","manytomany", function (err, res) {
    //             //         cb1(null);
    //             //     });
    //             // },

    //             // function (cb1) {
    //             // //createrelationship("permissiondto","collectiondto","manytomany", function (err, res) {
    //             //         cb1(null);
    //             //     });
    //         ],

    //         function (err, res) {
    //             proxyprinttodiv('Function createalldtos -- added all relationships  -- ', res, 39);
    //             callback(err, res);
    //         });
    // }

    // This function creates non-critical dtos, e.g. interfacedto. However, some of
    // the critical dtos have relationships with non-critical dtos.
    exports.noncriticaldtos = noncriticaldtos = function noncriticaldtos(callback) {


        async.series([
                function (cb1) {
                    execute([{ // viewdto
                        "executethis": "addwidmaster",
                        "wid": "viewdto",
                        "metadata.method": "viewdto",
                        "html": "string"
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // basedto
                        "executethis": "addwidmaster",
                        "wid": "basedto",
                        "metadata.method": "basedto",
                        "html": "string" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // backdto
                        "executethis": "addwidmaster",
                        "wid": "backdto",
                        "metadata.method": "backdto",
                        "html": "string" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // interfacedto
                        "executethis": "addwidmaster",
                        "wid": "interfacedto",
                        "metadata.method": "interfacedto",
                        "metadata.viewdto.type": "manytoone",
                        "metadata.backdto.type": "manytoone",
                        "metadata.basedto.type": "manytoone" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
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
                        "urlerror": "string" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the passdto
                        "executethis": "addwidmaster",
                        "wid": "passdto",
                        "metadata.method": "passdto",
                        "log": "boolean" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the faildto
                        "executethis": "addwidmaster",
                        "wid": "faildto",
                        "metadata.method": "faildto",
                        "log": "boolean" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the validatedto
                        "executethis": "addwidmaster",
                        "wid": "validatedto",
                        "metadata.method": "validatedto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the resultdto
                        "executethis": "addwidmaster",
                        "wid": "resultdto",
                        "metadata.method": "resultdto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the errordto
                        "executethis": "addwidmaster",
                        "wid": "errordto",
                        "metadata.method": "errordto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the beforedto
                        "executethis": "addwidmaster",
                        "wid": "beforedto",
                        "metadata.method": "beforedto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the afterdto
                        "executethis": "addwidmaster",
                        "wid": "afterdto",
                        "metadata.method": "afterdto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
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
                        "metadata.afterdto.type": "manytoone" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the logobject
                        "executethis": "addwidmaster",
                        "wid": "logobject",
                        "metadata.method": "executedto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the gettypedto
                        "executethis": "addwidmaster", // <-- this wid might not be needed
                        "wid": "gettypedto",
                        "metadata.method": "gettypedto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the addtypedto
                        "executethis": "addwidmaster",
                        "wid": "addtypedto",
                        "metadata.method": "addtypedto" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
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
                proxyprinttodiv('Function noncriticaldtos -- added all relationships  -- ', res, 39);
                callback(err, res);
            });
    }







    // ***************************************************************************
    // *************** DATA ADDITION TEST FUNCTIONS ******************************
    //****************************************************************************




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
            proxyprinttodiv('Function createdefaultgroups -- added 2 groups  -- ', res, 39);
            callback(err, res);
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


        var permissionsobj = {
            "permissiondto.0.level": "99",
            "permissiondto.0.metadata.collection": "collection1",
            "permissiondto.0.actiongroupdto.actiongroupname": "getwidmaster",
            "permissiondto.0.usergroupdto.usergroupname": "driemployees",
            "permissiondto.0.metadata.db": "data1"
        };


        var usergroupobj = {
            "usergroupdto.0.usergroupname": "driemployees",
            "usergroupdto.0.usergroupdto.0.usergroupname": "driemployees",

            "usergroupdto.1.usergroupname": "drimanagers",
            "usergroupdto.1.usergroupdto.0.usergroupname": "driemployees"
        };

        var actiongroupobj = {
            "actiongroupdto.0.actiongroupname": "getwidmaster",
            "actiongroupdto.0.creator": "rogeruser",
            "actiongroupdto.0.actiongroupdto.0.actiongroupname": "getwidmaster",
            "actiongroupdto.0.actiongroupdto.0.creator": "rogeruser",
            "actiongroupdto.1.actiongroupname": "addwidmaster",
            "actiongroupdto.1.creator": "rogeruser",
            "actiongroupdto.1.actiongroupdto.0.actiongroupname": "addwidmaster"
        };


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
                    proxyprinttodiv('Function asap -- environment is >>>>>  environmentobj', environmentobj, 39);
                    proxyprinttodiv('Function asap -- actiongroups are >>>>>  actiongroupobj', actiongroupobj, 39);
                    proxyprinttodiv('Function asap -- usergroups are >>>>>  usergroupobj', usergroupobj, 39);
                    proxyprinttodiv('Function asap -- usergroups are >>>>>  usergroupobj', usergroupobj, 39);

                    createuserdata(userobj, securityobj, overrideobj, defaultobj, permissionsobj, usergroupobj, actiongroupobj, environmentobj, function (err, res) {
                        proxyprinttodiv('Function asap >>>>>  res', res, 39);
                        cb(null, "userdata");
                    });
                }
            ],

            function (err, res) {
                proxyprinttodiv('Function asap >>>>> finally done >>> res', res, 39);
                execute({
                    "executethis": "getwidmaster",
                    "wid": userobj.wid
                }, function (err, resp) {
                    proxyprinttodiv('Function createuserdata -- added getwidmaster on user  -- ' + userobj.wid, resp, 39);
                    callback(err, res);
                });


            })
    }


    // test to see if 2nd level data addition is a problems
    // proves it is not
    // step wise building schema
    exports.csd1 = csd1 = function csd1(params, callback) {
        var executeList = [{
            // parentdto
            "executethis": "addwidmaster",
            "metadata.method": "parentdto",
            "wid": "parentdto",
            "phone1": "string",
            "metadata.childdto.type": "manytomany"
        }, {
            // childdto
            "executethis": "addwidmaster",
            "metadata.method": "childdto",
            "wid": "childdto",
            "phone2": "string",
            "metadata.grandchilddto.type": "manytomany"
        }, {
            // grandchilddto
            "executethis": "addwidmaster",
            "metadata.method": "grandchilddto",
            "wid": "grandchilddto",
            "phone3": "string"
        }];

        execute(executeList, function (err, res) {
            createrelationship("parentdto", "childdto", "manytomany", function (err, res) {
                createrelationship("childdto", "grandchilddto", "manytomany", function (err, res) {
                    execute({
                        // create data 
                        "executethis": "addwidmaster",
                        "metadata.method": "parentdto",
                        "wid": "parentwid1",
                        "phone1": "11111",
                        "childdto.0.phone2": "22222",
                        "childdto.0.grandchilddto.0.phone3": "33333",
                        "childdto.1.phone2": "2121212121",
                        "childdto.1.grandchilddto.0.phone3": "3131313131",
                        "childdto.1.phone2": "211211211211211",
                        "childdto.1.grandchilddto.0.phone3": "311311311311311",
                        "childdto.1.grandchilddto.1.phone3": "322322322322322"

                    }, function (err, res) {

                        execute({
                            // create data 
                            "executethis": "getwidmaster",
                            "wid": "parentwid1"
                        }, function (err, res) {
                            // proxyprinttodiv('Function csd -- added all this -- ', res, 99);
                            callback(err, res);
                        });

                    });
                });
            });
        });
    }


    // test to see if 2nd level data addition is a problems
    // proves it is not
    // one go building schema
    exports.csd = csd = function csd(params, callback) {
        var executeList = [{
            // Create the actiongroupdto        
            "executethis": "addwidmaster",
            "wid": "actiongroupdto",
            "metadata.method": "actiongroupdto",
            "actiongroupname": "string"
            // ,
            // "metadata.executeactiondto.type": "manytoone",
            // "metadata.getactiondto.type": "manytoone",
            // "metadata.editactiondto.type": "manytoone",
            // "metadata.deleteactiondto.type": "manytoone",
            // "metadata.addactiondto.type": "manytoone"
        }, {
            // Create the usergroupdto      
            "executethis": "addwidmaster",
            "wid": "usergroupdto",
            "metadata.method": "usergroupdto",
            "usergroupname": "string"
        }, {
            // Create the permissiondto     
            "executethis": "addwidmaster",
            "wid": "permissiondto",
            "metadata.method": "permissiondto",
            "level": "string",
            "metadata.actiongroupdto.type": "manytomany",
            "metadata.usergroupdto.type": "manytomany",
            "metadata.db": "string",
            "metadata.collection": "string"
        }];

        execute(executeList, function (err, res) {
            createrelationship("permissiondto", "actiongroupdto", "manytomany", function (err, res) {
                createrelationship("permissiondto", "usergroupdto", "manytomany", function (err, res) {
                    execute({
                        // create data 
                        "executethis": "addwidmaster",
                        "metadata.method": "parentdto",
                        "wid": "parentwid1",
                        "phone1": "11111",
                        "childdto.0.phone2": "22222",
                        "childdto.0.grandchilddto.0.phone3": "33333",
                        "childdto.1.phone2": "2121212121",
                        "childdto.1.grandchilddto.0.phone3": "3131313131",
                        "childdto.1.phone2": "211211211211211",
                        "childdto.1.grandchilddto.0.phone3": "311311311311311",
                        "childdto.1.grandchilddto.1.phone3": "322322322322322"

                    }, function (err, res) {

                        execute({
                            // create data 
                            "executethis": "getwidmaster",
                            "wid": "parentwid1"
                        }, function (err, res) {
                            // proxyprinttodiv('Function csd -- added all this -- ', res, 99);
                            callback(err, res);
                        });

                    });
                });
            });
        });
    }

    /*
        to test createalldtos
    */
    exports.testcreatealldtos = testcreatealldtos = function testcreatealldtos(params, callback) {
        var executeobj = {
            "executethis": "addwidmaster",
            "metadata.method": "userdto",
            "wid": "wid1",

            "widname": "user widname", //HERE, we need to specify value as datatype "wid"
            "fname": "user fname1",
            "lname": "user lname1",
            "phone": "user phone",
            "email": "user@test.com",
            "address": "user address",
            "address2": "user address2",
            "city": "user city",
            "state": "user state",
            "zip": "user zip 123456",
            "country": "user country",

            "securitydto.accesstoken": "user security accesstoken",
            "securitydto.status": "user security status",

            "environmentdto.ac": "user environment ac",
            "environmentdto.gps": "user environment gps",
            "environmentdto.account": "user environment account",
            "environmentdto.db": "user environment db",
            "environmentdto.collection": "user environment collection",

            "permissiondto.0.level": "user permission level",
            "permissiondto.0.metadata.db": "user permission db",
            "permissiondto.0.metadata.collection": "user permission collection",

            "usergroupdto.0.groupname": "user usergroup name"
        };

        createalldtos(params, function (cb2) {
            var executeList = [];

            var executeObjForGet = {
                "executethis": "getwidmaster",
                "wid": "userdto",
            };
            //executeList.push(executeObjForGet);
            executeList.push(executeobj);

            execute(executeList, function (err, res) {
                proxyprinttodiv("result from data add ", res, 99, true);

                var printlist = [
                    //{"wid":"wid1", "command.dtotype":""},

                    {
                        "wid": "wid1",
                        "command.dtotype": "userdto"
                    },
                    //{"wid":"wid1", "command.dtotype":"securitydto"},
                    //{"wid":"wid1", "command.dtotype":"environmentdto"},
                    //{"wid":"wid1", "command.dtotype":"permissiondto"}
                ];

                printlistmany(printlist, function (err, res) {
                    callback(err, res);
                })
            });
        });
    }


    /// test to add a permission record and get it back
    /// made to test if permission dto is setup correctly or not
    exports.tp1 = tp1 = function tp1(parms, callback) {
        // permissiondto
        debuglevel = 39;

        var executeobj = {
            // add permissions as per given information 
            "executethis": "addwidmaster",
            "wid": "p1",
            // permissions data 
            "metadata.method": "permissiondto",
            "usergroupdto.usergroupname": "ug",
            "actiongroupdto.actiongroupname": "ag",
            "metadata.db": "data",
            "metadata.collection": "maincollection",
            "level": "99"
        };

        createalldtos(parms, function (err, res) {
            execute(executeobj, function (err, res) {

                execute({
                    "executethis": "getwidmaster",
                    "wid": "p1"
                }, function (err, res) {
                    proxyprinttodiv("tp1 -- permissiondto p1 --  ", res, 39, true);
                    callback(err, res);

                });
            });
        });
    }

    /// test to add a actiongroup record and get it back
    /// made to test if actiongroup is setup correctly or not
    exports.agr1 = agr1 = function agr1(parms, callback) {
        // actiongroupdto
        debuglevel = 39;

        var executeobj = {
            "executethis": "addwidmaster",
            "wid": "ag1",
            "metadata.method": "actiongroupdto",
            "actiongroupname": "grou name"
        };

        createalldtos(parms, function (err, res) {
            execute(executeobj, function (err, res) {

                execute({
                    "executethis": "getwidmaster",
                    "wid": "ag1"
                }, function (err, res) {
                    proxyprinttodiv("ag1 --  --  ", res, 39, true);
                    callback(err, res);

                });
            });
        });
    }

    /// test to add a userdto record and get it back
    /// made to test if userdto is setup correctly or not
    exports.uw = uw = function uw(parms, callback) {
        // userdto
        debuglevel = 39;

        createalldtos(parms, function (err, res) {

            var executeobj = {
                "executethis": "addwidmaster",
                "metadata.method": "userdto",
                "wid": "uw",
                "fname": "userobj.fname",
                "lname": "userobj.lname",
                "phone": "userobj.phone",
                "email": "userobj.email",
                "address": "userobj.address",
                "address2": "userobj.address2",
                "city": "userobj.city",
                "state": "userobj.state",
                "zip": "userobj.zip",
                "country": "userobj.country",

                "securitydto.accesstoken": "user security accesstoken",
                "securitydto.status": "user security status",

                "environmentdto.ac": "user environment ac",
                "environmentdto.gps": "user environment gps",
                "environmentdto.account": "user environment account",
                "environmentdto.db": "user environment db",
                "environmentdto.collection": "user environment collection",

                "permissiondto.0.level": "user permission level",
                "permissiondto.0.metadata.db": "user permission db",
                "permissiondto.0.metadata.collection": "user permission collection",

                "usergroupdto.0.usergroupname": "user usergroup name",
                "actiongroupdto.0.actiongroupname": "permission action group"
            };

            execute(executeobj, function (err, res) {

                execute({
                    "executethis": "getwidmaster",
                    "wid": "uw"
                }, function (err, res) {
                    proxyprinttodiv("uw --  --  ", res, 39, true);
                    callback(err, res);

                });
            });
        });

    }









    // ***************************************************************************
    // *************** PURE LOGIC GENERIC FUNCTIONS ******************************
    //****************************************************************************









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
    exports.createuserdata = createuserdata = function createuserdata(userobj, securityobj, overrideobj, defaultobj, permissionobj, usergroupobj, actiongroupobj, environmentobj, callback) {

        var userJson = {
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

        }

        // add permissiondto values from the json object passed in
        for (var key in permissionobj) {
            userJson[key] = permissionobj[key];
        }

        // add usergroupdto values from the json object passed in
        for (var key in usergroupobj) {
            userJson[key] = usergroupobj[key];
        }
        // add actiongroupdto values from the json object passed in
        for (var key in actiongroupobj) {
            userJson[key] = actiongroupobj[key];
        }

        // add environmentdto values from the json object passed in
        userJson["environmentdto.ac"] = environmentobj.ac;
        userJson["environmentdto.gps"] = environmentobj.gps;
        userJson["environmentdto.account"] = environmentobj.account;
        userJson["environmentdto.db"] = environmentobj.db;
        userJson["environmentdto.collection"] = environmentobj.collection;

        // add securitydto values from the json object passed in
        userJson["securitydto.accesstoken"] = securityobj.ac;

        // create userdto data
        execute(userJson, function (err, res) {
            // create securitydto data
            execute({
                "executethis": "getwidmaster",
                "wid": userobj.wid
            }, function (err, resp) {
                proxyprinttodiv('Function createuserdata -- added getwidmaster on user  -- ' + userobj.wid, res, 39);
                callback(err, res);
            });
        });
    }

    // ** GENERIC FUNCTION TO ADD ENVIRONMENT DATA TO A USER WID ON THE BASIS OF RECEIVED DATA **
    // logic to assign environment to a user -- taking the groupname 
    exports.addenvironment = addenvironment = function addenvironment(userobj, environmentobj, callback) {

        execute({
            "executethis": "addwidmaster",
            "wid": userobj.wid,
            "environmentdto.ac": environmentobj.ac,
            "environmentdto.gps": environmentobj.gps,
            "environmentdto.account": environmentobj.account,
            "environmentdto.db": environmentobj.db,
            "environmentdto.collection": environmentobj.collection
        }, function (err, res) {
            proxyprinttodiv('Function addenvironment -- added environment to user  -- ' + userobj.wid, res, 39);
            callback(null, "environmentdto");
        });
    }

    // ** GENERIC FUNCTION TO CREATE A GROUP ON THE BASIS OF RECEIVED DATA **
    // logic to create a group -- taking the groupname 
    exports.creategroup = creategroup = function creategroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": groupname,
            "usergroupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function creategroup -- added group  -- ', groupname, 39);

            callback(err, res);
        });
    }


    // ** GENERIC FUNCTION TO CREATE A USER GROUP ON THE BASIS OF RECEIVED DATA **
    // logic to create a group -- taking the groupname 
    exports.createusergroup = createusergroup = function createusergroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "wid": groupname,
            "usergroupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function createusergroup -- added user group  -- ', groupname, 39);

            callback(err, res);
        });
    }



    // ** GENERIC FUNCTION TO CREATE AN ACTION GROUP ON THE BASIS OF RECEIVED DATA **
    // logic to create a group -- taking the groupname 
    exports.createactiongroup = createactiongroup = function createactiongroup(groupname, callback) {
        execute([{
            "executethis": "addwidmaster",
            "metadata.method": "actiongroupdto",
            "wid": groupname,
            "actiongroupname": groupname
        }], function (err, res) {
            proxyprinttodiv('Function createactiongroup -- added actiongroup  -- ', groupname, 39);

            callback(err, res);
        });
    }

    // ** GENERIC FUNCTION TO ADD A RELATIONSHIP BETWEEN TWO WID TYPES ON THE BASIS OF RECEIVED DATA **
    // create relationship function
    exports.createrelationship = createrelationship = function createrelationship(primarywid, secondarywid, linktype, callback) {

        execute([{
            "executethis": "addwidmaster",
            "wid": "rel_" + secondarywid + "_to_" + primarywid,
            "metadata.method": "relationshipdto",
            "relationshiptype": "attributes",
            "linktype": linktype,
            "primarywid": primarywid,
            "primarymethod": primarywid,
            "secondarywid": secondarywid,
            "secondarymethod": secondarywid
        }], function (err, res) {
            // proxyprinttodiv('Function createrelationship -- added relationship for  -- ' + primarywid + ' >> ' + secondarywid, linktype, 39);
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
            proxyprinttodiv('Function createuser done --  >>>>>> added permission >>>>>  for  -- ' + userobj.wid, res, 39);
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
                proxyprinttodiv('Function addsecurity --  >>>>>> added security  >>>>>  for  -- ' + userobj.wid, res, 39);
                // console.debug('added security for wid ' + wid + " >>>> " + JSON.stringify(res));
                callback(err, res)
            });
    }




    // test recursive groups fetching
    exports.etgrp = etgrp = function etgrp(parm, callback) {
        debuglevel = 39;
        asap({}, function (err, res) {
            proxyprinttodiv('Function etgrp >>>>>  for  -- asap done', res, 39);
            var userobj = {
                "wid": "rogeruser"
            };
            var groupset = [];
            getmygroups(userobj, "usergroupdto","usergroupname", groupset, function (err, res) {
                proxyprinttodiv('Function etgrp >>>>>  for  -- groupset', groupset, 39);
                callback(err, groupset);
            });
        });
    }

})(typeof window == "undefined" ? global : window);