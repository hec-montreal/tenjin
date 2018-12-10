package ca.hec.tenjin.tool.controller.util;

import org.apache.commons.logging.LogFactory;
import org.sakaiproject.event.cover.UsageSessionService;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.tool.api.SessionManager;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.tool.controller.EventController;

public class CsrfUtil {
	
	public static boolean isCsrfTokenValid (SessionManager sessionManager, String csrfToken)
	{
		String sessionToken = getSessionCsrfToken(sessionManager);
	
		if (sessionToken == null || csrfToken == null)
		{
			return false;
		}
		
		return sessionToken.equals(csrfToken);
	}
	
	public static void checkCsrfToken (SessionManager sessionManager, String csrfToken) throws DeniedAccessException
	{
		if(!isCsrfTokenValid(sessionManager, csrfToken))
		{
			LogFactory.getLog(CsrfUtil.class).error("Invalid csrf token");
			
			throw new DeniedAccessException("Invalid csrf token");
		}
	}
	
	public static void checkCsrfToken (SessionManager sessionManager, CsrfToken csrfToken) throws DeniedAccessException
	{
		checkCsrfToken(sessionManager, csrfToken.getCsrfToken());
	}
	
	public static String getSessionCsrfToken (SessionManager sessionManager)
	{
		Session session = sessionManager.getCurrentSession();
		
		if (session == null)
		{
			return null;
		}
		
		return (String) session.getAttribute(UsageSessionService.SAKAI_CSRF_SESSION_ATTRIBUTE);
	}
}
