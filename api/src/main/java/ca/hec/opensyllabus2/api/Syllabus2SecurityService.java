package ca.hec.opensyllabus2.api;

import java.util.List;

public interface Syllabus2SecurityService {

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
	public List<Object> getSections(boolean permissions);

	
	/**
	 * Return an array with the sections for the current user
	 * @return
	 */
	public List<String> getArraySections();

}
