package ca.hec.opensyllabus2.impl;

import org.sakaiproject.authz.api.SecurityService;

import ca.hec.opensyllabus2.api.OpenSyllabus2SecurityService;

public class OpenSyllabus2SecurityServiceImpl implements OpenSyllabus2SecurityService {

	
	private SecurityService securityService;
	
	private void setSecurityService (SecurityService securityService){
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
