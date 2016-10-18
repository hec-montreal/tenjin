package ca.hec.tenjin.api;

import java.util.HashMap;

import org.sakaiproject.exception.IdUnusedException;

import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.template.Template;

/**
 * An interface to abstract all Template related operations
 *
 * @author Curtis van Osch 
 *
 */
public interface TemplateService {
	
	/**
	 * Retrieve an empty syllabus containing the required elements from a template
	 * @param templateId
	 * @param locale
	 * @return Syllabus
	 */
	public Syllabus getEmptySyllabusFromTemplate(Long templateId, String locale);

	/**
	 * Retrieves the template
	 * @param templateId
	 * @return
	 */
	public Template getTemplate(Long templateId) throws IdUnusedException;

	/**
	 * Retrieves the template rules
	 * 	that is, a mapping of TemplateStructure id's with the TemplateElements that can be added to it.
	 *
	 * @param templateId
	 * @return
	 */
	public HashMap<String, HashMap<String, Object>> getTemplateRules(Long templateId) throws IdUnusedException;
}
