package ca.hec.tenjin.api.model.userdata;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * User annotation types
 */
@Getter
@AllArgsConstructor
public enum UserAnnotationTypes {
	CHECK("checkable", "USER_DATA_CHECKABLE_ELEMENT");
	
	private String attributeName;
	private String attributeStringKey;
}
