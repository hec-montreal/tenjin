package ca.hec.tenjin.impl.jobs;

import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.jobs.SyncSectionsInTenjin;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import lombok.Setter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sakaiproject.coursemanagement.api.CourseManagementService;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.javax.PagingPosition;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by 11091096 on 2017-05-08.
 */
public class SyncSectionsInTenjinImpl implements SyncSectionsInTenjin {

    private static final Log log = LogFactory.getLog(SyncSectionsInTenjinImpl.class);

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


        Map<String, Object> sectionsBySyllabus;
        Syllabus common = null;
        //Use groupIds
        List<String>  newProviderIds;
        Collection<Group> siteGroups = null;

        Session session = sessionManager.getCurrentSession();
	int totalcount = 0;

		try {
			session.setUserEid("admin");
			session.setUserId("admin");

			PagingPosition paging = new PagingPosition(1, 500);
			// get the first 500
			List<Site> allSites = siteService.getSites(SiteService.SelectionType.NON_USER, "course", null, null, SiteService.SortType.CREATED_ON_DESC, paging);

			do {
				try {

					if (counter == 500) {
						paging.adjustPostition(500);
						counter = 0;
						allSites = siteService.getSites(SiteService.SelectionType.NON_USER, "course", null, null, SiteService.SortType.CREATED_ON_DESC, paging);
					}

					// retrieve the site anew, otherwise group properties are not populated
					site = siteService.getSite(allSites.get(counter).getId());
					counter += 1;
					totalcount++;

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
							// skip if not official section
							String gProp = group.getProperties().getProperty(Group.GROUP_PROP_WSETUP_CREATED);
							if (group.getProviderGroupId() == null ||
								(gProp != null && gProp.equals(Boolean.TRUE.toString())))	{
									continue;
							}
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

				} catch (Exception e) {
					if (site != null)
						log.error("the site " + site.getId() + " could not be synchronized");

					e.printStackTrace();
				}
			} while (createdOn.after(startingDate));
		} finally {
			session.clear();
			log.info("Tenjin Sections sync handled "+totalcount+" sites.");
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
