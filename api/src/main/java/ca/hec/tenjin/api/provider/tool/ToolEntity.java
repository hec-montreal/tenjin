package ca.hec.tenjin.api.provider.tool;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public abstract class ToolEntity {

	private String resourceId;
	private String name;
	private String url;
	private List<String> sections;
	private String type;

	public ToolEntity() {
		this.sections = new ArrayList<>();
		
		this.type = "sakai_entity";
	}
}
