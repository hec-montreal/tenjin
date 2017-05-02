tenjinApp.directive('referenceElementForm', ['config', 'ResourcesService', '$translate', 'EditorService', function(config, ResourcesService, $translate, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=referenceElementForm',
			mode: '='
		},

		restrict: 'A',

		templateUrl: 'form/referenceElementForm/referenceElementForm.html',

		controller: function($scope) {
			$scope.config = config;
			// setup editor options
			$scope.editorOptions = EditorService.createEditorOptions();

			$scope.ResourcesService = ResourcesService;

			$scope.selectType = function($type) {
				$scope.currentType = $type;
				$scope.element.attributes.citationType = $scope.currentType.name;
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!$scope.element.attributes.citationId) {
					ret.push({
						field: 'citation',
						message: 'ERROR_MISSING_CITATION'
					});
				}

				return ret;
			};

			$scope.getCitationTypes = function () {
				return config.citationTypes.sort(function(a, b) {
					return $translate.instant(a.name).localeCompare($translate.instant(b.name));
				});
			};
		},

		link: function($scope) {
			if ($scope.mode === 'creation') {
				$scope.element.attributes.activateLibraryLink = 'true';
			}

			// Retrieve the citation type for the given citation type id
			if ($scope.element.attributes.citationType) {
				for (var i = 0; i < config.citationTypes.length; i++) {
					if ($scope.element.attributes.citationType === config.citationTypes[i].name) {
						$scope.currentType = config.citationTypes[i];
						break;
					}
				}
			} else {
				$scope.currentType = $scope.config.citationTypes[0];
			}
		}
	};
}]);
