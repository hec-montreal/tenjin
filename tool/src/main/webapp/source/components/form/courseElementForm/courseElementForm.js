tenjinApp.directive('courseElementForm', function() {
	'use strict';

	return {
		scope: {
			element: '=courseElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/courseElementForm/courseElementForm.html',

		controller: function($scope) {
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
});
