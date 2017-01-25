package ca.hec.tenjin.api;

import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;

import java.util.List;

public interface TenjinSecurityService {



	/**
	 * Checks whether the user has the permission in the specified section .
	 * @param userId
	 * @param permission
	 * @param sectionRef
	 * @return true or false
	 */
	public boolean check (String userId, String permission, Group sectionRef);


	/**
	 * Checks whether the user has the permission for the specified syllabus.
	 * If you are owner of the syllabus you have all the rights
	 * @param userId
	 * @param permission
	 * @param syllabus
	 * @return true or false
	 */
	public boolean check(String userId, String permission,  AbstractSyllabus syllabus);


	public boolean checkOnSiteGroup (String userId, String permission, Site site);

	/**
	 * Return the sections (with permissions) for the current user
	 * @param permissions Get the permissions (optional)
	 * @return
	 */
	public List<String> getSections(String userId, String siteId) throws NoSiteException;

/*	*//**
	 * Static variable used to represent the section (or users) associated to the site
	 *//*
	public static final String TENJIN_SITE_SECTION = "SITE";
	*//**
	 * This user has all the rights in an syllabus or template
	 * @param userId
	 * @return
	 *//*
	public boolean isSuperUser(String userId);
	*//**
	 * Checks whether the user has the permission for the common syllabus
	 * @param userId
	 * @param permission
	 * @return
	 *//*
	public boolean isAllowedCommon(String userId, String permission);




	/**
	 * Return an array with the sections for which the current user has the given permission
	 * from TenjinFunctions.
	 *
	 * @param String permission
	 * @return List of section ids
	 *//*
	public List<String> getArraySections(String siteId, String permission);

	*//**
	 * Return whether or not the user is allowed to create a syllabus (common or not)
	 * in the given site
	 *
	 * @param String siteId
	 * @param boolean common - true to check permission for common syllabus
	 * @return boolean
	 *//*
	public boolean canUserCreateSyllabus(String siteId, boolean common);

	*//**
	 * Return whether or not the user is allowed to update a given syllabus
	 *
	 * @param Syllabus syllabus
	 * @return boolean
	 *//*
	public boolean canUserUpdateSyllabus(Syllabus syllabus);

	*//**
	 * Return whether or not the user is allowed to assign or unassign all of the specified
	 * sections in the collection
	 *
	 * @param Collection<String> section ids to verify
	 * @return boolean
	 *//*
	public boolean canUserAssignSections(String siteId, Collection<String> sectionsToCheck);

	*//**
	 * Check if the user has the right to see the management page: is a super user or has @see TenjinFunctions#TENJIN_FUNCTION_VIEW_MANAGER on site
	 * @param siteId
	 * @return true or false
	 *//*
	public boolean viewManagementPage(String siteId);

	*//**
	 * Check if the user is allowed to see the published common course outline: is super user or has @see TenjinFunctions#TENJIN_FUNCTION_READ on site or has @see      TenjinFunctions#TENJIN_FUNCTION_WRITE on site
	 * @param siteId
	 * @param userId
	 * @return true or false
	 *//*
	public boolean read(String siteId, String userId);


	public List<String> write (String siteId);

	public List<String> publish(String siteId);*/

}
