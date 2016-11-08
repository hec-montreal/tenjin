package ca.hec.tenjin.api.model.syllabus;

import java.util.Date;
import java.util.Set;

import ca.hec.tenjin.api.model.syllabus.provider.OfficialProvider;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
*
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
* @version $Id: $
*/

@Data
@EqualsAndHashCode
public class AbstractSyllabus {
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
    private String publishedBy;
    private Date publishedDate;
    private Boolean deleted;
    private Set<String> sections;
    private OfficialProvider provider;
}
