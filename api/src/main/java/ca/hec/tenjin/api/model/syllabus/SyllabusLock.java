package ca.hec.tenjin.api.model.syllabus;

import java.util.Date;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode()
public class SyllabusLock {
	private Long id;
	private Long syllabusId;
	private Date lastRenewalDate;
	private String createdBy;
	private String createdByName;
}
