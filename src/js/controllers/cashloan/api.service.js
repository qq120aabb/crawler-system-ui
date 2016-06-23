'use strict';

angular.module('app').factory('cashloanApiService', function ($http, ApiBaseUrl, sharedDataService) {

    return {
        loanList: function (params) {
            params.size = sharedDataService.PAGE_SIZE;
            return $http.post(ApiBaseUrl + 'Xyqb/pagePayXyqbDetail', params);
        },
        exportLoanExcel: function (params) {
           $http({
               url:ApiBaseUrl + 'Xyqb/exportPayXyqbDetail',
               method: "POST",
               data: params,
               responseType: 'arraybuffer'
           }).success(function (data, status, headers, config) {
               var blob = new Blob([data], {type: "application/vnd.ms-excel"});
               saveAs(blob, "放款详情.xlsx");
           });
        }
    };
});

angular.module('app').factory('cashrepaymentApiService', function ($http, ApiBaseUrl, sharedDataService) {

    return {
        repaymentList: function (params) {
            params.size = sharedDataService.PAGE_SIZE;
            return $http.post(ApiBaseUrl + 'Xyqb/pageRepayXyqbDetail', params);
        },
        exportRepayExcel:function(params){
            $http({
                url:ApiBaseUrl + 'Xyqb/exportRepayXyqbDetail',
                method: "POST",
                data: params,
                responseType: 'arraybuffer'
            }).success(function (data, status, headers, config) {
                var blob = new Blob([data], {type: "application/vnd.ms-excel"});
                saveAs(blob, "还款详情.xlsx");
            });
        }
    };
})
;
