tenjinApp.directive('courseElementForm',['SyllabusService', function(SyllabusService) {
	'use strict';

	return {
		scope: {
			element: '=courseElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/courseElementForm/courseElementForm.html',

		controller: function($scope) {
			var templateType = SyllabusService.template[$scope.element.templateStructureId];

			if (!$scope.element.title || $scope.element.title.length === 0) {
				$scope.element.title = templateType.label
			}
			
			// Validation
			$scope.element.validate = function() {
				var ret = [];

				if (!this.title || this.title.length === 0) {
					ret.push({
						field: "title",
						message: "ERROR_TITLE_MANDATORY"
					});
				}

				if (this.title && this.title.length > 255) {
					ret.push({
						field: "title",
						message: "ERROR_TITLE_TOO_LONG"
					});
				}

				return ret;
			};
		}
	};
}]);
