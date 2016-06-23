'use strict';

angular.module('app').factory('userApiService', function ($http, AuthBaseUrl) {
    
    return {

        login: function (username, password) {
            var headers = {
                Authorization: 'Basic ' + btoa(username + ':' + password)
            };
            return $http.get(AuthBaseUrl + 'user/login', {
                headers: headers
            });
        }
    };
});
