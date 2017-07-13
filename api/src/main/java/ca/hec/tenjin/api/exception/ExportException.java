package ca.hec.tenjin.api.exception;

public class ExportException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public ExportException() {
		
	}
	
	public ExportException(Exception e) {
		super(e);
	}
}
