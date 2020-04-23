tenjinApp.directive('examElementForm', ['SyllabusService', function(SyllabusService) {
	'use strict';

	return {
		scope: {
			element: '=examElementForm',
			typelabel: '=' //Might need to link to rules for I18N purposes
		},

		restrict: 'A',

		templateUrl: 'form/examElementForm/examElementForm.html',

		controller: function($scope) {
			var templateType = SyllabusService.template[$scope.element.templateStructureId];

            // Validation
			$scope.element.validate = function() {
				var ret = [];

               if ($scope.element.title && $scope.element.title.length > 255) {
                        ret.push({
                            field: "title",
                            message: "ERROR_TITLE_TOO_LONG"
                        });
                }
				return ret;
			};
            
			if (!$scope.element.title || $scope.element.title.length === 0) {
				$scope.element.title = templateType.label
			}

			$scope.element.preSave = function() {
				this.composite = true;
			};
		},

		link: function($scope, $element) {
			if (!$scope.element.attributes.examType) {
				$scope.element.attributes.examType = $scope.typelabel;
			}
		}
	};
}]);
