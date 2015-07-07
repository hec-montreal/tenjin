package ca.hec.opensyllabus2.tool.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	private OpenSyllabus2Service openSyllabus2Service = null;

	private ResourceLoader msgs = null;

	private static Log log = LogFactory.getLog(OpenSyllabus2Controller.class);

	@PostConstruct
	public void init() {
		// retrieve ui and co messages
		msgs = new ResourceLoader("openSyllabus2");
	}

	@RequestMapping("/opensyllabus2/")
	public Syllabus getSyllabus(@RequestParam(value="courseId", defaultValue="52-701-02A.A2013.P3") String courseId)
			throws Exception {
		System.out.println ("tentative d'accès du syllabus " + courseId);
		// Retrieve syllabus
		Syllabus syllabus = openSyllabus2Service.getSyllabus(courseId);

		return syllabus;
	}

	public ModelAndView handleRequest(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("currentSiteId", openSyllabus2Service.getCurrentSiteId());
		map.put("userDisplayName",
				openSyllabus2Service.getCurrentUserDisplayName());

		return new ModelAndView("index", map);
	}

}
