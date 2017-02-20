package ca.hec.tenjin.api.exception;

import org.springframework.http.HttpStatus;

import ca.hec.tenjin.api.model.syllabus.SyllabusLock;
import lombok.Getter;

@Getter
public class SyllabusLockedException extends SyllabusException {

	private static final long serialVersionUID = 1L;

	// For web service response check
	private boolean locked = true;
	private SyllabusLock lock;

	public SyllabusLockedException(SyllabusLock lock) {
		super(HttpStatus.CONFLICT);

		this.lock = lock;
	}
}
