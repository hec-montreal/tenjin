package ca.hec.tenjin.api.export.pdf.model;

import ca.hec.tenjin.api.model.data.EntityContent;
import lombok.Data;

@Data
public class SakaiResource {
	private EntityContent entityContent;
	private String contentType;
	private String bytesB64;
	
	public SakaiResource(EntityContent content) {
		this.entityContent = content;
	}
	
	public SakaiResource() {
		
	}
}
