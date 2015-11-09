package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;

import java.util.*;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */

@Data
public abstract class AbstractSyllabusElement {

	private Long id;
	private Long parentId;
	private Long templateElementId;

	private String title;
	private String description;
	private String type;

	private Boolean publicElement;
    private Boolean shareable;
    private Boolean important;

// this is more a property of the list? see compositeElementMapping/Syllabus mapping
//    private Integer order;

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

