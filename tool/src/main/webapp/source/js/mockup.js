
opensyllabusApp.constant('mockup', {

    // status | 1 : "Initial", 2: "Brouillon", 3: "Publié", 4: "Non attribué", 
    syllabusList : [
        {
            "id": 1,
            "name": "Partageable",
            "createdBy": "Nadine",
            "sections": ["site 1"],
            "status": 1
        },
        {
            "id": 2,
            "name": "A01,A02",
            "createdBy": "Curtis",
            "sections": ["A01", "A02"],
            "status": 2
        },
        {
            "id": 3,
            "name": "A03",
            "createdBy": "Awa",
            "sections": ["A03"],
            "status": 3
        },
        {
            "id": 4,
            "name": "B02",
            "createdBy": "Mugurel",
            "sections": ["B02"],
            "status": 2
        }
    ],
    sections : [
        {
            "id": 1,
            "syllabusSpecId": 1,
            "name": "A01"
        },
        {
            "id": 2,
            "syllabusSpecId": null,
            "name": "A02"
        },
        {
            "id": 3,
            "syllabusSpecId": null,
            "name": "A03"
        },
        {
            "id": 4,
            "syllabusSpecId": 2,
            "name": "B02"
        }
    ]
    
});

