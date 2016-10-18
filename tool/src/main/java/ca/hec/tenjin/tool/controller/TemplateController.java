package ca.hec.tenjin.tool.controller;

import java.util.HashMap;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.exception.IdUnusedException;
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

	@Setter
	@Autowired
	private TemplateService templateService = null;

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
	public void handleResourceNotFoundException(IdUnusedException ex)
	{
	    log.warn("user requested a resource which didn't exist", ex);
	}
}