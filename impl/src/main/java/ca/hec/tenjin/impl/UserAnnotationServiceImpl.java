package ca.hec.tenjin.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinProperties;
import ca.hec.tenjin.api.UserAnnotationService;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.dao.UserAnnonationDao;
import ca.hec.tenjin.api.exception.SyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
import ca.hec.tenjin.api.model.userdata.UserAnnotation;
import ca.hec.tenjin.api.model.userdata.UserAnnotationTypes;
import lombok.Setter;

public class UserAnnotationServiceImpl implements UserAnnotationService {

	@Setter
	private UserAnnonationDao userAnnotationDao;
	
	@Setter
	private PublishedSyllabusDao publishedSyllabusDao;
	
	@Setter
	private SyllabusDao syllabusDao;

	@Setter
	private SakaiProxy sakaiProxy;

	@Override
	@Transactional
	public List<UserAnnotation> getAnnotationsForUserAndSyllabus(String userId, Long syllabusId) {
		List<UserAnnotation> ret = new ArrayList<>();
		
		for (UserAnnotation annotation : userAnnotationDao.getAnnotationsForUserAndSyllabus(userId, syllabusId)) {
			AbstractSyllabusElement element = syllabusDao.getSyllabusElement(annotation.getElementId());
			AbstractPublishedSyllabusElement publishedElement = publishedSyllabusDao.getPublishedElement(element.getPublishedId());
			
			UserAnnotation clone = annotation.clone();
			
			clone.setPublishedElementId(publishedElement.getId());
			
			ret.add(clone);
		}
		
		return ret;
	}

	@Override
	@Transactional
	public List<UserAnnotation> getAnnotationsForUserAndPublishedSyllabusElement(String userId, Long publishedSyllabusElementId) {
		List<UserAnnotation> ret = new ArrayList<>();
		AbstractSyllabusElement element = publishedSyllabusDao.getSyllabusElementForPublishedSyllabusElementId(publishedSyllabusElementId);
		
		for (UserAnnotation annotation : userAnnotationDao.getAnnotationsForUserAndSyllabusElement(userId, element.getId())) {
			UserAnnotation clone = annotation.clone();
			
			clone.setPublishedElementId(publishedSyllabusElementId);
			
			ret.add(clone);
		}
		
		return ret;
	}
	
	@Transactional
	public void createAnnotation(UserAnnotation annotation) throws SyllabusException	{
		AbstractSyllabusElement element = publishedSyllabusDao.getSyllabusElementForPublishedSyllabusElementId(annotation.getPublishedElementId());
		
		if (element == null) {
			return;
		}
		
		List<UserAnnotation> dupCheck = userAnnotationDao.getAnnotationsForUserAndSyllabusElement(sakaiProxy.getCurrentUserId(), element.getId());
		
		for (UserAnnotation dup : dupCheck) {
			if (dup.getType() == annotation.getType()) {
				return;
			}
		}
		
		annotation.setElementId(element.getId());
		
		save(annotation);
	}
	
	@Override
	@Transactional
	public void save(UserAnnotation annotation) {
		userAnnotationDao.save(annotation);
	}

	@Override
	@Transactional
	public void delete(UserAnnotation annotation) {
		userAnnotationDao.delete(annotation);
	}

	@Override
	@Transactional
	public void deleteForSyllabusElement(Long syllabusElementId) {
		List<UserAnnotation> annotations = userAnnotationDao.getAnnotationsForSyllabusElement(syllabusElementId);
		
		for (UserAnnotation annotation : annotations) {
			userAnnotationDao.delete(annotation);
		}
	}
	
	@Override
	public List<String> getEnabledElementTypesForAnnotationType(UserAnnotationTypes type) {
		String enabled = sakaiProxy.getSakaiProperty(TenjinProperties.PROPERTY_USERDATA_CHECK_ENABLED_ELEMENT_TYPES.replace("$TYPE$", type.name().toLowerCase()));

		if (enabled == null || enabled.length() == 0) {
			return new ArrayList<>();
		}

		return Arrays.asList(enabled.split(","));
	}

	@Override
	public List<String> getDefaultElementTypesForAnnotationType(UserAnnotationTypes type) {
		String def = sakaiProxy.getSakaiProperty(TenjinProperties.PROPERTY_USERDATA_CHECK_DEFAULT_ELEMENT_TYPES.replace("$TYPE$", type.name().toLowerCase()));

		if (def == null || def.length() == 0) {
			return new ArrayList<>();
		}

		return Arrays.asList(def.split(","));
	}
}
