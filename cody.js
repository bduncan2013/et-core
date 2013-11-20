function cody() {
	alert('Cody says hello');
}
// THESE ARE THE TEST SUITES





// THESE ARE THE INDIVIDUAL TESTS

// Let's create a simple wid:

exports.c0 = c0 = function c0(){
	testclearstorage();
	
	// 1) first, let's setup the dto. A DTO gives us the "shell" for creating wids of a certain type. In this case, we want to setup an author "shell" so that we can add many author records.
	// the structure for a basic dto is like this: {"wid":"xxx","metadata.method":"xxx","field1":"type","field2":"type"}.
	// here is our author DTO:
	executetest("addwidmaster",{"wid":"authordto","metadata.method":"authordto","name":"string","age":"string"}, "", "");
	
	// 2) second, let's create an author named Jim. This is easy, just fill in the DTO fields from above:
	executetest("addwidmaster",{"wid":"jim","metadata.method":"authordto","name":"Jim","age":"34"}, "", "");
	
	// 3) now, let's get this
}

exports.c1 = c1 = function c1(){

	testclearstorage();

	executetest("addwidmaster",{"wid":"booksdto1","metadata.method":"booksdto1","name":"string","ISBN":"string","publisher":"string"}, "", "");
	
	executetest("addwidmaster",{"wid":"authordto1","metadata.method":"authordto1","first":"string","last":"string","age":"string","booksdto1":"onetomany"}, "", "");
	
	executetest("addwidmaster",{"wid":"rel_author_book","metadata.method":"relationshipdto","primarywid":"authordto1","secondarywid":"booksdto1"}, "", "");
	
	executetest("addwidmaster",{"wid":"mary_sue","metadata.method":"authordto1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc."}, "", "");
	
	executetest("addwidmaster",{"wid":"mary_sue","metadata.method":"authordto1","first":"BMary","last":"BSue","age":"B30","booksdto1.name":"BPawn of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc."}, "", "");
	
	executetest("addwidmaster",{"wid":"mary_sue","metadata.method":"authordto1","first":"CMary","last":"CSue","age":"C30","booksdto1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Books Inc."}, "", "");
	
	executetest("getWidMaster", {"wid":"mary_sue"}, "mary_sue_get", "");
	//logverify("readmarysue","resultwid","mary_sue_get","","",{"metadata.method":"authordto1","wid":"mary_sue","first":"CMary","last":"CSue","age":"C30","booksdto1.0.name":"ATime and Terror","booksdto1.0.isbn":"A10001111419","booksdto1.0.publisher":"AMega Books Inc.","booksdto1.0.metadata.method":"booksdto1","booksdto1.0.wid":"1","booksdto1.1.name":"BPawn of Prophecy","booksdto1.1.isbn":"B33003222219","booksdto1.1.publisher":"BTor Books Inc.","booksdto1.1.metadata.method":"booksdto1","booksdto1.1.wid":"3","booksdto1.2.name":"CThe Shining","booksdto1.2.isbn":"C33003333319","booksdto1.2.publisher":"CPenguin Books Inc.","booksdto1.2.metadata.method":"booksdto1","booksdto1.2.wid":"5"});														

	//verifysummary("resultwid");
}
/*
exports.cody1_setup = cody1_setup = function cody1_setup(){
	//executetest("debugon");
	executetest("addwidmaster",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");
	
	
	//gojs object
	executetest("addwidmaster",{"metadata.method":"gojsobject","wid":"gojsobject","class":"string","linkFromPortIdProperty":"string","linkToPortIdProperty":"string","nodeDataArray":"onetomany","linkDataArray":"onetomany"}, "", "");
	executetest("addwidmaster",{"metadata.method":"nodeDataArray","wid":"nodeDataArray", "key":"string", "loc":"string", "leftArray":"onetomany", "topArray":"onetomany", "bottomArray":"onetomany", "rightArray":"onetomany"}, "", "");
	executetest("addwidmaster",{"metadata.method":"leftArray","wid":"leftArray","class":"string","portColor":"string", "portId":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"topArray","wid":"topArray","class":"string","portColor":"string", "portId":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"bottomArray","wid":"bottomArray","portColor":"string", "portId":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"rightArray","wid":"rightArray","portColor":"string", "portId":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"linkDataArray","wid":"linkDataArray","from":"string", "to":"string", "fromPort":"string", "toPort":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"gojsrel1","wid":"gojsrel1","primarywid":"gojsobject","secondarywid":"nodedataarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"gojsrel2","wid":"gojsrel2","class":"string","primarywid":"gojsobject","secondarywid":"linkdataarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"gojsrel3","wid":"gojsrel3","primarywid":"nodedataarray","secondarywid":"leftarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"gojsrel4","wid":"gojsrel4","primarywid":"nodedataarray","secondarywid":"toparray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"gojsrel5","wid":"gojsrel5","primarywid":"nodedataarray","secondarywid":"bottomarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"gojsrel6","wid":"gojsrel6","primarywid":"nodedataarray","secondarywid":"rightarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	//end gojs object
	
	
	executetest("addwidmaster",{"metadata.method":"linkrules","wid":"linkrules","linkclass":"string","min":"string","max":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany","gojsobject":"onetoone","linkrules":"onetomany"}, "", "");
	
	//create adddto relationships
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"rel_actiondto_adddto","primarywid":"adddto","secondarywid":"actiondto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"rel_palettedto_adddto","primarywid":"adddto","secondarywid":"palettedto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"rel_addfield_adddto","primarywid":"adddto","secondarywid":"addfield"}, "", "");
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"rel_gojsobject_adddto","primarywid":"adddto","secondarywid":"gojsobject"}, "", "");
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"rel_linkrules_adddto","primarywid":"adddto","secondarywid":"linkrules"}, "", "");
	
	
	//create book and author dtos
	//sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"booksdto","title":"string","pages":"string","metadata.method":"booksdto"});
	executetest("addwidmaster",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone"}, "", "");
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	executetest("addwidmaster",{"metadata.method":"relationshipdto","wid":"reladddtotoauthor","primarywid":"authordto","secondarywid":"adddto"}, "", "");
	
	
	//create a default addfield record
	executetest("addwidmaster",{"wid":"addfielddefault","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"}, "", "");

}

exports.cody1_adds = cody1_adds = function cody1_adds(params, callback){
	cody1_setup();

	//add some authors and books
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"startwid","name":"start wid","age":"00","booksdto.title":"none","booksdto.pages":"00"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello World!","booksdto.pages":"40"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"sarah_jones","name":"Sarah Jones","age":"40","booksdto.title":"The Sands of Time","booksdto.pages":"378"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"mike_williams","name":"Mike Williams","age":"36","booksdto.title":"Attack on the Mainframe","booksdto.pages":"600"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"jerry_stone","name":"Jerry Stone","age":"41","booksdto.title":"Carpentry 101","booksdto.pages":"120"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"elizabeth_heart","name":"Elizabeth Heart","age":"50","booksdto.title":"The X Factor","booksdto.pages":"300"}, "", "");
	
	//add system info (adddto info) to those author wids
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"startwid","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"joe_jamison","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"joe_jamison","adddto.actiondto.action":"{'color_screen':'blue'}","adddto.palettedto.0.widname":"joe_jamison","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"jessica_jamison","adddto.palettedto.1.category":"human","adddto.palettedto.1.subcategory":"wife","adddto.palettedto.2.widname":"mary_morris","adddto.palettedto.2.category":"human","adddto.palettedto.2.subcategory":"sister","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"sarah_jones","adddto.actiondto.action":"{'color_screen':'red'}","adddto.palettedto.0.widname":"sarah_jones","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"james_jones","adddto.palettedto.1.category":"human","adddto.palettedto.1.subcategory":"husband","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"mike_williams","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"mike_williams","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"mister_scruffy","adddto.palettedto.1.category":"pet","adddto.palettedto.1.subcategory":"dog","adddto.palettedto.2.widname":"misses_fluffy","adddto.palettedto.2.category":"pet","adddto.palettedto.2.subcategory":"cat","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"jerry_stone","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"jerry_stone","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"lynne_stone","adddto.palettedto.1.category":"human","adddto.palettedto.1.subcategory":"wife","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	executetest("addwidmaster",{"metadata.method":"authordto","wid":"elizabeth_heart","adddto.actiondto.action":"{'play_sound':'trumpet.ogg'}","adddto.palettedto.0.widname":"elizabeth_heart","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");

	executetest("getWidMaster", {"wid":"startwid"}, "startwid_get_result", "");
	executetest("getWidMaster", {"wid":"startwid","command.dtotype":"authordto"}, "startwid_get_result", "");
	executetest("getWidMaster", {"wid":"startwid","command.dtotype":"palettedto"}, "startwid_get_palette", "");
	executetest("getWidMaster", {"wid":"startwid","command.dtotype":"linkrules"}, "startwid_get_linkrules", "");
	executetest("getWidMaster", {"wid":"joe_jamison","command.dtotype":"authordto"}, "joe_get_result", "");
	executetest("getWidMaster", {"wid":"sarah_jones","command.dtotype":"authordto"}, "sarah_get_result", "");
	executetest("getWidMaster", {"wid":"mike_williams","command.dtotype":"authordto"}, "mike_get_result", "");
	executetest("getWidMaster", {"wid":"jerry_stone","command.dtotype":"authordto"}, "jerry_get_result", "");
	executetest("getWidMaster", {"wid":"elizabeth_heart","command.dtotype":"authordto"}, "elizabeth_get_result", "");
}

exports.cody1_results = cody1_results = function cody1_results(params, callback){
	cody1_adds();
	
	logverify("readstartwid","resultwid","startwid_get_result","","",{"age":"00","name":"start wid","wid":"addfielddefault","metadata.method":"defaultdto","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","booksdto.0.title":"none","booksdto.0.pages":"00","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.actiondto.0.action":"none","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.fieldname":"name","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"});
	logverify("readstartwid","resultwid","startwid_get_result","","",{"age":"00","name":"start wid","wid":"addfielddefault","metadata.method":"defaultdto","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","booksdto.0.title":"none","booksdto.0.pages":"00","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.actiondto.0.action":"none","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.fieldname":"name","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"});
	logverify("readstartwid","resultwid","startwid_get_result","","",{"age":"00","name":"start wid","wid":"addfielddefault","metadata.method":"defaultdto","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","booksdto.0.title":"none","booksdto.0.pages":"00","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.actiondto.0.action":"none","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.fieldname":"name","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"});
	logverify("readstartwid","resultwid","startwid_get_result","","",{"age":"00","name":"start wid","wid":"addfielddefault","metadata.method":"defaultdto","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","booksdto.0.title":"none","booksdto.0.pages":"00","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.actiondto.0.action":"none","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.fieldname":"name","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"});
	logverify("readstartwid","resultwid","startwid_get_result","","",{"age":"00","name":"start wid","wid":"addfielddefault","metadata.method":"defaultdto","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","booksdto.0.title":"none","booksdto.0.pages":"00","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.actiondto.0.action":"none","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.fieldname":"name","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"});
	logverify("readstartwid","resultwid","startwid_get_result","","",{"age":"00","name":"start wid","wid":"addfielddefault","metadata.method":"defaultdto","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","booksdto.0.title":"none","booksdto.0.pages":"00","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.actiondto.0.action":"none","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.fieldname":"name","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"});
	return verifysummary("resultwid");
}

exports.cody1 = cody1 = function cody1(params, callback){
	testclearstorage();
	results = [];
	
	results.push(cody1_results());
	
	var x = toObject(result);
    if (callback instanceof Function) { 
    	callback(x); 
    } else { if (params) {
    	return x; 
    	}
    }
}
*/