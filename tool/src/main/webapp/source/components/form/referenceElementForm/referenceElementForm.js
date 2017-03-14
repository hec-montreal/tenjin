tenjinApp.directive('referenceElementForm', ['config', 'ResourcesService', '$translate', function(config, ResourcesService, $translate) {
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
			$scope.editorOptions = {
				language: 'fr',
				height: '200',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			$scope.ResourcesService = ResourcesService;

			$scope.selectType = function($type) {
				$scope.currentType = $type;
				$scope.element.attributes.citationType = $scope.currentType.id;
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
			}
		},

		link: function($scope) {
			if ($scope.mode === 'creation') {
				$scope.element.attributes.activateLibraryLink = 'true';
			}

			// Retrieve the citation type for the given citation type id
			if ($scope.element.attributes.citationType) {
				for (var i = 0; i < config.citationTypes.length; i++) {
					if (parseInt($scope.element.attributes.citationType, 10) === config.citationTypes[i].id) {
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
