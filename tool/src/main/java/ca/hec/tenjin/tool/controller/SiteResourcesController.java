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

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.model.data.EntityContent;
import lombok.Setter;

/**
 * Methods from https://github.com/ox-it/wl-entitybroker.
 * 
 * 
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
@Controller
@RequestMapping(value = "resources")
public class SiteResourcesController {

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;

	@RequestMapping(value = "{siteId}", method = RequestMethod.GET)
	public @ResponseBody List<EntityContent> getResources(@PathVariable String siteId, @RequestParam(value = "resourceId", required = false) String resourceId, @RequestParam(value = "depth", required = false) String depth, @RequestParam(value = "timestamp", required = false) String timestamp) {
		return sakaiProxy.getSiteResources(siteId, timestamp, depth, resourceId);
	}
}
