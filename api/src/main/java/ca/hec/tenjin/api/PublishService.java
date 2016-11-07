package ca.hec.tenjin.api;

import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

/**
 * An interface to abstract all publishing and published syllabus related methods.
 *
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 *
 */
public interface PublishService {

	/**
	 * Retrieves the syllabus associated to a specific section and sectionId.
	 * @param courseId
	 * @return
	 * @throws NoSyllabusException
	 */
	public PublishedSyllabus getPublishedSyllabus(Long syllabusId) throws NoSyllabusException;

}
