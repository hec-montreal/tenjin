package ca.hec.opensyllabus2.impl.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

public class Syllabus2DaoImpl extends HibernateDaoSupport implements Syllabus2Dao {

	private Log log = LogFactory.getLog(Syllabus2DaoImpl.class);


     public Syllabus2DaoImpl (){

    }

	public Syllabus getShareableSyllabus(String courseId) throws Exception{
		List<Syllabus> syllabi =  getHibernateTemplate().find("from Syllabus where site_id = ?", courseId);
		Syllabus shareable = syllabi.get(0);

		shareable.setElements(this.getSyllabusElements(shareable.getId()));
		return shareable;
	}

	private List<AbstractSyllabusElement> getSyllabusElements(Long id) {
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
//			getHibernateTemplate().flush();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return syllabus;
	}

	public AbstractSyllabusElement saveOrUpdateSyllabusElement(AbstractSyllabusElement element) {
		try {
			getHibernateTemplate().saveOrUpdate(element);
//			getHibernateTemplate().flush();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return element;
	}

//	public SyllabusElement getSyllabusElement(Long syllabusElementId) {
//		try {
//			getHibernateTemplate();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		return syllabus;
//	}
}
