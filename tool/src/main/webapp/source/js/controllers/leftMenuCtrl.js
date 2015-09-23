	
opensyllabusApp.controller('LeftMenuCtrl', [ '$scope', function ($scope){
	'use strict';

    $scope.toggleTree = function (scope) {
		scope.toggle();
	};
	$scope.collapseAll = function () {
		$scope.$broadcast('collapseAll');
	};

	$scope.expandAll = function () {
		$scope.$broadcast('expandAll');
	};

	$scope.remove = function (scope) {
		scope.remove();
	};

 	$scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };

	$scope.newSubItem = function (scope) {
		var nodeData = scope.$modelValue;
		nodeData.nodes.push({
			id: nodeData.id * 10 + nodeData.nodes.length,
			title: nodeData.title + '.' + (nodeData.nodes.length + 1),
			nodes: []
		});
	};

	$scope.select = function($item){
		
		if ($item.syllabusElement_id !== $scope.infos.currentItemId) {
			console.time('select');
			parcoursTree($scope.syllabus);
			$item.selected = true;
			$scope.infos.currentItemId = $item.syllabusElement_id;
			console.timeEnd('select');
		}

	};

    /**
     * Parcours de l'arbre
     * @param {Object} $rootTree racine de l'arbre
     */
	var parcoursTree = function($rootTree) {
		if ($rootTree.syllabusElements) {
			for (var i = 0; i < $rootTree.syllabusElements.length; i++){
				$rootTree.syllabusElements[i].selected = false;
				parcoursTreeChildren($rootTree.syllabusElements[i]);
			}
		}
	};

    /**
     * Parcours de manière récursive les enfants de l'arbre
     * @param {Object} $rootTree racine du sous-arbre
     */
	var parcoursTreeChildren = function($rootTree) {
		if ($rootTree.children) {
			for (var i = 0; i < $rootTree.children.length; i++){
				$rootTree.children[i].selected = false;
				parcoursTreeChildren($rootTree.children[i]);
			}
		}
	};

}]);




