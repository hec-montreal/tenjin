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
package ca.hec.opensyllabus2.api.model.syllabus;

import lombok.*;

import java.util.*;

import ca.hec.opensyllabus2.api.model.template.Rubric;
import ca.hec.opensyllabus2.api.model.template.TemplateElement;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */

@Data
public class SyllabusStructure {

    private Long syllabusStructure_id;

    private Long parent_id;

    private Boolean shareable;

    private Boolean publicElement;

    private Date studentAvailability;

    private Date lastModifiedDate;

    private String lastModifiedBy;

    private Long displayOrder;

    private Set <SyllabusElementAttribute> elementAttributes;

    private Set <SyllabusElementSection> elementSections;

    private Syllabus syllabus_id;

    private TemplateElement templateElement;

    private Rubric rubric;

    public SyllabusStructure (Long parent_id, Rubric rubric_id, TemplateElement templateElement, Syllabus syllabus_id) {
    	 this.parent_id = parent_id;
    	 this.rubric = rubric;
    	 this.templateElement = templateElement;
    	 this.syllabus_id = syllabus_id;

    }

    public SyllabusStructure (){

   }


    public boolean equals(Object other) {
        if (this == other) return true;
        if ( !(other instanceof SyllabusStructure) ) return false;


        return false;
    }

    public int hashCode() {
        int result;
        result = this.elementAttributes.hashCode();
        result = 29 * 1 ;
        return result;
    }

    public String toString(){
    	return getSyllabusStructure_id() + "";
    }


}

