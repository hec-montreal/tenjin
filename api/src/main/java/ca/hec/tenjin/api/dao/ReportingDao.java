package ca.hec.tenjin.api.dao;

import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;

import java.util.Date;
import java.util.List;

/**
 * Created by curtis on 23/10/17.
 */
public interface ReportingDao {

    List<PublishedCitationElement> getPublishedCitationsModifiedSince(Date date);
}
