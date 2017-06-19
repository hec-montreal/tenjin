package ca.hec.tenjin.impl;

import java.util.*;

import org.apache.log4j.Logger;
import org.sakaiproject.exception.IdUnusedException;

import ca.hec.tenjin.api.TemplateService;
import ca.hec.tenjin.api.dao.TemplateDao;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import ca.hec.tenjin.api.model.template.Template;
import ca.hec.tenjin.api.model.template.TemplateStructure;
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

				if (templateStructure.getProvider() != null){
					try {
						// TODO have to instantiate the provider (based on getClassType) to get the syllabuselement
//						element = templateStructure.getProvider().getAbstractSyllabusElement();
						element.setProviderId(templateStructure.getProvider().getProvider_id());
					} catch (Exception e) {
						log.error("Exception getting provided syllabus element from provider " +
							templateStructure.getProvider().getClass().getName());
					}
				}
				
				if (element != null) {
					String title = "";
					element.setDisplayOrder(i);
					if (templateStructure.getProvider() == null) {
						if (templateStructure.getTemplateElement().getLabels().containsKey(locale)) {
							title = templateStructure.getTemplateElement().getLabels().get(locale);
						} else {
							title = templateStructure.getTemplateElement().getLabels().get("en_US");
						}
					}
					element.setTitle(title);
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
			}

		}

		syllabus.setElements(elements);
		syllabus.setLocale(locale);
		syllabus.setTemplateId(templateId);

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
	
				//For the provided contents
				if (templateStructure.getProvider() != null){
					try {
						// TODO have to instantiate the provider (based on getClassType) to get the syllabuselement
						//el = templateStructure.getProvider().getAbstractSyllabusElement();
						el.setProviderId(templateStructure.getProvider().getProvider_id());
					} catch (Exception e) {
						log.error("Exception getting provided syllabus element from provider " +
								templateStructure.getProvider().getClass().getName());
					}
				}

				    
				if (el != null) {
					el.setDisplayOrder(i);
					if (templateStructure.getProvider() == null)
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
		
		if (!elements.isEmpty() && element.isComposite()) {
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
		String locale = Locale.getDefault().toString();
		return getTemplateRules(templateId, locale);
	}
	
	@Override
	public HashMap<String, HashMap<String, Object>> getTemplateRules(Long templateId, String language) throws IdUnusedException {
		HashMap<String, HashMap<String, Object>> results = new HashMap<String, HashMap<String, Object>>();
		
		Template t = templateDao.getTemplate(templateId);

		for (TemplateStructure elem : t.getElements()) {
			getRules(elem, results, language);
		}

		return results;
	}

	@SuppressWarnings("unchecked")
	private void getRules(TemplateStructure structure, HashMap<String, HashMap<String, Object>> map, String language) {

	    	//TODO: ?? remove provided elements from the menu
		if (structure!= null) {
			HashMap<String, Object> elementObject;
			elementObject = new HashMap<String, Object>();
			elementObject.put("displayInMenu", structure.getDisplayInMenu());
			elementObject.put("mandatory", structure.getMandatory());

			if (structure.getTemplateElement() != null) {
				if (!structure.getTemplateElement().getLabels().containsKey(language)) {
					language = Locale.getDefault().toString();
				}
				elementObject.put("label", structure.getTemplateElement().getLabels().get(language));
			}
			
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

				templateElementMap.put("provided", structure.getProvider() == null ? false:true);

				if (structure.getTemplateElement().getLabels().containsKey(language)) {
					templateElementMap.put("label", structure.getTemplateElement().getLabels().get(language));
				} else {
					// TODO: get default somewhere else?
					templateElementMap.put("label", structure.getTemplateElement().getLabels().get("fr_CA"));
				}
				
				// add child template element to the list of the parent element
				elementParentList.add(templateElementMap);
			}	
		}

		for (TemplateStructure elem : structure.getElements()) {
			getRules(elem, map, language);
		}

		return;
	}

	@Override
	public TemplateStructure getTemplateStructure(Long templateStructureId) throws IdUnusedException {
		
		return templateDao.getTemplateStructure(templateStructureId);
	}
	
}
