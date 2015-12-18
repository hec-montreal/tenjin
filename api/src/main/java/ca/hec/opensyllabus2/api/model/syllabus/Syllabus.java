package ca.hec.opensyllabus2.api.model.syllabus;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
*
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
* @version $Id: $
*/

@Data
public class Syllabus {

	private Long id;
    private String siteId;
    private String courseTitle;
    private Long templateId;
    private String locale;
    private String createdBy;
    private Date createdDate;
    private String lastModifiedBy;
    private Date lastModifiedDate;
    private List<AbstractSyllabusElement> elements;
 }
