	package ca.hec.opensyllabus2.impl;


import java.util.Comparator;
import java.util.Map;

import lombok.Setter;

import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.UserDirectoryService;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.dao.Syllabus2Dao;
import ca.hec.opensyllabus2.api.dao.TemplateDao;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElement;
import ca.hec.opensyllabus2.api.model.template.Rubric;
import ca.hec.opensyllabus2.api.model.template.Template;

/**
 * Implementation of {@link Syllabus2Service}
 *
 *
 */
public class Syllabus2ServiceImpl implements Syllabus2Service {

	private static final Logger log = Logger.getLogger(Syllabus2ServiceImpl.class);

	
	/**
 	* {@inheritDoc}
 	*/
	public String getCurrentUserDisplayName() {
	   return userDirectoryService.getCurrentUser().getDisplayName();
	}

	/**
 	* {@inheritDoc}
 	*/
	public boolean isSuperUser() {
		return securityService.isSuperUser();
	}

	/**
 	* {@inheritDoc}
 	*/
	public void postEvent(String event,String reference,boolean modify) {
		eventTrackingService.post(eventTrackingService.newEvent(event,reference,modify));
	}

	/**
 	* {@inheritDoc}
 	*/
	public String getSkinRepoProperty(){
		return serverConfigurationService.getString("skin.repo");
	}

	/**
 	* {@inheritDoc}
 	*/
	public String getToolSkinCSS(String skinRepo){

		String skin = siteService.findTool(sessionManager.getCurrentToolSession().getPlacementId()).getSkin();

		if(skin == null) {
			skin = serverConfigurationService.getString("skin.default");
		}

		return skinRepo + "/" + skin + "/tool.css";
	}

	/**
	 * init - perform any actions required here for when this bean starts up
	 */
	public void init() {
		log.info("init");
	}

    @Setter
	private Syllabus2Dao syllabusDao;

    @Setter
	private TemplateDao templateDao;

	@Setter
	private ToolManager toolManager;

    @Setter
	private SessionManager sessionManager;

    @Setter
	private UserDirectoryService userDirectoryService;

    @Setter
	private SecurityService securityService;

    @Setter
	private EventTrackingService eventTrackingService;

    @Setter
	private ServerConfigurationService serverConfigurationService;

    @Setter
	private SiteService siteService;

    @Setter
	private ContentHostingService chs;
    
    
    public Syllabus getShareableSyllabus(String courseId) {
		// TODO check if the user is allowed to get the syllabus before

		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getShareableSyllabus(courseId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}


	}

	@Override
	public Syllabus getSyllabus(String courseId, String sectionId) {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getSyllabus(courseId, sectionId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}

	}

	@Override
	public Syllabus getCommonSyllabus(String courseId, String[]  sectionIds) {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getCommonSyllabus(courseId, sectionIds);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}

	}

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		return templateDao.getTemplate(templateId);
	}
	
	
	@Override
	public Syllabus getSiteSyllabus() {
		String siteId = "";
		try {
		    siteId = getCurrentSiteContext();
		} catch (Exception e) {
			// TODO DEFINE ERROR TO BE RETURNED TO CLIENT
		}
				
		String val2 = chs.getSiteCollection(siteId);
		String refString = chs.getReference(val2);
		
		//TODO: retreive user allowed access
		Syllabus syllabus = getShareableSyllabus(refString);
		
		
		
		return syllabus;
		
	}
	
	private String getCurrentSiteContext (){
		String siteRef = null;
		String context = toolManager.getCurrentPlacement().getContext();
		
		try {
			siteRef = siteService.getSite(context).getId();
		} catch (IdUnusedException e) {
			// TODO DEFINE ERROR TO BE RETURNED TO CLIENT
			e.printStackTrace();
		}
		
		return siteRef;
	}

}
