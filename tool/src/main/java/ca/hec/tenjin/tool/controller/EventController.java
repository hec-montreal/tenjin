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
import ca.hec.tenjin.api.TenjinEvents;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.provider.CourseOutlineProvider;
import ca.hec.tenjin.tool.controller.util.CsrfToken;
import ca.hec.tenjin.tool.controller.util.CsrfUtil;
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
public class EventController {

	private static Log log = LogFactory.getLog(EventController.class);

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;

	@Setter
	@Autowired
	private TenjinSecurityService securityService = null;

	@Setter
	@Autowired
	private SessionManager sessionManager;
	
	@RequestMapping(value = "/event/read/{syllabusId}/{elementId}", method = RequestMethod.POST)
	public @ResponseBody void createReadEvent (@PathVariable("syllabusId") Long syllabusId, @PathVariable("elementId") Long elementId, @RequestBody CsrfToken csrfToken) throws DeniedAccessException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
		sakaiProxy.postEvent(TenjinEvents.TENJIN_READ_EVENT,sakaiProxy.getSyllabusReference(syllabusId, elementId), false);
	}

	@RequestMapping(value = "/event/access", method = RequestMethod.POST)
	public @ResponseBody void createAccessEvent (@RequestBody CsrfToken csrfToken) throws DeniedAccessException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
		sakaiProxy.postEvent(TenjinEvents.TENJIN_ACCESS_EVENT,"/site/"+sakaiProxy.getCurrentSite().getId(), false);
	}
}
