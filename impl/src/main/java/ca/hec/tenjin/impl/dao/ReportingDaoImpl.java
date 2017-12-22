package ca.hec.tenjin.impl.dao;

import ca.hec.tenjin.api.dao.ReportingDao;
import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import ca.hec.tenjin.api.model.syllabus.published.PublishedCitationElement;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.Date;
import java.util.List;

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
}