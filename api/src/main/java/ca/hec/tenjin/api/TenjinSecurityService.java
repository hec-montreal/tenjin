package ca.hec.tenjin.api;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import ca.hec.tenjin.api.model.syllabus.Syllabus;

public interface TenjinSecurityService {


	/**
	 * Static variable used to represent the section (or users) associated to the site
	 */
	public static final String TENJIN_SITE_SECTION = "SITE";
	/**
	 * This user has all the rights in an syllabus or template 
	 * @param userId
	 * @return
	 */
	public boolean isSuperUser(String userId);
	
	/**
	 * Checks whether the user has the permission for the specified group.
	 * @param userId
	 * @param permission
	 * @param entityRef
	 * @return
	 */
	public boolean isAllowed(String userId, String permission, String entityRef);

	/**
	 * Checks whether the user has the permission for the common syllabus
	 * @param userId
	 * @param permission
	 * @return
	 */
	public boolean isAllowedCommon(String userId, String permission);	
	
	/**
	 * Return the sections (with permissions) for the current user
	 * @param permissions Get the permissions (optional)
	 * @return
	 */
	public List<Map<String, Object>> getSections(boolean permissions);

	
	/**
	 * Return an array with the sections for which the current user has the given permission
	 * from TenjinFunctions.
	 *
	 * @param String permission 
	 * @return List of section ids
	 */
	public List<String> getArraySections(String siteId, String permission);

	/**
	 * Return whether or not the user is allowed to create a syllabus (common or not)
	 * in the given site
	 *
	 * @param String siteId
	 * @param boolean common - true to check permission for common syllabus
	 * @return boolean
	 */
	public boolean canUserCreateSyllabus(String siteId, boolean common);

	/**
	 * Return whether or not the user is allowed to update a given syllabus
	 *
	 * @param Syllabus syllabus
	 * @return boolean
	 */
	public boolean canUserUpdateSyllabus(Syllabus syllabus);

	/**
	 * Return whether or not the user is allowed to assign or unassign all of the specified 
	 * sections in the collection
	 *
	 * @param Collection<String> section ids to verify
	 * @return boolean
	 */
	public boolean canUserAssignSections(String siteId, Collection<String> sectionsToCheck);

	/**
	 * Check if the user has the right to see the management page: is a super user or has @see TenjinFunctions#TENJIN_FUNCTION_VIEW_MANAGER on site
	 * @param siteId
	 * @return true or false
	 */
	public boolean canAccessManagementPage(String siteId);

	/**
	 * Check if the user is allowed to see the published common course outline: is super user or has @see TenjinFunctions#TENJIN_FUNCTION_READ on site
	 * @param siteId
	 * @return true or false
	 */
	public boolean canSeePublishedCommon(String siteId);

}
