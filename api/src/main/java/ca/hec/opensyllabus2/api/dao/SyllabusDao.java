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

import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;
import ca.hec.opensyllabus2.api.model.template.Rubric;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public interface SyllabusDao {

	public boolean createSyllabus (String courseId);
	
	public Syllabus getSyllabus (String courseId, String sectionId) throws Exception;
	
	public boolean updateSyllabus (String courseId);

	public boolean removeSyllabus (String courseId);
	
	public Syllabus getShareableSyllabus (String courseId )throws Exception;
	
	public Syllabus getCommonSyllabus (List<String> sectionIds)throws Exception;
//	
//	public List<Object> getElementsSection (String elementId);
//	
//	public List<Object> getElementsAttributes (String elementId);
//	
//	public List<Rubric> getAllRubrics();
//	
//	public String getElementsRubric (String elementId);
//	
//	public String getSyllabusRubric (String syllabusId);
//	
//	public String getSyllabusLocale (String syllabusId);
	
}

