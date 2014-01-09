async.waterfall([
    function(callback){
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
        callback(null, 'three');
    },
    function(arg1, callback){
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
   // result now equals 'done'    
});


// [1/9/14, 3:33:58 PM] Roger Colburn: so maybe the first step in execute is ...
// if parm type = array then call executemultiple
// [1/9/14, 3:34:10 PM] Roger Colburn: very clean
// [1/9/14, 3:34:12 PM] Roger Colburn: I like

// [1/9/14, 3:28:15 PM] Roger Colburn: I am thinking line 64
// [1/9/14, 3:28:34 PM] Roger Colburn: where we do pre, mid,
// [1/9/14, 3:28:52 PM] Roger Colburn: instead of doing 3 things we want to do 6 things
// [1/9/14, 3:28:59 PM] Roger Colburn: make sense
// [1/9/14, 3:29:09 PM] Roger Colburn: call fn eventbeforeexecute(),
// [1/9/14, 3:29:13 PM] Roger Colburn: call do this with pre
// [1/9/14, 3:29:23 PM] Roger Colburn: call  eventbeforeexecutethis(),
// [1/9/14, 3:29:28 PM] Roger Colburn: call do this with mid
// [1/9/14, 3:29:40 PM] Roger Colburn: call  eventafterexecutethis(),
// [1/9/14, 3:29:45 PM] Roger Colburn: call do this with post


 exports.execute2 = window.execute2 = execute2 = function execute2(received_params, callback) {

    if(received_params instanceof Array){
        executemultiple(received_params, callback);
    }else{

        var incomingparams = {}, result;
        extend(true, incomingparams, received_params); // clone received params

        incomingparams = toLowerKeys(incomingparams);
        proxyprinttodiv("execute - inboundparms", incomingparams, 11);
        proxyprinttodiv("execute - callback fn ", String(callback), 11);
        console.log(' *** execute2 starting  ' + JSON.stringify(incomingparams));

        } else {
            if ((incomingparams !== undefined) && (incomingparams['etbypass'])) {
                proxyprinttodiv("execute - etbypass incomingparams", incomingparams, 11);

                var x = undefined;

                if (incomingparams["executethis"]) {
                    if (incomingparams["executethis"] instanceof Function) {
                        x = incomingparams["executethis"];
                    } else {
                        x = window[incomingparams["executethis"]];
                    }
                    result = executethis(incomingparams, x);
                } else {
                    result = incomingparams;
                }
                callback(err, result);
            } else {

                async.waterfall([
                    function eventbeforepre(incomingparams, callback){
                        incomingparams['midexecute'] =  ['executethis'];
                        delete incomingparams['executethis'];
                        console.log('starting preexecute ' + nonCircularStringify(incomingparams));
                        callback(null, incomingparams);
                    },
                    function eventdopre(incomingparams, callback){
                        doThis(incomingparams, 'preexecute', function (err, preResults) {
                            console.log(' after preexecute >> ' + nonCircularStringify(preResults));
                            callback(null, incomingparams, preResults);
                        });
                    },
                    function eventbeforeexecute(incomingparams, preResults, callback){
                        console.log('starting midexecute ' + nonCircularStringify(incomingparams));
                        if (!preResults) {
                            if (preResults !== false && (!preResults))
                                preResults = {};
                        } // 
                        callback(null, incomingparams, preResults);
                    },
                    function eventdoexecute(incomingparams, preResults, callback){
                        doThis(preResults, 'midexecute', function (err, midResults) {
                            console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                            callback(null, incomingparams, midResults);
                        });
                    },
                    function eventbeforepost(incomingparams,midResults,callback){
                        if (midResults !== false && (!midResults)) {
                            midResults = {};
                        }
                        callback(null, incomingparams, midResults);
                    },
                    function eventdopost(incomingparams, midResults, callback){
                        doThis(preResults, 'postexecute', function (err, postResults) {
                            console.log(' after postexecute >> ' + nonCircularStringify(postResults));
                            callback(null, postResults);
                        });
                    }
                ], function (err, result) {
                   console.log(' after doing doThis >> ' + nonCircularStringify(result));
                });
                
                    console.log(' after preexecute >> ' + nonCircularStringify(preResults));
                    console.log('starting midexecute ' + nonCircularStringify(incomingparams));
                    if (!preResults) {
                        if (postResults !== false && (!postResults))
                            preResults = {};
                    } // 
                    doThis(preResults, 'midexecute', function (err, midResults) {

                        console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                        if (midResults !== false && (!midResults)) {
                            midResults = {};
                        }

                        doThis(midResults, 'postexecute', function (err, postResults) {
                            console.log(' after postexecute >> ' + nonCircularStringify(postResults));

                            if (postResults !== false && (!postResults)) {
                                postResults = {};
                            }

                            callback(err, postResults);
                        });
                    });
                });
            }
        }
            

                
            }
        }

    }

        

        
        
                if (incomingparams["executethis"]) {
                    if (incomingparams["executethis"] instanceof Function) {
                        x = incomingparams["executethis"];
                    } else {
                        x = window[incomingparams["executethis"]];
                    }
                    result = executethis(incomingparams, x);
                } else {
                    result = incomingparams;
                }
                callback(err, result);
            } else {
                incomingparams['midexecute'] = incomingparams['executethis'];
                delete incomingparams['executethis'];
                console.log('starting preexecute ' + nonCircularStringify(incomingparams));
                doThis(incomingparams, 'preexecute', function (err, preResults) {

                    console.log(' after preexecute >> ' + nonCircularStringify(preResults));
                    console.log('starting midexecute ' + nonCircularStringify(incomingparams));
                    if (!preResults) {
                        if (postResults !== false && (!postResults))
                            preResults = {};
                    } // 
                    doThis(preResults, 'midexecute', function (err, midResults) {

                        console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                        if (midResults !== false && (!midResults)) {
                            midResults = {};
                        }

                        doThis(midResults, 'postexecute', function (err, postResults) {
                            console.log(' after postexecute >> ' + nonCircularStringify(postResults));

                            if (postResults !== false && (!postResults)) {
                                postResults = {};
                            }

                            callback(err, postResults);
                        });
                    });
                });
            }
        }
    };