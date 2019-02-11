package ca.hec.tenjin.tool.controller;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.TenjinEvents;
import ca.hec.tenjin.api.TenjinSecurityService;
import ca.hec.tenjin.api.exception.*;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.tool.controller.util.CopySyllabusObject;
import ca.hec.tenjin.tool.controller.util.CsrfToken;
import ca.hec.tenjin.tool.controller.util.CsrfUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

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
	private SessionManager sessionManager;
	
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

		// If site from request is null, use the context
		siteId = (siteId != null ? siteId : sakaiProxy.getCurrentSiteId());
		String currentUserId = sakaiProxy.getCurrentUserId();

		try {
			// We get the syllabus list for the current site with the sections
			// associated to the user
			syllabusList = syllabusService.getSyllabusListForUser(siteId, currentUserId);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Syllabus>>(syllabusList, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<List<Syllabus>>(syllabusList, HttpStatus.OK);
	}

	@RequestMapping(value = "/syllabus", method = RequestMethod.POST)
	public @ResponseBody Syllabus createSyllabus(@RequestBody SyllabusWithCsrfToken syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException, StructureSyllabusException, SyllabusLockedException {
		CsrfUtil.checkCsrfToken(sessionManager, syllabus.getCsrfToken());
		
		return syllabusService.createOrUpdateSyllabus(syllabus.getSyllabus());
	}

	@RequestMapping(value = "/syllabus/{ids}/delete", method = RequestMethod.POST)
	public @ResponseBody void deleteSyllabusList(@PathVariable("ids") List<Long> syllabusId, @RequestBody CsrfToken csrfToken) throws NoSyllabusException, DeniedAccessException, NoSiteException, SyllabusLockedException, StructureSyllabusException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
		for (Long id : syllabusId) {
			Syllabus syllabus = syllabusService.getSyllabus(id) ;
			// only allow admins to delete common syllabus
			if (!syllabus.getCommon() || sakaiProxy.isSuperUser()) {
				syllabusService.deleteSyllabus(id);
			}
		}
	}

	@RequestMapping(value = "/syllabus/{ids}/unpublish", method = RequestMethod.POST)
	public @ResponseBody void unpublishSyllabusList(@PathVariable("ids") List<Long> syllabusId, @RequestBody CsrfToken csrfToken) throws NoSyllabusException, DeniedAccessException, NoSiteException, SyllabusLockedException, StructureSyllabusException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
		Syllabus syllabus = null;
		List<Syllabus> siteSyllabi = null;
		for (Long id : syllabusId) {
			syllabus = syllabusService.getSyllabus(id) ;
			if (syllabus.getCommon()){
				siteSyllabi = syllabusService.getSyllabusList(syllabus.getSiteId());
				for (Syllabus syll: siteSyllabi){
					if (syll.getPublishedDate() != null && syll.getCommon() == false)
						publishService.unpublishSyllabus(syll.getId());
				}
				publishService.unpublishSyllabus(id);
			}else {
				if (syllabus.getPublishedDate() != null)
					publishService.unpublishSyllabus(id);
			}

		}
	}

	@RequestMapping(value = "/syllabus/{id}/publish", method = RequestMethod.POST)
	public @ResponseBody Syllabus publishSyllabus(@PathVariable("id") Long syllabusId, @RequestBody CsrfToken csrfToken) throws NoSyllabusException, DeniedAccessException, NoSiteException, StructureSyllabusException, NoPublishedSyllabusException, UnknownElementTypeException, SyllabusLockedException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
		Syllabus syllabus = null;

		syllabus = publishService.publishSyllabus(syllabusId);
		publishService.archiveSyllabus(syllabusId);

		return (syllabus);
	}

	@RequestMapping(value = "/syllabus/{syllabusId}", method = RequestMethod.GET)
	public @ResponseBody AbstractSyllabus getSyllabus(@PathVariable Long syllabusId, @RequestParam(required = false) boolean published) throws NoSyllabusException, DeniedAccessException, StructureSyllabusException {
		if (published) {
			return publishService.getPublishedSyllabus(syllabusId);
		} else {
			return syllabusService.getSyllabus(syllabusId);
		}
	}
	
	@RequestMapping(value = "/syllabus/{syllabusId}/public", method = RequestMethod.GET)
	public @ResponseBody AbstractSyllabus getPublicSyllabus(@PathVariable Long syllabusId) throws NoSyllabusException {
		return publishService.getPublicSyllabus(syllabusId);
	}

	@RequestMapping(value = "/syllabus/{courseId}", method = RequestMethod.POST)
	public @ResponseBody Syllabus createOrUpdateSyllabus(@RequestBody SyllabusWithCsrfToken syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException, StructureSyllabusException, SyllabusLockedException {
		CsrfUtil.checkCsrfToken(sessionManager, syllabus.getCsrfToken());
		
		return syllabusService.createOrUpdateSyllabus(syllabus.getSyllabus());
	}
	
	@RequestMapping(value = "/syllabus/sections", method = RequestMethod.POST)
	public @ResponseBody Syllabus updateSyllabusSections(@RequestBody SyllabusWithCsrfToken syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException, StructureSyllabusException, SyllabusLockedException {				
		CsrfUtil.checkCsrfToken(sessionManager, syllabus.getCsrfToken());
		
		Syllabus ret = syllabusService.createOrUpdateSyllabus(syllabus.getSyllabus());
		
		// 'Unpublish' other syllabuses with no sections
		List<Syllabus> list = syllabusService.getSyllabusList(syllabus.getSyllabus().getSiteId());
		
		for(Syllabus syl : list) {
			if (syl.getSections().size() == 0 && !syl.getCommon()) {
				publishService.unpublishSyllabus(syl.getId());
			}
		}
		
		return ret;
	}

	@RequestMapping(value = "/syllabus/copy/{syllabusId}", method = RequestMethod.POST)
	public @ResponseBody void copySyllabus(@PathVariable("syllabusId") Long syllabusId, @RequestBody CopySyllabusObject copyObject) throws DeniedAccessException, IdUnusedException, NoSyllabusException, StructureSyllabusException {
		CsrfUtil.checkCsrfToken(sessionManager, copyObject.getCsrfToken());
		
		syllabusService.copySyllabus(syllabusId, copyObject.getTitle());
	}

	@ExceptionHandler(NoSiteException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody Object handleNoSiteException(NoSiteException ex) {
		return msgs.getString("tenjin.error.siteDoesNotExist");
	}

	@ExceptionHandler(NoSyllabusException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody String handleNoSyllabusException(NoSyllabusException ex) {
		return msgs.getString("tenjin.error.syllabusDoesNotExist");
	}

	@ExceptionHandler(DeniedAccessException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public @ResponseBody String handleDeniedAccessException(DeniedAccessException ex) {
		return msgs.getString("tenjin.error.unauthorized");
	}

	@ExceptionHandler(SyllabusLockedException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public @ResponseBody SyllabusLockedException handleSyllabusLockedException(SyllabusLockedException ex) {
		return ex;
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public @ResponseBody Object handleStructureSyllabusException(StructureSyllabusException ex) {
		ex.printStackTrace();
		return null;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	static class SyllabusWithCsrfToken
	{
		Syllabus syllabus;
		String csrfToken;
	}
}
