package ca.hec.tenjin.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import ca.hec.tenjin.api.SyllabusLockService;
import ca.hec.tenjin.api.dao.SyllabusLockDao;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;
import lombok.Setter;

public class SyllabusLockServiceImpl implements SyllabusLockService {

	private static final int LOCK_DELAY_MINUTES = 2;

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
		Calendar cal = Calendar.getInstance();

		cal.setTime(new Date());
		cal.add(Calendar.MINUTE, LOCK_DELAY_MINUTES);

		lock.setLastRenewalDate(cal.getTime());

		syllabusLockDao.save(lock);
	}

	@Override
	public boolean isLockExpired(SyllabusLock lock) {
		Calendar cal = Calendar.getInstance();

		cal.setTime(lock.getLastRenewalDate());
		cal.add(Calendar.MINUTE, LOCK_DELAY_MINUTES);

		return cal.getTime().before(new Date());
	}

	@Override
	public boolean checkIfUserHasLock(Long syllabusId, String currentUserId) {
		SyllabusLock lock = getSyllabusLock(syllabusId);

		if (lock == null) {
			return false;
		}

		// If the lock exists and was not created by current user, check if
		// it has expired
		if (!lock.getCreatedBy().equals(currentUserId)) {
			// If The lock has expired, delete it
			if (isLockExpired(lock)) {
				unlockSyllabus(syllabusId);
			} else {
				return false;
			}
		}

		return true;
	}
}
