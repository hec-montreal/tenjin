tenjinApp.controller('PublishCtrl', ['$scope', '$translate', 'ngDialog', '$filter', 'SyllabusService', 'PublishService', function($scope, $translate, ngDialog, $filter, SyllabusService, PublishService) {
	'use strict';

	$scope.publishService = PublishService;
	$scope.syllabusService = SyllabusService;
	$scope.syllabus = $scope.publishService.getActiveSyllabus();

	$scope.publishing = false;
	$scope.announcement = false;
	$scope.publicationSuccess = false;

	var prePublishDialog;
	var postPublishDialog;

	$scope.position = 0;
	$scope.pages = [];

	if ($scope.syllabus) {
		$scope.elements = $scope.syllabus.elements;
		$scope.announcementTitle = $translate.instant('ANNOUNCEMENT_TITLE');

		//Since no data in callback, the current date is considered publication date
		$scope.announcementMessage = $translate.instant('ANNOUNCEMENT_MESSAGE') + ' ' + $filter('date')(Date.now(), 'd MMMM y h:mm:ss a');
	}

	$scope.startPublish = function() {
		var changedPages = $scope.publishService.getModifiedPages();
		$scope.publishService.prePublishDialog(changedPages);
	};

	$scope.publish = function() {
		ngDialog.close();
		$scope.publishService.working = true;

		$scope.publishService.publishingDialog();
		$scope.publishService.publish().$promise.then(function($data) {
			$scope.publishService.working = false;
			ngDialog.close();
			$scope.syllabusService.reloadSyllabus();
			$scope.publishService.postPublishDialog($data);
		});
	};

	$scope.closePublishDialog = function() {
		if ($scope.announcement) {
			var title = angular.element(document.getElementById('announcement-title'))[0].value;
			var message = angular.element(document.getElementById('announcement-message'))[0].value;
			$scope.publishService.createAnnouncement(title, message);
		}
		
		ngDialog.close();
	};

	$scope.openAnnouncement = function($announcement) {
		$scope.announcement = $announcement;
	};


	$scope.hasSucceeded = function() {
		return $scope.publicationSuccess;
	};

	$scope.collapseAll = function() {
		$scope.$broadcast('angular-ui-tree:collapse-all');
	};

	$scope.expandAll = function() {
		$scope.$broadcast('angular-ui-tree:expand-all');
	};
}]);
