package ca.hec.opensyllabus2.api.model.syllabus;
import java.util.Date;
import java.util.Set;



import com.fasterxml.jackson.annotation.JsonBackReference;

import ca.hec.opensyllabus2.api.model.template.Template;
import lombok.Data;

/**
*
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @version $Id: $
*/

@Data
public class Syllabus {	
	


    private Long syllabus_id;
    
    private String site_id;
    
    private String courseTitle;
   
    @JsonBackReference
    private Template template;
    
    private String locale;
    
    
    private String createdBy;
    
    private Date creationDate;
    
    private Set<SyllabusElement> syllabusElements;
    
    public Syllabus (String course_id, String courseTitle, Template template){
    	this.site_id = course_id;
    	this.courseTitle = courseTitle;
    	this.template = template;
    }
    
    public Syllabus (){
    	
    }
 

    
  

}
