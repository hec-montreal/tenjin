
opensyllabusApp.controller('ContentPanelCtrl', ['$scope', function ($scope){
    'use strict';

    // $scope.syllabus.syllabusStructures[$scope.infos.currentItemId];
    // $scope.items = [$scope.syllabus.syllabusStructures[$scope.infos.currentItemId]];

    $scope.$watch('infos.currentItemId', function(newValue, oldValue) {
        // get the selected item and display it
        if ($scope.syllabus) {

            $scope.selectedItem = parcoursTree($scope.syllabus, newValue);       
            console.dir($scope.selectedItem);

        }
        
    });

    /**
     * Parcours de l'arbre
     * @param {Object} $rootTree racine de l'arbre
     */
    var parcoursTree = function($rootTree, $currentItemId) {
        // console.log('element => ' + $rootTree.syllabusElement_id);

        if ($rootTree.syllabusElements) {
            var results ;
            for (var i = 0; i < $rootTree.syllabusElements.length; i++){
                results = parcoursTreeChildren($rootTree.syllabusElements[i], $currentItemId);
                if (results) {
                    return results;
                }
            }
        }

        return null;

    };

    /**
     * Parcours de manière récursive les enfants de l'arbre
     * @param {Object} $rootTree racine du sous-arbre
     */
    var parcoursTreeChildren = function($rootTree, $currentItemId) {
        console.log('element => ' + $rootTree.syllabusElement_id);

        // condition d'arrêt
        if ($rootTree.syllabusElement_id === $currentItemId) {
            // selected item found
            return $rootTree;
        }else {
            if ($rootTree.children) {
                for (var i = 0; i < $rootTree.children.length; i++){
                    var results = parcoursTreeChildren($rootTree.children[i], $currentItemId);
                    if (results) {
                        return results;
                    }                    
                }
            }
        }

    };



}]);



