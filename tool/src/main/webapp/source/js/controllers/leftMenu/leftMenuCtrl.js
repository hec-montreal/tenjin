
	
opensyllabusApp.controller('LeftMenuCtrl', function ($scope, syllabus){
	var menuTree =new Array();
	var contentAttributes= new Object();
	var contentTree = new Array();
	var iterMenu=0;
	
	for ( iterStruct = 0;iterStruct < data.syllabusElements.length;iterStruct++){
		if (data.syllabusElements[iterStruct].displayPage ){
			menuItem = data.syllabusElements[iterStruct];
			if (menuItem.parent == null)
				menuItem.parent = "#";
			menuItem.a_attr = "{\"ngclick\": \"loadElementAttributes("+ iterStruct+")\"}";
			
			contentAttributes.id = menuItem.id;
			contentAttributes.elementAttributes = menuItem.elementAttributes;
			console.log(menuItem.elementAttributes);
			contentTree[iterMenu] = contentAttributes;
			
			menuTree[iterMenu] =menuItem;
			iterMenu = iterMenu+1;
			contentAttributes = new Object();
			
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
	    var select = data.selected[0]; 
	    document.getElementById("content").innerHTML = "";
	    console.log(select);
	    var contentAtt = new Object();
	    for ( iterMenu = 0;iterMenu < contentTree.length;iterMenu++){
	    	contentAtt = contentTree[iterMenu];
			if (contentAtt.id == select ){
				console.log(contentAtt.elementAttributes);
				 for ( iterAtt = 0;iterAtt < contentAtt.elementAttributes.length;iterAtt++){
					 document.getElementById("content").innerHTML += "<p>" + contentAtt.elementAttributes[iterAtt].attributeKey 
					 + ": " + contentAtt.elementAttributes[iterAtt].attributeValue +"</p>";
				 }
				
				break;
			}
			
		}	
	    });

	});




