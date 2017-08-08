package ca.hec.tenjin.api;

import java.io.OutputStream;
import java.util.List;

import ca.hec.tenjin.api.exception.ExportException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;

/**
 * Service for exporting a syllabus in different formats
 */
public interface SyllabusExportService {

	// Base directory for the pdf html / css templates (in classpath)
	public static final String BASE_TEMPLATE_DIR = "/ca/hec/tenjin/templates/export";

	/**
	 * Construct a pdf with the specified syllabus
	 */
	void exportPdf(AbstractSyllabus syllabus, List<Object> elements, boolean publicOnly, String locale, OutputStream outputStream) throws ExportException;

	/**
	 * Only produce the html markup for a pdf
	 */
	String exportPdfHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException;
	
	/**
	 * Produce a html version of a public syllabus
	 */
	String exportPublicHtml(AbstractSyllabus syllabus, List<Object> elements, String locale) throws ExportException;
}
