opensyllabusApp.service('SakaiToolsService', ['$rootScope', '$resource', '$http',  function ( $rootScope, $resource, $http){
    'use strict';	
	
	//var siteToolsProviderUri = "../../../direct/";
	var toolsEntities = null;
	
	this.loadToolEntities = function($siteId){
		return  $resource("tools/" + $siteId + ".json").get();
	};	

	this.getToolEntities = function(){
		return toolsEntities;
	};

	this.setToolsEntities = function(entitiesList){
		toolsEntities = entitiesList;
	};

	this.getEntity = function ($entityId){
		return getEntity(toolsEntities, $entityId);
	};

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