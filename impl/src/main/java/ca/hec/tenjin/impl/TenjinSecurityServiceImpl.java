
package ca.hec.tenjin.impl;

import java.util.*;

import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.GroupNotDefinedException;
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
	private SyllabusDao syllabusDao;

	private static Log log = LogFactory.getLog(TenjinSecurityServiceImpl.class);

	@Override
	public boolean check(String userId, String permission, Group sectionRef) {
		return sakaiProxy.isAllowed(userId, permission, sectionRef.getReference());
	}

	@Override
	public boolean check(String userId, String permission, AbstractSyllabus syllabus) {
		//if he is owner he has all permissions on the syllabus
		if (isOwner(userId, syllabus))
			return true;

		try {
			Site site = sakaiProxy.getSite(syllabus.getSiteId());
			//If syllabus is common check on site
			if (syllabus.getCommon()){
				return checkOnSiteGroup(userId,permission, site);
			}

			//if he has the permission on the sections associated to the syllabus, he has it on the syllabus
			Set<String> sectionIds = syllabus.getSections();
			if (sectionIds != null) {
				for (String sectionId : sectionIds) {
					Group group = null;
					group = site.getGroup(sectionId);
					if (check(userId, permission, group))
						return true;
				}

			}
		} catch (IdUnusedException e) {
			log.warn("The site " + syllabus.getSiteId() + " does not exist");
		}


		return false;
	}

	@Override
	public boolean checkOnSiteGroup (String userId, String permission, Site site){
		return sakaiProxy.isAllowed(userId, permission, site.getReference());
	}

	@Override
	public List<String> getSections(String userId,String siteId) throws NoSiteException{
		Site site;
		List<String> sections = new ArrayList<String>();


		try {
			site = sakaiProxy.getSite(siteId);
			Collection<Group> groups = site.getGroups();
			for (Group group: groups){
				if (check(userId, TenjinFunctions.TENJIN_FUNCTION_READ, group) ||
						check(userId, TenjinFunctions.TENJIN_FUNCTION_WRITE, group) ||
						check(userId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH,group)){
					sections.add(group.getProviderGroupId());
				}
			}

			if (checkOnSiteGroup(userId, TenjinFunctions.TENJIN_FUNCTION_READ, site) ||
					checkOnSiteGroup(userId, TenjinFunctions.TENJIN_FUNCTION_WRITE, site) ||
					checkOnSiteGroup(userId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH,site)){
				sections.add("SITE");
			}
		} catch (IdUnusedException e) {
			e.printStackTrace();
		}
		return null;
	}

	private boolean isOwner(String userId, AbstractSyllabus syllabus){
		if (userId == null || syllabus.getId() == null)
			return false;
		return (syllabus.getCreatedBy()).equalsIgnoreCase(userId);
	}
/*
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
*/

/*
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
*/

/*
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
						if (check(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ, g.getReference())) {
							permissionsMap.put("read", true);
						} else {
							permissionsMap.put("read", false);
						}
						if (check(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE, g.getReference())) {
							permissionsMap.put("write", true);
						} else {
							permissionsMap.put("write", false);
						}
						if (check(currentUserId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH, g.getReference())) {
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
*/

/*
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
			return check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, s.getReference()) || getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_WRITE).size() > 0;
		} else {
			// if user can edit one or more sections, she can create syllabuses
			return getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_WRITE).size() > 0;
		}
	}
*/

	/*@Override
	public boolean canUserUpdateSyllabus(Syllabus syllabus) {
		Site s;
		try {
			s = sakaiProxy.getSite(syllabus.getSiteId());
		} catch (IdUnusedException e) {
			log.error("Site does not exist");
			return false;
		}

		if (syllabus.getCommon()) {
			return check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, s.getReference());
		} else {
			// return true if current user is super user or
			// the creator of the syllabus or if the user is assigned to a
			// section
			// of this syllabus
			return sakaiProxy.isSuperUser() || syllabus.getCreatedBy().equals(sakaiProxy.getCurrentUserId()) || CollectionUtils.intersection(getArraySections(syllabus.getSiteId(), TenjinFunctions.TENJIN_FUNCTION_WRITE), syllabus.getSections()).size() > 0;
		}
	}
*/
/*
	@Override
	public boolean canUserAssignSections(String siteId, Collection<String> sectionsToCheck) {
		List<String> allowedSections = getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_WRITE);
		// if the user is allowed to assign everything in sectionsToCheck,
		// subtract will leave no results
		return CollectionUtils.subtract(sectionsToCheck, allowedSections).size() == 0;
	}
*/

  /*  @Override
    public boolean viewManagementPage(String siteId) {
        String userId = sakaiProxy.getCurrentUserId();
        try {
            Site site = sakaiProxy.getSite(siteId);
            return sakaiProxy.isSuperUser() || check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_VIEW_MANAGER, site.getReference()) ;
        } catch (IdUnusedException e) {
            log.error("Site does not exist");
            return false;
        }
    }*/

  /*  @Override
    public boolean read(String siteId, String userId) {
		try {
			Site site = sakaiProxy.getSite(siteId);
			return sakaiProxy.isSuperUser() || check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_READ, site.getReference()) || check(sakaiProxy.getCurrentUserId(), TenjinFunctions.TENJIN_FUNCTION_WRITE, site.getReference()) ;
		} catch (IdUnusedException e) {
			log.error("Site does not exist");
			return false;
		}
    }*/


}
