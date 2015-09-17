opensyllabusApp.service('SyllabusService', ['$resource', function ($resource){
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusProvider = $resource('v1/syllabus/:courseId.json', 
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