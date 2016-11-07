package ca.hec.tenjin.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCompositeElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabusElementMapping;

public class PublishedSyllabusDaoImpl extends HibernateDaoSupport implements PublishedSyllabusDao {

	@Override
	public PublishedSyllabus getPublishedSyllabus(Long id) throws NoSyllabusException {
		PublishedSyllabus syllabus = getHibernateTemplate().get(PublishedSyllabus.class, id);
		if (syllabus == null) {
			throw new NoSyllabusException(id);
		}
		
		if(syllabus.getDeleted()) {
			throw new NoSyllabusException(id);
		}
		
		syllabus.setElements(getStructuredPublishedSyllabusElements(id));
		
		return syllabus;
	}

	private List<AbstractPublishedSyllabusElement> getStructuredPublishedSyllabusElements(Long id) {
		List<PublishedSyllabusElementMapping> elementMappings = this.getPublishedSyllabusElementMappings(id);
		
		List<AbstractPublishedSyllabusElement> structuredElements = new ArrayList<AbstractPublishedSyllabusElement>();
		Map<Long, AbstractPublishedSyllabusElement> elementMap = new HashMap<Long, AbstractPublishedSyllabusElement>();

    	for (PublishedSyllabusElementMapping currElementMapping : elementMappings) {
    		AbstractPublishedSyllabusElement currElement = currElementMapping.getPublishedSyllabusElement(); 

    		// TODO skip hidden elements and check dates
    		// (hidden elements won't even have a published mapping)

    		currElement.setDisplayOrder(currElementMapping.getDisplayOrder());
    		
    		// Add current element to the lookup map (only needed if it's composite), or replace the dummy one that was inserted previously
    		if (currElement.isComposite()) {
    			if (elementMap.containsKey(currElement.getId())) {
    				// element map had a dummy element, transfer it's children before replacing it
    				PublishedCompositeElement uninitializedElement = (PublishedCompositeElement)elementMap.get(currElement.getId());
        			((PublishedCompositeElement)currElement).setElements(uninitializedElement.getElements());

    			} else {
        			((PublishedCompositeElement) currElement).setElements(new ArrayList<AbstractPublishedSyllabusElement>());
    			}

    			elementMap.put(currElement.getId(), currElement);
    		}

    		if (currElement.getParentId() == null) {
    			// add current element to syllabus's root nodes
    			structuredElements.add(currElement);
    		} else {
        		// add current element to it's parent (in the lookup map)
    			PublishedCompositeElement parent;

    			if (!elementMap.containsKey(currElement.getParentId())) {
    				// insert a dummy element, to be replaced later
    				parent = new PublishedCompositeElement();
    				parent.setElements(new ArrayList<AbstractPublishedSyllabusElement>());
    				elementMap.put(currElement.getParentId(), parent);
    			} else {
    				// should be safe to cast to composite, because another element specified it as a parent
    				parent = ((PublishedCompositeElement)elementMap.get(currElement.getParentId()));
    			}
    			
    			// elements are returned ordered from the query, so we can just add them
    			parent.getElements().add(currElement);

    		}
    	}

    	return structuredElements;
	}

	private List<PublishedSyllabusElementMapping> getPublishedSyllabusElementMappings(Long id) {
		String query = "from PublishedSyllabusElementMapping mapping where syllabusId = ?";
		// these must be ordered by display order for each parent id for getStructuredPublishedSyllabusElements()
		query += " order by publishedSyllabusElement.parentId, displayOrder";
		
		List<PublishedSyllabusElementMapping> mappings = 
				(List<PublishedSyllabusElementMapping>) getHibernateTemplate().find(query, id);

		return mappings;
	}

}
