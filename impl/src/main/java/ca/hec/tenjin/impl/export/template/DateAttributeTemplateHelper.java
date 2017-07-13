package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.model.SyllabusElement;

public class DateAttributeTemplateHelper implements Helper<SyllabusElement> {

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String sDate = element.getAttribute(options.param(0));
		
		if(sDate == null || sDate.length() == 0) {
			return "";
		}
		
		return sDate.substring(0, sDate.indexOf("T"));
	}
}
