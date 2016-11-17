(function() {
    'use strict';

    // Template module
    var templateModule = angular.module('templateModule', []);

    templateModule.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['**']);
    });

    // App module
    var tenjinApp = angular.module('tenjin', [
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'templateModule',
        'ui.tree',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'xeditable',
        'pascalprecht.translate',
        'ngCkeditor',
        'ngPromiseExtras',
        'ui.router',
        'checklist-model',
        'ngDialog',
        'tmh.dynamicLocale'
    ]);

    tenjinApp.config(['$compileProvider', 'tmhDynamicLocaleProvider', function($compileProvider, tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('/tenjin-tool/lib/locale/angular-locale_{{locale}}-ca.js');
    }]);

    tenjinApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                template: '<home></home>'
            })
            .state('management', {
                url: '/management',
                template: '<management></management>'
            })
            .state('syllabus', {
                url: '/syllabus/:id',
                templateUrl: 'syllabus/syllabus.html'
            });
    });

    window.templateModule = templateModule;
    window.tenjinApp = tenjinApp;
})();
