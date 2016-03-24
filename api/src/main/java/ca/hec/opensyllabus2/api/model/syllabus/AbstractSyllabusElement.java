package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;


/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */

@Data
@JsonSubTypes({
	@Type(value = SyllabusCompositeElement.class, name = "composite"),
	@Type(value = SyllabusCitationElement.class, name = "citation"),
	@Type(value = SyllabusContactInfoElement.class, name = "contact_info"),
	@Type(value = SyllabusDocumentElement.class, name = "document"),
	@Type(value = SyllabusHyperlinkElement.class, name = "hyperlink"),
	@Type(value = SyllabusImageElement.class, name = "image"),
	@Type(value = SyllabusSakaiToolElement.class, name = "sakai_entity"),
	@Type(value = SyllabusTextElement.class, name = "text"),
	@Type(value = SyllabusVideoElement.class, name = "video") })
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = As.EXISTING_PROPERTY, property = "type")
public abstract class AbstractSyllabusElement {

	private Long id;
	private Long parentId;
	private Long templateStructureId;
	private String siteId;

	private String title;
	private String description;

	private Boolean common;
	private Boolean publicElement;
    private Boolean important;
    
    // not mapped by hibernate because it's actually from SyllabusElementMapping
    private Boolean hidden;
    private Integer displayOrder;
    
    private Boolean hasDatesInterval;
    
    private Date availability_start_date;
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
    	this.setParentId(e.getParentId());
    	this.setTemplateStructureId(e.getTemplateStructureId());
    	this.setSiteId(e.getSiteId());
    	this.setTitle(e.getTitle());
    	this.setDescription(e.getDescription());
    	this.setCommon(e.getCommon());
    	this.setPublicElement(e.getPublicElement());
    	this.setImportant(e.getImportant());
    	this.setDisplayOrder(e.getDisplayOrder());
    	this.setHidden(e.getHidden());
    	this.setAvailability_start_date(e.getAvailability_start_date());
    	this.setAvailabilityEndDate(e.getAvailabilityEndDate());
    	this.setCreatedDate(e.getCreatedDate());
    	this.setCreatedBy(e.getCreatedBy());
    	this.setLastModifiedDate(e.getLastModifiedDate());
    	this.setLastModifiedBy(e.getLastModifiedBy());
    	this.setAttributes(e.getAttributes());
    	this.setHasDatesInterval(e.getHasDatesInterval());
    }
}

