package ca.hec.opensyllabus2.tool.controller;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

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
	    @RequestParam(value = "sectionId", required = false) String sectionId) {

	Syllabus syllabus = null;

	try {
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
	} catch (NoSyllabusException e) {
	    e.printStackTrace();
	}

	return syllabus;

    }

    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public @ResponseBody Object loadSyllabus() {

	Object syllabus = null;;
	try {
	    syllabus = osyl2Service.loadSyllabus();
	} catch (NoSyllabusException e) {
	    e.getMessage();
	    return e.toJSON();
	} catch (NoSiteException e) {
	    e.getMessage();
	    return e.toJSON();
	}
//	Hibernate4Module hbm = new Hibernate4Module();
//	hbm.enable(Hibernate4Module.Feature.FORCE_LAZY_LOADING);
//
//	mapper.registerModule(hbm);
//	ObjectWriter w = mapper.writer();
//	String result = null;
//	result = w.writeValueAsString(syllabus);

	return syllabus;

    }

	@RequestMapping(value="/{siteId}", method = RequestMethod.POST)
	public @ResponseBody Syllabus createOrUpdateSyllabus(@RequestBody Syllabus syllabus) {

		return osyl2Service.createOrUpdateSyllabus(syllabus);
	}

    private int countParams(String parameters) {
	int nb = parameters.split(",").length;

	return nb;

    }

    private String[] getParams(String parameters) {

	return parameters.split(",");
    }

}
