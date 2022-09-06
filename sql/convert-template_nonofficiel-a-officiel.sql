DECLARE
   
    newTemplateStructureId TENJIN_SYLLABUSELEMENT.TEMPLATESTRUCTURE_ID%TYPE;
    mappingId    varchar2(999);
    siteID  varchar2(999);
      
    --Table for syllabus Elements
    TYPE syllabusElementstable IS TABLE OF TENJIN_SYLLABUSELEMENT%ROWTYPE;
    syllabusElements syllabusElementstable;

    --Table for published  syllabus Elements
    TYPE pubSyllabusElementstable IS TABLE OF TENJIN_PUBSYLLABUSELEMENT%ROWTYPE;
    pubSyllabusElements pubSyllabusElementstable;

BEGIN
    
  siteID := 'test_curtis_fr_non-officiel';
  -- update syllabus

   --update template_id
   --DBMS_OUTPUT.PUT_LINE( 'The syllabus has been updated ' || siteID || ' to template 1 ' );  
   update tenjin_syllabus set template_id = 1 where site_id like siteID;
   --update templateStructureId
   select * bulk collect into syllabusElements from tenjin_syllabuselement where syllabuselement_id in 
   (select syllabuselement_id from TENJIN_SYLLABUSELEMENTMAPPING tsm, TENJIN_SYLLABUS ts where tsm.SYLLABUS_ID = ts.SYLLABUS_ID 
   and ts.SITE_ID = siteID and ts.DELETED = 0) order by TEMPLATESTRUCTURE_ID;

   if syllabusElements.count > 0 then
     for idx in syllabusElements.first().. syllabusElements.last() loop
        --DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || syllabusElements(idx).TEMPLATESTRUCTURE_ID); 
        if (syllabusElements(idx).TEMPLATESTRUCTURE_ID > 0) then
   
          select mapId into mappingId from (SELECT level, TEMPLATESTRUCTURE_ID, PARENT_ID,  DISPLAY_ORDER, SYS_CONNECT_BY_PATH(TEMPLATEELEMENT_ID, '/') mapId,
          TEMPLATE_ID,  TEMPLATEELEMENT_ID,  SYS_CONNECT_BY_PATH(TEMPLATESTRUCTURE_ID, '/') "Path2" FROM TENJIN_TEMPLATESTRUCTURE
          START WITH TEMPLATE_ID = 2
          CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where templatestructure_id =syllabusElements(idx).TEMPLATESTRUCTURE_ID; 
          
	      -- catch provided description
          IF (syllabusElements(idx).TEMPLATESTRUCTURE_ID = 750) THEN
          	update TENJIN_SYLLABUSELEMENT set PROVIDER_ID=1, TEMPLATESTRUCTURE_ID=2 where syllabuselement_id = syllabusElements(idx).syllabuselement_id;
			--DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || syllabusElements(idx).SYLLABUSELEMENT_ID || ' to templateStructure 2 provider id 1');
		  ELSIF (syllabusElements(idx).TEMPLATESTRUCTURE_ID = 753) THEN
          	update TENJIN_SYLLABUSELEMENT set TEMPLATESTRUCTURE_ID=-1 where syllabuselement_id = syllabusElements(idx).syllabuselement_id;
			--DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || syllabusElements(idx).SYLLABUSELEMENT_ID || ' to templateStructure -1');
		  ELSE
          	select templatestructure_id into newTemplateStructureId from (SELECT level, TEMPLATESTRUCTURE_ID, PARENT_ID,  DISPLAY_ORDER, SYS_CONNECT_BY_PATH(TEMPLATEELEMENT_ID, '/') mapId,
          	TEMPLATE_ID, TEMPLATEELEMENT_ID,  SYS_CONNECT_BY_PATH(TEMPLATESTRUCTURE_ID, '/') "Path2" FROM TENJIN_TEMPLATESTRUCTURE
          	START WITH TEMPLATE_ID = 1
          	CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where mapId = mappingId;
    
    	    update TENJIN_SYLLABUSELEMENT set TEMPLATESTRUCTURE_ID = newTemplateStructureId where syllabuselement_id = syllabusElements(idx).syllabuselement_id;
            --DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || syllabusElements(idx).TEMPLATESTRUCTURE_ID || ' to templateStructure ' || newTemplateStructureId);          	
          END IF;
        end if;
--        if (syllabusElements(idx).PROVIDER_ID = 1) then
--          update TENJIN_SYLLABUSELEMENT set PROVIDER_ID = NULL where syllabuselement_id = syllabusElements(idx).syllabuselement_id;
--        end if;
     end loop;
   else
    DBMS_OUTPUT.PUT_LINE( 'Pas de plan de cours');
   end if;  
   
   -- update published syllabus
   
   --update templateStructureId
   select * bulk collect into pubSyllabusElements from TENJIN_PUBSYLLABUSELEMENT where PUBSYLLABUSELEMENT_ID in 
   (select tsm.PUBSYLLABUSELEMENT_ID from TENJIN_PUBSYLLABUSELEM_MAPPING tsm, TENJIN_SYLLABUS ts where tsm.SYLLABUS_ID = ts.SYLLABUS_ID 
   and ts.SITE_ID = siteID and ts.DELETED = 0) order by TEMPLATESTRUCTURE_ID;

   if pubSyllabusElements.count > 0 then
     for idx in pubSyllabusElements.first().. pubSyllabusElements.last() loop
       --DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID); 
       if (pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID > 0) then
   
         select mapId into mappingId from (SELECT level, TEMPLATESTRUCTURE_ID, PARENT_ID,  DISPLAY_ORDER, SYS_CONNECT_BY_PATH(TEMPLATEELEMENT_ID, '/') mapId,
         TEMPLATE_ID,  TEMPLATEELEMENT_ID,  SYS_CONNECT_BY_PATH(TEMPLATESTRUCTURE_ID, '/') "Path2" FROM TENJIN_TEMPLATESTRUCTURE
         START WITH TEMPLATE_ID =2
         CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where templatestructure_id =pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID; 
         
          IF (pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID = 750) THEN
          	update TENJIN_PUBSYLLABUSELEMENT set TEMPLATESTRUCTURE_ID = 2 where pubsyllabuselement_id = pubSyllabusElements(idx).pubsyllabuselement_id;
          ELSIF (pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID = 753) THEN
          	update TENJIN_PUBSYLLABUSELEMENT set TEMPLATESTRUCTURE_ID = -1 where pubsyllabuselement_id = pubSyllabusElements(idx).pubsyllabuselement_id;
          ELSE
            select templatestructure_id into newTemplateStructureId from (SELECT level, TEMPLATESTRUCTURE_ID, PARENT_ID,  DISPLAY_ORDER, SYS_CONNECT_BY_PATH(TEMPLATEELEMENT_ID, '/') mapId,
            TEMPLATE_ID, TEMPLATEELEMENT_ID,  SYS_CONNECT_BY_PATH(TEMPLATESTRUCTURE_ID, '/') "Path2" FROM TENJIN_TEMPLATESTRUCTURE
            START WITH TEMPLATE_ID =1
            CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where mapId = mappingId;
    
            update TENJIN_PUBSYLLABUSELEMENT set TEMPLATESTRUCTURE_ID = newTemplateStructureId where PUBSYLLABUSELEMENT_ID = pubSyllabusElements(idx).pubsyllabuselement_id;
         END IF;
         --DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID || ' to templateStructure ' || newTemplateStructureId);                          
       end if;
     end loop;
   else
    DBMS_OUTPUT.PUT_LINE( 'Pas de plan de cours publie');
   end if;  
END;
