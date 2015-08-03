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

--mandatory? display_order?
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (1,null,1,1);--'Presentation du cours'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (2,1,null,2);--'Texte'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (3,1,null,3);--'Document'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (4,1,null,4);--'Hyperlien'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (5,null,1,1);--'Coordonnees'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (6,5,null,6);--'Coordonnee'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (7,null,1,1);--'Mat�riel p�dagogique'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (8,7,null,2);--Texte
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (9,7,null,3);--Document
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (10,7,null,4);--Hyperlien
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (11,7,null,5);--'R�f�rence bibliograpgique'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (12,null,1,1);--,'Evaluations'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (13,12,null,8);--,'Evaluations'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (14,null,1,1);--,'Organisation du cours'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (15,14,null,9);--,'Seance de cours'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (16,14,null,10);--,'Seance de cours'
INSERT INTO osyl2_templateelement(TEMPLATEELEMENT_ID,PARENT_ID,TEMPLATE_ID,ELEMENTTYPE_ID) VALUES (17,14,null,1);--,'Regroupement'

--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('1','Non d�fini');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('2','Description');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('3','Objectifs');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('4','Approche p�dagogique');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('5','Coordinateur');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('6','Enseignant(s)');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('7','Stagiaire(s) d''enseignement');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('8','Conf�rencier(s)');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('9','Secr�taire(s)');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('10','Ressources bibliographiques');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('11','Ressources bibliographiques compl�mentaires');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('12','Ressources g�n�rales');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('13','Cas');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('14','Outils');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('15','Anciens examens');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('16','Crit�res d''�valuation');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('17','Pr�paration � l''�valuation');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('18','Modalit�s de remise et p�nalit�s');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('19','Ressources g�n�rales');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('20','Activit�s/Ressources avant la s�ance');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('21','Activit�s/Ressources pendant la s�ance');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('22','Activit�s/Ressources apr�s la s�ance');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('23','Examen final');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('24','Examen intra');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('25','Participation');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('26','Travail');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('27','Test/Quizz');
--INSERT INTO osyl2_rubric(RUBRIC_ID,LABEL)VALUES('28','Autre');

--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('1','en_us','Presentation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('1','fr_ca','Pr�sentation du cours');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('2','en_us','Text');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('2','fr_ca','Texte');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('3','en_us','Document');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('3','fr_ca','Document');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('4','en_us','Url');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('4','fr_ca','Url');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('5','en_us','Contact informations');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('5','fr_ca','Coordonn�es');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('6','en_us','Contact information');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('6','fr_ca','Coordonn�e');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('7','en_us','Learning material');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('7','fr_ca','Mat�riel p�dagogique');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('8','en_us','Citation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('8','fr_ca','R�f�rence bibliographique');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('9','en_us','Evaluations');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('9','fr_ca','�valuations');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('10','en_us','Evaluation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('10','fr_ca','�valuation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('11','en_us','Entity');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('11','fr_ca','Entit�');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('12','en_us','Course Organisation');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('12','fr_ca','Organisation du cours');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('13','en_us','Lecture');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('13','fr_ca','S�ance du cours');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('14','en_us','Tutorial');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('14','fr_ca','S�ance de travaux pratiques');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('15','en_us','Cluster');
--INSERT INTO osyl2_templateelementi18nlabel(TEMPLATEELEMENT_ID,LOCALE,LABEL) VALUES ('15','fr_ca','Regroupement');

--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('1','en_us','Undefined');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('1','fr_ca','Non d�fini');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('2','en_us','Description');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('2','fr_ca','Description');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('3','en_us','Objectives');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('3','fr_ca','Objectifs');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('4','en_us','Learning strategy');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('4','fr_ca','Approche p�dagogique');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('5','en_us','Coordinator');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('5','fr_ca','Coordinateur');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('6','en_us','Lecturer(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('6','fr_ca','Enseignant(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('7','en_us','Teaching assistant(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('7','fr_ca','Stagiaire(s) d''enseignement');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('8','en_us','Speaker(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('8','fr_ca','Conf�rencier(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('9','en_us','Secretary(ies)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('9','fr_ca','Secr�taire(s)');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('10','en_us','Bibliographic resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('10','fr_ca','Ressources bibliographiques');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('11','en_us','Complementary Bibliographical Resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('11','fr_ca','Ressources bibliographiques compl�mentaires');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('12','en_us','Miscellaneous Resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('12','fr_ca','Ressources g�n�rales');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('13','en_us','Case');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('13','fr_ca','Cas');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('14','en_us','Tools');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('14','fr_ca','Outils');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('15','en_us','Past Exams');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('15','fr_ca','Anciens examens');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('16','en_us','Evaluation Criteria');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('16','fr_ca','Crit�res d''�valuation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('17','en_us','Preparation to Evaluation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('17','fr_ca','Pr�paration � l''�valuation');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('18','en_us','Submission Procedures and Penalties');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('18','fr_ca','Modalit�s de remise et p�nalit�s');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('19','en_us','Miscellaneous Resources');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('19','fr_ca','Ressources g�n�rales');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('20','en_us','Activities/Resources before session');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('20','fr_ca','Activit�s/Ressources avant la s�ance');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('21','en_us','Activities/Resources during session');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('21','fr_ca','Activit�s/Ressources pendant la s�ance');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('22','en_us','Activities/Resources after session');
--INSERT INTO osyl2_rubrici18nlabel(RUBRIC_ID,LOCALE,LABEL) VALUES ('22','fr_ca','Activit�s/Ressources apr�s la s�ance');
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