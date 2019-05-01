package ca.hec.tenjin.impl.dao;

import java.util.List;

import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.UserAnnonationDao;
import ca.hec.tenjin.api.model.userdata.UserAnnotation;

public class UserAnnotationDaoImpl extends HibernateDaoSupport implements UserAnnonationDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<UserAnnotation> getAnnotationsForUserAndSyllabus(String userId, Long syllabusId) {
		return (List<UserAnnotation>) getHibernateTemplate().find("from UserAnnotation where userId = ? and syllabusId = ?", userId, syllabusId);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UserAnnotation> getAnnotationsForUserAndSyllabusElement(String userId, Long syllabusElementId) {
		return (List<UserAnnotation>) getHibernateTemplate().find("from UserAnnotation where userId = ? and elementId = ?", userId, syllabusElementId);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<UserAnnotation> getAnnotationsForSyllabusElement(Long syllabusElementId) {
		return (List<UserAnnotation>) getHibernateTemplate().find("from UserAnnotation where elementId = ?", syllabusElementId);
	}
	
	@Override
	public UserAnnotation getAnnotationById(Long id) {
		return getHibernateTemplate().get(UserAnnotation.class, id);
	}
	
	@Override
	public void save(UserAnnotation annotation) {
		getHibernateTemplate().save(annotation);
	}

	@Override
	public void delete(UserAnnotation annotation) {
		getHibernateTemplate().delete(annotation);
	}
}
