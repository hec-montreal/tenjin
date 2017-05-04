package ca.hec.tenjin.impl.export.pdf;

import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfSyllabusTemplate;
import ca.hec.tenjin.api.export.pdf.PdfSyllabusTemplateContext;

public class PdfSyllabusTemplateImpl implements PdfSyllabusTemplate {

	private PdfSyllabusTemplateContext context;
	private String template;
	private String css;

	public PdfSyllabusTemplateImpl(String raw, String css) {
		this.template = raw;
		
		this.css = css;

		this.context = new PdfSyllabusTemplateContextImpl();
	}

	@Override
	public String getTemplate() {
		return template;
	}

	@Override
	public String renderTemplate() throws PdfExportException {
		StringBuffer buff = new StringBuffer();

		// Parsing
		boolean inExpr = false;
		String expr = "";

		for (int i = 0; i < template.length(); i++) {
			char c = template.charAt(i);

			if (inExpr && c != '}') {
				expr += c;
			} else {
				switch (c) {
				case '{':
					inExpr = true;

					break;

				case '}':
					inExpr = false;

					buff.append(context.evaluateExpression(expr));

					expr = "";

					break;

				default:
					buff.append(c);

					break;
				}
			}
		}

		return buff.toString().replace("@css", css);
	}

	@Override
	public PdfSyllabusTemplateContext getContext() {
		return context;
	}
}
