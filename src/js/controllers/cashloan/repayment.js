app.controller('CashloanRepayment', function($scope, $http, $state,cashrepaymentApiService) {
    $scope.getList = function (pageNo) {
        var params = {
            page: pageNo,
            loanApplicationManifestHistoryId:$scope.loanApplicationManifestHistoryId,
            channelName:$scope.channelName,
            paymentPlatform:$scope.paymentPlatform,
            yorderId:$scope.yorderId,
            fundingCorp:$scope.fundingCorp,
            debtFundingCorp:$scope.debtFundingCorp,
            userName:$scope.userName,
            userPhone:$scope.userPhone,
            idNo:$scope.idNo
        };
        if ($scope.dateRange) {
            var dateRange = $scope.dateRange.split(" - ");
            params.startDealAt = dateRange[0];
            params.endDealAt = dateRange[1];
        }
        cashrepaymentApiService.repaymentList(params).then(function(response){
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

    $scope.exportRepayExcel = function(){
        var params = {
            loanApplicationManifestHistoryId:$scope.loanApplicationManifestHistoryId,
            channelName:$scope.channelName,
            paymentPlatform:$scope.paymentPlatform,
            yorderId:$scope.yorderId,
            fundingCorp:$scope.fundingCorp,
            debtFundingCorp:$scope.debtFundingCorp,
            userName:$scope.userName,
            userPhone:$scope.userPhone,
            idNo:$scope.idNo
        };
        if ($scope.dateRange) {
            var dateRange = $scope.dateRange.split(" - ");
            params.startDealAt = dateRange[0];
            params.endDealAt = dateRange[1];
        }
        cashrepaymentApiService.exportRepayExcel(params);
    }
    
    $scope.getList(0);
});

    
