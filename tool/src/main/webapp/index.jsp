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
		<script src="/opensyllabus2-tool/components/opensyllabus/opensyllabus.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuCtrl.js"></script>
		<script src="/opensyllabus2-tool/components/leftMenu/leftMenuServices.js"></script>
	</head>
	<body class="container">
	
		<!-- Left menu -->
		<div ng-controller="LeftMenuCtrl">
		
			<ul class="nav nav-pills nav-stacked navbar-left">
				<li ng-repeat="section in sections" >
					<a href='#{{section.id}}'>{{section.title}}</a>
					<ul class="nav nav-pills nav-stacked" ng-show="{{section.ssections}}">
	 				    <li ng-repeat="ssection in section.ssections" >
							<a href='#{{ssection.id}}'>{{ssection.title}}</a>
						</li>
 				    </ul>
				</li>
			</ul>
		</div>
	</body>
</html>

