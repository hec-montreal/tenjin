
opensyllabusApp.directive('contentPanelDirective', ['SyllabusService', function (SyllabusService){
    'use strict';

    return {
        scope: {
            element: '=contentPanelDirective',
            index: '='
        },
        restrict: 'A',
        templateUrl: 'element/contentPanelDirective/contentPanelDirective.html',
        controller: function ($scope) {
            $scope.syllabusService = SyllabusService;
        },
        link: function ($scope, $element) {
        }

    };

}]);

