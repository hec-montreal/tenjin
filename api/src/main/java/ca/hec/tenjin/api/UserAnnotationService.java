package ca.hec.tenjin.api;

import java.util.List;

import ca.hec.tenjin.api.model.userdata.UserAnnotation;
import ca.hec.tenjin.api.model.userdata.UserAnnotationTypes;

public interface UserAnnotationService {

	/**
	 * Retrieve annotations on a syllabus for user
	 * 
	 * @param userId
	 * @param syllabusId
	 * @return
	 */
	public List<UserAnnotation> getAnnotationsForUserAndSyllabus(String userId, Long syllabusId);
	
	/**
	 * Get an annotation by id
	 * 
	 * @param id
	 * @return
	 */
	public UserAnnotation getAnnotationById(Long id);
	
	/**
	 * Save an annotation
	 * 
	 * @param annotation
	 */
	public void save(UserAnnotation annotation);
	
	/**
	 * Delete an annotation
	 * 
	 * @param annotation
	 */
	public void delete(UserAnnotation annotation);
	
	/*
	 * Get enabled element types list for annotation type
	 */
	public List<String> getEnabledElementTypesForAnnotationType(UserAnnotationTypes type);
	
	/*
	 * Get default enabled element types list for annotation type
	 */
	public List<String> getDefaultElementTypesForAnnotationType(UserAnnotationTypes type);
}
