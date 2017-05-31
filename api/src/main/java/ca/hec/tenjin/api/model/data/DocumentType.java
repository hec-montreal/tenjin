package ca.hec.tenjin.api.model.data;

import lombok.Data;

@Data
public class DocumentType implements DataEnum {
	private int id;
	private String name;
}
