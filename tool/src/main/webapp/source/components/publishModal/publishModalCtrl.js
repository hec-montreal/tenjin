tenjinApp.controller('PublishModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', '$translate', '$filter', 'SyllabusService', 'PublishService', function($scope, $rootScope, $uibModalInstance, $translate, $filter, SyllabusService, PublishService) {
	'use strict';

	// Possible statuses:
	// 'beforePublish'
	// 'duringPublish'
	// 'afterPublish'
	$scope.status = 'beforePublish';

	$scope.syllabus = SyllabusService.getSyllabus();
	$scope.publishing = false;
	$scope.sections = PublishService.getSections();
	$scope.modifiedPages = PublishService.getModifiedPages();

	$scope.doAnnounce = false;
	$scope.announceTitle = $translate.instant('ANNOUNCEMENT_TITLE');
	$scope.announceMessage = $translate.instant('ANNOUNCEMENT_MESSAGE') + ' ' + $filter('date')(Date.now(), 'd MMMM y h:mm:ss a');

	$scope.publish = function() {
		$scope.status = 'duringPublish'

		$rootScope.$broadcast('publish');
	};

	$scope.close = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.checkAnnounceAndClose = function() {
		if ($scope.doAnnounce) {
			PublishService.createAnnouncement($scope.announceTitle, $scope.announceMessage);
		}

		$scope.close();
	}

	$scope.isCommonSyllabusPublished = function() {
		return PublishService.isCommonSyllabusPublished();
	}

	$rootScope.$on('published', function(data, args) {
		$scope.status = 'afterPublish';
	});
}]);
