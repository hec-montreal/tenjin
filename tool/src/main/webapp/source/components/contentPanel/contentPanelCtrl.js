
opensyllabusApp.controller('ContentPanelCtrl', ['$scope','$timeout', 'TreeService', 'SyllabusService', 'config' , function ($scope, $timeout, TreeService, SyllabusService, config){
    'use strict';

    $scope.syllabusService = SyllabusService;
    $scope.treeService = TreeService;

    $scope.getAncestor = function($node){
        if ($node.$parentNodeScope) {
            return $scope.getAncestor($node.$parentNodeScope);
        } else {
            return $node;
        }
    };

    $scope.getAncestorList = function($node){
        if ($node.$parentNodeScope) {
            return $scope.getAncestor($node.$parentNodeScope);
        } else {
            return $node;
        }
    };


    $scope.treeOptions = {

        name: "contentPanelTree",

        item: TreeService.selectedItem,

        accept: function(sourceNodeScope, destNodesScope, destIndex) {
            // test
            return true;

            // test si les noeuds proviennent du même arbre
            if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name ) {

                if (destNodesScope.item) {

                    if ( destNodesScope.item.type === 'composite' || destNodesScope.item.type === 'lecture' || destNodesScope.item.type === 'tutorial' || destNodesScope.item.type === 'evaluation' || destNodesScope.item.type === 'exam' ) {

                        // on ne peut pas déplacer un composite dans un composite
                        if (sourceNodeScope.item.type === 'composite' && destNodesScope.item.type === 'composite')                                 {
                            return false;
                        } else {

                            return true;
                        }

                    } else {
                        // drag and drop entre éléments

                        return true;
                    }

                } else {

                    // on est à la racine
                    return true;
                }

            }

            return false;
        },


        dropped: function(event) {

            var srcItem = event.source.nodesScope.item;
            var destItem = event.dest.nodesScope.item;

            console.log('dropped');

            if (srcItem && destItem && srcItem.id === destItem.id ) {
                // ex : déplacement au sein d'une même rubrique
                console.log("save une rubrique"); 

            } else{ 
                // recherche ancêtre commun
                console.log("save selected item"); 

            }


            // numerotation
            SyllabusService.numerotationSyllabus(SyllabusService.syllabus);
        },

    };

}]);



