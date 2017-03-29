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

import java.util.List;

import ca.hec.tenjin.api.exception.NoSyllabusException;
import ca.hec.tenjin.api.model.syllabus.published.AbstractPublishedSyllabusElement;
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
	 * @param Long
	 *            id
	 * @return The syllabus, and it's organized sub-elements
	 * @throws NoSyllabusException
	 */
	public PublishedSyllabus getPublishedSyllabus(Long id, boolean includeElements) throws NoSyllabusException;

	/**
	 * Retreive a published syllabus for a site & section
	 * 
	 * @param siteId Site id
	 * @param sectionId Section id (optional)
	 * @return The syllabus, and it's organized sub-elements or null if no syllabus exists
	 */
	public PublishedSyllabus getPublishedSyllabusOrNull(String siteId, String sectionId);

	/**
	 * Delete a published syllabus by it's id. If it's the common syllabus for
	 * the site, delete all the common elements and all their mappings.
	 * Otherwise delete all mappings for the syllabus and it's non-common
	 * elements.
	 * 
	 * @param Long
	 *            syllabus id
	 * @throws NoSyllabusException
	 */
	public void deletePublishedSyllabus(Long syllabusId) throws NoSyllabusException;

	/**
	 * Retrieve a published syllabus element by id
	 * 
	 * @param Long
	 *            id
	 * @return The syllabus element
	 */
	public AbstractPublishedSyllabusElement getPublishedElement(Long id);

	/**
	 * Retrieve the list of published elements that are children of the element
	 * with the given id
	 * 
	 * @param Long
	 *            elementId
	 * @return The list of syllabus elements that are children of the element
	 *         with the given id
	 */
	public List<AbstractPublishedSyllabusElement> getChildPublishedElements(Long elementId);

	/**
	 * Retrieve the list of published syllabuses for the given site id
	 * 
	 * @param String site id
	 * 
	 * @return The list of published syllabus objects for the site
	 */
	public List<PublishedSyllabus> getPublishedSyllabusList(String siteId);

	public void unpublishSyllabusElements(Long syllabusId);
}
