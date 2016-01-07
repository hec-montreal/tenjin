opensyllabusApp.directive('browserElementForm', ['ResourcesService', function (ResourcesService){
    'use strict';

    return {
        scope: {
            element: '=browserElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/browserElementForm/browserElementForm.html',
        controller: function ($scope) {
            $scope.resources = ResourcesService.resources;


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

            if ($scope.element.attributes.resourceId) {

                var ressource = ResourcesService.getResource($scope.element.attributes.resourceId);
                if (ressource) {
                    $scope.element.$selectedResource = ressource;
                }
            }

        }

    };

}]);

