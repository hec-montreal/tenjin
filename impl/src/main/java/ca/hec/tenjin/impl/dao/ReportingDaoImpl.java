package ca.hec.tenjin.impl.dao;

import java.util.Date;
import java.util.List;

import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import ca.hec.tenjin.api.dao.ReportingDao;
import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;

/**
 * Created by curtis on 23/10/17.
 */
public class ReportingDaoImpl extends HibernateDaoSupport implements ReportingDao {

    @Override
    public List<PublishedCitationElement> getPublishedCitationsModifiedSince(Date date) {
        String query = "from PublishedCitationElement where lastModifiedDate >= ? order by site_id";

        List<PublishedCitationElement> citations =
                (List<PublishedCitationElement>) getHibernateTemplate().find(query, date);

        return citations;
    }

    @Override
    public List<SyllabusCitationElement> getCitationsModifiedSince(Date date) {
        String query = "from SyllabusCitationElement where lastModifiedDate >= ? order by site_id";

        List<SyllabusCitationElement> citations =
                (List<SyllabusCitationElement>) getHibernateTemplate().find(query, date);

        return citations;
    }
}
