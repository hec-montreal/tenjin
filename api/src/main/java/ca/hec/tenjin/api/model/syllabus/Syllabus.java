package ca.hec.opensyllabus2.api.model.syllabus;

import java.util.Date;
import java.util.List;
import java.util.Set;

import ca.hec.opensyllabus2.api.model.syllabus.provider.OfficialProvider;
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
    private Boolean common;
    private String createdBy;
    private String createdByName;
    private Date createdDate;
    private String lastModifiedBy;
    private Date lastModifiedDate;
    private List<AbstractSyllabusElement> elements;
    private Set<String> sections;
    private OfficialProvider provider;
}
