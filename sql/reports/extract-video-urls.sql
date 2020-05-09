SELECT subsel.site_id, subsel.syllabus_title, LISTAGG(ssg.TITLE, ', ') WITHIN GROUP (ORDER BY ssg.TITLE) AS Sections, subsel.video_title, url 
FROM 
(
SELECT DISTINCT ts.SYLLABUS_ID, ts.SITE_ID, ts.TITLE AS syllabus_title, tp.TITLE AS video_title, to_char(tpa.VALUE) AS url
FROM TENJIN_PUBSYLLABUSELEMENT tp, TENJIN_SYLLABUS ts, TENJIN_PUBSYLLABUSELEM_MAPPING tpm, TENJIN_PUBSYLLABUSELEM_ATTR tpa
WHERE CLASS_TYPE LIKE '%Video%'
AND ts.SYLLABUS_ID = tpm.SYLLABUS_ID 
AND tp.PUBSYLLABUSELEMENT_ID = tpm.PUBSYLLABUSELEMENT_ID 
AND ts.SITE_ID LIKE '%A2019%'
AND ts.DELETED = 0
AND tp.PUBSYLLABUSELEMENT_ID = tpa.PUBSYLLABUSELEMENT_ID 
AND (tpa.NAME = 'videoUrl' OR tpa.NAME = 'embedCode')
GROUP BY ts.SYLLABUS_ID, ts.SITE_ID, ts.TITLE, tp.title, to_char(tpa.VALUE)
) subsel,
TENJIN_SYLLABUSSECTION ts2, SAKAI_SITE_GROUP ssg 
WHERE subsel.SYLLABUS_ID = ts2.SYLLABUS_ID 
AND ts2."SECTION" = ssg.GROUP_ID 
GROUP BY subsel.site_id, subsel.syllabus_title, subsel.video_title, url

--cleanup 
-- 1. copier la colonne url dans un fichier text
-- 2. rouler cette commande dans bash :
--    sed -r -e "s/^<iframe src=\"//" -e "s/\".*[iframe|allowfullscreen]>$//" <nom-du-fichier>
-- 3. recopier le contenu dans excel