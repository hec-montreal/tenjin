	
	var opensyllabusApp = angular.module('opensyllabus', ["ngResource"]);


	opensyllabusApp.filter('unsafe', function($sce) {
		    return function(val) {
		        return $sce.trustAsHtml(val);
		    };
		});
	
	
	// loader les donnees du plan de cours
	opensyllabusApp.controller('OpensyllabusCtrl', function ($scope, $resource){
		//TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
		var syllabusProvider = $resource('v1/syllabus/:courseId.json', 
				{courseId: "@courseId", sectionId: "A01,B03"},
				{getSyllabus: {method:'GET', isArray: false}});
		
		syllabusProvider.getSyllabus({courseId:'30300'}, function(data) {
			$scope.syllabus =  data;
			var menuTree =new Array();
			var contentTree = new Object();
			var iterMenu=0;
			
			for ( iterStruct = 0;iterStruct < data.syllabusStructures.length;iterStruct++){
				if (data.syllabusStructures[iterStruct].displayPage ){
					menuItem = data.syllabusStructures[iterStruct];
					if (menuItem.parent == null)
						menuItem.parent = "#";
					
					menuTree[iterMenu] =menuItem;
					iterMenu = iterMenu+1;
				}
				
			}		
	
			$('#menuTree').jstree({
				"core": {
			        "themes": {
			            "responsive": true
			        },
			        "check_callback": true,
			        'data': menuTree
			    },
			    "types": {
			        "default": {
			        	"icon" : "glyphicon glyphicon-flash"
			        },
			        
			    },
			    "state": { "key": "syllabusTree" },
			    "plugins": ["contextmenu", "dnd", "state", "types", "wholerow"]
			});
			
			$('#menuTree').on("changed.jstree", function (e, data) {
			      console.log(data.selected);
			    });
		});
		
	});


// resize frame (should be done also whenever we change content)
$(document).ready(function() {
	if (window.frameElement) {
		setMainFrameHeight(window.frameElement.id);
	}
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
