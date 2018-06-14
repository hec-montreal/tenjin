
package ca.hec.tenjin.impl;

import java.util.Set;

import ca.hec.tenjin.api.model.syllabus.Syllabus;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinFunctions;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import lombok.Setter;

@Setter
public class TenjinSecurityServiceImpl implements TenjinSecurityService {
	
	private SakaiProxy sakaiProxy;

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
		//if he is a super user
		if (sakaiProxy.isSuperUser())
			return true;

		try {
			Site site = sakaiProxy.getSite(syllabus.getSiteId());

			//If syllabus is common check on site
			if (syllabus.getCommon() &&
					(permission == TenjinFunctions.TENJIN_FUNCTION_READ_COMMON_UNPUBLISHED ||
					permission == TenjinFunctions.TENJIN_FUNCTION_READ_COMMON)) {

				if (checkOnSiteGroup(userId, permission, site))
				{
					return true;
				}
			}

			// if user has the appropriate permission on the site realm return true
			if (checkOnSiteGroup(userId, permission, site))
				return true;

			//if he is owner he has all permissions on the syllabus
			if (isOwner(userId, syllabus) && !syllabus.getCommon())
				return true;

			//if user has that permission on the section
			Set<String> sectionIds = syllabus.getSections();
			if (sectionIds != null && !sectionIds.isEmpty()) {
				for (String sectionId : sectionIds) {
					Group group = null;
					group = site.getGroup(sectionId);
					if (check(userId, permission, group))
						return true;
				}
			}

			if (!syllabus.getCommon() || permission == TenjinFunctions.TENJIN_FUNCTION_READ_PERS) {
				
				// special case for creating a non-common syllabus
				if (syllabus.getId() == null && permission == TenjinFunctions.TENJIN_FUNCTION_WRITE_PERS) {
					// Check if user is allowed to create a syllabus (write on any section in the site)
					for(Group group : site.getGroups()) {
						if(check(userId, permission, group)) {
							return true;
						}
					}

					// Check permission on site
					return checkOnSiteGroup(userId, permission, site);
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

	private boolean isOwner(String userId, AbstractSyllabus syllabus){
		if (userId == null || syllabus.getId() == null)
			return false;
		return (syllabus.getCreatedBy()).equalsIgnoreCase(userId);
	}

	@Override
	public boolean canReadUnpublished(String userId, AbstractSyllabus syllabus) {
		if (syllabus.getCommon()) {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_READ_COMMON_UNPUBLISHED, syllabus);
		}
		return false;
	}

	@Override
	public boolean canRead(String userId, AbstractSyllabus syllabus) {
		if (syllabus.getCommon()) {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_READ_COMMON, syllabus);
		} else {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_READ_PERS, syllabus);
		}
	}

	@Override
	public boolean canWrite(String userId, AbstractSyllabus syllabus) {
		if (syllabus.getCommon()) {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON, syllabus);
		} else {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_WRITE_PERS, syllabus);
		}
	}

	@Override
	public boolean canPublish(String userId, AbstractSyllabus syllabus) {
		if (syllabus.getCommon()) {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH_COMMON, syllabus);
		} else {
			return check(userId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH_PERS, syllabus);
		}
	}
}
