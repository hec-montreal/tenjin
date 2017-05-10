package ca.hec.tenjin.api.export.pdf.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class SyllabusElement {

	private Object element;
	private List<SyllabusElement> children;
	private String escapedDescription;

	public SyllabusElement(Object element) {
		this.element = element;
		
		children = new ArrayList<>();
	}
}
