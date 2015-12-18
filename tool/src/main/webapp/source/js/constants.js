
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
        'sakai_tool' : {
            'type': 'sakai_tool',
            'label': 'TYPE_ELEMENT_SAKAI_TOOL'
        },
        'evaluation' : {
            'type': 'evaluation',
            'label': ''
        },
        'composite' : {
            'type': 'composite',
            'label': ''
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
    }

});
