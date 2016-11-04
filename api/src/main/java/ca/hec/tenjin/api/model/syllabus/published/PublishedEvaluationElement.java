package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class PublishedEvaluationElement extends PublishedCompositeElement {
	public static final String TYPE = "evaluation";

	public String getType() {
		return TYPE;
	}
}
