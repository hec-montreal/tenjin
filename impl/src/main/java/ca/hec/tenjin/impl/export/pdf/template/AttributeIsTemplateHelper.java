package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;

public class AttributeIsTemplateHelper implements Helper<SyllabusElement> {

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String attribute = element.getAttribute(options.param(0));
		
		if(attribute == null) {
			return false;
		}
		
		return attribute.equals(options.param(1)) ? options.fn() : options.inverse();
	}
}
