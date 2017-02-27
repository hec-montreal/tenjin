tenjinApp.directive('imageElementForm', ['config', function(config) {
	'use strict';

	return {
		scope: {
			element: '=imageElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/imageElementForm/imageElementForm.html',

		controller: function($scope) {
			// setup editor options
			$scope.editorOptions = {
				language: 'fr',
				height: '120',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!$scope.element.attributes.imageId) {
					ret.push({
						field: "image",
						message: "ERROR_MISSING_IMAGE"
					});
				}

				return ret;
			}

		}
	};
}]);
