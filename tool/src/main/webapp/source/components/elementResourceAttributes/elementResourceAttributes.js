tenjinApp.directive('elementResourceAttributes', [function() {
	'use strict';

	return {
		scope: {
			resource: '=',
			nocopyright: '='
		},

		restrict: 'E',

		templateUrl: 'elementResourceAttributes/elementResourceAttributes.html',

		controller: function($scope) {

		},

		link: function($scope) {
			console.log("NO COPY: ");
			console.log($scope.nocopyright);
		}
	};
}]);
