package ca.hec.tenjin.api.dao;

import java.util.List;

import ca.hec.tenjin.api.exception.NoSyllabusLockException;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;

public interface SyllabusLockDao {
	
	/**
	 * Retreive a syllabus lock by id
	 * 
	 * @param id The syllabus lock id
	 * @return The syllabus lock
	 * @throws NoSyllabusLockException 
	 */
	public SyllabusLock getSyllabusLock(Long id) throws NoSyllabusLockException;
	
	/**
	 * Retreive a syllabus lock by syllabus id
	 * 
	 * @param syllabusId The syllabus id
	 * @return The syllabus lock, or null if the syllabus is unlocked
	 */
	public SyllabusLock getSyllabusLockForSyllabus(Long syllabusId);
	
	/**
	 * Retreive the list of syllabus locks owned by the user
	 * 
	 * @param userId The user id
	 * @return A list of syllabus locks owned by the user
	 */
	public List<SyllabusLock> getSyllabusLocksForUser(Long userId);
	
	/**
	 * Save a syllabus lock
	 * @param lock The syllabus lock
	 */
	public void save(SyllabusLock lock);
	
	/**
	 * Delete a syllabus lock
	 * 
	 * @param lock The syllabus lock
	 */
	public void delete(SyllabusLock lock);
}
