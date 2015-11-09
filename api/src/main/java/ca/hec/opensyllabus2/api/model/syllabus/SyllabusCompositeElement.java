package ca.hec.opensyllabus2.api.model.syllabus;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class SyllabusCompositeElement extends AbstractSyllabusElement {
	private static final String TYPE = "composite";

	private List<AbstractSyllabusElement> elements;

	public SyllabusCompositeElement() {
		super(TYPE);
	}

	public SyllabusCompositeElement(String type) {
		super(type);
	}
}
