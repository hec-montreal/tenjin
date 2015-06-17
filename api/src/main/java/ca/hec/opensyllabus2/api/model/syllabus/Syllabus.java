/**
 * 
 */
package ca.hec.opensyllabus2.api.model.syllabus;
import java.util.Date;
import java.util.Set;
import lombok.Data;

/**
 * <p>
 * CatalogDescription is the object for catalog descriptions for use with the Catalog Description Manager tool.
 * 
 * Does not implement org.sakaiproject.entity.api.Entity, though it could (but be careful with getId() as it exists there too but returns int)
 * </p>
 */


@Data
public class Syllabus {	
    
    private Long syllabus_id;
    
    private String course_id;
    
    private String courseTitle;
   
    private Long template_id;
    
    private String locale;
    
    private String createdBy;
    
    private Date creationDate;
    
    private Set<SyllabusStructure> syllabusStructures;
    
    public Syllabus (String course_id, String courseTitle, Long template_id){
    	this.course_id = course_id;
    	this.courseTitle = courseTitle;
    	this.template_id = template_id;
    }
    
    public Syllabus (){
    	
    }
    
    public void setSyllabusStructures( Set<SyllabusStructure> syllabusStructures){
    	this.syllabusStructures = syllabusStructures;
    }
    
    public boolean equals(Object other) {
        if (this == other) return true;
        if ( !(other instanceof Syllabus) ) return false;
        
        final Syllabus syllabus = (Syllabus) other;
        
        if (this.syllabusStructures == syllabus.getSyllabusStructures())
        	return true;
        
        return false;
    }
    
    public int hashCode() {
        int result;
        result = this.syllabusStructures.hashCode();
        result = 29 * result ;
        return result;
    }
    
    public String toString(){
    	return getCourseTitle();
    }

}
