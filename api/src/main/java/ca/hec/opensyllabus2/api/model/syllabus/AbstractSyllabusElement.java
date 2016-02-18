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
	private Long syllabusId;

	private String title;
	private String description;

	private Boolean publicElement;
    private Boolean shareable;
    private Boolean important;
    
    private Integer displayOrder;

    private Boolean hasDatesInterval;
    
    private Date availabilityStartDate;
    private Date availabilityEndDate;

    private Date createdDate;
    private String createdBy;
    private Date lastModifiedDate;
    private String lastModifiedBy;

    private Set<String> sections;
    private Map<String, String> attributes;

    // force each subclass to return a type
    abstract public String getType();
    
    public void copy(AbstractSyllabusElement e) {
    	this.setParentId(e.getParentId());
    	this.setTemplateStructureId(e.getTemplateStructureId());
    	this.setSyllabusId(e.getSyllabusId());
    	this.setTitle(e.getTitle());
    	this.setDescription(e.getDescription());
    	this.setPublicElement(e.getPublicElement());
    	this.setShareable(e.getShareable());
    	this.setImportant(e.getImportant());
    	this.setDisplayOrder(e.getDisplayOrder());
    	this.setAvailabilityStartDate(e.getAvailabilityStartDate());
    	this.setAvailabilityEndDate(e.getAvailabilityEndDate());
    	this.setCreatedDate(e.getCreatedDate());
    	this.setCreatedBy(e.getCreatedBy());
    	this.setLastModifiedDate(e.getLastModifiedDate());
    	this.setLastModifiedBy(e.getLastModifiedBy());
    	this.setSections(e.getSections());
    	this.setAttributes(e.getAttributes());
    }
}

