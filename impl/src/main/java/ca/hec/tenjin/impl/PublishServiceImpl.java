package ca.hec.tenjin.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.annotation.Transactional;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusLockService;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.TenjinFunctions;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoPublishedSyllabusException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.exception.SyllabusLockedException;
import ca.hec.tenjin.api.exception.UnknownElementTypeException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusContactInfoElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusDocumentElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.SyllabusEvaluationElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusExamElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusHyperlinkElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusImageElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusLectureElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusSakaiToolElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusTextElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusTutorialElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusVideoElement;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCompositeElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedContactInfoElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedDocumentElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedEvaluationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedExamElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedHyperlinkElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedImageElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedLectureElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedRubricElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSakaiToolElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.published.PublishedTextElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedTutorialElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedVideoElement;
import lombok.Setter;

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

	@Override
	public PublishedSyllabus getPublishedSyllabus(Long syllabusId) throws NoSyllabusException {
		return publishedSyllabusDao.getPublishedSyllabus(syllabusId, true);
	}

	@Override
	public PublishedSyllabus getPublishedSyllabus(String siteId, String sectionId) throws NoSyllabusException, DeniedAccessException {
		PublishedSyllabus ret = publishedSyllabusDao.getPublishedSyllabusOrNull(siteId, sectionId);

		if (!securityService.check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_READ, ret))
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

		// Check the lock
		if (!syllabusLockService.checkIfUserHasLock(syllabus, sakaiProxy.getCurrentUserId())) {
			throw new SyllabusLockedException(syllabusLockService.getSyllabusLock(syllabusId));
		}

		// throw an exception if current user does not have publish permission
		// on the syllabus
		if (!securityService.check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_PUBLISH, syllabus))
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
			syllabusDao.update(element);

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
				for (AbstractPublishedSyllabusElement elem : childPublishedElements) {
					elem.setParentId(elementToPublish.getId());
					syllabusDao.update(elem);
				}
			}
		}

		syllabus.setPublishedDate(new Date());
		syllabus.setPublishedBy(sakaiProxy.getCurrentUserId());
		syllabusDao.update(syllabus);

		return syllabus;
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
	}
}
