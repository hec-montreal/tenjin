tenjinApp.directive('documentElementForm', ['config', '$translate', 'SyllabusService', function(config, $translate, SyllabusService) {
	'use strict';

	return {
		scope: {
			element: '=documentElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/documentElementForm/documentElementForm.html',

		controller: function($scope) {
			$scope.config = config;

			$scope.editorOptions = {
				language: 'fr',
				height: '200',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

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

				return ret;
			};

			$scope.getDocumentTypes = function() {
				return config.documentTypes.sort(function(a, b) {
					return $translate.instant(a.name).localeCompare($translate.instant(b.name));
				});
			};
		},

		link: function($scope, $element) {
			// Retrieve the document type for the given document type id
			if ($scope.element.attributes.documentType) {
				$scope.currentType = $scope.element.attributes.documentType
			} else {
				$scope.currentType = $scope.config.documentTypes[0].name;
			}
		}
	};
}]);
