var opensyllabusApp = angular.module('opensyllabus', []);

opensyllabusApp.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});

opensyllabusApp.controller('OpensyllabusCtrl', function ($scope){
});

// resize frame (should be done also whenever we change content)
$(document).ready(function() {
	if (window.frameElement) {
		setMainFrameHeight(window.frameElement.id);
	}
});
