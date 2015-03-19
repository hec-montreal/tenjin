/**
 * 
 */
package ca.hec.opensyllabus2.api.model;

import java.util.Date;

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
    private Long id;
/*
    private String courseId;
    private String courseTitle;
    private String locale;
    private String createdBy;
    private Date createdDate;
    */
}
