	
opensyllabusApp.controller('LeftMenuCtrl', [ '$scope', '$timeout', 'TreeService' , function ($scope, $timeout, TreeService){
	'use strict';

    $scope.toggleTree = function (scope) {
		scope.toggle();
	};

	$scope.select = function($item){

        if ($scope.infos.selectedItem && $item.syllabusElement_id !== $scope.infos.selectedItem.syllabusElement_id ) {         
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

    $scope.getAncestor = function($node){
        if ($node.$parentNodeScope) {
            return $scope.getAncestor($node.$parentNodeScope);
        } else {
            return $node;
        }
    };

    $scope.treeOptions = {

        name: "leftMenuTree",

        accept: function(sourceNodeScope, destNodesScope, destIndex) {
 
            // test si les noeuds proviennent du même arbre
            if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name ) {

                // Le noeud destination doit être un noeud de type composite
                if (destNodesScope.item && destNodesScope.item.type === 'composite' ) {
                    // get ancestor for the source node
                    var ancetreSrc = $scope.getAncestor(sourceNodeScope);
                    // console.log("ancetre src => " + ancetreSrc.item.syllabusElement_id);
                    // get ancestor for the destination node
                    var ancetreDest = $scope.getAncestor(destNodesScope);
                    // console.log("ancetre dest => " +ancetreDest.item.syllabusElement_id);

                    if (sourceNodeScope.item && sourceNodeScope.item.type === 'composite') {
                        // On peut déplacer un composite uniquement dans l'élément parent racine ( qui lui n'a pas de parent )
                        if (!destNodesScope.$parentNodeScope) {
                            return true;
                        }else {
                            return false;
                        }
                    } else {
                        // Le noeud source et destination doivent avoir un ancêtre commun
                        if (ancetreSrc && ancetreSrc.item && ancetreDest && ancetreDest.item && ancetreSrc.item.syllabusElement_id === ancetreDest.item.syllabusElement_id) {
                            return true;
                        } 
                    }

                }
            }

            return false;
        },
    };

    

}]);




