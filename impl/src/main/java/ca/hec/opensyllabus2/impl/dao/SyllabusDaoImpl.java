package ca.hec.opensyllabus2.impl.dao;

import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.sakaiproject.db.api.SqlService;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusStructure;

public class SyllabusDaoImpl extends HibernateDaoSupport implements SyllabusDao {

	private Log log = LogFactory.getLog(SyllabusDaoImpl.class);
    private SqlService sqlService;

    public void setSqlService(SqlService sqlService) {
	this.sqlService = sqlService;
    }

    private HibernateTemplate singleRowHT;

    public SyllabusDaoImpl (){
    	
    }
    
	public Syllabus getShareableSyllabus(String courseId) throws Exception{
		List<Syllabus> results = null;
		Syllabus syllabus = null;
		
		if (courseId == null)
		    throw new IllegalArgumentException();
		
		try{
			String hql = "from Syllabus where course_id = :courseId";
			Query query = getSession().createQuery(hql);
			query.setParameter("courseId", courseId);
			results = query.list();
		} catch (Exception e) {
		    log.error("Unable to retrieve syllabus by its course id", e);
		    throw e;
	}
	
	if (results.size() >= 1) {
	    syllabus = results.get(0);
	    
	    return syllabus;
	} else{
	    throw new Exception("No syllabus with course id= " + courseId);
    }

		
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

	
	public void init(){
		singleRowHT = new HibernateTemplate(getSessionFactory());
		singleRowHT.setFetchSize(1);
		singleRowHT.setMaxResults(1);	
	}

	@Override
	public Syllabus getSyllabus(String courseId, String sectionId) throws Exception {
		List<Syllabus> results = null;
		Syllabus syllabus = null;
		Set <SyllabusStructure> syllabusStructures = null;
		
		if (courseId == null)
		    throw new IllegalArgumentException();
		
		try{
			String hql = "from Syllabus where course_id = :courseId";
			Query query = getSession().createQuery(hql);
			query.setParameter("courseId", courseId);
			results = query.list();
		} catch (Exception e) {
		    log.error("Unable to retrieve syllabus by its course id", e);
		    throw e;
	}
	
	if (results.size() >= 1) {
	    syllabus = results.get(0);
	    
	    return syllabus;
	} else{
	    throw new Exception("No syllabus with course id= " + courseId);
    }

		
	}

	@Override
	public Syllabus getCommonSyllabus(List<String> sectionIds) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}



	
	
	
//	@Override
//	public Syllabus getShareableSyllabus(String courseId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Object> getElementsSection(String elementId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Object> getElementsAttributes(String elementId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Rubric> getAllRubrics() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public String getElementsRubric(String elementId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public String getSyllabusRubric(String syllabusId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public String getSyllabusLocale(String syllabusId) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	
}
