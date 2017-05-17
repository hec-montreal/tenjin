tenjinApp.config(['$translateProvider', function($translateProvider) {
	'use strict';

	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.preferredLanguage('fr_CA');
	$translateProvider.registerAvailableLanguageKeys(['en_US', 'fr_CA']);

	$translateProvider.useUrlLoader('v1/strings.json');
}]);
