package ca.hec.opensyllabus2.impl.dao;

import java.util.List;
import java.util.Set;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.sakaiproject.db.api.SqlService;
import org.sakaiproject.exception.IdUnusedException;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.opensyllabus2.api.dao.*;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusStructure;
import ca.hec.opensyllabus2.api.model.template.Template;

public class TemplateDaoImpl extends HibernateDaoSupport implements TemplateDao {

	private Log log = LogFactory.getLog(TemplateDaoImpl.class);

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		Template t = getHibernateTemplate().get(Template.class, templateId);
		if (t == null) {
			throw new IdUnusedException(templateId.toString());
		}
		return t;
	}
}
