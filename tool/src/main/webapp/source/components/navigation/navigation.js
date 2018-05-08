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
					//Do not allow drop under blocked node or at first place
					if (destIndex === 0 || destIndex >= destNodesScope.$modelValue.length || destNodesScope.$element.attr('data-nodrop-enabled') || destNodesScope.nodropEnabled){
						$scope.acceptDrop = null;
						return false;
					}else {
						var parentSource = $scope.treeService.findElementParent(sourceNodeScope.$modelValue);
						var ancestorSource = $scope.treeService.findElementParent(parentSource);
						var destComposite = destComposite = destNodesScope.$modelValue[destIndex];
						if (typeof destComposite === 'undefined'){
							return false;
						}
						//Only drop content from a tutorial and a lecture
						if (ancestorSource.type !== 'tutorial' && ancestorSource.type !== 'lecture'){
							return false;
						}

						$scope.acceptDrop = destComposite.id;
						//Remove course dropzone highlight
						$timeout(function(){
                          $scope.acceptDrop=null;
                        },1000,true);
 
						return true;
					}
				}
			};
		}
	};
}]);
