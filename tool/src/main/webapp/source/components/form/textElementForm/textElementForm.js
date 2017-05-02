tenjinApp.directive('textElementForm', ['EditorService', function(EditorService) {
	'use strict';

	return {
		scope: {
			element: '=textElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/textElementForm/textElementForm.html',

		controller: function($scope) {
			$scope.editorOptions = EditorService.createEditorOptions();

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
