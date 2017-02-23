package ca.hec.tenjin.api;

import java.util.List;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
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
	 * @throws NoSyllabusException
	 * @throws DeniedAccessException
	 */
	public SyllabusLock getSyllabusLock(Long syllabusId) throws DeniedAccessException;

	/**
	 * Retrive all the locks currently owned by a user
	 * 
	 * @param userId The user id
	 * @return The list of lockes currently owned by a user
	 * @throws DeniedAccessException
	 */
	public List<SyllabusLock> getSyllabusLocksForUser(Long userId) throws DeniedAccessException;

	/**
	 * Create a lock on a syllabus
	 * 
	 * @param syllabusId The syllabus id
	 * @param userId The user id
	 * @param username The name of the user
	 * @return The newly created lock
	 * @throws NoSyllabusException
	 * @throws DeniedAccessException
	 */
	public SyllabusLock lockSyllabus(Long syllabusId, String userId, String username) throws DeniedAccessException;

	/**
	 * Removes a lock on a syllabus
	 * 
	 * @param syllabusId The syllabus id
	 * @throws NoSyllabusException
	 * @throws DeniedAccessException
	 */
	public void unlockSyllabus(Long syllabusId) throws DeniedAccessException;

	/**
	 * Renew a syllabus lock
	 * 
	 * @param lock The lock
	 * @throws NoSyllabusException
	 * @throws DeniedAccessException
	 */
	public void renewSyllabusLock(SyllabusLock lock) throws DeniedAccessException;

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
	 * @param syllabus
	 * @param currentUserId
	 * @throws DeniedAccessException
	 * @throws NoSyllabusException
	 */
	public boolean checkIfUserHasLock(Syllabus syllabus, String currentUserId) throws DeniedAccessException;
}
