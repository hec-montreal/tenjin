package ca.hec.tenjin.impl.export.pdf;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Base64;
import java.util.Collection;
import java.util.List;

import org.sakaiproject.content.api.ContentResource;
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
import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfExportService;
import ca.hec.tenjin.api.export.pdf.PdfResourceLoader;
import ca.hec.tenjin.api.export.pdf.model.CourseInfo;
import ca.hec.tenjin.api.export.pdf.model.SakaiCitation;
import ca.hec.tenjin.api.export.pdf.model.SakaiResource;
import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;
import ca.hec.tenjin.api.export.pdf.model.TemplateContext;
import ca.hec.tenjin.api.model.data.EntityContent;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.provider.TenjinDataProvider;
import ca.hec.tenjin.impl.export.pdf.template.AttributeConditionTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.AttributeEnumTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.DateAttributeTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.IfEqTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.StringTemplateHelper;
import ca.hec.tenjin.impl.export.pdf.template.UnescapeHtmlTemplateHelper;
import lombok.Setter;

public class PdfExportServiceImpl implements PdfExportService {

	@Setter
	private SakaiProxy sakaiProxy;

	@Setter
	private TenjinDataProvider tenjinDataProvider;

	private TemplateLoader templateLoader;
	private PdfResourceLoader resourceLoader;

	@Override
	public void makePdf(AbstractSyllabus syllabus, List<Object> elements, String locale, OutputStream outputStream) throws PdfExportException {
		// Loaders
		templateLoader = new ClassPathTemplateLoader(PdfExportServiceImpl.BASE_TEMPLATE_DIR, "");
		resourceLoader = new ClasspathPdfResourceLoader(PdfExportServiceImpl.BASE_TEMPLATE_DIR);

		try {
			String template = makeTemplate(makeTemplateContext(syllabus, elements, locale));
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
		handlebars.registerHelper("if-eq", new IfEqTemplateHelper());
		handlebars.registerHelper("html", new UnescapeHtmlTemplateHelper());
		handlebars.registerHelper("str", new StringTemplateHelper(tenjinDataProvider, context.getLocale()));
		handlebars.registerHelper("attr-cond", new AttributeConditionTemplateHelper());
		handlebars.registerHelper("attr-date", new DateAttributeTemplateHelper());
		handlebars.registerHelper("attr-enum", new AttributeEnumTemplateHelper(tenjinDataProvider, context.getLocale()));
		
		try {
			Template template = handlebars.compile("syllabus.html");

			ret = template.apply(context);

			return ret;
		} catch (IOException e) {
			throw new PdfExportException(e);
		}
	}

	private TemplateContext makeTemplateContext(AbstractSyllabus syllabus, List<Object> elements, String locale) throws IOException, PdfExportException, IdUnusedException, TypeException, PermissionException, ServerOverloadException {
		List<EntityContent> resources = sakaiProxy.getSiteResources(sakaiProxy.getCurrentSiteId(), null, null, null);
		List<SakaiCitation> citations = sakaiProxy.getSiteCitations(sakaiProxy.getCurrentSiteId(), resources);

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
			throw new PdfExportException(e);
		}

		for (Object element : elements) {
			ret.getElements().add(buildElement(element, resources, citations));
		}

		return ret;
	}

	private SyllabusElement buildElement(Object element, List<EntityContent> resources, List<SakaiCitation> citations) throws IdUnusedException, TypeException, PermissionException, ServerOverloadException {
		SyllabusElement ret = new SyllabusElement(element);

		// If the element is composite, add children
		
		if (ret.<Boolean>call("isComposite")) {
			List<Object> children = ret.<List<Object>>call("getElements");

			for (Object child : children) {
				ret.getChildren().add(buildElement(child, resources, citations));
			}
		}

		String type = ret.call("getType");

		if (type.equals("image")) {
			prepareImageElement(ret, resources);
		} else if(type.equals("document")) {
			prepareDocumentElement(ret, resources);
		} else if (type.equals("citation")) {
			prepareCitationElement(ret, citations);
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

	private EntityContent findResource(Collection<EntityContent> resources, String id) {
		for (EntityContent content : resources) {

			if (content.getResourceId().startsWith(id)) {
				return content;
			}

			EntityContent child = findResource(content.getResourceChildren(), id);

			if (child != null) {
				return child;
			}
		}

		return null;
	}

	private SakaiCitation findCitation(Collection<SakaiCitation> citations, String id) {
		for(SakaiCitation citation : citations) {
			if(citation.getCitation().getId().equals(id)) {
				return citation;
			}
		}
		
		return null;
	}
	
	private void prepareImageElement(SyllabusElement e, List<EntityContent> resources) throws ServerOverloadException {
		String resourceId = e.getAttribute("imageId");
		EntityContent res = findResource(resources, resourceId);

		e.setResource(new SakaiResource(res));

		byte[] data = ((ContentResource) res.getOriginalEntity()).getContent();

		e.getResource().setBytesB64(Base64.getEncoder().encodeToString(data));
		e.getResource().setContentType(res.getMimeType());
	}
	
	private void prepareDocumentElement(SyllabusElement e, List<EntityContent> resources) {
		String resourceId = e.getAttribute("documentId");
		EntityContent res = findResource(resources, resourceId);
		
		e.setResource(new SakaiResource(res));
	}
	
	private void prepareCitationElement(SyllabusElement e, List<SakaiCitation> citations) {
		String citationId = e.getAttribute("citationId");
		
		citationId = citationId.substring(citationId.lastIndexOf("/") + 1);
	
		e.setCitation(findCitation(citations, citationId));
	}
}
