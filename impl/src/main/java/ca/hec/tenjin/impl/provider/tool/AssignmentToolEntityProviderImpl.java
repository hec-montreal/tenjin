package ca.hec.tenjin.impl.provider.tool;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.assignment.api.Assignment;
import org.sakaiproject.assignment.api.AssignmentService;

import ca.hec.tenjin.api.provider.tool.AssignmentToolEntity;
import ca.hec.tenjin.api.provider.tool.AssignmentToolEntityProvider;
import ca.hec.tenjin.api.provider.tool.ToolEntity;
import lombok.Setter;

public class AssignmentToolEntityProviderImpl implements AssignmentToolEntityProvider {

	@Setter
	private AssignmentService assignmentService;

	@Override
	public List<ToolEntity> getEntities(String siteId, String currentUserId) {
		List<?> assignments = assignmentService.getListAssignmentsForContext(siteId);
		List<ToolEntity> ret = new ArrayList<>();

		for (Object assignmentObj : assignments) {
			Assignment assignment = (Assignment) assignmentObj;
			ToolEntity entity = new AssignmentToolEntity();

			entity.setName(assignment.getTitle());
			entity.setResourceId(assignment.getId());
			entity.setUrl(assignment.getUrl());

			if (assignment.getGroups() != null) {
				for(Object strObj : assignment.getGroups()) {
					String groupId = extractGroupId((String) strObj);
					
					if(groupId != null) {
						entity.getSections().add(groupId);
					}
				}
			}
			
			ret.add(entity);
		}

		return ret;
	}

	@Override
	public String getToolName() {
		return "ASSIGNMENT";
	}

	private String extractGroupId(String str) {
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
