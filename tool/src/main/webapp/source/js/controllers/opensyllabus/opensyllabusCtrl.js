
// loader les donnees du plan de cours
opensyllabusApp.controller('OpensyllabusCtrl', ['$scope', 'SyllabusService', function($scope, SyllabusService) {
	'use strict';
    
    $scope.infos = {};
    // mockup
    var contenu1 = {
        "items" : [
            {
                "id" : 1,
                "type" : "texte",
                "valeur" : "Ceci est mon premier élément !" 
            },
            {
                "id" : 2,
                "type" : "texte",
                "valeur" : "Ceci est mon second élément !" 
            },
            {
                "id" : 3,
                "type" : "texte",
                "valeur" : "Ceci est mon troisième élément !" 
            },
        ] 
    };
    var contenu2 = {
        "items" : [
            {
                "id" : 1,
                "type" : "texte",
                "valeur" : "Premier élément !" 
            },
            {
                "id" : 2,
                "type" : "texte",
                "valeur" : "Second élément !" 
            },
            {
                "id" : 3,
                "type" : "texte",
                "valeur" : "Troisième élément !" 
            },
        ] 
    };
    $scope.syllabus = {};
    $scope.syllabus.syllabusStructures = [];
    $scope.syllabus.syllabusStructures.push(contenu1);
    $scope.syllabus.syllabusStructures.push(contenu2);
    $scope.infos.currentItemId = 1;
    
    // afficher loader pdt chargement
	var results = SyllabusService.getSyllabus('30300');
	results.$promise.then( function(data) {
		console.log(data);
        $scope.syllabus = data;


        
	}, function(error) {
		console.log('erreur get syllabus');
	});


}]);

//opensyllabusApp.filter('unsafe', function($sce) {
// 	return function(val) {
// 		return $sce.trustAsHtml(val);
// 	};
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


// resize frame (should be done also whenever we change content)
// $(document).ready(function() {
//     if (window.frameElement) {
//         setMainFrameHeight(window.frameElement.id);
//     }
// });


