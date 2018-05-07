tenjinApp.directive('navigation', ['TreeService', 'SyllabusService', 'UserService', '$timeout', function(TreeService, SyllabusService, UserService, $timeout) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'navigation/navigation.html',

		controller: function($scope, $rootScope) {
			$scope.syllabusService = SyllabusService;
			$scope.treeService = TreeService;
			$scope.closed = false;
			$scope.userService = UserService;
			$scope.acceptDrop = null;

			$scope.isTitleNumbered = function($type) {
				if ($type === 'exam' || $type === 'evaluation' ||
					$type === 'lecture' || $type === 'tutorial') {
						return true;
				}
				return false;
			}

			$scope.toggleDrawer = function() {
				$scope.$emit('navigationToggled');
			};

			$scope.getAncestor = function($node) {
				if ($node.$parentNodeScope) {
					return $scope.getAncestor($node.$parentNodeScope);
				} else {
					return $node;
				}
			};

			$scope.$on("syllabusService:save", function() {
				TreeService.selectElement(TreeService.findElementByPosition(TreeService.lastSelectedPosition));
			});


			$scope.treeOptions = {
				name: 'navigationTree',
				accept: function(sourceNodeScope, destNodesScope, destIndex) {
					var sourceRubricElement = null;
					var sourceComposite = null;
					var destComposite = null;
					var destTemplateRules = null;
					var templateRuleAddableElements = [];

					//Do not allow drop under blocked node
					if (destNodesScope.nodropEnabled){
						return false;
					}
					sourceRubricElement = $scope.treeService.findElementParent(sourceNodeScope.$modelValue);
					sourceComposite = $scope.treeService.findElementParent(sourceRubricElement);
					//Element will be moved in previous sibling of destination
					destComposite = destNodesScope.$modelValue[destIndex];
					//Do not allow drop if destination is undefined
					if (destComposite === undefined){
						return false;
					}

					//Top level of tree
					if (destComposite.templateId){
						return false;
					}

					//Under Evaluations, Organisation du cours ou Regroupements
					if (destComposite.templateStructureId === 12 || destComposite.templateStructureId === 14 || destComposite.templateStructureId === 17){
						return false;
					}

					if (destComposite && destComposite.templateStructureId){
						//Do not allow drop under the same element
						if (sourceComposite.id === destComposite.id){
							$scope.acceptDrop = null;
							return false;
						}
						//Check if same rubric is allowed by the template in source and destination element
						destTemplateRules = $scope.syllabusService.getAddableElementsFromTemplateRules(destComposite);
						angular.forEach(destTemplateRules, function(s){
							if (s.label === sourceRubricElement.title)
								templateRuleAddableElements.push(s.id);
 						});
 						//Allow drop if the same rubric is allowed in both
						if (templateRuleAddableElements.length > 0){
							$scope.acceptDrop = destComposite.id;
							//Remove course/evaluation dropzone highlight
							$timeout(function(){
                              $scope.acceptDrop=null;
                                  },1000,true);
							return true;
						}
					}
				
					$scope.acceptDrop = null;
					return false;
					
				}
			};
		}
	};
}]);
