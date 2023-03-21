tenjinApp.directive('examattrElement', ['SyllabusService',  '$translate', function(SyllabusService,  $translate) {
    'use strict';


	return {
		scope: {
			element: '=examattrElement'
		},	

		restrict: 'A',

		templateUrl: 'element/examattrElement/examattrElement.html',

		controller: function($scope) {
			var currentLanguage = $translate.use();
			$translate.use(SyllabusService.syllabus.locale).then(function() {
				 $scope.EXAM_DATE_TRANSLATE = $translate.instant('EXAM_DATE', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_DATE_VALUE_TRANSLATE = $translate.instant('EXAM_DATE_VALUE', null, null, SyllabusService.syllabus.locale);

				 $scope.EXAM_DOCUMENTATION_TRANSLATE = $translate.instant('EXAM_DOCUMENTATION', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_DURATION_TRANSLATE = $translate.instant('EXAM_DURATION', null, null, SyllabusService.syllabus.locale);

				 $scope.EXAM_LOCATION_TRANSLATE = $translate.instant('EXAM_LOCATION', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_INCLASS_TRANSLATE = $translate.instant('EXAM_INCLASS', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_ATHOME_TRANSLATE = $translate.instant('EXAM_ATHOME', null, null, SyllabusService.syllabus.locale);

				 $scope.EXAM_SUBMISSION_TYPE_TRANSLATE = $translate.instant('EXAM_SUBMISSION_TYPE', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_PAPER_TRANSLATE = $translate.instant('EXAM_PAPER', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_ELECTRONIC_TRANSLATE = $translate.instant('EXAM_ELECTRONIC', null, null, SyllabusService.syllabus.locale);

				 $scope.EXAM_TERMS_TRANSLATE = $translate.instant('EXAM_TERMS', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_ORAL_TRANSLATE = $translate.instant('EXAM_ORAL', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_WRITTEN_TRANSLATE = $translate.instant('EXAM_WRITTEN', null, null, SyllabusService.syllabus.locale);

				 $scope.EXAM_TEAM_TRANSLATE = $translate.instant('EXAM_TEAM', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_ASSESSMENT_TYPE_TRANSLATE = $translate.instant('EXAM_ASSESSMENT_TYPE', null, null, SyllabusService.syllabus.locale);
				 $scope.EXAM_INDIVIDUAL_TRANSLATE = $translate.instant('EXAM_INDIVIDUAL', null, null, SyllabusService.syllabus.locale);
				 
			});
			$translate.use(currentLanguage);
		   
		},

		link: function($scope, $element) {
			$scope.slash = '/';
			$scope.team = 'team';
			$scope.individual = 'individual';
		}
	};
}]);
