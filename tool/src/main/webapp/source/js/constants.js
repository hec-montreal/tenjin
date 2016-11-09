tenjinApp.constant('config', {
    defaultHyperlinkProtocol: "http",

    types: {
        'text': {
            'type': 'text',
            'label': 'TYPE_ELEMENT_TEXT'
        },
        'document': {
            'type': 'document',
            'label': 'TYPE_ELEMENT_DOCUMENT'
        },
        'hyperlink': {
            'type': 'hyperlink',
            'label': 'TYPE_ELEMENT_HYPERLINK'
        },
        'image': {
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
        'citation': {
            'type': 'citation',
            'label': 'TYPE_ELEMENT_CITATION'
        },
        'sakai_entity': {
            'type': 'sakai_entity',
            'label': 'TYPE_ELEMENT_SAKAIENTITY'
        },
        'evaluation': {
            'type': 'evaluation',
            'label': 'TYPE_ELEMENT_EVALUATION'
        },
        'exam': {
            'type': 'evaluation',
            'label': 'TYPE_ELEMENT_EXAM'
        },
        'composite': {
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

    documentTypes: [{
        'id': -1,
        'name': 'DOCUMENT_TYPE_DEFAULT'
    }, {
        'id': 1,
        'name': 'DOCUMENT_TYPE_SLIDES'
    }, {
        'id': 2,
        'name': 'DOCUMENT_TYPE_EXERCISE'
    }, {
        'id': 3,
        'name': 'DOCUMENT_TYPE_SOLUTION'
    }, {
        'id': 4,
        'name': 'DOCUMENT_TYPE_CASE'
    }, {
        'id': 5,
        'name': 'DOCUMENT_TYPE_REPORT'
    }, {
        'id': 6,
        'name': 'DOCUMENT_TYPE_DATA'
    }, {
        'id': 7,
        'name': 'DOCUMENT_TYPE_BOOK_CHAPTER'
    }, {
        'id': 8,
        'name': 'DOCUMENT_TYPE_OLD_EXAM'
    }, {
        'id': 9,
        'name': 'DOCUMENT_TYPE_PEDAGOGIC'
    }],

    hyperlinkTypes: [{
        'id': -1,
        'name': 'HYPERLINK_TYPE_DEFAULT'
    }, {
        'id': 1,
        'name': 'HYPERLINK_TYPE_VIDEO'
    }, {
        'id': 2,
        'name': 'HYPERLINK_TYPE_ARTICLE'
    }, {
        'id': 3,
        'name': 'HYPERLINK_TYPE_NEWS_ARTICLE'
    }, {
        'id': 4,
        'name': 'HYPERLINK_TYPE_CASE'
    }, {
        'id': 5,
        'name': 'HYPERLINK_TYPE_REPORT'
    }, {
        'id': 6,
        'name': 'HYPERLINK_TYPE_DATA'
    }, {
        'id': 7,
        'name': 'HYPERLINK_TYPE_POLL'
    }, {
        'id': 8,
        'name': 'HYPERLINK_TYPE_WEB'
    }, {
        'id': 9,
        'name': 'HYPERLINK_TYPE_SIMULATION'
    }, {
        'id': 10,
        'name': 'HYPERLINK_TYPE_SOFTWARE'
    }],

    contactInfoTitles: [{
        'id': -1,
        'name': 'FORM_CONTACT_TITLE_DEFAULT'
    }, {
        'id': 1,
        'name': 'FORM_CONTACT_TITLE_FULLTIMEFACULTYLECTURER'
    }, {
        'id': 2,
        'name': 'FORM_CONTACT_TITLE_PARTTIMELECTURER'
    }, {
        'id': 3,
        'name': 'FORM_CONTACT_TITLE_PARTTIMEFACULTYLECTURER'
    }, {
        'id': 4,
        'name': 'FORM_CONTACT_TITLE_STUDENT'
    }, {
        'id': 5,
        'name': 'FORM_CONTACT_TITLE_FULLTIMELECTURER'
    }, {
        'id': 6,
        'name': 'FORM_CONTACT_TITLE_ASSISTANTPROFESSOR'
    }, {
        'id': 7,
        'name': 'FORM_CONTACT_TITLE_AFFILIATEDPROFESSOR'
    }, {
        'id': 8,
        'name': 'FORM_CONTACT_TITLE_ASSOCIATEPROFESSOR'
    }, {
        'id': 9,
        'name': 'FORM_CONTACT_TITLE_ADJUNCTPROFESSOR'
    }, {
        'id': 10,
        'name': 'FORM_CONTACT_TITLE_HONORARYPROFESSOR'
    }, {
        'id': 11,
        'name': 'FORM_CONTACT_TITLE_GUESTPROFESSOR'
    }, {
        'id': 12,
        'name': 'FORM_CONTACT_TITLE_PROFESSOR'
    }, {
        'id': 13,
        'name': 'FORM_CONTACT_TITLE_SECRETARY'
    }, {
        'id': 14,
        'name': 'FORM_CONTACT_TITLE_TRAINEE'
    }],

    extensionsImage: ['jpg', 'gif', 'png'],

    statusLabel: {
        1: "PUBLISHED_SYLLABUS",
        2: "DRAFTED_SYLLABUS",
        3: "NOTATTRIBUTED_SYLLABUS"
    }
});

tenjinApp.constant("Modernizr", Modernizr);
