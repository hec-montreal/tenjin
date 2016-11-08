package ca.hec.tenjin.tool.controller;

import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.TenjinFunctions;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;
import lombok.Getter;
import lombok.Setter;

/******************************************************************************
 * $Id: $
 ******************************************************************************
 *
 * Copyright (c) 2015 The Sakai Foundation, The Sakai Quebec Team.
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
 *****************************************************************************/

/**
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */
@Controller
@RequestMapping(value = "v1")
public class SyllabusController {

	@Setter
	@Getter
	@Autowired
	private SyllabusService syllabusService = null;

	@Setter
	@Autowired
	private PublishService publishService = null;

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;

	@Setter
	@Autowired
	private TenjinSecurityService securityService = null;

	private ResourceLoader msgs = null;

	private static Log log = LogFactory.getLog(SyllabusController.class);

	@PostConstruct
	public void init() {
		// retrieve ui and co messages
		msgs = new ResourceLoader("tenjin");

	}

	@RequestMapping(value = "/syllabus", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<List<Syllabus>> getSyllabusList(@RequestParam(value = "siteId", required = false) String siteId) throws DeniedAccessException, NoSyllabusException {

		List<Syllabus> syllabusList = null;

		// if site from request is null, use the context
		siteId = (siteId != null ? siteId : sakaiProxy.getCurrentSiteId());
		String currentUserId = sakaiProxy.getCurrentUserId();

		// get common syllabus read permission
		boolean commonPermissionRead = securityService.isAllowedCommon(currentUserId, TenjinFunctions.TENJIN_FUNCTION_READ);
		boolean commonPermissionWrite = securityService.isAllowedCommon(currentUserId, TenjinFunctions.TENJIN_FUNCTION_WRITE);

		List<String> sections = null;
		// If user has write permission, then no need to get sections
		if (commonPermissionWrite == false) {
			// get sections available for the current user
			sections = securityService.getArraySections(siteId, TenjinFunctions.TENJIN_FUNCTION_READ);
		}

		try {
			// We get the syllabus list for the current site with the sections
			// associated to the user
			syllabusList = syllabusService.getSyllabusList(siteId, sections, commonPermissionRead, commonPermissionWrite, currentUserId);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseEntity<List<Syllabus>>(syllabusList, HttpStatus.OK);

	}

	@RequestMapping(value = "/syllabus", method = RequestMethod.POST)
	public @ResponseBody Syllabus createSyllabus(@RequestBody Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException {
		return syllabusService.createOrUpdateSyllabus(syllabus);
	}
	
	@RequestMapping(value = "/syllabus/{ids}/delete", method = RequestMethod.GET)
	public void deleteSyllabusList(@PathVariable("ids") List<Long> syllabusId) throws NoSyllabusException, DeniedAccessException, NoSiteException {
		for (Long id : syllabusId) {
			syllabusService.deleteSyllabus(id);
		}
	}

	@RequestMapping(value = "/syllabus/{id}/publish", method = RequestMethod.GET)
	public @ResponseBody String publishSyllabus(@PathVariable("id") Long syllabusId) throws NoSyllabusException, DeniedAccessException, NoSiteException {
		
		if (publishService.publishSyllabus(syllabusId))
			return syllabusId.toString() + " published";
		else 
			return "error";
	}

	@RequestMapping(value = "/syllabus/{syllabusId}", method = RequestMethod.GET)
	public @ResponseBody AbstractSyllabus getSyllabus(
			@PathVariable Long syllabusId, 
			@RequestParam(required = false) boolean published) throws NoSyllabusException {
		
		if (published) {
			return publishService.getPublishedSyllabus(syllabusId);			
		} else {
			return syllabusService.getSyllabus(syllabusId);
		}
	}

	@RequestMapping(value = "/syllabus/{courseId}", method = RequestMethod.POST)
	public @ResponseBody Syllabus createOrUpdateSyllabus(@RequestBody Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException {

		return syllabusService.createOrUpdateSyllabus(syllabus);
	}

	@ExceptionHandler(NoSiteException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody Object handleNoSiteException(NoSiteException ex) {
		return "Specified site does not exist";
	}

	@ExceptionHandler(NoSyllabusException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody String handleNoSyllabusException(NoSyllabusException ex) {
		return ex.getLocalizedMessage();
	}

	@ExceptionHandler(DeniedAccessException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public @ResponseBody String handleDeniedAccessException(DeniedAccessException ex) {
		return ex.getLocalizedMessage();
	}

}
