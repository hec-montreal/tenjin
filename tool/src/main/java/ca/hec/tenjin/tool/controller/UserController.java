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

package ca.hec.tenjin.tool.controller;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinFunctions;

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
import org.sakaiproject.tool.api.SessionManager;

import ca.hec.tenjin.api.TenjinSecurityService;

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
	private TenjinSecurityService securityService = null; 

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
			Map<String, Object> sitePermissionsMap = new HashMap<String, Object>();
			if (securityService.isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ, site.getReference())) {
				sitePermissionsMap.put("read", true);
			} else {
				sitePermissionsMap.put("read", false);
			}
			if (securityService.isAllowed(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE, site.getReference())) {
				sitePermissionsMap.put("write", true);
			} else {
				sitePermissionsMap.put("write", false);
			}
			
			siteMap.put("permissions", sitePermissionsMap);
			entityMap.put("site", siteMap);
			
			// set sections
			entityMap.put("sections", securityService.getSections(true));
			
		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved.");
			return null;
		}

		
		return entityMap;
	}



	public @ResponseBody Map<String, Object> getUserProfile() {

		Map<String, Object> profile = new HashMap<String, Object>();

		//Can see management page if superuser - has tenjin.management.view permission - can edit at least in one section of site

		return profile;
	}
}
