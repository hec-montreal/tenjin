package ca.hec.tenjin.api.export.model;

import java.util.Map;

import org.sakaiproject.citation.api.Citation;

import lombok.Data;

@Data
public class SakaiCitation {
	private Citation citation;
	private String type;
	
	@SuppressWarnings("rawtypes")
	private Map props;
	
	public SakaiCitation(Citation citation) {
		this.citation = citation;
		
		this.type = citation.getSchema().getIdentifier();
		
		this.props = citation.getCitationProperties();
	}
}
