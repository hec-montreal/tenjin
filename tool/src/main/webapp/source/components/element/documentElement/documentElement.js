
opensyllabusApp.directive('documentElement', ['ResourcesService', 'config' ,'$rootScope', '$translate', 'variables', function (ResourcesService, config, $rootScope, $translate, variables){
    'use strict';

    return {
        scope: {
            element: '=documentElement'
        },
        restrict: 'A',
        templateUrl: 'element/documentElement/documentElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
            // $rootScope.$on('RESOURCES_LOADED', this.displayResource);
            $rootScope.$on('RESOURCES_LOADED', function() {
                $scope.loadResource();
            });

            $scope.config = config;

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

            // si le type du document est retrouvé alors on cherche le libellé associé
            if ($scope.element.attributes.docType) {
                for (var i=0 ; i < config.documentTypes.length; i++) {
                    if (parseInt($scope.element.attributes.docType) === config.documentTypes[i].id ) {
                        $scope.documentType = $translate.instant(config.documentTypes[i].name);
                        break;
                    }
                }
            }
        }

    };

}]);

