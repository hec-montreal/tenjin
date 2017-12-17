package ca.hec.tenjin.impl;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusService;
import ca.hec.tenjin.api.SyllabusServiceEntityProvider;
import ca.hec.tenjin.api.dao.SyllabusDao;
import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.Syllabus;
import lombok.Setter;
import org.apache.log4j.Logger;
import org.sakaiproject.content.api.providers.SiteContentAdvisor;
import org.sakaiproject.content.api.providers.SiteContentAdvisorProvider;
import org.sakaiproject.content.api.providers.SiteContentAdvisorTypeRegistry;
import org.sakaiproject.entity.api.*;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.site.api.Group;
import org.sakaiproject.site.api.Site;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.*;

/**
 * Created by 11091096 on 2017-07-18.
 */
public class SyllabusServiceEntityProviderImpl implements SyllabusServiceEntityProvider, ContextObserver, EntityTransferrer,
        SiteContentAdvisorProvider, SiteContentAdvisorTypeRegistry, EntityTransferrerRefMigrator, HardDeleteAware {

    private static final Logger log = Logger.getLogger("SyllabusServiceEntityProviderImpl");

    private Map<String, SiteContentAdvisorProvider> siteContentAdvisorsProviders = new HashMap<String, SiteContentAdvisorProvider>();

    @Setter
    SyllabusService syllabusService;

    @Setter
    SyllabusDao syllabusDao;

    @Setter
    EntityManager entityManager;

    @Setter
    SakaiProxy sakaiProxy;

    public void init(){
        entityManager.registerEntityProducer(this,
                REFERENCE_ROOT);
    }

    @Override
    public void hardDelete(String siteId) {

    }

    @Override
    public void updateEntityReferences(String toContext, Map<String, String> transversalMap) {

    }

    @Override
    public Map<String, String> transferCopyEntitiesRefMigrator(String fromContext, String toContext, List<String> ids) {
        return transferCopyEntitiesRefMigrator(fromContext, toContext, ids, false);
    }

    @Override
    public Map<String, String> transferCopyEntitiesRefMigrator(String fromContext, String toContext, List<String> ids, boolean cleanup) {

        Map<String, String> transversalMap = new HashMap<String, String>();
        List<Syllabus> syllabiToCopy, syllabiInDestination ;
        Syllabus syllabusCopy = null;
        Syllabus commonSyllabus = null;
        Site toSite = null;
        Map<Long, AbstractSyllabusElement> mappingCommonSyllabusOldNew = new HashMap<Long, AbstractSyllabusElement>();
        // map to prevent from copying a citation twice
        Map<String, String> copiedCitationsMap = new HashMap();

        //Check if we have content to copy
        try {
            syllabiToCopy = syllabusService.getSyllabusList(fromContext);
        } catch (NoSiteException e) {
            log.error("The site " + fromContext + " does not exist");
            return transversalMap;
        } catch (DeniedAccessException e) {
            log.error(" You are not allowed to copy syllabi from " + fromContext);
            return transversalMap;
        }

        //Delete all syllabi in toContext if cleanup
        if (cleanup){
            try {
                syllabusService.deleteCitationLists(toContext);

                syllabiInDestination = syllabusService.getSyllabusList(toContext);

                for (Syllabus syllabus: syllabiInDestination){
                   syllabusDao.softDeleteSyllabus(syllabus);

                }
            } catch (NoSiteException e) {
                log.debug("The site " + toContext + " does not exist");
            } catch (DeniedAccessException e) {
                log.debug(" You are not allowed to copy syllabi from " + toContext);
            }
        }

        try {
            toSite = sakaiProxy.getSite(toContext);

            //copy common
            commonSyllabus = syllabusService.getCommonSyllabus(fromContext);
            syllabusCopy = syllabusService.transferCopySyllabus(fromContext, toContext, commonSyllabus.getId(), commonSyllabus.getTitle(),
                    commonSyllabus.getCommon(), commonSyllabus.getTemplateId(), commonSyllabus.getLocale(),toSite.getTitle(),
                    sakaiProxy.getCurrentUserId(), sakaiProxy.getCurrentUserName(), mappingCommonSyllabusOldNew, copiedCitationsMap);
            for (Group group: toSite.getGroups()){
                if (group.getProviderGroupId() != null){
                    syllabusDao.addSection(syllabusCopy.getId().toString(),group.getId());
                }
            }


            syllabiToCopy.remove(commonSyllabus);

            if (syllabiToCopy.size()>0){

            }

            //copy rest of syllabi
            for(Syllabus syllabus: syllabiToCopy){
                syllabusCopy = syllabusService.transferCopySyllabus(fromContext, toContext, syllabus.getId(), syllabus.getTitle(),
                        syllabus.getCommon(), syllabus.getTemplateId(), syllabus.getLocale(),toSite.getTitle(),
                        sakaiProxy.getCurrentUserId(), sakaiProxy.getCurrentUserName(), mappingCommonSyllabusOldNew, copiedCitationsMap);
            }
        } catch (DeniedAccessException e) {
            e.printStackTrace();
        } catch (IdUnusedException e) {
            e.printStackTrace();
        } catch (NoSyllabusException e) {
            e.printStackTrace();
        } catch (StructureSyllabusException e) {
            e.printStackTrace();
        }



        return transversalMap;
    }

    @Override
    public void registerSiteContentAdvisorProvidor(SiteContentAdvisorProvider advisor, String type) {
        siteContentAdvisorsProviders.put(type, advisor);
    }

    @Override
    public SiteContentAdvisor getContentAdvisor(Site site) {
        return null;
    }

    @Override
    public void contextCreated(String context, boolean toolPlacement) {

    }

    @Override
    public void contextUpdated(String context, boolean toolPlacement) {

    }

    @Override
    public void contextDeleted(String context, boolean toolPlacement) {

    }

    @Override
    public String[] myToolIds() {
        String[] toolIds = { "sakai.tenjin" };
        return toolIds;
    }

    @Override
    public void transferCopyEntities(String fromContext, String toContext, List<String> ids, boolean cleanup) {
        transferCopyEntitiesRefMigrator(fromContext, toContext, ids, cleanup);
    }

    @Override
    public void transferCopyEntities(String fromContext, String toContext, List<String> ids) {
        transferCopyEntities(fromContext, toContext, ids, true);
    }

    @Override
    public String getLabel() {
        return "tenjin";
    }

    @Override
    public boolean willArchiveMerge() {
        return false;
    }

    @Override
    public String archive(String siteId, Document doc, Stack<Element> stack, String archivePath, List<Reference> attachments) {
        return null;
    }

    @Override
    public String merge(String siteId, Element root, String archivePath, String fromSiteId, Map<String, String> attachmentNames, Map<String, String> userIdTrans, Set<String> userListAllowImport) {
        return null;
    }

    @Override
    public boolean parseEntityReference(String reference, Reference ref) {
        return false;
    }

    @Override
    public String getEntityDescription(Reference ref) {
        return null;
    }

    @Override
    public ResourceProperties getEntityResourceProperties(Reference ref) {
        return null;
    }

    @Override
    public Entity getEntity(Reference ref) {
        return null;
    }

    @Override
    public String getEntityUrl(Reference ref) {
        return null;
    }

    @Override
    public Collection<String> getEntityAuthzGroups(Reference ref, String userId) {
        return null;
    }

    @Override
    public HttpAccess getHttpAccess() {
        return null;
    }
}
