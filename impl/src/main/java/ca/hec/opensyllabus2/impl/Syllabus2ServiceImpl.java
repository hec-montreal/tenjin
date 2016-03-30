package ca.hec.opensyllabus2.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import lombok.Setter;

import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.UserDirectoryService;

import ca.hec.opensyllabus2.api.SakaiProxy;
import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.TemplateService;
import ca.hec.opensyllabus2.api.TenjinFunctions;
import ca.hec.opensyllabus2.api.OsylException.DeniedAccessException;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.dao.Syllabus2Dao;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElementMapping;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;

/**
 * Implementation of {@link Syllabus2Service}
 *
 *
 */
@Setter 
public class Syllabus2ServiceImpl implements Syllabus2Service {

	private static final Logger log = Logger.getLogger(Syllabus2ServiceImpl.class);

	private SakaiProxy sakaiProxy;	
	private Syllabus2Dao syllabusDao;
	private TemplateService templateService;

	@Override
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException {
		Syllabus syllabus = null;

		try {
			syllabus = syllabusDao.getSyllabus(syllabusId, true, true);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus " + syllabusId + " could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}
	}

    @Override
	public List<Syllabus> getSyllabusList(String siteId, List<String> sections,  boolean commonRead, boolean commonWrite, String currentUserId) throws NoSiteException {
		List<Syllabus> syllabusList = null;

		syllabusList = syllabusDao.getSyllabusList(siteId, sections, commonRead, commonWrite, currentUserId);

		// if no syllabus, create common and add it to the list
		if (syllabusList.isEmpty()) {
			syllabusList.add(createCommonSyllabus(siteId));
		}
		return syllabusList;
	}
    
    @Override
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSiteException, NoSyllabusException, DeniedAccessException {
		Date now = new Date();
		
		// add permission check
		
		//check that site exists

		// create syllabus if it doesn't exist, otherwise get it's element mappings from the database.
		Map<Long, SyllabusElementMapping> existingSyllabusElementMappings = null;
		if (syllabus.getId() == null) {
			syllabus.setCreatedDate(now);
			syllabus.setCreatedBy(sakaiProxy.getCurrentUserId());
			syllabus.setLastModifiedDate(now);
			syllabus.setLastModifiedBy(sakaiProxy.getCurrentUserId());
			syllabusDao.save(syllabus);
			
			// if this call is to create a non-common syllabus, copy the common's mappings and return the syllabus
			// if it is to create the common syllabus, continue on to create the required elements
			if (!syllabus.getCommon()) {
				Syllabus common = syllabusDao.getCommonSyllabus(syllabus.getSiteId());
				existingSyllabusElementMappings = getExistingSyllabusElementMappings(common.getId());
			
				for (SyllabusElementMapping mapping : existingSyllabusElementMappings.values()) {
					createSyllabusElementMapping( syllabus.getId(), mapping.getSyllabusElement(), mapping.getDisplayOrder(), false );
				}
			
				// return new created syllabus
				return syllabus;
			}
		} else {
			Syllabus existingSyllabus = syllabusDao.getSyllabus(syllabus.getId(), false, false);
			if (existingSyllabus != syllabus) {
				//update persistent object,  save handled by hibernate at end of transaction
				existingSyllabus.copy(syllabus);
			}
			
			existingSyllabusElementMappings = getExistingSyllabusElementMappings(syllabus.getId());
		}

		// add top-level elements to the search queue (breadth-first traversal)
		if (syllabus.getElements() != null) {
			
		
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
					
					// treat rubrics differently
					
					createSyllabusElement(element);
					createSyllabusElementMapping(syllabus.getId(), element, element.getDisplayOrder(), element.getHidden());
	
					// add mappings to all syllabi if this is a common syllabus
					if (syllabus.getCommon()) {
						List<Syllabus> syllabi = this.getSyllabusList(syllabus.getSiteId(), null, true, true, "");
						for (Syllabus s : syllabi) {
							if (!s.getCommon()) {
								createSyllabusElementMapping(s.getId(), element, element.getDisplayOrder(), element.getHidden());							
							}
						}
					}
					
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
					// cannot delete common element from another syllabus
					if (!syllabus.getCommon() && mapping.getSyllabusElement().getCommon()) {
						throw new DeniedAccessException("Cannot delete common element from a regular syllabus");
					}
					
					 
					if (mapping.getSyllabusElement().getCommon() && 
							mapping.getSyllabusElement().isComposite() &&
							syllabusDao.elementHasNonCommonChildren(mapping.getSyllabusElement())) {
						// if the element has children in any other syllabus, simply remove the mapping
						// keep the element and mark it non-common
						mapping.getSyllabusElement().setCommon(false);
						// delete each mapping for this element when there is no child
						for (SyllabusElementMapping mappingWithoutChild : syllabusDao.getMappingsWithoutChildren(mapping.getSyllabusElement())) {
							syllabusDao.delete(mappingWithoutChild);	
						}
						
					} else {
						// delete the element and all it's mappings
						syllabusDao.deleteElementAndMappings(mapping.getSyllabusElement());
					}
				}


			}
			
		}

		return syllabus;
	}

	private Syllabus createCommonSyllabus(String siteId) {
		Syllabus newCommonSyllabus = templateService.getEmptySyllabusFromTemplate(1L, "fr_CA");
		Site site = null;
		
		try {
			site = sakaiProxy.getSite(siteId);
		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return null;
		}
		
		if (newCommonSyllabus != null) {
			newCommonSyllabus.setTemplateId(1L); 
			newCommonSyllabus.setSiteId(siteId);
			newCommonSyllabus.setCommon(true);
			newCommonSyllabus.setCreatedBy(sakaiProxy.getCurrentUserId());
			newCommonSyllabus.setCreatedDate(new Date());
			newCommonSyllabus.setLastModifiedBy(sakaiProxy.getCurrentUserId());
			newCommonSyllabus.setLastModifiedDate(new Date());
			newCommonSyllabus.setCourseTitle(site.getTitle());

			String locale = site.getProperties().getProperty("locale_string");
			if (locale != null) {
				newCommonSyllabus.setLocale(locale);
			} else {
				// TODO use a different default?
				newCommonSyllabus.setLocale("fr_CA");
			}
			newCommonSyllabus.setTitle("Commun"); // i18n

			newCommonSyllabus.setSections(new HashSet<String>());
			for (Group g : site.getGroups()) {
				if (!g.getProviderGroupId().isEmpty()) {
					newCommonSyllabus.getSections().add(g.getId());
				}
			}
			
			try {
				createOrUpdateSyllabus(newCommonSyllabus);
			} catch (Exception e) {
				// should not be possible, only happens when we try to update a syllabus that doesn't exist
				log.error("Error saving new common syllabus for site: " + siteId);
				e.printStackTrace();
			}
		}
		
		return newCommonSyllabus;
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
			existingElement.setLastModifiedBy(sakaiProxy.getCurrentUserId());
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
		element.setCreatedBy(sakaiProxy.getCurrentUserId());
		element.setCreatedDate(now);
		element.setLastModifiedBy(sakaiProxy.getCurrentUserId());
		element.setLastModifiedDate(now);
		element.setHidden(false);
		syllabusDao.save(element);
	}

	private SyllabusElementMapping createSyllabusElementMapping(Long syllabusId, AbstractSyllabusElement syllabusElement, Integer displayOrder, Boolean hidden) {
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
