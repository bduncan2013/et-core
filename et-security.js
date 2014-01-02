
    // Starting of securityCheck function
    // LM: I think this section is turned off and not used since it was breaking the code, but it 
    // should be saved and implemented later
    function securitycheck(widParameter, accessToken, callback) { // accountwid and transactionType for future use
        proxyprinttodiv('Function securityCheck() in : ', 'before');
        return true;
        var widInput = {
            mongowid: widParameter,
            mongorelationshiptype: 'attributes',
            mongorelationshipmethod: 'last',
            mongowidmethod: 'dtotype',
            mongorelationshipdirection: 'forward',
            convertmethod: 'convertmethod'
        };
        var accessTokenInput = {
            wid: accessToken,
            mongorelationshiptype: 'attributes',
            mongorelationshipmethod: 'last',
            mongowidmethod: 'dtotype',
            mongorelationshipdirection: 'forward',
            convertmethod: 'convertmethod'
        };
        var widOutput = querywid(widInput);
        proxyprinttodiv('Function querywid() out with  output : ', widOutput);
        var accessTokenOutput = querywid(accessTokenInput);
        proxyprinttodiv('Function querywid() out with  output : ', accessTokenOutput);
        var securityCheckOutput = widOutput['security'] > accessTokenOutput['security'];
        proxyprinttodiv('Function securityCheck() out with  output : ', securityCheckOutput);

        ret = securityCheckOutput;

        if (callback instanceof Function) {
            callback(err, ret);
        }

        if (exports.environment === "local") {
            while (ret === undefined) {}
            return ret;
        }

    } // End of querywid function