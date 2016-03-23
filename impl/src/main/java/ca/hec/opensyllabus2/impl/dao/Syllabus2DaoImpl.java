package ca.hec.opensyllabus2.impl.dao;

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

import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElementMapping;

public class Syllabus2DaoImpl extends HibernateDaoSupport implements Syllabus2Dao {

	private Log log = LogFactory.getLog(Syllabus2DaoImpl.class);

	@Override
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden) {
		String query = "from SyllabusElementMapping mapping where syllabusId = ?";
		if (!hidden) {
			query += " and hidden = false";
		}
		// these must be ordered by display order for each parent id for getStructuredSyllabusElements()
		query += " order by syllabusElement.parentId, displayOrder";
		
		List<SyllabusElementMapping> mappings = 
				getHibernateTemplate().find(query, syllabusId);

		return mappings;
	}

	@Override
	public Syllabus getSyllabus(String siteId, String sectionId, Boolean shareable, boolean hidden) {
		List<Syllabus> syllabi = 
				getHibernateTemplate().find("from Syllabus where siteId = ? and shareable = ?", siteId, shareable);
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
	public List<Syllabus> getSyllabusList(String siteId) {
		List<Syllabus> syllabi;
		if (null != siteId) {
			syllabi = getHibernateTemplate().find("from Syllabus where site_id = ?", siteId);
		} else {
			syllabi = getHibernateTemplate().find("from Syllabus");
		}
		return syllabi;
	}

	@Override
	public AbstractSyllabusElement getSyllabusElement(Long elementId) {
		List<AbstractSyllabusElement> elements;
		elements = getHibernateTemplate().find("from AbstractSyllabusElement where id = ?", elementId);
		return elements.get(0);
	}

	private List<AbstractSyllabusElement> getStructuredSyllabusElements(Long id, boolean hidden) {

		List<SyllabusElementMapping> elementMappings = this.getSyllabusElementMappings(id, hidden);
		
		List<AbstractSyllabusElement> structuredElements = new ArrayList<AbstractSyllabusElement>();
		Map<Long, AbstractSyllabusElement> elementMap = new HashMap<Long, AbstractSyllabusElement>();

    	for (SyllabusElementMapping currElementMapping : elementMappings) {
    		AbstractSyllabusElement currElement = currElementMapping.getSyllabusElement(); 
    		
    		// set the hidden property for the element (from the mapping) so it can be used in UI
    		currElement.setHidden(currElementMapping.getHidden());
    		currElement.setDisplayOrder(currElementMapping.getDisplayOrder());
    		
    		// Add current element to the lookup map (only needed if it's composite), or replace the dummy one that was inserted previously
    		if (currElement instanceof SyllabusCompositeElement) {
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
				getHibernateTemplate().find("from SyllabusElementMapping where syllabuselement_id = ?", syllabusElement.getId());
		
		getHibernateTemplate().deleteAll(mappings);
		getHibernateTemplate().delete(syllabusElement);
		
	}

	@Override
	public boolean elementHasNonCommonChildren(AbstractSyllabusElement element) {
		DetachedCriteria dc = DetachedCriteria.forClass(AbstractSyllabusElement.class);
		dc.add(Restrictions.eq("parentId", element.getId()));
		dc.add(Restrictions.eq("common", false));
		
		List<Object> children = getHibernateTemplate().findByCriteria(dc, 0, 1);
		return children.size() > 0;
	}
	
}
