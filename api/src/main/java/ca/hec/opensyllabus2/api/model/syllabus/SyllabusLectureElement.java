package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusLectureElement extends SyllabusCompositeElement {
	private static final String TYPE = "lecture";

	public SyllabusLectureElement() {
		super(TYPE);
	}
}
