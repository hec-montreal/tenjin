opensyllabusApp.service('SyllabusService', ['$resource', function ($resource){
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
      var syllabusProvider = $resource('v1/syllabus/:courseId.json', 
   // var syllabusProvider = $resource('http://localhost:8080/portal/tool/409fef00-0acf-43f6-94dc-b346a3fb097f/v1/syllabus/:courseId.json', 
        {
            courseId : "@courseId"
        }, 
        {
            getSyllabus : {
                method : 'GET',
                isArray : false
            }
        }
    );

    this.getSyllabus =  function($courseId) {     
       return syllabusProvider.getSyllabus({courseId : $courseId, sectionId : "A01,B03"});
    };


}]);