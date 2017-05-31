package ca.hec.tenjin.api.export.pdf.model;

import lombok.Data;

@Data
public class CourseInfo {
	
	private String title;
	private String number;
	private String sections;
	private String term;
}
