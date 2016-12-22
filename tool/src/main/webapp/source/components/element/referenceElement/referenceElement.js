tenjinApp.directive('referenceElement', ['config',  '$translate','ResourcesService', function(config, $translate, ResourcesService) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/referenceElement/referenceElement.html',

		controller: function($scope) {},

		link: function($scope, $element) {
			$scope.citation = ResourcesService.getResource($scope.element.attributes.citationId);

			var referenceTypeId = $scope.element.attributes.referenceType;

            if (referenceTypeId) {
                $scope.referenceTypeId = parseInt(referenceTypeId, 10);
            } else {
                $scope.referenceTypeId = -1;
            }

            // Retrieve the label for the reference type id
            if ($scope.element.attributes.referenceType) {
                for (var i = 0; i < config.referenceTypes.length; i++) {
                    if (parseInt($scope.element.attributes.referenceType, 10) === config.referenceTypes[i].id) {
                        $scope.referenceType = $translate.instant(config.referenceTypes[i].name);
                        break;
                    }
                }
            }

			$scope.element.title = "Citation";

			$scope.dot = ".";
			$scope.comma = ',';
			$scope.openParenthesis = '(';
			$scope.closeParenthesis = ')';
			$scope.leftAngleQuote = '«';
			$scope.rightAngleQuote = '»';
			$scope.pages = 'p.';
			$scope.volume = 'vol.';
			$scope.issue = 'no';
			$scope.edition = 'ed.';
		}
	};
}]);
