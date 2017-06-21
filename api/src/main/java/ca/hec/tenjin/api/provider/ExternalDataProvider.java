package ca.hec.tenjin.api.provider;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;

/**
 * An interface to abstract all methods required for an external data provider, as defined
 * by an ExternalDataProviderDefinition in the DB.
 * 
 * @author Curtis van Osch (curtis.van-osch@hec.ca)
 *
 */
public interface ExternalDataProvider {

	AbstractSyllabusElement getAbstractSyllabusElement(String siteId);

}
