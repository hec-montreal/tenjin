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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.content.api.ContentCollection;
import org.sakaiproject.content.api.ContentEntity;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.entity.api.EntityManager;
import org.sakaiproject.entity.api.Reference;
import org.sakaiproject.entity.api.ResourceProperties;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.TypeException;
import org.sakaiproject.time.api.Time;
import org.sakaiproject.time.api.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.hec.tenjin.api.SakaiProxy;

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
	
	private static Log log = LogFactory.getLog(SiteResourcesController.class);
    
  	@Setter
  	@Autowired
  	private ContentHostingService contentHostingService;

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;	
  	
    @Setter
	@Autowired
	private EntityManager entityManager;
    
    @Setter
 	@Autowired
    private TimeService timeService;
    

 	/**
	 * 
	 * @param entity
	 * @return
	 */
    private Comparator getComparator(ContentEntity entity) {
	
		boolean hasCustomSort = false;
		try	{
			hasCustomSort = entity.getProperties().getBooleanProperty(
					ResourceProperties.PROP_HAS_CUSTOM_SORT);
	
		} catch(Exception e) {
			// ignore -- let value of hasCustomSort stay false
		}
		
		if(hasCustomSort) {
			return contentHostingService.newContentHostingComparator(
					ResourceProperties.PROP_CONTENT_PRIORITY, true);
		} else {
			return contentHostingService.newContentHostingComparator(
					ResourceProperties.PROP_DISPLAY_NAME, true);
		}
	}
	
	/**
	 * 
	 * @param entity The entity to load details of.
	 * @param currentDepth How many collections we have already processed
	 * @param requestedDepth The maximum number depth of the tree to scan.
	 * @param timeStamp All returned details must be newer than this timestamp.
	 * @return EntityContent containing details of all resources the user can access.
	 * <code>null</code> is returned if the current user isn't allowed to access the resource.
	 */
	private EntityContent getResourceDetails(	
			ContentEntity entity, int currentDepth, int requestedDepth, Time timeStamp) {
		boolean allowed = (entity.isCollection()) ?
				contentHostingService.allowGetCollection(entity.getId()) :
				contentHostingService.allowGetResource(entity.getId());
		if (!allowed) {
			// If the user isn't allowed to see this we return null.
			return null;
		}
		EntityContent tempRd = EntityDataUtils.getResourceDetails(entity);
		
		// If it's a collection recurse down into it.
		if ((requestedDepth > currentDepth) && entity.isCollection()) {
				
			ContentCollection collection = (ContentCollection)entity;
			// This is all members, no permission check has been done yet.
			List<ContentEntity> contents = collection.getMemberResources();
			
			Comparator comparator = getComparator(entity);
			if (null != comparator) {
				Collections.sort(contents, comparator);
			}
			
			for (Iterator<ContentEntity> i = contents.iterator(); i.hasNext();) {
				ContentEntity content = i.next();
				EntityContent resource = getResourceDetails(content, currentDepth+1, requestedDepth, timeStamp);

				if (resource != null && resource.after(timeStamp)) {
					tempRd.addResourceChild(resource);
				}
			}
		}
		
		
		return tempRd;
	}
	
	
	
	/**
	 * 
	 * @param timestamp  use formatter A: yyyyMMddHHmmssSSS
	 * @return
	 */
	private Time getTime(String timestamp) {
		
		try {
			
			if (null != timestamp) {
				DateFormat format = new SimpleDateFormat("yyyyMMddHHmmssSSS");
				Date date = format.parse(timestamp);
				Calendar c = Calendar.getInstance();
				c.setTime(date);
				
				return timeService.newTimeGmt(format.format(date));
			}
		
		} catch (ParseException e) {
			return timeService.newTimeGmt("20201231235959999");
		}
		return null;
	}
    
	 @RequestMapping(value="{siteId}", method = RequestMethod.GET)
	public @ResponseBody List<EntityContent> getResources( @PathVariable String siteId, 
			@RequestParam(value = "resourceId", required = false) String resourceId,
			@RequestParam(value = "depth", required = false) String depth, 
			@RequestParam(value = "timestamp", required = false) String timestamp) 
			{
		
		// This is all more complicated because entitybroker isn't very flexible and announcements can only be loaded once you've got the
		// channel in which they reside first.
    	
    	String userId = sakaiProxy.getCurrentUserId();
        if (userId == null) {
            throw new SecurityException(
            "This action is not accessible to anon and there is no current user.");
        }
		
    	Time timeStamp = getTime(timestamp);
    	
    	int requestedDepth = 1;
    	int currentDepth = 0;
    	if (depth != null) {
    		if ("all".equals(depth)) {
    			requestedDepth = Integer.MAX_VALUE;
    		} else {
    			requestedDepth = Integer.parseInt(depth);
    		}
    	}
    	
		Reference reference;
		
		if (resourceId != null)
			reference = entityManager.newReference(
				ContentHostingService.REFERENCE_ROOT+ "/" + siteId + "/" + resourceId.toString());
		else
			reference = entityManager.newReference(
					ContentHostingService.REFERENCE_ROOT+ "/" + siteId + "/" );
		
		// We could have used contentHostingService.getAllEntities(id) bit it doesn't do 
		// permission checks on any contained resources (documentation wrong).
		// contentHostingService.getAllResources(String id) does do permission checks
		// but it doesn't include collections in it's returned list.
		// Also doing the recursion ourselves means that we don't loads lots of entities
		// when the depth of recursion is low.
		ContentCollection collection= null;
		try {
			collection = contentHostingService.getCollection(reference.getId());
			
		} catch (IdUnusedException e) {
			throw new IllegalArgumentException("IdUnusedException in Resource Entity Provider");
			
		} catch (TypeException e) {
			throw new IllegalArgumentException("TypeException in Resource Entity Provider");
			
		} catch (PermissionException e) {
			throw new SecurityException("PermissionException in Resource Entity Provider");
		}
		
		List<EntityContent> resourceDetails = new ArrayList<EntityContent>();
		if (collection!=null) {
			EntityContent resourceDetail = getResourceDetails(collection, currentDepth, requestedDepth, timeStamp);
			if (resourceDetail != null) {
				resourceDetails.add(resourceDetail);
			} else {
				log.error("Initial permission check passed but subsequent permission check failed on "+ reference.getId());
			}
		}
		return resourceDetails;
	}


}
