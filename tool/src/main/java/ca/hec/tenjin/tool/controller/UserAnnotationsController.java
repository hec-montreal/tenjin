package ca.hec.tenjin.tool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.UserAnnotationService;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoUserAnnotationException;
import ca.hec.tenjin.api.exception.SyllabusException;
import ca.hec.tenjin.api.model.userdata.UserAnnotation;
import ca.hec.tenjin.api.model.userdata.UserAnnotationTypes;
import lombok.Setter;

@Controller
@RequestMapping(value = "v1")
public class UserAnnotationsController {
	
	@Setter
	@Autowired
	private UserAnnotationService userAnnotationService;
	
	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;
	
	@RequestMapping(value = "/user-annotations/{syllabusId}", method = RequestMethod.GET)
	public @ResponseBody List<UserAnnotation> getAnnotationsForUserAndSyllabus(@PathVariable Long syllabusId) {
		String userId = sakaiProxy.getCurrentUserId();
		
		return userAnnotationService.getAnnotationsForUserAndSyllabus(userId, syllabusId);
	}
	
	@RequestMapping(value = "/user-annotations", method = RequestMethod.POST)
	public @ResponseBody UserAnnotation createAnnotation(@RequestBody UserAnnotation annotation) throws SyllabusException {
		annotation.setUserId(sakaiProxy.getCurrentUserId());
		
		userAnnotationService.createAnnotation(annotation);
		
		return annotation;
	}
	
	@RequestMapping(value = "/user-annotations/{publishedElementId}/{type}/delete", method = RequestMethod.POST)
	public @ResponseBody void deleteAnnotationWithType(@PathVariable("publishedElementId") Long elementId, @PathVariable("type") String type) throws DeniedAccessException, NoUserAnnotationException {
		UserAnnotationTypes uat = UserAnnotationTypes.valueOf(type);
		List<UserAnnotation> annotations = userAnnotationService.getAnnotationsForUserAndPublishedSyllabusElement(sakaiProxy.getCurrentUserId(), elementId);
		
		for (UserAnnotation annotation : annotations) {
			if (annotation.getType() == uat) {
				userAnnotationService.delete(annotation);
			}
		}
	}
}
