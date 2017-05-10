package ca.hec.tenjin.api.export.pdf.model;

import java.util.ArrayList;
import java.util.List;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import lombok.Data;

/**
 * This class holds all model variables used by the pdf html templates
 */
@Data
public class TemplateContext {

	private AbstractSyllabus syllabus;
	private List<SyllabusElement> elements;
	private CourseInfo courseInfo;
	private Image logo;

	public TemplateContext() {
		this.elements = new ArrayList<>();
	}
}
