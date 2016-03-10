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
	<link rel="stylesheet" href="/opensyllabus2-tool/node_modules/angular-ui-tree/dist/angular-ui-tree.min.css">  

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

	<!-- NODES MODULES -->
	<!-- <script src="/opensyllabus2-tool/lib/bootstrap/js/bootstrap.min.js"></script> -->
	<script src="/opensyllabus2-tool/node_modules/angular/angular.js"></script> 
	<!--<script src="/opensyllabus2-tool/lib/angular2/angular2.js"></script> -->
	<script src="/opensyllabus2-tool/node_modules/es6-shim/es6-shim.js"></script>
	<script src="/opensyllabus2-tool/node_modules/angular2/es6/dev/src/testing/shims_for_IE.js"></script>
	<!-- <script src="/opensyllabus2-tool/node_modules/angular2/bundles/angular2-polyfills.js"></script> -->
	
	<!--<script src="/opensyllabus2-tool/lib/systemjs/system.js"></script> --> 
	<script src="/opensyllabus2-tool/node_modules/typescript/lib/typescript.js"></script>  <!-- dev uniquement  -->
    <script src="/opensyllabus2-tool/node_modules/reflect-metadata/Reflect.js"></script><!-- use typescript decorator  -->  
	<script src="/opensyllabus2-tool/node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js"></script>  
	<script src="/opensyllabus2-tool/node_modules/angular-promise-extras/angular-promise-extras.js"></script> 
	<script src="/opensyllabus2-tool/node_modules/angular-resource/angular-resource.min.js"></script> 
	<script src="/opensyllabus2-tool/node_modules/angular-sanitize/angular-sanitize.min.js"></script>
	<script src="/opensyllabus2-tool/node_modules/angular-animate/angular-animate.min.js"></script>
	<script src="/opensyllabus2-tool/node_modules/angular-ui-tree/dist/angular-ui-tree.js"></script>
	<script src="/opensyllabus2-tool/node_modules/checklist-model/checklist-model.js"></script>
	<script src="/opensyllabus2-tool/node_modules/angular-translate/dist/angular-translate.min.js"></script>	
	<script src="/opensyllabus2-tool/node_modules/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js"></script>
	<script src="/opensyllabus2-tool/node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>

	<!-- SCRIPTS LIB -->
	<script src="/opensyllabus2-tool/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.js"></script>
	<script src="/opensyllabus2-tool/lib/xeditable/xeditable.min.js"></script>
	<script src="/opensyllabus2-tool/lib/ng-ckeditor-master/ng-ckeditor.js"></script>
	<script src="/opensyllabus2-tool/lib/modernizr/modernizr-custom.js"></script> 


	<!-- SCRIPTS LANGAGE -->
	<script src="http://code.angularjs.org/1.0.8/i18n/angular-locale_fr-fr.js"></script>

<!-- 	// <script src="/opensyllabus2-tool/js/controllers/opensyllabus/opensyllabus.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/addElementButton/addElementCtrl.js"></script> -->

	<!-- SCRIPTS OPENSYLLABUS -->
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


</body>
</html>

