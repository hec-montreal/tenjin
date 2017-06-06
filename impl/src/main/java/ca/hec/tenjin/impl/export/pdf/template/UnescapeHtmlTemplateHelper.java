package ca.hec.tenjin.impl.export.pdf.template;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.Charset;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

public class UnescapeHtmlTemplateHelper implements Helper<String> {

	@Override
	public Object apply(String str, Options options) throws IOException {
		if (str == null) {
			return "";
		}

		Document document = Jsoup.parseBodyFragment(str);

		document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);

		String ret = document.body().html();
		
		try {
			validateXml(ret);
			
			return sanitize(ret);
		} catch (Exception e) {
			return "<div class=\"element-error\">" + document.body().text()+ "</div>";
		}
	}

	private void validateXml(String xml) throws Exception {
		try {
			String temp = "<root>" + xml + "</root>";

			temp = temp.replaceAll("&.*;", "__ENTITY__");

			DocumentBuilder parser = DocumentBuilderFactory.newInstance().newDocumentBuilder();
			parser.parse(new ByteArrayInputStream(temp.getBytes(Charset.forName("utf-8"))));
		} catch (Exception e) {
			throw e;
		}
	}
	
	private String sanitize(String xml) {
		//Remove MS crap (<o:p>wefwef</o:p>)
		xml = xml.replaceAll("<[^:]:[^>]>.*<\\/[^:]:[^:]>", "");
		
		return xml;
	}
}
