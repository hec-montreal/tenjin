package ca.hec.tenjin.api;

public interface TenjinFunctions {

	public static final String TENJIN_FUNCTION_PREFIX = "tenjin.";
	
	public static final String TENJIN_FUNCTION_READ_COMMON = TENJIN_FUNCTION_PREFIX + "read.common";
	public static final String TENJIN_FUNCTION_WRITE_COMMON = TENJIN_FUNCTION_PREFIX + "write.common";
	public static final String TENJIN_FUNCTION_PUBLISH_COMMON = TENJIN_FUNCTION_PREFIX + "publish.common";
	public static final String TENJIN_FUNCTION_READ_PERS = TENJIN_FUNCTION_PREFIX + "read.personalised";
	public static final String TENJIN_FUNCTION_WRITE_PERS = TENJIN_FUNCTION_PREFIX + "write.personalised";
	public static final String TENJIN_FUNCTION_PUBLISH_PERS = TENJIN_FUNCTION_PREFIX + "publish.personalised";
	public static final String TENJIN_FUNCTION_VIEW_MANAGER = TENJIN_FUNCTION_PREFIX + "manager.view";
}
