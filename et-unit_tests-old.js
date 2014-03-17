// copyright (c) 2014 DRI
// {"query":{"$eq":{"type":"minute"}}}
exports.filter1 = filter1 = function filter1(params, callback) {
    debuglevel = 37;
    debugname = "";
    debugcat = "";
    debugsubcat = "code";
    var status = false;

    // create dtos  
    var executeList = [{
        "executethis": "addwidmaster",
        "wid": "first",
        "one":"1",
        "type":"minute"
    }, {
        "executethis": "addwidmaster",
        "wid": "second",
        "two":"2",
        "type":"hour"
    }, {
        "executethis": "addwidmaster",
        "wid": "third",
        "three":"3",
        "type":"second"
    }];
    execute({"executethis":executeList,"command.query.$eq.type":"minute"}, function (err, res) {
        proxyprinttodiv('Function filter1 added   -- ', res, 37);
        callback(null);
    });
}


function etunittesttester(params, callback) {
    var unittestdb = 
        [   // Call func_b with no pre or post...it should simply remove 'e' and add 'g' to the parameters"
            [{"fn": "ettestt1"},    [{"category":"executethis",   "subcategory":"dothis",    "type": "minute", 
            "test": "executethis calling a function "}]], 

            // Call func_b, but also tell preexecutetunittesttestere to call func_a and postexecute to call func_c.
            [{"fn": "ettestt2"},    [{"type": "minute", "category":"execute",       "subcategory":"dothis",
            "test": "executethis calling a function"}]], 

            // Call func_b with only pre func_a...this intends to call func_a in preexecute and func_b in midexecute and nothing in post execute.
            [{"fn": "ettestt3"},    [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function"}]], 

            // Call func_b with only post func_a -- same result as t3. This is to make sure that not calling pre is ok...this calls only mid and post.
            [{"fn": "ettestt3a"},   [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function"}]], 

            // Call mid with func_b and post with func_c, assuring that multiple functions exectue well, no matter where in the pre/mid/post they are placed. 
            [{"fn": "ettestt4"},    [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function"}]], 
 
            // Call mid with func_b and pre with func_c, assuring that multiple functions exectue well, no matter where in the pre/mid/post they are placed.
            [{"fn": "ettestt4a"},   [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function"}]], 
 
            // Call func_b with func_a for pre and post to ensure that calling the same function more than once is not a problem for the system.
            [{"fn": "ettestt5"},    [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function"}]], 
    
            // Double check that calling func_b with func_c for pre and post to ensure that calling the same function more than once is not a problem for the system. Essentially showing that tt5 was not a fluke, but a repeatable concept.
            [{"fn": "ettestt6"},    [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function"}]], 
    
            // Call async_b with no pre or post...it should simply remove 'e' and add 'g' to the parameters  
            [{"fn": "ettestast1"},  [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with pre calling func_a and post calling func_c...each simply deletes a prameter and add a parameter.
            [{"fn": "ettestast2"},  [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with only pre async_func_a...is it ok to not call post...yes it is.
            [{"fn": "ettestast3"},  [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with only post async_func_a -- same result as ast3
            [{"fn": "ettestast3a"}, [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with only post calling async_c  
            [{"fn": "ettestast4"},  [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with only pre async_func_c -- same result as t4
            [{"fn": "ettestast4a"}, [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with async_func_a for pre and post
            [{"fn": "ettestast5"},  [{"type": "minute", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    
            // Call async_func_b with async_func_c for pre and post
            [{"fn": "ettestast6"},  [{"type": "second", "category":"execute",       "subcategory":"dothis",         
            "test": "executethis calling a function asynchronously"}]], 
    


            // Add a dto and get it with 
            [{"fn": "ettestag1"  }, [{"type": "second", "category":"add get",       "subcategory":"getwidmaster",   
            "test": "to use addwidmaster and getwidmaster"}]], 
     
            // Add 2 wids and get 1 wid
            [{"fn": "ettestag2"},   [{"type": "second", "category":"add get",       "subcategory":"getwidmaster",   
            "test": "to use addwidmaster and getwidmaster"}]],
     
            // Add wids 3 levels deep and get a wid related with them.
            [{"fn": "ettestag3"},   [{"type": "second", "category":"add get",       "subcategory":"getwidmaster",   
            "test": "to use addwidmaster and getwidmaster"}]], 
     


            // Call redir_b. The config should remap redir_b to call func_b with no pre or post execution.
            [{"fn": "ettestct1"},   [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b. The config should remap redir_b to call func_b and pre to remap redir_a to func_a, and also remap redir_c to func_c.
            [{"fn": "ettestct2"},   [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b. Also call pre with redir_a remapped to func_a, and not post call at all.
            [{"fn": "ettestct3"},   [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b with only post redir_a -- same result as ct3, but putting the only remap call in post instead of pre.
            [{"fn": "ettestct3a"},  [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b with only post calling func_c remapped to func_c. Simply ensures that the remapping can be any function in either pre or post.
            [{"fn": "ettestct4"},   [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b with only pre redir_c -- same result as t4
            [{"fn": "ettestct4a"},  [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b with a remapping of redir_a to func_a for both pre and post.
            [{"fn": "ettestct5"},   [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // Call redir_b with redir_c for pre and post, essentiall rerunning ct5 but ensuring that other functions can be used with the same effect.
            [{"fn": "ettestct6"},   [{"type": "quasi",  "category":"configuration", "subcategory":"remapping",      
            "test": "remapping functions"}]], 

            // This will try pre with func a, but remapped with a configuration thatis passed into executethis...it still wants to hit func_b with mid
            [{"fn": "ettestct7"},   [{"type": "daily",  "category":"configuration", "subcategory":"config_params",  
            "test": "sending config_params"}]], 

            // This test asserts that the tryorder in the config is successful and causes executethis to call dothis, not server, or the others. As of jan 28, it still fails to reorder them and calls the server instead. It breaks the code and will not simply call func_b locally.
            [{"fn": "ettestct8"},   [{"type": "daily",  "category":"configuration", "subcategory":"config_params",  
            "test": "sending config_params"}]], 

            // This test is to call does_not_exist, remaapped in the parameters to remap does_not_exist to func_b and execute...so far it doesn't work....
            [{"fn": "ettestct9"},   [{"type": "quasi",  "category":"configuration", "subcategory":"does_not_exist", 
            "test": "calling config data that does not exist"}]], 

            // This test is to call func_b and in pre, call does_not_exist that is remapped to func_a...and then to func_b. So far it does not work, and never has.
            [{"fn": "ettestct10"},  [{"type": "quasi",  "category":"configuration", "subcategory":"does_not_exist", 
            "test": "calling config data that does not exist"}]], 

            // This test is to call func_b, remap does_not_exist_1 to func_a, remap does_not_exist_2 to func_c, and execute params to func_a, and then to func_b, and then func_c. None of these ever work...
            [{"fn": "ettestct11"},  [{"type": "quasi",  "category":"configuration", "subcategory":"does_not_exist", 
            "test": "calling config data that does not exist"}]], 

            // This test is to test a config where a and b do not exist, but func_c does and c will execute. You should not see any data for ct13_output_a, or b. The params of mid should insert the cer2:booberry in the results
            [{"fn": "ettestct13"},  [{"type": "quasi",  "category":"configuration", "subcategory":"does_not_exist", 
            "test": "calling config data that does not exist"}]], 

            // Here is the modified ct14 test This test is to test a config where a config with params is sent to pre, mid, and post. The results should have the a,b,c cereals, along with the regular params.
            [{"fn": "ettestct14"},  [{"type": "quasi",  "category":"configuration", "subcategory":"config_params",  
            "test": "sending config_params"}]], 

            // This will send the alphabits param in the preexecute config, but will be overriding it in the args.. Which one will win out? It does...the config params are lost and the 'arg' params from the config win out. 
            [{"fn": "ettestct15"},  [{"type": "quasi",  "category":"configuration", "subcategory":"config_conflict",
            "test": "sending config_params that conflict with other params"}]], 

            // Here the object is to get a set of config params from the config itself by using setconfig2 and checking for the config params in the assertion wid.
            [{"fn": "ettestct16"},  [{"type": "quasi",  "category":"configuration", "subcategory":"config_params",  
            "test": "sending config_params"}]], 

            // To test if the executedefault gets fired, ct17 calls a 'doesnotexist' function to look for. It will not find and function or a parameter, so it should find executedefault that has a param to be expected to be sent to func_b.
            [{"fn": "ettestct17"},  [{"type": "hourly", "category":"configuration", "subcategory":"does_not_exist", 
            "test": "calling config data that does not exist"}]], 

            // This is to use the params in preexecute to ensure that the preexecute params are getting used by dothis
            [{"fn": "ettestct18"},  [{"type": "hourly", "category":"configuration", "subcategory":"config_params",  
            "test": "sending config_params"}]], 

            // This test is to send params to executethis. There will be params in the call to executethis, config file, and the config in the params sent to executethis. There are params that will be used and changed throughout the call...they are alfa, bravo, and charlie. At this point, the args sent to executethis will always win...not any of the 3 places in the config that they are set.
            [{"fn": "ettestct19"},  [{"type": "hourly", "category":"configuration", "subcategory":"config_conflict",
            "test": "sending config_params that conflict with other params"}]], 

            // Here the goal is to see if the config of the left and right conflict, which wins? Ad of now, the right side wins. The params for func_a,b,c are all set to be 2, but they come out as 4, because that is what pre,mid, and post set them to.
            [{"fn": "ettestct20"},  [{"type": "hourly", "category":"configuration", "subcategory":"config_conflict",
            "test": "sending config_params that conflict with other params"}]]   
        ]

    var err;
    var subset = [];

    // iterate through unittestdb
    for (var i = 0; i < unittestdb.length; i++) {
        // check to see if params matches type in unittestdb
        if (unittestdb[i][1][0]['type'] === params['type']) {
            // push the fn name on the array_of_tests_to_run
            subset.push( unittestdb[i] );
        }
    }
        // console.log('-------------  subset: \n' + JSON.stringify(subset, '-', 4));
        
        executethismultiple(subset, function (err, result) { 
            callback (err, result); 
        });
}

exports.mc1 = mc1 = function mc1(params, callback) {

    var subset = [];
    subset = [
        [{
            "fn": "ettestt1"
        }, {}]
    ];
    console.log('-------------  subset: \n' + JSON.stringify(subset, '-', 4));

    executethismultiple(subset, function (err, result) {
        callback(err, result);
    });
}


// List of tests:
// 
// The tt tests will test the various combinations of calling pre, mid, and post by passing parameters
// of the pre and post (mis is the execute).
// 
// ettestt1     Call func_b with no pre or post...it should simply remove 'e' and add 'g' to the parameters
// ettestt2     Call func_b, but also tell preexecutetunittesttestere to call func_a and postexecute to call func_c.
// ettestt3     Call func_b with only pre func_a...this intends to call func_a in preexecute and func_b 
//              in midexecute and nothing in post execute.
// ettestt3a    Call func_b with only post func_a -- same result as t3. This is to make sure that not
//              calling pre is ok...this calls only mid and post.
// ettestt4     Call mid with func_b and post with func_c, assuring that multiple functions exectue
//              well, no matter where in the pre/mid/post they are placed. 
// ettestt4a    Call mid with func_b and pre with func_c, assuring that multiple functions exectue
//              well, no matter where in the pre/mid/post they are placed.
// ettestt5     Call func_b with func_a for pre and post to ensure that calling the same
//              function more than once is not a problem for the system.
// ettestt6     Double check that calling func_b with func_c for pre and post to ensure that calling the same
//              function more than once is not a problem for the system. Essentially showing that tt5 was not
//              a fluke, but a repeatable concept.
//              
// The astt tests will mirror the tt tests, but all the functions that are called will intentionally
// take a long time (500ms) to check how the async portion of the code handles functions that can take a long
// time to complete.            
//              
// ettestast1   Call async_b with no pre or post...it should simply remove 'e' and add 'g' to the parameters  
// ettestast2   Call async_func_b with pre calling func_a and post calling func_c...each simply
//              deletes a prameter and add a parameter.
// ettestast3   Call async_func_b with only pre async_func_a...is it ok to not call post...yes it is.
// ettestast3a  Call async_func_b with only post async_func_a -- same result as ast3
// ettestast4   Call async_func_b with only post calling async_c  
// ettestast4a  Call async_func_b with only pre async_func_c -- same result as t4
// ettestast5   Call async_func_b with async_func_a for pre and post
// ettestast6   Call async_func_b with async_func_c for pre and post
// 
// ettestag1    
// ettestag2    
// ettestag3    
// 
// The ctt tests will alter the configuration. By default, the config is altered twice. First by passing
// in parameters that will alter the config. Second by changing the config itself and stripping out any
// mention of the configuration in the parameters. All the redir_ functions are intentionally calling a function
// that is mapped to another function. I.e. redir_a is mapped to func_a, redir_b to func_b, and redir_c to func_c.
// After ct6, the tests start to try calling functions that are not there
// 
// ettestct1    Call redir_b. The config should remap redir_b to call func_b with no pre or post execution.
// ettestct2    Call redir_b. The config should remap redir_b to call func_b and pre to remap redir_a to func_a, and
//              also remap redir_c to func_c.
// ettestct3    Call redir_b. Also call pre with redir_a remapped to func_a, and not post call at all.
// ettestct3a   Call redir_b with only post redir_a -- same result as ct3, but putting the only remap
//              call in post instead of pre.
// ettestct4    Call redir_b with only post calling func_c remapped to func_c. Simply ensures that the remapping can be any 
//              function in either pre or post.
// ettestct4a   Call redir_b with only pre redir_c -- same result as t4
// ettestct5    Call redir_b with a remapping of redir_a to func_a for both pre and post.
// ettestct6    Call redir_b with redir_c for pre and post, essentiall rerunning ct5 but ensuring that other functions
//              can be used with the same effect.
// ettestct7    This will try pre with func a, but remapped with a configuration thatis passed into executethis...
//              it still wants to hit func_b with mid
// ettestct8 doest not run yet --- This test asserts that the tryorder in the config is successful
//              and causes executethis to call dothis, not server, or the others. As of jan 28, it
//              still fails to reorder them and calls the server instead. It breaks the code and will not
//              simply call func_b locally.
// ettestct9    This test is to call does_not_exist, remaapped in the parameters to remap does_not_exist to 
//              func_b and execute...so far it doesn't work....
// ettestct10   This test is to call func_b and in pre, call does_not_exist that is remapped to func_a...and then to func_b. So
//              far it does not work, and never has.
// ettestct11   This test is to call func_b, remap does_not_exist_1 to func_a,
//              remap does_not_exist_2 to func_c, and execute params to func_a, and then to func_b, and then func_c.
//              None of these ever work...
// ettestct13   This test is to test a config where a and b do not exist, but func_c does and c will execute. You
//              should not see any data for ct13_output_a, or b. The params of mid should insert the cer2:booberry in
//              the results
// ettestct14   Here is the modified ct14 test
//              This test is to test a config where a config with params is sent to pre, mid, and post.
//              The results should have the a,b,c cereals, along with the regular params.
// ettestct15   This will send the alphabits param in the preexecute config, but will be overriding it in the args..
//              Which one will win out? It does...the config params are lost and the 'arg' params from the config win out. 
// ettestct16 doest not run yet --- Here the object is to get a set of config params from the config itself by using setconfig2 and checking for the 
//              config params in the assertion wid.
// ettestct17 doest not run yet --- To test if the executedefault gets fired, ct17 calls a 'doesnotexist' function to look for. It will not find and function
//              or a parameter, so it should find executedefault that has a param to be expected to be sent to func_b.
// ettestct18 doest not run yet --- This is to use the params in preexecute to ensure that the preexecute params are getting used by dothis
// ettestct19 doest not run yet --- This test is to send params to executethis. There will be params in the call to executethis, config file, and the config in the params
//              sent to executethis. There are params that will be used and changed throughout the call...they are alfa, bravo, and charlie. At this point, 
//              the args sent to executethis will always win...not any of the 3 places in the config that they are set.
// ettestct20 doest not run yet --- Here the goal is to see if the config of the left and right conflict, which wins? Ad of now, the right side wins. The params for func_a,b,c are 
// all set to be 2, but they come out as 4, because that is what pre,mid, and post set them to.

// at stands for 'all tests', this will run a suite 
// of tests that are known to run, but not necessarily pass


exports.ettestat = ettestat = function ettestat(params, callback) {
    var result = [];
    var err;

    ettesttt(result, function (err, r1) {
        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& r1: \n' + JSON.stringify(r1));
        result.push(r1);

        ettestastt(result, function (err, r2) {
            // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& r2: \n' + JSON.stringify(r2));
            result.push(r2);

            ettestctt(result, function (err, r3) {
                // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& r3: \n' + JSON.stringify(r3));
                result.push(r3);
                callback(err, result);
            });
        });
    });
}

exports.ettestatc = ettestatc = function ettestatc(params, callback) {
    var result = {};
    var err;
    ettestagtt(result, function (err, result) {
        callback(err, result);
    });
}



exports.ettestat2 = ettestat2 = function ettestat2(params, callback) {
    var result;
    var err;
    var target = {
        'type': 'minute'
    };

    result = etunittesttester(target, function (err, result) {
        callback(err, result);
    });
}

exports.ettestat3 = ettestat3 = function ettestat3(params, callback) {
    var result;
    var err;
    var target = {
        'type': 'second'
    };

    result = etunittesttester(target, function (err, result) {
        callback(err, result);
    });
}

exports.ettestat4 = ettestat4 = function ettestat4(params, callback) {
    var result;
    var err;
    var target = {
        'type': 'quasi'
    };

    result = etunittesttester(target, function (err, result) {
        callback(err, result);
    });
}


// console.log('[][][][][][][][][][][][][][][][][][][][][][][][]\n' + JSON.stringify(result, '-', 4));      
// -------------------------------------------------------------------------------------------------------
// This series of tests will send parameters to func_b.
// There are variations of pre and post execute applied to 
// the calling of func_b. In pre, mid, and post, a parameter is 
// deleted, and a parameters is added to verify that each level of  
// the executethis is being accessed.

exports.ettesttt = ettesttt = function ettesttt(params, callback) {
    execute([{
            "executethis": "ettestt1"
        }, {
            "executethis": "ettestt2"
        }, {
            "executethis": "ettestt3"
        }, {
            "executethis": "ettestt3a"
        }, {
            "executethis": "ettestt4"
        }, {
            "executethis": "ettestt4a"
        }, {
            "executethis": "ettestt5"
        }, {
            "executethis": "ettestt6"
        }],
        function (err, res) {
            console.log('^^^^^^^^^^^^^^^ res  ^^^^^^:  ' + JSON.stringify(res));
            console.log('^^^^^^^^^^^^^^^ done ^^^^^^');
            callback(err, res);
        }
    );
}

// This series is identical to tt, except that the functions called 
// by executethis are async, and therefore use callbacks to return data
// to the calling function.
exports.ettestastt = ettestastt = function ettestastt(params, callback) {
    execute([{
            "executethis": "ettestast1"
        }, {
            "executethis": "ettestast2"
        }, {
            "executethis": "ettestast3"
        }, {
            "executethis": "ettestast3a"
        }, {
            "executethis": "ettestast4"
        }, {
            "executethis": "ettestast4a"
        }, {
            "executethis": "ettestast5"
        }, {
            "executethis": "ettestast6"
        }],
        function (err, res) {
            callback(err, res);
        }
    );
}

// This series uses the sync functions of a,b, and c with changes to the
// configuration parameters. This allows for calling func_b by calling
// redir_b instead of func_b, redir_a instead of func_a, and so on.
exports.ettestctt = ettestctt = function ettestctt(params, callback) {
    execute([{
            "executethis": "ettestct1"
        }, {
            "executethis": "ettestct2"



        }, {
            "executethis": "ettestct3"
        }, {
            "executethis": "ettestct3a"
        }, {
            "executethis": "ettestct4"
        }, {
            "executethis": "ettestct4a"
        }, {
            "executethis": "ettestct5"
        }, {
            "executethis": "ettestct6"
        }, {
            "executethis": "ettestct7"


            //     // ct8 will break the ctt test run
            //     // // },{ 
            //     // // "executethis": "ettestct8"


        }, {
            "executethis": "ettestct9"
        }, {
            "executethis": "ettestct10"
        }, {
            "executethis": "ettestct11"
        }, {
            "executethis": "ettestct13"
        }, {
            "executethis": "ettestct14"
        }, {
            "executethis": "ettestct15"



            // }, {
            //     "executethis": "ettestct16"
            // These still need the configs to be converted to be passed in as parameters.
            // },{ 
            // "executethis": "ettestct18"
            // },{
            // "executethis": "ettestct19"
            // },{ 
            // "executethis": "ettestct20"
        }],
        function (err, res) {
            console.log('special*** \n' + JSON.stringify(res, "-", 4));
            callback(err, res);
        }
    );
}

// These are the add/get tests to stress out the dto/dot notation system
exports.ettestagtt = ettestagtt = function ettestagtt(params, callback) {
    execute([{
            "executethis": "ettestag1"
        }, {
            "executethis": "ettestag2"
        }, {
            "executethis": "ettestag3"
        }],
        function (err, res) {
            callback(err, res);
        }
    );
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// functions a,b,c manipulate parameters
// Call func_b with no pre or post...it should simply remove 'e' and add 'g' to the parameters
exports.ettestt1 = ettestt1 = function ettestt1(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2"
        }],
        function (err, res) {
            res = logverify("ettestt1_result", res[0][0], [{
                "c": "0",
                "d": "1",
                "g": "4"
            }]);
            callback(err, res);
        });
}

// Not an 'at' test...used to test the verify system. This is a passing test.
exports.ettestt1s = ettestt1s = function ettestt1s(params, callback) {
    clearLocalStorage();
    res = logverify("ettestt1s_result", {
        "d": "1",
        "c": "0",
        "g": "4"
    }, {
        "d": "1",
        "c": "0",
        "g": "4"
    });
    var err;
    callback(err, res);
}

// Not an 'at' test...used to tes the veryify system. This is a failing test.
exports.ettestt1sf = ettestt1sf = function ettestt1sf(params, callback) {
    clearLocalStorage();
    res = logverify("ettestt1sf_result", {
        "d": "1",
        "c": "0",
        "g": "4"
    }, {
        "d": "1",
        "c": "0",
        "g": "4",
        "h": "5"
    });
    var err;
    callback(err, res);
}

// Call func_b, but also tell preexecute to call func_a and postexecute to call func_c.
exports.ettestt2 = ettestt2 = function ettestt2(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_a",
            "postexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt2_result", res[0][0], [{
                "f": "3",
                "g": "4",
                "h": "5"
            }]);
            callback(err, res);
        });
}

// Call func_b with only pre func_a...this intends to call func_a in preexecute and func_b 
// in midexecute and nothing in post execute.
exports.ettestt3 = ettestt3 = function ettestt3(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_a"
        }],
        function (err, res) {
            res = logverify("ettestt3_result", res[0][0], [{
                "c": "0",
                "f": "3",
                "g": "4"
            }]);
            callback(err, res);
        });
}

// Call func_b with only post func_a -- same result as t3. This is to make sure that not
// calling pre is ok...this calls only mid and post.
exports.ettestt3a = ettestt3a = function ettestt3a(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "func_a"
        }],
        function (err, res) {
            res = logverify("ettestt3a_result", res[0][0], [{
                "c": "0",
                "g": "4",
                "f": "3"
            }]);
            callback(err, res);
        });
}

// Call mid with func_b and post with func_c, assuring that multiple functions exectue
// well, no matter where in the pre/mid/post they are placed.
exports.ettestt4 = ettestt4 = function ettestt4(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt4_result", res[0][0], [{
                "d": "1",
                "g": "4",
                "h": "5"
            }]);
            callback(err, res);
        });
}

// Call mid with func_b and pre with func_c, assuring that multiple functions exectue
// well, no matter where in the pre/mid/post they are placed.
exports.ettestt4a = ettestt4a = function ettestt4a(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt4a_result", res[0][0], [{
                "d": "1",
                "g": "4",
                "h": "5"
            }]);
            callback(err, res);
        });
}
// Call func_b with func_a for pre and post to ensure that calling the same
// function more than once is not a problem for the system.
exports.ettestt5 = ettestt5 = function ettestt5(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_a",
            "postexecute": "func_a"
        }],
        function (err, res) {
            res = logverify("ettestt5_result", res[0][0], [{
                "c": "0",
                "f": "3",
                "g": "4"
            }]);
            callback(err, res);
        });
}
// Double check that calling func_b with func_c for pre and post to ensure that calling the same
// function more than once is not a problem for the system. Essentially showing that tt5 was not 
// a fluke, but a repeatable concept.
exports.ettestt6 = ettestt6 = function ettestt6(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_c",
            "postexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt6_result", res[0][0], [{
                "d": "1",
                "h": "5",
                "g": "4"
            }]);
            callback(err, res);
        });
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// This whole section will mirror the tt tests, but call functions that have intentional
// delays to test the async portioins of the system.
exports.ettestast1 = ettestast1 = function ettestast1(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2"
        }],
        function (err, res) {
            res = logverify("ettestast1_result", res[0][0], [{
                "d": "1",
                "c": "0",
                "g": "4"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with pre calling func_a and post calling func_c...each simply
// deletes a prameter and add a parameter.
exports.ettestast2 = ettestast2 = function ettestast2(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_a",
            "postexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast2_result", res[0][0], [{
                "f": "3",
                "g": "4",
                "h": "5"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with only pre async_func_a...is it ok to not call post...yes it is.
exports.ettestast3 = ettestast3 = function ettestast3(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_a"
        }],
        function (err, res) {
            res = logverify("ettestast3_result", res[0][0], [{
                "c": "0",
                "f": "3",
                "g": "4"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with only post async_func_a -- same result as t3
exports.ettestast3a = ettestast3a = function ettestast3a(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "async_func_a"
        }],
        function (err, res) {
            res = logverify("ettestast3a_result", res[0][0], [{
                "c": "0",
                "g": "4",
                "f": "3"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with only post
exports.ettestast4 = ettestast4 = function ettestast4(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast4_result", res[0][0], [{
                "d": "1",
                "g": "4",
                "h": "5"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with only pre async_func_c -- same result as t4
exports.ettestast4a = ettestast4a = function ettestast4a(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast4a_result", res[0][0], [{
                "d": "1",
                "g": "4",
                "h": "5"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with async_func_a for pre and post
exports.ettestast5 = ettestast5 = function ettestast5(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_a",
            "postexecute": "async_func_a"
        }],
        function (err, res) {
            res = logverify("ettestast5_result", res[0][0], [{
                "c": "0",
                "f": "3",
                "g": "4"
            }]);
            callback(err, res);
        });
}
// Call async_func_b with async_func_c for pre and post
exports.ettestast6 = ettestast6 = function ettestast6(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_c",
            "postexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast6_result", res[0][0], [{
                "d": "1",
                "h": "5",
                "g": "4"
            }]);
            callback(err, res);
        });
}
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// Call redir_b. The config should remap redir_b to call func_b with no pre or post execution.
exports.ettestct1 = ettestct1 = function ettestct1(params, callback) {
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "d": "1",
        "c": "0",
        "g": "4",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    })
    // var res = master_test_and_verify (testname,          parameters, assert, database, command, callback) {

    var res = master_test_and_verify("ettestct1", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b. The config should remap redir_b to call func_b and pre to remap redir_a to func_a, and
// also remap redir_c to func_c.
exports.ettestct2 = ettestct2 = function ettestct2(params, callback) {
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "redir_a",
        "postexecute": "redir_c",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "f": "3",
        "g": "4",
        "h": "5",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    });
    var res = master_test_and_verify("ettestct2", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b. Also call pre with redir_a remapped to func_a, and no post call at all.
exports.ettestct3 = ettestct3 = function ettestct3(params, callback) {
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "redir_a",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "c": "0",
        "f": "3",
        "g": "4",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    })
    var res = master_test_and_verify("ettestct3", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only post redir_a -- same result as ct3, but putting the only remap
// call in post instead of pre.
exports.ettestct3a = ettestct3a = function ettestct3a(params, callback) {
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "postexecute": "redir_a",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "c": "0",
        "g": "4",
        "f": "3",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    });
    var res = master_test_and_verify("ettestct3a", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only post calling func_c remapped to func_c. Simply ensures that the remapping can be any 
// function in either pre or post.
exports.ettestct4 = ettestct4 = function ettestct4(params, callback) {
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "postexecute": "redir_c",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "d": "1",
        "g": "4",
        "h": "5",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    })
    var res = master_test_and_verify("ettestct4", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only pre redir_c -- same result as t4
exports.ettestct4a = ettestct4a = function ettestct4a(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "redir_c",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "d": "1",
        "g": "4",
        "h": "5",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    })
    var res = master_test_and_verify("ettestct4a", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with a remapping of redir_a to func_a for both pre and post.
exports.ettestct5 = ettestct5 = function ettestct5(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "redir_a",
        "postexecute": "redir_a",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "c": "0",
        "f": "3",
        "g": "4",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    })
    var res = master_test_and_verify("ettestct4a", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with redir_c for pre and post, essentiall rerunning ct5 but ensuring that other functions
// can be used with the same effect.
exports.ettestct6 = ettestct6 = function ettestct6(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "redir_c",
        "postexecute": "redir_c",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "g": "4",
        "d": "1",
        "h": "5",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    })
    var res = master_test_and_verify("ettestct6", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// This will try pre with func a, but remapped with a configuration that
// is passed into executethis...it still wants to hit func_b with mid
exports.ettestct7 = ettestct7 = function ettestct7(params, callback) {
    clearLocalStorage();
    var parameters = {
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "a",
        "executethis": "func_b",
        "configuration": {
            "preexecute": [{
                "dothis": "dothis",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }],
            "a": [{
                "dothis": "alertFn1",
                "tryorder": 0,
                "executeorder": 0,
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "ct7": "did some alerting",
        "configuration": {},
        "d": "1",
        "c": "0",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct7", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This test asserts that the tryorder in the config is successful
// and causes executethis to call dothis, not server, or the others. As of jan 28, it
// still fails to reorder them and calls the server instead. It breaks the code and will not
// simply call func_b locally.
exports.ettestct8 = ettestct8 = function ettestct8(params, callback) {
    clearLocalStorage();
    // config = setconfig5();
    var parameters = {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "midexecute": [{
                "executeorder": 1,
                "tryorder": 10,
                "dothis": 'server',
                "params": {}
            }, {
                "executeorder": 1,
                "tryorder": 4,
                "dothis": 'executeparam',
                "params": {}
            }, {
                "executeorder": 1,
                "tryorder": 7,
                "dothis": 'executegetwid',
                "params": {}
            }, {
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {}
            }]
        }
    }
    var assert = [];
    assert.push({
        "d": "1",
        "c": "0",
        "g": "4"
    });

    var res = master_test_and_verify("ettestct8", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This test is to call does_not_exist, remaapped in the parameters to remap does_not_exist to func_b and execute...so far it doesn't work....
exports.ettestct9 = ettestct9 = function ettestct9(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "does_not_exist",
        "does_not_exist": "func_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    // since we are overiding how functions are maped here, "does_not_exist_* are not deleted from the params
    var assert = [];
    assert.push({
        "does_not_exist": "func_b",
        "d": "1",
        "c": "0",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct9", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// This test is to call does_not_exist, remapped to a function in the parameters. So far it does not work...never has.
exports.ettestct9a = ettestct9a = function ettestct9a(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "does_not_exist",
        "does_not_exist": "function () { return {data: 'Keg of Beer'}; }"
    }
    var assert = [];
    assert.push({
        "data": "Keg of Beer"
    });
    var res = master_test_and_verify("ettestct9a", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This test is to call func_b and in pre, call does_not_exist that is remapped to func_a...and then to func_b. So
// far it does not work, and never has.
exports.ettestct10 = ettestct10 = function ettestct10(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "does_not_exist",
        "does_not_exist": "func_a",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    // since we are overiding how functions are maped here, "does_not_exist_* are not deleted from the params
    var assert = [];
    assert.push({
        "does_not_exist": "func_a",
        "f": "3",
        "c": "0",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct10", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This test is to call func_b, remap does_not_exist_1 to func_a,
// remap does_not_exist_2 to func_c, and execute params to func_a, and then to func_b, and then func_c.
// None of these ever work...
exports.ettestct11 = ettestct11 = function ettestct11(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "does_not_exist_1",
        "does_not_exist_1": "func_a",
        "postexecute": "does_not_exist_2",
        "does_not_exist_2": "func_c",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    // since we are overiding how functions are maped here, "does_not_exist_* are not deleted from the params
    var assert = [];
    assert.push({
        "does_not_exist_1": "func_a",
        "does_not_exist_2": "func_c",
        "f": "3",
        "h": "5",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct11", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This test is to send in a config as parameter of a config. This allows for the server to recieve a config
// from a config that is passed in the parameters.
exports.ettestct12 = ettestct12 = function ettestct12(params, callback) {
    clearLocalStorage();
    var parameters = {
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "a",
        "configuration": {
            "preexecute": [{
                "dothis": "dothis",
                "tryorder": "1",
                "executeorder": "1"
            }],
            "a": [{
                "dothis": "alertFn1",
                "tryorder": "1",
                "executeorder": "1"
            }],
            "params": [{
                "a": "b",
                "c": "d",
                "e": "f"
            }]
        }
    }
    var assert = [];
    assert.push({
        "c": "0",
        "d": "1",
        "ettestct12": "did some alerting",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct12", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This test is to test a config where a and b do not exist, but func_c does and c will execute. You
// should not see any data for ct13_output_a, or b. The params of mid should insert the cer2:booberry in
// the results
exports.ettestct13 = ettestct13 = function ettestct13(params, callback) {
    clearLocalStorage();

    var parameters = {
        "executethis": "a",
        "executethis": "b",
        "executethis": "fire_c",
        "configuration": {
            "preexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer1': 'alphabits'
                }
            }],
            "midexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer2': 'booberry'
                }
            }],
            "postexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer3': 'chex'
                }
            }]
        }

    }
    var assert = [];
    assert.push({
        "fire_c": "fire_c is now fired",
        "cer2": "booberry"
    });
    var res = master_test_and_verify("ettestct13", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This is original ct14 test
// // This test is to test a config where a config with params is sent to pre, mid, and post.
// // The results should have the a,b,c cereals, along with the regular params.
// exports.ettestct14 = ettestct14 = function ettestct14(params, callback) {
//  clearLocalStorage();
//  config = setconfig6();
//  execute([{
//      "executethis": "func_b",
//      "preexecute": "func_a",
//      "postexecute": "func_c",
//      "c": "0",
//      "d": "1",
//      "e": "2"
//  }],
//  function (err, res) {
//      res = logverify("ettestct14_result", res[0][0], {
//      "g": "4",
//      "cer2": "booberry",
//      "cer1": "alphabits",
//      "f": "3",
//      "cer3": "chex",
//      "h": "5"
//  });
//  callback(err, res);
//  });
// }

// Here is the modified ct14 test
// This test is to test a config where a config with params is sent to pre, mid, and post.
// The results should have the a,b,c cereals, along with the regular params.
exports.ettestct14 = ettestct14 = function ettestct14(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "postexecute": "func_c",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "preexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer1': 'alphabits'
                }
            }],
            "midexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer2': 'booberry'
                }
            }],
            "postexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer3': 'chex'
                }
            }]
        }
    };

    var assert = [];
    assert.push({
        "g": "4",
        "cer2": "booberry",
        "cer1": "alphabits",
        "f": "3",
        "cer3": "chex",
        "h": "5",
        "configuration": {}
    });
    var res = master_test_and_verify("ettestct14", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}


// This will send the alphabits param in the preexecute config, but will be overriding it in the args..
// Which one will win out? It does...the config params are lost and the 'arg' params from the config win out.
exports.ettestct15 = ettestct15 = function ettestct15(params, callback) {
    clearLocalStorage();
    // config = setconfig6();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "cer1": "booberry",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "preexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer1': 'alphabits'
                }
            }],
            "midexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer2': 'booberry'
                }
            }],
            "postexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer3': 'chex'
                }
            }]
        }
    }
    assert = [];
    assert.push({
        "g": "4",
        "cer1": "booberry",
        "f": "3",
        "c": "0",
        "cer2": "booberry",
        "configuration": {
            "preexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer1': 'alphabits'
                }
            }],
            "midexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer2': 'booberry'
                }
            }],
            "postexecute": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": 'dothis',
                "params": {
                    'cer3': 'chex'
                }
            }]
        }

    });
    var res = master_test_and_verify("ettestct15", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Here the object is to get a set of config params from the config itself by using setconfig2 and checking for the 
// config params in the assertion wid.
exports.ettestct16 = ettestct16 = function ettestct16(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "mock_server",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 1,
                "executeorder": 1,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 1,
                "executeorder": 1,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 1,
                "executeorder": 1,
                "params": {}
            }],
            "mock_server": [{
                "dothis": "cic_output",
                "tryorder": 1,
                "executeorder": 1,
                "params": {
                    "configuration": {
                        "login1": [{
                            "executeorder": 1,
                            "tryorder": 1,
                            "dothis": "login",
                            "params": {}
                        }]
                    }
                }
            }]
        }
    }

    var assert = [];
    assert.push({
        "c": "0",
        "d": "1",
        "g": "4",
        "configuration": {
            "login1": [{
                "executeorder": 1,
                "tryorder": 1,
                "dothis": "login",
                "params": {}
            }],
            "redir_a": [{
                "dothis": "func_a",
                "tryorder": 1,
                "executeorder": 1,
                "params": {}
            }],
            "redir_b": [{
                "dothis": "func_b",
                "tryorder": 1,
                "executeorder": 1,
                "params": {}
            }],
            "redir_c": [{
                "dothis": "func_c",
                "tryorder": 1,
                "executeorder": 1,
                "params": {}
            }]
        }
    });
    var res = master_test_and_verify("ettestct16", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This is to use the params in preexecute to ensure that the preexecute params are getting used by dothis
exports.ettestct17 = ettestct17 = function ettestct17(params, callback) {
    clearLocalStorage();
    var parameters = {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "midexecute": [{
                "dothis": "dothis",
                "tryorder": "1",
                "executeorder": "1",
                "params": {
                    "exdef": "param after dothis and executeparam was grabbed"
                }
            }]
        }
    }
    var assert = [];
    assert.push({
        "exdef": "param after dothis and executeparam was grabbed",
        "d": "1",
        "c": "0",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct17", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}

// This is to use the params in preexecute to ensure that the preexecute params are getting used by dothis
exports.ettestct18 = ettestct18 = function ettestct18(params, callback) {
    clearLocalStorage();
    // config = setconfig7();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            "midexecute": [{
                "dothis": "dothis",
                "tryorder": "1",
                "executeorder": "1",
                "params": {
                    "exdef": "param after dothis and executeparam was grabbed"
                }
            }]
        }
    }
    var assert = [];
    assert.push({
        "exdef": "param after dothis and executeparam was grabbed",
        "f": "3",
        "c": "0",
        "g": "4"
    });
    var res = master_test_and_verify("ettestct18", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// This test is to send params to executethis. There will be params in the call to executethis, config file, and the config in the params
// sent to executethis. There are params that will be used and changed throughout the call...they are alfa, bravo, and charlie. At this point, 
// the args sent to executethis will always win...not any of the 3 places in the config that they are set.
exports.ettestct19 = ettestct19 = function ettestct19(params, callback) {
    clearLocalStorage();
    config = setconfig8();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "postexecute": "func_c",
        "configuration": {
            "preexecute": [{
                "dothis": "dothis",
                "tryorder": 0,
                "executeorder": 0,
                "params": {
                    "alpha": "3"
                }
            }],
            "midexecute": [{
                "dothis": "dothis",
                "tryorder": 0,
                "executeorder": 0,
                "params": {
                    "bravo": "3"
                }
            }],
            "postexecute": [{
                "dothis": "dothis",
                "tryorder": 0,
                "executeorder": 0,
                "params": {
                    "charlie": "3"
                }
            }]
        },
        "alpha": "1",
        "bravo": "1",
        "charlie": "1"
    }
    var assert = [];
    assert.push({
        "configuration": {},
        "f": "3",
        "g": "4",
        "h": "5",
        "alpha": "1",
        "bravo": "1",
        "charlie": "1"
    });
    var res = master_test_and_verify("ettestct19", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// Here the goal is to see if the config of the left and right conflict, which wins? Ad of now, the right side wins. The params for func_a,b,c are 
// all set to be 2, but they come out as 4, because that is what pre,mid, and post set them to.
exports.ettestct20 = ettestct20 = function ettestct20(params, callback) {
    clearLocalStorage();
    config = setconfig8();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "postexecute": "func_c"
    }
    var assert = [];
    assert.push({
        "charlie": "4",
        "g": "4",
        "alpha": "4",
        "f": "3",
        "bravo": "4",
        "h": "5"
    });
    var res = master_test_and_verify("ettestct20", parameters, assert, {}, {
        "command": "null"
    }, function (err, res) {
        callback(err, res)
    });
}
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

// Template for a new test, yet to be determined
exports.ct1000 = ct1000 = function ct1000(params, callback) {
    clearLocalStorage();
    executetest("executethis", {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }, "ct1000_output", "");
    params = logverify("c_unit_tests", "ct1000_result", "ct1000_output", "", "", {
        "c": "0",
        "d": "1",
        "g": "4"
    });
    callback(err, params);
}

// This is just a stub function to do a little work...really just a way to show that
// a function call can be made.
exports.alertFn1 = alertFn1 = function alertFn1(params, callback) {
    // alert('ct7 has alerted');
    params["ct7"] = "did some alerting";
    // delete params["configuration"];
    var err;
    callback(err, params);
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// Functions to use in pre, mid and post
// to test the flow of parameters through executethis

exports.func_a = func_a = function func_a(parameters, callback) {
    console.log('from func_a');
    printToDiv('func_a', parameters, 1);
    delete parameters["d"];
    parameters["f"] = "3";
    var err;
    callback(err, parameters);
}

exports.func_b = func_b = function func_b(parameters, callback) {
    console.log('from func_b');
    delete parameters["e"];
    parameters["g"] = "4";
    var err;
    callback(err, parameters);
}

exports.func_c = func_c = function func_c(parameters, callback) {
    console.log('from func_c');
    printToDiv('func_c', parameters, 1);
    delete parameters["c"];
    parameters["h"] = "5";
    var err;
    callback(err, parameters);
}

// This is used when a and b do not exist, but the fire_c
// is sent as a parameter, and that parameter is to call fire_c.
exports.fire_c = fire_c = function fire_c(parameters, callback) {
    parameters["fire_c"] = "fire_c is now fired";
    var err;
    callback(err, parameters);
}

// These are the async versions of the above func_a, _b, and _c.
exports.async_func_a = async_func_a = function async_func_a(parameters, callback) {
    delete parameters["d"];
    parameters["f"] = "3";
    //sleep(500);
    var err;
    callback(err, parameters);
}

exports.async_func_b = async_func_b = function async_func_b(parameters, callback) {
    delete parameters["e"];
    parameters["g"] = "4";
    sleep(500);
    var err;
    callback(err, parameters);
}

exports.async_func_c = async_func_c = function async_func_c(parameters, callback) {
    delete parameters["c"];
    parameters["h"] = "5";
    //sleep(500);
    var err;
    callback(err, parameters);
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

// This will test the ability to write a dto to the db and retrieve it

exports.ettestag1 = ettestag1 = function ettestag1(params, callback) {
    clearLocalStorage();
    execute([{
            "executethis": "addwidmaster",
            "wid": "sounddto",
            "metadata.method": "sounddto",
            "note": "string"
        }, {
            "executethis": "getwidmaster",
            "wid": "sounddto"
        }],
        function (err, res) {
            proxyprinttodiv('Function ag1 result ', res, 99);
            res = logverify("ettestag1_result", res[1][0], [{
                "note": "string",
                "wid": "sounddto",
                "metadata.method": "sounddto"
            }]);
            callback(err, res);
        });
}

exports.ettestag1a = ettestag1a = function ettestag1a(params, callback) {
    clearLocalStorage();

    debuglevel = 75;
    debugname = "updatewid";
    debugcat = "";
    debugsubcat = "";


    execute([{
            "executethis": "addwidmaster",
            "wid": "superhero",
            "name": "Nick"
        }, {
            "executethis": "updatewid",
            "wid": "superhero",
            "name": "Nick Fury"
        }, {
            "executethis": "getwidmaster",
            "wid": "superhero"
        }],
        function (err, res) {
            proxyprinttodiv('Function ag1 result ', res, 99);
            res = logverify("ettestag1a_result", res[2][0], {
                "name": "Nick Fury",
                "wid": "superhero",
                "metadata.method": ""
            });


            debugfn("updatewid code generator END", "updatewid", "add", "code", debugcolor, debugindent, {}, 5);
            debugname = "";
            debugcat = "";
            debugsubcat = "";

            callback(err, res);
        });
}

// // This will test the ability to write a dto to the db, use that dto to write
// // a wid with that dto, and get the results of getting that wid.
// exports.ag211 = ag211 = function ag211(params, callback) {
//  // clearLocalStorage();
//  // ag2_setup();
//  executetest("getwidmaster", {
//      "wid": "color1"
//  }, "get_color1_result", "");

//  params = logverify("alpha_unit_tests", "ag2_result", "get_color1_result", "", "", {
//      "hue": "red",
//      "wid": "color1",
//      "metadata.method": "defaultdto"
//  });

//  console.log(' >>>>>> ' + params);

//  if (callback instanceof Function) {
//      var err;callback(err,params);
//  } else {
//      return params;
//  }
// }

// This will test the ability to write a dto to the db, use that dto to write
// a wid with that dto, and get the results of getting that wid.
exports.ettestag2 = ettestag2 = function ettestag2(params, callback) {
    clearLocalStorage();
    // alert('here');

    debuglevel = 75;
    debugname = "";
    debugcat = "";
    debugsubcat = "code";

    execute([{
            "executethis": "addwidmaster",
            "wid": "colordto",
            "metadata.method": "colordto",
            "hue": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "color1",
            "hue": "red"
        }, {
            "executethis": "addwidmaster",
            "wid": "color2",
            "hue": "blue"
        }, {
            "executethis": "getwidmaster",
            "wid": "color1"
        }],
        function (err, res) {
            debugfn("offlinegetwid code generator END", "ag2", "", "code", debugcolor, debugindent, {}, 9);

            debugname = "";
            debugcat = "";
            debugsubcat = "";
            proxyprinttodiv('Function ag2 result ', res, 99);
            res = logverify("ettestag2_result", res[3][0], [{
                "hue": "red",
                "wid": "color1",
                "metadata.method": "defaultdto"
            }]);
            callback(err, res);
        });
}
// This is a 2 level test of the dtos...instantiate song1 with a songdto, and some sounddto values
exports.ettestag3 = ettestag3 = function ettestag3(params, callback) {
    clearLocalStorage();

    debuglevel = 98;
    //debugname = "";

    //%%%%%%%%%%%%%%%%%%%%%
    // Functions of --- config-local
    // debugname = "offlineupdatewid";

    // debugname = "offlinegetwid";
    //%%%%%%%%%%%%%%%%%%%%%
    // Functions of --- add

    //%%%%%%%%%%%%%%%%%%%%%
    // Functions of --- query
    // debugname = "querywid";

    //%%%%%%%%%%%%%%%%%%%%%
    // Functions of --- get
    // debugname = "getwid";

    // debugname = "aggressivedto";

    // debugname = "getcleanparameters";

    // debugname = "getwidmaster";

    // debugname = "getwidmongo";
    // debugname = "getcleanparameters";
    //%%%%%%%%%%%%%%%%%%%%%

    //debugcat = "";
    //debugsubcat = "code";

    debuglevel = 17;
    execute([
            //         "executethis": "addwidmaster",
            //         "wid": "sounddto",
            //         "metadata.method": "sounddto",
            //         "note": "string"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "wid": "songdto",
            //         "metadata.method": "songdto",
            //         "title": "string",
            //         "metadata.sounddto.type": "onetomany"
            //     }, {
            //         "executethis": "addwidmaster",
            //         "wid": "rel_sound_to_song",
            //         "metadata.method":"relationshipdto",
            //         "primarywid": "songdto",
            //         "secondarywid": "sounddto",
            //         "primarymethod": "songdto",
            //         "secondarymethod": "sounddto",
            //         "linktype":"onetomany",
            //         "relationshiptype": "attributes"
            //     }, {


            {
                "executethis": "addwidmaster",
                "wid": "songdto",
                "title": "string",
                "metadata.method": "songdto",
                "metadata.sounddto.type": "onetomany",
                "sounddto.wid": "sounddto",
                "sounddto.note": "string",
                "sounddto.metadata.method": "sounddto"
            }, {

                "executethis": "addwidmaster",
                "wid": "song1",
                "metadata.method": "songdto",
                "title": "Highway to Hell",
                "sounddto.note": "A flat",
            }, {
                "executethis": "addwidmaster",
                "wid": "song1",
                "metadata.method": "songdto",
                "title": "Highway to Hell",
                "sounddto.note": "B sharp",
            }, {
                "executethis": "addwidmaster",
                "wid": "song1",
                "metadata.method": "songdto",
                "title": "Highway to Hell",
                "sounddto.note": "C flat"
            }, {
                "executethis": "getwidmaster",
                "wid": "song1"
            }
        ],


        function (err, res) {
            // debugfn("update code generator END", "updatewid", "add", "code", debugcolor, debugindent, {}, 5);
            // 
            // These will create the code on the screen from the logged data

            //%%%%%%%%%%%%%%%%%%%%%
            // Functions of --- config-local

            // debugfn("update code generator END",        "offlineupdatewid", "add",   "code", debugcolor, debugindent, {}, 9);
            // debugfn("offlinegetwid code generator END", "offlinegetwid",    "get",   "code", debugcolor, debugindent, {}, 9);
            debugfn("offlinegetwid code generator END", "", "", "code", debugcolor, debugindent, {}, 9);

            //%%%%%%%%%%%%%%%%%%%%%
            // Functions of --- add

            //%%%%%%%%%%%%%%%%%%%%%
            // Functions of --- query

            // debugfn("querywid code generator END",      "querywid",         "query", "code", debugcolor, debugindent, {}, 9);

            //%%%%%%%%%%%%%%%%%%%%%
            // Functions of --- get

            // debugfn("getwidmaster code generator END",  "getwidmaster",     "get",   "code", debugcolor, debugindent, {}, 9);
            // debugfn("getWidMongo code generator END",   "getWidMongo",      "get",   "code", debugcolor, debugindent, {}, 9);
            // debugfn("getcleanparameters code generator END",   "getcleanparameters",      "get",   "code", debugcolor, debugindent, {}, 9);

            //%%%%%%%%%%%%%%%%%%%%%
            //debugname = "";
            //debugcat = "";
            //debugsubcat = "";

            proxyprinttodiv('Function ag3 result ', res[4], 99);
            res = logverify("ettestag3_result", res[4][0], [{
                "title": "Highway to Hell",
                "wid": "song1",
                "metadata.method": "songdto",
                "sounddto.0.note": "A flat",
                "sounddto.0.wid": "2",
                "sounddto.0.metadata.method": "sounddto",
                "sounddto.1.note": "B sharp",
                "sounddto.1.wid": "4",
                "sounddto.1.metadata.method": "sounddto",
                "sounddto.2.note": "C flat",
                "sounddto.2.wid": "6",
                "sounddto.2.metadata.method": "sounddto"
            }]);

            // [{"title":"Highway to Hell","wid":"song1","metadata.method":"songdto",
            // "sounddto.0.note":"A flat","sounddto.0.wid":"2","sounddto.0.metadata.method":"sounddto",
            // "sounddto.1.note":"B sharp","sounddto.1.wid":"4","sounddto.1.metadata.method":"sounddto",
            // "sounddto.2.note":"C flat","sounddto.2.wid":"6","sounddto.2.metadata.method":"sounddto"}]
            //debuglevel=28;
            execute({
                "executethis": "getwidmaster",
                "wid": "song1"
            }, function (err, res1) {
                proxyprinttodiv('Function ag3 result LAST ', res1, 99);
                callback(err, res);

            })
        });
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

// Required for the delay in testing the async portionis
exports.sleep = sleep = function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// Here are the different configs used in the tests



// exports.func_async = func_async = function func_async(parameters, callback) {
//     delete parameters["d"];
//     console.log('from func_async');
//     // var f = function (){
//     // sleep(3000);
//     // parameters["m"] = "now you waited for 1000 ms";
//     // printToDiv('func_async',parameters,1);    
//     // };
//     // f();

//     // echo ajax request
//     echoCall('/echo', 'GET', false,
//         function (data) {
//             parameters["m"] = "now you waited for the async call";
//             printToDiv('func_async_success', parameters, 1);
//             console.log('from func_async success');
//         },
//         function (data) {
//             parameters["m"] = "now you waited for the async call";
//             printToDiv('func_async_error', parameters, 1);
//             console.log('from func_async error');
//         }
//     );
//     printToDiv('func_async -- ', parameters, 1);
//     // var err;callback(err, parameters);
//     var err;
//     callback(err, parameters);
// }

// exports.echoCall = echoCall = function echoCall(url, type, asyncVal, successCallback, errorCallback) {
//     jQuery.ajax({
//         url: url,
//         tupe: type,
//         async: asyncVal,
//         cache: false,
//         dataType: "html",
//         success: successCallback,
//         error: errorCallback
//     });
// }

// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------

// Used as a test for having a executethis in the parameters
exports.uwid1 = uwid1 = function uwid1(params, callback) {
    clearLocalStorage();

    execute([{
            "executethis": "addwidmaster",
            "wid": "getexecutetest",
            "addthis.executethis": "func_b"
        }, {
            "executethis": "getwidmaster",
            "wid": "getexecutetest"
        }],
        function (err, res) {
            alert(JSON.stringify(res[1][0]));
            // The following will pass...it shows what the getwidmaster returns
            // res = logverify("uwid1", res[1][0], {"addthis.executethis": "func_b", "wid": "getexecutetest", "metadata.method": "testdto"});

            // This assertion is what is expected, but it fails
            res = logverify("uwid1", res[1][0], {
                "g": "4"
            });
            callback(err, res);
        });
}


// exports.uw = uw = function uw(params, callback) {

//     // build database ??

//     // Here are the ins and outs, but without a db, the test wont work

//     var parameters = {
//         "executemethod": "updatewid",
//         "metadata.method": "sounddto",
//         "wid": "sounddto",
//         "note": "string"
//     }

//     var assert = {
//             "wid": "sounddto",
//             "metadata": {
//                 "method": "sounddto",
//                 "date": "2014-01-30T14:15:21.572Z"
//             },
//             "data": {
//                 "note": "string"
//             }

//     // test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
//         callback(err, res)
//     });

// }

exports.mut = mut = function mut(params, callback) {
    clearLocalStorage();

    var commandobject = {};
    commandobject['executemethod'] = "execute";
    commandobject['executelimit'] = 15;
    commandobject['executeorder'] = 'series';
    commandobject['executefilter'] = 'addwid';
    // commandobject['executefilter'] = 'offlineupdatewid';

    var data = [];
    data.push(
        [{
                "fn": "func_b2"
            },
            [
                "test", {
                    "a": "b"
                }, {
                    "c": "d"
                }
            ]
        ]
    );


    executethismultiple(data, function (err, res) {
        callback(err, res)
    });
}

exports.addwid4params = addwid4params = function addwid4params(a, b, c, d, callback) {

    var paramsDataString = "{\"" + a + "\":\"" + a + "\",\"" + b + "\":\"" + b + "\",\"" + c + "\":\"" + c + "\",\"" + d + "\":\"" + d + "\"}";
    // alert(paramsDataString);
    var json = JSON.parse(paramsDataString);
    addwidmaster(json, callback);
}

exports.testnested1 = testnested1 = function testnested1(params, callback) {
    clearLocalStorage();

    var inparams = [
        [{
            "executethis": "addwidmaster",
            "wid": "a2-56",
            "a2": "b2"
        }, {
            "executethis": "getwidmaster",
            "wid": "a2-56"
        }],
        [{
            "executethis": "addwidmaster",
            "wid": "a2-57",
            "a2": "b2"
        }, {
            "executethis": "getwidmaster",
            "wid": "a2-57"
        }],
        [{
            "executethis": "addwidmaster",
            "wid": "a2-58",
            "a2": "b2"
        }, {
            "executethis": "getwidmaster",
            "wid": "a2-58"
        }]

    ];

    execute(inparams, callback);
}


exports.testnested3 = testnested3 = function testnested3(params, callback) {
    clearLocalStorage();

    var inparams = [{
            "executethis": "addwidmaster",
            "wid": "a2-56",
            "a2": "b2"
        }, {
            "executethis": "getwidmaster",
            "wid": "a2-56"
        },
        [{
            "executethis": "addwidmaster",
            "wid": "a2-57",
            "a2": "b2"
        }, {
            "executethis": "getwidmaster",
            "wid": "a2-57"
        }],
        [
            [{
                "executethis": "addwidmaster",
                "wid": "a2-58",
                "a2": "b2"
            }, {
                "executethis": "getwidmaster",
                "wid": "a2-58"
            }]
        ]

    ];

    execute(inparams, callback);
}

exports.testnested4 = testnested4 = function testnested4(params, callback) {
    clearLocalStorage();

    var inparams = [{
        "executethis": "addwidmaster",
        "wid": "a2-56",
        "a2": "b2"
    }, {
        "executethis": "getwidmaster",
        "wid": "a2-56",
        "a2": "b2"
    }];

    execute(inparams, callback);
}

exports.testnested5 = testnested5 = function testnested5(params, callback) {
    clearLocalStorage();

    var inparams = {
        "executethis": "addwidmaster",
        "wid": "a2-56",
        "a2": "b2"
    };

    execute(inparams, callback);
}

exports.testnested6 = testnested6 = function testnested6(params, callback) {
    clearLocalStorage();

    var inparams = {
        "executethis": "test121212"
    };

    execute(inparams, callback);
}

exports.testnested2 = testnested2 = function testnested2(params, callback) {
    clearLocalStorage();

    var inparams = [
        [{
            "executethis": "addwidmaster",
            "wid": "a2-56",
            "a2-56": "b2-56"
        }, {
            "executethis": "getwidmaster",
            "wid": "a2-56"
        }],
        [
            [{
                "executethis": "addwidmaster",
                "wid": "a2-57",
                "a2-57": "b2-57"
            }, {
                "executethis": "getwidmaster",
                "wid": "a2-57"
            }],
            [{
                "executethis": "addwidmaster",
                "wid": "a2-58",
                "a2-58": "b2-58"
            }, {
                "executethis": "getwidmaster",
                "wid": "a2-58"
            }]
        ]
    ];

    execute(inparams, callback);
}


exports.testmultiplenested = testmultiplenested = function testmultiplenested(params, callback) {
    clearLocalStorage();

    var inparams = [
        [{
            "fn": "addwidmaster",
            "wid": "a2-56",
            "a2": "b2"
        }, {
            "fn": "getwidmaster",
            "wid": "a2-56"
        }],
        [
            [{
                "fn": "addwidmaster",
                "wid": "a2-57",
                "a2": "b2"
            }, {
                "fn": "getwidmaster",
                "wid": "a2-57"
            }],
            [{
                "fn": "addwidmaster",
                "wid": "a2-58",
                "a2": "b2"
            }, {
                "fn": "getwidmaster",
                "wid": "a2-58"
            }],
            [
                [{
                        "fn": "addwid4params"
                    },
                    [
                        "a",
                        "b",
                        "c",
                        "d"
                    ]
                ]
            ]
        ]
    ];

    executethismultiple(inparams, callback);
}

// exports.t121212 = t121212 = function t121212(params, callback) {
//     clearLocalStorage();

//     var todolist = [
//         [{
//                 "fn": "test_and_verify"
//             },
//             [
//                 "func_b",
//                 "func_b", {
//                     "c": "01",
//                     "d": "11",
//                     "e": "21"
//                 }, {
//                     "c": "02",
//                     "d": "12",
//                     "g": "42"
//                 }
//             ]
//         ],
//         [{
//                 "fn": "addwid4params"
//             },
//             [
//                 "a", "b", "c", "d"
//             ]

//         ],
//         [{
//                 "fn": "addwid4params"
//             },
//             [
//                 "12", "23", "34", "45"
//             ]

//         ]

//     ];

//     executethismultiple(todolist, callback);
// }


exports.exec_mul_test = function exec_mul_test(data) {
    for (d in data) {
        // test_and_verify(data[d]);
        // exports.test_and_verify = test_and_verify = function test_and_verify(testname, fnname, parameters, assert, callback) {
        var a = data[d][1]['name'];
        var b = data[d][1]['fnname'];
        var c = [data[d][1]['parameters']];
        var d = [data[d][1]['assert']];
        console.log('a: ' + a);
        console.log('b: ' + b);
        console.log('c: ' + JSON.stringify(c));
        console.log('d: ' + JSON.stringify(d));
        test_and_verify(a, b, c, d);
    }
}

exports.newt = newt = function newt(params, callback) {
    // var todolist = 
    //     [
    //         [
    //             {
    //                 "fn": "test_and_verify"
    //             },
    //             [
    //                 "offlineupdatewid",
    //                 "offlineupdatewid",
    //                 {
    //                     "0": {
    //                         "metadata.method": "sounddto",
    //                         "wid": "sounddto",
    //                         "note": "string"
    //                     }
    //                 },
    //                 {
    //                     "data": {
    //                         "note": "string"
    //                     },
    //                     "wid": "sounddto",
    //                     "metadata": {
    //                         "method": "sounddto",
    //                         "date": "2014-02-04T15:54:34.378Z"
    //                     }
    //                 },
    //                 {
    //                     "initialwid": {
    //                         "wid": "initialwid",
    //                         "initialwid": "for key hello from bootprocess"
    //                     },
    //                     "sounddto": {
    //                         "data": {
    //                             "note": "string"
    //                         },
    //                         "wid": "sounddto",
    //                         "metadata": {
    //                             "method": "sounddto",
    //                             "date": "2014-02-04T15:54:34.378Z"
    //                         }
    //                     }
    //                 },
    //                 {"command": "null"}
    //             ]
    //         ]
    //     ]
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "offlineupdatewid",
                "offlineupdatewid", {
                    "metadata.method": "sounddto",
                    "note": "string",
                    "wid": "sounddto"
                }, {
                    "data": {
                        "note": "string"
                    },
                    "metadata": {
                        "date": "2014-02-04T18:20:44.503Z",
                        "method": "sounddto"
                    },
                    "wid": "sounddto"
                }, {
                    "initialwid": {
                        "initialwid": "for key hello from bootprocess",
                        "wid": "initialwid"
                    },
                    "sounddto": {
                        "data": {
                            "note": "string"
                        },
                        "metadata": {
                            "date": "2014-02-04T18:20:44.503Z",
                            "method": "sounddto"
                        },
                        "wid": "sounddto"
                    }
                }, {
                    "command": "null"
                }
            ]
        ]
    ]

    // var db = {"initialwid":{"wid":"initialwid","initialwid":"for key hello from bootprocess"},"sounddto":{"data":{"note":"string"},"wid":"sounddto","metadata":{"method":"sounddto","date":"2014-02-04T16:18:51.732Z"}}};
    // addToLocalStorage("DRIKEY", db);   
    executethismultiple(todolist, callback);

}

exports.newt2 = newt2 = function newt2(params, callback) {
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "getwidmaster",
                "getwidmaster", {
                    "wid": "songdto",
                    "command.convertmethod": "dto",
                    "command.dtotype": "songdto"
                }, {
                    "title": "string",
                    "metadata.sounddto.type": "onetomany",
                    "sounddto.note": "string",
                    "sounddto.wid": "sounddto",
                    "sounddto.metadata.method": "sounddto"
                }, {
                    "initialwid": {
                        "wid": "initialwid",
                        "initialwid": "for key hello from bootprocess"
                    },
                    "sounddto": {
                        "data": {
                            "note": "string"
                        },
                        "wid": "sounddto",
                        "metadata": {
                            "method": "sounddto",
                            "date": "2014-02-04T18:31:01.199Z"
                        }
                    },
                    "songdto": {
                        "data": {
                            "title": "string"
                        },
                        "wid": "songdto",
                        "metadata": {
                            "method": "songdto",
                            "sounddto": {
                                "type": "onetomany"
                            },
                            "date": "2014-02-04T18:31:01.313Z"
                        }
                    },
                    "rel_sound_to_song": {
                        "data": {
                            "primarywid": "songdto",
                            "secondarywid": "sounddto",
                            "relationshiptype": "attributes"
                        },
                        "wid": "rel_sound_to_song",
                        "metadata": {
                            "method": "defaultdto",
                            "date": "2014-02-04T18:31:01.389Z"
                        }
                    }
                }, {
                    "command": "null"
                }
            ]
        ]
    ]
    executethismultiple(todolist, callback);
}

exports.newt3 = newt3 = function newt3(params, callback) {
    var todolist = [];
    executethismultiple(todolist, callback);
}

exports.newt4 = newt4 = function newt4(params, callback) {
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "getcleanparameters",
                "getcleanparameters", [{
                        "title": "Highway to Hell",
                        "wid": "song1",
                        "metadata.method": "songdto",
                        "sounddto.0.note": "A flat",
                        "sounddto.0.wid": "1",
                        "sounddto.0.metadata.method": "sounddto",
                        "sounddto.1.note": "B sharp",
                        "sounddto.1.wid": "3",
                        "sounddto.1.metadata.method": "sounddto",
                        "sounddto.2.note": "C flat",
                        "sounddto.2.wid": "5",
                        "sounddto.2.metadata.method": "sounddto"
                    },
                    "",
                    "",
                    "remove",
                    ""
                ], {
                    "parms": {
                        "title": "Highway to Hell",
                        "wid": "song1",
                        "metadata.method": "songdto",
                        "sounddto.0.note": "A flat",
                        "sounddto.0.wid": "1",
                        "sounddto.0.metadata.method": "sounddto",
                        "sounddto.1.note": "B sharp",
                        "sounddto.1.wid": "3",
                        "sounddto.1.metadata.method": "sounddto",
                        "sounddto.2.note": "C flat",
                        "sounddto.2.wid": "5",
                        "sounddto.2.metadata.method": "sounddto"
                    },
                    "dto": {
                        "title": "Highway to Hell",
                        "wid": "song1",
                        "metadata.method": "songdto",
                        "sounddto.note": "string",
                        "sounddto.wid": "sounddto",
                        "sounddto.metadata.method": "sounddto"
                    }
                }, {
                    "1": {
                        "data": {
                            "note": "A flat"
                        },
                        "wid": "1",
                        "metadata": {
                            "method": "sounddto",
                            "date": "2014-02-05T18:43:43.175Z"
                        }
                    },
                    "2": {
                        "data": {
                            "primarywid": "song1",
                            "secondarywid": "1",
                            "relationshiptype": "attributes",
                            "linktype": "onetomany"
                        },
                        "wid": "2",
                        "metadata": {
                            "method": "relationshipdto",
                            "date": "2014-02-05T18:43:43.248Z"
                        }
                    },
                    "3": {
                        "data": {
                            "note": "B sharp"
                        },
                        "wid": "3",
                        "metadata": {
                            "method": "sounddto",
                            "date": "2014-02-05T18:43:43.273Z"
                        }
                    },
                    "4": {
                        "data": {
                            "primarywid": "song1",
                            "secondarywid": "3",
                            "relationshiptype": "attributes",
                            "linktype": "onetomany"
                        },
                        "wid": "4",
                        "metadata": {
                            "method": "relationshipdto",
                            "date": "2014-02-05T18:43:43.348Z"
                        }
                    },
                    "5": {
                        "data": {
                            "note": "C flat"
                        },
                        "wid": "5",
                        "metadata": {
                            "method": "sounddto",
                            "date": "2014-02-05T18:43:43.366Z"
                        }
                    },
                    "6": {
                        "data": {
                            "primarywid": "song1",
                            "secondarywid": "5",
                            "relationshiptype": "attributes",
                            "linktype": "onetomany"
                        },
                        "wid": "6",
                        "metadata": {
                            "method": "relationshipdto",
                            "date": "2014-02-05T18:43:43.437Z"
                        }
                    },
                    "initialwid": {
                        "wid": "initialwid",
                        "initialwid": "for key hello from bootprocess"
                    },
                    "sounddto": {
                        "data": {
                            "note": "string"
                        },
                        "wid": "sounddto",
                        "metadata": {
                            "method": "sounddto",
                            "date": "2014-02-05T18:43:42.711Z"
                        }
                    },
                    "songdto": {
                        "data": {
                            "title": "string"
                        },
                        "wid": "songdto",
                        "metadata": {
                            "method": "songdto",
                            "sounddto": {
                                "type": "onetomany"
                            },
                            "date": "2014-02-05T18:43:42.827Z"
                        }
                    },
                    "rel_sound_to_song": {
                        "data": {
                            "primarywid": "songdto",
                            "secondarywid": "sounddto",
                            "relationshiptype": "attributes"
                        },
                        "wid": "rel_sound_to_song",
                        "metadata": {
                            "method": "defaultdto",
                            "date": "2014-02-05T18:43:42.888Z"
                        }
                    },
                    "song1": {
                        "data": {
                            "title": "Highway to Hell"
                        },
                        "wid": "song1",
                        "metadata": {
                            "method": "songdto",
                            "date": "2014-02-05T18:43:43.088Z"
                        }
                    }
                }, {
                    "command": "null"
                }
            ]
        ]
    ]
    executethismultiple(todolist, callback);
}




exports.newt5 = newt5 = function newt5(params, callback) {

    var todolist =

    [
        [{
                "fn": "test_and_verify"
            },
            [
                "offlineupdatewid",
                "offlineupdatewid", [{
                    "metadata.method": "songdto",
                    "wid": "song1",
                    "title": "Highway to Hell"
                }], {
                    "data": {
                        "title": "Highway to Hell"
                    },
                    "wid": "song1",
                    "metadata": {
                        "method": "songdto",
                        "date": "2014-02-05T21:11:19.461Z"
                    }
                }, {
                    "initialwid": {
                        "wid": "initialwid",
                        "initialwid": "for key hello from bootprocess"
                    },
                    "sounddto": {
                        "data": {
                            "note": "string"
                        },
                        "wid": "sounddto",
                        "metadata": {
                            "method": "sounddto",
                            "date": "2014-02-05T21:11:18.876Z"
                        }
                    },
                    "songdto": {
                        "data": {
                            "title": "string"
                        },
                        "wid": "songdto",
                        "metadata": {
                            "method": "songdto",
                            "sounddto": {
                                "type": "onetomany"
                            },
                            "date": "2014-02-05T21:11:19.040Z"
                        }
                    },
                    "rel_sound_to_song": {
                        "data": {
                            "primarywid": "songdto",
                            "secondarywid": "sounddto",
                            "relationshiptype": "attributes"
                        },
                        "wid": "rel_sound_to_song",
                        "metadata": {
                            "method": "defaultdto",
                            "date": "2014-02-05T21:11:19.141Z"
                        }
                    },
                    "song1": {
                        "data": {
                            "title": "Highway to Hell"
                        },
                        "wid": "song1",
                        "metadata": {
                            "method": "songdto",
                            "date": "2014-02-05T21:11:19.461Z"
                        }
                    }
                }, {
                    "command": "null"
                }
            ]
        ]
    ]
    executethismultiple(todolist, callback);
}


// test1212 calls fnb
// fn b accepts one object and produces one array result

exports.test121212 = test121212 = function test121212(params, callback) {
    clearLocalStorage();
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "func_b",
                "func_b", {
                    "c": "0",
                    "d": "1",
                    "e": "2"
                },
                [{
                    "c": "0",
                    "d": "1",
                    "g": "4"
                }], {}, {
                    "command": "null"
                }
            ]
        ]
    ];
    executethismultiple(todolist, callback);
}



// test141414

function test141414(params, callback) {
    // Calling func_b2 with single
    clearLocalStorage();
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "func_b2",
                "func_b2", [
                    "test", {
                        "a": "b",
                        "x": "y"
                    }, {
                        "a": "b",
                        "e": "z"
                    }, {
                        "c": "d",
                        "more": "m"
                    }
                ], {
                    "test": "hello",
                    "a": "b",
                    "c": "d",
                    "more": "m"
                }, {}, {
                    "command": "null"
                }
            ]
        ]
    ];
    executethismultiple(todolist, callback);
}

// func_b2 and func_b22 accepts 4 objects and produces one object result

// test151515
// func_b3 and func_b33 accepts 4 arrays and produces one object result

function test151515(params, callback) {
    clearLocalStorage();
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "func_b3",
                "func_b3", [{
                        "c": "0",
                        "d": "1",
                        "e": "2"
                    },
                    "two", ["a", {
                        "b": "c"
                    }],
                    "four"
                ],

                {
                    "a": {
                        "c": "0",
                        "d": "1",
                        "e": "2"
                    },
                    "b": "two",
                    "c": ["a", {
                        "b": "c"
                    }],
                    "d": "four"
                }, {}, {
                    "command": "null"
                }
            ]
        ]
    ];
    executethismultiple(todolist, callback);
}

function test161616(params, callback) {
    clearLocalStorage();
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "offlineupdatewid",
                "offlineupdatewid", [{
                    "wid": "wid1",
                    "a": "b"
                }], {
                    "data": {
                        "a": "b"
                    },
                    "wid": "wid1",
                    "metadata": {
                        "date": "2014-02-06T19:29:52.958Z"
                    }
                }, {
                    "initialwid": {
                        "wid": "initialwid",
                        "initialwid": "for key hello from bootprocess"
                    },
                    "wid1": {
                        "data": {
                            "a": "b"
                        },
                        "wid": "wid1",
                        "metadata": {
                            "date": "2014-02-06T19:29:52.958Z"
                        }
                    }
                }, {
                    "command": "null"
                }
            ]
        ]
    ];
    executethismultiple(todolist, callback);
}

exports.sample1 = sample1 = function sample1(params, callback) {
    debugsubcat = "code";
    offlineupdatewid({
        "wid": "wid1",
        "a": "b"
    }, callback);
    debugfn("offlinegetwid code generator END", "ag2", "", "code", debugcolor, debugindent, {}, 9);
}

exports.sample2 = sample2 = function sample2(params, callback) {
    debugsubcat = "code";
    merge_options({
        "wid": "wid1",
        "a": "b"
    }, {
        "wid": "wid2",
        "y": "z"
    });
    debugfn("offlinegetwid code generator END", "ag2", "", "code", debugcolor, debugindent, {}, 9);
}

// getclean(resultObj, command, callback)

exports.sample3 = sample3 = function sample3(params, callback) {
    debugsubcat = "code";
    getclean({
        "wid": "wid1",
        "a": "b",
        "metadata": {
            "method": "DOT"
        }
    }, "DOT");
    debugfn("offlinegetwid code generator END", "ag2", "", "code", debugcolor, debugindent, {}, 9);
}

function test171717(params, callback) {
    clearLocalStorage();
    var todolist = [
        [{
                "fn": "test_and_verify"
            },
            [
                "MongoAddEditPrepare",
                "MongoAddEditPrepare", [
                    [],
                    [{
                        "key": "metadata.method",
                        "value": "colordto"
                    }, {
                        "key": "wid",
                        "value": "colordto"
                    }, {
                        "key": "hue",
                        "value": "string"
                    }],
                    "colordto",
                    "colordto"
                ], {
                    "metadata.method": "colordto",
                    "wid": "colordto",
                    "hue": "string"
                }, {
                    "initialwid": {
                        "wid": "initialwid",
                        "initialwid": "for key hello from bootprocess"
                    },
                    "colordto": {
                        "data": {
                            "hue": "string"
                        },
                        "wid": "colordto",
                        "metadata": {
                            "method": "colordto",
                            "date": "2014-02-06T21:59:08.567Z"
                        }
                    }
                }, {
                    "command": "null"
                }
            ]
        ]
    ];
    executethismultiple(todolist, callback);
}

function func_b2(p1, p2, p3, p4, callback) {
    data = {};
    delete p3['e'];
    data = jsonConcat(p3, p4);
    data[p1] = 'hello';
    var err;
    callback({}, data);
}


function func_b22(params, callback) {
    func_b2("test", {
            "r": "t",
            "x": "y"
        }, {
            "a": "b",
            "e": "z"
        }, {
            "c": "d",
            "more": "m"
        },
        callback);
}

function func_b3(p1, p2, p3, p4, callback) {
    data = {};
    data["a"] = p1;
    data["b"] = p2;
    data["c"] = p3;
    data["d"] = p4;

    callback({}, data);
}

function func_b33(params, callback) {
    func_b2("test", [{
            "a": "b",
            "x": "y"
        }], {
            "a": "b"
        }, [{
            "c": "d",
            "e": "z"
        }],
        callback);
}



exports.err1 = err1 = function err1(params, callback) {
    debugsubcat = "code";
    execute({
        "executethis": "getwidmaster",
        "wid": "1",
        "command": {
            "parameters": {
                "test1": "1"
            },
            "status": "fail"
        }
    }, function (err, result) {
        proxyprinttodiv('Function err1 result ', result, 99);
        // debugfn("offlinegetwid code generator END",                  "ag2",    "",   "code", debugcolor, debugindent, {}, 9);
    });
}

exports.wrapped1 = wrapped1 = function wrapped1(params, callback) {
    debugsubcat = "code";
    execute([{
        "executethis": "addwidmaster",
        "wid": "1",
        "a": "b"
    }, {
        "executethis": "getwidmaster",
        "wid": "1",
        "command": {
            "executeresult": "outer"
        }
    }], function (err, result) {
        proxyprinttodiv('Function wrapped1 result ', result, 99)
        // debugfn("offlinegetwid code generator END",                  "ag2",    "",   "code", debugcolor, debugindent, {}, 9);

    });
}

exports.lwr = lwr = function lwr(params, callback) {
    var params = {"alpha":"1", "beta":"2", "charlie":"3", "delta":"4"};
    var filter = {"beta":"add","charlie":"add"};
    var err;
    var result = {};

    result = tolowerparameters(params, filter, false);

    callback(err, result);

}
