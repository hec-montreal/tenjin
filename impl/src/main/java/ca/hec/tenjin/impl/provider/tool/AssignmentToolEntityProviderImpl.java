package ca.hec.tenjin.impl.provider.tool;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.sakaiproject.assignment.api.AssignmentService;
import org.sakaiproject.assignment.api.model.Assignment;

import ca.hec.tenjin.api.ToolUtil;
import ca.hec.tenjin.api.provider.tool.AssignmentToolEntity;
import ca.hec.tenjin.api.provider.tool.AssignmentToolEntityProvider;
import ca.hec.tenjin.api.provider.tool.ToolEntity;
import lombok.Setter;

public class AssignmentToolEntityProviderImpl implements AssignmentToolEntityProvider {
	@Setter
	private AssignmentService assignmentService;

	@Override
	public List<ToolEntity> getEntities(String siteId, String currentUserId) {
		Collection<?> assignments = assignmentService.getAssignmentsForContext(siteId);
		List<ToolEntity> ret = new ArrayList<>();

		for (Object assignmentObj : assignments) {
			Assignment assignment = (Assignment) assignmentObj;
			ToolEntity entity = new AssignmentToolEntity();

			entity.setName(assignment.getTitle());
			entity.setResourceId(assignment.getId());
			entity.setUrl("/direct/assignment/" + assignment.getId());

			if (assignment.getGroups() != null) {
				for(Object strObj : assignment.getGroups()) {
					String groupId = ToolUtil.extractGroupId((String) strObj);
					
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
}
