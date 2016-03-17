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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.sakaiproject.component.cover.ServerConfigurationService;
import org.sakaiproject.entitybroker.EntityBroker;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;






















import javax.annotation.PostConstruct;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.opensyllabus2.api.Syllabus2Service;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
@Controller
@RequestMapping(value = "tools")
public class SiteToolsController {

	private static Log log = LogFactory.getLog(SiteToolsController.class);
	
	public final String BLOCKED_FORUM_TOPIC = "forum_topic";
	
	public final String BLOCKED_TOPIC = "topic";
	@Setter
	@Autowired
	private SessionManager sessionManager;
    	
	@Setter
	@Autowired
	private ToolManager toolManager;

	@Setter
	@Autowired
	private SiteService siteService;
	
	@Setter
	@Autowired
	private EntityBroker entityBroker;
	
        @RequestMapping(value = "/{siteId}", method = RequestMethod.GET)
        public @ResponseBody Map<String, Object> getSiteToolsElements(
    	    @PathVariable String siteId) {
    	String currentUserId = sessionManager.getCurrentSessionUserId();
    	List<String> entities;
    	String name;
    	Map<String, Object> entityMap = new HashMap<String, Object>();
    	List<Object> entityList = new ArrayList<Object>();
    	
    	List<Object> resourceChildren = new ArrayList<Object>();    	
    	Map<String, Object> resourceFolder = new HashMap<String, Object>();
    
    	Map<String, Object> allTools = new HashMap<String, Object>();
    	log.info(currentUserId);
    
    	Set<String> providers = entityBroker.getRegisteredPrefixes();
    
    	try {
    	    siteService.getSite(siteId);
    	    allTools.put("user", currentUserId);
    
    	    for (String provider : providers) {
    		entities =
    			entityBroker.findEntityRefs(new String[] { provider },
    				new String[] { "context", "userId" },
    				new String[] { siteId, currentUserId }, true);
    		entityList = new ArrayList<Object>();
    
		if (!provider.equalsIgnoreCase(BLOCKED_TOPIC)
			&& !provider.equalsIgnoreCase(BLOCKED_FORUM_TOPIC)) {
		    if (entities != null && !entities.isEmpty()) {

			for (String ent : entities) {
			    entityMap = new HashMap<String, Object>();
			    entityMap.put("resourceId", ent);
			    name = entityBroker.getPropertyValue(ent, "title");
			    entityMap.put("name", name);
			    // Have to pass through direct to get to the entity
			    entityMap.put("url",
				    ServerConfigurationService.getServerUrl()
					    + "/direct" + ent);
			    entityMap.put("osylType", "sakai_entity");
			    entityMap.put("tool", provider.toUpperCase());
			    entityList.add(entityMap);
			}
		    }

		    if (entityList.size() > 0) {
			resourceFolder = new HashMap<String, Object>();

			if (allTools.containsKey("resourceChildren")) {
			    resourceChildren =
				    (List<Object>) allTools
					    .get("resourceChildren");
			}

			resourceFolder.put("name", provider.toUpperCase());
			resourceFolder.put("osylType", "folder");
			resourceFolder.put("resourceChildren", entityList);
			resourceChildren.add(resourceFolder);

			allTools.put("resourceChildren", resourceChildren);
		    }
		}
    	    }
    	} catch (IdUnusedException e) {
    	    e.printStackTrace();
    	}
    
    	return allTools;
        }

}

