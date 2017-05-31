package ca.hec.tenjin.tool.controller;

import java.util.HashMap;
import java.util.Map;

import org.sakaiproject.exception.IdUnusedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.tenjin.api.provider.TenjinDataProvider;

@Controller
@RequestMapping(value = "v1")
public class DataController {
	
	@Autowired
	private TenjinDataProvider dataProvider;
	
	@RequestMapping(value = "/data", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getData() throws IdUnusedException {
		Map<String, Object> ret = new HashMap<>();
		
		ret.put("documentTypes", dataProvider.getDocumentTypes());
		ret.put("hyperlinkTypes", dataProvider.getHyperlinkTypes());
		ret.put("citationTypes", dataProvider.getCitationTypes());
		ret.put("contactInfoTitles", dataProvider.getContactInfoTitles());
		
		return ret;
	}
	
	@RequestMapping(value = "/strings", method = RequestMethod.GET)
	public @ResponseBody Map<String, String> getStringsForLocale(@RequestParam(name ="lang", required = true) String lang) {
		return dataProvider.getInterfaceStrings(lang);
	}
}
