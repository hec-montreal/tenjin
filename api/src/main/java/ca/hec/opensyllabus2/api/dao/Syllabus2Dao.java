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

import ca.hec.opensyllabus2.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.opensyllabus2.api.model.syllabus.Syllabus;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public interface Syllabus2Dao {

	public Syllabus getSyllabus (String courseId, String sectionId) throws Exception;

	public Syllabus getShareableSyllabus (String courseId )throws Exception;

	public Syllabus getCommonSyllabus (String courseId, String[] sectionIds)throws Exception;

	public List<AbstractSyllabusElement> getSyllabusElements(Long id);

	public Syllabus createOrUpdateSyllabus(Syllabus syllabus);

	public AbstractSyllabusElement saveOrUpdateSyllabusElement(AbstractSyllabusElement element);

	public void deleteSyllabusElement(AbstractSyllabusElement element);

}

