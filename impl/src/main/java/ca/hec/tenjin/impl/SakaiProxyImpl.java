package ca.hec.tenjin.impl;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinFunctions;
import ca.hec.tenjin.api.ToolUtil;

import org.sakaiproject.api.app.messageforums.DiscussionForum;
import org.sakaiproject.api.app.messageforums.DiscussionTopic;
import org.sakaiproject.api.app.messageforums.Topic;
import org.sakaiproject.api.app.messageforums.ui.DiscussionForumManager;

import ca.hec.tenjin.api.export.model.SakaiCitation;
import ca.hec.tenjin.api.model.syllabusconstants.EntityContent;
import ca.hec.tenjin.api.model.syllabusconstants.EntityDataUtils;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.*;
import org.sakaiproject.citation.api.Citation;
import org.sakaiproject.citation.api.CitationCollection;
import org.sakaiproject.citation.api.CitationService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.content.api.*;
import org.sakaiproject.entity.api.EntityManager;
import org.sakaiproject.entity.api.Reference;
import org.sakaiproject.entity.api.ResourceProperties;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.exception.*;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.ToolConfiguration;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.time.api.Time;
import org.sakaiproject.time.api.TimeService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.PreferencesService;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;
import org.sakaiproject.util.ResourceLoader;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import org.sakaiproject.tool.api.Session;
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
	private CitationService citationService;
	private PreferencesService preferencesService;
	private TimeService timeService;
	private EntityManager entityManager;
	private DiscussionForumManager discussionForumManager;

	public void init() {

		List<String> registered = functionManager.getRegisteredFunctions();

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_READ_COMMON_UNPUBLISHED)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_READ_COMMON_UNPUBLISHED, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_READ_COMMON)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_READ_COMMON, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_READ_PERS)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_READ_PERS, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_WRITE_PERS)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_WRITE_PERS, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_PUBLISH_COMMON)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_PUBLISH_COMMON, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_PUBLISH_PERS)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_PUBLISH_PERS, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_VIEW_MANAGER)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_VIEW_MANAGER, true);
		}

		if (!registered.contains(TenjinFunctions.TENJIN_FUNCTION_MODIFY_PERMISSIONS)) {
			functionManager.registerFunction(TenjinFunctions.TENJIN_FUNCTION_MODIFY_PERMISSIONS, true);
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
	 * @param userId user uuid
	 * @param function permission to check for
	 * @param reference reference to entity. The getReference() method should
	 *            get you out of trouble.
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

	public boolean isResourcePublic(ContentResource res) {
		return contentHostingService.isRoleView(res.getId(), AuthzGroupService.ANON_ROLE);
	}
	
	public User getUser(String id) throws UserNotDefinedException {
		return userDirectoryService.getUser(id);
	}

	@Override
	public Group getGroup(String groupId) throws GroupNotDefinedException {
		AuthzGroup authzGroup = null;
		// authzgroupservice.getGroup needs a regerence not an id
		authzGroup = siteService.findGroup(groupId);
		return (Group) authzGroup;
	}

	@Override
	public AuthzGroup getAuthzGroup(String reference) throws GroupNotDefinedException {
		return groupService.getAuthzGroup(reference);
	}

	@Override
	public void saveAuthzGroup(AuthzGroup group) throws GroupNotDefinedException, AuthzPermissionException {
		groupService.save(group);
	}

	@Override
	public Set<String> getAllowedFunctions(String role, Collection<String> azGroups) {
		return groupService.getAllowedFunctions(role, azGroups);
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
		for (Group group : siteGroups) {
			// only add official sections
			String gProp = group.getProperties().getProperty(Group.GROUP_PROP_WSETUP_CREATED);
			if (group.getProviderGroupId() != null &&
				(gProp == null || gProp.equals(Boolean.FALSE.toString()))) {
				groups.add(group.getId());
			}
		}

		return groups;
	}

	@Override
	public Site getCurrentSite() {
		return getSite(getCurrentSiteId());
	}

	@Override
	public String getCurrentUserLocale() {
		try {
			return preferencesService.getLocale(getCurrentUserId()).toString();
		} catch (Exception e) {
			return new ResourceLoader().getLocale().toString();
		}
	}

	public String getDefaultLocale() {
		return serverConfigurationService.getString("tenjin.default.locale", "en_US");
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<SakaiCitation> getSiteCitations(String siteId, Collection<EntityContent> siteResources) throws PermissionException, IdUnusedException, TypeException, ServerOverloadException {
		List<SakaiCitation> ret = new ArrayList<>();

		for (EntityContent res : siteResources) {
			if(res.getType().endsWith(".folder")) {
				ret.addAll(getSiteCitations(siteId, res.getResourceChildren()));
			} else if (res.getType().endsWith(".CitationList")) {
				ContentResource content = contentHostingService.getResource(res.getResourceId());
				String citationCollectionId = new String(content.getContent());
				CitationCollection collection = citationService.getCollection(citationCollectionId);
				
				for (Citation citation : (List<Citation>) collection.getCitations()) {
					ret.add(new SakaiCitation(citation));
				}
			}
		}

		return ret; 
	}
	
	@SuppressWarnings("unchecked")
	public SakaiCitation getCitation(String citationListId, String citationId) throws ServerOverloadException {
		try {
			ContentResource res = getResource(citationListId);
			String collectionId = new String(res.getContent());
			CitationCollection collection = citationService.getCollection(collectionId);
						
			for(Citation citation : (List<Citation>) collection.getCitations()) {
				if(citation.getId().equals(citationId)) {
					return new SakaiCitation(citation);
				}
			}
		} catch (IdUnusedException | NullPointerException e) {
			return null;
		}
		
		return null;
	}

	public String getCurrentSiteResourcesToolId() {
		Site currentSite = getCurrentSite();
		ToolConfiguration t = currentSite.getToolForCommonId("sakai.resources");

		if (null != t)
			return t.getId();
		else
			return null;
	}

	@Override
	public List<EntityContent> getSiteResources(String siteId, String timestamp, String depth, String resourceId) {
		@SuppressWarnings("deprecation")
		Time timeStamp = makeTime(timestamp);

		int requestedDepth = 1;
		int currentDepth = 0;

		if (depth != null) {
			if ("all".equals(depth)) {
				requestedDepth = Integer.MAX_VALUE;
			} else {
				requestedDepth = Integer.parseInt(depth);
			}
		}

		Reference reference;

		if (resourceId != null)
			reference = entityManager.newReference(ContentHostingService.REFERENCE_ROOT + "/" + siteId + "/" + resourceId.toString());
		else
			reference = entityManager.newReference(ContentHostingService.REFERENCE_ROOT + "/" + siteId + "/");

		// We could have used contentHostingService.getAllEntities(id) bit it
		// doesn't do
		// permission checks on any contained resources (documentation wrong).
		// contentHostingService.getAllResources(String id) does do permission
		// checks
		// but it doesn't include collections in it's returned list.
		// Also doing the recursion ourselves means that we don't loads lots of
		// entities
		// when the depth of recursion is low.
		ContentCollection collection = null;

		try {
			collection = contentHostingService.getCollection(reference.getId());

		} catch (IdUnusedException e) {
			throw new IllegalArgumentException("IdUnusedException in Resource Entity Provider");
		} catch (TypeException e) {
			throw new IllegalArgumentException("TypeException in Resource Entity Provider");
		} catch (PermissionException e) {
			throw new SecurityException("PermissionException in Resource Entity Provider");
		}

		List<EntityContent> resourceDetails = new ArrayList<EntityContent>();

		if (collection != null) {
			EntityContent resourceDetail = getResourceDetails(collection, currentDepth, requestedDepth, timeStamp);

			if (resourceDetail != null) {
				resourceDetails.add(resourceDetail);
			} else {
				log.error("Initial permission check passed but subsequent permission check failed on " + reference.getId());
			}
		}
		return resourceDetails;
	}

	@SuppressWarnings("deprecation")
	private Time makeTime(String timestamp) {
		try {

			if (null != timestamp) {
				DateFormat format = new SimpleDateFormat("yyyyMMddHHmmssSSS");
				Date date = format.parse(timestamp);
				Calendar c = Calendar.getInstance();
				c.setTime(date);

				return timeService.newTimeGmt(format.format(date));
			}

		} catch (ParseException e) {
			return timeService.newTimeGmt("20201231235959999");
		}

		return null;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	private EntityContent getResourceDetails(ContentEntity entity, int currentDepth, int requestedDepth, Time timeStamp) {
		boolean allowed = (entity.isCollection()) ?
				(contentHostingService.allowGetCollection(entity.getId()) ||
						entity.getProperties().getProperty("SAKAI:hidden_accessible_content") != null)
				: contentHostingService.allowGetResource(entity.getId());

		if (!allowed ) {
			// If the user isn't allowed to see this we return null.
			return null;
		}

		EntityContent tempRd = EntityDataUtils.getResourceDetails(entity);

		tempRd.setOriginalEntity(entity);

		//propagate parent collection retract and release date
		ContentCollection cc = entity.getContainingCollection();
		if (cc.getRetractDate() != null){
			if (tempRd.getRetract() == null || cc.getRetractDate().after(tempRd.getRetract()))
				tempRd.setRetract(cc.getRetractDate());
		}
		if (cc.getReleaseDate() != null){
			if (tempRd.getRelease() == null ||  cc.getReleaseDate().before(tempRd.getRelease()))
				tempRd.setRelease(cc.getReleaseDate());
		}
		
		
		// Set the resource public access flag
		tempRd.setPublicAccess(contentHostingService.isRoleView(entity.getId(), AuthzGroupService.ANON_ROLE));

		if (entity.getGroups() != null) {
			for (Object groupObj : entity.getGroups()) {
				tempRd.getSections().add(ToolUtil.extractGroupId((String) groupObj));
			}
		}

		// Set the copyright flag
		String copyright = (String) tempRd.getProperties().get(ResourceProperties.PROP_COPYRIGHT_CHOICE);

		tempRd.setCopyright(copyright != null && (copyright.equals("rights.IHoldCopyright") || copyright.equals("rights.SaviaStatement")
				 || copyright.equals("rights.IObtainedRights")));

		// If it's a collection recurse down into it.
		if ((requestedDepth > currentDepth) && entity.isCollection()) {

			ContentCollection collection = (ContentCollection) entity;
			// This is all members, no permission check has been done yet.
			List<ContentEntity> contents = collection.getMemberResources();

			@SuppressWarnings("rawtypes")
			Comparator comparator = getContentEntityComparator(entity);

			if (null != comparator) {
				Collections.sort(contents, comparator);
			}

			for (Iterator<ContentEntity> i = contents.iterator(); i.hasNext();) {
				ContentEntity content = i.next();
				EntityContent resource = getResourceDetails(content, currentDepth + 1, requestedDepth, timeStamp);

				if (resource != null && resource.after(timeStamp)) {
					tempRd.addResourceChild(resource);
				}
			}
		}
		return tempRd;
	}

	@SuppressWarnings("rawtypes")
	private Comparator getContentEntityComparator(ContentEntity entity) {
		boolean hasCustomSort = false;
		try {
			hasCustomSort = entity.getProperties().getBooleanProperty(ResourceProperties.PROP_HAS_CUSTOM_SORT);

		} catch (Exception e) {
			// ignore -- let value of hasCustomSort stay false
		}

		if (hasCustomSort) {
			return contentHostingService.newContentHostingComparator(ResourceProperties.PROP_CONTENT_PRIORITY, true);
		} else {
			return contentHostingService.newContentHostingComparator(ResourceProperties.PROP_DISPLAY_NAME, true);
		}
	}

	public ContentResourceEdit addPdfToArchive(String id, String type, ByteArrayOutputStream content, ResourceProperties properties, int priority){
		ContentResourceEdit resourceEdit = null;
		try {
			resourceEdit = (ContentResourceEdit) contentHostingService.addResource(id, type, new ByteArrayInputStream(content.toByteArray()), properties, priority);
		} catch (PermissionException e) {
			e.printStackTrace();
		} catch (IdUsedException e) {
			//just update content then
			try {
				resourceEdit = (ContentResourceEdit) contentHostingService.updateResource(id, type, content.toByteArray());
				contentHostingService.setPubView(resourceEdit.getId(), true);
			} catch (PermissionException | IdUnusedException | TypeException | InUseException | OverQuotaException | ServerOverloadException e1) {
				e1.printStackTrace();
			}
		} catch (IdInvalidException | InconsistentException | OverQuotaException | ServerOverloadException e) {
			e.printStackTrace();
		}
		return resourceEdit;
	}

	public String getSyllabusReference (Long syllabusId, Long elementId) {
		String syllabusReference = "/site/" + getCurrentSiteId() + "/syllabus/";
		if (syllabusId != null) {
			syllabusReference += syllabusId;
		}
		if (elementId != null) {
			syllabusReference += "/"+elementId+"/";
		}
		
		return syllabusReference;
	}

	@Override
	// http://zcpilote.hec.ca/portal/site/30-400-17.H2018-AL/tool/bd26c4a1-2cda-4d4e-8c8e-36a22a91b1a7/discussionForum/forumsOnly/dfForums
	// http://localhost:8080/portal/site/30-400-17.H2018-AL/tool/87b7a380-9e9f-4591-84a3-927787b8cae9/index.jsp?sakai.tool.placement.id=87b7a380-9e9f-4591-84a3-927787b8cae9#/syllabus/2651/52008
	public Map<String, String> getSomeForumInfo() {
		Map<String, String> ret = new HashMap<>();
		List forums = discussionForumManager.getDiscussionForumsWithTopics(getCurrentSiteId());
	
		ret.put("forums.size", "" + forums.size());
		
		if (forums.size() > 0)
		{
			ret.put("forums.type", forums.get(0).getClass().getName());
			
			List topics = discussionForumManager.getTopicsByIdWithMessages(((DiscussionForum)forums.get(0)).getId());
			
			ret.put("forums[0].topics.size", "" + topics.size());
			
			if (topics.size() > 0)
			{
				ret.put("forums[0].topics.type", topics.get(0).getClass().getName());
			}
		}

		return ret;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DiscussionForum> getSiteForums () {
		return (List<DiscussionForum>) (List<?>) discussionForumManager.getDiscussionForumsWithTopics(getCurrentSiteId());
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public void setCurrentSession (Session userSession) {
	    sessionManager.setCurrentSession(userSession);
	}
}
