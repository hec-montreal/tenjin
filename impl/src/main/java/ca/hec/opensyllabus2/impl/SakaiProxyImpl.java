package ca.hec.opensyllabus2.impl;

import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.tool.api.SessionManager;
import org.sakaiproject.tool.api.ToolManager;

import ca.hec.opensyllabus2.api.SakaiProxy;
import lombok.Setter;

@Setter
public class SakaiProxyImpl implements SakaiProxy {
	
	private SessionManager sessionManager;
	private SiteService siteService;
	private ToolManager toolManager;
	
	@Override
	public boolean isSuperUser() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void postEvent(String event, String reference, boolean modify) {
		// TODO Auto-generated method stub

	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public String getCurrentUserId() {
		return sessionManager.getCurrentSessionUserId();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String getCurrentSiteId() {
		return toolManager.getCurrentPlacement().getContext();
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public String getCurrentSiteLocale() {

		String siteId = toolManager.getCurrentPlacement().getContext();
        Site currentSite = getSite(siteId);

        if (currentSite != null) {
            String locale = currentSite.getProperties().getProperty("locale_string");
            if (locale != null) {
                return locale;
            }
        }

        return null;
	}

	@Override
	public Site getSite(String siteId) {
		// TODO Auto-generated method stub
		return null;
	}
}
