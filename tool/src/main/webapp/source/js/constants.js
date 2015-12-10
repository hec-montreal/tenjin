
opensyllabusApp.constant('config', {


    mockUp: false,
    // types: [ { type: "text", libelle: "TYPE_ELEMENT_TEXTE" } , { type: "document", libelle: "TYPE_ELEMENT_DOCUMENT"} ],
    types : {
        'text' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusTextElement',
            'type': 'text',
            'label': 'TYPE_ELEMENT_TEXTE'
        },
        'document' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusDocumentElement',
            'type': 'document',
            'label': 'TYPE_ELEMENT_DOCUMENT'
        },
        'hyperlink' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusHyperlinkElement',
            'type': 'hyperlink',
            'label': 'TYPE_ELEMENT_HYPERLINK'
        },
        'image' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusImageElement',
            'type': 'image',
            'label': 'TYPE_ELEMENT_IMAGE'
        },
        'video': {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusVideoElement',
            'type': 'video',
            'label': 'TYPE_ELEMENT_VIDEO'
        },
        'contact_info': {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusContactInfoElement',
            'type': 'contact_info',
            'label': 'TYPE_ELEMENT_CONTACT'
        },
        'citation' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusCitationElement',
            'type': 'citation',
            'label': 'TYPE_ELEMENT_CITATION'
        },
        'sakai_tool' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusSakaiToolElement',
            'type': 'sakai_tool',
            'label': 'TYPE_ELEMENT_SAKAI_TOOL'
        },
        'evaluation' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusEvaluationElement',
            'type': 'evaluation',
            'label': ''
        },
        'composite' : {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement',
            'type': 'composite',
            'label': ''
        },
        'rubric': {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusRubricElement',
            'type': 'rubric',
            'label': ''
        },
        'lecture': {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusLectureElement',
            'type': 'lecture',
            'label': ''
        },
        'tutorial': {
            'classe' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusTutorialElement',
            'type': 'tutorial',
            'label': ''
        },
    }

});
