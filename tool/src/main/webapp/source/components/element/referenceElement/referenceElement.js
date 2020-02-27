tenjinApp.directive('referenceElement', ['config',  '$translate','ResourcesService', 'SyllabusService', function(config, $translate, ResourcesService, SyllabusService) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/referenceElement/referenceElement.html',

		controller: function($scope) {},

		link: function($scope, $element) {
			$scope.citation = ResourcesService.getResource($scope.element.attributes.citationId);

			$scope.citationTypeId = $scope.element.attributes.citationType;
			$scope.citationType = $translate.instant($scope.citationTypeId);

			$scope.url = $scope.citation.values['hecUrl'];

			if (!$scope.url || $scope.url.length === 0) {
				$scope.url = $scope.citation.values['openUrl'];
			}

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
        	var currentLanguage = $translate.use();
        	$translate.use(SyllabusService.syllabus.locale).then(function() {
        		 $scope.REF_BIBLIO_FROM_TRANSLATE = $translate.instant('REF_BIBLIO_FROM', null, null, SyllabusService.syllabus.locale);
        		 $scope.REF_BIBLIO_FROM2_TRANSLATE = $translate.instant('REF_BIBLIO_FROM2', null, null, SyllabusService.syllabus.locale);
        		 $scope.REFERENCE_LIBRARY_LINK_TRANSLATE = $translate.instant('REFERENCE_LIBRARY_LINK', null, null, SyllabusService.syllabus.locale);
        		 $scope.REFERENCE_OTHER_LINK_TRANSLATE = $translate.instant('REFERENCE_OTHER_LINK', null, null, SyllabusService.syllabus.locale);
        		 
        	});
        	$translate.use(currentLanguage);
			
		}
	};
}]);
