'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'tpl/app_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/chart.js']);
                                }
                            ]
                        }
                    })

                    // others
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'tpl/login.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/user/login.js']);
                                }
                            ]
                        }
                    })
                    // cashloan
                    .state('app.cashloan', {
                        url: '/cashloan',
                        template: '<div ui-view></div>'
                    })
                    .state('app.cashloan.loan', {
                        url: '/loan',
                        templateUrl: 'tpl/cashloan/loan.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/cashloan/loan.js');
                                }
                            ]
                        }
                    })
                    .state('app.cashloan.repayment', {
                        url: '/repayment',
                        templateUrl: 'tpl/cashloan/repayment.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/cashloan/repayment.js');
                                }
                            ]
                        }
                    })
                    .state('app.crawler',{
                      url: '/crawler',
                      template: '<div ui-view></div>'
                    })
                    .state('app.crawler.config',{
                      url: '/config',
                      templateUrl: 'tpl/crawler/config.html',
                      resolve: {
                          deps: ['uiLoad',
                              function(uiLoad) {
                                  return uiLoad.load('js/controllers/crawler/config.js');
                              }
                          ]
                      }
                    })
                    .state('app.balance', {
                        url: '/balance',
                        template: '<div ui-view></div>'
                    })
                    .state('app.balance.third_party_payment',{
                        url:'/third_party_payment',
                        templateUrl:'tpl/balance/third_party_payment.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load('js/controllers/balance/third_party_payment.js');
                                }
                            ]
                        }
                    })
            }
        ]
    );
