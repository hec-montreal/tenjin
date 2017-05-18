package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.provider.TenjinDataProvider;

public class StringTemplateHelper implements Helper<String> {

	private TenjinDataProvider tenjinDataProvider;
	private String locale;
	
	public StringTemplateHelper(TenjinDataProvider tenjinDataProvider, String locale) {
		this.tenjinDataProvider = tenjinDataProvider;
		this.locale = locale;
	}
	
	@Override
	public Object apply(String key, Options args) throws IOException {
		return tenjinDataProvider.getInterfaceString(key, locale);
	}
}
