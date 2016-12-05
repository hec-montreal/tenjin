tenjinApp.directive('resourceBrowser', ['SakaiToolsService', 'ResourcesService', '$timeout', function(SakaiToolsService, ResourcesService, $timeout) {
	'use strict';

	return {
		scope: {
			element: '=',
			type: '@',
			collapseAll: '=',
			title: '='
		},

		restrict: 'E',

		templateUrl: 'resourceBrowser/resourceBrowser.html',

		controller: function($scope) {
			if ($scope.type === 'sakai_entity') {
				$scope.resources = SakaiToolsService.getToolEntities();
			} else {
				$scope.resources = ResourcesService.resources;
			}

			$scope.browserOptions = {
				name: 'browserTree',

				accept: function(sourceNodeScope, destNodesScope, destIndex) {
					return false;
				}
			};

			$scope.toggleTree = function(scope) {
				scope.toggle();
			};

			$scope.setSelectedResource = function($item) {
				console.log('Browser selected resource:');
				console.log($item);

				$scope.element.$selectedResource = $item;

				if ($scope.type === 'sakai_entity') {
					$scope.element.attributes.sakaiToolId = $item.resourceId;
				} else if ($scope.type === 'image') {
					$scope.element.attributes.imageId = $item.resourceId;
				} else if ($scope.type === 'citation') {
					$scope.element.attributes.citationId = $item.resourceId;
				} else if ($scope.type === 'document') {
					$scope.element.attributes.documentId = $item.resourceId;
				} else {

				}
			};
		},

		link: function($scope, $element) {
			var resource;

			if ($scope.element.attributes.documentId) {
				resource = ResourcesService.getResource($scope.element.attributes.documentId);
			} else if ($scope.element.attributes.imageId) {
				resource = ResourcesService.getResource($scope.element.attributes.imageId);
			} else if ($scope.element.attributes.citationId) {
				resource = ResourcesService.getResource($scope.element.attributes.citationId);
			} else if ($scope.element.attributes.sakaiToolId) {
				resource = SakaiToolsService.getEntity($scope.element.attributes.sakaiToolId);
			}

			if (resource) {
				$scope.element.$selectedResource = resource;
			} else {

			}

			// Angular 1 is terrible, the $scope is empty on ui-tree-node so we have to pass
			// attributes by javascript.
			$timeout((function() {
				if ($scope.collapseAll) {
					var els = document.getElementsByClassName('toCollapse');

					for (var i = 0; i < els.length; i++) {
						var el = angular.element(els[i]);

						el.scope().collapse();
					}
				}
			}));
		}
	};
}]);
