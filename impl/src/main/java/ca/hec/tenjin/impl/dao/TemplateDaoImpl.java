package ca.hec.tenjin.impl.dao;

import java.util.List;

import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Hibernate;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.memory.api.Cache;
import org.sakaiproject.memory.api.MemoryService;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.*;
import ca.hec.tenjin.api.model.template.Template;
import ca.hec.tenjin.api.model.template.TemplateStructure;

public class TemplateDaoImpl extends HibernateDaoSupport implements TemplateDao {

	private Log log = LogFactory.getLog(TemplateDaoImpl.class);
	private static String CACHE_NAME = "ca.hec.tenjin.impl.dao.TemplateDao";
	private Cache<Long, Template> templateCache;
	private Cache<Long, TemplateStructure> templateStructureCache;

	@Setter
	private MemoryService memoryService;

	public void init() {
		templateCache = memoryService.newCache(CACHE_NAME+".Template");
		templateStructureCache = memoryService.newCache(CACHE_NAME+".TemplateStructure");
	}

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		Template t = null;

		if (templateCache != null && templateCache.containsKey(templateId)) {
			t = templateCache.get(templateId);
		}

		// Sakai Cache returns null if element does not exist/is expired
		if (t == null) {
			t = getHibernateTemplate().get(Template.class, templateId);

			// HibernateUtil.currentSession().get(OfficialProvider.class,1)
			if (t == null) {
				throw new IdUnusedException(templateId.toString());
			}

			initProviders(t.getElements());

			templateCache.put(templateId, t);
		}

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

	@Override
	public TemplateStructure getTemplateStructure(Long templateStructureId) throws IdUnusedException {
		TemplateStructure ts = null;

		if (templateStructureCache != null && templateStructureCache.containsKey(templateStructureId)) {
			ts = templateStructureCache.get(templateStructureId);
		}

		if (ts == null) {
			ts = getHibernateTemplate().get(TemplateStructure.class, templateStructureId);

			if (ts == null) {
				throw new IdUnusedException(templateStructureId.toString());
			}

			templateStructureCache.put(templateStructureId, ts);
		}
		return ts;
	}
}
