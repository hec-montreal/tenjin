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
			$scope.tabIndex = 1;

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
					if (destIndex === 0 || destIndex >= destNodesScope.$modelValue.length || destNodesScope.$element.attr('data-nodrop-enabled') || destNodesScope.nodropEnabled) {
						$scope.acceptDrop = null;
						return false;
					} else {
						var parentSource = $scope.treeService.findElementParent(sourceNodeScope.$modelValue);
						var ancestorSource = $scope.treeService.findElementParent(parentSource);
						var destComposite = destNodesScope.$modelValue[destIndex];
						var isSyllabusCommon = $scope.syllabusService.getSyllabus().common;

						if (typeof destComposite === 'undefined') {
							return false;
						} else if (sourceNodeScope.$modelValue.common === true && destComposite.common === 'false') {
							return false;
						} else if (sourceNodeScope.$modelValue.common && !isSyllabusCommon) {
							return false;
						}

						//Only drop content from a tutorial and a lecture
						if (ancestorSource.type !== 'tutorial' && ancestorSource.type !== 'lecture') {
							return false;
						}

						$scope.acceptDrop = destComposite.id;
						//Remove course dropzone highlight
						$timeout(function() {
							$scope.acceptDrop = null;
						}, 1000, true);

						return true;
					}
				}
			};

			$scope.isCheckIconVisible = function(item) {
				return SyllabusService.isCheckFeatureVisibleForStudent() && (item.type === 'lecture' || item.type === 'tutorial');
			}

			$scope.getCheckableLectureClass = function(item) {
				var checkable = SyllabusService.countCheckableElements(item);

				if (checkable === 0) {
					return 'not-completed glyphicon-minus'
				}

				if (checkable === SyllabusService.countCheckedElements(item)) {
					return 'completed glyphicon-ok';
				}

				return "not-completed glyphicon-ok";
			}
		}
	};
}]);
