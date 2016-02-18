opensyllabusApp.directive('browserElementForm', ['SakaiToolsService','ResourcesService', function ( SakaiToolsService, ResourcesService){
    'use strict';

    return {
        scope: {
            element: '=browserElementForm',
            type: '@'
        },
        restrict: 'A',
        templateUrl: 'form/browserElementForm/browserElementForm.html',
        controller: function ($scope) {
            if ($scope.type === "sakai_entity"){
                $scope.resources = SakaiToolsService.getToolEntities();
            }
            else{
                $scope.resources = ResourcesService.resources;
            }

            $scope.browserOptions  = {
                name: "browserTree",
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    return false;
                },
            };

            $scope.toggleTree = function(scope){
                scope.toggle();
            };

            $scope.setSelectedResource = function($item) {
                // $scope.selectedResource = $item;
                $scope.element.$selectedResource = $item;
                $scope.element.attributes.resourceId = $item.resourceId;
                console.log('set selected resource');
            };


        },
        link: function ($scope, $element) {

            var ressource;
            if ($scope.element.attributes.resourceId) {
                if ($scope.element.type === "sakai_entity"){
                    ressource = SakaiToolsService.getEntity($scope.element.attributes.resourceId);
                }
                else {
                    ressource = ResourcesService.getResource($scope.element.attributes.resourceId);
                }
                
                if (ressource) {
                        $scope.element.$selectedResource = ressource;
                    }
                }
            }

       

    };

}]);

