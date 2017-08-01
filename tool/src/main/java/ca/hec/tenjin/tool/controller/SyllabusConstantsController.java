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

import ca.hec.tenjin.api.dao.SyllabusConstantsDao;

@Controller
@RequestMapping(value = "v1")
public class SyllabusConstantsController {
	
	@Autowired
	private SyllabusConstantsDao syllabusConstantsDao;
	
	@RequestMapping(value = "/data", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getData() throws IdUnusedException {
		Map<String, Object> ret = new HashMap<>();
		
		ret.put("documentTypes", syllabusConstantsDao.getDocumentTypes());
		ret.put("hyperlinkTypes", syllabusConstantsDao.getHyperlinkTypes());
		ret.put("citationTypes", syllabusConstantsDao.getCitationTypes());
		ret.put("contactInfoTitles", syllabusConstantsDao.getContactInfoTitles());
		
		return ret;
	}
	
	@RequestMapping(value = "/strings", method = RequestMethod.GET)
	public @ResponseBody Map<String, String> getStringsForLocale(@RequestParam(name ="lang", required = true) String lang) {
		return syllabusConstantsDao.getInterfaceStrings(lang);
	}
}
