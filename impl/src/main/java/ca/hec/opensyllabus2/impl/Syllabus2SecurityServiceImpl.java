package ca.hec.opensyllabus2.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;

import ca.hec.opensyllabus2.api.SakaiProxy;
import ca.hec.opensyllabus2.api.Syllabus2SecurityService;
import ca.hec.opensyllabus2.api.TenjinFunctions;
import lombok.Setter;

@Setter
public class Syllabus2SecurityServiceImpl implements Syllabus2SecurityService {
	
	private SakaiProxy sakaiProxy;

	private static Log log = LogFactory.getLog(Syllabus2SecurityServiceImpl.class);
	
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
	public List<String> getArraySections() {
		Site site = null;
		String siteId = sakaiProxy.getCurrentSiteId();
		String currentUserId = sakaiProxy.getCurrentUserId();
		
		List<String> sectionsList = new ArrayList<String>();
		
		try {
			site = sakaiProxy.getSite(siteId);
			
			for (Group g : site.getGroups()) {
				if (!g.getProviderGroupId().isEmpty()) {
					// if the current user have read permissions on the section
					if (sakaiProxy.isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ, g.getReference()) ) {
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
	public List<Object> getSections(boolean permissions) {
		Site site = null;
		String siteId = sakaiProxy.getCurrentSiteId();
		String currentUserId = sakaiProxy.getCurrentUserId();
		
		List<Object> sectionsList = new ArrayList<Object>();
		
		try {
			site = sakaiProxy.getSite(siteId);
			
			for (Group g : site.getGroups()) {
				if (!g.getProviderGroupId().isEmpty()) {
					Map<String, Object> sectionMap = new HashMap<String, Object>();
					sectionMap.put("id", g.getId());
					sectionMap.put("name", g.getTitle());
					
					
					// set section permissions
					if (permissions == true) {
						Map<String, Object> permissionsMap = new HashMap<String, Object>();
						if (isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ, g.getReference())) {
							permissionsMap.put("read", true);
						}
						if (isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE, g.getReference())) {
							permissionsMap.put("write", true);
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
}
