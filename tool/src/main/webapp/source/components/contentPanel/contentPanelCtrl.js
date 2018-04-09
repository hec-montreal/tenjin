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

		beforeDrop: function (e){
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
			else if (e.dest.index === 0 && e.dest.nodesScope.$nodeScope === null &&
				(e.dest.nodesScope.$modelValue[e.dest.index].type !== 'lecture'
					&& e.dest.nodesScope.$modelValue[e.dest.index].type !== 'tutorial'
					&& e.dest.nodesScope.$modelValue[e.dest.index].type !== 'exam'
					&& e.dest.nodesScope.$modelValue[e.dest.index].type !== 'evaluation')){
				return false;
			}
			else {
				return true;
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
