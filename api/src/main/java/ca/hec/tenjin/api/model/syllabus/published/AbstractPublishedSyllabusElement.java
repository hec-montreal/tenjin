package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;


/**
 *
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */

@Data
@JsonSubTypes({
	@Type(value = PublishedCompositeElement.class, name = "composite"),
	@Type(value = PublishedCitationElement.class, name = "citation"),
	@Type(value = PublishedContactInfoElement.class, name = "contact_info"),
	@Type(value = PublishedDocumentElement.class, name = "document"),
	@Type(value = PublishedHyperlinkElement.class, name = "hyperlink"),
	@Type(value = PublishedImageElement.class, name = "image"),
	@Type(value = PublishedSakaiToolElement.class, name = "sakai_entity"),
	@Type(value = PublishedTextElement.class, name = "text"),
	@Type(value = PublishedVideoElement.class, name = "video") })
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = As.EXISTING_PROPERTY, property = "type")
public abstract class AbstractPublishedSyllabusElement {

	private Long id;
	private Long parentId;
	private Long templateStructureId;
	private String siteId;

	private String title;
	private String description;

	private Boolean common;
	private Boolean publicElement;
    private Boolean important;
    
    // not mapped by hibernate because it's actually from the mapping
    private Integer displayOrder;
    
    private Date availabilityStartDate;
    private Date availabilityEndDate;

    private Date createdDate;
    private String createdBy;
    private Date lastModifiedDate;
    private String lastModifiedBy;
    
    private Map<String, String> attributes;

    // force each subclass to return a type
    abstract public String getType();
    
    public boolean isComposite() {
    	// false by default, override in SyllabusCompositeElement
    	return false;
    }
    
    public void copy(AbstractSyllabusElement e) {
    	this.setId(e.getId());
    	this.setParentId(e.getParentId());
    	this.setTemplateStructureId(e.getTemplateStructureId());
    	this.setSiteId(e.getSiteId());
    	this.setTitle(e.getTitle());
    	this.setDescription(e.getDescription());
    	this.setCommon(e.getCommon());
    	this.setPublicElement(e.getPublicElement());
    	this.setImportant(e.getImportant());
    	this.setDisplayOrder(e.getDisplayOrder());
    	this.setAvailabilityEndDate(e.getAvailabilityEndDate());
    	this.setCreatedDate(e.getCreatedDate());
    	this.setCreatedBy(e.getCreatedBy());
    	this.setLastModifiedDate(e.getLastModifiedDate());
    	this.setLastModifiedBy(e.getLastModifiedBy());
    	this.setAttributes(new HashMap<String, String>(e.getAttributes()));
    }
}

