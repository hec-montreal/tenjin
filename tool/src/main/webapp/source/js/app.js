if (typeof CKEDITOR !== "undefined") {
    var tenjinApp = angular.module('tenjin', [ "ngResource" , "ngSanitize", "ngAnimate", "templateModule", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "ngCkeditor", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router", "checklist-model"]);
} else {
    var tenjinApp = angular.module('tenjin', [ "templateModule", "ngResource" , "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "tmh.dynamicLocale", "ngPromiseExtras", "ui.router" , "checklist-model"]);    
}

tenjinApp.config(['$compileProvider', 'tmhDynamicLocaleProvider', function ($compileProvider, tmhDynamicLocaleProvider ) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);

    // TODO : Change url for production
    tmhDynamicLocaleProvider.localeLocationPattern('/tenjin-tool/lib/locale/angular-locale_{{locale}}-ca.js');
}]);


tenjinApp.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider

    .state('home', {
        url: "/home", //TODO: add id du syllabus
        template: "<home></home>"
    })
    .state('management', {
        url: "/management",
        template: "<management></management>"
        // controller: ['promiseObj', 'SyllabusService', function(promiseObj, SyllabusService) {

        //     // SyllabusService.loadSyllabusList().$promise.then(function($data){
        //     //     SyllabusService.setSyllabusList($data);

        //     //     // $rootScope.$broadcast('RESOURCES_LOADED');
        //     //     console.log('ok');
        //     // }, function($error){
        //     //     // erreur load syllabus list
        //     //     console.log('erreur');
        //     //     // AlertService.display('danger');
        //     // });
        // }]
        // resolve: {

        //     promiseObj:  ['$state', 'SyllabusService', function($state, SyllabusService){

        //         return SyllabusService.loadSyllabusList().$promise.then(function($data){
        //             SyllabusService.setSyllabusList($data);

        //             // $rootScope.$broadcast('RESOURCES_LOADED');
        //             console.log('ok');
        //             $state.go('syllabus', {id: 362});
        //         }, function($error){
        //             // erreur load syllabus list
        //             console.log('erreur');
        //             // AlertService.display('danger');
        //         });

        //     }]



        // }
    })
    .state('syllabus', {
        url: "/syllabus/:id", //TODO: add id du syllabus
        templateUrl: "tenjin/tenjin.html"
    });
});

tenjinApp.run( ['editableOptions', '$httpBackend', function(editableOptions, $httpBackend) { 
    'use strict';
    
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

}]);

// Création du module template
var templateModule = angular.module("templateModule", []);
