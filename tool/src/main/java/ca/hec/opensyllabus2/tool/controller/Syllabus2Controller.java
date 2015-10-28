package ca.hec.opensyllabus2.tool.controller;

import java.util.Map;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

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

		if (sectionId != null) {
			int nbParams = countParams(sectionId);
			if (nbParams <= 1) {
				// We get the syllabus of the specified section
				syllabus = osyl2Service.getSyllabus(courseId, sectionId);
			} else {
				// We get the common syllabus of the specified sections
				syllabus = osyl2Service.getCommonSyllabus(courseId,
						getParams(sectionId));
			}
		} else {
			syllabus = osyl2Service.getShareableSyllabus(courseId);

		}

		return syllabus;

	}

	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public @ResponseBody Syllabus getSyllabus() {


		Syllabus syllabus = osyl2Service.getSiteSyllabus();
		
		return syllabus;

	}

	private int countParams(String parameters) {
		int nb = parameters.split(",").length;

		return nb;

	}

	private String[] getParams(String parameters) {

		return parameters.split(",");
	}

}
