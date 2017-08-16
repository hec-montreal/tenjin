tenjinApp.directive('evaluationElementForm',['SyllabusService', function(SyllabusService) {
	'use strict';

	return {
		scope: {
			element: '=evaluationElementForm',
			typelabel: '=' //Might need to link to rules for I18N purposes
		},

		restrict: 'A',

		templateUrl: 'form/evaluationElementForm/evaluationElementForm.html',

		controller: function($scope) {
			$scope.formats = ['dd-MM-yyyy'];
			$scope.format = $scope.formats[0];

			var templateType = SyllabusService.template[$scope.element.templateStructureId];

			if (!$scope.element.title || $scope.element.title.length === 0) {
				$scope.element.title = templateType.label
			}

			$scope.statusDateEval = {
				opened: false
			};

			$scope.dateOptions = {
				formatYear: 'yy',
				startingDay: 1
			};

			if ($scope.element.attributes.evaluationDate)
				$scope.evaluationDateObject = new Date($scope.element.attributes.evaluationDate);

			$scope.openDateEval = function($event) {
				$scope.statusDateEval.opened = true;
			};

			// Disable weekend selection
			$scope.disabled = function(date, mode) {
				return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
			};

			$scope.element.preSave = function() {
				if ($scope.evaluationDateObject !== undefined) {
					this.attributes.evaluationDate = $scope.evaluationDateObject;
				}

				this.composite = true;
			};
		},

		link: function($scope, $element) {
			if (!$scope.element.attributes.evaluationType) {
				$scope.element.attributes.evaluationType = $scope.typelabel;
			}
		}
	};
}]);
