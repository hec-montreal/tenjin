
opensyllabusApp.directive('toolElement', ['variables', 'SakaiToolsService',  function (variables, SakaiToolsService){
    'use strict';

    return {
        scope: {
            element: '=toolElement'
        },
        restrict: 'A',
        templateUrl: 'element/toolElement/toolElement.html',
        controller: function ($scope) {
            $scope.variables = variables; 
        },
        link: function ($scope, $element) {
            $scope.entity = SakaiToolsService.getEntity($scope.element.attributes.resourceId);
            console.dir($scope.entity);
        }

    };

}]);

