// goal create a mongoquery that can processes mongorawquery like these:
// {"$and":[ {"$or": [{data.0:{},{data 
// supporting nesting of and and ors
//
// it should return as output a list like this: [{"wid":"wid1", "wid":"wid2"}]
//
// via addhoc tests enter sample data and show results of differnt queries
//


// This is just a sample script. Paste your real code (javascript or HTML) here.
exports.mongoquery = mongoquery = function mongoquery(mongorawquery, callback) {

	function processquery (searchobject, querylist, operator) {
		// searchobject can be list or object: {wid1: {}, wid2: {}, wid3: {}} OR[{wid1: {}}, {wid2: {} }]
		// querylist in 'mongo' form: [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]}
		var potentialquery;
		var potentialoperator;
		var subquery;
		var searchobjectresult;
		var outlist = [];
		var eachresult;
		var item;

		function debugvars(varlist) {
			var allvars = {
				1: {
					"searchobject": searchobject,
					"querylist": querylist,
					"operator": operator,
					"potentialquery": potentialquery,
					"potentialoperator": potentialoperator,
					"subquery": subquery,
					"searchobjectresult": searchobjectresult,
					"outlist": outlist,
					"eachresult": eachresult,
					"item": item
				},
				2: {
					"potentialquery": potentialquery,
					"potentialoperator": potentialoperator,
					"subquery": subquery
				}
			};
			var resultObj = {};
			var vargroup;
			if (!varlist) {
				for (var eachgroup in allvars) {
					varlist.push(eachgroup);
				}
			}

			for (var eachgroup in varlist) {
				vargroup = varlist[eachgroup];
				resultObj = jsonConcat(resultObj, allvars[vargroup]);
			}
			return resultObj;
		}

		for (querylistindex in querylist) {
			var potentialquery = querylist[querylistindex];
			for (potentialoperator in potentialquery) {
				var subquery = potentialquery[potentialoperator];
				// if operator then recurse
				debugfn("before processquery", "processquery", "query", "begin", debugcolor, debugindent, debugvars([1, 2]));
				searchobjectresult = extend(searchobject); 
				// if we do need the above statemnt then we need to make a for each deep copy (see expand in utils)
				if ((potentialoperator == "$or") || (potentialoperator == "$and")) {
					debugfn("during processquery before", "processquery", "query", "middle", debugcolor, debugindent, debugvars([1]));
					debugcolor++;
					debugindent++;
					searchobjectresult = processquery(searchobject, subquery, potentialoperator);
					debugcolor--;
					debugindent--;
					debugfn("during processquery after", "processquery", "query", "middle", debugcolor, debugindent, debugvars([1]));
					}
				else
					{
					searchobjectresult = processoperator(searchobjectresult, potentialquery, operator)
					}

				debugfn("after processquery", "processquery", "query", "end", debugcolor, debugindent, debugvars([1]));

				for (item in searchobjectresult) { // combine results
					outlist.push(searchobjectresult[item])
				}
				debugfn("end processquery", "processquery", "query", "end", debugcolor, debugindent, debugvars([1]));

			}
		}
		return outlist;
	}

	// accepts a searchobject {wid1: {}, wid2: {}, wid3: {}} OR [{wid1: {}},{wid2: {}}]
	// parameters to look for inside {}.  [{"":""},{"":""}
	// operator to use			
	function processoperator(inobject, targetparameters, operator) {

		var eachwid;
		var eachparm;
		var equalobject = {};
		var notequalobject = {};
		var resultlist = [];
		var widrecord;
		var outobject = {};
		var searchobject = {};
		var wid;

			function debugvars(varlist) {
				var allvars = {
					1: {"inobject":inobject,
						"targetparameters":targetparameters,
						"operator":operator
						},
					2: {
						"eachwid": eachwid,
						"eachparm": eachparm,
						"equalobject": equalobject,
						"notequalobject": notequalobject,
						"resultlist": resultlist,
						"widrecord":widrecord,
						"outobject":outobject,
						"searchobject":searchobject,
						"wid":wid
					}
				};
				var resultObj = {};
				var vargroup;
				if (!varlist) {
					for (var eachgroup in allvars) {
						varlist.push(eachgroup);
					}
				}

				for (var eachgroup in varlist) {
					vargroup = varlist[eachgroup];
					resultObj = jsonConcat(resultObj, allvars[vargroup]);
				}
				return resultObj;
			}

		// convert list to object
		//if (searchobject instanceof Array) {
		//	for (eachwid in inobject) {
		//		for (wid in eachwid) {
		//			searchobject[wid] = eachwid[wid];
		//		}
		//	}
		//}
		searchobject=inobject;
		debugfn("processoperator", "processoperator", "query", "begin", debugcolor, debugindent, debugvars([1]));

		// query results are normally in should be in [{wid:{}}, {wid{}}, {wid:{}}] form

		for (eachwid in searchobject) { // got through whole list
			debugfn("processoperator middle", "processoperator", "query", "middle", debugcolor, debugindent, debugvars([2]));
			widrecord = searchobject[eachwid]; // load widrecord the whole raw records of this wid
			equalobject = {};
			notequalobject = {};
			for (eachparm in targetparameters) { // for each wid in list, now compare to each parameter, create equal / not equal results
			debugfn("processoperator middle II", "processoperator", "query", "middle", debugcolor, debugindent, debugvars([2]));
				if (widrecord[eachparm] == targetparameters[eachparm]) {
					equalobject[eachparm] = searchobject[eachwid]; // previosly targetparameters
				} else {
					notequalobject[eachparm] = searchobject[eachwid]; // previosly targetparameters
				}
			}
			debugfn("processoperator middle III", "processoperator", "query", "middle", debugcolor, debugindent, debugvars([2]));
			if (operator == "$or") { // if any matched (or) then add to resultobject
				if (Object.keys(equalobject).length !== 0) {
					var key = widrecord["wid"];
					resultlist.push(
						//{key: widrecord}
						//widrecord["wid"]
						searchobject[eachwid]
					)
				}
			}
			if (operator == "$and") { // if all matched (and) (notequalobject is empty) then add to resultobject
				if (Object.keys(notequalobject).length == 0) {
					var key = widrecord["wid"];
					resultlist.push(
						//{key: widrecord}
						//widrecord["wid"]
						searchobject[eachwid]
					)
				}
			}
			debugfn("processoperator end", "processoperator", "query", "end", debugcolor, debugindent, debugvars([2]));

		} // allwids

		return resultlist; // returns list: [{wid1: {}, wid2: {}, wid3: {}}]
	} // end processoperator

	var outlist = [];
	var inlist = [];
	var mongorawquerylist = [];
	var eachwid;

	mongorawquerylist.push(JSON.parse(mongorawquery)); // convert mongorawquery to list form
	// from {"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]} to [{"$operator":[{"":""},{"":""},{"$operator"::[{"":""},{"":""}]]}

	// getwidcopy() gets all the wids: {wid1: {}, wid2: {}} in object form

	for (eachwid in localStorage){
		if (eachwid.indexOf(widMasterKey) == 0) {
			inlist.push(ConvertToDOTdri(JSON.parse(localStorage[eachwid]))); //added convertodotdri
        }
    }

    inlist = processquery(inlist, mongorawquerylist, null);

    //outlist=inlist;
  	for (eachwid in inlist){
 		proxyprinttodiv('Function processquery', eachwid,99);
 		
  		outlist.push(ConvertFromDOTdri(inlist[eachwid]));
    }  

	callback(outlist);
}


/*exports.mongoquery = mongoquery = function mongoquery(queryString, callback) {
	delete queryString['executethis']; // **** needed?
//function mongoquery(queryString, target, callback) {
	if (queryString["mongowid"]) {
		//return querywidlocal(queryString, callback); 
		// taken out 11-13 ********
		querywidlocal(queryString, callback);
	}
	//
	else
	{

	proxyprinttodiv('Function mongoquery',  queryString,75);
	var enhancedreturn = getwidcopy();
	proxyprinttodiv('Function enhancedreturn',  enhancedreturn,75);
	if (queryString['mongorawquery']) {
		var mongorawquery=queryString['mongorawquery'];
		var ResultList=[];
		proxyprinttodiv('Function mongorawquery', mongorawquery);
		for (var item in mongorawquery) {
			// {"$and": {"data.primarywid":ParentWid, "data.secondarywid":ChildWid }};
			if (item=='$and') {
				var andquery=mongorawquery[item];
				var ParentWid = andquery['data.primarywid'];
				var ChildWid = andquery['data.secondarywid'];
				proxyprinttodiv('Function andquery', andquery);
				proxyprinttodiv('Function ParentWid', ParentWid,75);
				proxyprinttodiv('Function ChildWid', ChildWid,75);	
				for (var myvalue in enhancedreturn){ 	
					proxyprinttodiv('Function myvalue', myvalue);
					//if ((myvalue['primarywid']==ParentWid) && (myvalue['secondarywid']==ChildWid)) {
					if ((enhancedreturn[myvalue]['primarywid']==ParentWid) && (enhancedreturn[myvalue]['secondarywid']==ChildWid)) {	
						proxyprinttodiv('Function match found ', ({"key":"wid","value":myvalue}) ,75);
						ResultList.push({"key":"wid","value":myvalue});
						}
					}
				}	
			}
		}
	proxyprinttodiv('Function simpleQuery in : ResultList',  ResultList);
	//return ResultList
	callback(ResultList);

	}
};
 
function querywidlocal(sq, callback){

	var widInput=sq["mongowid"];
	var mongorelationshiptype=sq["mongorelationshiptype"];
	var mongorelationshipmethod=sq["mongorelationshipmethod"];
	var mongorelationshipdirection=sq["mongorelationshipdirection"];
	var mongowidmethod=sq["mongowidmethod"];
	var convertmethod=sq["convertmethod"];
	var dtotype=sq["dtotype"];

	var returnfromSimpleQuery=[];
	var enhancedreturn;
	var outobject=[];

	proxyprinttodiv('Function simpleQuery in : widInput',  widInput, 30);
	proxyprinttodiv('Function simpleQuery in : mongorelationshiptype',  mongorelationshiptype,30);
	proxyprinttodiv('Function simpleQuery in : mongorelationshipmethod',  mongorelationshipmethod,30);
	proxyprinttodiv('Function simpleQuery in : mongorelationshipdirection',  mongorelationshipdirection,30);			
	proxyprinttodiv('Function simpleQuery in : mongowidmethod',  mongowidmethod,30);
	proxyprinttodiv('Function simpleQuery in : convertmethod',  convertmethod,30);	
	proxyprinttodiv('Function simpleQuery in : dtotype',  dtotype,30);		
	if(mongorelationshipdirection == "forward") {
		// step through local storage looking for
	   	var widset=getwidcopy(); // get a copy of all local storage ***
	   //	enhancedreturn=widset; // remove
	   //}
		proxyprinttodiv('Function simpleQuery in : widset',  widset, 30);
	   	//for (var key in localStorage){ //***
	 	for (var widkey in widset){ 	
			//var myvalue = JSON.parse(localStorage.getItem(key)); //**
			proxyprinttodiv('Function simpleQuery in : widkey',  widkey,30);
			//var myvalue = getfrommongo({wid:widkey});

			var executeobject={};
			executeobject["wid"]=widkey;
			//var x = window['getfrommongo'];
			var x = window['getwid'];
			//var myvalue = executethis({wid:widkey}, getfrommongo);
			//var myvalue = executethis(executeobject, getfrommongo);
			var myvalue = executethis(executeobject, x);
			//proxyprinttodiv('Function simpleQuery in : myvalue',  myvalue);
			proxyprinttodiv('Function simpleQuery in : myvalue',  myvalue);
			if (myvalue["primarywid"] == widInput) {
                var widName = myvalue["primarywid"];
			    var key = myvalue["secondarywid"];
			     proxyprinttodiv('Function simpleQuery in : widName',  widName, 30);
			     proxyprinttodiv('Function simpleQuery in : key',  key, 30);
			    //var value = getfrommongo({wid:key}); // , dtotype:mongowidmethod
				executeobject={};
				executeobject["wid"]=key;
                //var value = executethis({wid:key}, getfrommongo);
                proxyprinttodiv('Function simpleQuery in : executeobject',  executeobject, 30);
                proxyprinttodiv('Function simpleQuery in : x fn', x.name, 30);
                var value = executethis(executeobject, x);
                //var value = executethis(executeobject, getfrommongo);
                proxyprinttodiv('Function simpleQuery in : value',  value, 30);
                delete value.wid;
                var resultObj = {};
                resultObj[key]= value;

                var widdto;
			   	//proxyprinttodiv('Function simpleQuery in : resultObj I',  resultObj);		  
				if ((value["metadata.method"] === undefined) || (value["metadata.method"] == "")) {	
					widdto = "";
				}else {
					widdto = value["metadata.method"]
				}

				// changed 10/30 if ((mongowidmethod !== undefined) && (mongowidmethod == widdto)) {
				if (((mongowidmethod !== undefined) && (mongowidmethod === widdto)) || (mongowidmethod === "")) {
					//proxyprinttodiv('Function simpleQuery in : resultObj',  resultObj);
					returnfromSimpleQuery.push(resultObj);
                }
            }
			// }
		}
	}
	proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery before', returnfromSimpleQuery, 30);
	//proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
	if (returnfromSimpleQuery.length>0) {
    returnfromSimpleQuery=returnfromSimpleQuery.sort(function (aObj, bObj) {
            var a = getAttributeByIndex(aObj, 0);
            var b = getAttributeByIndex(bObj, 0);
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
 		});
    }
    proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery aftersort', returnfromSimpleQuery, 30);
    proxyprinttodiv('Function simpleQuery in : returnfromSimpleQuery length', returnfromSimpleQuery.length, 30);
    if (returnfromSimpleQuery.length>0) {
    	if (mongorelationshipmethod=='first') {outobject.push(returnfromSimpleQuery[0]);}
   	 	if (mongorelationshipmethod=='last') {outobject.push(returnfromSimpleQuery[returnfromSimpleQuery.length-1]);}
		if (mongorelationshipmethod=='all') {outobject=returnfromSimpleQuery;}
    }
	proxyprinttodiv('Function simpleQuery in : enhancedreturn before',  outobject, 30);
	if ((!outobject) || (outobject==[]) || 
		(outobject===null) || (returnfromSimpleQuery.length==0)){outobject.push({"":""});}
	if (Object.keys(outobject).length == 0) {outobject.push({"":""});}
	proxyprinttodiv('Function simpleQuery in : enhancedreturn after',  outobject, 30);
	//return enhancedreturn;
	//enhancedreturn.push({'a':'b'});
	proxyprinttodiv('Function simpleQuery in : callback',  String(callback),30);	
	callback(outobject);
}
*/
// function addtomongo(widName, widobject) {
// 	addToLocalStorage(widMasterKey+widName, widobject);
// }

//function addtomongo(inputWidgetObject) {
exports.addtomongo = addtomongo = addtomongo = function addtomongo(inputWidgetObject, callback) {
//function addtomongo(inputWidgetObject, target, callback) {
	delete inputWidgetObject['executethis'];
	proxyprinttodiv('Function addtomongo inputWidgetObject',  inputWidgetObject);
	var widobject={};
	widobject=inputWidgetObject;
	var widName=widobject['wid'];
	//delete widobject['wid'];
//	proxyprinttodiv('Function addtomongo widobject',  widobject,1);
	addToLocalStorage(widMasterKey+widName, widobject);
	widobject['wid']=widName;
	//return widobject;
	callback(widobject);
};

//function getfrommongo(inputWidgetObject) {
exports.getfrommongo = getfrommongo = function getfrommongo(inputWidgetObject, callback) {
//function getfrommongo(inputWidgetObject, target, callback) {
	delete inputWidgetObject['executethis'];
	var output = {};
		if(inputWidgetObject["wid"]) {
			var widKey = inputWidgetObject["wid"].toLowerCase();

			output = getFromLocalStorage(widMasterKey + widKey);
//            proxyprinttodiv('Function getfrommongo results', output, 1);
			if ((output == null) || (output===undefined)) {output = {};}

		}
	//output['a']='b';
	callback(output);
	// callback(output);/// *** Commented by Saurabh 10/11
};//End of getfrommongo function

function getwidcopy() {
// step through local storage looking for
	var set={}; // get a copy of all local storage ***
    var resultobject={};
    var wid="";
	for (var key in localStorage){
		if (key.indexOf(widMasterKey) == 0) {
			key = key.substring(10);
				resultobject=getFromLocalStorage(widMasterKey + key);
                wid = resultobject['wid'];
    			set[wid] = resultobject;
            // $$$$$
        }
    }
	return set
}

//function getwidcopy() {
//// step through local storage looking for
//	var set={}; // get a copy of all local storage ***
//	for (var key in localStorage){
//		if (key.indexOf(widMasterKey) == 0) {
//			key = key.substring(10);
//			// set[key]=getfrommongo({wid:key});
//
//				var executeobject={};
//    			executeobject["wid"]=key;
//    			var x = window['getwid'];
//    			//var x = window['getfrommongo'];
//    			//set[key] = executethis(executeobject, x);
//    			set[key] = getFromLocalStorage(widMasterKey + key);
//    			//set[key]=executethis(executeobject,getfrommongo);
//
//			//set[key]=executethis({wid:key},getfrommongo);
//			}
//		}
//	//set['a']='b';
//	//set.push({'a':'b'});
//	return set
//}


function getFromLocalStorage(key){
	return JSON.parse(localStorage.getItem(key));
}

function addToLocalStorage(key, value){
	localStorage.setItem(key, JSON.stringify(value));
}
function clearLocalStorage(){
	widMasterKey = "widmaster_";
	localStorage.clear();
	potentialwid = 0;
}
function removeFromLocalStorage(key){
	localStorage.removeItem(key);
}
function resetMasterKey(){
	widMasterKey = "widmaster_";
}
