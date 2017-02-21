package ca.hec.tenjin.tool.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusLockService;
import ca.hec.tenjin.api.exception.NoSyllabusLockException;
import ca.hec.tenjin.api.exception.SyllabusLockedException;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;
import lombok.Setter;

@Controller
@RequestMapping(value = "v1")
public class SyllabusLockController {

	@Setter
	@Autowired
	private SyllabusLockService syllabusLockService;

	@Setter
	@Autowired
	private SakaiProxy sakaiProxy;

	private static Log log = LogFactory.getLog(SyllabusLockController.class);

	/**
	 * Return the lock for a syllabus, or null if no locks are set. If the lock
	 * has expired, this will unlock the syllabus and return null.
	 * 
	 * @param syllabusId
	 * @return
	 */
	@RequestMapping(value = "/syllabus/{syllabusId}/lock", method = RequestMethod.GET)
	public @ResponseBody SyllabusLock getSyllabusLock(@PathVariable Long syllabusId) {
		SyllabusLock ret = syllabusLockService.getSyllabusLock(syllabusId);

		if (ret == null) {
			return null;
		}

		// Check if the lock has expired
		if (syllabusLockService.isLockExpired(ret)) {
			syllabusLockService.unlockSyllabus(syllabusId);

			return null;
		}

		return ret;
	}

	@RequestMapping(value = "/syllabus/{syllabusId}/lock", method = RequestMethod.POST)
	public @ResponseBody SyllabusLock lockSyllabus(@PathVariable Long syllabusId) throws SyllabusLockedException {
		SyllabusLock lock = syllabusLockService.getSyllabusLock(syllabusId);

		// Verify the current lock
		if (lock != null) {
			if (syllabusLockService.isLockExpired(lock)) {
				syllabusLockService.unlockSyllabus(syllabusId);
			} else {
				// Check if the lock belongs to the current user
				if (lock.getCreatedBy().equals(sakaiProxy.getCurrentUserId())) {
					// Delete old lock
					syllabusLockService.unlockSyllabus(syllabusId);
				} else {
					throw new SyllabusLockedException(lock);
				}
			}
		}

		return syllabusLockService.lockSyllabus(syllabusId, sakaiProxy.getCurrentUserId(), sakaiProxy.getCurrentUserName());
	}

	@RequestMapping(value = "/syllabus/{syllabusId}/lock/renew", method = RequestMethod.POST)
	public @ResponseBody SyllabusLock renewSyllabusLock(@PathVariable Long syllabusId) throws SyllabusLockedException, NoSyllabusLockException {
		SyllabusLock lock = syllabusLockService.getSyllabusLock(syllabusId);

		// No lock
		if (lock == null) {
			throw new NoSyllabusLockException();
		}

		// The lock was not created by the user
		if (!lock.getCreatedBy().equals(sakaiProxy.getCurrentUserId())) {
			// The lock has expired, delete it
			if (syllabusLockService.isLockExpired(lock)) {
				syllabusLockService.unlockSyllabus(syllabusId);

				throw new NoSyllabusLockException();
			} else {
				throw new SyllabusLockedException(lock);
			}
		}

		syllabusLockService.renewSyllabusLock(lock);

		return lock;
	}

	@ExceptionHandler(SyllabusLockedException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public @ResponseBody SyllabusLockedException handleSyllabusLockedException(SyllabusLockedException ex) {
		return ex;
	}
}
