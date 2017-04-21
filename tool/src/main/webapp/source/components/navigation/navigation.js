tenjinApp.directive('navigation', ['TreeService', 'SyllabusService', 'UserService', function(TreeService, SyllabusService, UserService) {
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
					if (sourceNodeScope.treeOptions.name === destNodesScope.treeOptions.name) {
						if (destNodesScope.item && destNodesScope.item.type === 'composite') {
							// get ancestor for the source node
							var ancestorSrc = $scope.getAncestor(sourceNodeScope);
							// get ancestor for the destination node
							var ancestorDest = $scope.getAncestor(destNodesScope);

							if (sourceNodeScope.item && sourceNodeScope.item.type === 'composite') {
								if (!destNodesScope.$parentNodeScope) {
									return true;
								} else {
									return false;
								}
							} else {
								if (ancestorSrc && ancestorSrc.item && ancestorDest && ancestorDest.item && ancestorSrc.item.id === ancestorDest.item.id) {
									return true;
								}
							}

						}
					}

					return false;
				},

				dropped: function(event) {
					// Numbering
					SyllabusService.numberSyllabus(SyllabusService.syllabus);
				}
			}
		}
	};
}]);
