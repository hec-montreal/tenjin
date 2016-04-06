
opensyllabusApp.controller('CreateSyllabusModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'TreeService', 'AlertService', 'UserService' ,'data', 'config', 'mockup' , function ($scope, $uibModalInstance, $translate, SyllabusService, TreeService, AlertService, UserService, data, config, mockup) {
    'use strict';

    // name of syllabus + sections
    $scope.data = {
        'name' : $translate.instant('CREATE_SYLLABUS_DEFAULT_NAME'),
        'sections' : []
    };
    // get user sections with write permissions
    for (var i = 0; i < UserService.profile.sections.length; i++) {
        var sectionUser = UserService.profile.sections[i];
        if (sectionUser.permissions.write === true) {
            var section = angular.copy(sectionUser);
            var syllabusList = SyllabusService.getSyllabusList();
            for (var j = 0 ; j < syllabusList.length; j++) {
                if ( syllabusList[j].sections.indexOf(section.id) > -1 ) {
                    section.assignedSyllabus = syllabusList[j];
                    break;
                }
            }

            $scope.data.sections.push(section);
        }
    }

    // $scope.sections = angular.copy(mockup.sections);

    $scope.ok = function () {

        var common = SyllabusService.getCommonSyllabus();

        // keep only the selected sections
        var sections = [];
        for( var i = 0 ; i < $scope.data.sections.length; i++) {
            if ($scope.data.sections[i].checked === true) {
                sections.push($scope.data.sections[i].id);
            }
        }

        // init data for a new specific syllabus
        // common is not loaded and templateId is null then it's not going to work
        var newSyllabus = {
            'id' : null,
            'courseTitle': UserService.profile.site.courseTitle,
            'siteId' : UserService.profile.site.courseId,
            'sections' : sections,
            'title' : $scope.data.name,
            'common' : false,
            'templateId' : (common ? common.templateId : null),
            'elements' : [],
            'locale' : 'fr_CA'
         };


        // var savePromise = SyllabusService.saveSyl(newSyllabus);
        var savePromise = SyllabusService.saveNewSyllabus(newSyllabus);
        SyllabusService.setWorking(true);

        var syllabusAdded = null;
        savePromise.$promise.then(function($data) {
            // refresh the list 
            SyllabusService.syllabusList.push($data);
            syllabusAdded = $data;

        }, function ($error){
            // syllabusAdded stay null

        }).finally(function() {
             SyllabusService.setWorking(false);
             // close the popup
             $uibModalInstance.close(syllabusAdded);
        });

        

    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




