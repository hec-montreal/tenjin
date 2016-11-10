tenjinApp.controller('PublishCtrl', ['$scope', '$translate', 'ngDialog', 'UserService', 'SyllabusService',  function($scope, $translate,  ngDialog, UserService, SyllabusService) {
    'use strict';

    $scope.syllabusService = SyllabusService;
 	$scope.getSyllabusTitle = function(){
  		return SyllabusService.syllabus.title;
  	};

	$scope.publish = function(){
  		return SyllabusService.publish();
  	};

  	$scope.hasPublicationDate = function(){
  		if (SyllabusService.syllabus.publishedDate)
  			return true;
  		else
  			return false;
  	};

    $scope.openPublishDialog= function(){
         ngDialog.openConfirm({ 
         	template: 'publish/publish.html',
          	className: 'ngdialog-theme-default',
          	height: 400,
          	width: 600,
           	controller: 'PublishCtrl'  });
        
    };

	$scope.getSections = function(){
		var sections;
		if (SyllabusService.syllabus.common){
			sections = UserService.getSectionsPublish();
		}else{	
			sections = SyllabusService.syllabus.sections;
		}
  		return sections;
  	};

}]);
