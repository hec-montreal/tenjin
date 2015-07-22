package ca.hec.opensyllabus2.tool.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.OpenSyllabus2Service;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

@Controller
//@RequestMapping(value ="v1/syllabus")
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

	// * is supposed to be a courseId
	@ResponseBody
	@RequestMapping(value ="v1/syllabus/*.json" , method=RequestMethod.GET)
	public String getShareableSyllabus() throws JSONException {
		Syllabus syllabus = osyl2Service.getShareableSyllabus("52-701-02A.A2013.P3");
		return new  String("\""+syllabus.getCourseTitle()+"\"");
	}

	/*@ResponseBody
	@RequestMapping(value ="v1/syllabus/*.json" , method=RequestMethod.GET)
	public String getSyllabus(@RequestParam("sectionId") String sectionId) {
		Syllabus syllabus = osyl2Service.getShareableSyllabus("52-701-02A.A2013.P3");
		return syllabus.getCourseTitle();
	}
	
	@ResponseBody
	@RequestMapping(value ="v1/syllabus/*.json" , method=RequestMethod.GET)
	public String getCommonSyllabus() {
		Syllabus syllabus = osyl2Service.getShareableSyllabus("52-701-02A.A2013.P3");
		return syllabus.getCourseTitle();
	}
*/
}
