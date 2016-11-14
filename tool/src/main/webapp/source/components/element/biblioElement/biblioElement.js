tenjinApp.directive('biblioElement', ['ResourcesService', function(ResourcesService) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/biblioElement/biblioElement.html',

        controller: function($scope) {},

        link: function($scope, $element) {
            $scope.citation = ResourcesService.getResource($scope.element.attributes.citationId);
            $scope.element.title = "Citation";

            $scope.dot = ".";
            $scope.comma = ',';
            $scope.openParenthesis = '(';
            $scope.closeParenthesis = ')';
            $scope.leftAngleQuote = '«';
            $scope.rightAngleQuote = '»';
            $scope.pages = 'p.';
            $scope.volume = 'vol.';
            $scope.issue = 'no';
            $scope.edition = 'ed.';
        }
    };
}]);
