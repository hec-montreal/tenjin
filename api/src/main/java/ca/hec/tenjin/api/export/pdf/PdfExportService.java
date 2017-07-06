package ca.hec.tenjin.api.export.pdf;

import java.io.OutputStream;
import java.util.List;

import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;

/**
 * Service for exporting a published syllabus as PDF
 */
public interface PdfExportService {

	// Base directory for the pdf html / css templates (in classpath)
	public static final String BASE_TEMPLATE_DIR = "/ca/hec/tenjin/templates/pdf";

	/**
	 * Construct a pdf with the specified syllabus
	 *
	 * @throws PdfExportException
	 */
	void makePdf(AbstractSyllabus syllabus, List<Object> elements, String locale, OutputStream outputStream) throws PdfExportException;

	String makePdfHtml(AbstractSyllabus syllabus, List<Object> elements, String locale, OutputStream outputStream) throws PdfExportException;
}