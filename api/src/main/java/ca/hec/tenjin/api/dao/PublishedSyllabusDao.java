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
package ca.hec.tenjin.api.dao;

import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.published.PublishedSyllabus;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public interface PublishedSyllabusDao {

	/**
	 * Retrieve a published syllabus by id with it's structured elements
	 * 
	 * @param Long id
	 * @return The syllabus, and it's organized sub-elements
	 * @throws NoSyllabusException 
	 */
	public PublishedSyllabus getPublishedSyllabus(Long id, boolean includeElements) throws NoSyllabusException;
		
	/**
	 * Delete a published syllabus by it's id
	 * 
	 * @param Long syllabus id
	 * @throws NoSyllabusException 
	 */
	public void deletePublishedSyllabus(Long syllabusId) throws NoSyllabusException;
	

}

