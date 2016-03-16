package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusExamElement extends SyllabusCompositeElement {
	private static final String TYPE = "exam";

	public String getType() {
		return TYPE;
	}
}
