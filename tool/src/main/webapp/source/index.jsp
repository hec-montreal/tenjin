<%@page contentType="text/html; charset=UTF-8" %>
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
	<link rel="stylesheet" href="/opensyllabus2-tool/lib/angular-ui-tree/angular-ui-tree.min.css">

	<!--<script src="/opensyllabus2-tool/lib/jquery/jquery-2.1.3.min.js"></script> -->

	<!-- include sakai scripts (for resizing frame, etc). includes ckeditor -->
	<%= request.getAttribute("sakai.html.head.js") %>
	<!-- include skin/tool.css and tool_base.css -->
	<!-- <%= request.getAttribute("sakai.html.head") %> -->
	<!-- <%= request.getAttribute("sakai.html.head.css.skin") %> -->
	<!-- a good example is bootstrap.jsp in roster2! -->
<!--  -->
</head>
<body id="body" class="portletBody container-fluid" data-ng-controller="OpensyllabusCtrl" >

	<div class="loader-container" data-ng-show="infos.working">
		<div class="loader"></div>
	</div>

	<div class="row row-title" ng-cloak>
		<h1>{{syllabus.courseTitle}}</h1>
	</div>
	<!-- <div class="row">	
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
	</div> -->

 	<uib-alert data-ng-if="alertService.isVisible('danger')" class="myalert" type="danger" close="alertService.closeAlert('danger')" dismiss-on-timeout="5000">{{alertService.getAlertMsg('danger')}}</uib-alert>
 	<uib-alert data-ng-if="alertService.isVisible('success')" class="myalert" type="success" close="alertService.closeAlert('success')">{{alertService.getAlertMsg('success')}}</uib-alert>

	<div class="row row-content">

		<!-- Menu de gauche -->
		<div data-ng-include="'leftMenu.html'"   class="col-md-3 hide-tablet pull-left left-menu" id="menu" ></div>
		
		<!-- Container de droite -->
		<div data-ng-include="'contentPanel.html'" class="col-md-9 col-sm-12 content-panel" id="content"></div>

		<!-- Modales templates -->
		<div data-ng-include="'confirmModalTemplate.html'"></div>
		<div data-ng-include="'createElementTemplate.html'"></div>

	</div>

	<!-- <script src="/opensyllabus2-tool/lib/bootstrap/js/bootstrap.min.js"></script> -->
	<script src="/opensyllabus2-tool/lib/angular/angular.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-resource.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-sanitize.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-animate.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-ui-tree/angular-ui-tree.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-ui/ui-bootstrap-custom-tpls-0.14.3.min.js"></script>
	<script src="/opensyllabus2-tool/lib/xeditable/xeditable.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-translate/angular-translate.min.js"></script>
	<script src="/opensyllabus2-tool/lib/ng-ckeditor-master/ng-ckeditor.js"></script>
	<script src="/opensyllabus2-tool/lib/bootstrap-ui-datetime-picker-master/dist/datetime-picker.min.js"></script>
	<script src="/opensyllabus2-tool/lib/ng-file-upload-master/dist/ng-file-upload.min.js"></script>
	

<!-- 	// <script src="/opensyllabus2-tool/js/controllers/opensyllabus/opensyllabus.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/addElementButton/addElementCtrl.js"></script> -->

	<script src="/opensyllabus2-tool/js/opensyllabus.js"></script>
	
</body>
</html>

