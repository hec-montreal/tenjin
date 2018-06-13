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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.*;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.tool.api.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping(value = "v1")
public class PermissionsController {

	private static Log log = LogFactory.getLog(PermissionsController.class);

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;

	@Setter
	@Autowired
	private TenjinSecurityService securityService = null;

	@RequestMapping(value = "/siteRealmPermissions", method = RequestMethod.GET)
	public @ResponseBody List<Permission> getSiteRealmPermissions() {

		List<Permission> permissions = new ArrayList<Permission>();
		Site site = sakaiProxy.getCurrentSite();
		String role = sakaiProxy.getSakaiProperty("tenjin.permissionEditor.role");

		if (role != null && !role.isEmpty()) {
			Set<String> perms = sakaiProxy.getAllowedFunctions(role, Arrays.asList(site.getReference()));
			permissions.add(new Permission(TenjinFunctions.TENJIN_FUNCTION_READ_COMMON_UNPUBLISHED, perms.contains(TenjinFunctions.TENJIN_FUNCTION_READ_COMMON_UNPUBLISHED)));
			permissions.add(new Permission(TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON, perms.contains(TenjinFunctions.TENJIN_FUNCTION_WRITE_COMMON)));
			permissions.add(new Permission(TenjinFunctions.TENJIN_FUNCTION_PUBLISH_COMMON, perms.contains(TenjinFunctions.TENJIN_FUNCTION_PUBLISH_COMMON)));
			permissions.add(new Permission(TenjinFunctions.TENJIN_FUNCTION_READ_PERS, perms.contains(TenjinFunctions.TENJIN_FUNCTION_READ_PERS)));
		}

		return permissions;
	}

	@RequestMapping(value = "/siteRealmPermissions", method = RequestMethod.POST)
	public @ResponseBody List<Permission> setSiteRealmPermissions(@RequestBody List<Permission> permissions) throws GroupNotDefinedException, AuthzPermissionException {

		Site site = sakaiProxy.getCurrentSite();
		AuthzGroup azGroup = null;
		azGroup = sakaiProxy.getAuthzGroup(site.getReference());
		String role = sakaiProxy.getSakaiProperty("tenjin.permissionEditor.role");

		if (role != null && !role.isEmpty()) {

			Role roleToUpdate = azGroup.getRole(role);
			for (Permission p : permissions) {
				if (!p.getName().startsWith("tenjin.")) {
					// at least check that the permission we're changing starts with "tenjin".
					throw new AuthzPermissionException(sakaiProxy.getCurrentUserId(), p.getName(), site.getReference());
				}
				if (p.getValue()) {
					roleToUpdate.allowFunction(p.getName());
				} else {
					roleToUpdate.disallowFunction(p.getName());
				}
			}

			sakaiProxy.saveAuthzGroup(azGroup);
		}
		return permissions;
	}

	@ExceptionHandler(AuthzPermissionException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public @ResponseBody String handleAuthzPermissionException(AuthzPermissionException ex) {
		return "User not authorized to change specified authz group";
	}

	@ExceptionHandler(GroupNotDefinedException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody String handlegroupNotDefinedException(GroupNotDefinedException ex) {
		ex.printStackTrace();
		return "GroupNotDefinedException";
	}

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	// must be static so jackson can deserialize it
	static class Permission {
		String name;
		Boolean value;
	}

}
