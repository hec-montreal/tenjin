package ca.hec.opensyllabus2.api;

public interface OpenSyllabus2SecurityService {

	public boolean isSuperUser (String userId);
	
	public boolean isAllowed (String userId, String permission);
}
