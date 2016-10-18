package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.Data;

@Data
public class SyllabusElementMapping {

	private Long id;
	private Long syllabusId;
	private AbstractSyllabusElement syllabusElement;
	private Integer displayOrder;
	private Boolean hidden;
}
