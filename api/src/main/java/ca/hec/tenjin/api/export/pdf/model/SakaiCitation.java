package ca.hec.tenjin.api.export.pdf.model;

import java.util.Map;

import org.sakaiproject.citation.api.Citation;

import lombok.Data;

@Data
public class SakaiCitation {
	private Citation citation;
	
	@SuppressWarnings("rawtypes")
	private Map props;
	
	public SakaiCitation(Citation citation) {
		this.citation = citation;
		
		props = citation.getCitationProperties();
	}
	
	public String getCreator() {
		return (String) props.get("creator");
	}
}
