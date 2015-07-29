package ca.hec.opensyllabus2.tool;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Getter;
import lombok.Setter;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import ca.hec.opensyllabus2.api.Syllabus2Service;

public class Syllabus2Action implements Controller {

	/**
	 * Hello World Controller
	 * 
	 * @author Mike Jennings (mike_jennings@unc.edu)
	 * 
	 */
	@Setter
	@Getter
	private Syllabus2Service syllabus2Service = null;
	
	public ModelAndView handleRequest(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("currentSiteId", syllabus2Service.getCurrentSiteId());
		map.put("userDisplayName", syllabus2Service.getCurrentUserDisplayName());
		
		return new ModelAndView("index", map);
	}

}
