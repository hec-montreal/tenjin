package ca.hec.tenjin.api.model.userdata;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A user annotation
 */
@Data
@NoArgsConstructor
public class UserAnnotation {
	
	private Long id;
	private Long syllabusId;
	private String userId;
	private Long publishedElementId;
	private UserAnnotationTypes type;
	
}
