opensyllabusApp.service('TreeService', ['$timeout', 'SyllabusService', function ($timeout, SyllabusService){
    'use strict';

   // Current viewed item (mobile menu)
   this.viewedElement = undefined;
    
    /**
     * Recursively look through the syllabus and unselect all elements
     * @param {Object} $rootTree Root tree
     */
    var unselectTreeElements = function($rootTree) {
        if ($rootTree.elements) {
            for (var i = 0; i < $rootTree.elements.length; i++){
                $rootTree.elements[i].$selected = false;
                unselectTreeElements($rootTree.elements[i]);
            }
        }
    };

    /**
     * Scan the tree and unselect all elements
     * @param {Object} $rootTree Root tree
     */
    var unselectTree = function($rootTree) {
        console.time('select');
        unselectTreeElements($rootTree);
        console.timeEnd('select');
    };


    /**
     * Get the selected item
     * @return {Object} The selected item
     */
    this.getSelectedItem = function(){
    	return this.selectedItem;
    };
 

    /**
     * Set the new selected item
     * Unselect the previous selected item
     * Resize the iframe
     * @param {Object} $item Item selected
     * @param {Boolean} $firstTime First time an item is selected
     */
    this.setSelectedItem = function($item, $firstTime){ 

        // si l'item n'est pas celui déjà sélectionné
        if ($firstTime || !$item.$selected ) {
            if (!$firstTime) {
                // permet de déselectionner l'élément précédemment sélectionné
                unselectTree(SyllabusService.getSyllabus());
            }

            // Level and position
            // ex : [2, 1, 3], in the syllabus tree, 2nd element on the 1st level,
            // then 1st element on the 2nd level, finally 3rd element on the 3rd level
            var emplacement = {
                'emplacement' : []
            }; 
            var tmpEmplacement = {
                'emplacement' : []
            };
            var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $item.id, emplacement, tmpEmplacement);

            // set selected item
            this.selectedItem = $item;     
            $item.$selected = true;
            $item.$emplacement = emplacement; // memorize the place of the element


            $timeout(function() {
                
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });  
        }

	};

    /**
     * Compare two arrays and return true if there are equals
     * @param {Array} $tab1 First array
     * @param {Array} $tab2 Second array
     * @param {Boolean} $tab2 Second array
     */
    var arrayEquals = function($tab1, $tab2) {
        if ($tab1.length === $tab2.length && $tab1.length > 0) { 
            for (var i = 0; i< $tab1.length; i++) {
                if ( $tab1[i] !==  $tab2[i] ) {
                    return false;
                }
            }
            return true; // all values are identical
        }

        return false;
    };


    /**
     * Get the element giving his position in the tree
     * @param {Object} $rootTree Root tree
     * @param {Object} $emplacement Final place for the element
     * @param {Object} $tmpEmplacement Temporary place
     * @return {Object} Returns the found element or undefined
     */
    var getItemFromEmplacement = function($rootTree, $emplacement, $tmpEmplacement) {
  
        // We look every element except the root element (which is the syllabus)
        if (SyllabusService.isSyllabusElement($rootTree) && 
            arrayEquals($emplacement.emplacement, $tmpEmplacement.emplacement) === true ) {
            return $rootTree;
        } else {

            if ($rootTree.elements) {
                for (var i = 0; i < $rootTree.elements.length; i++){
                    var newTmpEmplacement = { 'emplacement' : $tmpEmplacement.emplacement.slice() };
                    newTmpEmplacement.emplacement.push(i);
                    var resultat = getItemFromEmplacement($rootTree.elements[i], $emplacement, newTmpEmplacement);
                    if (resultat) {
                        return resultat;
                    }     
                }
            }
        }
        return undefined;
    };

    /**
     * Get the element from id and calculate the position of this one
     * @param {Object} $rootTree Root tree
     * @param {Number} $id Element id
     * @param {Object} $emplacement Final place for the element
     * @param {Object} $tmpEmplacement Temporary place
     * @return {Object} Returns the found element or undefined
     */
    var getItemFromId = function($rootTree, $id, $emplacement, $tmpEmplacement) {
        
        // compare element id
        if ($rootTree.id === $id && SyllabusService.isSyllabusElement($rootTree)) {
            $emplacement.emplacement = angular.copy($tmpEmplacement.emplacement);
            return $rootTree;
        } else {

            if ($rootTree.elements) {
                // $tmpLevel++ ;
                for (var i = 0; i < $rootTree.elements.length; i++){
                    var newTmpEmplacement = { 'emplacement' : $tmpEmplacement.emplacement.slice() };
                    newTmpEmplacement.emplacement.push(i);
                    // $tmpPosition = i;
                    var resultat = getItemFromId($rootTree.elements[i], $id, $emplacement, newTmpEmplacement);
                    if (resultat) {
                        return resultat;
                    }     
                }
            }
        }

        return undefined;
    };

    /**
     * Set the selected item from a given element id
     * @param {Number} $id Id of the element
     */
    this.setSelectedItemFromId = function($id){
        var emplacement = {
            'emplacement' : []
        }; 
        var tmpEmplacement = {
            'emplacement' : []
        };

        var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $id, emplacement);

        this.selectedItem = selectedItem;
        this.selectedItem.$selected = true;
        this.selectedItem.$emplacement = emplacement; // mémorise l'emplacement de l'élément
    };

    /**
     * Set the selected item from a given place
     * @param {Number} $emplacement Place of the element
     */
    this.setSelectedItemFromEmplacement = function($emplacement){
        var tmpEmplacement = {
            'emplacement' : []
        }; 
        var selectedItem = getItemFromEmplacement(SyllabusService.getSyllabus(), $emplacement, tmpEmplacement);

        this.selectedItem = selectedItem;
        this.selectedItem.$selected = true;
        this.selectedItem.$emplacement = $emplacement;
    };

    /**
     * Mobile menu : Set the viewed element
     * @param {Object} $item Element
     */
    this.setViewedElement = function($element) {
        this.viewedElement = $element;
    };

    /**
     * Mobile menu : Get the viewed element
     * @return {Object} The viewesd element
     */
    this.getViewedElement = function() {
        return this.viewedElement;
    };

}]);