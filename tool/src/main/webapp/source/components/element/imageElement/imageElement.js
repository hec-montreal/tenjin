tenjinApp.directive('imageElement', ['ResourcesService', function(ResourcesService) {
    'use strict';

    return {
        scope: {
            element: '=imageElement'
        },

        restrict: 'A',

        templateUrl: 'element/imageElement/imageElement.html',

        controller: function($scope) {
            $scope.resource = ResourcesService.getResource($scope.element.attributes.resourceId);
        },

        link: function($scope, $element) {

        }
    };
}]);
