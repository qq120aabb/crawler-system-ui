'use strict';

angular.module('app').factory('thirdPartPaymentService', function ($http, ApiBaseUrl, sharedDataService) {

    return {
        loanList: function (params) {
            params.size = sharedDataService.PAGE_SIZE;
            return $http.post(ApiBaseUrl + 'Xyqb/pageUploadRecords', params);
        },
        download: function (params) {
           $http({
               url:ApiBaseUrl + 'Xyqb/downLoadPaymentPlatformAccountsFile',
               method: "POST",
               data: params,
               responseType: 'arraybuffer'
           }).success(function (data, status, headers, config) {
               var blob = new Blob([data], {type: "application/vnd.ms-excel"});
               saveAs(blob, "原始上传文件.xlsx");
           });
        },
        uploadFile : function (params) {
            $http({
                url:ApiBaseUrl + 'Xyqb/uploadXyqbData',
                method: "POST",
                data: params,
                headers: {
                        'Content-Type': undefined
                },
                transformRequest: function(data) {
                    var formData = new FormData();
                    formData.append('mail', data.mail);
                    formData.append('paymentPlatform', data.paymentPlatform);
                    formData.append('bizBeginDate', data.bizBeginDate);
                    formData.append('bizEndDate', data.bizEndDate);
                    formData.append('file', data.file);
                    return formData;
                }
            }).success(function (data) {
                alert(data.msg);
            });
        }
    };
});
