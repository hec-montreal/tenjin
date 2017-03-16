package ca.hec.tenjin.tool.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.provider.tool.SamigoToolEntityProvider;
import ca.hec.tenjin.api.provider.tool.ToolEntity;

@Controller
@RequestMapping(value = "v1")
public class ToolEntityController {

	@Autowired
	private SakaiProxy sakaiProxy;
	
	@Autowired
	private SamigoToolEntityProvider samigoToolEntityProvider;
	
	@RequestMapping(value = "/tool-entities/samigo", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<List<ToolEntity>> getSamigoEntities() {
		return new ResponseEntity<List<ToolEntity>>(samigoToolEntityProvider.getEntities(sakaiProxy.getCurrentSiteId(), null), HttpStatus.OK);
	}
}
