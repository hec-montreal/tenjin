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
import ca.hec.tenjin.api.model.data.DataEnum;
import ca.hec.tenjin.api.model.data.DocumentType;
import ca.hec.tenjin.api.model.data.HyperlinkType;
import ca.hec.tenjin.api.provider.TenjinDataProvider;

public class TenjinDataProviderImpl implements TenjinDataProvider {
	private Map<String, List<DataEnum>> enums;
	private Map<String, Map<String, String>> strings;

	public TenjinDataProviderImpl() throws IOException, InstantiationException, IllegalAccessException {
		loadRootNodes();
	}

	private void loadRootNodes() throws IOException, InstantiationException, IllegalAccessException {
		JsonNode enumerationsRoot = new ObjectMapper().readTree(getClass().getResourceAsStream("/ca/hec/tenjin/data/enumerations.json"));
		JsonNode stringsRoot = new ObjectMapper().readTree(getClass().getResourceAsStream("/ca/hec/tenjin/data/strings.json"));

		// Other enums
		enums = new HashMap<>();

		// Document types
		enums.put("documentTypes", createEnumList(enumerationsRoot, "documentTypes", DocumentType.class));
		enums.put("hyperlinkTypes", createEnumList(enumerationsRoot, "hyperlinkTypes", HyperlinkType.class));
		enums.put("citationTypes", createEnumList(enumerationsRoot, "citationTypes", CitationType.class));
		enums.put("contactInfoTitles", createEnumList(enumerationsRoot, "contactInfoTitles", ContactInfoTitle.class));

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
	public String getEnumValue(String enumName, String key, String locale) {
		for (DataEnum e : enums.get(enumName)) {
			if (e.getName().equals(key)) {
				return getInterfaceString(e.getName(), locale);
			}
		}
		
		return null;
	}

	@Override
	public List<DocumentType> getDocumentTypes() {
		return castList(enums.get("documentTypes"));
	}

	@Override
	public List<HyperlinkType> getHyperlinkTypes() {
		return castList(enums.get("hyperlinkTypes"));
	}

	@Override
	public List<CitationType> getCitationTypes() {
		return castList(enums.get("citationTypes"));
	}

	@Override
	public List<ContactInfoTitle> getContactInfoTitles() {
		return castList(enums.get("contactInfoTitles"));
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

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static <T> List<T> castList(List list) {
		return (List<T>) list;
	}

	@SuppressWarnings("unchecked")
	private static <T extends DataEnum> List<DataEnum> createEnumList(JsonNode root, String name, Class<T> clss) throws InstantiationException, IllegalAccessException {
		List<T> ret = new ArrayList<>();
		Iterator<JsonNode> jsonEnum = root.get(name).elements();

		while (jsonEnum.hasNext()) {
			JsonNode entry = jsonEnum.next();
			DataEnum instance = clss.newInstance();

			instance.setId(entry.get("id").intValue());
			instance.setName(entry.get("name").textValue());

			ret.add((T) instance);
		}

		return castList(ret);
	}
}
