package ca.hec.tenjin.api.model.syllabus;

import java.util.ArrayList;
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
	@Type(value = SyllabusEvaluationElement.class, name = "evaluation"),
	@Type(value = SyllabusExamElement.class, name = "exam"),
	@Type(value = SyllabusLectureElement.class, name = "lecture"),
	@Type(value = SyllabusRubricElement.class, name = "rubric"),
	@Type(value = SyllabusTutorialElement.class, name = "tutorial"),})
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = As.EXISTING_PROPERTY, property = "type")
public class SyllabusCompositeElement extends AbstractSyllabusElement {

	public static final String TYPE = "composite";

	private List<AbstractSyllabusElement> elements = new ArrayList<AbstractSyllabusElement>();

	public String getType() {
		return TYPE;
	}
	
	public boolean isComposite() {
		return true;
	}

	public void setProviderId(Long providerId) {
		super.setProviderId(providerId);
		// set provider id in children
		for (AbstractSyllabusElement e: elements) {
			e.setProviderId(providerId);
		}
	}
}
