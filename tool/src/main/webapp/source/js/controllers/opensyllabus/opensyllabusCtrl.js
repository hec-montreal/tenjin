
// loader les donnees du plan de cours
opensyllabusApp.controller('OpensyllabusCtrl', ['$scope', 'SyllabusService', function($scope, SyllabusService) {
	'use strict';

	var results = SyllabusService.getSyllabus('30300');
	results.$promise.then( function(data) {
		console.log(data);
	}, function(error) {
		console.log('erreur get syllabus');
	});

}]);

// opensyllabusApp.filter('unsafe', function($sce) {
// 	return function(val) {
// 		return $sce.trustAsHtml(val);
// 	};
// });


// resize frame (should be done also whenever we change content)
// $(document).ready(function() {
// 	if (window.frameElement) {
// 		setMainFrameHeight(window.frameElement.id);
// 	}
// });

// function showMenu() {
// 	$('#right').animate({
// 		left : 250
// 	}, 'slow', function() {
// 		$('.mini-submenu').hide();
// 		$('.slide-submenu').fadeIn();
// 	});
// }

// function hideMenu() {
// 	$('#right').animate({
// 		left : 0
// 	}, 'slow', function() {
// 		$('.mini-submenu').fadeIn();
// 	});
// }
