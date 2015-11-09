package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusRubricElement extends SyllabusCompositeElement {
	private static final String TYPE = "rubric";

	public SyllabusRubricElement() {
		super(TYPE);
	}
}