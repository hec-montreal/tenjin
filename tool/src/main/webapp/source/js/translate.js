﻿tenjinApp.config(['$translateProvider', function($translateProvider) {
	'use strict';

	$translateProvider.useSanitizeValueStrategy('escape');

	$translateProvider.preferredLanguage('fr_CA');
	$translateProvider.registerAvailableLanguageKeys(['en_US', 'fr_CA', 'es_ES']);

	$translateProvider.useUrlLoader('v1/strings.json');
}]);
