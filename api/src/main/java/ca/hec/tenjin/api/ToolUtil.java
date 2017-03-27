package ca.hec.tenjin.api;

public class ToolUtil {
	public static String extractGroupId(String str) {
		if(str == null) {
			return null;
		}
		
		final String MARKER = "/group/";
		int indexOfMarker = str.indexOf(MARKER);
		
		if(indexOfMarker < 0) {
			return null;
		}
		
		return str.substring(indexOfMarker + MARKER.length());
	}
}
