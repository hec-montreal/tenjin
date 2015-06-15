package ca.hec.opensyllabus2.impl.dao;

import java.util.List;

import org.sakaiproject.db.api.SqlService;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.template.Rubric;

public class SyllabusDaoImpl extends HibernateDaoSupport implements SyllabusDao {

    private SqlService sqlService;

    public void setSqlService(SqlService sqlService) {
	this.sqlService = sqlService;
    }

    private HibernateTemplate singleRowHT;

    public SyllabusDaoImpl (){
    	
    }
    
	public Syllabus getSyllabus(String courseId) {
		return null;
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
