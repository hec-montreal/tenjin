package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

public class IfEqTemplateHelper implements Helper<Object> {

	@Override
	public Object apply(Object obj, Options opts) throws IOException {
		return (obj != null && obj.equals(opts.param(0))) ? opts.fn() : opts.inverse();
	}
}
