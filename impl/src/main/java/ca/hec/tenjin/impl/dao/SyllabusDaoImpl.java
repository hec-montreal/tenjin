package ca.hec.tenjin.impl.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jdbc.Work;
import org.sakaiproject.db.api.SqlService;
import org.sakaiproject.exception.IdUnusedException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import ca.hec.tenjin.api.TemplateService;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
import ca.hec.tenjin.api.model.template.TemplateStructure;
import lombok.Setter;
import osid.sql.SqlException;

public class SyllabusDaoImpl extends HibernateDaoSupport implements SyllabusDao {

	private Log log = LogFactory.getLog(SyllabusDaoImpl.class);
	
	@Setter
	private PublishedSyllabusDao publishedSyllabusDao;
	
	@Setter
	private TemplateService templateService;
	
	@Setter
	private SqlService sqlService;


	
	@SuppressWarnings("unchecked")
	@Override
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden) {
		String query = "from SyllabusElementMapping mapping where syllabusId = ?";
		if (!hidden) {
			query += " and hidden = false";
		}
		// these must be ordered by display order for each parent id for getStructuredSyllabusElements()
		query += " order by syllabusElement.parentId, displayOrder";
		
		List<SyllabusElementMapping> mappings = 
				(List<SyllabusElementMapping>) getHibernateTemplate().find(query, syllabusId);

		return mappings;
	}

	@Override
	public List<SyllabusElementMapping> getSyllabusElementMappingsForParent(Long syllabusId, Long parentElementId) {
		String query = "from SyllabusElementMapping mapping where syllabusId = ? and syllabusElement.parentId = ?";
		query += " order by syllabusElement.parentId, displayOrder";

		List<SyllabusElementMapping> mappings =
				(List<SyllabusElementMapping>) getHibernateTemplate().find(query, syllabusId, parentElementId);

		return mappings;
	}

	@Override
	public Syllabus getSyllabus(Long id) throws NoSyllabusException {
		Syllabus syllabus = getHibernateTemplate().get(Syllabus.class, id);
		
		if (syllabus == null || syllabus.getDeleted()) {
			throw new NoSyllabusException(id);
		}
		
		return syllabus;
	}
	
	@Override
	public Syllabus getStructuredSyllabus(Long id) throws NoSyllabusException, StructureSyllabusException {
		Syllabus syllabus = getSyllabus(id);
		
		try {
			syllabus.setElements(getStructuredSyllabusElements(syllabus));
		} catch (Exception e) {
			throw new StructureSyllabusException(e);
		}
		
		return syllabus;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Syllabus getCommonSyllabus(String siteId) throws NoSyllabusException {
		List<Syllabus> syllabi = null;
		
		if (null != siteId) {
			syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ? and common = ? and deleted = false", siteId, true);
		}
		if(syllabi == null){
			throw new NoSyllabusException();
		}

		if (syllabi.size() > 0)
			return syllabi.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Syllabus> getSyllabusList(String siteId) {
		List<Syllabus> syllabi;
		if (null == siteId) {
			return null;
		}
		
		syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ? and deleted = false order by createdDate asc", siteId);

		return syllabi;
	}

	@SuppressWarnings("unchecked")
	@Override
	public AbstractSyllabusElement getSyllabusElement(Long elementId) {
		List<AbstractSyllabusElement> elements;
		elements = (List<AbstractSyllabusElement>) getHibernateTemplate().find("from AbstractSyllabusElement where id = ?", elementId);
		AbstractSyllabusElement element = elements.get(0);
		return element;
	}

	private List<AbstractSyllabusElement> getStructuredSyllabusElements(Syllabus syllabus) throws InstantiationException, IllegalAccessException, IdUnusedException {

		List<SyllabusElementMapping> elementMappings = this.getSyllabusElementMappings(syllabus.getId(), true);
		
		List<AbstractSyllabusElement> structuredElements = new ArrayList<AbstractSyllabusElement>();
		Map<Long, AbstractSyllabusElement> elementMap = new HashMap<Long, AbstractSyllabusElement>();
		
    	for (SyllabusElementMapping currElementMapping : elementMappings) {
    		AbstractSyllabusElement currElement = currElementMapping.getSyllabusElement();
    		
		TemplateStructure templateStructure = null;
		if (currElement.getTemplateStructureId() != null && currElement.getTemplateStructureId() > 0)
			templateStructure = templateService.getTemplateStructure(currElement.getTemplateStructureId());

			// for non-common syllabuses, skip common element if it is not published
			// (and is not a rubric, from the template, or provided)
    		if (!syllabus.getCommon() &&
				currElement.getCommon() &&
    			currElement.getPublishedId() == null &&
				currElement.getProviderId() == null &&
				!(currElement instanceof SyllabusRubricElement) && 
				(templateStructure != null && !templateStructure.getMandatory())) {
    			continue;
    		}
	    		
    		// set the hidden, equalsPublished and display order property for the element (from the mapping) so it can be used in UI
    		currElement.setHidden(currElementMapping.getHidden());
			currElement.setDisplayOrder(currElementMapping.getDisplayOrder());
			if (currElementMapping.getEqualsPublished() != null && currElementMapping.getEqualsPublished() == false) {
				currElement.setMappingEqualsPublished(false);
			}
    		
    		// Add current element to the lookup map (only needed if it's composite), or replace the dummy one that was inserted previously
    		if (currElement.isComposite()) {
    			if (elementMap.containsKey(currElement.getId())) {
    				// element map had a dummy element, transfer it's children before replacing it
    				SyllabusCompositeElement uninitializedElement = (SyllabusCompositeElement)elementMap.get(currElement.getId());
        			((SyllabusCompositeElement)currElement).setElements(uninitializedElement.getElements());

    			} else {
        			((SyllabusCompositeElement) currElement).setElements(new ArrayList<AbstractSyllabusElement>());
    			}

    			elementMap.put(currElement.getId(), currElement);
    		}

    		if (currElement.getParentId() == null) {
    			// add current element to syllabus's root nodes
    			structuredElements.add(currElement);
    		} else {
        		// add current element to it's parent (in the lookup map)
    			SyllabusCompositeElement parent;

    			if (!elementMap.containsKey(currElement.getParentId())) {
    				// insert a dummy element, to be replaced later
    				parent = new SyllabusCompositeElement();
    				parent.setElements(new ArrayList<AbstractSyllabusElement>());
    				elementMap.put(currElement.getParentId(), parent);
    			} else {
    				// should be safe to cast to composite, because another element specified it as a parent
    				parent = ((SyllabusCompositeElement)elementMap.get(currElement.getParentId()));
    			}
    			
				// if the common element is not equal to the published version, replace it with that one
				if (!syllabus.getCommon() && currElement.getCommon() && !currElement.getEqualsPublished() && currElement.getPublishedId() != null) {
					AbstractSyllabusElement tempElem;

					tempElem = currElement.getClass().newInstance();
					tempElem.copyFrom(currElement);
					AbstractPublishedSyllabusElement publishedElem = publishedSyllabusDao.getPublishedElement(currElement.getPublishedId());

					// overwrite these values with published data
					tempElem.setTitle(publishedElem.getTitle());
					tempElem.setAttributes(new HashMap<String, String>(publishedElem.getAttributes()));
					tempElem.setDescription(publishedElem.getDescription());
					tempElem.setAvailabilityStartDate(publishedElem.getAvailabilityStartDate());
					tempElem.setAvailabilityEndDate(publishedElem.getAvailabilityEndDate());
					if (publishedElem.getAvailabilityStartDate() != null || publishedElem.getAvailabilityEndDate() != null) {
						tempElem.setHasDatesInterval(true);
					}
					tempElem.setImportant(publishedElem.getImportant());
					tempElem.setPublicElement(publishedElem.getPublicElement());

					parent.getElements().add(tempElem);
				} else {
    				// elements are returned ordered from the query, so we can just add them
    				parent.getElements().add(currElement);

				}
    		}
    	}
    	return structuredElements;
	}

	@Override
	public Object save(Object o) {
		try {
			return getHibernateTemplate().save(o);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(Object o) {
		try {
			getHibernateTemplate().update(o);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean saveOrUpdate(Object o) {
	    System.out.println(" saveOrUpdate");
		try {
			getHibernateTemplate().saveOrUpdate(o);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public void deleteSyllabusObject(Object o) {
		try {
			getHibernateTemplate().delete(o);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void softDeleteSyllabus(Syllabus syllabus)
	{
		syllabus.setDeleted(true);
		
		try {
			getHibernateTemplate().update(syllabus);		
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public void deleteElementAndMappings(AbstractSyllabusElement syllabusElement) {
		
		List<SyllabusElementMapping> mappings = 
				(List<SyllabusElementMapping>) getHibernateTemplate().find("from SyllabusElementMapping where syllabuselement_id = ?", syllabusElement.getId());
		
		getHibernateTemplate().deleteAll(mappings);
		getHibernateTemplate().delete(syllabusElement);
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean elementHasNonCommonChildren(AbstractSyllabusElement element) {
		DetachedCriteria dc = DetachedCriteria.forClass(AbstractSyllabusElement.class);
		dc.add(Restrictions.eq("parentId", element.getId()));
		dc.add(Restrictions.eq("common", false));
		
		List<Object> children = (List<Object>) getHibernateTemplate().findByCriteria(dc, 0, 1);
		return children.size() > 0;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SyllabusElementMapping> getMappingsForElement(AbstractSyllabusElement element) {
		DetachedCriteria dc = DetachedCriteria.forClass(SyllabusElementMapping.class);
		dc.add(Restrictions.eq("syllabusElement", element));

		return (List<SyllabusElementMapping>) getHibernateTemplate().findByCriteria(dc);		
	}

	@SuppressWarnings("unchecked")
	@Override
	public SyllabusElementMapping getMappingForSyllabusAndElement(Long syllabusId, Long elementId) {
		List<SyllabusElementMapping> mappings = 
				(List<SyllabusElementMapping>) getHibernateTemplate().find("from SyllabusElementMapping where syllabus_id = ? and syllabuselement_id = ?", 
						syllabusId, elementId);

		if (mappings.size() == 1) {
			return mappings.get(0);
		} else if (mappings.size() > 1) {
			log.error("more than 1 syllabus element mapping in syllabus "+syllabusId+" for element "+elementId);
		}

		return null;
	}

	@Override
	public Map<String, Object> getSectionsBySyllabus(String siteId) {
		Query query = getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(
				"select TENJIN_SYLLABUSSECTION.SECTION, TENJIN_SYLLABUS.SYLLABUS_ID from TENJIN_SYLLABUSSECTION, TENJIN_SYLLABUS " +
						"where TENJIN_SYLLABUS.SYLLABUS_ID = TENJIN_SYLLABUSSECTION.SYLLABUS_ID AND TENJIN_SYLLABUS.DELETED = 0 and TENJIN_SYLLABUS.SITE_ID like ?");
		List<Object[]> queryResult = query.setString(0, siteId).list();

		Map<String, Object> sectionsAndSyllabi = new HashMap<>();

		for (Object[] row: queryResult){
			sectionsAndSyllabi.put((String)row[0], (Object)row[1]);
		}

		return sectionsAndSyllabi;
	}

	public void deleteSection(String syllabusId, String sectionId) {
		Query query = getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(
				"delete TENJIN_SYLLABUSSECTION where syllabus_id = :syllabusId and section= :sectionId");
		query.setParameter("syllabusId", syllabusId);
		query = query.setParameter("sectionId", sectionId);

		query.executeUpdate();

	}

	@Override
	public void addSection(String syllabusId, String sectionId) {

		Query query = getHibernateTemplate().getSessionFactory().getCurrentSession().createSQLQuery(
				"insert into TENJIN_SYLLABUSSECTION (syllabus_id,section) values (?,?)");
		query = query.setString(0, syllabusId);
		query = query.setString(1, sectionId);

		query.executeUpdate();

	}

	@SuppressWarnings("unchecked")
	@Override
	public SyllabusElementMapping addMappingToEndOfList(Long syllabusId, AbstractSyllabusElement element) {
		
		List<Integer> maxOrderArray = (List<Integer>) getHibernateTemplate().find(
				"select max(displayOrder) from SyllabusElementMapping mapping, AbstractSyllabusElement elem "
				+ "where syllabusId = ? and elem.parentId = ?",
				syllabusId, element.getParentId());
		
		int order = 0;
		if (maxOrderArray.size() == 1) {
			order = maxOrderArray.get(0)+1;
		}
		
		SyllabusElementMapping mapping = new SyllabusElementMapping();
		mapping.setSyllabusId(syllabusId);
		mapping.setSyllabusElement(element);
		mapping.setHidden(false);
		mapping.setDisplayOrder(order);
		this.save(mapping);
		
		return mapping;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SyllabusElementMapping> getMappingsWithoutChildren(AbstractSyllabusElement syllabusElement) {
		String qry = "from SyllabusElementMapping mapping where mapping.syllabusElement.id = ? and not exists "
				+ "(from SyllabusElementMapping childMapping "
				+ "where childMapping.syllabusId = mapping.syllabusId and "
				+ "childMapping.syllabusElement.parentId = mapping.syllabusElement.id)";
				
		List<SyllabusElementMapping> mappings = (List<SyllabusElementMapping>) getHibernateTemplate().find(
				qry, syllabusElement.getId());
		
		return mappings;
	}

	@Override
	public void detach(Object o) {
		getHibernateTemplate().getSessionFactory().getCurrentSession().evict(o);
	}

	@Override
	public List<AbstractSyllabusElement> getChildrenForSyllabusElement(SyllabusCompositeElement parent) {
		String query = "from AbstractSyllabusElement elem where parentId = ?";

		List<AbstractSyllabusElement> elements =
				(List<AbstractSyllabusElement>) getHibernateTemplate().find(query, parent.getId());

		return elements;
	}

	@Override
	public List<AbstractSyllabusElement> getSyllabusElementsForTemplateStructureAndSite(Long templateStructureId, String siteId) {
		String query = "from AbstractSyllabusElement elem where siteId = ? and templateStructureId = ?";

		List<AbstractSyllabusElement> elements =
				(List<AbstractSyllabusElement>) getHibernateTemplate().find(query, siteId, templateStructureId);

		return elements;
	}

	public boolean isElementMappedToSyllabus(Long elementId, Long syllabusId) {
		String qry = "from SyllabusElementMapping mapping where mapping.syllabusElement.id = ? and mapping.syllabusId = ?";

		List<SyllabusElementMapping> mappings = (List<SyllabusElementMapping>) getHibernateTemplate().find(
				qry, elementId, syllabusId);

		return mappings.size()>0;

	}

	@Override
	public boolean cleanupSite(String siteId) {
		List<Syllabus> siteSyllabi = getSyllabusList(siteId);
		List<AbstractSyllabusElement> syllabusElements;
		List<SyllabusElementMapping> syllabusElementMappings;
		return false;
	}

    @Override
    public void batchUpdateAfterPublish(List<AbstractSyllabusElement> elements)
	    throws SQLException {
	currentSession().doWork(new Work() {
	    @Override
	    public void execute(Connection conn) throws SQLException {
		PreparedStatement pstmt = null;
		int count = 0;
		try {
		    pstmt = conn.prepareStatement(
			    "update TENJIN_SYLLABUSELEMENT set PUBLISHED_ID=?,"
				    + "EQUALS_PUBLISHED=? where SYLLABUSELEMENT_ID=?");
		    for (AbstractSyllabusElement el : elements) {
			pstmt.setLong(1, el.getPublishedId());// PUBLISHED_ID NUMBER(19,0)
			pstmt.setBoolean(2, el.getEqualsPublished());// EQUALS_PUBLISHED NUMBER(1,0)
			pstmt.setLong(3, el.getId());// SYLLABUSELEMENT_ID
			pstmt.addBatch();

		    }

		    pstmt.executeBatch();

		} catch (SQLException e) {
		    throw e;
		} catch (Exception e) {
		    e.printStackTrace();
		}

	    }
	});

    }
}
