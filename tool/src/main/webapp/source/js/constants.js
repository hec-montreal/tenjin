
opensyllabusApp.constant('config', {

    mockUp: false,
    types: [ { type: "text", libelle: "TYPE_ELEMENT_TEXTE" } , { type: "document", libelle: "TYPE_ELEMENT_DOCUMENT"} ],
    typeClass : {
        'text' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusTextElement',
        'document' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusDocumentElement',
        'hyperlink' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusHyperlinkElement',
        'image' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusImageElement',
        'video': 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusVideoElement',
        'contact_info': 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusContactInfoElement',
        'citation' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusCitationElement',
        'sakai_tool' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusSakaiToolElement',
        'evaluation' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusEvaluationElement',
        'composite' : 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement',
        'rubric': 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusRubricElement',
        'lecture': 'ca.hec.opensyllabus2.api.model.syllabus.SyllabusLectureElement'
    }

});
