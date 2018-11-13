package ca.hec.tenjin.impl.jobs;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.TemplateService;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabus;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusCompositeElement;
import ca.hec.tenjin.api.model.template.TemplateStructure;
import ca.hec.tenjin.api.provider.ExternalDataProvider;
import ca.hec.tenjin.impl.SakaiProxyImpl;
import lombok.Setter;
import org.apache.log4j.Logger;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import ca.hec.tenjin.api.jobs.RefreshProvidedElementsJob;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Arrays;

public class RefreshProvidedElementsJobImpl implements RefreshProvidedElementsJob, ApplicationContextAware {

    private static final Logger log = Logger.getLogger(RefreshProvidedElementsJobImpl.class);

    @Setter
    SyllabusService syllabusService;

    @Setter
    ApplicationContext applicationContext;

    @Setter
    TemplateService templateService;

    @Setter
    SakaiProxy sakaiProxy;
    
    @Setter
    SiteService siteService;

    /*
     * Job to refresh a syllabus element's content from it's provider (site id and template structure id must
     * be specified).
     *
     * This job updates the provided element's title, description, attributes and does the same for it's children.
     * TODO: It will not add new children from the provider
     *
     * The course outline must still be re-published for the published version to be updated.
     */
    @Override
    @Transactional
    public void execute(JobExecutionContext context) throws JobExecutionException {

    	List<String> siteIds = null;
        String siteIdsString = context.getMergedJobDataMap().getString("siteId");
        String session = context.getMergedJobDataMap().getString("session");

        if (session != null && !session.equals("")) {
        	Map<String, String> props = new HashMap<String, String>();
        	props.put("term", session);
        	siteIds = siteService.getSiteIds(SiteService.SelectionType.NON_USER, "course", null, props, SiteService.SortType.CREATED_ON_DESC, null);
        } else if (siteIdsString != null && !siteIdsString.equals("")) {
        	siteIds = Arrays.asList(siteIdsString.split(","));
        } else {
        	log.error("Specify a session or site ID(s)");
        	return;
        }

        for (String siteId : siteIds) {
            try {
                Site site = null;

                Long templateStructureId = null;
                try {
                    templateStructureId = context.getMergedJobDataMap().getLongFromString("templateStructureId");
                    site = sakaiProxy.getSite(siteId);
                } catch (NumberFormatException e) {
                    log.error("NumberFormatException " + e.getMessage());
                    return;
                } catch (IdUnusedException e) {
                    log.error("Site id does not exist: " + siteId);
                    return;
                }
                log.info("Refresh provided elements for site : " + siteId + " and templateStructure " + templateStructureId);

                if (site == null)
                    continue;

                // get locale in the same way as when creating the common syllabus
                String locale = site.getProperties().getProperty("locale_string");
                if (locale == null || locale.isEmpty()) {
                    String localePropName = sakaiProxy.getSakaiProperty("tenjin.syllabusLocale.sitePropertyName");
                    locale = site.getProperties().getProperty(localePropName);
                }
                if (locale == null || locale.isEmpty()) {
                    // use default server locale
                    locale = Locale.getDefault().toString();
                }

                List<AbstractSyllabusElement> elementsToRefresh =
                        syllabusService.getSyllabusElementsForTemplateStructureAndSite(templateStructureId, siteId);

                TemplateStructure templateStructure = null;
                try {
                    templateStructure =
                            templateService.getTemplateStructure(templateStructureId);
                } catch (IdUnusedException e) {
                    log.error("Template structure " + templateStructureId + " does not exist.");
                    return;
                }

                if (templateStructure.getProvider() == null) {
                    log.error("TemplateStructure has no official data provider");
                    return;
                }

                ExternalDataProvider provider =
                        (ExternalDataProvider) applicationContext.getBean(templateStructure.getProvider().getBeanName());

                AbstractSyllabusElement refreshedElement = provider.getAbstractSyllabusElement(siteId, locale);
                
                if (refreshedElement == null) {
                	log.debug("Provided element is null for " + siteId);
                	continue;
                }

                for (AbstractSyllabusElement e : elementsToRefresh) {
                	
                    // copy important data
                    copyData(e, refreshedElement);

                    if (e.isComposite() && refreshedElement.isComposite()) {
                        refreshChildren((SyllabusCompositeElement) e, (SyllabusCompositeElement) refreshedElement);
                    }
                }
            }
            catch (Exception e) {
		        e.printStackTrace();
            }
        }
    }

    private void refreshChildren(SyllabusCompositeElement original, SyllabusCompositeElement refreshed) {
        List<AbstractSyllabusElement> originalChildren = syllabusService.getChildrenForSyllabusElement(original);
        List<AbstractSyllabusElement> refreshedChildren = refreshed.getElements();

        for (int i = 0; i < originalChildren.size(); i++) {
            copyData(originalChildren.get(i), refreshedChildren.get(i));

            if (originalChildren.get(i).isComposite() && refreshedChildren.get(i).isComposite()) {
                refreshChildren((SyllabusCompositeElement)originalChildren.get(i), (SyllabusCompositeElement)refreshedChildren.get(i));
            }
        }
    }

    private void copyData(AbstractSyllabusElement destination, AbstractSyllabusElement source) {
        destination.setTitle(source.getTitle());
        destination.setDescription(source.getDescription());
        destination.setLastModifiedDate(new Date());
        destination.setLastModifiedBy("admin");
        if (source.getAttributes() != null) {
            destination.setAttributes(new HashMap<String, String>(source.getAttributes()));
        }
        syllabusService.saveOrUpdateElement(destination);
    }
}
