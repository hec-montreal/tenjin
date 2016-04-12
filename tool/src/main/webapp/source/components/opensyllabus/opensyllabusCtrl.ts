// loader les donnees du plan de cours
opensyllabusApp.controller('OpensyllabusCtrl', ['$rootScope', '$scope', '$interval', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'ResponsiveService', 'config', 'mockup', '$translate', 'AlertService', 'tmhDynamicLocale', 'variables', function($rootScope, $scope, $interval, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, ResponsiveService, config, mockup, $translate, AlertService, tmhDynamicLocale, variables) {

	'use strict';

    $scope.infos = {};
 
    $scope.alertService = AlertService;
    $scope.syllabusService = SyllabusService;
    $scope.resourcesService = ResourcesService;
    $scope.userService = UserService;
    $scope.responsiveService = ResponsiveService;

    $scope.planLoaded = false;
    $scope.templateLoaded = false;

    $scope.variables = variables;

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
        // MODE DECONNECTE
        // mockup syllabus
        SyllabusService.setSyllabus(mockup.syllabus);
        // Masquer les items du menu sur mobile
        SyllabusService.hideItemsInit();

        // mockup template
        // var template = {"114":[{"id":287,"label":"Texte","type":"text"},{"id":288,"label":"Document","type":"document"},{"id":289,"label":"Hyperlien","type":"url"},{"id":290,"label":"Coordonnées","type":"composite"},{"id":291,"label":"Lien vers un outil","type":"sakai_entity"}],"115":[{"id":262,"label":"Texte","type":"text"},{"id":263,"label":"Document","type":"document"},{"id":264,"label":"Hyperlien","type":"url"},{"id":265,"label":"Coordonnées","type":"composite"},{"id":266,"label":"Lien vers un outil","type":"sakai_entity"}],"112":[{"id":277,"label":"Texte","type":"text"},{"id":278,"label":"Document","type":"document"},{"id":279,"label":"Hyperlien","type":"url"},{"id":280,"label":"Coordonnées","type":"composite"},{"id":281,"label":"Lien vers un outil","type":"sakai_entity"}],"113":[{"id":282,"label":"Texte","type":"text"},{"id":283,"label":"Document","type":"document"},{"id":284,"label":"Hyperlien","type":"url"},{"id":285,"label":"Coordonnées","type":"composite"},{"id":286,"label":"Lien vers un outil","type":"sakai_entity"}],"110":[{"id":267,"label":"Texte","type":"text"},{"id":268,"label":"Document","type":"document"},{"id":269,"label":"Hyperlien","type":"url"},{"id":270,"label":"Coordonnées","type":"composite"},{"id":271,"label":"Lien vers un outil","type":"sakai_entity"}],"111":[{"id":272,"label":"Texte","type":"text"},{"id":273,"label":"Document","type":"document"},{"id":274,"label":"Hyperlien","type":"url"},{"id":275,"label":"Coordonnées","type":"composite"},{"id":276,"label":"Lien vers un outil","type":"sakai_entity"}],"35":[{"id":76,"label":"Texte","type":"text"},{"id":77,"label":"Document","type":"document"},{"id":78,"label":"Hyperlien","type":"url"},{"id":79,"label":"Référence bibliographique","type":"citation"}],"33":[{"id":294,"label":"Texte","type":"text"},{"id":295,"label":"Document","type":"document"},{"id":296,"label":"Hyperlien","type":"url"},{"id":297,"label":"Référence bibliographique","type":"citation"},{"id":298,"label":"Lien vers un outil","type":"sakai_entity"}],"34":[{"id":299,"label":"Texte","type":"text"},{"id":300,"label":"Document","type":"document"},{"id":301,"label":"Hyperlien","type":"url"},{"id":302,"label":"Référence bibliographique","type":"citation"},{"id":303,"label":"Lien vers un outil","type":"sakai_entity"}],"82":[{"id":103,"label":"Description","type":"rubric"},{"id":98,"label":"Objectifs","type":"rubric"},{"id":99,"label":"Critère d'évaluation","type":"rubric"},{"id":100,"label":"Préparation à l'évaluation","type":"rubric"},{"id":101,"label":"Modalités de remise et pénalités","type":"rubric"},{"id":102,"label":"Ressources générales","type":"rubric"}],"83":[{"id":109,"label":"Description","type":"rubric"},{"id":104,"label":"Objectifs","type":"rubric"},{"id":105,"label":"Critère d'évaluation","type":"rubric"},{"id":106,"label":"Préparation à l'évaluation","type":"rubric"},{"id":107,"label":"Modalités de remise et pénalités","type":"rubric"},{"id":108,"label":"Ressources générales","type":"rubric"}],"80":[{"id":91,"label":"Description","type":"rubric"},{"id":86,"label":"Objectifs","type":"rubric"},{"id":87,"label":"Critère d'évaluation","type":"rubric"},{"id":88,"label":"Préparation à l'évaluation","type":"rubric"},{"id":89,"label":"Modalités de remise et pénalités","type":"rubric"},{"id":90,"label":"Ressources générales","type":"rubric"}],"81":[{"id":97,"label":"Description","type":"rubric"},{"id":92,"label":"Objectifs","type":"rubric"},{"id":93,"label":"Critère d'évaluation","type":"rubric"},{"id":94,"label":"Préparation à l'évaluation","type":"rubric"},{"id":95,"label":"Modalités de remise et pénalités","type":"rubric"},{"id":96,"label":"Ressources générales","type":"rubric"}],"86":[{"id":147,"label":"Texte","type":"text"},{"id":148,"label":"Document","type":"document"},{"id":149,"label":"Hyperlien","type":"url"},{"id":150,"label":"Coordonnées","type":"composite"},{"id":151,"label":"Lien vers un outil","type":"sakai_entity"}],"87":[{"id":156,"label":"Lien vers un outil","type":"sakai_entity"},{"id":155,"label":"Coordonnées","type":"composite"},{"id":154,"label":"Hyperlien","type":"url"},{"id":153,"label":"Document","type":"document"},{"id":152,"label":"Texte","type":"text"}],"84":[{"id":115,"label":"Description","type":"rubric"},{"id":110,"label":"Objectifs","type":"rubric"},{"id":111,"label":"Critère d'évaluation","type":"rubric"},{"id":112,"label":"Préparation à l'évaluation","type":"rubric"},{"id":113,"label":"Modalités de remise et pénalités","type":"rubric"},{"id":114,"label":"Ressources générales","type":"rubric"}],"85":[{"id":117,"label":"Texte","type":"text"},{"id":118,"label":"Document","type":"document"},{"id":121,"label":"Lien vers un outil","type":"sakai_entity"},{"id":120,"label":"Coordonnées","type":"composite"},{"id":119,"label":"Hyperlien","type":"url"}],"3":[{"id":40,"label":"Texte","type":"text"},{"id":41,"label":"Document","type":"document"},{"id":42,"label":"Hyperlien","type":"url"},{"id":304,"label":"Image","type":"image"},{"id":305,"label":"Vidéo","type":"video"}],"2":[{"id":37,"label":"Texte","type":"text"},{"id":38,"label":"Document","type":"document"},{"id":39,"label":"Hyperlien","type":"url"},{"id":292,"label":"Image","type":"image"},{"id":293,"label":"Vidéo","type":"video"}],"1":[{"id":2,"label":"Description","type":"rubric"},{"id":3,"label":"Objectifs","type":"rubric"},{"id":4,"label":"Approche pédagogique","type":"rubric"}],"7":[{"id":55,"label":"Ressources bibliographiques","type":"rubric"},{"id":8,"label":"Ressources bibliographiques complémentaire","type":"rubric"},{"id":9,"label":"Ressources générales","type":"rubric"},{"id":10,"label":"Cas","type":"rubric"},{"id":11,"label":"Outils","type":"rubric"},{"id":35,"label":"Anciens examens","type":"rubric"}],"6":[{"id":50,"label":"Coordonnée","type":"contact_info"}],"5":[{"id":6,"label":"Coordonnateur","type":"rubric"},{"id":46,"label":"Enseignant(s)","type":"rubric"},{"id":47,"label":"Stagiaire(s) d'enseignement","type":"rubric"},{"id":48,"label":"Conférencier(s)","type":"rubric"},{"id":49,"label":"Secrétaire(s)","type":"rubric"}],"4":[{"id":43,"label":"Texte","type":"text"},{"id":44,"label":"Document","type":"document"},{"id":45,"label":"Hyperlien","type":"url"},{"id":306,"label":"Image","type":"image"},{"id":307,"label":"Vidéo","type":"video"}],"9":[{"id":64,"label":"Texte","type":"text"},{"id":65,"label":"Document","type":"document"},{"id":66,"label":"Hyperlien","type":"url"},{"id":67,"label":"Référence bibliographique","type":"citation"}],"8":[{"id":60,"label":"Texte","type":"text"},{"id":61,"label":"Document","type":"document"},{"id":62,"label":"Hyperlien","type":"url"},{"id":63,"label":"Référence bibliographique","type":"citation"}],"19":[{"id":127,"label":"Texte","type":"text"},{"id":128,"label":"Document","type":"document"},{"id":131,"label":"Lien vers un outil","type":"sakai_entity"},{"id":130,"label":"Coordonnées","type":"composite"},{"id":129,"label":"Hyperlien","type":"url"}],"55":[{"id":56,"label":"Texte","type":"text"},{"id":57,"label":"Document","type":"document"},{"id":58,"label":"Hyperlien","type":"url"},{"id":59,"label":"Référence bibliographique","type":"citation"}],"17":[{"id":33,"label":"Séance de cours","type":"lecture"},{"id":34,"label":"Séance de travaux pratique","type":"tutorial"}],"18":[{"id":122,"label":"Texte","type":"text"},{"id":123,"label":"Document","type":"document"},{"id":126,"label":"Lien vers un outil","type":"sakai_entity"},{"id":125,"label":"Coordonnées","type":"composite"},{"id":124,"label":"Hyperlien","type":"url"}],"15":[{"id":23,"label":"Texte","type":"text"},{"id":24,"label":"Document","type":"document"},{"id":25,"label":"Hyperlien","type":"url"},{"id":26,"label":"Référence bibliographique","type":"citation"},{"id":27,"label":"Lien vers un outil","type":"sakai_entity"}],"16":[{"id":28,"label":"Texte","type":"text"},{"id":29,"label":"Document","type":"document"},{"id":30,"label":"Hyperlien","type":"url"},{"id":31,"label":"Référence bibliographique","type":"citation"},{"id":32,"label":"Lien vers un outil","type":"sakai_entity"}],"13":[{"id":85,"label":"Description","type":"rubric"},{"id":18,"label":"Objectifs","type":"rubric"},{"id":19,"label":"Critère d'évaluation","type":"rubric"},{"id":20,"label":"Préparation à l'évaluation","type":"rubric"},{"id":21,"label":"Modalités de remise et pénalités","type":"rubric"},{"id":22,"label":"Ressources générales","type":"rubric"}],"14":[{"id":17,"label":"Regroupement","type":"composite"},{"id":15,"label":"Séance de cours","type":"lecture"},{"id":16,"label":"Séance de travaux pratique","type":"tutorial"}],"11":[{"id":72,"label":"Texte","type":"text"},{"id":73,"label":"Document","type":"document"},{"id":74,"label":"Hyperlien","type":"url"},{"id":75,"label":"Référence bibliographique","type":"citation"}],"12":[{"id":13,"label":"Examen intra","type":"examen"},{"id":80,"label":"Examen final","type":"examen"},{"id":81,"label":"Travail","type":"evaluation"},{"id":82,"label":"Participation","type":"evaluation"},{"id":83,"label":"Test/Quiz","type":"evaluation"},{"id":84,"label":"Autre","type":"evaluation"}],"21":[{"id":137,"label":"Texte","type":"text"},{"id":138,"label":"Document","type":"document"},{"id":141,"label":"Lien vers un outil","type":"sakai_entity"},{"id":140,"label":"Coordonnées","type":"composite"},{"id":139,"label":"Hyperlien","type":"url"}],"20":[{"id":132,"label":"Texte","type":"text"},{"id":133,"label":"Document","type":"document"},{"id":136,"label":"Lien vers un outil","type":"sakai_entity"},{"id":135,"label":"Coordonnées","type":"composite"},{"id":134,"label":"Hyperlien","type":"url"}],"109":[{"id":232,"label":"Texte","type":"text"},{"id":233,"label":"Document","type":"document"},{"id":234,"label":"Hyperlien","type":"url"},{"id":235,"label":"Coordonnées","type":"composite"},{"id":236,"label":"Lien vers un outil","type":"sakai_entity"}],"108":[{"id":257,"label":"Texte","type":"text"},{"id":258,"label":"Document","type":"document"},{"id":259,"label":"Hyperlien","type":"url"},{"id":260,"label":"Coordonnées","type":"composite"},{"id":261,"label":"Lien vers un outil","type":"sakai_entity"}],"107":[{"id":252,"label":"Texte","type":"text"},{"id":253,"label":"Document","type":"document"},{"id":254,"label":"Hyperlien","type":"url"},{"id":255,"label":"Coordonnées","type":"composite"},{"id":256,"label":"Lien vers un outil","type":"sakai_entity"}],"106":[{"id":247,"label":"Texte","type":"text"},{"id":248,"label":"Document","type":"document"},{"id":249,"label":"Hyperlien","type":"url"},{"id":250,"label":"Coordonnées","type":"composite"},{"id":251,"label":"Lien vers un outil","type":"sakai_entity"}],"105":[{"id":242,"label":"Texte","type":"text"},{"id":243,"label":"Document","type":"document"},{"id":244,"label":"Hyperlien","type":"url"},{"id":245,"label":"Coordonnées","type":"composite"},{"id":246,"label":"Lien vers un outil","type":"sakai_entity"}],"104":[{"id":237,"label":"Texte","type":"text"},{"id":238,"label":"Document","type":"document"},{"id":239,"label":"Hyperlien","type":"url"},{"id":240,"label":"Coordonnées","type":"composite"},{"id":241,"label":"Lien vers un outil","type":"sakai_entity"}],"103":[{"id":202,"label":"Texte","type":"text"},{"id":203,"label":"Document","type":"document"},{"id":204,"label":"Hyperlien","type":"url"},{"id":205,"label":"Coordonnées","type":"composite"},{"id":206,"label":"Lien vers un outil","type":"sakai_entity"}],"99":[{"id":212,"label":"Texte","type":"text"},{"id":213,"label":"Document","type":"document"},{"id":214,"label":"Hyperlien","type":"url"},{"id":215,"label":"Coordonnées","type":"composite"},{"id":216,"label":"Lien vers un outil","type":"sakai_entity"}],"102":[{"id":227,"label":"Texte","type":"text"},{"id":228,"label":"Document","type":"document"},{"id":229,"label":"Hyperlien","type":"url"},{"id":230,"label":"Coordonnées","type":"composite"},{"id":231,"label":"Lien vers un outil","type":"sakai_entity"}],"101":[{"id":222,"label":"Texte","type":"text"},{"id":223,"label":"Document","type":"document"},{"id":224,"label":"Hyperlien","type":"url"},{"id":225,"label":"Coordonnées","type":"composite"},{"id":226,"label":"Lien vers un outil","type":"sakai_entity"}],"100":[{"id":217,"label":"Texte","type":"text"},{"id":218,"label":"Document","type":"document"},{"id":219,"label":"Hyperlien","type":"url"},{"id":220,"label":"Coordonnées","type":"composite"},{"id":221,"label":"Lien vers un outil","type":"sakai_entity"}],"49":[{"id":54,"label":"Coordonnée","type":"contact_info"}],"98":[{"id":207,"label":"Texte","type":"text"},{"id":208,"label":"Document","type":"document"},{"id":209,"label":"Hyperlien","type":"url"},{"id":210,"label":"Coordonnées","type":"composite"},{"id":211,"label":"Lien vers un outil","type":"sakai_entity"}],"48":[{"id":53,"label":"Coordonnée","type":"contact_info"}],"97":[{"id":176,"label":"Lien vers un outil","type":"sakai_entity"},{"id":174,"label":"Hyperlien","type":"url"},{"id":173,"label":"Document","type":"document"},{"id":172,"label":"Texte","type":"text"},{"id":175,"label":"Coordonnées","type":"composite"}],"96":[{"id":200,"label":"Coordonnées","type":"composite"},{"id":199,"label":"Hyperlien","type":"url"},{"id":198,"label":"Document","type":"document"},{"id":197,"label":"Texte","type":"text"},{"id":201,"label":"Lien vers un outil","type":"sakai_entity"}],"95":[{"id":195,"label":"Coordonnées","type":"composite"},{"id":196,"label":"Lien vers un outil","type":"sakai_entity"},{"id":194,"label":"Hyperlien","type":"url"},{"id":193,"label":"Document","type":"document"},{"id":192,"label":"Texte","type":"text"}],"94":[{"id":191,"label":"Lien vers un outil","type":"sakai_entity"},{"id":190,"label":"Coordonnées","type":"composite"},{"id":189,"label":"Hyperlien","type":"url"},{"id":188,"label":"Document","type":"document"},{"id":187,"label":"Texte","type":"text"}],"93":[{"id":185,"label":"Coordonnées","type":"composite"},{"id":186,"label":"Lien vers un outil","type":"sakai_entity"},{"id":184,"label":"Hyperlien","type":"url"},{"id":183,"label":"Document","type":"document"},{"id":182,"label":"Texte","type":"text"}],"47":[{"id":52,"label":"Coordonnée","type":"contact_info"}],"92":[{"id":177,"label":"Texte","type":"text"},{"id":178,"label":"Document","type":"document"},{"id":179,"label":"Hyperlien","type":"url"},{"id":181,"label":"Lien vers un outil","type":"sakai_entity"},{"id":180,"label":"Coordonnées","type":"composite"}],"46":[{"id":51,"label":"Coordonnée","type":"contact_info"}],"91":[{"id":145,"label":"Coordonnées","type":"composite"},{"id":144,"label":"Hyperlien","type":"url"},{"id":143,"label":"Document","type":"document"},{"id":142,"label":"Texte","type":"text"},{"id":146,"label":"Lien vers un outil","type":"sakai_entity"}],"90":[{"id":170,"label":"Coordonnées","type":"composite"},{"id":171,"label":"Lien vers un outil","type":"sakai_entity"},{"id":169,"label":"Hyperlien","type":"url"},{"id":168,"label":"Document","type":"document"},{"id":167,"label":"Texte","type":"text"}],"10":[{"id":68,"label":"Texte","type":"text"},{"id":69,"label":"Document","type":"document"},{"id":70,"label":"Hyperlien","type":"url"},{"id":71,"label":"Référence bibliographique","type":"citation"}],"88":[{"id":160,"label":"Coordonnées","type":"composite"},{"id":161,"label":"Lien vers un outil","type":"sakai_entity"},{"id":159,"label":"Hyperlien","type":"url"},{"id":158,"label":"Document","type":"document"},{"id":157,"label":"Texte","type":"text"}],"89":[{"id":166,"label":"Lien vers un outil","type":"sakai_entity"},{"id":165,"label":"Coordonnées","type":"composite"},{"id":164,"label":"Hyperlien","type":"url"},{"id":163,"label":"Document","type":"document"},{"id":162,"label":"Texte","type":"text"}]};
        SyllabusService.setTemplate(mockup.template);    
        // select first item
        if (mockup.syllabus.elements.length > 0 ) {
            mockup.syllabus.elements[0].$selected = true;
            TreeService.setSelectedItem(mockup.syllabus.elements[0], true);  
        }
        // mockup ressources
        // var ressources = {"entityPrefix":"content","content_collection":[{"created":1442952457719,"creator":"e7c75c5e-5439-47bd-9561-64f742ef30a4","description":null,"hidden":false,"mimeType":null,"modified":1442952457788,"modifiedBy":"e7c75c5e-5439-47bd-9561-64f742ef30a4","name":"52-701-02A.A2013.P3","priority":"12101","properties":{},"reference":"/content/group/52-701-02A.A2013.P3/","resourceChildren":[{"created":1449523584090,"creator":"e7c75c5e-5439-47bd-9561-64f742ef30a4","description":"","hidden":false,"mimeType":null,"modified":1449523584120,"modifiedBy":"e7c75c5e-5439-47bd-9561-64f742ef30a4","name":"poster","priority":"6","properties":{"http://purl.org/dc/elements/1.1/publisher":"","http://ltsc.ieee.org/xsd/lomv1.0/assumed_knowledge":"","http://ltsc.ieee.org/xsd/lomv1.0/review_date":"","http://ltsc.ieee.org/xsd/lomv1.0/role":"","http://ltsc.ieee.org/xsd/lomv1.0/engagement":"","http://purl.org/dc/terms/abstract":"","http://ltsc.ieee.org/xsd/lomv1.0/duration":"0--0-","SAKAI:conditionalrelease":"false","SAKAI:conditionalNotificationId":"","http://ltsc.ieee.org/xsd/lomv1.0/granularity_level":"","http://purl.org/dc/elements/1.1/contributor":"","http://purl.org/dc/terms/created":"","http://ltsc.ieee.org/xsd/lomv1.0/other_requirements":"","http://purl.org/dc/elements/1.1/alternative":"","http://ltsc.ieee.org/xsd/lomv1.0/relation":"","http://ltsc.ieee.org/xsd/lomv1.0/structure":"","http://ltsc.ieee.org/xsd/lomv1.0/status":"","http://purl.org/dc/terms/issued":"","http://ltsc.ieee.org/xsd/lomv1.0/interactivity_level":"","http://ltsc.ieee.org/xsd/lomv1.0/technical_requirements":"","http://purl.org/dc/terms/audience":"","http://ltsc.ieee.org/xsd/lomv1.0/install_remarks":"","http://purl.org/dc/elements/1.1/subject":"","http://ltsc.ieee.org/xsd/lomv1.0/reviewer":"","http://purl.org/dc/terms/educationLevel":"","http://ltsc.ieee.org/xsd/lomv1.0/context_level":"","http://ltsc.ieee.org/xsd/lomv1.0/review_comments":"","http://ltsc.ieee.org/xsd/lomv1.0/coverage":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_time":"0--0-","http://purl.org/dc/elements/1.1/creator":"","http://ltsc.ieee.org/xsd/lomv1.0/difficulty":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_resource_type":""},"reference":"/content/group/52-701-02A.A2013.P3/poster/","resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/poster/","size":null,"type":"org.sakaiproject.content.types.folder","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/poster/"},{"created":1447346365055,"creator":"b8e0d624-40b4-418a-ad68-267f02661a02","description":"","hidden":false,"mimeType":null,"modified":1447346365082,"modifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","name":"test","priority":"4","properties":{"http://purl.org/dc/elements/1.1/publisher":"","http://ltsc.ieee.org/xsd/lomv1.0/assumed_knowledge":"","http://ltsc.ieee.org/xsd/lomv1.0/review_date":"","http://ltsc.ieee.org/xsd/lomv1.0/role":"","http://ltsc.ieee.org/xsd/lomv1.0/engagement":"","http://purl.org/dc/terms/abstract":"","http://ltsc.ieee.org/xsd/lomv1.0/duration":"0--0-","SAKAI:conditionalrelease":"false","SAKAI:conditionalNotificationId":"","http://ltsc.ieee.org/xsd/lomv1.0/granularity_level":"","http://purl.org/dc/elements/1.1/contributor":"","http://purl.org/dc/terms/created":"","http://ltsc.ieee.org/xsd/lomv1.0/other_requirements":"","http://purl.org/dc/elements/1.1/alternative":"","http://ltsc.ieee.org/xsd/lomv1.0/relation":"","http://ltsc.ieee.org/xsd/lomv1.0/structure":"","http://ltsc.ieee.org/xsd/lomv1.0/status":"","http://purl.org/dc/terms/issued":"","http://ltsc.ieee.org/xsd/lomv1.0/interactivity_level":"","http://ltsc.ieee.org/xsd/lomv1.0/technical_requirements":"","http://purl.org/dc/terms/audience":"","http://ltsc.ieee.org/xsd/lomv1.0/install_remarks":"","http://purl.org/dc/elements/1.1/subject":"","http://ltsc.ieee.org/xsd/lomv1.0/reviewer":"","http://purl.org/dc/terms/educationLevel":"","http://ltsc.ieee.org/xsd/lomv1.0/context_level":"","http://ltsc.ieee.org/xsd/lomv1.0/review_comments":"","http://ltsc.ieee.org/xsd/lomv1.0/coverage":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_time":"0--0-","http://purl.org/dc/elements/1.1/creator":"","http://ltsc.ieee.org/xsd/lomv1.0/difficulty":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_resource_type":""},"reference":"/content/group/52-701-02A.A2013.P3/test/","resourceChildren":[{"created":1447346381202,"creator":"b8e0d624-40b4-418a-ad68-267f02661a02","description":null,"hidden":false,"mimeType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","modified":1447346381327,"modifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","name":"AF-ZCII-1936 -Bibliographie.docx","priority":"268435457","properties":{},"reference":"/content/group/52-701-02A.A2013.P3/test/AF-ZCII-1936 -Bibliographie.docx","resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/test/AF-ZCII-1936 -Bibliographie.docx","size":"30670","type":"org.sakaiproject.content.types.fileUpload","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/test/AF-ZCII-1936%20-Bibliographie.docx"}],"resourceId":"/group/52-701-02A.A2013.P3/test/","size":null,"type":"org.sakaiproject.content.types.folder","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/test/"},{"created":1447346196558,"creator":"b8e0d624-40b4-418a-ad68-267f02661a02","description":"","hidden":false,"mimeType":"application/x-javascript","modified":1450368433341,"modifiedBy":"e7c75c5e-5439-47bd-9561-64f742ef30a4","name":"angular.min (1).js","priority":"268435458","properties":{"http://purl.org/dc/elements/1.1/publisher":"","http://ltsc.ieee.org/xsd/lomv1.0/assumed_knowledge":"","CHEF:copyrightchoice":"I hold copyright.","http://ltsc.ieee.org/xsd/lomv1.0/review_date":"","http://ltsc.ieee.org/xsd/lomv1.0/role":"","http://ltsc.ieee.org/xsd/lomv1.0/engagement":"","http://purl.org/dc/terms/abstract":"","http://ltsc.ieee.org/xsd/lomv1.0/duration":"0--0-","SAKAI:conditionalrelease":"false","SAKAI:conditionalNotificationId":"","http://ltsc.ieee.org/xsd/lomv1.0/granularity_level":"","http://purl.org/dc/elements/1.1/contributor":"","SAKAI:allow_inline":"false","http://purl.org/dc/terms/created":"","http://ltsc.ieee.org/xsd/lomv1.0/other_requirements":"","http://purl.org/dc/elements/1.1/alternative":"","http://ltsc.ieee.org/xsd/lomv1.0/relation":"","http://ltsc.ieee.org/xsd/lomv1.0/structure":"","http://ltsc.ieee.org/xsd/lomv1.0/status":"","http://purl.org/dc/terms/issued":"","http://ltsc.ieee.org/xsd/lomv1.0/interactivity_level":"","http://ltsc.ieee.org/xsd/lomv1.0/technical_requirements":"","http://purl.org/dc/terms/audience":"","http://ltsc.ieee.org/xsd/lomv1.0/install_remarks":"","http://purl.org/dc/elements/1.1/subject":"","http://ltsc.ieee.org/xsd/lomv1.0/reviewer":"","http://purl.org/dc/terms/educationLevel":"","http://ltsc.ieee.org/xsd/lomv1.0/context_level":"","http://ltsc.ieee.org/xsd/lomv1.0/review_comments":"","http://ltsc.ieee.org/xsd/lomv1.0/coverage":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_time":"0--0-","http://purl.org/dc/elements/1.1/creator":"","http://ltsc.ieee.org/xsd/lomv1.0/difficulty":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_resource_type":""},"reference":"/content/group/52-701-02A.A2013.P3/angular.min _1_.js","resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/angular.min _1_.js","size":"146836","type":"org.sakaiproject.content.types.fileUpload","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/angular.min%20_1_.js"},{"created":1448477096431,"creator":"0e4665ce-27c0-40b8-8f20-c9305636d494","description":"","hidden":false,"mimeType":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","modified":1450368443474,"modifiedBy":"e7c75c5e-5439-47bd-9561-64f742ef30a4","name":"Book1.xlsx","priority":"268435461","properties":{"http://purl.org/dc/elements/1.1/publisher":"","http://ltsc.ieee.org/xsd/lomv1.0/assumed_knowledge":"","CHEF:copyrightchoice":"I hold copyright.","http://ltsc.ieee.org/xsd/lomv1.0/review_date":"","http://ltsc.ieee.org/xsd/lomv1.0/role":"","http://ltsc.ieee.org/xsd/lomv1.0/engagement":"","http://purl.org/dc/terms/abstract":"","http://ltsc.ieee.org/xsd/lomv1.0/duration":"0--0-","SAKAI:conditionalrelease":"false","SAKAI:conditionalNotificationId":"","http://ltsc.ieee.org/xsd/lomv1.0/granularity_level":"","http://purl.org/dc/elements/1.1/contributor":"","SAKAI:allow_inline":"false","http://purl.org/dc/terms/created":"","http://ltsc.ieee.org/xsd/lomv1.0/other_requirements":"","http://purl.org/dc/elements/1.1/alternative":"","http://ltsc.ieee.org/xsd/lomv1.0/relation":"","http://ltsc.ieee.org/xsd/lomv1.0/structure":"","http://ltsc.ieee.org/xsd/lomv1.0/status":"","http://purl.org/dc/terms/issued":"","http://ltsc.ieee.org/xsd/lomv1.0/interactivity_level":"","CHEF:copyrightalert":"true","http://ltsc.ieee.org/xsd/lomv1.0/technical_requirements":"","http://purl.org/dc/terms/audience":"","http://ltsc.ieee.org/xsd/lomv1.0/install_remarks":"","http://purl.org/dc/elements/1.1/subject":"","http://ltsc.ieee.org/xsd/lomv1.0/reviewer":"","http://purl.org/dc/terms/educationLevel":"","http://ltsc.ieee.org/xsd/lomv1.0/context_level":"","http://ltsc.ieee.org/xsd/lomv1.0/review_comments":"","http://ltsc.ieee.org/xsd/lomv1.0/coverage":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_time":"0--0-","http://purl.org/dc/elements/1.1/creator":"","http://ltsc.ieee.org/xsd/lomv1.0/difficulty":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_resource_type":""},"reference":"/content/group/52-701-02A.A2013.P3/Book1.xlsx","resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/Book1.xlsx","size":"8014","type":"org.sakaiproject.content.types.fileUpload","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/Book1.xlsx"},{"created":1450301000675,"creator":"b8e0d624-40b4-418a-ad68-267f02661a02","description":null,"hidden":false,"mimeType":"image/jpeg","modified":1450301000798,"modifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","name":"Desert.jpg","priority":"268435463","properties":{},"reference":"/content/group/52-701-02A.A2013.P3/Desert.jpg","resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/Desert.jpg","size":"845941","type":"org.sakaiproject.content.types.fileUpload","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/Desert.jpg"},{"created":1450301134898,"creator":"b8e0d624-40b4-418a-ad68-267f02661a02","description":"","hidden":false,"mimeType":"image/jpeg","modified":1450368812507,"modifiedBy":"e7c75c5e-5439-47bd-9561-64f742ef30a4","name":"Hydrangeas.jpg","priority":"268435464","properties":{"http://purl.org/dc/elements/1.1/publisher":"","http://ltsc.ieee.org/xsd/lomv1.0/assumed_knowledge":"","CHEF:copyrightchoice":"Material is in public domain.","http://ltsc.ieee.org/xsd/lomv1.0/review_date":"","http://ltsc.ieee.org/xsd/lomv1.0/role":"","http://ltsc.ieee.org/xsd/lomv1.0/engagement":"","http://purl.org/dc/terms/abstract":"","http://ltsc.ieee.org/xsd/lomv1.0/duration":"0--0-","SAKAI:conditionalrelease":"false","SAKAI:conditionalNotificationId":"","http://ltsc.ieee.org/xsd/lomv1.0/granularity_level":"","http://purl.org/dc/elements/1.1/contributor":"","SAKAI:allow_inline":"false","http://purl.org/dc/terms/created":"","http://ltsc.ieee.org/xsd/lomv1.0/other_requirements":"","http://purl.org/dc/elements/1.1/alternative":"","http://ltsc.ieee.org/xsd/lomv1.0/relation":"","http://ltsc.ieee.org/xsd/lomv1.0/structure":"","http://ltsc.ieee.org/xsd/lomv1.0/status":"","http://purl.org/dc/terms/issued":"","http://ltsc.ieee.org/xsd/lomv1.0/interactivity_level":"","http://ltsc.ieee.org/xsd/lomv1.0/technical_requirements":"","http://purl.org/dc/terms/audience":"","http://ltsc.ieee.org/xsd/lomv1.0/install_remarks":"","http://purl.org/dc/elements/1.1/subject":"","http://ltsc.ieee.org/xsd/lomv1.0/reviewer":"","http://purl.org/dc/terms/educationLevel":"","http://ltsc.ieee.org/xsd/lomv1.0/context_level":"","http://ltsc.ieee.org/xsd/lomv1.0/review_comments":"","http://ltsc.ieee.org/xsd/lomv1.0/coverage":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_time":"0--0-","http://purl.org/dc/elements/1.1/creator":"","http://ltsc.ieee.org/xsd/lomv1.0/difficulty":"","http://ltsc.ieee.org/xsd/lomv1.0/learning_resource_type":""},"reference":"/content/group/52-701-02A.A2013.P3/Hydrangeas.jpg","release":1450368000000,"resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/Hydrangeas.jpg","retract":1451491200000,"size":"595284","type":"org.sakaiproject.content.types.fileUpload","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/Hydrangeas.jpg"},{"created":1446841004485,"creator":"e7c75c5e-5439-47bd-9561-64f742ef30a4","description":null,"hidden":false,"mimeType":"text/html","modified":1446841005833,"modifiedBy":"e7c75c5e-5439-47bd-9561-64f742ef30a4","name":"Nouvelle liste de références","priority":"268435457","properties":{"sakai:reference-root":"/citation","citations.temporary_citation_list":"true"},"reference":"/citation/content/group/52-701-02A.A2013.P3/Nouvelle liste de références","resourceChildren":[],"resourceId":"/group/52-701-02A.A2013.P3/Nouvelle liste de références","size":"36","type":"org.sakaiproject.citation.impl.CitationList","url":"http://localhost:8080/access/citation/content/group/52-701-02A.A2013.P3/Nouvelle%20liste%20de%20r%C3%A9f%C3%A9rences"}],"resourceId":"/group/52-701-02A.A2013.P3/","size":null,"type":"org.sakaiproject.content.types.folder","url":"http://localhost:8080/access/content/group/52-701-02A.A2013.P3/","entityReference":"/content","entityURL":"http://localhost:8080/direct/content"}]};
        // 
        var resources = mockup.resources;
        if (resources) {
            ResourcesService.setResources(mockup.resources.content_collection[0]);
            $rootScope.$broadcast('RESOURCES_LOADED');
        }

        SyllabusService.working = false;
        $scope.infos.working = false; 

    } else {
        // MODE CONNECTE
        // show loader
        console.log('start');
        console.time('xhr');
        $scope.infos.working = true;
    	//var results = SyllabusService.getSyllabus();

        // console.log(results);
        var loadSyllabusAndTemplate = function($syllabusId?){
            return $q.allSettled([SyllabusService.loadSyllabus($syllabusId).$promise, SyllabusService.loadTemplate().$promise]).then(function(data) {

                // data contient d'abord le résultat de la première requête
                if (data[0].state === "fulfilled") {

                    SyllabusService.setSyllabus(data[0].value);
                    // Hide items from mobile menu
                    SyllabusService.hideItemsInit();
   
                    // $scope.planLoaded = true;
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
                    // var template = {"114":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"115":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"112":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"113":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"110":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"111":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"35":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"}],"82":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Critère d'évaluation","type":"rubric"},{"label":"Préparation à l'évaluation","type":"rubric"},{"label":"Modalités de remise et pénalités","type":"rubric"},{"label":"Ressources générales","type":"rubric"}],"83":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Critère d'évaluation","type":"rubric"},{"label":"Préparation à l'évaluation","type":"rubric"},{"label":"Modalités de remise et pénalités","type":"rubric"},{"label":"Ressources générales","type":"rubric"}],"80":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Critère d'évaluation","type":"rubric"},{"label":"Préparation à l'évaluation","type":"rubric"},{"label":"Modalités de remise et pénalités","type":"rubric"},{"label":"Ressources générales","type":"rubric"}],"81":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Critère d'évaluation","type":"rubric"},{"label":"Préparation à l'évaluation","type":"rubric"},{"label":"Modalités de remise et pénalités","type":"rubric"},{"label":"Ressources générales","type":"rubric"}],"86":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"87":[{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}],"84":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Critère d'évaluation","type":"rubric"},{"label":"Préparation à l'évaluation","type":"rubric"},{"label":"Modalités de remise et pénalités","type":"rubric"},{"label":"Ressources générales","type":"rubric"}],"85":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"}],"3":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"}],"2":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"}],"1":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Approche pédagogique","type":"rubric"}],"7":[{"label":"Ressources bibliographiques","type":"rubric"},{"label":"Ressources bibliographiques complémentaire","type":"rubric"},{"label":"Ressources générales","type":"rubric"},{"label":"Cas","type":"rubric"},{"label":"Outils","type":"rubric"},{"label":"Anciens examens","type":"rubric"}],"6":[{"label":"Coordonnée","type":"contact_info"}],"5":[{"label":"Coordonnateur","type":"rubric"},{"label":"Enseignant(s)","type":"rubric"},{"label":"Stagiaire(s) d'enseignement","type":"rubric"},{"label":"Conférencier(s)","type":"rubric"},{"label":"Secrétaire(s)","type":"rubric"}],"4":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"}],"9":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"}],"8":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"}],"19":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"}],"55":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"}],"17":[{"label":"Séance de cours","type":"lecture"},{"label":"Séance de travaux pratique","type":"tutorial"}],"18":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"}],"15":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"},{"label":"Lien vers un outil","type":"sakai_entity"}],"16":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"},{"label":"Lien vers un outil","type":"sakai_entity"}],"13":[{"label":"Description","type":"rubric"},{"label":"Objectifs","type":"rubric"},{"label":"Critère d'évaluation","type":"rubric"},{"label":"Préparation à l'évaluation","type":"rubric"},{"label":"Modalités de remise et pénalités","type":"rubric"},{"label":"Ressources générales","type":"rubric"}],"14":[{"label":"Regroupement","type":"composite"},{"label":"Séance de cours","type":"lecture"},{"label":"Séance de travaux pratique","type":"tutorial"}],"11":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"}],"12":[{"label":"Examen intra","type":"evaluation"},{"label":"Examen final","type":"evaluation"},{"label":"Travail","type":"evaluation"},{"label":"Participation","type":"evaluation"},{"label":"Test/Quiz","type":"evaluation"},{"label":"Autre","type":"evaluation"}],"21":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"}],"20":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"}],"109":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"108":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"107":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"106":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"105":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"104":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"103":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"99":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"102":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"101":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"100":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"49":[{"label":"Coordonnée","type":"contact_info"}],"98":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"}],"48":[{"label":"Coordonnée","type":"contact_info"}],"97":[{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"},{"label":"Coordonnées","type":"composite"}],"96":[{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"},{"label":"Lien vers un outil","type":"sakai_entity"}],"95":[{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}],"94":[{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}],"93":[{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}],"47":[{"label":"Coordonnée","type":"contact_info"}],"92":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"}],"46":[{"label":"Coordonnée","type":"contact_info"}],"91":[{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"},{"label":"Lien vers un outil","type":"sakai_entity"}],"90":[{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}],"10":[{"label":"Texte","type":"text"},{"label":"Document","type":"document"},{"label":"Hyperlien","type":"url"},{"label":"Référence bibliographique","type":"citation"}],"88":[{"label":"Coordonnées","type":"composite"},{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}],"89":[{"label":"Lien vers un outil","type":"sakai_entity"},{"label":"Coordonnées","type":"composite"},{"label":"Hyperlien","type":"url"},{"label":"Document","type":"document"},{"label":"Texte","type":"text"}]};          
                    SyllabusService.setTemplate(data[1].value);
                    // $scope.templateLoaded = true;
                } else if (data[1].state === "rejected") {
                    $scope.templateFailed = true;
                }
         
                   
                   
                if ( !$scope.planFailed ) {
                    // sélection du premier élément par défaut (attention : après chargement du plan de cours + template)
                    if (SyllabusService.syllabus.elements.length > 0 ) {
                        // data[0].value.elements[0].selected = true;
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
        
        var results = SyllabusService.saveSyllabus();        
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
