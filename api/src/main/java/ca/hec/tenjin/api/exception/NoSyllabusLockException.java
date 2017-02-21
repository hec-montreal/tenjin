package ca.hec.tenjin.api.exception;

import org.springframework.http.HttpStatus;

public class NoSyllabusLockException extends SyllabusException {

	private static final long serialVersionUID = 1L;

	public NoSyllabusLockException() {
		super(HttpStatus.NOT_FOUND);
	}
}
