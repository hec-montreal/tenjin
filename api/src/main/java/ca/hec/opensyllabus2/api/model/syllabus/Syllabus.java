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
@AllArgsConstructor
@NoArgsConstructor
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

    @JsonIgnore
    public Syllabus getStructuredSyllabus() {
    	Syllabus structuredSyllabus = new Syllabus(
    			this.id, this.siteId, this.courseTitle, this.templateId, this.locale, this.createdBy, this.createdDate, this.lastModifiedBy, this.lastModifiedDate,
    			new ArrayList<AbstractSyllabusElement>());

		Map<Long, AbstractSyllabusElement> elementMap = new HashMap<Long, AbstractSyllabusElement>();

    	for (AbstractSyllabusElement currElement : elements) {

    		// Add current element to the lookup map (only needed if it's composite), or replace the dummy one that was inserted previously
    		if (currElement instanceof SyllabusCompositeElement) {

    			if (elementMap.containsKey(currElement.getId())) {
    				// element map had a dummy element, transfer it's children before replacing it
    				SyllabusCompositeElement uninitializedElement = (SyllabusCompositeElement)elementMap.get(currElement.getId());
        			((SyllabusCompositeElement)currElement).setElements(uninitializedElement.getElements());

    			} else {
        			((SyllabusCompositeElement) currElement).setElements(new ArrayList<AbstractSyllabusElement>());
    			}

    			elementMap.put(currElement.getId(), currElement);
    		}


    		if (currElement.getParentId() == null) {
    			// if syllabus sub-elements list is null, create one
    			if (structuredSyllabus.getElements() == null) {
    				structuredSyllabus.setElements(new ArrayList<AbstractSyllabusElement>());
    			}
    			// add current element to syllabus's root nodes
    			structuredSyllabus.getElements().add(currElement);
    		} else {
        		// add current element to it's parent (in the lookup map)
    			SyllabusCompositeElement parent;

    			if (!elementMap.containsKey(currElement.getParentId())) {
    				// insert a dummy element, to be replaced later
    				parent = new SyllabusCompositeElement();
    				parent.setElements(new ArrayList<AbstractSyllabusElement>());
    				elementMap.put(currElement.getParentId(), parent);
    			} else {
    				// should be safe to cast to composite, because another element specified it as a parent
    				parent = ((SyllabusCompositeElement)elementMap.get(currElement.getParentId()));
    			}

    			parent.getElements().add(currElement.getDisplayOrder(), currElement);
    		}
    	}

    	return structuredSyllabus;
    }
 }
