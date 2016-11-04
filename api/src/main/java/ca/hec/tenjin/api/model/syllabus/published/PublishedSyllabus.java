package ca.hec.tenjin.api.model.syllabus.published;

import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
* A class to represent a published syllabus, equivalent to a regular Syllabus but with
* PublishedSyllabusElements in the element list instead
* 
* The hibernate mapping for this object is for the same table as Syllabus (TENJIN_SYLLABUS) but read-only.
* 
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
* @version $Id: $
*/

@Data
@EqualsAndHashCode(exclude={"elements"})
public class PublishedSyllabus {
	private Long id;
    private String siteId;
    private String courseTitle;
    private String title;
    private Long templateId;
    private String locale;
    private Boolean common;
    private String createdBy;
    private String createdByName;
    private Date createdDate;
    private String lastModifiedBy;
    private Date lastModifiedDate;
    private Boolean deleted;
    private Boolean published;
    private List<AbstractPublishedSyllabusElement> elements;
    private Set<String> sections;
}
