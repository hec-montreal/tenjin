
opensyllabusApp.directive('contentPanelDirective', ['$anchorScroll', '$location', '$compile', 'ModalService', 'SyllabusService', 'variables', function ($anchorScroll, $location, $compile, ModalService, SyllabusService, variables){
    'use strict';

    return {
        scope: {
            element: '=contentPanelDirective',
            index: '='
        },
        restrict: 'A',
        templateUrl: 'contentPanelDirective.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

}]);

