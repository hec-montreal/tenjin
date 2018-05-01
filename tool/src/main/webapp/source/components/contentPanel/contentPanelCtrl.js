tenjinApp.controller('ContentPanelCtrl', ['$scope', '$timeout', 'TreeService', 'UserService', 'SyllabusService', 'config', function($scope, $timeout, TreeService, UserService, SyllabusService, config) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.treeService = TreeService;
    $scope.dropped = false;
	//Variables used for drag and drop
	var movedElement = null;
	//Rubric where the element originally was
	var sourceRubric = null;
	//Lecture, Evaluation, Presentation ... to drop the element
	var destComposite = null;
	//Rubric where the element will be added
	var destRubric = null;
	//New rubric or existing rubric
	var existingRubric = false;

	var backupSyllabus = null;

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


	$scope.$watch('syllabusService.syllabus',
		function(newValue, oldValue) {

		var foundElement = null;
        if (backupSyllabus && !angular.equals(oldValue, backupSyllabus ) && $scope.dropped){
         if ( movedElement){
            //Removed dropped element from top level tree
            var parent = $scope.syllabusService.getParent(destComposite);
            for (var j=0; j < parent.elements.length; j++){
                if (parent.elements[j].id === movedElement.id){
                    parent.elements.splice(j,1);
                }
            }

            //Make sure the destination is ready to add element
            if (!destComposite.elements){
                destComposite.elements = [];
            }

            //Check if destination has the rubric
            for (var i=0; i < destComposite.elements.length; i++){
                if (destComposite.elements[i].templateStructureId === sourceRubric.templateStructureId){
                    existingRubric = true;
                    destRubric = destComposite.elements[i];
                }
            }

            //Add rubric if not the case
            if (!existingRubric){
                destRubric = {
                    'id': $scope.syllabusService.getTemporaryId(),
                    'attributes': {},
                    'type': sourceRubric.type,
                    'composite': true,
                    'parentId': destComposite.id,
                    'templateStructureId': sourceRubric.templateStructureId,
                    'availabilityStartDate': Date.now(),
                    'title': sourceRubric.title,
                    'important': false,
                    'publicElement': true,
                    'common': $scope.syllabusService.syllabus.common
                };
                $scope.syllabusService.addRubricToSyllabusElement(destComposite, destRubric);
            }

            //Add moved element at the end of the rubric
            if (!destRubric.elements) {
                destRubric.elements = [];
            }
            movedElement.parentId = destRubric.id;
            destRubric.elements.push(movedElement);

         }
            $scope.dropped = false;
        }
  	 }, true);


	$scope.treeOptions = {
		name: "contentPanelTree",
		item: TreeService.selectedElement,

		beforeDrop: function (e){
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
			var destTreeName = event.dest.nodesScope.$treeScope.$parent.treeOptions.name;
			//Drag and drop between 2 trees
			if (destTreeName === "navigationTree"){ 	
				movedElement = event.source.nodeScope.$modelValue;
                sourceRubric = $scope.treeService.findElementParent(movedElement);
				destComposite = event.dest.nodesScope.$modelValue[event.dest.index-1];
				destRubric = null;
				existingRubric = false;
				$scope.$emit('elementDropped');
				$scope.dropped = true;
				backupSyllabus = angular.copy($scope.syllabusService.syllabus);

			}	
			// Numbering
				SyllabusService.numberSyllabus(SyllabusService.syllabus);		
		
		}
	};

}]);
