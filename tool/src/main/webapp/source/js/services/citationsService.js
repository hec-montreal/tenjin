tenjinApp.service('CitationsService', ['$resource', function($resource) {
	'use strict';

	var siteCitationsProviderUri = "../../../../../direct/citation/list";

	var load = function($citationListId) {
		return $resource(siteCitationsProviderUri + $citationListId + ".json").get({
			nocache: {}
		});
	};

	/**
	 * Load the citation list
	 * @param {Object} $rootTree root tree
	 * @param {Array} $resourceIds list of resource ids (inout param)
	 * @param {Array} $promises list of promises to be resolved (inout param)
	 */
	var loadCitationLists = function($rootTree, $resourceIds, $promises) {
		var citationList;
		if ($rootTree.type === "citationList") {
			citationList = load($rootTree.resourceId);
			$promises.push(citationList.$promise);
			$resourceIds.push($rootTree.resourceId);
		} else {
			for (var i = 0; i < $rootTree.resourceChildren.length; i++) {
				loadCitationLists($rootTree.resourceChildren[i], $resourceIds, $promises);
			}
		}
	};

	/**
	 * Get the citation list
	 * @param {Object} $rootTree root tree
	 */
	this.getCitationLists = function($rootTree) {
		var resourceIds = [];
		var promises = [];

		loadCitationLists($rootTree, resourceIds, promises);

		var promisesList = {
			promises: promises,
			resourceIds: resourceIds
		};

		return promisesList;
	};

	/**
	 * Update json properties for the citations
	 * @param {String} $citationListId Id of the citation list
	 * @param {Array} $citations List of citations
	 */
	this.updateJsonProperties = function($citationListId, $citations) {
		for (var i = 0; i < $citations.length; i++) {
			$citations[i].resourceId = $citationListId + '/' + $citations[i].id;
			$citations[i].type = 'citation';
			$citations[i].name = $citations[i].values.title + ' (' + $citations[i].type + ')';
		}
		return $citations;
	};

}]);
