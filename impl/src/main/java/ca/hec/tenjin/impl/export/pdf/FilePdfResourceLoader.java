package ca.hec.tenjin.impl.export.pdf;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.commons.io.IOUtils;

import ca.hec.tenjin.api.export.pdf.PdfResourceLoader;

public class FilePdfResourceLoader extends PdfResourceLoader {
	
	public FilePdfResourceLoader(String basePath) {
		super(basePath);
	}

	@Override
	public byte[] loadResource(String path) throws IOException {
		return IOUtils.toByteArray(new FileInputStream(new File(makePath(path))));
	}
}
