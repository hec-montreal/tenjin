package ca.hec.tenjin.impl;

import ca.hec.archive.api.HecCourseArchiveService;
import ca.hec.commons.utils.FormatUtils;
import ca.hec.tenjin.api.*;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.*;
import ca.hec.tenjin.api.model.syllabus.*;
import ca.hec.tenjin.api.model.syllabus.published.*;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.GroupNotDefinedException;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.content.api.ContentResourceEdit;
import org.sakaiproject.coursemanagement.api.AcademicSession;
import org.sakaiproject.coursemanagement.api.CourseManagementService;
import org.sakaiproject.coursemanagement.api.CourseOffering;
import org.sakaiproject.coursemanagement.api.Section;
import org.sakaiproject.entity.api.ResourcePropertiesEdit;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.*;

public class PublishServiceImpl implements PublishService {
	private Log log = LogFactory.getLog(PublishServiceImpl.class);

	// Elements -> PublishedElement mapping
	static final Map<String, Class<?>> ELEMENTS_PUBLICATION_MAPPING;

	static {
		ELEMENTS_PUBLICATION_MAPPING = new HashMap<>();

		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusCitationElement.class.getName(), PublishedCitationElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusCompositeElement.class.getName(), PublishedCompositeElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusContactInfoElement.class.getName(), PublishedContactInfoElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusDocumentElement.class.getName(), PublishedDocumentElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusEvaluationElement.class.getName(), PublishedEvaluationElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusExamElement.class.getName(), PublishedExamElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusHyperlinkElement.class.getName(), PublishedHyperlinkElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusImageElement.class.getName(), PublishedImageElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusLectureElement.class.getName(), PublishedLectureElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusRubricElement.class.getName(), PublishedRubricElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusSakaiToolElement.class.getName(), PublishedSakaiToolElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusTextElement.class.getName(), PublishedTextElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusTutorialElement.class.getName(), PublishedTutorialElement.class);
		ELEMENTS_PUBLICATION_MAPPING.put(SyllabusVideoElement.class.getName(), PublishedVideoElement.class);
	}

	@Setter
	PublishedSyllabusDao publishedSyllabusDao;

	@Setter
	SyllabusDao syllabusDao;

	@Setter
	SyllabusService syllabusService;

	@Setter
	SakaiProxy sakaiProxy;

	@Setter
	TenjinSecurityService securityService;

	@Setter
	SyllabusLockService syllabusLockService;

	@Setter
	HecCourseArchiveService hecCourseArchiveService;

	@Setter
	SyllabusExportService syllabusExportService;

	@Setter
	CourseManagementService cmService;

	@Override
	public PublishedSyllabus getPublishedSyllabus(Long syllabusId) throws NoSyllabusException {
		return publishedSyllabusDao.getPublishedSyllabus(syllabusId, true);
	}

	@Override
	public PublishedSyllabus getPublishedSyllabus(String siteId, String sectionId) throws NoSyllabusException, DeniedAccessException {
		PublishedSyllabus ret = publishedSyllabusDao.getPublishedSyllabusOrNull(siteId, sectionId);

		if (!securityService.canRead(sakaiProxy.getCurrentUserId(), ret))
			throw new DeniedAccessException();
		if (ret == null) {
			throw new NoSyllabusException();
		}

		return ret;
	}
	
	public PublishedSyllabus getPublicSyllabus(Long syllabusId) throws NoSyllabusException {
		return publishedSyllabusDao.getPublicSyllabus(syllabusId);
	}
	
	@Override
	@Transactional
	public Syllabus publishSyllabus(Long syllabusId) throws NoSyllabusException, NoPublishedSyllabusException, UnknownElementTypeException, DeniedAccessException, StructureSyllabusException, SyllabusLockedException {

		Syllabus syllabus = syllabusService.getSyllabus(syllabusId);
		List<AbstractSyllabusElement> elementsToUpdate = new ArrayList<AbstractSyllabusElement>();

		// Check the lock
		if (!syllabusLockService.checkIfUserHasLock(syllabus, sakaiProxy.getCurrentUserId())) {
			throw new SyllabusLockedException(syllabusLockService.getSyllabusLock(syllabusId));
		}

		// throw an exception if current user does not have publish permission
		// on the syllabus
		if (!securityService.canPublish(sakaiProxy.getCurrentUserId(), syllabus))
			throw new DeniedAccessException();

		// throw an exception if the common syllabus is not published
		if (!syllabus.getCommon()) {
			Syllabus commonSyllabus = syllabusService.getCommonSyllabus(syllabus.getSiteId());
			if (commonSyllabus != null && commonSyllabus.getPublishedDate() == null) {
				throw new NoPublishedSyllabusException(commonSyllabus.getId());
			}
		}

		// if the syllabus has been published before, delete the published
		// version
		if (syllabus.getPublishedDate() != null) {
			publishedSyllabusDao.deletePublishedSyllabus(syllabusId);
		}

		// add top-level elements to the search queue (breadth-first traversal)
		Queue<AbstractSyllabusElement> searchQueue = new LinkedList<AbstractSyllabusElement>();
		for (AbstractSyllabusElement element : syllabus.getElements()) {
			searchQueue.add(element);
		}

		// a map to look up the new published id based on the unpublished id
		HashMap<Long, Long> publishedIdMap = new HashMap<Long, Long>();
		
		// get the ids of the published syllabuses for this site so we know which need mappings to the common elements
		List<Long> publishedSyllabusIdsForSite = getPublishedSyllabusIdsForSite(syllabus.getSiteId());

		while (!searchQueue.isEmpty()) {
			AbstractSyllabusElement element = searchQueue.remove();

			// add this element's children to the search queue
			if (element.isComposite()) {
				SyllabusCompositeElement compositeElement = (SyllabusCompositeElement) element;
				if (compositeElement.getElements() != null) {
					for (AbstractSyllabusElement child : compositeElement.getElements()) {
						searchQueue.add(child);
					}
				}
			}

			// If we are publishing a personalised syllabus, don't publish the
			// common elements
			if (!syllabus.getCommon() && element.getCommon()) {

				// If this is not a common syllabus, retrieve the mapping for
				// this element so we can publish it for this syllabus
				SyllabusElementMapping mapping = syllabusDao.getMappingForSyllabusAndElement(syllabus.getId(), element.getId());

				if (mapping != null && element.getPublishedId() != null) {
					// we assume the common elements are already published
					AbstractPublishedSyllabusElement publishedElement = publishedSyllabusDao.getPublishedElement(element.getPublishedId());
					publishMapping(mapping, publishedElement);
				} else {
					log.error("No mapping exists for syllabus " + syllabus.getId() + " and element " + element.getId());
				}

				// add common elements to the parent Id map so personal elements
				// can be added as children
				publishedIdMap.put(element.getId(), element.getPublishedId());

				// only publish common elements for common syllabus
				continue;
			}

			AbstractPublishedSyllabusElement elementToPublish = publishElement(element, publishedIdMap.get(element.getParentId()));

			// add the new element's id to the map so we can use it later
			publishedIdMap.put(element.getId(), elementToPublish.getId());

			// Update existing element
			Long oldPublishedId = element.getPublishedId();
			element.setPublishedId(elementToPublish.getId());
			element.setEqualsPublished(true);
			elementsToUpdate.add(element);
			

			// create mapping for published element
			List<SyllabusElementMapping> existingMappings = syllabusDao.getMappingsForElement(element);

			for (SyllabusElementMapping mapping : existingMappings) {
				if (mapping.getSyllabusId().equals(syllabus.getId()) || 
						publishedSyllabusIdsForSite.contains(mapping.getSyllabusId())) {

					publishMapping(mapping, elementToPublish);
				}
			}

			if (syllabus.getCommon() && oldPublishedId != null) {
				// Update parentId for previously published child elements
				List<AbstractPublishedSyllabusElement> childPublishedElements = publishedSyllabusDao.getChildPublishedElements(oldPublishedId);
				publishedSyllabusDao.batchUpdateParentId(oldPublishedId, elementToPublish.getId());
			}
		}

		try {
		    syllabusDao.batchUpdateAfterPublish(elementsToUpdate);
		}catch (Exception e) {
		    e.printStackTrace();
		}
		syllabus.setPublishedDate(new Date());
		syllabus.setPublishedBy(sakaiProxy.getCurrentUserId());
		syllabusDao.update(syllabus);

		sakaiProxy.postEvent(TenjinEvents.TENJIN_PUBLISH_EVENT, sakaiProxy.getSyllabusReference(syllabus.getId(), null), true);

		return syllabus;
	}

	/**
	 * Create pdfs from the published syllabus. There is as much pdfs as sections associated to the syllabus.
	 * The PDFs are saved in the old path and published in HEC Archive tool
	 * @param publicSyllabus
	 */
	public void archiveSyllabus(Long publishedSyllabusId) throws NoSyllabusException {
		Set<String> groups = null;
		Site site = null;
		Group authzGroup = null;
		List<Syllabus> syllabi = null;
		boolean updatedSyllabusGroup = false;
		PublishedSyllabus publicSyllabus = getPublicSyllabus(publishedSyllabusId);

		if (publicSyllabus.getCommon()){
			try {
				site = sakaiProxy.getSite(publicSyllabus.getSiteId());
				syllabi = syllabusService.getSyllabusList(site.getId());
				for (Group group: site.getGroups()){
					updatedSyllabusGroup = false;
					for (Syllabus syllabusItem: syllabi){
						for (String syllabusSection: syllabusItem.getSections()) {
							if (syllabusSection.contains(group.getId()) && syllabusItem.getPublishedDate() != null
									&& !syllabusItem.getCommon()) {
								createAndSavePdf(group, getPublicSyllabus(syllabusItem.getId()));
								updatedSyllabusGroup = true;
							}
						}
						if (!updatedSyllabusGroup)
							createAndSavePdf(group, publicSyllabus);
					}
				}
			} catch (IdUnusedException e) {
				e.printStackTrace();
			} catch (DeniedAccessException e) {
				e.printStackTrace();
			} catch (NoSiteException e) {
				e.printStackTrace();
			} catch (NoSyllabusException e) {
				e.printStackTrace();
			}
		}else{
			groups = publicSyllabus.getSections();
			for (String group: groups){
				try {
					authzGroup = sakaiProxy.getGroup(group);
					createAndSavePdf(authzGroup, publicSyllabus);
				} catch (GroupNotDefinedException e) {
					e.printStackTrace();
				}
			}
		}

		//Create archive entry
		hecCourseArchiveService.saveCourseMetadataToArchive(publicSyllabus.getSiteId(), publicSyllabus.getId().toString(), publicSyllabus.getSections());
	}

	private void createAndSavePdf (Group group, PublishedSyllabus publicSyllabus){
		Section section = null;
		String siteName = null;
		String pdfPathId = null;
		ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
		ResourcePropertiesEdit resourceProperties = null;
		ContentResourceEdit resourceEdit = null;

		if ((group.getProviderGroupId() != null) &&  (publicSyllabus.getElements() != null)
				&& publicSyllabus.getPublishedDate() != null){
			try {
				section = cmService.getSection(group.getProviderGroupId());
				siteName = getSiteName(section);
				syllabusExportService.exportPdf(publicSyllabus, (List<Object>) (List<?>)publicSyllabus.getElements(),true, publicSyllabus.getLocale(), byteOutputStream);

				//Create Resource
				//TODO: update after refactoring catalog_description
				pdfPathId = ContentHostingService.ATTACHMENTS_COLLECTION + siteName
						+ "/OpenSyllabus/"+siteName+"_public.pdf";

				resourceEdit = sakaiProxy.addPdfToArchive(pdfPathId,"application/pdf",
						byteOutputStream,resourceProperties, 0);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	//TODO: might need to be removed after catalog_description refactoring

	/**
	 * For a given section, builds the siteId that would have been used with OpenSyllabus
	 * @param section
	 * @return siteId built the old way
	 */
	private String getSiteName(Section section) {
		String siteName = null;
		String sectionId = section.getEid();
		String courseOffId = section.getCourseOfferingEid();
		CourseOffering courseOff = cmService.getCourseOffering(courseOffId);
		String canCourseId = (courseOff.getCanonicalCourseEid()).trim();
		AcademicSession session = courseOff.getAcademicSession();
		String sessionId = session.getEid();

		String courseId = FormatUtils.formatCourseId(canCourseId);
		Date startDate = session.getStartDate();
		String year = startDate.toString().substring(0, 4);
		String sessionName = null;
		if ((sessionId.charAt(3)) == '1')
			sessionName = "H" + year;
		if ((sessionId.charAt(3)) == '2')
			sessionName = "E" + year;
		if ((sessionId.charAt(3)) == '3')
			sessionName = "A" + year;
		String periode = null;
		String groupe = null;

		if (sessionId.matches(".*[pP].*")) {
			periode = sessionId.substring(sessionId.length() - 2);
		}

		groupe = sectionId.substring(courseOffId.length());

		if (periode == null)
			siteName = courseId + "." + sessionName + "." + groupe;
		else
			siteName =
					courseId + "." + sessionName + "." + periode + "."
							+ groupe;

		return siteName;
	}

	private List<Long> getPublishedSyllabusIdsForSite(String siteId) {
		List<Long> ids = new ArrayList<Long>();
		
		List<PublishedSyllabus> syllabi = publishedSyllabusDao.getPublishedSyllabusList(siteId);
		for (PublishedSyllabus s : syllabi) {
			ids.add(s.getId());
		}
		
		return ids;
	}
 
	private void publishMapping(SyllabusElementMapping mapping, AbstractPublishedSyllabusElement publishedElement) {
		if (!mapping.getHidden()) {
			PublishedSyllabusElementMapping publishedMapping = new PublishedSyllabusElementMapping();
			publishedMapping.setSyllabusId(mapping.getSyllabusId());
			publishedMapping.setPublishedSyllabusElement(publishedElement);
			publishedMapping.setDisplayOrder(mapping.getDisplayOrder());

			syllabusDao.save(publishedMapping);
		}
		if (mapping.getEqualsPublished() == null || mapping.getEqualsPublished() != true) {
			// even if we didn't publish the mapping because it was hidden, set equalsPublished for the attempt
			mapping.setEqualsPublished(true);
			syllabusDao.save(mapping);
		}
	}

	private AbstractPublishedSyllabusElement publishElement(AbstractSyllabusElement syllabusElement, Long newParentId) throws UnknownElementTypeException {

		AbstractPublishedSyllabusElement publishedElement = null;
		Class<?> publishedElementClass = ELEMENTS_PUBLICATION_MAPPING.get(syllabusElement.getClass().getName());

		if (publishedElementClass == null) {
			throw new UnknownElementTypeException("Element with type " + syllabusElement.getClass().getName() + " has no known published mapping");
		}

		try {
			publishedElement = (AbstractPublishedSyllabusElement) publishedElementClass.newInstance();
		} catch (Exception e) {
			throw new UnknownElementTypeException("Cannot instantiate published element of type " + publishedElementClass.getName());
		}

		publishedElement.copy(syllabusElement);
		publishedElement.setId(null);
		publishedElement.setParentId(newParentId);

		syllabusDao.save(publishedElement);

		return publishedElement;
	}

	@Override
	public void unpublishSyllabus(Long syllabusId) throws NoSyllabusException {
		Syllabus syllabus = syllabusDao.getSyllabus(syllabusId);

		publishedSyllabusDao.unpublishSyllabusElements(syllabusId);
		publishedSyllabusDao.deletePublishedSyllabus(syllabusId);

		syllabus.setPublishedBy(null);
		syllabus.setPublishedDate(null);

		syllabusDao.save(syllabus);
		sakaiProxy.postEvent(TenjinEvents.TENJIN_UNPUBLISH_EVENT, sakaiProxy.getSyllabusReference(syllabusId, null), true);
	}

	@Override
	public List<Long> getPublishedSyllabusesWithElementMapping(AbstractPublishedSyllabusElement element) {
		return publishedSyllabusDao.getPublishedSyllabusesWithElementMapping(element);
	}

	@Override
	public AbstractPublishedSyllabusElement getPublishedSyllabusElement(Long id) {
		return publishedSyllabusDao.getPublishedElement(id);
	}
}
