
opensyllabusApp.constant('config', {

    mockUp: false,
    // types: [ { type: "text", libelle: "TYPE_ELEMENT_TEXTE" } , { type: "document", libelle: "TYPE_ELEMENT_DOCUMENT"} ],
    types : {
        'text' : {
            'type': 'text',
            'label': 'TYPE_ELEMENT_TEXTE'
        },
        'document' : {
            'type': 'document',
            'label': 'TYPE_ELEMENT_DOCUMENT'
        },
        'hyperlink' : { 
            'type': 'hyperlink',
            'label': 'TYPE_ELEMENT_HYPERLINK'
        },
        'image' : {
            'type': 'image',
            'label': 'TYPE_ELEMENT_IMAGE'
        },
        'video': {
            'type': 'video',
            'label': 'TYPE_ELEMENT_VIDEO'
        },
        'contact_info': {
            'type': 'contact_info',
            'label': 'TYPE_ELEMENT_CONTACT'
        },
        'citation' : {
            'type': 'citation',
            'label': 'TYPE_ELEMENT_CITATION'
        },
        'sakai_entity' : {
            'type': 'sakai_entity',
            'label': 'TYPE_ELEMENT_SAKAIENTITY'
        },
        'evaluation' : { 
            'type': 'evaluation',
            'label': 'TYPE_ELEMENT_EVALUATION'
        },
        'exam' : { 
            'type': 'evaluation',
            'label': 'TYPE_ELEMENT_EXAM'
        },
        'composite' : {
            'type': 'composite',
            'label': 'TYPE_ELEMENT_COMPOSITE'
        },
        'rubric': {
            'type': 'rubric',
            'label': ''
        },
        'lecture': {
            'type': 'lecture',
            'label': ''
        },
        'tutorial': {
            'type': 'tutorial',
            'label': ''
        },
    },
    documentTypes: [
        {
            'id' : -1,
            'name' : 'DOCUMENT_TYPE_DEFAULT' 
        },
        {
            'id' : 1,
            'name' : 'DOCUMENT_TYPE_PRESENTATION'
        },
        {
            'id' : 2,
            'name' : 'DOCUMENT_TYPE_EXERCICE'
        },
        {
            'id' : 3,
            'name' : 'DOCUMENT_TYPE_SOLUTION'
        },
        {
            'id' : 4,
            'name' : 'DOCUMENT_TYPE_CAS'
        },
        {
            'id' : 5,
            'name' : 'DOCUMENT_TYPE_RAPPORT'
        },
        {
            'id' : 6,
            'name' : 'DOCUMENT_TYPE_DONNEES'
        },
        {
            'id' : 7,
            'name' : 'DOCUMENT_TYPE_LIVRE'
        },
        {
            'id' : 8,
            'name' : 'DOCUMENT_TYPE_OLDEXAMEN'
        },
        {
            'id' : 9,
            'name' : 'DOCUMENT_TYPE_PEDAGOGIQUE'
        }
    ],   
    extensionsImage: ['jpg', 'gif', 'png'],
    statusLabel : {
        1 : "STATUS_INITIAL",
        2 : "STATUS_BROUILLON",
        3 : "STATUS_PUBLIE",
        4 : "STATUS_NON_ATTRIBUE"
    }
    
});


opensyllabusApp.constant("Modernizr", Modernizr);

