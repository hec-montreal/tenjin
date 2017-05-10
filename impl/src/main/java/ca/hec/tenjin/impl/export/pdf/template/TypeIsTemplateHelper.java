package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;

public class TypeIsTemplateHelper implements Helper<SyllabusElement> {
	
	private boolean published;
	
	public TypeIsTemplateHelper(boolean published) {
		this.published = published;
	}
	
	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String type;

		if (published) {
			type = ((AbstractPublishedSyllabusElement) element.getElement()).getType();
		} else {
			type = ((AbstractSyllabusElement) element.getElement()).getType();
		}

		if (type.equals(options.param(0))) {
			return options.fn();
		} else {
			return options.inverse();
		}
	}
}
