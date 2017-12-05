package ca.hec.tenjin.impl;

import ca.hec.tenjin.api.*;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.*;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.provider.CourseOutlineProvider;
import lombok.Setter;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.LocaleUtils;
import org.apache.log4j.Logger;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Autowired(required = false)
	private CourseOutlineProvider importProvider;
	
	@Override
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException, StructureSyllabusException {
		Syllabus syllabus = null;

		syllabus = syllabusDao.getStructuredSyllabus(syllabusId);

		// throw denied access if no write permission on syllabus
		if (!securityService.canWrite(sakaiProxy.getCurrentUserId(), syllabus))
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
	public List<Syllabus> getSyllabusListForUser(String siteId, String currentUserId) throws NoSiteException, DeniedAccessException {
		List<Syllabus> syllabusList = null;
		List<Syllabus> finalSyllabusList = new ArrayList<Syllabus>();
		syllabusList = syllabusDao.getSyllabusList(siteId);
		Site site = null;

		if (syllabusList.isEmpty()) {
			try {

				site = sakaiProxy.getSite(siteId);

				if (securityService.checkOnSiteGroup(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON, site)) {
					Syllabus common = createCommonSyllabus(siteId);
					createOrUpdateSyllabus(common);
					syllabusList.add(common);
				}
			} catch (IdUnusedException e) {
				throw new NoSiteException();
			} catch (Exception e) {
				// should not be possible, only happens when we try to update a
				// syllabus that doesn't exist
				log.error("Error saving new common syllabus for site: " + siteId);
				e.printStackTrace();
			}
		}

		// remove syllabi the user does not have access to
		for (Syllabus syllabus : syllabusList) {
			// if user has read or write it should be in the list
			if (securityService.canRead(currentUserId, syllabus) ||
					securityService.canWrite(currentUserId, syllabus)) {

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

					compareAndUpdateSyllabusElementMapping(existingSyllabusElementMappings.get(element.getId()), element);

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
	}

	@Override
	public Syllabus transferCopySyllabus(String siteId, Long syllabusId, String title, boolean common, Long templateId,
										 String locale, String courseTitle, String createdBy,
										 String createdByName, Map<Long, AbstractSyllabusElement> commonCopyMapping) throws DeniedAccessException, IdUnusedException, NoSyllabusException, StructureSyllabusException{
		Syllabus syllabus = syllabusDao.getStructuredSyllabus(syllabusId);

		if (!securityService.canRead(sakaiProxy.getCurrentUserId(), syllabus)) {
			throw new DeniedAccessException();
		}

		Date now = new Date();
		Syllabus copy = new Syllabus();

		copy.setSiteId(siteId);
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
			Syllabus thecommon = getCommonSyllabus(siteId);
			List<SyllabusElementMapping> mappings = getSyllabusElementMappings(thecommon.getId(),true);
			for (SyllabusElementMapping mapping: mappings){
				createSyllabusElementMapping(copy.getId(), mapping.getSyllabusElement(),mapping.getDisplayOrder(),mapping.getHidden());
			}
		}

		// Copy elements
		for (int i = 0; i < syllabus.getElements().size(); i++) {
			transferCopyElement(syllabus.getElements().get(i), null, i, copy, createdBy, commonCopyMapping);
		}

		return copy;
	}

	@Override	public void deleteSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException {
		Syllabus syllabus = syllabusDao.getSyllabus(syllabusId);
		
		if (syllabus == null) {
			throw new NoSyllabusException(syllabusId);
		}

		if (syllabus.getCommon()) {
			throw new DeniedAccessException();
		}

		if (syllabus.getSections() != null && syllabus.getSections().size() > 0) {
			throw new DeniedAccessException();
		}
		
		boolean canDelete = sakaiProxy.getCurrentUserId().equals(syllabus.getCreatedBy()) ||
							securityService.canWrite(sakaiProxy.getCurrentUserId(), syllabus);
		
		if(!canDelete) {
			throw new DeniedAccessException();
		}
		
		syllabusLockService.unlockSyllabus(syllabusId);
		
		syllabusDao.softDeleteSyllabus(syllabus);
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

		String locale = site.getProperties().getProperty("locale_string");
		if (locale == null || locale.isEmpty()) {
			String localePropName = sakaiProxy.getSakaiProperty("tenjin.syllabusLocale.sitePropertyName");
			locale = site.getProperties().getProperty(localePropName);
		}
		if (locale == null || locale.isEmpty()) {
			// use default server locale
			locale = Locale.getDefault().toString();
		}

		Syllabus newCommonSyllabus = templateService.getEmptySyllabusFromTemplate(1L, siteId, locale);

		if (newCommonSyllabus != null) {
			newCommonSyllabus.setTemplateId(1L);
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

	/**
	 * Update a Persistent syllabus element mapping (including the syllabus
	 * element)
	 */
	private void compareAndUpdateSyllabusElementMapping(SyllabusElementMapping existingElementMapping, AbstractSyllabusElement newElement) {

		// update display order and hidden (before comparing the objects!)
		if (existingElementMapping.getDisplayOrder() != newElement.getDisplayOrder()) {
			existingElementMapping.setDisplayOrder(newElement.getDisplayOrder());
		}
		if (existingElementMapping.getHidden() != newElement.getHidden()) {
			existingElementMapping.setHidden(newElement.getHidden());
		}

		// compare element from the new syllabus to what is in the database
		AbstractSyllabusElement existingElement = existingElementMapping.getSyllabusElement();

		// hidden & display order come from the mapping, don't make the equals
		// fail for them
		existingElement.setHidden(existingElementMapping.getHidden());
		existingElement.setDisplayOrder(existingElementMapping.getDisplayOrder());

		// user may not update the publishedId
		newElement.setPublishedId(existingElement.getPublishedId());

		// don't modify provided elements
		if (existingElement.getProviderId() == null && !newElement.equals(existingElement)) {

			// update persistent object, save handled by hibernate at end of
			// transaction
			existingElement.copyFrom(newElement);
			existingElement.setLastModifiedBy(sakaiProxy.getCurrentUserId());
			existingElement.setLastModifiedDate(new Date());
			existingElement.setEqualsPublished(false);
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

	private void transferCopyElement(AbstractSyllabusElement element, AbstractSyllabusElement parent, int displayOrder, Syllabus forSyllabus, String userId, Map<Long, AbstractSyllabusElement> commonCopyMapping) {
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
				transferCopyElement(child, newElement, i, forSyllabus, userId, commonCopyMapping);
			}
		}

	}

	public AbstractSyllabusElement getSyllabusElement(Long id) {
		return syllabusDao.getSyllabusElement(id);
	}
}
