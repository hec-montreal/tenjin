opensyllabusApp.service('ResourcesService', [ '$rootScope', '$resource', '$http', '$location',  function ( $rootScope, $resource, $http, $location){
    'use strict';	
	
	this.resources;
	var folderType = "org.sakaiproject.content.types.folder";
	var citationType = "org.sakaiproject.citation.impl.CitationList";
	
	
	var siteResourcesProviderUri = "../../../direct/content/resources/";
	
	
	this.loadResources = function($siteId){
		siteResourcesProviderUri = siteResourcesProviderUri + $siteId + ".json?depth=all";
		return $resource(siteResourcesProviderUri).get();
	};	

	this.setResources = function($resources){
		this.resources = $resources;
	};

	var getResource = function($rootTree, $resourceId) {
		
		if ($rootTree.resourceId === $resourceId) {
			return $rootTree;
		} else {
			for ( var i = 0 ; i < $rootTree.resourceChildren.length ; i++) {
				var results = getResource($rootTree.resourceChildren[i], $resourceId);
				if (results) {
					return results;
				}
			}
		}

		return undefined;
	};

	this.getResource = function($resourceId) {
		return getResource(this.resources, $resourceId);
	};

//	this.documentTreeOptions = {
//		name: "",
//		item: documentList ,
//		accept: function(){
//			
//		},
//		dropped: function(event){
//			
//		},
//	};
//	
}]);