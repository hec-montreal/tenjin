package ca.hec.tenjin.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Base64;
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
import com.github.jknack.handlebars.io.TemplateLoader;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusExportService;
import ca.hec.tenjin.api.TemplateService;
import ca.hec.tenjin.api.dao.SyllabusConstantsDao;
import ca.hec.tenjin.api.exception.ExportException;
import ca.hec.tenjin.api.export.PdfResourceLoader;
import ca.hec.tenjin.api.export.model.CourseInfo;
import ca.hec.tenjin.api.export.model.SakaiCitation;
import ca.hec.tenjin.api.export.model.SakaiResource;
import ca.hec.tenjin.api.export.model.SyllabusElement;
import ca.hec.tenjin.api.export.model.TemplateContext;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.template.TemplateStructure;
import ca.hec.tenjin.impl.export.ClasspathResourceLoader;
import ca.hec.tenjin.impl.export.template.AttributeConditionTemplateHelper;
import ca.hec.tenjin.impl.export.template.AttributeEnumTemplateHelper;
import ca.hec.tenjin.impl.export.template.DateAttributeTemplateHelper;
import ca.hec.tenjin.impl.export.template.ElementNavigationTitleHelper;
import ca.hec.tenjin.impl.export.template.IfEqTemplateHelper;
import ca.hec.tenjin.impl.export.template.StringTemplateHelper;
import ca.hec.tenjin.impl.export.template.UnescapeHtmlTemplateHelper;
import lombok.Setter;
import org.apache.log4j.Logger;

public class SyllabusExportServiceImpl implements SyllabusExportService {

	private static final Logger log = Logger.getLogger(SyllabusExportServiceImpl.class);

	@Setter
	private SakaiProxy sakaiProxy;

	@Setter
	private SyllabusConstantsDao syllabusConstantsDao;

	@Setter
	private TemplateService templateService;

	private TemplateLoader templateLoader;
	private PdfResourceLoader resourceLoader;

	public SyllabusExportServiceImpl() {
		templateLoader = new ClassPathTemplateLoader(SyllabusExportService.BASE_TEMPLATE_DIR, "");

		resourceLoader = new ClasspathResourceLoader(SyllabusExportService.BASE_TEMPLATE_DIR);
	}

	@Override
	public void exportPdf(AbstractSyllabus syllabus, List<Object> elements, boolean publicOnly, String locale, OutputStream outputStream) throws ExportException {
		String template = null;
		try {
			template = makeTemplate(makeTemplateContext(syllabus, elements, "pdf", publicOnly, locale), templateLoader);
			ITextRenderer renderer = new ITextRenderer();
			Document doc = XMLResource.load(new ByteArrayInputStream(template.getBytes(Charset.forName("utf-8")))).getDocument();

			renderer.setDocument(doc, "");
			renderer.layout();

			renderer.createPDF(outputStream);
		} catch (Exception e) {
			if (template != null) {
				log.error(template);
			}

			throw new ExportException(e);
		}
	}

	@Override
	public String exportPdfHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException {
		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements, "pdf", false, locale), templateLoader);

			return template;
		} catch (Exception e) {
			throw new ExportException(e);
		}
	}

	@Override
	public String exportPublicHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException {
		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements, "html", true, locale), templateLoader);

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
		handlebars.registerHelper("navigation-title", new ElementNavigationTitleHelper());

		try {
			Template template = handlebars.compile("syllabus.html");

			ret = template.apply(context);

			return ret;
		} catch (IOException e) {
			throw new ExportException(e);
		}
	}

	private TemplateContext makeTemplateContext(AbstractSyllabus syllabus, List<Object> elements, String mode, boolean publicOnly, String locale) throws IOException, ExportException, IdUnusedException, TypeException, PermissionException, ServerOverloadException {
		ca.hec.tenjin.api.model.template.Template syllabusTemplate = templateService.getTemplate(syllabus.getTemplateId());

		TemplateContext ret = new TemplateContext(mode);

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
			ret.getElements().add(buildElement(element, syllabusTemplate, publicOnly));
		}

		return ret;
	}

	private SyllabusElement buildElement(Object element, ca.hec.tenjin.api.model.template.Template syllabusTemplate, boolean publicOnly) throws IdUnusedException, TypeException, PermissionException, ServerOverloadException {
		SyllabusElement ret = new SyllabusElement(element);

		// If the element is composite, add children
		if (ret.<Boolean>call("isComposite")) {
			List<Object> children = ret.<List<Object>>call("getElements");

			for (Object child : children) {
				ret.getChildren().add(buildElement(child, syllabusTemplate, publicOnly));
			}
		}

		TemplateStructure struct = syllabusTemplate.findElementById(ret.call("getTemplateStructureId"));

		// provided elements have no template structure
		if (struct != null) {
			ret.setDisplayInMenu(struct.getDisplayInMenu());
		} else {
			ret.setDisplayInMenu(false);
		}

		String type = ret.call("getType");

		if (type.equals("image")) {
			prepareImageElement(ret, publicOnly);
		} else if (type.equals("document")) {
			prepareDocumentElement(ret, publicOnly);
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

	private void prepareImageElement(SyllabusElement e, boolean publicOnly) throws ServerOverloadException {
		String resourceId = e.getAttribute("imageId");
		ContentResource res = sakaiProxy.getResource(resourceId);

		if (res == null) {
			return;
		}

		if (publicOnly) {
			if(!sakaiProxy.isResourcePublic(res)) {
				return;
			}
		}
		
		e.setResource(new SakaiResource());

		byte[] data = res.getContent();

		e.getResource().setBytesB64(Base64.getEncoder().encodeToString(data));
		e.getResource().setContentType(res.getProperties().getProperty(ResourceProperties.PROP_CONTENT_TYPE));
	}

	private void prepareDocumentElement(SyllabusElement e, boolean publicOnly) {
		String resourceId = e.getAttribute("documentId");
		ContentResource res = sakaiProxy.getResource(resourceId);

		if (res == null) {
			return;
		}

		if (publicOnly) {
			if(!sakaiProxy.isResourcePublic(res)) {
				return;
			}
		}

		e.setResource(new SakaiResource());
		e.getResource().setTitle(res.getProperties().getProperty(ResourceProperties.PROP_DISPLAY_NAME));
		e.getResource().setUrl(res.getUrl());
	}

	private void prepareCitationElement(SyllabusElement e) throws ServerOverloadException {
		String citationId = e.getAttribute("citationId");
		String citationListId = findCitationListId(citationId);
		
		citationId = citationId.substring(citationId.lastIndexOf("/") + 1);

		SakaiCitation citation = sakaiProxy.getCitation(citationListId, citationId);

		if (citation == null) {
			return;
		}

		e.setCitation(citation);
	}

	private String findCitationListId(String citationId) {
		return citationId.substring(0, citationId.lastIndexOf("/"));
	}
}
