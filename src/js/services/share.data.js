'use strict';

angular.module('app').factory('sharedDataService', function () {

    var _sharedData = {
        sessionExpired: false,
        toaster: undefined,
        loginError: false,
        progressNo: undefined,

        PAGE_SIZE: 30
    };




    return _sharedData;

});
