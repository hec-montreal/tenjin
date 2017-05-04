package ca.hec.tenjin.api.export.pdf;

import ca.hec.tenjin.api.exception.PdfExportException;

public interface PdfSyllabusTemplateContext {
	
	Object getValue(String name);
	
	void setValue(String name, Object value);
	
	String evaluateExpression(String expression) throws PdfExportException;
}
