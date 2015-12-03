package ca.hec.opensyllabus2.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Setter;

import org.apache.log4j.Logger;
import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.component.api.ServerConfigurationService;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.event.api.EventTrackingService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.Placement;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;
import org.sakaiproject.user.api.UserDirectoryService;

import ca.hec.opensyllabus2.api.Syllabus2Service;
import ca.hec.opensyllabus2.api.OsylException.NoSiteException;
import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.dao.Syllabus2Dao;
import ca.hec.opensyllabus2.api.dao.TemplateDao;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.template.Template;
import ca.hec.opensyllabus2.api.model.template.TemplateStructure;

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


    public Syllabus getShareableSyllabus(String courseId) throws NoSyllabusException {
		// TODO check if the user is allowed to get the syllabus before

		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getShareableSyllabus(courseId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}


	}

	@Override
	public Syllabus getSyllabus(String courseId, String sectionId) throws NoSyllabusException {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getSyllabus(courseId, sectionId);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}

	}

	@Override
	public Syllabus getCommonSyllabus(String courseId, String[]  sectionIds) throws NoSyllabusException {
		Syllabus syllabus;

		try {
			syllabus = syllabusDao.getCommonSyllabus(courseId, sectionIds);
			return syllabus;
		} catch (Exception e) {
			log.warn("The syllabus could not be retrieved because: " + e.getMessage()) ;
			throw new NoSyllabusException();
		}

	}

	@Override
	public Template getTemplate(Long templateId) throws IdUnusedException {
		return templateDao.getTemplate(templateId);
	}

	@Override
	public Map<String, List<Object>> getTemplateRules(Long templateId) throws IdUnusedException {
		HashMap<String, List<Object>> results = new HashMap<String, List<Object>>();

		Template t = templateDao.getTemplate(templateId);

		for (TemplateStructure elem : t.getElements()) {
			getRules(elem, results);
		}

		return results;
	}

	/*
	 * il faudra au moins mettre les valeurs en cache?
	 * ZCII-2008
	 */
	private void getRules(TemplateStructure structure, Map<String, List<Object>> map) {

		if (structure!= null && structure.getParentId() != null) {
			List<Object> elementList;

			String parentId = structure.getParentId().toString();

			if (!map.containsKey(parentId)) {
				elementList = new ArrayList<Object>();
				map.put(parentId, elementList);
			} else {
				elementList = map.get(parentId);
			}

			Map<String, String> templateElementMap = new HashMap<String, String>();
			templateElementMap.put("id", structure.getId().toString());
			templateElementMap.put("type", structure.getTemplateElement().getType().getTitle());
			templateElementMap.put("label", structure.getTemplateElement().getLabels().get("fr_CA"));

			elementList.add(templateElementMap);
		}

		for (TemplateStructure elem : structure.getElements()) {
			getRules(elem, map);
		}

		return;
	}


	@Override
	public Object loadSyllabus() throws NoSyllabusException, NoSiteException {
		String siteId = "";
		try {
		    siteId = getCurrentSiteContext();
		} catch (IdUnusedException e) {
		    e.printStackTrace();
		    throw new NoSiteException();
		}

		//TODO: retreive user allowed access
		Syllabus syllabus = getShareableSyllabus(siteId);

		return syllabus;

	}

	private String getCurrentSiteContext () throws IdUnusedException, NoSiteException{
		String siteRef = null;
		Placement placement = toolManager.getCurrentPlacement();
		String context = null;

		if (placement == null)
		    throw new NoSiteException();
		else
		    context = placement.getContext();

		siteRef = siteService.getSite(context).getId();

		return siteRef;
	}

	public Syllabus createOrUpdateSyllabus(Syllabus syllabus) {
		log.info("syllabus:" + syllabus.toString());
		return syllabusDao.createOrUpdateSyllabus(syllabus);
	}

}
