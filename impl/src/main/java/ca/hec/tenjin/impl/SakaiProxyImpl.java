package ca.hec.tenjin.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.AuthzGroup;
import org.sakaiproject.authz.api.AuthzGroupService;
import org.sakaiproject.authz.api.FunctionManager;
import org.sakaiproject.authz.api.GroupNotDefinedException;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.content.api.ContentResource;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.TypeException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinFunctions;
import lombok.Setter;

@Setter
public class SakaiProxyImpl implements SakaiProxy {

	private Log log = LogFactory.getLog(SakaiProxyImpl.class);

	private SessionManager sessionManager;
	private SiteService siteService;
	private ToolManager toolManager;
	private EventTrackingService eventTrackingService;
	private SecurityService securityService;
	private AuthzGroupService groupService;
	private FunctionManager functionManager;
	private UserDirectoryService userDirectoryService;
	private ContentHostingService contentHostingService;
	private ServerConfigurationService serverConfigurationService;

	public void init() {

		List<String> registered = functionManager.getRegisteredFunctions();

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_READ)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_READ, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_WRITE)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_WRITE, true);
		}
		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_PUBLISH)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_PUBLISH, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_VIEW_MANAGER)) {
		functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_VIEW_MANAGER, true);
	}

	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean isSuperUser() {
		return securityService.isSuperUser();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void postEvent(String event, String reference, boolean modify) {
		eventTrackingService.post(eventTrackingService.newEvent(event, reference, modify));
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String getCurrentUserId() {
		return sessionManager.getCurrentSessionUserId();
	}

	@Override
	public String getCurrentUserName() {
		User u = null;

		try {
			u = userDirectoryService.getUser(sessionManager.getCurrentSessionUserId());
		} catch (UserNotDefinedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return u.getDisplayName();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String getCurrentSiteId() {
		return toolManager.getCurrentPlacement().getContext();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String getCurrentSiteLocale() {

		String siteId = toolManager.getCurrentPlacement().getContext();
		Site currentSite = getSite(siteId);

		if (currentSite != null) {
			String locale = currentSite.getProperties().getProperty("locale_string");
			if (locale != null) {
				return locale;
			}
		}

		return null;
	}

	@Override
	public Site getSite(String siteId) {
		try {
			return siteService.getSite(siteId);
		} catch (IdUnusedException e) {
			log.warn("site not found: " + e.getId());
			return null;
		}
	}

	/**
	 * Calls the SecurityService unlock method. This is the method you must use
	 * in order for Delegated Access to work. Note that the SecurityService
	 * automatically handles super users.
	 * 
	 * @param userId
	 *            user uuid
	 * @param function
	 *            permission to check for
	 * @param reference
	 *            reference to entity. The getReference() method should get you
	 *            out of trouble.
	 * @return true if user has permission, false otherwise
	 */
	@Override
	public boolean isAllowed(String userId, String function, String reference) {
		return securityService.unlock(userId, function, reference);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean siteExists(String siteId) {
		return siteService.siteExists(siteId);
	}

	@Override
	public ContentResource getResource(String resourceId) {
		try {
			return contentHostingService.getResource(resourceId);
		} catch (PermissionException | IdUnusedException | TypeException e) {
			log.error("Error retrieving resource: " + resourceId);
		}
		return null;
	}

	public User getUser(String id) throws UserNotDefinedException {
		return userDirectoryService.getUser(id);
	}

	@Override
	public Group getGroup(String groupId) throws GroupNotDefinedException {
		AuthzGroup authzGroup = null;
		//authzgroupservice.getGroup needs a regerence not an id
		authzGroup = siteService.findGroup(groupId);
		return (Group) authzGroup;
	}

	@Override
	public String getSakaiProperty(String name) {
		return serverConfigurationService.getString(name);
	}

	@Override
	public Set<String> getGroupsForSite(String siteId) {
		Set<String> groups = new HashSet<String>();
		
		Site site = getSite(siteId);
		Collection<Group> siteGroups = site.getGroups();
		for (Group group: siteGroups) {
			if (group.getProviderGroupId() != null) {
				groups.add(group.getId());
			}
		}

		return groups;
	}
}
