
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

            // test if nodes come from the same tree
            if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name ) {

                if (destNodesScope.item) {

                    if ( destNodesScope.item.type === 'composite' || destNodesScope.item.type === 'lecture' || destNodesScope.item.type === 'tutorial' || destNodesScope.item.type === 'evaluation' || destNodesScope.item.type === 'exam' ) {

                        // a composite element can't be moved inside another composite element
                        if (sourceNodeScope.item.type === 'composite' && destNodesScope.item.type === 'composite')                                 {
                            return false;
                        } else {

                            return true;
                        }

                    } else {
                        // drag and drop between elements
                        return true;
                    }

                } else {

                    // root level
                    return true;
                }

            }

            return false;
        },


        dropped: function(event) {

            var srcItem = event.source.nodesScope.item;
            var destItem = event.dest.nodesScope.item;

            // console.log('dropped');

            // TEST : save only some elements
            // if (srcItem && destItem && srcItem.id === destItem.id ) {
            //     // ex : déplacement au sein d'une même rubrique
            //     console.log("save une rubrique"); 

            // } else{ 
            //     // recherche ancêtre commun
            //     console.log("save selected item"); 
            // }


            // Numbering
            SyllabusService.numerotationSyllabus(SyllabusService.syllabus);
        },

    };

}]);



