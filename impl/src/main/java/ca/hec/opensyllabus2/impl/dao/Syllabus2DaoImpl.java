package ca.hec.opensyllabus2.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusCompositeElement;

public class Syllabus2DaoImpl extends HibernateDaoSupport implements Syllabus2Dao {

	private Log log = LogFactory.getLog(Syllabus2DaoImpl.class);

     public Syllabus2DaoImpl (){

    }

	public Syllabus getShareableSyllabus(String courseId) throws Exception{
		List<Syllabus> syllabi =  getHibernateTemplate().find("from Syllabus where site_id = ?", courseId);
		Syllabus shareable = syllabi.get(0);

		shareable.setElements(this.getStructuredSyllabusElements(shareable.getId()));
		return shareable;
	}

	public List<AbstractSyllabusElement> getSyllabusElements(Long id) {
		List<AbstractSyllabusElement> elements =
				getHibernateTemplate().find("from AbstractSyllabusElement where syllabus_id = ? order by parent_id, display_order", id);

		return elements;
	}

	@Override
	public Syllabus getSyllabus(String courseId, String sectionId) throws Exception {
		List<Syllabus> syllabi =  getHibernateTemplate().find("from Syllabus where site_id = ?", courseId);
		return syllabi.get(0);

	}

	@Override
	public Syllabus getCommonSyllabus(String courseId, String[] sectionIds) {
		List<Syllabus> results = null;
		Syllabus syllabus = null;
		/*
		if (courseId == null)
		    throw new IllegalArgumentException();

		try{
			String hql = "from Syllabus syll LEFT JOIN FETCH syll.syllabusStructures where site_id = :courseId";
			Query query = getSession().createQuery(hql);
			query.setParameter("courseId", courseId);
			results = query.list();
		} catch (Exception e) {
		    log.error("Unable to retrieve syllabus by its course id", e);
		    throw e;
	}

	if (results.size() >= 1) {
	    syllabus = results.get(0);
	  //syllabusStructures = syllabus.getSyllabusStructures();
	    Iterator it = syllabus.getSyllabusStructures().iterator();
	    SyllabusStructure sstructure = null;
	    while (it.hasNext()){
	    	sstructure = ((SyllabusStructure)it.next());
	    }
	    System.out.println(syllabus);
		return syllabus;
	} else{
	    throw new Exception("No syllabus with course id= " + courseId);
    }
*/
		List<Syllabus> syllabi =  getHibernateTemplate().find("from Syllabus where site_id = ?", courseId);
		return syllabi.get(0);
	}

	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) {
		try {
			getHibernateTemplate().saveOrUpdate(syllabus);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return syllabus;
	}

	public AbstractSyllabusElement saveOrUpdateSyllabusElement(AbstractSyllabusElement element) {
		log.debug("Create or update syllabus element : " + element.getId());

		try {
			getHibernateTemplate().saveOrUpdate(element);
		} catch (DuplicateKeyException e) {
			// object already loaded in the session, merge them
			getHibernateTemplate().merge(element);
		}

		return element;
	}

	public void deleteSyllabusElement(AbstractSyllabusElement element) {
		log.debug("Delete syllabus element : " + element.getId());

		try {
			getHibernateTemplate().delete(element);
		} catch (DataAccessException e) {
			e.printStackTrace();
		}

	}

	private List<AbstractSyllabusElement> getStructuredSyllabusElements(Long id) {

		List<AbstractSyllabusElement> elements = this.getSyllabusElements(id);
		List<AbstractSyllabusElement> structuredElements = new ArrayList<AbstractSyllabusElement>();
		Map<Long, AbstractSyllabusElement> elementMap = new HashMap<Long, AbstractSyllabusElement>();

    	for (AbstractSyllabusElement currElement : elements) {

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

    			parent.getElements().add(currElement.getDisplayOrder(), currElement);
    		}
    	}

    	return structuredElements;
	}

}
