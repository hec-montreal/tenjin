package ca.hec.tenjin.impl.provider.tool;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.tool.assessment.entity.api.PublishedAssessmentEntityProvider;
import org.sakaiproject.tool.assessment.facade.PublishedAssessmentFacade;
import org.sakaiproject.tool.assessment.facade.PublishedAssessmentFacadeQueries;
import org.sakaiproject.tool.assessment.services.PersistenceService;

import ca.hec.tenjin.api.provider.tool.SamigoToolEntity;
import ca.hec.tenjin.api.provider.tool.SamigoToolEntityProvider;
import ca.hec.tenjin.api.provider.tool.ToolEntity;
import lombok.Setter;

public class SamigoToolEntityProviderImpl implements SamigoToolEntityProvider {

	@Setter
	private PublishedAssessmentEntityProvider publishedAssessmentEntityProvider;

	@Setter
	private PersistenceService persistenceService;

	@Override
	public List<ToolEntity> getEntities(String siteId, String currentUserId) {
		//use method #2 that doesn't require current user to be in the group
		List<PublishedAssessmentFacade> assessments = 
				persistenceService.getPublishedAssessmentFacadeQueries().getBasicInfoOfAllPublishedAssessments2(
						PublishedAssessmentFacadeQueries.TITLE, true, siteId);

		List<ToolEntity> ret = new ArrayList<>();

		for (PublishedAssessmentFacade assessmentObj : assessments) {
			ToolEntity entity = new SamigoToolEntity();

			entity.setName(assessmentObj.getTitle());
			entity.setResourceId(assessmentObj.getPublishedAssessmentId().toString());
			entity.setUrl("/direct/sam_pub/" + assessmentObj.getPublishedAssessmentId().toString());
			entity.setSections(persistenceService.getPublishedAssessmentFacadeQueries().getReleaseToGroupIdsForPublishedAssessment(assessmentObj.getPublishedAssessmentId().toString()));

			ret.add(entity);
		}

		return ret;
	}

	@Override
	public String getToolName() {
		return "SAM_PUB";
	}
}
