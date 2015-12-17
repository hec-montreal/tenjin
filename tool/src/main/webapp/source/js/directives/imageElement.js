
opensyllabusApp.directive('imageElement', [ '$rootScope', '$location', 'ResourcesService', function ($rootScope, $location, ResourcesService){
    'use strict';

    return {
        scope: {
            element: '=imageElement'
        },
        restrict: 'A',
        templateUrl: 'imageElement.html',
        controller: function ($scope) {
            // $rootScope.$on('RESOURCES_LOADED', this.displayResource);
            $rootScope.$on('RESOURCES_LOADED', function() {
                $scope.loadResource();
            });

            $scope.loadResource = function() {
                // Get ressources informations
                if(!$scope.resource && ResourcesService.resources ) {
                    if( $scope.element.attributes.resourceId ) {
                       $scope.resource = ResourcesService.getResource($scope.element.attributes.resourceId);
                    }    
                } 
            };

        },
        link: function ($scope, $element) {
            $scope.loadResource();
        }

    };

}]);

