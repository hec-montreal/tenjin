package ca.hec.tenjin.api.provider;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.model.syllabus.Syllabus;

/**
 * An interface to abstract all Template related operations
 *
 * @author Curtis van Osch 
 *
 */
public interface TenjinImportProvider {



	public Syllabus importSyllabusFromSite(String siteId, String destinationSiteId) throws DeniedAccessException;

}
