/******************************************************************************
 * $Id: $
 ******************************************************************************
 *
 * Copyright (c) 2016 The Sakai Foundation, The Sakai Quebec Team.
 *
 * Licensed under the Educational Community License, Version 1.0
 * (the "License"); you may not use this file except in compliance with the
 * License.
 * You may obtain a copy of the License at
 *
 *      http://www.opensource.org/licenses/ecl1.php
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

package ca.hec.opensyllabus2.tool.controller;

import ca.hec.opensyllabus2.api.SakaiProxy;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.tool.api.SessionManager;

import ca.hec.opensyllabus2.api.Syllabus2SecurityService;
import ca.hec.opensyllabus2.api.TemplateService;

@Controller
@RequestMapping(value ="v1")
public class UserController {

	private static Log log = LogFactory.getLog(UserController.class);
	
	@Setter
	@Autowired
	private SessionManager sessionManager;
	
	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;	
	
	@Setter
	@Autowired
	private Syllabus2SecurityService securityService = null; 

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getUser() {
		Map<String, Object> entityMap = new HashMap<String, Object>();
		
		String currentUserId = sakaiProxy.getCurrentUserId();
		entityMap.put("userId", currentUserId);
		
		Site site = null;
		String siteId = sakaiProxy.getCurrentSiteId();
		List<Object> sectionsList = new ArrayList<Object>();
		
		try {
			site = sakaiProxy.getSite(siteId);
			
			// set course title and course id
			Map<String, Object> siteMap = new HashMap<String, Object>();
			siteMap.put("courseId", site.getId());
			siteMap.put("courseTitle", site.getTitle());
			// set site permissions
			List<String> sitePermissionsList = securityService.getUserPermissionsForGroup(site.getId());
			Map<String, Object> sitePermissionsMap = new HashMap<String, Object>();
			for(String permission:sitePermissionsList) {
				sitePermissionsMap.put(permission, true);
			}
			siteMap.put("permissions", sitePermissionsMap);
			entityMap.put("site", siteMap);
			
			// set sections
			for (Group g : site.getGroups()) {
				if (!g.getProviderGroupId().isEmpty()) {
					//newCommonSyllabus.getSections().add(g.getId());
					Map<String, Object> sectionMap = new HashMap<String, Object>();
					sectionMap.put("id", g.getId());
					sectionMap.put("name", g.getTitle());
					
					// set section permissions
					List<String> permissionsList = securityService.getUserPermissionsForGroup(g.getId());			
					Map<String, Object> permissionsMap = new HashMap<String, Object>();
					for(String permission:permissionsList) {
						permissionsMap.put(permission, true);
					}
					sectionMap.put("permissions", permissionsMap);
					
					sectionsList.add(sectionMap);
				}
			}
			entityMap.put("sections", sectionsList);
			
		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return null;
		}

		
		return entityMap;
	}

}
