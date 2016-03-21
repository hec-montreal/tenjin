opensyllabusApp.service('TreeService', ['$timeout',  '$rootScope', 'SyllabusService', function ($timeout,  $rootScope, SyllabusService){
    'use strict';

   // this.selectedItem = null;
   // this.selectedItem = { id : 12356};
    
   var syllabus = null;
   
   // Item en cours de visualisation (menu mobile)
   this.viewedItem = undefined;
    
    /**
     * Parcours de manière récursive les enfants de l'arbre
     * @param {Object} $rootTree racine du sous-arbre
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
     * Parcours de l'arbre
     * @param {Object} $rootTree racine de l'arbre
     */
    var unselectTree = function($rootTree) {
        console.time('select');
        unselectTreeElements($rootTree);
        console.timeEnd('select');
    };



    /**
     * Parcours de l'arbre
     * @param {Object} $rootTree racine de l'arbre
     */
    this.numerotationTree = function($rootTree) {
        // console.time('select');
        // if ($rootTree.elements) {
        //     for (var i = 0; i < $rootTree.elements.length; i++){
        //         $rootTree.elements[i].selected = false;
        //         unselectTreeElements($rootTree.elements[i]);
        //     }
        // }
        // console.timeEnd('select');
    };

    /**
     * Récupère l'item sélectionné
     * @return {Object} L'élément sélectionné
     */
    this.getSelectedItem = function(){
    	return this.selectedItem;
    };

    this.initSelectedItem= function($item){
    	this.selectedItem = $item;
    };
    

    /**
     * Met à jour l'item sélectionné
     * Déselectionne le précédent item sélectionné
     * Redimensionne l'iframe
     * @param {Object} $item Item sélectionné
     * @param {Boolean} $firstTime Première sélection d'un élément
     */
    this.setSelectedItem = function($item, $firstTime){ 

        // si l'item n'est pas celui déjà sélectionné
        if ($firstTime || !$item.$selected ) {
            if (!$firstTime) {
                // permet de déselectionner l'élément précédemment sélectionné
                unselectTree(SyllabusService.getSyllabus());
            }

            // niveau et position
            // ex : [2, 1, 3], dans l'arbre, 2ème élément, puis 1er élément, puis 3ème élément
            var emplacement = {
                'emplacement' : []
            }; 
            var tmpEmplacement = {
                'emplacement' : []
            };
            // var emplacement = {
            //     'niveau' : 0,
            //     'position' : 0
            // };
            // var tmpLevel = 0;
            // var tmpPosition = 0;
            var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $item.id, emplacement, tmpEmplacement);

            this.selectedItem = $item;     
            $item.$selected = true;
            $item.$emplacement = emplacement; // mémorise l'emplacement de l'élément


            $timeout(function() {
                
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });  
        }

	};

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
        
        // on regarde tous les éléments hormis l'élément racine
        if (typeof($rootTree.common) === false && arrayEquals($emplacement.emplacement, $tmpEmplacement.emplacement) === true ) {
            return $rootTree;
        } else {

            if ($rootTree.elements) {
                // $tmpLevel++ ;
                for (var i = 0; i < $rootTree.elements.length; i++){
                    var newTmpEmplacement = { 'emplacement' : $tmpEmplacement.emplacement.slice() };
                    newTmpEmplacement.emplacement.push(i);
                    // $tmpPosition = i;
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
        if ($rootTree.id === $id && typeof($rootTree.common) === false) {
            // $emplacement.niveau = $tmpLevel;
            // $emplacement.position = $tmpPosition;
            $emplacement.emplacement = $tmpEmplacement.emplacement.slice();
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
     * Met à jour l'item sélectionné à partir d'un identifiant d'élément
     * @param {Number} $id Identifiant de l'élément
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
     * Met à jour l'item sélectionné à partir de l'emplacement de l'élément
     * @param {Number} $emplacement Emplacement de l'élément
     */
    this.setSelectedItemFromEmplacement = function($emplacement){
        var tmpEmplacement = {
            'emplacement' : []
        }; 
        // var tmpLevel = 0;
        // var tmpPosition = 0;
        var selectedItem = getItemFromEmplacement(SyllabusService.getSyllabus(), $emplacement, tmpEmplacement);

        this.selectedItem = selectedItem;
        this.selectedItem.$selected = true;
        this.selectedItem.$emplacement = $emplacement;
    };

    this.setViewedItem = function($item) {
        this.viewedItem = $item;
    };

    this.getViewedItem = function() {
        return this.viewedItem;
    };

}]);