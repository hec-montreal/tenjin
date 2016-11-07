package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class PublishedExamElement extends PublishedCompositeElement {
	public static final String TYPE = "exam";

	public String getType() {
		return TYPE;
	}
}
