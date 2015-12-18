package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusEvaluationElement extends SyllabusCompositeElement {
	private static final String TYPE = "evaluation";

	public String getType() {
		return TYPE;
	}
}
