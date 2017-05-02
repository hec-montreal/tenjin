tenjinApp.directive('hyperlinkElementForm', ['config', 'EditorService', function(config, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=hyperlinkElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/hyperlinkElementForm/hyperlinkElementForm.html',

		controller: function($scope) {
			$scope.config = config;
			// setup editor options
			$scope.editorOptions = EditorService.createEditorOptions();

			$scope.selectType = function($type) {
				$scope.currentType = $type.name;
				$scope.element.attributes.hyperlinkType = $scope.currentType;
			};

			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!this.attributes.hyperlinkUrl || this.attributes.hyperlinkUrl <= 0) {
					ret.push({
						field: "hyperlinkUrl",
						message: "ERROR_URL_MANDATORY"
					});
				} else {
					// Add protocol if not present
					var protocolRegex = /:\/\//g;

					if (!this.attributes.hyperlinkUrl.match(protocolRegex)) {
						this.attributes.hyperlinkUrl = config.defaultHyperlinkProtocol + "://" + this.attributes.hyperlinkUrl;
					}
				}

				return ret;
			};
		},

		link: function($scope, $element) {
			// Récupération du type de document
			if ($scope.element.attributes.hyperlinkType) {
				$scope.currentType = $scope.element.attributes.hyperlinkType;
			} else {
				$scope.currentType = $scope.config.hyperlinkTypes[0].name;
			}
		}
	};
}]);
