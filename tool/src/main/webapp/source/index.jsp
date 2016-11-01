<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="fr_CA"> 
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>Tenjin</title>

	<link rel="stylesheet" href="/tenjin-tool/lib/css/bootstrap.css"/>

	<link rel="stylesheet" href="/tenjin-tool/css/tenjin.css"/>  
	<link rel="stylesheet" href="/tenjin-tool/lib/css/angular-ui-tree.min.css">   

	<!--<script src="/tenjin-tool/lib/jquery/jquery-2.1.3.min.js"></script> -->

	<!-- include sakai scripts (for resizing frame, etc). includes ckeditor -->
	<%= request.getAttribute("sakai.html.head.js") %>  

<!-- include skin/tool.css and tool_base.css --> 
	<!-- <%= request.getAttribute("sakai.html.head") %> -->
	<!-- <%= request.getAttribute("sakai.html.head.css.skin") %> -->
	<!-- a good example is bootstrap.jsp in roster2! -->
	<!-- SCRIPTS ALL LIBRAIRIES CONCAT -->
	<script src="/tenjin-tool/lib/tenjinlib.js"></script> 

<!-- SCRIPTS TENJIN -->
	<script src="/tenjin-tool/js/tenjin.js"></script>




	<!-- <script src="/tenjin-tool/node_modules/es6-shim/es6-shim.js"></script> -->
	<!-- <script src="/tenjin-tool/node_modules/angular2/es6/dev/src/testing/shims_for_IE.js"></script> -->

	
<!--  -->
</head>
<body id="body" class="portletBody container-fluid body-syllabus"> 

	<div id="tenjin" ng-app="tenjin" ui-view></div>

	<!-- NODES MODULES -->
	<!-- <script src="/tenjin-tool/node_modules/angular/angular.js"></script> 
	<script src="/tenjin-tool/node_modules/es6-shim/es6-shim.js"></script>
	<script src="/tenjin-tool/node_modules/angular2/es6/dev/src/testing/shims_for_IE.js"></script> -->
	<!-- <script src="/tenjin-tool/node_modules/typescript/lib/typescript.js"></script>-->  <!-- dev uniquement  -->
    <!-- <script src="/tenjin-tool/node_modules/reflect-metadata/Reflect.js"></script>--><!-- use typescript decorator  -->
	<!-- <script src="/tenjin-tool/node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js"></script>  
	<script src="/tenjin-tool/node_modules/angular-promise-extras/angular-promise-extras.js"></script> 
	<script src="/tenjin-tool/node_modules/angular-resource/angular-resource.min.js"></script> 
	<script src="/tenjin-tool/node_modules/angular-sanitize/angular-sanitize.min.js"></script>
	<script src="/tenjin-tool/node_modules/angular-animate/angular-animate.min.js"></script>
	<script src="/tenjin-tool/node_modules/angular-ui-tree/dist/angular-ui-tree.js"></script>
	<script src="/tenjin-tool/node_modules/checklist-model/checklist-model.js"></script>
	<script src="/tenjin-tool/node_modules/angular-translate/dist/angular-translate.min.js"></script>	
	<script src="/tenjin-tool/node_modules/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js"></script>
	<script src="/tenjin-tool/node_modules/angular-ui-router/release/angular-ui-router.min.js"></script> -->

	<!-- SCRIPTS LIB -->
<!-- 	<script src="/tenjin-tool/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.js"></script>
	<script src="/tenjin-tool/lib/xeditable/xeditable.min.js"></script>
	<script src="/tenjin-tool/lib/ng-ckeditor-master/ng-ckeditor.js"></script>
	<script src="/tenjin-tool/lib/modernizr/modernizr-custom.js"></script> 
 -->

	<!-- SCRIPTS LANGAGE -->
	<!-- <script src="/tenjin-tool/node_modules/angular-i18n/angular-locale_fr-fr.js"></script> -->


	
	

</body>
</html>

