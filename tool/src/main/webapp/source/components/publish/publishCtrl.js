tenjinApp.controller('PublishCtrl', ['$scope', '$resource', '$translate', 'ngDialog', 'UserService', 'SyllabusService',  function($scope, $resource, $translate,  ngDialog, UserService, SyllabusService) {
    'use strict';
    $scope.publishing = false;
    $scope.announcement = false;
    $scope.publicationSuccess = false;
    $scope.announcementTitle = $translate.instant('ANNOUNCEMENT_TITLE');
    $scope.announcementMessage = $translate.instant('ANNOUNCEMENT_MESSAGE');
    var announcementProviderId = $resource('tools/announcement/:id.json');
    var lastPublished = SyllabusService.syllabus.publishedDate;
    $scope.position = 0;
    $scope.pages = [];

    $scope.syllabusService = SyllabusService;
 	
  	$scope.closePublishDialog = function(){
  		if ($scope.announcement){
  			var title = angular.element(document.getElementById('announcement-title'))[0].value;
  			var message = angular.element(document.getElementById('announcement-message'))[0].value; 
  		
  			var announcement= {"title":  title, "message": message};
  			// announcementProviderId.save({
     //            id: SyllabusService.syllabus.siteId}, announcement);
  		}
   		ngDialog.close();
 	};

	$scope.publish = function(){
		$scope.publishing=true;
		ngDialog.close();
		ngDialog.openConfirm({ 
         	template: 'publish/publishing.html',
          	className: 'ngdialog-theme-default',
          	height: 500,
          	width: 600,
           	controller: 'PublishCtrl',
           	closeByEscape: false,
           	closeByDocument: false 
        });  
  	    SyllabusService.publish().$promise.then(function($data) {
           ngDialog.close();
           ngDialog.openConfirm({ 
           		template: 'publish/postPublish.html',
           		height: 500,
           		width: 600,
           		data: {
           			published: true,
           			publishedSyllabus: $data
           		},
           		controller: 'PublishCtrl',
           		closeByEscape: false,
           		closeByDocument: false
           		  });
        
        }, function($error) {
            $scope.publicationSuccess = false;
        });
  	};

  	$scope.hasPublicationDate = function(){
  		if (SyllabusService.syllabus.publishedDate){
  			return true;
  		}
  		else{
  			return false;
  		}
  	};

    $scope.openPublishDialog= function(){
         ngDialog.openConfirm({ 
         	template: 'publish/prePublish.html',
          	className: 'ngdialog-theme-default',
          	height: 500,
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

  	$scope.openAnnouncement = function(){
  		if($scope.announcement){
  			$scope.announcement = false;
  		}
  		else{
  			$scope.announcement =true;
  		}
  	};

  	$scope.hasSucceeded = function(){
  		return $scope.publicationSuccess;
  	};

  	$scope.getModifiedPages = function($elements, $position, $pages){
  		
  		var element;
  		var page;

  		for (var i=0; i < $elements.length;i++)	{
  			element = $elements[i];
  			if (element.elements){
  				$pages[$position] = element.title;
  				$position++;
  			}
  			else{
  				getModifiedPages(element.elements, $position, $pages);
  			}
		}

		return $pages;
  	};
}]);
