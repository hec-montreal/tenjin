package ca.hec.tenjin.api;

import java.util.List;

import org.sakaiproject.exception.IdUnusedException;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.exception.SyllabusLockedException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;

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
	 * @throws DeniedAccessException 
	 */
	public List<Syllabus> getSyllabusListForUser(String siteId,  String currentUserId)  throws NoSiteException, DeniedAccessException;
	
	/**
	 * Retrieve all syllabuses for the given site
	 *
	 * @return the syllabus list for the user
	 * @throws NoSiteException
	 */
	public List<Syllabus> getSyllabusList(String siteId)  throws NoSiteException, DeniedAccessException;
	
	/**
	 * Create a new syllabus or update the existing syllabus based on id
	 *
	 * @param syllabus
	 * @return the saved syllabus
	 * @throws NoSiteException if no site is specified by the syllabus
	 * @throws NoSyllabusException 
	 * @throws StructureSyllabusException 
	 * @throws SyllabusLockedException 
	 */
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException, StructureSyllabusException, SyllabusLockedException;

	/**
	 * Delete a syllabus
	 * 
	 * @param syllabus
	 * @throws NoSyllabusException 
	 * @throws DeniedAccessException 
	 * @throws SyllabusLockedException 
	 */
	public void deleteSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException;

	/**
	 * Copy a syllabus
	 * @throws IdUnusedException 
	 * @throws NoSyllabusException 
	 * @throws StructureSyllabusException 
	 */
	void copySyllabus(Long syllabusId, String title) throws DeniedAccessException, IdUnusedException, NoSyllabusException, StructureSyllabusException;
	
	/**
	 * Retrieve the SyllabusElementMappings for a syllabus 
	 * 
	 * @param syllabusId
	 * @param hidden - should hidden mappings be included
	 */
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden);

	/**
	 * Import a syllabus from the given siteId using an autowired CourseOutlineProvider if one exists
	 * 
	 * @param siteId
	 */
	public Syllabus importSyllabusFromSite(String siteId) throws DeniedAccessException, SyllabusLockedException;
}
