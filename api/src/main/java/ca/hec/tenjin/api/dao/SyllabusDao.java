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
import ca.hec.tenjin.api.exception.StructureSyllabusException;
import ca.hec.tenjin.api.model.syllabus.*;

import java.util.List;
import java.util.Map;

/**
 *
 * Data access object for dealing with Syllabus, SyllabusElement, and SyllabusElementMapping objects
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public interface SyllabusDao {

	/**
	 * Retrieve a syllabus by id
	 * 
	 * @param Long id
	 * @return The syllabus object without it's elements
	 * @throws NoSyllabusException 
	 */
	public Syllabus getSyllabus(Long id) throws NoSyllabusException;

	/**
	 * Retrieve a syllabus and it's structured syllabus elements  
	 * 
	 * @param Long id
	 * @return The syllabus object with it's structured child elements
	 * @throws NoSyllabusException 
	 * @throws StructureSyllabusException 
	 */
	public Syllabus getStructuredSyllabus(Long id) throws NoSyllabusException, StructureSyllabusException;
	
	/**
	 * Retrieves the common syllabus
	 * 
	 * @param String siteId
	 * @return The common syllabus (without the elements)
	 */
	public Syllabus getCommonSyllabus(String siteId) throws NoSyllabusException;
	
	
	/**
	 * Retrieves the list of syllabi for a given site id
	 * 
	 * @param String siteId
	 * @param List<String> sections List of available sections for the current user
	 * @param Boolean commonRead If common syllabus is readable by the current user
	 * @param Boolean commonWrite If common syllabus is writable by the current user
	 * @param String currentUserId Current user id
	 * @return The list of syllabi associated with the site id, without their elements
	 */
	public List<Syllabus> getSyllabusList(String siteId);
	
	/**
	 * Retrieves the syllabus element mappings for the specified syllabusId
     *  
	 * @param String syllabusId
	 * @param boolean hidden - include hidden elements
	 * @return The list of syllabus element mappings
	 */
	public List<SyllabusElementMapping> getSyllabusElementMappings(Long syllabusId, boolean hidden);

	/**
	 * Retrieves a persistent syllabus element by id 
     * 
	 * @param String elementId
	 * @return The syllabus element
	 */
	public AbstractSyllabusElement getSyllabusElement(Long elementId);

	/**
	 * Retrieves the list of children for a given composite element
	 *
	 * @param SyllabusCompositeElement parent
	 * @return The syllabus elements that are children of parent
	 */
	public List<AbstractSyllabusElement> getChildrenForSyllabusElement(SyllabusCompositeElement parent);

	/**
	 * Save a hibernate object to the database (merge them if it's already in the session).
	 * 
	 * @param Object o
	 * @return The saved object
	 */
	public Object save(Object o);
	
	public void detach(Object o);

	/**
	 * Delete a hibernate object to the database (merge them if it's already in the session).
	 * 
	 * @param Object o
	 */
	public void deleteSyllabusObject(Object o);
	
	public void softDeleteSyllabus(Syllabus syllabus);
	
	/**
	 * Delete an AbstractSyllabusElement and all it's mappings
	 * 
	 * @param Object o
	 */
	public void deleteElementAndMappings(AbstractSyllabusElement syllabusElement);

	/**
	 * True if this element has children in a non-common syllabus, false otherwise
	 * 
	 * @param AbstractSyllabusElement element
	 */
	public boolean elementHasNonCommonChildren(AbstractSyllabusElement element);

	/**
	 * get syllabus element mappings for a given element
	 * 
	 * @param Long parentId
	 * @param Long templateStructureId
	 */
	public List<SyllabusElementMapping> getMappingsForElement(AbstractSyllabusElement element);

	/**
	 * Add a syllabus element mapping to the end of the list for the given element's parentId (not hidden) 
	 * 
	 * @param Long syllabusId
	 * @param AbstractSyllabusElement element
	 */
	public SyllabusElementMapping addMappingToEndOfList(Long syllabusId, AbstractSyllabusElement element);

	/**
	 * Return the mappings for a specified element where no corresponding mapping exists for the children of the given element
	 * (meaning they can be deleted)  
	 * 
	 * @param AbstractSyllabusElement element
	 * @return List<SyllabusElementMapping> The mappings that have no children
	 */
	public List<SyllabusElementMapping> getMappingsWithoutChildren(AbstractSyllabusElement syllabusElement);

	/**
	 * Update a persistent object in the database  
	 * 
	 * @param Object o - The object to update
	 */
	public void update(Object o);

	/**
	 * Save or update a persistent object in the database
	 *
	 * @param Object o - The object to update
	 * @return true for success, false for failure
	 */
	public boolean saveOrUpdate(Object o);

	/**
	 * Get the SyllabusElementMapping for a given syllabus and element
	 *
	 * @param Long syllabusId - The syllabus id
	 * @param Long elementId - The element id
	 * @return SyllabuselementMapping
	 */
	public SyllabusElementMapping getMappingForSyllabusAndElement(Long syllabusId, Long elementId);

	/**
	 * Retrieve the sections for each syllabus for a specified site
	 *
	 * @param String siteId
	 * @return Map<String, Object> - a map of syllabus id -> section object
	 */
	public Map<String, Object> getSectionsBySyllabus(String siteId);

	/**
	 * Delete a section from the specified syllabus
	 *
	 * @param String syllabusId
	 * @param String sectionId
	 */
	public void deleteSection(String syllabusId, String sectionId);

	/**
	 * Assign a section to the specified syllabus
	 *
	 * @param String syllabusId
	 * @param String sectionId
	 */
	public void addSection (String syllabusId, String sectionId);

	/**
	 * Get a list of SyllabusElements for a given template structure and site
	 *
	 * @param Long templateStructureId - The id of the template structure
	 * @param String siteId - The site id
	 * @return List<AbstractSyllabusElement>
	 */
	public List<AbstractSyllabusElement> getSyllabusElementsForTemplateStructureAndSite(Long templateStructureId, String siteId);

	/**
	 * return true if the element with the given id has a mapping to the syllabus
	 *
	 * @param Long elementId
	 * @param String syllabusId
	 * @return true or false
	 */
	public boolean isElementMappedToSyllabus(Long elementId, Long syllabusId);

	/**
	 * Cleanup course outlines associated to site - delete syllabus, elements, mapping and attributes
	 * @param siteId
	 * @return
	 */
	public boolean cleanupSite (String siteId);
}

