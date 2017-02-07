package ca.hec.tenjin.api;

import java.util.List;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;

/**
 * An interface to abstract all Syllabus related methods.
 *
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 * @author Mame Awa Diop (mame-awa.diop@hec.ca)
 *
 */
public interface SyllabusService {

	/**
	 * Retrieves the syllabus associated to a specific section and sectionId.
	 * 
	 * @param syllabusId
	 * @return Syllabus - the syllabus object with elements
	 * @throws NoSyllabusException - no syllabus exists for the given id
	 * @throws DeniedAccessException 
	 * @throws StructureSyllabusException 
	 */
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException, StructureSyllabusException;

	/**
	 * Retrieves the common syllabus for a site (without elements).
	 * 
	 * @param siteId
	 * 
	 * @return Syllabus - the syllabus object with or without the elements
	 * @throws NoSyllabusException
	 */
	public Syllabus getCommonSyllabus(String siteId) throws NoSyllabusException;

	/**
	 * Retrieve the syllabus list for the current user in the active site
	 * User must have at least a read permission on the syllabus
	 *
	 * @return the syllabus list for the user
	 * @param siteId The site ID
	 * @param currentUserId Current user id
	 * @throws NoSiteException
	 * @throws NoSyllabusException
	 * @throws DeniedAccessException 
	 * @throws StructureSyllabusException 
	 */
	public List<Syllabus> getSyllabusList(String siteId,  String currentUserId)  throws NoSiteException, DeniedAccessException;
	
	/**
	 * Create a new syllabus or update the existing syllabus based on id
	 *
	 * @param syllabus
	 * @return the saved syllabus
	 * @throws NoSiteException if no site is specified by the syllabus
	 * @throws NoSyllabusException 
	 * @throws StructureSyllabusException 
	 */
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException, StructureSyllabusException;

	/**
	 * Delete a syllabus
	 * 
	 * @param syllabus
	 * @throws NoSyllabusException 
	 * @throws DeniedAccessException 
	 */
	public void deleteSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException;

	/**
	 * Retrieve the SyllabusElementMappings for a syllabus 
	 * 
	 * @param syllabusId
	 * @param hidden - should hidden mappings be included
	 */
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden);
	
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
}
