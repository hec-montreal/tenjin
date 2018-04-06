tenjinApp.controller('ContentPanelCtrl', ['$scope', '$timeout', 'TreeService', 'UserService', 'SyllabusService', 'config', function($scope, $timeout, TreeService, UserService, SyllabusService, config) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.treeService = TreeService;

	$scope.getAncestor = function($node) {
		if ($node.$parentNodeScope) {
			return $scope.getAncestor($node.$parentNodeScope);
		} else {
			return $node;
		}
	};

	$scope.getAncestorList = function($node) {
		if ($node.$parentNodeScope) {
			return $scope.getAncestor($node.$parentNodeScope);
		} else {
			return $node;
		}
	};

	$scope.treeOptions = {
		name: "contentPanelTree",
		item: TreeService.selectedElement,

/*
		accept: function(sourceNodeScope, destNodesScope, destIndex) {
			// test if nodes come from the same tree
			if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name) {
				if (destNodesScope.item) {
					if (destNodesScope.item.type === 'composite' || destNodesScope.item.type === 'lecture' || destNodesScope.item.type === 'tutorial' || destNodesScope.item.type === 'evaluation' || destNodesScope.item.type === 'exam' || destNodesScope.item.type === 'cluster') {
						// a composite element can't be moved inside another composite element
						if (sourceNodeScope.item.type === 'composite' && destNodesScope.item.type === 'composite') {
							return false;
						} else {
							return true;
						}
					} else {
						// drag and drop between elements
						return true;
					}
				} else {
					return true;
				}
			}

			return false;
		},*/

		beforeDrop: function (e){
			var movedElementType = e.dest.nodesScope.$modelValue[e.dest.index].type;
			//console.table(event.source.nodeScope.item);
			console.log(e);
			//console.table(event.dest.nodesScope.$nodeScope);
			//Do not drop out of current tree

			//Check if the node is moved into into a provided rubric
			if (e.dest.nodesScope.$nodeScope &&  e.dest.nodesScope.$nodeScope.$modelValue && 
				e.dest.nodesScope.$nodeScope.$modelValue !== null && e.dest.nodesScope.$nodeScope.$modelValue.providerId !== null){
				return false;
			}
			//Check if moving at first position
			else if (e.dest.nodesScope.$nodeScope === null && (movedElementType === 'composite' || movedElementType === 'tutorial'
			|| movedElementType === 'exam' || movedElementType === 'lecture' || movedElementType === 'evaluation' )){
				return true;
			}
			else {
				return false;
			}
			
		},
		dropped: function(event) {
			var srcItem = event.source.nodesScope.item;
			var destItem = event.dest.nodesScope.item;

			// Numbering
			SyllabusService.numberSyllabus(SyllabusService.syllabus);
		}
	};
}]);
