package ca.hec.opensyllabus2.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import lombok.Setter;

import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.Placement;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.UserDirectoryService;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.dao.Syllabus2Dao;
import ca.hec.opensyllabus2.api.dao.TemplateDao;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.opensyllabus2.api.model.template.Template;
import ca.hec.opensyllabus2.api.model.template.TemplateStructure;

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

    @Setter
	private ContentHostingService chs;


    public Syllabus getShareableSyllabus(String siteId) throws NoSyllabusException {
		// TODO check if the user is allowed to get the syllabus before

		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getShareableSyllabus(siteId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException(siteId);
		}


	}

	@Override
	public List<Syllabus> getSyllabusList(String siteId) throws NoSyllabusException, NoSiteException {
		List<Syllabus> syllabusList = new ArrayList<Syllabus>();

	    // get contextual site Id
		String contextSiteId = "";
		try {
			contextSiteId = getCurrentSiteContext();
		} catch (IdUnusedException e) {
		    e.printStackTrace();
		    throw new NoSiteException();
		}
		
		// compare context site id with the param site id
		if (siteId == contextSiteId) {
			try {
//				syllabusList = syllabusDao.getSyllabusList(siteId);
				return syllabusList;
			} catch (Exception e) {
				log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
				throw new NoSyllabusException();
			}
		} else {
			// error
//			throw new SiteException();
		}
		
		return syllabusList;
	}
    
	@Override
	public Syllabus getSyllabus(String courseId) throws NoSyllabusException {
		Syllabus syllabus = null;

		try {
			// TODO : change DAO
//			syllabus = syllabusDao.getSyllabus(courseId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}

	}

	@Override
	public Syllabus getCommonSyllabus(String courseId, String[]  sectionIds) throws NoSyllabusException {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getCommonSyllabus(courseId, sectionIds);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}

	}

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		return templateDao.getTemplate(templateId);
	}

	@Override
	public HashMap<String, HashMap<String, Object>> getTemplateRules(Long templateId) throws IdUnusedException {
		//HashMap<String, List<Object>> results = new HashMap<String, List<Object>>();
		HashMap<String, HashMap<String, Object>> results = new HashMap<String, HashMap<String, Object>>();
		
		Template t = templateDao.getTemplate(templateId);

		for (TemplateStructure elem : t.getElements()) {
			getRules(elem, results);
		}

		return results;
	}


	/*
	 * il faudra au moins mettre les valeurs en cache?
	 * ZCII-2008
	 */
	private void getRules(TemplateStructure structure, HashMap<String, HashMap<String, Object>> map) {

		if (structure!= null) {
			HashMap<String, Object> elementObject;
			elementObject = new HashMap<String, Object>();
			elementObject.put("displayInMenu", structure.getDisplayInMenu());
			elementObject.put("mandatory", structure.getMandatory());		
			// add template structure to the main map
			map.put(structure.getId().toString(), elementObject);		
			
			// if the element has a parent and is not mandatory, then add this one to the parent elements list
			List<Object> elementList;
			if (structure.getParentId() != null && (structure.getMandatory() == null || structure.getMandatory() == false )) {
				String parentId = structure.getParentId().toString();
				HashMap<String, Object> parentObject = map.get(parentId);
		
				List<Object> elementParentList = (List<Object>) parentObject.get("elements");
				if (elementParentList == null) {
					elementParentList = new ArrayList<Object>();
					parentObject.put("elements", elementParentList);
				}
	
				Map<String, Object> templateElementMap = new HashMap<String, Object>();
				templateElementMap.put("id", structure.getId());
				templateElementMap.put("type", structure.getTemplateElement().getType().getTitle());
				templateElementMap.put("label", structure.getTemplateElement().getLabels().get("fr_CA"));
				// add child template element to the list of the parent element
				elementParentList.add(templateElementMap);
			}	
		}

		for (TemplateStructure elem : structure.getElements()) {
			getRules(elem, map);
		}

		return;
	}

	
	@Override
	public Object loadSyllabus() throws NoSyllabusException, NoSiteException {
		String siteId = "";
		try {
		    siteId = getCurrentSiteContext();
		} catch (IdUnusedException e) {
		    e.printStackTrace();
		    throw new NoSiteException();
		}

		//TODO: retreive user allowed access
		Syllabus syllabus = getShareableSyllabus(siteId);

		return syllabus;

	}
	

	private String getCurrentSiteContext () throws IdUnusedException, NoSiteException{
		String siteRef = null;
		Placement placement = toolManager.getCurrentPlacement();
		String context = null;

		if (placement == null)
		    throw new NoSiteException();
		else
		    context = placement.getContext();

		siteRef = siteService.getSite(context).getId();

		return siteRef;
	}

	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSiteException {
		Date now = new Date();

		if (syllabus.getSiteId() == null) {
			throw new NoSiteException();
		}

		// create syllabus if it doesn't exist, otherwise get it's elements from the database.
		Map<Long, AbstractSyllabusElement> existingSyllabusElements = null;

		if (syllabus.getId() == null) {
			syllabus.setCreatedDate(now);
			syllabus.setCreatedBy(getCurrentUserDisplayName());
			syllabus.setLastModifiedDate(now);
			syllabus.setLastModifiedBy(getCurrentUserDisplayName());
			syllabusDao.createOrUpdateSyllabus(syllabus);
		} else {
			existingSyllabusElements = getExistingSyllabusElementMap(syllabus.getId());
		}

		// add top-level elements to the search queue (breadth-first traversal)
		Queue<AbstractSyllabusElement> searchQueue = new LinkedList<AbstractSyllabusElement>();
		for (AbstractSyllabusElement element : syllabus.getElements()) {
			element.setSyllabusId(syllabus.getId());
			searchQueue.add(element);
		}

		while (!searchQueue.isEmpty()) {
			AbstractSyllabusElement element = searchQueue.remove();

			// if the element has no id or if the id is negative, the element should be saved
			if ( element.getId() != null && element.getId() < 0) {
				element.setId(null);
			}
			if (element.getId() == null) {
				// create this element
				element.setCreatedBy(getCurrentUserDisplayName());
				element.setCreatedDate(now);
				element.setLastModifiedBy(getCurrentUserDisplayName());
				element.setLastModifiedDate(now);
				syllabusDao.saveOrUpdateSyllabusElement(element);

			} else if (existingSyllabusElements != null && !existingSyllabusElements.isEmpty()) {

				//compare element from the new syllabus to what is in the database
				AbstractSyllabusElement existingElement = existingSyllabusElements.get(element.getId());
				
				if (!element.equals(existingElement)) {

					//update persistent object,  save handled by hibernate at end of transaction
					existingElement.copy(element);
					existingElement.setLastModifiedBy(getCurrentUserDisplayName());
					existingElement.setLastModifiedDate(now);
				}

				// Remove this element from the map.
				// Remaining elements at the end will be deleted
				existingSyllabusElements.remove(element.getId());
			}

			// add this element's children to the search queue
			if (element instanceof SyllabusCompositeElement) {
				SyllabusCompositeElement compositeElement = (SyllabusCompositeElement)element;
				if (compositeElement.getElements() != null) {
					int i = 0;
					for (AbstractSyllabusElement child : compositeElement.getElements()) {
							child.setDisplayOrder(i++);
							child.setParentId(compositeElement.getId());
							child.setSyllabusId(syllabus.getId());
							searchQueue.add(child);
					}
				}
			}

			log.debug("handled node : " + element.getId() + " parent : " + element.getParentId() + " order : " + element.getDisplayOrder());
		}

		// delete the syllabus elements that are missing from the new syllabus
		if (existingSyllabusElements != null && !existingSyllabusElements.isEmpty()) {
			for (AbstractSyllabusElement element : existingSyllabusElements.values()) {
				syllabusDao.deleteSyllabusElement(element);
			}
		}

		return syllabus;
	}

	private Map<Long, AbstractSyllabusElement> getExistingSyllabusElementMap(
			Long id) {

		Map<Long, AbstractSyllabusElement> map = new HashMap<Long, AbstractSyllabusElement>();
		for (AbstractSyllabusElement element : syllabusDao.getSyllabusElements(id)) {
			map.put(element.getId(), element);
		}

		return map;
	}

}
