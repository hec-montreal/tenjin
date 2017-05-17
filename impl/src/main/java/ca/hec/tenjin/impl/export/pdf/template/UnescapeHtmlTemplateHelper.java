package ca.hec.tenjin.impl.export.pdf.template;

import java.io.IOException;

import org.apache.commons.lang.StringEscapeUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

public class UnescapeHtmlTemplateHelper implements Helper<String> {

	@Override
	public Object apply(String str, Options options) throws IOException {
		if(str == null) {
			return "";
		}
		
		String html = StringEscapeUtils.unescapeHtml(str);
		Document document = Jsoup.parseBodyFragment(html);
		
		document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
		
		String ret = document.body().html();
		
		return ret;
	}
}
