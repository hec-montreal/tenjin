﻿tenjinApp.directive('management', ['$timeout', '$translate', 'SyllabusService', 'AlertService', 'ModalService', 'UserService', 'config', function($timeout, $translate, SyllabusService, AlertService, ModalService, UserService, config) {
    'use strict';

    return {
        scope: {},

        restrict: 'E',
        
        templateUrl: 'management/management.html',

        controller: function() {
            this.syllabusService = SyllabusService;
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

            var loadSyllabusList = function() {
                return SyllabusService.loadSyllabusList().$promise.then(function($data) {
                    SyllabusService.setSyllabusList($data);

                }, function($error) {
                    // erreur load syllabus list
                    AlertService.display('danger');
                });
            };


            this.infos.working = true;

            loadSyllabusList().finally(function() {
                objManagement.infos.working = false;
            });

            this.addSyllabus = function() {
                // Get sections and label
                var data = {};

                // Create modal
                var modal = ModalService.createSyllabus(data);

                // Processing result
                modal.result.then(function($syllabus) {
                    // update syllabus list with last modified syllabus as param 
                    updateSyllabusList($syllabus);
                }, function() {
                    // alert add syllabus ko
                    AlertService.display('danger');
                });
            };

            this.deleteSyllabus = function() {
                var syllabusList = [];

                for (var i = 0; i < this.syllabusService.syllabusList.length; i++) {
                    if (this.syllabusService.syllabusList[i].checked === true) {
                        syllabusList.push(this.syllabusService.syllabusList[i]);
                    }
                }

                // Create modal
                var modal = ModalService.deleteSyllabus(syllabusList);

                // Processing result
                modal.result.then(function(selectedItem) {

                }, function() {

                });
            };


            this.enableDelete = function() {
                this.disableDelete = true;

                // if a syllabus is checked then the delete button should be enabled
                for (var i = 0; i < this.syllabusService.syllabusList.length; i++) {
                    if (this.syllabusService.syllabusList[i].checked === true) {
                        this.disableDelete = false;
                    }
                }
            };

            /**
             * Display the sections for a syllabus
             * @param {Object} $syllabus Syllabus
             * @return {String} A string containing the list of the sections or no section
             */
            this.showSections = function($syllabus) {
                var selected = [];
                angular.forEach(this.allSections, function(s) {
                    if ($syllabus.sections.indexOf(s.id) >= 0) {
                        selected.push(s.name);
                    }
                });

                return selected.length ? selected.join(', ') : $translate.instant("MANAGEMENT_NO_SECTION");
            };

            this.updateTitle = function($data, $syllabus) {
                if ($data.length === 0) {
                    return $translate.instant("MANAGEMENT_ERREUR_NAME");
                }
                $syllabus.title = $data;
                return SyllabusService.save($syllabus).$promise;
            };

            this.updateSections = function($data, $syllabus) {
                // keep a reference on the old sections
                lastModifiedSyllabusBeforeUpdate = angular.copy($syllabus);
                // keep a reference to the last modified syllabus (to update sections of other syllabus)
                lastModifiedSyllabus = angular.copy($syllabus);
                // assign sections
                lastModifiedSyllabus.sections = $data;

                return SyllabusService.save(lastModifiedSyllabus).$promise;
            };

            var updateSyllabusList = function($syllabusModified, $oldSyllabus) {
                if ($syllabusModified) {
                    var syllabusList = SyllabusService.getSyllabusList();

                    var sectionsForCommon = [];
                    var sectionsToReassign = [];
                    // check sections differences between the old and the updated syllabus
                    // edition
                    if ($oldSyllabus) {
                        for (var i = 0; i < $syllabusModified.sections.length; i++) {
                            if ($oldSyllabus.sections.indexOf($syllabusModified.sections[i]) === -1) {
                                sectionsToReassign.push($syllabusModified.sections[i]);
                            }
                        }
                        for (i = 0; i < $oldSyllabus.sections.length; i++) {
                            if ($syllabusModified.sections.indexOf($oldSyllabus.sections[i]) === -1) {
                                sectionsForCommon.push($oldSyllabus.sections[i]);
                            }
                        }
                    } // creation
                    else {
                        sectionsToReassign = sectionsToReassign.concat($syllabusModified.sections);
                    }

                    // 1- first check all syllabus and remove sections (present in the syllabus modified) 
                    for (var i = 0; i < syllabusList.length; i++) {
                        if (syllabusList[i].id !== $syllabusModified.id) {
                            for (var j = 0; j < sectionsToReassign.length; j++) {
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

                    // 3- remove syllabus if the user does not still have access to it
                    var sectionsWrite = UserService.getSectionsWrite();

                    for (var i = syllabusList.length - 1; i >= 0; i--) {

                        var sectionsSyllabus = syllabusList[i].sections;
                        var sectionWritePresent = false;
                        for (var j = 0; j < sectionsWrite.length; j++) {
                            if (sectionsSyllabus.indexOf(sectionsWrite[j].id) > -1) {
                                sectionWritePresent = true;
                                break;
                            }
                        }

                        if (!UserService.profile.site.permissions.write &&
                            !syllabusList[i].common &&
                            syllabusList[i].createdBy !== UserService.profile.userId &&
                            !sectionWritePresent) {
                            // remove syllabus from the syllabus list
                            syllabusList.splice(i, 1);
                        }
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
                return "syllabus/" + $id;
            };

            this.showStatus = function ($statusId){
                return $translate.instant(config.statusLabel[$statusId]) ;
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
        bindToController: {}
    };
}]);