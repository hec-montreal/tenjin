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
	@Type(value = SyllabusCompositeElement.class, name = "compositeSyllabusElement"),
	@Type(value = SyllabusCitationElement.class, name = "citationElement"),
	@Type(value = SyllabusContactInfoElement.class, name = "contactInfoElement"),
	@Type(value = SyllabusDocumentElement.class, name = "documentElement"),
	@Type(value = SyllabusHyperlinkElement.class, name = "hyperlinkElement"),
	@Type(value = SyllabusImageElement.class, name = "imageElement"),
	@Type(value = SyllabusSakaiToolElement.class, name = "sakaiToolElement"),
	@Type(value = SyllabusTextElement.class, name = "textElement"),
	@Type(value = SyllabusVideoElement.class, name = "videoElement") })
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = As.PROPERTY, property = "@class")
public abstract class AbstractSyllabusElement {

	private Long id;
	private Long parentId;
	private Long templateStructureId;

	private String title;
	private String description;
	private String type;

	private Boolean publicElement;
    private Boolean shareable;
    private Boolean important;

    private Integer displayOrder;

    private Date availabilityStartDate;
    private Date availabilityEndDate;

    private Date createdDate;
    private String createdBy;
    private Date lastModifiedDate;
    private String lastModifiedBy;

    private Set<String> sections;
    private Map<String, String> attributes;

    // always force concrete classes to specify the type
    public AbstractSyllabusElement(String type) {
    	if (type == null) throw new NullPointerException("SyllabusElement type may not be null");
    	this.type = type;
    }
}

