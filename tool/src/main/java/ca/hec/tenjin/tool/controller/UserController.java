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
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.TenjinFunctions;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.provider.CourseOutlineProvider;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.tool.api.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping(value = "v1")
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
	private SyllabusService syllabusService;

	@Setter
	@Autowired(required = false)
	private CourseOutlineProvider importProvider;

	@Setter
	@Autowired
	private TenjinSecurityService securityService = null;

	@RequestMapping(value = "/userProfile", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getUserProfile() throws DeniedAccessException, NoSiteException {
		Map<String, Object> profile = new HashMap<String, Object>();
		String currentUserId = sakaiProxy.getCurrentUserId();
		String siteId = sakaiProxy.getCurrentSiteId();
		Site site = null;
		Collection<Group> usersGroup;

		// Section permissions
		List<Object> sectionWrite = new ArrayList<Object>();
		List<Object> sectionPublish = new ArrayList<Object>();
		Map<String, String> section;

		// Syllabus permissions
		List<Long> syllabusRead = new ArrayList<Long>();
		List<Long> syllabusWrite = new ArrayList<Long>();
		List<Long> syllabusPublish = new ArrayList<Long>();

		// Permissions to the site and sections
		try {
			site = sakaiProxy.getSite(siteId);

			profile.put("siteId", siteId);
			profile.put("courseTitle", site.getTitle());

			profile.put("locale", sakaiProxy.getCurrentUserLocale());

			profile.put("defaultLocale", sakaiProxy.getDefaultLocale());

			profile.put("sections", getSiteSections(site));

			if (securityService.checkOnSiteGroup(currentUserId, TenjinFunctions.TENJIN_FUNCTION_VIEW_MANAGER, site)) {
				profile.put("managerView", true);
			} else {
				profile.put("managerView", false);
			}

			// Whether to allow import
			profile.put("activateImportButton", importProvider != null &&
					securityService.checkOnSiteGroup(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON, site));

			// The user has permissions in the sections
			boolean writeOnSite = securityService.checkOnSiteGroup(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE_PERS, site);
			boolean publishOnSite = securityService.checkOnSiteGroup(currentUserId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH_PERS, site);
			usersGroup = site.getGroups();
			for (Group group : usersGroup) {
				if (group.getProviderGroupId() != null) {
					if (writeOnSite || securityService.check(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE_PERS, group)) {
						section = new HashMap<String, String>();
						section.put("id", group.getId());
						section.put("name", group.getTitle());
						sectionWrite.add(section);
					}
					if (publishOnSite || securityService.check(currentUserId, TenjinFunctions.TENJIN_FUNCTION_PUBLISH_PERS, group)) {
						section = new HashMap<String, String>();
						section.put("id", group.getId());
						section.put("name", group.getTitle());
						sectionPublish.add(section);
					}
				}
			}

		} catch (Exception e) {
			log.error("Site " + siteId + " could not be retrieved: " + e.getMessage());
			return null;
		}

		profile.put("sectionAssign", sectionWrite);
		profile.put("sectionPublish", sectionPublish);

		// check user permission on each syllabus
		List<Syllabus> syllabusList = syllabusService.getSyllabusListForUser(siteId, sakaiProxy.getCurrentUserId());
		if (syllabusList != null) {
			for (Syllabus syllabus : syllabusList) {

				// The user has permissions in the site
				if (securityService.canRead(currentUserId, syllabus)) {
					syllabusRead.add(syllabus.getId());
				}
				if (securityService.canWrite(currentUserId, syllabus)) {
					syllabusWrite.add(syllabus.getId());
				}
				if (securityService.canPublish(currentUserId, syllabus)) {
					syllabusPublish.add(syllabus.getId());
				}
			}
		}

		profile.put("syllabusRead", syllabusRead);
		profile.put("syllabusWrite", syllabusWrite);
		profile.put("syllabusPublish", syllabusPublish);

		String lockRenewDelaySeconds = sakaiProxy.getSakaiProperty(SakaiProxy.PROPERTY_SYLLABUS_LOCK_RENEW_DELAY_SECONDS);

		profile.put("lockRenewDelaySeconds", lockRenewDelaySeconds);

		return profile;
	}

	private List<Object> getSiteSections(Site site) {
		List<Object> sections = new ArrayList<Object>();

		Map<String, String> section;
		for (Group group : site.getGroups()) {
			section = new HashMap<String, String>();
			if (group.getProviderGroupId() != null) {
				section.put("id", group.getId());
				section.put("name", group.getTitle());
				sections.add(section);
			}
		}
		return sections;
	}
}
