opensyllabusApp.service('ResourcesService', [ '$rootScope', '$resource', '$http', '$location',  function ( $rootScope, $resource, $http, $location){
	
	
	this.allSiteResources;
	var folderType = "org.sakaiproject.content.types.folder";
	var citationType = "org.sakaiproject.citation.impl.CitationList";
	
	
	var baseUrl = "http://localhost:8080";
	var siteResourcesProviderUri = "/direct/content/resources/";
	
	this.setAllSiteResources = function($siteResources){
		this.allSiteResources
	};

	this.getSiteResources = function($siteId){
		siteResourcesProviderUri = baseUrl + siteResourcesProviderUri + $siteId + ".json?depth=all";
		resources = $resource(siteResourcesProviderUri).get();
		console.log("resources " + resources.content_collection[0]);
		return resources;
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