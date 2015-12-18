package ca.hec.opensyllabus2.tool.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;

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
@RequestMapping(value = "v1/syllabus")
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

	@RequestMapping(value = "/{courseId}", method = RequestMethod.GET)
	public @ResponseBody Syllabus getSyllabus(
			@PathVariable String courseId,
			@RequestParam(value = "sectionId", required = false) String sectionId) throws NoSyllabusException {

		Syllabus syllabus = null;

		if (sectionId != null) {
			int nbParams = countParams(sectionId);
			if (nbParams <= 1) {
				// We get the syllabus of the specified section
				syllabus = osyl2Service.getSyllabus(courseId, sectionId);
			} else {
				// We get the common syllabus of the specified sections
				syllabus =
						osyl2Service.getCommonSyllabus(courseId,
								getParams(sectionId));
			}
		} else {
			syllabus = osyl2Service.getShareableSyllabus(courseId);

		}

		return syllabus;

	}

	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public @ResponseBody Object loadSyllabus() throws NoSyllabusException {

		Object syllabus = null;;
		try {
			syllabus = osyl2Service.loadSyllabus();
		} catch (NoSiteException e) {
			e.getMessage();
			return e.toJSON();
		}

		return syllabus;
	}

	@RequestMapping(value="/{siteId}", method = RequestMethod.POST)
	public @ResponseBody Syllabus createOrUpdateSyllabus(@RequestBody Syllabus syllabus) throws NoSiteException {

		return osyl2Service.createOrUpdateSyllabus(syllabus);
	}

	private int countParams(String parameters) {
		int nb = parameters.split(",").length;

		return nb;

	}

	private String[] getParams(String parameters) {

		return parameters.split(",");
	}

	@ExceptionHandler(NoSiteException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody Object handleNoSiteException(NoSiteException ex)
	{
		return "Specified site does not exist";
	}

	@ExceptionHandler(NoSyllabusException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody Syllabus handleNoSyllabusException(NoSyllabusException ex)
	{
		Syllabus syllabus = new Syllabus();
		syllabus.setCourseTitle("Hardcoded template title");
		syllabus.setTemplateId(1L);
		syllabus.setLocale("fr_CA");
		syllabus.setSiteId(ex.getSiteId());
		List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();

		//TODO: remove temp code (creates new syllabus without template)
		for (int i = 0; i<5; i++) {
			SyllabusCompositeElement e = new SyllabusCompositeElement();
			e.setDisplayOrder(i);

			switch (i) {
			case 0:
				e.setTitle("Présentation du cours");
				e.setTemplateStructureId(1L);
				break;
			case 1:
				e.setTitle("Coordonnées");
				e.setTemplateStructureId(5L);
				break;
			case 2:
				e.setTitle("Matériel pédagogique");
				e.setTemplateStructureId(7L);
				break;
			case 3:
				e.setTitle("Évaluations");
				e.setTemplateStructureId(12L);
				break;
			case 4:
				e.setTitle("Organisation du cours");
				e.setTemplateStructureId(14L);
				break;
			}
			// END hardcoded template
			elements.add(e);
		}

		syllabus.setElements(elements);

		return syllabus;
	}

}
