	
tenjinApp.controller('LeftMenuCtrl', [ '$scope', 'TreeService', 'SyllabusService', function ($scope, TreeService, SyllabusService){
	'use strict';

    $scope.syllabusService = SyllabusService;
    $scope.treeService = TreeService;

    $scope.toggleTree = function (scope) {
		scope.toggle();
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
                    // console.log("ancetre src => " + ancetreSrc.item.id);
                    // get ancestor for the destination node
                    var ancetreDest = $scope.getAncestor(destNodesScope);
                    // console.log("ancetre dest => " +ancetreDest.item.id);

                    if (sourceNodeScope.item && sourceNodeScope.item.type === 'composite') {
                        // On peut déplacer un composite uniquement dans l'élément parent racine ( qui lui n'a pas de parent )
                        if (!destNodesScope.$parentNodeScope) {
                            return true;
                        }else {
                            return false;
                        }
                    } else {
                        // Le noeud source et destination doivent avoir un ancêtre commun
                        if (ancetreSrc && ancetreSrc.item && ancetreDest && ancetreDest.item && ancetreSrc.item.id === ancetreDest.item.id) {
                            return true;
                        } 
                    }

                }
            }

            return false;
        },

        dropped: function(event) {
            // Numbering
            SyllabusService.numerotationSyllabus(SyllabusService.syllabus);
        },

    };

    

}]);




