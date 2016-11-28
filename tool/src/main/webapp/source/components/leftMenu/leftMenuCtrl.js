tenjinApp.controller('LeftMenuCtrl', ['$scope', 'TreeService', 'SyllabusService', function($scope, TreeService, SyllabusService) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.treeService = TreeService;

	$scope.toggleTree = function(scope) {
		scope.toggle();
	};

	$scope.getAncestor = function($node) {
		if ($node.$parentNodeScope) {
			return $scope.getAncestor($node.$parentNodeScope);
		} else {
			return $node;
		}
	};

	$scope.treeOptions = {
		name: "leftMenuTree",

		accept: function(sourceNodeScope, destNodesScope, destIndex) {
			if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name) {
				if (destNodesScope.item && destNodesScope.item.type === 'composite') {
					// get ancestor for the source node
					var ancestorSrc = $scope.getAncestor(sourceNodeScope);
					// get ancestor for the destination node
					var ancestorDest = $scope.getAncestor(destNodesScope);

					if (sourceNodeScope.item && sourceNodeScope.item.type === 'composite') {
						if (!destNodesScope.$parentNodeScope) {
							return true;
						} else {
							return false;
						}
					} else {
						if (ancestorSrc && ancestorSrc.item && ancestorDest && ancestorDest.item && ancestorSrc.item.id === ancestorDest.item.id) {
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
		}
	};
}]);
