opensyllabusApp.service('TreeService', ['$timeout',  '$rootScope', 'SyllabusService', function ($timeout,  $rootScope, SyllabusService){
    'use strict';

   // this.selectedItem = null;
   // this.selectedItem = { id : 12356};
    
   var syllabus = null;
  
    // $scope.$watch(this.selectedItem, function() {

    // });
    
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

    this.getSelectedItem = function(){
    	return this.selectedItem;
    };

    this.initSelectedItem= function($item){
    	this.selectedItem = $item;
    };
    
    
    this.setSelectedItem = function($item, $firstTime){

        // si l'item n'est pas celui déjà sélectionné
        if ($firstTime || !$item.$selected ) {
            if (!$firstTime) {
                // permet de déselectionner l'élément précédemment sélectionné
                unselectTree(SyllabusService.getSyllabus());
            }

            $item.$selected = true;
            this.selectedItem = $item;

            // permet d'émettre l'évènement après le digest cycle et de s'assurer que les scopes soient à jours ( notamment le scope de addElementCtrl)
            $rootScope.$$postDigest( function() {
                // event item selected
                $rootScope.$broadcast("selectedItemChanged");
            });
            
            $timeout(function() {
                
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });  
        }

	};


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

    this.setSelectedItemFromId = function($id){

        var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $id);

        this.selectedItem = selectedItem;
        this.selectedItem.$selected = true;

        // permet d'émettre l'évènement après le digest cycle et de s'assurer que les scopes soient à jours ( notamment le scope de addElementCtrl)
        $rootScope.$$postDigest( function() {
            // event item selected
            $rootScope.$broadcast("selectedItemChanged");
        });

    };



}]);