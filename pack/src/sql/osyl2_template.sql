INSERT INTO osyl2_template(TEMPLATE_ID,TITLE,DESCRIPTION,ACTIVE)VALUES(1,'BAC_HEC Montreal','Template de plans de cours du baccalaureat','1');
INSERT INTO osyl2_template(TEMPLATE_ID,TITLE,DESCRIPTION,ACTIVE)VALUES(2,'MBA_HEC Montreal','Template de plans de cours du MBA','1');
INSERT INTO osyl2_template(TEMPLATE_ID,TITLE,DESCRIPTION,ACTIVE)VALUES(3,'FCD_HEC Montreal','Template de plans de cours du FCD','0');

--need to add a is_composite column?
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

INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES	(1, 1, 1, 1, 1, NULL);-- Presentation du cours
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (2, 2, NULL, NULL, NULL, 1);-- Presentation du cours/Texte
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (3, 3, NULL, NULL, NULL, 1);-- Presentation du cours/Document
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (4, 4, NULL, NULL, NULL, 1);-- Presentation du cours/Hyperlien
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (5, 1, 1, 2, 1, NULL);-- Coordonnees
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (6, 6, NULL, NULL, NULL, 5);-- Coordonnees/Coordonnee
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (7, 1, 1, 3, 1, NULL);-- Matériel pédagogique
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (8, 2, NULL, NULL, NULL, 7);-- Matériel pédagogique/Texte
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (9, 3, NULL, NULL, NULL, 7);-- Matériel pédagogique/Document
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (10, 4, NULL, NULL, NULL, 7);-- Matériel pédagogique/Hyperlien
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (11, 5, NULL, NULL, NULL, 7);-- Matériel pédagogique/Référence bibliograpgique
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (12, 1, 1, 4, 1, NULL);-- Evaluations
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (13, 8, NULL, NULL, NULL, 12);-- Evaluations/Evaluation
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (14, 1, 1, 5, 1, NULL);-- Organisation du cours
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (15, 9, NULL, NULL, NULL, 14);-- Organisation du cours/Seance de cours
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (16, 10, NULL, NULL, NULL, 14);-- Organisation du cours/Seance de TP
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (17, 1, NULL, NULL, NULL, 14);-- Organisation du cours/Regroupement
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (18, 2, NULL, NULL, NULL, 13);-- Evaluation/Texte
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (19, 3, NULL, NULL, NULL, 13);-- Evaluation/Document
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (20, 4, NULL, NULL, NULL, 13);-- Evaluation/URL
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (21, 5, NULL, NULL, NULL, 13);-- Evaluation/Reference Bibliographique
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (22, 7, NULL, NULL, NULL, 13);-- Evaluation/outil sakai
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (23, 2, NULL, NULL, NULL, 15);-- Seance de cours/Texte
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (24, 3, NULL, NULL, NULL, 15);-- Seance de cours/Document
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (25, 4, NULL, NULL, NULL, 15);-- Seance de cours/URL
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (26, 5, NULL, NULL, NULL, 15);-- Seance de cours/Reference Bibliographique
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (27, 7, NULL, NULL, NULL, 15);-- Seance de cours/outil sakai
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (28, 2, NULL, NULL, NULL, 16);-- Seance de TP/Texte
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (29, 3, NULL, NULL, NULL, 16);-- Seance de TP/Document
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (30, 4, NULL, NULL, NULL, 16);-- Seance de TP/URL
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (31, 5, NULL, NULL, NULL, 16);-- Seance de TP/Reference Bibliographique
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (32, 7, NULL, NULL, NULL, 16);-- Seance de TP/Outil Externe
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (33, 9, NULL, NULL, NULL, 17);-- Regroupement/Seance de cours
INSERT INTO osyl2_templateelement (TEMPLATEELEMENT_ID, ELEMENTTYPE_ID, MANDATORY, DISPLAY_ORDER, TEMPLATE_ID, PARENT_ID) VALUES (34, 10, NULL, NULL, NULL, 17);-- Regroupement/Seance de TP

INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (1, 'Description');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (2, 'Objectifs');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (3, 'Approche pédagogique');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (4, 'Coordonnateur');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (5, 'Enseignant(s)');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (6, 'Stagiaire(s) d''enseignement');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (7, 'Conférencier(s)');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (8, 'Secrétaire(s)');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (9, 'Ressources bibliographiques');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (10, 'Ressources bibliographiques complémentaires');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (11, 'Ressources générales');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (12, 'Cas');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (13, 'Outils');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (14, 'Anciens examens');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (15, 'Critères d''évaluation');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (16, 'Préparation à l''évaluation');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (17, 'Modalités de remise et pénalités');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (18, 'Activités/Ressources avant la séance');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (19, 'Activités/Ressources pendant la séance');
INSERT INTO osyl2_rubric (RUBRIC_ID, LABEL) VALUES (20, 'Activités/Ressources après la séance');

INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (1, 1);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (1, 2);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (1, 3);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (5, 4);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (5, 5);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (5, 6);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (5, 7);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (5, 8);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (7, 9);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (7, 10);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (7, 11);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (7, 12);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (7, 13);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (7, 14);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (13, 1);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (13, 2);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (13, 11);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (13, 15);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (13, 16);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (13, 17);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (15, 1);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (15, 2);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (15, 11);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (15, 18);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (15, 19);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (15, 20);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (16, 1);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (16, 2);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (16, 11);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (16, 18);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (16, 19);
INSERT INTO osyl2_templateelement_rubric (TEMPLATEELEMENT_ID, RUBRIC_ID) VALUES (16, 20);

--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('1','en_us','Presentation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('1','fr_ca','Présentation du cours');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('2','en_us','Text');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('2','fr_ca','Texte');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('3','en_us','Document');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('3','fr_ca','Document');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('4','en_us','Url');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('4','fr_ca','Url');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('5','en_us','Contact informations');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('5','fr_ca','Coordonnées');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('6','en_us','Contact information');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('6','fr_ca','Coordonnée');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('7','en_us','Learning material');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('7','fr_ca','Matériel pédagogique');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('8','en_us','Citation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('8','fr_ca','Référence bibliographique');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('9','en_us','Evaluations');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('9','fr_ca','évaluations');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('10','en_us','Evaluation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('10','fr_ca','évaluation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('11','en_us','Entity');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('11','fr_ca','Entité');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('12','en_us','Course Organisation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('12','fr_ca','Organisation du cours');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('13','en_us','Lecture');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('13','fr_ca','Séance du cours');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('14','en_us','Tutorial');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('14','fr_ca','Séance de travaux pratiques');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('15','en_us','Cluster');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('15','fr_ca','Regroupement');

--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('1','en_us','Undefined');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('1','fr_ca','Non défini');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('2','en_us','Description');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('2','fr_ca','Description');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('3','en_us','Objectives');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('3','fr_ca','Objectifs');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('4','en_us','Learning strategy');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('4','fr_ca','Approche pédagogique');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('5','en_us','Coordinator');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('5','fr_ca','Coordinateur');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('6','en_us','Lecturer(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('6','fr_ca','Enseignant(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('7','en_us','Teaching assistant(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('7','fr_ca','Stagiaire(s) d''enseignement');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('8','en_us','Speaker(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('8','fr_ca','Conférencier(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('9','en_us','Secretary(ies)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('9','fr_ca','Secrétaire(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('10','en_us','Bibliographic resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('10','fr_ca','Ressources bibliographiques');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('11','en_us','Complementary Bibliographical Resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('11','fr_ca','Ressources bibliographiques complémentaires');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('12','en_us','Miscellaneous Resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('12','fr_ca','Ressources générales');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('13','en_us','Case');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('13','fr_ca','Cas');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('14','en_us','Tools');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('14','fr_ca','Outils');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('15','en_us','Past Exams');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('15','fr_ca','Anciens examens');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('16','en_us','Evaluation Criteria');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('16','fr_ca','Critéres d''évaluation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('17','en_us','Preparation to Evaluation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('17','fr_ca','Préparation é l''évaluation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('18','en_us','Submission Procedures and Penalties');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('18','fr_ca','Modalités de remise et pénalités');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('19','en_us','Miscellaneous Resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('19','fr_ca','Ressources générales');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('20','en_us','Activities/Resources before session');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('20','fr_ca','Activités/Ressources avant la séance');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('21','en_us','Activities/Resources during session');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('21','fr_ca','Activités/Ressources pendant la séance');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('22','en_us','Activities/Resources after session');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('22','fr_ca','Activités/Ressources aprés la séance');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('23','en_us','Final exam');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('23','fr_ca','Examen final');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('24','en_us','Midterm exam');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('24','fr_ca','Examen intra');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('25','en_us','Participation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('25','fr_ca','Participation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('26','en_us','Work');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('26','fr_ca','Travail');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('27','en_us','Test/Quizz');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('27','fr_ca','Test/Quizz');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('28','en_us','Other');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('28','fr_ca','Autre');