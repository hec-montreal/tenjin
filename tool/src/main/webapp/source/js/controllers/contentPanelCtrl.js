
opensyllabusApp.controller('ContentPanelCtrl', ['$scope', function ($scope, $modal){
    'use strict';


    $scope.getAncestor = function($node){
        if ($node.$parentNodeScope) {
            return $scope.getAncestor($node.$parentNodeScope);
        } else {
            return $node;
        }
    };


    $scope.treeOptions = {

        accept: function(sourceNodeScope, destNodesScope, destIndex) {

            if (destNodesScope.item) {

                if ( destNodesScope.item.type === 'composite' || destNodesScope.item.type === 'course_lecture' || destNodesScope.item.type === 'evaluation' ) {
                    
                    // on ne peut pas déplacer un composite dans un composite
                    if (sourceNodeScope.item.type === 'composite' && destNodesScope.item.type === 'composite')                                 {
                        return false;
                    } else {
                        return true;
                    }
                }  

            } else {
                return true;
            }

 


            // // Le noeud destination doit être un noeud de type composite
            // if (destNodesScope.item && (destNodesScope.item.type === 'composite' || destNodesScope.item.type === 'course_lecture' || destNodesScope.item.type === 'evaluation')  ) {

            //     var ancetreSrc = $scope.getAncestor(sourceNodeScope);
            //     console.log("ancetre src => " + ancetreSrc.item.syllabusElement_id);
            //     var ancetreDest = $scope.getAncestor(destNodesScope);
            //     console.log("ancetre dest => " +ancetreDest.item.syllabusElement_id);


            //     // if (sourceNodeScope.item && sourceNodeScope.item.attributes && sourceNodeScope.item.type === 'composite') {
            //     //     if (sourceNodeScope.$parentNodeScope.item.syllabusElement_id === ancetreSrc.item.syllabusElement_id) {
            //     //         return true;
            //     //     }else {
            //     //         return false;
            //     //     }
            //     // } else {
            //         // Le noeud source et destination doivent avoir un ancêtre commun
            //         if (ancetreSrc && ancetreSrc.item && ancetreDest && ancetreDest.item && ancetreSrc.item.syllabusElement_id === ancetreDest.item.syllabusElement_id) {
            //             return true;
            //         } 
            //     // }

            // }

            return false;
        },
    };

}]);



