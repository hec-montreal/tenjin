package ca.hec.tenjin.tool.controller;

import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.content.api.ContentEntity;
import org.sakaiproject.entity.api.EntityPropertyNotDefinedException;
import org.sakaiproject.entity.api.EntityPropertyTypeException;
import org.sakaiproject.entity.api.ResourceProperties;

public class EntityDataUtils {
	private final static Log log = LogFactory.getLog(EntityDataUtils.class);

	// Property names
	private final static Set<String> directPropertyNames = Collections.unmodifiableSet(new HashSet<String>(){
		private static final long serialVersionUID = 1L;
		{
			add(ResourceProperties.PROP_DISPLAY_NAME);
			add(ResourceProperties.PROP_DESCRIPTION);
			add(ResourceProperties.PROP_CREATOR);
			add(ResourceProperties.PROP_MODIFIED_BY);
			add(ResourceProperties.PROP_CREATION_DATE);
			add(ResourceProperties.PROP_MODIFIED_DATE);
			add(ResourceProperties.PROP_RESOURCE_TYPE);
			add(ResourceProperties.PROP_CONTENT_TYPE);
			add(ResourceProperties.PROP_CONTENT_PRIORITY);
			add(ResourceProperties.PROP_CONTENT_LENGTH);
			add(ResourceProperties.PROP_IS_COLLECTION);
		}
	});


	/**
	 * Produces a summary of an content entity for display in entitybroker.
	 * @param entity The entity to display.
	 * @return An EntityContent matching the supplied entity.
	 */
	public static EntityContent getResourceDetails(ContentEntity entity) {

		EntityContent tempRd = new EntityContent();

		ResourceProperties properties = entity.getProperties();
		Iterator propertyNames = properties.getPropertyNames();
		while (propertyNames.hasNext()) {
			String key = (String) propertyNames.next();
			if (!directPropertyNames.contains(key)) {
				String value = properties.getProperty(key);
				if (null != value) {
					tempRd.setProperty(key, value);
				}
			}
		}

		tempRd.setResourceId(entity.getId());
		tempRd.setName(properties
				.getPropertyFormatted(ResourceProperties.PROP_DISPLAY_NAME));
		tempRd.setDescription(properties
				.getProperty(ResourceProperties.PROP_DESCRIPTION));
		tempRd.setCreator(properties
				.getProperty(ResourceProperties.PROP_CREATOR));

		tempRd.setModifiedBy(properties
				.getProperty(ResourceProperties.PROP_MODIFIED_BY));
		tempRd.setMimeType(properties
				.getProperty(ResourceProperties.PROP_CONTENT_TYPE));
		tempRd.setPriority(properties
				.getProperty(ResourceProperties.PROP_CONTENT_PRIORITY));
		tempRd.setSize(properties
				.getProperty(ResourceProperties.PROP_CONTENT_LENGTH));
		tempRd.setReference(entity.getReference());
		tempRd.setType(entity.getResourceType());
		tempRd.setUrl(entity.getUrl());
		tempRd.setRelease(entity.getReleaseDate());
		tempRd.setRetract(entity.getRetractDate());
		tempRd.setHidden(entity.isHidden());
		try {
			tempRd.setCreated(properties
					.getTimeProperty(ResourceProperties.PROP_CREATION_DATE));
			tempRd.setModified(properties
					.getTimeProperty(ResourceProperties.PROP_MODIFIED_DATE));

		} catch (EntityPropertyNotDefinedException e) {
			log.warn("Failed to get property on " + entity.getId(), e);
		} catch (EntityPropertyTypeException e) {
			log.warn("Incorrect property type on " + entity.getId(), e);
		}

		return tempRd;
	}
}

