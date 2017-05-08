package ca.hec.tenjin.impl.export.pdf;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;

import org.w3c.dom.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.resource.XMLResource;

import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Template;
import com.github.jknack.handlebars.io.ClassPathTemplateLoader;
import com.github.jknack.handlebars.io.TemplateLoader;
import com.lowagie.text.DocumentException;

import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfExportService;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

public class PdfExportServiceImpl implements PdfExportService {

	public class TemplateContext
	{
		private PublishedSyllabus syllabus;
		
		public TemplateContext(PublishedSyllabus syllabus) {
			this.syllabus = syllabus;
		}
		
		public PublishedSyllabus getSyllabus() {
			return this.syllabus;
		}
	}
	
	@Override
	public byte[] makePdf(PublishedSyllabus syllabus, OutputStream outputStream) throws PdfExportException {		
		// Pdf
		ITextRenderer renderer = new ITextRenderer();
		Document doc = XMLResource.load(new ByteArrayInputStream(makeTemplate(new TemplateContext(syllabus)).getBytes(Charset.forName("utf-8")))).getDocument();

		renderer.setDocument(doc, "https://www.hec.ca");
		renderer.layout();

		try {
			renderer.createPDF(outputStream);
		} catch (DocumentException e) {
			throw new PdfExportException(e);
		}

		return null;
	}
	
	private String makeTemplate(TemplateContext context) throws PdfExportException {
		String ret;
		
		TemplateLoader loader = new ClassPathTemplateLoader(PdfExportServiceImpl.BASE_TEMPLATE_DIR, "");
		Handlebars handlebars = new Handlebars(loader);

		try {
			Template template = handlebars.compile("syllabus.html");
			
			ret = template.apply(context);
			
			return ret;
		} catch (IOException e) {
			throw new PdfExportException(e);
		}	
	}
}
