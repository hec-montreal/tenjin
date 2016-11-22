package ca.hec.tenjin.api.exception;

import org.springframework.http.HttpStatus;

public class UnknownElementTypeException extends SyllabusException {
	private static final long serialVersionUID = 1L;

	public UnknownElementTypeException(String message) {
		super(message);
		
		setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
