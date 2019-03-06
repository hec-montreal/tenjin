package ca.hec.tenjin.api.model.syllabus;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

import lombok.Data;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */

@Data
@JsonSubTypes({ @Type(value = SyllabusCompositeElement.class, name = "composite"), @Type(value = SyllabusCitationElement.class, name = "citation"), @Type(value = SyllabusContactInfoElement.class, name = "contact_info"), @Type(value = SyllabusDocumentElement.class, name = "document"), @Type(value = SyllabusHyperlinkElement.class, name = "hyperlink"), @Type(value = SyllabusImageElement.class, name = "image"), @Type(value = SyllabusSakaiToolElement.class, name = "sakai_entity"), @Type(value = SyllabusTextElement.class, name = "text"), @Type(value = SyllabusVideoElement.class, name = "video") })
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
	private Boolean optional;

	private Long publishedId;
	private Boolean equalsPublished;

	// not mapped by hibernate because it's actually from SyllabusElementMapping
	@Transient
	private Boolean hidden;
	@Transient
	private Integer displayOrder;
	@Transient
	private Boolean mappingEqualsPublished;

	private Boolean hasDatesInterval;

	private Date availabilityStartDate;
	private Date availabilityEndDate;

	private Date createdDate;
	private String createdBy;
	private Date lastModifiedDate;
	private String lastModifiedBy;

	private Long providerId;

	private Map<String, String> attributes;

	// force each subclass to return a type
	abstract public String getType();

	public boolean isComposite() {
		// false by default, override in SyllabusCompositeElement
		return false;
	}

	public void copyFrom(AbstractSyllabusElement e) {
		this.setId(e.getId());
		this.setParentId(e.getParentId());
		this.setTemplateStructureId(e.getTemplateStructureId());
		this.setSiteId(e.getSiteId());
		this.setTitle(e.getTitle());
		this.setDescription(e.getDescription());
		this.setCommon(e.getCommon());
		this.setPublicElement(e.getPublicElement());
		this.setImportant(e.getImportant());
		this.setOptional(e.getOptional());
		this.setPublishedId(e.getPublishedId());
		this.setEqualsPublished(e.getEqualsPublished());
		this.setDisplayOrder(e.getDisplayOrder());
		this.setHidden(e.getHidden());
		this.setMappingEqualsPublished(e.getMappingEqualsPublished());
		this.setAvailabilityStartDate(e.getAvailabilityStartDate());
		this.setAvailabilityEndDate(e.getAvailabilityEndDate());
		this.setCreatedDate(e.getCreatedDate());
		this.setCreatedBy(e.getCreatedBy());
		this.setLastModifiedDate(e.getLastModifiedDate());
		this.setLastModifiedBy(e.getLastModifiedBy());
		if (e.getAttributes() != null) {
			this.setAttributes(new HashMap<String, String>(e.getAttributes()));
		}
		this.setHasDatesInterval(e.getHasDatesInterval());
		this.setProviderId(e.getProviderId());
	}
}
