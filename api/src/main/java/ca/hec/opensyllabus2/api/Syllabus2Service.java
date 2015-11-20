package ca.hec.opensyllabus2.api;

import java.util.List;
import java.util.Map;

import org.sakaiproject.exception.IdUnusedException;

import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.template.Template;
import ca.hec.opensyllabus2.api.model.template.TemplateElement;

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
	 * Retrieve the syllabus for the current user in the active site
	 *
	 * @return the syllabus of the site or an error message
	 * @throws NoSyllabusException
	 * @throws NoSiteException
	 */
	public Object loadSyllabus () throws NoSyllabusException, NoSiteException;


	/**
	 * Retrieves the syllabus associated to a specific section and sectionId.
	 * @param courseId
	 * @param sectionId
	 * @return
	 * @throws NoSyllabusException
	 */
	public Syllabus getSyllabus (String courseId, String sectionId ) throws NoSyllabusException;

	/**
	 * Retrieves the syllabus at the top of the hierarchy associated to the courseId.
	 * @param courseId
	 * @return
	 * @throws NoSyllabusException
	 */
	public Syllabus getShareableSyllabus (String courseId) throws NoSyllabusException;

	/**
	 * Retrieves the syllabus content shared by the list of sectionIds.
	 * @param sectionIds
	 * @return
	 * @throws NoSyllabusException
	 */
	public Syllabus getCommonSyllabus (String courseId, String[] sectionIds) throws NoSyllabusException;

	/**
	 * Retrieves the template
	 * @param templateId
	 * @return
	 */
	public Template getTemplate(Long templateId) throws IdUnusedException;

	/**
	 * Retrieves the template rules
	 * 	that is, a mapping of TemplateStructure id's with the TemplateElements that can be added to it.
	 *
	 * @param templateId
	 * @return
	 */
	public Map<String, List<Object>> getTemplateRules(Long templateId) throws IdUnusedException;
}
