package ca.hec.tenjin.api;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;

public interface TenjinSecurityService {

	/**
	 * Checks whether the user has the permission in the specified section .
	 * @param userId
	 * @param permission
	 * @param sectionRef
	 * @return true or false
	 */
	public boolean check(String userId, String permission, Group sectionRef);

	/**
	 * Checks whether the user has the permission for the specified syllabus.
	 * If you are owner of the syllabus you have all the rights
	 * @param userId
	 * @param permission
	 * @param syllabus
	 * @return true or false
	 */
	public boolean check(String userId, String permission,  AbstractSyllabus syllabus);

	/**
	 * Checks whether the user has the permission for the site realm.
	 * @param userId
	 * @param permission
	 * @param site
	 * @return true or false
	 */
	public boolean checkOnSiteGroup(String userId, String permission, Site site);
}
