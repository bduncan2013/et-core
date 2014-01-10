if(!exports){ var exports = {}; }

exports.getFromAngular = getFromAngular = function getFromAngular(wid) {
    return $('body').scope()[wid];
};

exports.addToAngular = addToAngular = function addToAngular(name, obj) {
    $('body').scope()[name] = obj;
};

exports.angularExecuteThis = angularExecuteThis = function angularExecuteThis(parameters) {
    // call executeService.ExecuteThis from legacy
};

exports.etProcessParameters = etProcessParameters = function etProcessParameters(parameters, callback) {
    var widdata = '',
        wid = '',
        executeObj = {};

    if (parameters.widdata) {
        executeObj.preexecute = parameters.widdata;
        delete parameters['widdata'];
    }

    if (parameters.wid) {
//        executeObj.executethis = parameters.wid; // temporarily altered until this process is fixed.
        executeObj.executethis = 'getwidmaster';
        executeObj.wid = parameters.wid;
        delete parameters['wid'];
    }

    executeObj.postexecute = 'inwid';

    var processParams = extend(true, executeObj, parameters);

    execute(processParams, function(err, completeWid) {
        if (err && Object.size(err) > 0) {
            console.log('execute error => ' + JSON.stringify(err));
            callback(err, {});
        }
        else {
            if (completeWid.html) {
                if (completeWid.htmlplacement) {
                    $('#' + completeWid.htmlplacement).append(completeWid.html);
                } else {
                    $('body').append(completeWid.html);
                }
            }

            execute(  // clear 'inwid' wid
                {executethis:'addwidmaster', wid:'inwid'},
                function(err, results) {
                    if (err && Object.size(err) > 0) { console.log('execute error => ' + JSON.stringify(err)); }
                }
            );

            etProcessScreenWid(completeWid);
            callback(null, completeWid);
        }
    });
};

exports.etProcessScreenWid = etProcessScreenWid = function etProcessScreenWid(parameters) {
    var widforview = []
        , widforbase = []
        , widforbackground = []
        , links = []
        , dataforview = {}
        , all_wids = []
        , scope = $('body').scope();

    if (parameters.widforview) { widforview = parameters.widforview.split(','); delete parameters['widforview']; }
    else if (typeof widForView !== 'undefined') { widforview = widForView.split(','); }

    scope.widforview = widforview;

    if (parameters.widforbase) { widforbase = parameters.widforbase.split(','); delete parameters['widforbase']; }
    else if (typeof widForBase !== 'undefined') { widforbase = widForBase.split(','); }

    scope.widforbase = widforbase;

    if (parameters.widforbackground) { widforbackground = parameters.widforbackground.split(','); delete parameters['widforbackground']; }
    else if (typeof widForBackground !== 'undefined') { widforbackground = widForBackground.split(','); }

    scope.widforbackground = widforbackground;

    if (parameters.links) { links = parameters.links; delete parameters['links']; }

    scope.links = links;

    if (parameters.dataforview) {
        dataforview = JSON.parse(parameters.dataforview);

        angular.injector(['ng', 'widApp'])
            .get('dataService')
            .storeData(dataforview, scope, 'dataforview');

        delete parameters['dataforview'];
    }
    else if (typeof dataForView !== 'undefined') { dataforview = dataForView; }

    for (var a = 0; a < widforview.length; a++) { all_wids.push($.trim(widforview[a])); }
    for (var b = 0; b < widforbase.length; b++) { all_wids.push($.trim(widforbase[b])); }
    for (var c = 0; c < widforbackground.length; c++) { all_wids.push($.trim(widforbackground[c])); }

    for (var d = 0; d < all_wids.length; d++) {
        var executeObj = {};
        executeObj.executethis = 'getwidmaster';
        executeObj.wid = all_wids[d];
        executeObj['command.convertmethod'] = 'toobject';

        angular.injector(['ng', 'widApp'])
            .get('executeService')
            .executeThis(executeObj, scope, function(results) {
                if (results.html) {
                    if (results.htmlplacement) {
                        $('#' + results.htmlplacement).append(results.html);
                    } else {
                        $('body').append(results.html);
                    }
                }
            });
    }
};

//<editor-fold desc="App, Factories, and Directives">

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
            if (!parameters.environment) { parameters.environment = {}; }
            var user = dataService.user.getLocal();
            if (user) {
                parameters.environment.accesstoken = user.at;
            }

            execute(parameters, function(err, results) {
                if (err && Object.size(err) > 0) {
                    console.log('execute error => ' + JSON.stringify(err));
                }
                else {
                    // if not logged in at this point send browser to login.html
                    if (results.etstatus) {
                        if (results.etstatus.status && results.etstatus.status === 'unauthorized') {
                            window.location = 'http://dripoint.com/login.html?returnUrl=' + window.location.href;
                        }

                        if (results.etstatus.screenwid) {
                            results.executethis = 'etProcessScreenWid';

                        }
                    }

                    dataService.storeData(results, scope);
                    if (callback instanceof Function) { callback(results); }
                }
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
    var querystring = window.location.search
        , parameters = helper.queryStrToObj(querystring.substring(1))
        , currentUser = dataService.user.getLocal();

    if (!parameters.executethis) { parameters.executethis = 'etProcessParameters'; }

    executeService.executeThis(parameters, $scope);

    // package url parameters into model
    if (Object.size(helper.qryStrToObject(location.search)) > 0) {
        $scope.urlparameters = helper.qryStrToObject(location.search);
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

        if ($scope.deleteWid) { updateParams.Status = '5'; }

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

    //<editor-fold desc='misc scoped helper functions'>

    $scope.widFromUrl = function() {
        if ($scope.urlparameters && $scope.urlparameters.wid) {
            return $scope[$scope.urlparameters.wid];
        } else { return undefined; }
    };

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

    queryStrToObj: function(queryString) {
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
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