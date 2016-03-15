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
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElementMapping;
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

    @Override
	public List<Syllabus> getSyllabusList(String siteId) {
		List<Syllabus> syllabusList = null;
		
		if (siteId == null) {
			try {
				siteId = getCurrentSiteContext();
			} catch (Exception e) {
				log.error("error retrieving current site context");
			}
		}

		syllabusList = syllabusDao.getSyllabusList(siteId);
		return syllabusList;
	}
    
	//TODO delete this?
	@Override
	public Syllabus getShareableSyllabus(String siteId) throws NoSyllabusException {
		Syllabus syllabus = null;

		try {
			syllabus = syllabusDao.getSyllabus(siteId, "", true, true);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}
		
	}

	
	@Override
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException {
		Syllabus syllabus = null;

		try {
			syllabus = syllabusDao.getSyllabus(syllabusId, true, true);
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
			if (structure.getParentId() != null) {
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
	public String getCurrentSiteContext () throws IdUnusedException, NoSiteException{
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

	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSyllabusException {
		Date now = new Date();
		
		// add permission check

		// create syllabus if it doesn't exist, otherwise get it's element mappings from the database.
		Map<Long, SyllabusElementMapping> existingSyllabusElementMappings = null;
		if (syllabus.getId() == null) {
			syllabus.setCreatedDate(now);
			syllabus.setCreatedBy(getCurrentUserDisplayName());
			syllabus.setLastModifiedDate(now);
			syllabus.setLastModifiedBy(getCurrentUserDisplayName());
			syllabusDao.save(syllabus);
		} else {
			Syllabus existingSyllabus = syllabusDao.getSyllabus(syllabus.getId(), false, false);
			if (existingSyllabus != syllabus) {
				//update persistent object,  save handled by hibernate at end of transaction
				existingSyllabus.copy(syllabus);
			}
			
			existingSyllabusElementMappings = getExistingSyllabusElementMappings(syllabus.getId());
		}

		// add top-level elements to the search queue (breadth-first traversal)
		Queue<AbstractSyllabusElement> searchQueue = new LinkedList<AbstractSyllabusElement>();
		int order = 0;
		for (AbstractSyllabusElement element : syllabus.getElements()) {
			// correct site id and display order
			element.setSiteId(syllabus.getSiteId());
			element.setDisplayOrder(order++);
			searchQueue.add(element);
		}

		while (!searchQueue.isEmpty()) {
			AbstractSyllabusElement element = searchQueue.remove();

			// if the element has no id or if the id is negative, the element should be created
			if (element.getId() == null || element.getId() < 0) {
				
				createSyllabusElement(element);
				createSyllabusElementMapping(syllabus.getId(), element, element.getDisplayOrder(), element.getHidden());
				// TODO if this is shareable, create a mapping entry for each syllabus
				
			} else if (existingSyllabusElementMappings != null &&
					existingSyllabusElementMappings.containsKey(element.getId())) {

				compareAndUpdateSyllabusElementMapping(
						existingSyllabusElementMappings.get(element.getId()), element);

				// Remove this element from the map.
				// Remaining elements at the end will be deleted
				existingSyllabusElementMappings.remove(element.getId());
			}

			// add this element's children to the search queue
			if (element instanceof SyllabusCompositeElement) {
				SyllabusCompositeElement compositeElement = (SyllabusCompositeElement)element;
				if (compositeElement.getElements() != null) {
					order = 0;
					for (AbstractSyllabusElement child : compositeElement.getElements()) {
						// correct parent id, site id and display order
						child.setParentId(compositeElement.getId());
						child.setSiteId(syllabus.getSiteId());
						child.setDisplayOrder(order++);
						searchQueue.add(child);
					}
				}
			}

			log.debug("handled node : " + element.getId() + " parent : " + element.getParentId());
		}

		// delete the syllabus element mappings that are missing from the new syllabus
		if (existingSyllabusElementMappings != null && !existingSyllabusElementMappings.isEmpty()) {
			for (SyllabusElementMapping mapping : existingSyllabusElementMappings.values()) {
				syllabusDao.delete(mapping);
				// TODO if there are no more mappings, delete the element?
			}
		}

		return syllabus;
	}

	/**
	 * Update a Persistent syllabus element mapping (including the syllabus element) 
	 */
	private void compareAndUpdateSyllabusElementMapping(SyllabusElementMapping existingElementMapping,
			AbstractSyllabusElement newElement) {

		//compare element from the new syllabus to what is in the database
		AbstractSyllabusElement existingElement = existingElementMapping.getSyllabusElement();
		if (!newElement.equals(existingElement)) {

			//update persistent object,  save handled by hibernate at end of transaction
			existingElement.copy(newElement);
			existingElement.setLastModifiedBy(getCurrentUserDisplayName());
			existingElement.setLastModifiedDate(new Date());
		}

		// update display order and hidden
		if (existingElementMapping.getDisplayOrder() != newElement.getDisplayOrder()) {
			existingElementMapping.setDisplayOrder(newElement.getDisplayOrder());
		}
		if (existingElementMapping.getHidden() != newElement.getHidden()) {
			existingElementMapping.setHidden(newElement.getHidden());
		}
	}

	private void createSyllabusElement(AbstractSyllabusElement element) {
		Date now = new Date();
		// create this element
		element.setCreatedBy(getCurrentUserDisplayName());
		element.setCreatedDate(now);
		element.setLastModifiedBy(getCurrentUserDisplayName());
		element.setLastModifiedDate(now);
		element.setHidden(false);
		syllabusDao.save(element);
	}

	@Override
	public SyllabusElementMapping createSyllabusElementMapping(Long syllabusId, AbstractSyllabusElement syllabusElement, Integer displayOrder, Boolean hidden) {
		SyllabusElementMapping mapping = new SyllabusElementMapping();
		mapping.setSyllabusId(syllabusId);
		mapping.setSyllabusElement(syllabusElement);
		mapping.setDisplayOrder(displayOrder);
		mapping.setHidden(hidden);
		
		syllabusDao.save(mapping);
		return mapping;
		
	}
	
	private Map<Long, SyllabusElementMapping> getExistingSyllabusElementMappings(
			Long id) {

		Map<Long, SyllabusElementMapping> map = new HashMap<Long, SyllabusElementMapping>();
		for (SyllabusElementMapping mapping : syllabusDao.getSyllabusElementMappings(id, true)) {
			map.put(mapping.getSyllabusElement().getId(), mapping);
		}

		return map;
	}

}
