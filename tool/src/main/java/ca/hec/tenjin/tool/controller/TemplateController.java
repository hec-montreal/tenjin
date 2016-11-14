package ca.hec.tenjin.tool.controller;

import java.util.HashMap;

import javax.annotation.PostConstruct;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.util.ResourceLoader;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import ca.hec.tenjin.api.TemplateService;
import ca.hec.tenjin.api.model.template.Template;

@Controller
@RequestMapping(value ="v1/template")
public class TemplateController {

	private static Log log = LogFactory.getLog(TemplateController.class);

	private ResourceLoader msgs = null;
	
	@Setter
	@Autowired
	private TemplateService templateService = null;
	
	@PostConstruct
	public void init() {
		// retrieve ui and co messages
		msgs = new ResourceLoader("tenjin");

	}	

	@RequestMapping(value = "/{templateId}", method = RequestMethod.GET)
	public @ResponseBody Template getTemplate(@PathVariable Long templateId) throws IdUnusedException {
		return templateService.getTemplate(templateId);
	}

	@RequestMapping(value = "/{templateId}/rules", method = RequestMethod.GET)
	public @ResponseBody HashMap<String, HashMap<String, Object>> getTemplateRules(@PathVariable Long templateId) throws IdUnusedException {
		return templateService.getTemplateRules(templateId);
	}

	@ExceptionHandler(IdUnusedException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody String handleResourceNotFoundException(IdUnusedException ex)
	{
	    return msgs.getString("tenjin.error.templateDoesNotExist");
	}
}