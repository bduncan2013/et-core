//<editor-fold desc="App, Factories, and Directives">

var widApp = angular.module('widApp', []);

widApp.factory('dataService', function($http) {
    return {
        storeData: function(results, scope) {
            if (results instanceof Object) {
                var thisWid = scope.screenWids[i] ? scope.screenWids[i] : results.wid;
                scope[thisWid] = results;

                console.log('********************************************');
                console.log('**ngModelData** bind-able data for ' + thisWid + ' :');
                console.log(results);
                console.log('********************************************');

                for (var prop in results) {
                    if (results.hasOwnProperty(prop)) {
                        scope.data[prop] = results[prop];
                    }

                    // if value is an object then store it in model data
                    if (results[prop] instanceof Object) {
                        scope[prop] = results[prop];

                        console.log('********************************************');
                        console.log('**ngModelData** bind-able data for ' + prop + ' :');
                        console.log(results[prop]);
                        console.log('********************************************');

                        for (var innerprop in results[prop]) {
                            if (results[prop].hasOwnProperty(innerprop)) {
                                scope.data[innerprop] = results[prop][innerprop];
                            }
                        }
                    }
                }
            } else if (Array.isArray(results)) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].data !== null && typeof results[i].data !== 'undefined' && typeof results[i].data === 'object') {
                        var thisWid = scope.screenWids[i] ? scope.screenWids[i] : results[i].wid;
                        scope[thisWid] = results[i];

                        console.log('********************************************');
                        console.log('**ngModelData** bind-able data for ' + thisWid + ' :');
                        console.log(results[i]);
                        console.log('********************************************');

                        for (var prop in results[i]) {
                            if (results[i].hasOwnProperty(prop)) {
                                scope.data[prop] = results[i][prop];
                            }

                            // if value is an object then store it in model data
                            if (results[i][prop] instanceof Object) {
                                scope[prop] = results[i][prop];

                                console.log('********************************************');
                                console.log('**ngModelData** bind-able data for ' + prop + ' :');
                                console.log(results[i][prop]);
                                console.log('********************************************');

                                for (var innerprop in results[i][prop]) {
                                    if (results[i][prop].hasOwnProperty(innerprop)) {
                                        scope.data[innerprop] = results[i][prop][innerprop];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        executeOffer: function(parameters, callback) {
            parameters.push({ParameterName:'apikey',ParameterValue:'2FFA4085C7994016913F8589B765D4E5'});

            return $http.put('/getdata/executeofferid?apiKey=2FFA4085C7994016913F8589B765D4E5&at=f52a89ed-7163-47de-901c-e8bd0b96b7ff', parameters)
                .success(callback)
                .error(function(data, status, headers, config) { alert('an ' + status + ' error has occurred'); console.log(data.responseText); $scope.ajax.loading = false;});
        },

        user: {
            getLocal: function() {
                if (window.localStorage) {
                    return JSON.parse(window.localStorage.getItem('driUser'));
                }
            },

            putLocal: function(userName, accessToken, isLoggedIn) {
                if (window.localStorage) {
                    var driUser = {username:userName,at:accessToken,loggedin:isLoggedIn};
                    window.localStorage.setItem('driUser', JSON.stringify(driUser));
                }
            },

            removeLocal: function() {
                if (window.localStorage) {
                    window.localStorage.removeItem('driUser');
                }
            },

            getInfo: function(accessToken, callback) {
                var parameters = [];
                parameters.push({ParameterName:'accesstoken',ParameterValue:accessToken});

                return $.ajax({
                    url: '/getdata/getuserinfo?apiKey=2FFA4085C7994016913F8589B765D4E5&at=f52a89ed-7163-47de-901c-e8bd0b96b7ff',
                    type: 'PUT',
                    headers: {'content-type':'Application/json'},
                    cache: false,
                    async: false,
                    dataType: 'json',
                    data: JSON.stringify(parameters),
                    success: callback,
                    error: function(data) {
                        alert('an ' + data.status + ' ' + data.statusText + ' error has occurred');
                        console.log(data.responseText);
                    }
                });
            },

            getNewAt: function(callback) {
                return $.ajax({
                    url: '/getdata/getnewaccesstoken?apiKey=2FFA4085C7994016913F8589B765D4E5',
                    type: 'PUT',
                    headers: {'content-type':'Application/json'},
                    cache: false,
                    async: false,
                    dataType: 'json',
                    data: {},
                    success: callback,
                    error: function(response, status, error) {
                        console.log(response.responseText);
                    }
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

widApp.directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
        elem.bind('blur', function() {
            scope.$apply(attrs.ngBlur);
        });
    };
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
        $scope.screenWids = typeof screenwid !== 'undefined' ? screenwid.split(',') : [];
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
                $scope.userinfo = JSON.parse(results[0].Value);
                console.log('**ngModelData** data for current userinfo :');
                console.log($scope.userinfo);
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

        $scope.executeOffer = function () {
            var parameters = [];
            parameters.push({ ParameterName: 'offerid', ParameterValue: $('#offerid').val() },
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
            var at = '';
            var parameters = [];
            var user = dataService.user.getLocal();
            parameters.push({ParameterName:'phonenumber',ParameterValue:$('#phonenumber').val()});

            if (user) { at = user.at; }
            else {
                dataService.user.getNewAt(function(results) { at = results[0].Value; });
                dataService.user.putLocal('', at, false);
            }

            $scope.ajax.loading = true;
            $.ajax({
                url: '/getdata/login1?apiKey=2FFA4085C7994016913F8589B765D4E5',
                type: 'PUT',
                headers: {'content-type':'Application/json'},
                cache: false,
                async: false,
                dataType: 'json',
                data: JSON.stringify(parameters),
                success: function(results) {
                    $('#pin,#pingrp').show();
                    $('#phonegrp').hide();

                    $scope.loginGuid = results[0].Value;
                    $scope.ajax.loading = false;
                },
                error: function(response) { console.log(response.responseText); }
            });
        };

        $scope.login2 = function() {
            $scope.clearlogs();
            var user = dataService.user.getLocal();
            var parameters = [];
            parameters.push({ParameterName:'accesstoken',ParameterValue:user.at},
                {ParameterName:'pin',ParameterValue:$('#pin').val()},
                {ParameterName:'guid',ParameterValue:$scope.loginGuid});

            $scope.ajax.loading = true;
            $.ajax({
                url: '/getdata/login2?apiKey=2FFA4085C7994016913F8589B765D4E5',
                type: 'PUT',
                headers: {'content-type':'Application/json'},
                cache: false,
                async: false,
                dataType: 'json',
                data: JSON.stringify(parameters),
                success: function(results) {
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
                },
                error: function(response) { console.log(response.responseText); }
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