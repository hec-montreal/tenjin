package ca.hec.tenjin.api;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.template.Template;
import ca.hec.tenjin.api.model.template.TemplateStructure;
import org.sakaiproject.exception.IdUnusedException;

import java.util.HashMap;

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
	public Syllabus getEmptySyllabusFromTemplate(Long templateId, String siteId, String locale);

	public AbstractSyllabusElement getProvidedElement (Long providerId, String siteId, String locale);

		/**
	 * Retrieves the template
	 * @param templateId
	 * @return
	 */
	public Template getTemplate(Long templateId) throws IdUnusedException;

	/**
	 * Retrieves the template rules in french
	 * 	that is, a mapping of TemplateStructure id's with the TemplateElements that can be added to it.
	 *
	 * @param templateId
	 * @return
	 */
	public HashMap<String, HashMap<String, Object>> getTemplateRules(Long templateId) throws IdUnusedException;

	/**
	 * Retrieves the template rules in the given language
	 * 	that is, a mapping of TemplateStructure id's with the TemplateElements that can be added to it.
	 *
	 * @param templateId
	 * @return
	 */
	public HashMap<String, HashMap<String, Object>> getTemplateRules(Long templateId, String language) throws IdUnusedException;

	/**
	 * Retrieves a TemplateStructure by id
	 *
	 * @param templateStructureId
	 * @return
	 */
	public TemplateStructure getTemplateStructure(Long templateStructureId) throws IdUnusedException;

}
