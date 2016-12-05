tenjinApp.directive('referenceElementForm', ['config', '$translate', function(config, $translate) {
	'use strict';

	return {
		scope: {
			element: '=referenceElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/referenceElementForm/referenceElementForm.html',

		controller: function($scope) {
			// setup editor options
			$scope.editorOptions = {
				language: 'fr',
				// uiColor: '#fff',
				height: '200',
				removeButtons: 'Maximize,Anchor,Source,PageBreak',
				// removeButtons: removeButtonsList,
				removePlugins: 'elementspath,resize'
			};

			$scope.config = config;

			$scope.selectType = function($type) {
				$scope.currentType = $type;
				$scope.element.attributes.referenceType = $scope.currentType.id;
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!$scope.element.attributes.citationId) {
					ret.push({
						field: "citation",
						message: "ERROR_MISSING_CITATION"
					});
				}

				return ret;
			}
		},

		link: function($scope, $element) {
			// Retrieve the reference type for the given reference type id
			if ($scope.element.attributes.referenceType) {
				for (var i = 0; i < config.referenceTypes.length; i++) {
					if (parseInt($scope.element.attributes.referenceType, 10) === config.referenceTypes[i].id) {
						$scope.currentType = config.referenceTypes[i];
						break;
					}
				}
			} else {
				$scope.currentType = $scope.config.referenceTypes[0];
			}
		}
	};
}]);
