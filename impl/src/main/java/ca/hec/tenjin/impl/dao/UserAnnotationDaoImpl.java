package ca.hec.tenjin.impl.dao;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.UserAnnonationDao;
import ca.hec.tenjin.api.model.userdata.UserAnnotation;

public class UserAnnotationDaoImpl extends HibernateDaoSupport implements UserAnnonationDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<UserAnnotation> getAnnotationsForUserAndSyllabus(String userId, Long syllabusId) {
		return (List<UserAnnotation>) getHibernateTemplate().find("from UserAnnotation where userId = ? and syllabusId = ?", userId, syllabusId);
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
