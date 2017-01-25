tenjinApp.directive('textElementForm', ['config', function(config) {
	'use strict';

	return {
		scope: {
			element: '=textElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/textElementForm/textElementForm.html',

		controller: function($scope) {
			$scope.editorOptions = {
				language: 'fr',
				height: '200',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!this.description || this.description.length <= 0) {
					ret.push({
						field: "description",
						message: "ERROR_CONTENT_MANDATORY"
					});
				}

				return ret;
			}
		}
	};
}]);
