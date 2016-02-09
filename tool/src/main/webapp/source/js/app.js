﻿
var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ngSanitize", "ngAnimate", "templateModule", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "ngCkeditor", "tmh.dynamicLocale", "ngPromiseExtras"]);
// TEST VIEWS HTML
// var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "ngCkeditor", "ngFileUpload", "tmh.dynamicLocale", "ngPromiseExtras"]);
// MOCKUP sans CKEDITOR
// var opensyllabusApp = angular.module('opensyllabus', [ "templateModule", "ngResource" , "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "tmh.dynamicLocale", "ngPromiseExtras"]);

opensyllabusApp.config(['$compileProvider', 'tmhDynamicLocaleProvider', function ($compileProvider, tmhDynamicLocaleProvider ) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);

    tmhDynamicLocaleProvider.localeLocationPattern('http://localhost:8080/opensyllabus2-tool/lib/angular/i18n/angular-locale_{{locale}}-ca.js');
}]);



opensyllabusApp.run( ['editableOptions', function(editableOptions) { 
    'use strict';
    
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);

// Création du module template
var templateModule = angular.module("templateModule", []);



// resize frame (should be done also whenever we change content)
// if (window.frameElement) {
//     setMainFrameHeight(window.frameElement.id);
// }
