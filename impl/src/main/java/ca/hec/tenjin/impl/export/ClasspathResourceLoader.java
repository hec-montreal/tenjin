package ca.hec.tenjin.impl.export;

import java.io.IOException;

import org.apache.commons.io.IOUtils;

import ca.hec.tenjin.api.export.PdfResourceLoader;

public class ClasspathResourceLoader extends PdfResourceLoader {

	public ClasspathResourceLoader(String basePath) {
		super(basePath);
	}

	@Override
	public byte[] loadResource(String path) throws IOException {
		return IOUtils.toByteArray(getClass().getResourceAsStream(makePath(path)));
	}
}
