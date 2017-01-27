package ca.hec.tenjin.api;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoPublishedSyllabusException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.exception.UnknownElementTypeException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

/**
 * An interface to abstract all publishing and published syllabus related
 * methods.
 *
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 *
 */
public interface PublishService {

	/**
	 * Retrieves the published syllabus by it's id
	 * 
	 * @param syllabusId
	 * @return the PublishedSyllabus element
	 * @throws NoSyllabusException
	 */
	public PublishedSyllabus getPublishedSyllabus(Long syllabusId) throws NoSyllabusException;

	/**
	 * Retreives the published syllabus for a siteId + sectionId (optional)
	 * 
	 * @param siteId
	 * @param sectionId
	 * @return
	 * @throws NoSyllabusException
	 */
	public PublishedSyllabus getPublishedSyllabus(String siteId, String sectionId) throws NoSyllabusException, DeniedAccessException;

	/**
	 * Publish the syllabus with the given id
	 * 
	 * @param syllabusId
	 * @throws NoSyllabusException
	 * @throws UnknownElementTypeException
	 * @throws StructureSyllabusException 
	 */
	public Syllabus publishSyllabus(Long syllabusId) throws NoSyllabusException, NoPublishedSyllabusException, UnknownElementTypeException, DeniedAccessException, StructureSyllabusException;

}
