package ca.hec.opensyllabus2.tool.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.OsylException.DeniedAccessException;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusRubricElement;

import ca.hec.opensyllabus2.api.model.template.Template;
import ca.hec.opensyllabus2.api.model.template.TemplateStructure;

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
public class Syllabus2Controller {

	@Setter
	@Getter
	@Autowired
	private Syllabus2Service osyl2Service = null;

	private ResourceLoader msgs = null;

	private static Log log = LogFactory.getLog(Syllabus2Controller.class);

	@PostConstruct
	public void init() {
		// retrieve ui and co messages
		msgs = new ResourceLoader("openSyllabus2");

	}

	@RequestMapping(value = "/syllabus", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<List<Syllabus>> getSyllabusList(@RequestParam(value = "siteId", required = false) String siteId) {

		List<Syllabus> syllabusList = null;

		try {
			// We get the syllabus list of the specified site id
			syllabusList = osyl2Service.getSyllabusList(siteId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseEntity<List<Syllabus>>(syllabusList, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/syllabus/{syllabusId}", method = RequestMethod.GET)
	public @ResponseBody Syllabus getSyllabus(@PathVariable Long syllabusId) throws NoSyllabusException {

		return osyl2Service.getSyllabus(syllabusId);
	}

	@RequestMapping(value = "/syllabus/{courseId}", method = RequestMethod.POST)
	public @ResponseBody Syllabus createOrUpdateSyllabus(@RequestBody Syllabus syllabus) throws NoSyllabusException, DeniedAccessException, NoSiteException {

			return osyl2Service.createOrUpdateSyllabus(syllabus);
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
