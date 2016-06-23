/**
 * Created by ocean on 2016/6/12.
 */
app.controller('ThirdPartPaymentController', function ($scope, $http, $state, $modal, thirdPartPaymentService) {

    $scope.getList = function (pageNo) {
        var params = {
            page: pageNo,
            paymentPlatform:$scope.paymentPlatform
        };

        if ($scope.dateRange) {
            var dateRange = $scope.dateRange.split(" - ");
            params.beginLoanAt = dateRange[0];
            params.endLoanAt = dateRange[1];
        }
        thirdPartPaymentService.loanList(params).then(function (response) {
            var data = response.data.content;
            // 列表拼装
            for (var i = 0; i < data.length; ++i) {
                data[i].btnText = '详情';
                data[i].isDetailHide = false;
            }
            $scope.data = data;

            // 分页拼装
            var page = {};
            page.totalItems = response.data.total;
            page.currentPage = pageNo;

            $scope.page = page;
        });
    }

    $scope.uploadFilePre = function () {
        //弹出上传的窗口
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './tpl/dialog/dialog.html',
            controller:function ($scope, $modalInstance) {
                $scope.closeDialog = function () {
                    modalInstance.close(true);
                };
            },
            size: 'sm',
            resolve: {}
        });
}

    $scope.uploadFile = function () {
        // 上传文件
        var params = {};
        params.mail = $scope.uplod_mail;
        // params.file = $scope.uploand_file;
        var file = document.querySelector('input[type=file]').files[0];
        params.file = file;
        // console.log(file);
        params.paymentPlatform = $scope.upload_paymentPlatform;
        if ($scope.upload_dateRange) {
            var dateRange = $scope.upload_dateRange.split(" - ");
            params.bizBeginDate = dateRange[0];
            params.bizEndDate = dateRange[1];
        }
        thirdPartPaymentService.uploadFile(params);
    }

    $scope.downFile = function (id) {
        var params  ={
            id:id
        }
        thirdPartPaymentService.download(params);
    }


    $scope.getList(0);
});
