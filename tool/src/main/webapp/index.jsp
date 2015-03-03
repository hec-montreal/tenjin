<!-- PREPARE TO USE NGBINDHTML FOR FUTURE VIEW OF CKEEDITOR TEXT (ANGULAR-SANITIZE.JS) -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr_CA" ng-app="opensyllabus">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>OpenSyllabus 2</title>
		<link rel="stylesheet" href="/opensyllabus2-tool/lib/bootstrap/css/bootstrap.css"/>
		<script src="/opensyllabus2-tool/lib/jquery/jquery-2.1.3.min.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular.js"></script>
		<script src="/opensyllabus2-tool/lib/angular/angular-sanitize.js"></script>
		<script src="/opensyllabus2-tool/components/opensyllabus/opensyllabusCtrl.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuCtrl.js"></script>
	</head>
	<body class="container">
	
		<!-- Left menu -->
		<div ng-controller="LeftMenuCtrl">
		
			<ul ng-repeat="libelle in sections" class="nav nav-pills nav-stacked">
				<li><a href='#{{libelle.id}}'>{{libelle.title}}</a></li>
				<ul ng-repeat="section in {{libelle.ssections}}" class="nav nav-pills nav-stacked">
				<li><a href='#{{section.id}}'>{{section.title}}</a></li>
				
			</ul>
			</ul>
		</div>
	</body>
</html>

