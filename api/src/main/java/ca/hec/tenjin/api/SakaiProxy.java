package ca.hec.tenjin.api;

import java.io.ByteArrayOutputStream;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.sakaiproject.api.app.messageforums.DiscussionForum;
import org.sakaiproject.authz.api.AuthzGroup;
import org.sakaiproject.authz.api.AuthzPermissionException;
import org.sakaiproject.authz.api.GroupNotDefinedException;
import org.sakaiproject.content.api.ContentResource;
import org.sakaiproject.content.api.ContentResourceEdit;
import org.sakaiproject.entity.api.ResourceProperties;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.ServerOverloadException;
import org.sakaiproject.exception.TypeException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.tool.api.Session;
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
	
	public boolean isResourcePublic(ContentResource res);
	
	public List<EntityContent> getSiteResources(String siteId, String timestamp, String depth, String resourceId);

	public User getUser(String id) throws UserNotDefinedException;

	public Group getGroup(String groupId) throws GroupNotDefinedException;

	public AuthzGroup getAuthzGroup(String reference) throws GroupNotDefinedException;

	public Set<String> getAllowedFunctions(String role, Collection<String> azGroups);

	public void saveAuthzGroup(AuthzGroup group) throws GroupNotDefinedException, AuthzPermissionException;

	public String getSakaiProperty(String name);

	public Set<String> getGroupsForSite(String siteId);

	public String getCurrentUserLocale();

	public String getDefaultLocale();

	public String getCurrentSiteResourcesToolId();

	SakaiCitation getCitation(String citationListId, String citationId) throws ServerOverloadException;
	
	List<SakaiCitation> getSiteCitations(String siteId, Collection<EntityContent> siteResources) throws PermissionException, IdUnusedException, TypeException, ServerOverloadException;

	public ContentResourceEdit addPdfToArchive(String id, String type, ByteArrayOutputStream content, ResourceProperties properties, int priority);
	
	public String getSyllabusReference (Long  syllabusId, Long elementId);
	
	public Map<String, String> getSomeForumInfo ();
	
	public List<DiscussionForum> getSiteForums ();
	
	public void setCurrentSession (Session userSession);
}
