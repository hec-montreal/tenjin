tenjinApp.directive('rubricElement',['SyllabusService', function(SyllabusService) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/rubricElement/rubricElement.html',

		controller: function($scope) {

		}
	};
}]);
