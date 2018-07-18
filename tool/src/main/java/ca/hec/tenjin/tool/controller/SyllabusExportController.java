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
import ca.hec.tenjin.api.SyllabusExportService;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.dao.SyllabusConstantsDao;
import ca.hec.tenjin.api.exception.ExportException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

@Controller
@RequestMapping(value = "v1")
public class SyllabusExportController {

	@Autowired
	private SyllabusExportService exportService;

	@Autowired
	private PublishService publishService;

	@Autowired
	private SyllabusService syllabusService;

	@Autowired
	private SyllabusConstantsDao syllabusConstantsDao;

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/syllabus/{id}/pdf", method = RequestMethod.GET)
	public void exportPdf(@PathVariable("id") Long id, @RequestParam(required = false, name = "locale", defaultValue = "fr_CA") String locale, @RequestParam(required = false, name = "published", defaultValue = "false") boolean published, HttpServletResponse response) throws ExportException, IOException {
		try {
			AbstractSyllabus syllabus = null;
			List<Object> elements;

			if (published) {
				try {
					syllabus = publishService.getPublishedSyllabus(id);
				} catch (NoSyllabusException e) {
					response.getWriter().append(syllabusConstantsDao.getInterfaceString("ERROR_NO_PUBLISHED_SYLLABUS", locale));

					return;
				}

				elements = (List<Object>) (List<?>) ((PublishedSyllabus) syllabus).getElements();
			} else {
				syllabus = syllabusService.getSyllabus(id);
				elements = (List<Object>) (List<?>) ((Syllabus) syllabus).getElements();
			}
			
			response.setHeader("Content-Disposition", "attachment; filename=\"syllabus.pdf\"");
			response.setHeader("Content-type", "application/pdf");
			
			exportService.exportPdf(syllabus, elements, false, locale, response.getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();

			throw new ExportException(e);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/syllabus/{id}/pdf-public", method = RequestMethod.GET)
	public void exportPublicPdf(@PathVariable("id") Long id, @RequestParam(required = false, name = "locale", defaultValue = "fr_CA") String locale, HttpServletResponse response) throws ExportException, IOException {
		try {
			AbstractSyllabus syllabus = null;
			List<Object> elements;

			try {
				syllabus = publishService.getPublicSyllabus(id);
			} catch (NoSyllabusException e) {
				response.getWriter().append(syllabusConstantsDao.getInterfaceString("ERROR_NO_PUBLISHED_SYLLABUS", locale));

				return;
			}

			elements = (List<Object>) (List<?>) ((PublishedSyllabus) syllabus).getElements();

			response.setHeader("Content-Disposition", "attachment; filename=\"syllabus.pdf\"");
			response.setHeader("Content-type", "application/pdf");
			
			exportService.exportPdf(syllabus, elements, true, locale, response.getOutputStream());
		} catch (Exception e) {
			e.printStackTrace();

			throw new ExportException(e);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/syllabus/{id}/pdf-html", method = RequestMethod.GET)
	public void exportPdfHtml(@PathVariable("id") Long id, @RequestParam(required = false, name = "locale", defaultValue = "fr_CA") String locale, @RequestParam(required = false, name = "published", defaultValue = "false") boolean published, HttpServletResponse response) throws ExportException, IOException {
		try {
			AbstractSyllabus syllabus = null;
			List<Object> elements;

			if (published) {
				try {
					syllabus = publishService.getPublishedSyllabus(id);
				} catch (NoSyllabusException e) {
					return;
				}

				elements = (List<Object>) (List<?>) ((PublishedSyllabus) syllabus).getElements();
			} else {
				syllabus = syllabusService.getSyllabus(id);
				elements = (List<Object>) (List<?>) ((Syllabus) syllabus).getElements();
			}

			response.getWriter().append(exportService.exportPdfHtml(syllabus, elements,locale));
		} catch (Exception e) {
			e.printStackTrace();

			throw new ExportException(e);
		}
	}
	
}
