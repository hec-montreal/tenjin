package ca.hec.tenjin.impl;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.HashMap;
import java.util.Date;

import org.springframework.transaction.annotation.Transactional;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
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
import lombok.Setter;

public class PublishServiceImpl implements PublishService {

	@Setter
	PublishedSyllabusDao publishedSyllabusDao;
	
	@Setter
	SyllabusDao syllabusDao;
	
	@Setter 
	SyllabusService syllabusService;
	
	@Override
	public PublishedSyllabus getPublishedSyllabus(Long syllabusId) throws NoSyllabusException {
		return publishedSyllabusDao.getPublishedSyllabus(syllabusId);
	}

	@Override
	@Transactional
	public boolean publishSyllabus(Long syllabusId) throws NoSyllabusException {
		
		Syllabus syllabus = syllabusService.getSyllabus(syllabusId);
		//List<SyllabusElementMapping> mappings = syllabusService.getSyllabusElementMappings(syllabusId, false);
		
		// add top-level elements to the search queue (breadth-first traversal)
		Queue<AbstractSyllabusElement> searchQueue = new LinkedList<AbstractSyllabusElement>();
//		int order = 0;
		for (AbstractSyllabusElement element : syllabus.getElements()) {			
			searchQueue.add(element);
		}
		
		// a map to keep track of the new parent ids
		HashMap<Long, Long> parentIdMap = new HashMap<Long, Long>();
		
		
		while (!searchQueue.isEmpty()) {
			AbstractSyllabusElement element = searchQueue.remove();
			
			AbstractPublishedSyllabusElement elementToPublish = getPublishedElement(element);
			
			// fix the parent id
			Long oldParentId = elementToPublish.getParentId(); 
			if (oldParentId != null) {
				elementToPublish.setParentId(parentIdMap.get(oldParentId));
			}
			
			syllabusDao.save(elementToPublish);

			parentIdMap.put(element.getId(), elementToPublish.getId());

			element.setPublishedId(elementToPublish.getId());
			element.setEqualsPublished(true);			
//			syllabusDao.save(element); This creates a new element!
			
			// create/update mapping
			List<SyllabusElementMapping> existingMappings = syllabusDao.getMappingsForElement(element);
			
			for (SyllabusElementMapping mapping : existingMappings) {
				PublishedSyllabusElementMapping publishedMapping = new PublishedSyllabusElementMapping();
				publishedMapping.setSyllabusId(mapping.getSyllabusId());
				publishedMapping.setPublishedSyllabusElement(elementToPublish);
				publishedMapping.setDisplayOrder(mapping.getDisplayOrder());
			
				syllabusDao.save(publishedMapping);
			}
			
			// add this element's children to the search queue
			if (element.isComposite()) {
				SyllabusCompositeElement compositeElement = (SyllabusCompositeElement) element;
				if (compositeElement.getElements() != null) {
//					order = 0;
					for (AbstractSyllabusElement child : compositeElement.getElements()) {
						// correct parent id, site id and display order
//						child.setDisplayOrder(order++);

						searchQueue.add(child);
						
					}
				}
			}
		}
		
		syllabus.setPublishedDate(new Date());
//		syllabus.setPublishedBy(sakaiProxy.getCurrentUserId());

		return true;
	}

	private AbstractPublishedSyllabusElement getPublishedElement(AbstractSyllabusElement syllabusElement) {
		
		AbstractPublishedSyllabusElement publishedElement = null;
		
		// TODO could probly make this more dynamic
		if (syllabusElement instanceof SyllabusCitationElement) {
			publishedElement = new PublishedCitationElement();
		} else if (syllabusElement instanceof SyllabusCompositeElement) {
			publishedElement = new PublishedCompositeElement();
		} else if (syllabusElement instanceof SyllabusContactInfoElement) {
			publishedElement = new PublishedContactInfoElement();
		} else if (syllabusElement instanceof SyllabusDocumentElement) {
			publishedElement = new PublishedDocumentElement();
		} else if (syllabusElement instanceof SyllabusEvaluationElement) {
			publishedElement = new PublishedEvaluationElement();
		} else if (syllabusElement instanceof SyllabusExamElement) {
			publishedElement = new PublishedExamElement();
		} else if (syllabusElement instanceof SyllabusHyperlinkElement) {
			publishedElement = new PublishedHyperlinkElement();			
		} else if (syllabusElement instanceof SyllabusImageElement) {
			publishedElement = new PublishedImageElement();			
		} else if (syllabusElement instanceof SyllabusLectureElement) {
			publishedElement = new PublishedLectureElement();			
		} else if (syllabusElement instanceof SyllabusRubricElement) {
			publishedElement = new PublishedRubricElement();			
		} else if (syllabusElement instanceof SyllabusSakaiToolElement) {
			publishedElement = new PublishedSakaiToolElement();			
		} else if (syllabusElement instanceof SyllabusTextElement) {
			publishedElement = new PublishedTextElement();			
		} else if (syllabusElement instanceof SyllabusTutorialElement) {
			publishedElement = new PublishedTutorialElement();			
		} else if (syllabusElement instanceof SyllabusVideoElement) {
			publishedElement = new PublishedVideoElement();			
		}
		
		publishedElement.copy(syllabusElement);
		publishedElement.setId(null);
		return publishedElement;
	}

}
