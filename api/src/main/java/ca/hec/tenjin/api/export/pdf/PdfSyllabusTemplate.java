package ca.hec.tenjin.api.export.pdf;

import ca.hec.tenjin.api.exception.PdfExportException;

public interface PdfSyllabusTemplate {
	
	String getTemplate();
	
	String renderTemplate() throws PdfExportException;
	
	PdfSyllabusTemplateContext getContext();
}
