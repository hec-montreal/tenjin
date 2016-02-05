
opensyllabusApp.directive('contentPanelDirective', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=contentPanelDirective',
            index: '='
        },
        restrict: 'A',
        templateUrl: 'element/contentPanelDirective/contentPanelDirective.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        }

    };

}]);

