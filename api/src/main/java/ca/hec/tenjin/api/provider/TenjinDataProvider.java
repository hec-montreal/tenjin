package ca.hec.tenjin.api.provider;

import java.util.List;
import java.util.Map;

import ca.hec.tenjin.api.model.data.CitationType;
import ca.hec.tenjin.api.model.data.ContactInfoTitle;
import ca.hec.tenjin.api.model.data.DocumentType;
import ca.hec.tenjin.api.model.data.ElementType;
import ca.hec.tenjin.api.model.data.HyperlinkType;

public interface TenjinDataProvider {

	Map<String, ElementType> getElementTypes();

	List<DocumentType> getDocumentTypes();

	List<HyperlinkType> getHyperlinkTypes();

	List<CitationType> getCitationTypes();

	List<ContactInfoTitle> getContactInfoTitles();

	String getEnumValue(String enumType, String key, String locale);
	
	Map<String, Map<String, String>> getInterfaceStrings();
	
	Map<String, String> getInterfaceStrings(String locale);
	
	String getInterfaceString(String key, String locale);
}
