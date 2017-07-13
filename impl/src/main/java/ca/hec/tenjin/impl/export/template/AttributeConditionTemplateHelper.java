package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.model.SyllabusElement;
import ca.hec.tenjin.impl.util.TypeUtils;

public class AttributeConditionTemplateHelper implements Helper<SyllabusElement> {

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String condition = options.param(0);

		Boolean a = TypeUtils.safeBool(element.getAttribute(options.param(1)));
		Boolean b = TypeUtils.safeBool(element.getAttribute(options.param(2)));

		if (condition.equals("or")) {
			return a || b ? options.fn() : options.inverse();
		} else if (condition.equals("and")) {
			return a && b ? options.fn() : options.inverse();
		}

		return options.inverse();
	}
}
