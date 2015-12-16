package ca.hec.opensyllabus2.api.model.syllabus;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

@Data
@EqualsAndHashCode(callSuper=true,exclude={"elements"})
@JsonSubTypes({
	@Type(value = SyllabusEvaluationElement.class, name = "evaluationElement"),
	@Type(value = SyllabusLectureElement.class, name = "lectureElement"),
	@Type(value = SyllabusRubricElement.class, name = "rubricElement"),
	@Type(value = SyllabusTutorialElement.class, name = "tutorialElement"),})
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = As.PROPERTY, property = "@class")
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
