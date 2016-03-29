package ca.hec.opensyllabus2.api;

import java.util.List;

import ca.hec.opensyllabus2.api.OsylException.DeniedAccessException;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

/**
 * An interface to abstract all Syllabus related methods.
 *
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 *
 */
public interface Syllabus2Service {

	/**
	 * Retrieves the syllabus associated to a specific section and sectionId.
	 * @param courseId
	 * @return
	 * @throws NoSyllabusException
	 */
	public Syllabus getSyllabus(Long syllabusId) throws NoSyllabusException;

	/**
	 * Retrieve the syllabus list for the current user in the active site
	 *
	 * @return the syllabus list for the user
	 * @param siteId The site ID
	 * @param sections List of the sections (optional)
	 * @param commonRead Common read permission
	 * @param commonWrite Common write permission
	 * @param currentUserId Current user id
	 * @throws NoSiteException
	 * @throws NoSyllabusException
	 */
	public List<Syllabus> getSyllabusList(String siteId, List<String> sections, boolean commonRead, boolean commonWrite, String currentUserId) throws NoSyllabusException, NoSiteException;
	
	/**
	 * Create a new syllabus or update the existing syllabus based on id
	 *
	 * @param syllabus
	 * @return the saved syllabus
	 * @throws NoSiteException if no site is specified by the syllabus
	 * @throws NoSyllabusException 
	 */
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException;

}
