var opensyllabusApp = angular.module('opensyllabus', []);

opensyllabusApp.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});

opensyllabusApp.controller('OpensyllabusCtrl', function ($scope){
});