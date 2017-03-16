package ca.hec.tenjin.api.provider.tool;

import java.util.List;

public interface ToolEntityProvider {
	
	public List<ToolEntity> getEntities(String siteId, String currentUserId);
	
	public String getToolName();
}
