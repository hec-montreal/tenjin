package ca.hec.opensyllabus2.api.model.syllabus;

import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
*
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
* @version $Id: $
*/

@Data
@EqualsAndHashCode(exclude={"elements"})
public class Syllabus {

	private Long id;
    private String siteId;
    private String courseTitle;
    private String title;
    private Long templateId;
    private String locale;
    private Boolean shareable;
    private String createdBy;
    private Date createdDate;
    private String lastModifiedBy;
    private Date lastModifiedDate;
    private List<AbstractSyllabusElement> elements;
    private Set<String> sections;
    
    public void copy(Syllabus syllabus) {
    	this.setSiteId(syllabus.getSiteId());
    	this.setCourseTitle(syllabus.getCourseTitle());
    	this.setTitle(syllabus.getTitle());
    	this.setTemplateId(syllabus.getTemplateId());
    	this.setLocale(syllabus.getLocale());
    	this.setShareable(syllabus.getShareable());
    	this.setCreatedBy(syllabus.getCreatedBy());
    	this.setCreatedDate(syllabus.getCreatedDate());
    	this.setLastModifiedBy(syllabus.getLastModifiedBy());
    	this.setLastModifiedDate(syllabus.getLastModifiedDate());
    	this.setSections(syllabus.getSections());
    }
 }
