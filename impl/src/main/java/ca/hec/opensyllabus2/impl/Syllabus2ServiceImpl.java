	package ca.hec.opensyllabus2.impl;

import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;

import lombok.Getter;
import lombok.Setter;

import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.dao.Syllabus2Dao;
import ca.hec.opensyllabus2.api.dao.TemplateDao;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElement;
import ca.hec.opensyllabus2.api.model.template.Rubric;
import ca.hec.opensyllabus2.api.model.template.Template;

/**
 * Implementation of {@link Syllabus2Service}
 *
 *
 */
public class Syllabus2ServiceImpl implements Syllabus2Service {

	private static final Logger log = Logger.getLogger(Syllabus2ServiceImpl.class);

	/**
 	* {@inheritDoc}
 	*/
	public String getCurrentSiteId(){
		return toolManager.getCurrentPlacement().getContext();
	}

	/**
 	* {@inheritDoc}
 	*/
	public String getCurrentUserId() {
		return sessionManager.getCurrentSessionUserId();
	}


	/**
 	* {@inheritDoc}
 	*/
	public String getCurrentUserDisplayName() {
	   return userDirectoryService.getCurrentUser().getDisplayName();
	}

	/**
 	* {@inheritDoc}
 	*/
	public boolean isSuperUser() {
		return securityService.isSuperUser();
	}

	/**
 	* {@inheritDoc}
 	*/
	public void postEvent(String event,String reference,boolean modify) {
		eventTrackingService.post(eventTrackingService.newEvent(event,reference,modify));
	}

	/**
 	* {@inheritDoc}
 	*/
	public String getSkinRepoProperty(){
		return serverConfigurationService.getString("skin.repo");
	}

	/**
 	* {@inheritDoc}
 	*/
	public String getToolSkinCSS(String skinRepo){

		String skin = siteService.findTool(sessionManager.getCurrentToolSession().getPlacementId()).getSkin();

		if(skin == null) {
			skin = serverConfigurationService.getString("skin.default");
		}

		return skinRepo + "/" + skin + "/tool.css";
	}

	/**
	 * init - perform any actions required here for when this bean starts up
	 */
	public void init() {
		log.info("init");
	}

    @Setter
	private Syllabus2Dao syllabusDao;

    @Setter
	private TemplateDao templateDao;

	@Setter
	private ToolManager toolManager;

    @Setter
	private SessionManager sessionManager;

    @Setter
	private UserDirectoryService userDirectoryService;

    @Setter
	private SecurityService securityService;

    @Setter
	private EventTrackingService eventTrackingService;

    @Setter
	private ServerConfigurationService serverConfigurationService;

    @Setter
	private SiteService siteService;


    public Syllabus getShareableSyllabus(String courseId) {
		// TODO check if the user is allowed to get the syllabus before

		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getShareableSyllabus(courseId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}


	}

	@Override
	public Syllabus getSyllabus(String courseId, String sectionId) {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getSyllabus(courseId, sectionId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}

	}


	public Map<String,Object> getSyllabusMap(String courseId, String sectionId) {
		//representation of the syllabus map
		Map <String, Object> mapped = new HashMap<String, Object>();
		Syllabus syllabus = getSyllabus(courseId, sectionId);
		
		int size = syllabus.getSyllabusElements().size();
		int position = 0;
		ArrayList<Map<String, Object>> sortedElements = new ArrayList<Map<String, Object>>(
				size);

		// add the syllabus meta properties to the syllabus map
		mapped.putAll(getSyllabusMetaProperties(syllabus));

		for (SyllabusElement syllElm : syllabus.getSyllabusElements()) {
			position = syllElm.getDisplayOrder().intValue() - 1;
			sortedElements.add(position,
					getSyllabusElementMetaProperties(syllElm,new ArrayList<Map<String, Object>>()));
			System.out.println(position);
		}

		mapped.put("elements", sortedElements);

		System.out.println(mapped);
		
		return mapped;
	}	

		private Map<String, Object> getSyllabusMetaProperties(Syllabus syllabus) {
			Map<String, Object> metaProperties = new HashMap<String, Object>();

			metaProperties.put("site_id", syllabus.getSite_id());
			metaProperties.put("courseTitle", syllabus.getCourseTitle());
			metaProperties.put("locale", syllabus.getLocale());

			return metaProperties;
		}

		@SuppressWarnings("unchecked")
		private ArrayList<Map<String, Object>> getSyllabusElementByRubric(
				SyllabusElement syllElm, ArrayList<Map<String, Object>> syllElmList) {
			String rubricLabel = syllElm.getRubric().getLabel();
			Map<String, Object> mappedSyllElm = null, mappedSyllElmList = null;
			boolean found = false;
			int position = 0;
			Map<String, Object> syllElmInList = null;
			
			//System.out.println ("dans rubric " + syllElm.getSyllabusElement_id() + " elms " + syllElmList);
			ArrayList<Map<String, Object>> elements = new ArrayList<Map<String, Object>>();
			if (!syllElmList.isEmpty()){
				//Chercher si la rubrique est dans la liste
				for (int i = 0;  i < syllElmList.size(); i++){
					syllElmInList = syllElmList.get(i);
					if (syllElmInList.containsValue(rubricLabel)){
						found = true;
						position = i;
						break;
					}
				}
			}
			
			//Ajouter à la liste de la rubrique trouvée
			if (found){
				elements = (ArrayList<Map<String, Object>>) syllElmInList.get("elements");
			}//Ajouter une nouvelle liste à la liste
			else{
				syllElmInList = new HashMap<String, Object>();
				syllElmInList.put("name", rubricLabel);
			}
			elements.add(getSyllabusElementMetaProperties(syllElm, syllElmList));
			syllElmInList.put("elements", elements);
			syllElmList.add(syllElmInList);

			return syllElmList;
		}

		private Map<String, Object> getSyllabusElementMetaProperties(
				SyllabusElement syllElm,ArrayList<Map<String, Object>> orderedSyllElmByRubric) {
			Map<String, Object> orderedSyllElm = new HashMap<String, Object>();
			
			Set<SyllabusElement> elements;

			orderedSyllElm.put("id", syllElm.getSyllabusElement_id());
			orderedSyllElm.put("type", syllElm.getType());
			orderedSyllElm.put("shareable", syllElm.getShareable());
			// TODO: plug this part to the sakai permissions
			orderedSyllElm.put("public", syllElm.getPublicElement());
			orderedSyllElm.put("important", syllElm.getImportant());
			orderedSyllElm.put("displayPage", syllElm.getDisplayPage());
			orderedSyllElm.put("title", syllElm.getPageTitle());
			orderedSyllElm.put("displayOrder", syllElm.getDisplayOrder());
			orderedSyllElm.put("attributes", syllElm.getAttributes());
			orderedSyllElm.put("sections", syllElm.getElementSections());

			if (syllElm.getElements() != null && !syllElm.getElements().isEmpty()) {
				elements = syllElm.getElements();
				for (SyllabusElement elm : elements) {
					if (elm.getRubric() == null) {
						orderedSyllElm.put("elements", getSyllabusElementMetaProperties(elm, new ArrayList<Map<String, Object>>()));
					}
					else{
						orderedSyllElmByRubric = getSyllabusElementByRubric(elm,
								orderedSyllElmByRubric);
						orderedSyllElm.put("rubrics", orderedSyllElmByRubric);
					}
				}
			}
			System.out.println("element " + syllElm.getSyllabusElement_id() + "    " + orderedSyllElm);
			return orderedSyllElm;
		}

	
	

	@Override
	public Syllabus getCommonSyllabus(String courseId, String[]  sectionIds) {
Syllabus syllabus;

		try {
			syllabus = syllabusDao.getCommonSyllabus(courseId, sectionIds);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}

	}

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		return templateDao.getTemplate(templateId);
	}
	
	class SyllabusElementComparator implements Comparator {

		public int compare(Object o1, Object o2) {
			Map<String, Object> syllElm1 = (Map<String, Object>) o1;
			Map<String, Object> syllElm2 = (Map<String, Object>) o2;
			Long displayOrder1 = (Long) syllElm1.get("displayOrder");
			Long displayOrder2 = (Long) syllElm2.get("displayOrder");
			if (displayOrder1 == null || displayOrder2 == null)
				return 0;
			if (displayOrder1 < displayOrder2)
				return -1;
			return 0;
		}

	}

}
