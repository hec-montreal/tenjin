tenjinApp.directive('contactElementForm', ['config', '$translate', function(config, $translate) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'form/contactElementForm/contactElementForm.html',

		controller: function($scope) {
			$scope.config = config;
			
			// setup editor options
			$scope.editorOptionsDisponibilite = {
				language: 'fr',
				height: '120',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			$scope.editorOptionsCommentaire = {
				language: 'fr',
				height: '120',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			$scope.getContactInfoTitles = function () {
				return config.contactInfoTitles.sort(function(a, b) {
					return $translate.instant(a.name).localeCompare($translate.instant(b.name));
				});
			};

			$scope.selectTitle = function($title) {
				$scope.currentTitle = $title.name;
				$scope.element.attributes.contactInfoTitle = $scope.currentTitle;
			};

			$scope.element.validate = function() {
				var ret = [];

				if (!this.attributes.contactInfoFirstName || this.attributes.contactInfoFirstName.length <= 0) {
					ret.push({
						field: "contactInfoFirstName",
						message: "ERROR_MISSING_CONTACTINFO_FIRSTNAME"
					});
				}
				if (!this.attributes.contactInfoLastName || this.attributes.contactInfoLastName.length <= 0) {
					ret.push({
						field: "contactInfoLastName",
						message: "ERROR_MISSING_CONTACTINFO_LASTNAME"
					});
				}

				return ret;
			}
		},
		
		link: function($scope, $element) {
			// Retrieve the title for the given title id
			if ($scope.element.attributes.contactInfoTitle) {
				$scope.currentTitle = $scope.element.attributes.contactInfoTitle;
			} else {
				$scope.currentTitle = $scope.config.contactInfoTitles[0].name;
			}
		}
	};

}]);
