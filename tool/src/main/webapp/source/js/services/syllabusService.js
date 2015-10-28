opensyllabusApp.service('SyllabusService', ['$resource', '$http', function ($resource, $http){
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusProvider = $resource('v1/syllabus/site.json');

    this.getSyllabus =  function() {  
        // return syllabusProvider.getSyllabus({sectionId : "A01,B03"});   
        return syllabusProvider.get();
    };


    
    
    this.initSyllabus = function(){
    	return $http.get('v1/syllabus/init.json');
    }
}]);