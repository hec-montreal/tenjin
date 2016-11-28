tenjinApp.directive('mobileMenu', ['TreeService', 'SyllabusService', function(TreeService, SyllabusService) {
    'use strict';

    return {
        scope: {},

        restrict: 'E',

        templateUrl: 'mobileMenu/mobileMenu.html',

        controller: function() {
            this.syllabusService = SyllabusService;
            this.treeService = TreeService;
            this.showBackButton = false;

            this.toggleTree = function(scope) {
                scope.toggle();
            };

            this.getAncestor = function($node) {
                if ($node.$parentNodeScope) {
                    return this.getAncestor($node.$parentNodeScope);
                } else {
                    return $node;
                }
            };

            this.collapse = function(scope) {
                scope.collapse();
            };

            this.navigate = function(scope, $item) {

                var currentItemViewed = TreeService.getViewedElement();
                if (typeof(currentItemViewed) === "undefined" || $item.id !== TreeService.getViewedElement().id) {
                    if ($item.type === 'evaluation' ||
                        $item.type === 'exam' ||
                        $item.type === 'lecture' ||
                        $item.type === 'tutorial') {
                        SyllabusService.showMobileMenu = false;
                    } else if (!$item.elements ||
                        $item.elements.length === 0 ||
                        $item.elements[0].type === "rubric") {
                        SyllabusService.showMobileMenu = false;
                    } else {
                        TreeService.setViewedElement($item);
                        this.showBackButton = true;
                        SyllabusService.hideItems($item);
                    }

                    TreeService.setSelectedItem($item);

                }
            };

            this.back = function() {
                var item = TreeService.getViewedElement();
                var itemParent = SyllabusService.getParent(item);

                if (itemParent) {
                    TreeService.setViewedElement(itemParent);
                    SyllabusService.hideItems(itemParent);
                } else {
                    TreeService.setViewedElement(undefined);
                    SyllabusService.hideItemsInit();
                    SyllabusService.navigation.level = 1;
                }

                if (SyllabusService.navigation.level === 1) {
                    this.showBackButton = false;
                }

            };

            this.treeOptions = {

                name: "leftMenuTree",

                accept: function(sourceNodeScope, destNodesScope, destIndex) {

                    if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name) {
                        if (destNodesScope.item && destNodesScope.item.type === 'composite') {
                            // get ancestor for the source node
                            var ancetreSrc = this.getAncestor(sourceNodeScope);

                            // get ancestor for the destination node
                            var ancetreDest = this.getAncestor(destNodesScope);


                            if (sourceNodeScope.item && sourceNodeScope.item.type === 'composite') {
                                // On peut déplacer un composite uniquement dans l'élément parent racine ( qui lui n'a pas de parent )
                                if (!destNodesScope.$parentNodeScope) {
                                    return true;
                                } else {
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
        bindToController: {}

    };

}]);
