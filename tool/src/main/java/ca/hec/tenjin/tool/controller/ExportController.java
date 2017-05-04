package ca.hec.tenjin.tool.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfExportService;

@Controller
@RequestMapping(value = "v1")
public class ExportController {

	@Autowired
	PdfExportService pdfExportService;
	
	@Autowired
	PublishService publishService;
	
	@RequestMapping(value = "/syllabus/{id}/pdf", method = RequestMethod.GET)
	public @ResponseBody byte[] exportPdf(@PathVariable("id") Long id, HttpServletResponse response) throws PdfExportException, IOException {
		try {
			return pdfExportService.makePdf(publishService.getPublishedSyllabus(id), response.getOutputStream());
		} catch (NoSyllabusException e) {
			throw new PdfExportException(e);
		}
	}
}
