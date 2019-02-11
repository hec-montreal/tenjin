package ca.hec.tenjin.tool.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.tool.api.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusLockService;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.NoSyllabusLockException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.exception.SyllabusLockedException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;
import ca.hec.tenjin.tool.controller.util.CsrfToken;
import ca.hec.tenjin.tool.controller.util.CsrfUtil;
import lombok.Setter;

@Controller
@RequestMapping(value = "v1")
public class SyllabusLockController {

	@Setter
	@Autowired
	private SyllabusLockService syllabusLockService;
	
	@Setter
	@Autowired
	private SyllabusService syllabusService;
	
	@Setter
	@Autowired
	private SessionManager sessionManager;

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
	 * @throws DeniedAccessException
	 * @throws NoSyllabusException
	 */
	@RequestMapping(value = "/syllabus/{syllabusId}/lock", method = RequestMethod.GET)
	public @ResponseBody SyllabusLock getSyllabusLock(@PathVariable Long syllabusId) throws DeniedAccessException {
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
	public @ResponseBody SyllabusLock lockSyllabus(@PathVariable Long syllabusId, @RequestBody CsrfToken csrfToken) throws SyllabusLockedException, DeniedAccessException, NoSyllabusException, StructureSyllabusException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
		SyllabusLock lock = syllabusLockService.getSyllabusLock(syllabusId);

		// Verify the lock for the syllabus
		if (lock != null) {
			validateLock(lock, sakaiProxy.getCurrentUserId());
		}
		
		String checkCommonLockProp = sakaiProxy.getSakaiProperty(SakaiProxy.PROPERTY_SYLLABUS_LOCK_CHECK_COMMON_LOCK);

		if(checkCommonLockProp != null && checkCommonLockProp.toLowerCase().equals("true")) {
			Syllabus syllabus = syllabusService.getSyllabus(syllabusId);
			Syllabus common = syllabusService.getCommonSyllabus(syllabus.getSiteId());
			SyllabusLock commonLock = syllabusLockService.getSyllabusLock(common.getId());
			
			if(commonLock != null) {
				validateLock(commonLock, sakaiProxy.getCurrentUserId());
			}
		}
				
		return syllabusLockService.lockSyllabus(syllabusId, sakaiProxy.getCurrentUserId(), sakaiProxy.getCurrentUserName());
	}

	@RequestMapping(value = "/syllabus/{syllabusId}/lock/renew", method = RequestMethod.POST)
	public @ResponseBody SyllabusLock renewSyllabusLock(@PathVariable Long syllabusId, @RequestBody CsrfToken csrfToken) throws SyllabusLockedException, NoSyllabusLockException, DeniedAccessException {
		CsrfUtil.checkCsrfToken(sessionManager, csrfToken);
		
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
	
	private void validateLock(SyllabusLock lock, String currentUserId) throws DeniedAccessException, SyllabusLockedException {
		if (syllabusLockService.isLockExpired(lock)) {
			syllabusLockService.unlockSyllabus(lock.getSyllabusId());
		} else {
			// Check if the lock belongs to the current user
			if (lock.getCreatedBy().equals(sakaiProxy.getCurrentUserId())) {
				// Delete old lock
				syllabusLockService.unlockSyllabus(lock.getSyllabusId());
			} else {
				throw new SyllabusLockedException(lock);
			}
		}
	}
}
