
opensyllabusApp.directive('toolElement', ['SakaiToolsService',  function (SakaiToolsService){
    'use strict';

    return {
        scope: {
            element: '=toolElement'
        },
        restrict: 'A',
        templateUrl: 'element/toolElement/toolElement.html',
        controller: function ($scope) {
        },
        link: function ($scope, $element) {
            $scope.entity = SakaiToolsService.getEntity($scope.element.attributes.resourceId);
            console.dir($scope.entity);
        }

    };

}]);

