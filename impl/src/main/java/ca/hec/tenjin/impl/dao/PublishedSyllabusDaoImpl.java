package ca.hec.tenjin.impl.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.sakaiproject.content.api.ContentResource;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.dao.PublishedSyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCompositeElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedDocumentElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedImageElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabusElementMapping;
import lombok.Setter;

public class PublishedSyllabusDaoImpl extends HibernateDaoSupport implements PublishedSyllabusDao {
	private Log log = LogFactory.getLog(PublishedSyllabusDaoImpl.class);

	@Setter
	SakaiProxy sakaiProxy;

	@Override
	public PublishedSyllabus getPublishedSyllabus(Long id, boolean includeElements) throws NoSyllabusException {
		PublishedSyllabus syllabus = getHibernateTemplate().get(PublishedSyllabus.class, id);

		if (syllabus == null || syllabus.getDeleted() || syllabus.getPublishedDate() == null) {
			throw new NoSyllabusException(id);
		}

		if (includeElements) {
			syllabus.setElements(getStructuredPublishedSyllabusElements(id, false));
		}

		return syllabus;
	}

	@SuppressWarnings("unchecked")
	@Override
	public PublishedSyllabus getPublishedSyllabusOrNull(String siteId, String sectionId) {
		List<PublishedSyllabus> lst = (List<PublishedSyllabus>) getHibernateTemplate().find("from PublishedSyllabus where site_id = ? and publishedDate <> null and deleted = false", siteId);

		if (lst.size() == 0) {
			return null;
		}

		PublishedSyllabus ret = null;

		// If sectionId is specified, try to get the published version for this
		// section
		if (sectionId != null && sectionId.length() > 0) {
			for (PublishedSyllabus p : lst) {
				for (String section : p.getSections()) {
					if (section.equals(sectionId)) {
						ret = p;

						break;
					}
				}

				if (ret != null) {
					break;
				}
			}
		}

		// At this point, if ret is null, either no sectionId was specified or
		// no syllabus was found for the sectionId so we try to fetch the common
		// syllabus
		if (ret == null) {
			for (PublishedSyllabus p : lst) {
				if (p.getCommon()) {
					ret = p;

					break;
				}
			}
		}

		if (ret != null) {
			ret.setElements(getStructuredPublishedSyllabusElements(ret.getId(), false));
		}

		// If ret is still null here, no valid published syllabus was found

		return ret;
	}

	@Override
	public PublishedSyllabus getPublicSyllabus(Long id) throws NoSyllabusException {
		PublishedSyllabus ret = getPublishedSyllabus(id, false);
		
		if (ret == null || ret.getDeleted() || ret.getPublishedDate() == null) {
			throw new NoSyllabusException(id);
		}
		
		ret.setElements(getStructuredPublishedSyllabusElements(id, true));
		
		return ret;
	}
	
	@Override
	public AbstractPublishedSyllabusElement getPublishedElement(Long id) {
		return getHibernateTemplate().get(AbstractPublishedSyllabusElement.class, id);
	}

	private List<AbstractPublishedSyllabusElement> getStructuredPublishedSyllabusElements(Long id, boolean onlyPublicElements) {
		List<PublishedSyllabusElementMapping> elementMappings = this.getPublishedSyllabusElementMappings(id);

		List<AbstractPublishedSyllabusElement> structuredElements = new ArrayList<AbstractPublishedSyllabusElement>();
		Map<Long, AbstractPublishedSyllabusElement> elementMap = new HashMap<Long, AbstractPublishedSyllabusElement>();

		for (PublishedSyllabusElementMapping currElementMapping : elementMappings) {
			AbstractPublishedSyllabusElement currElement = currElementMapping.getPublishedSyllabusElement();

			// Skip elements whose dates make them unavailable
			if (!isElementAvailable(currElement)) {
				continue;
			}
			
			// Skip private only elements
			if(onlyPublicElements) {
				if(currElement.getPublicElement() != null && currElement.getPublicElement() != true) {
					continue;
				}
			}
			
			// TODO?: correct the displayOrder in case there are
			// hidden/unavailable elements (otherwise some numbers are skipped
			// in the order)
			currElement.setDisplayOrder(currElementMapping.getDisplayOrder());
			
			// Add current element to the lookup map (only needed if it's
			// composite), or replace the dummy one that was inserted previously
			if (currElement.isComposite()) {
				if (elementMap.containsKey(currElement.getId())) {
					// element map had a dummy element, transfer it's children
					// before replacing it
					PublishedCompositeElement uninitializedElement = (PublishedCompositeElement) elementMap.get(currElement.getId());
					((PublishedCompositeElement) currElement).setElements(uninitializedElement.getElements());

				} else {
					((PublishedCompositeElement) currElement).setElements(new ArrayList<AbstractPublishedSyllabusElement>());
				}

				elementMap.put(currElement.getId(), currElement);
			}

			if (currElement.getParentId() == null) {
				// add current element to syllabus's root nodes
				structuredElements.add(currElement);
			} else {
				// add current element to it's parent (in the lookup map)
				PublishedCompositeElement parent;

				if (!elementMap.containsKey(currElement.getParentId())) {
					// insert a dummy element, to be replaced later
					parent = new PublishedCompositeElement();
					parent.setElements(new ArrayList<AbstractPublishedSyllabusElement>());
					elementMap.put(currElement.getParentId(), parent);
				} else {
					// should be safe to cast to composite, because another
					// element specified it as a parent
					parent = ((PublishedCompositeElement) elementMap.get(currElement.getParentId()));
				}

				// elements are returned ordered from the query, so we can just
				// add them
				parent.getElements().add(currElement);

			}
		}

		return structuredElements;
	}

	private boolean isElementAvailable(AbstractPublishedSyllabusElement element) {
		Map<String, String> attributes = null;

		if (element instanceof PublishedDocumentElement) {
			attributes = element.getAttributes();

			ContentResource resource = sakaiProxy.getResource(attributes.get("documentId"));
			
			if (resource == null || !resource.isAvailable()) {
				return false;
			}
		} else if (element instanceof PublishedCitationElement) {
			attributes = element.getAttributes();
			String citationId = attributes.get("citationId");
			String citationListId = citationId.substring(0, citationId.lastIndexOf('/'));

			ContentResource citationList = sakaiProxy.getResource(citationListId);
			
			if (citationList == null || !citationList.isAvailable()) {
				return false;
			}
		} else if (element instanceof PublishedImageElement) {
			attributes = element.getAttributes();

			ContentResource image = sakaiProxy.getResource(attributes.get("imageId"));

			if (image == null || !image.isAvailable()) {
				return false;
			}
		}

		return isElementVisibleByDates(element);
	}

	private boolean isElementVisibleByDates(AbstractPublishedSyllabusElement element) {
		Date now = new Date();
		Date startDate = null;
		Date endDate = null;

		startDate = element.getAvailabilityStartDate();
		endDate = element.getAvailabilityEndDate();

		return ((startDate == null || now.after(startDate)) && (endDate == null || now.before(endDate)));
	}

	@SuppressWarnings("unchecked")
	private List<PublishedSyllabusElementMapping> getPublishedSyllabusElementMappings(Long syllabusId) {
		String query = "from PublishedSyllabusElementMapping mapping where syllabusId = ?";
		// these must be ordered by display order for each parent id for
		// getStructuredPublishedSyllabusElements()
		query += " order by publishedSyllabusElement.parentId, displayOrder";

		List<PublishedSyllabusElementMapping> mappings = (List<PublishedSyllabusElementMapping>) getHibernateTemplate().find(query, syllabusId);

		return mappings;
	}

	@SuppressWarnings({ "unchecked" })
	public void deletePublishedSyllabus(Long syllabusId) throws NoSyllabusException {
		PublishedSyllabus syllabus = null;
		
		try
		{
			syllabus = getPublishedSyllabus(syllabusId, false);
		}
		catch(NoSyllabusException e) {
			return;
		}
		
		if (syllabus.getCommon()) {
			List<AbstractPublishedSyllabusElement> elements = (List<AbstractPublishedSyllabusElement>) getHibernateTemplate().find("from AbstractPublishedSyllabusElement where site_id = ? and common = ?", syllabus.getSiteId(), true);

			// delete all common elements and all their mappings for the given
			// site
			getHibernateTemplate().bulkUpdate("delete from PublishedSyllabusElementMapping where pubsyllabuselement_id in (select id from AbstractPublishedSyllabusElement where site_id = ? and common = ?)", syllabus.getSiteId(), true);
			getHibernateTemplate().deleteAll(elements);
		} else {
			// retrieve the elements to delete (non-common elements mapped to
			// this syllabus)
			List<AbstractPublishedSyllabusElement> elements = (List<AbstractPublishedSyllabusElement>) getHibernateTemplate().find("select mapping.publishedSyllabusElement from PublishedSyllabusElementMapping mapping where mapping.syllabusId = ? and mapping.publishedSyllabusElement.common = ?", syllabus.getId(), false);

			// delete all mappings for this syllabus and it's published elements
			getHibernateTemplate().bulkUpdate("delete from PublishedSyllabusElementMapping where syllabus_id = ?", syllabus.getId());
			
			getHibernateTemplate().deleteAll(elements);
		}
	}

	public void unpublishSyllabusElements(Long syllabusId) {
		// Update all the non-published elements
		getHibernateTemplate().bulkUpdate("update AbstractSyllabusElement set equalsPublished = false, publishedId = null where common = false and id in (select syllabusElement.id from SyllabusElementMapping where syllabusId = ?)", syllabusId);
	}

	@SuppressWarnings("unchecked")
	public List<AbstractPublishedSyllabusElement> getChildPublishedElements(Long elementId) {
		List<AbstractPublishedSyllabusElement> elements = (List<AbstractPublishedSyllabusElement>) getHibernateTemplate().find("from AbstractPublishedSyllabusElement where parent_id = ?", elementId);

		return elements;
	}

	@SuppressWarnings("unchecked")
	public List<PublishedSyllabus> getPublishedSyllabusList(String siteId) {
		return (List<PublishedSyllabus>) getHibernateTemplate().find("from PublishedSyllabus where site_id = ? and publishedDate is not null and deleted = false", siteId);
	}

	@SuppressWarnings("unchecked")
	public List<PublishedSyllabusElementMapping> getMappingsForPublishedElement(AbstractPublishedSyllabusElement element) {
		DetachedCriteria dc = DetachedCriteria.forClass(PublishedSyllabusElementMapping.class);
		dc.add(Restrictions.eq("publishedSyllabusElement", element));

		return (List<PublishedSyllabusElementMapping>) getHibernateTemplate().findByCriteria(dc);
	}

	public List<Long> getPublishedSyllabusesWithElementMapping(AbstractPublishedSyllabusElement element) {
		List<Long> syllabuses = new ArrayList<Long>();
		List<PublishedSyllabusElementMapping> l = getMappingsForPublishedElement(element);
		for (PublishedSyllabusElementMapping mapping : l) {
			syllabuses.add(mapping.getSyllabusId());
		}

		return syllabuses;
	}

	@SuppressWarnings("unchecked")
	public AbstractPublishedSyllabusElement getPublishedSyllabusElement(Long elementId) {
		List<AbstractPublishedSyllabusElement> elements;
		elements = (List<AbstractPublishedSyllabusElement>) getHibernateTemplate().find("from AbstractPublishedSyllabusElement where id = ?", elementId);
		AbstractPublishedSyllabusElement element = elements.get(0);
		return element;
	}

	@SuppressWarnings("unchecked")
	@Override
	public AbstractSyllabusElement getSyllabusElementForPublishedSyllabusElementId(Long elementId) {
		List<AbstractSyllabusElement> ret = (List<AbstractSyllabusElement>) getHibernateTemplate().find("from AbstractSyllabusElement where publishedId = ?", elementId);
		
		if (ret.size() == 0) {
			return null;
		}
		
		return ret.get(0);
	}
}
