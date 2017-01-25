tenjinApp.controller('CreateSyllabusModalCtrl', ['$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'UserService', 'AlertService', function($scope, $uibModalInstance, $translate, SyllabusService, UserService, AlertService) {
	'use strict';

    // Init syllabus data : name of syllabus + sections
    $scope.data = {
        'name': $translate.instant('CREATE_SYLLABUS_DEFAULT_NAME'),
        'sections': []
    };

    // get user sections with write permissions
    for (var i = 0; i < UserService.getProfile().sections.length; i++) {
        var sectionUser = UserService.getProfile().sectionWrite[i];
        //if (sectionUser.permissions.write === true) {
            var section = angular.copy(sectionUser);
            var syllabusList = SyllabusService.getSyllabusList();

            for (var j = 0; j < syllabusList.length; j++) {
                if (syllabusList[j].sections.indexOf(section.id) > -1) {
                    section.assignedSyllabus = syllabusList[j];
                    break;
                }
            }

            $scope.data.sections.push(section);
        //}
    }

    /**
     * Callback ok button
     */
    $scope.ok = function() {
        var common = SyllabusService.getCommonSyllabus();

        // keep only the selected sections
        var sections = [];

        for (var i = 0; i < $scope.data.sections.length; i++) {
            if ($scope.data.sections[i].checked === true) {
                sections.push($scope.data.sections[i].id);
            }
        }

        // init data for a new specific syllabus
        // common is not loaded and templateId is null then it's not going to work
        var newSyllabus = {
            'id': null,
            'courseTitle': UserService.getProfile().courseTitle,
            'siteId': UserService.getProfile().siteId,
            'sections': sections,
            'title': $scope.data.name,
            'common': false,
            'templateId': (common ? common.templateId : null),
            'elements': null,
            'locale': 'fr_CA'
        };


		var syllabusAdded = null;

		SyllabusService.save(newSyllabus).then(function(data) {
			SyllabusService.setWritePermission(data);

			SyllabusService.syllabusList.push(data);

			syllabusAdded = data;
		}).catch(function(data) {
			AlertService.showAlert('cannotSaveSyllabus');
		});
		
		$uibModalInstance.close(syllabusAdded);
	};

    /**
     * Callback cancel button
     */
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);
