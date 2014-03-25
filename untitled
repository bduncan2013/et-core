 //// This function creates the "system dtos"
 exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {
     async.series([
             function (cb1) {
                 // Create DTOs
                 execute([{
                     /// dtodefault
                     "executethis": "addwidmaster",
                     "wid": "dtodefault",
                     "metadata.method": "dtodefault",

                     "metadata.system.db": "data",
                     "metadata.system.collection": "dri",


//                      dtodefault  
// metadata    
// method  dtodefault
// metadata.system.creator driwid
// metadata.system.creationdate    3/9/2014
// metadata.system.expiratondate   12/31/2999
// namespace   
// widname 
// status inactive, active, delete 
// metadata.system.type    
// tradedto    
// metadata    
// method  

                 }, { /// systemdto
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
                 }, {
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
                     "metadata.addactiondto.type": "manytoone"
                     //,
                     //"metadata.inherit.override": "dtooverride",
                     //"metadata.inherit.default": "dtodefault"


                 }, {
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

                     // create the actiondto
                     "executethis": "addwidmaster",
                     "wid": "actiondto",
                     "metadata.method": "actiondto",
                     "metadata.passdto.type": "manytoone",
                     "metadata.faildto.type": "manytoone",
                     "metadata.postexecute.type": "manytoone",
                     "metadata.methoddto.type": "onetomany"
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
                        "metadata.actiondto.type": "manytoone",
                        "metadata.executepref.type": "manytoone",
                        "metadata.resultpref.type": "manytoone"
                        // ,
                        // "metadata.passdto.type": "onetomany",
                        // "metadata.faildto.type": "onetomany",
                        // "metadata.validatedto.type": "onetoone",
                        // "metadata.resultdto.type": "onetoone",
                        // "metadata.errordto.type": "onetoone",
                        // "metadata.beforedto.type": "manytoone",
                        // "metadata.afterdto.type": "manytoone" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // create the resultpref
                        "executethis": "addwidmaster",
                        "wid": "resultpref",
                        "metadata.method": "resultpref",
                        "metadata.executepref.type": "manytoone"
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the executepref
                        "executethis": "addwidmaster",
                        "metadata.method": "executepref",
                        "wid": "executepref",
                        "ac": "string",
                        "gps": "string",
                        "account": "string",
                        "db": "string",
                        "collection": "string",
                        "server": "string",
                        "datastore": "string",
                        "executetype": "string",
                        "to": "string",
                        "via": "string",
                        "begindate": "string",
                        "enddate": "string",
                        "priority": "string",
                        "status": "string",
                        "ac": "string",
                        "userid": "string",
                         "metadata.parameterdto.type": "onetomany",
                        "metadata.executepref.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the postexecute
                        "executethis": "addwidmaster",
                        "metadata.method": "postexecute",
                        "wid": "postexecute",
                         "metadata.executedto.type": "manytoone"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the passdto
                        "executethis": "addwidmaster",
                        "metadata.method": "passdto",
                        "wid": "passdto",
                         "metadata.executedto.type": "manytoone",
                          "metadata.parameterdto.type": "manytoone",
                          "expirationtimer":"integer"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the faildto
                        "executethis": "addwidmaster",
                        "metadata.method": "faildto",
                        "wid": "faildto",
                         "metadata.executedto.type": "manytoone",
                          "metadata.parameterdto.type": "manytoone",
                          "expirationtimer":"integer"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the errorobject
                        "executethis": "addwidmaster",
                        "metadata.method": "errorobject",
                        "wid": "errorobject",
                         "EvalError": "string",
                        "RangeError": "string",
                        "ReferenceError": "string",
                        "SyntaxError": "string",
                        "TypeError": "string",
                        "URIError": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    }, {
                        // Create the userdto
                        "executethis": "addwidmaster",
                        "metadata.method": "userdto",
                        "metadata.securitydto.type": "onetoone",
                        "metadata.environmentdto.type": "onetoone",
                        "metadata.permissiondto.type": "onetomany",
                        "metadata.usergroup.type": "onetomany",
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
                        "country": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    },{
                        // Create the securitydto
                        "executethis": "addwidmaster",
                        "metadata.method": "securitydto",
                        "wid": "securitydto",
                        "ac": "string",
                        "loginlevel": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    },{
                        // Create the permissiondto     
                        "executethis": "addwidmaster",
                        "wid": "permissiondto",
                        "metadata.method": "permissiondto",
                        "metadata.system.creator": "string",// REMOVE LATER :: INHERIT THIS
                        "metadata.actiongroupdto.type": "manytomany",
                        "metadata.usergroupdto.type": "manytomany",
                        "metadata.db": "string",
                        "level": "string",
                        "metadata.collection": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    },{
                        // Create the usergroupdto      
                        "executethis": "addwidmaster",
                        "wid": "usergroupdto",
                        "metadata.method": "usergroupdto",
                        "metadata.userdto.type": "manytomany",
                        "usergroupname": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    },{
                        // Create the usergroupdto      
                        "executethis": "addwidmaster",
                        "wid": "usergroupdto",
                        "metadata.method": "usergroupdto",
                        "metadata.userdto.type": "manytomany",
                        "usergroupname": "string"
                        //,
                        //"metadata.inherit.override": "dtooverride",
                        //"metadata.inherit.default": "dtodefault"
                    },{
                        // interfacedto
                        "executethis": "addwidmaster",
                        "wid": "interfacedto",
                        "desc":"string",
                        "smsdesc":"string",
                        "metadata.method": "interfacedto",
                        "metadata.viewdto.type": "manytoone",
                        "metadata.backdto.type": "manytoone",
                        "metadata.basedto.type": "manytoone" // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    },{ // viewdto
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
                        // nextpagedto
                        "executethis": "addwidmaster",
                        "wid": "nextpagedto",
                        "metadata.method": "nextpagedto"
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // methoddto
                        "executethis": "addwidmaster",
                        "wid": "methoddto",
                        "metadata.method": "methoddto"
                        "metadata.basedto.type": "manytoone" // TODO :: ADD ALL DTO RELATIONSHIPS HERE , 
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // currencydto
                        "executethis": "addwidmaster",
                        "wid": "currencydto",
                        "metadata.method": "currencydto",
                        "currencyname":"string"
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // command
                        "executethis": "addwidmaster",
                        "wid": "command",
                        "metadata.method": "command",
                        "metadata.executedto.type": "manytoone",
                        "metadata.parameterdto.type": "onetomany" 
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }, {
                        // command
                        "executethis": "addwidmaster",
                        "wid": "command",
                        "from":"string",
                        "metadata.method": "command",
                        "metadata.executedto.type": "manytoone",
                        "metadata.parameterdto.type": "onetomany" 
                        // ,
                        // "metadata.inherit.override": "dtooverride",
                        // "metadata.inherit.default": "dtodefault"
                    }
    
                 ], function (err, res) {
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