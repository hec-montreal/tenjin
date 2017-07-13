package ca.hec.tenjin.api;

import java.io.OutputStream;
import java.util.List;

import ca.hec.tenjin.api.exception.ExportException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;

/**
 * Service for exporting a published syllabus as PDF
 */
public interface ExportService {

	// Base directory for the pdf html / css templates (in classpath)
	public static final String BASE_PDF_TEMPLATE_DIR = "/ca/hec/tenjin/templates/pdf";
	public static final String BASE_PUBLIC_HTML_TEMPLATE_DIR = "/ca/hec/tenjin/templates/public-html";

	/**
	 * Construct a pdf with the specified syllabus
	 */
	void exportPdf(AbstractSyllabus syllabus, List<Object> elements, String locale, OutputStream outputStream) throws ExportException;

	/**
	 * Only produce the html markup for a pdf
	 */
	String exportPdfHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException;
	
	/**
	 * Produce a html version of a public syllabus
	 * @throws ExportException 
	 */
	String exportPublicHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException;
}
