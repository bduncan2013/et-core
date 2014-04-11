

                incomingparams['midexecute'] = incomingparams['executethis'];
                delete incomingparams['executethis'];
                //            console.log('starting preexecute ' + nonCircularStringify(incomingparams));
                dothisprocessor(incomingparams, 'preexecute', function (err, preResults) {
                    // If error, bounce out



                    if (err && Object.keys(err).length > 0) {
                        callback(err, preResults);
                    } else {
                        try {
                            preError = err;

                            if (!preResults)
                                preResults = {};

                            if (Object.prototype.toString.call(preResults) === '[object Array]') {
                                if (preResults.length > 0) {
                                    preResults = preResults[0];
                                } else {
                                    preResults = {};
                                }
                            }

                            extend(true, preResults, incomingparams);





                            dothisprocessor(preResults, 'midexecute', function (err, midResults) {
                                // If error, bounce out
                                if (err && Object.keys(err).length > 0) {
                                    callback(err, midResults);
                                } else {
                                    try {
                                        midError = err;
                                        //                    console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                                        //                    console.log(' after midexecute II >> \n' + JSON.stringify(midResults, '-', 4));

                                        proxyprinttodiv("post midexecute -- midResults", midResults, 11);

                                        if (!midResults)
                                            midResults = {};

                                        if (Object.prototype.toString.call(midResults) === '[object Array]') {
                                            if (midResults.length > 0) {
                                                midResults = midResults[0];
                                            } else {
                                                midResults = {};
                                            }
                                        }

                                        proxyprinttodiv("end midexecute -- midResults", midResults, 11);





                                        

                                        dothisprocessor(midResults, 'postexecute', function (err, postResults) {
                                            // If error, bounce out
                                            if (err && Object.keys(err).length > 0) {
                                                callback(err, postResults);
                                            } else {
                                                try {

                                                    if (!postResults)
                                                        postResults = {};
                                                    // if command.execute then call execute with command.execute.parameters
