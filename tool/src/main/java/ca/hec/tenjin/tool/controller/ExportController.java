package ca.hec.tenjin.tool.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import ca.hec.tenjin.api.PublishService;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfExportService;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

@Controller
@RequestMapping(value = "v1")
public class ExportController {

	@Autowired
	private PdfExportService pdfExportService;

	@Autowired
	private PublishService publishService;

	@Autowired
	private SyllabusService syllabusService;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/syllabus/{id}/pdf", method = RequestMethod.GET)
	public void exportPdf(@PathVariable("id") Long id, @RequestParam(required = false, name = "locale", defaultValue = "fr_CA") String locale, @RequestParam(required = false, name = "published", defaultValue = "false") boolean published, HttpServletResponse response) throws PdfExportException, IOException {
		try {
			AbstractSyllabus syllabus = null;
			List<Object> elements;

			if (published) {
				try {
					syllabus = publishService.getPublishedSyllabus(id);
				} catch (NoSyllabusException e) {
					response.getWriter().append("No syllabus");
					
					return;
				}

				elements = (List<Object>) (List<?>) ((PublishedSyllabus) syllabus).getElements();
			} else {
				syllabus = syllabusService.getSyllabus(id);
				elements = (List<Object>) (List<?>) ((Syllabus) syllabus).getElements();
			}

			pdfExportService.makePdf(syllabus, elements, locale, response.getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();

			throw new PdfExportException(e);
		}
	}
}
