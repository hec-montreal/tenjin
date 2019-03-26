package ca.hec.tenjin.api.dao;

import java.util.List;

import ca.hec.tenjin.api.model.userdata.UserAnnotation;

public interface UserAnnonationDao {

	/**
	 * Retrieve annotations on a syllabus for user
	 * 
	 * @param userId
	 * @param syllabusId
	 * @return
	 */
	public List<UserAnnotation> getAnnotationsForUserAndSyllabus(String userId, Long syllabusId);
	
	public List<UserAnnotation> getAnnotationsForUserAndSyllabusElement(String userId, Long syllabusElementId);
	
	public List<UserAnnotation> getAnnotationsForSyllabusElement(Long syllabusElementId);
	
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
}
