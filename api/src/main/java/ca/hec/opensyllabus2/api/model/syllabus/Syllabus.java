/**
 * 
 */
package ca.hec.opensyllabus2.api.model.syllabus;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
public class Syllabus {	
	
	protected final static String COURSE_ID = "id";
	protected final static String SECTIONS = "sections";
	protected final static String COURSE_TITLE = "coursetitle";
	protected final static String TEMPLATE_ID = "template_id";
	protected final static String LOCALE = "locale";
	protected final static String ELEMENTS = "elements";
	protected final static String SYLLABUS_STRUCTURE_ID = "id";
	protected final static String TEMPLATE_ELEMENT_LABEL = "label";
	protected final static String SHAREABLE = "shareable";
	protected final static String PUBLIC_ELEMENT= "publicelement";
	protected final static String STUDENT_AVAILABILITY = "studentavailability";
	protected final static String DISPLAY_PAGE = "displayPage";
	protected final static String DISPLAY_ORDER = "displayOrder";
	protected final static String RUBRICS = "rubrics";
	protected final static String RUBRIC_ID = "id";
	protected final static String RUBRIC_DESCRIPTION = "label";
	protected final static String TYPE = "type";
	protected final static String VISIBLE = "visible";
	protected final static String IMPORTANCE = "importance";
	//TEXT
	protected final static String TEXT = "text";
	//CONTACT_INFO
	protected final static String PERSON_ACCESS = "person.access";
	protected final static String PERSON_OFFICEROOM = "person.officeroom";
	protected final static String PERSON_TITLE = "person.title";
	protected final static String PERSON_EMAIL = "person.email";
	protected final static String PERSON_TEL = "person.tel";
	protected final static String PERSON_SURNAME = "person.surname";
	protected final static String PERSON_FIRSTNAME = "person.firstname";
	//EVALUATION
	protected final static String SUBMISSION_TYPE = "submission_type";
	protected final static String WEIGHT = "weight";
	protected final static String LOCATION = "location";
	protected final static String LABEL = "label";
	protected final static String MODALITY = "modality";
	protected final static String ASSESSMENT_TYPE = "assessment_type";
	protected final static String MODE = "mode";
	//RESOURCE
	protected final static String DISPLAY_AS = "displayAs";
	protected final static String RESOURCE_TYPE = "resource.type";
	protected final static String RESOURCE_URI = "resource.uri";
	//SEANCE
	protected final static String PREFIX = "prefix";
	//BIBLIO RESOURCE
	protected final static String RESOURCE_JOURNAL = "resource.journal";
	protected final static String RESOURCE_AUTHOR = "resource.author";
	protected final static String RESOURCE_TITLE = "resource.title";
	protected final static String RESOURCE_PAGES = "resource.pages";
	protected final static String RESOURCE_ISSUE = "resource.issue";
	protected final static String RESOURCE_VOLUME = "resource.volume";
	protected final static String RESOURCE_YEAR = "resource.year";
	protected final static String RESOURCE_LIBRARY = "resource.library";
	
	
    private Long syllabus_id;
    
    private String course_id;
    
    private String courseTitle;
   
    private Template template;
    
    private String locale;
    
    private String createdBy;
    
    private Date creationDate;
    
    private Set<SyllabusStructure> syllabusStructures;
    
    public Syllabus (String course_id, String courseTitle, Template template){
    	this.course_id = course_id;
    	this.courseTitle = courseTitle;
    	this.template = template;
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
    	return "{'" + COURSE_ID + "':'"+ getCourse_id() + "','" + COURSE_TITLE + "':'"+ getCourseTitle()   + "','" + LOCALE + "':'"+ getLocale() + "'}" ;
    }

    public Map <String, Object> getMap(){

		Map <String, Object> model = new HashMap <String, Object>();
		
		//Retrieve syllabus properties
		model.put(COURSE_ID, getCourse_id());
		//TODO: add sections
		model.put(COURSE_TITLE, getCourseTitle());
		//model.put(TEMPLATE_ID, getTemplate().getTemplate_id());
		model.put(LOCALE, getLocale());
		model.put(ELEMENTS, getSyllabusElements()); //TODO: put a validation point
		
		return model;
    }
    
    public List<Map<String, Object>>  getSyllabusElements(){

		Map <String, Object> elements = new HashMap <String, Object>();
		List<Map<String, Object>> sStructures = new ArrayList<Map<String, Object>>();
		
		
		for (SyllabusStructure ss: syllabusStructures){
			elements = new HashMap <String, Object>();
			//retrieve parameters of the structure
			elements.put(SYLLABUS_STRUCTURE_ID, ss.getSyllabusStructure_id());
			//elements.put(TEMPLATE_ELEMENT_LABEL, ""); //TODO get templateStructureElementAttribute
			elements.put(SHAREABLE, ss.getShareable());
			elements.put(PUBLIC_ELEMENT, ss.getPublicElement());
			if (ss.getParent_id() == null)
				elements.put(DISPLAY_PAGE, true);
			else
				elements.put(DISPLAY_PAGE, false);
			elements.put(DISPLAY_ORDER, ss.getDisplayOrder());
			//retrieve rubrics in structure
			//retrieve substructures in structure
			sStructures.add(elements);
			
		}
		
		
		return sStructures;
    }
    
    
    public SyllabusStructure getSyllabusStructure (Long syllabusStructureId){
    	Long parentId = null;
    	
    	for (SyllabusStructure sStructure: syllabusStructures){
    		parentId = sStructure.getParent_id();
    		if (parentId != null && parentId == syllabusStructureId)
    			return sStructure;
    	}
    	return null;
    }

	

}
