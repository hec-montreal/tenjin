<!-- PREPARE TO USE NGBINDHTML FOR FUTURE VIEW OF CKEEDITOR TEXT (ANGULAR-SANITIZE.JS) -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr_CA" ng-app="opensyllabus">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OpenSyllabus 2</title>
		<link rel="stylesheet" href="/opensyllabus2-tool/lib/bootstrap/css/bootstrap.css"/>
		<link rel="stylesheet" href="/opensyllabus2-tool/css/opensyllabus.css"/>
		<script src="/opensyllabus2-tool/lib/jquery/jquery-2.1.3.min.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular-sanitize.js"></script>
		<script src="/opensyllabus2-tool/components/opensyllabus/opensyllabus.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuCtrl.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuServices.js"></script>
		<script src="/opensyllabus2-tool/components/contentPanel/contentPanelCtrl.js"></script>
		<script src="/opensyllabus2-tool/components/contentPanel/contentPanelServices.js"></script>

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
       				A definir
       				<button class="btn btn-lg slide-submenu pull-right" onclick="hideMenu()"><!-- <button  > -->
						<span class="glyphicon glyphicon-list"></span>
					</button>
       				<span class="pull-right" id="slide-submenu">
           				<span class="glyphicon glyphicon-list"></span>
		            </span>
		        </span>
				<div ng-repeat="section in sections" >
					<a href='#{{section.id}}' class="list-group-item" ng-click="display(section.id)">{{section.title}}</a>
					<span class="list-group" class="pull-right"  >
	 				    <div ng-repeat="ssection in section.ssections" >
	 				    	<a href='#{{ssection.id}}' class="list-group-item" ng-click="display(ssection.id)">
				    			{{ssection.title}}
				    		</a>
						</div>
					 </span>
				</div>
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
				<span ng-repeat="element in elements">
					<p class="syllabus-element" ng-bind-html="element.data.text | unsafe"></p>
				</span>
			</div>
		</div>
		
		
	</body>
</html>

