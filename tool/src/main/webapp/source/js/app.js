var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ngSanitize",  "ui.tree", "ui.bootstrap" ]);


opensyllabusApp.config(['$compileProvider', function ($compileProvider) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);
}]);

// resize frame (should be done also whenever we change content)
if (window.frameElement) {
    setMainFrameHeight(window.frameElement.id);
}