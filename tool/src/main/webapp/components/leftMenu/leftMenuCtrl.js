
	
opensyllabusApp.controller('LeftMenuCtrl', function ($scope){
		
	});




function loadMenu (syllabusStructures){
	alert("loaded");
	document.getElementById("menu").innerHTML =" <!-- angular-ui-tree -->";
	document.getElementById("menu").innerHTML ="	<div ui-tree>";
	document.getElementById("menu").innerHTML ="	  <ol ui-tree-nodes=\"\" ng-model=\"syllabusStructures\">";
	document.getElementById("menu").innerHTML ="	    <li ng-repeat=\"syllabusStructure in syllabusStructures\" ui-tree-node>";
	document.getElementById("menu").innerHTML ="			<div ui-tree-handle>";
	document.getElementById("menu").innerHTML ="  				{{syllabusStructure.parent}}";
	document.getElementById("menu").innerHTML ="  			</div>  ";
	document.getElementById("menu").innerHTML ="		</li>";
	document.getElementById("menu").innerHTML ="	  </ol>";
	document.getElementById("menu").innerHTML ="	</div>";
	document.getElementById("menu").innerHTML ="</span>";
	document.getElementById("menu").innerHTML ="</div>"; 		
	document.getElementById("menu").innerHTML ="</div>	";

}

//$(function() {
//$('#container').jstree({
//  'core' : {
//    'data' : {
//      "url" : "https://www.jstree.com/fiddle/?lazy",
//      "data" : function (node) {
//        return { "id" : node.id };
//      }
//    },
//    "check_callback" : function (operation, node, parent, position, more) {
//        if(operation === "copy_node" || operation === "move_node") {
//          if(parent.id === "#") {
//            return false; // prevent moving a child above or below the root
//          }
//        }
//        return true; // allow everything else
//      }
//  },
//  "plugins" : ["dnd","contextmenu"]
//});
//});
