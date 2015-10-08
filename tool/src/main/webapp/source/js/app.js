var opensyllabusApp = angular.module('opensyllabus', [ "ngResource" , "ngSanitize",  "ui.tree", "ui.bootstrap" , "xeditable"]);


opensyllabusApp.config(['$compileProvider', function ($compileProvider) {
    'use strict';

    // use this in production to improve performance
    // $compileProvider.debugInfoEnabled(false);
}]);


opensyllabusApp.run(function(editableOptions) {
    'use strict';
    
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

// resize frame (should be done also whenever we change content)
if (window.frameElement) {
    setMainFrameHeight(window.frameElement.id);
}