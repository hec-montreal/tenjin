package ca.hec.tenjin.api.export.pdf.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageSyllabusElement extends SyllabusElement {
	
	private Image image;
	
	public ImageSyllabusElement(Object element, Image image) {
		super(element);
		
		this.image = image;
	}
}
