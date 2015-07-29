package ca.hec.opensyllabus2.impl;

import org.sakaiproject.authz.api.SecurityService;

import ca.hec.opensyllabus2.api.Syllabus2SecurityService;

public class Syllabus2SecurityServiceImpl implements Syllabus2SecurityService {

	
	private SecurityService securityService;
	
	public void setSecurityService (SecurityService securityService){
		this.securityService = securityService;
	
	}
	
	@Override
	public boolean isSuperUser(String userId) {
		return securityService.isSuperUser();
	}

	@Override
	public boolean isAllowed(String userId, String permission) {
		// TODO Auto-generated method stub
		return false;
	}

	
	public void init(){
		
	}

	@Override
	public boolean isAllowed(String userId, String permission, String entityRef) {
		return securityService.unlock(userId, permission, entityRef);
	}
}
