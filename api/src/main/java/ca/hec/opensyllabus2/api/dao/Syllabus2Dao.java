/******************************************************************************
 * $Id: $
 ******************************************************************************
 *
 * Copyright (c) 2015 The Sakai Foundation, The Sakai Quebec Team.
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
package ca.hec.opensyllabus2.api.dao;

import java.util.List;

import ca.hec.opensyllabus2.api.OsylException.NoSyllabusException;
import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.syllabus.SyllabusElementMapping;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public interface Syllabus2Dao {

	/**
	 * Retrieve a syllabus by id
	 * 
	 * @param Long id
	 * @param boolean retrieveElements
	 * @return The syllabus, and it's organized sub-elements if retrieveElements is true.
	 * @throws NoSyllabusException 
	 */
	public Syllabus getSyllabus(Long id, boolean retrieveElements) throws NoSyllabusException;

	/**
	 * Retrieves the list of syllabi for a given site id
	 * 
	 * @param String siteId
	 * @return The list of syllabi associated with the site id, without their elements
	 */
	public List<Syllabus> getSyllabusList(String siteId);
	
	/**
	 * Retrieves the syllabus associated to a specific site, section and shareable status
	 *  TODO: implementation is incomplete (doesn't work for sectionId)
	 * 
	 * @param String siteId
	 * @param String sectionId
	 * @param Boolean shareable
	 * @return The syllabus associated with the specified section or the shareable
	 */
	public Syllabus getSyllabus(String siteId, String sectionId, Boolean shareable);

	/**
	 * Retrieves the syllabus element mappings for the specified syllabusId
     *  TODO: add parameter for hidden?
     *  
	 * @param String syllabusId
	 * @return The list of syllabus element mappings
	 */
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId);

	/**
	 * Retrieves a persistent syllabus element by id 
     * 
	 * @param String elementId
	 * @return The syllabus element
	 */
	public AbstractSyllabusElement getSyllabusElement(Long elementId);

	/**
	 * Save a hibernate object to the database (merge them if it's already in the session).
	 * 
	 * @param Object o
	 * @return The saved object
	 */
	public Object save(Object o);

	/**
	 * Delete a hibernate object to the database (merge them if it's already in the session).
	 * 
	 * @param Object o
	 */
	public void delete(Object o);
}

