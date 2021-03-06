package ca.hec.tenjin.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusLockService;
import ca.hec.tenjin.api.TenjinProperties;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusLockDao;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;
import lombok.Setter;

public class SyllabusLockServiceImpl implements SyllabusLockService {

	private static final int DEFAULT_SYLLABUS_LOCK_DELAY_SECONDS = 120;

	@Setter
	private SakaiProxy sakaiProxy;

	@Setter
	private SyllabusDao syllabusDao;

	@Setter
	private SyllabusLockDao syllabusLockDao;

	@Setter
	private TenjinSecurityServiceImpl securityService;

	@Override
	public SyllabusLock getSyllabusLock(Long syllabusId) throws DeniedAccessException {
		return syllabusLockDao.getSyllabusLockForSyllabus(syllabusId);
	}

	@Override
	public List<SyllabusLock> getSyllabusLocksForUser(Long userId) throws DeniedAccessException {
		if (!sakaiProxy.getCurrentUserId().equals(userId)) {
			throw new DeniedAccessException();
		}

		return syllabusLockDao.getSyllabusLocksForUser(userId);
	}

	@Override
	public SyllabusLock lockSyllabus(Long syllabusId, String userId, String username) throws DeniedAccessException {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getSyllabus(syllabusId);
		} catch (NoSyllabusException e) {
			return null;
		}

		if (!securityService.canWrite(sakaiProxy.getCurrentUserId(), syllabus)) {
			throw new DeniedAccessException();
		}

		SyllabusLock lock = new SyllabusLock();

		lock.setSyllabusId(syllabusId);
		lock.setLastRenewalDate(new Date());
		lock.setCreatedBy(userId);
		lock.setCreatedByName(username);

		syllabusLockDao.save(lock);

		return lock;
	}

	@Override
	public void unlockSyllabus(Long syllabusId) throws DeniedAccessException {
		SyllabusLock lock = syllabusLockDao.getSyllabusLockForSyllabus(syllabusId);

		if (lock == null) {
			return;
		}

		syllabusLockDao.delete(lock);
	}

	@Override
	public void renewSyllabusLock(SyllabusLock lock) throws DeniedAccessException {
		if (!sakaiProxy.getCurrentUserId().equals(lock.getCreatedBy())) {
			throw new DeniedAccessException();
		}

		lock.setLastRenewalDate(new Date());

		syllabusLockDao.save(lock);
	}

	@Override
	public boolean isLockExpired(SyllabusLock lock) {
		if (lock == null) {
			return true;
		}
		
		Calendar cal = Calendar.getInstance();

		String delayProp = sakaiProxy.getSakaiProperty(TenjinProperties.PROPERTY_SYLLABUS_LOCK_DELAY_SECONDS);
		int delay;

		if (delayProp == null || delayProp.length() == 0) {
			delay = DEFAULT_SYLLABUS_LOCK_DELAY_SECONDS;
		}

		try {
			delay = Integer.parseInt(delayProp);
		} catch (NumberFormatException e) {
			delay = DEFAULT_SYLLABUS_LOCK_DELAY_SECONDS;
		}

		cal.setTime(lock.getLastRenewalDate());
		cal.add(Calendar.SECOND, delay);

		return cal.getTime().before(new Date());
	}

	@Override
	public boolean checkIfUserHasLock(Syllabus syllabus, String currentUserId) throws DeniedAccessException {
		SyllabusLock lock = getSyllabusLock(syllabus.getId());

		if (lock == null) {
			return false;
		}

		// If the lock has expired, delete it and return false
		if (isLockExpired(lock)) {
			unlockSyllabus(syllabus.getId());

			return false;
		}

		return lock.getCreatedBy().equals(currentUserId);
	}
}
