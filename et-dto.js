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

    //// This function creates the "system dtos"
    exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {
        async.series([
                function (cb1) {
                    // Create DTOs
                    execute([{
                                // dtodefault
                                "executethis": "addwidmaster",
                                "wid": "dtodefault",
                                "metadata.method": "dtodefault",

                                "metadata.system.db": "data",
                                "metadata.system.collection": "dri"
                            }, { // systemdto
                                "executethis": "addwidmaster",
                                "wid": "systemdto",
                                "metadata.method": "systemdto",

                                "metadata.executeactiondto.type": "manytoone",
                                "metadata.getactiondto.type": "manytoone",
                                "metadata.editactiondto.type": "manytoone",
                                "metadata.deleteactiondto.type": "manytoone",
                                "metadata.addactiondto.type": "manytoone",
                                "metadata.resultdto.type": "manytoone",
                                "metadata.interfacedto.type": "manytoone",

                                "metadata.namespace": "active",
                                "metadata.widname": "active",
                                "metadata.status": "active",
                                "metadata.creator": "driwid",
                                "metadata.creationdate": "3/9/2014",
                                "metadata.expirationtimer": "10000",
                                "metadata.expirationdate": "12/31/2999"
                            },
                            // actiongroup 
                            // metadata    
                            // metadata.method actiongroup
                            // manytoone   actiongroup
                            // manytoone   executeaction, getaction, editaction, deleteaction, addaction]
                            // actiongroupname string
                            {
                                // Create the actiongroupdto        
                                "executethis": "addwidmaster",
                                "wid": "actiongroupdto",
                                "metadata.method": "actiongroupdto",
                                "actiongroupname": "string",
                                "metadata.actiongroupdto.type": "manytomany",
                                "metadata.executeactiondto.type": "manytoone",
                                "metadata.getactiondto.type": "manytoone",
                                "metadata.editactiondto.type": "manytoone",
                                "metadata.deleteactiondto.type": "manytoone",
                                "metadata.addactiondto.type": "manytoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"

                            }


                            ,


                            {
                                // Create the dtooverride
                                "executethis": "addwidmaster",
                                "wid": "dtooverride",
                                "metadata.method": "dtodefault",
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
                                "ac": "string",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // create the offlineactiondto
                                "executethis": "addwidmaster",
                                "wid": "offlineactiondto",
                                "metadata.method": "offlineactiondto",
                                "metadata.executedto.type": "manytoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // create the onlineactiondto
                                "executethis": "addwidmaster",
                                "wid": "onlineactiondto",
                                "metadata.method": "onlineactiondto",
                                "metadata.executedto.type": "manytoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // create the localactiondto
                                "executethis": "addwidmaster",
                                "wid": "localactiondto",
                                "metadata.method": "localactiondto",
                                "metadata.onlineaction.type": "manytoone",
                                "metadata.offlineaction.type": "manytoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // create the serveractiondto
                                "executethis": "addwidmaster",
                                "wid": "serveractiondto",
                                "metadata.method": "serveractiondto",
                                "metadata.serveractiondto.type": "manytoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
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
                                //"oncreate":"string"
                                ,
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the executeactiondto
                                "executethis": "addwidmaster",
                                "wid": "executeactiondto",
                                "metadata.method": "executeactiondto",
                                "metadata.actiondto.type": "onetoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the getactiondto
                                "executethis": "addwidmaster",
                                "wid": "getactiondto",
                                "metadata.method": "getactiondto",
                                "metadata.actiondto.type": "onetoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the editactiondto
                                "executethis": "addwidmaster",
                                "wid": "editactiondto",
                                "metadata.method": "editactiondto",
                                "metadata.actiondto.type": "onetoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the addactiondto
                                "executethis": "addwidmaster",
                                "wid": "addactiondto",
                                "metadata.method": "addactiondto",
                                "metadata.actiondto.type": "onetoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the deleteactiondto
                                "executethis": "addwidmaster",
                                "wid": "deleteactiondto",
                                "metadata.method": "deleteactiondto",
                                "metadata.actiondto.type": "onetoone",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the environmentdto
                                "executethis": "addwidmaster",
                                "metadata.method": "environmentdto",
                                "wid": "environmentdto",
                                "ac": "string",
                                "gps": "string",
                                "account": "string",
                                "db": "string",
                                "collection": "string",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the securitydto
                                "executethis": "addwidmaster",
                                "metadata.method": "securitydto",
                                "wid": "securitydto",
                                "accesstoken": "string",
                                //"status": "integer"
                                "status": "string",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the groupdto      
                                "executethis": "addwidmaster",
                                "wid": "groupdto",
                                "metadata.method": "groupdto",
                                "groupname": "string",
                                "metadata.groupdto.type": "onetomany",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, {
                                // Create the usergroupdto      
                                "executethis": "addwidmaster",
                                "wid": "usergroupdto",
                                "metadata.method": "usergroupdto",
                                // "metadata.userdto.type": "manytomany",
                                "usergroupname": "string",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
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
                                "metadata.collection": "string",
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
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
                                "metadata.inherit.0.wid": "dtodefault",
                                "metadata.inherit.0.command.dtotype": "",
                                "metadata.inherit.0.command.adopt": "default",
                                "metadata.inherit.1.wid": "dtooverride",
                                "metadata.inherit.1.command.dtotype": "",
                                "metadata.inherit.1.command.adopt": "override"
                            }, /* BEGIN INHERITS */ { // userdefault
                                "executethis": "addwidmaster",
                                "wid": "userdefault",
                                "metadata.method": "userdto",
                                "metadata.inherit": [{
                                    "wid": "usergroupoverride",
                                    "command": {
                                        "dtotype": "",
                                        "adopt": "override"
                                    }
                                }, {
                                    "wid": "permissionoverride",
                                    "command": {
                                        "dtotype": "",
                                        "adopt": "override"
                                    }
                                }, {
                                    "wid": "securityoverride",
                                    "command": {
                                        "dtotype": "",
                                        "adopt": "override"
                                    }
                                }, {
                                    "wid": "environmentoverride",
                                    "command": {
                                        "dtotype": "",
                                        "adopt": "override"
                                    }
                                }]
                            }, { // Create the usergroupdto override
                                "executethis": "addwidmaster",
                                "wid": "usergroupoverride",
                                "metadata.method": "usergroupdto",
                                "usergroupname": "Everyone"
                            }, { // permissiondto override
                                "executethis": "addwidmaster",
                                "wid": "permissionoverride",
                                "metadata.method": "permissiondto",
                                "level": "99",
                                "db": "data",
                                "collection": "main",
                                "actiongroupdto": "everyoneactions",
                                "usergroupdto": "Everyone"
                            }, { // securitydto override
                                "executethis": "addwidmaster",
                                "wid": "securityoverride",
                                "metadata.method": "securitydto",
                                "ac": "everyoneac",
                                "loginlevel": "99"
                            }, { // environmentdto override
                                "executethis": "addwidmaster",
                                "wid": "environmentoverride",
                                "metadata.method": "environmentdto",
                                "db": "data",
                                "collection": "main",
                                "datastore": "default",
                                "expirationtimer": 99,
                                "result": "default",
                                "to": "default",
                                "via": "default",
                                "event": "none",
                                "begindate": "3/29/14",
                                "enddate": "3/29/99",
                                "priority": "5",
                                "userid": "default",
                                "gps": "default"
                            }
                        ],

                        function (err, res) {
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
                        // Create the executeactiondto
                        "executethis": "addwidmaster",
                        "wid": "executeactiondto",
                        "metadata.method": "executeactiondto",
                        "metadata.actiongroupdto.type": "manytoone",
                        "metadata.actiondto.type": "onetoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the getactiondto
                        "executethis": "addwidmaster",
                        "wid": "getactiondto",
                        "metadata.method": "getactiondto",
                        "metadata.actiongroupdto.type": "manytoone",
                        "metadata.actiondto.type": "onetoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the editactiondto
                        "executethis": "addwidmaster",
                        "wid": "editactiondto",
                        "metadata.method": "editactiondto",
                        "metadata.actiongroupdto.type": "manytoone",
                        "metadata.actiondto.type": "onetoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the addactiondto
                        "executethis": "addwidmaster",
                        "wid": "addactiondto",
                        "metadata.method": "addactiondto",
                        "metadata.actiongroupdto.type": "manytoone",
                        "metadata.actiondto.type": "onetoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the deleteactiondto
                        "executethis": "addwidmaster",
                        "wid": "deleteactiondto",
                        "metadata.method": "deleteactiondto",
                        "metadata.actiongroupdto.type": "manytoone",
                        "metadata.actiondto.type": "onetoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // securitydatadto
                        "executethis": "addwidmaster",
                        "wid": "securitydatadto",
                        "metadata.method": "securitydatadto",
                        "ac": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the offlineactiondto
                        "executethis": "addwidmaster",
                        "wid": "offlineactiondto",
                        "metadata.method": "offlineactiondto",
                        "metadata.executedto.type": "manytoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the onlineactiondto
                        "executethis": "addwidmaster",
                        "wid": "onlineactiondto",
                        "metadata.method": "onlineactiondto",
                        "metadata.executedto.type": "manytoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the localactiondto
                        "executethis": "addwidmaster",
                        "wid": "localactiondto",
                        "metadata.method": "localactiondto",
                        "metadata.onlineaction.type": "manytoone",
                        "metadata.offlineaction.type": "manytoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the serveractiondto
                        "executethis": "addwidmaster",
                        "wid": "serveractiondto",
                        "metadata.method": "serveractiondto",
                        "metadata.serveractiondto.type": "manytoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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
                        ,
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the environmentdto
                        "executethis": "addwidmaster",
                        "metadata.method": "environmentdto",
                        "wid": "environmentdto",
                        "ac": "string",
                        "gps": "string",
                        "account": "string",
                        "db": "string",
                        "collection": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the securitydto
                        "executethis": "addwidmaster",
                        "metadata.method": "securitydto",
                        "wid": "securitydto",
                        "accesstoken": "string",
                        //"status": "integer"
                        "status": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the groupdto      
                        "executethis": "addwidmaster",
                        "wid": "groupdto",
                        "metadata.method": "groupdto",
                        "groupname": "string",
                        "metadata.groupdto.type": "onetomany",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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
                        "metadata.addactiondto.type": "manytoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the usergroupdto      
                        "executethis": "addwidmaster",
                        "wid": "usergroupdto",
                        "metadata.method": "usergroupdto",
                        // "metadata.userdto.type": "manytomany",
                        "usergroupname": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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
                        "metadata.collection": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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
                        "metadata.inherit.0.wid": "userdtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // Create the userdto
                        "executethis": "addwidmaster",
                        "metadata.method": "userdto",
                        "wid": "userdtodefault",
                        "widname": "userdtodefault",
                        "fname": "1",
                        "lname": "2",
                        "phone": "3",
                        "email": "4",
                        "address": "5",
                        "address2": "6",
                        "city": "7",
                        "state": "8",
                        "zip": "9",
                        "country": "10",
                        "metadata.securitydto.type": "onetoone",
                        "metadata.environmentdto.type": "onetoone",
                        "metadata.permissiondto.type": "onetomany"
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
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // basedto
                        "executethis": "addwidmaster",
                        "wid": "basedto",
                        "metadata.method": "basedto",
                        "html": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // backdto
                        "executethis": "addwidmaster",
                        "wid": "backdto",
                        "metadata.method": "backdto",
                        "html": "string",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // interfacedto
                        "executethis": "addwidmaster",
                        "wid": "interfacedto",
                        "metadata.method": "interfacedto",
                        "metadata.viewdto.type": "manytoone",
                        "metadata.backdto.type": "manytoone",
                        "metadata.basedto.type": "manytoone",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the passdto
                        "executethis": "addwidmaster",
                        "wid": "passdto",
                        "metadata.method": "passdto",
                        "log": "boolean",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the faildto
                        "executethis": "addwidmaster",
                        "wid": "faildto",
                        "metadata.method": "faildto",
                        "log": "boolean",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the validatedto
                        "executethis": "addwidmaster",
                        "wid": "validatedto",
                        "metadata.method": "validatedto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the resultdto
                        "executethis": "addwidmaster",
                        "wid": "resultdto",
                        "metadata.method": "resultdto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the errordto
                        "executethis": "addwidmaster",
                        "wid": "errordto",
                        "metadata.method": "errordto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the beforedto
                        "executethis": "addwidmaster",
                        "wid": "beforedto",
                        "metadata.method": "beforedto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the afterdto
                        "executethis": "addwidmaster",
                        "wid": "afterdto",
                        "metadata.method": "afterdto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the logobject
                        "executethis": "addwidmaster",
                        "wid": "logobject",
                        "metadata.method": "executedto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the gettypedto
                        "executethis": "addwidmaster", // <-- this wid might not be needed
                        "wid": "gettypedto",
                        "metadata.method": "gettypedto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
                    }, {
                        // create the addtypedto
                        "executethis": "addwidmaster",
                        "wid": "addtypedto",
                        "metadata.method": "addtypedto",
                        "metadata.inherit.0.wid": "dtodefault",
                        "metadata.inherit.0.command.dtotype": "",
                        "metadata.inherit.0.command.adopt": "default",
                        "metadata.inherit.1.wid": "dtooverride",
                        "metadata.inherit.1.command.dtotype": "",
                        "metadata.inherit.1.command.adopt": "override"
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









})(typeof window == "undefined" ? global : window);