tenjinApp.directive('evaluationattrElement', ['$translate', function($translate) {
	'use strict';

	return {
		scope: {
			element: '=evaluationattrElement'
		},

		restrict: 'A',

		templateUrl: 'element/evaluationattrElement/evaluationattrElement.html',

		controller: function($scope) {
			$scope.dateFormat = $translate.instant('DATE_TIME_FORMAT');
		},

		link: function($scope, $element) {
			$scope.slash = '/';
			$scope.team = 'team';
			$scope.individual = 'individual';
		}
	};
}]);
