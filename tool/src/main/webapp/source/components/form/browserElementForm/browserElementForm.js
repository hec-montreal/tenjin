tenjinApp.directive('browserElementForm', ['SakaiToolsService','ResourcesService', function ( SakaiToolsService, ResourcesService){
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
                if ($scope.type === "sakai_entity") {
                    $scope.element.attributes.sakaiToolId = $item.resourceId;    
                }
                else {
                    $scope.element.attributes.resourceId = $item.resourceId;
                }
                
                console.log('set selected resource');
            };


        },
        link: function ($scope, $element) {

            var ressource;
            if ($scope.element.attributes.resourceId) {
                ressource = ResourcesService.getResource($scope.element.attributes.resourceId);
            }
            else if ($scope.element.attributes.sakaiToolId) {
                ressource = SakaiToolsService.getEntity($scope.element.attributes.sakaiToolId);
            }

            if (ressource) {
                $scope.element.$selectedResource = ressource;
            }
        }

       

    };

}]);
