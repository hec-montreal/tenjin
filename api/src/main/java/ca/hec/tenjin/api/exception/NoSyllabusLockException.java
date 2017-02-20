package ca.hec.tenjin.api.exception;

import org.springframework.http.HttpStatus;

public class NoSyllabusLockException extends SyllabusException {
	
	private static final long serialVersionUID = 1L;
	
	private Long syllabusLockId;

	public NoSyllabusLockException(Long syllabusLockId) {
		super(HttpStatus.NOT_FOUND);

		this.syllabusLockId = syllabusLockId;
	}

	public Long getSyllabusLockId() {
		return syllabusLockId;
	}
}
