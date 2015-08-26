var opensyllabusApp = angular.module('opensyllabus', ["ngResource","ui.tree"]);

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
		var menuTree =new Array($scope.syllabus.syllabusStructures.length);
		var iterMenu=0;
		
		for ( iterStruct = 0;iterStruct < data.syllabusStructures.length;iterStruct++){
			if (data.syllabusStructures[iterStruct].displayPage ){
				children = data.syllabusStructures[iterStruct].childElements;
				subMenu = new Array(children.length);
					
				menuItem = new Object();
				iterSubMenu=0;
				menuItem["id"]= data.syllabusStructures[iterStruct].syllabusStructure_id;
				menuItem["text"]=data.syllabusStructures[iterStruct].syllabusStructure_id;
				
				for ( iterChildren = 0; iterChildren < children.length; iterChildren++){
					subMenuItem = new Object();
					child = children[iterChildren];
				if (child.displayPage){
						subMenuItem["id"]= child.syllabusStructure_id;
						subMenuItem["text"]=child.syllabusStructure_id;
						subMenu[iterSubMenu] = subMenuItem;
						iterSubMenu = iterSubMenu + 1;
					}
				}
				if (iterSubMenu > 0)
					menuItem["children"] = subMenu;
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
		            "icon": "fa fa-folder icon-state-warning icon-lg"
		        },
		        
		    },
		    "state": { "key": "syllabusTree" },
		    "plugins": ["contextmenu", "dnd", "search", "state", "types", "wholerow"]
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
