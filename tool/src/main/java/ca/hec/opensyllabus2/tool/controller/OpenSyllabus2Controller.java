package ca.hec.opensyllabus2.tool.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.OpenSyllabus2Service;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

@Controller
public class OpenSyllabus2Controller {

	@Setter
	@Getter
	@Autowired
	private OpenSyllabus2Service osyl2Service = null;

	private ResourceLoader msgs = null;

	private static Log log = LogFactory.getLog(OpenSyllabus2Controller.class);

	@PostConstruct
	public void init() {
		// retrieve ui and co messages
		msgs = new ResourceLoader("openSyllabus2");
	}

	@ResponseBody
	@RequestMapping(value ="/syllabus.jsp")
	public String getSyllabus() {
		Syllabus syllabus = osyl2Service.getShareableSyllabus("52-701-02A.A2013.P3");
		return syllabus.getCourseTitle();
	}

	
}
