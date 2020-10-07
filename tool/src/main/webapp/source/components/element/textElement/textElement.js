tenjinApp.directive('textElement',  ['$sce', function($sce) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/textElement/textElement.html',

        controller: function($scope) {
        	$scope.content;
        	if ($scope.element.description)
        		$scope.content = $sce.trustAsHtml($scope.element.description.replace("<a", "<a data-nodrag"));
        }
    };
}]);
