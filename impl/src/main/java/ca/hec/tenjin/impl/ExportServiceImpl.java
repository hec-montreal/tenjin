package ca.hec.tenjin.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Base64;
import java.util.Collection;
import java.util.List;

import org.sakaiproject.content.api.ContentResource;
import org.sakaiproject.entity.api.ResourceProperties;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.ServerOverloadException;
import org.sakaiproject.exception.TypeException;
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

import ca.hec.tenjin.api.ExportService;
import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.dao.SyllabusConstantsDao;
import ca.hec.tenjin.api.exception.ExportException;
import ca.hec.tenjin.api.export.PdfResourceLoader;
import ca.hec.tenjin.api.export.model.CourseInfo;
import ca.hec.tenjin.api.export.model.SakaiCitation;
import ca.hec.tenjin.api.export.model.SakaiResource;
import ca.hec.tenjin.api.export.model.SyllabusElement;
import ca.hec.tenjin.api.export.model.TemplateContext;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.impl.export.ClasspathResourceLoader;
import ca.hec.tenjin.impl.export.template.AttributeConditionTemplateHelper;
import ca.hec.tenjin.impl.export.template.AttributeEnumTemplateHelper;
import ca.hec.tenjin.impl.export.template.DateAttributeTemplateHelper;
import ca.hec.tenjin.impl.export.template.IfEqTemplateHelper;
import ca.hec.tenjin.impl.export.template.StringTemplateHelper;
import ca.hec.tenjin.impl.export.template.UnescapeHtmlTemplateHelper;
import lombok.Setter;

public class ExportServiceImpl implements ExportService {

	@Setter
	private SakaiProxy sakaiProxy;

	@Setter
	private SyllabusConstantsDao syllabusConstantsDao;

	private TemplateLoader pdfTemplateLoader;
	private TemplateLoader publicHtmlTemplateLoader;
	private PdfResourceLoader resourceLoader;

	public ExportServiceImpl() {
		pdfTemplateLoader = new ClassPathTemplateLoader(ExportService.BASE_PDF_TEMPLATE_DIR, "");
		
		// publicHtmlTemplateLoader = new ClassPathTemplateLoader(ExportService.BASE_PUBLIC_HTML_TEMPLATE_DIR, "");
		publicHtmlTemplateLoader = new FileTemplateLoader("C:/Dev/Projects/workspace/zc2/sakai_tenjin/sakai/tenjin/impl/src/main/resources/ca/hec/tenjin/templates/public-html", "");
		
		resourceLoader = new ClasspathResourceLoader(ExportService.BASE_PDF_TEMPLATE_DIR);
	}
	
	@Override
	public void exportPdf(AbstractSyllabus syllabus, List<Object> elements, String locale, OutputStream outputStream) throws ExportException {
		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements, locale), pdfTemplateLoader);
			ITextRenderer renderer = new ITextRenderer();
			Document doc = XMLResource.load(new ByteArrayInputStream(template.getBytes(Charset.forName("utf-8")))).getDocument();

			renderer.setDocument(doc, "");
			renderer.layout();

			renderer.createPDF(outputStream);
		} catch (Exception e) {
			throw new ExportException(e);
		}
	}

	@Override
	public String exportPdfHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException {
		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements, locale), pdfTemplateLoader);
			
			return template;
		} catch (Exception e) {
			throw new ExportException(e);
		}
	}

	@Override
	public String exportPublicHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException {
		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements, locale), publicHtmlTemplateLoader);
			
			return template;
		} catch (Exception e) {
			throw new ExportException(e);
		}
	}
	
	private String makeTemplate(TemplateContext context, TemplateLoader templateLoader) throws ExportException {
		String ret;
		Handlebars handlebars = new Handlebars(templateLoader);

		// Allow partial self include
		handlebars.infiniteLoops(true);

		// Template helpers
		handlebars.registerHelper("if-eq", new IfEqTemplateHelper());
		handlebars.registerHelper("html", new UnescapeHtmlTemplateHelper());
		handlebars.registerHelper("str", new StringTemplateHelper(syllabusConstantsDao, context.getLocale()));
		handlebars.registerHelper("attr-cond", new AttributeConditionTemplateHelper());
		handlebars.registerHelper("attr-date", new DateAttributeTemplateHelper());
		handlebars.registerHelper("attr-enum", new AttributeEnumTemplateHelper(syllabusConstantsDao, context.getLocale()));

		try {
			Template template = handlebars.compile("syllabus.html");

			ret = template.apply(context);

			return ret;
		} catch (IOException e) {
			throw new ExportException(e);
		}
	}

	private TemplateContext makeTemplateContext(AbstractSyllabus syllabus, List<Object> elements, String locale) throws IOException, ExportException, IdUnusedException, TypeException, PermissionException, ServerOverloadException {
		TemplateContext ret = new TemplateContext();

		ret.setSyllabus(syllabus);
		ret.setLocale(locale);
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
			throw new ExportException(e);
		}

		for (Object element : elements) {
			ret.getElements().add(buildElement(element));
		}

		return ret;
	}

	private SyllabusElement buildElement(Object element) throws IdUnusedException, TypeException, PermissionException, ServerOverloadException {
		SyllabusElement ret = new SyllabusElement(element);
		
		// If the element is composite, add children
		if (ret.<Boolean>call("isComposite")) {
			List<Object> children = ret.<List<Object>>call("getElements");

			for (Object child : children) {
				ret.getChildren().add(buildElement(child));
			}
		}

		String type = ret.call("getType");

		if (type.equals("image")) {
			prepareImageElement(ret);
		} else if (type.equals("document")) {
			prepareDocumentElement(ret);
		} else if (type.equals("citation")) {
			prepareCitationElement(ret);
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

	private SakaiCitation findCitation(Collection<SakaiCitation> citations, String id) {
		for (SakaiCitation citation : citations) {
			if (citation.getCitation().getId().equals(id)) {
				return citation;
			}
		}

		return null;
	}

	private void prepareImageElement(SyllabusElement e) throws ServerOverloadException {
		String resourceId = e.getAttribute("imageId");
		ContentResource res = sakaiProxy.getResource(resourceId);
		
		if (res == null) {
			return;
		}

		e.setResource(new SakaiResource());

		byte[] data = res.getContent();

		e.getResource().setBytesB64(Base64.getEncoder().encodeToString(data));
		e.getResource().setContentType(res.getProperties().getProperty(ResourceProperties.PROP_CONTENT_TYPE));
	}

	private void prepareDocumentElement(SyllabusElement e) {
		String resourceId = e.getAttribute("documentId");
		ContentResource res = sakaiProxy.getResource(resourceId);

		if(res == null) {
			return;
		}
		
		e.setResource(new SakaiResource());
		e.getResource().setTitle(res.getProperties().getProperty(ResourceProperties.PROP_DISPLAY_NAME));
		e.getResource().setUrl(res.getUrl());
	}

	private void prepareCitationElement(SyllabusElement e) {
		String citationId = e.getAttribute("citationId");
		ContentResource res = sakaiProxy.getResource(citationId);

		if(res == null) {
			return;
		}
		
		/*citationId = citationId.substring(citationId.lastIndexOf("/") + 1);

		e.setCitation(findCitation(citations, citationId));*/
	}
}
