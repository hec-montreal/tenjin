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
                $scope.element.selectedResource = $item;
            };


        },
        link: function ($scope, $element) {
        }

    };

}]);

