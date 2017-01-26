package ca.hec.tenjin.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

import ca.hec.tenjin.api.*;
import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.GroupNotDefinedException;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;

import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import lombok.Setter;

/**
 * Implementation of {@link SyllabusService}
 *
 *
 */
@Setter
public class SyllabusServiceImpl implements SyllabusService {

	private static final Logger log = Logger.getLogger(SyllabusServiceImpl.class);

	private SakaiProxy sakaiProxy;
	private SyllabusDao syllabusDao;
	private TemplateService templateService;
	private TenjinSecurityService securityService;

	@Override
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException {
		Syllabus syllabus = null;

		try {
			syllabus = syllabusDao.getSyllabus(syllabusId, true, true);

			//throw denied access if no write permission on syllabus
			if (!securityService.check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, syllabus))
				throw new DeniedAccessException();

			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus " + syllabusId + " could not be retrieved because: " + e.getMessage());
			throw new NoSyllabusException();
		}
	}

	@Override
	public Syllabus getCommonSyllabus(String siteId) throws NoSyllabusException {
		return syllabusDao.getCommonSyllabus(siteId);
	}

	@Override
	public List<Syllabus> getSyllabusList(String siteId, String currentUserId) throws NoSiteException, DeniedAccessException {
		List<Syllabus> syllabusList = null;
		List<Syllabus> finalSyllabusList = new ArrayList<Syllabus>();
		syllabusList = syllabusDao.getSyllabusList(siteId);
		Site site = null;

		if (syllabusList.isEmpty()){
			try {

				site = sakaiProxy.getSite(siteId);

				if (securityService.checkOnSiteGroup(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE, site)) {
					Syllabus common = createCommonSyllabus(siteId);
					createOrUpdateSyllabus(common);
					syllabusList.add(common);
				}
			} catch (NoSyllabusException e) {
				// should not be possible, only happens when we try to update a
				// syllabus that doesn't exist
				log.error("Error saving new common syllabus for site: " + siteId);
				e.printStackTrace();

			} catch (IdUnusedException e) {
				throw new NoSiteException();
			}
		}


		//remove syllabi the user does not have access to
		for (Syllabus syllabus : syllabusList) {
			if (securityService.check(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ, syllabus))
				finalSyllabusList.add(syllabus);
		}


		return finalSyllabusList;
	}

	@Override
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden) {
		return syllabusDao.getSyllabusElementMappings(syllabusId, hidden);
	}
	
	@Override
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSiteException, NoSyllabusException, DeniedAccessException {
		Date now = new Date();
		Syllabus existingSyllabus = null;
		Map<Long, SyllabusElementMapping> existingSyllabusElementMappings = null;

		if (!sakaiProxy.siteExists(syllabus.getSiteId())) {
			throw new NoSiteException();
		}

		// check permissions: is allowed to modify syllabus
		if (!securityService.check(sakaiProxy.getCurrentUserId(),TenjinFunctions.TENJIN_FUNCTION_WRITE, syllabus)) {
			throw new DeniedAccessException();
		}

		// check permissions: is allowed to modify section associated to the syllabus
		if (syllabus.getSections() != null){
			boolean denied = false;
			for (String sectionId: syllabus.getSections()){
				try {
					Group group = sakaiProxy.getGroup(sectionId);
					if (!securityService.check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, group)) {
						denied = true;
						break;
					}
				} catch (GroupNotDefinedException e) {
					log.error("There is no group " + sectionId + " associated to the site" );
				}
			}
			if (denied)
				throw new DeniedAccessException();

		}

		List<Syllabus> syllabi = syllabusDao.getSyllabusList(syllabus.getSiteId());

		// create syllabus if it doesn't exist, otherwise get it's element
		// mappings from the database.
		if (syllabus.getId() == null) {


			syllabus.setCreatedDate(now);
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
			existingSyllabus = syllabusDao.getSyllabus(syllabus.getId(), false, false);


			if (existingSyllabus != syllabus) {
				if (!existingSyllabus.getSections().equals(syllabus.getSections())) {
					if (!checkSectionAssignPermissions(existingSyllabus.getSiteId(), existingSyllabus.getSections(), syllabus.getSections())) {
						throw new DeniedAccessException("User not allowed to assign the sections");
					}

					reassignSections(syllabi, existingSyllabus.getSections(), syllabus.getSections());
				}

				// update persistent object, save handled by hibernate at end of
				// transaction
				updatePersistentSyllabusObject(existingSyllabus, syllabus);
			}

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

					if (element.getType().equals(SyllabusRubricElement.TYPE)) {
						// A rubric should be the same element in all syllabuses
						SyllabusRubricElement existingRubric = syllabusDao.getRubric(element.getParentId(), element.getTemplateStructureId());

						syllabusesWithExistingRubricMapping = getSyllabusesWithElementMapping(existingRubric);

						if (existingRubric != null) {
							existingRubric.setCommon(true);
							existingRubric.setDisplayOrder(element.getDisplayOrder());
							existingRubric.setElements(((SyllabusRubricElement) element).getElements());
							element.copy(existingRubric);
						}
					}

					if (element.getId() == null || element.getId() < 0) {
						createSyllabusElement(element);
					}

					createSyllabusElementMapping(syllabus.getId(), element, element.getDisplayOrder(), false);

					// add mappings to all syllabi if this is a common syllabus
					if (syllabus.getCommon()) {
						for (Syllabus s : syllabi) {
							if (!s.getCommon() && (syllabusesWithExistingRubricMapping == null || !syllabusesWithExistingRubricMapping.contains(s.getId()))) {

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
					if (!syllabus.getCommon() && mapping.getSyllabusElement().getCommon()) {
						throw new DeniedAccessException("Cannot delete common element from a regular syllabus");
					}

					if (mapping.getSyllabusElement().getCommon() && mapping.getSyllabusElement().isComposite() && syllabusDao.elementHasNonCommonChildren(mapping.getSyllabusElement())) {
						// if the element has children in any other syllabus,
						// simply remove the mapping
						// keep the element and mark it non-common
						mapping.getSyllabusElement().setCommon(false);
						// delete each mapping for this element when there is no
						// child
						for (SyllabusElementMapping mappingWithoutChild : syllabusDao.getMappingsWithoutChildren(mapping.getSyllabusElement())) {
							syllabusDao.deleteSyllabusObject(mappingWithoutChild);
						}

					} else {
						// delete the element and all it's mappings
						syllabusDao.deleteElementAndMappings(mapping.getSyllabusElement());
					}
				}
			}
		}

		return getSyllabus(syllabus.getId());
	}

	@Override
	public void deleteSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException {
		Syllabus syllabus = syllabusDao.getSyllabus(syllabusId, false, false);
		
		if (syllabus == null) {
			throw new NoSyllabusException(syllabusId);
		}

		if (syllabus.getCommon()) {
			throw new DeniedAccessException();
		}

		if (syllabus.getSections() != null && syllabus.getSections().size() > 0) {
			throw new DeniedAccessException();
		}

		// check permissions: is allowed to modify syllabus
		if (!securityService.check(sakaiProxy.getCurrentUserId(),TenjinFunctions.TENJIN_FUNCTION_WRITE, syllabus)) {
			throw new DeniedAccessException();
		}


		syllabusDao.softDeleteSyllabus(syllabus);
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
	 * @param oldSections
	 *            The existing list of sections
	 * @param newSections
	 *            The new section list to assign
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

	private List<Long> getSyllabusesWithElementMapping(AbstractSyllabusElement element) {
		List<Long> syllabuses = new ArrayList<Long>();
		List<SyllabusElementMapping> l = syllabusDao.getMappingsForElement(element);
		for (SyllabusElementMapping mapping : l) {
			syllabuses.add(mapping.getSyllabusId());
		}

		return syllabuses;
	}

	private Syllabus createCommonSyllabus(String siteId) throws NoSiteException, DeniedAccessException {
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
			newCommonSyllabus.setCreatedBy("Admin");
			newCommonSyllabus.setCreatedDate(new Date());
			newCommonSyllabus.setLastModifiedBy("Admin");
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
		
		// hidden & display order come from the mapping, don't make the equals fail for them
		existingElement.setHidden(existingElementMapping.getHidden());
		existingElement.setDisplayOrder(existingElementMapping.getDisplayOrder());

		// user may not update the publishedId
		newElement.setPublishedId(existingElement.getPublishedId());

		if (!newElement.equals(existingElement)) {

			// update persistent object, save handled by hibernate at end of
			// transaction
			existingElement.copy(newElement);
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
}
