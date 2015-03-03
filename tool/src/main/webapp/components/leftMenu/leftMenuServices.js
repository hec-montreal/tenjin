var leftMenuServices = angular.module('leftMenuServices', ['ngResource']);

leftMenuServices.factory('LeftMenu', ['$resource',
function ($resource){
	return $resource ('opensyllabus2-tool/:syllabus_structure.json', {}, {
		query: {method:'GET', params:{}, isArray:true}
	});
}                                      ]);