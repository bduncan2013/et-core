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
// securitydatadto
			"executethis":"addwidmaster",
			"wid":"securitydatadto",
			"metadata.method":"securitydatadto",
			"ac":"string",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the offlineactiondto
			"executethis":"addwidmaster",
			"wid":"offlineactiondto",
			"metadata.method":"offlineactiondto",
			"metadata.executedto.type":"manytoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the onlineactiondto
			"executethis":"addwidmaster",
			"wid":"onlineactiondto",
			"metadata.method":"onlineactiondto",
			"metadata.executedto.type":"manytoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the localactiondto
			"executethis":"addwidmaster",
			"wid":"localactiondto",
			"metadata.method":"localactiondto",
			"metadata.onlineaction.type":"manytoone",
			"metadata.offlineaction.type":"manytoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the serveractiondto
			"executethis":"addwidmaster",
			"wid":"serveractiondto",
			"metadata.method":"serveractiondto",
			"metadata.serveractiondto.type":"manytoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the executeactiondto
			"executethis":"addwidmaster",
			"wid":"executeactiondto",
			"metadata.method":"executeactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the getactiondto
			"executethis":"addwidmaster",
			"wid":"getactiondto",
			"metadata.method":"getactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the editactiondto
			"executethis":"addwidmaster",
			"wid":"editactiondto",
			"metadata.method":"editactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the addactiondto
			"executethis":"addwidmaster",
			"wid":"addactiondto",
			"metadata.method":"addactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the deleteactiondto
			"executethis":"addwidmaster",
			"wid":"deleteactiondto",
			"metadata.method":"deleteactiondto",
			"metadata.actiondto.type":"onetoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{	
// Create the securitydto
			"executethis": "addwidmaster",
			"metadata.method": "securitydto",
			"wid": "securitydto",
			"accesstoken": "string",
			//"status": "integer"
			"status": "string",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the groupdto		
			"executethis":"addwidmaster",
			"wid":"groupdto",
			"metadata.method":"groupdto",
			"groupname":"string",
			"metadata.groupdto.type":"onetomany",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create the usergroupdto		
			"executethis":"addwidmaster",
			"wid":"usergroupdto",
			"metadata.method":"usergroupdto",
			"groupname":"string",
			"metadata.userdto.type":"manytomany",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'}]);

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
	
// This function creates non-critical dtos, e.g. interfacedto. However, some of
// the critical dtos have relationships with non-critical dtos.
	exports.noncriticaldtos = noncriticaldtos = function noncriticaldtos(){

		execute([{// viewdto
			"executethis":"addwidmaster",
			"wid":"viewdto",
			"metadata.method":"viewdto",
			"html":"string",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// basedto
			"executethis":"addwidmaster",
			"wid":"basedto",
			"metadata.method":"basedto",
			"html":"string",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// backdto
			"executethis":"addwidmaster",
			"wid":"backdto",
			"metadata.method":"backdto",
			"html":"string",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// interfacedto
			"executethis":"addwidmaster",
			"wid":"interfacedto",
			"metadata.method":"interfacedto",
			"metadata.viewdto.type":"manytoone",
			"metadata.backdto.type":"manytoone",
			"metadata.basedto.type":"manytoone",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the passdto
			"executethis":"addwidmaster",
			"wid":"passdto",
			"metadata.method":"passdto",
			"log":"boolean",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the faildto
			"executethis":"addwidmaster",
			"wid":"faildto",
			"metadata.method":"faildto",
			"log":"boolean",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the validatedto
			"executethis":"addwidmaster",
			"wid":"validatedto",
			"metadata.method":"validatedto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the resultdto
			"executethis":"addwidmaster",
			"wid":"resultdto",
			"metadata.method":"resultdto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the errordto
			"executethis":"addwidmaster",
			"wid":"errordto",
			"metadata.method":"errordto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the beforedto
			"executethis":"addwidmaster",
			"wid":"beforedto",
			"metadata.method":"beforedto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the afterdto
			"executethis":"addwidmaster",
			"wid":"afterdto",
			"metadata.method":"afterdto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
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
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the logobject
			"executethis":"addwidmaster",
			"wid":"logobject",
			"metadata.method":"executedto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the gettypedto
			"executethis":"addwidmaster", // <-- this wid might not be needed
			"wid":"gettypedto",
			"metadata.method":"gettypedto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// create the addtypedto
			"executethis":"addwidmaster",
			"wid":"addtypedto",
			"metadata.method":"addtypedto",
			"metadata.inherit.override":'["dtooverride"]',
			"metadata.inherit.default":'["dtodefault"]'
			},{
// Create a default actionset
			"executethis":"addwidmaster",
			"wid":"defaultactionset",
			"metadata.method":"actionsetdto",
			"executetype":"ex",
			"gettype":"get",
			"addtype":"add",
			"edittype":"ed",
			"deletetype":"del"}]);
			
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
	}

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
                "groupname": "managers")
        ]);
    }

    exports.createsystemdtos2 = createsystemdtos2 = function createsystemdtos2(params, callback) {
        //debuglevel = 17;
        // create dtos  
        var executeList =


        // CREATE DTOS
        //Create the systemdto
        [{
                "executethis": "addwidmaster",
                "wid": "systemdto",
                "metadata.method": "systemdto",
                "creator": "string",
                "creationdate": "string",
                "expirationtimer": "string",
                "expirationdate": "string",
                "db": "string",
                "collection": "string"
            }, {
                // viewdto
                "executethis": "addwidmaster",
                "wid": "viewdto",
                "metadata.method": "viewdto",
                "html": "string",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // basedto
                "executethis": "addwidmaster",
                "wid": "basedto",
                "metadata.method": "basedto",
                "html": "string",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // backdto
                "executethis": "addwidmaster",
                "wid": "backdto",
                "metadata.method": "backdto",
                "html": "string",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // interfacedto
                "executethis": "addwidmaster",
                "wid": "interfacedto",
                "metadata.method": "interfacedto",
                "html": "string",
                "metadata.systemdto.type": "jsononetoone"
            },
            // Create the errorobjectdto
            {
                "executethis": "addwidmaster",
                "wid": "errorobjectdto",
                "metadata.method": "errorobjectdto",
                "evalerror": "string",
                "rangeerror": "string",
                "referenceerror": "string",
                "syntaxerror": "string",
                "typeerror": "string",
                "urlerror": "string",
                "metadata.systemdto.type": "jsononetoone"
            },
            // create the validatedto
            {
                "executethis": "addwidmaster",
                "wid": "validatedto",
                "metadata.method": "validatedto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the resultto

                "executethis": "addwidmaster",
                "wid": "resultdto",
                "metadata.method": "resultto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the errordto
                "executethis": "addwidmaster",
                "wid": "errordto",
                "metadata.method": "errordto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the beforedto
                "executethis": "addwidmaster",
                "wid": "beforedto",
                "metadata.method": "beforedto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the afterdto
                "executethis": "addwidmaster",
                "wid": "afterdto",
                "metadata.method": "afterdto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the executedto
                "executethis": "addwidmaster",
                "wid": "executedto",
                "metadata.method": "executedto",
                "logpass": "string",
                "logerror": "string",
                "logresult": "string",
                "executeid": "string",
                "metadata.actiondto.type": "onetomany",
                "metadata.validatedto.type": "onetoone",
                "metadata.resultdto.type": "onetoone",
                "metadata.errordto.type": "onetoone",
                "metadata.beforedto.type": "manytoone",
                "metadata.afterdto.type": "manytoone"
            }, {
                // create the gettypedto
                "executethis": "addwidmaster",
                "wid": "gettypedto",
                "metadata.method": "gettypedto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the addtypedto
                "executethis": "addwidmaster",
                "wid": "addtypedto",
                "metadata.method": "addtypedto",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // create the actiondto
                "executethis": "addwidmaster",
                "wid": "actiondto",
                "metadata.method": "actiondto",
                "actionname": "string",
                "actiontype": "string",
                "dothis": "string",
                "parameters": "string",
                "offlineonline": "string",
                "localserver": "string",
                "oncreate": "string",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // Create the actionsetdto & a default actionset
                "executethis": "addwidmaster",
                "wid": "actionsetdto",
                "metadata.method": "actionsetdto",
                "executetype": "string",
                "gettype": "string",
                "addtype": "string",
                "edittype": "string",
                "deletetype": "string",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // Create the permissiondto     
                "executethis": "addwidmaster",
                "wid": "permissiondto",
                "metadata.method": "permissiondto",
                "action": "string",
                "actiontype": "string",
                "granteegroup": "string",
                "db": "string",
                "collection": "string",
                "level": "string",
                "metadata.interfacedto.type": "manytoone",
                "metadata.actionset.type": "manytoone",
                "metadata.systemdto.type": "jsononetoone",
                "metadata.inherit.default": "actionsetdefaults"
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
                "metadata.systemdto.type": "onetoone"
            }, {
                // Create the securitydto
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                //"status": "integer"
                "status": "string",
                "metadata.systemdto.type": "jsononetoone"
            }, {
                // Create the groupdto      
                "executethis": "addwidmaster",
                "wid": "groupdto",
                "metadata.method": "groupdto",
                "groupname": "string",
                "metadata.securitydto.type": "onetoone",
                "metadata.environmentdto.type": "onetoone",
                "metadata.permissiondto.type": "onetomany",
                "metadata.groupdto.type": "onetomany",
                "metadata.interfacedto.type": "manytoone",
                "metadata.systemdto.type": "jsononetoone",
                //"metadata.inherit.default":"actionsetdefaults"
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
                "metadata.groupdto.type": "onetomany",
                "metadata.interfacedto.type": "manytoone",
                "metadata.actionset.type": "manytoone",
                "metadata.systemdto.type": "jsononetoone"
            }
        ];


        execute(executeList, function (err, res) {
            // proxyprinttodiv('Function createsystemdtos4 -- added all this -- ', res, 99);
            callback(err, res);

        });
    }

    exports.csd = csd = function csd(params, callback) {
        var executeList = [

            {
                // parentdto
                "executethis": "addwidmaster",
                "metadata.method": "parentdto",
                "wid": "parentdto",
                "phone": "string",
                "metadata.childdto.type": "onetoone",
                "metadata.childdto.grandchilddto.type": "onetoone"
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
            }, {
                // create data 
                "executethis": "addwidmaster",
                "metadata.method": "parentdto",
                "phone": "9812121212",
                "childdto.phonechild": "999988887777",
                "grandchilddto.phoneegrandhild": "11112222233333"
            }
        ];

        execute(executeList, function (err, res) {
            // proxyprinttodiv('Function csd -- added all this -- ', res, 99);
            callback(err, res);

        });
    }


    exports.createsystemdtos = createsystemdtos = function createsystemdtos(params, callback) {
        //debuglevel = 17;
        // create dtos  
        var executeList = [
            // "executethis": "addwidmaster",
            // "wid": "sonddto",
            // "metadata.method": "sonddto",
            // "title": "string",
            // "metadata.sounddto.type": "onetomany",
            // "sounddto.wid": "sounddto",
            // "sounddto.metadata.method": "sounddto",
            // "sounddto.note": "string"

            {
                // note we do not actually store anything here
                "executethis": "addwidmaster",
                "metadata.method": "logindto",
                "wid": "logindto",
                "phone": "string",
                "pin": "string"

            }, {
                //create userdto
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
                // "metadata.useradddto.type": "onetoone",
                "metadata.systemdto.type": "onetoone"
            }, {
                //create systemdto
                "executethis": "addwidmaster",
                "metadata.method": "systemdto",
                "wid": "systemdto",
                "creator": "string", //"accounttype",
                "expiration": "string", //"datetime",
                "offlinerule": "string",
                "onlinerule": "string",
                "metadata.securitydto.type": "onetoone",
                "metadata.balancedto.type": "onetoone",
                "metadata.categorydto.type": "onetoone",
                "metadata.groupdto.type": "onetoone",
                "metadata.permissiondto.type": "onetoone"
            }, {
                // create groupdto
                "executethis": "addwidmaster",
                "metadata.method": "groupdto",
                "wid": "groupdto",
                "grouptype": "string",
                "groupwid": "string",
                "groupname": "string"
            }, {
                // create securitydto
                // securitydto holds accesstoken, status
                "executethis": "addwidmaster",
                "metadata.method": "securitydto",
                "wid": "securitydto",
                "accesstoken": "string",
                //"status": "integer"
                "status": "string"
            }, {
                // create permissiondto
                "executethis": "addwidmaster",
                "metadata.method": "permissiondto",
                "wid": "permissiondto",
                "granteegroup": "string",
                "actiongroup": "string",
                "actiontypegroup": "string",
                "dbgroup": "string",
                "levelgroup": "string"
            }, {
                //create categorydto
                "executethis": "addwidmaster",
                "metadata.method": "categorydto",
                "wid": "categorydto",
                "categorytype": "string",
                "categoryname": "string"
                //"categoryname": "categorytype"
            }, {
                // create balancedto
                "executethis": "addwidmaster",
                "metadata.method": "balancedto",
                "wid": "balancedto",
                "currencywid": "string", // wid 
                "balance": "string" // integer
            }, {
                // create system user data
                "executethis": "addwidmaster",
                "metadata.method": "systemuserdto",
                "wid": "systemuserdto",
                "startwid": "string"

            }, {
                // create useradddto
                "executethis": "addwidmaster",
                "metadata.method": "useradddto",
                "wid": "useradddto"
            }, {
                //testdto
                "executethis": "addwidmaster",
                "metadata.method": "testdto",
                "wid": "testdto",
                "a": "string",
                "b": "string",
                "metadata.systemdto.type": "onetoone"
            },

            {
                // add categorynamedto 
                "executethis": "addwidmaster",
                "wid": "categorynamedto",
                "metadata.method": "categorynamedto",
                "categoryname": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                // add groupnamedto 
                "executethis": "addwidmaster",
                "wid": "groupnamedto",
                "metadata.method": "groupnamedto",
                "groupname": "string",
                "metadata.systemdto.type": "onetoone"
            }, {
                // link from user to other dto to show how done
                // it would have own sych rules
                "executethis": "addwidmaster",
                "metadata.method": "environmentdto",
                "wid": "environmentdto",
                "ac": "string",
                "gps": "string",
                "account": "string",
                "db": "string",
                "collection": "collection",
                "metadata.systemdto.type": "onetoone"
            }, {
                // create relationships user >> useradddto
                "executethis": "addwidmaster",
                "wid": "rel_user_to_useradddto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "userdto",
                "primarymethod": "userdto",
                "secondarywid": "useradddto",
                "secondarymethod": "useradddto"
            }, {
                // create relationships environmentdto >> systemdto
                "executethis": "addwidmaster",
                "wid": "rel_environmentdto_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "environmentdto",
                "primarymethod": "environmentdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships test >>  systemdto
                "executethis": "addwidmaster",
                "wid": "rel_test_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "testdto",
                "primarymethod": "testdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships systemdto >> groupdto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_groupdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "groupdto",
                "secondarymethod": "groupdto"
            }, {
                // create relationships systemdto >> permissiondto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_permissiondto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "permissiondto",
                "secondarymethod": "permissiondto"
            }, {
                // create relationships systemdto >> balancedto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_balancedto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "balancedto",
                "secondarymethod": "balancedto"
            }, {
                // create relationships user >> systemdto
                "executethis": "addwidmaster",
                "wid": "rel_user_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "userdto",
                "primarymethod": "userdto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships systemdto >> securitydto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_securitydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "securitydto",
                "secondarymethod": "securitydto"
            }, {
                // create relationships systemdto >> categorydto
                "executethis": "addwidmaster",
                "wid": "rel_system_to_categorydto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "systemdto",
                "primarymethod": "systemdto",
                "secondarywid": "categorydto",
                "secondarymethod": "categorydto"
            }, {
                // create relationships systemdto
                "executethis": "addwidmaster",
                "wid": "rel_categorynamedto_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "categorynamedto",
                "primarymethod": "categorynamedto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"
            }, {
                // create relationships systemdto
                "executethis": "addwidmaster",
                "wid": "rel_groupnamedto_to_systemdto",
                "metadata.method": "relationshipdto",
                "relationshiptype": "attributes",
                "linktype": "onetoone",
                "primarywid": "groupnamedto",
                "primarymethod": "groupnamedto",
                "secondarywid": "systemdto",
                "secondarymethod": "systemdto"

                // },
                // {
                // create test data
                // "executethis": "addwidmaster",
                // "metadata.method": "userdto",
                // "wid":"someuser", // 
                // "widname": "wid1",
                // "fname": "string1",
                // "lname": "string1",
                // "phone": "phone1",
                // "email": "string1",
                // "address": "string1",
                // "address2": "string1",
                // "city": "string1",
                // "state": "string1",
                // "zip": "string1",
                // "country": "string1",
                // "systemdto.creator": "string", //"accounttype",
                // "systemdto.expiration": "string", //"datetime",
                // "systemdto.offlinerule": "string",
                // "systemdto.onlinerule": "string",
                // "systemdto.securitydto.accesstoken": "ac1",
                // "systemdto.securitydto.status": "status1"
            }, {
                "executethis": "getwidmaster",
                "wid": "userdto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "testdto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "systemdto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "securitydto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "permissiondto",
                // }, {
                //     "executethis": "getwidmaster",
                //     "wid": "categorydto"
                // }, {
                // "executethis": "getwidmaster",
                // "wid": "someuser"
            }
        ];


        execute(executeList, function (err, res) {
            // proxyprinttodiv('Function createsystemdtos4 -- added all this -- ', res, 99);
            callback(err, res);

        });
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

})(typeof window == "undefined" ? global : window);