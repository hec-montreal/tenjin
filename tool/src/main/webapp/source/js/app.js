'use strict';

// Configure momentjs
window['moment-range'].extendMoment(moment);

// Util to make HTTP requests in the console
var httputil = {
	base: 'http://localhost:8080/portal/site/simonThreeSection/tool/bbbdee14-89d3-420e-85ac-a493251ce1d5/v1',

	get: function(url) {
		$.get(httputil.base + url, function(res) {
			console.log(res);
		})
	},

	post: function(url, data) {
		$.post(httputil.base + url, data, function(res) {
			console.log(res);
		})
	}
};

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
			url: '/syllabus/:id/:elementId',
			templateUrl: 'syllabus/syllabus.html'
		})
		.state('edition-student-view', {
			url: '/syllabus-ed/:id/:elementId',
			templateUrl: 'syllabus/syllabus.html'
		})
		.state('syllabus-published', {
			url: '/syllabus/:elementId',
			templateUrl: 'syllabus/syllabus.html'
		});
});

tenjinApp.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
