package ca.hec.tenjin.impl.jobs;

import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.jobs.SyncSectionsInTenjin;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import lombok.Setter;
import org.apache.log4j.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sakaiproject.coursemanagement.api.CourseManagementService;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.tool.api.SessionManager;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by 11091096 on 2017-05-08.
 */
public class SyncSectionsInTenjinImpl implements SyncSectionsInTenjin {

    private static final Logger log = Logger.getLogger(SyncSectionsInTenjinImpl.class);

    @Setter
    protected CourseManagementService cmService;

    @Setter
    protected SessionManager sessionManager;

    @Setter
    protected SiteService siteService;

    @Setter
    protected SyllabusDao syllabusDao;

    @Setter
    protected SyllabusService syllabusService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        String startDate = jobExecutionContext.getMergedJobDataMap().getString("syncSectionsInTenjin.startDate");

        Date startingDate = getDate(startDate);
        Date createdOn = null;
        int counter = 0;
        Site site = null;
        List<String> providerIds;


        List<Site> allSites = siteService.getSites(SiteService.SelectionType.NON_USER, "course", null, null, SiteService.SortType.CREATED_ON_DESC, null);
        Map<String, Object> sectionsBySyllabus;
        Syllabus common = null;
        //Use groupIds
        List<String>  newProviderIds;
        Collection<Group> siteGroups = null;

        Session session = sessionManager.getCurrentSession();

		try {
			session.setUserEid("admin");
			session.setUserId("admin");

			do {
				try {
					site = allSites.get(counter++);
					createdOn = site.getCreatedDate();
					if (createdOn.before(startingDate))
						break;
					if (site.getProviderGroupId() == null || site.getProviderGroupId().isEmpty())
						continue;
					siteGroups = site.getGroups();
					newProviderIds = new ArrayList<String>();
					sectionsBySyllabus = syllabusDao.getSectionsBySyllabus(site.getId());
					if (sectionsBySyllabus != null && sectionsBySyllabus.keySet().size() > 0) {
						common = syllabusDao.getCommonSyllabus(site.getId());

						// Make sure all the sections in Tenjin are up to date
						for (Group group : siteGroups) {
							// If there is no providerId, the group does not
							// come from an official section
							if (group.getProviderGroupId() == null)
								continue;
							if (sectionsBySyllabus.containsKey(group.getId())) {
								sectionsBySyllabus.remove(group.getId());

								log.info("Section ou groupId " + group.getProviderGroupId()
										+ " est correctement enregistré");

							} else {
								// Add new section to common
								newProviderIds.add(group.getId());
								syllabusDao.addSection(common.getId().toString(), group.getId());
								log.info("Section ou groupId " + group.getProviderGroupId() + " est ajouté au common");

							}
						}

						// Delete cancelled sections
						for (String sectionId : sectionsBySyllabus.keySet()) {
							syllabusDao.deleteSection(sectionsBySyllabus.get(sectionId).toString(), sectionId);
							log.info("Section ou groupId " + sectionId + " pour le site " + site.getId()
									+ " du syllabus " + sectionsBySyllabus.get(sectionId) + " a été retiré");

						}
					}

				} catch (NoSyllabusException e) {
					log.error("the site " + site.getId() + " could not be synchronized");
					e.printStackTrace();
				}
			} while (createdOn.after(startingDate));
		} finally {
			session.clear();
		}

    }

    private Date getDate(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date convertedDate = null;
        try {
            convertedDate = dateFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return convertedDate;

    }

}
