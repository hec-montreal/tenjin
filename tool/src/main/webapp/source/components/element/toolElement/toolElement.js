tenjinApp.directive('toolElement', ['SakaiToolsService', function(sakaiToolsService) {
    'use strict';

    return {
        scope: {
            element: '=toolElement'
        },

        restrict: 'A',

        templateUrl: 'element/toolElement/toolElement.html',

        controller: function($scope) {
            $scope.entity = sakaiToolsService.getEntity($scope.element.attributes.sakaiToolId);
            $scope.sakaiToolsService = sakaiToolsService;
        }
    };
}]);