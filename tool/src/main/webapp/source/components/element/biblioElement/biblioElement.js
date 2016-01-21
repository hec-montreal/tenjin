
opensyllabusApp.directive('biblioElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=biblioElement'
        },
        restrict: 'A',
        templateUrl: 'element/biblioElement/biblioElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        	$scope.dot = ".";
        	$scope.comma = ',';
        	$scope.openParenthesis = '(';
        	$scope.closeParenthesis = ')';
        	$scope.leftAngleQuote = '«';
        	$scope.rightAngleQuote = '»';
        	$scope.pages = 'p.';
        	$scope.volume = 'vol.';
        	$scope.issue = 'no';
        	$scope.edition= 'ed.';
        }

    };

}]);

