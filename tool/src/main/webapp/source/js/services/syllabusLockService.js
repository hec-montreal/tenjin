tenjinApp.service('SyllabusLockService', ['$q', '$http', function($q, $http) {
	'use strict';

	this.getSyllabusLock = function(syllabusId) {
		return $http.get('v1/syllabus/' + syllabusId + '/lock');
	};

	
}]);
