opensyllabusApp.service('TreeService', function (){
    'use strict';

    /**
     * Parcours de manière récursive les enfants de l'arbre
     * @param {Object} $rootTree racine du sous-arbre
     */
    var unselectTreeChildren = function($rootTree) {
        if ($rootTree.children) {
            for (var i = 0; i < $rootTree.children.length; i++){
                $rootTree.children[i].selected = false;
                unselectTreeChildren($rootTree.children[i]);
            }
        }
    };

    /**
     * Parcours de l'arbre
     * @param {Object} $rootTree racine de l'arbre
     */
    this.unselectTree = function($rootTree) {
        console.time('select');
        if ($rootTree.syllabusElements) {
            for (var i = 0; i < $rootTree.syllabusElements.length; i++){
                $rootTree.syllabusElements[i].selected = false;
                unselectTreeChildren($rootTree.syllabusElements[i]);
            }
        }
        console.timeEnd('select');
    };


});