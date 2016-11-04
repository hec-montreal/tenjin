package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class PublishedLectureElement extends PublishedCompositeElement {
	public static final String TYPE = "lecture";

	public String getType() {
		return TYPE;
	}
}
