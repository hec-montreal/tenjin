package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;
import ca.hec.tenjin.impl.util.TypeUtils;

public class AttributeIfTemplateHelper implements Helper<SyllabusElement> {

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String attribute = element.getAttribute(options.param(0));

		if (attribute == null) {
			return options.inverse();
		}

		// If the attribute is not a boolean but exists, return true
		if (!attribute.toLowerCase().equals("true") && !attribute.toLowerCase().equals("false")) {
			return options.fn();
		}

		Boolean a = TypeUtils.safeBool(attribute);

		return a ? options.fn() : options.inverse();
	}
}
