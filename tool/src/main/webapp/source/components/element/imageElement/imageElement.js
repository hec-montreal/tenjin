
opensyllabusApp.directive('imageElement', [ '$rootScope', '$location', 'ResourcesService', 'variables', function ($rootScope, $location, ResourcesService, variables){
    'use strict';

    return {
        scope: {
            element: '=imageElement' 
        },
        restrict: 'A',
        templateUrl: 'element/imageElement/imageElement.html',
        controller: function ($scope) {
            $scope.variables = variables;

            // $rootScope.$on('RESOURCES_LOADED', this.displayResource);
            $rootScope.$on('RESOURCES_LOADED', function() {
                $scope.loadResource();
            });

            $scope.loadResource = function() {
                // Get ressources informations
                if(!$scope.resource && ResourcesService.resources ) {
                    if( $scope.element.attributes.resourceId ) {
                        console.time('loadResource');
                        $scope.resource = ResourcesService.getResource($scope.element.attributes.resourceId);
                        console.timeEnd('loadResource');
                    }    
                } 
            };

        },
        link: function ($scope, $element) {
            $scope.loadResource();
        }

    };

}]);

