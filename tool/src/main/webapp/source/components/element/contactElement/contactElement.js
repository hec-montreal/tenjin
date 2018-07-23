tenjinApp.directive('contactElement', ['config', '$translate', 'SyllabusService',  function(config, $translate, SyllabusService) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/contactElement/contactElement.html',

        controller: function($scope) {
            // Retrieve the label for the title
            if ($scope.element.attributes.contactInfoTitle) {
                $scope.title = $translate.instant($scope.element.attributes.contactInfoTitle);
            }
        	var currentLanguage = $translate.use();
        	$translate.use(SyllabusService.syllabus.locale).then(function() {
        		 $scope.CONTACT_OFFICEROOM_TRANSLATE = $translate.instant('CONTACT_OFFICEROOM', null, null, SyllabusService.syllabus.locale);
        		 $scope.CONTACT_AVAILABILITY_TRANSLATE = $translate.instant('CONTACT_AVAILABILITY', null, null, SyllabusService.syllabus.locale);
        		 
        	});
        	$translate.use(currentLanguage);
            
        }
    };
}]);
