'use strict';

/* Controllers */
// signin controller
app.controller('LoginController', function($scope, $http, $state, userApiService, userAuthenticationService) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function(username, password) {
        $scope.authError = null;
        // Try to login
        userApiService.login(username, password)
            .success(function (data) {
                if (data.code === '0000') {
                    if (data.data.token && data.data.user) {
                        userAuthenticationService.login(data.data.token, data.data.user);
                        $state.go('app.dashboard');
                    };

                } else {
                    console.log(data.msg)
                    $scope.authError = data.msg;
                }

            })
            .error(function (error) {
                // console.log(error);

            });
    };
});
