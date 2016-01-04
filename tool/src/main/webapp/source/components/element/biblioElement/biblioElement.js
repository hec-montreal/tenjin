
opensyllabusApp.directive('biblioElement', function (){
    'use strict';

    return {
        scope: {
            element: '=biblioElement'
        },
        restrict: 'A',
        templateUrl: 'element/biblioElement/biblioElement.html',
        controller: function ($scope) {

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

});

