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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

@Controller
@RequestMapping(value ="v1/syllabus")
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

	//TODO: put correct courseId
	@RequestMapping(value = "/{courseId}", method = RequestMethod.GET)
	public ModelAndView getSyllabus(
			@PathVariable String courseId,
			@RequestParam(value = "sectionId", required = false) String sectionId)
			throws JSONException {
		
		Syllabus syllabus = null;
		
		if (sectionId != null){
			int nbParams = countParams(sectionId);
			if (nbParams <= 1){
				//We get the syllabus of the specified section
				syllabus = osyl2Service.getSyllabus("52-701-02A.A2013.P3", sectionId);
			}
			else{
				//We get the common syllabus of the specified sections
				syllabus = osyl2Service.getCommonSyllabus("52-701-02A.A2013.P3", getParams(sectionId));
			}
		}else{
			syllabus =  osyl2Service.getShareableSyllabus("52-701-02A.A2013.P3");
			
		}
		
		
		return new ModelAndView("jsonView", syllabus.getModel());
	}

private int countParams (String parameters){
	int nb =  parameters.split(",").length;
	
		return nb;
	
}

private String [] getParams (String parameters){
	
	return parameters.split(",");
}

}
