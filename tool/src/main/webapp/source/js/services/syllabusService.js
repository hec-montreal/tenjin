opensyllabusApp.service('SyllabusService', ['$rootScope', '$resource', '$http',  function ($rootScope, $resource, $http){
    'use strict';

    this.syllabus;
    this.template;

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusProvider = $resource('v1/syllabus/init.json');

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var templateProvider = $resource('v1/template/1.json');

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusElementProvider = $resource('v1/syllabus/');

    this.loadSyllabus =  function() {  
        // return syllabusProvider.getSyllabus({sectionId : "A01,B03"});   
        return syllabusProvider.get();
    };

    this.loadTemplate = function() {
        return templateProvider.get();
    };

    this.saveElement = function($element, $parent) {
        return syllabusElementProvider.save($element, $parent);
    };

    this.getSyllabus = function() {
        return this.syllabus;
    };

    this.setSyllabus = function($syllabus) {
        this.syllabus = $syllabus;
    };

    this.getTemplate = function() {
        return this.template;
    };

    this.setTemplate = function($template) {
        this.template = $template;
    };

    this.addElement = function($element, $parent) {
        // Ajout de l'élément au plan de cours
        $parent.elements.push($element); 
    };

    this.deleteElement = function($element, $parent) {

    };

    this.broadcastTemplateLoaded = function($template) {
        $rootScope.$broadcast('templateLoaded');
    };


    // this.initSyllabus = function(){
    // 	return $http.get('v1/syllabus/init.json');
    // };

}]);