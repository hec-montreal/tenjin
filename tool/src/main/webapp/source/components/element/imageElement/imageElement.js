tenjinApp.directive('imageElement', ['ResourcesService', function(ResourcesService) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/imageElement/imageElement.html',

		controller: function($scope) {
			$scope.resource = ResourcesService.getResource($scope.element.attributes.imageId);
		}
	};
}]);
