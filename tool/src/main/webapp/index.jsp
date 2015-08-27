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
	<body style="height: 400px;" class="portletBody container-fluid" ng-controller="OpensyllabusCtrl" >
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
					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" ng-controller="addElementCtrl as add">
						<li role="presentation" ng-repeat="type in add.types"><a role="menuitem" tabindex="-1" href="#" ng-click="add.addElement(type)">{{type}}</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div ng-controller="LeftMenuCtrl" class="col-md-3 pull-left" id="menu">
				
		 <div >Menu du cours
				  <div id="menuTree"></div>
				</div>
			</div>
	   		<div ng-controller="ContentPanelCtrl" class="col-md-9" id="content">
	   			</div>
	    </div>
            

	</body>
</html>

				