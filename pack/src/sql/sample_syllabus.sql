--------------------------------------------------------
--  File created - Wednesday-November-25-2015   
--------------------------------------------------------
REM INSERTING into TENJIN_SYLLABUS
SET DEFINE OFF;
Insert into TENJIN_SYLLABUS (SYLLABUS_ID,SITE_ID,TEMPLATE_ID,LOCALE,CREATED_BY,CREATED_DATE,LAST_MODIFIED_BY,LAST_MODIFIED_DATE,COURSE_TITLE) values (1,'52-701-02A.A2013.P3',1,'en_US','admin',to_timestamp('09-NOV-15 12.58.21.586000000 PM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('09-NOV-15 12.58.28.485000000 PM','DD-MON-RR HH.MI.SS.FF AM'),'Information Technologies');
Insert into TENJIN_SYLLABUS (SYLLABUS_ID,SITE_ID,TEMPLATE_ID,LOCALE,CREATED_BY,CREATED_DATE,LAST_MODIFIED_BY,LAST_MODIFIED_DATE,COURSE_TITLE) values (2,'2-200-96.A2015.A01',1,'fr_CA','admin',to_timestamp('09-NOV-15 01.15.12.395000000 PM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('09-NOV-15 01.15.17.866000000 PM','DD-MON-RR HH.MI.SS.FF AM'),'Finance ');
REM INSERTING into TENJIN_SYLLABUSELEMENT
SET DEFINE OFF;
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (1,'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement',null,'Pr�sentation du cours',1,1,1,to_timestamp('09-NOV-15 06.05.44.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',1,0,1);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (2,'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement',1,'Objectif',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,3);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (3,'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement',2,'Je suis un texte',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,40);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (4,'ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement',37,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,59);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (5,'ca.hec.tenjin.api.model.syllabus.SyllabusContactInfoElement',36,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,51);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (6,'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement',1,'Approche P�dagogique',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,4);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (7,'ca.hec.tenjin.api.model.syllabus.SyllabusDocumentElement',37,'Un document',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,6,57);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (8,'ca.hec.tenjin.api.model.syllabus.SyllabusHyperlinkElement',6,'Le site web de HEC',1,1,1,to_timestamp('09-NOV-15 06.05.46.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,45);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (9,'ca.hec.tenjin.api.model.syllabus.SyllabusImageElement',6,'C''est l''halloween!',1,1,1,to_timestamp('09-NOV-15 06.05.46.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,292);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (10,'ca.hec.tenjin.api.model.syllabus.SyllabusSakaiToolElement',38,null,1,1,1,to_timestamp('09-NOV-15 06.05.46.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,121);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (11,'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement',null,'Coordonn�es',1,1,1,to_timestamp('09-NOV-15 06.05.46.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',1,1,5);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (12,'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement',null,'Mat�riel p�dagogique',1,1,1,to_timestamp('09-NOV-15 06.05.46.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',1,2,7);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (13,'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement',null,'�valuations',1,1,1,to_timestamp('09-NOV-15 06.05.46.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',1,3,12);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (14,'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement',null,'Organisation du cours',1,1,1,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',1,4,14);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (15,'ca.hec.tenjin.api.model.syllabus.SyllabusVideoElement',6,'Video Melies',1,1,1,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,2,293);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (16,'ca.hec.tenjin.api.model.syllabus.SyllabusVideoElement',6,'Video DailyMotion',1,1,1,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,3,293);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (17,'ca.hec.tenjin.api.model.syllabus.SyllabusVideoElement',6,'Video Vimeo',1,1,1,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,4,293);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (18,'ca.hec.tenjin.api.model.syllabus.SyllabusVideoElement',6,'Video YouTube',1,1,1,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,5,293);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (19,'ca.hec.tenjin.api.model.syllabus.SyllabusEvaluationElement',13,'Examen Intra',1,1,0,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,13);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (20,'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement',38,null,1,1,0,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,117);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (21,'ca.hec.tenjin.api.model.syllabus.SyllabusLectureElement',14,'S�ance de cours 1',1,1,0,to_timestamp('09-NOV-15 06.05.48.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,15);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (22,'ca.hec.tenjin.api.model.syllabus.SyllabusTutorialElement',14,'S�ance de TP 1',1,1,0,to_timestamp('09-NOV-15 06.05.48.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,16);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (23,'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement',35,null,1,1,1,to_timestamp('09-NOV-15 06.05.48.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,299);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (24,'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement',34,null,1,1,1,to_timestamp('09-NOV-15 06.05.48.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,294);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (31,'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement',30,'Description',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,85);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (32,'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement',31,null,1,1,0,to_timestamp('11-NOV-15 11.57.28.698000000 AM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('11-NOV-15 11.57.34.748000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('11-NOV-15 11.57.42.374000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,117);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (33,'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement',14,'Regroupement: Semaine 2',1,1,0,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,2,17);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (34,'ca.hec.tenjin.api.model.syllabus.SyllabusLectureElement',33,'S�ance de cours 2',1,1,0,to_timestamp('09-NOV-15 06.05.48.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,33);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (35,'ca.hec.tenjin.api.model.syllabus.SyllabusTutorialElement',33,'S�ance de TP 2',1,1,0,to_timestamp('09-NOV-15 06.05.48.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,34);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (25,'ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement',37,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,59);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (26,'ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement',37,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,2,59);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (27,'ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement',37,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,3,59);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (28,'ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement',37,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,4,59);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (29,'ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement',37,null,1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,5,59);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (30,'ca.hec.tenjin.api.model.syllabus.SyllabusEvaluationElement',13,'Examen Final',1,1,0,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,1,80);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (37,'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement',12,'Ressource bibliographiques',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,55);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (38,'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement',19,'Description',1,1,0,to_timestamp('09-NOV-15 06.05.47.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,85);
Insert into TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID,CLASS_TYPE,PARENT_ID,TITLE,PUBLIC_ELEMENT,SHAREABLE,IMPORTANT,AVAILABILITY_START_DATE,AVAILABILITY_END_DATE,CREATED_DATE,CREATED_BY,LAST_MODIFIED_DATE,LAST_MODIFIED_BY,SYLLABUS_ID,DISPLAY_ORDER,TEMPLATESTRUCTURE_ID) values (36,'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement',11,'Enseignant(s)',1,1,1,to_timestamp('09-NOV-15 06.05.45.000000000 PM','DD-MON-RR HH.MI.SS.FF AM'),null,to_timestamp('10-NOV-15 10.54.54.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',to_timestamp('10-NOV-15 10.56.36.000000000 AM','DD-MON-RR HH.MI.SS.FF AM'),'admin',null,0,46);
REM INSERTING into TENJIN_SYLLABUSELEMENTATTRIBUTE
SET DEFINE OFF;
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (3,'text');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'author');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'issn');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'issue');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'journal');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'pages');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'section');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'title');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'type');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'volume');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (4,'year');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactAvailability');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactEmail');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactFirstName');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactLastName');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactOfficeRoom');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactTelephone');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (5,'contactTitle');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (7,'documentUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (8,'hyperlinkType');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (8,'hyperlinkUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (9,'imageUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (15,'videoUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (16,'videoUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (17,'videoUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (18,'videoUrl');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalAtHome');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalDate');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalElectronic');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalInClass');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalMode');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalOral');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalPaper');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalSubmissionType');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalType');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalWeight');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (19,'evalWritten');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (20,'text');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (23,'text');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (24,'text');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'author');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'institution');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'isbn');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'pages');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'publication');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'title');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'type');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'url');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (25,'year');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (26,'author');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (26,'proceedTitle');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (26,'title');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (26,'type');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (26,'year');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'author');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'date');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'siteTitle');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'title');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'type');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'url');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (27,'year');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'author');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'edition');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'editor');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'pages');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'publication');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'title');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'type');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (28,'year');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'author');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'editor');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'pages');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'sectionTitle');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'title');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'town');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'type');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'volume');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (29,'year');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evaSubmissionType');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalAtHome');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalDate');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalElectronic');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalInClass');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalMode');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalOral');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalPaper');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalType');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalWeight');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (30,'evalWritten');
Insert into TENJIN_SYLLABUSELEMENTATTRIBUTE (SYLLABUSELEMENT_ID,NAME) values (32,'text');
REM INSERTING into TENJIN_SYLLABUSELEMENTSECTION
SET DEFINE OFF;
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (1,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (1,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (2,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (2,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (3,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (3,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (4,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (4,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (5,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (5,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (6,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (6,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (7,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (7,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (8,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (8,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (9,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (9,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (10,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (10,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (11,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (11,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (12,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (12,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (13,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (13,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (14,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (14,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (15,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (15,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (16,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (16,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (17,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (17,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (18,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (18,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (19,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (19,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (20,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (20,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (21,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (21,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (22,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (22,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (23,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (23,'D4');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (24,'C3');
Insert into TENJIN_SYLLABUSELEMENTSECTION (SYLLABUSELEMENT_ID,SECTION) values (24,'D4');
