package ca.hec.tenjin.api.model.syllabus.published;

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
	@Type(value = PublishedEvaluationElement.class, name = "evaluation"),
	@Type(value = PublishedExamElement.class, name = "exam"),
	@Type(value = PublishedLectureElement.class, name = "lecture"),
	@Type(value = PublishedRubricElement.class, name = "rubric"),
	@Type(value = PublishedTutorialElement.class, name = "tutorial"),})
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = As.EXISTING_PROPERTY, property = "type")
public class PublishedCompositeElement extends AbstractPublishedSyllabusElement {

	public static final String TYPE = "composite";

	private List<AbstractPublishedSyllabusElement> elements = new ArrayList<AbstractPublishedSyllabusElement>();

	public String getType() {
		return TYPE;
	}
	
	public boolean isComposite() {
		return true;
	}
}
