// config

var app =
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;


        // var apiHost = 'http://192.168.192.206:9004/';
        // var apiHost = 'http://192.168.198.22:9005/';
        var apiHost = 'http://127.0.0.1:9005/';

        var authHost = 'http://192.168.192.243:9002/';

        app.value('ApiBaseUrl', apiHost);
        app.value('AuthBaseUrl', authHost);
    }
  ]);
