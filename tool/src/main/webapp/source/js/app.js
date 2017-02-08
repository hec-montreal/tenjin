'use strict';

// Configure momentjs
window['moment-range'].extendMoment(moment);

// Template module
var templateModule = angular.module('templateModule', []);

templateModule.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
});

// App module
var tenjinApp = angular.module('tenjin', [
	'ngResource',
	'ngSanitize',
	'ngAnimate',
	'templateModule',
	'ui.tree',
	'ui.bootstrap',
	'ui.bootstrap.datetimepicker',
	'xeditable',
	'pascalprecht.translate',
	'ngCkeditor',
	'ngPromiseExtras',
	'ui.router',
	'checklist-model',
	'ngDialog',
	'tmh.dynamicLocale'
]);

tenjinApp.config(['$compileProvider', 'tmhDynamicLocaleProvider', function($compileProvider, tmhDynamicLocaleProvider) {
	tmhDynamicLocaleProvider.localeLocationPattern('/tenjin-tool/lib/locale/angular-locale_{{locale}}-ca.js');
}]);

tenjinApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'home/home.html'
		})
		.state('management', {
			url: '/management',
			templateUrl: 'management/management.html'
		})
		.state('syllabus-edit', {
			url: '/syllabus/:id',
			templateUrl: 'syllabus/syllabus.html'
		})
		.state('syllabus-published', {
			url: '/syllabus',
			templateUrl: 'syllabus/syllabus.html'
		});
});

tenjinApp.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
