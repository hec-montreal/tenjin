package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;

public class AttributeTemplateHelper implements Helper<SyllabusElement> {

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		return element.getAttribute(options.param(0));
	}
}
