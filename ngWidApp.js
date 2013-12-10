//<editor-fold desc="App, Factories, and Directives">

var widApp = angular.module('widApp', []);

widApp.factory('dataService', function($http) {
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
    };

    return {
        storeData: function(results, scope) {
            if (results !== null && results instanceof Object) {
                storeAllData(results, scope);
            } else if (Array.isArray(results)) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i] !== null && results[i] instanceof Object) {
                        storeAllData(results[i], scope);
                    }
                }
            }
        },

        executeOffer: function(parameters, callback) {
            parameters.parameterDTOs.push({ParameterName:'apikey',ParameterValue:'2FFA4085C7994016913F8589B765D4E5'});

            return getDriApiData('executeofferid?at=f52a89ed-7163-47de-901c-e8bd0b96b7ff', parameters, function(err, results) {
                if (err) { console.log(err); }
                else { callback(results); }
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
                    if (err) { console.log(err); }
                    else { callback(results); }
                });
            },

            getNewAt: function(callback) {
                return getDriApiData('getnewaccesstoken', {}, function(err, results) {
                    if (err) { console.log(err); }
                    else { callback(results); }
                });
            }
        }
    }
});

widApp.factory('executeService', function($http, dataService) {
    return {
        executeThis: function(action, parameters, scope, callback) {
            var user = dataService.user.getLocal();
            parameters.executethis = action;
//            parameters.ac = user.at;

            execute(parameters, function(results) {
                if (results.error) {
                    console.log(results.error);
                }
                else {
                    // if not logged in at this point send browser to login.html
                    if (results.status && results.status === 'unauthorized') {
                        window.location = 'http://dripoint.com/login.html?returnUrl=' + window.location.href;
                    }

                    dataService.storeData(results, scope);
                    if (callback instanceof Function) { callback(results); }
                }
            });
        }
    }
});

widApp.directive('appendcode', function($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.appendcode);
            },
            function(html) {
                element.html(html);
                $compile(element.contents())(scope);
            }
        );
    }
});

//</editor-fold>

//<editor-fold desc="wid controller">

widApp.controller('widCtrl', ['$scope', 'dataService', 'executeService',
    function($scope, dataService, executeService) {
        // adding model information to console for more transparency
        console.log('**ngModelData**  These logs show you what is bind-able from the current AngularJS model  **ngModelData**');

        $scope.data = {};
        $scope.widNames = helper.getUrlParam('wid') != ''
            ? (helper.getUrlParam('wid')).split(',')
            : typeof widForView !== 'undefined' ? widForView.split(',') : [];
        $scope.baseWids = typeof widForBase !== 'undefined' ? widForBase.split(',') : [];
        $scope.backgroundWids = typeof widForBackground !== 'undefined' ? widForBackground.split(',') : [];
        var currentUser = dataService.user.getLocal();
        var widsToGet = [];

        // ajax config settings
        $scope.ajax = {};
        $scope.ajax.loading = false;

        // resolve accessToken if none yet exists
        if (!currentUser || !currentUser.at || currentUser.at === '') {
            dataService.user.getNewAt(function(results) {
                if (currentUser) {
                    currentUser.at = results[0].Value;
                } else {
                    dataService.user.putLocal('', results[0].Value, false);
                }
            });
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

        // package dataForView data into model
        var dataFV = typeof dataForView !== 'undefined' ? dataForView : {};
        $scope.dataForView = dataFV;
        console.log('**ngModelData** dataForView data :');
        console.log($scope.dataForView);

        for (var prop in dataFV) {
            if (dataFV.hasOwnProperty(prop)) {
                $scope.data[prop] = dataFV[prop];
            }
        }

        // package url parameters into model
        if (Object.size(helper.qryStrToObject(location.search)) > 0) {
            $scope.urlparameters = helper.qryStrToObject(location.search);
        }

        // restrict page access to login status if page contains 'checklogin' variable
        if (typeof checklogin !== 'undefined' ? checklogin : false) {
            if (!currentUser || !currentUser.loggedin) {
                window.location = 'http://dripoint.com/login.html?returnUrl=' + window.location.href;
            }
        }

        // queue up widForView wids
        for (var i in $scope.widNames) {
            widsToGet.push($scope.widNames[i]);
        }

        // queue up widForBase wids
        for (var i in $scope.baseWids) {
            widsToGet.push($scope.baseWids[i]);
        }

        // queue up widForBackground wids
        for (var i in $scope.backgroundWids) {
            widsToGet.push($scope.backgroundWids[i]);
        }

        // get data for queued wids and package it into the model
        for (var i in widsToGet) {
            var paramObject = {};
            paramObject.wid = widsToGet[i];
            paramObject['command.convertmethod'] = 'toobject';
            executeService.executeThis('getwidmaster', paramObject, $scope);
        }

        $scope.addwidmaster = function(widObj) {
            executeService.executeThis('addwidmaster', widObj, $scope, function(results) {
                $('#successlog').html("Successfully added or updated!");
            });
        };

        $scope.ripFromModel = function(wid) {
            return $scope[wid];
        };

        $scope.executeOffer = function () {
            var parameters = {parameterDTOs:[]};
            parameters.parameterDTOs.push({ ParameterName: 'offerid', ParameterValue: $('#offerid').val() },
                { ParameterName: 'offersn', ParameterValue: $('#offersn').val() },
                { ParameterName: 'offertagline', ParameterValue: $('#tagline').val() },
                { ParameterName: 'offershortdescription', ParameterValue: $('#shortdesc').val() },
                { ParameterName: 'offerdescription', ParameterValue: $('#longdesc').val() });

            $scope.ajax.loading = true;
            dataService.executeOffer(parameters, function (results) {
                $('#results').html('').append(JSON.stringify(results));
                alert("Your coupon was created");
                $scope.ajax.loading = false;
            });
        };

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
                if (err) { console.log(err); }
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
                if (err) { console.log(err); }
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

        //<editor-fold desc='addDataWid section'>

        $scope.addWidName = "";
        $scope.deleteWid = false;

        $scope.addWid = function () {
            var pNames = $('.pname');
            var pValues = $('.pvalue');
            var updateParams = {wid:$scope.addWidName};

            for (var i = 0; i < pNames.length; i++) { updateParams[pNames[i].value] = pValues[i].value; }

            if ($scope.deleteWid) { updateParams.Status = '5'; }

            executeService.executeThis('addwidmaster', updateParams, $scope, function() {
                $scope.clearAddWidForm();
                self.location = "widForViewRepeatExample.html?wid=" + $scope.addWidName;
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

        //<editor-fold desc='misc scoped helper functions'>

        $scope.widFromUrl = function() { return $scope[helper.getUrlParam('wid')]; };

        $scope.clearlogs = function() { $('#errorlog,#successlog').html(''); };

        $scope.listLength = function(list) { return Object.size(list); };

        //</editor-fold>
    }]);

//</editor-fold>

var helper = {
    getUrlParam: function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    qryStrToObject: function (querystring) {
        var result = {};
        querystring = querystring.substring(1);  // remove the ?
        var qsArray = querystring.split('&');
        if (qsArray[0] === '') { delete qsArray[0]; }

        if (Object.size(qsArray) > 0) {
            // load querystring pairs into object
            for (var i = 0; i < qsArray.length; i++) {
                paramArray = qsArray[i].split('=');
                result[paramArray[0]] = paramArray[1];
            }
        }

        return result;
    },

    newPropRowHtml: "<span class='added'><div class='input-group col-md-6'>" +
        "<span class='input-group-addon'>Key</span>" +
        "<input type='text' class='pname form-control'>" +
        "</div><div class='input-group col-md-6'>" +
        "<span class='input-group-addon'>Value</span>" +
        "<input type='text' class='pvalue form-control'></div></span>"
};

// adding a size function to Object's prototype
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};