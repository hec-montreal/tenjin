-- count number for each filetype per syllabus
SELECT site_id, SYLLABUS_TITLE, SUBSTR(filename, instr(filename, '.', -1)) AS filetype, count(*)
FROM
(
SELECT distinct ts.SITE_ID, ts.title AS syllabus_title, to_char(value) AS filename
FROM TENJIN_PUBSYLLABUSELEMENT tp, TENJIN_PUBSYLLABUSELEM_ATTR tpa, TENJIN_SYLLABUS ts, TENJIN_PUBSYLLABUSELEM_MAPPING tpm 
WHERE CLASS_TYPE LIKE '%Document%'
AND ts.SITE_ID LIKE '%H2020%'
AND tp.PUBSYLLABUSELEMENT_ID = tpa.PUBSYLLABUSELEMENT_ID 
AND ts.SYLLABUS_ID = tpm.SYLLABUS_ID 
AND tpm.PUBSYLLABUSELEMENT_ID = tp.PUBSYLLABUSELEMENT_ID 
AND name = 'documentId'
AND ts.DELETED = 0
ORDER BY SITE_ID, SYLLABUS_TITLE
)
GROUP BY SITE_ID, SYLLABUS_TITLE, SUBSTR(filename, instr(filename, '.', -1)) 
ORDER BY SITE_ID, SYLLABUS_TITLE, FILETYPE;

-- all file names
SELECT DISTINCT ts.SITE_ID, ts.title AS syllabus_title, to_char(value)
FROM TENJIN_PUBSYLLABUSELEMENT tp, TENJIN_PUBSYLLABUSELEM_ATTR tpa, TENJIN_SYLLABUS ts, TENJIN_PUBSYLLABUSELEM_MAPPING tpm
WHERE CLASS_TYPE LIKE '%Document%'
AND ts.SITE_ID LIKE '%H2020%'
AND tp.PUBSYLLABUSELEMENT_ID = tpa.PUBSYLLABUSELEMENT_ID 
AND ts.SYLLABUS_ID = tpm.SYLLABUS_ID 
AND tpm.PUBSYLLABUSELEMENT_ID = tp.PUBSYLLABUSELEMENT_ID 
AND name = 'documentId'
AND ts.DELETED = 0
ORDER BY ts.SITE_ID , ts.TITLE;