package ca.hec.opensyllabus2.impl.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

public class Syllabus2DaoImpl extends HibernateDaoSupport implements Syllabus2Dao {

	private Log log = LogFactory.getLog(Syllabus2DaoImpl.class);


     public Syllabus2DaoImpl (){

    }

	public Syllabus getShareableSyllabus(String courseId) throws Exception{
		List<Syllabus> syllabi =  getHibernateTemplate().find("from Syllabus where site_id = ?", courseId);
		return syllabi.get(0);
	}



	@Override
	public boolean createSyllabus(String courseId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean removeSyllabus(String courseId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean updateSyllabus(String courseId) {
		// TODO Auto-generated method stub
		return false;
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
}
