// List of tests:
// ettestt1 
// ettestt2
// ettestt3
// ettestt3a
// ettestt4
// ettestt4a
// ettestt5
// ettestt6
// 
// ettestast1 
// ettestast2
// ettestast3
// ettestast3a
// ettestast4
// ettestast4a
// ettestast5
// ettestast6
// 
// ettestag1
// ettestag2
// ettestag3
// 
// ettestct1
// ettestct2
// ettestct3
// ettestct3a
// ettestct4
// ettestct4a
// ettestct5
// ettestct6
// ettestct7
// ettestct8
// ettestct9
// ettestct10
// ettestct11
// ettestct13
// ettestct14
// ettestct15
// ettestct16
// ettestct17
// ettestct18
// ettestct19
// ettestct20

// at stands for 'all tests', this will run a suite 
// of tests that are known to pass
exports.ettestat = ettestat = function ettestat(params, callback) {
    bootprocess();

    var result = {};
    var err;

    ettesttt(result, function (err, result) {

        ettestastt(result, function (err, result) {

            ettestctt(result, function (err, result) {
                // ettestagtt(result, function () {
                // 	var err;
                // 	callback(err, result);	
                // });
                var err;
                callback(err, result);
            });
        });
    });
}

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
            // },{
            // "executethis": "ettestct3"
            // },{ 
            // "executethis": "ettestct3a"
            // },{ 
            // "executethis": "ettestct4"
            // },{ 
            // "executethis": "ettestct4a"
            // },{
            // "executethis": "ettestct5"
            // },{ 
            // "executethis": "ettestct6"
            // },{
            // "executethis": "ettestct7"
            // // },{ 
            // // "executethis": "ettestct8"
            // },{ 
            // "executethis": "ettestct9"
            // },{ 
            // "executethis": "ettestct10"
            // },{
            // "executethis": "ettestct11"
            // },{ 
            // "executethis": "ettestct13"
            // },{
            // "executethis": "ettestct14"
            // },{ 
            // "executethis": "ettestct15"
            // },{ 
            // "executethis": "ettestct16"
            // },{ 
            // "executethis": "ettestct18"
            // },{
            // "executethis": "ettestct19"
            // },{ 
            // "executethis": "ettestct20"
        }],
        function (err, res) {
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
        function (err, res) {}
    );
    var err;
    callback(err, test_results);
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// functions a,b,c manipulate parameters
// Call func_b with no pre or post
exports.ettestt1 = ettestt1 = function ettestt1(params, callback) {
    testclearstorage();
    var parameters = {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    var assert = {
        "d": "1",
        "c": "0",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

exports.ettestt1s = ettestt1s = function ettestt1s(params, callback) {
    testclearstorage();
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

exports.ettestt1sf = ettestt1sf = function ettestt1sf(params, callback) {
    testclearstorage();
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

// Call func_b with pre and post
exports.ettestt2 = ettestt2 = function ettestt2(params, callback) {
    testclearstorage();
    var parameters = {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "func_a",
        "postexecute": "func_c"
    }
    var assert = {
        "f": "3",
        "g": "4",
        "h": "5"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

// Call func_b with only pre func_a...this intends to call func_a in preexecute and func_b 
// in midexecute.
exports.ettestt3 = ettestt3 = function ettestt3(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_a"
        }],
        function (err, res) {
            res = logverify("ettestt3_result", res[0][0], {
                "c": "0",
                "f": "3",
                "g": "4"
            });
            callback(err, res);
        });
}

// Call func_b with only post func_a -- same result as t3
exports.ettestt3a = ettestt3a = function ettestt3a(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "func_a"
        }],
        function (err, res) {
            res = logverify("ettestt3a_result", res[0][0], {
                "c": "0",
                "g": "4",
                "f": "3"
            });
            callback(err, res);
        });
}

// Call func_b with only post
exports.ettestt4 = ettestt4 = function ettestt4(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt4_result", res[0][0], {
                "d": "1",
                "g": "4",
                "h": "5"
            });
            callback(err, res);
        });
}

// Call func_b with only pre func_c -- same result as t4
exports.ettestt4a = ettestt4a = function ettestt4a(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt4a_result", res[0][0], {
                "d": "1",
                "g": "4",
                "h": "5"
            });
            callback(err, res);
        });
}
// Call func_b with func_a for pre and post
exports.ettestt5 = ettestt5 = function ettestt5(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_a",
            "postexecute": "func_a"
        }],
        function (err, res) {
            res = logverify("ettestt5_result", res[0][0], {
                "c": "0",
                "f": "3",
                "g": "4"
            });
            callback(err, res);
        });
}
// Call func_b with func_c for pre and post
exports.ettestt6 = ettestt6 = function ettestt6(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "func_c",
            "postexecute": "func_c"
        }],
        function (err, res) {
            res = logverify("ettestt6_result", res[0][0], {
                "d": "1",
                "h": "5",
                "g": "4"
            });
            callback(err, res);
        });
}

// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

exports.ettestast1 = ettestast1 = function ettestast1(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2"
        }],
        function (err, res) {
            res = logverify("ettestast1_result", res[0][0], {
                "d": "1",
                "c": "0",
                "g": "4"
            });
            callback(err, res);
        });
}
// Call async_func_b with pre and post
exports.ettestast2 = ettestast2 = function ettestast2(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_a",
            "postexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast2_result", res[0][0], {
                "f": "3",
                "g": "4",
                "h": "5"
            });
            callback(err, res);
        });
}
// Call async_func_b with only pre async_func_a
exports.ettestast3 = ettestast3 = function ettestast3(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_a"
        }],
        function (err, res) {
            res = logverify("ettestast3_result", res[0][0], {
                "c": "0",
                "f": "3",
                "g": "4"
            });
            callback(err, res);
        });
}
// Call async_func_b with only post async_func_a -- same result as t3
exports.ettestast3a = ettestast3a = function ettestast3a(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "async_func_a"
        }],
        function (err, res) {
            res = logverify("ettestast3a_result", res[0][0], {
                "c": "0",
                "g": "4",
                "f": "3"
            });
            callback(err, res);
        });
}
// Call async_func_b with only post
exports.ettestast4 = ettestast4 = function ettestast4(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "postexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast4_result", res[0][0], {
                "d": "1",
                "g": "4",
                "h": "5"
            });
            callback(err, res);
        });
}
// Call async_func_b with only pre async_func_c -- same result as t4
exports.ettestast4a = ettestast4a = function ettestast4a(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast4a_result", res[0][0], {
                "d": "1",
                "g": "4",
                "h": "5"
            });
            callback(err, res);
        });
}
// Call async_func_b with async_func_a for pre and post
exports.ettestast5 = ettestast5 = function ettestast5(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_a",
            "postexecute": "async_func_a"
        }],
        function (err, res) {
            res = logverify("ettestast5_result", res[0][0], {
                "c": "0",
                "f": "3",
                "g": "4"
            });
            callback(err, res);
        });
}
// Call async_func_b with async_func_c for pre and post
exports.ettestast6 = ettestast6 = function ettestast6(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "async_func_b",
            "c": "0",
            "d": "1",
            "e": "2",
            "preexecute": "async_func_c",
            "postexecute": "async_func_c"
        }],
        function (err, res) {
            res = logverify("ettestast6_result", res[0][0], {
                "d": "1",
                "h": "5",
                "g": "4"
            });
            callback(err, res);
        });
}
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// Call redir_b with no pre or post
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with pre and post
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only pre redir_a
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only post redir_a -- same result as t3
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only post
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with only pre redir_c -- same result as t4
exports.ettestct4a = ettestct4a = function ettestct4a(params, callback) {
    testclearstorage();
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with redir_a for pre and post
exports.ettestct5 = ettestct5 = function ettestct5(params, callback) {
    testclearstorage();
    var parameters = {
        "executethis": "redir_b",
        "d": "1",
        "e": "2",
        "c": "3",
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
    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Call redir_b with redir_c for pre and post
exports.ettestct6 = ettestct6 = function ettestct6(params, callback) {
    testclearstorage();
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
    var assert = {
        // "mettestidexecute": "redir_b",
        // "postexecute": "redir_c",
        // "e": "2",
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// This will try pre with func a, but remapped with a configuration that
// is passed into executethis...it still wants to hit func_b with mid
exports.ettestct7 = ettestct7 = function ettestct7(params, callback) {
    testclearstorage();
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
    var assert = {
        "ct7": "did some alerting",
        "configuration": {},
        "d": "1",
        "c": "0",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// This will try pre with func a, 
exports.ettestct7a = ettestct7a = function ettestct7a(params, callback) {
    testclearstorage();
    var parameters = {
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "a",
        "configuration": {
            "preexecute": [{
                "dothis": "dothis",
                "tryorder": "0",
                "executeorder": "0",
                "params": {}
            }],
            "a": [{
                "dothis": "alertFn1",
                "tryorder": "0",
                "executeorder": "0",
                "params": {}
            }]
        }
    }
    var assert = {
        "c": "0",
        "d": "1",
        "ettestct7a": "did some alerting",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// This test asserts that the tryorder in the config is successful
// and causes executethis to call dothis, not server, or the others
exports.ettestct8 = ettestct8 = function ettestct8(params, callback) {
    testclearstorage();
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
    var assert = {
        "d": "1",
        "c": "0",
        "g": "4"
    }

    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

// This test is to call func_b, add in the parameters to remap does_not_exist to func_b and execute...so far it doesn't work....
exports.ettestct9 = ettestct9 = function ettestct9(params, callback) {
    testclearstorage();
    var parameters = {
        "executethis": "does_not_exist",
        "does_not_exist": "func_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    // since we are overiding how functions are maped here, "does_not_exist_* are not deleted from the params
    var assert = {
        "does_not_exist": "func_b",
        "d": "1",
        "c": "0",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// This test is to call func_b, add in the parameters to remap does_not_exist to func_b and execute...so far it doesn't work....
exports.ettestct9a = ettestct9a = function ettestct9a(params, callback) {
    testclearstorage();
    var parameters = {
        "executethis": "does_not_exist",
        "does_not_exist": "function () { return {data: 'Keg of Beer'}; }"
    }
    var assert = {
        "data": "Keg of Beer"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}


// This test is to call func_b, remap does_not_exist to func_a and execute params to func_a and then to func_b
exports.ettestct10 = ettestct10 = function ettestct10(params, callback) {
    testclearstorage();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "does_not_exist",
        "does_not_exist": "func_a",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    // since we are overiding how functions are maped here, "does_not_exist_* are not deleted from the params
    var assert = {
        "does_not_exist": "func_a",
        "f": "3",
        "c": "0",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

// This test is to call func_b, remap does_not_exist_1 to func_a,
// remap does_not_exist_2 to func_c, and execute params to func_a, and then to func_b, and then func_c.
exports.ettestct11 = ettestct11 = function ettestct11(params, callback) {
    testclearstorage();
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
    var assert = {
        "does_not_exist_1": "func_a",
        "does_not_exist_2": "func_c",
        "f": "3",
        "h": "5",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

// This test is to send in a config as parameter of a config. This allows for the server to recieve a config
// from a config that is passed in the parameters.
exports.ettestct12 = ettestct12 = function ettestct12(params, callback) {
    testclearstorage();
    var parameters = {
        "c": "0",
        "d": "1",
        "e": "2",
        "preexecute": "a",
        "configuration": {
            "preexecute": [{
                "dothis": "dothis",
                "tryorder": "0",
                "executeorder": "0"
            }],
            "a": [{
                "dothis": "alertFn1",
                "tryorder": "0",
                "executeorder": "0"
            }],
            "params": [{
                "a": "b",
                "c": "d",
                "e": "f"
            }]
        }
    }
    var assert = {
        "c": "0",
        "d": "1",
        "ettestct12": "did some alerting",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

// This test is to test a config where a and b do not exist, but func_c does and c will execute. You
// should not see any data for ct13_output_a, or b. The params of mid should insert the cer2:booberry in
// the results
exports.ettestct13 = ettestct13 = function ettestct13(params, callback) {
    testclearstorage();

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
    var assert = {
        "fire_c": "fire_c is now fired",
        "cer2": "booberry"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

exports.ettestct13c = ettestct13c = function ettestct13c(params, callback) {
    testclearstorage();
    // config = setconfig6();
    var temp_config = config;

    config.configuration.preExecute[0].params = {
        "cer1": "alphbits"
    };
    config.configuration.midExecute[0].params = {
        "cer2": "booberry"
    };
    config.configuration.postExecute[0].params = {
        "cer3": "chex"
    };

    execute([{
            "executethis": "a"
        }, {
            "executethis": "b"
        }, {
            "executethis": "fire_c"
        }],
        function (err, res) {
            res = logverify("ettestct13_result", res[2][0], {
                "fire_c": "fire_c is now fired",
                "cer2": "booberry"
            });
            callback(err, res);
        });
}

// This is original ct14 test
// // This test is to test a config where a config with params is sent to pre, mid, and post.
// // The results should have the a,b,c cereals, along with the regular params.
// exports.ettestct14 = ettestct14 = function ettestct14(params, callback) {
// 	testclearstorage();
// 	config = setconfig6();
// 	execute([{
// 		"executethis": "func_b",
// 		"preexecute": "func_a",
// 		"postexecute": "func_c",
// 		"c": "0",
// 		"d": "1",
// 		"e": "2"
// 	}],
// 	function (err, res) {
// 		res = logverify("ettestct14_result", res[0][0], {
// 		"g": "4",
// 		"cer2": "booberry",
// 		"cer1": "alphabits",
// 		"f": "3",
// 		"cer3": "chex",
// 		"h": "5"
// 	});
// 	callback(err, res);
// 	});
// }

// Here is the modified ct14 test
// This test is to test a config where a config with params is sent to pre, mid, and post.
// The results should have the a,b,c cereals, along with the regular params.
exports.ettestct14 = ettestct14 = function ettestct14(params, callback) {
    testclearstorage();
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

    var assert = {
        "g": "4",
        "cer2": "booberry",
        "cer1": "alphabits",
        "f": "3",
        "cer3": "chex",
        "h": "5",
        "configuration": {}
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}


// This will send the alphabits param in the preexecute config, but will be overriding it in the args..
// Which one will win out? It does...the config params are lost and the 'arg' params from the config win out.
exports.ettestct15 = ettestct15 = function ettestct15(params, callback) {
    testclearstorage();
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
    assert = {
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

    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Here the object is to get a set of config params from the config itself by using setconfig2 and checking for the 
// config params in the assertion wid.
exports.ettestct16 = ettestct16 = function ettestct16(params, callback) {
    testclearstorage();
    config = setconfig2();
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

    var assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// To test if the executedefault gets fired, ct17 calls a 'doesnotexist' function to look for. It will not find and function
// or a parameter, so it should find executedefault that has a param to be expected to be sent to func_b.
exports.ettestct17 = ettestct17 = function ettestct17(params, callback) {
    testclearstorage();
    config = setconfig7();
    var parameters = {
        "executethis": "doesnotexist",
        "c": "0",
        "d": "1",
        "e": "2",
        "configuration": {
            midExecute: {
                'exdef': 'param after dothis and executeparam was grabbed'
            }
        }
    }
    var assert = {
        "d": "1",
        "c": "0",
        "g": "4",
        "exdef": "executedefault was grabbed"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// This is to use the params in preexecute to ensure that the preexecute params are getting used by dothis
exports.ettestct18 = ettestct18 = function ettestct18(params, callback) {
    testclearstorage();
    config = setconfig7();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "c": "0",
        "d": "1",
        "e": "2"
    }
    var assert = {
        "exdef": "param after dothis and executeparam was grabbed",
        "f": "3",
        "c": "0",
        "myexfnparam": "hereismyfnparam",
        "g": "4"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// This test is to send params to executethis. There will be params in the call to executethis, config file, and the config in the params
// sent to executethis. There are params that will be used and changed throughout the call...they are alfa, bravo, and charlie. At this point, 
// the args sent to executethis will always win...not any of the 3 places in the config that they are set.
exports.ettestct19 = ettestct19 = function ettestct19(params, callback) {
    testclearstorage();
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
    var assert = {
        "configuration": {},
        "f": "3",
        "g": "4",
        "h": "5",
        "alpha": "1",
        "bravo": "1",
        "charlie": "1"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// Here the goal is to see if the config of the left and right conflict, which wins? Ad of now, the right side wins. The params for func_a,b,c are 
// all set to be 2, but they come out as 4, because that is what pre,mid, and post set them to.
exports.ettestct20 = ettestct20 = function ettestct20(params, callback) {
    testclearstorage();
    config = setconfig8();
    var parameters = {
        "executethis": "func_b",
        "preexecute": "func_a",
        "postexecute": "func_c"
    }
    var assert = {
        "charlie": "4",
        "g": "4",
        "alpha": "4",
        "f": "3",
        "bravo": "4",
        "h": "5"
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

// Template for a new test, yet to be determined
exports.ct1000 = ct1000 = function ct1000(params, callback) {
    testclearstorage();
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


exports.alertFn1 = alertFn1 = function alertFn1(params, callback) {
    // alert('ct7 has alerted');
    params["ct7"] = "did some alerting";
    // delete params["configuration"];
    var err;
    callback(err, params);



}
// Test to call a function
exports.ft1 = ft1 = function ft1(params, callback) {
    testclearstorage();
    executetest("executethis", {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }, "ft1_output", "");
    params = logverify("c_unit_tests", "ft1_result", "ft1_output", "", "", {
        "c": "0",
        "d": "1",
        "g": "4"
    });
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
    // alert('b');

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

// This is used when a and b do not exist, but 

exports.fire_c = fire_c = function fire_c(parameters, callback) {
    parameters["fire_c"] = "fire_c is now fired";
    var err;
    callback(err, parameters);
}

// These are the async versions of the above calls
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

exports.async_func_d = async_func_d = function async_func_d(parameters, callback) {
    var t = parameters["d"];
    parameters['executethis'] = 'async_func_e';
    parameters = executethis(parameters);
    sleep(500);
    if (parameters["d"] == t) parameters["d"] = t + ":added";
    delete parameters["e"];
    parameters["h"] = "5";
    var err;
    callback(err, parameters);
}

exports.async_func_e = async_func_e = function async_func_e(parameters) {
    sleep(500);
    // alert('func_e');
    delete parameters["d"];
    parameters["h"] = "7";
    return parameters;
}

exports.async_func_d1 = async_func_d1 = function async_func_d1(parameters) {
    parameters['executethis'] = 'async_func_e1';
    parameters = executethis(parameters, "execute");
    sleep(500);
    parameters["h"] = "5";
    return parameters;
    // callback (parameters);
}

exports.async_func_e1 = async_func_e1 = function async_func_e1(parameters, callback) {
    sleep(500);
    // alert('func_e1');
    parameters['executethis'] = 'async_func_f';
    parameters = executethis(parameters, execute);
    var err;
    callback(err, parameters);
    // return parameters;
}

exports.async_func_f = async_func_f = function async_func_f(parameters, callback) {
    sleep(500);
    // alert('func_f');
    parameters["rubies"] = "red";
    parameters['executethis'] = async_func_g;
    parameters = executethis(parameters, execute);
    var err;
    callback(err, parameters);
    // return parameters;
}

exports.async_func_g = async_func_g = function async_func_g(parameters, callback) {
    sleep(500);
    // alert('func_g');
    parameters["emeralds"] = "green";
    parameters['executethis'] = async_func_h;
    parameters = executethis(parameters, execute);
    var err;
    callback(err, parameters);
    // return parameters;
}

exports.async_func_h = async_func_h = function async_func_h(parameters, callback) {
    sleep(500);
    // alert('diamonds');
    parameters["diamonds"] = "you are rich!!";
    console.log('Struck diamonds -- five levels deep in executethis');
    var err;
    callback(err, parameters);
    // return parameters;
}
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
// 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

// This will test the ability to write a dto to the db and retrieve it
exports.ettestag1 = ettestag1 = function ettestag1(params, callback) {
    testclearstorage();
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
            res = logverify("ettestag1_result", res[1][0], {
                "note": "string",
                "wid": "sounddto",
                "metadata.method": "sounddto"
            });
            callback(err, res);
        });
}

// // This will test the ability to write a dto to the db, use that dto to write
// // a wid with that dto, and get the results of getting that wid.
// exports.ag211 = ag211 = function ag211(params, callback) {
// 	// testclearstorage();
// 	// ag2_setup();
// 	executetest("getwidmaster", {
// 		"wid": "color1"
// 	}, "get_color1_result", "");

// 	params = logverify("alpha_unit_tests", "ag2_result", "get_color1_result", "", "", {
// 		"hue": "red",
// 		"wid": "color1",
// 		"metadata.method": "defaultdto"
// 	});

// 	console.log(' >>>>>> ' + params);

// 	if (callback instanceof Function) {
// 		var err;callback(err,params);
// 	} else {
// 		return params;
// 	}
// }

// This will test the ability to write a dto to the db, use that dto to write
// a wid with that dto, and get the results of getting that wid.
exports.ettestag2 = ettestag2 = function ettestag2(params, callback) {
    //debugcat = 'get';
    testclearstorage();
    debuglevel = 0;
    debugname = "getwidmongo";
    debugcat = "";
    debugsubcat = "";
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
            proxyprinttodiv('Function ag2 result ', res, 99);
            res = logverify("ettestag2_result", res[3][0], {
                "hue": "red",
                "wid": "color1",
                "metadata.method": "defaultdto"
            });
            callback(err, res);
        });
}
// This is a 2 level test of the dtos...instantiate song1 with a songdto, and some sounddto values
exports.ettestag3 = ettestag3 = function ettestag3(params, callback) {
    testclearstorage();

    debuglevel = 75;
    debugname = "getwidmongo";
    debugcat = "";
    debugsubcat = "";


    execute([{
            "executethis": "addwidmaster",
            "wid": "sounddto",
            "metadata.method": "sounddto",
            "note": "string"
        }, {
            "executethis": "addwidmaster",
            "wid": "songdto",
            "metadata.method": "songdto",
            "title": "string",
            "sounddto": "onetomany"
        }, {
            "executethis": "addwidmaster",
            "wid": "rel_sound_to_song",
            "primarywid": "songdto",
            "secondarywid": "sounddto",
            "relationshiptype": "attributes"
        }, {
            "executethis": "addwidmaster",
            "wid": "song1",
            "metadata.method": "songdto",
            "title": "Highway to Hell",
            "sounddto.0.note": "A flat",
            "sounddto.1.note": "B sharp",
            "sounddto.2.note": "C flat"
        }, {
            "executethis": "getwidmaster",
            "wid": "song1"
        }],
        // execute([{
        // 	"executethis": "updatewid", 
        // 	"wid": "authordto",
        // 	"metadata.method": "authordto",
        // 	"Author": "string"
        // },
        // {	
        // 	"executethis": "updatewid", 
        // 	"wid": "bookdto",
        // 	"metadata.method": "bookdto",
        // 	"title": "string"
        // },
        // {	
        // 	"executethis": "updatewid", 
        // 	"wid": "rel_author_to_book",
        // 	"primarywid": "authordto",
        // 	"secondarywid": "bookdto",
        // 	"relationshiptype": "attributes"
        // },
        // {	
        // 	"executethis": "updatewid", 
        // 	"wid": "book1",
        // 	"metadata.method": "bookdto",
        // 	"title": "The book of testing",
        // 	"authordto.0.author": "Sammy Sample"
        // },
        // {
        // 	"executethis": "getwidmaster",
        // 	"wid": "book1"
        // }],

        function (err, res) {


            debugfn("update code generator END", "addmaster", "", "code", debugcolor, debugindent, {}, 5);
            debugname = "";
            debugcat = "";
            debugsubcat = "";

            proxyprinttodiv('Function ag3 result ', res[4], 99);
            alert(JSON.stringify(res));
            res = logverify("ettestag3_result", res[4][0], {
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
            });


            callback(err, res);
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



exports.func_async = func_async = function func_async(parameters, callback) {
    delete parameters["d"];
    console.log('from func_async');
    // var f = function (){
    // sleep(3000);
    // parameters["m"] = "now you waited for 1000 ms";
    // printToDiv('func_async',parameters,1);	
    // };
    // f();

    // echo ajax request
    echoCall('/echo', 'GET', false,
        function (data) {
            parameters["m"] = "now you waited for the async call";
            printToDiv('func_async_success', parameters, 1);
            console.log('from func_async success');
        },
        function (data) {
            parameters["m"] = "now you waited for the async call";
            printToDiv('func_async_error', parameters, 1);
            console.log('from func_async error');
        }
    );
    printToDiv('func_async -- ', parameters, 1);
    // var err;callback(err, parameters);
    var err;
    callback(err, parameters);
}

exports.echoCall = echoCall = function echoCall(url, type, asyncVal, successCallback, errorCallback) {
    jQuery.ajax({
        url: url,
        tupe: type,
        async: asyncVal,
        cache: false,
        dataType: "html",
        success: successCallback,
        error: errorCallback
    });
}

// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------
// The standard config with normal order and no redirects
exports.setconfig1 = setconfig1 = function setconfig1() {
    configuration = {};
    configuration.environment = 'local';


    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {};
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    // configuration.MongoAddEditPrepare = {};
    //  configuration.MongoAddEditPrepare.synchronous = true;

    //  configuration.AddMongoRelationship = {};
    //  configuration.AddMongoRelationship.synchronous = true;

    //  configuration.addwidmaster = {};
    //  configuration.addwidmaster.synchronous = true;

    //  configuration.AddWidParameters = {};
    //  configuration.AddWidParameters.synchronous = true;

    //  configuration.AddMaster = {};
    //  configuration.AddMaster.synchronous = true;

    //  configuration.aggressivedto = {};
    //  configuration.aggressivedto.synchronous = true;

    //  configuration.getcleanparameters = {};
    //  configuration.getcleanparameters.synchronous = true;

    //  configuration.getwidmaster = {};
    //  configuration.getwidmaster.synchronous = true;


    //  configuration.getWidMongo = {};
    //  configuration.getWidMongo.synchronous = true;

    //  configuration.getAndFormatNextLevel = {};
    //  configuration.getAndFormatNextLevel.synchronous = true;  

    //  configuration.addcleanparameters = {};
    //  configuration.addcleanparameters.synchronous = true;
    // ----------------------
    // configuration.MongoAddEditPrepare = {};
    // configuration.MongoAddEditPrepare.synchronous = false;

    // configuration.AddMongoRelationship = {};
    // configuration.AddMongoRelationship.synchronous = false;

    // configuration.addcleanparameters = {};
    // configuration.addcleanparameters.synchronous = false;

    // configuration.addwidmaster = {};
    // configuration.addwidmaster.synchronous = false;

    // configuration.AddWidParameters = {};
    // configuration.AddWidParameters.synchronous = false;

    // configuration.AddMaster = {};
    // configuration.AddMaster.synchronous = false;

    // configuration.aggressivedto = {};
    // configuration.aggressivedto.synchronous = false;

    // configuration.getcleanparameters = {};
    // configuration.getcleanparameters.synchronous = false;

    // configuration.getwidmaster = {};
    // configuration.getwidmaster.synchronous = false;

    // configuration.getWidMongo = {};
    // configuration.getWidMongo.synchronous = false;

    // configuration.getAndFormatNextLevel = {};
    // configuration.getAndFormatNextLevel.synchronous = false;

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].executeorder = 0;
    configuration.getwid[0].tryorder = 0;
    configuration.getwid[0].dothis = 'offlinegetwid';
    configuration.getwid[0].params = {};

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].executeorder = 0;
    configuration.updatewid[0].tryorder = 0;
    configuration.updatewid[0].dothis = 'offlineupdatewid';
    configuration.updatewid[0].params = {};

    configuration.getfrommongo = [];
    configuration.getfrommongo[0] = {};
    configuration.getfrommongo[0].executeorder = 0;
    configuration.getfrommongo[0].tryorder = 0;
    configuration.getfrommongo[0].dothis = 'offlinegetfrommongo';
    configuration.getfrommongo[0].params = {};

    return {
        "configuration": configuration
    }
}

// This config is to test the redirection of functions. The various ct(x)
// tests make calls to redir_a mapped to func_a, redir_b to func_b and
// redir_c to func_c. The idea is that the tests will have the same output 
// as the tt tests, but with calling all the redir_(x) functions instead.
exports.setconfig2 = setconfig2 = function setconfig2() {
    configuration = {};
    configuration.environment = 'local';

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].executeorder = 0;
    configuration.getwid[0].tryorder = 0;
    configuration.getwid[0].dothis = 'offlinegetfrommongo';
    configuration.getwid[0].params = {};

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].order = 0;
    configuration.updatewid[0].dothis = 'offlineaddtomongo';
    configuration.updatewid[0].params = {};

    configuration.querywid = [];
    configuration.querywid[0] = {};
    configuration.querywid[0].order = 0;
    configuration.querywid[0].dothis = 'querywid';
    configuration.querywid[0].params = {};

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {};

    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};

    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};

    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    configuration.redir_a = [];
    configuration.redir_a[0] = {};
    configuration.redir_a[0].executeorder = 0;
    configuration.redir_a[0].tryorder = 0;
    configuration.redir_a[0].dothis = 'func_a';
    configuration.redir_a[0].params = {};

    configuration.redir_b = [];
    configuration.redir_b[0] = {};
    configuration.redir_b[0].executeorder = 0;
    configuration.redir_b[0].tryorder = 0;
    configuration.redir_b[0].dothis = 'func_b';
    configuration.redir_b[0].params = {};

    configuration.redir_c = [];
    configuration.redir_c[0] = {};
    configuration.redir_c[0].executeorder = 0;
    configuration.redir_c[0].tryorder = 0;
    configuration.redir_c[0].dothis = 'func_c';
    configuration.redir_c[0].params = {};

    configuration.mock_server = [];
    configuration.mock_server[0] = {};
    configuration.mock_server[0].executeorder = 0;
    configuration.mock_server[0].tryorder = 0;
    configuration.mock_server[0].dothis = 'cic_output';
    configuration.mock_server[0].params = {
        "configuration": {
            "login1": [{
                "executeorder": 0,
                "tryorder": 0,
                "dothis": "login",
                "params": {}
            }]
        }
    }

    return {
        "configuration": configuration
    }
}

// This config is to test redirecting preexecute to function_f and see what happens
exports.setconfig3 = setconfig3 = function setconfig3() {
    configuration = {};
    configuration.environment = 'local';

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].order = 0;
    configuration.getwid[0].dothis = 'offlinegetfrommongo';
    configuration.getwid[0].params = {};

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].order = 0;
    configuration.updatewid[0].dothis = 'offlineaddtomongo';
    configuration.updatewid[0].params = {};

    configuration.querywid = [];
    configuration.querywid[0] = {};
    configuration.querywid[0].order = 0;
    configuration.querywid[0].dothis = 'querywid';
    configuration.querywid[0].params = {};

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {};
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    return {
        "configuration": configuration
    }
}
// Looking to get preexecute to acually fire func_g...not func_a, as the test calls for
exports.setconfig4 = setconfig4 = function setconfig4() {
    configuration = {};

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].order = 0;
    configuration.getwid[0].dothis = 'offlinegetfrommongo';
    configuration.getwid[0].params = {};

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].order = 0;
    configuration.updatewid[0].dothis = 'offlineaddtomongo';
    configuration.updatewid[0].params = {};

    configuration.querywid = [];
    configuration.querywid[0] = {};
    configuration.querywid[0].order = 0;
    configuration.querywid[0].dothis = 'querywid';
    configuration.querywid[0].params = {};

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'func_g'; // This is the change to remark
    configuration.preExecute[0].params = {};
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    return {
        "configuration": configuration
    }
}
// This is the config to use to test the tryorder...
// mid has the usual settings in an order that should
// be resorted by dothis...if successful, the mid order should
// be the same as it always is, not the way this config is set
exports.setconfig5 = setconfig5 = function setconfig5() {
    configuration = {};
    configuration.environment = 'local';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {};
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'server';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 4;
    configuration.midExecute[1].tryorder = 4;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 7;
    configuration.midExecute[2].tryorder = 7;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 1;
    configuration.midExecute[3].tryorder = 1;
    configuration.midExecute[3].dothis = 'dothis';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';

    return {
        "configuration": configuration
    }
}
// This config is for testing a and b not there, but c is
exports.setconfig6 = setconfig6 = function setconfig6() {
    configuration = {};
    configuration.environment = 'local';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {
        'cer1': 'alphabits'
    };
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {
        'cer2': 'booberry'
    };
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {
        'cer3': 'chex'
    };
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    return {
        "configuration": configuration
    }
}

// This config is to test he executedefault...does it make it there if dothis and executeparam do 
// not exist.  
exports.setconfig7 = setconfig7 = function setconfig7() {
    configuration = {};
    configuration.environment = 'local';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {
        'myexfnparam': 'hereismyfnparam'
    };
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {};
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    // configuration.midExecute[2].dothis = 'executedefault'; // This is replaced with func_b to simulate getting to executedefault
    configuration.midExecute[2].dothis = 'func_b';
    configuration.midExecute[2].params = {
        'exdef': 'param after dothis and executeparam was grabbed'
    };
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {};
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    return {
        "configuration": configuration
    }
}

exports.setconfig8 = setconfig8 = function setconfig8() {
    configuration = {};
    configuration.environment = 'local';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'dothis';
    configuration.preExecute[0].params = {
        "alpha": "4"
    };
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeparam';
    configuration.preExecute[1].params = {};
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executedefault';
    configuration.preExecute[2].params = {};
    configuration.preExecute[3] = {};
    configuration.preExecute[3].executeorder = 0;
    configuration.preExecute[3].tryorder = 0;
    configuration.preExecute[3].dothis = 'server';
    configuration.preExecute[3].params = {};

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 0;
    configuration.midExecute[0].tryorder = 0;
    configuration.midExecute[0].dothis = 'dothis';
    configuration.midExecute[0].params = {
        "bravo": "4"
    };
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 0;
    configuration.midExecute[1].tryorder = 0;
    configuration.midExecute[1].dothis = 'executeparam';
    configuration.midExecute[1].params = {};
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 0;
    configuration.midExecute[2].tryorder = 0;
    configuration.midExecute[2].dothis = 'executedefault';
    configuration.midExecute[2].params = {};
    configuration.midExecute[3] = {};
    configuration.midExecute[3].executeorder = 0;
    configuration.midExecute[3].tryorder = 0;
    configuration.midExecute[3].dothis = 'server';
    configuration.midExecute[3].params = {};

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'dothis';
    configuration.postExecute[0].params = {
        "charlie": "4"
    };
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeparam';
    configuration.postExecute[1].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executedefault';
    configuration.postExecute[2].params = {};
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'server';
    configuration.postExecute[2].params = {};

    configuration.func_a = [];
    configuration.func_a[0] = {};
    configuration.func_a[0].order = 0;
    configuration.func_a[0].dothis = 'func_a';
    configuration.func_a[0].params = {
        "alpha": "2"
    };

    configuration.func_b = [];
    configuration.func_b[0] = {};
    configuration.func_b[0].order = 0;
    configuration.func_b[0].dothis = 'func_b';
    configuration.func_b[0].params = {
        "bravo": "2"
    };

    configuration.func_c = [];
    configuration.func_c[0] = {};
    configuration.func_c[0].order = 0;
    configuration.func_c[0].dothis = 'func_c';
    configuration.func_c[0].params = {
        "charlie": "2"
    };

    return {
        "configuration": configuration
    }
}

exports.test_new = test_new = function test_new(params, callback) {
    testclearstorage();
    execute([{
            "executethis": "addwidmaster",
            "wid": "new_test_wid_1",
            "height": "17 meters"
        }, {
            "executethis": "getwidmaster",
            "wid": "new_test_wid_1"
        }],
        function (err, res) {
            res = logverify("unit_tests", "test_new_result", "", res[1][0], "", {
                "height": "17 meters",
                "wid": "new_test_wid_1",
                "metadata.method": "defaultdto"
            });
            if (callback instanceof Function) {
                callback(err, res);
            } else {
                return res;
            }
        });
}

exports.uwid1 = uwid1 = function uwid1(params, callback) {
    testclearstorage();

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

exports.tmp1 = tmp1 = function tmp1(params, callback) {
    testclearstorage();
    var x = {
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
    };

    var z = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }

    w = extend(z, {
        "configuration": x
    });

    execute([
            w
        ],
        function (err, res) {
            res = logverify("tmp1_result", res[0][0], {
                "d": "1",
                "c": "0",
                "g": "4",
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
                    }]
                }
            });
            callback(err, res);
        });
}

//---------------------------

exports.tmp2 = tmp2 = function tmp2(params, callback) {
    testclearstorage();
    var temp_config = extend(config);

    var x = {
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
    };

    var z = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }

    config.configuration = extend(config.configuration, x);

    execute([
            z
        ],
        function (err, res) {
            res = logverify("tmp2_result", res[0][0], {
                "d": "1",
                "c": "0",
                "g": "4"
            });
            config = extend(temp_config);
            callback(err, res);
        });
}

//---------------------------

function tmp4(params, callback) {
    assert = {
        "d": "1",
        "c": "0",
        "g": "4"
    };
    parameters = {
        "executethis": "redir_b",
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
            }]
        }
    };
    master_test_and_verify(parameters, assert, callback);
    var err;
    callback(err, res);
}

function tmp5(params, callback) {
    parameters = {
        "executethis": "func_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }

    assert = {
        "d": "1",
        "c": "0",
        "g": "4"
    }

    test_and_verify(parameters, assert, true, function (err, res) {
        callback(err, res);
    });
}

function tmp6(params, callback) {
    parameters = {
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
    assert = {
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
    }
    master_test_and_verify(this.targetfn.name, parameters, assert, function (err, res) {
        callback(err, res)
    });
}

exports.tmp3 = tmp3 = function tmp3(params, callback) {
    testclearstorage();
    var temp_config = extend(config);

    var x = {
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
    };

    var z = {
        "executethis": "redir_b",
        "c": "0",
        "d": "1",
        "e": "2"
    }

    w = extend(z, {
        "configuration": x
    });

    execute([
            w
        ],
        function (err, res) {
            res = logverify("tmp3_result", res[0][0], {
                "d": "1",
                "c": "0",
                "g": "4",
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
                    }]
                }
            });

            config = extend(temp_config);
            config.configuration = extend(config.configuration, x);

            var r2 = execute([
                    z
                ],
                function (err, res_1) {
                    alert("res_1[0][0]: " + JSON.stringify(res_1[0][0]));
                    res_1 = logverify("tmp3a_result", res_1[0][0], {
                        "d": "1",
                        "c": "0",
                        "g": "4"
                    });
                    alert("res_1: " + JSON.stringify(res_1));
                    callback(err, res_1);
                });

            alert("r2: " + JSON.stringify(r2));
            res = extend(res, r2);
            alert(JSON.stringify(res));
            config = extend(temp_config);

            callback(err, res);
        });
}


// function tmp5 (params, callback) {
// 	parameters = {
// 			"executethis": "func_b",
// 			"c": "0",
// 			"d": "1",
// 			"e": "2"
// 		}

// 	assert = {
// 			"d": "1",
// 			"c": "0",
// 			"g": "4"
// 		}

// test_and_verify (parameters, assert, true, function (err, res) {
// 		callback (err, res);
// 	});

//	// master_test_and_verify (parameters, assert, function (err, res) {
//	// 	callback (err, res);
//	// });
// }