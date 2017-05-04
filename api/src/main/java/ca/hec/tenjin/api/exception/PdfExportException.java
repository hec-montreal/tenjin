package ca.hec.tenjin.api.exception;

public class PdfExportException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public PdfExportException() {
		
	}
	
	public PdfExportException(Exception e) {
		super(e);
	}
}
