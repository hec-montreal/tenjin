package ca.hec.tenjin.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.TenjinProperties;
import ca.hec.tenjin.api.UserAnnotationService;
import ca.hec.tenjin.api.dao.UserAnnonationDao;
import ca.hec.tenjin.api.model.userdata.UserAnnotation;
import ca.hec.tenjin.api.model.userdata.UserAnnotationTypes;
import lombok.Setter;

public class UserAnnotationServiceImpl implements UserAnnotationService {

	@Setter
	private UserAnnonationDao userAnnotationDao;

	@Setter
	private SakaiProxy sakaiProxy;

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

	@Override
	public List<String> getEnabledElementTypesForAnnotationType(UserAnnotationTypes type) {
		String enabled = sakaiProxy.getSakaiProperty(TenjinProperties.PROPERTY_USERDATA_CHECK_ENABLED_ELEMENT_TYPES.replace("$TYPE$", type.name().toLowerCase()));

		if (enabled == null || enabled.length() == 0) {
			return new ArrayList<>();
		}

		return Arrays.asList(enabled.split(","));
	}

	@Override
	public List<String> getDefaultElementTypesForAnnotationType(UserAnnotationTypes type) {
		String def = sakaiProxy.getSakaiProperty(TenjinProperties.PROPERTY_USERDATA_CHECK_DEFAULT_ELEMENT_TYPES.replace("$TYPE$", type.name().toLowerCase()));

		if (def == null || def.length() == 0) {
			return new ArrayList<>();
		}

		return Arrays.asList(def.split(","));
	}
}
