/**
 * 
 */
package ca.hec.opensyllabus2.api.model.syllabus;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import ca.hec.opensyllabus2.api.model.template.Template;
import lombok.Data;

/**
 * <p>
 * CatalogDescription is the object for catalog descriptions for use with the Catalog Description Manager tool.
 * 
 * Does not implement org.sakaiproject.entity.api.Entity, though it could (but be careful with getId() as it exists there too but returns int)
 * </p>
 */


@Data
public class Syllabus implements Serializable{	
	


    private Long syllabus_id;
    
    private String course_id;
    
    private String courseTitle;
   
    private Template template;
    
    private String locale;
    
    
    private String createdBy;
    
    private Date creationDate;
    
    @JsonManagedReference
    private Set<SyllabusStructure> syllabusStructures;
    
    public Syllabus (String course_id, String courseTitle, Template template){
    	this.course_id = course_id;
    	this.courseTitle = courseTitle;
    	this.template = template;
    }
    
    public Syllabus (){
    	
    }
 

    
  

}
