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
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.provider.tool.AssignmentToolEntityProvider;
import ca.hec.tenjin.api.provider.tool.SamigoToolEntityProvider;
import ca.hec.tenjin.tool.controller.util.CsrfUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.announcement.api.AnnouncementChannel;
import org.sakaiproject.announcement.api.AnnouncementMessageEdit;
import org.sakaiproject.announcement.api.AnnouncementMessageHeaderEdit;
import org.sakaiproject.announcement.api.AnnouncementService;
import org.sakaiproject.api.app.messageforums.DiscussionForum;
import org.sakaiproject.api.app.messageforums.DiscussionTopic;
import org.sakaiproject.component.cover.ServerConfigurationService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
@Controller
@RequestMapping(value = "v1")
public class SiteToolsController {

	private static Log log = LogFactory.getLog(SiteToolsController.class);

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;
	
	@Setter
	@Autowired
	private AnnouncementService announcementService;

	@Setter
	@Autowired
	private SessionManager sessionManager;
	
	@Setter
	@Autowired
	private SamigoToolEntityProvider samigoToolEntityProvider;
	
	@Setter
	@Autowired
	private AssignmentToolEntityProvider assignmentToolEntityProvider;
	
	@RequestMapping(value = "/{siteId}/tool-entities", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getSiteToolEntities(@PathVariable String siteId) {
		Map<String, Object> ret = new HashMap<>();
		
		ret.put("user", sakaiProxy.getCurrentUserId());
		
		List<Map<String, Object>> tools = new ArrayList<>();;
		
		Map<String, Object> samigo = new HashMap<>();
		samigo.put("name", samigoToolEntityProvider.getToolName());
		samigo.put("type", "folder");
		samigo.put("resourceChildren", samigoToolEntityProvider.getEntities(siteId, sakaiProxy.getCurrentUserId()));
		tools.add(samigo);
		
		Map<String, Object> assignment = new HashMap<>();
		assignment.put("name", assignmentToolEntityProvider.getToolName());
		assignment.put("type", "folder");
		assignment.put("resourceChildren", assignmentToolEntityProvider.getEntities(siteId, sakaiProxy.getCurrentUserId()));
		tools.add(assignment);
	
		List<Forum> forums = new ArrayList<>();
		List<DiscussionForum> rawForums = sakaiProxy.getSiteForums();
		
		for (DiscussionForum forum : rawForums)
		{
			forums.add(new Forum(forum));
		}
		
		Map<String, Object> forum = new HashMap<>();
		forum.put("name", "FORUM");
		forum.put("type", "folder");
		forum.put("resourceChildren", forums);
		tools.add(forum);
		
		ret.put("resourceChildren", tools);
	
		return ret;
	}

	@RequestMapping(value = "/announcement/{siteId}", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity createAnnouncement(@RequestBody Map<String, Object> announcement, @PathVariable String siteId) throws DeniedAccessException {
		
		CsrfUtil.checkCsrfToken(sessionManager, (String) announcement.get("csrfToken"));
		
		String title = (String) announcement.get("title");
		String message = (String) announcement.get("message");
		ArrayList<String> groups = (ArrayList<String>) announcement.get("groups");

		Collection<Group> authzGroups = new Vector<Group>();

		AnnouncementChannel channel = getAnnouncementChannel(siteId);

		try {

			if (channel != null) {
				AnnouncementMessageEdit messageEdit = null;
				messageEdit = channel.addAnnouncementMessage();

				if (messageEdit != null) {
					AnnouncementMessageHeaderEdit header = messageEdit.getAnnouncementHeaderEdit();
					header.setSubject(title);
					messageEdit.setBody(message);
					for (String group: groups){
						authzGroups.add(sakaiProxy.getGroup(group));
					}

					header.setGroupAccess(authzGroups);
					channel.commitMessage(messageEdit);
				}
			} else {
				throw new Exception("No annoucement channel available");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity(HttpStatus.OK);
	}

	private AnnouncementChannel getAnnouncementChannel(String siteId) {
		AnnouncementChannel channel = null;
		String channelId = ServerConfigurationService.getString("channel", null);
		if (channelId == null) {
			channelId = org.sakaiproject.announcement.cover.AnnouncementService.channelReference(siteId, SiteService.MAIN_CONTAINER);
			try {
				channel = announcementService.getAnnouncementChannel(channelId);
			} catch (IdUnusedException e) {
				log.warn(this + "getAnnouncement:No announcement channel found");
				channel = null;
			} catch (PermissionException e) {
				log.warn(this + "getAnnouncement:Current user not authorized to deleted annc associated " + "with assignment. " + e.getMessage());
				channel = null;
			}
		}
		return channel;
	}

	@Data
	public static abstract class ForumNode
	{
		private String resourceId;
		private String name;
		private String type;
		
		public String getUrl()
		{
			return "/direct/" + type + "/" + resourceId;
		}
	}
	
	@Data
	@EqualsAndHashCode(callSuper = true)
	public static class Forum extends ForumNode
	{
		private List<Topic> resourceChildren;
		
		@SuppressWarnings("unchecked")
		public Forum (DiscussionForum forum)
		{
			setResourceId(String.valueOf(forum.getId()));
			setName(forum.getTitle());
			setType("forum");
			
			this.resourceChildren = new ArrayList<>();
			
			for (DiscussionTopic topic : (List<DiscussionTopic>) (List<?>) forum.getTopics())
			{
				this.resourceChildren.add(new Topic(topic));
			}
		}
	}
	
	@Data
	@EqualsAndHashCode(callSuper = true)
	public static class Topic extends ForumNode
	{		
		public Topic (DiscussionTopic topic)
		{
			setResourceId(String.valueOf(topic.getId()));
			setName(topic.getTitle());
			setType("forum_topic");
		}
	}
}
