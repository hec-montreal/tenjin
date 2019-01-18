package ca.hec.tenjin.impl;

import java.util.List;

import ca.hec.tenjin.api.UserAnnotationService;
import ca.hec.tenjin.api.dao.UserAnnonationDao;
import ca.hec.tenjin.api.model.userdata.UserAnnotation;
import lombok.Setter;

public class UserAnnotationServiceImpl implements UserAnnotationService {

	@Setter
	private UserAnnonationDao userAnnotationDao;
	
	@Override
	public List<UserAnnotation> getAnnotationsForUserAndSyllabus(String userId, Long syllabusId) {
		return userAnnotationDao.getAnnotationsForUserAndSyllabus(userId, syllabusId);
	}
	
	@Override
	public UserAnnotation getAnnotationById(Long id) {
		return userAnnotationDao.getAnnotationById(id);
	}
	
	@Override
	public void save(UserAnnotation annotation) {
		userAnnotationDao.save(annotation);
	}
	
	@Override
	public void delete(UserAnnotation annotation) {
		userAnnotationDao.delete(annotation);
	}
}
