package ca.hec.opensyllabus2.tool.controller;

import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.model.template.Template;

@Controller
@RequestMapping(value ="v1/template")
public class TemplateController {

	private static Log log = LogFactory.getLog(TemplateController.class);

	@Setter
	@Getter
	@Autowired
	private Syllabus2Service osyl2Service = null;

	@RequestMapping(value = "/{templateId}", method = RequestMethod.GET)
	public ModelAndView getTemplate(@PathVariable Long templateId) {

		Template t = osyl2Service.getTemplate(templateId);

		Map test = new HashMap<String, String>();
		test.put("id", t.getTemplate_id());
		test.put("title", t.getTitle());
		test.put("active", t.getActive());

		return new ModelAndView("jsonView", test);
	}
}