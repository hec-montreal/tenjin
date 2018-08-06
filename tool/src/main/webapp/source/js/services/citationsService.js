tenjinApp.service('CitationsService', ['$q', '$http', '$translate', 'ResourcesService', function($q, $http, $translate, ResourcesService) {
	'use strict';

	/**
	 * Web service to load a citation list
	 */
	var _loadCitationList = function(citationList) {
		var tthis = this;
		var citationListId = citationList.resourceId;
		var ret = $q.defer();

		// Strip the starting '/' from the id
		if (citationListId.charAt(0) === '/') {
			citationListId = citationListId.substring(1);
		}

		var b64Path = Base64.encode(citationListId);
		
		// without "cache: false" the call is not always made
		$http.get('/direct/citation/list-b64/' + b64Path + '.json', {headers: {'nocache': 'true'}}).success(function(data) {
			_processCitations(citationList, data.citations);

			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		});

		return ret.promise;
	};

	var _processCitations = function(citationList, citations) {
		for (var i = 0; i < citations.length; i++) {
			citations[i].parentId = citationList.resourceId;
		}
	};

	/*
	 * Load all citation lists
	 */
	var _loadCitationLists = function(rootTree, resourceIds, promises) {
		if (rootTree.type === 'citationList') {
			promises.push(_loadCitationList(rootTree));

			resourceIds.push(rootTree.resourceId);
		} else {
			for (var i = 0; i < rootTree.resourceChildren.length; i++) {
				_loadCitationLists(rootTree.resourceChildren[i], resourceIds, promises);
			}
		}
	};

	/**
	 * Load all citation lists
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
			//Move the value type of citation to another variable because needed in resource browser 
			citations[i].citationType = citations[i].type;
			citations[i].type = 'citation';
			citations[i].name = citations[i].values.title;
		}

		return citations;
	};
	
	this.loadCitations = function() {
		var ret = $q.defer();
		var citationsLists = this.loadCitationLists(ResourcesService.resources);
		var tthis = this;

		$q.all(citationsLists.promises).then(function(data) {
			var updatedResource, updatedResourceId;

			for (var i = 0; i < data.length; i++) {
				if (data[i].citations) {
					updatedResourceId = citationsLists.resourceIds[i];
					updatedResource = ResourcesService.getResource(updatedResourceId);

					updatedResource.resourceChildren = tthis.updateJsonProperties(updatedResourceId, data[i].citations);
				}
			}

			ret.resolve();
		}).catch(function() {
			ret.reject('citationsLoadError');
		});

		return ret.promise;
	};

}]);
