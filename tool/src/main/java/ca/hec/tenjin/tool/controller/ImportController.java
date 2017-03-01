/******************************************************************************
 * $Id: $
 ******************************************************************************
 *
 * Copyright (c) 2016 The Sakai Foundation, The Sakai Quebec Team.
 *
 * Licensed under the Educational Community License, Version 1.0
 * (the "License"); you may not use this file except in compliance with the
 * License.
 * You may obtain a copy of the License at
 *
 *      http://www.opensource.org/licenses/ecl1.php
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

package ca.hec.tenjin.tool.controller;

import ca.hec.tenjin.api.ImportService;
import ca.hec.tenjin.api.SakaiProxy;
import ca.hec.tenjin.api.SyllabusService;

import ca.hec.tenjin.api.model.syllabus.Syllabus;

import org.sakaiproject.exception.PermissionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;

import lombok.Setter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import ca.hec.tenjin.api.exception.DeniedAccessException;
import ca.hec.tenjin.api.exception.NoSiteException;
import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.exception.SyllabusLockedException;

@Controller
@RequestMapping(value ="v1")
public class ImportController {

	private static Log log = LogFactory.getLog(ImportController.class);

	@Setter
	@Autowired
	private SyllabusService syllabusService;

	@Setter
	@Autowired(required=false)
	private ImportService importService;

	@RequestMapping(value = "/import/{siteId}", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<Syllabus> importSyllabus(@PathVariable("siteId") String siteId) 
			throws DeniedAccessException, SyllabusLockedException {
		
		if (importService == null) {
			return new ResponseEntity<Syllabus>(HttpStatus.NOT_IMPLEMENTED);
		}
		
		Syllabus syllabus = syllabusService.importSyllabusFromSite(siteId);
		if (syllabus != null) {
			return new ResponseEntity<Syllabus>(syllabus, HttpStatus.OK);
		} else {
			return new ResponseEntity<Syllabus>(HttpStatus.NOT_FOUND);
		}

	}

	@ExceptionHandler(DeniedAccessException.class)
	@ResponseStatus(value = HttpStatus.FORBIDDEN)
	public @ResponseBody Object handlePermissionException(DeniedAccessException ex) {
		return null;
	}

	@ExceptionHandler(SyllabusLockedException.class)
	@ResponseStatus(value = HttpStatus.LOCKED)
	public @ResponseBody Object handleSyllabusLockedException(DeniedAccessException ex) {
		return null;
	}
}
