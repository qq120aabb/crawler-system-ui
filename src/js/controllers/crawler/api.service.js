'use strict';

angular.module('app').factory('crawlerService', function ($http, ApiBaseUrl) {

    return {
      
        addConfig : function (params) {
          return $http.post(ApiBaseUrl + 'article/index', params);
        }
    };
});
