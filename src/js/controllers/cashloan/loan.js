app.controller('CashloanRepayment', function ($scope, $http, $state, cashloanApiService) {


    $scope.getList = function (pageNo) {
        var params = {
            page: pageNo,
            channelName: $scope.channelName,
            paymentPlatform: $scope.paymentPlatform,
            loanApplicationManifestHistoryId: $scope.loanApplicationManifestHistoryId,
            fundingCorpName: $scope.fundingCorpName,
            debtFundingCorp: $scope.debtFundingCorp,
            userName: $scope.userName,
            userPhone: $scope.userPhone,
            idNo: $scope.idNo
        };

        if ($scope.dateRange) {
            var dateRange = $scope.dateRange.split(" - ");
            params.beginLoanAt = dateRange[0];
            params.endLoanAt = dateRange[1];
        }
        cashloanApiService.loanList(params).then(function (response) {
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

    $scope.exportLoanExcel = function () {
        var params = {
            channelName: $scope.channelName,
            paymentPlatform: $scope.paymentPlatform,
            loanApplicationManifestHistoryId: $scope.loanApplicationManifestHistoryId,
            fundingCorpName: $scope.fundingCorpName,
            debtFundingCorp: $scope.debtFundingCorp,
            userName: $scope.userName,
            userPhone: $scope.userPhone,
            idNo: $scope.idNo
        };

        if ($scope.dateRange) {
            var dateRange = $scope.dateRange.split(" - ");
            params.beginLoanAt = dateRange[0];
            params.endLoanAt = dateRange[1];
        }

        cashloanApiService.exportLoanExcel(params);
    }

    $scope.getList(0);
});
