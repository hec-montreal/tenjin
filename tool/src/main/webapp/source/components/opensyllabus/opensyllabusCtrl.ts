// loader les donnees du plan de cours
opensyllabusApp.controller('OpensyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'ResponsiveService', 'config', 'mockup', '$translate', 'AlertService', 'tmhDynamicLocale', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, ResponsiveService, config, mockup, $translate, AlertService, tmhDynamicLocale) {

	'use strict';

    $scope.infos = {};
 
    $scope.alertService = AlertService;
    $scope.syllabusService = SyllabusService;
    $scope.resourcesService = ResourcesService;
    $scope.userService = UserService;
    $scope.responsiveService = ResponsiveService;

    $scope.errorLoading = false;

    // check device and show mobile menu or not
    var device = $scope.responsiveService.getDevice();
    if (device === "mobile") {
        $scope.syllabusService.showMobileMenu = true;
    } else if (device === "desktop") {
        $scope.syllabusService.showMobileMenu = false;
    }


    var localePromise = tmhDynamicLocale.set('fr');
    localePromise.then( function($ok) {
        $translate.use('fr');
    }, function($error) {

    }); 


    $scope.displayButtons = {
        managementButton: function() {      
            return $scope.userService.hasWritableSection();
        },
        syllabusDropdown: function() {
            return $scope.userService.hasWritableSection();
        }    
    };


    $scope.$watch('syllabusService.syllabus', function(newValue, oldValue) {

        var syllabusSaved = SyllabusService.getSyllabusSaved();
        if (syllabusSaved) {
            if (angular.equals(newValue, syllabusSaved)) {    
                SyllabusService.setDirty(false);
            }else {
                SyllabusService.setDirty(true);
            }
        }

    }, true);

    // mockup
    if (config.mockUp) {
        // MODE DISCONNECTED
        // mockup syllabus
        SyllabusService.setSyllabus(mockup.syllabus);
        // Masquer les items du menu sur mobile
        SyllabusService.hideItemsInit();

        // mockup template        
        SyllabusService.setTemplate(mockup.template);    
        // select first item
        if (mockup.syllabus.elements.length > 0 ) {
            mockup.syllabus.elements[0].$selected = true;
            TreeService.setSelectedItem(mockup.syllabus.elements[0], true);  
        }
        // mockup ressources  
        var resources = mockup.resources;
        if (resources) {
            ResourcesService.setResources(mockup.resources.content_collection[0]);
            $rootScope.$broadcast('RESOURCES_LOADED');
        }

        SyllabusService.working = false;
        $scope.infos.working = false; 

    } else {
        // MODE CONNECTED
        // show loader
        $scope.infos.working = true;


        var loadSyllabusTemplateResourcesTools = function($siteId, $syllabusId?) {
            return $q.allSettled([
                SyllabusService.loadSyllabus($syllabusId).$promise, 
                SyllabusService.loadTemplate().$promise,
                ResourcesService.loadResources($siteId).$promise,
                SakaiToolsService.loadToolEntities($siteId).$promise]).then(function(data) {

                // LOAD SYLLABUS
                if (data[0].state === "fulfilled") {

                    SyllabusService.setSyllabus(data[0].value);
                    // Hide items from mobile menu
                    SyllabusService.hideItemsInit();

                } else if (data[0].state === "rejected") {
                    if (data[0].reason.status === 404) {
                        // load le contenu de la réponse avec statut 404: c'est un plan de cours vide
                        SyllabusService.setSyllabus(data[0].reason.data);
                    } else {
                        $scope.errorLoading = true;
                    }
                }

                // LOAD TEMPLATE
                if (data[1].state === "fulfilled") {
                    // set template
                    SyllabusService.setTemplate(data[1].value);
                } else if (data[1].state === "rejected") {
                    $scope.errorLoading = true;
                }

                // LOAD RESOURCES
                if (data[2].state === "fulfilled") {
                    // set resources
                    ResourcesService.setResources(data[2].value.content_collection[0]);
                } else if (data[2].state === "rejected") {
                    // TODO : loading resources fails too much at the moment....
                    // $scope.errorLoading = true;
                }

                // LOAD SAKAI TOOLS
                if (data[3].state === "fulfilled") {
                    // set sakai tools               
                    SakaiToolsService.setToolsEntities(data[3].value);
                } else if (data[3].state === "rejected") {
                    $scope.errorLoading = true;
                }

                if (!$scope.errorLoading) {
                    // Select the first element by default (caution : have to be done after the load of syllabus + template )
                    if (SyllabusService.syllabus.elements.length > 0) {
                        TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);
                    }

                    // TEST INTERVAL SAUVEGARDE PLAN DE COURS
                    // SyllabusService.startUpdateProcess(5000);
                    // $interval( $scope.updateSyllabus, 5000);

                    $timeout(function() {
                        // anything you want can go here and will safely be run on the next digest.
                        // resize frame (should be done also whenever we change content)
                        if (window.frameElement) {
                            setMainFrameHeight(window.frameElement.id);
                        }
                    });

                } else {
                    AlertService.display('danger');
                }


            }, function(error) {
                console.log('erreur get syllabus');

            });
        };

        
        var loadSakaiTools = function(){
            return SakaiToolsService.loadToolEntities(SyllabusService.syllabus.siteId).$promise.then(function($data){
                $rootScope.$broadcast('TOOLS_LOADED');
                SakaiToolsService.setToolsEntities($data);
            }, function($error){
                // erreur load resources
            });
        };
        
        var loadResources = function (){
        	return ResourcesService.loadResources(SyllabusService.syllabus.siteId).$promise.then(function($data){
                ResourcesService.setResources($data.content_collection[0]);

                $rootScope.$broadcast('RESOURCES_LOADED');

                // $rootScope.Scope.$countWatchers();
            }, function($error){
                // erreur load resources
            });
        };
        
        var loadCitations = function(){
            var citationsLists =  CitationsService.getCitationLists(ResourcesService.resources);
            return $q.allSettled(citationsLists.promises).then( function(data) {
                var updatedResource, updatedResourceId;
                for (var i = 0 ; i < data.length ; i++) {
                    // data contient d'abord le résultat de la première requête
                    if (data[i].state === "fulfilled") {
                       updatedResourceId = citationsLists.resourceIds[i];
                       updatedResource = ResourcesService.getResource(updatedResourceId);

                       updatedResource.resourceChildren = CitationsService.updateJsonProperties(updatedResourceId, data[i].value.citations);
                          
                             
                    } else if (data[i].state === "rejected") {
                        //TODO: Voir si on veut mettre plus d'informations sur le message d'erreur
                        $rootScope.$broadcast('CITATIONS_NOT_LOADED');
                    }
                }

            }, function(error) {
                console.log('erreur get citations');

            });
        };


        var syllabusId = $state.params.id || -1;
        var siteId = $scope.userService.getProfile().site.courseId;

        // Load the syllabus, then the template, the the resources
        // then the citations, then the sakai tools
        // loadSyllabusAndTemplate(syllabusId)
        // .then(loadResources)
        // .then(loadCitations)
        // .then(loadSakaiTools)
        // .finally(function() {
        //     $scope.infos.working = false;
        // });


        loadSyllabusTemplateResourcesTools(siteId, syllabusId)
            .then(loadCitations)
            .finally(function() {
                $scope.infos.working = false;
            });



    }

    $scope.updateSyllabus = function() {

        if (SyllabusService.isDirty()) {
            // parcours des éléments de premier niveau pour voir lesquels sont en brouillon
            for (var i = 0; i < $scope.syllabusService.syllabus.elements.length ; i++ ) {
                var element = $scope.syllabusService.syllabus.elements[i];
                var elementSaved = $scope.syllabusService.syllabusSaved.elements[i];
                if (!angular.equals(element, elementSaved)){
                    console.log("élément : " + element.title);
                    // lancer sauvegarde
                }
            }

        }
    };

    $scope.save = function() {
        
        var results = SyllabusService.saveCurrent();        
        SyllabusService.setWorking(true);
        // var selectedItemId = TreeService.selectedItem.id;
        var emplacement = TreeService.selectedItem.$emplacement;

        results.$promise.then( function($data) {
            SyllabusService.setSyllabus($data);
             // refresh the reference of the selected item and refresh the right panel
            // TreeService.setSelectedItemFromId(selectedItemId);
            TreeService.setSelectedItemFromEmplacement(emplacement);
        },
        function($error) {
            AlertService.display('danger');
        }).finally( function() {
            SyllabusService.setWorking(false);
        });

    };

    $scope.selectSyllabus = function($syllabus) {

        var results = SyllabusService.loadSyllabus($syllabus.id);   
        // SyllabusService.setWorking(true);
        // $scope.infos.working = true;

        results.$promise.then( function($data) {
            // $scope.syllabusService.section = $section;

            SyllabusService.setSyllabus($data);

            // sélection du premier élément par défaut (attention : après chargement du plan de cours + template)
            if ($data.elements.length > 0 ) {
                // data[0].value.elements[0].selected = true;
                TreeService.setSelectedItem($data.elements[0], true);
            }

            // TEST INTERVAL SAUVEGARDE PLAN DE COURS
            // SyllabusService.startUpdateProcess(5000);
            // $interval( $scope.updateSyllabus, 5000);

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });
        },
        function($error) {
            AlertService.display('danger');
        }).finally( function() {
            // SyllabusService.setWorking(false);
            // $scope.infos.working = false;
        });

    };


}]);
