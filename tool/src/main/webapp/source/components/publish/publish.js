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
         	template: 'publish/publishing.html',
          	className: 'ngdialog-theme-default',
          	height: 300,
          	width: 400,
           	controller: 'PublishCtrl'  });
  
  	    SyllabusService.publish().$promise.then(function($data) {
           var publishedSyllabus = $data;
           ngDialog.close();
           ngDialog.openConfirm({ 
          	template: 'publish/postPublish.html',
          	height: 300,
          	width: 400,
           	controller: 'PublishCtrl'  });
        
        }, function($error) {
            AlertService.display('danger');
        });;
  	};

  	$scope.hasPublicationDate = function(){
  		if (SyllabusService.syllabus.publishedDate)
  			return true;
  		else
  			return false;
  	};

    $scope.openPublishDialog= function(){
         ngDialog.openConfirm({ 
         	template: 'publish/prePublish.html',
          	className: 'ngdialog-theme-default',
          	height: 300,
          	width: 400,
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
