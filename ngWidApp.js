if(!exports){ var exports = {}; }

//<editor-fold desc="App, Factories, and Directives">

if (typeof angular !== 'undefined') {
    var widApp = angular.module('widApp', []);

    widApp.factory('dataService', function($http, $compile) {
        var storeAllData = function(obj, scope, objName) {
            var thisWid = objName
                ? objName
                : obj.wid
                ? obj.wid
                : undefined;

            if (thisWid) {
                console.log('********************************************');
                console.log('**ngModelData** bind-able data for ' + thisWid + ' :');
                console.log(obj);
                console.log('********************************************');

                scope[thisWid] = obj;
            }

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] instanceof Object) {
                        console.log('********************************************');
                        console.log('**ngModelData** bind-able data for ' + prop + ' :');
                        console.log(obj[prop]);
                        console.log('********************************************');

                        scope[prop] = obj[prop];

                        storeAllData(obj[prop], scope, prop);
                    } else {
                        scope.data[prop] = obj[prop];
                    }
                }
            }
        };

        return {
            storeData: function(results, scope, modelKey) {
                if (results !== null && results instanceof Object) {
                    storeAllData(results, scope, modelKey);
                } else if (Array.isArray(results)) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i] !== null && results[i] instanceof Object) {
                            storeAllData(results[i], scope, modelKey);
                        }
                    }
                }
            },

            compileWithScope: function(whatToCompile) {
                var scope = $('body').scope();
                scope.$apply(function() {
                    $compile(whatToCompile)(scope);
                });

            },

            user: {
                getLocal: function() {
                    if (window.localStorage) {
                        return JSON.parse(window.localStorage.getItem('driUser'));
                    } else { return null; }
                },

                putLocal: function(userId, accessToken, isLoggedIn) {
                    if (window.localStorage) {
                        var driUser = {userid:userId,at:accessToken,loggedin:isLoggedIn};
                        window.localStorage.setItem('driUser', JSON.stringify(driUser));
                    }
                },

                removeLocal: function() {
                    if (window.localStorage) {
                        window.localStorage.removeItem('driUser');
                    }
                },

                getInfo: function(accessToken, callback) {
                    var parameters = {parameterDTOs:[]};
                    parameters.parameterDTOs.push({ParameterName:'accesstoken',ParameterValue:accessToken});

                    return getDriApiData('getuserinfo?at=f52a89ed-7163-47de-901c-e8bd0b96b7ff', parameters, function(err, results) {
                        if (err && Object.size(err) > 0) { console.log('execute error => ' + JSON.stringify(err)); }
                        else { callback(results); }
                    });
                },

                getNewAt: function(callback) {
                    return getDriApiData('getnewaccesstoken', {}, function(err, results) {
                        if (err && Object.size(err) > 0) { console.log('execute error => ' + JSON.stringify(err)); }
                        else { callback(results); }
                    });
                }
            }
        }
    });

    widApp.factory('executeService', function($http, dataService) {
        return {
            executeThis: function(parameters, scope, callback) {
                execute(parameters, function(err, resultArray) {
                    for (var x = 0; x < resultArray.length; x++) {
                        // if not logged in at this point send browser to login.html
                        if (resultArray[x].etstatus) {
                            if (resultArray[x].etstatus.status && resultArray[x].etstatus.status === 'unauthorized') {
                                window.location = 'http://dripoint.com/login.html?returnUrl=' + window.location.href;
                            }
                        }

                        // check if this is a screenwid and needs to be displayed
                        if (resultArray[x].html) {
                            // clear page in preparation for the wid we are going to
                            if (resultArray[x].command && resultArray[x].command.htmltargetid) {
                                etClearPage(resultArray[x].command.htmltargetid);
                            } else {
                                etClearPage();
                            }

                            async.series([
                                    function(cb) {
                                        // save execute params to inwid
                                        execute({executethis:'addwidmaster',wid:'inwid',addthis:{wid:resultArray[x].wid}},
                                            function(err, retArr) {
                                                if (err && Object.size(err) > 0) {
                                                    console.log('error adding to the wid "inwid" => ' + JSON.stringify(err));
                                                } else { cb(null, [{}]); }
                                            });
                                    },
                                    function(cb) {
                                        execute({executethis:'getwidmaster',wid:'urlparams'}, scope,
                                            function(err, resArr) {
                                                cb(null, resArr);
                                            });
                                    },
                                    function(cb) {
                                        execute({executethis:'getwidmaster',wid:'inwid'}, scope,
                                            function(err, resArr) {
                                                cb(null, resArr);
                                            });
                                    }
                                ],
                                function(err, overallResults) {
                                    var processParams = {};
                                    for (var y = 0; y < overallResults.length; y++) {
                                        for (var i = 0; i < overallResults[y].length; i++) {
                                            extend(true, processParams, overallResults[y][i]);
                                        }
                                    }

                                    // pass results of urlparams and inwid wids in as parameters to etProcessParameters
                                    etProcessParameters(processParams);
                                });

//                            // call etProcessParams while passing in the contents of both the 'urlparams' and 'inwid' wids
//                            execute({preexecute:'urlparams',executethis:'inwid',postexecute:'etProcessParameters'},
//                            function(err, resultArr) {
//                                if (err && Object.size(err) > 0) {
//                                    console.log('error leading up to calling the etProcessParameters function => ' + JSON.stringify(err));
//                                }
//                            });
                        }

                        // TODO : find out if this is still valid logic
//                        // if command.htmlwid found, begin screen redirection to said wid
//                        if (resultArray[x].command && resultArray[x].command.htmlwid) {
//                            // add params to inwid, then call etClearPage
//                            angularExecuteThis({
//                                executethis:'addwidmaster',
//                                wid:'inwid',
//                                parameters:{
//                                    executethis:resultArray[x].command.htmlwid
//                                }
//                            });
//
//                            // begin display of new wid based on inwid params
//                            etClearPage();
//                            etProcessParameters();
//                        }

                        dataService.storeData(resultArray[x], scope);
                    }

                    // send array to callback
                    if (callback instanceof Function) { callback(err, resultArray); }
                });
            },

            executeOffer: function(parameters, callback) {
                //            parameters.parameterDTOs.push({ParameterName:'apikey',ParameterValue:'2FFA4085C7994016913F8589B765D4E5'});

                return getDriApiData('executeofferid?at=f52a89ed-7163-47de-901c-e8bd0b96b7ff', parameters, function(err, results) {
                    if (err && Object.size(err) > 0) { console.log('getDriApiData error => ' + JSON.stringify(err)); }
                    else { callback(results); }
                });
            }
        }
    });

    widApp.directive('ngBlur', function() {
        return function(scope, elem, attrs) {
            elem.bind('blur', function() {
                scope.$apply(attrs.ngBlur);
            });
        };
    });

    widApp.directive('appendcode', function($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
                function(scope) {
                    return scope.$eval(attrs.appendcode);
                },
                function(html) {
                    element.html(html);
                    var contents = element.contents();
                    $compile(contents)(scope);
                }
            );
        }
    });

    //</editor-fold>

    //<editor-fold desc="wid controller">

    widApp.controller('widCtrl', ['$scope', 'dataService', 'executeService', function($scope, dataService, executeService) {
        $scope.data = {};
        $scope.ajax = {};
        var querystring = window.location.search,
            parameters = helper.queryStrToObj(querystring.substring(1)),
            currentUser = dataService.user.getLocal();
//            executeObj = {preexecute:'urlparams', executethis:'inwid', postexecute:'etProcessParameters'};

        async.series([
                function(cb) {
                    // save url parameters to 'urlparams' wid
                    if (parameters.wid) { parameters.addthis = {wid:parameters.wid}; delete parameters['wid']; }
                    if (parameters.executethis) {
                        if (!parameters.addthis) { parameters.addthis = {executethis:parameters.executethis}; }
                        else { parameters.addthis.executethis = parameters.executethis; }
                        delete parameters['executethis'];
                    }

                    urlExecuteObj = extend(true, parameters, {executethis:'addwidmaster', wid:'urlparams'});
                    executeService.executeThis(urlExecuteObj, $scope, function(err, resArr) { cb(null, [{}]); });
                },
                function(cb) {
                    executeService.executeThis({executethis:'getwidmaster',wid:'urlparams'}, $scope,
                        function(err, resArr) { cb(null, resArr); });
                },
                function(cb) {
                    executeService.executeThis({executethis:'getwidmaster',wid:'inwid'}, $scope,
                        function(err, resArr) { cb(null, resArr); });
                }
            ],
            function(err, overallResults) {
                var processParams = {};
                for (var x = 0; x < overallResults.length; x++) {
                    for (var i = 0; i < overallResults[x].length; i++) {
                        extend(true, processParams, overallResults[x][i]);
                    }
                }

                // pass results of urlparams and inwid wids in as parameters to etProcessParameters
                etProcessParameters(processParams);
            });


//        executeService.executeThis(executeObj, $scope);

//        if (!parameters.executethis) { parameters.executethis = 'etProcessParameters'; }
//
//        executeService.executeThis(parameters, $scope);

        // package url parameters into model
        if (Object.size(helper.queryStrToObj(location.search)) > 0) {
            $scope.urlparameters = helper.queryStrToObj(location.search);
        }

        // package current users info into the model
        if (currentUser && currentUser.loggedin) {
            dataService.user.getInfo(currentUser.at, function(results) {
                var info = JSON.parse(results[0].Value);
                $scope.userinfo = info;
                console.log('**ngModelData** data for current userinfo :');
                console.log($scope.userinfo);

                // update userid in local user object
                var user = dataService.user.getLocal();
                user.userid = info.UserId;
                dataService.user.putLocal(user.userid, user.at, user.loggedin);
            });
        }

        //<editor-fold desc='addDataWid section'>

        $scope.addWidName = "";
        $scope.deleteWid = false;

        $scope.addWid = function () {
            var pNames = $('.pname');
            var pValues = $('.pvalue');
            var updateParams = {wid:$scope.addWidName,executethis:'addwidmaster'};

            for (var i = 0; i < pNames.length; i++) { updateParams[pNames[i].value] = pValues[i].value; }

            if ($scope.deleteWid) { updateParams.metadata.status = '5'; }

            executeService.executeThis(updateParams, $scope, function() {
                $scope.clearAddWidForm();
                $('#successlog').html("The wid has been successfully added or updated!");
                //            self.location = "widForViewRepeatExample.html?wid=" + $scope.addWidName;
            });
        };

        $scope.newPropRow = function() {
            $('#propertyList').append(helper.newPropRowHtml);
            $('.pname').last().focus();
        };

        $scope.clearAddWidForm = function() {
            $('.added').remove();
            $('#widname,.pname,.pvalue').val('');
        };

        //</editor-fold>

        //<editor-fold desc='login section'>

        $scope.loginGuid = '';

        $scope.login1 = function() {
            $scope.clearlogs();
            var at = ''
                , parameters = {parameterDTOs:[]}
                , user = dataService.user.getLocal();

            parameters.parameterDTOs.push({ParameterName:'phonenumber',ParameterValue:$('#phonenumber').val()});

            if (user) { at = user.at; }
            else {
                dataService.user.getNewAt(function(results) { at = results[0].Value; });
                dataService.user.putLocal('', at, false);
            }

            $scope.ajax.loading = true;

            getDriApiData('login1', parameters, function(err, results) {
                if (err, Object.size(err) > 0) { console.log('getDriApiData error => ' + JSON.stringify(err)); }
                else {
                    $('#pin,#pingrp').show();
                    $('#phonegrp').hide();

                    $scope.loginGuid = results[0].Value;
                    $scope.ajax.loading = false;
                }
            });
        };

        $scope.login2 = function() {
            $scope.clearlogs();
            var user = dataService.user.getLocal();
            var parameters = {parameterDTOs:[]};
            parameters.parameterDTOs.push({ParameterName:'accesstoken',ParameterValue:user.at},
                {ParameterName:'pin',ParameterValue:$('#pin').val()},
                {ParameterName:'guid',ParameterValue:$scope.loginGuid});

            $scope.ajax.loading = true;

            getDriApiData('login2', parameters, function(err, results) {
                if (err, Object.size(err) > 0) { console.log('getDriApiData error => ' + JSON.stringify(err)); }
                else {
                    if (results[0].Value === 'True') {
                        dataService.user.putLocal('', user.at, true);
                        $('#successlog').html("Thank you for logging into DRI!");
                    } else {
                        var error = results[7].Value !== '' ? results[7].Value : 'An error has occurred.';
                        $('#errorlog').html(error);
                    }

                    $scope.ajax.loading = false;
                    var returnUrl = helper.getUrlParam('returnUrl');
                    if (returnUrl !== '') { window.location = returnUrl; }
                }
            });
        };

        $scope.logout = function() {
            dataService.user.removeLocal();
            $('#successlog').html('You are now logged out.');
            window.location = '../login.html';
        };

        $scope.cancelLogin = function() {
            $scope.clearlogs();
            $('#phonenumber,#pin').val('');
            $('#pin,#pingrp').hide();
            $('#phonegrp').show();
        };

        //</editor-fold>

        //<editor-fold desc='misc scoped helper functions'>

        $scope.widFromUrl = function() {
            if ($scope.urlparameters && $scope.urlparameters.wid) {
                return $scope[$scope.urlparameters.wid];
            } else { return undefined; }
        };

        $scope.clearlogs = function() { $('#errorlog,#successlog').html(''); };

        $scope.listLength = function(list) { return Object.size(list); };

        $scope.getRawHtml = function() {
            $('#rawhtml').text(document.getElementsByTagName('html')[0].outerHTML);
            $scope.showrawhtml = true;
        };

        //</editor-fold>
    }]);

    widApp.controller('scaffoldCtrl', ['$scope', 'dataService', 'executeService', function($scope, dataService, executeService) {
        var allowedAttrs = [
                ['ng-model'],
                ['onclick'],
                ['ng-show'],
                ['ng-hide'],
                ['id'],
                ['style'],
                ['ng-click']
            ],
            cleanOpts = {
                format: true,
                formatIndent: -20,
                allowedAttributes: allowedAttrs,
                allowEmpty: ['script'],
                bodyOnly: false
            };

        $scope.sDOM = $(document.createElement('html'));
        $scope.wid = helper.getUrlParam('wid');

        // set up head and body elements
        var head = $(document.createElement('head'));
        head.append('<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
            '<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css"/>'+
            '<script src="../js/async.js"></script>'+
            '<script src="../js/et-utils.js"></script>'+
            '<script src="../js/config-local.js"></script>'+
            '<script src="../js/et-get.js"></script>'+
            '<script src="../js/et-add.js"></script>'+
            '<script src="../js/et-query.js"></script>'+
            '<script src="../js/et-test.js"></script>'+
            '<script src="../js/et-unit_tests.js"></script>'+
            '<script src="../js/et-security.js"></script>'+
            '<script src="../js/executethis.js"></script>'+
            '<script src="../js/et-dto.js"></script>'+
            '<script src="http://code.jquery.com/jquery-latest.min.js"></script>'+
            '<script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js"></script>'+
            '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.2/angular.min.js"></script>'+
            '<script src="js/ngWidApp.js"></script>'+
            '<script src="js/et-converttoscreenwid.js"></script>'+
            '<script>var widforview = "' + $scope.wid + '", ' +
            'links = [{class:"updatewidbtn",trigger:"click",action:"commitchangestowid"},' +
            '{class:"delbtn",trigger:"click",action:"toggledelete"}]; </script>' +
            '<style>.input-group { padding: 3px; }</style>');

        var body = $(document.createElement('body'));

        $scope.sDOM.append(head);
        $scope.sDOM.append(body);

        // set up container div
        var containerdiv = $(document.createElement('div'));
        containerdiv.addClass('container');

        // set up header
        var jumbotron = $(document.createElement('div'));
        jumbotron.addClass('jumbotron');
        jumbotron.append('<h1>Edit the ' + $scope.wid + ' wid.</h1>');
        containerdiv.append(jumbotron);

        // set up a commit changes script block that will update the current wid
        var commitChangesEle = $(document.createElement('script'));
        commitChangesEle.html("function commitchangestowid() { " +
            "var executeobj = {executethis:addwidmaster,wid:'" + $scope.wid + "'}, pNames = $('.pname'), pValues = $('.pvalue'), actiontaken = 'updated'; " +
            " for (var i = 0; i < pNames.length; i++) { executeobj[pNames[i].value] = pValues[i].value; } " +
            "if ($('.delbtn').hasClass('btn-danger')) { if (!executeobj.metadata) { executeobj.metadata = {}; } executeobj.metadata.status = 5; actiontaken = 'deleted'; toggledelete(); } " +
            "execute(executeobj, function(err, resultsArr) { " +
            "if(err && Object.size(err) > 0) { $('#errorlog').html(JSON.stringify(err)); } " +
            "else { $('#successlog').html('" + $scope.wid + " was successfully ' + actiontaken + '.'); $('.delrowbtn').remove(); } });}");

        var deleteCheckEle = $(document.createElement('script'));
        deleteCheckEle.html("function toggledelete() { $('.delbtn').toggleClass('btn-danger'); " +
            "if ($('.delbtn').hasClass('btn-danger')) { $('.deletemessage').show(); } else { $('.deletemessage').hide(); } }");

        $scope.sDOM.find('body').append(containerdiv);
        $scope.sDOM.find('body').append(commitChangesEle);
        $scope.sDOM.find('body').append(deleteCheckEle);

        var proplist = $(document.createElement('div'));
        proplist.addClass('row well');
        proplist.attr('id', 'propertyList');

        // create rows and inputs for each property in wid
        async.series([
                function(cb) {
                    execute({executethis:$scope.wid},
                        function(err, resultsArr) {
                            cb(null, resultsArr);
                        });
                }],
            function(err, resultsArray) {
                for (var x = 0; x < resultsArray.length; x++) {
                    for (var y = 0; y < resultsArray[x].length; y++) {
                        for (var i = 0; i < resultsArray[x][y].length; i++) {
                            if (resultsArray[x][y][i] instanceof Object) {
                                for (var propName in resultsArray[x][y][i]) {
                                    proplist.append("<span><div class='input-group col-md-6'> <span class='input-group-addon'>Key</span>" +
                                        "<input type='text' value='" + propName + "' class='pname form-control'>" +
                                        "</div><div class='input-group col-md-6'> <span class='input-group-addon'>Value</span>" +
                                        "<input type='text' ng-model='" + $scope.wid + "." + propName + "' class='pvalue form-control'></div></span>");
                                }
                            }
                        }
                    }
                }
            });

        $scope.sDOM.find('.container').append(proplist);

        // set up buttons
        var updateWidBtn = $(document.createElement('button'));
        updateWidBtn.addClass('btn btn-primary updatewidbtn');
        updateWidBtn.text('Update ' + $scope.wid);

        var addbtn = $(document.createElement('button'));
        addbtn.addClass('btn btn-info');
        addbtn.text('Add Property');
        addbtn.attr('ng-click', 'newPropRow()');

        var delbtn = $(document.createElement('button'));
        delbtn.addClass('btn delbtn');
        delbtn.text('Delete');

        var delmessage = $(document.createElement('span'));
        delmessage.addClass('label label-danger deletemessage');
        delmessage.attr('style', 'display:none;');
        delmessage.text('click update to delete ' + $scope.wid);

        var btndiv = $(document.createElement('div'));
        btndiv.addClass('row');
        btndiv.append(updateWidBtn);
        btndiv.append(addbtn);
        btndiv.append(delbtn);
        btndiv.append(delmessage);

        // set up log div
        var logdiv = $(document.createElement('div'));
        logdiv.addClass('container');
        logdiv.append(['<p id="errorlogo" class="row"></p>','<p id="successlog" class="row"></p>']);

        $scope.sDOM.find('.container').append([btndiv, logdiv]);

        var domOuterHtml = $scope.sDOM.clone().wrap('<p>').parent().html();

        $('#htmlview').text($.htmlClean(domOuterHtml, cleanOpts));
    }]);

    //</editor-fold>

    //<editor-fold desc="helper object and functions"

    var helper = {
        getUrlParam: function(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        queryStrToObj: function(queryString) {
            var params = {},
                queries;

            // Split into key/value pairs
            if (queryString.slice(0, 1) === '?') { queryString = queryString.substring(1, queryString.length); }
            queries = queryString.split("&");

            // Convert the array of strings into an object
            for (var i = 0; i < queries.length; i++ ) {
                var temp = queries[i].split('=');

                // if temp[0] starts with a ?, strip it off.
                if (temp[0].substring(0, 1) == '?') { temp[0] = temp[0].slice(1, temp[0].length); }

                params[temp[0]] = temp[1];
            }

            return params;
        },

        newPropRowHtml: "<span class='added'><div class='input-group col-md-6'>" +
            "<span class='input-group-addon'>Key</span>" +
            "<input type='text' class='pname form-control'>" +
            "</div><div class='input-group col-md-6'>" +
            "<span class='input-group-addon'>Value</span>" +
            "<input type='text' class='pvalue form-control'>" +
            "<div class='input-group-btn delrowbtn'><button class='btn btn-info' " +
            "onclick='$(this).parent().parent().parent().remove();'>-</button></div></div></span>",

        processHtml: function(screenWid) {
            var targetid = 'default_view_loc',
                clearTarget = undefined;

            // find targetid from screenwid if it exists
            if (screenWid.command) {
                if (screenWid.command.htmltargetid) { targetid = screenWid.command.htmltargetid; }

                if (screenWid.command.htmlcleartargetid) { clearTarget = screenWid.command.htmlcleartargetid; }
            }

            helper.appendHtml(screenWid.html, targetid, clearTarget);
        },

        appendHtml: function(html, targetId, clearTargetId) {
            var scope = $('body').scope();

            if (clearTargetId) { $('#' + clearTargetId).html(''); }

            $('#' + targetId).append(html);

            // take care of any <execute></execute> elements
            $('execute').each(function(index, ele) {
                helper.processExecute(ele, scope);
            });
        },

        processExecute: function(ele, scope) {
            var executeObj = NNMtoObj(ele.attributes);

            // proceed if execute tag wasn't already processed during server conversion process
            if (!excuteObj.processed || executeObj.processed !== 'true') {
                angular.injector(['ng', 'widApp'])
                    .get('executeService')
                    .executeThis(executeObj, scope, function(err, resultArr) {
                        if (err && Object.size(err) > 0) {
                            console.log('screenwidToHtml execute error => ' + JSON.stringify(err));
                        } else {
                            for (var i = 0; i < resultsArr.length; i++) {
                                if (resultArr[i].html) { $(ele).append(resultArr[i].html); }
                            }
                        }
                    });
            }
        },

        isJsonStr: function(jsonStr) {
            try {
                JSON.parse(jsonStr);
            } catch (e) {
                return false;
            }
            return true;
        }
    };

    function callExecute(ele) {
        var attrObj = NNMtoObj(ele.attributes),
            parameters = extend(true, {command:{parameters:{eventdata:{}}}}, JSON.parse(attrObj.etparams)),
            scope = $('body').scope();

        // send calling element and any additional info into the execute process
        parameters.command.parameters.eventdata.element = ele;
        parameters.command.parameters.eventdata.originatingscreen = helper.getUrlParam('wid');

        angular.injector(['ng', 'widApp'])
            .get('executeService')
            .executeThis(parameters, scope, function(err, resultArray) {
                if (err && Object.size(err) > 0) {
                    console.log('error in execute process that was bound using links event binding => ' + JSON.stringify(err));
                }
            });
    }

    // adding a size function to Object's prototype
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // convert a NamedNodeMap to an Object
    function NNMtoObj(namedNodeMap) {
        var obj = {};
        for (var i = 0; i < namedNodeMap.length; i++) {
            obj[namedNodeMap[i].name] = namedNodeMap[i].value;
        }
        return obj;
    }

    //</editor-fold>

    //<editor-fold desc="wid landing spot functions">

    exports.etClearPage = etClearPage = function etClearPage(targetid) {
        $('#default_view_loc').html('');
        $('#errorlog').html('');
        $('#successlog').html('');

        if (targetid && targetid !== '') {
            $('body').not('#default_view_loc #logs #' + targetid).remove();
            $('#' + targetid).html('');
        } else {
            $('body').not('#default_view_loc #logs').remove();
        }
    };

    exports.etProcessParameters = etProcessParameters = function etProcessParameters(parameters, callback) {
        var widdata = '',
            wid = '',
            executeObj = {},
            scope = $('body').scope();

        // just in case parameters were not passed in
        parameters = parameters || {};

//        // delete inwid and urlparams wids
//        execute(
//            {executethis:'addwidmaster', wid:'inwid', medata:{status:'5'}},
//            function(err, retArray) {
//                if (err && Object.size(err) > 0) {
//                    console.log('error attempting to delete the wid "inwid" => ' + JSON.stringify(err));
//                }
//            }
//        );
//        execute(
//            {executethis:'addwidmaster', wid:'urlparams', medata:{status:'5'}},
//            function(err, retArray) {
//                if (err && Object.size(err) > 0) {
//                    console.log('error attempting to delete the wid "urlparams" => ' + JSON.stringify(err));
//                }
//            }
//        );

        if (parameters.wid) {
//            executeObj.executethis = parameters.wid;
            executeObj.executethis = 'getwidmaster';
            executeObj.wid = parameters.wid;
            delete parameters['wid'];
        }

        if (parameters.widdata) {
            executeObj.preexecute = parameters.widdata;
            delete parameters['widdata'];
        }

        var processParams = extend(true, executeObj, parameters);

        if (processParams['metadata.method']) {
            delete processParams['metadata.method'];
        }

        angular.injector(['ng', 'widApp'])
            .get('executeService')
            .executeThis(processParams, scope, function(err, resultArray) {
                if (err && Object.size(err) > 0) {
                    console.log('execute error => ' + JSON.stringify(err));
                    callback(err, {});
                } else {
                    for (var i = 0; i < resultArray.length; i++) {
                        if (resultArray[i].html) {
                            $(resultArray[i].html).filter('execute').each(function(index, ele) {
                                helper.processExecute(ele, scope);
                            });

                            // TODO: ask if this is still relevent logic
                            // save this html to 'screenwid' wid instead of processing html
                            var executeObj = extend(true, resultsArray[x], {executethis:'addwidmaster', wid:'screenwid'});
                            execute(executeObj, function(err, resultsArr) {
                                if (err && Object.size(err) > 0) { console.log('execute error => ' + JSON.stringify(err)); }
                            });
                        }

                        etProcessScreenWid(resultArray[i]);
                    }

                    if (callback instanceof Function) { callback(null, resultArray); }
                }
            });
    };

    exports.etProcessScreenWid = etProcessScreenWid = function etProcessScreenWid(parameters) {
        var widforview = [],
            widforbase = [],
            widforbackground = [],
            links = [],
            dataforview = {},
            all_wids = [],
            scope = $('body').scope(),
            startwid;

        if (parameters.widforview) { widforview = parameters.widforview.split(','); delete parameters['widforview']; }
        else if (typeof widForView !== 'undefined') { widforview = widForView.split(','); }

        scope.widforview = widforview;

        if (parameters.widforbase) { widforbase = parameters.widforbase.split(','); delete parameters['widforbase']; }
        else if (typeof widForBase !== 'undefined') { widforbase = widForBase.split(','); }

        scope.widforbase = widforbase;

        if (parameters.widforbackground) { widforbackground = parameters.widforbackground.split(','); delete parameters['widforbackground']; }
        else if (typeof widForBackground !== 'undefined') { widforbackground = widForBackground.split(','); }

        scope.widforbackground = widforbackground;

        if (parameters.links) { links = JSON.parse(parameters.links); delete parameters['links']; }

        scope.links = links;

        // handle action binding from links variable
        for (var i = 0; i < links.length; i++) {
            var identifier = links[i].id  // get jquery identifier bassed on id or class passsed in
                    ? '#' + links[i].id
                    : links[i].class
                    ? '.' + links[i].class
                    : 'idAndClassMissing',
                eventParams = {};

            if (identifier === 'idAndClassMissing') {
                console.log('links object must contain an id or class property. => ' + JSON.stringify(links[i]));
            }

            // check if the executethis property is an object
            if (helper.isJsonStr(links[i].executethis)) { eventParams = JSON.parse(links[i].executethis); }
            else { eventParams.executethis = links[i].executethis; }

            // add event attributes to element
            $(identifier).attr('etparams', JSON.stringify(eventParams));

            // add event listener to element
            $(identifier).attr('on' + links[i].trigger, 'callExecute(this)');
        }

        if (parameters.dataforview) {
            dataforview = JSON.parse(parameters.dataforview);

            angular.injector(['ng', 'widApp'])
                .get('dataService')
                .storeData(dataforview, scope, 'dataforview');

            delete parameters['dataforview'];
        }

        if (parameters.startwid) {
            angular.injector(['nt', 'widApp'])
                .get('executeService')
                .executeThis({executethis:parameters.startwid}, scope, function(err, resultsArr) {
                    if (err && Object.size(err) > 0) {
                        console.log('execute error while processing html => ' + JSON.stringify(err));
                    } else {
                        for (var i = 0; i < resultsArr.length; i++) {
                            if (resultsArr[i].html) {
                                helper.processHtml(resultsArr[i]);
                            }
                        }
                    }
                });
        }

        for (var a = 0; a < widforview.length; a++) { all_wids.push(widforview[a].trim()); }
        for (var b = 0; b < widforbase.length; b++) { all_wids.push(widforbase[b].trim()); }
        for (var c = 0; c < widforbackground.length; c++) { all_wids.push(widforbackground[c].trim()); }

        for (var w = 0; w < all_wids.length; w++) {
            var executeObj = {};
            executeObj.executethis = all_wids[w];
            executeObj['command.convertmethod'] = 'toobject';

            angular.injector(['ng', 'widApp'])
                .get('executeService')
                .executeThis(executeObj, scope, function(err, resultArray) {
                    if (err && Object.size(err) > 0) {
                        console.log('execute error while processing html => ' + JSON.stringify(err));
                    } else {
                        for (var x = 0; x < resultArray.length; x++) {
                            if (resultArray[x].html) {
                                helper.processHtml(resultArray[x]);
                            }
                        }
                    }
                });
        }
    };

    //</editor-fold>

    // get an object or function from the current angularJS scope based on passed in property name
    exports.getFromAngular = getFromAngular = function getFromAngular(propName) {
        return $('body').scope()[propName];
    };

    // adds the passed in object to the current angularJS scope (model) under the passed in name
    exports.addToAngular = addToAngular = function addToAngular(name, obj) {
        $('body').scope()[name] = obj;
    };

    // call executeService.executeThis from legacy (non angularJS) code
    exports.angularExecuteThis = angularExecuteThis = function angularExecuteThis(parameters, callback) {
        var scope = $('body').scope();
        angular.injector(['ng', 'widApp'])
            .get('executeService')
            .executeThis(parameters, scope, function(err, resultArray) {
                if (callback instanceof Function) { callback(err, resultArray); }
            });
    };
}

// passed in html and parameters become a screenWid with the passed in name
// and saved as a screenWid object using addWidMaster
exports.htmlToScreenwid = htmlToScreenwid = function htmlToScreenwid(screenWidName, html, params, callback) {
    var newScreenwid = {executethis:'addwidmaster',wid:screenWidName,html:html},
        htmlDom = $(html);

    if (params) {
        if (params.widforview) { newScreenwid.widforview = widforview; }
        if (params.widforbase) { newScreenwid.widforbase = widforbase; }
        if (params.widforbackground) { newScreenwid.widforbackground = widforbackground; }
        if (params.dataforview) { newScreenwid.dataforview = JSON.stringify(dataforview); }
        if (params.links) { newScreenwid.links = JSON.stringify(links); }
    }

    // add all execute elements as numbered properties of the screenWid
    htmlDom.filter('execute').each(function(i, ele) {
        newScreenwid[i.toString()] = ele.outerHTML;
    });

    execute(newScreenwid, function(err, resultArray) {
        if (err && Object.size(err) > 0) {
            console.log('htmlToScreenwid addwidmaster error => ' + JSON.stringify(err));
        }
        if (callback instanceof Function) { callback(resultArray); }
    });
};

// calls callback function, passing in all html derived from passed in screenWid object
exports.screenwidToHtml = screenwidToHtml = function screenwidToHtml(screenWid, callback) {
    var htmlDom = $(screenWid.html),
        htmlString = '';

    function addToElement(ele, cb) {
        var executeObj = NNMtoObj(ele.attributes);

        execute(executeObj, function(err, resultArray) {
            if (err && Object.size(err) > 0) {
                console.log('screenwidToHtml execute error => ' + JSON.stringify(err));
            } else {
                for (var i = 0; i < resultArray.length; i++) {
                    if (resultArray[i].html) { $(ele).append(resultArray[i].html); }
                }
            }

            cb(null);
        });
    }

    async.each(htmlDom.filter('execute'), addToElement, function(err) {
        htmlDom.each(function(index, element) {
            if (element.outerHTML !== undefined) {
                htmlString += element.outerHTML;
            }
        });

        callback(htmlString);
    });
};