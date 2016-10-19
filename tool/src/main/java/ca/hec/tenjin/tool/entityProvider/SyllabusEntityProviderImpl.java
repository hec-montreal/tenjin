//package ca.hec.tenjin.tool.entityProvider;
//
//
//import java.io.Writer;
//import java.util.List;
//import java.util.Map;
//
//import net.sf.json.JSON;
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.codehaus.jettison.json.JSONArray;
//import org.sakaiproject.entitybroker.EntityReference;
//import org.sakaiproject.entitybroker.EntityView;
//import org.sakaiproject.entitybroker.entityprovider.CoreEntityProvider;
//import org.sakaiproject.entitybroker.entityprovider.EntityProvider;
//import org.sakaiproject.entitybroker.entityprovider.annotations.EntityCustomAction;
//import org.sakaiproject.entitybroker.entityprovider.capabilities.ActionsExecutable;
//import org.sakaiproject.entitybroker.entityprovider.capabilities.AutoRegisterEntityProvider;
//import org.sakaiproject.entitybroker.entityprovider.capabilities.Describeable;
//import org.sakaiproject.entitybroker.entityprovider.capabilities.Outputable;
//import org.sakaiproject.entitybroker.entityprovider.capabilities.RESTful;
//import org.sakaiproject.entitybroker.entityprovider.capabilities.Resolvable;
//import org.sakaiproject.entitybroker.entityprovider.extension.Formats;
//import org.sakaiproject.entitybroker.entityprovider.search.Search;
//import org.sakaiproject.entitybroker.util.AbstractEntityProvider;
//
//import ca.hec.tenjin.api.SyllabusService;
//import ca.hec.tenjin.api.exception.NoSyllabusException;
//import ca.hec.tenjin.api.model.syllabus.Syllabus;
//
//public class SyllabusEntityProviderImpl extends
//AbstractEntityProvider implements CoreEntityProvider, AutoRegisterEntityProvider, RESTful{
//
//	private Log log = LogFactory.getLog(SyllabusEntityProviderImpl.class);
//	
//	public final static String ENTITY_PREFIX = "tenjin";
//	
//	private SyllabusService osyl2Service;
//	
//	public void setOsyl2Service(SyllabusService osyl2Service) {
//		this.osyl2Service = osyl2Service;
//	}
//
//	public String getEntityPrefix() {
//		return ENTITY_PREFIX;
//	}
//
//	//We only handle JSON format
//	public String[] getHandledOutputFormats() {
//		return new String[] { Formats.JSON };
//	}
//
//
//
//
//	@EntityCustomAction(action="courseId",viewKey=EntityView.VIEW_LIST)
//	public JSON getShareableSyllabus (String courseId){
//		
//		return new JSON() {
//			
//			@Override
//			public Writer write(Writer arg0) {
//				// TODO Auto-generated method stub
//				return null;
//			}
//			
//			@Override
//			public String toString(int arg0, int arg1) {
//				// TODO Auto-generated method stub
//				return null;
//			}
//			
//			@Override
//			public String toString(int arg0) {
//				// TODO Auto-generated method stub
//				return "Bienvenue tout le monde";
//			}
//			
//			@Override
//			public int size() {
//				// TODO Auto-generated method stub
//				return 0;
//			}
//			
//			@Override
//			public boolean isEmpty() {
//				// TODO Auto-generated method stub
//				return false;
//			}
//			
//			@Override
//			public boolean isArray() {
//				// TODO Auto-generated method stub
//				return true;
//			}
//		};
//	}
//	
//	public boolean entityExists(String id) {
//		
//		return false;
//	}
//
//	@Override
//	public String createEntity(EntityReference ref, Object entity,
//			Map<String, Object> params) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public Object getSampleEntity() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public void updateEntity(EntityReference ref, Object entity,
//			Map<String, Object> params) {
//		// TODO Auto-generated method stub
//		
//	}
//
//	@Override
//	public Object getEntity(EntityReference ref) {
//		final String refId = ref.getId();
//		Syllabus syllabus = null;
//		try {
//		    syllabus = osyl2Service.getShareableSyllabus(refId);
//		} catch (NoSyllabusException e) {
//		    e.printStackTrace();
//		}
//		
//		System.out.println(refId);
//		return syllabus;
//	}
//
//	
//	
//	@Override
//	public void deleteEntity(EntityReference ref, Map<String, Object> params) {
//		// TODO Auto-generated method stub
//		
//	}
//
//	@Override
//	public List<?> getEntities(EntityReference ref, Search search) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public String[] getHandledInputFormats() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//
//}
