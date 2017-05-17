package ca.hec.tenjin.impl.provider;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.hec.tenjin.api.model.data.CitationType;
import ca.hec.tenjin.api.model.data.ContactInfoTitle;
import ca.hec.tenjin.api.model.data.DocumentType;
import ca.hec.tenjin.api.model.data.ElementType;
import ca.hec.tenjin.api.model.data.HyperlinkType;
import ca.hec.tenjin.api.provider.TenjinDataProvider;

public class TenjinDataProviderImpl implements TenjinDataProvider {
	private Map<String, ElementType> elementTypes;
	private List<DocumentType> documentTypes;
	private List<HyperlinkType> hyperlinkTypes;
	private List<CitationType> citationTypes;
	private List<ContactInfoTitle> contactInfoTitles;
	private Map<String, Map<String, String>> strings;

	public TenjinDataProviderImpl() throws IOException {
		loadRootNodes();
	}

	private void loadRootNodes() throws IOException {
		JsonNode enumerationsRoot = new ObjectMapper().readTree(getClass().getResourceAsStream("/ca/hec/tenjin/data/enumerations.json"));
		JsonNode stringsRoot = new ObjectMapper().readTree(getClass().getResourceAsStream("/ca/hec/tenjin/data/strings.json"));
	
		// Element types
		elementTypes = new HashMap<>();
		
		Iterator<Map.Entry<String, JsonNode>> jsonElementTypes = enumerationsRoot.get("types").fields();

		while (jsonElementTypes.hasNext()) {
			Map.Entry<String, JsonNode> entry = jsonElementTypes.next();
			ElementType type = new ElementType();

			type.setType(entry.getValue().get("type").textValue());
			type.setLabel(entry.getValue().get("label").textValue());

			elementTypes.put(entry.getKey(), type);
		}
		
		// Document types
		documentTypes = new ArrayList<>();
		
		Iterator<JsonNode> jsonDocumentTypes = enumerationsRoot.get("documentTypes").elements();

		while (jsonDocumentTypes.hasNext()) {
			JsonNode entry = jsonDocumentTypes.next();
			DocumentType type = new DocumentType();

			type.setId(entry.get("id").intValue());
			type.setName(entry.get("name").textValue());

			documentTypes.add(type);
		}
		
		// Hyperlink types
		hyperlinkTypes = new ArrayList<>();
		
		Iterator<JsonNode> jsonHyperlinkTypes = enumerationsRoot.get("hyperlinkTypes").elements();

		while (jsonHyperlinkTypes.hasNext()) {
			JsonNode entry = jsonHyperlinkTypes.next();
			HyperlinkType type = new HyperlinkType();

			type.setId(entry.get("id").intValue());
			type.setName(entry.get("name").textValue());

			hyperlinkTypes.add(type);
		}
		
		// Citation types
		citationTypes = new ArrayList<>();
		
		Iterator<JsonNode> jsonCitationTypes = enumerationsRoot.get("citationTypes").elements();

		while (jsonCitationTypes.hasNext()) {
			JsonNode entry = jsonCitationTypes.next();
			CitationType type = new CitationType();

			type.setId(entry.get("id").intValue());
			type.setName(entry.get("name").textValue());

			citationTypes.add(type);
		}
		
		// Contact info titles
		contactInfoTitles = new ArrayList<>();
		
		Iterator<JsonNode> jsonContactInfoTitles = enumerationsRoot.get("contactInfoTitles").elements();

		while (jsonContactInfoTitles.hasNext()) {
			JsonNode entry = jsonContactInfoTitles.next();
			ContactInfoTitle type = new ContactInfoTitle();

			type.setId(entry.get("id").intValue());
			type.setName(entry.get("name").textValue());

			contactInfoTitles.add(type);
		}
		
		// Strings
		strings = new HashMap<>();
		
		Iterator<Map.Entry<String, JsonNode>> jsonLocales = stringsRoot.fields();

		while (jsonLocales.hasNext()) {
			Map.Entry<String, JsonNode> locale = jsonLocales.next();

			strings.put(locale.getKey(), new HashMap<String, String>());

			Iterator<Map.Entry<String, JsonNode>> jsonStrings = locale.getValue().fields();

			while (jsonStrings.hasNext()) {
				Map.Entry<String, JsonNode> string = jsonStrings.next();

				strings.get(locale.getKey()).put(string.getKey(), string.getValue().asText());
			}
		}
	}

	@Override
	public Map<String, ElementType> getElementTypes() {
		return elementTypes;
	}

	@Override
	public List<DocumentType> getDocumentTypes() {
		return documentTypes;
	}

	@Override
	public List<HyperlinkType> getHyperlinkTypes() {
		return hyperlinkTypes;
	}

	@Override
	public List<CitationType> getCitationTypes() {
		return citationTypes;
	}

	@Override
	public List<ContactInfoTitle> getContactInfoTitles() {
		return contactInfoTitles;
	}

	@Override
	public Map<String, Map<String, String>> getInterfaceStrings() {
		return strings;
	}

	@Override
	public Map<String, String> getInterfaceStrings(String locale) {
		return strings.get(locale);
	}
	
	@Override
	public String getInterfaceString(String key, String locale) {
		return strings.get(locale).get(key);
	}
}
