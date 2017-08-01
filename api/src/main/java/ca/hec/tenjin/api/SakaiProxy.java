package ca.hec.tenjin.api;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.sakaiproject.authz.api.GroupNotDefinedException;
import org.sakaiproject.content.api.ContentResource;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.ServerOverloadException;
import org.sakaiproject.exception.TypeException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.tenjin.api.export.model.SakaiCitation;
import ca.hec.tenjin.api.model.syllabusconstants.EntityContent;

/**
 * An interface to abstract all Sakai related API calls in a central method that
 * can be injected into our app.
 *
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public interface SakaiProxy {

	public final static String PROPERTY_SYLLABUS_LOCK_DELAY_SECONDS = "tenjin.syllabusLockDelaySeconds";
	public final static String PROPERTY_SYLLABUS_LOCK_RENEW_DELAY_SECONDS = "tenjin.syllabusLockRenewDelaySeconds";
	public final static String PROPERTY_SYLLABUS_LOCK_CHECK_COMMON_LOCK = "tenjin.syllabusLockCheckCommonLock";

	/**
	 * Is the current user a superUser? (anyone in admin realm)
	 * 
	 * @return
	 */
	public boolean isSuperUser();

	/**
	 * Post an event to Sakai
	 *
	 * @param event name of event
	 * @param reference reference
	 * @param modify true if something changed, false if just access
	 *
	 */
	public void postEvent(String event, String reference, boolean modify);

	public String getCurrentSiteLocale();

	public String getCurrentSiteId();

	public Site getCurrentSite();

	public String getCurrentUserId();

	public String getCurrentUserName();

	public Site getSite(String siteId) throws IdUnusedException;

	public boolean isAllowed(String userId, String function, String groupId);

	public boolean siteExists(String siteId);

	public ContentResource getResource(String string);
	
	public List<EntityContent> getSiteResources(String siteId, String timestamp, String depth, String resourceId);

	public User getUser(String id) throws UserNotDefinedException;

	public Group getGroup(String groupId) throws GroupNotDefinedException;

	public String getSakaiProperty(String name);

	public Set<String> getGroupsForSite(String siteId);

	public String getCurrentUserLocale();

	public String getDefaultLocale();

	List<SakaiCitation> getSiteCitations(String siteId, Collection<EntityContent> siteResources) throws PermissionException, IdUnusedException, TypeException, ServerOverloadException;
}
