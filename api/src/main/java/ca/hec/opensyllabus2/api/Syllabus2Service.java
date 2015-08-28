package ca.hec.opensyllabus2.api;

import java.util.List;

import org.sakaiproject.exception.IdUnusedException;

import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.template.Template;

/**
 * An interface to abstract all Sakai related API calls in a central method that can be injected into our app.
 *
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public interface Syllabus2Service {

	/**
	 * Get current siteid
	 * @return
	 */
	public String getCurrentSiteId();

	/**
	 * Get current user id
	 * @return
	 */
	public String getCurrentUserId();

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
	 * @param sectionId
	 * @return
	 */
	public Syllabus getSyllabus (String courseId, String sectionId );

	/**
	 * Retrieves the syllabus at the top of the hierarchy associated to the courseId.
	 * @param courseId
	 * @return
	 */
	public Syllabus getShareableSyllabus (String courseId);

	/**
	 * Retrieves the syllabus content shared by the list of sectionIds.
	 * @param sectionIds
	 * @return
	 */
	public Syllabus getCommonSyllabus (String courseId, String[] sectionIds);

	/**
	 * Retrieves the template
	 * @param templateId
	 * @return
	 */
	public Template getTemplate(Long templateId) throws IdUnusedException;
}
