package ca.hec.tenjin.api.model.syllabus.published;

import java.util.List;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
* A class to represent a published syllabus, equivalent to a regular Syllabus but with
* PublishedSyllabusElements in the element list instead
* 
* The hibernate mapping for this object is for the same table as Syllabus (TENJIN_SYLLABUS) but read-only.
* 
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
* @version $Id: $
*/

@Data
@EqualsAndHashCode(callSuper=true, exclude={"elements"})
public class PublishedSyllabus extends AbstractSyllabus {
    private List<AbstractPublishedSyllabusElement> elements;
}
