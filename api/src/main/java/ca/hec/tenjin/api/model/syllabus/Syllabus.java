package ca.hec.tenjin.api.model.syllabus;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
*
* @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
* @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
* @version $Id: $
*/

@Data
@EqualsAndHashCode(callSuper=true, exclude={"elements"})
public class Syllabus extends AbstractSyllabus {
    private List<AbstractSyllabusElement> elements;
}
