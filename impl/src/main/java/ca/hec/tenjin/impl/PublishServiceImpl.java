package ca.hec.tenjin.impl;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;
import lombok.Setter;

public class PublishServiceImpl implements PublishService {

	@Setter
	PublishedSyllabusDao publishedSyllabusDao;
	
	@Override
	public PublishedSyllabus getPublishedSyllabus(Long syllabusId) throws NoSyllabusException {
		return publishedSyllabusDao.getPublishedSyllabus(syllabusId);
	}

}
