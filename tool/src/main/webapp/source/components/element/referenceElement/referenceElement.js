tenjinApp.directive('referenceElement', ['config',  '$translate','ResourcesService', function(config, $translate, ResourcesService) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/referenceElement/referenceElement.html',

		controller: function($scope) {},

		link: function($scope, $element) {
			$scope.citation = ResourcesService.getResource($scope.element.attributes.citationId);

			var citationTypeId = $scope.element.attributes.citationType;

            if (citationTypeId) {
                $scope.citationTypeId = parseInt(citationTypeId, 10);
            } else {
                $scope.citationTypeId = -1;
            }

            // Retrieve the label for the citation type id
            if ($scope.element.attributes.citationType) {
                for (var i = 0; i < config.citationTypes.length; i++) {
                    if (parseInt($scope.element.attributes.citationType, 10) === config.citationTypes[i].id) {
                        $scope.citationType = $translate.instant(config.citationTypes[i].name);
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
