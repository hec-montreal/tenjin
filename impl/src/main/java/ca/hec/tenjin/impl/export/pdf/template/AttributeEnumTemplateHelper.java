package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.export.pdf.model.SyllabusElement;
import ca.hec.tenjin.api.provider.TenjinDataProvider;

public class AttributeEnumTemplateHelper implements Helper<SyllabusElement> {

	private TenjinDataProvider dataProvider;
	private String locale;

	public AttributeEnumTemplateHelper(TenjinDataProvider dataProvider, String locale) {
		this.dataProvider = dataProvider;
		this.locale = locale;
	}

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String key = element.getAttribute(options.param(0));

		if (key == null) {
			return "";
		}

		String ret = dataProvider.getEnumValue(options.param(1), key, locale);

		if (ret == null) {
			return "";
		}

		return ret;
	}
}
