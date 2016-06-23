app.controller('CrawlerController', function ($scope, $http, $state, $modal, crawlerService) {


  $scope.addConfig = function() {
    var params = {

    };
    alert("1111");
    crawlerService.addConfig(params).then(function (response){
        var data = response;
        alert(data);

    });
  }


});
