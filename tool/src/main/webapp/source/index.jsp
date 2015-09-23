<!-- PREPARE TO USE NGBINDHTML FOR FUTURE VIEW OF CKEEDITOR TEXT (ANGULAR-SANITIZE.JS) -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr_CA" data-ng-app="opensyllabus">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>OpenSyllabus 2</title>
	<link rel="stylesheet" href="/opensyllabus2-tool/lib/bootstrap/css/bootstrap.css"/>

	<link rel="stylesheet" href="/opensyllabus2-tool/dest/css/opensyllabus.css"/>
	<link rel="stylesheet" href="/opensyllabus2-tool/lib/angular-ui-tree/angular-ui-tree.min.css">

	<!--<script src="/opensyllabus2-tool/lib/jquery/jquery-2.1.3.min.js"></script> -->


	<!-- include sakai scripts (for resizing frame, etc). includes ckeditor -->
	<%= request.getAttribute("sakai.html.head.js") %>
	<!-- include skin/tool.css and tool_base.css -->
	<!-- <%= request.getAttribute("sakai.html.head") %> -->
	<!-- <%= request.getAttribute("sakai.html.head.css.skin") %> -->
	<!-- a good example is bootstrap.jsp in roster2! -->

</head>
<body style="height: 400px;" class="portletBody container-fluid" data-ng-controller="OpensyllabusCtrl" >
	<div class="row">
		<h1>{{syllabus.courseTitle}}</h1>
	</div>
	<div class="row">	
		<div class="col-sm-10">
		</div>
		<div class="col-sm-2 pull-right">
			<div class="dropdown">
				<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
					<span class="glyphicon glyphicon-plus-sign"></span>
					Ajouter
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" data-ng-controller="addElementCtrl as add">
					<li role="presentation" data-ng-repeat="type in add.types"><a role="menuitem" tabindex="-1" href="#" data-ng-click="add.addElement(type)">{{type}}</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="row">

		<!-- Menu de gauche -->
		<div data-ng-include="'/opensyllabus2-tool/dest/views/leftMenu.html'"   class="col-md-3 hide-tablet pull-left left-menu" id="menu" ></div>
		
		<!-- Container de droite -->
		<div data-ng-include="'/opensyllabus2-tool/dest/views/contentPanel.html'"  class="col-md-9 col-sm-12" id="content"></div>

	</div>

	<!-- <script src="/opensyllabus2-tool/lib/bootstrap/js/bootstrap.min.js"></script> -->
	<script src="/opensyllabus2-tool/lib/angular/angular.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-resource.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-sanitize.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-ui-tree/angular-ui-tree.js"></script>

<!-- 	// <script src="/opensyllabus2-tool/js/controllers/opensyllabus/opensyllabus.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/addElementButton/addElementCtrl.js"></script> -->

	<script src="/opensyllabus2-tool/dest/js/opensyllabus.js"></script>
	
</body>
</html>

