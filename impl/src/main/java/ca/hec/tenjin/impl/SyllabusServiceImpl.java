package ca.hec.tenjin.impl;

import ca.hec.tenjin.api.*;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.*;
import ca.hec.tenjin.api.model.syllabus.*;
import ca.hec.tenjin.api.provider.CourseOutlineProvider;
import lombok.Setter;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.LocaleUtils;
import org.apache.log4j.Logger;
import org.sakaiproject.citation.api.Citation;
import org.sakaiproject.citation.api.CitationCollection;
import org.sakaiproject.citation.api.CitationService;
import org.sakaiproject.content.api.*;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.entity.api.ResourceProperties;
import org.sakaiproject.entity.api.ResourcePropertiesEdit;
import org.sakaiproject.event.api.NotificationService;
import org.sakaiproject.exception.*;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.cover.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ContextResource;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Implementation of {@link SyllabusService}
 *
 *
 */
@Setter
// @Component
public class SyllabusServiceImpl implements SyllabusService {

	private static final Logger log = Logger.getLogger(SyllabusServiceImpl.class);

	private SakaiProxy sakaiProxy;
	private SyllabusDao syllabusDao;
	private TemplateService templateService;
	private TenjinSecurityService securityService;
	private SyllabusLockService syllabusLockService;

	private ContentHostingService contentHostingService;
	private CitationService citationService;

	@Autowired(required = false)
	private CourseOutlineProvider importProvider;
	
	@Override
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException, StructureSyllabusException {
		Syllabus syllabus = null;

		syllabus = syllabusDao.getStructuredSyllabus(syllabusId);

		// throw denied access if no write or read unpublished permission on syllabus
		if (!securityService.canWrite(sakaiProxy.getCurrentUserId(), syllabus) &&
				!securityService.canReadUnpublished(sakaiProxy.getCurrentUserId(), syllabus))
			throw new DeniedAccessException();

		return syllabus;
	}

	@Override
	public Syllabus getCommonSyllabus(String siteId) throws NoSyllabusException {
		return syllabusDao.getCommonSyllabus(siteId);
	}

	@Override
	public List<Syllabus> getSyllabusList(String siteId) throws NoSiteException, DeniedAccessException {

		List<Syllabus> syllabusList = syllabusDao.getSyllabusList(siteId);

		return syllabusList;
	}

	@Override
	public List<Syllabus> getSyllabusListForUser(String siteId, String userId) throws NoSiteException, DeniedAccessException {
		List<Syllabus> syllabusList = null;
		List<Syllabus> finalSyllabusList = new ArrayList<Syllabus>();
		syllabusList = syllabusDao.getSyllabusList(siteId);
		Site site = null;

		if (syllabusList.isEmpty()) {
			try {

				site = sakaiProxy.getSite(siteId);

				if (securityService.checkOnSiteGroup(userId, TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON, site)) {
					Syllabus common = createCommonSyllabus(siteId);
					// missing default template could cause null, 
					// error already printed
					if (common != null) {
						createOrUpdateSyllabus(common);
						syllabusList.add(common);
					}
				}
			} catch (IdUnusedException e) {
				throw new NoSiteException();
			} catch (Exception e) {
				log.error("Error saving new common syllabus for site: " + siteId);
				e.printStackTrace();
			}
		}

		// remove syllabi the user does not have access to
		for (Syllabus syllabus : syllabusList) {
			// if user has read or write it should be in the list
			if (securityService.canRead(userId, syllabus) ||
					securityService.canReadUnpublished(userId, syllabus) ||
					securityService.canWrite(userId, syllabus)) {

				finalSyllabusList.add(syllabus);
			}
		}

		return finalSyllabusList;
	}

	@Override
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden) {
		return syllabusDao.getSyllabusElementMappings(syllabusId, hidden);
	}

	@Override
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSiteException, NoSyllabusException, DeniedAccessException, StructureSyllabusException, SyllabusLockedException {
		Date now = new Date();
		Syllabus existingSyllabus = null;

		Site site = null;

		Map<Long, SyllabusElementMapping> existingSyllabusElementMappings = null;

		try {
			site = sakaiProxy.getSite(syllabus.getSiteId());
		} catch (IdUnusedException e) {
			throw new NoSiteException();
		}

		// check permissions: is allowed to modify syllabus
		if (!securityService.canWrite(sakaiProxy.getCurrentUserId(), syllabus)) {
			throw new DeniedAccessException();
		}

		// Check lock
		if (syllabus.getId() != null) {
			if (!syllabusLockService.checkIfUserHasLock(syllabus, sakaiProxy.getCurrentUserId())) {
				throw new SyllabusLockedException(syllabusLockService.getSyllabusLock(syllabus.getId()));
			}
		}

		List<Syllabus> syllabi = syllabusDao.getSyllabusList(syllabus.getSiteId());

		// create syllabus if it doesn't exist, otherwise get it's element
		// mappings from the database.
		if (syllabus.getId() == null) {
			syllabus.setCreatedDate(now);
			syllabus.setCourseTitle(site.getTitle());
			syllabus.setCreatedBy(sakaiProxy.getCurrentUserId());
			syllabus.setCreatedByName(sakaiProxy.getCurrentUserName());
			syllabus.setLastModifiedDate(now);
			syllabus.setLastModifiedBy(sakaiProxy.getCurrentUserId());
			syllabus.setDeleted(false);

			syllabusDao.save(syllabus);
			sakaiProxy.postEvent(TenjinEvents.TENJIN_CREATE_EVENT, sakaiProxy.getSyllabusReference(syllabus.getId(), null), false);


			// if this call is to create a non-common syllabus, copy the
			// common's mappings and return the syllabus
			// if it is to create the common syllabus, continue on to create the
			// required elements
			if (!syllabus.getCommon()) {
				Syllabus common = syllabusDao.getCommonSyllabus(syllabus.getSiteId());
				existingSyllabusElementMappings = getExistingSyllabusElementMappings(common.getId());

				for (SyllabusElementMapping mapping : existingSyllabusElementMappings.values()) {
					createSyllabusElementMapping(syllabus.getId(), mapping.getSyllabusElement(), mapping.getDisplayOrder(), false);
				}

				reassignSections(syllabi, null, syllabus.getSections());

				// return new created syllabus
				return syllabus;
			}
		} else {
			existingSyllabus = syllabusDao.getSyllabus(syllabus.getId());

			if (!existingSyllabus.getSections().equals(syllabus.getSections())) {
				if (!checkSectionAssignPermissions(existingSyllabus.getSiteId(), existingSyllabus.getSections(), syllabus.getSections())) {
					throw new DeniedAccessException("User not allowed to assign the sections");
				}

				reassignSections(syllabi, existingSyllabus.getSections(), syllabus.getSections());
				sakaiProxy.postEvent(TenjinEvents.TENJIN_SECTION_EDIT_EVENT, sakaiProxy.getSyllabusReference(syllabus.getId(), null), true);
			}

			if (!existingSyllabus.getTitle().equals(syllabus.getTitle())) {
				sakaiProxy.postEvent(TenjinEvents.TENJIN_TITLE_EDIT_EVENT, sakaiProxy.getSyllabusReference(syllabus.getId(), null), true);
			}

			// update persistent object, save handled by hibernate at end of
			// transaction
			updatePersistentSyllabusObject(existingSyllabus, syllabus);

			existingSyllabusElementMappings = getExistingSyllabusElementMappings(syllabus.getId());
		}

		// only update this syllabus's elements if a list was specified
		if (syllabus.getElements() != null) {
			// add top-level elements to the search queue (breadth-first
			// traversal)
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

				List<Long> syllabusesWithExistingRubricMapping = null;

				// if the element has no id or if the id is negative, the
				// element should be created
				if (element.getId() == null || element.getId() < 0) {

					createSyllabusElement(element);
					createSyllabusElementMapping(syllabus.getId(), element, element.getDisplayOrder(), false);

					// add mappings to all syllabi if this is a common syllabus
					if (syllabus.getCommon()) {
						for (Syllabus s : syllabi) {
							if (!s.getCommon() && (syllabusesWithExistingRubricMapping == null || !syllabusesWithExistingRubricMapping.contains(s.getId()))) {

								// increment order of existing mappings to insert new mapping
								List<SyllabusElementMapping> siblingMappings = syllabusDao.getSyllabusElementMappingsForParent(s.getId(), element.getParentId());
								for (SyllabusElementMapping m : siblingMappings) {
									if (m.getDisplayOrder() >= element.getDisplayOrder()) {
										m.setDisplayOrder(m.getDisplayOrder()+1);
									}
								}

								createSyllabusElementMapping(s.getId(), element, element.getDisplayOrder(), false);
							}
						}
					}

				} else if (existingSyllabusElementMappings != null && existingSyllabusElementMappings.containsKey(element.getId())) {

					compareAndUpdateSyllabusElementMapping(existingSyllabusElementMappings.get(element.getId()), element, syllabus.getCommon());

					// Remove this element from the map.
					// Remaining elements at the end will be deleted
					existingSyllabusElementMappings.remove(element.getId());
				}

				// add this element's children to the search queue
				if (element.isComposite()) {
					SyllabusCompositeElement compositeElement = (SyllabusCompositeElement) element;
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

			// delete the syllabus element mappings that are missing from the
			// new syllabus
			if (existingSyllabusElementMappings != null && !existingSyllabusElementMappings.isEmpty()) {
				for (SyllabusElementMapping mapping : existingSyllabusElementMappings.values()) {
					// cannot delete common element from another syllabus
					if ((!syllabus.getCommon() && mapping.getSyllabusElement().getCommon()) || mapping.getSyllabusElement().getProviderId() != null) {
						// Cannot delete common element from a regular syllabus, or provided elements
						continue;
					}

					if (mapping.getSyllabusElement().getCommon() && mapping.getSyllabusElement().isComposite() && syllabusDao.elementHasNonCommonChildren(mapping.getSyllabusElement())) {

						AbstractSyllabusElement elem = mapping.getSyllabusElement();
						List<AbstractSyllabusElement> children = syllabusDao.getChildrenForSyllabusElement((SyllabusCompositeElement)elem);
						List<SyllabusElementMapping> mappings = syllabusDao.getMappingsForElement(mapping.getSyllabusElement());

						for (SyllabusElementMapping m: mappings) {

							// if this element is mapped in another syllabus, duplicate it and update mapping/children
							if (m.getSyllabusId() != syllabus.getId()) {
								AbstractSyllabusElement newElem = copyElement(elem);
								newElem.setParentId(elem.getParentId());
								newElem.setCommon(false);
								syllabusDao.save(newElem);

								m.setSyllabusElement(newElem);
								//children list contains children from all syllabuses, so only update for this one
								for (AbstractSyllabusElement child : children) {
									if(syllabusDao.isElementMappedToSyllabus(child.getId(), m.getSyllabusId())) {
										child.setParentId(newElem.getId());
										syllabusDao.saveOrUpdate(child);
									}
								}
							}
						}
					}

					// delete the element and all it's mappings
					syllabusDao.deleteElementAndMappings(mapping.getSyllabusElement());
				}
			}
		}

		sakaiProxy.postEvent(TenjinEvents.TENJIN_EDIT_EVENT, sakaiProxy.getSyllabusReference(syllabus.getId(), null), true);
		return getSyllabus(syllabus.getId());
	}

	@Override
	@Transactional
	public void copySyllabus(Long syllabusId, String title) throws DeniedAccessException, IdUnusedException, NoSyllabusException, StructureSyllabusException {
		Syllabus syllabus = syllabusDao.getStructuredSyllabus(syllabusId);

		if (!securityService.canRead(sakaiProxy.getCurrentUserId(), syllabus)) {
			throw new DeniedAccessException();
		}

		Date now = new Date();
		Syllabus copy = new Syllabus();

		copy.setSiteId(syllabus.getSiteId());
		copy.setTitle(title);
		copy.setCommon(false);
		copy.setTemplateId(syllabus.getTemplateId());
		copy.setLocale(syllabus.getLocale());
		copy.setCreatedDate(now);
		copy.setCourseTitle(sakaiProxy.getSite(copy.getSiteId()).getTitle());
		copy.setCreatedBy(sakaiProxy.getCurrentUserId());
		copy.setCreatedByName(sakaiProxy.getCurrentUserName());
		copy.setLastModifiedDate(now);
		copy.setLastModifiedBy(sakaiProxy.getCurrentUserId());
		copy.setDeleted(false);
		copy.setPublishedDate(null);
		copy.setPublishedBy(null);

		// Create
		syllabusDao.save(copy);

		// Copy elements
		for (int i = 0; i < syllabus.getElements().size(); i++) {
			createElementCopyAndMappings(syllabus.getElements().get(i), null, i, copy, sakaiProxy.getCurrentUserId());
		}

		sakaiProxy.postEvent(TenjinEvents.TENJIN_DUPLICATE_EVENT,
				sakaiProxy.getSyllabusReference(syllabus.getId(), null)+","+sakaiProxy.getSyllabusReference(copy.getId(), null), true);
	}

	@Override
	public Syllabus transferCopySyllabus(String fromSiteId, String toSiteId, Long syllabusId, String title, boolean common, Long templateId,
										 String locale, String courseTitle, String createdBy,
										 String createdByName, Map<Long, AbstractSyllabusElement> commonCopyMapping, Map<String, String> copiedCitationsMap) throws DeniedAccessException, IdUnusedException, NoSyllabusException, StructureSyllabusException{
		Syllabus syllabus = syllabusDao.getStructuredSyllabus(syllabusId);

		if (!securityService.canRead(sakaiProxy.getCurrentUserId(), syllabus)) {
			throw new DeniedAccessException();
		}

		Date now = new Date();
		Syllabus copy = new Syllabus();

		copy.setSiteId(toSiteId);
		copy.setTitle(title);
		copy.setCommon(common);
		copy.setTemplateId(templateId);
		copy.setLocale(locale);
		copy.setCreatedDate(now);
		copy.setCourseTitle(courseTitle);
		copy.setCreatedBy(createdBy);
		copy.setCreatedByName(createdByName);
		copy.setLastModifiedDate(now);
		copy.setLastModifiedBy(createdBy);
		copy.setDeleted(false);
		copy.setPublishedDate(null);
		copy.setPublishedBy(null);

		// Create
		syllabusDao.save(copy);

		//Copy mappings if syllabus is not common
		if (!copy.getCommon()){
			Syllabus thecommon = getCommonSyllabus(toSiteId);
			List<SyllabusElementMapping> mappings = getSyllabusElementMappings(thecommon.getId(),true);
			for (SyllabusElementMapping mapping: mappings){
				createSyllabusElementMapping(copy.getId(), mapping.getSyllabusElement(),mapping.getDisplayOrder(),mapping.getHidden());
			}
		}

		// Copy elements
		for (int i = 0; i < syllabus.getElements().size(); i++) {
			transferCopyElement(syllabus.getElements().get(i), null, i, copy, createdBy, commonCopyMapping, copiedCitationsMap, fromSiteId, toSiteId);
		}

		return copy;
	}

	@Override	public void deleteSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException {
		Syllabus syllabus = syllabusDao.getSyllabus(syllabusId);
		
		if (syllabus == null) {
			throw new NoSyllabusException(syllabusId);
		}

		boolean canDelete = sakaiProxy.getCurrentUserId().equals(syllabus.getCreatedBy()) ||
							securityService.canWrite(sakaiProxy.getCurrentUserId(), syllabus);
		
		if(!canDelete) {
			throw new DeniedAccessException();
		}
		
		syllabusLockService.unlockSyllabus(syllabusId);
		
		syllabusDao.softDeleteSyllabus(syllabus);

		sakaiProxy.postEvent(TenjinEvents.TENJIN_DELETE_EVENT, sakaiProxy.getSyllabusReference(syllabus.getId(), null), true);
	}

	@Override
	@Transactional
	public Syllabus importSyllabusFromSite(String siteId) throws DeniedAccessException, SyllabusLockedException {

		if (importProvider == null)
			return null;

		String currentSiteId = sakaiProxy.getCurrentSiteId();

		try {
			Syllabus syllabus = importProvider.importSyllabusFromSite(siteId, currentSiteId);
			Set<String> sections = sakaiProxy.getGroupsForSite(currentSiteId);

			if (syllabus != null) {
				syllabus.setId(null);
				syllabus.setSiteId(currentSiteId);
				syllabus.setCourseTitle(currentSiteId);
				syllabus.setCommon(true);
				syllabus.setSections(sections);

				// Delete existing Syllabuses
				List<Syllabus> deleteSyllabusList = getSyllabusList(currentSiteId);
				for (Syllabus s : deleteSyllabusList) {
					syllabusDao.softDeleteSyllabus(s);
				}

				createOrUpdateSyllabus(syllabus);
			}
			return syllabus;
		} catch (NoSiteException nse) {
			// current site id does not exist
			nse.printStackTrace();
		} catch (NoSyllabusException nse) {
			// only occurs when updating a syllabus
			nse.printStackTrace();
		} catch (StructureSyllabusException sse) {
			// structuring syllabus elements in createOrUpdateSyllabus failed
			sse.printStackTrace();
		}

		return null;
	}

	private void updatePersistentSyllabusObject(Syllabus existingSyllabus, Syllabus syllabus) {
		existingSyllabus.setSiteId(syllabus.getSiteId());
		existingSyllabus.setCourseTitle(syllabus.getCourseTitle());
		existingSyllabus.setTitle(syllabus.getTitle());
		existingSyllabus.setTemplateId(syllabus.getTemplateId());
		existingSyllabus.setLocale(syllabus.getLocale());
		existingSyllabus.setCommon(syllabus.getCommon());
		existingSyllabus.setLastModifiedBy(sakaiProxy.getCurrentUserId());
		existingSyllabus.setLastModifiedDate(new Date());
		existingSyllabus.setSections(syllabus.getSections());
	}

	/**
	 * @param oldSections The existing list of sections
	 * @param newSections The new section list to assign
	 * @return whether or not the user is allowed to assign or unassign the
	 *         sections
	 */
	private boolean checkSectionAssignPermissions(String siteId, Set<String> oldSections, Set<String> newSections) {

		Collection<String> sectionsToCheck = null;

		if (oldSections == null && newSections == null) {
			return false;
		} else if (oldSections == null) {
			sectionsToCheck = newSections;
		} else if (newSections == null) {
			sectionsToCheck = oldSections;
		} else {
			// get sections that are in one list but not the other (the user is
			// trying to add or subtract them)
			sectionsToCheck = CollectionUtils.disjunction(oldSections, newSections);
		}
		return true;
	}

	public List<Long> getSyllabusesWithElementMapping(AbstractSyllabusElement element) {
		List<Long> syllabuses = new ArrayList<Long>();
		List<SyllabusElementMapping> l = syllabusDao.getMappingsForElement(element);
		for (SyllabusElementMapping mapping : l) {
			syllabuses.add(mapping.getSyllabusId());
		}

		return syllabuses;
	}

	private Syllabus createCommonSyllabus(String siteId) throws NoSiteException, DeniedAccessException {
		Site site = null;

		try {
			site = sakaiProxy.getSite(siteId);
		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return null;
		}

		String locale = getSyllabusLanguageForSite(site);

		String templateIdStr = site.getProperties().getProperty("tenjin_template");
		Long templateId;
		if (templateIdStr == null || templateIdStr.isEmpty()) {
			String defaultTemplateId = sakaiProxy.getSakaiProperty("tenjin.default.templateId");

			if (defaultTemplateId == null || defaultTemplateId.isEmpty()) {
				log.error("No default course outline template specified");
				return null;
			}

			templateId = new Long(defaultTemplateId);
		}
		else {
			templateId = new Long(templateIdStr);
		}

		Syllabus newCommonSyllabus = templateService.getEmptySyllabusFromTemplate(templateId, siteId, locale);

		if (newCommonSyllabus != null) {
			newCommonSyllabus.setTemplateId(templateId);
			newCommonSyllabus.setSiteId(siteId);
			newCommonSyllabus.setCommon(true);
			newCommonSyllabus.setCreatedBy("Admin");
			newCommonSyllabus.setCreatedDate(new Date());
			newCommonSyllabus.setLastModifiedBy("Admin");
			newCommonSyllabus.setLastModifiedDate(new Date());
			newCommonSyllabus.setCourseTitle(site.getTitle());

			ResourceBundle rb = ResourceBundle.getBundle("tenjin", LocaleUtils.toLocale(locale));
			newCommonSyllabus.setTitle(rb.getString("tenjin.common.title"));

			newCommonSyllabus.setSections(new HashSet<String>());
			for (Group g : site.getGroups()) {
				if (g.getProviderGroupId() != null && !g.getProviderGroupId().isEmpty()) {
					newCommonSyllabus.getSections().add(g.getId());
				}
			}
		}

		return newCommonSyllabus;
	}

	private String getSyllabusLanguageForSite(Site site) {
		String locale = null;
		if (null != site) {
			locale = site.getProperties().getProperty("locale_string");
			if (locale == null || locale.isEmpty()) {
				String localePropName = sakaiProxy.getSakaiProperty("tenjin.syllabusLocale.sitePropertyName");
				locale = site.getProperties().getProperty(localePropName);
			}
		}
		if (locale == null || locale.isEmpty()) {
			// use default server locale
			locale = Locale.getDefault().toString();
		}
		return locale;
	}

	/**
	 * Update a Persistent syllabus element mapping (including the syllabus
	 * element)
	 */
	private void compareAndUpdateSyllabusElementMapping(SyllabusElementMapping existingElementMapping, AbstractSyllabusElement newElement, Boolean isCommonSyllabus) {

		// compare element from the new syllabus to what is in the database
		AbstractSyllabusElement existingElement = existingElementMapping.getSyllabusElement();

		// update display order and hidden (before comparing the objects!)
		if (existingElementMapping.getDisplayOrder() != newElement.getDisplayOrder()) {
			existingElementMapping.setDisplayOrder(newElement.getDisplayOrder());
		}
		if (existingElementMapping.getHidden() != newElement.getHidden()) {
			existingElementMapping.setHidden(newElement.getHidden());
			existingElement.setEqualsPublished(false);
		}

		// hidden & display order come from the mapping, don't make the equals
		// fail for them
		existingElement.setHidden(existingElementMapping.getHidden());
		existingElement.setDisplayOrder(existingElementMapping.getDisplayOrder());

		// user may not update the publishedId
		newElement.setPublishedId(existingElement.getPublishedId());

		// don't modify provided elements
		if (existingElement.getProviderId() == null && !newElement.equals(existingElement)) {

			// update persistent object, save handled by hibernate at end of
			// transaction.  Do not update element if it's common and the syllabus is not 
			if (isCommonSyllabus || !existingElement.getCommon()) {
				existingElement.copyFrom(newElement);
				existingElement.setLastModifiedBy(sakaiProxy.getCurrentUserId());
				existingElement.setLastModifiedDate(new Date());
				existingElement.setEqualsPublished(false);
			}
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
		element.setEqualsPublished(false);
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

	private Map<Long, SyllabusElementMapping> getExistingSyllabusElementMappings(Long syllabusId) {

		Map<Long, SyllabusElementMapping> map = new HashMap<Long, SyllabusElementMapping>();
		for (SyllabusElementMapping mapping : syllabusDao.getSyllabusElementMappings(syllabusId, true)) {
			map.put(mapping.getSyllabusElement().getId(), mapping);
		}

		return map;
	}

	private void reassignSections(List<Syllabus> syllabuses, Set<String> oldSections, Set<String> newSections) {
		Collection<String> sectionsForCommon = null;
		Collection<String> sectionsToUnassign = null;

		if (oldSections == null && newSections == null) {
			log.error("both lists are null!");
			return; // TODO : exception
		}

		if (oldSections == null) {
			// new syllabus, unassign all sections from their previous
			// syllabuses
			sectionsToUnassign = newSections;
		} else if (newSections == null) {
			// delete syllabus, assign all sections to the common syllabus
			sectionsForCommon = oldSections;
		} else {
			// sections in oldSections but not newSections should be assigned to
			// the common
			sectionsForCommon = CollectionUtils.subtract(oldSections, newSections);
			// sections in newSections but not oldSections should be unassigned
			// wherever else they are assigned
			sectionsToUnassign = CollectionUtils.subtract(newSections, oldSections);
		}

		if (sectionsForCommon != null) {
			for (Syllabus s : syllabuses) {
				if (s.getCommon()) {
					assignSectionsToSyllabus(s, sectionsForCommon);
				}
			}
		}
		if (sectionsToUnassign != null) {
			unassignSections(syllabuses, sectionsToUnassign);
		}

	}

	// These are called on persistent syllabuses, and so any modifications are
	// saved at the end of the transaction
	private void assignSectionsToSyllabus(Syllabus commonSyllabus, Collection<String> sections) {
		for (String s : sections) {
			commonSyllabus.getSections().add(s);
		}
	}

	private void unassignSections(List<Syllabus> syllabuses, Collection<String> sectionsToUnassign) {
		for (Syllabus syllabus : syllabuses) {
			for (String sectionId : sectionsToUnassign) {
				syllabus.getSections().remove(sectionId);
			}
		}
	}

	private AbstractSyllabusElement copyElement(AbstractSyllabusElement element) {
		// Create new element
		AbstractSyllabusElement newElement = null;

		try {
			newElement = (AbstractSyllabusElement) element.getClass().newInstance();
		} catch (IllegalAccessException e) {
			// Should never happen
			e.printStackTrace();

			return null;
		} catch (InstantiationException e) {
			// Should never happen
			e.printStackTrace();

			return null;
		}

		newElement.copyFrom(element);
		newElement.setId(null);
		newElement.setPublishedId(null);
		newElement.setEqualsPublished(false);
		newElement.setLastModifiedDate(new Date());
		newElement.setLastModifiedBy(sakaiProxy.getCurrentUserId());
		newElement.setCreatedBy(sakaiProxy.getCurrentUserId());
		newElement.setCreatedDate(new Date());

		return newElement;
	}

	private void createElementCopyAndMappings(AbstractSyllabusElement element, AbstractSyllabusElement parent, int displayOrder, Syllabus forSyllabus, String userId) {
		AbstractSyllabusElement newElement = null;
		if (!element.getCommon()) {
			newElement = copyElement(element);
			newElement.setParentId(parent == null ? null : parent.getId());

			syllabusDao.save(newElement);

			createSyllabusElementMapping(forSyllabus.getId(), newElement, displayOrder, false);
		} else {
			// Create common element mapping
			createSyllabusElementMapping(forSyllabus.getId(), element, displayOrder, false);
		}

		if (element.isComposite()) {
			SyllabusCompositeElement comp = (SyllabusCompositeElement) element;

			for (int i = 0; i < comp.getElements().size(); i++) {
				AbstractSyllabusElement child = comp.getElements().get(i);

				if (newElement != null) {
					createElementCopyAndMappings(child, newElement, i, forSyllabus, userId);
				} else {
					createElementCopyAndMappings(child, comp, i, forSyllabus, userId);
				}
			}
		}
	}

	@Override
	public List<AbstractSyllabusElement> getSyllabusElementsForTemplateStructureAndSite(Long templateStructureId, String siteId) {
		return syllabusDao.getSyllabusElementsForTemplateStructureAndSite(templateStructureId, siteId);
	}

	@Override
	public boolean saveOrUpdateElement(AbstractSyllabusElement e) {
		return syllabusDao.saveOrUpdate(e);
	}

	@Override
	public List<AbstractSyllabusElement> getChildrenForSyllabusElement(SyllabusCompositeElement parent) {
		return syllabusDao.getChildrenForSyllabusElement(parent);
	}

	private void transferCopyElement(AbstractSyllabusElement element, AbstractSyllabusElement parent, int displayOrder, Syllabus forSyllabus, String userId, Map<Long, AbstractSyllabusElement> commonCopyMapping, Map<String, String> copiedCitationsMap, String fromSiteId, String toSiteId) {
		// Create new element
		AbstractSyllabusElement newElement = null;

		try {
			if (element.getProviderId() != null && element.getTemplateStructureId() == -1 )
				return ;
			//copy provided element
			if (element.getProviderId() != null ) {
				newElement = templateService.getProvidedElement(element.getProviderId(), forSyllabus.getSiteId(), forSyllabus.getLocale());
				if ( newElement == null)
					newElement = (AbstractSyllabusElement) element.getClass().newInstance();;
				newElement.setTemplateStructureId(element.getTemplateStructureId());
				newElement.setTitle(element.getTitle());
				newElement.setDescription(element.getDescription());
				newElement.setCommon(element.getCommon());
				newElement.setPublicElement(element.getPublicElement());
				newElement.setImportant(element.getImportant());
				newElement.setDisplayOrder(element.getDisplayOrder());
				newElement.setHidden(element.getHidden());
				newElement.setAvailabilityStartDate(element.getAvailabilityStartDate());
				newElement.setAvailabilityEndDate(element.getAvailabilityEndDate());
				newElement.setLastModifiedDate(element.getLastModifiedDate());
				newElement.setLastModifiedBy(element.getLastModifiedBy());
				newElement.setHasDatesInterval(element.getHasDatesInterval());
				newElement.setProviderId(element.getProviderId());
				newElement.setId(null);
				newElement.setSiteId(forSyllabus.getSiteId());
				newElement.setParentId(parent == null ? null : parent.getId());
				newElement.setPublishedId(null);
				newElement.setEqualsPublished(false);
				newElement.setCreatedBy(userId);
				newElement.setCreatedDate(new Date());
				if (element.getAttributes() != null) {
					newElement.setAttributes(new HashMap<String, String>(element.getAttributes()));
				}
			}
			//Copy not provided element
			else {
				newElement = (AbstractSyllabusElement) element.getClass().newInstance();
				newElement.copyFrom(element);
				newElement.setId(null);
				newElement.setSiteId(forSyllabus.getSiteId());
				newElement.setParentId(parent == null ? null : parent.getId());
				newElement.setPublishedId(null);
				newElement.setEqualsPublished(false);
				newElement.setCreatedBy(userId);
				newElement.setCreatedDate(new Date());
			}

			updateLinks(newElement, fromSiteId, toSiteId, copiedCitationsMap);
		} catch (IllegalAccessException e) {
		// Should never happen
		e.printStackTrace();

		return ;
	} catch (InstantiationException e) {
		// Should never happen
		e.printStackTrace();

		return ;
	}

		//if common syllabus and common element, save element and mapping
		//if not common syllabus and not common element, save element and mapping
		if ((forSyllabus.getCommon() && element.getCommon()) || (!forSyllabus.getCommon() && !element.getCommon())){
			syllabusDao.save(newElement);
			createSyllabusElementMapping(forSyllabus.getId(), newElement, displayOrder, false);
			//Save sub element - used for provided elements
			if ( newElement.isComposite()){
				SyllabusCompositeElement newCompElement = (SyllabusCompositeElement) newElement;
				AbstractSyllabusElement newSubElement = null;
				for (int i=0; i< newCompElement.getElements().size(); i++){
					newSubElement = newCompElement.getElements().get(i);
					newSubElement.setId(null);
					newSubElement.setSiteId(forSyllabus.getSiteId());
					newSubElement.setPublishedId(null);
					newSubElement.setEqualsPublished(false);
					newSubElement.setCreatedBy(userId);
					newSubElement.setParentId(newCompElement.getId());
					newSubElement.setCreatedDate(new Date());
					newSubElement.setLastModifiedDate(element.getLastModifiedDate());
					newSubElement.setLastModifiedBy(element.getLastModifiedBy());
					syllabusDao.save(newSubElement);
					createSyllabusElementMapping(forSyllabus.getId(), newSubElement, i, false);
				}
			}
		}else {
			//Find the right parent in the common
			newElement = commonCopyMapping.get(element.getId());
		}


		if (element.isComposite()) {
			SyllabusCompositeElement comp = (SyllabusCompositeElement) element;

			// when copying the common syllabus, add composite elements to the map
			if (commonCopyMapping != null && forSyllabus.getCommon()){
				commonCopyMapping.put(element.getId(), newElement);
			}

			for (int i = 0; i < comp.getElements().size(); i++) {
				AbstractSyllabusElement child = comp.getElements().get(i);
				transferCopyElement(child, newElement, i, forSyllabus, userId, commonCopyMapping, copiedCitationsMap, fromSiteId, toSiteId);
			}
		}

	}

	private void updateLinks(AbstractSyllabusElement newElement, String fromSiteId, String toSiteId, Map<String, String> copiedCitationsMap) {

		Map<String, String> attributes = newElement.getAttributes();
		String newResourceId ;

		if (attributes != null){
			if (newElement instanceof SyllabusDocumentElement){
				String resourceId = attributes.get("documentId");
				if (resourceId != null) {
					newResourceId = resourceId.replace(fromSiteId, toSiteId);
					attributes.put("documentId", newResourceId);
				}
			}
			if (newElement instanceof SyllabusImageElement){
				String imageId = attributes.get("imageId");
				if (imageId != null) {
					newResourceId = imageId.replace(fromSiteId, toSiteId);
					attributes.put("imageId", newResourceId);
				}
			}
			if (newElement instanceof SyllabusCitationElement){
				String citationRefId = attributes.get("citationId");

				if (citationRefId == null) {
					return;
				}

				String citationListId = citationRefId.substring(0, citationRefId.lastIndexOf('/'));
				String citationId = citationRefId.substring(citationListId.length()+1, citationRefId.length());

				ContentResource fromCitationListResource;
				CitationCollection fromCitationCollection;
				Citation fromCitation = null;

				if (copiedCitationsMap.containsKey(citationRefId)) {
					attributes.put("citationId", copiedCitationsMap.get(citationRefId));
					return;
				}

				try {
					fromCitationListResource = contentHostingService.getResource(citationListId);
					fromCitationCollection = citationService.getCollection(new String(fromCitationListResource.getContent()));
					fromCitation = fromCitationCollection.getCitation(citationId);
				}
				catch (Exception e ){
					e.printStackTrace();
				}

				if (fromCitation != null) {
					// TODO i18n
					String destSiteCollectionRef = contentHostingService.getSiteCollection(toSiteId);
					String citationListName = "Références bibliographiques importées";
					String destCitationCollectionRef = destSiteCollectionRef + citationListName;
					CitationCollection destCitationCollection = getDestinationCitationCollection(destCitationCollectionRef, citationListName);

					if (destCitationCollection != null) {
						Citation newCitation = citationService.copyCitation(fromCitation);
						destCitationCollection.add(newCitation);
						citationService.save(newCitation);
						citationService.save(destCitationCollection);

						attributes.put("citationId", destCitationCollectionRef+"/"+newCitation.getId());
						copiedCitationsMap.put(citationRefId, destCitationCollectionRef+"/"+newCitation.getId());
					}
				}
			}
		}
	}

	// create or retrieve existing citation collection
	private CitationCollection getDestinationCitationCollection(String destinationCitationListRef, String citationListName) {

		CitationCollection destCitationCollection = null;

		try {
			ContentResourceEdit citationListResource = contentHostingService.editResource(destinationCitationListRef);
			destCitationCollection = citationService.getCollection(new String(citationListResource.getContent()));
		}
		catch (InUseException iue) {
			// list is locked
			try {
				ContentResource citationListResource = contentHostingService.getResource(destinationCitationListRef);
				destCitationCollection = citationService.getCollection(new String(citationListResource.getContent()));
			} catch (Exception e) { e.printStackTrace(); }
		}
		catch (PermissionException | IdUnusedException iue) {
			// allowUpdateResource rewrites the IdUnusedException into a PermissionException, catch both here
			log.info("Create new citation list " + destinationCitationListRef);

			try {
				ContentResourceEdit citationListResource = contentHostingService.addResource(destinationCitationListRef);

				destCitationCollection = citationService.addCollection();
				citationListResource.setContent(destCitationCollection.getId().getBytes());
				citationListResource.setResourceType(CitationService.CITATION_LIST_ID);
				citationListResource.setContentType(ResourceType.MIME_TYPE_HTML);

				ResourcePropertiesEdit props = citationListResource.getPropertiesEdit();
				props.addProperty(
						ContentHostingService.PROP_ALTERNATE_REFERENCE,
						org.sakaiproject.citation.api.CitationService.REFERENCE_ROOT);
				props.addProperty(ResourceProperties.PROP_CONTENT_TYPE,
						ResourceType.MIME_TYPE_HTML);
				props.addProperty(ResourceProperties.PROP_DISPLAY_NAME,
						citationListName);

				contentHostingService.commitResource(citationListResource, NotificationService.NOTI_NONE);
			}
			catch (Exception e) {
				e.printStackTrace();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return destCitationCollection;
	}

	// remove all citation lists during import so they don't accumulate
	public void deleteCitationLists(String siteId) {
		Set<String> contextList = new HashSet<>();
		contextList.add(siteId);
		Collection<ContentResource> citationsLists =
				contentHostingService.getContextResourcesOfType(CitationService.CITATION_LIST_ID, contextList);

		for (ContentResource list : citationsLists) {
			try {
				contentHostingService.removeResource(list.getId());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public AbstractSyllabusElement getSyllabusElement(Long id) {
		return syllabusDao.getSyllabusElement(id);
	}

	public void transformPersonalizedToCommon(Long syllabusId) throws NoSyllabusException, DeniedAccessException, NoSiteException, IdUnusedException, PublishedSyllabusException {
		Syllabus newCommon = syllabusDao.getSyllabus(syllabusId);

		Syllabus oldCommon = getCommonSyllabus(newCommon.getSiteId());
		if (oldCommon.getPublishedDate() != null) {
			throw new PublishedSyllabusException(oldCommon.getId());
		}
		if (newCommon.getPublishedDate() != null) {
			throw new PublishedSyllabusException(newCommon.getId());
		}

		List<Syllabus> siteSyllabuses = getSyllabusList(newCommon.getSiteId());
		for (Syllabus s : siteSyllabuses) {
			if (s.getId() != syllabusId) {
				deleteSyllabus(s.getId());

				// assign all sections to the new common
				assignSectionsToSyllabus(newCommon, s.getSections());
			}
		}

		Site site = null;
		String newSyllabusLocale;
		try {
			site = sakaiProxy.getSite(newCommon.getSiteId());
		} catch (Exception e) {
			log.error("Site " + newCommon.getSiteId() + " could not be retrieved.");
		}

		newSyllabusLocale = getSyllabusLanguageForSite(site);
		ResourceBundle rb = ResourceBundle.getBundle("tenjin", LocaleUtils.toLocale(newSyllabusLocale));
		newCommon.setTitle(rb.getString("tenjin.common.title"));
		newCommon.setCommon(true);

		List<SyllabusElementMapping> mappings = getSyllabusElementMappings(syllabusId, true);
		for (SyllabusElementMapping m : mappings) {
			m.getSyllabusElement().setCommon(true);
		}
	}
}
