SELECT subsel.SITE_ID, subsel.title AS syllabus_title, LISTAGG(ssg.TITLE, ', ') WITHIN GROUP (ORDER BY ssg.TITLE) AS Sections, link_title, url FROM
(
SELECT DISTINCT ts.SYLLABUS_ID, ts.SITE_ID, ts.TITLE,  tp.TITLE AS LINK_TITLE, to_char(tpa.VALUE) AS url
FROM TENJIN_PUBSYLLABUSELEMENT tp, 
TENJIN_SYLLABUS ts, 
TENJIN_PUBSYLLABUSELEM_MAPPING tpm, 
TENJIN_PUBSYLLABUSELEM_ATTR tpa
WHERE CLASS_TYPE LIKE '%Hyperlink%'
AND ts.SYLLABUS_ID = tpm.SYLLABUS_ID 
AND tp.PUBSYLLABUSELEMENT_ID = tpm.PUBSYLLABUSELEMENT_ID 
AND ts.SITE_ID LIKE '%H2020%'
AND ts.DELETED = 0
AND tp.PUBSYLLABUSELEMENT_ID = tpa.PUBSYLLABUSELEMENT_ID 
AND (tpa.NAME = 'hyperlinkUrl')
--AND (CONTAINS(to_char(tpa.VALUE), 'melies')>0 OR CONTAINS(to_char(tpa.VALUE), 'ernest.hec.ca')>0)  -- pour trouver seulement les videos
GROUP BY ts.SYLLABUS_ID, ts.SITE_ID, ts.TITLE, tp.title, to_char(tpa.VALUE)
ORDER BY ts.SITE_ID, ts.TITLE
) subsel, 
TENJIN_SYLLABUSSECTION ts2, 
SAKAI_SITE_GROUP ssg 
WHERE ts2.SYLLABUS_ID = subsel.SYLLABUS_ID
AND ssg.GROUP_ID = ts2."SECTION" 
GROUP BY subsel.SITE_ID, subsel.title, link_title, url;
