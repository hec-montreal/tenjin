package ca.hec.tenjin.api;

import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;

import java.util.Date;
import java.util.List;

/**
 * An interface to abstract all Template related operations
 *
 * @author Curtis van Osch 
 *
 */
public interface ReportingService {

	/**
	 * Retrieve the list of published citations that have been modified since the given date
	 * @param Date date
	 * @return List<SyllabusCitationElement>
	 */
	List<PublishedCitationElement> getPublishedCitationsModifiedSince(Date date);

	/**
	 * Retrieve the list of citations that have been modified since the given date
	 * @param Date date
	 * @return List<SyllabusCitationElement>
	 */
	List<SyllabusCitationElement> getCitationsModifiedSince(Date date);

	/**
	 * Retrieve the list of citations that have been modified since the given date
	 * @param Date date
	 * @return List<SyllabusCitationElement>
	 */
	List<SyllabusCitationElement> getCitationsModifiedBetween(Date startDate, Date endDate);
}
