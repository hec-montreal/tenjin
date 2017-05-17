package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;

public class TypeIsTemplateHelper implements Helper<SyllabusElement> {

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String type = element.call("getType");

		if (type.equals(options.param(0))) {
			return options.fn();
		} else {
			return options.inverse();
		}
	}
}
