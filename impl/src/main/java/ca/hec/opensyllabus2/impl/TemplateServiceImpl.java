package ca.hec.opensyllabus2.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.sakaiproject.exception.IdUnusedException;

import ca.hec.opensyllabus2.api.TemplateService;
import ca.hec.opensyllabus2.api.dao.TemplateDao;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusRubricElement;
import ca.hec.opensyllabus2.api.model.template.Template;
import ca.hec.opensyllabus2.api.model.template.TemplateStructure;
import lombok.Setter;

public class TemplateServiceImpl implements TemplateService {

	private static final Logger log = Logger.getLogger(TemplateServiceImpl.class);

    @Setter
	private TemplateDao templateDao;

	@Override
	public Syllabus getEmptySyllabusFromTemplate(Long templateId, String locale) {
		Template template = null; 
		Syllabus syllabus = new Syllabus();
		long level = -1;
		
		try {
			template = getTemplate(templateId);
		} catch (IdUnusedException e) {
			log.error("Requested template does not exist");
			return null;
		}
		
		log.debug("traverse template and create syllabus");
		List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();
		for (int i = 0; i < template.getElements().size(); i++) {

			TemplateStructure templateStructure = template.getElements().get(i);
			if (templateStructure.getMandatory() != null && templateStructure.getMandatory() == true) {
				AbstractSyllabusElement element = null;

				String type = templateStructure.getTemplateElement().getType().getTitle();
				if ( type.equalsIgnoreCase("composite") ) {
					element = new SyllabusCompositeElement();
				} else if ( type.equalsIgnoreCase("rubric") ) {
					element = new SyllabusRubricElement();
				}

				if (element != null) {
					element.setDisplayOrder(i);
					element.setTitle(templateStructure.getTemplateElement().getLabels().get(locale));
					element.setTemplateStructureId(templateStructure.getId());
					long idElement = level*1000 - i;
					element.setId(idElement);
					element.setPublicElement(true);
					element.setHidden(false);
					element.setImportant(false);
					element.setCommon(true);

					// recursion on the children
					recursiveAddElements(templateStructure, element, locale, idElement);
					
					elements.add(element);
				}
				// add other types
			}

		}

		syllabus.setElements(elements);

		return syllabus;
	}

	private void recursiveAddElements(TemplateStructure root, AbstractSyllabusElement element, String locale, long idElement) {
		
		List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();
		for (int i = 0; i < root.getElements().size(); i++) {
			
			TemplateStructure templateStructure = root.getElements().get(i);
			if (templateStructure.getMandatory() != null && templateStructure.getMandatory() == true) {
				AbstractSyllabusElement el = null;
				
				
				String type = templateStructure.getTemplateElement().getType().getTitle();
				if ( type.equalsIgnoreCase("composite") ) {
					el = new SyllabusCompositeElement();
				} else if ( type.equalsIgnoreCase("rubric") ) {
					el = new SyllabusRubricElement();
				}
	
				if (el != null) {
					el.setDisplayOrder(i);
					el.setTitle(templateStructure.getTemplateElement().getLabels().get(locale));
					el.setTemplateStructureId(templateStructure.getId());
					long idEl = idElement*1000 - i;
					el.setId(idEl);
					el.setPublicElement(true);
					el.setHidden(false);
					el.setImportant(false);
					el.setCommon(true);
					
					// recursion on the children
					recursiveAddElements(templateStructure, el, locale, idEl);
					
					elements.add(el);
				}
			}
			
		}
		
		if (!elements.isEmpty() && element instanceof SyllabusCompositeElement) {
			((SyllabusCompositeElement)element).setElements(elements);
		}
		
	}
	
	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		log.debug("start getTemplate");
		return templateDao.getTemplate(templateId);
	}

	@Override
	public HashMap<String, HashMap<String, Object>> getTemplateRules(Long templateId) throws IdUnusedException {
		HashMap<String, HashMap<String, Object>> results = new HashMap<String, HashMap<String, Object>>();
		
		Template t = templateDao.getTemplate(templateId);

		for (TemplateStructure elem : t.getElements()) {
			getRules(elem, results);
		}

		return results;
	}

	/*
	 * il faudra au moins mettre les valeurs en cache?
	 * ZCII-2008
	 */
	private void getRules(TemplateStructure structure, HashMap<String, HashMap<String, Object>> map) {

		if (structure!= null) {
			HashMap<String, Object> elementObject;
			elementObject = new HashMap<String, Object>();
			elementObject.put("displayInMenu", structure.getDisplayInMenu());
			elementObject.put("mandatory", structure.getMandatory());		
			// add template structure to the main map
			map.put(structure.getId().toString(), elementObject);
			
			// if the element has a parent and is not mandatory, then add this one to the parent elements list
			List<Object> elementList;
			if (structure.getParentId() != null) {
				String parentId = structure.getParentId().toString();
				HashMap<String, Object> parentObject = map.get(parentId);
		
				List<Object> elementParentList = (List<Object>) parentObject.get("elements");
				if (elementParentList == null) {
					elementParentList = new ArrayList<Object>();
					parentObject.put("elements", elementParentList);
				}
	
				Map<String, Object> templateElementMap = new HashMap<String, Object>();
				templateElementMap.put("id", structure.getId());
				templateElementMap.put("type", structure.getTemplateElement().getType().getTitle());
				templateElementMap.put("label", structure.getTemplateElement().getLabels().get("fr_CA"));
				// add child template element to the list of the parent element
				elementParentList.add(templateElementMap);
			}	
		}

		for (TemplateStructure elem : structure.getElements()) {
			getRules(elem, map);
		}

		return;
	}
	
}
