package ca.hec.tenjin.impl.provider.tool;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.tool.assessment.data.dao.authz.AuthorizationData;
import org.sakaiproject.tool.assessment.entity.api.PublishedAssessmentEntityProvider;
import org.sakaiproject.tool.assessment.entity.impl.PublishedAssessmentEntityProviderImpl;
import org.sakaiproject.tool.assessment.facade.AuthzQueriesFacadeAPI;
import org.sakaiproject.tool.assessment.facade.PublishedAssessmentFacade;
import org.sakaiproject.tool.assessment.services.PersistenceService;
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
		AuthzQueriesFacadeAPI authz = PersistenceService.getInstance().getAuthzQueriesFacade();
		
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
		
			List<AuthorizationData> authorizations = authz.getAuthorizationByFunctionAndQualifier("TAKE_ASSESSMENT", a.getAssessmentId().toString());
			
			for(AuthorizationData data : authorizations) {
				entity.getSections().add(data.getAgentIdString());
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
