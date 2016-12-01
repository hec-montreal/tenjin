tenjinApp.controller('PublishCtrl', [ '$scope', '$translate', 'ngDialog', 'PublishService', function($scope, $translate, ngDialog, PublishService) {
    'use strict';
    
    $scope.publishService = PublishService;
    $scope.syllabus = $scope.publishService.getActiveSyllabus();

    $scope.publishing = false;
    $scope.announcement = false;
    $scope.publicationSuccess = false;
    $scope.announcementTitle = $translate.instant('ANNOUNCEMENT_TITLE');
    $scope.announcementMessage = $translate.instant('ANNOUNCEMENT_MESSAGE');
     var prePublishDialog;
    var postPublishDialog;
    $scope.position = 0;
    $scope.pages = [];

    if ($scope.syllabus){
    var lastPublished = $scope.syllabus.publishedDate;
   $scope.elements = $scope.syllabus.elements;
 }

    $scope.startPublish = function(){
        $scope.publishService.prePublishDialog();
    };

  	$scope.publish = function(){
      ngDialog.close();
      $scope.publishService.working=true;
      $scope.publishService.publishingDialog();
      $scope.publishService.publish().$promise.then(
         function($data){
           $scope.publishService.working=false;
           ngDialog.close();
           $scope.publishService.postPublishDialog($data);
     });
  	};


  	$scope.hasPublicationDate = function(){
      if ($scope.syllabus.publishedDate){
  			return true;
  		}
  		else{
  			return false;
  		}
  	};

    $scope.closePublishDialog= function(){
      if($scope.announcement){
        var title = angular.element(document.getElementById('announcement-title'))[0].value;
        var message = angular.element(document.getElementById('announcement-message'))[0].value; 
        $scope.publishService.createAnnouncement(title, message);
     }
      ngDialog.close();
    };

  	$scope.openAnnouncement = function($announcement){
  		$scope.announcement = $announcement;
  	};


  	$scope.hasSucceeded = function(){
  		return $scope.publicationSuccess;
  	};

}]);
