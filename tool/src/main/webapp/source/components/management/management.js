
opensyllabusApp.directive('management', ['$timeout', '$translate','TreeService', 'SyllabusService', 'AlertService', 'ModalService', 'UserService', 'config', 'mockup', function ($timeout, $translate, TreeService, SyllabusService, AlertService, ModalService, UserService, config, mockup){
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'management/management.html',
        controller: function () {

            this.syllabusService = SyllabusService;
            this.treeService = TreeService;
            this.alertService = AlertService;
            this.userService = UserService;
            this.config = config;

            this.infos = {};
            this.disableDelete = true;

            var lastModifiedSyllabus;
            var lastModifiedSyllabusBeforeUpdate;
            var objManagement = this;
            
            this.userSections = []; // user sections with write permissions
            this.allSections = []; // all sections
            // get user sections with write permissions
            for (var i = 0; i < this.userService.profile.sections.length; i++) {
                var sectionUser = this.userService.profile.sections[i];
                this.allSections.push(angular.copy(sectionUser));
                if (sectionUser.permissions.write === true) {
                    this.userSections.push(angular.copy(sectionUser));
                }
            }

            var loadSyllabusList = function (){

                return SyllabusService.loadSyllabusList().$promise.then(function($data){
                    SyllabusService.setSyllabusList($data);

                    // $rootScope.$broadcast('RESOURCES_LOADED');

                }, function($error){
                    // erreur load syllabus list
                    AlertService.display('danger');
                });
            };

            // mockup ou non
            if (config.mockUp === true) {
                this.syllabusService.syllabusList = mockup.syllabusList;
            } else {
                
                // Load the syllabus list (if the syllabus has not been loaded earlier)
                // var syllabusList = SyllabusService.getSyllabusList();
                // if ( !syllabusList  ) {
                // 
                this.infos.working = true;
                loadSyllabusList().finally(function() {
                     objManagement.infos.working = false; 
                });
                // }
            }


            this.addSyllabus = function() {
                // Get sections and libelle
                var data = {};

                // Création modale
                var modal = ModalService.createSyllabus(data);

                // Traitement du résultat
                modal.result.then(function ($syllabus) {
                    // update syllabus list with last modified syllabus as param 
                    updateSyllabusList($syllabus);
                }, function () {
                    // alert add syllabus ko
                    AlertService.display('danger');
                });    
            };

            this.deleteSyllabus = function() {
                // Get list of selected syllabus
                var syllabusList =[];
                for (var i = 0 ; i < this.syllabusService.syllabusList.length; i++) {
                    if (this.syllabusService.syllabusList[i].checked === true) {
                        syllabusList.push(this.syllabusService.syllabusList[i]);
                    }
                }

                // Création modale
                var modal = ModalService.deleteSyllabus(syllabusList);

                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément modifié');
                }, function () {
                    console.debug('élément toujours là');
                });    
            };
            

            this.enableDelete = function() {

                this.disableDelete = true;
                // if a syllabus is checked then the delete button should be enabled
                for (var i = 0 ; i < this.syllabusService.syllabusList.length; i++) {
                    if (this.syllabusService.syllabusList[i].checked === true) {
                        this.disableDelete = false;
                    }
                }
            };

            this.showSections = function($syllabus) {
                var selected = [];
                angular.forEach(this.allSections, function(s) { 
                  if ($syllabus.sections.indexOf(s.id) >= 0) {
                    selected.push(s.name);
                  }
                });

                return selected.length ? selected.join(', ') : $translate.instant("MANAGEMENT_NO_SECTION");
            }; 
            
            this.updateName = function($data, $syllabus) {
                if ($data.length === 0 ) {
                    return $translate.instant("MANAGEMENT_ERREUR_NAME");
                }
                return SyllabusService.saveSyl($syllabus).$promise;
            };

            this.updateSections = function($data, $syllabus) {
                // keep a reference on the old sections
                lastModifiedSyllabusBeforeUpdate = angular.copy($syllabus);            
                // keep a reference to the last modified syllabus (to update sections of other syllabus)
                lastModifiedSyllabus = angular.copy($syllabus);
                // assign sections
                lastModifiedSyllabus.sections = $data;
   
                return SyllabusService.saveSyl(lastModifiedSyllabus).$promise;
            };



            var updateSyllabusList = function($syllabusModified, $oldSyllabus) {

                // if there sections have been associated to a syllabus just before 
                if ( $syllabusModified ) {
   
                    var syllabusList = SyllabusService.getSyllabusList();

                    var sectionsForCommon = [];
                    var sectionsToReassign = [];
                    // check sections differences between the old and the updated syllabus
                    for (var i = 0 ; i < $syllabusModified.sections.length ; i++) {
                        if( $oldSyllabus.sections.indexOf($syllabusModified.sections[i]) === -1) {
                            sectionsToReassign.push($syllabusModified.sections[i]);
                        }                        
                    }
                    for (i = 0 ; i < $oldSyllabus.sections.length ; i++) {                     
                        if( $syllabusModified.sections.indexOf($oldSyllabus.sections[i]) === -1) {
                            sectionsForCommon.push($oldSyllabus.sections[i]);
                        }
                    }

                    // 1- first check all syllabus and remove sections (present in the syllabus modified) 
                    for ( i = 0 ; i < syllabusList.length; i++ ) {
                        if ( syllabusList[i].id !== $syllabusModified.id ) {
                            for ( var j = 0 ; j < sectionsToReassign.length; j++ ) {
                                var index = syllabusList[i].sections.indexOf(sectionsToReassign[j]);
                                if (index > -1) {
                                    syllabusList[i].sections.splice(index, 1);
                                }
                            }    
                        }
                    }

                    // 2- second add orphan sections to the shareable
                    var commonSyllabus = SyllabusService.getCommonSyllabus();
                    if ($oldSyllabus) { 
                        commonSyllabus.sections = commonSyllabus.sections.concat(sectionsForCommon);
                    } 

                }



            };

            this.updateSyllabusList = function($syllabus) {
                // update syllabus
                $syllabus = angular.copy(lastModifiedSyllabus);

                // update syllabus list with last modified syllabus as param 
                updateSyllabusList(lastModifiedSyllabus, lastModifiedSyllabusBeforeUpdate);
                // reset tmp variables
                lastModifiedSyllabus = null;
                lastModifiedSyllabusBeforeUpdate = null;
            };

            this.redirectToSyllabus = function($syllabusId) {
                SyllabusService.setCurrentSyllabusId($syllabusId);
            };

            this.getSyllabusRoute = function($id) {
                return "syllabus/"+$id;
            };

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });

        },
        controllerAs: 'managementCtrl',
        bindToController: {
        }

    };

}]);

