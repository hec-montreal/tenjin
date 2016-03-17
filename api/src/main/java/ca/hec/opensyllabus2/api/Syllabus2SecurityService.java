package ca.hec.opensyllabus2.api;

import java.util.List;

public interface Syllabus2SecurityService {

	public static final String OSYL2_EDIT_PERMISSION = "osyl2.edit";
	
    public static final String SITE_HELPER = "!site.helper";
   
    public static String AUTH = ".auth";
    
    
	/**
	 * This user has all the rights in an syllabus or template 
	 * @param userId
	 * @return
	 */
	public boolean isSuperUser (String userId);
	
	
	/**
	 * Checks whether this permission is allowed to all the users with a specific role 
	 * threw the site.helper or if the user is allowed this permission in the site.
	 * @param userId
	 * @param permission
	 * @return
	 */
	public boolean isAllowed (String userId, String permission);
	
	/**
	 * Checks whether the user has the permission for the specified group.
	 * @param userId
	 * @param permission
	 * @param entityRef
	 * @return
	 */
	public boolean isAllowed (String userId, String permission, String entityRef);
	
	public List<String> getUserPermissionsForGroup(String groupId);


}
