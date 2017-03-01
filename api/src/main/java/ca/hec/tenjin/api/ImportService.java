package ca.hec.tenjin.api;

import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.exception.DeniedAccessException;

/**
 * An interface to abstract all methods relating to importing existing syllabuses 
 * as Tenjin syllabuses.
 * 
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 *
 */
public interface ImportService {
	
	public Syllabus importSyllabusFromSite(String siteId) throws DeniedAccessException;

}
