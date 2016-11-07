package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class PublishedRubricElement extends PublishedCompositeElement {
	public static final String TYPE = "rubric";

	public String getType() {
		return TYPE;
	}
}
