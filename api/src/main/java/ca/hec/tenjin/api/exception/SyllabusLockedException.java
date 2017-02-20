package ca.hec.tenjin.api.exception;

import org.springframework.http.HttpStatus;

import ca.hec.tenjin.api.model.syllabus.SyllabusLock;

public class SyllabusLockedException extends SyllabusException {

	private static final long serialVersionUID = 1L;

	private SyllabusLock lock;

	public SyllabusLockedException(SyllabusLock lock) {
		super(HttpStatus.CONFLICT);

		this.lock = lock;
	}

	public SyllabusLock getLock() {
		return lock;
	}
}
