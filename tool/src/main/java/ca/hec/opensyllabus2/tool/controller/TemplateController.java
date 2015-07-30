package ca.hec.opensyllabus2.tool.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.stereotype.Controller;

import ca.hec.opensyllabus2.api.model.template.Template;


@Controller
@RequestMapping(value ="v1/template")
public class TemplateController {

	private static Log log = LogFactory.getLog(TemplateController.class);

	@RequestMapping(value = "/{templateId}", method = RequestMethod.GET)
	public ModelAndView getTemplate(@PathVariable String templateId) {

		Template t = new Template(1L, "template title 1", true);


		Map test = new HashMap<String, String>();
		test.put("id", t.getTemplate_id());
		test.put("title", t.getTitle());
		test.put("active", t.getActive());

		return new ModelAndView("jsonView", test);
	}
}