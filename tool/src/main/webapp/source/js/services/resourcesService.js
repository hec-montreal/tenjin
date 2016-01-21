opensyllabusApp.service('ResourcesService', [ '$rootScope', '$resource', '$http', '$location', 'config',  function ( $rootScope, $resource, $http, $location, config){
    'use strict';	
	
	this.resources;
	var folderType = "org.sakaiproject.content.types.folder";
	var citationType = "org.sakaiproject.citation.impl.CitationList";
	var siteResourcesProviderUri = "../../../direct/content/resources/";
	
	var getExtension = function($filename) {
		var fileSplit = $filename.split('.');
		var fileExt = '';
		if (fileSplit.length > 1) {
			fileExt = fileSplit[fileSplit.length - 1];
		} 
		return fileExt;
	};

	var getResourceType = function($resource) {
		var name = $resource.name;

		if ($resource.type === "org.sakaiproject.citation.impl.CitationList") {
			return "citationList";
		} else if ( $resource.type === "org.sakaiproject.content.types.folder" ){
			return "folder";
		} else if ( $resource.type === "org.sakaiproject.content.types.TextDocumentType" || $resource.type === "org.sakaiproject.content.types.HtmlDocumentType" ) {
			return "document";
		} else if ( $resource.type === "org.sakaiproject.content.types.fileUpload" ) {
			var extension = getExtension(name);

			if (extension) {
				for ( var i = 0 ; i < config.extensionsImage.length ; i++) {
					if (extension === config.extensionsImage[i]) {
						return "image";
					}
				}
				return "document";
			} else {
				return "document";
			}
		}

		return undefined;
	};
	
	var classifyResources = function($rootTree) {

		var type = getResourceType($rootTree);
		$rootTree.osylType= type;

		for ( var i = 0 ; i < $rootTree.resourceChildren.length ; i++) {
			classifyResources($rootTree.resourceChildren[i]);

		}

	};

	this.loadResources = function($siteId){
		siteResourcesProviderUri = siteResourcesProviderUri + $siteId + ".json?depth=all";
		return $resource(siteResourcesProviderUri).get();
	};	

	this.setResources = function($resources){
		this.resources = $resources;

		// classify resource by type
		classifyResources(this.resources);
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