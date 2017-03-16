package ca.hec.tenjin.impl.provider.tool;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.tool.assessment.entity.api.PublishedAssessmentEntityProvider;
import org.sakaiproject.tool.assessment.entity.impl.PublishedAssessmentEntityProviderImpl;
import org.sakaiproject.tool.assessment.facade.PublishedAssessmentFacade;
import org.sakaiproject.tool.assessment.services.assessment.PublishedAssessmentService;

import ca.hec.tenjin.api.provider.tool.SamigoToolEntity;
import ca.hec.tenjin.api.provider.tool.SamigoToolEntityProvider;
import ca.hec.tenjin.api.provider.tool.ToolEntity;
import lombok.Setter;

public class SamigoToolEntityProviderImpl implements SamigoToolEntityProvider {

	@Setter
	private PublishedAssessmentEntityProvider publishedAssessmentEntityProvider;
	
	@Override
	public List<ToolEntity> getEntities(String siteId, String currentUserId) {
		PublishedAssessmentEntityProviderImpl providerImpl = (PublishedAssessmentEntityProviderImpl) publishedAssessmentEntityProvider; 
		PublishedAssessmentService service = new PublishedAssessmentService();
		
		List<String> entities = providerImpl.findEntityRefs(new String[]{PublishedAssessmentEntityProvider.ENTITY_PREFIX}, 
															new String[]{"site", "user"}, 
															new String[]{siteId, currentUserId},
															false);

		List<ToolEntity> ret = new ArrayList<>();
		
		for(String key : entities) {
			PublishedAssessmentFacade a = service.getPublishedAssessment(key.substring(PublishedAssessmentEntityProvider.ENTITY_PREFIX.length() + 2));
			ToolEntity entity = new SamigoToolEntity();
			
			entity.setResourceId(key);
			entity.setName(a.getTitle());
			entity.setUrl(key);
			
			String sections = a.getReleaseToGroups();
			
			if(sections != null && sections.length() > 0) {
				for(String s : sections.split(",")) {
					entity.getSections().add(s.trim());
				}
			}
			
			ret.add(entity);
		}
		
		return ret;
	}

	@Override
	public String getToolName() {
		return PublishedAssessmentEntityProvider.ENTITY_PREFIX.toUpperCase();
	}
}
