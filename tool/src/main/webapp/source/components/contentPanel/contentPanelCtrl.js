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

		beforeDrop: function (event){
			//console.table(event.source.nodeScope.item);
			console.log (event.dest.nodesScope.isParent(event.source.nodeScope))
			console.log(event);
			//console.table(event.dest.nodesScope.$nodeScope);
			//Do not drop out of current tree

			//We are moving elements under same parent
			var sameParent = event.dest.nodesScope.isParent(event.source.nodeScope);

			//We are not taking an element (document, text, link ...) to a rubric levent 
			var rubricLevel = false;
			if (event.dest.nodesScope.$modelAttributes){
				for ( var i=0;i<event.dest.nodesScope.$modelValue.length; i++){
					if (event.dest.nodesScope.$modelAttributes[i].type === 'rubric')
						rubricLevel=true;
				}
			}
			console.log(rubricLevel);

			if (sameParent)
				return true;
			else
				return false;
		}
		/*accept: function(sourceNodeScope, destNodesScope, destIndex) {
			// test if nodes come from the same tree
			if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name) {
				if (destNodesScope.item) {
					console.table(destNodesScope.item);
					console.log('destNodesScope.item: ' + destNodesScope.item + ' sourceNodeScope.item ' + sourceNodeScope.item + ' destIndex ' + destIndex);
					console.table(sourceNodeScope.item);
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
		}*/,


		dropped: function(event) {
			var srcItem = event.source.nodesScope.item;
			var destItem = event.dest.nodesScope.item;

			// Numbering
			SyllabusService.numberSyllabus(SyllabusService.syllabus);
		}
	};
}]);
