package ca.hec.opensyllabus2.impl;

import ca.hec.opensyllabus2.api.SakaiProxy;
import ca.hec.opensyllabus2.api.Syllabus2SecurityService;
import lombok.Setter;

@Setter
public class Syllabus2SecurityServiceImpl implements Syllabus2SecurityService {
	
	private SakaiProxy sakaiProxy;
	
	@Override
	public boolean isSuperUser(String userId) {
		return sakaiProxy.isSuperUser();
	}

	@Override
	public boolean isAllowed(String userId, String permission, String entityRef) {
		return sakaiProxy.isAllowed(userId, permission, entityRef);
	}	
}
