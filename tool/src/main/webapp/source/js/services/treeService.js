opensyllabusApp.service('TreeService', ['$timeout', 'SyllabusService', function ($timeout, SyllabusService){
    'use strict';

   var selectedItem = -1;
    
   var syllabus = null;
  
    
    /**
     * Parcours de manière récursive les enfants de l'arbre
     * @param {Object} $rootTree racine du sous-arbre
     */
    var unselectTreeElements = function($rootTree) {
        if ($rootTree.elements) {
            for (var i = 0; i < $rootTree.elements.length; i++){
                $rootTree.elements[i].selected = false;
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
    	return selectedItem;
    };

    this.initSelectedItem= function($item){
    	selectedItem = $item;
    };
    
    
    this.setSelectedItem = function($item){
    	
    	if (!selectedItem)
    		selectedItem = $item;
    	
        if (selectedItem && $item.id !== selectedItem.id ) {         
            // permet de déselectionner l'élément précédemment sélectionné
        	unselectTree(SyllabusService.getSyllabus());
            $item.selected = true;
            selectedItem = $item;
            
            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });
        }

	};
}]);