package ca.hec.tenjin.api.export.pdf;

import java.io.IOException;
import java.util.Base64;

import ca.hec.tenjin.api.export.pdf.model.Image;

public abstract class PdfResourceLoader {

	private String basePath;

	public PdfResourceLoader(String basePath) {
		this.basePath = basePath;
	}

	public abstract byte[] loadResource(String path) throws IOException;

	public Image loadImage(String path) throws IOException {
		Image ret = new Image();

		ret.setMimeType(PdfResourceLoader.findMimeType(path));
		ret.setBase64(Base64.getEncoder().encodeToString(loadResource(path)));

		return ret;
	}

	protected String makePath(String path) {
		if (basePath.endsWith("/") && path.startsWith("/")) {
			return basePath + path.substring(1);
		}

		if (!basePath.endsWith("/") && !path.startsWith("/")) {
			return basePath + "/" + path;
		}
		
		return basePath + path;
	}

	private static String findMimeType(String path) {
		if (path == null || path.length() == 0) {
			return "image";
		}

		if (path.endsWith(".png")) {
			return "image/png";
		}

		if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
			return "image/jpeg";
		}

		if (path.endsWith(".bmp")) {
			return "image/bmp";
		}

		if (path.endsWith(".gif")) {
			return "image/gif";
		}

		return "image";
	}
}
