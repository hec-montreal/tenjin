package ca.hec.opensyllabus2.api;

import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Site;

/**
 * An interface to abstract all Sakai related API calls in a central method that can be injected into our app.
 *
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public interface SakaiProxy {

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

	public String getCurrentSiteLocale();

	public String getCurrentSiteId();

	public String getCurrentUserId();
	
	public Site getSite(String siteId) throws IdUnusedException;

	public boolean isAllowed(String userId, String function, String groupId);

	public boolean siteExists(String siteId);

}
