
opensyllabusApp.constant('mockup', {

    // status | 1 : "Initial", 2: "Brouillon", 3: "Publié", 4: "Non attribué", 
    // STATUS_INITIAL
    // STATUS_BROUILLON
    // STATUS_PUBLIE
    // STATUS_NON_ATTRIBUE
    syllabusList : [
        {
            "id": 1,
            "name": "Partageable",
            "createdBy": "Nadine",
            "sections": [1],
            "status": "STATUS_INITIAL",
            "common" : true,
            "siteId": ""
        },
        {
            "id": 2,
            "name": "Plan de cours Curtis",
            "createdBy": "Curtis",
            "sections": [2, 3],
            "common" : false,
            "status": "STATUS_BROUILLON"
        },
        {
            "id": 3,
            "name": "Plan de cours Awa",
            "createdBy": "Awa",
            "sections": [4],
            "common" : false,
            "status": "STATUS_PUBLIE"
        },
        {
            "id": 4,
            "name": "Plan de cours Mugurel",
            "createdBy": "Mugurel",
            "sections": [5],
            "common" : false,
            "status": "STATUS_BROUILLON"
        },
        {
            "id": 5,
            "name": "Sans section",
            "createdBy": "Johan",
            "sections": [],
            "common" : false,
            "status": "STATUS_BROUILLON"
        },
        {
            "id": 6,
            "name": "Sans section 2",
            "createdBy": "Johan",
            "sections": [],
            "common" : false,
            "status": "STATUS_PUBLIE"
        }
    ],
    // sections : [
    //     {
    //         "id": 1,
    //         "syllabusSpecId": 1,
    //         "name": "A01"
    //     },
    //     {
    //         "id": 2,
    //         "syllabusSpecId": null,
    //         "name": "A02"
    //     },
    //     {
    //         "id": 3,
    //         "syllabusSpecId": null,
    //         "name": "A03"
    //     },
    //     {
    //         "id": 4,
    //         "syllabusSpecId": 2,
    //         "name": "B02"
    //     }
    // ],
    'sections': [
        {id: 1, name: 'A01'},
        {id: 2, name: 'A02'},
        {id: 3, name: 'B01'},
        {id: 4, name: 'B02'},
        {id: 5, name: 'C01'},
        {id: 6, name: 'C02'}
    ],
    'sectionsFree': [
        {id: 8, name: 'D01'},
        {id: 9, name: 'D02'}
    ] 
    
});

