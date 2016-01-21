<%@page contentType="text/html; charset=UTF-8" %>
<!-- PREPARE TO USE NGBINDHTML FOR FUTURE VIEW OF CKEEDITOR TEXT (ANGULAR-SANITIZE.JS) -->
<!DOCTYPE html>
<html lang="fr_CA" > 
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>OpenSyllabus 2</title>
	<style>
		.loader-container {
		    position: fixed;
		    width: 100%;
		    height: 1500px;
		    background-color: #fff;
		    z-index: 100;
		}
		.loader-container .loader {
	        background: url('/opensyllabus2-tool/img/desktop/loader.gif') no-repeat;
	        width: 160px;
	        height: 160px;
	        margin-left: 30%;
	        margin-top: 250px;
	    }

	    @media (max-width: 767px) {
	    	
	        .loader-container .loader {
                background: url('/opensyllabus2-tool/img/desktop/loader.gif') no-repeat;
                width: 160px;
                height: 160px;
                margin-right: auto;
                margin-left: auto;
                margin-top: 200px;
	        }

	    }

	</style>
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
<body id="body" class="portletBody container-fluid body-syllabus" data-ng-controller="OpensyllabusCtrl" >

	<div class="loader-container" data-ng-show="infos.working">
		<div class="loader"></div>
	</div>

	<div class="main-errors">
	 	<uib-alert data-ng-if="planFailed" class="myalert" type="danger">{{ 'ERROR_PLAN_COURS' | translate }}</uib-alert>

	 	<uib-alert data-ng-if="(!planFailed && templateFailed)" class="myalert" type="danger">{{ 'ERROR_TEMPLATE' | translate }}</uib-alert>

	 	<uib-alert data-ng-if="alertService.isVisible('danger')" class="myalert" type="danger" close="alertService.closeAlert('danger')" dismiss-on-timeout="5000">{{alertService.getAlertMsg('danger')}}</uib-alert>
	 	<uib-alert data-ng-if="alertService.isVisible('success')" class="myalert" type="success" close="alertService.closeAlert('success')" dismiss-on-timeout="5000">{{alertService.getAlertMsg('success')}}</uib<-alert>
	</div>

	<h1 data-ng-class="{ 'title-dirty' : syllabusService.dirty }" ng-cloak>
		{{::syllabusService.syllabus.courseTitle}}

	</h1> 
	
	<div class="buttons-list">

	    <!-- SECTIONS -->
	    <div class="btn-group" uib-dropdown keyboard-nav>
	        <button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" data-ng-disabled="syllabusService.working" uib-dropdown-toggle>
	            <span class="ajouter-libelle">{{syllabusService.section.name}}</span> <span class="caret"></span> 
	        </button>
	        <ul uib-dropdown-menu class="liste-menu-ajout" role="menu" aria-labelledby="simple-btn-keyboard-nav">
	            <li role="menuitem" data-ng-repeat="section in syllabusService.listeSections">
	                <a href="#" data-ng-click="selectSection(section)">{{::section.name }}</a> 
	            </li> 
	        </ul>
	    </div>
		<!-- SAVE -->
		<span data-ng-if="variables.mode === 'edition'">
			<button class="btn btn-primary" type="button" data-ng-disabled="(!syllabusService.dirty || syllabusService.working)" data-ng-click="save()">{{ 'BUTTON_SAVE' | translate }}</button>
			<span class="container-save-working" data-ng-show="syllabusService.working">
				<span class="picto-ajax-loader" data-ng-show="syllabusService.working"></span>
				<span class="message-save-working">{{ 'SAVE_WORKING' | translate }}</span>
			</span>
		</span>
		<!-- MOBILE MENU BUTTON -->
	    <button type="button" class="btn btn-primary mobile-menu-button" data-ng-model="syllabusService.showMobileMenu" uib-btn-checkbox btn-checkbox-true="true" btn-checkbox-false="false">
	        Menu
	    </button>
	</div>

	<div data-ng-if="!planFailed">
		<div data-ng-show="syllabusService.showMobileMenu">
			<!-- Test menu mobile -->
			<mobile-menu></mobile-menu>
			<!-- <div mobile-menu></div> -->
			<!-- <div video-element></div> -->
		</div>
		<div class="row row-content">
			<!-- Menu de gauche -->
			<div data-ng-if="variables.device !== 'mobile'" data-ng-include="'leftMenu/leftMenu.html'"   class="col-sm-3 pull-left left-menu" id="menu" ></div>
			
			<!-- Container de droite -->
			<div data-ng-include="'contentPanel/contentPanel.html'" class="col-sm-9 col-xs-12 pull-left  content-panel" id="content"></div>

			<!-- Modales templates -->
			<div data-ng-include="'deleteModal/confirmModalTemplate.html'"></div>
			<div data-ng-include="'createModal/createElementTemplate.html'"></div> 
		</div>
	</div>

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
	<script src="/opensyllabus2-tool/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.min.js"></script>
	<script src="/opensyllabus2-tool/lib/xeditable/xeditable.min.js"></script>
	<script src="/opensyllabus2-tool/lib/angular-translate/angular-translate.min.js"></script>
	<script src="/opensyllabus2-tool/lib/ng-ckeditor-master/ng-ckeditor.js"></script>
	<script src="/opensyllabus2-tool/lib/bootstrap-ui-datetime-picker-master/dist/datetime-picker.min.js"></script>
	<script src="/opensyllabus2-tool/lib/ng-file-upload-master/dist/ng-file-upload.min.js"></script> 
	<script src="/opensyllabus2-tool/lib/modernizr/modernizr-custom.js"></script> 

<!-- 	// <script src="/opensyllabus2-tool/js/controllers/opensyllabus/opensyllabus.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/leftMenu/leftMenuServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelCtrl.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/contentPanel/contentPanelServices.js"></script>
	// <script src="/opensyllabus2-tool/js/controllers/addElementButton/addElementCtrl.js"></script> -->

	<script src="/opensyllabus2-tool/js/opensyllabus.js"></script>

	<script>
		// Bootstrap application
		// adapter.bootstrap(document.body, ['opensyllabus']);
		angular.bootstrap(document.body, ['opensyllabus']);
	</script>

</body>
</html>

