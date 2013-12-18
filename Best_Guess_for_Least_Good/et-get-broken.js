
(function (window) {

    
    exports.getwid = getwid = function getwid(inputWidgetObject, callback) {
        delete inputWidgetObject['executethis'];// ** added by Saurabh 11/9

        proxyprinttodiv('Function getwid in : inputWidgetObject',  inputWidgetObject,1);
        var outobject = {};

        getfrommongo(inputWidgetObject, function (results) {

            //var results = executethis(inputWidgetObject,getfrommongo);
            if (results && results["etstatus"]!="empty") {
                if (results["data"]) { outobject = results["data"]; }

                if (results['wid']) { outobject['wid'] = results['wid']; }
                else { outobject['wid']=""; }

                if (results['metadata.method']) { outobject['metadata.method'] = results['metadata.method']; }
                else { outobject['metadata.method']=""; }

            }
            callback(outobject);

        });
    };


    // Starting of securityCheck function
    // LM: I think this section is turned off and not used since it was breaking the code, but it 
    // should be saved and implemented later
    function securitycheck(widParameter, accessToken){ // accountwid and transactionType for future use
        proxyprinttodiv('Function securityCheck() in : ', 'before' );
        return true;
        var widInput= { mongowid:widParameter, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
        var accessTokenInput= { wid:accessToken, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
        var widOutput=querywid(widInput);
        proxyprinttodiv('Function querywid() out with  output : ', widOutput );
        var accessTokenOutput=querywid(accessTokenInput);
        proxyprinttodiv('Function querywid() out with  output : ', accessTokenOutput );
        var securityCheckOutput = widOutput['security']>accessTokenOutput['security'];
        proxyprinttodiv('Function securityCheck() out with  output : ', securityCheckOutput );
        return securityCheckOutput;
    }// End of querywid function

    // returns a made up dto base on maximum number of relationships, etc
    exports.aggressivedto = window.aggressivedto = aggressivedto = function aggressivedto(widInput, preamble, level, callback) { 
        //Debug='true';
        var err;
        var parameterObject;
        var moreDTOParameters={};
        var targetwid="";
        var nexttargetwid="";
        var nextpreamble="";
        var eachresult="";
        var key="";
        var rightparameters={};
        dtoGlobalParameters={};
        var executeobject={};
        var ret=undefined;

                // var debugvars = {"dtoGlobalParameters":dtoGlobalParameters,"parameterObject":parameterObject,"moreDTOParameters":moreDTOParameters};
        function debugvars() {
            var debugvars = {
                "err":err,
                "parameterObject":parameterObject,
                "moreDTOParameters":moreDTOParameters,
                "targetwid":targetwid,
                "nexttargetwid":nexttargetwid,
                "nextpreamble":nextpreamble,
                "eachresult":eachresult,
                "key":key,
                "rightparameters":rightparameters,
                "dtoGlobalParameters":dtoGlobalParameters,
                "executeobject":executeobject
            }
            return debugvars;
        }

        async.series({
            one: step1,
            check1: function (cbcheck){debugfn("aggressivedto after step1", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            two: step2,
            check2: function (cbcheck){debugfn("aggressivedto after step2", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            three: step3,
            check3: function (cbcheck){debugfn("aggressivedto after step3", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            four: step4,
            check4: function (cbcheck){debugfn("aggressivedto after step4", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            five: step5,
            check5: function (cbcheck){debugfn("aggressivedto after step5", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            six: step6,
            check6: function (cbcheck){debugfn("aggressivedto after step6", "desc", true, "from parent1", 99, debugvars());cbcheck("")}   
        },
        function (err, results) {
            console.log(JSON.stringify('done all in aggressivedto, Result is  '+JSON.stringify(results)));
                    ret = dtoGlobalParameters;

                    if (callback instanceof Function) {
                    callback(ret);
                    }
            });

        while(ret === undefined){}
        return ret;

        function step1(cb){
            proxyprinttodiv('Function aggressivedto()  level' , level, 20);
            proxyprinttodiv('Function aggressivedto()  widInput' , widInput,20);
            proxyprinttodiv('Function aggressivedto()  preamble' , preamble,20);
            if (!level) {level=99} else {level = level - 1}; //how many levels to try

            if (preamble === undefined) {preamble = "";}
            if (preamble !="") {preamble = preamble + ".";}
            proxyprinttodiv('Function aggressivedto()  processed preamble' , preamble);

            targetwid=widInput;
            //executeobject["executethis"]="getwid";
            executeobject["wid"]=widInput;
            proxyprinttodiv('Function aggressivedto()  executeobject I' , executeobject, 20);
            cb("");
        }
        
        function step2(cb){
            etexecute(executeobject,function (err,parameterObject){
                parameterObject = parameterObject;
                cb("");
            });
        }

        function step3(cb){
            if ((parameterObject!==undefined) && (parameterObject['metadata.method'] != "") && (parameterObject['metadata.method'] != targetwid))  {
                
                proxyprinttodiv('Function aggressivedto()  parameterObject I' , parameterObject,20);

                targetwid=parameterObject['metadata.method'];
                executeobject={};
                //executeobject["executethis"]=getwid;
                executeobject["wid"]=targetwid;
                proxyprinttodiv('Function aggressivedto()  executeobject II' , executeobject);
                
                etexecute(executeobject,function (err,res){
                    moreDTOParameters = res;
                    cb("");
                });
            }else{
                cb("");
            }
        }

        function step4(cb){
            if (Object.keys(moreDTOParameters).length !=0) {
                parameterObject=jsonConcat(parameterObject, moreDTOParameters)
            }
            // ** 11-1
            //parameterObject=getfrommongo({"wid":targetwid});
            proxyprinttodiv('Function aggressivedto()  parameterObject II' , parameterObject,20);
            cb("");
        }
            
        function step5(cb){
            //for (eachresult in parameterObject) {
            //  parameterObject[eachresult] = 'string';
            //  }
            proxyprinttodiv('Function aggressivedto()  parameterObject III' , parameterObject);
            proxyprinttodiv('Function aggressivedto()  targetwid' , targetwid);

            executeobject = {};
            executeobject["mongowid"] = targetwid;
            executeobject["mongorelationshiptype"] = "attributes";
            executeobject["mongorelationshipmethod"] = "all";
            executeobject["mongorelationshipdirection"] = "forward";
            executeobject["mongowidmethod"] = "";
            executeobject["convertmethod"] = "";
            executeobject["dtotype"] = "";
            executeobject["executethis"] = querywid;
            proxyprinttodiv('Function aggressivedto()  executeobject III' , executeobject,20);
           
            //it seems to like the two below--then it did not
            var x = window['querywid'];
            etexecute(executeobject,function (err,res){
                moreDTOParameters = res;
                cb("");
            });
        };

        function step6(cb){

            //it seems to like the two below:
            proxyprinttodiv('Function aggressivedto()  moreDTOParameters' , moreDTOParameters, 20);

            for (eachresult in moreDTOParameters) {
                rightparameters={};
                for (key in moreDTOParameters[eachresult]) {
                    rightparameters=moreDTOParameters[eachresult][key];
                }
                proxyprinttodiv('Function getWidMongo() left- ', key, 20);
                proxyprinttodiv('Function getWidMongo() right ', rightparameters, 20);

                // from dto create outgoing object
                if (moreDTOParameters[key]) {
                    parameterObject[key]=moreDTOParameters[key]
                }

                proxyprinttodiv('Function aggressivedto()  parameterObject V' , parameterObject, 20);
                proxyprinttodiv('Function aggressivedto()  key key' , key, 20);
                
                if (level > 0) {
                    aggressivedto(key, key, level, function (err,res){
                        parameterObject = jsonConcat(parameterObject, res)
                    });
                }
            }

            var dtoGlobalParameters={};
            for (eachresult in parameterObject) {
                dtoGlobalParameters[preamble + eachresult] = parameterObject[eachresult];
            }
            
            proxyprinttodiv('Function aggressivedto()  dtoGlobalParameters' , dtoGlobalParameters, 20);
            cb("");
        }
    }

    function getcleanparameters(resultObj, dtotype, accesstoken, cleanmethod, convertmethod,callback) {
            proxyprinttodiv('Function getcleanparameteres() resultObj' , resultObj,83);
            proxyprinttodiv('Function getcleanparameteres()  dtotype' , dtotype,83);
            proxyprinttodiv('Function getcleanparameteres()  accesstoken' , accesstoken);
            proxyprinttodiv('Function getcleanparameteres()  convertmethod' , convertmethod,83);
            var outputparameters = {};
            var dtoloc = 0;
            var proposedLeft = "";
            var proposedRight = "";
            var dtoobject = {};
            var inputParametersObject = {};
            var childdto = dtotype;
            var preAmble="";
            var item="";
            var moreParameters={};
            var executeobject={};
            var eafield="";
            var otherdtoobject={};
            var resultlist=[];
            var resultfromdot={};
            var ret = undefined;

            // var debugvars = {"outputparameters":outputparameters,"dtoobject":dtoobject};
            function debugvars() {
                var debugvars = {
                    "outputparameters":outputparameters,
                    "dtoloc":dtoloc,
                    "proposedLeft":proposedLeft,
                    "proposedRight":proposedRight,
                    "dtoobject":dtoobject,
                    "inputParametersObject":inputParametersObject,
                    "childdto":childdto,
                    "preAmble":preAmble,
                    "item":item,
                    "moreParameters":moreParameters,
                    "executeobject":executeobject,
                    "eafield":eafield,
                    "otherdtoobject":otherdtoobject,
                    "resultlist":resultlist,
                    "resultfromdot":resultfromdot
                }
                return debugvars;
            }

            async.series({
                one: step1,
                check1: function (cbcheck){debugfn("getcleanparameteres after step1", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
                two: step2,
                check2: function (cbcheck){debugfn("getcleanparameteres after step2", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                
            },
            function (err, results) {
                console.log(JSON.stringify('done all in getcleanparameters, Result is  '+JSON.stringify(results)));
                    ret = {
                    parms : outputparameters,
                    dto : dtoobject
                    }

                    if (callback instanceof Function) {
                    callback(err,ret);
                    }

            });

        while(ret === undefined){}
        return ret;

            function step1(cb){
                // goal of this section is to get inherited parameters
                if (((resultObj['wid']!==undefined)) &&
                        ((resultObj['wid']!==resultObj['metadata.method']) || (dtotype="defaultdto"))){

                    async.series({
                        one: step1n1,
                            check1: function (cbcheck){debugfn("getcleanparameteres after step1n1", "desc", true, "from step1", 99, debugvars());cbcheck("")},
                        two: step1n2,
                            check2: function (cbcheck){debugfn("getcleanparameteres after step1n2", "desc", true, "from step1", 99, debugvars());cbcheck("")},
                        three: step1n3,
                            check3: function (cbcheck){debugfn("getcleanparameteres after step1n3", "desc", true, "from step1", 99, debugvars());cbcheck("")}
                    },
                    function (err, results) {
                        console.log(JSON.stringify('done all in getwid, Result is  '+JSON.stringify(results)));
                        callback(outobject);
                    });

                    function step1n1(cb1){
                        aggressivedto(resultObj['wid'],"",10, function (err,res){
                            dtoobject=res;
                            proxyprinttodiv('Function getcleanparameteres()  aggressivedto ' , dtoobject, 83);
                            proxyprinttodiv('Function getcleanparameteres()  resultObj ' , resultObj,83);

                            resultfromdot=ConvertFromDOTdri(resultObj);
                            proxyprinttodiv('Function getcleanparameteres() resultfromdot' , resultfromdot,83);
                            cb1("");
                        });
                    }

                    function step1n2(cb1){
                        for (item in dtoobject) {
                            preamble="";
                            proposedLeft=item;
                            proposedRight=dtoobject[item];

                            if (proposedRight == 'inherit') {

                                function step1n2n1(cb2){
                                    dtoloc=proposedLeft.lastIndexOf(".");
                                    if (dtoloc!=-1) {
                                        preamble=proposedLeft.substring(0 ,dtoloc);
                                        proposedLeft=proposedLeft.substring(dtoloc+1, proposedLeft.length);
                                    }
                                    executeobject={};
                                    //executeobject["executethis"]=getwidmaster;
                                    executeobject["command.convertmethod"]="nowid";
                                    //executeobject["executethis"]=getwid;
                                    executeobject["wid"]=proposedLeft;
                                    cb2("");
                                }

                                function step1n2n2(cb2){
                                    executeobject['executethis']='getwid';
                                    etexecute(executeobject,function (err,res){
                                        moreParameters=res;
                                        // recursion problem...master actions apply to mater actions...apply
                                        proxyprinttodiv('Function getcleanparameteres()  to be pushed moreParameters----' , moreParameters,83);
                                        //more parameters should just be pushed to result
                                        //for (eafield in moreParameters) {
                                        cb2("");    
                                    })
                                }

                                function step1n2n3(cb2){
                                    if (moreParameters) {
                                        proxyprinttodiv('Function getcleanparameteres() preamble' , preamble,83);
                                        proxyprinttodiv('Function getcleanparameteres() resultfromdot[preamble]' , resultfromdot[preamble],83);
                                        //resultfromdot[preamble].push(moreParameters);
                                    };
                                    
                                    proxyprinttodiv('Function getcleanparameteres()  after each inherit' , resultObj,83);
                                    cb2("");
                                }

                                async.series({
                                    one: step1n2n1,
                                        check1: function (cbcheck){debugfn("getcleanparameteres after step1n2n1", "desc", true, "from step1n2", 99, debugvars());cbcheck("")},
                                    two: step1n2n2,
                                        check2: function (cbcheck){debugfn("getcleanparameteres after step1n2n2", "desc", true, "from step1n2", 99, debugvars());cbcheck("")},
                                    three: step1n2n3,
                                        check3: function (cbcheck){debugfn("getcleanparameteres after step1n2n3", "desc", true, "from step1n2", 99, debugvars());cbcheck("")},
                                },
                                function (err, results) {
                                    console.log(JSON.stringify('done all in getwidmaster step1n2, Result is  '+JSON.stringify(results)));
                                    cb1(err,resultObj);
                                });
                                cb1("");
                            }
                        }
                        cb1("");
                    }    

                    function step1n3(cb1){
                        resultObj=ConvertToDOTdri(resultfromdot);
                        cb1("");
                    }
                }

                cb("");
            }
            

            function step2(cb){
                
                proxyprinttodiv('Function getcleanparameteres()  after overall inherit' , resultObj,83);
                // read dto -- and delete what should not surive

                if (dtotype=="") {dtotype=resultObj["metadata.method"]};
               
                if (resultObj["metadata.method"] != dtotype) {
                    for (item in resultObj) {  // now step through each record that could be changed
                        proposedLeft=item;
                        proposedRight=resultObj[item];

                        proxyprinttodiv('Function getcleanparameteres()  item' , item, 84);
                        proposedLeft=""; // work on left first...check if add or remvove

                        dtoloc=item.indexOf(dtotype+".");
                        proxyprinttodiv('Function getcleanparameteres()  dtoloc' , dtoloc);
                        if (dtoloc!=-1) {
                            proposedLeft=item.substring(dtoloc+dtotype.length+3 ,item.length);
                            if (convertmethod=="dtonum") {
                                proposedLeft=item.substring(dtoloc ,item.length);
                            }
                            if (convertmethod=="num") {
                                proposedLeft=item.substring(dtoloc+dtotype.length+1 ,item.length);
                            }
                        }

                        // remove addthis from the results if it was getwidmaster
                        proposedLeft=proposedLeft.replace("addthis.","");

                        proxyprinttodiv('Function getcleanparameteres()  proposedLeft' , proposedLeft,84);
                        proxyprinttodiv('Function getcleanparameteres()  proposedRight' , proposedRight,84);
                        if (proposedLeft!="") {outputparameters[proposedLeft]=proposedRight}
                        proxyprinttodiv('Function getcleanparameteres()  outputparameters' , outputparameters,84);
                    }
                }else{ 
                    for (item in resultObj) { 
                        proposedLeft=item;
                        proxyprinttodiv('Function getcleanparameteres() proposedLeft' , proposedLeft,83);
                        proposedLeft=proposedLeft.replace("addthis.","");
                        proxyprinttodiv('Function getcleanparameteres() converted Left' , proposedLeft,83);
                        outputparameters[proposedLeft]=resultObj[item]; 
                    }
                }

             
                proxyprinttodiv('Function getcleanparameteres() resultObj end end end' , resultObj,83);
                proxyprinttodiv('Function getcleanparameteres()  dtotype end end end' , dtotype,83);
                proxyprinttodiv('Function getcleanparameteres()  convertmethod end end end ' , convertmethod,83);
                proxyprinttodiv('Function getcleanparameteres()  outputparameters end end end ' , outputparameters, 83);
                proxyprinttodiv('Function getcleanparameteres()  dtoobject end end end' , dtoobject, 83);
              
                cb("");
            }
    }

    exports.getwidmaster =  getwidmaster = function getwidmaster(parameters, callback){
        proxyprinttodiv('Function getwidmaster() incoming parameters, now go to getwidmasterLevel I ' , parameters, 10);
        parameters = tolowerparameters(parameters, {'wid':'add', 'metadata.method':'add', 'command.dtotype':'add', 'command.convertmethod':'add', 'command.checkflag':'add', 'command.inherit':'add', 'command.accesstoken':'add'});

        delete parameters['executethis']; //** added 11/2
        proxyprinttodiv('Function getwidmaster() incoming parameters, now go to getwidmasterLevel ' , parameters, 10);

        var wid = parameters.wid;
        //  var resultObj = {};
        proxyprinttodiv('Function getwidmasterLevel() incoming parameters, to getWidMongo' , parameters,10);

        var dtotype=parameters["command.dtotype"];
        var inherit=parameters["command.inherit"];
        var accesstoken=parameters["command.accesstoken"];
        var checkflag=parameters["command.checkflag"];
        var convertMethod=parameters["command.convertmethod"];
        var resultObj = {};
        var moreParameters = {};
        var ret=undefined;

        function debugvars() {
            var debugvars = {
                "parameters":parameters,
                "dtotype":dtotype,
                "inherit":inherit,
                "accesstoken":accesstoken,
                "checkflag":checkflag,
                "convertMethod":convertMethod,
                "resultObj":resultObj,
                "moreParameters":moreParameters
            }
            return debugvars;
        }

        proxyprinttodiv('Function getwidmasterLevel() wid ' , wid,10);

        function step1(cb){
            getWidMongo(wid, convertMethod, accesstoken, dtotype,function (err,res){
                resultObj = res;
                proxyprinttodiv('Function getwidmasterLevel() first get ' , resultObj,10);
                cb("");
            });
        }

        function step2(cb){
            // could be moved inside clean parm?
            if(inherit) { // inherit points to wid with more datan- Grab the params from mongo(local storage)
                executeobject={};
                executeobject["executethis"]=getwid;
                executeobject["wid"]=inherit;
                etexecute(executeobject,function (err,res){
                    moreParameters=res;
                    if(moreParameters) {
                        resultObj = jsonConcat(resultObj, moreParameters);  // if duplicates then currentLevelObject{} wins
                    }
                    cb("");
                });
            }else{
                cb("");
            }
        }

        function step3(cb){
            if (checkflag!="") { // see if right side of output needs to be made mongo compatible
                dtoList=objectToList(dtoGlobalParameters);
                resultList = objectToList(resultObj);
                resultList = CleanBasedOnCheckflagList(checkflag, resultList, dtoList);
                resultObj = listToObject(resultList);
            }

            olddebug=Debug;
            proxyprinttodiv('Function getwidmasterLevel() ** before ' , resultObj,10);
            if ((Object.keys(resultObj).length !== 0) && (resultObj['wid']!=resultObj['metadata.method'])) {
                function step3n1(cb1){
                    getcleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod, function (err,res){
                        resultObj=res;
                        resultObj=resultObj.parms
                        cb1("");
                    });
                }

                async.series({
                    one: step3n1,
                        check1: function (cbcheck){debugfn("getcleanparameteres after step3n1", "desc", true, "from step3", 99, debugvars());cbcheck("")} //LM

                },
                function (err, results) {
                    console.log(JSON.stringify('done all in getwidmaster step3n, Result is  '+JSON.stringify(results)));
                    cb1(err,results);
                });
            }

            proxyprinttodiv('Function getwidmasterLevel() ** after ' , resultObj,10);
            if ((convertMethod=="nowid") || (convertMethod=="dto")) { //(convertMethod=="nowid") { -- added 11/12 **
                delete resultObj["wid"];
                delete resultObj["metadata.method"];
            }

            if (convertMethod == "toobject") { resultObj = ConvertFromDOTdri(resultObj); }
            cb("");
        }

        // var debugvars = {"resultObj":resultObj};

        async.series({
            one: step1,
            check1: function (cbcheck){debugfn("getwidmasterLevel after step1", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            two: step2,
            check2: function (cbcheck){debugfn("getwidmasterLevel after step2", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            three: step3,
            check3: function (cbcheck){debugfn("getwidmasterLevel after step3", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
            
        },
        function (err, results) {
            console.log(JSON.stringify('done all in getwidmaster, Result is  '+JSON.stringify(results)));
                    ret = resultObj;

                    if (callback instanceof Function) {
                    callback(ret);
                    }

            });

        while(ret === undefined){}
        return ret;
}

    // Starting of getAndFormatNextLevel function
    function getAndFormatNextLevel(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, accesstoken, dtoin, callback) {
        var executeobject={};
        //var relatedParameters = simpleQuery(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, ""); // removed dto type from end
        var drillDownParameters = {};
        var rowresult = ""
        var nextLevelParameters = [];
        var nextLevelParametersObject = {};
        var proposedLeft = "";
        var proposedRight = "";
        var item = "";
        var iteration = 0;
        var relatedParameters;
        var ret=undefined;

        function debugvars() {
            var debugvars = {
                "executeobject":executeobject,
                "drillDownParameters":drillDownParameters,
                "rowresult":rowresult,
                "nextLevelParameters":nextLevelParameters,
                "nextLevelParametersObject":nextLevelParametersObject,
                "proposedLeft":proposedLeft,
                "proposedRight":proposedRight,
                "item":item,
                "iteration":iteration,
                "relatedParameters":relatedParameters
            }
            return debugvars;
        }

        function step1(cb){

            proxyprinttodiv('Function getAndFormatNextLevel() arriving widInput', widInput,11);
            proxyprinttodiv('-------Function getAndFormatNextLevel() in : mongowidmethod', mongowidmethod,11);
            proxyprinttodiv('-------Function getAndFormatNextLevel() in : convertmethod', convertmethod,11);
            proxyprinttodiv('-------Function getAndFormatNextLevel() in : dtoin', dtoin,11);
            proxyprinttodiv('-------Function getAndFormatNextLevel() in : mongorelationshipmethod', mongorelationshipmethod,11);

            executeobject["mongowid"]=widInput;
            executeobject["mongorelationshiptype"]=mongorelationshiptype;
            executeobject["mongorelationshipmethod"]=mongorelationshipmethod;
            executeobject["mongorelationshipdirection"]=mongorelationshipdirection;
            executeobject["mongowidmethod"]=mongowidmethod;
            executeobject["convertmethod"]=convertmethod;
            executeobject["dtotype"]="";
            executeobject["executethis"]=querywid;
            proxyprinttodiv('Function getAndFormatNextLevel()  executeobject III' , executeobject);
            cb("");    
        }

        function step2(cb){
            executeobject['executethis']='querywid';
            etexecute(executeobject,function (err,res){
                relatedParameters=res;
                cb("");
            });
        }

        function step3(cb){
            proxyprinttodiv('Function getAndFormatNextLevel() in : relatedParameters  after simpleQuery++++ starting related ++++', relatedParameters,11);
            
            if (Object.keys(relatedParameters).length == 0) {return nextLevelParametersObject};
            cb("");    
        }   
        
        function step4(cb){
            for(iteration = 0 ; (iteration< countKeys(relatedParameters)) ; iteration++ ) {
                rowresult=relatedParameters[iteration];

                proxyprinttodiv('Function getAndFormatNextLevel() in : iteration in going through results from simpleQuery', iteration,11);
                for (key in rowresult) {
                    proposedLeft = key;
                    proposedRight = rowresult[key];
                }


                if (convertmethod == "wid") {
                    nextLevelParameters.push({"key":mongowidmethod,"value":proposedLeft});
                }
                //alert(convertmethod);
                if (convertmethod == "json") {

                    nextLevelParameters.push({"key":mongowidmethod,"value":JSON.stringify(proposedRight)});

                }

                if ((convertmethod == "") || (convertmethod == "dto") || (convertmethod == "toobject") ||
                    (convertmethod == "num") || (convertmethod == "dtonum")) {
                    proxyprinttodiv('Function getAndFormatNextLevel() in convertmethod=blank, about to get drilldown: ', proposedLeft, 11);
                    getWidMongo(proposedLeft, convertmethod, accesstoken, dtoin,function (err,res){
                        drillDownParameters = res;
                        proxyprinttodiv('Function getAndFormatNextLevel() after drillDown object: ', drillDownParameters, 11);
                        //proxyprinttodiv('----------Function getAndFormatNextLevel() mongowidmethod: ', mongowidmethod);
                        proxyprinttodiv('Function getAndFormatNextLevel() arriving widInput II', widInput, 11);
                        proxyprinttodiv('-------Function getAndFormatNextLevel() in : mongowidmethod II', mongowidmethod, 11);
                        proxyprinttodiv('-------Function getAndFormatNextLevel() in : convertmethod II', convertmethod, 11);
                        proxyprinttodiv('-------Function getAndFormatNextLevel() in : dtoin II', dtoin, 11);
                        proxyprinttodiv('-------Function getAndFormatNextLevel() in : mongorelationshipmethod II', mongorelationshipmethod, 11);
                        proxyprinttodiv('Function getAndFormatNextLevel() in : proposedLeft II', proposedLeft, 11);
                        proxyprinttodiv('Function getAndFormatNextLevel() in : proposedRight II', proposedRight, 11);

                        for(item in drillDownParameters) {
                            // LM: original line
                            if ((convertmethod == "dto") && ((item=="wid") || (item=="metadata.method"))) {
                            } // left empty by design
                            // ** do we need to replicate at top level?
                            else {

                                proposedLeft = mongowidmethod + "." + String(iteration) + "." + item;  // removed +1
                            //                  if ((convertmethod == "dto") && (relatedParameters.length == 1)) { 

                                // added 11-18
                                proxyprinttodiv('Function getAndFormatNextLevel() mongorelationshipmethod', mongorelationshipmethod,11);
                                if (((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) ||
                                    (mongorelationshipmethod=="last")) {
                                    //if ((convertmethod == "dto") && (countKeys(relatedParameters) == 1)) {
                                    proposedLeft = mongowidmethod+"."+item;
                                }
                                // this should not put brackets if only one child

                                proposedRight = drillDownParameters[item];

                            }

                            nextLevelParameters.push({"key":proposedLeft,"value":proposedRight});

                            proxyprinttodiv('Function getAndFormatNextLevel() forloop nextLevelParameters as it grows', nextLevelParameters,11);
                            
                        }
                    }); //dtoGlobalParameters, mongowidmethod);
                }

                //proxyprinttodiv('Function getAndFormatNextLevel() nextLevelParameters list result : ', nextLevelParameters);
            }
            cb("");
        }

        function step5(cb){

            nextLevelParametersObject=listToObject(nextLevelParameters);

            proxyprinttodiv('Function getAndFormatNextLevel() nextLevelParametersObject +++++++finishing realted : ', nextLevelParametersObject,11);
            cb("");
        }

        // var debugvars = {"nextLevelParametersObject":nextLevelParametersObject,"nextLevelParameters":nextLevelParameters};

        async.series({
            one: step1,
            check1: function (cbcheck){debugfn("getAndFormatNextLevel after step1", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            two: step2,
            check2: function (cbcheck){debugfn("getAndFormatNextLevel after step2", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            three: step3,
            check3: function (cbcheck){debugfn("getAndFormatNextLevel after step3", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            four: step4,
            check4: function (cbcheck){debugfn("getAndFormatNextLevel after step4", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            five: step5,
            check5: function (cbcheck){debugfn("getAndFormatNextLevel after step5", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
            
        },
        function (err, results) {
            console.log(JSON.stringify('done all in getAndFormatNextLevel, Result is  '+JSON.stringify(results)));
                    ret = nextLevelParametersObject;

                    if (callback instanceof Function) {
                    callback(err, ret);
                }

            });

        while(ret === undefined){}
        return ret;
}

    function getWidMongo(widInput, convertMethod, accessToken, dtoin, callback) {

        var olddebug=Debug;
        //Debug=olddebug;
        proxyprinttodiv('Function getWidMongo() in widInput: ', widInput);
        proxyprinttodiv('Function getWidMongo() convertmethod', convertMethod);

        if (!widInput) {
            callback("","");
        }else{
            var dtoGlobalParameters = {};
            var attr = "";
            var nextLevelParameters = {};
            var outgoingParameters = {};
            var moreDTOParameters = {};
            var moreParameters = {};
            var currentLevelObjectList = [];
            var dtoGlobalParametersList = [];
            var addedobject = {};
            var eachresult = "";
            var createdto ='false';
            var createrelationships = 'false';
            var savedto = 'false';
            var createid = widInput;
            var dtotype = "";
            var currentLevelObject;
            var executeobject={};
            var ret=undefined;

            function debugvars() {
                var debugvars = {
                   "dtoGlobalParameters":dtoGlobalParameters,
                    "attr":attr,
                    "nextLevelParameters":nextLevelParameters,
                    "outgoingParameters":outgoingParameters,
                    "moreDTOParameters":moreDTOParameters,
                    "currentLevelObjectList":currentLevelObjectList,
                    "dtoGlobalParametersList":dtoGlobalParametersList,
                    "addedobject":addedobject,
                    "eachresult":eachresult,
                    "createdto":createdto,
                    "createrelationships":createrelationships,
                    "savedto":savedto,
                    "createid":createid,
                    "dtotype":dtotype,
                    "currentLevelObject":currentLevelObject,
                    "executeobject":executeobject
                }
                return debugvars;
            }

            function step1(cb){
                executeobject["wid"]=widInput;
                proxyprinttodiv('Function getWidMongo()  executeobject' , executeobject);
                cb("");
            }

            function step2(cb){
                executeobject['executethis']='getwid';
                etexecute(executeobject,function (err,res){
                    currentLevelObject = res;
                    proxyprinttodiv('Function getWidMongo() currentLevelObject ++++++ top level object ', currentLevelObject,10);
                    cb("");
                })
            }

            function step3(cb){
                function step3n1(cb1){
                    dtotype=currentLevelObject["metadata.method"];
                    // Get the wid from mongo(local storage)
                    executeobject={};
                    executeobject["wid"]=dtotype;
                    cb1("");
                }
                function step3n2(cb1){
                    executeobject['executethis']='getwid';
                    etexecute(executeobject,function (err,res){
                        dtoGlobalParameters = res;
                        console.log(dtoGlobalParameters);
                        proxyprinttodiv('Function getWidMongo() dtoGlobalParameters -- 111', dtoGlobalParameters,10);
                        cb1("");
                    });
                }
                    
                if ((currentLevelObject["metadata.method"]!==undefined) && (currentLevelObject["metadata.method"]!=="")) {
                    async.series({
                        one: step3n1,
                        two: step3n2
                    },
                    function (err, results) {
                        console.log(JSON.stringify('done all in getWidMongo step3, Result is  '+JSON.stringify(results)));
                        cb("");
                    });
                }
            }

            function step4(cb){

                proxyprinttodiv('Function getWidMongo() dtoGlobalParameters isEmpty', (isEmpty(dtoGlobalParameters)));
                proxyprinttodiv('Function getWidMongo() widInput ', widInput,10);

                aggressivedto(widInput,"",1,function (err,res){
                    function step4n1(cb1){
                        moreParameters=res;
                        
                        proxyprinttodiv('Function getWidMongo() moreParameters ', moreParameters,10);
                        if ((dtoGlobalParameters['metadata.method']=="") || (dtoin=="defaultdto")) {
                            dtoGlobalParameters=moreParameters
                        }

                        proxyprinttodiv('Function getWidMongo() dtoGlobalParameters IV ', dtoGlobalParameters);

                        currentLevelObjectList = objectToList(currentLevelObject);
                        dtoGlobalParametersList = objectToList(dtoGlobalParameters);


                        proxyprinttodiv('Function getWidMongo() dtoGlobalParameters near start', dtoGlobalParameters);
                        proxyprinttodiv('Function getWidMongo() currentLevelObject II ', currentLevelObject,10);

                        currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
                        currentLevelObjectList = currentLevelObjectList.match;
                        currentLevelObject = listToObject(currentLevelObjectList);

                        proxyprinttodiv('Function getWidMongo() currentLevelObject ----about to start relationships----', currentLevelObject,10);


                        outgoingParameters=currentLevelObject;

                        dtoGlobalParameters=moreParameters; // line added 11-9 -- step through an agressive dto
                        cb1("");
                    }

                    async.series({
                        one: step4n1,
                            check1: function (cbcheck){debugfn("getWidMongo after step4n1", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                    },
                    function (err, results) {
                        console.log(JSON.stringify('done all in getWidMongo step4, Result is  '+JSON.stringify(results)));
                        cb(err,"");
                    });
                });

            }

            function step5(cb){

                function loop(cb1){
                    proxyprinttodiv('Function getWidMongo() step through dto ', (item + ' ' + dtoGlobalParameters[item]),10);
                    nextLevelParameters = {};
                    attr = dtoGlobalParameters[item];
                    if ((attr == "onetoone")  || (attr == "onetomany")) { // 10-24 || (attr == "inherit"))  {
                        function step5n1n1(cb2){
                            if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property
                                function step5n1n1n1(cb3){
                                    getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken, dtoin, function (err,res){
                                        nextLevelParameters = res;

                                        if (attr == "onetomany") { // if dto states 'onetomany' then search for related records that match property
                                            function step5n1n1n1n1(cb4){
                                                getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, dtoin,function (err,res){
                                                    nextLevelParameters = res;

                                                    proxyprinttodiv('Function getWidMongo() came back from getAndFormatNextLevel, nextLevelParameters= ', nextLevelParameters);
                                                    proxyprinttodiv('Function getWidMongo() step through dto ', (item+' '+dtoGlobalParameters[item]));
                                                    outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
                                                    proxyprinttodiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
                                                }); //removed dtoGlobalParameters

                                                cb4("");
                                            }

                                            async.series({
                                                one: step5n1n1n1n1,
                                                    check1: function (cbcheck){debugfn("getWidMongo after step5n1n1n1n1", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                                            },
                                            function (err, results) {
                                                console.log(JSON.stringify('done all in getWidMongo step5n1n1n1, Result is  '+JSON.stringify(results)));
                                                cb3("");
                                            });
                                        } // 11-9 readded inherit from cleanparms here:
                                        
                                    }); // removed inherit dtoGlobalParameters
 
                                    cb3("");
                                }

                                async.series({
                                            one: step5n1n1n1,
                                                check1: function (cbcheck){debugfn("getWidMongo after step5n1n1n1", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                                            
                                        },
                                        function (err, results) {
                                            console.log(JSON.stringify('done all in getWidMongo step5n1n1, Result is  '+JSON.stringify(results)));
                                            cb2("");
                                        });
                            } // 10-5 took away dtotype --
                            cb2("");
                        }

                        async.series({
                            one: step5n1n1,
                               check1: function (cbcheck){debugfn("getWidMongo after step5n1n1", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                        },
                        function (err, results) {
                            console.log(JSON.stringify('done all in getWidMongo step5n1, Result is  '+JSON.stringify(results)));
                            cb1("");
                        });

                    } // if
                }

                function step5n1(cb1){
                    for (var item in dtoGlobalParameters) {
                        loop(cb1)
                    } // for
                    cb1("");
                }


                function step5n2(cb1){
                    // if any of the saves produced an error, err would equal that error
                    proxyprinttodiv('Function getWidMongo() end of relationsips---------------- : ', outgoingParameters);
                    Debug=olddebug;
                    cb1("");
                }

                async.series({
                    one: step5n1,
                        check1: function (cbcheck){debugfn("getWidMongo after step5n1", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
                    two: step5n2,
                        check1: function (cbcheck){debugfn("getWidMongo after step5n2", "desc", true, "from parent1", 99, debugvars());cbcheck("")}
                },
                function (err, results) {
                    console.log(JSON.stringify('done all in getWidMongo step5, Result is  '+JSON.stringify(results)));
                    cb("");
                });

            }

            // var debugvars = {"outgoingParameters":outgoingParameters,"dtoGlobalParametersList":dtoGlobalParametersList,"moreDTOParameters":moreDTOParameters,"addedobject":addedobject,"currentLevelObject":currentLevelObject};

            async.series({
                one: step1,
                check1: function (cbcheck){debugfn("getWidMongo after step1", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
                two: step2,
                check2: function (cbcheck){debugfn("getWidMongo after step2", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
                three: step3,
                check3: function (cbcheck){debugfn("getWidMongo after step3", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
                four: step4,
                check4: function (cbcheck){debugfn("getWidMongo after step4", "desc", true, "from parent1", 99, debugvars());cbcheck("")},
                five: step5,
                check5: function (cbcheck){debugfn("getWidMongo after step5", "desc", true, "from parent1", 99, debugvars());cbcheck("")}   
            },
            function (err, results) {
                console.log(JSON.stringify('done all in getWidMongo, Result is  '+JSON.stringify(results)));
                    ret = outgoingParameters;

                    if (callback instanceof Function) {
                    callback(err, ret);
                    }

            });

        while(ret === undefined){}
        return ret;
    }

})(typeof window === "undefined" ? global : window);
