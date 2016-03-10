
var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ngSanitize", "ngAnimate", "templateModule", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "ngCkeditor", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router", "checklist-model"]);
// TEST VIEWS HTML
// var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "ngCkeditor", "ngFileUpload", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router" , "checklist-model"]);
// MOCKUP sans CKEDITOR
// var opensyllabusApp = angular.module('opensyllabus', [ "templateModule", "ngResource" , "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router" , "checklist-model"]);

opensyllabusApp.config(['$compileProvider', 'tmhDynamicLocaleProvider', function ($compileProvider, tmhDynamicLocaleProvider ) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);

    // TODO : Change url for production
    tmhDynamicLocaleProvider.localeLocationPattern('/opensyllabus2-tool/lib/locale/angular-locale_{{locale}}-ca.js');
}]);


opensyllabusApp.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/syllabus");
    //
    // Now set up the states
    $stateProvider
    .state('home', {
        url: "/home",
        template: "<home></home>"
    })
    .state('syllabus', {
        url: "/syllabus",
        templateUrl: "opensyllabus/opensyllabus.html"
    });
});


opensyllabusApp.run( ['editableOptions', '$httpBackend', function(editableOptions, $httpBackend) { 
    'use strict';
    
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

    // $httpBackend.whenPOST(/\/v1\/syllabus\/2/).respond(function(method, url, data) {
    //     debugger;
    //     data = angular.fromJson(data);
    //     if(data.name === 'error') {
    //       return [500, 'Error message']; 
    //     } else {
    //       return [200, {status: 'ok'}]; 
    //     }
    // });
}]);

// Création du module template
var templateModule = angular.module("templateModule", []);



// resize frame (should be done also whenever we change content)
// if (window.frameElement) {
//     setMainFrameHeight(window.frameElement.id);
// }
