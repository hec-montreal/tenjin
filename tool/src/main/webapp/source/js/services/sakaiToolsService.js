tenjinApp.service('SakaiToolsService', ['$rootScope', '$q', '$http', function ( $rootScope, $q, $http){
	'use strict';
	
	var toolsEntities = null;
	
	/**
	 * Load sakai tools
	 * @param {String} $siteId Site id
	 * @return {Object} Promise
	 */
	this.loadToolEntities = function(siteId){
		var tthis = this;
		var ret = $q.defer();

		$http.get('v1/' + siteId + '/tool-entities.json').success(function (data) {
			tthis.setToolsEntities(data);

			ret.resolve(tthis.getToolEntities());
		}).error(function (data) {
			ret.reject('sakaiToolsLoadError');
		});

		return ret.promise;
	};	

	/**
	 * Get sakai tools
	 * @return {Array} Sakai tool list
	 */
	this.getToolEntities = function(){
		return toolsEntities;
	};

	/**
	 * Set sakai tools
	 */
	this.setToolsEntities = function(entitiesList){
		toolsEntities = entitiesList;
	};

	/**
	 * Get one entity (sakai tool)
	 * @param {String} $entityId Entity id
	 */
	this.getEntity = function ($entityId){
		return getEntity(toolsEntities, $entityId);
	};

	/**
	 * Get one entity from the tree of sakai tools
	 * @param {Object} $rootTree Root tree
	 * @param {String} $entityId Entity id
	 * @return {Object} The found entity or undefined
	 */
	var getEntity =  function($rootTree, $entityId) {
		if ($rootTree.resourceId === $entityId) {
			return $rootTree;
		} else {
			if ( $rootTree.resourceChildren ){
				for ( var i = 0 ; i < $rootTree.resourceChildren.length ; i++) {
					var results = getEntity($rootTree.resourceChildren[i], $entityId);
					if (results) {
						return results;
					}
				}
			}
		}

		return undefined;
	};
}]);
