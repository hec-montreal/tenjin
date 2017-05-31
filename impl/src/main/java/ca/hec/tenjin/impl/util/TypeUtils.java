package ca.hec.tenjin.impl.util;

public class TypeUtils {
	
	public static boolean safeBool(String attribute) {
		if(attribute == null) {
			return false;
		}
		
		Boolean ret;
		
		try {
			ret = Boolean.parseBoolean(attribute);
		} catch (Exception e) {
			return false;
		}
		
		return ret;
	}
}
