package ca.hec.tenjin.api;

import java.util.List;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
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
	 */
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException;

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
	 */
	public List<Syllabus> getSyllabusList(String siteId,  String currentUserId)  throws NoSiteException, DeniedAccessException;
	
	/**
	 * Create a new syllabus or update the existing syllabus based on id
	 *
	 * @param syllabus
	 * @return the saved syllabus
	 * @throws NoSiteException if no site is specified by the syllabus
	 * @throws NoSyllabusException 
	 */
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException;

	/**
	 * Delete a syllabus
	 * 
	 * @param syllabus
	 * @throws NoSyllabusException 
	 * @throws DeniedAccessException 
	 */
	public void deleteSyllabus(Long syllabusId) throws NoSyllabusException, DeniedAccessException;

	/**
	 * retrieve the SyllabusElementMappings for a syllabus 
	 * 
	 * @param syllabusId
	 * @param hidden - should hidden mappings be included
	 */
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden);
}
