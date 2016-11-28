
package ca.hec.tenjin.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.Member;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.user.api.User;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinFunctions;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import lombok.Setter;

@Setter
public class TenjinSecurityServiceImpl implements TenjinSecurityService {

	private SakaiProxy sakaiProxy;

	private static Log log = LogFactory.getLog(TenjinSecurityServiceImpl.class);

	@Override
	public boolean isSuperUser(String userId) {
		return sakaiProxy.isSuperUser();
	}

	@Override
	public boolean isAllowed(String userId, String permission, String entityRef) {
		return sakaiProxy.isAllowed(userId, permission, entityRef);
	}

	@Override
	public boolean isAllowedCommon(String userId, String permission) {

		Site site = null;
		String siteId = sakaiProxy.getCurrentSiteId();

		try {
			site = sakaiProxy.getSite(siteId);

			return sakaiProxy.isAllowed(userId, permission, site.getReference());

		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return false;
		}

	}

	@Override
	public List<String> getArraySections(String siteId, String permission) {

		if (!permission.equals(TenjinFunctions.TENJIN_FUNCTION_READ) && !permission.equals(TenjinFunctions.TENJIN_FUNCTION_WRITE) && !permission.equals(TenjinFunctions.TENJIN_FUNCTION_PUBLISH)) {
			log.error("unknown permission specified");
			return null;
		}

		Site site = null;
		String currentUserId = sakaiProxy.getCurrentUserId();

		List<String> sectionsList = new ArrayList<String>();

		try {
			site = sakaiProxy.getSite(siteId);

			for (Group g : site.getGroups()) {
				if (!g.getProviderGroupId().isEmpty()) {
					// if the current user have read permissions on the section
					if (sakaiProxy.isAllowed(currentUserId, permission, g.getReference())) {
						sectionsList.add(g.getId());
					}
				}
			}
		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return null;
		}

		return sectionsList;
	}

	@Override
	public List<Map<String, Object>> getSections(boolean permissions) {
		Site site = null;
		String siteId = sakaiProxy.getCurrentSiteId();
		String currentUserId = sakaiProxy.getCurrentUserId();

		List<Map<String, Object>> sectionsList = new ArrayList<Map<String, Object>>();

		try {
			site = sakaiProxy.getSite(siteId);

			for (Group g : site.getGroups()) {
				if (g.getProviderGroupId() != null && !g.getProviderGroupId().isEmpty()) {
					Map<String, Object> sectionMap = new HashMap<String, Object>();
					sectionMap.put("id", g.getId());
					sectionMap.put("name", g.getTitle());

					// Set section instructors
					String instructors = "";

					for (Member member : g.getMembers()) {
						if (member.getRole().getId().equals("Instructor")) {
							User user = sakaiProxy.getUser(member.getUserId());

							instructors += user.getDisplayName() + ", ";
						}
					}

					if (instructors.length() > 2) {
						instructors = instructors.substring(0, instructors.length() - 2);
					}

					sectionMap.put("instructors", instructors);

					// set section permissions
					if (permissions == true) {
						Map<String, Object> permissionsMap = new HashMap<String, Object>();
						if (isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ, g.getReference())) {
							permissionsMap.put("read", true);
						} else {
							permissionsMap.put("read", false);
						}
						if (isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE, g.getReference())) {
							permissionsMap.put("write", true);
						} else {
							permissionsMap.put("write", false);
						}
						if (isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH, g.getReference())) {
							permissionsMap.put("publish", true);
						} else {
							permissionsMap.put("publish", false);
						}
						sectionMap.put("permissions", permissionsMap);
					}

					sectionsList.add(sectionMap);
				}
			}

		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return null;
		}

		return sectionsList;
	}

	@Override
	public boolean canUserCreateSyllabus(String siteId, boolean common) {

		Site s;
		try {
			s = sakaiProxy.getSite(siteId);
		} catch (IdUnusedException e) {
			log.error("Site does not exist");
			return false;
		}

		if (common) {
			// TODO : for now, a user who can write in any section can create a
			// common syllabus
			return isAllowed(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, s.getReference()) || getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_WRITE).size() > 0;
		} else {
			// if user can edit one or more sections, she can create syllabuses
			return getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_WRITE).size() > 0;
		}
	}

	@Override
	public boolean canUserUpdateSyllabus(Syllabus syllabus) {
		Site s;
		try {
			s = sakaiProxy.getSite(syllabus.getSiteId());
		} catch (IdUnusedException e) {
			log.error("Site does not exist");
			return false;
		}

		if (syllabus.getCommon()) {
			return isAllowed(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, s.getReference());
		} else {
			// return true if current user is super user or
			// the creator of the syllabus or if the user is assigned to a
			// section
			// of this syllabus
			return sakaiProxy.isSuperUser() || syllabus.getCreatedBy().equals(sakaiProxy.getCurrentUserId()) || CollectionUtils.intersection(getArraySections(syllabus.getSiteId(), TenjinFunctions.TENJIN_FUNCTION_WRITE), syllabus.getSections()).size() > 0;
		}
	}

	@Override
	public boolean canUserAssignSections(String siteId, Collection<String> sectionsToCheck) {
		List<String> allowedSections = getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_WRITE);
		// if the user is allowed to assign everything in sectionsToCheck,
		// subtract will leave no results
		return CollectionUtils.subtract(sectionsToCheck, allowedSections).size() == 0;
	}

}
