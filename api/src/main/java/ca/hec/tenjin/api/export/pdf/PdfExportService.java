package ca.hec.tenjin.api.export.pdf;

import java.io.OutputStream;

import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

public interface PdfExportService {
	byte[] makePdf(PublishedSyllabus syllabus, OutputStream outputStream) throws PdfExportException;
}
