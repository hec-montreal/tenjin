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

    	for (AbstractSyllabusElement e : elements) {

    		// Add current element to the lookup map
    		if (elementMap.containsKey(e.getId())) {
    			if (elementMap.get(e.getId()) instanceof SyllabusCompositeElement &&
    					e instanceof SyllabusCompositeElement) {

    				SyllabusCompositeElement uninitializedElement = (SyllabusCompositeElement)elementMap.get(e.getId());
        			((SyllabusCompositeElement)e).setElements(uninitializedElement.getElements());
    			}
    		}
    		elementMap.put(e.getId(), e);

    		if (e.getParentId() == null) {
    			// if syllabus sub-elements list is null, create one
    			if (structuredSyllabus.getElements() == null) {
    				structuredSyllabus.setElements(new ArrayList<AbstractSyllabusElement>());
    			}
    			// add current element to syllabus's root nodes
    			structuredSyllabus.getElements().add(e);
    		} else {
        		// add current element to it's parent (in the lookup map)
    			SyllabusCompositeElement parent;

    			if (!elementMap.containsKey(e.getParentId())) {
    				parent = new SyllabusCompositeElement();
    				elementMap.put(e.getParentId(), parent);
    			} else {
    				// should be safe to cast to composite, because it has a child
    				parent = ((SyllabusCompositeElement)elementMap.get(e.getParentId()));
    			}

    			// if parent sub-elements list is null, create one
    			if (parent.getElements() == null) {
    				parent.setElements(new ArrayList<AbstractSyllabusElement>());
    			}
    			parent.getElements().add(e.getDisplayOrder(), e);
    		}
    	}

    	return structuredSyllabus;
    }
 }
