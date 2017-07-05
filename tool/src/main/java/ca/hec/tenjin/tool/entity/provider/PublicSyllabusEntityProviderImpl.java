package ca.hec.tenjin.tool.entity.provider;

import org.sakaiproject.entitybroker.entityprovider.annotations.EntityCustomAction;
import org.sakaiproject.entitybroker.util.AbstractEntityProvider;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.entity.provider.PublicSyllabusEntityProvider;
import ca.hec.tenjin.api.export.pdf.PdfExportService;
import ca.hec.tenjin.api.provider.TenjinDataProvider;
import lombok.Setter;

public class PublicSyllabusEntityProviderImpl extends AbstractEntityProvider implements PublicSyllabusEntityProvider {
	@Setter
	private PdfExportService pdfExportService;
	
	@Setter
	private PublishService publishService;
	
	@Setter
	private SyllabusService syllabusService;
	
	@Setter
	private TenjinDataProvider tenjinDataProvider;
	
	@EntityCustomAction(action = "test-provider", viewKey = "test")
	public String testProvider() {
		return "Hello world";
	}

	@Override
	public String getEntityPrefix() {
		return "public-syllabus";
	}
}
