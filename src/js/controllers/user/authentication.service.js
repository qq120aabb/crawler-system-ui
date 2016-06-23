'use strict';

angular.module('app').service('userAuthenticationService', function ($localStorage, userApiService, $state, $rootScope) {

    var _authenticated = false;
    var me = this;
    var _socketConnected = false;

    this.login = function (token, user) {
        $localStorage.token = token;
        $localStorage.user = user;
        _authenticated = true;
    };

    this.isSocketConnected = function () {
        return _socketConnected;
    };

    this.isAuthenticated = function () {
        if (this.getToken() && this.getUser()) {
            _authenticated = true;
        }
        return _authenticated;
    };
    this.logout = function () {
        $localStorage.$reset();
        _authenticated = false;
    };

    this.getToken = function () {
        return $localStorage.token;
    };

    this.getUser = function () {
        return $localStorage.user;
    };


});
