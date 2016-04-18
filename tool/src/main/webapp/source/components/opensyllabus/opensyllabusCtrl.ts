// loader les donnees du plan de cours
opensyllabusApp.controller('OpensyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'ResponsiveService', 'config', 'mockup', '$translate', 'AlertService', 'tmhDynamicLocale', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, ResponsiveService, config, mockup, $translate, AlertService, tmhDynamicLocale) {

	'use strict';

    $scope.infos = {};
 
    $scope.alertService = AlertService;
    $scope.syllabusService = SyllabusService;
    $scope.resourcesService = ResourcesService;
    $scope.userService = UserService;
    $scope.responsiveService = ResponsiveService;

    $scope.planLoaded = false;
    $scope.templateLoaded = false;

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

        var loadSyllabusAndTemplate = function($syllabusId?){
            return $q.allSettled([SyllabusService.loadSyllabus($syllabusId).$promise, SyllabusService.loadTemplate().$promise]).then(function(data) {

                // data contient d'abord le résultat de la première requête
                if (data[0].state === "fulfilled") {

                    SyllabusService.setSyllabus(data[0].value);
                    // Hide items from mobile menu
                    SyllabusService.hideItemsInit();
  
                } else if (data[0].state === "rejected") {
                    if (data[0].reason.status === 404) {
                        // load le contenu de la réponse avec statut 404: c'est un plan de cours vide
                        SyllabusService.setSyllabus(data[0].reason.data);
                    } else {
                        $scope.planFailed= true;
                    }
                }

                if (data[1].state === "fulfilled") {
                    // MOCKUP template
                    SyllabusService.setTemplate(data[1].value);
                } else if (data[1].state === "rejected") {
                    $scope.templateFailed = true;
                }
                      
                   
                if ( !$scope.planFailed ) {
                    // sélection du premier élément par défaut (attention : après chargement du plan de cours + template)
                    if (SyllabusService.syllabus.elements.length > 0 ) {
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

        // Load the syllabus, then the template, 
        // then the citations, then the sakai tools
        loadSyllabusAndTemplate(syllabusId)
        .then(loadResources)
        .then(loadCitations)
        .then(loadSakaiTools)
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
