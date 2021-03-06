set serveroutput on size unlimited;
set define off;
DECLARE
  CURSOR common_evaluation_elements_cur is
    SELECT e.syllabuselement_id, s.site_id, locale FROM tenjin_syllabuselement e, tenjin_syllabuselementmapping m, tenjin_syllabus s
    WHERE e.syllabuselement_id = m.syllabuselement_id
    AND m.syllabus_id = s.syllabus_id
    AND s.deleted = 0
    AND s.common = 1
    AND e.common = 1
    AND e.templatestructure_id = 12
    AND e.class_type = 'ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement';
    
  evaluations_element_id NUMBER(19,0);
  rubric_id NUMBER;
  text_element_id NUMBER;
  site_id VARCHAR2(255 CHAR);
  locale VARCHAR2(5 CHAR);
  rubric_title VARCHAR2(255 CHAR);
  text_description CLOB;
  n NUMBER := 0;
  
BEGIN
  dbms_output.enable(NULL);

  OPEN common_evaluation_elements_cur;

  LOOP
    FETCH common_evaluation_elements_cur INTO evaluations_element_id, site_id, locale;
    EXIT WHEN common_evaluation_elements_cur%NOTFOUND;
     
    IF locale = 'en_US' THEN
      rubric_title := 'IMPORTANT';
      text_description := '<h4>Plagiarism</h4><p>Students are expected to become informed of which actions are considered to be plagiarism or other academic violations at HEC Montr&eacute;al, and of the applicable procedure and sanctions, which may include suspension or even expulsion from HEC Montr&eacute;al. Violations are judged based on the facts and circumstances, and sanctions are applied accordingly. <a href="http://www.hec.ca/en/programs_training/plagiarism.html" targe="_black">Learn more about plagiarism...</a></br>Cases of plagiarism are often caused by documented sources and in-text citations not being referenced correctly.</br>All forms of assignments can be analyzed using originality checking software.</br>You are invited to consult the guide "<a href="http://libguides.hec.ca/citing" target="_blank">Citing your sources</a>", from the reference helpdesk of the HEC library.</p><h4>Calculators</h4><p>Please consult the <a href="http://www.hec.ca/en/current_student/technologies/authorized_calculators/calculators.html" target="_blank">calculator usage policy</a> during exams when applicable.<h4>Mutual aid during an individual work</h4><p>It is the opinion of HEC Montreal that students engaging in discussion and collaboration for their individual work or paper, is not only normal, but also desirable. These interactions contribute to the enrichment of the overall learning process.</br>However, there are certain types of communication between students that infringe upon the school''s rules and regulations regarding plagiarism. Transmitting files, ongoing discussions resulting in an agreement on a set process and the answer per se are considered as such infringements.</p><hr>';
    ELSIF locale = 'es_ES' THEN
      rubric_title := 'IMPORTANTE';
      text_description := '<h4>Mon principal devoir: &ecirc;tre pr&eacute;sent en classe</h4><p>Selon le <a href="http://www.hec.ca/direction_services/secretariat_general/juridique/reglements_politiques/documents/Reglement_pedagogique.pdf" target="_blank">r&egrave;glement de l&apos;&Eacute;cole</a>, la pr&eacute;sence de l&apos;&eacute;tudiant en classe (ou aux activit&eacute;s du cours) est pr&eacute;sum&eacute;e. Ainsi, l&apos;enseignant n&apos;est pas tenu de fournir de l&apos;aide ou d&apos;adapter le cours ou son &eacute;valuation en raison d&apos;une absence.</p><h4>L&apos;int&eacute;grit&eacute; intellectuelle: tout le monde y gagne!</h4><p>Notez que toute &eacute;valuation peut faire l&apos;objet d&apos;une analyse par un logiciel de d&eacute;tection de similitudes. Informez-vous sur <a href="http://www.hec.ca/integrite/bonnes-pratiques-et-ressources/index.html" target="_blank">les fa&ccedil;ons d&apos;&eacute;viter le plagiat</a> et attention aux travaux d&apos;&eacute;quipe et &agrave; la collaboration hors-classe! <a href="http://www.hec.ca/integrite/index.html" target="_blank">Pour en savoir plus sur l&apos;int&eacute;grit&eacute; intellectuelle...</a></p><h4>Les examens: &agrave; v&eacute;rifier avant le jour J!</h4><ol><li>La validit&eacute; de sa carte d&rsquo;&eacute;tudiant. <a href="http://www.hec.ca/etudiant_actuel/rentree-scolaire/carte-etudiante/carte-etudiante.html" target="_blank">En savoir plus...</a></li><li>L&apos;horaire et la salle de l&apos;examen  (dans <a href="https://enligne.hec.ca/psp/GAPET/HEL/HRMS/?cmd=login&amp;languageCd=CFR" target="_blank">HEC en ligne</a>)</li><li>La documentation autoris&eacute;e &agrave; l&apos;examen (dans mon site <a href="https://zonecours.hec.ca/" target="_blank">ZoneCours</a>)</li><li>La conformit&eacute; de ma calculatrice. <a href="http://www.hec.ca/etudiant_actuel/services-offerts/ressources-technologiques/calculatrices/calculatrices.html" target="_blank">En savoir plus...</a></li></ol><hr>';
    ELSE
      rubric_title := 'IMPORTANT';
      text_description := '<h4>Mon principal devoir: &ecirc;tre pr&eacute;sent en classe</h4><p>Selon le <a href="http://www.hec.ca/direction_services/secretariat_general/juridique/reglements_politiques/documents/Reglement_pedagogique.pdf" target="_blank">r&egrave;glement de l&apos;&Eacute;cole</a>, la pr&eacute;sence de l&apos;&eacute;tudiant en classe (ou aux activit&eacute;s du cours) est pr&eacute;sum&eacute;e. Ainsi, l&apos;enseignant n&apos;est pas tenu de fournir de l&apos;aide ou d&apos;adapter le cours ou son &eacute;valuation en raison d&apos;une absence.</p><h4>L&apos;int&eacute;grit&eacute; intellectuelle: tout le monde y gagne!</h4><p>Notez que toute &eacute;valuation peut faire l&apos;objet d&apos;une analyse par un logiciel de d&eacute;tection de similitudes. Informez-vous sur <a href="http://www.hec.ca/integrite/bonnes-pratiques-et-ressources/index.html" target="_blank">les fa&ccedil;ons d&apos;&eacute;viter le plagiat</a> et attention aux travaux d&apos;&eacute;quipe et &agrave; la collaboration hors-classe! <a href="http://www.hec.ca/integrite/index.html" target="_blank">Pour en savoir plus sur l&apos;int&eacute;grit&eacute; intellectuelle...</a></p><h4>Les examens: &agrave; v&eacute;rifier avant le jour J!</h4><ol><li>La validit&eacute; de sa carte d&rsquo;&eacute;tudiant. <a href="http://www.hec.ca/etudiant_actuel/rentree-scolaire/carte-etudiante/carte-etudiante.html" target="_blank">En savoir plus...</a></li><li>L&apos;horaire et la salle de l&apos;examen  (dans <a href="https://enligne.hec.ca/psp/GAPET/HEL/HRMS/?cmd=login&amp;languageCd=CFR" target="_blank">HEC en ligne</a>)</li><li>La documentation autoris&eacute;e &agrave; l&apos;examen (dans mon site <a href="https://zonecours.hec.ca/" target="_blank">ZoneCours</a>)</li><li>La conformit&eacute; de ma calculatrice. <a href="http://www.hec.ca/etudiant_actuel/services-offerts/ressources-technologiques/calculatrices/calculatrices.html" target="_blank">En savoir plus...</a></li></ol><hr>';
    END IF;
    
    --insert new rubric and text elements
    rubric_id := syllabuselement_id_seq.NEXTVAL;
    text_element_id := syllabuselement_id_seq.NEXTVAL;
    INSERT INTO tenjin_syllabuselement (SYLLABUSELEMENT_ID, CLASS_TYPE, SITE_ID, PARENT_ID, TEMPLATESTRUCTURE_ID, TITLE, COMMON, PUBLIC_ELEMENT, IMPORTANT, EQUALS_PUBLISHED, CREATED_DATE, CREATED_BY, LAST_MODIFIED_DATE, LAST_MODIFIED_BY, PROVIDER_ID)
    VALUES (rubric_id, 'ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement', site_id, evaluations_element_id, 693, rubric_title, 1, 1, 0, 0, SYSDATE, 'admin', SYSDATE, 'admin', 2);
    
    INSERT INTO tenjin_syllabuselement (SYLLABUSELEMENT_ID, CLASS_TYPE, SITE_ID, PARENT_ID, TEMPLATESTRUCTURE_ID, DESCRIPTION, COMMON, PUBLIC_ELEMENT, IMPORTANT, EQUALS_PUBLISHED, CREATED_DATE, CREATED_BY, LAST_MODIFIED_DATE, LAST_MODIFIED_BY, PROVIDER_ID)
    VALUES (text_element_id, 'ca.hec.tenjin.api.model.syllabus.SyllabusTextElement', site_id, rubric_id, -1, text_description, 1, 1, 0, 0, SYSDATE, 'admin', SYSDATE, 'admin', 2);
    
    -- update mappings for existing children of this evaluation element
    UPDATE tenjin_syllabuselementmapping SET display_order = display_order+1 
    WHERE syllabuselement_id in (select syllabuselement_id from tenjin_syllabuselement where parent_id = evaluations_element_id);
    
    -- insert a mapping to the new rubric/text for every syllabus where this evaluations element has a mapping already
    FOR mappings IN (SELECT * FROM tenjin_syllabuselementmapping m where m.syllabuselement_id = evaluations_element_id)
    LOOP
      INSERT INTO tenjin_syllabuselementmapping (SYLLABUSELEMENTMAPPING_ID, SYLLABUS_ID, SYLLABUSELEMENT_ID, DISPLAY_ORDER, HIDDEN) VALUES
      (syllabuselmap_id_seq.NEXTVAL, mappings.syllabus_id, rubric_id, 0, 0);
      INSERT INTO tenjin_syllabuselementmapping (SYLLABUSELEMENTMAPPING_ID, SYLLABUS_ID, SYLLABUSELEMENT_ID, DISPLAY_ORDER, HIDDEN) VALUES
      (syllabuselmap_id_seq.NEXTVAL, mappings.syllabus_id, text_element_id, 0, 0);
    END LOOP;

  n := n+1;
  dbms_output.put_line('Inserted rubric ' || rubric_id || ' into common syllabus for site ' || site_id || ' locale = ' || locale);
  END LOOP;
  dbms_output.put_line('New rubric inserted in ' || n || ' syllabuses');
  CLOSE common_evaluation_elements_cur;
END;