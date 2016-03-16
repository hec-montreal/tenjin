package ca.hec.opensyllabus2.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sakaiproject.exception.IdUnusedException;

import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElementMapping;
import ca.hec.opensyllabus2.api.model.template.Template;

/**
 * An interface to abstract all Sakai related API calls in a central method that can be injected into our app.
 *
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public interface Syllabus2Service {

	/**
	 * Get current user display name
	 * @return
	 */
	public String getCurrentUserDisplayName();

	/**
	 * Is the current user a superUser? (anyone in admin realm)
	 * @return
	 */
	public boolean isSuperUser();

	/**
	 * Post an event to Sakai
	 *
	 * @param event			name of event
	 * @param reference		reference
	 * @param modify		true if something changed, false if just access
	 *
	 */
	public void postEvent(String event,String reference,boolean modify);

	/**
	 * Wrapper for ServerConfigurationService.getString("skin.repo")
	 * @return
	 */
	public String getSkinRepoProperty();

	/**
	 * Gets the tool skin CSS first by checking the tool, otherwise by using the default property.
	 * @param	the location of the skin repo
	 * @return
	 */
	public String getToolSkinCSS(String skinRepo);

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
	 * @return the syllabus list of the site or an error message
	 * @throws NoSiteException
	 */
	public List<Syllabus> getSyllabusList(String siteId) throws NoSyllabusException, NoSiteException;
	
	/**
	 * Create a syllabus element mapping and insert it in the database
	 *
	 * @return the syllabus element mapping
	 */
	public SyllabusElementMapping createSyllabusElementMapping(Long syllabusId, AbstractSyllabusElement syllabusElement, Integer displayOrder, Boolean hidden);
	
	/**
	 * Create a new syllabus or update the existing syllabus based on id
	 *
	 * @param syllabus
	 * @return the saved syllabus
	 * @throws NoSiteException if no site is specified by the syllabus
	 * @throws NoSyllabusException 
	 */
	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) throws NoSyllabusException;

	public String getCurrentSiteContext () throws IdUnusedException, NoSiteException;

}
