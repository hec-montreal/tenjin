package ca.hec.tenjin.api.model.userdata;

import javax.persistence.Transient;

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
	private String value;
	
	@Transient
	private Long publishedElementId;
	
	public UserAnnotation clone() {
		UserAnnotation ret = new UserAnnotation();
		
		ret.setId(id);
		ret.setSyllabusId(syllabusId);
		ret.setUserId(userId);
		ret.setElementId(elementId);
		ret.setPublishedElementId(publishedElementId);
		ret.setType(type);
		ret.setValue(value);
		
		return ret;
	}
	
}
