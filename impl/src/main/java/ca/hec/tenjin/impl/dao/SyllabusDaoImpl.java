package ca.hec.tenjin.impl.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusElementMapping;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import ca.hec.tenjin.api.model.syllabus.provider.OfficialProvider;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
import lombok.Setter;

public class SyllabusDaoImpl extends HibernateDaoSupport implements SyllabusDao {

	private Log log = LogFactory.getLog(SyllabusDaoImpl.class);
	
	@Setter
	private PublishedSyllabusDao publishedSyllabusDao;
	
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

	@SuppressWarnings("unchecked")
	@Override
	public Syllabus getSyllabus(String siteId, String sectionId, Boolean common, boolean hidden) {
		List<Syllabus> syllabi = 
				(List<Syllabus>) getHibernateTemplate().find("from Syllabus where siteId = ? and common = ? and deleted = false", siteId, common);
		Syllabus syllabus = syllabi.get(0);
		syllabus.setElements(getStructuredSyllabusElements(syllabus, hidden));
		return syllabi.get(0);
	}
	
	@Override
	public Syllabus getSyllabus(Long id, boolean retrieveElements, boolean hidden) throws NoSyllabusException {
		Syllabus syllabus = getHibernateTemplate().get(Syllabus.class, id);
		
		if (syllabus == null) {
			throw new NoSyllabusException(id);
		}
		
		if(syllabus.getDeleted()) {
			throw new NoSyllabusException(id);
		}
		
		if (retrieveElements) {
			syllabus.setElements(getStructuredSyllabusElements(syllabus, hidden));
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
		return syllabi.get(0);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Syllabus> getSyllabusList(String siteId, List<String> sections, boolean commonRead, boolean commonWrite, String currentUserId ) {
		List<Syllabus> syllabi;
		if (null == siteId) {
			return null;
		}
		
		if (sections == null) {
			
			// get all the syllabus
			
			if (commonRead || commonWrite) {
				syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ? and deleted = false order by createdDate asc", siteId);
			} else {
				syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus where site_id = ? and common = 0 and deleted = false order by createdDate asc", siteId);
			}

		} else {
			// TODO : construct query string
			//String s = "from Syllabus syllabus where siteId = ? and '1c4f729a-9d95-4396-a1ae-92581d01964d' in elements(syllabus.sections)";
			//syllabi = getHibernateTemplate().find(s, siteId);
			
			String querySections = "and ( created_by='"+ currentUserId + "' ";
			if (commonRead || commonWrite) {
				querySections += " or common = 1";
			}
			for (int i = 0 ; i < sections.size(); i++) {
				querySections += " or '"+ sections.get(i) + "' in elements(syllabus.sections) ";
			}
			querySections += " ) ";

			syllabi = (List<Syllabus>) getHibernateTemplate().find("from Syllabus syllabus where site_id = ? and deleted = false "+ querySections + " order by createdDate asc" , siteId );
		}	

		return syllabi;
	}

	private AbstractSyllabusElement getProvidedContent (AbstractSyllabusElement element){
		Long providerId = element.getProviderId(); 

		//TODO: mirror provided element to syllabus element
		if (providerId != null) {
			OfficialProvider provider =  getHibernateTemplate().get(OfficialProvider.class, providerId);

			if (provider != null) {
				AbstractSyllabusElement providedElement = provider.getAbstractSyllabusElement();
				// Override title, description, public, important and attributes with the provided values.
				element.setTitle(providedElement.getTitle());
				element.setDescription(providedElement.getDescription());
				element.setPublicElement(providedElement.getPublicElement());
				element.setImportant(providedElement.getImportant());
				element.setAttributes(new HashMap<String, String>(providedElement.getAttributes()));
			}
		}

		return element;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public AbstractSyllabusElement getSyllabusElement(Long elementId) {
		List<AbstractSyllabusElement> elements;
		elements = (List<AbstractSyllabusElement>) getHibernateTemplate().find("from AbstractSyllabusElement where id = ?", elementId);
		AbstractSyllabusElement element = elements.get(0);
		element = getProvidedContent(element);
		return element;
	}

	private List<AbstractSyllabusElement> getStructuredSyllabusElements(Syllabus syllabus, boolean hidden) {

		List<SyllabusElementMapping> elementMappings = this.getSyllabusElementMappings(syllabus.getId(), hidden);
		
		List<AbstractSyllabusElement> structuredElements = new ArrayList<AbstractSyllabusElement>();
		Map<Long, AbstractSyllabusElement> elementMap = new HashMap<Long, AbstractSyllabusElement>();

    	for (SyllabusElementMapping currElementMapping : elementMappings) {
    		AbstractSyllabusElement currElement = currElementMapping.getSyllabusElement();
    		
    		// for non-common syllabuses, skip common element if it is not published
    		if (!syllabus.getCommon() && currElement.getCommon() && currElement.getPublishedId() == null) {
    			continue;
    		}
    		
    		//TODO: check if we need to move this code to the pojo to make it systematic. Fill provided content if needed
    		currElement = getProvidedContent(currElement);
    		
    		// set the hidden property for the element (from the mapping) so it can be used in UI
    		currElement.setHidden(currElementMapping.getHidden());
    		currElement.setDisplayOrder(currElementMapping.getDisplayOrder());
    		
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
				if (!syllabus.getCommon() && currElement.getCommon() && !currElement.getEqualsPublished()) {
					AbstractSyllabusElement tempElem;
					try {
						tempElem = currElement.getClass().newInstance();
						tempElem.copy(currElement);
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

					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
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
	public SyllabusRubricElement getRubric(Long parentId, Long templateStructureId) {
		DetachedCriteria dc = DetachedCriteria.forClass(SyllabusRubricElement.class);
		dc.add(Restrictions.eq("parentId", parentId));
		dc.add(Restrictions.eq("templateStructureId", templateStructureId));
		
		List<SyllabusRubricElement> l = (List<SyllabusRubricElement>) getHibernateTemplate().findByCriteria(dc);
		if (l.size() > 1) { 
			// Error! TODO exception?
			log.error("More than one rubric for the given parent id and template structure id! This is very bad");
			return null;
		} else if (l.size() == 1) {
			return l.get(0);
		} else {
			return null;
		}
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
	
}
