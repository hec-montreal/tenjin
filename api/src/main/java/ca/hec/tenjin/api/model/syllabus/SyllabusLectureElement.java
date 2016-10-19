package ca.hec.tenjin.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusLectureElement extends SyllabusCompositeElement {
	public static final String TYPE = "lecture";

	public String getType() {
		return TYPE;
	}
}
