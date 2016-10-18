package ca.hec.tenjin.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusEvaluationElement extends SyllabusCompositeElement {
	public static final String TYPE = "evaluation";

	public String getType() {
		return TYPE;
	}
}
