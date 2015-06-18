package ca.hec.opensyllabus2.tool;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Getter;
import lombok.Setter;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import ca.hec.opensyllabus2.api.OpenSyllabus2Service;

public class OpenSyllabusAction implements Controller {

	/**
	 * Hello World Controller
	 * 
	 * @author Mike Jennings (mike_jennings@unc.edu)
	 * 
	 */
	@Setter
	@Getter
	private OpenSyllabus2Service openSyllabus2Service = null;
	
	public ModelAndView handleRequest(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("currentSiteId", openSyllabus2Service.getCurrentSiteId());
		map.put("userDisplayName", openSyllabus2Service.getCurrentUserDisplayName());
		
		return new ModelAndView("index", map);
	}

}
