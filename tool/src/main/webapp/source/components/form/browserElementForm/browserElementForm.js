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
                else if ($scope.type === "image") {
                    $scope.element.attributes.imageId = $item.resourceId;    
                }
                else if ($scope.type === "citation") {
                    $scope.element.attributes.citationId = $item.resourceId;
                }
                else if ($scope.type === "document") {
                    $scope.element.attributes.documentId = $item.resourceId;
                }
                else {
                    console.error('unrecognized type in setSelectedResource');
                }
                
                console.log('set selected resource');
            };


        },
        link: function ($scope, $element) {

            var resource;
            if ($scope.element.attributes.documentId) {
                resource = ResourcesService.getResource($scope.element.attributes.documentId);
            }
            else if ($scope.element.attributes.imageId) {
                resource = ResourcesService.getResource($scope.element.attributes.imageId);
            }
            else if ($scope.element.attributes.citationId) {
                resource = ResourcesService.getResource($scope.element.attributes.citationId);
            }
            else if ($scope.element.attributes.sakaiToolId) {
                resource = SakaiToolsService.getEntity($scope.element.attributes.sakaiToolId);
            }

            if (resource) {
                $scope.element.$selectedResource = resource;
            }
            else {
                console.error('no resource located');
            }
        }
    };
}]);
