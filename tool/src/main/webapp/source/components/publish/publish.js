tenjinApp.controller('PublishCtrl', ['$scope', '$translate', 'ngDialog', 'UserService', 'SyllabusService',  function($scope, $translate,  ngDialog, UserService, SyllabusService) {
    'use strict';
    $scope.publishing = false;

    $scope.syllabusService = SyllabusService;
 	$scope.getSyllabusTitle = function(){
  		return SyllabusService.syllabus.title;
  	};

	$scope.publish = function(){
		$scope.publishing=true;
		ngDialog.close();
		ngDialog.openConfirm({ 
         	template: '<div class="publish-dialog-loader-container"><div class="publish-dialog-loader"></div></div>',
    		plain: true,
          	className: 'ngdialog-theme-default',
          	height: 400,
          	width: 600,
           	controller: 'PublishCtrl'  });
  
  		//return SyllabusService.publish();
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
		var sections = [];
		if (SyllabusService.syllabus.common){
			var usedSections = UserService.getSectionsPublish();
			for (var i=0; i < usedSections.length; i++){
				sections[i] = usedSections[i].name;	
			}
			
		}else{	
			sections = SyllabusService.syllabus.sections;
		}
  		return sections;
  	};

}]);
