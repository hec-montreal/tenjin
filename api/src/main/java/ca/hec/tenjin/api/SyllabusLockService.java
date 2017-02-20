package ca.hec.tenjin.api;

import java.util.List;

import ca.hec.tenjin.api.model.syllabus.SyllabusLock;

/**
 * An interface to abstract all SyllabusLock related methods
 */
public interface SyllabusLockService {

	/**
	 * Retreive the current lock on a syllabus
	 * 
	 * @param syllabusId The syllabus id
	 * @return The lock, or null if the syllabus is currently not locked
	 */
	public SyllabusLock getSyllabusLock(Long syllabusId);

	/**
	 * Retrive all the locks currently owned by a user
	 * 
	 * @param userId The user id
	 * @return The list of lockes currently owned by a user
	 */
	public List<SyllabusLock> getSyllabusLocksForUser(Long userId);

	/**
	 * Create a lock on a syllabus
	 * 
	 * @param syllabusId The syllabus id
	 * @param userId The user id
	 * @param username The name of the user
	 * @return The newly created lock
	 */
	public SyllabusLock lockSyllabus(Long syllabusId, String userId, String username);

	/**
	 * Removes a lock on a syllabus
	 * 
	 * @param syllabusId The syllabus id
	 */
	public void unlockSyllabus(Long syllabusId);

	/**
	 * Renew a syllabus lock
	 * 
	 * @param lock The lock
	 */
	public void renewSyllabusLock(SyllabusLock lock);

	/**
	 * Check if a lock has expired
	 * 
	 * @param lock The lock
	 * @return True if the lock has expired
	 */
	public boolean isLockExpired(SyllabusLock lock);

	/**
	 * Check if a user has a lock on a syllabus
	 * 
	 * @param syllabusId
	 * @param currentUserId
	 */
	public boolean checkIfUserHasLock(Long syllabusId, String currentUserId);
}
