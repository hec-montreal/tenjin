tenjinApp.controller('PublishModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', '$translate', '$filter', 'SyllabusService', 'PublishService', 'AlertService', function($scope, $rootScope, $uibModalInstance, $translate, $filter, SyllabusService, PublishService, AlertService) {
	'use strict';

	// Possible statuses:
	// 'beforePublish'
	// 'duringPublish'
	// 'afterPublish'
	$scope.status = 'beforePublish';

	$scope.syllabus = SyllabusService.getSyllabus();
	$scope.publishing = false;

	$scope.sections = PublishService.getTargetedSections().sort(function(a, b) {
		return a.localeCompare(b);
	});

	$scope.modifiedPages = PublishService.getModifiedPages();

	$scope.announcementData = {
        	doAnnounce : false,
	        announceTitle : $translate.instant('ANNOUNCEMENT_TITLE'),
        	announceMessage : $translate.instant('ANNOUNCEMENT_MESSAGE') + ' ' + $filter('date')(Date.now(), 'd MMMM y h:mm:ss a')
	};


	$scope.publish = function() {
		$scope.status = 'duringPublish'

		$rootScope.$broadcast('publish');
	};

	$scope.close = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.checkAnnouncementAndClose = function() {
		if ($scope.announcementData.doAnnounce) {

			var sections = [];
			if ($scope.syllabus.common != true) {
				console.log("not common");
				sections = $scope.syllabus.sections;
			}

			//PublishService.createAnnouncement($scope.announcementData.announceTitle, $scope.announcementData.announceMessage, sections).then(function() {
			PublishService.createAnnouncement($scope.announcementData.announceTitle, $scope.announcementData.announceMessage, sections).then(function() {
			       AlertService.showAlert('createAnnouncementSuccess');
			}).catch(function(reason) {
				AlertService.showAlert('cannotCreateAnnouncement');
			});
		}

		$scope.close();
	}

	$scope.isCommonSyllabusPublished = function() {
		return PublishService.isCommonSyllabusPublished();
	}

	$rootScope.$on('published', function() {
		$scope.status = 'afterPublish';
	});

	$rootScope.$on('cannotPublishSyllabus', function() {
		$scope.close();
	});
}]);
