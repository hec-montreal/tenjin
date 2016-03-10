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

		// TODO remove this part.
		try {
		if (syllabusId == -1L) {
			return osyl2Service.getShareableSyllabus(osyl2Service.getCurrentSiteContext());
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return osyl2Service.getSyllabus(syllabusId);
	}

	@RequestMapping(value = "/syllabus/{courseId}", method = RequestMethod.POST)
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

	private void recursiveAddElements(TemplateStructure root, AbstractSyllabusElement element, String locale, long idElement) {
		
		List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();
		for (int i = 0; i < root.getElements().size(); i++) {
			
			TemplateStructure templateStructure = root.getElements().get(i);
			if (templateStructure.getMandatory() != null && templateStructure.getMandatory() == true) {
				AbstractSyllabusElement el = null;
				
				
				String type = templateStructure.getTemplateElement().getType().getTitle();
				if ( type.equalsIgnoreCase("composite") ) {
					el = new SyllabusCompositeElement();
				} else if ( type.equalsIgnoreCase("rubric") ) {
					el = new SyllabusRubricElement();
				}
	
				if (el != null) {
					el.setDisplayOrder(i);
					el.setTitle(templateStructure.getTemplateElement().getLabels().get(locale));
					el.setTemplateStructureId(templateStructure.getId());
					long idEl = idElement*1000 - i;
					el.setId(idEl);
					
					// recursion on the children
					recursiveAddElements(templateStructure, el, locale, idEl);
					
					elements.add(el);
				}
			}
			
		}
		
		if (!elements.isEmpty() && element instanceof SyllabusCompositeElement) {
			((SyllabusCompositeElement)element).setElements(elements);
		}
		
	}
	
	private Syllabus initSyllabusFromTemplate(Template root, Syllabus syllabus, String locale) {

		long level = -1;
		
		List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();
		for (int i = 0; i < root.getElements().size(); i++) {

			TemplateStructure templateStructure = root.getElements().get(i);
			if (templateStructure.getMandatory() != null && templateStructure.getMandatory() == true) {
				AbstractSyllabusElement element = null;

				String type = templateStructure.getTemplateElement().getType().getTitle();
				if ( type.equalsIgnoreCase("composite") ) {
					element = new SyllabusCompositeElement();
				} else if ( type.equalsIgnoreCase("rubric") ) {
					element = new SyllabusRubricElement();
				}

				if (element != null) {
					element.setDisplayOrder(i);
					element.setTitle(templateStructure.getTemplateElement().getLabels().get(locale));
					element.setTemplateStructureId(templateStructure.getId());
					long idElement = level*1000 - i;
					element.setId(idElement);

					// recursion on the children
					recursiveAddElements(templateStructure, element, locale, idElement);
					
					elements.add(element);
				}
				// add other types

			}

		}

		syllabus.setElements(elements);

		return syllabus;
	}

	@ExceptionHandler(NoSiteException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody Object handleNoSiteException(NoSiteException ex) {
		return "Specified site does not exist";
	}

	@ExceptionHandler(NoSyllabusException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody Syllabus handleNoSyllabusException(NoSyllabusException ex) {
		Syllabus syllabus = new Syllabus();
		syllabus.setTitle("Default title");
		syllabus.setTemplateId(1L);
		syllabus.setLocale("fr_CA");
		
		//List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();

		// get bac template
		try {
			Template template = osyl2Service.getTemplate(1L);

			syllabus = initSyllabusFromTemplate(template, syllabus, syllabus.getLocale());

			try {
				syllabus.setSiteId(osyl2Service.getCurrentSiteContext());
				syllabus.setCourseTitle(osyl2Service.getCurrentSiteContext());
				syllabus.setShareable(true);
			} catch (Exception e) {
				log.error("No context found");
			}

		} catch (IdUnusedException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		return syllabus;
	}

}
