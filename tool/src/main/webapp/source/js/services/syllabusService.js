opensyllabusApp.service('SyllabusService', ['$rootScope', '$resource', '$http', 'Modernizr', function ($rootScope, $resource, $http, Modernizr){
    'use strict';

    this.syllabus;
    this.syllabusSaved;
    this.template;
    this.dirty = false;
    this.working = false;
    this.listeSections = [
        {
            'id' : 1,
            'name' : 'Partageable'
        },
            {
            'id' : 2,
            'name' : 'Commun'
        },
        {
            'id' : 3,
            'name' : 'Section A'
        },
        {
            'id' : 4,
            'name' : 'Section B'
        }
    ];    
    this.section = this.listeSections[0];

    this.showMobileMenu = false;


    this.navigation = {
        'level' : 1
    };

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusProvider = $resource('v1/syllabus/init.json');

    //
    // var syllabusProviderSave = $resource('v1/syllabus/:siteId', null,
    // {
    //     'update': { method:'PUT' }
    // });

    //
    // var syllabusProviderSave = $resource('v1/syllabus');

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var templateProvider = $resource('v1/template/1/rules.json');

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusElementProvider = $resource('v1/syllabus');

     this.save =  function($data) {
        var syllabusProviderSave = $resource('v1/syllabus/'+$data.siteId+'.json');
        return syllabusProviderSave.save($data);
    };

    this.saveSyllabus =  function() {
        var syllabusProviderSave = $resource('v1/syllabus/'+this.syllabus.siteId+'.json');
        return syllabusProviderSave.save(this.syllabus);
    };

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

    this.getSyllabusSaved = function() {
        return this.syllabusSaved;
    };

    this.setSyllabus = function($syllabus) {      
        this.syllabus = $syllabus;
        // numérotation
        this.numerotationSyllabus(this.syllabus);

        // sauvegarde d'une copie du syllabus
        this.syllabusSaved = angular.copy(this.syllabus);
        this.dirty = false;
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

    this.setDirty = function($dirty) {
        this.dirty = $dirty;
    };

    this.isDirty = function($dirty) {
        return this.dirty;
    };


    this.setWorking = function($working) {
        this.working = $working;
    };

    this.isWorking = function($working) {
        return this.working;
    };


    var addElementToSyllabus = function($rootTree, $parent, $element, $position) {

        if ($rootTree.elements) {

            if ($rootTree.id === $parent.id && !$rootTree.siteId) { 
                // si l'élément existe déjà on le supprime et on le remplace (modification)
                var modification = false;
                for (var i = 0; i < $rootTree.elements.length; i++){
                    if ($rootTree.elements[i].id === $element.id) {
                        // modification
                        $rootTree.elements[i] = $element;
                        modification = true;
                        break;
                    }
                }   
                // ajout    
                if (!modification) {
                    $rootTree.elements.push($element);                
                } 

            } else {
                
                for (var i = 0; i < $rootTree.elements.length; i++){
                    addElementToSyllabus($rootTree.elements[i], $parent, $element, $position); 
                }
            
            }

        }

    };


    this.addElementToSyllabus = function($data, $parent, $element, $position) {
        addElementToSyllabus($data, $parent, $element, $position);
    };

    var addRubricToSyllabus = function($rootTree, $parent, $element, $rules) {
        // var results;

        if ($rootTree.elements) {

            if ($rootTree.id === $parent.id && !$rootTree.siteId) {   
                if ($rootTree.elements.length > 0) {

                    // vérifie si la rubrique a déjà été insérée
                    for (var i = 0; i < $rootTree.elements.length; i++) {
                        if ($rootTree.elements[i].templateStructureId === $element.templateStructureId) {
                            // rubrique déjà présente
                            // return -1;
                            return -1;
                        }
                    }

                    // vérifie où doit être insérée la rubrique
                    var listeTemp = [];
                    var index = -1;
                    for (var i = 0 ; i < $rules.length; i++) {
                        for (var j = 0; j < $rootTree.elements.length; j++) {
                            if ($rules[i].id === $rootTree.elements[j].templateStructureId) {
                                listeTemp.push($rootTree.elements[j]);
                                break;
                            }  
                        }

                        if ($rules[i].id === $element.templateStructureId) {
                            listeTemp.push($element);               
                        }
                    }

                    for (var i = 0 ; i < listeTemp.length; i++ ){
                        if (listeTemp[i].templateStructureId === $element.templateStructureId) {
                            index = i;
                            break;
                        }
                    }

                    // On ajoute la rubrique au plan de cours
                    if (index !== -1) {
                        $rootTree.elements.splice(index, 0, $element);
                        return 1;
                    }


                } else {
                    $rootTree.elements.push($element);
                    return 1;
                }       

            } else {
                
                for (var i = 0; i < $rootTree.elements.length; i++){
                    var results = addRubricToSyllabus($rootTree.elements[i], $parent, $element, $rules); 
                    if (results === -1 ) {
                        return results;
                    }
                }
            
            }

        }

        return 1;

    };


    this.addRubricToSyllabus = function($data, $parent, $element) {
        // On récupère les règles du template de l'élément parent, 
        // afin d'ajouter la rubrique au bon endroit
        var rules = this.template[$parent.templateStructureId];
        // var index = -1;
        // for ( var i = 0 ; i < rules.length ; i++ ) {
        //     if ( rules[i].id === $element.templateStructureId ) {
        //         index = i;
        //         break;
        //     }
        // }

        return addRubricToSyllabus($data, $parent, $element, rules);
    };


    var deleteElementFromSyllabus = function($rootTree, $parent, $element) {

        if ($rootTree.elements) {

            if ($rootTree.id === $parent.id && !$rootTree.siteId) { 
                // si l'élément existe déjà on le supprime et on le remplace
                for (var i = 0; i < $rootTree.elements.length; i++){
                    if ($rootTree.elements[i].id === $element.id) {
                        $rootTree.elements.splice(i, 1);
                    }
                }   
  
            } else {
                
                for (var i = 0; i < $rootTree.elements.length; i++){
                    deleteElementFromSyllabus($rootTree.elements[i], $parent, $element); 
                }
            
            }

        }

    };


    this.deleteElementFromSyllabus = function($data, $parent, $element) {
        deleteElementFromSyllabus($data, $parent, $element);
    };


    var getParent = function($rootTree, $element) {
        
        if ($rootTree.id === $element.parentId) {
            return $rootTree;
        } else {
            if ($rootTree.elements) {
                for (var i = 0; i < $rootTree.elements.length; i++){
                    var resultat = getParent($rootTree.elements[i], $element); 
                    if (resultat) {
                        return resultat;
                    }
                }
            }
        }
        return undefined;
    };

    this.getParent = function($element) {
        return getParent(this.syllabus, $element);
    };

    var numerotationSyllabus = function($rootTree, $infosNumerotation) {

        if ($rootTree.elements) {

            for (var i = 0; i < $rootTree.elements.length; i++){

                if($rootTree.elements[i].type === "lecture") {
                    $infosNumerotation.nbLecture++;
                    $rootTree.elements[i].$numero = $infosNumerotation.nbLecture;
                } else if ($rootTree.elements[i].type === "tutorial") {
                    $infosNumerotation.nbTutorial++;
                    String.fromCharCode('65');
                    $rootTree.elements[i].$numero = String.fromCharCode(64 + $infosNumerotation.nbTutorial);
                }

                numerotationSyllabus($rootTree.elements[i], $infosNumerotation); 
            }


        }

    };


    this.numerotationSyllabus = function($data) {
        var infosNumerotations = {
            'nbLecture' : 0,
            'nbTutorial' : 0
        };

        numerotationSyllabus($data, infosNumerotations);
    };

    var hideAllChildren = function($rootTree) {

        if ($rootTree.elements) {
            for (var i = 0; i < $rootTree.elements.length; i++ ) {
                $rootTree.elements[i].$hidden = true;

                hideAllChildren($rootTree.elements[i]);
            }   
        }
    };

    var hideItems = function($rootTree, $item, $levelTmp, $navigation) {
   
        if ($rootTree.id === $item.id && !$rootTree.siteId) {
            $rootTree.$hidden = false;
            $navigation.level = $levelTmp;

            // On affiche les enfants mais on masque les potentiels sous-enfants, etc.
            for (var i = 0; i < $rootTree.elements.length; i++ ) {
                $rootTree.elements[i].$hidden = false;
                hideAllChildren($rootTree.elements[i]);
            }
        } else {
            $rootTree.$hidden = true;

            $levelTmp++;
            if ($rootTree.elements) {
                for (var i = 0; i < $rootTree.elements.length; i++ ) {
                    hideItems($rootTree.elements[i], $item, $levelTmp, $navigation); 
                }
            }
        }

    };

    this.hideItems = function($item) {
        var tmpLevel = 1;
        hideItems(this.syllabus, $item, tmpLevel, this.navigation);

    };

    this.hideItemsInit = function() {
        for (var i = 0; i < this.syllabus.elements.length; i++ ) {
            this.syllabus.elements[i].$hidden = false;
            hideAllChildren(this.syllabus.elements[i]);
        } 
    };


}]);