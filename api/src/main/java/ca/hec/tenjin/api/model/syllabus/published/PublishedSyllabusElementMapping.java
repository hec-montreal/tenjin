package ca.hec.tenjin.api.model.syllabus.published;

import lombok.Data;

@Data
public class PublishedSyllabusElementMapping {

	private Long id;
	private Long syllabusId;
	private AbstractPublishedSyllabusElement publishedSyllabusElement;
	private Integer displayOrder;
}
