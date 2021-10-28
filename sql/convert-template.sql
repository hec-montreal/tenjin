--donn�es format csv
set serveroutput on size unlimited;
set define off;
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
    
  siteID := 'H2021_CALC_INT_10602_AISB';
  -- update syllabus

   --update template_id
   --DBMS_OUTPUT.PUT_LINE( 'The syllabus has been updated ' || siteID || ' to template 2 ' );  
   update tenjin_syllabus set template_id = 2 where site_id like siteID;
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
          START WITH TEMPLATE_ID =1
          CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where templatestructure_id =syllabusElements(idx).TEMPLATESTRUCTURE_ID; 
            
          select templatestructure_id into newTemplateStructureId from (SELECT level, TEMPLATESTRUCTURE_ID, PARENT_ID,  DISPLAY_ORDER, SYS_CONNECT_BY_PATH(TEMPLATEELEMENT_ID, '/') mapId,
          TEMPLATE_ID, TEMPLATEELEMENT_ID,  SYS_CONNECT_BY_PATH(TEMPLATESTRUCTURE_ID, '/') "Path2" FROM TENJIN_TEMPLATESTRUCTURE
          START WITH TEMPLATE_ID =2
          CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where mapId = mappingId;
    
          update TENJIN_SYLLABUSELEMENT set TEMPLATESTRUCTURE_ID = newTemplateStructureId where syllabuselement_id = syllabusElements(idx).syllabuselement_id;
          --DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || syllabusElements(idx).TEMPLATESTRUCTURE_ID || ' to templateStructure ' || newTemplateStructureId);                          
          end if;
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
         START WITH TEMPLATE_ID =1
         CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where templatestructure_id =pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID; 
         
         select templatestructure_id into newTemplateStructureId from (SELECT level, TEMPLATESTRUCTURE_ID, PARENT_ID,  DISPLAY_ORDER, SYS_CONNECT_BY_PATH(TEMPLATEELEMENT_ID, '/') mapId,
         TEMPLATE_ID, TEMPLATEELEMENT_ID,  SYS_CONNECT_BY_PATH(TEMPLATESTRUCTURE_ID, '/') "Path2" FROM TENJIN_TEMPLATESTRUCTURE
         START WITH TEMPLATE_ID =2
         CONNECT BY  prior TEMPLATESTRUCTURE_ID =  PARENT_ID order by level, DISPLAY_ORDER, mapId) where mapId = mappingId;
    
         update TENJIN_PUBSYLLABUSELEMENT set TEMPLATESTRUCTURE_ID = newTemplateStructureId where PUBSYLLABUSELEMENT_ID = pubSyllabusElements(idx).pubsyllabuselement_id;
         --DBMS_OUTPUT.PUT_LINE( 'The syllabusElement has been updated ' || pubSyllabusElements(idx).TEMPLATESTRUCTURE_ID || ' to templateStructure ' || newTemplateStructureId);                          
       end if;
     end loop;
   else
    DBMS_OUTPUT.PUT_LINE( 'Pas de plan de cours publie');
   end if;  
END;