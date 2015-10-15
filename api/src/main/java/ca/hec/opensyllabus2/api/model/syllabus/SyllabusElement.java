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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import ca.hec.opensyllabus2.api.model.template.Rubric;
import ca.hec.opensyllabus2.api.model.template.TemplateStructure;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */

@Data
public class SyllabusElement{

	private Long syllabusElement_id;

	private Long parent;

	private String type;

    private Boolean shareable;

    private Boolean publicElement;

    private Boolean important;

    private Date availabilityStartDate;

    private Date availabilityEndDate;

    private Date lastModifiedDate;

    private Boolean displayPage;

	private String title;

	private String description;

    private String lastModifiedBy;

    private Long displayOrder;

    private Map<String, String> attributes;

    @JsonManagedReference
    private Set <SyllabusElementSection> elementSections;

    @JsonBackReference
    private Syllabus syllabus;

    @JsonBackReference
    private TemplateStructure templateStructure;

    private Rubric rubric;

    private Set <SyllabusElement> elements;

    public SyllabusElement (Long parent, Rubric rubric, TemplateStructure templateStructure, Syllabus syllabus_id) {
    	 this.parent = parent;
    	 this.rubric = rubric;
    	 this.templateStructure = templateStructure;
    	 this.syllabus = syllabus_id;

    }

    public SyllabusElement (){

   }


	public boolean equals(Object other) {
        if (this == other) return true;
        if ( !(other instanceof SyllabusElement) ) return false;


        return false;
    }

}

