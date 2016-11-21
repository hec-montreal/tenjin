package ca.hec.tenjin.api;

import java.util.List;

import ca.hec.tenjin.api.exception.NoPublishedSyllabusException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
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
	 * Retreive the list of published syllabus for a site
	 * 
	 * @param siteId
	 * @return
	 */
	public List<PublishedSyllabus> getPublishedSyllabusList(String siteId);

	/**
	 * Publish the syllabus with the given id
	 * 
	 * @param syllabusId
	 * @throws NoSyllabusException
	 */
	public void publishSyllabus(Long syllabusId) throws NoSyllabusException, NoPublishedSyllabusException;

}
