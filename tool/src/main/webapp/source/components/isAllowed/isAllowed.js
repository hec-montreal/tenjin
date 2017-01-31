tenjinApp.directive('isAllowed', ['UserService',function(UserService) {
	'use strict';

	return {
		scope: {
			permission: '=',
			syllabus: '=',
		},

		restrict: 'E',

		
		link:  function ($scope, $element, attrs) {
			console.log ($scope.permission);
			if (($scope.syllabus && UserService.isAllowed($scope.permission, $scope.syllabus)) ||
				UserService.isAllowedView($scope.permission))
			{ 
				$element.show;
			}else{
				$element.hide;
			}
			
		}
	};
}]);
