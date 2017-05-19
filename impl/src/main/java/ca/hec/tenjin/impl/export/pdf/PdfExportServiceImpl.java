package ca.hec.tenjin.impl.export.pdf;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.w3c.dom.Document;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.resource.XMLResource;

import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Template;
import com.github.jknack.handlebars.io.ClassPathTemplateLoader;
import com.github.jknack.handlebars.io.FileTemplateLoader;
import com.github.jknack.handlebars.io.TemplateLoader;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfExportService;
import ca.hec.tenjin.api.export.pdf.PdfResourceLoader;
import ca.hec.tenjin.api.export.pdf.model.CourseInfo;
import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;
import ca.hec.tenjin.api.export.pdf.model.TemplateContext;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.provider.TenjinDataProvider;
import ca.hec.tenjin.impl.export.pdf.template.AttributeConditionTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.AttributeIfTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.AttributeIsTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.AttributeTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.DateAttributeTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.StringTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.TypeIsTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.UnescapeHtmlTemplateHelper;
import lombok.Setter;

public class PdfExportServiceImpl implements PdfExportService {

	// Speed up testing (no need to redeploy to test html files)
	final boolean _TO_REMOVE________DEBUG_MODE = true;

	@Setter
	private SakaiProxy sakaiProxy;

	@Setter
	private TenjinDataProvider tenjinDataProvider;

	private TemplateLoader templateLoader;
	private PdfResourceLoader resourceLoader;

	@Override
	public void makePdf(AbstractSyllabus syllabus, List<Object> elements, OutputStream outputStream) throws PdfExportException {
		// Loaders
		if (_TO_REMOVE________DEBUG_MODE) {
			templateLoader = new FileTemplateLoader("C:/Dev/Projects/workspace/zc2/sakai_tenjin/sakai/tenjin/impl/src/main/resources/ca/hec/tenjin/templates/pdf", "");
			resourceLoader = new FilePdfResourceLoader("C:/Dev/Projects/workspace/zc2/sakai_tenjin/sakai/tenjin/impl/src/main/resources/ca/hec/tenjin/templates/pdf");
		} else {
			templateLoader = new ClassPathTemplateLoader(PdfExportServiceImpl.BASE_TEMPLATE_DIR, "");
			resourceLoader = new ClasspathPdfResourceLoader(PdfExportServiceImpl.BASE_TEMPLATE_DIR);
		}

		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements));
			ITextRenderer renderer = new ITextRenderer();
			Document doc = XMLResource.load(new ByteArrayInputStream(template.getBytes(Charset.forName("utf-8")))).getDocument();

			renderer.setDocument(doc, "");
			renderer.layout();

			renderer.createPDF(outputStream);
		} catch (Exception e) {
			throw new PdfExportException(e);
		}
	}

	private String makeTemplate(TemplateContext context) throws PdfExportException {
		String ret;
		Handlebars handlebars = new Handlebars(templateLoader);

		// Allow partial self include
		handlebars.infiniteLoops(true);

		// Template helpers
		handlebars.registerHelper("type-is", new TypeIsTemplateHelper());
		handlebars.registerHelper("html", new UnescapeHtmlTemplateHelper());
		handlebars.registerHelper("attr", new AttributeTemplateHelper());
		handlebars.registerHelper("str", new StringTemplateHelper(tenjinDataProvider, "fr_CA"));
		handlebars.registerHelper("attr-exists", new AttributeIfTemplateHelper());
		handlebars.registerHelper("attr-is", new AttributeIsTemplateHelper());
		handlebars.registerHelper("attr-cond", new AttributeConditionTemplateHelper());
		handlebars.registerHelper("attr-date", new DateAttributeTemplateHelper());

		try {
			Template template = handlebars.compile("syllabus.html");

			ret = template.apply(context);

			if (_TO_REMOVE________DEBUG_MODE) {
				FileUtils.write(new File("c:/out.html"), ret, Charset.forName("utf-8"));
			}

			return ret;
		} catch (IOException e) {
			throw new PdfExportException(e);
		}
	}

	private TemplateContext makeTemplateContext(AbstractSyllabus syllabus, List<Object> elements) throws IOException, PdfExportException {
		TemplateContext ret = new TemplateContext();

		ret.setSyllabus(syllabus);
		ret.setLogo(resourceLoader.loadImage("images/logo.png"));

		try {
			CourseInfo courseInfo = new CourseInfo();
			Site course = sakaiProxy.getSite(syllabus.getSiteId());

			courseInfo.setNumber(course.getId());
			courseInfo.setTitle(safeCourseProp(course, "title", ""));
			courseInfo.setTerm(safeCourseProp(course, "term", ""));
			courseInfo.setSections(makeSectionString(syllabus, course));

			ret.setCourseInfo(courseInfo);
		} catch (IdUnusedException e) {
			throw new PdfExportException(e);
		}

		for (Object element : elements) {
			ret.getElements().add(buildElement(element));
		}

		return ret;
	}

	private SyllabusElement buildElement(Object element) {
		SyllabusElement ret = new SyllabusElement(element);

		// If the element is composite, add children
		if (ret.<Boolean>call("isComposite")) {
			List<Object> children = ret.<List<Object>>call("getElements");

			for (Object child : children) {
				ret.getChildren().add(buildElement(child));
			}
		}

		String type = ret.call("getType");

		// If the element is a citation, we must fetch it
		if (type.equals("citation")) {
			String citationId = ret.getAttribute("citationId");
		}

		return ret;
	}

	private String safeCourseProp(Site course, String name, String def) {
		Object prop = course.getProperties().get(name);

		if (prop == null) {
			return def;
		}

		String ret = prop.toString();

		if (ret == null || ret.length() == 0) {
			return def;
		}

		return ret;
	}

	private String makeSectionString(AbstractSyllabus syllabus, Site course) {
		if (syllabus.getSections().size() == 0) {
			return "";
		}

		StringBuffer ret = new StringBuffer();

		for (String section : syllabus.getSections()) {
			Group group = course.getGroup(section);

			if (group != null) {
				ret.append(group.getTitle() + ", ");
			}
		}

		return ret.substring(0, ret.length() - 2);
	}
}
