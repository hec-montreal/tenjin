﻿var opensyllabusApp = angular.module('opensyllabus', [ "templateModule", "ngResource" , "ngSanitize", "ngAnimate", "ui.tree", "ui.bootstrap", "ui.bootstrap.datetimepicker" , "xeditable", "pascalprecht.translate", "ngCkeditor", "ngFileUpload"]);


opensyllabusApp.config(['$compileProvider', function ($compileProvider) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);
}]);



opensyllabusApp.run( ['editableOptions', function(editableOptions) { 
    'use strict';
    
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);

// resize frame (should be done also whenever we change content)
if (window.frameElement) {
    setMainFrameHeight(window.frameElement.id);
}