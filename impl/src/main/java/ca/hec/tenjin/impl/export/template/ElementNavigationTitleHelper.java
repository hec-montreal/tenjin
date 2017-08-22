package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.model.SyllabusElement;

public class ElementNavigationTitleHelper implements Helper<SyllabusElement> {
	@Override
	public Object apply(SyllabusElement element, Options opts) throws IOException {
		Integer index = opts.param(0);
		String type = element.call("getType");
		String ret;
		
		if(type.equals("evaluation") || type.equals("exam")) {
			ret = "" + (index + 1) + " - ";
		} else if(type.equals("lecture") || type.equals("tutorial") && element.getAttribute("numero") != null) {
			ret = element.getAttribute("numero") + " - ";
		} else {
			ret = "";
		}
		
		return ret + element.call("getTitle");
	}
}
