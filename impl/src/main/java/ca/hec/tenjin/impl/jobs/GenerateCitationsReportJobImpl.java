package ca.hec.tenjin.impl.jobs;

import ca.hec.tenjin.api.*;
import ca.hec.tenjin.api.jobs.GenerateCitationsReportJob;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusCitationElement;
import lombok.Setter;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.*;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sakaiproject.component.cover.ServerConfigurationService;
import org.sakaiproject.citation.cover.CitationService;
import org.sakaiproject.citation.api.Citation;
import org.sakaiproject.citation.api.CitationCollection;
import org.sakaiproject.content.api.ContentResource;
import org.sakaiproject.content.cover.ContentHostingService;
import org.sakaiproject.entity.api.ResourceProperties;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.ServerOverloadException;
import org.sakaiproject.exception.TypeException;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.tool.cover.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class GenerateCitationsReportJobImpl implements GenerateCitationsReportJob {

    private static final Logger log = Logger.getLogger(GenerateCitationsReportJobImpl.class);
    private static final String REPORTS_SITE_PROPERTY = "tenjin.citations-report.siteId";

    @Setter
    @Autowired
    SyllabusService syllabusService;

    @Setter
    @Autowired
    ReportingService reportingService;

    /*
     * Job to generate a CSV file with all citations in all course outlines from a given session.
     */
    @Override
    @Transactional
    public void execute(JobExecutionContext context) throws JobExecutionException {
        log.info("Start GenerateCitationsReportJob");

        // switch to admin user
        Session session = SessionManager.getCurrentSession();
        session.setUserEid("admin");
        session.setUserId("admin");

        List<SyllabusCitationElement> citations = null;
        Date startDate = null;
        Date endDate = null;

        String reportsDestinationFolder =
                "/group/" + ServerConfigurationService.getString(REPORTS_SITE_PROPERTY) + "/";

        if (reportsDestinationFolder == null || !ContentHostingService.isCollection(reportsDestinationFolder)) {
            log.error("Destination folder defined in sakai.properties does not exist");
            return;
        }

        String lastModifiedDateAfterString = context.getMergedJobDataMap().getString("lastModifiedDateAfter");
        String lastModifiedDateBeforeString = context.getMergedJobDataMap().getString("lastModifiedDateBefore");

        if (!lastModifiedDateAfterString.isEmpty()) {
            startDate = getDate(lastModifiedDateAfterString);
        }
        if (!lastModifiedDateBeforeString.isEmpty()) {
            endDate = getDate(lastModifiedDateBeforeString);
        }


        if (startDate == null || endDate == null) {
            log.info("Get citations for the last week");
            Date d = new Date();
            d.setDate(d.getDate() - 7);
            citations = reportingService.getCitationsModifiedSince(d);
        }
        else {
            log.info("Get citations between " + startDate + " and " + endDate);
            citations = reportingService.getCitationsModifiedBetween(startDate, endDate);
        }

        // init excel file
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Workbook wb = new HSSFWorkbook();
        Sheet sh = wb.createSheet();
        wb.setSheetName(0, "Références Bibliographiques");

        Row r = null;
        Cell c = null;

        // first row with column names
        int rownum = 0;
        int cellnum = 0;
        r = sh.createRow(rownum++);
        c = r.createCell(cellnum++);
        c.setCellValue("Date de modification");
        c = r.createCell(cellnum++);
        c.setCellValue("Identifiant du site");
        c = r.createCell(cellnum++);
        c.setCellValue("Plan de cours");
        c = r.createCell(cellnum++);
        c.setCellValue("Publié");
        c = r.createCell(cellnum++);
        c.setCellValue("Titre de page");
        c = r.createCell(cellnum++);
        c.setCellValue("Type");
        c = r.createCell(cellnum++);
        c.setCellValue("Important");
        c = r.createCell(cellnum++);
        c.setCellValue("Auteur");
        c = r.createCell(cellnum++);
        c.setCellValue("Date");
        c = r.createCell(cellnum++);
        c.setCellValue("Titre");
        c = r.createCell(cellnum++);
        c.setCellValue("ISBN/ISN");
        c = r.createCell(cellnum++);
        c.setCellValue("URL");
        c = r.createCell(cellnum++);
        c.setCellValue("URL manuel");

        c = r.createCell(cellnum++);
        c.setCellValue("title");
        c = r.createCell(cellnum++);
        c.setCellValue("saka:mediatype");
        c = r.createCell(cellnum++);
        c.setCellValue("year");
        c = r.createCell(cellnum++);
        c.setCellValue("sourceTitle");
        c = r.createCell(cellnum++);
        c.setCellValue("volume");
        c = r.createCell(cellnum++);
        c.setCellValue("issue");
        c = r.createCell(cellnum++);
        c.setCellValue("isnidentifier");
        c = r.createCell(cellnum++);
        c.setCellValue("startPage");
        c = r.createCell(cellnum++);
        c.setCellValue("endPage");
        c = r.createCell(cellnum++);
        c.setCellValue("hecUrl");
        c = r.createCell(cellnum++);
        c.setCellValue("publisher");
        c = r.createCell(cellnum++);
        c.setCellValue("pages");
        c = r.createCell(cellnum++);
        c.setCellValue("url");
        c = r.createCell(cellnum++);
        c.setCellValue("bookstoreUrl");
        c = r.createCell(cellnum++);
        c.setCellValue("publicationLocation");
        c = r.createCell(cellnum++);
        c.setCellValue("inf:dol/");
        c = r.createCell(cellnum++);
        c.setCellValue("edition");
        c = r.createCell(cellnum++);
        c.setCellValue("saka:has_preferred_url");
        c = r.createCell(cellnum++);
        c.setCellValue("preferredUrl");

        for (int i = 0; i < citations.size(); i++) {
            try {
                SyllabusCitationElement citation = citations.get(i);
                List<Long> syllabusIds = syllabusService.getSyllabusesWithElementMapping(citation);
                Citation citationResource = getCitation(citation.getAttributes().get("citationId"));

                cellnum = 0;
                r = sh.createRow(rownum++);

                c = r.createCell(cellnum++);
                c.setCellValue(citation.getLastModifiedDate().toString());

                c = r.createCell(cellnum++);
                c.setCellValue(citation.getSiteId());

                c = r.createCell(cellnum++);
                try {
                    if (citation.getCommon()) {
                        c.setCellValue("Commun");
                    } else {
                        String syllabusTitles = "";
                        for (Long syllabusId : syllabusIds) {
                            Syllabus s = syllabusService.getSyllabus(syllabusId);
                            syllabusTitles += s.getTitle();
                        }
                        c.setCellValue(syllabusTitles);
                    }
                } catch (Exception e) {
                    c.setCellValue("Error retrieving course outline for citation");
                }

                c = r.createCell(cellnum++);
                c.setCellValue(citation.getEqualsPublished()?"Publié":"Non-Publié");

                c = r.createCell(cellnum++);
                AbstractSyllabusElement rubric = null;
                AbstractSyllabusElement page = null;

                if (citation.getParentId() != null) {
                    rubric = syllabusService.getSyllabusElement(citation.getParentId());
                }
                if (rubric != null && rubric.getParentId() != null) {
                    page = syllabusService.getSyllabusElement(rubric.getParentId());
                }
                if (page != null) {
                    c.setCellValue(page.getTitle());
                } else {
                    c.setCellValue("");
                }

                c = r.createCell(cellnum++);
                String type = citation.getAttributes().get("citationType");
                if (type != null) {
                    // remove "REFERENCE_TYPE_"
                    type = type.toLowerCase();
                    c.setCellValue(type.startsWith("reference_type_") ? type.substring(15) : type);
                }

                c = r.createCell(cellnum++);
                if (citation.getImportant() != null && citation.getImportant())
                    c.setCellValue("Oui");
                else
                    c.setCellValue("Non");

                if (citationResource != null) {
                    c = r.createCell(cellnum++);
                    c.setCellValue(citationResource.getCreator());
                    c = r.createCell(cellnum++);
                    c.setCellValue((String) citationResource.getCitationProperty("date"));
                    c = r.createCell(cellnum++);
                    c.setCellValue(citationResource.getDisplayName());
                    c = r.createCell(cellnum++);
                    c.setCellValue((String) citationResource.getCitationProperty("isnIdentifier"));
                    if (citation.getAttributes().get("activateLibraryLink") != null &&
                            citation.getAttributes().get("activateLibraryLink").equals("true")) {
                        c = r.createCell(cellnum++);
                        c.setCellValue(citationResource.getOpenurl());
                    }
                    if (citation.getAttributes().get("activateOtherLink") != null &&
                            citation.getAttributes().get("activateOtherLink").equals("true")) {
                        c = r.createCell(cellnum++);
                        c.setCellValue(citation.getAttributes().get("otherLinkurl"));
                    }
                    
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("title"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("sakai:mediatype"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("year"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("sourceTitle"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("volume"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("issue"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("isnidentifier"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("startPage"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("endPage"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("hecUrl"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("publisher"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("pages"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("url"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("bookstoreUrl"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("publicationLocation"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("info:dol/"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("edition"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("sakai:has_preferred_url"));
                    c = r.createCell(cellnum++);
                    c.setCellValue((String)citationResource.getCitationProperty("preferredUrl"));

                } else {
                    c = r.createCell(cellnum++);
                    c.setCellValue("La citation n'existe pas dans l'outil ressources");
                }
            }
            catch (Exception e) {
                e.printStackTrace();
                continue;
            }
        }

        for (int i = 0; i < 11; i++) {
            sh.autoSizeColumn(i);
        }

        try {
            Date now = new Date();
            String filename = "rapport_references_"+
                    now.toLocaleString().replace(' ', '_').replace(':', '.')+".xls";

            wb.write(out);
            ResourceProperties rp = ContentHostingService.newResourceProperties();
            rp.addProperty(ResourceProperties.PROP_DISPLAY_NAME, filename);
            ContentHostingService.addResource(reportsDestinationFolder +filename, "application/vnd.ms-excel", out.toByteArray(), rp, 0);
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.clear();
        }
        log.info("End Start GenerateCitationsReportJob");
    }

    private Date getDate(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date convertedDate = null;
        try {
            convertedDate = dateFormat.parse(date);
        } catch (Exception e) {
            log.error("Unable to parse date: " + date);
        }
        return convertedDate;

    }

    private Citation getCitation(String fullCitationId) {
        String citationCollectionId = fullCitationId.substring(0, fullCitationId.lastIndexOf('/'));
        String citationId = fullCitationId.substring(fullCitationId.lastIndexOf('/')+1);
        Citation cit = null;
        try {
            ContentResource cr = ContentHostingService.getResource(citationCollectionId);
            CitationCollection collection = CitationService.getCollection(new String(cr.getContent()));
            cit = collection.getCitation(citationId);

        } catch (PermissionException e) {
            e.printStackTrace();
        } catch (IdUnusedException e) {
            log.error("Citation or collection not found: " + e.getId());
        } catch (TypeException e) {
            e.printStackTrace();
        } catch (ServerOverloadException e) {
            e.printStackTrace();
        }

        return cit;
    }
}
