package ca.hec.tenjin.api;

import org.sakaiproject.entity.api.Entity;
import org.sakaiproject.entity.api.EntityProducer;

/**
 * Created by 11091096 on 2017-07-18.
 */
public interface SyllabusServiceEntityProvider extends EntityProducer{

    static final String APPLICATION_ID = "sakai:tenjin";

    /** This string starts the references to syllabi in this service. */
    public static final String REFERENCE_ROOT = Entity.SEPARATOR + "tenjin";



}
