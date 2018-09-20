package ca.hec.tenjin.impl;

import ca.hec.tenjin.api.ReportingService;
import ca.hec.tenjin.api.dao.ReportingDao;
import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

/**
 * Created by curtis on 23/10/17.
 */
public class ReportingServiceImpl implements ReportingService {

    @Setter
    @Autowired
    private ReportingDao reportingDao;

    @Override
    public List<PublishedCitationElement> getPublishedCitationsModifiedSince(Date date) {
        return reportingDao.getPublishedCitationsModifiedSince(date);
    }

    @Override
    public List<SyllabusCitationElement> getCitationsModifiedSince(Date date) {
        return reportingDao.getCitationsModifiedSince(date);
    }
}
