package ca.hec.tenjin.api.model.syllabus;

import java.util.Date;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class SyllabusLock {
	private Long id;
	private Long syllabusId;
	private Date lastRenewalDate;
	private String createdBy;
	private String createdByName;
}
