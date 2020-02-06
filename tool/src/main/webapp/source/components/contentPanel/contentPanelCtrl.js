tenjinApp.controller('ContentPanelCtrl', ['$scope', '$timeout', 'TreeService', 'UserService', 'SyllabusService', 'config', '$translate', function($scope, $timeout, TreeService, UserService, SyllabusService, config, $translate) {
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
	var currentLanguage = $translate.use();

	$translate.use(SyllabusService.syllabus.locale).then(function() {
		 $scope.DETAILS_TRANSLATE = $translate.instant('DETAILS', null, null, SyllabusService.syllabus.locale);
		 
	});
	$translate.use(currentLanguage);

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
        if (backupSyllabus && !angular.equals(oldValue, backupSyllabus ) && !angular.equals(newValue, backupSyllabus ) && $scope.dropped){
         if ( movedElement){
           //Removed dropped element from top level tree
            var parent = $scope.syllabusService.getParent(destComposite);
            for (var j=0; j < parent.elements.length; j++){
                if (parent.elements[j].id === movedElement.id){
                    parent.elements.splice(j,1);
                }
            }

            var ancestor = $scope.syllabusService.getParent(parent);
            if (ancestor != null){
	             for (var j=0; j < ancestor.elements.length; j++){
	                if (ancestor.elements[j].id === movedElement.id){
	                    ancestor.elements.splice(j,1);
	                }
		        }
			}

            //Make sure the destination is ready to add element
            if (!destComposite.elements){
                destComposite.elements = [];
            }

            //Check if destination has the rubric
            for (var i=0; i < destComposite.elements.length; i++){
                if (destComposite.elements[i].title === sourceRubric.title){
                    existingRubric = true;
                    destRubric = destComposite.elements[i];
                }
            }

            //Add rubric if not the case
            if (!existingRubric){
            	var destinationTemplateStructureId = $scope.syllabusService.getTemplateStructureId(destComposite, sourceRubric.title);
                destRubric = {
                    'id': $scope.syllabusService.getTemporaryId(),
                    'attributes': {},
                    'type': sourceRubric.type,
                    'composite': true,
                    'parentId': destComposite.id,
                    'templateStructureId': destinationTemplateStructureId,
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
		// Renumbering in case evaluations changed position
		SyllabusService.numberSyllabus(SyllabusService.syllabus);

  	 }, true);


	$scope.treeOptions = {
		name: "contentPanelTree",
		item: TreeService.selectedElement,
		dragStart: function () {
			SyllabusService.editingElement = true;
		}, 

		dragStop: function () {
			SyllabusService.editingElement = false;
		},

		accept: function (sourceNodeScope, destNodesScope, destIndex) {

			// don't allow drop outside rubrics or in provided elements
			var templateStructureId = destNodesScope.$element.attr('data-templatestructure-id');
			var providerId = destNodesScope.$element.attr('data-provider-id');
			var common = destNodesScope.$element.attr('data-common');
			var destElemId = destNodesScope.$element.attr('data-elem-id');
			var isSyllabusCommon = SyllabusService.getSyllabus().common;

			var addableTypes = SyllabusService.getAddableElementsFromTemplateRuleId(templateStructureId);

			console.log("parentid:" + sourceNodeScope.$modelValue.parentId + " destid: "+destElemId);
			if (typeof providerId != 'undefined' && providerId !== null && providerId !== "") {
				return false;
			} else if (sourceNodeScope.$modelValue.common === true && common === 'false') {
				return false;
			} else if (sourceNodeScope.$modelValue.common === true && !isSyllabusCommon && sourceNodeScope.$modelValue.parentId != destElemId) {
				return false;
			} else if (addableTypes !== null && addableTypes.length > 0) {
				for (var i = 0; i < addableTypes.length; i++) {
					if (addableTypes[i].type === sourceNodeScope.$modelValue.type) {
						return true;
					}
				}
			}
			return false;

		},
		dropped: function(event) {
			var destTreeName = event.dest.nodesScope.$treeScope.$parent.treeOptions.name;
			//Drag and drop between 2 trees
			if (destTreeName === "navigationTree"){ 	
				movedElement = event.source.nodeScope.$modelValue;
				sourceRubric = $scope.treeService.findElementParent(movedElement);
				destComposite = event.dest.nodesScope.$modelValue[event.dest.index-1];
				//If we are moving under a cluster, go to last element of the cluster
				if (destComposite.templateStructureId === 17){
					destComposite = destComposite.elements[destComposite.elements.length-1];
				}
				destRubric = null;
				existingRubric = false;
				$scope.$emit('elementDropped');
				$scope.dropped = true;
				backupSyllabus = angular.copy($scope.syllabusService.syllabus);
			}
		}
	};
}]);
