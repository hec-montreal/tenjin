package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class PublishedTutorialElement extends PublishedCompositeElement {
	public static final String TYPE = "tutorial";

	public String getType() {
		return TYPE;
	}
}
