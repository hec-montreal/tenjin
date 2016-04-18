opensyllabusApp.service('SyllabusService', ['UserService', '$resource', function (UserService, $resource){
    'use strict';

    this.syllabus;
    this.syllabusSaved;
    this.template;
    this.syllabusList;

    this.dirty = false;
    this.working = false;

    this.showMobileMenu = false;

    // variable used to look through the syllabus tree
    this.navigation = {
        'level' : 1
    };

    //
    // var syllabusProviderSave = $resource('v1/syllabus');

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var templateProvider = $resource('v1/template/1/rules.json');

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var syllabusElementProvider = $resource('v1/syllabus');

    // provider create syllabus
    var sylProvider = $resource('v1/syllabus.json');
    // provider get syllabus list
    var sylProviderList = $resource('v1/syllabus.json', {}, {'get':{method:'GET', isArray: true}}); 
    // provider get and update particular syllabus
    var sylProviderId = $resource('v1/syllabus/:id.json');


    /**
     * Save syllabus
     * @param {Object} $data Syllabus data
     * @return {Object} Promise
     */
    this.save =  function($data) {
        // UPDATE: if the syllabus has already an id then call a specific url
        if( $data.id ) {
           return sylProviderId.save( {id: $data.id} , $data); 
        }
        // CREATE: if the syllabus has no id 
        return sylProvider.save($data);
    };

    /**
     * Save current syllabus
     * @return {Object} Promise
     */
    this.saveCurrent =  function() {
        return this.save(this.syllabus);
    };

    /**
     * Delete a list of syllabus
     * @param {Array} $syllabusList Syllabus list to delete
     * @return {Object} Promise
     */
    this.deleteSyllabusList =  function($syllabusList) {
        return sylProvider.delete($syllabusList);
    };

    /**
     * Load a syllabus
     * @param {Number} $syllabusId id of the syllabus
     * @return {Object} Promise
     */
    this.loadSyllabus =  function($syllabusId) {   
        return sylProviderId.get({id : $syllabusId});
    };

    /**
     * Load a list of syllabus
     * @param {String} $siteId site id
     * @return {Object} Promise
     */
    this.loadSyllabusList =  function($siteId) {    
        return sylProviderList.get({siteId : $siteId});
    };

    /**
     * Load the template rules
     * @return {Object} Promise
     */
    this.loadTemplate = function() {
        return templateProvider.get();
    };

    /**
     * Get the syllabus list
     * @return {Array} Syllabus list
     */
    this.getSyllabusList = function() {
        return this.syllabusList;
    };

    /**
     * Set the syllabus list
     * @param {Array} $syllabusList Syllabus list
     */
    this.setSyllabusList = function($syllabusList) {  
        this.syllabusList = $syllabusList;
        // set write permissions on each syllabus
        for(var i = 0; i < this.syllabusList.length; i++) {
            this.setWritePermission(this.syllabusList[i]);
        }
    };

    /**
     * Get the current syllabus
     * @return {Object} Current syllabus viewed
     */
    this.getSyllabus = function() {
        return this.syllabus;
    };

    /**
     * Get the common syllabus from the syllabus list
     * @return {Object} Common syllabus or undefined
     */
    this.getCommonSyllabus = function() {
        if (this.syllabusList) {
            for (var i=0 ; i < this.syllabusList.length; i++) {
                if (this.syllabusList[i].common === true) {
                    return this.syllabusList[i];
                }
            }
        }
        return undefined;
    };

    // TODO : to delete 
    this.getSyllabusSaved = function() {
        return this.syllabusSaved;
    };

    /**
     * Set the write permission flag for the syllabus (true = editable)
     * @param {Object} $syllabus The syllabus to check write permission
     */
    this.setWritePermission = function($syllabus) {
        // read or write
        // 1- if write permission on site 
        // 2- or created by user
        // 3- or write permission on one section of the syllabus
        var sectionsSyllabus = $syllabus.sections;
        var sectionsWrite = UserService.getSectionsWrite();
        var sectionWritePresent = false;
        for (var i = 0; i < sectionsWrite.length; i++) {
            if (sectionsSyllabus.indexOf(sectionsWrite[i].id) > -1) {
                sectionWritePresent = true;
                break;
            }
        }

        // define write permission
        if (UserService.profile.site.permissions.write === true) {
            // permission on all site and all syllabus
            $syllabus.$writePermission = true;
        } else {
            if ($syllabus.common === true) {
                $syllabus.$writePermission = false;
                
            } else {
                if ( $syllabus.createdBy === UserService.profile.userId || sectionWritePresent ){
                    $syllabus.$writePermission = true;
                } else {
                    $syllabus.$writePermission = false;
                }
            }
        }
    };

    /**
     * Set the current syllabus
     * @param {Object} $syllabus The future current syllabus
     */
    this.setSyllabus = function($syllabus) {      
        this.syllabus = $syllabus;
        // numbering
        this.numerotationSyllabus(this.syllabus);
        // define write permission on current syllabus
        this.setWritePermission(this.syllabus);
        // save a copy
        this.syllabusSaved = angular.copy(this.syllabus);
        // set dirty flag to false
        this.dirty = false;
    };

    /**
     * Get the template rules
     * @return {Object} The template rules
     */
    this.getTemplate = function() {
        return this.template;
    };

    /**
     * Set the template rules
     * @param {Object} $template The template rules
     */
    this.setTemplate = function($template) {
        this.template = $template;
    };

    /**
     * Set the dirty flag
     * @param {Boolean} $dirty Dirty flag
     */
    this.setDirty = function($dirty) {
        this.dirty = $dirty;
    };

    /**
     * Get the value of the dirty flag
     * @return {Boolean} Dirty flag value
     */
    this.isDirty = function($dirty) {
        return this.dirty;
    };

    /**
     * Set the working flag
     * @param {Boolean} $working Working flag value
     */
    this.setWorking = function($working) {
        this.working = $working;
    };


    /**
     * Get the value of the working flag
     * @return {Boolean} Working flag value
     */
    this.isWorking = function($working) {
        return this.working;
    };

    /**
     * Return whether or not the provided object is a syllabus element 
     * as opposed to the syllabus object itself (useful for recursive traversal
     * of the syllabus)
     * @param {Object} $object Element
     * @return {Boolean} True if the element is a syllabus element
     */
    var isSyllabusElement = function($object) {
        // a syllabus element does not have a templateId property
        return typeof($object.templateId) === "undefined";
    };

    /**
     * Return whether or not the provided object is a syllabus element 
     * as opposed to the syllabus object itself (useful for recursive traversal
     * of the syllabus)
     * @param {Object} $object Element
     * @return {Boolean} True if the element is a syllabus element
     */
    this.isSyllabusElement = function($object) {
        return isSyllabusElement($object);
    };

    /**
     * Add a new element to the syllabus
     * @param {Object} $rootTree Root tree
     * @param {Object} $parent Parent of the element
     * @param {Object} $element Element to be inserted
     * @param {Object} $position Position of the element in the list
     */
    var addElementToSyllabus = function($rootTree, $parent, $element, $position) {

        if ($rootTree.elements) {

            if ($rootTree.id === $parent.id && isSyllabusElement($rootTree)) {
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

    /**
     * Add a new element to the syllabus
     * @param {Object} $data Syllabus root tree
     * @param {Object} $parent Parent of the element
     * @param {Object} $element Element to be inserted
     * @param {Object} $position Position of the element in the list
     */
    this.addElementToSyllabus = function($data, $parent, $element, $position) {
        addElementToSyllabus($data, $parent, $element, $position);
    };

    /**
     * Add a new rubric to the syllabus
     * @param {Object} $rootTree Syllabus root tree
     * @param {Object} $parent Parent of the element
     * @param {Object} $element Element to be inserted
     * @param {Object} $rules Template rules
     * @return {Number} If the rubric already exists then return -1, else return 1
     */
    var addRubricToSyllabus = function($rootTree, $parent, $element, $rules) {

        if ($rootTree.elements) {

            if ($rootTree.id === $parent.id && isSyllabusElement($rootTree)) {
                if ($rootTree.elements.length > 0) {

                    // Check if the rubric already exists
                    for (var i = 0; i < $rootTree.elements.length; i++) {
                        if ($rootTree.elements[i].templateStructureId === $element.templateStructureId) {
                            // Rubric already present
                            return -1;
                        }
                    }

                    // Check where the rubric must be inserted
                    var listeTemp = [];
                    var index = -1;
                    for (var i = 0 ; i < $rules.elements.length; i++) {
                        for (var j = 0; j < $rootTree.elements.length; j++) {
                            if ($rules.elements[i].id === $rootTree.elements[j].templateStructureId) {
                                listeTemp.push($rootTree.elements[j]);
                                break;
                            }  
                        }

                        if ($rules.elements[i].id === $element.templateStructureId) {
                            listeTemp.push($element);               
                        }
                    }

                    for (var i = 0 ; i < listeTemp.length; i++ ){
                        if (listeTemp[i].templateStructureId === $element.templateStructureId) {
                            index = i;
                            break;
                        }
                    }

                    // Add the rubric to the syllabus
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

    /**
     * Add a new rubric to the syllabus
     * @param {Object} $data Syllabus root tree
     * @param {Object} $parent Parent of the element
     * @param {Object} $element Element to be inserted
     * @return {Number} If the rubric already exists then return -1, else return 1
     */
    this.addRubricToSyllabus = function($data, $parent, $element) {
        // We get the template rules of the parent element 
        // to add the rubric to the right place
        var rules = this.template[$parent.templateStructureId];


        return addRubricToSyllabus($data, $parent, $element, rules);
    };

    /**
     * Delete an element from the syllabus
     * @param {Object} $data Syllabus root tree
     * @param {Object} $parent Parent of the element
     * @param {Object} $element Element to be deleted
     */
    var deleteElementFromSyllabus = function($rootTree, $parent, $element) {

        if ($rootTree.elements) {

            if ($rootTree.id === $parent.id && isSyllabusElement($rootTree)) { 
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

    /**
     * Delete an element from the syllabus
     * @param {Object} $data Syllabus root tree
     * @param {Object} $parent Parent of the element
     * @param {Object} $element Element to be deleted
     */
    this.deleteElementFromSyllabus = function($data, $parent, $element) {
        deleteElementFromSyllabus($data, $parent, $element);
    };

    /**
     * Get the parent of an element
     * @param {Object} $rootTree Syllabus root tree
     * @param {Object} $element Element
     * @return {Object} The parent element or undefined
     */
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

    /**
     * Get the parent of an element
     * @param {Object} $element Element
     * @return {Object} The parent element or undefined
     */
    this.getParent = function($element) {
        return getParent(this.syllabus, $element);
    };

    /**
     * Numbering the syllabus element (lecture, tutorial and evaluation)
     * @param {Object} $rootTree Syllabus root tree
     * @param {Object} $infosNumerotation Param inout with properties (nbLecture, nbTutorial, nbEvalAndExam)
     */
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
                } else if ($rootTree.elements[i].type === "evaluation" || $rootTree.elements[i].type === "exam") {
                    $rootTree.elements[i].$numero =$infosNumerotation.nbEvalAndExam++;
                }
                numerotationSyllabus($rootTree.elements[i], $infosNumerotation); 
            }


        }

    };

    /**
     * Numbering the syllabus element (lecture, tutorial and evaluation)
     * @param {Object} $rootTree Syllabus root tree
     */
    this.numerotationSyllabus = function($data) {
        var infosNumerotations = {
            'nbLecture' : 0,
            'nbTutorial' : 0,
            'nbEvalAndExam': 1
        };

        numerotationSyllabus($data, infosNumerotations);
    };

    /**
     * Mobile menu : hide all children elements
     * @param {Object} $rootTree Syllabus root tree
     */
    var hideAllChildren = function($rootTree) {

        if ($rootTree.elements) {
            for (var i = 0; i < $rootTree.elements.length; i++ ) {
                $rootTree.elements[i].$hidden = true;

                hideAllChildren($rootTree.elements[i]);
            }   
        }
    };

    /**
     * Mobile menu : hide all children elements
     * @param {Object} $rootTree Syllabus root tree
     * @param {Object} $item Current selected item
     * @param {Object} $levelTmp Temporary level of navigation
     * @param {Object} $navigation Final navigation level (inout param)
     */
    var hideItems = function($rootTree, $item, $levelTmp, $navigation) {
   
        if ($rootTree.id === $item.id) {
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

    /**
     * Mobile menu : hide all children elements
     * @param {Object} $item Current selected item
     */
    this.hideItems = function($item) {
        var tmpLevel = 1;
        hideItems(this.syllabus, $item, tmpLevel, this.navigation);

    };

    /**
     * Mobile menu : initialize the mobile menu and hide some items
     */
    this.hideItemsInit = function() {
        for (var i = 0; i < this.syllabus.elements.length; i++ ) {
            this.syllabus.elements[i].$hidden = false;
            hideAllChildren(this.syllabus.elements[i]);
        }
    };

}]);