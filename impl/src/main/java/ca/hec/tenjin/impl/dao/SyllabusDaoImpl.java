package ca.hec.tenjin.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.sakaiproject.exception.IdUnusedException;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.OsylException.NoSyllabusException;
import ca.hec.tenjin.api.dao.*;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import ca.hec.tenjin.api.model.syllabus.provider.OfficialProvider;
import ca.hec.tenjin.api.model.template.Template;

public class SyllabusDaoImpl extends HibernateDaoSupport implements SyllabusDao {

	private Log log = LogFactory.getLog(SyllabusDaoImpl.class);

	@Override
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden) {
		String query = "from SyllabusElementMapping mapping where syllabusId = ?";
		if (!hidden) {
			query += " and hidden = false";
		}
		// these must be ordered by display order for each parent id for getStructuredSyllabusElements()
		query += " order by syllabusElement.parentId, displayOrder";
		
		List<SyllabusElementMapping> mappings = 
				(List<SyllabusElementMapping>) getHibernateTemplate().find(query, syllabusId);

		return mappings;
	}

	@Override
	public Syllabus getSyllabus(String siteId, String sectionId, Boolean common, boolean hidden) {
		List<Syllabus> syllabi = 
				(List<Syllabus>) getHibernateTemplate().find("from Syllabus where siteId = ? and common = ?", siteId, common);
		Syllabus syllabus = syllabi.get(0);
		syllabus.setElements(getStructuredSyllabusElements(syllabus.getId(), hidden));
		return syllabi.get(0);
	}
	
	@Override
	public Syllabus getSyllabus(Long id, boolean retrieveElements, boolean hidden) throws NoSyllabusException {
		Syllabus syllabus = getHibernateTemplate().get(Syllabus.class, id);
		
		if (syllabus == null) {
			throw new NoSyllabusException(id);
		}
		
		if (retrieveElements) {
			syllabus.setElements(getStructuredSyllabusElements(id, hidden));
		}
		
		return syllabus;
	}

	@Override
	public Syllabus getCommonSyllabus(String siteId) throws NoSyllabusException {
		List<Syllabus> syllabi = null;
		
		if (null != siteId) {
			syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ? and common = ? ", siteId, true);
		}
		if(syllabi == null){
			throw new NoSyllabusException();
		}
		return syllabi.get(0);
	}
	
	@Override
	public List<Syllabus> getSyllabusList(String siteId, List<String> sections, boolean commonRead, boolean commonWrite, String currentUserId ) {
		List<Syllabus> syllabi;
		if (null == siteId) {
			return null;
		}
		
		if (sections == null) {
			
			// get all the syllabus
			
			if (commonRead || commonWrite) {
				syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ?  order by createdDate asc", siteId);
			} else {
				syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ? and common = 0 order by createdDate asc", siteId);
			}

		} else {
			// TODO : construct query string
			//String s = "from Syllabus syllabus where siteId = ? and '1c4f729a-9d95-4396-a1ae-92581d01964d' in elements(syllabus.sections)";
			//syllabi = getHibernateTemplate().find(s, siteId);
			
			String querySections = "and ( created_by='"+ currentUserId + "' ";
			if (commonRead || commonWrite) {
				querySections += " or common = 1";
			}
			for (int i = 0 ; i < sections.size(); i++) {
				querySections += " or '"+ sections.get(i) + "' in elements(syllabus.sections) ";
			}
			querySections += " ) ";

			syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus syllabus where site_id = ? "+ querySections + " order by createdDate asc" , siteId );
		}	

		return syllabi;
	}

	private AbstractSyllabusElement getProvidedContent (AbstractSyllabusElement element){
	    Long providerId = element.getProviderId(); 
		//TODO: mirror provided element to syllabus element
	    if (providerId != null){
		OfficialProvider provider =  getHibernateTemplate().get(OfficialProvider.class, providerId);
		if (provider != null){
		    //Only title and description are different from the two elements
		    element.setTitle(provider.getAbstractSyllabusElement().getTitle());
		    element.setDescription(provider.getAbstractSyllabusElement().getDescription());
		}
	    }
	    return element;
	}
	
	@Override
	public AbstractSyllabusElement getSyllabusElement(Long elementId) {
		List<AbstractSyllabusElement> elements;
		elements = (List<AbstractSyllabusElement>) getHibernateTemplate().find("from AbstractSyllabusElement where id = ?", elementId);
		AbstractSyllabusElement element = elements.get(0);
		element = getProvidedContent(element);
		return element;
	}

	private List<AbstractSyllabusElement> getStructuredSyllabusElements(Long id, boolean hidden) {

		List<SyllabusElementMapping> elementMappings = this.getSyllabusElementMappings(id, hidden);
		
		List<AbstractSyllabusElement> structuredElements = new ArrayList<AbstractSyllabusElement>();
		Map<Long, AbstractSyllabusElement> elementMap = new HashMap<Long, AbstractSyllabusElement>();

    	for (SyllabusElementMapping currElementMapping : elementMappings) {
    		AbstractSyllabusElement currElement = currElementMapping.getSyllabusElement(); 
    		
    		//TODO: check if we need to move this code to the pojo to make it systematic. Fill provided content if needed
    		currElement = getProvidedContent(currElement);
    		
    		// set the hidden property for the element (from the mapping) so it can be used in UI
    		currElement.setHidden(currElementMapping.getHidden());
    		currElement.setDisplayOrder(currElementMapping.getDisplayOrder());
    		
    		// Add current element to the lookup map (only needed if it's composite), or replace the dummy one that was inserted previously
    		if (currElement.isComposite()) {
    			if (elementMap.containsKey(currElement.getId())) {
    				// element map had a dummy element, transfer it's children before replacing it
    				SyllabusCompositeElement uninitializedElement = (SyllabusCompositeElement)elementMap.get(currElement.getId());
        			((SyllabusCompositeElement)currElement).setElements(uninitializedElement.getElements());

    			} else {
        			((SyllabusCompositeElement) currElement).setElements(new ArrayList<AbstractSyllabusElement>());
    			}

    			elementMap.put(currElement.getId(), currElement);
    		}

    		if (currElement.getParentId() == null) {
    			// add current element to syllabus's root nodes
    			structuredElements.add(currElement);
    		} else {
        		// add current element to it's parent (in the lookup map)
    			SyllabusCompositeElement parent;

    			if (!elementMap.containsKey(currElement.getParentId())) {
    				// insert a dummy element, to be replaced later
    				parent = new SyllabusCompositeElement();
    				parent.setElements(new ArrayList<AbstractSyllabusElement>());
    				elementMap.put(currElement.getParentId(), parent);
    			} else {
    				// should be safe to cast to composite, because another element specified it as a parent
    				parent = ((SyllabusCompositeElement)elementMap.get(currElement.getParentId()));
    			}
    			
    			// elements are returned ordered from the query, so we can just add them
    			parent.getElements().add(currElement);

    		}
    	}

    	return structuredElements;
	}

	@Override
	public Object save(Object o) {
		try {
			return getHibernateTemplate().save(o);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public void delete(Object o) {
		try {
			getHibernateTemplate().delete(o);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteElementAndMappings(AbstractSyllabusElement syllabusElement) {
		
		List<SyllabusElementMapping> mappings = 
				(List<SyllabusElementMapping>) getHibernateTemplate().find("from SyllabusElementMapping where syllabuselement_id = ?", syllabusElement.getId());
		
		getHibernateTemplate().deleteAll(mappings);
		getHibernateTemplate().delete(syllabusElement);
		
	}

	@Override
	public boolean elementHasNonCommonChildren(AbstractSyllabusElement element) {
		DetachedCriteria dc = DetachedCriteria.forClass(AbstractSyllabusElement.class);
		dc.add(Restrictions.eq("parentId", element.getId()));
		dc.add(Restrictions.eq("common", false));
		
		List<Object> children = (List<Object>) getHibernateTemplate().findByCriteria(dc, 0, 1);
		return children.size() > 0;
	}
	
	@Override
	public SyllabusRubricElement getRubric(Long parentId, Long templateStructureId) {
		DetachedCriteria dc = DetachedCriteria.forClass(SyllabusRubricElement.class);
		dc.add(Restrictions.eq("parentId", parentId));
		dc.add(Restrictions.eq("templateStructureId", templateStructureId));
		
		List<SyllabusRubricElement> l = (List<SyllabusRubricElement>) getHibernateTemplate().findByCriteria(dc);
		if (l.size() > 1) { 
			// Error! TODO exception?
			log.error("More than one rubric for the given parent id and template structure id! This is very bad");
			return null;
		} else if (l.size() == 1) {
			return l.get(0);
		} else {
			return null;
		}
	}

	@Override
	public List<SyllabusElementMapping> getMappingsForElement(AbstractSyllabusElement element) {
		DetachedCriteria dc = DetachedCriteria.forClass(SyllabusElementMapping.class);
		dc.add(Restrictions.eq("syllabusElement", element));

		return (List<SyllabusElementMapping>) getHibernateTemplate().findByCriteria(dc);		
	}

	@Override
	public SyllabusElementMapping addMappingToEndOfList(Long syllabusId, AbstractSyllabusElement element) {
		
		List<Integer> maxOrderArray = (List<Integer>) getHibernateTemplate().find(
				"select max(displayOrder) from SyllabusElementMapping mapping, AbstractSyllabusElement elem "
				+ "where syllabusId = ? and elem.parentId = ?",
				syllabusId, element.getParentId());
		
		int order = 0;
		if (maxOrderArray.size() == 1) {
			order = maxOrderArray.get(0)+1;
		}
		
		SyllabusElementMapping mapping = new SyllabusElementMapping();
		mapping.setSyllabusId(syllabusId);
		mapping.setSyllabusElement(element);
		mapping.setHidden(false);
		mapping.setDisplayOrder(order);
		this.save(mapping);
		
		return mapping;
	}

	@Override
	public List<SyllabusElementMapping> getMappingsWithoutChildren(AbstractSyllabusElement syllabusElement) {
		String qry = "from SyllabusElementMapping mapping where mapping.syllabusElement.id = ? and not exists "
				+ "(from SyllabusElementMapping childMapping "
				+ "where childMapping.syllabusId = mapping.syllabusId and "
				+ "childMapping.syllabusElement.parentId = mapping.syllabusElement.id)";
				
		List<SyllabusElementMapping> mappings = (List<SyllabusElementMapping>) getHibernateTemplate().find(
				qry, syllabusElement.getId());
		
		return mappings;
	}
	
}
