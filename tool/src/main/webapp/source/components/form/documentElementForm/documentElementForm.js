tenjinApp.directive('documentElementForm', ['config', '$translate', 'SyllabusService', 'EditorService', function(config, $translate, SyllabusService, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=documentElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/documentElementForm/documentElementForm.html',

		controller: function($scope) {
			$scope.config = config;

			$scope.editorOptions = EditorService.createEditorOptions();

			$scope.selectType = function($type) {
				$scope.currentType = $type.name;
				$scope.element.attributes.documentType = $scope.currentType;
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!$scope.element.attributes.documentId) {
					ret.push({
						field: "document",
						message: "ERROR_MISSING_DOCUMENT"
					});
				}

                if (this.title && this.title.length > 255) {
					ret.push({
						field: "title",
						message: "ERROR_CLICKABLE_TEXT_TOO_LONG"
					});
				}
				return ret;
			};

			$scope.getDocumentTypes = function() {
				return config.documentTypes.sort(function(a, b) {
					return $translate.instant(a.name).localeCompare($translate.instant(b.name));
				});
			};
		},

		link: function($scope, $element) {
			$scope.$on('$destroy', function() {
				$scope.$broadcast('refreshResources', null);
			});

			// Retrieve the document type for the given document type id
			if ($scope.element.attributes.documentType) {
				$scope.currentType = $scope.element.attributes.documentType
			} else {
				$scope.currentType = $scope.config.documentTypes[0].name;
			}
		}
	};
}]);
