tenjinApp.directive('evaluationattrElement', ['$translate', 'SyllabusService', function($translate, SyllabusService) {
	'use strict';

	return {
		scope: {
			element: '=evaluationattrElement'
		},

		restrict: 'A',

		templateUrl: 'element/evaluationattrElement/evaluationattrElement.html',

		controller: function($scope) {
			$scope.dateFormat = $translate.instant('DATE_TIME_FORMAT');
			var currentLanguage = $translate.use();
			$translate.use(SyllabusService.syllabus.locale).then(function() {
			 $scope.EVALUATION_DATE_TRANSLATE = $translate.instant('EVALUATION_DATE', null, null, SyllabusService.syllabus.locale);

			 $scope.EVALUATION_LOCATION_TRANSLATE = $translate.instant('EVALUATION_LOCATION', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_INCLASS_TRANSLATE = $translate.instant('EVALUATION_INCLASS', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_ATHOME_TRANSLATE = $translate.instant('EVALUATION_ATHOME', null, null, SyllabusService.syllabus.locale);			 

			 $scope.EVALUATION_SUBMISSION_TYPE_TRANSLATE = $translate.instant('EVALUATION_SUBMISSION_TYPE', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_PAPER_TRANSLATE = $translate.instant('EVALUATION_PAPER', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_ELECTRONIC_TRANSLATE = $translate.instant('EVALUATION_ELECTRONIC', null, null, SyllabusService.syllabus.locale);

			 $scope.EVALUATION_TERMS_TRANSLATE = $translate.instant('EVALUATION_TERMS', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_ORAL_TRANSLATE = $translate.instant('EVALUATION_ORAL', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_WRITTEN_TRANSLATE = $translate.instant('EVALUATION_WRITTEN', null, null, SyllabusService.syllabus.locale);

			 $scope.EVALUATION_ASSESSMENT_TYPE_TRANSLATE = $translate.instant('EVALUATION_ASSESSMENT_TYPE', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_TEAM_TRANSLATE = $translate.instant('EVALUATION_TEAM', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_INDIVIDUAL_TRANSLATE = $translate.instant('EVALUATION_INDIVIDUAL', null, null, SyllabusService.syllabus.locale);

			 $scope.EVALUATION_AI_PERMITTED_TRANSLATE = $translate.instant('EVALUATION_AI_PERMITTED', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_AI_TRANSLATE = $translate.instant('EVALUATION_AI', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_AI_PROHIBITED_TRANSLATE = $translate.instant('EVALUATION_AI_PROHIBITED', null, null, SyllabusService.syllabus.locale);
			 $scope.EVALUATION_AI_PROHIBITED_W_EXCEPTIONS_TRANSLATE = $translate.instant('EVALUATION_AI_PROHIBITED_W_EXCEPTIONS', null, null, SyllabusService.syllabus.locale);

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
