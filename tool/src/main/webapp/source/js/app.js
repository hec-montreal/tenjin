if (typeof CKEDITOR !== "undefined") {
    var tenjinApp = angular.module('tenjin', ["ngResource", "ngSanitize", "ngAnimate", "templateModule", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker", "xeditable", "pascalprecht.translate", "ngCkeditor", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router", "checklist-model", "ngDialog"]);
} else {
    var tenjinApp = angular.module('tenjin', ["templateModule", "ngResource", "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker", "xeditable", "pascalprecht.translate", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router", "checklist-model", "ngDialog"]);
}

tenjinApp.config(['$compileProvider', 'tmhDynamicLocaleProvider', function($compileProvider, tmhDynamicLocaleProvider) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);

    // TODO : Change url for production
    tmhDynamicLocaleProvider.localeLocationPattern('/tenjin-tool/lib/locale/angular-locale_{{locale}}-ca.js');
}]);


tenjinApp.config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            template: "<home></home>"
        })
        .state('management', {
            url: "/management",
            template: "<management></management>"
        })
        .state('syllabus', {
            url: "/syllabus/:id",
            templateUrl: "tenjin/tenjin.html"
        });
});

tenjinApp.run(['editableOptions', '$httpBackend', function(editableOptions, $httpBackend) {
    'use strict';

    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

}]);

// Création du module template
var templateModule = angular.module("templateModule", []);

templateModule.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(["**"]);
});