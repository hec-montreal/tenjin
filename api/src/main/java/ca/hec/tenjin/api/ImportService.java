package ca.hec.tenjin.api;

import ca.hec.tenjin.api.model.syllabus.Syllabus;

/**
 * An interface to abstract all methods relating to importing existing syllabuses 
 * as Tenjin syllabuses.
 * 
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 *
 */
public interface ImportService {
	
	public Syllabus importSyllabusFromSite(String siteId);

}
