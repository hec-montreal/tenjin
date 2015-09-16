	
opensyllabusApp.controller('LeftMenuCtrl', [ '$scope', function ($scope){
	'use strict';

	var menuTree = [];
	var contentAttributes = {};
	var contentTree = [];
	var iterMenu = 0;
	
	var data = {};
	data.syllabusStructures = [];

	for ( var iterStruct = 0; iterStruct < data.syllabusStructures.length; iterStruct++ ){
		if (data.syllabusStructures[iterStruct].displayPage ){
			var menuItem = data.syllabusStructures[iterStruct];
			if (menuItem.parent === null) {
				menuItem.parent = "#";
			}
			menuItem.a_attr = "{\"ngclick\": \"loadElementAttributes("+ iterStruct+")\"}";
			
			contentAttributes.id = menuItem.id;
			contentAttributes.elementAttributes = menuItem.elementAttributes;
			console.log(menuItem.elementAttributes);
			contentTree[iterMenu] = contentAttributes;
			
			menuTree[iterMenu] =menuItem;
			iterMenu = iterMenu+1;
			contentAttributes = {};
			
		}
		
	}		

	// $('#menuTree').jstree({
	// 	"core": {
	//         "themes": {
	//             "responsive": true
	//         },
	//         "check_callback": true,
	//         'data': menuTree
	//     },
	//     "types": {
	//         "default": {
	//         	"icon" : "glyphicon glyphicon-flash"
	//         },
	        
	//     },
	//     "state": { "key": "syllabusTree" },
	//     "plugins": ["contextmenu", "dnd", "state", "types", "wholerow"]
	// });
	
	// $('#menuTree').on("changed.jstree", function (e, data) {
	//     var select = data.selected[0]; 
	//     document.getElementById("content").innerHTML = "";
	//     console.log(select);
	//     var contentAtt = {};
	//     for ( iterMenu = 0;iterMenu < contentTree.length;iterMenu++){
	//     	contentAtt = contentTree[iterMenu];
	// 		if (contentAtt.id === select ){
	// 			console.log(contentAtt.elementAttributes);
	// 			 for ( var iterAtt = 0; iterAtt < contentAtt.elementAttributes.length;iterAtt++){
	// 				 document.getElementById("content").innerHTML += "<p>" + contentAtt.elementAttributes[iterAtt].attributeKey + ": " + contentAtt.elementAttributes[iterAtt].attributeValue +"</p>";
	// 			 }
				
	// 			break;
	// 		}
			
	// 	}	
	// });
}]);




