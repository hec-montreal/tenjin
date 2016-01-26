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
            var emplacement = {
                'niveau' : 0,
                'position' : 0
            };
            var tmpLevel = 0;
            var tmpPosition = 0;
            var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $item.id, tmpLevel, tmpPosition ,emplacement);

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

    /**
     * Récupère l'élément correspondant à l'identifiant
     * @param {Object} $rootTree Racine de l'arbre à parcourir
     * @param {Number} $tmpLevel Niveau temporaire dans l'arbre parcouru
     * @param {Number} $tmpPosition Position temporaire dans l'arbre parcouru
     * @param {Object} $emplacement Emplacement final de l'élément recherché
     * @return {Object} Retourne l'item ou undefined si non trouvé
     */
    var getItemFromEmplacement = function($rootTree, $tmpLevel, $tmpPosition, $emplacement) {
        
        // on regarde tous les éléments hormis l'élément racine
        if ($tmpLevel === $emplacement.niveau &&  $tmpPosition === $emplacement.position && !$rootTree.siteId) {
            return $rootTree;
        } else {

            if ($rootTree.elements) {
                $tmpLevel++ ;
                for (var i = 0; i < $rootTree.elements.length; i++){
                    $tmpPosition = i;
                    var resultat = getItemFromEmplacement($rootTree.elements[i], $tmpLevel, $tmpPosition, $emplacement);
                    if (resultat) {
                        return resultat;
                    }     
                }
            }
        }
        return undefined;
    };

    /**
     * Récupère l'élément correspondant à l'identifiant
     * @param {Object} $rootTree Racine de l'arbre à parcourir
     * @param {Number} $id Identifiant de l'élément recherché
     * @param {Number} $tmpLevel Niveau temporaire dans l'arbre parcouru
     * @param {Number} $tmpPosition Position temporaire dans l'arbre parcouru
     * @param {Object} $emplacement Emplacement final de l'élément recherché
     * @return {Object} Retourne l'item ou undefined si non trouvé
     */
    var getItemFromId = function($rootTree, $id, $tmpLevel, $tmpPosition, $emplacement) {
        
        // on regarde tous les éléments hormis l'élément racine
        if ($rootTree.id === $id && !$rootTree.siteId) {
            $emplacement.niveau = $tmpLevel;
            $emplacement.position = $tmpPosition;
            return $rootTree;
        } else {

            if ($rootTree.elements) {
                $tmpLevel++ ;
                for (var i = 0; i < $rootTree.elements.length; i++){
                    $tmpPosition = i;
                    var resultat = getItemFromId($rootTree.elements[i], $id, $tmpLevel, $tmpPosition, $emplacement);
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
            'niveau' : 0,
            'position' : 0
        };
        var tmpLevel = 0;
        var tmpPosition = 0;
        var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $id, tmpLevel, tmpPosition, emplacement);

        this.selectedItem = selectedItem;
        this.selectedItem.$selected = true;
        this.selectedItem.$emplacement = emplacement; // mémorise l'emplacement de l'élément
    };

    /**
     * Met à jour l'item sélectionné à partir de l'emplacement de l'élément
     * @param {Number} $emplacement Emplacement de l'élément
     */
    this.setSelectedItemFromEmplacement = function($emplacement){

        var tmpLevel = 0;
        var tmpPosition = 0;
        var selectedItem = getItemFromEmplacement(SyllabusService.getSyllabus(), tmpLevel, tmpPosition, $emplacement);

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