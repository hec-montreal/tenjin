package ca.hec.opensyllabus2.api;

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
}
