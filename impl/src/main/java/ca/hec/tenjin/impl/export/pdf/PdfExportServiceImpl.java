package ca.hec.tenjin.impl.export.pdf;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;

import org.apache.commons.io.IOUtils;
import org.w3c.dom.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.resource.XMLResource;

import com.lowagie.text.DocumentException;

import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfExportService;
import ca.hec.tenjin.api.export.pdf.PdfSyllabusTemplate;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

public class PdfExportServiceImpl implements PdfExportService {

	@Override
	public byte[] makePdf(PublishedSyllabus syllabus, OutputStream outputStream) throws PdfExportException {
		ITextRenderer renderer = new ITextRenderer();

		PdfSyllabusTemplate template;

		try {
			template = new PdfSyllabusTemplateImpl(loadTemplateStream("/syllabus.html"), loadTemplateStream("/css/style.css"));
		} catch (IOException e) {
			throw new PdfExportException(e);
		}

		template.getContext().setValue("syllabus", syllabus);

		Document doc = XMLResource.load(new ByteArrayInputStream(template.renderTemplate().getBytes(Charset.forName("UTF-8")))).getDocument();

		renderer.setDocument(doc, "www.hec.ca");
		renderer.layout();

		try {
			renderer.createPDF(outputStream);
		} catch (DocumentException e) {
			throw new PdfExportException(e);
		}

		return null;
	}

	private String loadTemplateStream(String templateName) throws IOException {
		return IOUtils.toString(getClass().getResourceAsStream(PdfExportService.BASE_TEMPLATE_DIR + templateName), "UTF-8");
	}
}
