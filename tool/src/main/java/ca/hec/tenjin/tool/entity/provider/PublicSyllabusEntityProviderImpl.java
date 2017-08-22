package ca.hec.tenjin.tool.entity.provider;

import java.util.List;

import org.sakaiproject.entitybroker.EntityView;
import org.sakaiproject.entitybroker.entityprovider.annotations.EntityCustomAction;
import org.sakaiproject.entitybroker.entityprovider.capabilities.ActionsExecutable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.AutoRegisterEntityProvider;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Outputable;
import org.sakaiproject.entitybroker.util.AbstractEntityProvider;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.SyllabusExportService;
import ca.hec.tenjin.api.dao.SyllabusConstantsDao;
import ca.hec.tenjin.api.entity.provider.PublicSyllabusEntityProvider;
import ca.hec.tenjin.api.exception.ExportException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;
import lombok.Setter;

public class PublicSyllabusEntityProviderImpl extends AbstractEntityProvider implements PublicSyllabusEntityProvider, AutoRegisterEntityProvider, ActionsExecutable, Outputable {
	@Setter
	private SyllabusExportService syllabusExportService;

	@Setter
	private PublishService publishService;

	@Setter
	private SyllabusConstantsDao syllabusConstantsDao;

	@SuppressWarnings("unchecked")
	@EntityCustomAction(action = "public-syllabus", viewKey = EntityView.VIEW_LIST)
	public String getPublicSyllabus(EntityView view) throws NumberFormatException, NoSyllabusException, ExportException {
		String id = view.getPathSegment(2);
		String locale = view.getPathSegment(3);
		AbstractSyllabus syllabus = publishService.getPublicSyllabus(Long.parseLong(id));
		
		if(locale == null) {
			locale = "fr_CA";
		}
		
		return syllabusExportService.exportPublicHtml(syllabus, (List<Object>) (List<?>) ((PublishedSyllabus) syllabus).getElements(), locale);
	}

	@Override
	public String getEntityPrefix() {
		return "tenjin";
	}

	@Override
	public String[] getHandledOutputFormats() {
		return new String[] { HTML };
	}
}
