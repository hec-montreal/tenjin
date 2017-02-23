package ca.hec.tenjin.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusLockService;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.dao.SyllabusLockDao;
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

	@Override
	public SyllabusLock getSyllabusLock(Long syllabusId) {
		return syllabusLockDao.getSyllabusLockForSyllabus(syllabusId);
	}

	@Override
	public List<SyllabusLock> getSyllabusLocksForUser(Long userId) {
		return syllabusLockDao.getSyllabusLocksForUser(userId);
	}

	@Override
	public SyllabusLock lockSyllabus(Long syllabusId, String userId, String username) {
		SyllabusLock lock = new SyllabusLock();

		lock.setSyllabusId(syllabusId);
		lock.setLastRenewalDate(new Date());
		lock.setCreatedBy(userId);
		lock.setCreatedByName(username);

		syllabusLockDao.save(lock);

		return lock;
	}

	@Override
	public void unlockSyllabus(Long syllabusId) {
		SyllabusLock lock = syllabusLockDao.getSyllabusLockForSyllabus(syllabusId);

		if (lock == null) {
			return;
		}

		syllabusLockDao.delete(lock);
	}

	@Override
	public void renewSyllabusLock(SyllabusLock lock) {
		lock.setLastRenewalDate(new Date());

		syllabusLockDao.save(lock);
	}

	@Override
	public boolean isLockExpired(SyllabusLock lock) {
		Calendar cal = Calendar.getInstance();

		String delayProp = sakaiProxy.getSakaiProperty(SakaiProxy.PROPERTY_SYLLABUS_LOCK_DELAY_SECONDS);
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
	public boolean checkIfUserHasLock(Syllabus syllabus, String currentUserId) {
		SyllabusLock lock = getSyllabusLock(syllabus.getId());

		if (lock == null) {
			return false;
		}

		// If the lock has expired, delete it and return false
		if (isLockExpired(lock)) {
			unlockSyllabus(syllabus.getId());

			return false;
		}

		// At this point the lock exists and has not expired, so check if it
		// belongs to user
		boolean hasLock = lock.getCreatedBy().equals(currentUserId);
		String checkCommonLockProp = sakaiProxy.getSakaiProperty(SakaiProxy.PROPERTY_SYLLABUS_LOCK_CHECK_COMMON_LOCK);

		if (hasLock && !syllabus.getCommon() && (checkCommonLockProp != null && checkCommonLockProp.toLowerCase().equals("true"))) {
			try {
				Syllabus common = syllabusDao.getCommonSyllabus(syllabus.getSiteId());
				SyllabusLock commonLock = getSyllabusLock(common.getId());

				if (isLockExpired(commonLock) || commonLock.getCreatedBy().equals(currentUserId)) {
					unlockSyllabus(common.getId());

					return true;
				} else {
					return false;
				}
			} catch (NoSyllabusException e) {
				return hasLock;
			}
		}

		return hasLock;
	}
}
