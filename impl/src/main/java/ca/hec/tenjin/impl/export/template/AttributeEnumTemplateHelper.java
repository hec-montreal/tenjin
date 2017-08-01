package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.dao.SyllabusConstantsDao;
import ca.hec.tenjin.api.export.model.SyllabusElement;

public class AttributeEnumTemplateHelper implements Helper<SyllabusElement> {

	private SyllabusConstantsDao syllabusConstantsDao;
	private String locale;

	public AttributeEnumTemplateHelper(SyllabusConstantsDao syllabusConstantsDao, String locale) {
		this.syllabusConstantsDao = syllabusConstantsDao;
		this.locale = locale;
	}

	@Override
	public Object apply(SyllabusElement element, Options options) throws IOException {
		String key = element.getAttribute(options.param(0));

		if (key == null) {
			return "";
		}

		String ret = syllabusConstantsDao.getEnumValue(options.param(1), key, locale);

		if (ret == null) {
			return "";
		}

		return ret;
	}
}
