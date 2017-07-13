package ca.hec.tenjin.impl.jobs;

import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.TemplateService;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.template.TemplateStructure;
import ca.hec.tenjin.api.provider.ExternalDataProvider;
import lombok.Setter;
import org.apache.log4j.Logger;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import ca.hec.tenjin.api.jobs.RefreshProvidedElementsJob;
import org.sakaiproject.exception.IdUnusedException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class RefreshProvidedElementsJobImpl implements RefreshProvidedElementsJob, ApplicationContextAware {

    private static final Logger log = Logger.getLogger(RefreshProvidedElementsJobImpl.class);

    @Setter
    SyllabusService syllabusService;

    @Setter
    ApplicationContext applicationContext;

    @Setter
    TemplateService templateService;

    @Override
    @Transactional
    public void execute(JobExecutionContext context) throws JobExecutionException {
        String siteId = context.getMergedJobDataMap().getString("siteId");
        Long providerId = context.getMergedJobDataMap().getLongFromString("providerId");
        log.info(siteId + " - " + providerId);

/*
        List<AbstractSyllabusElement> elementsToRefresh =
                syllabusService.getSyllabusElementsForProviderAndSite(providerId, siteId);

        try {
            for (AbstractSyllabusElement e : elementsToRefresh) {
                if (e.getTemplateStructureId() < 0)
                    continue;

                TemplateStructure templateStructure =
                        templateService.getTemplateStructure(e.getTemplateStructureId());
                ExternalDataProvider provider =
                        (ExternalDataProvider) applicationContext.getBean(templateStructure.getProvider().getBeanName());

                AbstractSyllabusElement refreshedElement = provider.getAbstractSyllabusElement(siteId);

                // copy important data
                e.setTitle(refreshedElement.getTitle());
                e.setDescription(refreshedElement.getDescription());
                e.setLastModifiedDate(new Date());
                e.setLastModifiedBy("admin");
                if (refreshedElement.getAttributes() != null) {
                    e.setAttributes(new HashMap<String, String>(refreshedElement.getAttributes()));
                }

                // TODO: delete children
                if (refreshedElement.isComposite() && e.isComposite()) {
                    SyllabusCompositeElement comp = (SyllabusCompositeElement) refreshedElement;
                    ((SyllabusCompositeElement) e).setElements(comp.getElements());
                }

//                syllabusService.saveElementAndChildren(e);
            }
        } catch (IdUnusedException e) {
            log.error("Template Structure does not exist");
        }
*/
    }
}
