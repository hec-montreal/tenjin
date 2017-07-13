package ca.hec.tenjin.api.export;

import java.io.IOException;
import java.util.Base64;

import ca.hec.tenjin.api.export.model.SakaiResource;

public abstract class PdfResourceLoader {

	private String basePath;

	public PdfResourceLoader(String basePath) {
		this.basePath = basePath;
	}

	public abstract byte[] loadResource(String path) throws IOException;

	public SakaiResource loadImage(String path) throws IOException {
		SakaiResource ret = new SakaiResource();

		ret.setContentType(PdfResourceLoader.findMimeType(path));
		ret.setBytesB64(Base64.getEncoder().encodeToString(loadResource(path)));

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
