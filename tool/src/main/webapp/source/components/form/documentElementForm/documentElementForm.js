tenjinApp.directive('documentElementForm', ['config', '$translate', function(config, $translate) {
	'use strict';

	return {
		scope: {
			element: '=documentElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/documentElementForm/documentElementForm.html',

		controller: function($scope) {
			$scope.editorOptions = {
				language: 'fr',
				height: '200',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			$scope.selectType = function($type) {
				$scope.currentType = $type;
				$scope.element.attributes.documentType = $scope.currentType.id;
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

				return ret;
			}
		},

		link: function($scope, $element) {
			// Retrieve the document type for the given document type id
			if ($scope.element.attributes.documentType) {
				for (var i = 0; i < config.documentTypes.length; i++) {
					if (parseInt($scope.element.attributes.documentType, 10) === config.documentTypes[i].id) {
						$scope.currentType = config.documentTypes[i];
						break;
					}
				}

			} else {
				$scope.currentType = $scope.config.documentTypes[0];
			}
		}
	};
}]);
