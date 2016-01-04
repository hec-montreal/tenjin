
opensyllabusApp.directive('contentPanelDirective', ['$anchorScroll', '$location', '$compile', 'ModalService', 'SyllabusService', function ($anchorScroll, $location, $compile, ModalService, SyllabusService){
    'use strict';

    return {
        scope: {
            element: '=contentPanelDirective',
            index: '='
        },
        restrict: 'A',
        templateUrl: 'element/contentPanelDirective/contentPanelDirective.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

}]);

