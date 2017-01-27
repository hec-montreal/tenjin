package ca.hec.tenjin.impl.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Hibernate;
import org.sakaiproject.exception.IdUnusedException;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.*;
import ca.hec.tenjin.api.model.template.Template;
import ca.hec.tenjin.api.model.template.TemplateStructure;
import ca.hec.tenjin.api.model.syllabus.provider.*;

public class TemplateDaoImpl extends HibernateDaoSupport implements TemplateDao {

	private Log log = LogFactory.getLog(TemplateDaoImpl.class);

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		Template t = getHibernateTemplate().get(Template.class, templateId);
		
		// HibernateUtil.currentSession().get(OfficialProvider.class,1)
		if (t == null) {
			throw new IdUnusedException(templateId.toString());
		}
		
		initProviders(t.getElements());
		return t;
	}
	
		
	
	private void initProviders (List<TemplateStructure> templateStructures){
		
		for(TemplateStructure ts: templateStructures) {
//			System.out.println ("no init "+ ts.getProvider());
			if (ts.getProvider() != null){
//				System.out.print("init");
				Hibernate.initialize(ts.getProvider());

			}
			if (ts.getElements() != null)
				initProviders(ts.getElements());
		}		
	}
}
