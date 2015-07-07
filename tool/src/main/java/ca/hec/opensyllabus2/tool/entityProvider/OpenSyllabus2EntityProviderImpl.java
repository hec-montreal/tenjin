package ca.hec.opensyllabus2.tool.entityProvider;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.entitybroker.EntityReference;
import org.sakaiproject.entitybroker.entityprovider.CoreEntityProvider;
import org.sakaiproject.entitybroker.entityprovider.capabilities.AutoRegisterEntityProvider;
import org.sakaiproject.entitybroker.entityprovider.capabilities.CollectionResolvable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Outputable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Resolvable;
import org.sakaiproject.entitybroker.entityprovider.extension.Formats;
import org.sakaiproject.entitybroker.entityprovider.search.Search;
import org.sakaiproject.entitybroker.util.AbstractEntityProvider;

import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

public class OpenSyllabus2EntityProviderImpl extends
AbstractEntityProvider implements CoreEntityProvider,
AutoRegisterEntityProvider, Resolvable, CollectionResolvable,
Outputable {

	private Log log = LogFactory.getLog(OpenSyllabus2EntityProviderImpl.class);
	
	public final static String ENTITY_PREFIX = "openSyllabus2";
	
	public String getEntityPrefix() {
		return ENTITY_PREFIX;
	}

	public String[] getHandledOutputFormats() {
		return new String[] { Formats.JSON };
	}

	
	
	public Object getEntity(EntityReference ref) {
		log.info("++++++++++++++++++++++++++++++++++++++"+ref.getReference());
		return new Syllabus();
	}

	
	public boolean entityExists(String id) {
		
		return false;
	}

	@Override
	public List<?> getEntities(EntityReference ref, Search search) {
		// TODO Auto-generated method stub
		return null;
	}

}
