opensyllabusApp.service('SyllabusService', ['$resource', function ($resource){
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusProvider = $resource('v1/syllabus');

    this.getSyllabus =  function() {  
        // return syllabusProvider.getSyllabus({sectionId : "A01,B03"});   
        return syllabusProvider.get();
    };


}]);