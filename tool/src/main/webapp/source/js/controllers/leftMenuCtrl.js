	
opensyllabusApp.controller('LeftMenuCtrl', [ '$scope', '$timeout', 'TreeService' , function ($scope, $timeout, TreeService){
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

        if ($scope.infos.selectedItem && $item.syllabusElement_id !== $scope.infos.selectedItem.syllabusElement_id ) {         
            // permet de déselectionner l'élément précédemment sélectionné
            TreeService.unselectTree($scope.syllabus);
            $item.selected = true;
            $scope.infos.selectedItem = $item;

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });
        }



	};

    

}]);




