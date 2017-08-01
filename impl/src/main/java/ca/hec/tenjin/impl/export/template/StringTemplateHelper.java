package ca.hec.tenjin.impl.export.template;

import java.io.IOException;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import ca.hec.tenjin.api.dao.SyllabusConstantsDao;

public class StringTemplateHelper implements Helper<String> {

	private SyllabusConstantsDao syllabusConstantsDao;
	private String locale;
	
	public StringTemplateHelper(SyllabusConstantsDao syllabusConstantsDao, String locale) {
		this.syllabusConstantsDao = syllabusConstantsDao;
		this.locale = locale;
	}
	
	@Override
	public Object apply(String key, Options args) throws IOException {
		return syllabusConstantsDao.getInterfaceString(key, locale);
	}
}
