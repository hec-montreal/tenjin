--list sites without official description
--SELECT distinct tse.SITE_ID
--FROM tenjin_syllabuselement tse, tenjin_syllabuselement tsp, TENJIN_SYLLABUSELEMENTMAPPING ts, TENJIN_SYLLABUS ts3 
--WHERE tsp.SYLLABUSELEMENT_ID NOT IN (SELECT PARENT_ID FROM TENJIN_SYLLABUSELEMENT ts2 where ts2.TEMPLATESTRUCTURE_ID = 2)
--AND tsp.TEMPLATESTRUCTURE_ID = 1
--AND tsp.SYLLABUSELEMENT_ID = ts.SYLLABUSELEMENT_ID 
--AND ts.SYLLABUS_ID = ts3.SYLLABUS_ID 
--AND ts3.DELETED = 0
--AND tse.PARENT_ID = tsp.SYLLABUSELEMENT_ID;

--increase display orders in mapping
UPDATE TENJIN_SYLLABUSELEMENTMAPPING SET DISPLAY_ORDER = DISPLAY_ORDER+1, EQUALS_PUBLISHED = 0 WHERE SYLLABUSELEMENT_ID IN 
(SELECT tse.SYLLABUSELEMENT_ID 
FROM tenjin_syllabuselement tse, tenjin_syllabuselement tsp, TENJIN_SYLLABUSELEMENTMAPPING ts, TENJIN_SYLLABUS ts3 
WHERE tsp.SYLLABUSELEMENT_ID NOT IN (SELECT PARENT_ID FROM TENJIN_SYLLABUSELEMENT ts2 where ts2.TEMPLATESTRUCTURE_ID = 2)
AND tsp.TEMPLATESTRUCTURE_ID = 1
AND tsp.SITE_ID IN ('MNGT50407A.A2020','FINA50200A.A2019','PROJ30415.A2020','MNGT60430.A2019','MNGT50407A.A2019','INTE30000.A2019','OPER80565A.A2019','PROJ30415.A2019')
AND tsp.SYLLABUSELEMENT_ID = ts.SYLLABUSELEMENT_ID 
AND ts.SYLLABUS_ID = ts3.SYLLABUS_ID 
AND ts3.DELETED = 0
AND tse.PARENT_ID = tsp.SYLLABUSELEMENT_ID);

--insert rubric description
INSERT INTO TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID, CLASS_TYPE, TEMPLATESTRUCTURE_ID, PROVIDER_ID, COMMON, EQUALS_PUBLISHED, CREATED_DATE, CREATED_BY, LAST_MODIFIED_DATE, LAST_MODIFIED_BY, TITLE, SITE_ID, PARENT_ID) 
(SELECT syllabuselement_id_seq.nextval, 'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement', 2, 1, 1, 0, SYSDATE, 'mameawa_insert_description', SYSDATE, 'mameawa_insert_description', 'Description', ts.SITE_ID, ts.SYLLABUSELEMENT_ID 
FROM TENJIN_SYLLABUSELEMENT ts
WHERE ts.TEMPLATESTRUCTURE_ID = 1
AND ts.SYLLABUSELEMENT_ID NOT IN (SELECT PARENT_ID FROM TENJIN_SYLLABUSELEMENT ts2 WHERE ts2.TEMPLATESTRUCTURE_ID = 2)
AND ts.SITE_ID IN ('PROJ30415.E2020','MNGT60430.E2020','MNGT50407A.A2020','FINA50200A.A2019','PROJ30415.A2020','MNGT60430.A2019','MNGT50407A.A2019','INTE30000.A2019','OPER80565A.A2019','PROJ30415.A2019','PROJ30415.H2020','FINA50200.H2020','FINA50200.E2020','FINA50200.A2020','MNGT60430.A2020','FINA50200.A2019')
);

-- insert official description text
INSERT INTO TENJIN_SYLLABUSELEMENT (SYLLABUSELEMENT_ID, CLASS_TYPE, TEMPLATESTRUCTURE_ID, COMMON, EQUALS_PUBLISHED, PROVIDER_ID, DESCRIPTION, CREATED_DATE, CREATED_BY, LAST_MODIFIED_DATE, LAST_MODIFIED_BY, SITE_ID, PARENT_ID) 
(SELECT syllabuselement_id_seq.nextval, 'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement', -1, 1, 0, 2, 'Text Temporaire', SYSDATE,
'mameawa_insert_description', SYSDATE, 'mameawa_insert_description', ts.SITE_ID, ts.SYLLABUSELEMENT_ID 
FROM TENJIN_SYLLABUSELEMENT ts
WHERE ts.CREATED_BY = 'mameawa_insert_description' AND ts.TEMPLATESTRUCTURE_ID = 2
AND ts.SITE_ID IN ('PROJ30415.E2020','MNGT60430.E2020','MNGT50407A.A2020','FINA50200A.A2019','PROJ30415.A2020','MNGT60430.A2019','MNGT50407A.A2019','INTE30000.A2019','OPER80565A.A2019','PROJ30415.A2019','PROJ30415.H2020','FINA50200.H2020','FINA50200.E2020','FINA50200.A2020','MNGT60430.A2020','FINA50200.A2019')
);

--insert rubric and text in mapping
INSERT INTO TENJIN_SYLLABUSELEMENTMAPPING (SYLLABUSELEMENTMAPPING_ID, SYLLABUS_ID, SYLLABUSELEMENT_ID, DISPLAY_ORDER, HIDDEN, EQUALS_PUBLISHED)
(SELECT SYLLABUSELMAP_ID_SEQ.nextval, tsyl.SYLLABUS_ID, ts.SYLLABUSELEMENT_ID, 0, 0, 0
FROM TENJIN_SYLLABUSELEMENT ts, TENJIN_SYLLABUS tsyl
WHERE ts.SITE_ID = tsyl.SITE_ID AND tsyl.DELETED = 0
AND ts.CREATED_BY = 'mameawa_insert_description'
AND ts.TEMPLATESTRUCTURE_ID IN (-1, 2)
AND ts.SITE_ID IN ('PROJ30415.E2020','MNGT60430.E2020','MNGT50407A.A2020','FINA50200A.A2019','PROJ30415.A2020','MNGT60430.A2019','MNGT50407A.A2019','INTE30000.A2019','OPER80565A.A2019','PROJ30415.A2019','PROJ30415.H2020','FINA50200.H2020','FINA50200.E2020','FINA50200.A2020','MNGT60430.A2020','FINA50200.A2019')
);