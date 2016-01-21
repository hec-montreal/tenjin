opensyllabusApp.service('CitationsService', [ '$rootScope', '$resource', '$http', '$q','$location', 'config',  function ( $rootScope, $resource, $http, $q, $location, config){
    'use strict';	
	
	var siteCitationsProviderUri = "../../../direct/citation/list";
	
	var load = function($citationListId){
		return $resource(siteCitationsProviderUri + $citationListId + ".json").get();
	};	

	var loadCitationLists = function($rootTree, $resourceIds, $promises ){
		var citationList;
		if ($rootTree.osylType === "citationList"){
			citationList = load($rootTree.resourceId);
			$promises.push(citationList.$promise);
			$resourceIds.push($rootTree.resourceId);
		}else{
			for ( var i = 0 ; i < $rootTree.resourceChildren.length ; i++) {
					loadCitationLists($rootTree.resourceChildren[i],  $resourceIds, $promises );
				}
			}
	};

	this.getCitationLists = function($rootTree){
		var resourceIds = [];
		var promises = [];
    	
    	loadCitationLists($rootTree, resourceIds, promises );
		
		var promisesList = {promises: promises, resourceIds: resourceIds};

		 return promisesList;
	};

	//Add a citationList to the resources list
	this.updateResources = function ($rootTree, $citationList){

		$rootTree.resourceChildren = $citationList;
		return $rootTree;

	};

	this.updateJsonProperties = function ($citationListId, $citations){
		for ( var i=0; i< $citations.length ; i++) {
			$citations[i].resourceId = $citationListId + '/'+$citations[i].id;
			$citations[i].osylType = 'citation';
			$citations[i].name = $citations[i].values.title + ' (' + $citations[i].type + ')';
		}
		return $citations;
	};

}]); 