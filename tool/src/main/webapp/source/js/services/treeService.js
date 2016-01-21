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

            $item.$selected = true;
            this.selectedItem = $item;
            
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
     * Récupère l'élément correspondant à l'identifiant
     * @param {Object} $rootTree Racine de l'arbre à parcourir
     * @param {Number} $id Identifiant de l'élément recherché
     * @return {Object} Retourne l'item ou undefined si non trouvé
     */
    var getItemFromId = function($rootTree, $id) {
        // on regarde tous les éléments hormis l'élément racine
        if ($rootTree.id === $id && !$rootTree.siteId) {
            return $rootTree;
        } else {

            if ($rootTree.elements) {
                for (var i = 0; i < $rootTree.elements.length; i++){
                    var resultat = getItemFromId($rootTree.elements[i], $id);
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
        var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $id);

        this.selectedItem = selectedItem;
        this.selectedItem.$selected = true;
    };



    this.setViewedItem = function($item) {
        this.viewedItem = $item;
    };

    this.getViewedItem = function() {
        return this.viewedItem;
    };

}]);