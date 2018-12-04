package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

public class EvaluationNumberingHelper implements Helper<Object> {
	private int evalNumber = 1;
	
	@Override
	public Object apply(Object o, Options opts) throws IOException {
		return evalNumber++;
	}
}
