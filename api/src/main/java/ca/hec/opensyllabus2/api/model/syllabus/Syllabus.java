/**
 * 
 */
package ca.hec.opensyllabus2.api.model.syllabus;
import java.util.Date;
import javax.persistence.*;
import lombok.Data;

/**
 * <p>
 * CatalogDescription is the object for catalog descriptions for use with the Catalog Description Manager tool.
 * 
 * Does not implement org.sakaiproject.entity.api.Entity, though it could (but be careful with getId() as it exists there too but returns int)
 * </p>
 */


@Data
@Entity
public class Syllabus {	
    
    private Long syllabus_id;
    
    private String course_id;
    
    private String courseTitle;
   
    private Long template_id;
    
    private String locale;
    
    private String createdBy;
    
    private Date creationDate;
    
    
    
}
