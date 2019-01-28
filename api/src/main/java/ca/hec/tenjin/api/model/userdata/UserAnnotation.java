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
	private Long elementId;
	private UserAnnotationTypes type;
	
	public UserAnnotation clone() {
		UserAnnotation ret = new UserAnnotation();
		
		ret.setId(id);
		ret.setSyllabusId(syllabusId);
		ret.setUserId(userId);
		ret.setElementId(elementId);
		ret.setType(type);
		
		return ret;
	}
	
}
