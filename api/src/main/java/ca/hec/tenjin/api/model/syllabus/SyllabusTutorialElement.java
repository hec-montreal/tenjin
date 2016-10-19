package ca.hec.tenjin.api.model.syllabus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusTutorialElement extends SyllabusCompositeElement {
	public static final String TYPE = "tutorial";

	public String getType() {
		return TYPE;
	}
}
