tenjinApp.directive('toolElementForm', ['$translate', 'SyllabusService', 'EditorService', function($translate, SyllabusService, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=toolElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/toolElementForm/toolElementForm.html',

		controller: function($scope) {
			// setup editor options
			$scope.editorOptions = EditorService.createEditorOptions();

			$scope.selectType = function($type) {
				$scope.currentType = $type;
				if ($scope.currentType.id !== -1) {
					$scope.element.attributes.docType = $scope.currentType.id;
				}
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!$scope.element.attributes.sakaiToolId) {
					ret.push({
						field: "sakai_tool",
						message: "ERROR_SAKAI_TOOL"
					});
				}

				return ret;
			}
		}
	};
}]);
