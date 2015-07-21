package ca.hec.opensyllabus2.impl;

import ca.hec.opensyllabus2.api.OpenSyllabus2SecurityService;

public class OpenSyllabus2SecurityServiceImpl implements OpenSyllabus2SecurityService {

	@Override
	public boolean isSuperUser(String userId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAllowed(String userId, String permission) {
		// TODO Auto-generated method stub
		return false;
	}

	
	public void init(){
		
	}
}
