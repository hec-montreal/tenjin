tenjinApp.directive('resourceBrowser', ['SakaiToolsService', 'ResourcesService', 'UserService', 'SyllabusService', '$timeout', '$translate', function(SakaiToolsService, ResourcesService, UserService, SyllabusService, $timeout, $translate) {
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

			$scope.setSelectedResource = function(item) {
				$scope.element.$selectedResource = item;
				$scope.element.title = item.name;

				console.log("Set selected resource");
				console.log($scope.element);
				console.log(item);

				if ($scope.type === 'sakai_entity') {
					$scope.element.attributes.sakaiToolId = item.resourceId;
				} else if ($scope.type === 'image') {
					$scope.element.attributes.imageId = item.resourceId;
				} else if ($scope.type === 'citation') {
					$scope.element.attributes.citationId = item.resourceId;
				} else if ($scope.type === 'document') {
					$scope.element.attributes.documentId = item.resourceId;
				}
			};

			$scope.isResourceVisible = function(res) {
				var syllabusSections = SyllabusService.getSyllabus().sections;
				var allSections = UserService.getProfile().sections;

				// No section assigned to syllabus
				// Res must be assigned to no sections or all sections
				if (syllabusSections.length === 0) {
					if (!res.sections) {
						return true;
					}

					return res.sections.length === 0;
				} else {
					// Sections are assigned to syllabus
					// Res must have syllabus section or no sections
					if (!res.sections || res.sections.length === 0) {
						return true;
					}

					// Check for intersection between res sections and syllabus sections
					for (var i = 0; i < res.sections.length; i++) {
						for (var j = 0; j < syllabusSections.length; j++) {
							if (res.sections[i] === syllabusSections[j]) {
								return true;
							}
						}
					}

					return false;
				}
			};

			$scope.itemInfo = function(item) {
				var ret = "";

				if (item.type && item.type === 'citation' && item.parentId) {
					item = ResourcesService.getResource(item.parentId);
				}

				if (item.hidden && !item.release) {
					ret = $translate.instant('HIDDEN_BY_RESOURCE_FLAG');
				} else if (item.release) {
					var start = moment(item.release.time);
					var end;
					var fmt = 'YYYY-MM-DD';

					if (item.retract) {
						end = moment(item.retract.time);
					}

					if (!end) {
						ret = $translate.instant('ELEMENT_HIDDEN_BEFORE') + start.format(fmt);
					} else {
						ret = $translate.instant('ELEMENT_HIDDEN_BETWEEN')
							.replace('%1', start.format(fmt))
							.replace('%2', end.format(fmt));
					}
				}

				return ret.length > 0 ? "(" + ret + ")" : "";
			}
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
