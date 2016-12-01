tenjinApp.service('CitationsService', ['$q', '$http', function($q, $http) {
	'use strict';

	/**
	 * Load a citation list
	 */
	var _loadCitationList = function(citationListId) {
		var tthis = this;
		var def = $q.defer();

		// Strip the starting '/' from the id
		if (citationListId.charAt(0) === '/') {
			citationListId = citationListId.substring(1);
		}

		var b64Path = Base64.encode(citationListId);

		$http({
			method: 'get',
			url: '/direct/citation/list-b64/' + b64Path + '.json'
		}).then(function(response) {
			def.resolve(response.data);
		}, function(reason) {
			def.reject(reason);
		});

		return def.promise;
	};

	/*
	 * Recursivly load citation lists in a resource tree
	 */
	var _loadCitationLists = function(rootTree, resourceIds, promises) {
		if (rootTree.type === 'citationList') {
			promises.push(_loadCitationList(rootTree.resourceId));

			resourceIds.push(rootTree.resourceId);
		} else {
			for (var i = 0; i < rootTree.resourceChildren.length; i++) {
				_loadCitationLists(rootTree.resourceChildren[i], resourceIds, promises);
			}
		}
	};

	/**
	 * Load the citation lists
	 */
	this.loadCitationLists = function(rootTree) {
		var resourceIds = [];
		var promises = [];

		_loadCitationLists(rootTree, resourceIds, promises);

		return {
			promises: promises,
			resourceIds: resourceIds
		};
	};

	/**
	 * Update json properties for the citations
	 * @param {String} $citationListId Id of the citation list
	 * @param {Array} $citations List of citations
	 */
	this.updateJsonProperties = function(citationListId, citations) {
		for (var i = 0; i < citations.length; i++) {
			citations[i].resourceId = citationListId + '/' + citations[i].id;
			citations[i].type = 'citation';
			citations[i].name = citations[i].values.title + ' (' + citations[i].type + ')';
		}

		return citations;
	};
}]);
