package ca.hec.tenjin.impl.dao;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

public class PublishedSyllabusDaoImpl extends HibernateDaoSupport implements PublishedSyllabusDao {

	@Override
	public PublishedSyllabus getPublishedSyllabus(Long id) throws NoSyllabusException {
		PublishedSyllabus syllabus = getHibernateTemplate().get(PublishedSyllabus.class, id);
		if (syllabus == null) {
			throw new NoSyllabusException(id);
		}
		
		if(syllabus.getDeleted()) {
			throw new NoSyllabusException(id);
		}
		
		return syllabus;
	}

}
