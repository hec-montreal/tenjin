tenjinApp.service('ResourcesService', [ '$rootScope', '$resource', '$http', '$location', 'config',   function ( $rootScope, $resource, $http, $location, config){
    'use strict';	
	
	this.resources;
	var siteResourcesProviderUri = "resources/";
	
	/**
     * Get file extension
     * @param {String} $filename Name of the file
     */
	var getExtension = function($filename) {
		var fileSplit = $filename.split('.');
		var fileExt = '';
		if (fileSplit.length > 1) {
			fileExt = fileSplit[fileSplit.length - 1];
		} 
		return fileExt;
	};

	/**
     * Get the resource type
     * @param {Object} $resource Resource
     */
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
	
	/**
     * Attach a resource type to each resource (resources are contained in a tree) 
     * @param {Object} $rootTree Root tree of the resources
     */
	var classifyResources = function($rootTree) {

		var type = getResourceType($rootTree);
		$rootTree.type= type;

		for ( var i = 0 ; i < $rootTree.resourceChildren.length ; i++) {
			classifyResources($rootTree.resourceChildren[i]);

		}

	};

	/**
     * load resources for a given site id
     * @param {String} $siteId Site id
     */
	this.loadResources = function($siteId){
		siteResourcesProviderUri = siteResourcesProviderUri + $siteId + ".json?depth=all";
		return $resource(siteResourcesProviderUri).query( {
			nocache:{}
		});
	};	

	/**
     * Set resources and classify them
     * @param {Object} $resources Resources tree
     */
	this.setResources = function($resources){
		this.resources = $resources;

		// classify resource by type
		classifyResources(this.resources);
	};

	/**
     * Get resource from a resources tree and a resource id
     * @param {Object} $rootTree Resources tree
     * @param {String} $resourceId Resource id
     */
	var getResource = function($rootTree, $resourceId) {
		
		if ($rootTree.resourceId === $resourceId) {
			return $rootTree;
		} else {
			if ( $rootTree.resourceChildren ){
				for ( var i = 0 ; i < $rootTree.resourceChildren.length ; i++) {
					var results = getResource($rootTree.resourceChildren[i], $resourceId);
					if (results) {
						return results;
					}
				}
			}
		}

		return undefined;
	};

	/**
     * Get resource from a resource id
     * @param {String} $resourceId Resource id
     */
	this.getResource = function($resourceId) {
		return getResource(this.resources, $resourceId);
	};


}]);