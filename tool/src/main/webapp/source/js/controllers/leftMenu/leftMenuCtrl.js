	
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

    $scope.montoggle = function (scope) {
		scope.toggle();
	};
	$scope.collapseAll = function () {
		$scope.$broadcast('collapseAll');
	};

	$scope.expandAll = function () {
		$scope.$broadcast('expandAll');
	};

	$scope.remove = function (scope) {
		scope.remove();
	};

 	$scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };

	$scope.newSubItem = function (scope) {
		var nodeData = scope.$modelValue;
		nodeData.nodes.push({
			id: nodeData.id * 10 + nodeData.nodes.length,
			title: nodeData.title + '.' + (nodeData.nodes.length + 1),
			nodes: []
		});
	};

	$scope.loadContentPanel = function($item){
		console.log($item.title);
		// debugger;
	};

	$scope.list = [{
        'id': 1,
        'title': 'Présentation',
        'nodrag': true,
        'items': []
      }, 
		{
        'id': 2,
        'title': 'Coordonnées',
        'nodrag': true,
        'items': []
      },
      {
        'id': 3,
        'title': 'Matériel pédagogique',
        'nodrag': true,
        'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        'items': []
      }, 
      {
        'id': 4,
        'title': 'Evaluations',
        'nodrag': true,
        'items': [
          {
            'id': 41,
            'title': 'Evaluation',
            'items': []
          },
          {
            'id': 42,
            'title': 'Examen intra',
            'items': []
          }
        ]
      },
      {
        'id': 5,
        'title': 'Organisation du cours',
        'nodrag': true,
        'items': [
          {
            'id': 51,
            'title': 'Chapitre 1',
            'items': [
              {
	            'id': 511,
	            'title': 'Séance de cours',
	            'items': []
	          },
	          {
	            'id': 512,
	            'title': 'Séance de travaux pratique',
	            'items': []
	          }   	
            ]
          },
          {
            'id': 52,
            'title': 'Chapitre 2',
            'items': [
			{
				'id': 521,
				'title': 'Séance de cours 1',
				'items': []
			},
			{
				'id': 522,
				'title': 'Séance de cours 2',
				'items': []
			}  
            ]
          }
        ]
      }
      ];

	$scope.collapseAll();

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




