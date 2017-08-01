package ca.hec.tenjin.api.export.model;

import lombok.Data;

@Data
public class SakaiResource {
	private String contentType;
	private String bytesB64;
	private String title;
	private String url;
	
	public SakaiResource() {

	}
}
