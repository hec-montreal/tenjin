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
	//TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
	var syllabusProvider = $resource('v1/syllabus/:courseId.json', 
			{courseId: "@courseId", sectionId: "A01,B03"},
			{getSyllabus: {method:'GET', isArray: false}});
	
	syllabusProvider.getSyllabus({courseId:'30300'}, function(data) {
		$scope.syllabusTitle = data;
	});
	
});

// resize frame (should be done also whenever we change content)
$(document).ready(function() {
	if (window.frameElement) {
		setMainFrameHeight(window.frameElement.id);
	}
});

