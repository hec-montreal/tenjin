package ca.hec.tenjin.impl.export.pdf;

import java.io.IOException;

import org.apache.commons.io.IOUtils;

import ca.hec.tenjin.api.export.pdf.PdfResourceLoader;

public class ClasspathPdfResourceLoader extends PdfResourceLoader {

	public ClasspathPdfResourceLoader(String basePath) {
		super(basePath);
	}

	@Override
	public byte[] loadResource(String path) throws IOException {
		return IOUtils.toByteArray(getClass().getResourceAsStream(makePath(path)));
	}
}
