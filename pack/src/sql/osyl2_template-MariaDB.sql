INSERT INTO osyl2_template(TEMPLATE_ID,TITLE,DESCRIPTION,ACTIVE)VALUES(1,'BAC_HEC Montreal','Template de plans de cours du baccalaureat',b'1');
INSERT INTO osyl2_template(TEMPLATE_ID,TITLE,DESCRIPTION,ACTIVE)VALUES(2,'MBA_HEC Montreal','Template de plans de cours du MBA',b'1');
INSERT INTO osyl2_template(TEMPLATE_ID,TITLE,DESCRIPTION,ACTIVE)VALUES(3,'FCD_HEC Montreal','Template de plans de cours du FCD',b'0');

INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (1,'COMPOSITE','Un meta_element type contenant d''autres');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (2,'TEXT','Contenant de texte');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (3,'DOCUMENT','Contenant de document');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (4,'URL','Contenant d''url');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (5,'REF_BIBLIO','Contenant de reference bibliographique');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (6,'CONTACT_INFO','Contenant de contact d''information');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (7,'SAKAI_ENTITY','Contenant d''entite Sakai');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (8,'EVALUATION','Evaluation');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (9,'COURSE_LECTURE','Seance de cours');
INSERT INTO osyl2_templateelementtype(ELEMENTTYPE_ID,TITLE,DESCRIPTION) VALUES (10,'PRACTICAL_WORK','Travaux pratiques');

Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (1,1,null,null,1,null);   -- Presentation du cours
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (2,2,null,null,null,1);   --    Texte 
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (3,3,null,null,null,1);   --    Document
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (4,4,null,null,null,1);   --    Hyperlien
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (5,1,null,null,1,null);   -- Coordonnées
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (6,6,null,null,null,5);   --    Coordonnée
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (7,1,null,null,1,null);   -- Matériel Pédagogique
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (8,2,null,null,null,7);   --    Texte
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (9,3,null,null,null,7);   --    Document
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (10,4,null,null,null,7);  --    Hyperlien
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (11,5,null,null,null,7);  --    Référence bibliographique
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (12,1,null,null,1,null);  -- Évaluations
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (13,8,null,null,null,12); --    Évaluation
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (14,1,null,null,1,null);  -- Organisation du cours
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (15,9,null,null,null,14); --     Séance de cours
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (16,10,null,null,null,14);--     Séance de TP
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (17,1,null,null,null,14); --     Regroupement
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (18,2,null,null,null,13); -- Évaluation/Texte
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (19,3,null,null,null,13); -- Évaluation/Document
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (20,4,null,null,null,13); -- Évaluation/Hyperlien
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (21,5,null,null,null,13); -- Évaluation/Référence Biblio
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (22,7,null,null,null,13); -- Évaluation/Entité Sakai
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (23,2,null,null,null,15); -- Séance de cours/Texte
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (24,3,null,null,null,15); -- Séance de cours/Document
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (25,4,null,null,null,15); -- Séance de cours/Hyperlien
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (26,5,null,null,null,15); -- Séance de cours/Référence Biblio
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (27,7,null,null,null,15); -- Séance de cours/Entité Sakai
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (28,2,null,null,null,16); -- Séance de TP/Texte
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (29,3,null,null,null,16); -- Séance de TP/Document
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (30,4,null,null,null,16); -- Séance de TP/Hyperlien
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (31,5,null,null,null,16); -- Séance de TP/Référence Biblio
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (32,7,null,null,null,16); -- Séance de TP/Entité Sakai
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (33,9,null,null,null,17); -- Regroupement/Séance de cours
Insert into OSYL2_TEMPLATEELEMENT (TEMPLATEELEMENT_ID,ELEMENTTYPE_ID,MANDATORY,DISPLAY_ORDER,TEMPLATE_ID,PARENT_ID) values (34,10,null,null,null,17);-- Regroupement/Séance de TP

Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (1,'Description');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (2,'Objectifs');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (3,'Approche pédagogique');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (4,'Coordonnateur');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (5,'Enseignant(s)');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (6,'Stagiaire(s) d''enseignement');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (7,'Conférencier(s)');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (8,'Secrétaire(s)');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (9,'Ressources bibliographiques');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (10,'Ressources bibliographiques complémentaires');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (11,'Ressources générales');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (12,'Cas');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (13,'Outils');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (14,'Anciens examens');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (15,'Critères d''évaluation');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (16,'Préparation à l''évaluation');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (17,'Modalités de remise et pénalités');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (18,'Activités/Ressources avant la séance');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (19,'Activités/Ressources pendant la séance');
Insert into OSYL2_RUBRIC (RUBRIC_ID,LABEL) values (20,'Activités/Ressources après la séance');

Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (1,1);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (1,2);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (1,3);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (5,4);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (5,5);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (5,6);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (5,7);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (5,8);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (7,9);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (7,10);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (7,11);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (7,12);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (7,13);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (7,14);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (13,1);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (13,2);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (13,11);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (13,15);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (13,16);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (13,17);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (15,1);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (15,2);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (15,11);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (15,18);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (15,19);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (15,20);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (16,1);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (16,2);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (16,11);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (16,18);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (16,19);
Insert into OSYL2_TEMPLATEELEMENT_RUBRIC (TEMPLATEELEMENT_ID,RUBRIC_ID) values (16,20);