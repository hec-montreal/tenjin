<%@page contentType="text/html; charset=UTF-8" %>
<!-- PREPARE TO USE NGBINDHTML FOR FUTURE VIEW OF CKEEDITOR TEXT (ANGULAR-SANITIZE.JS) -->
<!DOCTYPE html>
<html lang="fr_CA" > 
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
<body id="body" class="portletBody container-fluid body-syllabus">

	<div ui-view></div>


	<!-- <script src="/opensyllabus2-tool/lib/bootstrap/js/bootstrap.min.js"></script> -->
	<script src="/opensyllabus2-tool/lib/angular/angular.js"></script> 
	<!--<script src="/opensyllabus2-tool/lib/angular2/angular2.js"></script> -->
	<!--<script src="/opensyllabus2-tool/lib/systemjs/system.js"></script> --> 
	<!--<script src="/opensyllabus2-tool/lib/typescript/typescript.js"></script> --> <!-- dev uniquement  -->
    <script src="/opensyllabus2-tool/lib/reflect-metadata/reflect.js"></script> <!-- use typescript decorator  -->
  

	<script src="/opensyllabus2-tool/lib/angular-dynamic-locale-master/tmhDynamicLocale.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-promise-extras-master/angular-promise-extras.js"></script>
	<script src="http://code.angularjs.org/1.0.8/i18n/angular-locale_fr-fr.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-resource.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-sanitize.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular/angular-animate.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-ui-tree/angular-ui-tree.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.js"></script>
	<script src="/opensyllabus2-tool/lib/xeditable/xeditable.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-translate/angular-translate.min.js"></script>
	<script src="/opensyllabus2-tool/lib/ng-ckeditor-master/ng-ckeditor.js"></script>
	<script src="/opensyllabus2-tool/lib/bootstrap-ui-datetime-picker-master/dist/datetime-picker.min.js"></script>
	<!-- <script src="/opensyllabus2-tool/lib/ng-file-upload-master/dist/ng-file-upload.min.js"></script> --> 
	<script src="/opensyllabus2-tool/lib/modernizr/modernizr-custom.js"></script> 
	<script src="/opensyllabus2-tool/lib/angular-ui-router/angular-ui-router.min.js"></script> 

<!-- 	// <script src="/opensyllabus2-tool/js/controllers/opensyllabus/opensyllabus.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/addElementButton/addElementCtrl.js"></script> -->

	<script src="/opensyllabus2-tool/js/opensyllabus.js"></script>


	<!--<script>
		System.config({
			// we want to import modules without writing .js at the end
			defaultJSExtensions: true,
			// the app will need the following dependencies
			map: {
			  'angular2': 'node_modules/angular2',
			  // 'rxjs': 'node_modules/rxjs'
			}
		});
		// and to finish, let's boot the app!
		System.import('/opensyllabus2-tool/js/opensyllabus');
	</script>-->

	<!--<script src="/opensyllabus2-tool/js/bootstrap.js"></script>-->

	<script>
		// Bootstrap application
		// adapter.bootstrap(document.body, ['opensyllabus']);
		// angular.bootstrap(document.body, ['opensyllabus']);
	</script>

</body>
</html>

