package ca.hec.opensyllabus2.tool.controller;

import java.util.List;
import java.util.Map;

import lombok.Getter;
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
	public @ResponseBody Template getTemplate(@PathVariable Long templateId) throws IdUnusedException {
		return osyl2Service.getTemplate(templateId);
	}

	@RequestMapping(value = "/{templateId}/rules", method = RequestMethod.GET)
	public @ResponseBody Map<String, List<Object>> getTemplateRules(@PathVariable Long templateId) throws IdUnusedException {
		return osyl2Service.getTemplateRules(templateId);
	}

	@ExceptionHandler(IdUnusedException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public void handleResourceNotFoundException(IdUnusedException ex)
	{
	    log.warn("user requested a resource which didn't exist", ex);
	}
}