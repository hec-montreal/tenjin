package ca.hec.tenjin.api.export.pdf.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Image {
	
	private String mimeType;
	private String base64;
}
