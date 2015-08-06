<!-- PREPARE TO USE NGBINDHTML FOR FUTURE VIEW OF CKEEDITOR TEXT (ANGULAR-SANITIZE.JS) -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr_CA" data-ng-app="opensyllabus">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OpenSyllabus 2</title>
		<link rel="stylesheet" href="/opensyllabus2-tool/lib/bootstrap/css/bootstrap.css"/>
		<link rel="stylesheet" href="/opensyllabus2-tool/css/opensyllabus.css"/>
		<script src="/opensyllabus2-tool/lib/jquery/jquery-2.1.3.min.js"></script>
		<script src="/opensyllabus2-tool/lib/bootstrap/js/bootstrap.min.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular-resource.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular-sanitize.js"></script>
		<script src="/opensyllabus2-tool/components/opensyllabus/opensyllabus.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuCtrl.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuServices.js"></script>
		<script src="/opensyllabus2-tool/components/contentPanel/contentPanelCtrl.js"></script>
		<script src="/opensyllabus2-tool/components/contentPanel/contentPanelServices.js"></script>
		<script src="/opensyllabus2-tool/components/addElementButton/addElementCtrl.js"></script>
		<!-- angular-ui-tree -->
		<link rel="stylesheet" href="/opensyllabus2-tool/lib/angular/angular-ui-tree.min.css">
		<script type="text/javascript" src="/opensyllabus2-tool/lib/angular/angular-ui-tree.min.js"></script>
		<!-- jquery-js-tree -->
		<link rel="stylesheet" href="/opensyllabus2-tool/lib/angular/js-tree/themes/default/style.min.css">
		<script type="text/javascript" src="/opensyllabus2-tool/lib/angular/js-tree/jstree.min.js"></script>
		
		
		<!-- include sakai scripts (for resizing frame, etc). includes ckeditor -->
		<%= request.getAttribute("sakai.html.head.js") %>
		<!-- include skin/tool.css and tool_base.css -->
		<!-- <%= request.getAttribute("sakai.html.head") %> -->
		<!-- <%= request.getAttribute("sakai.html.head.css.skin") %> -->
		<!-- a good example is bootstrap.jsp in roster2! -->
		
	</head>
	<body class="portletBody container-fluid" ng-controller="OpensyllabusCtrl" >
		<!-- Left menu -->
	 	<div id="menu" ng-controller="LeftMenuCtrl">
			 <div class="list-group">
				<span href="#" class="list-group-item active">
       				<button class="btn btn-lg slide-submenu" onclick="hideMenu()"><!-- <button  > -->
						<span class="glyphicon glyphicon-list"></span>
					</button>
       				<span class="pull-right" id="slide-submenu">
           				<span class="glyphicon glyphicon-list"></span>
		            </span>
		        </span>
				  <div ng-repeat="element in syllabus.elements" >
					<%-- <a href='#{{element.id}}' class="list-group-item" ng-click="display(element.id)">{{element.id}}</a>
					<span class="list-group" class="pull-right"  > --%>
				  </div>	
			<!-- jquery-js-tree -->
		<div id="container"></div>
<script>
$(function() {
  $('#container').jstree({
    'core' : {
      'data' : {
        "url" : "https://www.jstree.com/fiddle/?lazy",
        "data" : function (node) {
          return { "id" : node.id };
        }
      },
      "check_callback" : function (operation, node, parent, position, more) {
          if(operation === "copy_node" || operation === "move_node") {
            if(parent.id === "#") {
              return false; // prevent moving a child above or below the root
            }
          }
          return true; // allow everything else
        }
    },
    "plugins" : ["dnd","contextmenu"]
  });
});
</script>
				
									 <!-- angular-ui-tree -->
					<div ui-tree>
					  <ol ui-tree-nodes="" ng-model="syllabus.elements">
					    <li ng-repeat="element in syllabus.elements" ui-tree-node>
						      <div ng-if="element.displayPage == true">
							      <div ui-tree-handle>
								      {{element.id}}
								  </div>  
					      	</div>
					      <!-- <ol ui-tree-nodes="" ng-model="item.items">
					        <li ng-repeat="subItem in item.items" ui-tree-node>
					          <div ui-tree-handle>
					            {{subItem.title}}
					          </div>
					        </li>
					      </ol> -->
					    </li>
					  </ol>
					</div>
	 				    <%-- <div ng-repeat="ssection in section.ssections" >
	 				    	<a href='#{{ssection.id}}' class="list-group-item" ng-click="display(ssection.id)">
				    			{{ssection.title}}
				    		</a>
						</div> --%>
					 </span>
				
			</div> 		
			

		</div>	
		
		
				<!-- Opensyllabus panel -->
		<div  id="right" ng-controller="ContentPanelCtrl" >
			 <!-- Navigation bar -->
			 
			<div class="navbar navbar-default">
	            <button class="btn btn-lg mini-submenu" onclick="showMenu()">
					<span class="glyphicon glyphicon-menu-hamburger"></span>
				</button>
			</div>	
			<!-- Content -->
			<div  id="content"  >
				<div class="row">
					<div class="col-sm-10"><h1>{{syllabus.coursetitle}}</h1></div>
					<div class="col-sm-2 pull-right">
						<div class="dropdown">
							<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
								<span class="glyphicon glyphicon-plus-sign"></span>
								Ajouter
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" ng-controller="addElementCtrl as add">
								<li role="presentation" ng-repeat="type in add.types"><a role="menuitem" tabindex="-1" href="#" ng-click="add.addElement(type)">{{type}}</a></li>
							</ul>
						</div>
					</div>
				</div>

				<span ng-repeat="element in elements">
					<p class="syllabus-element" ng-bind-html="element.data.text | unsafe"></p>
				</span>
			</div>
		</div>
	</body>
</html>

				