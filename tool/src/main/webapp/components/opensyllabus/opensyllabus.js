var opensyllabusApp = angular.module('opensyllabus', ["ngResource"]);

opensyllabusApp.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});

function showMenu() {
    $('#right').animate({ left: 250 }, 'slow', function() {
    	$('.mini-submenu').hide();
    	$('.slide-submenu').fadeIn();
    });
}

function hideMenu() {
    $('#right').animate({ left: 0 }, 'slow', function() {
    	$('.mini-submenu').fadeIn();
    });
}

// loader les donnees du plan de cours
opensyllabusApp.controller('OpensyllabusCtrl', function ($scope, $resource){
	$scope.syllabus = $resource()
	
});

// resize frame (should be done also whenever we change content)
$(document).ready(function() {
	if (window.frameElement) {
		setMainFrameHeight(window.frameElement.id);
	}
});

