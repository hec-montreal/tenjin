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

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;
/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */


@Data
public class SyllabusElementSection {
    
    private Long elementSection_id;
   
    @JsonBackReference
    private SyllabusElement syllabusElement_id;
    
    private String section_id;
    

    public SyllabusElementSection (SyllabusElement syllabusElement_id, String section_id){
    	this.syllabusElement_id = syllabusElement_id;
    	this.section_id = section_id;
    }


    public SyllabusElementSection (){
     }

}

