package ca.hec.opensyllabus2.impl;

import java.util.ArrayList;
import java.util.List;

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
	
	@Override 
	public List<String> getUserPermissionsForGroup(String groupId) {
		List<String> l = new ArrayList<String>();
		l.add("read");
		l.add("write");
		return l;
	}	
}
