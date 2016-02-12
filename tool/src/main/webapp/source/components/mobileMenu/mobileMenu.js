
opensyllabusApp.directive('mobileMenu', ['$timeout', 'TreeService', 'SyllabusService', 'variables', function ($timeout, TreeService, SyllabusService, variables){
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'mobileMenu/mobileMenu.html',
        controller: function () {
            this.syllabusService = SyllabusService;
            this.treeService = TreeService;
            this.variables = variables;
            this.showBackButton = false;

            this.toggleTree = function (scope) {
                scope.toggle();
            };

            this.getAncestor = function($node){
                if ($node.$parentNodeScope) {
                    return this.getAncestor($node.$parentNodeScope);
                } else {
                    return $node;
                }
            };

            this.collapse = function (scope) {
                scope.collapse();
            };

            this.navigate = function(scope, $item) {
                
                var currentItemViewed = TreeService.getViewedItem();
                // Si il n'y a aucun dernier item vu défini
                // Ou si on clique sur l'item en cours de visualiation
                if (typeof(currentItemViewed) === "undefined" || $item.id !== TreeService.getViewedItem().id ) {

                    // Si il n'y a aucun élément enfant alos on referme le menu
                    if ($item.type === 'evaluation' || 
                        $item.type === 'lecture' || 
                        $item.type === 'tutorial' ) {
                        SyllabusService.showMobileMenu = false;
                    } // si il n'y a aucun élément enfant ou bien que celui-ci est directement une rubrique
                    else if (!$item.elements ||
                                $item.elements.length === 0 || 
                                $item.elements[0].type === "rubric") {
                        SyllabusService.showMobileMenu = false;
                    }else {
                        TreeService.setViewedItem($item);
                        this.showBackButton = true;
                        SyllabusService.hideItems($item);
                    }
                    
                    TreeService.setSelectedItem($item);

                }
            };

            this.back = function() {
                // récupère l'item en cours de visualisation
                var item = TreeService.getViewedItem();
                // récupère le parent de l'item en cours de visualisation
                var itemParent = SyllabusService.getParent(item);
                if (itemParent) {
                    // si il y a un item parent alors celui-ci devient le nouvel item en cours de visualisation
                    TreeService.setViewedItem(itemParent);
                    // cache tous les éléments sauf l'item sélectionné et ses enfants directs
                    SyllabusService.hideItems(itemParent);
                } else {
                    // racine
                    TreeService.setViewedItem(undefined);
                    // affiche les éléments de premier niveau uniquement
                    SyllabusService.hideItemsInit();
                    SyllabusService.navigation.level = 1;
                }

                // on masque le bouton retour si on est au premier niveau
                if ( SyllabusService.navigation.level === 1 ) {
                    this.showBackButton = false;
                }

            };

            this.treeOptions = {

                name: "leftMenuTree",

                accept: function(sourceNodeScope, destNodesScope, destIndex) {
         
                    // test si les noeuds proviennent du même arbre
                    if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name ) {

                        // Le noeud destination doit être un noeud de type composite
                        if (destNodesScope.item && destNodesScope.item.type === 'composite' ) {
                            // get ancestor for the source node
                            var ancetreSrc = this.getAncestor(sourceNodeScope);
                            // console.log("ancetre src => " + ancetreSrc.item.id);
                            // get ancestor for the destination node
                            var ancetreDest = this.getAncestor(destNodesScope);
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

                    // numerotation
                    SyllabusService.numerotationSyllabus(SyllabusService.syllabus);
                }
            };

        },
        controllerAs: 'menuMobileCtrl',
        bindToController: {
        }

    };

}]);

