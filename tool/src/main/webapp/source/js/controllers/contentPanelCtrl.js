
opensyllabusApp.controller('ContentPanelCtrl', ['$scope','$timeout', 'TreeService', function ($scope, $timeout, TreeService){
    'use strict';



    $scope.getAncestor = function($node){
        if ($node.$parentNodeScope) {
            return $scope.getAncestor($node.$parentNodeScope);
        } else {
            return $node;
        }
    };


    $scope.select = function($item){

        if ($scope.infos.selectedItem && $item.id !== $scope.infos.selectedItem.id ) {         
            // permet de déselectionner l'élément précédemment sélectionné
            TreeService.unselectTree($scope.syllabus);
            $item.selected = true;
            $scope.infos.selectedItem = $item;

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });
        }

    };

    $scope.treeOptions = {  

        name: "contentPanelTree",

        accept: function(sourceNodeScope, destNodesScope, destIndex) {

            // test si les noeuds proviennent du même arbre
            if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name ) {

                if (destNodesScope.item) {

                    if ( destNodesScope.item.type === 'composite' || destNodesScope.item.type === 'course_lecture' || destNodesScope.item.type === 'evaluation' ) {
                        
                        // on ne peut pas déplacer un composite dans un composite
                        if (sourceNodeScope.item.type === 'composite' && destNodesScope.item.type === 'composite')                                 {
                            return false;
                        } else {
                            return true; 
                        }

                    } else {
                        return true;
                    }  

                } else {
                    // on est à la racine
                    return true;
                }

            }

            return false;
        },
    };

}]);



