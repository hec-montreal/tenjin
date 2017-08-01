package ca.hec.tenjin.api.dao;

import java.util.List;
import java.util.Map;

import ca.hec.tenjin.api.model.syllabusconstants.CitationType;
import ca.hec.tenjin.api.model.syllabusconstants.ContactInfoTitle;
import ca.hec.tenjin.api.model.syllabusconstants.DocumentType;
import ca.hec.tenjin.api.model.syllabusconstants.HyperlinkType;

public interface SyllabusConstantsDao {

	List<DocumentType> getDocumentTypes();

	List<HyperlinkType> getHyperlinkTypes();

	List<CitationType> getCitationTypes();

	List<ContactInfoTitle> getContactInfoTitles();

	String getEnumValue(String enumType, String key, String locale);
	
	Map<String, Map<String, String>> getInterfaceStrings();
	
	Map<String, String> getInterfaceStrings(String locale);
	
	String getInterfaceString(String key, String locale);
}
