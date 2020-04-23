tenjinApp.directive('imageElementForm', ['SyllabusService', 'EditorService', function(SyllabusService, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=imageElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/imageElementForm/imageElementForm.html',

		controller: function($scope) {
			// setup editor options
			$scope.editorOptions = EditorService.createEditorOptions();

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!$scope.element.attributes.imageId) {
					ret.push({
						field: "image",
						message: "ERROR_MISSING_IMAGE"
					});
				}

                if (this.title && this.title.length > 255) {
					ret.push({
						field: "title",
						message: "ERROR_CLICKABLE_TEXT_TOO_LONG"
					});
				}
                
				return ret;
			}

		}
	};
}]);
