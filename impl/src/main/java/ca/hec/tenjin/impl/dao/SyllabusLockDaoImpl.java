package ca.hec.tenjin.impl.dao;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.SyllabusLockDao;
import ca.hec.tenjin.api.exception.NoSyllabusLockException;
import ca.hec.tenjin.api.model.syllabus.SyllabusLock;

public class SyllabusLockDaoImpl extends HibernateDaoSupport implements SyllabusLockDao {

	@Override
	public SyllabusLock getSyllabusLock(Long id) throws NoSyllabusLockException {
		SyllabusLock ret = getHibernateTemplate().get(SyllabusLock.class, id);

		if (ret == null) {
			throw new NoSyllabusLockException(id);
		}

		return ret;
	}

	@SuppressWarnings("unchecked")
	@Override
	public SyllabusLock getSyllabusLockForSyllabus(Long syllabusId) {
		List<SyllabusLock> locks = (List<SyllabusLock>) getHibernateTemplate()
				.find("from SyllabusLock where syllabusId = ?", syllabusId);

		if (locks.size() == 0) {
			return null;
		}

		return locks.get(0);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SyllabusLock> getSyllabusLocksForUser(Long userId) {
		return (List<SyllabusLock>) getHibernateTemplate().find("from SyllabusLock where createdBy = ?", userId);
	}

	@Override
	public void save(SyllabusLock lock) {
		getHibernateTemplate().save(lock);
	}

	@Override
	public void delete(SyllabusLock lock) {
		getHibernateTemplate().delete(lock);
	}
}
