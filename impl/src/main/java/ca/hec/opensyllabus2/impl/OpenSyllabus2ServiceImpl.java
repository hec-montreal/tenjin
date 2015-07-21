package ca.hec.opensyllabus2.impl;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.opensyllabus2.api.OpenSyllabus2Service;
import ca.hec.opensyllabus2.api.dao.SyllabusDao;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

/**
 * Implementation of {@link OpenSyllabus2Service}
 * 
 * 
 */
public class OpenSyllabus2ServiceImpl implements OpenSyllabus2Service {

	private static final Logger log = Logger.getLogger(OpenSyllabus2ServiceImpl.class);
    
	/**
 	* {@inheritDoc}
 	*/
	public String getCurrentSiteId(){
		return toolManager.getCurrentPlacement().getContext();
	}
	
	/**
 	* {@inheritDoc}
 	*/
	public String getCurrentUserId() {
		return sessionManager.getCurrentSessionUserId();
	}
	

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
	private SyllabusDao syllabusDao;
	
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

	
    public Syllabus getShareableSyllabus(String courseId) {
		// TODO check if the user is allowed to get the syllabus before 
		
		Syllabus syllabus;
		
		try {
			syllabus = syllabusDao.getSyllabus(courseId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			return null;
		}
		
		
	}

	@Override
	public Syllabus getSyllabus(String courseId, String sectionId) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public Syllabus getCommonSyllabus(List<String> sectionIds) {
		// TODO Auto-generated method stub
		return null;
	}
}
