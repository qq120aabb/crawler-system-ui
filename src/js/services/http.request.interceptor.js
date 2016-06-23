'use strict';

angular.module('app').factory('httpRequestInterceptor', function ($q, $injector,
    $localStorage, sharedDataService) {
    return {
        request: function (config) {
            config.headers['X-Auth-Token'] = $localStorage.token;
            return config;
        },

        responseError: function (response) {
            var toaster = $injector.get('toaster');
            if (response.status === 401) {
                if ($localStorage.token && $localStorage.user) {
                    // Session has expired
                    sharedDataService.sessonExpired = true;
                };
                sharedDataService.loginError = true;
                var stateService = $injector.get('$state');
                stateService.go('access.login');

            } else if (response.status === 0) {
                toaster.clear();
                toaster.pop({
                    type: 'danger',
                    title: '',
                    body: '网络连不通了噜，请检查网络设置'
                });
            } else {
                toaster.clear();
                toaster.pop({
                    type: 'danger',
                    title: '',
                    body: '系统错误了噜，请骚扰程序员'
                });
            }
            return $q.reject(response);
        },
        response: function (response) {
            var stateService = $injector.get('$state');
            var toaster = $injector.get('toaster');
            if (response.data.code) {
                if (response.data.code != '0000') {
                    toaster.clear();
                    toaster.pop({
                        type: 'danger',
                        title: '',
                        body: '系统错误了噜，请骚扰程序员'
                    });
                    return $q.reject(response);

                } else if (response.data.businessCode === '0001') {
                    toaster.clear();
                    toaster.pop('danger', '', response.data.msg);
                    return $q.reject(response);
                }
            }
            return response || $q.when(response);
        },


    };
});
