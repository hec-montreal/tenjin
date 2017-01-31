
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
		//if he is a super user
		if (sakaiProxy.isSuperUser())
			return true;

		return sakaiProxy.isAllowed(userId, permission, sectionRef.getReference());
	}

	@Override
	public boolean check(String userId, String permission, AbstractSyllabus syllabus) {
		//if he is owner he has all permissions on the syllabus
		if (isOwner(userId, syllabus))
			return true;

		//if he is a super user
		if (sakaiProxy.isSuperUser())
			return true;

		try {
			Site site = sakaiProxy.getSite(syllabus.getSiteId());
			
			//If syllabus is common check on site
			if (syllabus.getCommon()) {
				if (permission == TenjinFunctions.TENJIN_FUNCTION_READ && checkOnSiteGroup(userId, permission, site)) {
					// if we're checking read permission and it's false for the site, we can continue on to check the sections
					return true;
				} else if (permission == TenjinFunctions.TENJIN_FUNCTION_WRITE) {
					// only allow write on the common if the user has write on the site realm
					return checkOnSiteGroup(userId, permission, site);
				}
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
		//if he is a super user
		if (sakaiProxy.isSuperUser())
			return true;

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
}
